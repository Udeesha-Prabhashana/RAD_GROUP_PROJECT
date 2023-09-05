import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './addroom.scss';

const AddRooms = () => {
  const [userData, setUserData] = useState({
    room_No: '',
    room_type: '',
    room_ac: '',
    price: '',
    availability: '',
    no_of_beds: '',
    no_of_chairs: '',
    tv: '',
    bathroom: '',
    balcony: '',
    wifi: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async () => {
    if (
      userData.room_No === '' ||
      userData.room_type === '' ||
      userData.price === '' ||
      userData.availability === ''
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post (
        'http://localhost:8880/api/room',
        userData,
        {
          withCredentials: true,
        }
      );
      console.log('Room added:', response.data);
      navigate('/room');
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  return (
    <div className="add_room">
        <form className='add_room_form'>
            <div className='add_room_header'>
                <h1> ADD NEW ROOM</h1>
            </div>
            <div className='add_room_box'>
                <div className='add_room_box1'>
                    <span> Room Number </span><br></br>
                    <input type="text" id="room_No" placeholder="Enter Room Number" onChange={handleChange} className="add_room_input_text" required />
                    
                    <span> Room Type </span><br></br>
                    <select name="room_type" id="room_type" onChange={handleChange} className="add_room_input_option" required>
                        <option value="" disabled selected>Select an option</option>
                        <option>Single</option>
                        <option>Double</option>
                        <option>Trible</option>
                        <option>Family</option>
                    </select>
                    
                    <span> AC/Non-AC </span><br></br>
                    <select name="room_ac" id="room_ac" onChange={handleChange} className="add_room_input_option" required>
                        <option value="" disabled selected>Select an option</option>
                        <option>AC</option>
                        <option>NON-AC</option>
                    </select>

                    <span> Room Price </span><br></br>
                    <input type="text" id="price" placeholder="Enter Price Per Night" onChange={handleChange} className="add_room_input_text" required />
                    
                    <span> Room Availability </span>
                    <select name="availability" id="availability" onChange={handleChange} className="add_room_input_option" required>
                        <option value="" disabled selected>Select an option</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>

                    <span> Number of Beds </span>
                    <input type="text" id="no_of_beds" placeholder="Enter Number of Beds" onChange={handleChange} className="add_room_input_text" required />
                </div>
                <div className='add_room_box2'>
                    <span> Number of Chairs </span>
                    <input type="text" id="no_of_chairs" placeholder="Enter Number of Chairs" onChange={handleChange} className="add_room_input_text" required />
                    
                    <span> Television </span>
                    <select name="tv" id="tv" onChange={handleChange} className="add_room_input_option" required>
                        <option value="" disabled selected>Select an option</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    
                    <span> Bathroom </span><br></br>
                    <select name="bathroom" id="bathroom" onChange={handleChange} className="add_room_input_option" required>
                        <option value="" disabled selected>Select an option</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    
                    <span> Balcony </span><br></br>
                    <select name="balcony" id="balcony" onChange={handleChange} className="add_room_input_option" required>
                        <option value="" disabled selected>Select an option</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    
                    <span> Free wifi </span><br></br>
                    <select name="wifi" id="wifi" onChange={handleChange} className="add_room_input_option" required>
                        <option value="" disabled selected>Select an option</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                </div>   
            </div> 
            <div className='add_room_button'>
                <button type="button" onClick={handleClick} className="addroom_button">ADD Room</button>
            </div>
        </form>
    </div>
  );
};

export default AddRooms;
