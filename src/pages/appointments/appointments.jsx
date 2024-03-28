import { useState, useEffect } from "react";

import './appointments.css'
import { Header } from "../../common/header/header";

export const Appointments = () => {

    const [appointments, setAppointments] = useState([])

    return (
        <>
            <Header />
            <div className="appointmentsDesign"></div>
        </>
    )
}