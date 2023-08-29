import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import "./payment.scss";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import updatepayment from "./UpdatePayment";
import axios from "axios";
import { useState } from "react";

const Payment = () => {

    const { data, loading, error, setData } = useFetch(`http://localhost:8880/api/payment`);
    const [updatedData, setUpdatedData] = useState(data);
    let navigate = useNavigate();

    const handleClick1 = () => {
        navigate('/createpayment')
    }

    const handleClick2 = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8880/api/payment/${id}`);
            console.log('Payment record deleted:', response.data);
            // Optionally, you can navigate to a different page after successful addition
            const response2 = await axios.get(`http://localhost:8880/api/payment`);
            console.log('view all payments', response2.data)
            setUpdatedData(response2.data);
        } catch (error) {
            console.error('Error occuered', error);
        }
    }


    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="createPayment">
                    <button className="create-payment-button" onClick={ handleClick1}> CREATE NEW PAYMENT </button>
                </div>
                {loading ? (
                    "loading"
                ) : (
                    <>
                        <div className="paymentContainer">
                            <Table>
                                <TableHead className="table-head">
                                        <TableCell className="table-head-font"> Guest ID</TableCell>
                                        <TableCell className="table-head-font"> Payment</TableCell>
                                        <TableCell className="table-head-font"> Date</TableCell>
                                        <TableCell className="table-head-font">   </TableCell>
                                        <TableCell className="table-head-font">   </TableCell>
                                </TableHead>
                                {data.map((item) => (
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">{item.guestID}</TableCell>
                                        <TableCell > {item.payment}</TableCell>
                                        <TableCell >{item.date }</TableCell>
                                        <TableCell>
                                              <Button component={Link} to={`/updatepayment/${item._id}`}>Update</Button>  
                                        </TableCell>
                                        <TableCell>
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

export default Payment