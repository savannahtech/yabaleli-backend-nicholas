import express, { type Router, type Response, type Request } from "express";
import { AuthController } from "../controllers/auth";
import respondWithData from "../utils/respond-with-data";
const routes: Router = express.Router();

routes.post("/login", async (req: Request, res: Response) => {
	try {
		const authController = new AuthController();
		const loginRes = await authController.login(req);
		return respondWithData<LoginResponse>(
			{
				data: loginRes.data,
				message: "success",
				statusCode: loginRes.status,
			},
			res,
		);
	} catch (error) {
		return respondWithData<LoginResponse>(
			{
				data: null,
				message: "Could not login user",
				statusCode: 500,
			},
			res,
		);
	}
});

routes.post("/signup", async (req: Request, res: Response) => {
	try {
		const authController = new AuthController();
		const signupRes = await authController.signup(req);
		return respondWithData<SignupResponse>(
			{
				data: signupRes.data,
				message: "success",
				statusCode: signupRes.status,
			},
			res,
		);
	} catch (error) {
		return respondWithData<LoginResponse>(
			{
				data: null,
				message: "Could not signup user",
				statusCode: 500,
			},
			res,
		);
	}
});

export default routes;
