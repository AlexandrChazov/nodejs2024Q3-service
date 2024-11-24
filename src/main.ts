import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { LoggerServiceCustom } from "./logger";

const PORT = process.env.SERVER_PORT;

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: new LoggerServiceCustom(),
	});
	app.useGlobalPipes(new ValidationPipe());

	const loggerService = app.get(LoggerServiceCustom);
	process.on("uncaughtException", (error) => {
		loggerService.error(
			`Uncaught Exception: ${JSON.stringify(error.stack, null, 2)}`,
		);
	});
	process.on("unhandledRejection", (reason) => {
		loggerService.error(
			`Unhandled Rejection: ${JSON.stringify(reason, null, 2)}`,
		);
	});

	await app.listen(PORT);
	console.log(`Server is running on PORT ${PORT}`);
}
bootstrap();
