// Imports
import TOOLS from "../00/tools";

type Instruction = {
	type: string;
	register?: string;
	amount?: number;
};
type Instructions = {
	[index: number]: Instruction;
};

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		instructions = parseInput(data),
		registers = runInstructions(instructions);

	return registers.b;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		instructions = parseInput(data),
		registers = runInstructions(instructions, 1);

	return registers.b;
}

//Run
solveA("input", "23");

//Functions
function parseInput(data: string): Instructions {
	const instructions: Instructions = {};

	for (let [index, line] of data.split("\r\n").entries()) {
		const details = line.match(/[\w\d+\-]+/g)!,
			type = details[0];

		switch (type) {
			case "hlf":
				instructions[index] = { type, register: details[1] };
				break;
			case "tpl":
				instructions[index] = { type, register: details[1] };
				break;
			case "inc":
				instructions[index] = { type, register: details[1] };
				break;
			case "jmp":
				instructions[index] = { type, amount: +details[1] };
				break;
			case "jie":
				instructions[index] = {
					type,
					register: details[1],
					amount: +details[2],
				};
				break;
			case "jio":
				instructions[index] = {
					type,
					register: details[1],
					amount: +details[2],
				};
				break;
			default:
				throw Error("Invalid instruction type");
		}
	}

	return instructions;
}
function runInstructions(instructions: Instructions, initalValue: number = 0) {
	const registers: Record<string, number> = { a: initalValue, b: 0 };

	let index = 0;

	while (instructions[index]) {
		const instruction: Instruction = instructions[index];

		switch (instruction.type) {
			case "hlf":
				registers[instruction.register!] *= 0.5;
				index++;
				break;
			case "tpl":
				registers[instruction.register!] *= 3;
				index++;
				break;
			case "inc":
				registers[instruction.register!] += 1;
				index++;
				break;
			case "jmp":
				index += instruction.amount!;
				break;
			case "jie":
				if (registers[instruction.register!] % 2 === 0) {
					index += instruction.amount!;
				} else {
					index++;
				}
				break;
			case "jio":
				if (registers[instruction.register!] === 1) {
					index += instruction.amount!;
				} else {
					index++;
				}
				break;
			default:
				throw Error("Invalid instruction type");
		}
	}

	return registers;
}
