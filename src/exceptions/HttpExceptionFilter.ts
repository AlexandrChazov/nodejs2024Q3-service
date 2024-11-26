import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";

import { LoggerServiceCustom } from "../logger";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	constructor(private readonly loggingService: LoggerServiceCustom) {}

	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		const statusCode =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const errorResponse = {
			timestamp: new Date().toISOString(),
			path: request.url,
			statusCode,
			message:
				exception instanceof HttpException
					? exception.getResponse()
					: "Internal server error",
		};

		this.loggingService.error(
			`HTTP ${statusCode} - ${request.method} ${request.url}`,
			JSON.stringify(errorResponse),
		);

		response.status(statusCode).json(errorResponse);
	}
}
