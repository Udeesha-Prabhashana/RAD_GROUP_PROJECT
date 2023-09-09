import axios from 'axios';

const UpdateFood = async (updatedRow) => {
    try {
      const response = await axios.put(
        `http://localhost:8880/api/food/${updatedRow._id}`, 
        updatedRow, {
          withCredentials: true
        } 
      );
      console.log('Food updated:', response.data);
      return response;
    } catch (error) {
      console.error('Error updating Food:', error);
      throw error; 
    }
};

export default UpdateFood;