import { GetTeamResponse } from "../types/apiTypes";

export const getTeam = async (): Promise<GetTeamResponse> => {
  const response = await fetch(`/api/team`);

  if (!response.ok) {
    throw new Error(`Failed to fetch team info: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
