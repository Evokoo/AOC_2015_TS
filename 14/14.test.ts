import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./14";

const currentDay = path.basename(__dirname);

describe(`AOC 2023 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay, 1000)).toBe(1120);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay, 2503)).toBe(2640);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay, 1000)).toBe(689);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay, 2503)).toBe(1102);
		});
	});
});
