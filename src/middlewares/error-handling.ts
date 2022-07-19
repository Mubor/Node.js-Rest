import { Logger } from "../ports/logger";

import type { Request, Response, NextFunction } from "express";
import { DomainError, NotFoundError } from "../domain/error";

export const handleErrorMiddleware = (logger: Logger) => {
	return (err: Error, _req: Request, res: Response, next: NextFunction) => {
		if (err instanceof DomainError) {
			res.status(err instanceof NotFoundError ? 404 : 400);
		} else {
			res.status(500);
		}
	
		logger.alert(err.message, err.name);

		res.json({
			status: res.statusCode,
			message: err.message
		});

		next();
	};
}