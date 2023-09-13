import axios from 'axios';

const AddCustomer = async (newRow) => {
    try {
        const response = await axios.post (
            'http://localhost:8880/api/customer',
            newRow, {
            withCredentials: true
            }
           
          );
      console.log('Booking added:', response.data)
      return response.data

    } catch (error) {
        console.error('Error adding room:', error);
    }
    
};

  
export default AddCustomer;
  