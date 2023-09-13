import axios from 'axios';

const AddPayment = async (newRow) => {
    try {
        const response = await axios.post (
            'http://localhost:8880/api/payment',
            newRow, {
            withCredentials: true
            }
           
          );
      console.log('Payment added:', response.data)
      return response.data

    } catch (error) {
        console.error('Error adding payment:', error);
    }
    
};

  
export default AddPayment;
  