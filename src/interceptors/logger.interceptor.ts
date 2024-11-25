import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";

import { parseObj } from "../lib";
import { LoggerServiceCustom } from "../logger";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
	constructor(private loggerService: LoggerServiceCustom) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		//@ts-expect-error: field args is private in ExecutionContextHost
		const [req, res] = context.args;
		const { body, params, url } = req;
		const { statusCode } = res;

		this.loggerService.log(`Request URL - ${url}`);
		if (Object.keys(params).length) {
			this.loggerService.log(`Request PARAMS - ${parseObj(params)}`);
		}
		if (Object.keys(body).length) {
			this.loggerService.log(`Request BODY - ${parseObj(body)}`);
		}
		this.loggerService.log(`Response STATUS CODE - ${statusCode}`);

		return next.handle();
	}
}
