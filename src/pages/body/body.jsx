import { Home } from "../home/home";
import { Route, Routes } from "react-router-dom";
import { Register } from "../register/register";
import { Login } from "../login/login";

export const Body = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}