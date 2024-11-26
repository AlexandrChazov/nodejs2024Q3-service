import { Injectable, LoggerService } from "@nestjs/common";
import {
	existsSync,
	mkdirSync,
	renameSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { join } from "node:path";

import { fileName, getDate } from "../lib";
import { blue, brown, green, red, resetColor, yellow } from "../model";
import { LogLevel } from "../types";

@Injectable()
export class LoggerServiceCustom implements LoggerService {
	private readonly maxFileSize: number;
	private readonly logLevels: number;
	private readonly logsFolderPath: string;

	constructor() {
		this.maxFileSize = Number(process.env.LOG_FILE_MAX_SIZE_KB || 1024) * 1024; // Convert to bytes
		this.logLevels = Number(process.env.LOG_LEVEL || 2);
		this.logsFolderPath = join(process.cwd(), "logs");

		this.createLogsFolder();
	}

	log(message: any, ...optionalParams: any[]) {
		if (this.logLevels >= LogLevel.log) {
			this.writeLog("log", message);
			this.printLog("log", message, green);
		}
	}

	error(message: any, ...optionalParams: any[]) {
		if (this.logLevels >= LogLevel.error) {
			this.writeLog("error", message);
			this.printLog("error", message, red);
		}
	}

	warn(message: any, ...optionalParams: any[]) {
		if (this.logLevels >= LogLevel.warn) {
			this.writeLog("warn", message);
			this.printLog("warn", message, brown);
		}
	}

	debug?(message: any, ...optionalParams: any[]) {
		if (this.logLevels >= LogLevel.debug) {
			this.writeLog("debug", message);
			this.printLog("debug", message, blue);
		}
	}

	verbose?(message: any, ...optionalParams: any[]) {
		if (this.logLevels >= LogLevel.verbose) {
			this.writeLog("verbose", message);
			this.printLog("verbose", message, yellow);
		}
	}

	private writeLog(level: string, message: string): void {
		const filePath = join(this.logsFolderPath, fileName(level));
		writeFileSync(filePath, `${getDate()} ${message}\n`, {
			encoding: "utf-8",
			flag: "a",
		});
		this.checkLogRotation(filePath);
	}

	private printLog(level: string, message: string, color: string): void {
		const logMessage = `${getDate()} ${color} [${level}] ${resetColor} ${message}`;
		process.stdout.write(`${logMessage}\n`);
	}

	private checkLogRotation(fileName: string): void {
		const stats = statSync(fileName);
		if (stats.size > this.maxFileSize) {
			const newFileName = fileName.replace(
				/\.log$/g,
				` (${new Date().getTime()}).log`,
			);
			renameSync(fileName, newFileName);
		}
	}

	private createLogsFolder(): void {
		if (!existsSync(this.logsFolderPath)) {
			mkdirSync(this.logsFolderPath, { recursive: true });
		}
	}
}
