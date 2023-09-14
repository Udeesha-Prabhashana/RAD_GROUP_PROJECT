import axios from 'axios';

const FetchNICByCustomerId = async (customerId) => {
  try {
    const response = await axios.get(`http://localhost:8880/api/customer/nic/${customerId}`);

    if (response.status !== 200) {
      throw new Error('Failed to fetch NIC by customer ID');
    }

    return response.data; // Assuming that the NIC is returned in the response
  } catch (error) {
    console.error('Error fetching NIC by customer ID:', error);
    return ''; // Return an empty string or handle the error as needed
  }
};

export default FetchNICByCustomerId;