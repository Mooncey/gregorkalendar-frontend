import { User, MemberAvailability, TeamSchedule, TeamSlots, Block } from "./types";

export interface UserTeam {

	teamId: number;

	teamName: string;

}

export interface GetUserTeamsResponse {

	teams: UserTeam[];

}

export interface TeamInfo {

	name: string;

	leaders: User[];

	members: User[];

}

export interface GetTeamResponse {

	teamId: number;

	schedule: {
		schedule: TeamSchedule;
		teamId: number
	}
	
	availability: MemberAvailability;

	slots: TeamSlots;

	teamInfo: TeamInfo;

}

export interface PostSlot {
	
	teamId: number;

	name: string;

	numMembers: number;

	startBlock: Block;

	endBlock: Block;
}

export interface SlotResponse {

	teamId: number;

	slots: TeamSlots;

}

export interface ScheduleResponse {

	teamId: number;

	schedule: TeamSchedule;
}

export interface PostTeamMemberAvailabilityRequest {
	
	teamId: number;

	userEmail: string;

	availableBlocks: Block[];

	preferNotBlocks: Block[]

}

export interface PostTeamMemberAvailabilityResponse {
	
	teamId: number;

	userEmail: string;

	availableBlocks: Block[];

	preferNotBlocks: Block[]

}