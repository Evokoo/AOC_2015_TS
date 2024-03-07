// Imports
import TOOLS from "../00/tools";

//Types & Interface

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		strings = parseInput(data),
		niceStrings = countNiceStrings(strings, 1);

	return niceStrings;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		strings = parseInput(data),
		niceStrings = countNiceStrings(strings, 2);

	return niceStrings;
}

//Run
solveB("example_b", "05");

// Functions
function parseInput(data: string): string[] {
	return data.split("\r\n");
}
function ruleSetOne(string: string): boolean {
	if (/ab|cd|pq|xy/.test(string)) return false;

	const vowels = string.match(/[aeiou]/g) || [],
		doubleChar = /([a-z])\1/.test(string);

	return vowels.length >= 3 && doubleChar;
}
function ruleSetTwo(string: string): boolean {
	let testA = false;
	let testB = false;

	for (let i = 0; i < string.length - 1; i++) {
		const sliceA = string.slice(i, i + 2),
			sliceB = string.slice(i, i + 3),
			re = RegExp(sliceA, "g");

		if ((string.match(re) || []).length >= 2) {
			testA = true;
		}

		if (sliceB[0] === sliceB[2]) {
			testB = true;
		}

		if (testA && testB) {
			return true;
		}
	}

	return false;
}
function countNiceStrings(strings: string[], ruleSet: number): number {
	let niceStrings = 0;

	for (let string of strings) {
		if (ruleSet === 1 && ruleSetOne(string)) niceStrings++;
		if (ruleSet === 2 && ruleSetTwo(string)) niceStrings++;
	}

	return niceStrings;
}
