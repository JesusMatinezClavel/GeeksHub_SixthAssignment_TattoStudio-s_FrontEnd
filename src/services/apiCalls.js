const root = "http://localhost:4000/api"


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
