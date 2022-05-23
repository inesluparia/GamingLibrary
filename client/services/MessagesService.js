import { handleApiErrors, handleCatchedErrors } from "../utils/utils"

export const createMessage = async (username, content, reciever) => {
    let time = new Date()
    time = time.toISOString().slice(0, 19).replace('T', ' ')
    const response = fetch(`/api/${username}/msgs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            time,
            content,
            reciever
        }),
    })
    .then(handleApiErrors)
    .catch( error => {
        handleCatchedErrors(error)
    })
    return response
}

export const getUserMessages = async (username) => {
    const response = fetch(`/api/${username}/msgs`)
    .then(handleApiErrors)
    .catch( error => {
        handleCatchedErrors(error)
    })
    return response
}