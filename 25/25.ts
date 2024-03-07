// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		[row, col] = parseInput(data),
		code = findCode(row, col);

	return code;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("input", "25");

//Functions
function parseInput(data: string) {
	return data.match(/\d+/g)!.map(Number);
}
function findCode(targetRow: number, targetCol: number) {
	let row = 1,
		column = 1,
		code = 20151125;

	while (row !== targetRow || column !== targetCol) {
		code = (code * 252533) % 33554393;

		if (row === 1) {
			row = column + 1;
			column = 1;
		} else {
			column++;
			row--;
		}
	}

	return code;
}
