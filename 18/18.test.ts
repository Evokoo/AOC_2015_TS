import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./18";

const currentDay = path.basename(__dirname);

describe(`AOC 2023 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay, 4)).toBe(4);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay, 100)).toBe(1061);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay, 5)).toBe(17);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay, 100)).toBe(1006);
		});
	});
});
