import { Home } from "../home/home";
import { Route, Routes } from "react-router-dom";

export const Body = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    )
}