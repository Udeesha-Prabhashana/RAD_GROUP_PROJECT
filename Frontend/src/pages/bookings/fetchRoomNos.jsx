import axios from 'axios';

const FetchRoomNos = async () => {
  try {
    const response = await axios.get('http://localhost:8880/api/room/getRoomNos');

    if (response.status !== 200) {
      throw new Error('Failed to fetch customer IDs');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching customer IDs:', error);
    return [];
  }
};

export default FetchRoomNos;
