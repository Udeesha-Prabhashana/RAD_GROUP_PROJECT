import Sidebar from "../../components/sidebar/Sidebar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import "./room.scss";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Room = () => {

    const { data, loading, error, setData } = useFetch(`http://localhost:8880/api/room`);
    const [updatedData, setUpdatedData] = useState([]);
    let navigate = useNavigate();

    const handleClick1 = () => {
        navigate('/addroom')
    }

    useEffect(() => {
        setUpdatedData(data)
    },[data])

    const handleClick2 = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8880/api/room/${ id }`, {
                withCredentials: true
            });
            console.log('Room deleted:', response.data);
            // Optionally, you can navigate to a different page after successful addition
            const response2 = await axios.get(`http://localhost:8880/api/room`);
            console.log('view all rooms', response2.data)
            setUpdatedData(response2.data);
        } catch (error) {
            console.error('Error adding room:', error);
        }
    }

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <div className="container">
                    <div className="box">
                        <div className="search">
                        <input type="text" placeholder=" Search..." />
                        <SearchOutlinedIcon />
                        </div>
                    </div>
                    <div className="box">
                        <button className="add-room-button" onClick={ handleClick1}> ADD ROOM </button>
                    </div>
                </div>
                {loading ? (
                    "loading"
                ) : (
                    <>
                        <div className="roomContainer">
                            <Table>
                                <TableHead className="table-head">
                                        <TableCell className="table-head-font"> Room Number</TableCell>
                                        <TableCell className="table-head-font">  Room Type </TableCell>
                                        <TableCell className="table-head-font"> Price </TableCell>
                                        <TableCell className="table-head-font">  Availability </TableCell>
                                        <TableCell className="table-head-font">   </TableCell>
                                        <TableCell className="table-head-font">   </TableCell>
                                </TableHead>
                                {updatedData.map((item) => (
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {item.room_No}
                                        </TableCell>
                                        <TableCell >{item.room_type}</TableCell>
                                        <TableCell >{item.price}</TableCell>
                                        <TableCell> {item.availability}</TableCell>
                                        <TableCell>
                                        <Button className="see_more" component={Link} to={`/editroom/${item._id}`}> See More... </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button component={Link} to={`/editroom/${item._id}`}> Edit</Button>
                                            <Button className="delete"  onClick={() => handleClick2(item._id )}> Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                    </TableBody>
                                    ))}
                            </Table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Room