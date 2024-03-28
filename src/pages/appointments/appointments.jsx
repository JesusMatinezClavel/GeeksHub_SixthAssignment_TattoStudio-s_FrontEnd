import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import './appointments.css'
import { Header } from "../../common/header/header";
import { getOwnAppointments } from "../../services/apiCalls";
import { CCard } from "../../common/c-card/cCard";
import { CText } from "../../common/c-text/cText";

export const Appointments = () => {

    const tokenData = JSON.parse(localStorage.getItem("passport"))
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [storagedToken, setStoragedToken] = useState(tokenData?.userToken)

    useEffect(() => {
        const getAppointments = async () => {
            try {
                const fetched = await getOwnAppointments(storagedToken)
                setAppointments(fetched.data)
            } catch (error) {
                console.log(error.message);
            }
        }
        getAppointments()
    }, [])

    console.log(appointments);

    return (
        <>
            <Header />
            <div className="appointmentsDesign">
                {appointments.map((appointments, index)=>(
                    <CCard key={index} className={"cardDesign"}>
                        <CText>
                            <div className="appointmentDate">{appointments.appointmentDate}</div>
                            <div className="service">{appointments.service}</div>
                        </CText>
                    </CCard>
                ))}
            </div>
        </>
    )
}