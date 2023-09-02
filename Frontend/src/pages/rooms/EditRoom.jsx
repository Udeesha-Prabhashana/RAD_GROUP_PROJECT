import "./editroom.scss";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditRoom = () => {
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

    const { id } = useParams();
    
    let navigate = useNavigate();

    const [existingData, setExistingData] = useState({
        room_Type: '',
        price: '',
        desc: '',
    });

    useEffect(() => {
        const fetchExistingData = async () => {
            try {
                const res = await axios.get(`http://localhost:8880/api/room/find/${ id }`);
                setExistingData(res.data);
                setUserData(res.data)
                console.log('Fetched data:', res.data);
            } catch (error) {
                console.error('Error fetching existing data:', error)
            }
        };
        fetchExistingData();
    }, [id]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData((prev) => ({ ...prev, [id]: value }));
    };

    const handleClick = async () => {
        try {

            const updatedData = {}; 
            for (const key in userData) {
                if (userData.hasOwnProperty(key) && userData[key] !== '') {
                    updatedData[key] = userData[key];
                }
            }
            const response = await axios.put(`http://localhost:8880/api/room/${ id }`, updatedData, {
                withCredentials: true
            });
            console.log('Room updated:', response.data);
            navigate('/room'); 
        } catch (error) {
            console.error('Error updating room:', error);
        }
    }

    return (
        <div className="edit_room">
            <form className='edit_room_form'>
                <div className='edit_room_header'>
                    <h1> EDIT ROOM</h1>
                </div>
                <div className='edit_room_box'>
                    <div className='edit_room_box1'>
                        <span> Room Number </span><br></br>
                        <input type="text" id="room_No" placeholder="Enter Room Number" onChange={handleChange} value={userData.room_No} className="edit_room_input_text" required />
                        
                        <span> Room Type </span><br></br>
                        <select name="room_type" id="room_type" onChange={handleChange} value={userData.room_type} className="edit_room_input_option" required>
                            <option value="" disabled selected>Select an option</option>
                            <option>Single</option>
                            <option>Double</option>
                            <option>Trible</option>
                            <option>Family</option>
                        </select>
                        
                        <span> AC/Non-AC </span><br></br>
                        <select name="room_ac" id="room_ac" onChange={handleChange} value={userData.room_ac} className="edit_room_input_option" required>
                            <option value="" disabled selected>Select an option</option>
                            <option>AC</option>
                            <option>NON-AC</option>
                        </select>

                        <span> Room Price </span><br></br>
                        <input type="text" id="price" placeholder="Enter Price Per Night" onChange={handleChange} value={userData.price} className="edit_room_input_text" required />
                        
                        <span> Room Availability </span>
                        <select name="availability" id="availability" onChange={handleChange} value={userData.availability} className="edit_room_input_option" required>
                            <option value="" disabled selected>Select an option</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>

                        <span> Number of Beds </span>
                        <input type="text" id="no_of_beds" placeholder="Enter Number of Beds" onChange={handleChange} value={userData.no_of_beds} className="edit_room_input_text" required />
                    </div>
                    <div className='edit_room_box2'>
                        <span> Number of Chairs </span>
                        <input type="text" id="no_of_chairs" placeholder="Enter Number of Chairs" onChange={handleChange} value={userData.no_of_chairs} className="edit_room_input_text" required />
                        
                        <span> Television </span>
                        <select name="tv" id="tv" onChange={handleChange} value={userData.tv} className="edit_room_input_option" required>
                            <option value="" disabled selected>Select an option</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                        
                        <span> Bathroom </span><br></br>
                        <select name="bathroom" id="bathroom" onChange={handleChange} value={userData.bathroom} className="edit_room_input_option" required>
                            <option value="" disabled selected>Select an option</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                        
                        <span> Balcony </span><br></br>
                        <select name="balcony" id="balcony" onChange={handleChange} value={userData.balcony} className="edit_room_input_option" required>
                            <option value="" disabled selected>Select an option</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                        
                        <span> Free wifi </span><br></br>
                        <select name="wifi" id="wifi" onChange={handleChange} value={userData.wifi} className="edit_room_input_option" required>
                            <option value="" disabled selected>Select an option</option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>   
                </div> 
                <div className='edit_room_button'>
                    <button type="button" onClick={handleClick} className="editroom_button">Edit Room</button>
                </div>
            </form>
        </div>
    );
}

export default EditRoom;