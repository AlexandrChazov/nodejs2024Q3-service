import { Module } from "@nestjs/common";

import { LoggerServiceCustom } from "./logger.service";

@Module({
	providers: [LoggerServiceCustom],
	exports: [LoggerServiceCustom],
})
export class LoggerModule {}
