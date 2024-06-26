import { useEffect, useState } from 'react';
import { CInput } from "../../common/c-input/cInput";
import { useNavigate } from "react-router-dom";
import { getOwnProfile, updateOwnProfile } from '../../services/apiCalls';
import { validate } from '../../utils/utilityFunctions';

import './profile.css'
import { Header } from "../../common/header/header";
import { CButton } from "../../common/c-button/cButton";
import { CCard } from '../../common/c-card/cCard';
import { CText } from "../../common/c-text/cText";
import profileImg from "../../../img/profile/userImg.png"


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
                }
            }
            if (profileUpdate.passwordHash !== profileUpdate.verifyPassword) {
                setUpdateError(true)
                valid = "Both password have to match!"
                return valid
            }
            setUpdateError(false)
            !updateError
                ? (
                    setUpdateMsg("Profile updated!"),
                    setTimeout(() => {
                        setUpdateMsg("")
                    }, 1200),
                    setEditable(false),
                    setProfileData({
                        firstName: updateData.firstName,
                        lastName: updateData.lastName,
                        email: updateData.email,
                        passwordHash: updateData.passwordHash,
                        verifyPassword: updateData.verifyPassword
                    })
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
                            <img src={profileImg} alt="profile img" />
                            <div className="profileTextBox">
                                first name
                                <CText className={"textDesignProfile"}>{profileData.firstName}</CText>
                                last name
                                <CText className={"textDesignProfile"}>{profileData.lastName}</CText>
                                email
                                <CText className={"textDesignProfile"}>{profileData.email}</CText>
                            </div>
                        </CCard>
                    ) : (
                        <CCard className="cardUpdate">
                            <img src={profileImg} alt="profile img" />
                            <div className="profileTextBox">
                                <p>edit profile</p>
                                <CInput
                                    className={"inputDesignProfile"}
                                    type={"text"}
                                    name={"firstName"}
                                    value={profileUpdate.firstName || ""}
                                    placeholder={"Input new first name"}
                                    onClick={(e) => emptyError(e)}
                                    onChange={(e) => inputHandler(e)}
                                    onBlur={(e) => checkError(e)}
                                />
                                {/* <div className={"errorMsg"}>{profileUpdateError.firstNameError}</div> */}
                                <CInput
                                    className={"inputDesignProfile"}
                                    type={"text"}
                                    name={"lastName"}
                                    value={profileUpdate.lastName || ""}
                                    placeholder={"Input new last name"}
                                    onClick={(e) => emptyError(e)}
                                    onChange={(e) => inputHandler(e)}
                                    onBlur={(e) => checkError(e)}
                                />
                                {/* <div className={"errorMsg"}>{profileUpdateError.lastNameError}</div> */}
                                <CInput
                                    className={"inputDesignProfile"}
                                    type={"email"}
                                    name={"email"}
                                    value={profileUpdate.email || ""}
                                    placeholder={"Input new email"}
                                    onClick={(e) => emptyError(e)}
                                    onChange={(e) => inputHandler(e)}
                                    onBlur={(e) => checkError(e)}
                                />
                                {/* <div className={"errorMsg"}>{profileUpdateError.emailError}</div> */}
                                <CInput
                                    className={"inputDesignProfile"}
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
                                    className={"inputDesignProfile"}
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