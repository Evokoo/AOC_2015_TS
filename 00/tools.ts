import fs from "fs";
import path from "path";

function readData(fileName: string, day: string) {
	const file = path.resolve(__dirname, `../${day}/${fileName}.txt`);
	return fs.readFileSync(file, "utf8");
}
function gcd(a: number, b: number): number {
	return b === 0 ? a : gcd(b, a % b);
}
function lcm(a: number, b: number): number {
	return (a * b) / gcd(a, b);
}
function arrLCM(arr: number[]): number {
	let result = arr[0];
	for (let i = 1; i < arr.length; i++) {
		result = lcm(result, arr[i]);
	}

	return result;
}
function derangement(n: number): number {
	switch (n) {
		case 1:
			return 0;
		case 2:
			return 1;
		default:
			return (n - 1) * derangement(n - 1) + derangement(n - 2);
	}
}
function generatePermutations(inputString: string): string[] {
	const result: Set<string> = new Set();

	function permute(currentString: string, remainingChars: string) {
		if (remainingChars.length === 0) {
			result.add(currentString);
			return;
		}

		for (let i = 0; i < remainingChars.length; i++) {
			const char = remainingChars[i];
			const newString = currentString + char;
			const newRemainingChars =
				remainingChars.slice(0, i) + remainingChars.slice(i + 1);
			permute(newString, newRemainingChars);
		}
	}

	permute("", inputString);
	return [...result];
}

//Find the area of a ploygon, points must follow each other either clockwise or anti clockwise
//Result may need to be offset
function shoelaceFormula(points: { x: number; y: number }[]): number {
	const n = points.length,
		first = points[0],
		last = points[n - 1];

	let sum: number = 0;

	for (let i = 0; i < n - 1; i++) {
		const a = points[i],
			b = points[i + 1];

		sum += a.x * b.y - b.x * a.y;
	}
	sum += last.x * first.y - first.x * last.y;

	return Math.abs(sum) / 2;
}

export default { readData, arrLCM, derangement, generatePermutations };
