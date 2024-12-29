import type { Request } from "express";
import config from "../config";
import UserBetMetadata from "../database/models/betMetadata";
import UserBet from "../database/models/userBet";
import { bets, simulateBetPlacement } from "../fixtures/betting-data";
import { KafkaProducer } from "../services/kafka/producer";
import { LEADER_BOARD, PLACE_BET } from "../utils/kafka-topics";
import logger from "../utils/logger";

const {
	kafka: {
		odds: { clientId, brokers },
	},
} = config;

const log = logger("BetController");

/**
 * bet controller placeholder
 *
 * @export
 * @class BetController
 * @typedef {BetController}
 */
export class BetController {
	/**
	 * Place user bet
	 *
	 * @public
	 * @async
	 * @param {Request} req
	 * @returns {Promise<PlaceBetResponse>}
	 */
	public async placeBet(
		req: Request,
	): Promise<ControllerResponse<NullablePlaceBetResponse>> {
		try {
			// write bet  to database
			const payload: PlaceBet = {
				userId: req.body.userId,
				gameId: req.body.gameId,
				betType: req.body.betType,
				pick: req.body.pick,
				amount: req.body.amount,
			};
			const simulatedBet = simulateBetPlacement(payload);

			await UserBetMetadata.findOneAndUpdate(
				{
					userId: req.body.userId,
				},
				{
					$inc: {
						numberOfBetPlaced: 1,
					},
				},
			);

			// write to database
			await UserBet.create({
				...simulatedBet,
				userId: payload?.userId,
				gameId: payload?.gameId,
				betType: simulatedBet?.betType,
				pick: simulatedBet?.pick,
				amount: simulatedBet?.amount,
				odds: simulatedBet?.odds,
				potWin: simulatedBet?.potWin,
				amountWon: 0,
				betWon: false,
				betSettled: false,
			});
			const placeBetproducer = new KafkaProducer(brokers, clientId);
			await placeBetproducer.sendMessage(
				PLACE_BET,
				JSON.stringify(simulatedBet),
			);
			return {
				data: simulatedBet,
				status: 200,
			};
		} catch (error) {
			log.error("could not place bet", error);
			throw error;
		}
	}

	/**
	 * Retrieves user bet history
	 *
	 * @public
	 * @async
	 * @param {Request} req
	 * @returns {Promise<UserBet[]>}
	 */
	public async betHistory(
		userId: string,
	): Promise<ControllerResponse<UserBet[]>> {
		try {
			//TODO: get user bet history from DB
			const userBets = bets.filter((bet) => bet.userId === userId);
			return {
				data: userBets,
				status: 200,
			};
		} catch (error) {
			log.error("could not retrieve user bet", error);
			throw error;
		}
	}

	/**
	 * Get leader board
	 *
	 * @public
	 * @async
	 * @returns {Promise<Promise<ControllerResponse<LeaderBoard>>>}
	 */
	public async leaderBoard(): Promise<
		Promise<ControllerResponse<LeaderBoard[]>>
	> {
		try {
			const userBetMetadata = await UserBetMetadata.find()
				.sort({ totalAmountWon: -1 })
				.exec();
			return {
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				data: userBetMetadata as any,
				status: 200,
			};
		} catch (error) {
			log.error("could not retrieve user bet", error);
			throw error;
		}
	}

	/**
	 * Simulate Settle won bet
	 *
	 * @public
	 * @async
	 * @returns {Promise<Promise<ControllerResponse<LeaderBoard>>>}
	 */
	public async settleBet(
		req: Request,
	): Promise<Promise<ControllerResponse<boolean>>> {
		try {
			const bets = req.body;

			await Promise.all(
				bets.map(
					async (settlement: {
						userId: string;
						gameId: string;
						betId: string;
						won: boolean;
					}) => {
						const { userId, gameId, betId, won } = settlement;

						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						const oneBet: any = await UserBet.findOne({
							_id: betId,
							userId: userId,
							gameId: gameId,
						});
						if (!oneBet) throw new Error("Bet not found");

						await UserBet.findOneAndUpdate(
							{
								_id: betId,
								userId: userId,
								gameId: gameId,
							},
							{
								$set: {
									status: "settled",
									dateSettled: new Date(),
									betWon: !!won,
									amountWon: oneBet?.potWin,
								},
							},
							{ new: true },
						);
						// update metadata
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						const oneUserMeta: any = await UserBetMetadata.findOne({
							userId: userId,
						});
						const updatedMeta = await UserBetMetadata.findOneAndUpdate(
							{
								userId: userId,
							},
							{
								$set: {
									dateSettled: new Date(),
									totalAmountWon: won
										? oneUserMeta.totalAmountWon + oneBet?.potWin
										: oneUserMeta.totalAmountWon,
									numberOfBetWon: won ? oneUserMeta.numberOfBetWon + 1 : 0,
									numberOfBetLost: won
										? oneUserMeta.numberOfBetLost
										: oneUserMeta.numberOfBetLost + 1,
									rateOfWin:
										(oneUserMeta.numberOfBetWon /
											oneUserMeta.numberOfBetPlaced) *
										100,
								},
							},
							{
								new: true,
							},
						);
						const placeBetproducer = new KafkaProducer(brokers, clientId);
						await placeBetproducer.sendMessage(
							LEADER_BOARD,
							JSON.stringify(updatedMeta),
						);
					},
				),
			);

			return {
				data: true,
				status: 200,
			};
		} catch (error) {
			log.error("could not retrieve user bet", error);
			throw error;
		}
	}
}
