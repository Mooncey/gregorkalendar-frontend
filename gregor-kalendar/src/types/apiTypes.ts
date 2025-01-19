import { User, MemberAvailability, TeamSchedule, TeamSlots, Block, Slot } from "./types";

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

	slots: Slot[];

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

export interface PostLeaderRequest {

	teamId: number;
	
	leader: User;

}

export interface PostLeaderResponse {

	teamId: number;

	leader: User;

}

export interface PostMemberRequest {

	teamId: number;
	
	member: User;

}

export interface PostMemberResponse {

	teamId: number;

	member: User;

}

export interface CreateTeamRequest {

	userEmail: string,

	teamName: string
}

export interface CreateTeamResponse {

	teamId: number

}

export interface GenerateScheduleRequest {
	
	teamId: number

}

export interface GenerateScheduleResponse {

	teamId: number,

	schedule: TeamSchedule

}