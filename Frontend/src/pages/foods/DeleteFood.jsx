import axios from 'axios';

const DeleteFood = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8880/api/food/${ id }`, {
          withCredentials: true
        }
      );
      console.log('Food deleted:', response.data);
      return response;
    } catch (error) {
      console.error('Error deleting Food:', error);
      throw error; 
    }
};

export default DeleteFood;