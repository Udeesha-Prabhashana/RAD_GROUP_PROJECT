import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import "./payment.scss";

const Payment = () => {
  const { data, loading, error, setData } = useFetch(
    `http://localhost:8880/api/payment`
  );
  const [updatedData, setUpdatedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  let navigate = useNavigate();

  const handleClick1 = () => {
    navigate("/createpayment");
  }

  useEffect(() => {
    setUpdatedData(data);
  }, [data]);

  const handleClick2 = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8880/api/payment/${id}`, {
        withCredentials: true,
      });
      console.log("Payment deleted:", response.data);
      const response2 = await axios.get(`http://localhost:8880/api/payment`);
      console.log("view all payments", response2.data);
      setUpdatedData(response2.data);
    } catch (error) {
      console.error("Error adding payment:", error);
    }
  }


  const filterData = () => {
    if (searchQuery === "") {
      return updatedData; 
    } else {
      return updatedData.filter((item) =>
        item.NIC.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="payment_container_1">
          <div className="payment_box">
            <div className="payment_search">
              <input type="text" placeholder=" Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}  />
              <SearchOutlinedIcon />
            </div>
          </div>
          <div className="payment_box">
            <button className="add_payment_button" onClick={handleClick1}> ADD PAYMENT </button>
          </div>
        </div>
        {loading ? (
          "loading"
        ) : (
          <>
            <div className="payment_Container_2">
              <Table>
                <TableHead className="table-head">
                  <TableCell className="table-head-font">NIC</TableCell>
                  <TableCell className="table-head-font">Payment</TableCell>
                  <TableCell className="table-head-font">Date</TableCell>
                  <TableCell className="table-head-font"></TableCell>
                  <TableCell className="table-head-font"></TableCell>
                  <TableCell className="table-head-font"></TableCell>
                </TableHead>
                <TableBody>
                  {filterData().map((item) => (
                    <TableRow key={item._id}>
                      <TableCell component="th" scope="row"> {item.NIC} </TableCell>
                      <TableCell> {isNaN(item.payment) ? '' : parseFloat(item.payment).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </TableCell>
                      <TableCell> {item.date} </TableCell>
                      <TableCell> </TableCell>
                      <TableCell> </TableCell>
                      <TableCell> <a className="payment_edit" href={`/UpdatePayment/${item._id}`}> <EditIcon/></a> <DeleteIcon className="payment_delete" onClick={() => handleClick2(item._id)}/> </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
