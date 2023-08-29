import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Food from "./pages/foods/Food";
import AddFoods from "./pages/foods/AddFood";
import EditeFood from "./pages/foods/EditeFood";
import Room from "./pages/rooms/Room";
import AddRooms from "./pages/rooms/AddRoom";
import EditRoom from "./pages/rooms/EditRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/food" element={<Food />} />
        <Route path="/addfood" element={<AddFoods />} />
        <Route path="/editefood/:id" element={<EditeFood />} />
        <Route path="/room" element={<Room />} />
        <Route path="/addroom" element={<AddRooms />} />
        <Route path="/editroom/:id" element={<EditRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
