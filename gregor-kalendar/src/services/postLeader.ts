import { PostLeaderRequest, PostLeaderResponse } from "../types/apiTypes";

export const postLeader = async (leaderInfo: PostLeaderRequest): Promise<PostLeaderResponse> => {
    const response = await fetch('/api/team/leader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leaderInfo),
    });

    if (!response.ok) {
        throw new Error('Failed to add new leader');
    }

    return response.json();
}