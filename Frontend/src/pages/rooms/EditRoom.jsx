import "./editroom.scss";
import react, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditRoom = () => {
    const [userData, setUserData] = useState({
        room_Type: '',
        price: '',
        desc: '',
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
        <div className="update">
            <div className="lContainer">
                <h3 className='header'> EDIT ROOM</h3>
                <span> Room Type</span>
                <input
                    type="text"
                    id="room_Type"
                    value={userData.room_Type}
                    placeholder="Room Type"
                    onChange={handleChange}
                    className="lInput"
                />
                <span> Price </span>
                <input
                    type="text"
                    id="price"
                    value={userData.price}
                    placeholder="Price"
                    onChange={handleChange}
                    className="lInput"
                />
                <span> Description </span>
                <input
                    type="text"
                    id="desc"
                    value={userData.desc}
                    placeholder="Description"
                    onChange={handleChange}
                    className="lInput"
                />
                <button  onClick={handleClick} className="lButton">
                    EDIT ROOM
                </button>
            </div>
        </div>
    );
}

export default EditRoom;