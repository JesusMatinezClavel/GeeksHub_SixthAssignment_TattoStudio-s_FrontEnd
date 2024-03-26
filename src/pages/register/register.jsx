import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { validate } from "../../utils/utilityFunctions";
import { decodeToken } from "react-jwt";
import { registerReq } from "../../services/apiCalls";

import { Header } from '../../common/header/header'
import { CInput } from "../../common/c-input/cInput";
import { CButton } from "../../common/c-button/cButton";
import './register.css'


export const Register = () => {
    const userData = JSON.parse(localStorage.getItem("passport"))
    const navigate = useNavigate()

    // Register Hooks

    const [storagedToken, setStoragedToken] = useState(userData?.userToken)

    const [registerCredentials, setRegisterCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        passwordHash: ""
    })

    const [registerErrorMsg, setRegisterErrorMsg] = useState({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordHashError: ""
    })

    const [registerMsg, setRegisterMsg] = useState("")

    // Register functions

    const inputHandler = (e) => {
        setRegisterCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const checkError = (e) => {
        const valid = validate(e.target.name, e.target.value)


        setRegisterErrorMsg((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: valid
        }))
    }

    const emptyError = (e) => {
        setRegisterErrorMsg((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: ""
        }))
    }

    const registerMe = async () => {
        try {
            for (let element in registerCredentials) {
                if (registerCredentials[element] === "") {
                    throw new Error('Every field must be completed')
                }
            }
            const fetched = await registerReq(registerCredentials)

            fetched.success ? navigate("/login") : setRegisterMsg(fetched.message)

        } catch (error) {
            setRegisterMsg(error.message);
        }
    }

    // Register return

    return (
        <>
            <Header />
            <div className="registerDesign">
                <CInput
                    className={"inputDesign"}
                    type={"text"}
                    name={"firstName"}
                    value={registerCredentials.firstName || ""}
                    placeholder={"input name"}
                    onChange={(e) => inputHandler(e)}
                    onBlur={(e) => checkError(e)}
                    onClick={(e) => emptyError(e)}
                />
                <div className={"errorMsg"}>{registerErrorMsg.firstNameError}</div>
                <CInput
                    className={"inputDesign"}
                    type={"text"}
                    name={"lastName"}
                    value={registerCredentials.lastName || ""}
                    placeholder={"input last name"}
                    onChange={(e) => inputHandler(e)}
                    onBlur={(e) => checkError(e)}
                    onClick={(e) => emptyError(e)}
                />
                <div className={"errorMsg"}>{registerErrorMsg.lastNameError}</div>
                <CInput
                    className={"inputDesign"}
                    type={"text"}
                    name={"email"}
                    value={registerCredentials.email || ""}
                    placeholder={"input email"}
                    onChange={(e) => inputHandler(e)}
                    onBlur={(e) => checkError(e)}
                    onClick={(e) => emptyError(e)}
                />
                <div className={"errorMsg"}>{registerErrorMsg.emailError}</div>
                <CInput
                    className={"inputDesign"}
                    type={"password"}
                    name={"passwordHash"}
                    value={registerCredentials.passwordHash || ""}
                    placeholder={"input password"}
                    onChange={(e) => inputHandler(e)}
                    onBlur={(e) => checkError(e)}
                    onClick={(e) => emptyError(e)}
                />
                <div className={"errorMsg"}>{registerErrorMsg.passwordHashError}</div>
                <CButton onClick={registerMe} title={"Register"} />
                <div className={`errorMsg`}>{registerMsg}</div>
            </div>
        </>
    )
}