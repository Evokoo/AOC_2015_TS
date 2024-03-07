// Imports
import TOOLS from "../00/tools";

//Types & Interface
type LocationMap = Record<string, Record<string, number>>;

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ locations, locationMap } = parseInput(data),
		shortedTrip = DFS(locations, locationMap);

	return shortedTrip;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		{ locations, locationMap } = parseInput(data),
		longestTrip = DFS(locations, locationMap, true);

	return longestTrip;
}

//Run
solveB("input", "09");

//Functions
function parseInput(data: string) {
	const locations: Set<string> = new Set(),
		locationMap: LocationMap = {};

	for (let line of data.split("\r\n")) {
		const details = line.split(" ");
		locations.add(details[0]);
		locations.add(details[2]);

		locationMap[details[0]] = {
			...(locationMap[details[0]] ?? {}),
			[details[2]]: +details[4],
		};

		locationMap[details[2]] = {
			...(locationMap[details[2]] ?? {}),
			[details[0]]: +details[4],
		};
	}

	return { locations, locationMap };
}
function DFS(
	locations: Set<string>,
	locationMap: LocationMap,
	longest: boolean = false
) {
	const queue = [...locations].map((location) => {
		return {
			location: location,
			visited: new Set().add(location),
			distance: 0,
		};
	});

	const trips = [];

	while (queue.length) {
		const currentTrip = queue.pop()!;

		if (currentTrip.visited.size === locations.size) {
			trips.push(currentTrip.distance);
		} else {
			const destinations = locationMap[currentTrip.location];

			for (let destination of Object.keys(destinations)) {
				if (currentTrip.visited.has(destination)) {
					continue;
				}

				const newTrip = {
					location: destination,
					visited: new Set([...currentTrip.visited]).add(destination),
					distance: currentTrip.distance + destinations[destination],
				};

				queue.push(newTrip);
			}
		}
	}

	return longest ? Math.max(...trips) : Math.min(...trips);
}
