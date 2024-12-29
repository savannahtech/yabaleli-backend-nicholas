import path from "node:path";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "Express API for BetOdds",
		version: "1.0.0",
		description: "Real-time Sports Betting and Leaderboard System",
		license: {
			name: "Licensed Under MIT",
		},
	},
	servers: [
		{
			url: "http://localhost:4000",
			description: "Development server",
		},
	],
};

const options = {
	swaggerDefinition,
	apis: [path.resolve(__dirname, "../routes/*.ts")],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
