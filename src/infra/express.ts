import { Request, Response, NextFunction } from "express";

type ExpressHandlerFunction<Req, Res> = (req: Req, res: Res) => Promise<unknown> 

export const route = <Req extends Request, Res extends Response>(
	handler: ExpressHandlerFunction<Req, Res>
) => {
	return async (req: Req, res: Res, next: NextFunction) => {
		try {
			const response = await handler(req, res);

			res.json({
				status: res.statusCode,
				data: response
			});
		} catch (error) {
			next(error);
		}
	}
}