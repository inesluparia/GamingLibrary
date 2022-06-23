import { handleApiErrors, handleCatchedErrors } from "../utils/utils"

export const addFavorite = async (username, gameId) => {    
    const response = fetch(`/api/${username}/favs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            gameId
        }),
    })
    .then(handleApiErrors)
    .catch( error => {
        handleCatchedErrors(error)
    })
    return response
}

export const removeFavorite = async (username, gameId) => {
    const response = fetch(`/api/${username}/favs/${gameId}`, {
        method: "DELETE"
    }).then(handleApiErrors)
    .catch( error => {
        handleCatchedErrors(error)
    })
    return response
}

export const getUserFavorites = async (username) => {
    const response = await fetch(`/api/${username}/favs`)
    .then(handleApiErrors)
    .catch( error => {
        handleCatchedErrors(error)
    })
    return response
}

export const isFavorite = async (gameId, username) => {
    const response = await fetch(`/api/${username}/favs/${gameId}`)
    .then(handleApiErrors)
    .catch( error => {
        handleCatchedErrors(error)
    })
    return response.length
}