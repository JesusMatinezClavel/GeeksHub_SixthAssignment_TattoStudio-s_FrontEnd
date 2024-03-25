import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CInput } from '../../common/c-input/cInput'
import { Header } from '../../common/header/header'
import './login.css'
import { CButton } from "../../common/c-button/cButton";
import { logReq } from "../../services/apiCalls";
import { validate } from "../../utils/utilityFunctions";

export const Login = () => {

    const navigate = useNavigate()

    const [loginCredentials, setLoginCredentials] = useState({
        email: "",
        password: ""
    })

    const [loginErrorMsg, setLoginErrorMsg] = useState({
        emailError: "",
        passwordError: ""
    })

    const [loginMsg, setloginMsg] = useState("")

    const inputHandler = (e) => {
        setLoginCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const checkError = (e) => {
        const valid = validate(e.target.name, e.target.value)

        setLoginErrorMsg((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: valid
        }))
    }

    const logMeIn = async () => {
        try {
            for (let element in loginCredentials) {
                if (loginCredentials[element] === ""){
                    throw new Error('fields must be completed')
                }
            }
            const fetched = await logReq(loginCredentials)
            setloginMsg(fetched.message)
            setTimeout(() => {
                navigate("/");
            }, 1200);
        } catch (error) {
            setloginMsg(error.message);
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
                    onBlur={checkError}
                />
                <div className={"errorMsg"}>{loginErrorMsg.emailError}</div>
                <CInput
                    className={"inputDesign"}
                    type={"password"}
                    name={"password"}
                    value={loginCredentials.password || ""}
                    placeholder={"input password"}
                    onChange={(e) => inputHandler(e)}
                    onBlur={checkError}
                />
                <div className={"errorMsg"}>{loginErrorMsg.passwordError}</div>
                <CButton onClick={logMeIn} title={"Log Me!"} />
                <div className={`errorMsg`}>{loginMsg}</div>
            </div>
        </>
    )
}