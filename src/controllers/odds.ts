import type { Request } from "express";
import config from "../config";
import { generateLiveUpdate, liveGameData } from "../fixtures/betting-data";
import { KafkaProducer } from "../services/kafka/producer";
import { UPDATE_LIVE_ODDS, UPDATE_ONE_ODD } from "../utils/kafka-topics";
import logger from "../utils/logger";

const {
	kafka: {
		odds: { clientId, brokers },
	},
} = config;

const log = logger("OddsController");

/**
 *
 * @export
 * @class OddsController
 * @typedef {OddsController}
 */
export class OddsController {
	/**
	 * Returns live odds
	 *
	 * @public
	 * @async
	 * @returns {Promise<boolean>}
	 */
	public async getLiveOdds(): Promise<ControllerResponse<boolean>> {
		try {
			//get live odds
			const liveOdds = liveGameData;
			const liveOddsproducer = new KafkaProducer(brokers, clientId);
			await liveOddsproducer.sendMessage(
				UPDATE_LIVE_ODDS,
				JSON.stringify(liveOdds),
			);
			return {
				data: true,
				status: 200,
			};
		} catch (error) {
			log.error("failed to get live odds", error);
			throw error;
		}
	}

	/**
	 * calculates odds and sends an event to a topic
	 *
	 * @public
	 * @async
	 * @param {Request} req
	 * @returns {Promise<CalculateOddResponse>}
	 */
	public async calculateOdds(
		req: Request,
	): Promise<ControllerResponse<CalculateOddResponse>> {
		try {
			const odds = generateLiveUpdate(req.body.gameId);

			const latestOddsproducer = new KafkaProducer(brokers, clientId);
			await latestOddsproducer.sendMessage(
				UPDATE_ONE_ODD,
				JSON.stringify(odds),
			);
			return odds;
		} catch (error) {
			log.error("failed to calculate odds", error);
			throw error;
		}
	}
}
