import { Block, TimeString } from '../types/types';

// Ensures that a Block is only ever in range [0, 671]
function isValidBlock(block: Block): boolean {
	return Number.isInteger(block) && block >= 0 && block <= 671;
}
  

function blockToTime(block: Block): [TimeString, TimeString] {
	if (!isValidBlock(block)) {
		throw new Error("Invalid block, make sure block is both integer and within [0, 671]");
	}

	const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	const dayIndex = Math.floor(block / 96); // 96 blocks per day
	const day = days[dayIndex];

	const minutesSinceStartOfDay = (block % 96) * 15;
	const hours = Math.floor(minutesSinceStartOfDay / 60);
	const minutes = minutesSinceStartOfDay % 60;

	const startTime: TimeString = [day, `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`];

	let endDayIndex = dayIndex;
	let endMinutes = minutes + 15;
	let endHours = hours;

	if (endMinutes === 60) {
		endMinutes = 0;
		endHours++;
	}
	if (endHours === 24) {
		endHours = 0;
		endDayIndex = (endDayIndex + 1) % 7;
	}

	const endDay = days[endDayIndex];
	const endTime: TimeString = [endDay, `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`];

	return [startTime, endTime];
}

function rangeToBlocks(startBlock: Block, endBlock: Block): Block[] {
if (!isValidBlock(startBlock) || !isValidBlock(endBlock)) {
	throw new Error("Block range is out of bounds and/or not an integer block");
}
if (startBlock > endBlock) {
	throw new Error("Start block must be less than or equal to end block");
}

const blocks: Block[] = [];
for (let i = startBlock; i <= endBlock; i++) {
	blocks.push(i);
}
return blocks;
}
  
function rangeToTime(startBlock: Block, endBlock: Block): [TimeString, TimeString] {
const blocks = rangeToBlocks(startBlock, endBlock);

const firstBlock = blocks[0];
const lastBlock = blocks[blocks.length - 1];

const [startTime] = blockToTime(firstBlock); // Start time from the first block
const [, endTime] = blockToTime(lastBlock); // End time from the last block

return [startTime, endTime];
}
  
// Tests
console.log(isValidBlock(0));   // true
console.log(isValidBlock(672)); // false

console.log(blockToTime(0)); // [["Monday", "00:00"], ["Monday", "00:15"]]
console.log(blockToTime(95)); // [["Monday", "23:45"], ["Tuesday", "00:00"]]

console.log(rangeToBlocks(0, 5)); // [0, 1, 2, 3, 4, 5]
console.log(rangeToBlocks(94, 96)); // [94, 95, 96]

console.log(rangeToTime(0, 95)); // [["Monday", "00:00"], ["Tuesday", "00:00"]]
console.log(rangeToTime(94, 96)); // [["Monday", "23:30"], ["Tuesday", "00:15"]]
