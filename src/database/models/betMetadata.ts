import mongoose, { Schema, type Document } from "mongoose";

// Define the interface for the document
interface UserBetMetadata extends Document {
	userId: string;
	numberOfBetWon: number;
	numberOfBetPlaced: number;
	numberOfBetLost: number;
	totalAmountWon: number;
	rateOfWin: number;
	createdAt: Date;
	updatedAt: Date;
}

const userBetMetadataSchema = new Schema(
	{
		userId: {
			type: String,
			required: [true, "userId is required"],
			trim: true,
			index: true,
		},
		numberOfBetWon: {
			type: Number,
			default: 0,
		},
		numberOfBetPlaced: {
			type: Number,
			default: 0,
		},
		numberOfBetLost: {
			type: Number,
			default: 0,
		},
		totalAmountWon: {
			type: Number,
			default: 0,
		},
		rateOfWin: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

const UserBetMetadataModel = mongoose.model<UserBetMetadata>(
	"UserBetMetadata",
	userBetMetadataSchema,
);

export default UserBetMetadataModel;
