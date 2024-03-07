// Imports
import TOOLS from "../00/tools";

//Types & Interface
type Point = { x: number; y: number };

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		houses = housesVisited(data);

	return houses;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		houses = housesVisited(data, true);

	return houses;
}

//Run
solveB("example_b", "03");

// Functions
function getPointCode({ x, y }: Point): string {
	return `${y}:${x}`;
}
function housesVisited(data: string, twoSanta: boolean = false) {
	const santa_a = { x: 0, y: 0 },
		santa_b = { x: 0, y: 0 },
		visited = new Set([getPointCode(santa_a)]);

	for (let [index, direction] of [...data].entries()) {
		switch (direction) {
			case ">":
				if (twoSanta) {
					if (index % 2 === 0) santa_a.x++;
					else santa_b.x++;
				} else {
					santa_a.x++;
				}
				break;
			case "<":
				if (twoSanta) {
					if (index % 2 === 0) santa_a.x--;
					else santa_b.x--;
				} else {
					santa_a.x--;
				}
				break;
			case "^":
				if (twoSanta) {
					if (index % 2 === 0) santa_a.y++;
					else santa_b.y++;
				} else {
					santa_a.y++;
				}
				break;
			case "v":
				if (twoSanta) {
					if (index % 2 === 0) santa_a.y--;
					else santa_b.y--;
				} else {
					santa_a.y--;
				}
				break;
			default:
				throw Error("Invalid direction");
		}

		if (twoSanta) {
			if (index % 2 === 0) visited.add(getPointCode(santa_a));
			else visited.add(getPointCode(santa_b));
		} else {
			visited.add(getPointCode(santa_a));
		}
	}

	return visited.size;
}
