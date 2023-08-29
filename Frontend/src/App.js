import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Food from "./pages/foods/Food";
import AddFoods from "./pages/foods/AddFood";
import EditeFood from "./pages/foods/EditeFood";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/food" element={<Food />} />
        <Route path="/addfood" element={<AddFoods />} />
        <Route path="/editefood/:id" element={<EditeFood />} />
      </Routes>
    </BrowserRouter>
  );
}

//Tharindra is a simple human.

export default App;
