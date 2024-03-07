// Imports
import TOOLS from "../00/tools";

//Types & Interface
interface Action {
	type: string;
	start: { x: number; y: number };
	end: { x: number; y: number };
}

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		actions = parseInput(data),
		lights = runActions(actions, 1000);

	return lights;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		actions = parseInput(data),
		brightness = runActions(actions, 1000, true);

	return brightness;
}

//Run
solveB("input", "06");

//Functions
function parseInput(data: string): Action[] {
	const actions: Action[] = [];

	for (let line of data.split("\r\n")) {
		const on = /^turn on/.test(line),
			off = /^turn off/.test(line),
			[x1, y1, x2, y2] = (line.match(/\d+/g) || []).map(Number);

		actions.push({
			type: on ? "On" : off ? "Off" : "Toggle",
			start: { x: x1, y: y1 },
			end: { x: x2, y: y2 },
		});
	}
	return actions;
}
function countLights(lights: boolean[][]): number {
	let lit = 0;

	for (let row of lights) {
		lit += row.filter((light) => light).length;
	}

	return lit;
}
function measureBrightness(lights: number[][]): number {
	let brightness = 0;

	for (let row of lights) {
		brightness += row.reduce((acc, cur) => acc + cur, 0);
	}

	return brightness;
}
function runActions(
	actions: Action[],
	size: number,
	brightness: boolean = false
) {
	const lights = Array.from({ length: size }, () =>
		Array(size).fill(brightness ? 0 : false)
	);

	for (let { type, start, end } of actions) {
		for (let y = start.y; y <= end.y; y++) {
			for (let x = start.x; x <= end.x; x++) {
				const currentStatus = lights[y][x];

				switch (type) {
					case "On":
						lights[y][x] = brightness ? currentStatus + 1 : true;
						break;
					case "Off":
						lights[y][x] = brightness ? Math.max(0, currentStatus - 1) : false;
						break;
					case "Toggle":
						lights[y][x] = brightness ? currentStatus + 2 : !currentStatus;
						break;
					default:
						throw Error("Invalid type");
				}
			}
		}
	}

	if (brightness) {
		return measureBrightness(lights);
	} else {
		return countLights(lights);
	}
}
