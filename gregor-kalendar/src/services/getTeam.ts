import { GetTeamResponse } from "../types/apiTypes";

export const getTeam = async (param: {teamId: number, userEmail: string}): Promise<GetTeamResponse> => {
  const {teamId, userEmail} = param
  const response = await fetch(`/api/team?teamId=${teamId}&userEmail=${userEmail}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch team info: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
