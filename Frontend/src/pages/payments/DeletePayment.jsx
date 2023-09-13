import axios from 'axios';

const DeletePayment = async (id) => {
    try {
        const response = await axios.delete(
            `http://localhost:8880/api/payment/${ id }`, {
                withCredentials: true
            }
        );
        console.log('Payment deleted:', response.data);
        return response;
    } catch (error) {
        console.error('Error deleting payment:', error);
        throw error;
    }
};

export default DeletePayment;