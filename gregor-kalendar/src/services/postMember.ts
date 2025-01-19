import { PostMemberRequest, PostMemberResponse } from "../types/apiTypes";

export const postMember = async (memberInfo: PostMemberRequest): Promise<PostMemberResponse> => {
    const response = await fetch('/api/team/member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberInfo),
    });

    if (!response.ok) {
        throw new Error('Failed to add new member');
    }

    return response.json();
}