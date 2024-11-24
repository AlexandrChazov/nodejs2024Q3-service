import { Injectable, LoggerService } from "@nestjs/common";

const resetColor = "\x1b[0m";
const blue = "\x1b[34m";
const green = "\x1b[32m";
const red = "\x1b[31m";
const yellow = "\x1b[33m";
const brown = "\x1b[35m";
const cyan = "\x1b[36m";

@Injectable()
export class LoggerServiceCustom implements LoggerService {
	log(message: any, ...optionalParams: any[]) {
		this.writeLog("LOG", message, green);
	}

	fatal(message: any, ...optionalParams: any[]) {
		this.writeLog("FATAL", message, cyan);
	}

	error(message: any, ...optionalParams: any[]) {
		this.writeLog("ERROR", message, red);
	}

	warn(message: any, ...optionalParams: any[]) {
		this.writeLog("WARN", message, brown);
	}

	debug?(message: any, ...optionalParams: any[]) {
		this.writeLog("DEBUG", message, blue);
	}

	verbose?(message: any, ...optionalParams: any[]) {
		this.writeLog("VERBOSE", message, yellow);
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
