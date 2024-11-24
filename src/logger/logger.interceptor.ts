import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { LoggerServiceCustom } from "./logger.service";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
	constructor(private loggerService: LoggerServiceCustom) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		//@ts-expect-error: field args is private in ExecutionContextHost
		const [req, res] = context.args;

		this.loggerService.log(`Request url - ${req.url}`);
		this.loggerService.log(`Request params - ${log(req.params)}`);
		this.loggerService.log(`Request body - ${log(req.body)}`);
		this.loggerService.log(`Response status code - ${res.statusCode}`);

		const now = Date.now();
		return next
			.handle()
			.pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
	}
}

function log(arg: Record<string, string>): string {
	return Object.entries(arg).reduce((acc, [key, value]) => {
		acc += `${key}: ${value}, `;
		return acc;
	}, "");
}
