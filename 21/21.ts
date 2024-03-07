// Imports
import TOOLS from "../00/tools";

//Types & Interface
type Boss = {
	HP: number;
	attack: number;
	defense: number;
};
type Player = Boss & {
	weapon: string | undefined;
	armor: string | undefined;
	ring1: string | undefined;
	ring2: string | undefined;
	gold: number;
};

type Attributes = { [attribute: string]: number };
type Selection = { [item: string]: Attributes };
interface Shop {
	[category: string]: Selection;
}

//Solutions
export function solveA(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		shop = getItems(),
		{ player, boss } = initCharacters(data, 100);

	return DFS(shop, player, boss);
}
export function solveB(fileName: string, day: string): number {
	const data = TOOLS.readData(fileName, day),
		shop = getItems(),
		{ player, boss } = initCharacters(data, 100);

	return DFS(shop, player, boss, true);
}

//Run
solveB("input", "21");

//Functions
function getItems() {
	const shop: Shop = {};
	const categories = TOOLS.readData("items", "21").split(/\r\n\r\n/);

	for (let category of categories) {
		const items = category.split("\r\n"),
			categoryTitle = items.shift()!.match(/\w+/)![0].toLowerCase(),
			selection: Selection = {};

		if (categoryTitle === "armor" || categoryTitle === "rings") {
			selection["None"] = { price: 0, attack: 0, defense: 0 };
		}

		for (let item of items) {
			const [itemName, cost, damage, armor] = item.match(/(\w+(\s\+\d)*)/g)!;
			selection[itemName] = { price: +cost, attack: +damage, defense: +armor };
		}

		shop[categoryTitle] = selection;
	}

	return shop;
}
function initCharacters(bossData: string, playerHealth: number) {
	const [bossHP, bossAttack, bossDefense] = bossData
		.split("\r\n")
		.map((stat) => +stat.match(/\d+/)!);

	const boss: Boss = {
		HP: bossHP,
		attack: bossAttack,
		defense: bossDefense,
	};

	const player: Player = {
		HP: playerHealth,
		attack: 0,
		defense: 0,
		weapon: undefined,
		armor: undefined,
		ring1: undefined,
		ring2: undefined,
		gold: 0,
	};

	return { player, boss };
}
function winner(player: Boss, boss: Boss): boolean {
	const playerDamage = Math.max(player.attack - boss.defense, 1);
	const bossDamage = Math.max(boss.attack - player.defense, 1);

	let playerHP = player.HP;
	let bossHP = boss.HP;

	while (true) {
		bossHP -= playerDamage;
		if (bossHP <= 0) return true;
		playerHP -= bossDamage;
		if (playerHP <= 0) return false;
	}
}
function DFS(shop: Shop, player: Player, boss: Boss, partB: boolean = false) {
	const stack: Player[] = [];

	for (let [weapon, stats] of Object.entries(shop.weapons)) {
		stack.push({
			...player,
			attack: player.attack + stats.attack,
			defense: player.defense + stats.defense,
			weapon: weapon,
			gold: player.gold - stats.price,
		});
	}

	let minGold = Infinity,
		maxGold = -Infinity;

	while (stack.length) {
		const currentPlayer = stack.pop()!;
		const isWinner = winner(currentPlayer, boss);

		if (isWinner) {
			minGold = Math.min(minGold, currentPlayer.gold * -1);
			continue;
		} else {
			maxGold = Math.max(maxGold, currentPlayer.gold * -1);
		}

		if (!currentPlayer.armor) {
			for (let [armor, stats] of Object.entries(shop.armor)) {
				stack.push({
					...currentPlayer,
					attack: currentPlayer.attack + stats.attack,
					defense: currentPlayer.defense + stats.defense,
					armor: armor,
					gold: currentPlayer.gold - stats.price,
				});
			}
			continue;
		}
		if (!currentPlayer.ring1) {
			for (let [ring, stats] of Object.entries(shop.rings)) {
				stack.push({
					...currentPlayer,
					attack: currentPlayer.attack + stats.attack,
					defense: currentPlayer.defense + stats.defense,
					ring1: ring,
					gold: currentPlayer.gold - stats.price,
				});
			}
			continue;
		}
		if (!currentPlayer.ring2) {
			for (let [ring, stats] of Object.entries(shop.rings)) {
				if (ring === currentPlayer.ring1 && currentPlayer.ring1 !== "None") {
					continue;
				} else {
					stack.push({
						...currentPlayer,
						attack: currentPlayer.attack + stats.attack,
						defense: currentPlayer.defense + stats.defense,
						ring2: ring,
						gold: currentPlayer.gold - stats.price,
					});
				}
			}
			continue;
		}
	}

	return partB ? maxGold : minGold;
}
