import "./editefood.scss";
import react, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditeFood = () => {

    const [userData, setUserData] = useState({
        Name: '',
        desc: '',
        price: '',
    });

    const { id } = useParams();
    
    let navigate = useNavigate();

    // const handleChange = (e) => {
    //     setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));   //example, if the id of the username input is "username", the code will update credentials.username with the new value entered by the user.
    // };

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

            const response = await axios.put(`http://localhost:8880/api/food/${ id }`, updatedData, {
                withCredentials: true
            });
            console.log('User added:', response.data);
            // Optionally, you can navigate to a different page after successful addition
            navigate('/food'); // Replace '/users' with the appropriate route
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }

    return (
        <div className="update">
            <div className="lContainer">
                <h3 className='header'> EDITE FOOD</h3>
                <span> Food Name</span>
                <input
                    type="text"
                    id= "Name"
                    onChange={handleChange}
                    className="lInput"
                />
                <span> Description </span>
                <input
                    type="text"
                    id= "desc"
                    onChange={handleChange}
                    className="lInput"
                />
                <span> Price </span>
                <input
                    type="text"
                    id= "price"
                    onChange={handleChange}
                    className="lInput"
                />
                <button  onClick={handleClick} className="lButton">
                    EDIT FOOD
                </button>
            </div>
        </div>
    );
}

export default EditeFood;