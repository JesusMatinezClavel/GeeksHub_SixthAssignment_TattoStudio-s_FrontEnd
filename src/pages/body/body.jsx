import { Home } from "../home/home";
import { Route, Routes } from "react-router-dom";
import { Register } from "../register/register";
import { Login } from "../login/login";
import { Profile } from "../profile/profile";
import { Services } from "../services/services";

export const Body = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users/profile" element={<Profile />} />
            <Route path="/services" element={<Services />} />
        </Routes>
    )
}