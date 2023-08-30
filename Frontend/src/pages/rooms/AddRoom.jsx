import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./addroom.scss";

const AddRooms = () => {

    const [userData, setUserData] = useState({
        room_Type: '',
        price: '',
        desc: '',
    });
    
    let navigate = useNavigate();

    const handleChange = (e) => {
        setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));   //example, if the id of the username input is "username", the code will update credentials.username with the new value entered by the user.
    };

    const handleClick = async () => {
        try {
            const response = await axios.post('http://localhost:8880/api/room', userData, {
                withCredentials: true
            });
            console.log('Room added:', response.data);
            // Optionally, you can navigate to a different page after successful addition
            navigate('/room'); // Replace '/users' with the appropriate route
        } catch (error) {
            console.error('Error adding room:', error);
        }
    }

    return (
        <div className="add">
            <div className="lContainer">
                <h3 className='header'> ADD NEW ROOM</h3>
                <span> Room Type</span>
                <input
                    type="text"
                    id= "room_Type"
                    placeholder="Room Type"
                    onChange={handleChange}
                    className="lInput"
                />
                <span> Price </span>
                <input
                    type="text"
                    id= "price"
                    placeholder="Price"
                    onChange={handleChange}
                    className="lInput"
                />
                <span> Description </span>
                <input
                    type="text"
                    id= "desc"
                    placeholder="Description"
                    onChange={handleChange}
                    className="lInput"
                />
                <button  onClick={handleClick} className="lButton">
                    ADD Room
                </button>
            </div>
        </div>
    );
}

export default AddRooms;