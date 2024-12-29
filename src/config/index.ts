import dotenv from "dotenv";
dotenv.config();

const config = {
	env: process.env.ENV || "dev",
	port: process.env.PORT,
	host: process.env.HOST,
	baseUrl: process.env.BASE_URL,
	socketHandshake: process.env.SOCKET_HANDSHAKE,
	kafka: {
		odds: {
			brokers: ["kafka:29092"],
			clientId: "q1Sh-9_ISia_zwGINzRvyQ",
			groupId: "oddGroup",
		},
	},
	db: {
		mongodb: {
			connectionString: process.env.MONGO_CONNECTION_STRING,
		},
	},
	auth: {
		jwtIssuer: process.env.JWT_ISSUER || "bet_odds",
		jwtAudience: process.env.JWT_AUDIENCE || "bet_odds",
		jwtExpiresIn: process.env.JWT_EXPIRES || "48hr",
		jwtSubject: process.env.JWT_AUDIENCE || "betodds_aud",
		privateKey: process.env.JWT_KEY || "",
	},
};

export default config as typeof config;
