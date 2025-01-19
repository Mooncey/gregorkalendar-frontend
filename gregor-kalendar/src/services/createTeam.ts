import { CreateTeamRequest, CreateTeamResponse } from "../types/apiTypes";

export const createTeam = async (newTeamInfo: CreateTeamRequest): Promise<CreateTeamResponse> => {
    const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTeamInfo),
    });

    if (!response.ok) {
        throw new Error('Failed to create a new team');
    }

    return response.json();
}