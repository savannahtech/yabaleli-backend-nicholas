import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";

export const hashPassword = (password: string): string =>
	bcrypt.hashSync(password, 10);

export const comparePassword = async (password: string, dbPass: string) => {
	return await bcrypt.compare(password, dbPass);
};

export const issueToken = <T>(body: T, expiresIn = undefined): string => {
	const {
		auth: { jwtIssuer, jwtAudience, jwtExpiresIn, jwtSubject, privateKey },
	} = config;

	const signOptions = {
		issuer: jwtIssuer,
		subject: jwtSubject,
		audience: jwtAudience,
		expiresIn: expiresIn ?? jwtExpiresIn,
	};
	const payload = {
		data: body,
		expiresIn: jwtExpiresIn,
	};

	const token = jwt.sign({ user: payload }, privateKey, signOptions);
	return token;
};

export const verifyToken = async (
	token: string,
	signOptions: Record<string, string>,
) => {
	const {
		auth: { privateKey },
	} = config;
	const response = await jwt.verify(token, privateKey, signOptions);
	return response;
};
