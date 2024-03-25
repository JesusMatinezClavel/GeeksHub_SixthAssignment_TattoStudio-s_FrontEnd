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
        console.log(data);

        if (!data.success) {
            throw new Error(data.message)
        }
        return data
    } catch (error) {
        return error
    }
}