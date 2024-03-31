import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import './appointments.css'
import { Header } from "../../common/header/header";
import { deleteAppointment, getOwnAppointments } from "../../services/apiCalls";
import { CButton } from "../../common/c-button/cButton";
import { CText } from "../../common/c-text/cText";

export const Appointments = () => {

    const tokenData = JSON.parse(localStorage.getItem("passport"))
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [storagedToken, setStoragedToken] = useState(tokenData?.userToken)
    const [updateDate, setUpdateDate] = useState(false)
    const [editData, setEditData] = useState({
        date: "",
        service: ""
    })

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
    }, [appointments])

    const selectAppointment = async (index) => {
        const deleteDate = appointments[index].appointmentDatetime
        console.log(deleteDate);
        setEditData({
            date: deleteDate,
            service: appointments[index].service.id
        })
        try {
            const fetched = await deleteAppointment(storagedToken, editData)
            console.log(fetched);
        } catch (error) {
            console.log(error);
        }
        setTimeout(() => {
            setEditData({
                date: "",
                service: ""
            })
        }, 2000);
    }



    return (
        <>
            <Header />
            {appointments.length < 3
                ? (
                    <div className="appointmentsDesignEmpty">
                        {appointments.map((appointments, index) => (
                            <CText key={index} className={"textDesignAppointments"}>
                                <div className="AppointmentsText">
                                    <div className={""}>{dayjs(appointments.appointmentDatetime, "YYYY-MM-DD").format("MMM-DD-YYYY")}</div>
                                    <div className="">{appointments.service.serviceName}</div>
                                </div>
                                <div className="appointmentsInputs"></div>
                                <CButton title={"Delete appointment"} onClick={() => selectAppointment(index)} />
                            </CText>

                        ))}
                    </div>
                )
                : (
                    <div className="appointmentsDesign">
                        {appointments.map((appointments, index) => (
                            <CText key={index} className={"textDesignAppointments"}>
                                <div className="AppointmentsText">
                                    <div className="appointmentDatetime">{dayjs(appointments.appointmentDatetime, "YYYY-MM-DD").format("MMM-DD-YYYY")}</div>
                                    <div className="service">{appointments.service.serviceName}</div>
                                </div>
                                <CButton title={"Delete appointment"} onClick={() => selectAppointment(index)} />
                            </CText>

                        ))}
                    </div>
                )
            }

        </>
    )
}