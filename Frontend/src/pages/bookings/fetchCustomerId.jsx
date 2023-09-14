import axios from 'axios';

const FetchCustomerIds = async () => {
  try {
    const response = await axios.get('http://localhost:8880/api/customer/getCustomerIds');

    if (response.status !== 200) {
      throw new Error('Failed to fetch customer IDs');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching customer IDs:', error);
    return [];
  }
};

export default FetchCustomerIds;
