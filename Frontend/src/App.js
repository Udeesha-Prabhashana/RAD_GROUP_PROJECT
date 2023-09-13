import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import PaymentMain from "./pages/payments/PaymentMain";
import Room from "./pages/rooms/Room";
import BookingMain from "./pages/bookings/BookingMain";
import FoodMain from "./pages/foods/FoodMain";
import CustomerMain from "./pages/customers/CustomerMain";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

function App() {

  const { user } = useContext(AuthContext)
  // const navigate = Navigate()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {user ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/payment" element={<PaymentMain />} />
            <Route path="/room" element={<Room />} />
            <Route path="/bookings" element={<BookingMain />} />
            <Route path="/food" element={<FoodMain />} />
            <Route path="/customer" element={<CustomerMain />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}



export default App;
