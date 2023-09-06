import axios from 'axios';

const DeleteBooking = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8880/api/booking/${id}`, 
      );
      console.log('Booking deleted:', response.data);
      return response;
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error; 
    }
};

export default DeleteBooking;