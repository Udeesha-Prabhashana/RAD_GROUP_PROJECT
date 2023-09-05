

import axios from 'axios';

const UpdateBooking = async (updatedRow) => {
    try {
      const response = await axios.put(
        `http://localhost:8880/api/booking/${updatedRow._id}`, // Use the booking ID in the URL
        updatedRow, // Send the updated data to the API
      );
      console.log('Booking updated:', response.data);
      return response;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error; // Optionally, rethrow the error for further handling
    }
};

export default UpdateBooking;