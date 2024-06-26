// const root = "http://localhost:4000/api"
const root = "https://tattooshop-db-dev-jfrt.2.sg-1.fl0.io/api"


export const logReq = async (loginCredentials) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCredentials)
    }
    try {
        const response = await fetch(`${root}/auth/login`, options)
        const data = await response.json()

        return data
    } catch (error) {
        return error.message
    }
}

export const registerReq = async (registerCredentials) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerCredentials)
    }
    try {
        const response = await fetch(`${root}/auth/register`, options)
        const data = await response.json()

        return data
    } catch (error) {
        return error.message
    }
}

export const getOwnProfile = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}/users/profile`, options)
        const data = await response.json()

        return data
    } catch (error) {
        return error.message
    }
}

export const updateOwnProfile = async (token, profileUpdate) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(profileUpdate)
    }
    try {
        const response = await fetch(`${root}/users/profile`, options)
        const data = await response.json()

        if (!data.success) {
            throw new Error(data.message)
        }

        return data
    } catch (error) {
        return error
    }
}

export const getAllServices = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "Application/json"
        }
    }
    try {
        const response = await fetch(`${root}/services`)
        const data = await response.json()

        return data
    } catch (error) {
        return error.message
    }
}

export const getOwnAppointments = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}/appointments`, options)
        const data = await response.json()

        return data
    } catch (error) {
        return data.error
    }
}

export const newAppointment = async (token, appointmentData) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData)
    }
    try {
        const response = await fetch(`${root}/appointments`, options)
        const data = await response.json()

        return data
    } catch (error) {
        return data.message
    }
}

export const deleteAppointment = async (token, editData) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(editData)
    }
    try {
        const response = await fetch(`${root}/appointments`, options)
        const data = await response.json()

        return data
    } catch (error) {
        return data.message
    }
}

export const superadminGetUsers = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}/users`, options)
        const data = await response.json()

        return data
    } catch (error) {
        return data.message
    }
}

export const deleteUser = async (token, userID) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}/users/${userID}`, options)
        const data = await response.json()

        return data
    } catch (error) {
        return error.message
    }
}