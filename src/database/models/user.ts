import mongoose, { Schema, type Document } from "mongoose";

export interface User extends Document {
	email: string;
	password: string;
	comparePassword(userPassword: string): Promise<boolean>;
}

const userSchema = new Schema(
	{
		id: {
			type: Schema.Types.ObjectId,
			unique: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters"],
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model<User>("User", userSchema);
