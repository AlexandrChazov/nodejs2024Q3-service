export function parseObj(arg: Record<string, string>): string {
	return Object.entries(arg).reduce((acc, [key, value]) => {
		acc += `${key}: ${value}, `;
		return acc;
	}, "");
}
