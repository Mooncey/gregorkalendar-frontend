import { GenerateScheduleRequest, GenerateScheduleResponse } from "../types/apiTypes";

export const putSchedule = async (teamId: GenerateScheduleRequest): Promise<GenerateScheduleResponse> => {
    const response = await fetch('/api/schedule', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamId),
    });

    if (!response.ok) {
        throw new Error('Failed to generate schedule');
    }

    return response.json();
}