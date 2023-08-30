import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./addroom.scss";

const AddRooms = () => {

    const [userData, setUserData] = useState({
        room_No:'',
        room_type:'',
        room_ac:'',
        price:'',
        availability:'',
        no_of_beds:'',
        no_of_chairs:'',
        tv:'',
        bathroom:'',
        balcony:'',
        wifi:'',
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
        <div className="add_room">
            <div className="lContainer">
                <div className='form'>
                    <h3 className='header'> ADD NEW ROOM</h3>
                    <div className='form_1'>
                        <span> Room Number </span>
                            <input
                                type="text"
                                id= "room_No"
                                placeholder="Enter Room Number"
                                onChange={handleChange}
                                className="lInput"
                            />
                        <span> Room Type </span>
                            <select name="room_type" id="room_type" onChange={handleChange} className="lInput">
                                <option value="" disabled selected>Select an option</option>
                                <option >Single</option>
                                <option >Double</option>
                                <option >Trible</option>
                                <option >Family</option>
                            </select>    
                        <span> AC/Non-AC </span>
                            <select name="room_ac" id="room_ac" onChange={handleChange} className="lInput">
                                <option value="" disabled selected>Select an option</option>
                                <option>AC</option>
                                <option>NON-AC</option>
                            </select>
                        <span> Room Price </span>
                            <input
                                type="text"
                                id= "price"
                                placeholder="Enter Price Per Night"
                                onChange={handleChange}
                                className="lInput"
                                />
                        <span> Room Availability </span>
                            <select name="availability" id="availability" onChange={handleChange} className="lInput">
                                <option value="" disabled selected>Select an option</option>
                                <option className="yes" >Yes</option>
                                <option className="no" >No</option>
                            </select>    
                        <span> Number of Beds </span>
                            <input
                                type="text"
                                id= "no_of_beds"
                                placeholder="Enter Number of Beds"
                                onChange={handleChange}
                                className="lInput"
                            />
                    </div>
                </div>
                <div className='form'>
                    <div className='form_2'>
                        <span> Number of Chairs </span>
                            <input
                                type="text"
                                id= "no_of_chairs"
                                placeholder="Enter Number of Chairs"
                                onChange={handleChange}
                                className="lInput"
                            />
                        <span> Television </span>
                            <select name="tv" id="tv" onChange={handleChange} className="lInput">
                                <option value="" disabled selected>Select an option</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>    
                        <span> Bathroom </span>
                            <select name="bathroom" id="bathroom" onChange={handleChange} className="lInput">
                                <option value="" disabled selected>Select an option</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>    
                        <span> Balcony </span>
                            <select name="balcony" id="balcony" onChange={handleChange} className="lInput">
                                <option value="" disabled selected>Select an option</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>    
                        <span> Free wifi </span>
                            <select name="wifi" id="wifi" onChange={handleChange} className="lInput">
                                <option value="" disabled selected>Select an option</option>
                                <option >Yes</option>
                                <option>No</option>
                            </select>   
                        <button  onClick={handleClick} className="lButton">ADD Room</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddRooms;