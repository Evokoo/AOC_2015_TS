// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		floor = findFloor(data);

	return floor;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		floor = findFloor(data, -1);

	return floor;
}

//Run
solveB("example_b", "01");

// Functions
function findFloor(data: string, target: number = 0): number {
	let floor = 0;

	for (let [index, char] of [...data].entries()) {
		char === "(" ? floor++ : floor--;

		if (target !== 0 && floor === target) {
			return index + 1;
		}
	}

	return floor;
}
