import "./viewroom.scss";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "@mui/material";
import { Link,  useParams } from "react-router-dom";

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

    return (
        <div className="view_room">
            <form className='view_room_form'>
                <div className='view_room_header'>
                    <h1>ROOM DETAILS: {userData.room_No}</h1>
                </div>
                <div className='view_room_box'>
                    <div className='view_room_box1'>                        
                        <span> Room Type </span><br></br>
                        <input type="text"name="room_type" id="room_type" value={userData.room_type} className="view_room_text" />
                        
                        <span> AC/Non-AC </span><br></br>
                        <input name="room_ac" id="room_ac"  value={userData.room_ac} className="view_room_text" />

                        <span> Room Price </span><br></br>
                        <input type="text" id="price" placeholder="Enter Price Per Night" value={userData.price} className="view_room_text" />
                        
                        <span> Room Availability </span>
                        <input name="availability" id="availability"  value={userData.availability} className="view_room_text" />

                        <span> Number of Beds </span>
                        <input type="text" id="no_of_beds" placeholder="Enter Number of Beds"  value={userData.no_of_beds} className="view_room_text"  />
                    </div>
                    <div className='view_room_box2'>
                        <span> Number of Chairs </span>
                        <input type="text" id="no_of_chairs" placeholder="Enter Number of Chairs" value={userData.no_of_chairs} className="view_room_text"  />
                        
                        <span> Television </span>
                        <input name="tv" id="tv" value={userData.tv} className="view_room_text" />

                        <span> Bathroom </span><br></br>
                        <input name="bathroom" id="bathroom" value={userData.bathroom} className="view_room_text" />
                        
                        <span> Balcony </span><br></br>
                        <input name="balcony" id="balcony" value={userData.balcony} className="view_room_text" />
                        
                        <span> Free wifi </span><br></br>
                        <input name="wifi" id="wifi" value={userData.wifi} className="view_room_text" />
                    </div>   
                </div> 
                <div className='view_room_button'>
                    <Button className="viewroom_button" component={Link} to={`/room`}>All Rooms</Button>
                </div>
            </form>
        </div>
    );
}

export default EditRoom;