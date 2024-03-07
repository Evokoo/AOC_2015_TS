import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./17";

const currentDay = path.basename(__dirname);

describe(`AOC 2015 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay, 25)).toBe(4);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay, 150)).toBe(1638);
		});
	});

	// describe("Part B", () => {
	// 	test("Example", () => {
	// 		expect(solveB("example_b", currentDay)).toBe(null);
	// 	});

	// 	test("Solution", () => {
	// 		expect(solveB("input", currentDay)).toBe(null);
	// 	});
	// });
});
