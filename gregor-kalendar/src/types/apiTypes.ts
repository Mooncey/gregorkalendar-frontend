import { User, MemberAvailability, TeamSchedule, TeamSlots } from "./types";

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

	schedule: TeamSchedule;
	
	availibility: MemberAvailability;

	slots: TeamSlots;

	teamInfo: TeamInfo;

}