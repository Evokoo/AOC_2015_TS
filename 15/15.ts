// Imports
import TOOLS from "../00/tools";

type Ingrident = { [key: string]: number };
type Recipe = { amount: number; ratio: number[] };
interface IngridentList {
	[key: string]: Ingrident;
}

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		ingridentList = parseInput(data),
		perfectCookie = DFS(ingridentList);

	return perfectCookie;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		ingridentList = parseInput(data),
		perfectCookie = DFS(ingridentList, true);

	return perfectCookie;
}

//Run
solveB("input", "15");

//Functions
function parseInput(data: string): IngridentList {
	const ingridents: IngridentList = {};

	for (let line of data.split("\r\n")) {
		const [ingrident, traits] = line.split(":");

		for (let trait of traits.split(",")) {
			const [key, value] = trait.trim().split(" ");

			ingridents[ingrident] = {
				...(ingridents[ingrident] ?? []),
				[key]: +value,
			};
		}
	}

	return ingridents;
}
function getScore(
	ingridents: string[],
	ratio: number[],
	ingridentList: IngridentList,
	calorieCount: boolean
) {
	const traitValues: Record<string, number> = {};

	for (let [index, ingrident] of ingridents.entries()) {
		const amount = ratio[index];

		for (let [key, value] of Object.entries(ingridentList[ingrident])) {
			traitValues[key]
				? (traitValues[key] += amount * value)
				: (traitValues[key] = amount * value);
		}
	}

	const score = Object.entries(traitValues).reduce((acc, [trait, value]) => {
		if (trait === "calories") return acc;
		return acc * Math.max(0, value);
	}, 1);

	if (calorieCount) {
		return traitValues["calories"] === 500 ? score : 0;
	} else {
		return score;
	}
}
function DFS(ingridentList: IngridentList, calorieCount: boolean = false) {
	const ingridents = Object.keys(ingridentList);
	const ratio = Array(ingridents.length).fill(0);
	const stack: Recipe[] = [{ amount: 0, ratio }];
	const seen: Set<string> = new Set();

	let bestScore = 0;

	while (stack.length) {
		const current = stack.pop()!;

		if (current.amount === 100) {
			const currentScore = getScore(
				ingridents,
				current.ratio,
				ingridentList,
				calorieCount
			);
			bestScore = Math.max(bestScore, currentScore);
			continue;
		}

		for (let i = 0; i < ratio.length; i++) {
			const newRatio = current.ratio.slice();

			newRatio[i]++;

			if (seen.has(JSON.stringify(newRatio))) {
				continue;
			} else {
				seen.add(JSON.stringify(newRatio));

				stack.push({
					amount: current.amount + 1,
					ratio: newRatio,
				});
			}
		}
	}

	return bestScore;
}
