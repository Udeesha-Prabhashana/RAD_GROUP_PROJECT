import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Food from "./pages/foods/Food";
import AddFoods from "./pages/foods/AddFood";
import EditeFood from "./pages/foods/EditeFood";
import Payment from "./pages/payments/Payment";
import CreatePayment from "./pages/payments/CreatePayment";
import UpdatePayment from "./pages/payments/UpdatePayment";
import Room from "./pages/rooms/Room";
import AddRooms from "./pages/rooms/AddRoom";
import EditRoom from "./pages/rooms/EditRoom";
import ViewRoom from "./pages/rooms/ViewRoom";
import BookingMain from "./pages/bookings/BookingMain";

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
        <Route path="/addroom" element={<AddRooms />} />
        <Route path="/editroom/:id" element={<EditRoom />} />
        <Route path="/viewroom/:id" element={<ViewRoom />} />

        <Route path="/bookings" element={<BookingMain />} />
      </Routes>
    </BrowserRouter>
  );
}

//Tharindra is a simple human.

export default App;
