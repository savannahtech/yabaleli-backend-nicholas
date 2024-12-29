// import type { Response } from "express";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default <T>(result: ApiResponse<T>, res: any) => {
	const { statusCode } = result;
	return res.status(statusCode).json(result);
};
