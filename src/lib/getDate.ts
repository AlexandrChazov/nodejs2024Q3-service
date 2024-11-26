import { addZero } from "./addZero";

export function getDate() {
	const year = new Date().getFullYear();
	const month = addZero(new Date().getMonth() + 1);
	const day = addZero(new Date().getDate());
	const hour = addZero(new Date().getHours());
	const minute = addZero(new Date().getMinutes());
	const second = addZero(new Date().getSeconds());
	return `${day}/${month}/${year}, ${hour}:${minute}:${second}`;
}
