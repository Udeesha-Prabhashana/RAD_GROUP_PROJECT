import "./editroom.scss";
import react, { useEffect, useState } from 'react';
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

            const updatedData = {};    //only update using given data, other are hear
            for (const key in userData) {
                if (userData.hasOwnProperty(key) && userData[key] !== '') {
                    updatedData[key] = userData[key];
                }
            }
            const response = await axios.put(`http://localhost:8880/api/room/${ id }`, updatedData, {
                withCredentials: true
            });
            console.log('Room updated:', response.data);
            // Optionally, you can navigate to a different page after successful addition
            navigate('/room'); // Replace '/users' with the appropriate route
        } catch (error) {
            console.error('Error updating room:', error);
        }
    }

    return (
        <div className="update_room">
            <div className="lContainer">
                <div className="form">
                    <h3 className='header'> EDIT ROOM</h3>
                    <div className="form_1">
                        <span> Room Number </span>
                            <input
                                type="text"
                                id= "room_No"
                                value={userData.room_No}
                                placeholder="Room Number"
                                onChange={handleChange}
                                className="lInput"
                            />
                        <span> Room Type </span>
                            <select name="room_type" id="room_type" value={userData.room_type} onChange={handleChange} className="lInput">
                                <option >Single</option>
                                <option >Double</option>
                                <option >Trible</option>
                                <option >Family</option>
                            </select>    
                        <span> AC/Non-AC </span>
                            <select name="room_ac" id="room_ac" value={userData.room_ac} onChange={handleChange} className="lInput">
                                <option>AC</option>
                                <option>NON-AC</option>
                            </select>
                        <span> Room Price </span>
                            <input
                                type="text"
                                id= "price"
                                placeholder="Price Per Night"
                                value={userData.price}
                                onChange={handleChange}
                                className="lInput"
                                />
                        <span> Room Availability </span>
                            <select name="availability" id="availability" value={userData.availability} onChange={handleChange} className="lInput">
                                <option>Yes</option>
                                <option>No</option>
                            </select>    
                        <span> Number of Beds </span>
                            <input
                                type="text"
                                id= "no_of_beds"
                                placeholder="Number of Beds"
                                value={userData.no_of_beds}
                                onChange={handleChange}
                                className="lInput"
                            />
                    </div>        
                </div>
                <div className="form">
                    <div className="form_2">
                        <span> Number of Chairs </span>
                            <input
                                type="text"
                                id= "no_of_chairs"
                                placeholder="Number of Chairs"
                                value={userData.no_of_chairs}
                                onChange={handleChange}
                                className="lInput"
                            />
                        <span> Television </span>
                            <select name="tv" id="tv" value={userData.tv} onChange={handleChange} className="lInput">
                                <option>Yes</option>
                                <option>No</option>
                            </select>    
                        <span> Bathroom </span>
                            <select name="bathroom" id="bathroom" value={userData.bathroom} onChange={handleChange} className="lInput">
                                <option>Yes</option>
                                <option>No</option>
                            </select>    
                        <span> Balcony </span>
                            <select name="balcony" id="balcony" value={userData.balcony} onChange={handleChange} className="lInput">
                                <option>Yes</option>
                                <option>No</option>
                            </select>    
                        <span> Free wifi </span>
                            <select name="wifi" id="wifi" value={userData.wifi} onChange={handleChange} className="lInput">
                                <option>Yes</option>
                                <option>No</option>
                            </select>    
                        <button  onClick={handleClick} className="lButton">
                            EDIT ROOM
                        </button>
                    </div>    
                </div>    
            </div>
        </div>
    );
}

export default EditRoom;