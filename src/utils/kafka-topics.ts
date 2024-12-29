//TODO: Cleanup

import { socket } from "../server";
export const UPDATE_LIVE_ODDS = "UpdateLiveOdds";
export const UPDATE_ONE_ODD = "UpdateOneOdd";
export const LEADER_BOARD = "LeaderBoard";
export const CLIENT_BET_ODDS = "bet_odds";
export const ODDS_NAMESPACE = "/bet-sessions";
export const PLACE_BET = "PlaceBet";

export const consumerTopics = [
	{
		topic: UPDATE_LIVE_ODDS,
		consumer: <T>(payload: T) => {
			socket.emitToClient(UPDATE_LIVE_ODDS, ODDS_NAMESPACE, {
				data: payload,
			});
		},
	},
	{
		topic: UPDATE_ONE_ODD,
		consumer: <T>(payload: T) => {
			socket.emitToClient(UPDATE_ONE_ODD, ODDS_NAMESPACE, {
				data: payload,
			});
		},
	},
	{
		topic: PLACE_BET,
		consumer: <T>(payload: T) => {
			socket.emitToClient(PLACE_BET, ODDS_NAMESPACE, {
				data: payload,
			});
		},
	},
	{
		topic: LEADER_BOARD,
		consumer: <T>(payload: T) => {
			socket.emitToClient(LEADER_BOARD, ODDS_NAMESPACE, {
				data: payload,
			});
		},
	},
];
