import { User } from "../types/types";

export const getUser = async (param: {userEmail: string}): Promise<User> => {
  const { userEmail } = param
  const response = await fetch(`/api/user?&email=${userEmail}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch user info: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
