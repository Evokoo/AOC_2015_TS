import path from "path";
import { expect, test, describe } from "vitest";
import { solveA, solveB } from "./15";

const currentDay = path.basename(__dirname);

describe(`AOC 2015 - Day ${currentDay}`, () => {
	describe("Part A", () => {
		test("Example", () => {
			expect(solveA("example_a", currentDay)).toBe(62842880);
		});

		test("Solution", () => {
			expect(solveA("input", currentDay)).toBe(18965440);
		});
	});

	describe("Part B", () => {
		test("Example", () => {
			expect(solveB("example_b", currentDay)).toBe(57600000);
		});

		test("Solution", () => {
			expect(solveB("input", currentDay)).toBe(15862900);
		});
	});
});
