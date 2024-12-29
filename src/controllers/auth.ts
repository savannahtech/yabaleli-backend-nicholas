import type { Request } from "express";
import UserBetMetadata from "../database/models/betMetadata";
import User from "../database/models/user";
import { comparePassword, hashPassword, issueToken } from "../utils/auth";
import logger from "../utils/logger";

const log = logger("AuthController");
export class AuthController {
	/**
	 * Description placeholder
	 *
	 * @public
	 * @async
	 * @param {Request} req
	 * @returns {Promise<ControllerResponse<LoginResponse>>}
	 */
	public async login(req: Request): Promise<ControllerResponse<LoginResponse>> {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				return {
					data: "Email and password are required",
					status: 400,
				};
			}
			// find the user
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				return {
					data: "Username / Password incorrect",
					status: 400,
				};
			}

			// compare passwords
			const userPasswordCorrect = await comparePassword(
				req.body.password,
				user.password,
			);
			if (!userPasswordCorrect) {
				return {
					data: "Username / Password incorrect",
					status: 400,
				};
			}
			// generate token for user
			const userToken = await issueToken({
				id: user.id,
				email: user.email,
			});
			return {
				data: {
					token: userToken,
					user: {
						id: user.id,
						email: user.email,
					},
				},
				status: 200,
			};
		} catch (error) {
			log.error("could authenticate user", error);
			throw error;
		}
	}

	/**
	 * Description placeholder
	 *
	 * @public
	 * @async
	 * @param {Request} req
	 * @returns {Promise<ControllerResponse<SignupResponse>>}
	 */
	public async signup(
		req: Request,
	): Promise<ControllerResponse<SignupResponse>> {
		try {
			//TODO: validate request body before storing
			const user = await User.findOne({ email: req.body.email });
			if (user) {
				return {
					data: "User already exists",
					status: 400,
				};
			}
			const res = await User.create({
				email: req.body.email,
				password: hashPassword(req.body.password),
			});
			console.log("----res", res._id);

			await UserBetMetadata.create({
				userId: res._id,
			});
			return {
				data: {
					id: res.id,
					email: res.email,
				},
				status: 200,
			};
		} catch (error) {
			log.error("could authenticate user", error);
			throw error;
		}
	}
}
