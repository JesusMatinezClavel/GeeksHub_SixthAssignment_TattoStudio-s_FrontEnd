import { useEffect, useState } from 'react';
import { CInput } from "../../common/c-input/cInput";
import { useNavigate } from "react-router-dom";
import { getOwnProfile, updateOwnProfile } from '../../services/apiCalls';
import { validate } from '../../utils/utilityFunctions';

import './profile.css'
import { Header } from "../../common/header/header";
import { CButton } from "../../common/c-button/cButton";
import { CCard } from '../../common/c-card/cCard';

export const Profile = () => {

    const navigate = useNavigate()
    const tokenData = JSON.parse(localStorage.getItem("passport"))
    const token = tokenData.userToken
    const userID = tokenData.userTokenData.userID


    // Profile Hooks

    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        passwordHash: "",
        verifyPassword: ""
    })
    const [profileUpdate, setProfileUpdate] = useState({
        firstName: "",
        lastName: "",
        email: "",
        passwordHash: "",
        verifyPassword: ""
    })
    const [profileUpdateError, setProfileUpdateError] = useState({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordHashError: "",
        verifyPasswordError: ""
    })
    const [updateMsg, setUpdateMsg] = useState("")
    const [storagedToken, setStoragedToken] = useState(tokenData?.userToken)
    const [editable, setEditable] = useState(false)
    const [updateError, setUpdateError] = useState(false)

    // Profile Functions

    useEffect(() => {
        !storagedToken ? navigate("/") : null
    }, [storagedToken])

    useEffect(() => {
        const getProfile = async () => {
            try {
                const fetched = await getOwnProfile(storagedToken)
                const userProfile = fetched.data

                setProfileData({
                    firstName: userProfile.firstName,
                    lastName: userProfile.lastName,
                    email: userProfile.email,
                })
            } catch (error) {
                console.log(error.message)
            }
        }
        getProfile()
    }, [profileData])

    const inputHandler = (e) => {
        setProfileUpdate((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const checkError = (e) => {
        const valid = validate(e.target.name, e.target.value)

        setProfileUpdateError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: valid
        }))
    }

    const emptyError = (e) => {
        setProfileUpdateError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: ""
        }))
    }

    const editProfile = () => {
        setEditable(true)
        for (const element in profileUpdate) {
            profileUpdate[element] = ""
        }
    }

    const saveProfile = async () => {
        try {
            const fetched = await updateOwnProfile(storagedToken, profileUpdate)
            const updateData = fetched.data

            let valid = ""

            !updateData ? setUpdateMsg(fetched.message) : null
            for (const element in profileUpdate) {
                valid = validate(element, profileUpdate[element])
                if (valid !== "") {
                    setUpdateError(true)
                    setUpdateMsg(valid)
                    return valid
                } else {
                    setUpdateError(false)
                }
            }
            if (profileUpdate.passwordHash !== profileUpdate.verifyPassword) {
                setUpdateError(true)
                valid = "Both password have to match!"
                return valid
            }
            !updateError
                ? (
                    setProfileData({
                        firstName: updateData.firstName,
                        lastName: updateData.lastName,
                        email: updateData.email,
                        passwordHash: updateData.passwordHash,
                        verifyPassword: updateData.verifyPassword
                    }),
                    // setValidUpdate("no"),
                    setUpdateMsg("Profile updated!"),
                    setTimeout(() => {
                        setUpdateMsg("")
                    }, 1200),
                    setEditable(false)
                )
                : setUpdateMsg(valid)
        } catch (error) {
            console.log(error.message);
        }
    }

    // Profile Render

    return (
        <>
            <Header />
            <div className="profileDesign">
                {editable === false
                    ? (
                        <CCard className="cardDesign">
                            <div className="profileTextBox">
                                <div className="profileText">{profileData.firstName}</div>
                                <div className="profileText">{profileData.lastName}</div>
                                <div className="profileText">{profileData.email}</div>
                            </div>
                        </CCard>
                    ) : (
                        <CCard className="cardUpdate">
                            <div className="profileTextBox">
                                <CInput
                                    className={"inputDesign"}
                                    type={"text"}
                                    name={"firstName"}
                                    value={profileUpdate.firstName || ""}
                                    placeholder={profileData.firstName}
                                    onClick={(e) => emptyError(e)}
                                    onChange={(e) => inputHandler(e)}
                                    onBlur={(e) => checkError(e)}
                                />
                                {/* <div className={"errorMsg"}>{profileUpdateError.firstNameError}</div> */}
                                <CInput
                                    className={"inputDesign"}
                                    type={"text"}
                                    name={"lastName"}
                                    value={profileUpdate.lastName || ""}
                                    placeholder={profileData.lastName}
                                    onClick={(e) => emptyError(e)}
                                    onChange={(e) => inputHandler(e)}
                                    onBlur={(e) => checkError(e)}
                                />
                                {/* <div className={"errorMsg"}>{profileUpdateError.lastNameError}</div> */}
                                <CInput
                                    className={"inputDesign"}
                                    type={"email"}
                                    name={"email"}
                                    value={profileUpdate.email || ""}
                                    placeholder={profileData.email}
                                    onClick={(e) => emptyError(e)}
                                    onChange={(e) => inputHandler(e)}
                                    onBlur={(e) => checkError(e)}
                                />
                                {/* <div className={"errorMsg"}>{profileUpdateError.emailError}</div> */}
                                <CInput
                                    className={"inputDesign"}
                                    type={"password"}
                                    name={"passwordHash"}
                                    value={profileUpdate.passwordHash || ""}
                                    placeholder={"input new password"}
                                    onClick={(e) => emptyError(e)}
                                    onChange={(e) => inputHandler(e)}
                                    onBlur={(e) => checkError(e)}
                                />
                                {/* <div className={"errorMsg"}>{profileUpdateError.passwordHashError}</div> */}
                                <CInput
                                    className={"inputDesign"}
                                    type={"password"}
                                    name={"verifyPassword"}
                                    value={profileUpdate.verifyPassword || ""}
                                    placeholder={"repeat new password"}
                                    onClick={(e) => emptyError(e)}
                                    onChange={(e) => inputHandler(e)}
                                    onBlur={(e) => checkError(e)}
                                />
                                {/* <div className={"errorMsg"}>{profileUpdate.verifyPassword}</div> */}
                            </div>
                        </CCard>
                    )}
                <CButton className={updateError === false ? "buttonDesign" : "updateError"} onClick={editable === false ? editProfile : saveProfile} title={editable === false ? "Edit profile" : "Save changes"} />
                <div className="errorMsg">{updateMsg}</div>
            </div >
        </>
    )
}