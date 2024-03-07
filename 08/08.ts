// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		strings = parseInput(data),
		memorySize = processStrings(strings);

	return memorySize;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		strings = parseInput(data),
		chars = processStrings(strings, true);

	return chars;
}

//Run
solveB("input", "08");

//Functions
function parseInput(data: string): string[] {
	return data.split("\r\n");
}
function processStrings(strings: string[], partTwo: boolean = false): number {
	let literals = 0,
		memory = 0;

	if (partTwo) {
		for (let string of strings) {
			const expanded = string.replace(/["\\]/g, ($) => "\\" + $).length + 2;
			literals += expanded - string.length;
		}
		return literals;
	} else {
		for (let string of strings) {
			const chars =
				string.replace(/\\\\/g, "\\").match(/\\x[0-9a-fA-F]{2}|\\"|[^"]/g) ||
				[];
			literals += string.length;
			memory += chars.length;
		}
		return literals - memory;
	}
}
