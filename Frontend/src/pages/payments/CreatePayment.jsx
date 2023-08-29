import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./createPayment.scss";

const CreatePayment = () => {

    const [userData, setUserData] = useState({
        guestID: '',
        payment: '',
        date: '',
    });
    
    let navigate = useNavigate();

    const handleChange = (e) => {
        setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));   //example, if the id of the username input is "username", the code will update credentials.username with the new value entered by the user.
    };

    const handleClick = async () => {
        try {
            const response = await axios.post('http://localhost:8880/api/payment', userData);
            console.log('data added:', response.data);
            // Optionally, you can navigate to a different page after successful addition
            navigate('/payment'); // Replace '/users' with the appropriate route
        } catch (error) {
            console.error('Error adding data:', error);
        }
    }

    return (
        <div className="login">
            <div className="lContainer">
                <h3 className='header'> CREATE NEW PAYMENT</h3>
                <span>GuestID</span>
                <input
                    type="text"
                    id= "guestID"
                    onChange={handleChange}
                    className="lInput"
                />
                <span>Payment</span>
                <input
                    type="text"
                    id= "payment"
                    onChange={handleChange}
                    className="lInput"
                />
                <span>Date</span>
                <input
                    type="text"
                    id= "date"
                    onChange={handleChange}
                    className="lInput"
                />
                <button  onClick={handleClick} className="lButton">Create</button>
            </div>
        </div>
    );
}

export default CreatePayment;