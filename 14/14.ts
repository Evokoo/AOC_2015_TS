// Imports
import TOOLS from "../00/tools";

type Stats = {
	speed: number;
	active: number;
	rest: number;
	distance: number;
	points: number;
};
interface Reindeers {
	[name: string]: Stats;
}

//Solutions
export function solveA(fileName: string, day: string, time: number): number {
	const data = TOOLS.readData(fileName, day),
		reindeer = parseInput(data),
		distance = raceReindeer(reindeer, time, "distance");

	return distance;
}
export function solveB(fileName: string, day: string, time: number): number {
	const data = TOOLS.readData(fileName, day),
		reindeer = parseInput(data),
		points = raceReindeer(reindeer, time, "points");

	return points;
}

//Run
solveB("example_b", "14", 1000);

//Functions
function parseInput(data: string) {
	const reindeer: Reindeers = {};

	for (let line of data.split("\r\n")) {
		const details = line.split(" ");

		reindeer[details[0]] = {
			speed: +details[3],
			active: +details[6],
			rest: +details[13],
			distance: 0,
			points: 0,
		};
	}

	return reindeer;
}
function getLeaders(reindeer: Reindeers) {
	const racers = Object.entries(reindeer),
		bestDistance = Math.max(...racers.map(([_, stats]) => stats.distance));

	return racers
		.filter(([_, stats]) => stats.distance === bestDistance)
		.map(([name, _]) => name);
}
function getResult(reindeer: Reindeers, result: string) {
	const racers = Object.values(reindeer);

	switch (result) {
		case "distance":
			return racers.sort((a, b) => b.distance - a.distance)[0].distance;
		case "points":
			return racers.sort((a, b) => b.points - a.points)[0].points;
		default:
			throw Error("Invalid result type");
	}
}
function raceReindeer(reindeers: Reindeers, time: number, resultType: string) {
	const racers: Reindeers = JSON.parse(JSON.stringify(reindeers));

	for (let second = 0; second < time; second++) {
		for (let name of Object.keys(racers)) {
			const { speed, active, rest } = racers[name];

			if (active === 0 && rest === 0) {
				racers[name].active = reindeers[name].active - 1;
				racers[name].distance += speed;
				racers[name].rest = reindeers[name].rest;
				continue;
			}

			if (active !== 0) {
				racers[name].distance += speed;
				racers[name].active--;
				continue;
			}

			if (active === 0) {
				racers[name].rest--;
				continue;
			}
		}

		for (let name of getLeaders(racers)) {
			racers[name].points += 1;
		}
	}

	return getResult(racers, resultType);
}
