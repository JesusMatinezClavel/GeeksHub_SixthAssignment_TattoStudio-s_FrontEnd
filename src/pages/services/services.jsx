import { getAllServices } from "../../services/apiCalls";
import { useState, useEffect } from "react";
import { newAppointment } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

import { Header } from "../../common/header/header";
import { CText } from "../../common/c-text/cText";
import { CInput } from "../../common/c-input/cInput";
import { CButton } from "../../common/c-button/cButton";
import './services.css'

export const Services = () => {

    const tokenData = JSON.parse(localStorage.getItem("passport"))
    const navigate = useNavigate()

    const [storagedToken, setStoragedToken] = useState(tokenData?.userToken)
    const [selectedService, setSelectedService] = useState([])
    const [services, setServices] = useState([])
    const [showBox, setShowBox] = useState(false)
    const [appointmentMsg, setAppointmentMsg] = useState("")
    const [appointmentData, setAppointmentData] = useState({
        date: "",
        service: ""
    })

    useEffect(() => {
        const getServices = async () => {
            try {
                const fetched = await getAllServices()
                const services = fetched.services
                setServices(services)
            } catch (error) {
                console.log(error.message);
            }
        }
        getServices()
    }, [])
    const fetched = async () => {
        const fetched = await newAppointment(storagedToken, appointmentData)
        setAppointmentMsg(fetched.message)
    }
    const createAppointment = async (index) => {
        try {
            setSelectedService(prevState => [...prevState, index]),
                showBox
                    ? (

                        fetched(),
                        setSelectedService(prevState => []),
                        setShowBox(false),
                        setTimeout(() => {
                            setAppointmentMsg("")
                        }, 2000)
                    )
                    : (
                        setAppointmentData(prevState => ({
                            ...prevState,
                            date: "",
                            service: index + 1
                        })),
                        setShowBox(true)
                    )

        } catch (error) {
            console.log(error.message);
        }
    }
    const inputHandler = (e) => (
        setAppointmentData(prevState => ({
            ...prevState,
            date: e.target.value
        })
        )
    )

    return (
        <>
            <Header />
            <div className="servicesDesign">
                {services.map((services, index) => (
                    < CText key={index} className={`textDesignServices ${index % 2 === 0 ? "right" : "reverse"}`} >
                        <div className={`serviceImg${index}`}></div>
                        <div className="servicesText">
                            <div className="serviceName">{services.serviceName}</div>
                            <div className="descriptoin">{services.description}</div>
                            {
                                tokenData
                                    ? (
                                        <CButton className={"buttonNewAppointment"} title={"New appointment"} onClick={() => createAppointment(index)} />
                                    ) : (
                                        <CButton className={"offButton"} title={"New appointment"} />
                                    )}
                            <div className={"errorMsg"}>{appointmentMsg}</div>

                            <div key={index} className={`${showBox === true && selectedService.includes(index) ? "newAppointmentShow" : "newAppointmentHide"}`}>
                                <CInput
                                    className={"inputDesign"}
                                    type={"date"}
                                    name={"date"}
                                    value={appointmentData.date || ""}
                                    onChange={(e) => inputHandler(e)}
                                />
                            </div>
                        </div>
                    </CText>
                ))}
            </div >
        </>
    )
}