// Imports
import TOOLS from "../00/tools";
import crypto from "node:crypto";

//Types & Interface

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		lowestNum = findHashNum(data, 5);
	return lowestNum;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		lowestNum = findHashNum(data, 6);
	return lowestNum;
}

//Run
solveB("input", "04");

// Functions
function findHashNum(key: string, len: number): number {
	const re = RegExp(`^0{${len}}`);

	for (let i = 0; true; i++) {
		const hash = crypto
			.createHash("md5")
			.update(key + i)
			.digest("hex");

		if (re.test(hash)) return i;
	}
}
