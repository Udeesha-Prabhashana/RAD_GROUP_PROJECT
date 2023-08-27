import "./sidebar.scss";
import PersonIcon from '@mui/icons-material/Person';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import LocalDiningOutlinedIcon from '@mui/icons-material/LocalDiningOutlined';
import BedroomChildOutlinedIcon from '@mui/icons-material/BedroomChildOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/food');
    }
    return (
        <div className="Sidebar">
            <div className="top">
                <span className="logo"> HOTEL </span>
            </div>
            <hr />
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
                        <span> Payment </span>
                    </li>
                    <li>
                        <LocalDiningOutlinedIcon className="icon"/>
                        <span onClick={handleClick}> Foods </span>
                    </li>
                    <li>
                        <BedroomChildOutlinedIcon className="icon"/>
                        <span> Rooms </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar