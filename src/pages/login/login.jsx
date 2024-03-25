import { useState, useEffect } from "react";

import { CInput } from '../../common/c-input/cInput'
import { Header } from '../../common/header/header'
import './login.css'
import { CButton } from "../../common/c-button/cButton";
import { logReq } from "../../services/apiCalls";

export const Login = () => {

    const [loginCredentials, setLoginCredentials] = useState({
        email: "",
        password: ""
    })

    const inputHandler = (e) => {
        setLoginCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const logMeIn = async () => {
        try {
            const fetched = await logReq(loginCredentials)   
        } catch (error) {
            console.log("error.message");
        }
    }


    return (
        <>
            <Header />
            <div className="loginDesign">
                <CInput
                    className={"inputDesign"}
                    type={"text"}
                    name={"email"}
                    value={loginCredentials.email || ""}
                    placeholder={"input email"}
                    onChange={(e) => inputHandler(e)}
                />
                <CInput
                    className={"inputDesign"}
                    type={"password"}
                    name={"password"}
                    value={loginCredentials.password || ""}
                    placeholder={"input password"}
                    onChange={(e) => inputHandler(e)}
                />
                <CButton onClick={logMeIn} title={"Log Me!"} />
            </div>
        </>
    )
}