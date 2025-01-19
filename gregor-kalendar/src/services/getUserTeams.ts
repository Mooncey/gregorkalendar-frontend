import { GetUserTeamsResponse } from "../types/apiTypes";

export const getUserTeams = async (): Promise<GetUserTeamsResponse> => {
  const response = await fetch(`/api/member/team`);

  if (!response.ok) {
    throw new Error(`Failed to fetch user teams: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
