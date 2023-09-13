import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import PaymentMain from "./pages/payments/PaymentMain";
import Room from "./pages/rooms/Room";
import BookingMain from "./pages/bookings/BookingMain";
import FoodMain from "./pages/foods/FoodMain";
import CustomerMain from "./pages/customers/CustomerMain";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/payment" element={<PaymentMain />} />
        <Route path="/room" element={<Room />} />
        <Route path="/bookings" element={<BookingMain />} />
        <Route path="/food" element={<FoodMain />} />
        <Route path="/customer" element={<CustomerMain />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;

