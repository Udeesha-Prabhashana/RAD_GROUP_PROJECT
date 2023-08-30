import { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {

    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));   //example, if the id of the username input is "username", the code will update credentials.username with the new value entered by the user.
    };
    
    const handleClick = async (e) => {
        e.preventDefault(); 
        try {
            const res = await axios.post(`http://localhost:8880/api/auth/login`, credentials, {withCredentials: true}); // {withCredentials: true} use to validate  other pages
            if (res.data.isAdmin) {
                navigate("/home")                  //useNavigate hook (provided by React Router) to redirect the user to the home page ("/")
            }      //sends a POST request to the /auth/login endpoint with the credentials object as the payload. The credentials object contains the username and password entered by the user      
        } catch (err) {
            console.error("Login failed:", err.response.data);
            setError(err.response.data.message);
        }
    }

    return (
        <div className="login">
            <div className="lContainer">
                <h3 className='header'> LOG IN</h3>
                <span> USERNAME</span>
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    onChange={handleChange}
                    className="lInput"
                />
                <span> PASSWORD</span>
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    onChange={handleChange}
                    className="lInput"
                />
                <button  onClick={handleClick} className="lButton">
                    Login
                </button>
                {error && <span className="errorMessage">{error}</span>}
            </div>
        </div>
    );
};

export default Login