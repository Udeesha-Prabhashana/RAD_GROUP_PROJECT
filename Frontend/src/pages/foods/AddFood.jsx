import axios from 'axios';

const AddFood = async (newRow) => {
    try {
        const response = await axios.post (
            'http://localhost:8880/api/food',
          newRow, {
              withCredentials: true
            }
           
          );
      console.log('Food added:', response.data)
      return response.data

    } catch (error) {
      console.error('Error adding Food:', error);
    }
    
  };

  
export default AddFood;
  