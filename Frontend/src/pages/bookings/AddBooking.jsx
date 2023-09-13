import axios from 'axios';

const AddBooking = async (newRow) => {
    try {
        const response = await axios.post (
            'http://localhost:8880/api/booking',
          newRow, {
              withCredentials: true
            }
           
          );
          if (response.status === 401) {
            throw new Error('Unauthorized: Credentials are incorrect or not provided');
          }
      console.log('Booking added:', response.data)
      return response.data

    } catch (error) {
      console.error('Error adding room:', error);
    }
    
  };

  
export default AddBooking;
  