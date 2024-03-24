import { useState, useEffect } from "react";

import { CInput } from '../../common/c-input/cInput'
import { Header } from '../../common/header/header'
import './login.css'

export const Login = () => {

    const [loginData, setLoginData] = useState({
        email: "",
        passwordHash: ""
    })

    const inputHandler = (e) => {
        console.log(e.target.name);
        setLoginData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }


    return (
        <>
            <Header />
            <div className="loginDesign">
                <CInput
                    className={"inputDesign"}
                    type={"text"}
                    name={"email"}
                    value={loginData.email || ""}
                    placeholder={"input email"}
                    onChange={(e) => inputHandler(e)}
                />
                <CInput
                    className={"inputDesign"}
                    type={"password"}
                    name={"passwordHash"}
                    value={loginData.passwordHash || ""}
                    placeholder={"input password"}
                    onChange={(e) => inputHandler(e)}
                />
            </div>
        </>
    )
}