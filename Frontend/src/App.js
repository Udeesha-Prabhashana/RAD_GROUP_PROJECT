import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Payment from "./pages/payments/Payment";
import CreatePayment from "./pages/payments/CreatePayment";
import UpdatePayment from "./pages/payments/UpdatePayment";
import Room from "./pages/rooms/Room";
import BookingMain from "./pages/bookings/BookingMain";

import CustomerMain from "./pages/customers/CustomerMain";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Login />} />
                <Route path="/food" element={<Food />} />
                <Route path="/addfood" element={<AddFoods />} />
                <Route path="/editefood/:id" element={<EditeFood />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/createpayment" element={<CreatePayment />} />
                <Route path="/updatepayment/:id" element={<UpdatePayment />} />
                <Route path="/room" element={<Room />} />

                <Route path="/bookings" element={<BookingMain />} />
                <Route path="/customer" element={<CustomerMain />} />
            </Routes>
        </BrowserRouter>
    );

import FoodMain from "./pages/foods/FoodMain";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/createpayment" element={<CreatePayment />} />
        <Route path="/updatepayment/:id" element={<UpdatePayment />} />
        <Route path="/room" element={<Room />} />
        <Route path="/bookings" element={<BookingMain />} />
        <Route path="/food" element={<FoodMain />} />
      </Routes>
    </BrowserRouter>
  );

}

//Tharindra is a simple human.
//Sandaras is a simple Monstor.
//Yuahnga is a simple human.
//Nirasha is a simple Monstor.


export default App;
