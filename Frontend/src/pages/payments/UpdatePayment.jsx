import axios from 'axios';

const UpdatePayment = async (updatedRow) => {
    try {
        const response = await axios.put(
            `http://localhost:8880/api/payment/${updatedRow._id}`, 
            updatedRow, {
                withCredentials: true
            }
        );
        console.log('Payment updated:', response.data);
        return response;
    } catch (error) {
        console.error('Error updating payment:', error);
        throw error; 
    }
};

export default UpdatePayment;