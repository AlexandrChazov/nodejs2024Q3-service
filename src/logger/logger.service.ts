import { Injectable, LoggerService } from "@nestjs/common";
import { constants } from "node:fs";
import { access, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

import { LogLevel } from "../types";

const resetColor = "\x1b[0m";
const blue = "\x1b[34m";
const green = "\x1b[32m";
const red = "\x1b[31m";
const yellow = "\x1b[33m";
const brown = "\x1b[35m";
const cyan = "\x1b[36m";
const defaultLogLevels = `${LogLevel.log},${LogLevel.error},${LogLevel.warn},${LogLevel.debug},${LogLevel.verbose}`;

@Injectable()
export class LoggerServiceCustom implements LoggerService {
	logLevels: string[] = (process.env.LOG_LEVELS || defaultLogLevels).split(",");
	logsFolderPath: string = join(__dirname, "..", "..", "logs");

	log(message: any, ...optionalParams: any[]) {
		if (this.logLevels.includes(LogLevel.log)) {
			this.writeLog(LogLevel.log, message);
			this.printLog(LogLevel.log, message, green);
		}
	}

	error(message: any, ...optionalParams: any[]) {
		if (this.logLevels.includes(LogLevel.error)) {
			this.writeLog(LogLevel.error, message);
			this.printLog(LogLevel.error, message, red);
		}
	}

	warn(message: any, ...optionalParams: any[]) {
		if (this.logLevels.includes(LogLevel.warn)) {
			this.writeLog(LogLevel.warn, message);
			this.printLog(LogLevel.warn, message, brown);
		}
	}

	debug?(message: any, ...optionalParams: any[]) {
		if (this.logLevels.includes(LogLevel.debug)) {
			this.writeLog(LogLevel.debug, message);
			this.printLog(LogLevel.debug, message, blue);
		}
	}

	verbose?(message: any, ...optionalParams: any[]) {
		if (this.logLevels.includes(LogLevel.verbose)) {
			this.writeLog(LogLevel.verbose, message);
			this.printLog(LogLevel.verbose, message, yellow);
		}
	}

	private async writeLog(level: LogLevel, message: string): Promise<void> {
		try {
			await access(this.logsFolderPath, constants.F_OK);
		} catch {
			await mkdir(this.logsFolderPath, { recursive: true });
		}
		await writeFile(
			join(this.logsFolderPath, fileName(level)),
			`${getDate()} ${message}\n`,
			{
				encoding: "utf-8",
				flag: "a",
			},
		);
	}

	private printLog(level: LogLevel, message: string, color: string): void {
		const logMessage = `${getDate()} ${color} [${level}] ${resetColor} ${message}`;
		process.stdout.write(`${logMessage}\n`);
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

function fileName(level: LogLevel): string {
	const year = new Date().getFullYear();
	const month = addZero(new Date().getMonth() + 1);
	const day = addZero(new Date().getDate());
	return `${level}.${year}-${month}-${day}.log`;
}

function addZero(num: number): string {
	if (`${num}`.length < 2) return `0${num}`;
	return `${num}`;
}
