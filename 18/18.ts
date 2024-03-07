// Imports
import TOOLS from "../00/tools";

type Point = { x: number; y: number };
type Light = Point & { turnOn: boolean };

//Solutions
export function solveA(fileName: string, day: string, steps: number): number {
	const data = TOOLS.readData(fileName, day),
		lightGrid = parseInput(data),
		lightsOn = animateGrid(lightGrid, steps);

	return lightsOn;
}
export function solveB(fileName: string, day: string, steps: number): number {
	const data = TOOLS.readData(fileName, day),
		lightGrid = parseInput(data, true),
		lightsOn = animateGrid(lightGrid, steps, true);

	return lightsOn;
}

//Run
solveB("example_b", "18", 5);

//Functions
function parseInput(data: string, partB: boolean = false) {
	const grid = data.split("\r\n").map((row) => [...row]),
		maxY = grid.length,
		maxX = grid[0].length;

	if (partB) {
		grid[0][0] = "#";
		grid[0][maxX - 1] = "#";
		grid[maxY - 1][0] = "#";
		grid[maxY - 1][maxX - 1] = "#";
	}

	return grid;
}
function animateGrid(grid: string[][], steps: number, partB: boolean = false) {
	const maxY = grid.length,
		maxX = grid[0].length;

	for (let step = 0; step < steps; step++) {
		const animate: Light[] = [];

		for (let y = 0; y < maxY; y++) {
			for (let x = 0; x < maxX; x++) {
				const currentLight = grid[y][x],
					turnOn = getStatus({ x, y }, grid);

				if (partB) {
					if (y === 0 && (x === 0 || x === maxX - 1)) {
						continue;
					}
					if (y === maxY - 1 && (x === 0 || x === maxX - 1)) {
						continue;
					}
				}

				if (currentLight === "#" && turnOn) continue;
				else if (currentLight === "." && !turnOn) continue;
				else animate.push({ x, y, turnOn });
			}
		}

		animate.forEach(({ x, y, turnOn }) => (grid[y][x] = turnOn ? "#" : "."));
	}

	return countLights(grid);
}
function getStatus(light: Point, grid: string[][]): boolean {
	const currentLight = grid[light.y][light.x];
	const neighbors = { on: 0, off: 0 };

	for (let [dx, dy] of [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
		[1, 1],
		[1, -1],
		[-1, 1],
		[-1, -1],
	]) {
		let [x, y] = [light.x + dx, light.y + dy];

		if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
			neighbors.off++;
		} else {
			const nLight = grid[y][x];

			if (nLight === "#") {
				neighbors.on++;
			} else {
				neighbors.off++;
			}
		}
	}

	if (currentLight === "#") {
		return neighbors.on === 2 || neighbors.on === 3 ? true : false;
	} else {
		return neighbors.on === 3 ? true : false;
	}
}
function countLights(grid: string[][]): number {
	let on = 0;

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			if (grid[y][x] === "#") on++;
		}
	}

	return on;
}
