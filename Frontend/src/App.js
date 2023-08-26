import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/login" element={ <Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
