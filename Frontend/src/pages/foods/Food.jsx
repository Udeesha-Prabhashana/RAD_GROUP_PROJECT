import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import "./food.scss";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

// const StyledTable = styled(Table)`
//     width: 90%;
//     margin: 50px 0 0 50px;
// `;

// const StyleTableHead = styled(TableRow)`
//     & > th {
//         font-size: 20px;
//         background: #000000;
//         color: #FFFFFF;
//     }
// `;


const Food = () => {

    const { data, loading, error } = useFetch(`http://localhost:8880/api/food`);
    let navigate = useNavigate();

    const handleClick = () => {
        navigate('/addfood')
    }

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="addfood">
                    <button className="add-food-button" onClick={ handleClick}> ADD FOOD </button>
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
                                {data.map((item) => (
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {item.Name}
                                        </TableCell>
                                        <TableCell > {item.desc}</TableCell>
                                        <TableCell >{item.price}</TableCell>
                                        <TableCell>
                                              <Button > Edit</Button>  
                                              <Button className="delete" > Delete</Button>  
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