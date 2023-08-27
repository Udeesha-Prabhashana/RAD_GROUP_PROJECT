import react, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./addfood.scss";

const AddFoods = () => {

    const [userData, setUserData] = useState({
        Name: '',
        desc: '',
        price: '',
    });
    
    let navigate = useNavigate();

    const handleChange = (e) => {
        setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));   //example, if the id of the username input is "username", the code will update credentials.username with the new value entered by the user.
    };

    const handleClick = async () => {
        try {
            const response = await axios.post('http://localhost:8880/api/food', userData);
            console.log('User added:', response.data);
            // Optionally, you can navigate to a different page after successful addition
            navigate('/food'); // Replace '/users' with the appropriate route
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }

    return (
        <div className="login">
            <div className="lContainer">
                <h3 className='header'> ADD NEW FOOD</h3>
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
                    ADD FOOD
                </button>
            </div>
        </div>
    );
}

export default AddFoods;