import axios from 'axios';

const DeleteRoom = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8880/api/room/${id}`, 
      );
      console.log('room deleted:', response.data);
      return response;
    } catch (error) {
      console.error('Error deleting room:', error);
      throw error; 
    }
};

export default DeleteRoom;