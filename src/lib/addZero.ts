export function addZero(num: number): string {
	if (`${num}`.length < 2) return `0${num}`;
	return `${num}`;
}
