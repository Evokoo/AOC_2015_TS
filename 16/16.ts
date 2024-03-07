// Imports
import TOOLS from "../00/tools";

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		sueList = parseInput(data),
		sueID = filterList(sueList);

	return 0;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day);
	return 0;
}

//Run
solveA("input", "16");

type Sue = {
	[key: string]: number;
};

//Functions
function newSue(): Sue {
	return {
		ID: 0,
		children: 0,
		cats: 0,
		samoyeds: 0,
		pomeranians: 0,
		akitas: 0,
		vizslas: 0,
		goldfish: 0,
		trees: 0,
		cars: 0,
		perfumes: 0,
	};
}
function getCriteria() {
	const data = TOOLS.readData("criteria", "16"),
		criteria: Record<string, number> = {};

	for (let line of data.split("\r\n")) {
		const [key, value] = line.split(":");
		criteria[key] = +value;
	}

	return criteria;
}
function parseInput(data: string): Sue[] {
	const sueList: Sue[] = [];

	for (let line of data.split("\r\n")) {
		const sue = newSue(),
			ID = line.match(/\d+/)![0],
			keyPairs = line.match(/(\w+):\s(\d+)/g)!;

		for (let pair of keyPairs) {
			const [key, value] = pair.split(":");
			sue[key] = +value;
		}

		sue["ID"] = +ID;
		sueList.push(sue);
	}

	return sueList;
}

function filterList(sueList: Sue[]) {
	const criteria = Object.entries(getCriteria());

	for (let [key, value] of criteria) {
		sueList = sueList.filter((sue) => {
			if (key === "cats" || key === "trees") {
				return sue[key] > value || sue[key] === 0;
			}

			if (key === "pomeranians" || key === "goldfish") {
				return sue[key] < value || sue[key] === 0;
			}

			return sue[key] === value;
		});
	}

	console.log(sueList);
}
