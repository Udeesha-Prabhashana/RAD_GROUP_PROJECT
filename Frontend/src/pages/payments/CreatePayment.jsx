import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./createPayment.scss";

const CreatePayment = () => {

    const [userData, setUserData] = useState({
        NIC: '',
        payment: '',
        date: '',
    });
    
    let navigate = useNavigate();

    const handleChange = (e) => {
        setUserData((prev) => ({ ...prev, [e.target.id]: e.target.value }));   //example, if the id of the username input is "username", the code will update credentials.username with the new value entered by the user.
    };

    // const handleClick = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:8880/api/payment', userData, {
    //             withCredentials: true
    //         });
    //         console.log('data added:', response.data);
    //         // Optionally, you can navigate to a different page after successful addition
    //         navigate('/payment'); // Replace '/users' with the appropriate route
    //     } catch (error) {
    //         console.error('Error adding data:', error);
    //     }
    // }

    const handleClick = async () => {
        if (
          userData.NIC === '' ||
          userData.payment === '' ||
          userData.date === null
        ) {
          alert('Please fill in all required fields.');
          return;
        }
    
        try {
          const response = await axios.post(
            'http://localhost:8880/api/payment',
            userData,
            {
              withCredentials: true,
            }
          );
          console.log('Payment added:', response.data);
          navigate('/payment');
        } catch (error) {
          console.error('Error adding payment:', error);
        }
      };

    return (
        <div className="add_payment">
            <form className="add_payment_form">
                <div className='add_room_header'>
                <h1> CREATE NEW PAYMENT</h1>
                </div>
                <div className='add_payment_box'>
                <span>NIC</span>
                <input
                    type="text"
                    id= "NIC"
                    placeholder='Enter NIC'
                    onChange={handleChange}
                    className="add_payment_input_text"
                />
                <span>Payment</span>
                <input
                    type="text"
                    id= "payment"
                    placeholder='Amount'
                    onChange={handleChange}
                    className="add_payment_input_text"

                />
                <span>Date</span>
                <input
                    type="date"
                    id= "date"
                    placeholder='DD/MM/YYYY'
                    onChange={handleChange}
                    className="add_payment_input_text"

                />
                </div>
                <div className='add_payment_button'>
                <button type='button' onClick={handleClick} className="addpayment_button">Create</button>
                </div>
                
            </form>
        </div>
    );
}

export default CreatePayment;