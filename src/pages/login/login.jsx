import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { validate } from "../../utils/utilityFunctions";
import { logReq } from "../../services/apiCalls";

import './login.css'
import { CInput } from '../../common/c-input/cInput'
import { Header } from '../../common/header/header'
import { CButton } from "../../common/c-button/cButton";


export const Login = () => {

    const userData = JSON.parse(localStorage.getItem("passport"))
    const navigate = useNavigate()

    // Login Hooks

    const [storagedToken, setStoragedToken] = useState(userData?.userToken)

    const [loginCredentials, setLoginCredentials] = useState({
        email: "",
        password: ""
    })

    const [loginErrorMsg, setLoginErrorMsg] = useState({
        emailError: "",
        passwordError: ""
    })

    const [loginMsg, setloginMsg] = useState("")

    // Login functions

    useEffect(() => { 
        storagedToken ? navigate("/") :null
    },[])

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

    const emptyError = (e) => {
        setLoginErrorMsg((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: ""
        }))
    }

    const logMeIn = async () => {
        try {
            for (let element in loginCredentials) {
                if (loginCredentials[element] === "") {
                    throw new Error('Fields must be completed')
                }
            }
            const fetched = await logReq(loginCredentials)

            const token = fetched.token
            const decodedToken = decodeToken(token)

            const passport = {
                userToken: token,
                userTokenData: decodedToken
            }

            localStorage.setItem("passport", JSON.stringify(passport))

            fetched.success ? navigate("/") : setloginMsg(fetched.message)

        } catch (error) {
            setloginMsg(error.message);
        }
    }

    // Login return

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
                    onBlur={(e) => checkError(e)}
                    onClick={(e) => emptyError(e)}
                />
                <div className={"errorMsg"}>{loginErrorMsg.emailError}</div>
                <CInput
                    className={"inputDesign"}
                    type={"password"}
                    name={"password"}
                    value={loginCredentials.password || ""}
                    placeholder={"input password"}
                    onChange={(e) => inputHandler(e)}
                    onBlur={(e) => checkError(e)}
                    onClick={(e) => emptyError(e)}
                />
                <div className={"errorMsg"}>{loginErrorMsg.passwordError}</div>
                <CButton onClick={logMeIn} title={"Log Me!"} />
                <div className={`errorMsg`}>{loginMsg}</div>
            </div>
        </>
    )
}