import mongoose from "mongoose";
import config from "../config";
import logger from "./logger";

const log = logger("MongoDb");
export default async () => {
	const {
		db: {
			mongodb: { connectionString },
		},
	} = config;

	let conn: mongoose.Connection | null = null;
	try {
		if (conn == null) {
			conn = await mongoose
				.connect(connectionString as string, {
					serverSelectionTimeoutMS: 5000,
				})
				.then(() => mongoose.connection);
			if (conn) await conn.asPromise();
		}
	} catch (error) {
		log.error("MongoDB connection error", error);
	}
};
