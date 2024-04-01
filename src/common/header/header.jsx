import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import './header.css'
import { Navigator } from "../navigator/navigator";

export const Header = () => {

    const navigate = useNavigate()
    const tokenData = JSON.parse(localStorage.getItem("passport"))

    const [userDeploy, setUserDeploy] = useState(false)

    const logOut = () => {
        localStorage.removeItem("passport")
        navigate("/")
    }

    const click = () => {
        userDeploy
            ? setUserDeploy(false)
            : setUserDeploy(true)
    }

    console.log(userDeploy);

    return (
        <div className="headerDesign">
            <div className="headerHome">
                <Navigator title={"Home"} destination="/" />
            </div>
            {!tokenData?.userToken
                ? (
                    <div className="headerRest">
                        <Navigator title={"Services"} destination="/services" />
                        <Navigator title={"Login"} destination="/login" />
                    </div>
                ) : tokenData?.userTokenData.roleName === "super_admin"
                    ? (

                        <div className="headerRest">
                            <Navigator title={"SuperAdmin"} destination="/superadmin" />
                            <Navigator title={"Services"} destination="/services" />
                            <Navigator title={"Profile"} destination="/users/profile" />
                            <Navigator title={"Appointments"} destination="/appointments" />
                            <div onClick={logOut}>
                                <Navigator title={"LogOut"} destination="/" />
                            </div>
                        </div>
                    ) : (
                        <div className="headerRest">
                            <Navigator title={"Services"} destination="/services" />
                            <div className="userDeployable">
                                <img src="../../../img\profile/userImg.png" alt="userProfile Default Image" onClick={() => click()} />
                                <div className={`${userDeploy ? "userOptions" : "userOptionshidden"}`}>
                                    <div className="optionsProfile">
                                        <Navigator className={"optionsLink"} title={"Profile"} destination="/users/profile" />
                                        <Navigator className={"optionsLink"} title={"Appointments"} destination="/appointments" />
                                        <div onClick={logOut}>
                                            <Navigator className={"optionsLink"} title={"LogOut"} destination="/" />
                                        </div>
                                    </div>
                                    <div className="optionsAppointments"></div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}