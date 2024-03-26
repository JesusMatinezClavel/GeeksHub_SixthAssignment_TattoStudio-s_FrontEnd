import { useEffect, useState } from 'react';
import { CInput } from "../../common/c-input/cInput";

import './profile.css'
import { Header } from "../../common/header/header";
import { CButton } from "../../common/c-button/cButton";

export const Profile = () => {

    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        passwordHash: ""
    })

    const [editable, setEditable] = useState("")

    const editProfile = () => {
        console.log(editable);
        setEditable("yes")
    }

    const saveProfile = () => {
        console.log(editable);
        setEditable("")
    }

    return (
        <>
            <Header />
            <div className="profileDesign">
                {editable === ""
                    ? (
                        <div className="profileCard">
                            <div className="profileImg"></div>
                            <div className="profileTextBox">
                                <div className="profileText"></div>
                                <div className="profileText"></div>
                                <div className="profileText"></div>
                                <div className="profileText"></div>
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
                                    value={""}
                                    placeholder={"input name"}
                                />
                                <CInput
                                    className={"inputDesign"}
                                    type={"text"}
                                    name={"firstName"}
                                    value={""}
                                    placeholder={"input name"}
                                />
                                <CInput
                                    className={"inputDesign"}
                                    type={"text"}
                                    name={"firstName"}
                                    value={""}
                                    placeholder={"input name"}
                                />
                                <CInput
                                    className={"inputDesign"}
                                    type={"text"}
                                    name={"firstName"}
                                    value={""}
                                    placeholder={"input name"}
                                />
                            </div>
                        </div>
                    )}
                <CButton onClick={editable === "" ? editProfile : saveProfile} title={editable === "" ? "Edit profile" : "Save changes"} />

            </div>
        </>
    )
}