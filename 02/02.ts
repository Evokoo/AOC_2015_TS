// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		presents = parseInput(data),
		feetOfPaper = getPaperSize(presents);

	return feetOfPaper;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		presents = parseInput(data),
		feetOfRibbon = getRibbionLength(presents);

	return feetOfRibbon;
}

//Run
solveB("example_b", "02");

// Functions
function parseInput(data: string): number[][] {
	const presents = [];

	for (let line of data.split("\r\n")) {
		const present = (line.match(/\d+/g) || []).map(Number);
		presents.push(present);
	}

	return presents;
}
function getPaperSize(presents: number[][]): number {
	let totalArea = 0;

	for (let [w, h, l] of presents) {
		const a = w * h,
			b = h * l,
			c = w * l;

		totalArea += (a + b + c) * 2 + Math.min(...[a, b, c]);
	}

	return totalArea;
}
function getRibbionLength(presents: number[][]): number {
	let totalLength = 0;

	for (let [w, h, l] of presents) {
		const [a, b, c] = [w, h, l].sort((a, b) => a - b),
			ribbon = a * 2 + b * 2,
			bow = a * b * c;

		totalLength += ribbon + bow;
	}

	return totalLength;
}
