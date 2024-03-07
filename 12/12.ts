// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		digits = getDigits(data),
		sum = getSum(digits);

	return sum;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		tree = parseJSON(data),
		sum = DFS(tree);

	return sum;
}

//Run
solveB("input", "12");

//Functions
function getDigits(data: string): number[] {
	return (data.match(/-*\d+/g) || []).map(Number);
}
function getSum(digits: number[]): number {
	return digits.reduce((acc, cur) => acc + cur, 0);
}
function parseJSON(data: string): Record<string, any> {
	return JSON.parse(data);
}
function DFS(tree: Record<string, any>): number {
	const stack = Object.keys(tree).map((key) => tree[key]);

	let sum = 0;

	while (stack.length) {
		const currentNode = stack.pop()!;

		if (Array.isArray(currentNode)) {
			for (let item of currentNode) {
				if (typeof item === "number") sum += item;
				if (typeof item === "object") stack.push(item);
			}
			continue;
		}

		const values = Object.values(currentNode);

		if (values.includes("red")) {
			continue;
		} else {
			for (let value of values) {
				if (typeof value === "number") sum += value;
				if (typeof value === "object") stack.push(value);
			}
		}
	}

	return sum;
}
