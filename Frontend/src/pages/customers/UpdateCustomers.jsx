import axios from 'axios';

const UpdateCustomer = async (updatedRow) => {
    try {
        const response = await axios.put(
            `http://localhost:8880/api/customer/${updatedRow._id}`, 
            updatedRow, {
                withCredentials: true
            }
        );
        console.log('Booking updated:', response.data);
        return response;
    } catch (error) {
        console.error('Error updating booking:', error);
        throw error; 
    }
};

export default UpdateCustomer;