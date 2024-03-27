import { useEffect, useState } from 'react';
import { CInput } from "../../common/c-input/cInput";
import { useNavigate } from "react-router-dom";

import './profile.css'
import { Header } from "../../common/header/header";
import { CButton } from "../../common/c-button/cButton";
import { getOwnProfile, updateOwnProfile } from '../../services/apiCalls';
import { validate } from '../../utils/utilityFunctions';

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
        passwordHash: ""
    })
    const [profileUpdate, setProfileUpdate] = useState({
        firstName: "",
        lastName: "",
        email: "",
        passwordHash: ""
    })
    const [profileUpdateError, setProfileUpdateError] = useState({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordHashError: ""
    })
    const [updateMsg, setUpdateMsg] = useState("")
    const [storagedToken, setStoragedToken] = useState(tokenData?.userToken)
    const [editable, setEditable] = useState("no")
    const [validUpdate, setValidUpdate] = useState("no")
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
        setValidUpdate("no")
        setEditable("yes")
    }

    console.log(updateMsg);

    const saveProfile = async () => {
        try {
            const fetched = await updateOwnProfile(storagedToken, profileUpdate)
            const updateData = fetched.data
            for (const element in profileUpdateError) {
                profileUpdateError[element] !== ""
                    ? setUpdateMsg(profileUpdateError[element])
                    : setValidUpdate("yes")
            }
            validUpdate === "yes"
                ? (
                    setProfileData({
                        firstName: updateData.firstName,
                        lastName: updateData.lastName,
                        email: updateData.email,
                        passwordHash: updateData.passwordHash
                    })
                ) : null
        } catch (error) {
            console.log(error.message);
        }
        validUpdate === "yes"
            ? setEditable("no")
            : null
    }

    // Profile Render

    return (
        <>
            <Header />
            <div className="profileDesign">
                {editable === "no"
                    ? (
                        <div className="profileCard">
                            <div className="profileImg"></div>
                            <div className="profileTextBox">
                                <div className="profileText">{profileData.firstName}</div>
                                <div className="profileText">{profileData.lastName}</div>
                                <div className="profileText">{profileData.email}</div>
                                <div className="profileText">{profileData.passwordHash}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="profileCard">
                            <div className="profileImg"></div>
                            <div className="profileTextBox">
                                <CInput
                                    className={"inputDesign"}
                                    type={"text"}
                                    name={"firstName"}
                                    value={profileUpdate.firstName || ""}
                                    placeholder={"input name"}
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
                                    placeholder={"input lastName"}
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
                                    placeholder={"input email"}
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
                                    placeholder={"input password"}
                                    onClick={(e) => emptyError(e)}
                                    onChange={(e) => inputHandler(e)}
                                    onBlur={(e) => checkError(e)}
                                />
                                {/* <div className={"errorMsg"}>{profileUpdateError.passwordHashError}</div> */}
                            </div>
                        </div>
                    )}
                <CButton onClick={editable === "no" ? editProfile : saveProfile} title={editable === "no" ? "Edit profile" : "Save changes"} />
                <div className="errorMsg">{updateMsg}</div>
            </div>
        </>
    )
}