// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		target = parseInput(data),
		houseNum = deliverPresents(target);

	return houseNum;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		target = parseInput(data),
		houseNum = deliverPresents(target, true);

	return houseNum;
}

//Run
solveB("input", "20");

//Functions
function parseInput(data: string): number {
	return +data;
}
function getDivisors(num: number): Set<number> {
	const divisors: Set<number> = new Set();

	for (let i = 1; i < Math.sqrt(num); i++) {
		if (num % i === 0) {
			divisors.add(i);
			divisors.add(num / i);
		}
	}

	return divisors;
}
function deliverPresents(target: number, partB: boolean = false) {
	if (partB) {
		const presents: Record<number, number> = {};

		for (let i = 1; true; i++) {
			for (let j = i; j <= i * 50; j += i) {
				presents[j] = presents[j] ? (presents[j] += i * 11) : i * 11;
			}

			if (presents[i] >= target) return i;
		}
	} else {
		for (let i = 1; true; i++) {
			const presents =
				[...getDivisors(i)].reduce((acc, cur) => acc + cur, 0) * 10;
			if (presents >= target) {
				return i;
			}
		}
	}
}
