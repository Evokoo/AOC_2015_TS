// Imports
import TOOLS from "../00/tools";

interface Combo {
	currentPackages: number[];
	startIndex: number;
	remainingWeight: number;
}

type Combination = {
	packages: number[];
	entanglement: number;
	len: number;
};

//Solutions
export function solveA(fileName: string, day: string, groups: number): number {
	const data = TOOLS.readData(fileName, day),
		packages = parseInput(data),
		targetWeight = getWeight(packages) / groups,
		combinations = findCombinations(packages, targetWeight),
		entanglement = optimalConfiguration(combinations);

	return entanglement;
}
export function solveB(fileName: string, day: string, groups: number): number {
	const data = TOOLS.readData(fileName, day),
		packages = parseInput(data),
		targetWeight = getWeight(packages) / groups,
		combinations = findCombinations(packages, targetWeight),
		entanglement = optimalConfiguration(combinations);

	return entanglement;
}

//Run
solveB("example_b", "24", 4);

//Functions
function parseInput(data: string) {
	return data.split("\r\n").map(Number);
}
function getWeight(presents: number[]): number {
	return presents.reduce((acc, cur) => acc + cur, 0);
}
function getEntanglement(presents: number[]): number {
	return presents.reduce((acc, cur) => acc * cur, 1);
}
function findCombinations(packages: number[], targetSum: number) {
	const results: Combination[] = [];
	const entanglementRecord: Set<number> = new Set();
	const stack: Combo[] = [
		{ currentPackages: [], startIndex: 0, remainingWeight: targetSum },
	];

	while (stack.length) {
		const { currentPackages, startIndex, remainingWeight } = stack.pop()!;

		if (remainingWeight === 0) {
			const entanglement = getEntanglement(currentPackages);

			if (entanglementRecord.has(entanglement)) {
				continue;
			} else {
				entanglementRecord.add(entanglement);

				results.push({
					packages: currentPackages,
					entanglement,
					len: currentPackages.length,
				});

				continue;
			}
		}

		for (let i = startIndex; i < packages.length; i++) {
			if (
				packages[i] <= remainingWeight &&
				!currentPackages.includes(packages[i])
			) {
				stack.push({
					currentPackages: currentPackages.concat(packages[i]),
					startIndex: i + 1,
					remainingWeight: remainingWeight - packages[i],
				});
			}
		}
	}

	return results.sort(
		(a, b) => a.len - b.len || a.entanglement - b.entanglement
	);
}
function isDisjointed(a: number[], b: number[]): boolean {
	const expectLength = a.length + b.length,
		acutalLength = new Set([...a, ...b]).size;

	return expectLength === acutalLength;
}
function optimalConfiguration(combinations: Combination[]) {
	for (let i = 0; i < combinations.length; i++) {
		const configuration: Combination[] = [combinations[i]];

		let current = combinations[i].packages;

		for (let j = i + 1; j < combinations.length; j++) {
			if (isDisjointed(current, combinations[j].packages)) {
				configuration.push(combinations[j]);
				current = [...current, ...combinations[j].packages];
			}

			if (configuration.length === 3) {
				return configuration[0].entanglement;
			}
		}
	}

	throw Error("No arrangment found");
}
