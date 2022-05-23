import { handleApiErrors, handleCatchedErrors } from "../utils/utils"

export const signupPost = async (username, email, phone, password) => {
    const response = await fetch("/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            phone,
            password
        }),
    }).then(handleApiErrors)
    .catch((error) => {
       handleCatchedErrors(error)
    })
    return response
}

export const loginPost = async (email, password) => {
    const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(handleApiErrors)
    .catch((error) => {
        handleCatchedErrors(error)
    })
    return response
}

export const singoutGet = async () => {
    const response = await fetch("/auth/signout")
    .then(handleApiErrors)
    .catch((error) => {
        handleCatchedErrors(error)
    })
    return response
}