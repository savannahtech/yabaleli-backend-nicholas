import mongoose from "mongoose";
import config from "../config";
import connectDB from "./init-mongo";
import logger from "./logger";

jest.mock("mongoose");
jest.mock("../config", () => ({
	db: {
		mongodb: {
			connectionString: "mongodb://test:27017/testdb",
		},
	},
}));
jest.mock("./logger", () => {
	return () => ({
		error: jest.fn(),
		info: jest.fn(),
	});
});

describe("MongoDB Connection", () => {
	const mockConnect = mongoose.connect as jest.Mock;
	const mockConnection = { asPromise: jest.fn() };
	const log = logger("MongoDB");

	beforeEach(() => {
		jest.clearAllMocks();
		mockConnect.mockResolvedValue({ connection: mockConnection });
		mockConnection.asPromise.mockResolvedValue(undefined);
	});

	it("should handle null connection", async () => {
		mockConnect.mockResolvedValue({ connection: null });
		await connectDB();
		expect(mockConnect).toHaveBeenCalled();
		expect(mockConnection.asPromise).not.toHaveBeenCalled();
	});

	it("should use correct connection", async () => {
		await connectDB();

		expect(mockConnect).toHaveBeenCalledWith(
			"mongodb://test:27017/testdb",
			expect.any(Object),
		);
	});
});
