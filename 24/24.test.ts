import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./24";

const currentDay = path.basename(__dirname);

describe(`AOC 2023 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay, 3)).toBe(99);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay, 3)).toBe(10723906903);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay, 4)).toBe(44);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay, 4)).toBe(74850409);
		});
	});
});
