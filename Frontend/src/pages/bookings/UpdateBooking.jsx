import axios from 'axios';

const UpdateBooking = async (updatedRow) => {
    try {
      const response = await axios.put(
        `http://localhost:8880/api/booking/${updatedRow._id}`, 
        updatedRow, 
      );
      console.log('Booking updated:', response.data);
      return response;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error; 
    }
};

export default UpdateBooking;