import PersonIcon from '@mui/icons-material/Person';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Link, useNavigate } from "react-router-dom";
import "./home.scss";

const Home = () => {
    const navigate = useNavigate();
    const handleClick_food = () => {
        navigate('/food');
    }
    const handleClick_customer = () => {
        navigate('/customer');
    }
    const handleClick_room = () => {
        navigate('/room');
    }
    const handleClick_bookings = () => {
        navigate('/bookings');
    }
    const handleClick_payment = () => {
        navigate('/payment');
    }
    const handleLogout = () => {
        navigate("/");
    };
    return (
        <div className="home1">
            <div className="center">
                <div className='header'>
                    <h1>SoloHotel</h1>
                </div>
                <ul>
                    <li>
                        <PersonIcon className="icon" onClick={handleClick_customer}/>
                        <span onClick={handleClick_customer}> Customers </span>
                    </li>
                    <li>
                        <BookmarkAddedIcon className="icon" onClick={handleClick_bookings}/>
                        <span onClick={handleClick_bookings}> Booking </span>
                    </li>
                    <li>
                        <PaidOutlinedIcon className="icon" onClick={handleClick_payment}/>
                        <span onClick={handleClick_payment}> Payment </span>
                    </li>
                    <li>
                        <LocalDiningOutlinedIcon className="icon" onClick={handleClick_food}/>
                        <span onClick={handleClick_food}> Foods </span>
                    </li>
                    <li>
                        <BedroomChildOutlinedIcon className="icon" onClick={handleClick_room}/>
                        <span onClick={handleClick_room}> Rooms </span>
                    </li>
                </ul>
                <div className="logout">
                    <button className="logout-button" onClick={handleLogout}><h3>Log Out</h3>  </button>
                </div>
            </div>
            
        </div>
    )
}

export default Home