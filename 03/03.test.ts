import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./03";

const currentDay = path.basename(__dirname);

describe(`AOC 2015 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(2);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe(2572);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay)).toBe(11);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe(2631);
		});
	});
});
