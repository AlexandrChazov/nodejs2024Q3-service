import { Injectable, LoggerService } from "@nestjs/common";
import {
	existsSync,
	mkdirSync,
	renameSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { join } from "node:path";

import { LogLevel } from "../types";

const resetColor = "\x1b[0m";
const blue = "\x1b[34m";
const green = "\x1b[32m";
const red = "\x1b[31m";
const yellow = "\x1b[33m";
const brown = "\x1b[35m";
// const cyan = "\x1b[36m";

@Injectable()
export class LoggerServiceCustom implements LoggerService {
	private readonly maxFileSize: number;
	private readonly logLevels: number;
	private readonly logsFolderPath: string;

	constructor() {
		this.maxFileSize = Number(process.env.LOG_FILE_MAX_SIZE_KB || 1024) * 1024; // Convert to bytes
		this.logLevels = Number(process.env.LOG_LEVEL || 2);
		this.logsFolderPath = join(__dirname, "..", "..", "logs");

		this.createLogFile();
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

	private createLogFile(): void {
		if (!existsSync(this.logsFolderPath)) {
			mkdirSync(this.logsFolderPath, { recursive: true });
		}
	}
}

function getDate() {
	const year = new Date().getFullYear();
	const month = addZero(new Date().getMonth() + 1);
	const day = addZero(new Date().getDate());
	const hour = addZero(new Date().getHours());
	const minute = addZero(new Date().getMinutes());
	const second = addZero(new Date().getSeconds());
	return `${day}/${month}/${year}, ${hour}:${minute}:${second}`;
}

function fileName(level: string): string {
	const year = new Date().getFullYear();
	const month = addZero(new Date().getMonth() + 1);
	const day = addZero(new Date().getDate());
	return `${level}.${year}-${month}-${day}.log`;
}

function addZero(num: number): string {
	if (`${num}`.length < 2) return `0${num}`;
	return `${num}`;
}
