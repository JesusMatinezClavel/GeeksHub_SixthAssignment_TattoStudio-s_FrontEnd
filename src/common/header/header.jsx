import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import './header.css'
import { Navigator } from "../navigator/navigator";

export const Header = () => {

    const navigate = useNavigate()
    const tokenData = JSON.parse(localStorage.getItem("passport"))

    const logOut = () => {
        localStorage.removeItem("passport")
        navigate("/login")
    }

    return (
        <div className="headerDesign">
            <div className="headerHome">
                <Navigator title={"Home"} destination="/" />
            </div>
            {!tokenData?.userToken
                ? (
                    <div className="headerRest">
                        <Navigator title={"Services"} destination="/services" />
                        <Navigator title={"Register"} destination="/register" />
                        <Navigator title={"Login"} destination="/login" />
                    </div>
                ) : (
                    <div className="headerRest">
                        <Navigator title={"Profile"} destination="/users/profile" />
                        <Navigator title={"Services"} destination="/services" />
                        <div onClick={logOut}>
                        <Navigator title={"LogOut"} destination="/"/>
                        </div>
                    </div>
                )}
        </div>
    )
}