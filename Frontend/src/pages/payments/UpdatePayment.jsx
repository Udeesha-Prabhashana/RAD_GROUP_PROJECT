import "./updatePayment.scss";
import react, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdatePayment = () => {

    const [userData, setUserData] = useState({
        guestID: '',
        payment: '',
        date: '',
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

            const response = await axios.put(`http://localhost:8880/api/payment/${id}`, updatedData);
            console.log('Data added:', response.data);
            // Optionally, you can navigate to a different page after successful addition
            navigate('/payment'); // Replace '/users' with the appropriate route
        } catch (error) {
            console.error('Error adding data:', error);
        }
    }

    return (
        <div className="update">
            <div className="lContainer">
                <h3 className='header'> Update Payment</h3>
                <span>GuestID</span>
                <input
                    type="text"
                    id= "guestID"
                    placeholder='Enter guest ID'
                    onChange={handleChange}
                    className="lInput"
                />
                <span>Payment</span>
                <input
                    type="text"
                    id= "payment"
                    placeholder='Amount'
                    onChange={handleChange}
                    className="lInput"
                />
                <span>Date</span>
                <input
                    type="text"
                    id= "date"
                    placeholder='DD/MM/YYYY'
                    onChange={handleChange}
                    className="lInput"
                />
                <button  onClick={handleClick} className="lButton">Update Payment</button>
            </div>
        </div>
    );
}

export default UpdatePayment;