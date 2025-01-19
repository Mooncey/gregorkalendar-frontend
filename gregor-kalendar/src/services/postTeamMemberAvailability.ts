import { PostTeamMemberAvailabilityRequest, PostTeamMemberAvailabilityResponse } from "../types/apiTypes";


export const postTeamMemberAvailability = async (updatedAvailability: PostTeamMemberAvailabilityRequest): Promise<PostTeamMemberAvailabilityResponse> => {
    const response = await fetch('/api/team/member/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedAvailability),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update team data');
    }
  
    return response.json(); // Assuming it returns the updated team data
  };
  