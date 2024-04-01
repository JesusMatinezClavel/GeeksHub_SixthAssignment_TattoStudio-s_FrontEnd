import { useState, useEffect } from "react";

import './superadmin.css'
import { Header } from "../../common/header/header";
import { CButton } from "../../common/c-button/cButton";
import { CText } from "../../common/c-text/cText";
import { superadminGetUsers, deleteUser } from "../../services/apiCalls";

export const Superadmin = () => {

    const tokenData = JSON.parse(localStorage.getItem("passport"))

    const [storagedToken, setStoragedToken] = useState(tokenData?.userToken)
    const [pageSelected, setPageSelected] = useState("")
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getServices = async () => {
            try {
                const fetched = await superadminGetUsers(storagedToken)
                setUsers(fetched.data)
            } catch (error) {
                console.log(error.message);
            }
        }
        getServices()
    }, [users])

    const getAllUsers = () => {
        pageSelected === "users"
            ? setPageSelected("")
            : setPageSelected("users")
    }

    const deleteSelected = async (index) => {
        try {
            // console.log(users[index].id);
            const fetched = await deleteUser(storagedToken, users[index].id)
            console.log(fetched);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Header />
            <div className="superadminDesign">
                <div className="superadminButtons">
                    <CButton className={"superadminButton"} title={"Call users"} onClick={() => getAllUsers()} />
                </div>
                <div className={`${pageSelected === "users" ? "allUsers" : "hide"}`}>
                    {users.map((users, index) => (
                        < CText key={index} className={"usersSuperadmin"} >
                            <div className="usersText">
                                <div className="userData">{users.firstName}</div>
                                <div className="line"></div>
                                <div className="userData">{users.lastName}</div>
                                <div className="line"></div>
                                <div className="userData">{users.email}</div>
                            <CButton title={"Delete"} onClick={() => deleteSelected(index)} />
                            </div>
                        </CText>
                    ))}
                </div>
                <div className={`${pageSelected === "" ? "noneSelected" : "hide"}`}>Choose a function</div>
            </div >
        </>
    )
}