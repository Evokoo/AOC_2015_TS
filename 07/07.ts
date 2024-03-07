// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		input = parseInput(data),
		aValue = runInstructions(input);

	return aValue;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		cycleOne = runInstructions(parseInput(data)),
		cycleTwo = runInstructions(parseInput(data), cycleOne);

	return cycleTwo;
}

//Run
solveA("input", "07");

//Functions
function parseInput(data: string): string[] {
	return data.split("\r\n");
}
function runInstructions(lines: string[], bValue: number = 0): number {
	const values: Record<string, number> = {},
		queue = lines.slice();

	while (queue.length) {
		const current = queue.shift()!;

		//Value can be added to object
		if (/^\d+ -> [a-z]+$/.test(current)) {
			const [value, key] = current.split("->");

			if (key.trim() === "b" && bValue > 0) {
				values["b"] = bValue;
			} else {
				values[key.trim()] = +value.trim();
			}

			continue;
		}

		//Equation can be solved
		if (/^\d+ [A-Z]+ \d+|^NOT \d+/.test(current)) {
			const op = current.match(/[A-Z]+/)![0];

			if (op === "NOT") {
				const [_, a, key] = current.match(/^NOT (\d+) -> ([a-z]+)$/)!;
				values[key] = ~a & 0xffff;
			} else {
				const [a, b, key] = current.match(/[a-z0-9]+/g)!;

				switch (op) {
					case "AND":
						values[key] = +a & +b;
						break;
					case "OR":
						values[key] = +a | +b;
						break;
					case "LSHIFT":
						values[key] = +a << +b;
						break;
					case "RSHIFT":
						values[key] = +a >> +b;
						break;
					default:
						throw Error("Invalid Operator");
				}
			}
			continue;
		}

		//Update variables in equation
		let equation = current;

		for (let key of current.match(/[a-z]+/g) || []) {
			if (key in values)
				equation = equation.replace(RegExp(key), String(values[key]));
		}

		queue.push(equation);
	}

	return values["a"];
}
