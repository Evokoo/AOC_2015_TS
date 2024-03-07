// Imports
import TOOLS from "../00/tools";

//Types & Interface
type Arrangment = { name: string; happiness: number; seated: Set<string> };

interface Guestlist {
	[name: string]: { [name: string]: number };
}

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		guestlist = parseInput(data),
		optimalSeating = seatGuests(guestlist);

	return optimalSeating;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		guestlist = parseInput(data, "Host"),
		optimalSeating = seatGuests(guestlist);

	return optimalSeating;
}

//Run
solveB("example_b", "13");

//Functions
function parseInput(data: string, addtionalGuest: string = ""): Guestlist {
	const lines = data.split("\r\n"),
		guestlist: Guestlist = {};

	for (let line of lines) {
		const details = line.split(" ");

		const guest = details[0],
			neighbour = details[10].slice(0, -1),
			happiness = details[2] === "lose" ? -+details[3] : +details[3];

		guestlist[guest] = { ...(guestlist[guest] ?? {}), [neighbour]: happiness };
	}

	if (addtionalGuest) {
		const guests = Object.keys(guestlist);

		for (let guest of guests) {
			guestlist[guest] = { ...guestlist[guest], [addtionalGuest]: 0 };
			guestlist[addtionalGuest] = { ...guestlist[addtionalGuest], [guest]: 0 };
		}
	}

	return guestlist;
}
function getHappinessScore(a: string, b: string, guestlist: Guestlist): number {
	return guestlist[a][b] + guestlist[b][a];
}
function seatGuests(guestlist: Guestlist): number {
	const guestNames = Object.keys(guestlist),
		happinessScores = [],
		stack: Arrangment[] = guestNames.map((name) => {
			return { name, happiness: 0, seated: new Set([name]) };
		});

	while (stack.length) {
		const current = stack.pop()!;

		for (let guest of Object.keys(guestlist[current.name])) {
			if (current.seated.has(guest)) continue;

			const pairHappiness = getHappinessScore(current.name, guest, guestlist);

			stack.push({
				name: guest,
				happiness: current.happiness + pairHappiness,
				seated: new Set([...current.seated, guest]),
			});
		}

		if (current.seated.size === guestNames.length) {
			const firstGuest = [...current.seated][0],
				lastPair = getHappinessScore(current.name, firstGuest, guestlist);

			happinessScores.push(current.happiness + lastPair);
		}
	}

	return Math.max(...happinessScores);
}
