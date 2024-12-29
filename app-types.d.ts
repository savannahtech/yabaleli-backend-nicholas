interface CalculateOddResponse {
	gameId: string;
	timeElapsed: number;
	eventType: string;
	team: string;
}

interface LoginResponse {
	token: string;
	user: {
		id: string;
		email: string;
	};
}



interface ControllerResponse<T> {
	data: T | string;
	status: number;
}

interface SignupResponse {
	id: string;
	email: string;
}

interface ApiResponse<T> {
	statusCode: number;
	data: T | null | boolean | string | undefined;
	message: string | null;
}

interface KafkaConsumerMessage {
	topic: string;
	partition: string;
	message: string;
}

interface UserBet {
	id: string;
	userId: string;
	gameId: string;
	betType: string;
	pick: string;
	amount: number;
	odds: number;
}

interface PlaceBet {
	userId: string;
	gameId: string;
	betType: string;
	pick: string;
	amount: number;
}

interface PlaceBetResponse extends PlaceBet {
	odds: number;
	id: string;
  potWin: number;
}

interface LeaderBoard {
  rateOfWin: number;
  totalBetWon: number;
  numberOfBetWon: number;
  numberOfBetPlaced: number;
  totalAmountWon: number;
}

type NullablePlaceBetResponse = PlaceBetResponse | null;
