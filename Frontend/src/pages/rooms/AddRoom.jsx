import axios from 'axios';

const AddRoom = async (newRow) => {
    try {
        const response = await axios.post (
            'http://localhost:8880/api/room',
            newRow, {
              withCredentials: true
            }
           
          );
      console.log('Room added:', response.data)
      return response.data

    } catch (error) {
      console.error('Error adding room:', error);
    }
    
  };

  
export default AddRoom;
  