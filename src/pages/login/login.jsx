import { useState, useEffect } from "react";

import { CInput } from '../../common/c-input/cInput'
import { Header } from '../../common/header/header'
import './login.css'
import { CButton } from "../../common/c-button/cButton";

export const Login = () => {

    const [loginData, setLoginData] = useState({
        email: "",
        passwordHash: ""
    })

    const inputHandler = (e) => {
        setLoginData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const logMe = () => {
        console.log("hola mundo")
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
                <CButton onClick={logMe} title={"Log Me!"} />
            </div>
        </>
    )
}