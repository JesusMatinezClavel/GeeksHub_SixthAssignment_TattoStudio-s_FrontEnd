import { Home } from "../home/home";
import { Route, Router, Navigate } from "react-router-dom";


const navigate = Navigate()

export const Body = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    )
}