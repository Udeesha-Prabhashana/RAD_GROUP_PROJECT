import axios from 'axios';

const UpdateRoom = async (updatedRow) => {
    try {
      const response = await axios.put(
        `http://localhost:8880/api/room/${updatedRow._id}`, 
        updatedRow, 
      );
      console.log('Room updated:', response.data);
      return response;
    } catch (error) {
      console.error('Error updating room:', error);
      throw error; 
    }
};

export default UpdateRoom;