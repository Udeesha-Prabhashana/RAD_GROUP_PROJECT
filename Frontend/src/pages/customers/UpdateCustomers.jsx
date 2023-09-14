import axios from 'axios';

const UpdateCustomer = async (updatedRow) => {
    try {
        const response = await axios.put(
            `http://localhost:8880/api/customer/${updatedRow._id}`, 
            updatedRow, {
                withCredentials: true
            }
        );
        console.log('Customer updated:', response.data);
        return response;
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error; 
    }
};

export default UpdateCustomer;