// Imports
import TOOLS from "../00/tools";

type Container = number;
type Containers = Container[];

//Solutions
export function solveA(fileName: string, day: string, target: number): number {
	const data = TOOLS.readData(fileName, day),
		containers = parseInput(data),
		combinations = DP(containers, target);

	return combinations;
}
export function solveB(fileName: string, day: string, target: number): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveB("example_b", "17", 25);

//Functions
function parseInput(data: string): Containers {
	const containers = [];

	for (let line of data.split("\r\n")) {
		containers.push(+line.trim());
	}

	return containers.sort((a, b) => b - a);
}
function DP(containers: Containers, target: number) {
	const arr = Array(target + 1).fill(0);

	arr[0] = 1;

	for (const container of containers) {
		for (let i = target; i >= container; i--) {
			arr[i] += arr[i - container];
		}

		console.log({ container, arr });
	}

	return arr[target];
}
