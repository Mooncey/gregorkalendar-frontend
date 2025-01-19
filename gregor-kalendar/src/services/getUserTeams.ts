import { GetUserTeamsResponse } from "../types/apiTypes";

export const getUserTeams = async (userEmail: string): Promise<GetUserTeamsResponse> => {

  const response = await fetch(`/api/user/teams?userEmail=${userEmail}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch user teams: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
