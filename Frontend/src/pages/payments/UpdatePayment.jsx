import "./updatePayment.scss";
import react, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdatePayment = () => {

    const [userData, setUserData] = useState({
        guestID: '',
        payment: '',
        date: '',
    });

    const [existingData, setExistingData] = useState({
        guestID: '',
        payment: '',
        date: '',
    });


    const { id } = useParams();
    
    let navigate = useNavigate();

    useEffect(() => {
        const fetchExistingData = async () => {
            try {
                const res = await axios.get(`http://localhost:8880/api/payment/find/${ id }`);
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

            const response = await axios.put(`http://localhost:8880/api/payment/${ id }`, updatedData, {
                withCredentials: true
            });
            console.log('Data added:', response.data);
            // Optionally, you can navigate to a different page after successful addition
            navigate('/payment'); // Replace '/users' with the appropriate route
        } catch (error) {
            console.error('Error adding data:', error);
        }
    }

    return (
        <div className="update_payment">
            <div className="lContainer">
                <h3 className='header'> Update Payment</h3>
                <span>GuestID</span>
                <input
                    type="text"
                    id="guestID"
                    value={userData.guestID}
                    placeholder='Enter guest ID'
                    onChange={handleChange}
                    className="lInput"
                />
                <span>Payment</span>
                <input
                    type="text"
                    id="payment"
                    value={userData.payment}
                    placeholder='Amount'
                    onChange={handleChange}
                    className="lInput"
                />
                <span>Date</span>
                <input
                    type="text"
                    id="date"
                    value={userData.date}
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