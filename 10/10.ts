// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		output = groupDigits(data, 40);

	return output;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		output = groupDigits(data, 50);

	return output;
}

//Run
solveA("input", "10");

//Functions
function groupDigits(data: string, cycles: number = 1) {
	let string = data;

	for (let i = 0; i < cycles; i++) {
		string = string.replace(/(\d)\1*/g, ($) => $.length + $[0]);
	}

	return string.length;
}
