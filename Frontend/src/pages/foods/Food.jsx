import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import "./food.scss";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import EditeFood from "./EditeFood";
import axios from "axios";
import { useEffect, useState } from "react";

const Food = () => {

    const { data, loading, error, setData } = useFetch(`http://localhost:8880/api/food`);
    const [updatedData, setUpdatedData] = useState([]);     //whne delete then delete and update the details  
    let navigate = useNavigate();

    useEffect(() => {
        setUpdatedData(data)
    }, [data])

    const handleClick1 = () => {
        navigate('/addfood')
    }

    const handleClick2 = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8880/api/food/${ id }`, {
                withCredentials: true
            });
            console.log('Food deleted:', response.data);
            const response2 = await axios.get(`http://localhost:8880/api/food`);
            console.log('view all foods', response2.data)
            setUpdatedData(response2.data);
        } catch (error) {
            console.error('Error adding user:', error);
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
                        <button className="add-food-button" onClick={ handleClick1}> ADD FOOD </button>
                    </div>
                </div>
                {loading ? (
                    "loading"
                ) : (
                    <>
                        <div className="foodContainer">
                            <Table>
                                <TableHead className="table-head">
                                        <TableCell className="table-head-font"> Food Name</TableCell>
                                        <TableCell className="table-head-font"> Description</TableCell>
                                        <TableCell className="table-head-font"> Price</TableCell>
                                        <TableCell className="table-head-font">   </TableCell>
                                </TableHead>
                                {updatedData.map((item) => (
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {item.Name}
                                        </TableCell>
                                        <TableCell > {item.desc}</TableCell>
                                        <TableCell >{item.price}</TableCell>
                                        <TableCell>
                                              <Button component={Link} to={`/editefood/${item._id}`}> Edit</Button>  
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

export default Food