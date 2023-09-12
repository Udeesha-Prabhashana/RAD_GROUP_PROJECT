import axios from 'axios';

const DeleteCustomer = async (id) => {
    try {
        const response = await axios.delete(
            `http://localhost:8880/api/customer/${ id }`, {
                withCredentials: true
            }
        );
        console.log('Booking deleted:', response.data);
        return response;
    } catch (error) {
        console.error('Error deleting booking:', error);
        throw error;
    }
};

export default DeleteCustomer;