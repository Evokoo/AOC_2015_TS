// Imports
import TOOLS from "../00/tools";

//Types & Interface
type Boss = { HP: number; attack: number };
type Wizard = Boss & {
	mana: number;
	manaSpent: number;
	defense: number;
	effects: { [spell: string]: number };
};
type Spells = { [name: string]: number };
interface Battle {
	player: Wizard;
	boss: Boss;
	playerPhase: boolean;
}

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		minCost = DFS();

	return minCost;
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		minCost = aStar();

	console.log(minCost);

	return minCost;
}

//Run
solveB("input", "22");

//Functions
function initCharacter<T>(type: string): T {
	if (type === "Boss") {
		return { HP: 55, attack: 8 } as T;
	}
	if (type === "Wizard") {
		return {
			HP: 50,
			mana: 500,
			manaSpent: 0,
			defense: 0,
			effects: {
				shield: 0,
				poison: 0,
				recharge: 0,
			},
		} as T;
	}

	throw Error("Invalid character type");
}
function getSpells(): { spells: Spells; spellNames: string[] } {
	const spells = {
		missile: 53,
		drain: 73,
		shield: 113,
		poison: 173,
		recharge: 229,
	};

	return { spells, spellNames: Object.keys(spells) };
}
function DFS(hardMode: boolean = false) {
	const { spells, spellNames } = getSpells();
	const stack: Battle[] = [
		{
			player: initCharacter<Wizard>("Wizard"),
			boss: initCharacter<Boss>("Boss"),
			playerPhase: true,
		},
	];

	let manaCost = Infinity;

	while (stack.length) {
		const { player, boss, playerPhase } = stack.pop()!;

		if (hardMode) {
			if (playerPhase) {
				player.HP--;
			}

			if (player.HP <= 0) {
				continue;
			}
		}

		for (let [effect, turns] of Object.entries(player.effects)) {
			if (turns > 0) {
				switch (effect) {
					case "shield":
						player.defense = 7;
						break;
					case "poison":
						boss.HP -= 3;
						break;
					case "recharge":
						player.mana += 101;
						break;
					default:
						throw Error("Invalid Effect");
				}
			}

			player.effects[effect] = Math.max(0, turns - 1);
		}

		if (boss.HP <= 0) {
			manaCost = Math.min(manaCost, player.manaSpent);
			continue;
		}

		if (!playerPhase) {
			const bossDamage = Math.max(1, boss.attack - player.defense);

			if (player.HP - bossDamage <= 0) {
				continue;
			} else {
				player.HP -= bossDamage;
				stack.push({
					player,
					boss,
					playerPhase: !playerPhase,
				});

				continue;
			}
		}

		for (let spell of spellNames) {
			if (
				player.manaSpent + spells[spell] >= manaCost ||
				player.mana < spells[spell] ||
				player.effects[spell] > 0
			) {
				continue;
			}

			const nextPlayer: Wizard = structuredClone(player);
			const nextBoss: Boss = structuredClone(boss);

			nextPlayer.mana -= spells[spell];
			nextPlayer.manaSpent += spells[spell];

			switch (spell) {
				case "missile":
					nextBoss.HP -= 4;
					break;
				case "drain":
					nextPlayer.HP += 2;
					nextBoss.HP -= 2;
					break;
				case "shield":
					nextPlayer.effects.shield = 6;
					break;
				case "poison":
					nextPlayer.effects.poison = 6;
					break;
				case "recharge":
					nextPlayer.effects.recharge = 5;
					break;
				default:
					throw Error("Invalid Spell");
			}

			stack.push({
				player: nextPlayer,
				boss: nextBoss,
				playerPhase: !playerPhase,
			});
		}
	}

	return manaCost;
}

interface BattleState {
	player: Wizard;
	boss: Boss;
	playerPhase: boolean;
	gCost: number;
	hCost: number;
	fCost: number;
	spellsUsed: string[];
}

function aStar(hardMode: boolean = true): number {
	const { spells, spellNames } = getSpells();
	const stack: BattleState[] = [
		{
			player: initCharacter<Wizard>("Wizard"),
			boss: initCharacter<Boss>("Boss"),
			playerPhase: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
			spellsUsed: [],
		},
	];

	let minCost = Infinity;

	while (stack.length) {
		const battleState = stack.shift()!,
			{ player, boss, playerPhase } = battleState;

		if (hardMode && playerPhase) {
			player.HP--;

			if (player.HP <= 0) {
				continue;
			}
		}

		for (let [effect, turns] of Object.entries(player.effects)) {
			if (turns > 0) {
				switch (effect) {
					case "shield":
						player.defense = 7;
						break;
					case "poison":
						boss.HP -= 3;
						break;
					case "recharge":
						player.mana += 101;
						break;
					default:
						throw Error("Invalid Effect");
				}
			}
			player.effects[effect] = Math.max(0, turns - 1);
		}

		if (boss.HP <= 0) {
			minCost = Math.min(minCost, battleState.gCost);
			continue;
		}

		if (!playerPhase) {
			const bossDamage = Math.max(1, boss.attack - player.defense);

			if (player.HP - bossDamage <= 0) {
				continue;
			} else {
				player.HP -= bossDamage;
				stack.push({
					player,
					boss,
					playerPhase: !playerPhase,
					gCost: battleState.gCost,
					hCost: battleState.hCost,
					fCost: battleState.fCost,
					spellsUsed: battleState.spellsUsed,
				});
				continue;
			}
		}

		for (let spell of spellNames) {
			if (
				player.manaSpent + spells[spell] >= minCost ||
				player.mana < spells[spell] ||
				player.effects[spell] > 0
			) {
				continue;
			}

			const nextPlayer: Wizard = structuredClone(player);
			const nextBoss: Boss = structuredClone(boss);
			const usedSpells = [...battleState.spellsUsed];

			nextPlayer.mana -= spells[spell];
			nextPlayer.manaSpent += spells[spell];
			usedSpells.push(spell);

			let bonus = 0;

			switch (spell) {
				case "missile":
					bonus = 4;
					nextBoss.HP -= 4;
					break;
				case "drain":
					bonus = 2;
					nextPlayer.HP += 2;
					nextBoss.HP -= 2;
					break;
				case "shield":
					bonus = 10;
					nextPlayer.effects.shield = 6;
					break;
				case "poison":
					bonus = 15;
					nextPlayer.effects.poison = 6;
					break;
				case "recharge":
					bonus = 20;
					nextPlayer.effects.recharge = 5;
					break;
				default:
					throw Error("Invalid Spell");
			}

			if (nextPlayer.manaSpent >= minCost) {
				continue;
			}

			const gCost = nextPlayer.manaSpent,
				hCost = nextBoss.HP - spells[spell],
				fCost = gCost + hCost;

			stack.push({
				player: nextPlayer,
				boss: nextBoss,
				playerPhase: !playerPhase,
				gCost,
				hCost,
				fCost,
				spellsUsed: usedSpells,
			});
		}

		// console.log(minCost);
		stack.sort((a, b) => b.boss.HP - b.boss.HP);
	}

	// console.log(stack);

	return minCost;
}
