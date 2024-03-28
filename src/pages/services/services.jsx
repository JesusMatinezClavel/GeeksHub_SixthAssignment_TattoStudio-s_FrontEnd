import { getAllServices } from "../../services/apiCalls";
import { useState, useEffect } from "react";

import { Header } from "../../common/header/header";
import { CCard } from "../../common/c-card/cCard";
import { CText } from "../../common/c-text/cText";
import { CButton } from "../../common/c-button/cButton";
import './services.css'

export const Services = () => {

    const [services, setServices] = useState([])

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

    return (
        <>
            <Header />
            <div className="servicesDesign">
                {services.map(services=>(
                <CCard key={services.id} className={"cardDesignServices"}>
                    <CText>
                        <div className="serviceName">{services.serviceName}</div>
                        <div className="descriptoin">{services.description}</div>
                        <CButton title={"New appointment"}/>
                    </CText>
                </CCard>
                ))}
            </div>
        </>
    )
}