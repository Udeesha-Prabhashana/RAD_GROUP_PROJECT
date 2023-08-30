import "./sidebar.scss";
import PersonIcon from '@mui/icons-material/Person';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Link, useNavigate } from "react-router-dom";

//wxwececece
const Sidebar = () => {

    const navigate = useNavigate();
    const handleClick_food = () => {
        navigate('/food');
    }
    const handleClick_room = () => {
        navigate('/room');
    }
    const handleClick_payment = () => {
        navigate('/payment');
    }
    const handleLogout = () => {
        navigate("/");
    };
    return (
        <div className="Sidebar">
            <div className="top">
                <Link to="/home">
                    <span className="logo"> HOTEL </span>
                </Link>
            </div>
            <div className="center">
                <ul>
                    <li>
                        <PersonIcon className="icon" />
                        <span > Users </span>
                    </li>
                    <li>
                        <BookmarkAddedIcon className="icon"/>
                        <span> Booking </span>
                    </li>
                    <li>
                        <PaidOutlinedIcon className="icon"/>
                        <span onClick={handleClick_payment}> Payment </span>
                    </li>
                    <li>
                        <LocalDiningOutlinedIcon className="icon"/>
                        <span onClick={handleClick_food}> Foods </span>
                    </li>
                    <li>
                        <BedroomChildOutlinedIcon className="icon"/>
                        <span onClick={handleClick_room}> Rooms </span>
                    </li>
                </ul>
            </div>
            <div className="logout">
                <button className="logout-button" onClick={handleLogout}> Log Out </button>
            </div>
        </div>
    )
}

export default Sidebar