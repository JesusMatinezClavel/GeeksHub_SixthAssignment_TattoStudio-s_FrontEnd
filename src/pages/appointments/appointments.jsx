import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import './appointments.css'
import { Header } from "../../common/header/header";
import { getOwnAppointments } from "../../services/apiCalls";
import { CButton } from "../../common/c-button/cButton";
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
                console.log(fetched);
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
            {appointments.length < 3
                ? (
                    <div className="appointmentsDesignEmpty">
                        <CButton title={"new Appointment"} />
                    </div>
                )
                : (
                    <div className="appointmentsDesign">
                        <CButton title={"new Appointment"} />
                        {appointments.map((appointments, index) => (
                            <CText key={index} className={"textDesignAppointments"}>
                                <div className="AppointmentsText">
                                    <div className="appointmentDate">{dayjs(appointments.appointmentDate, "YYYY-MM-DD").format("MMM-DD-YYYY HHmm")}</div>
                                    <div className="service">{appointments.service.serviceName}</div>
                                </div>
                                <CButton title={"Change appointment"} />
                            </CText>

                        ))}
                    </div>
                )
            }

        </>
    )
}