// Imports
import TOOLS from "../00/tools";

type Recipe = { [key: string]: number };
type Ingrident = {
	capacity: number;
	durability: number;
	flavour: number;
	texture: number;
	calories: number;
};

interface IngridentList {
	[key: string]: Ingrident;
}

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		ingridentList = parseInput(data),
		cookieScore = hillClimbing(ingridentList, 100);

	console.log(cookieScore);

	return cookieScore;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("input", "15");

//Functions
function parseInput(data: string): IngridentList {
	const ingridents: IngridentList = {};

	for (let line of data.split("\r\n")) {
		const details = line.split(" ");

		const ingrident = details[0].slice(0, -1),
			capacity = +details[2].slice(0, -1),
			durability = +details[4].slice(0, -1),
			flavour = +details[6].slice(0, -1),
			texture = +details[8].slice(0, -1),
			calories = +details[10];

		ingridents[ingrident] = {
			capacity,
			durability,
			flavour,
			texture,
			calories,
		};
	}

	return ingridents;
}

function initRecipe(ingridents: string[], quantity: number) {
	const recipe: Record<string, number> = {};

	let max = quantity;

	for (let ingrident of ingridents) {
		let amount = ~~(Math.random() * max);
		max -= amount;

		recipe[ingrident] = amount;
	}

	return recipe;
}
function recipeScore(recipe: Recipe, ingridentList: IngridentList) {
	const traitValues: Record<string, number> = {};

	for (let [ingrident, quantity] of Object.entries(recipe)) {
		for (let [trait, value] of Object.entries(ingridentList[ingrident])) {
			traitValues[trait]
				? (traitValues[trait] += quantity * value)
				: (traitValues[trait] = quantity * value);
		}
	}

	const score = Object.entries(traitValues).reduce((acc, [trait, value]) => {
		if (trait === "calories") return acc;
		return acc * Math.max(0, value);
	}, 1);

	return score;
}
function hillClimbing(ingridentList: IngridentList, quantity: number) {
	const ingridents = Object.keys(ingridentList);

	let maxScore = 0;

	for (let run = 0; run < 1000; run++) {
		let recipe = initRecipe(ingridents, quantity);
		let currentScore = recipeScore(recipe, ingridentList);
		let restartOdd = 0.1;

		for (let i = 0; i < 1000; i++) {
			const randomIngrident = ingridents[~~(Math.random() * ingridents.length)];
			const quantity = Object.values(recipe).reduce((acc, cur) => acc + cur, 0);

			const delta = Math.round(
				quantity >= 100
					? Math.random() * -10
					: Math.random() * Math.min(10, 100 - quantity)
			);

			recipe[randomIngrident] += delta;

			const newScore = recipeScore(recipe, ingridentList);

			if (newScore > currentScore || Math.random() < 0.01) {
				currentScore = newScore;
			} else {
				recipe[randomIngrident] -= delta;
			}
		}

		maxScore = Math.max(maxScore, currentScore);
	}

	return maxScore;
}

//hill climbing algorithm
