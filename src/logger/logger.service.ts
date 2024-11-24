import { Injectable, LoggerService } from "@nestjs/common";

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

	log(message: any, ...optionalParams: any[]) {
		if (this.logLevels.includes(LogLevel.log)) {
			this.writeLog("LOG", message, green);
		}
	}

	error(message: any, ...optionalParams: any[]) {
		if (this.logLevels.includes(LogLevel.error)) {
			this.writeLog("ERROR", message, red);
		}
	}

	warn(message: any, ...optionalParams: any[]) {
		if (this.logLevels.includes(LogLevel.warn)) {
			this.writeLog("WARN", message, brown);
		}
	}

	debug?(message: any, ...optionalParams: any[]) {
		if (this.logLevels.includes(LogLevel.debug)) {
			this.writeLog("DEBUG", message, blue);
		}
	}

	verbose?(message: any, ...optionalParams: any[]) {
		if (this.logLevels.includes(LogLevel.verbose)) {
			this.writeLog("VERBOSE", message, yellow);
		}
	}

	private writeLog(level: string, message: string, color: string) {
		const logMessage = `${getDate()} ${color} [${level}] ${resetColor} ${message}`;
		console.log(logMessage);
		// fs.appendFileSync(this.logFile, logMessage);
		// this.checkLogRotation();
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

function addZero(num: number): string {
	if (`${num}`.length < 2) return `0${num}`;
	return `${num}`;
}
