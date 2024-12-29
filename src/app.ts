import { createServer } from "node:http";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { type Application } from "express";
import config from "./config/index";
import routes from "./routes";
import { KafkaConsumer } from "./services/kafka/consumer";
import appLogger from "./utils/app-logger";
import initMongo from "./utils/init-mongo";
import initializeSentry from "./utils/sentry";

initializeSentry(process.env.SENTRY_DSN || "");
const app: Application = express();
app.use(cors());
app.use(appLogger);
app.use(bodyParser.json());
app.use(routes);
initMongo();
export const httpServer = createServer(app);
dotenv.config();

//initialize bet oods consumers
const {
	kafka: {
		odds: { groupId, clientId, brokers },
	},
} = config;
const kafkaBetOddsConsumer = new KafkaConsumer(brokers, clientId, groupId);
kafkaBetOddsConsumer.initializeConsumers();

export default app;
