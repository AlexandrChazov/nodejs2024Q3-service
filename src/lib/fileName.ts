import { addZero } from "./addZero";

export function fileName(level: string): string {
	const year = new Date().getFullYear();
	const month = addZero(new Date().getMonth() + 1);
	const day = addZero(new Date().getDate());
	return `${level}.${year}-${month}-${day}.log`;
}
