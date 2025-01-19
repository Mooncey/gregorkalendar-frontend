// Block represents a 0-based 15-minute interval of time.
// will be used for display
// CONSTRAINT: Block is an integer in the range [0, 671].
export type Block = number; // Ensure runtime validation to enforce the constraint.
export const B0 = 0; // [["Sunday", “00:00”], ["Sunday", “00:15”]]
export const B95 = 95; // [["Sunday", “23:45”], ["Monday", “00:00”]]
export const B96 = 96; // [["Monday", “00:00”], ["Monday", “00:15”]]
export const B671 = 671 // [["Saturday", “23:45”], ["Sunday", “00:00”]]

// TimeString is a representation of time in String format
// will be used for String display
export type TimeString = [

	dayOfWeek: string, // name of the day of the week.

	time: string // in hours and minutes. NOT indicative of start time or end time, just a singular time.

]
export const TS0: TimeString = ["Sunday", "00:00"];
export const TS1: TimeString = ["Monday", "13:15"];

// MemberAvailability represents a user's email and the blocks they are available for.
// CONSTAINT: Blocks in availableBlocks are NOT in preferNotBlocks and vice versa (mutually exclusive)
export interface MemberAvailability {

  userEmail: string; // The email of the member

  availableBlocks: Block[]; // A list of blocks the user is available for

  preferNotBlocks: Block[]; // A list of blocks a user would prefer not to be scheduled for, but is available
}

// TeamMemberAvailability represents the availability of all members in a team.
export interface TeamMemberAvailability {

  teamId: number; // The ID of the team

  memberAvailabilities: MemberAvailability[]; // A list of member availabilities

}

// A slot of [startTime, endTime]
export interface Slot {
	
	name: string; // name of the slot e.g. "L1A"

	slotId: number; // ID of slot

	numMembers: number; // desired number of people for a slot

	startBlock: Block; // starting time of slot

	endBlock: Block; // ending time of slot

}

// All slots created for a team
export interface TeamSlots {

	slots: Slot[]; // can't present array as a final JSON product which is why we package it into teamslots

}

export interface User {

	name: string;

	email: string; // no user can have the same email. email cannot be modified.

}

// a given slot and the member(s) assigned to that slot
export interface SlotAssignment {

	slot: Slot;

	members: User[];

}

// team schedule that displays entire list of assigned slots (members assigned to slots)
export interface TeamSchedule {

	slotAssignments: SlotAssignment[];

}