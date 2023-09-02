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

import "./room.scss";

const Room = () => {
  const { data, loading, error, setData } = useFetch(
    `http://localhost:8880/api/room`
  );
  const [updatedData, setUpdatedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  let navigate = useNavigate();

  const handleClick1 = () => {
    navigate("/addroom");
  }

  useEffect(() => {
    setUpdatedData(data);
  }, [data]);

  const handleClick2 = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8880/api/room/${id}`, {
        withCredentials: true,
      });
      console.log("Room deleted:", response.data);
      const response2 = await axios.get(`http://localhost:8880/api/room`);
      console.log("view all rooms", response2.data);
      setUpdatedData(response2.data);
    } catch (error) {
      console.error("Error adding room:", error);
    }
  }


  const filterData = () => {
    if (searchQuery === "") {
      return updatedData; 
    } else {
      return updatedData.filter((item) =>
        item.room_No.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="room_container_1">
          <div className="room_box">
            <div className="room_search">
              <input type="text" placeholder=" Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}  />
              <SearchOutlinedIcon />
            </div>
          </div>
          <div className="room_box">
            <button className="add_room_button" onClick={handleClick1}> ADD ROOM </button>
          </div>
        </div>
        {loading ? (
          "loading"
        ) : (
          <>
            <div className="room_Container_2">
              <Table>
                <TableHead className="table-head">
                  <TableCell className="table-head-font">Room Number</TableCell>
                  <TableCell className="table-head-font">Room Type</TableCell>
                  <TableCell className="table-head-font">Price</TableCell>
                  <TableCell className="table-head-font">Availability</TableCell>
                  <TableCell className="table-head-font"></TableCell>
                  <TableCell className="table-head-font"></TableCell>
                  <TableCell className="table-head-font"></TableCell>
                </TableHead>
                <TableBody>
                  {filterData().map((item) => (
                    <TableRow key={item._id}>
                      <TableCell component="th" scope="row"> {item.room_No} </TableCell>
                      <TableCell> {item.room_type}</TableCell>
                      <TableCell> {isNaN(item.price) ? '' : parseFloat(item.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </TableCell>
                      <TableCell> <FiberManualRecordIcon className={item.availability === 'Yes' ? 'green-availability' : 'red-availability'} /> <p className={item.availability === 'Yes' ? 'green-availability' : 'red-availability'} >{item.availability}</p> </TableCell>
                      <TableCell> </TableCell>
                      <TableCell> </TableCell>
                      <TableCell> <a className="room_see_more" href={`/viewroom/${item._id}`}><RemoveRedEyeIcon/></a> <a className="room_edit" href={`/editroom/${item._id}`}> <EditIcon/></a> <DeleteIcon className="room_delete" onClick={() => handleClick2(item._id)}/> </TableCell>
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

export default Room;
