import mongoose, { Schema, type Document } from "mongoose";

const userBetSchema = new Schema(
	{
		userId: {
			type: String,
			required: [true, "userId is required"],
			trim: true,
		},
		gameId: {
			type: String,
			required: [true, "gameId is required"],
			trim: true,
		},
		betType: {
			type: String,
			required: [true, "betType is required"],
			trim: true,
		},
		pick: {
			type: String,
			required: [true, "betType is required"],
			trim: true,
		},
		amount: {
			type: Number,
			required: [true, "betType is required"],
			trim: true,
		},
		odds: {
			type: Number,
			required: [true, "odds is required"],
		},
		amountWon: {
			type: Number,
		},
		potWin: {
			type: Number,
		},
		status: {
			type: String, // change this to Enum
		},
		betWon: {
			type: Boolean,
		},
		betSettled: {
			type: Boolean,
		},
		dateSettled: {
			type: Date,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model<UserBet>("UserBet", userBetSchema);
