import axios from 'axios';
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getMemberTeams = async () => {
  try {
    const response = await axios.get(`${VITE_API_BASE_URL}/member/team`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// export const postData = async (data: unknown) => {
//   try {
//     const response = await axios.post(`${VITE_API_BASE_URL}/data`, { data });
//     return response.data;
//   } catch (error) {
//     console.error('Error posting data:', error);
//     throw error;
//   }
// };
