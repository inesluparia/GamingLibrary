import { handleApiErrors, handleCatchedErrors } from "../utils/utils"

export const getAllGames = async () => {
   const data = await fetch(`/api/games`)
   .then(handleApiErrors)
   .catch((error) => {
      handleCatchedErrors(error)
   })
   return data 
}

export const getGameById = async (id) => {
   const data = await fetch(`/api/games/${id}`)
   .then(handleApiErrors)
   .catch((error) => {
      handleCatchedErrors(error)
   })
   return data   
}
export const getGamesByUser = async (username) => {
   const response = await fetch(`/api/${username}/games`)
      .then(handleApiErrors)               
      .catch((error) => {
         handleCatchedErrors(error)
      })
   return response   
}

// export const getFavsByUser = async (username) => {
//    const response = await fetch(`/api/${username}/favs`)
//       .then(handleApiErrors)               
//       .catch((error) => {
//          handleCatchedErrors(error)
//       })
//    return response   
// }

export const deleteGame = async (username, gameId) => {
   const response = await fetch(`/api/${username}/games/${gameId}`, { method: "DELETE" })
      .then(handleApiErrors)               
      .catch((error) => {
         handleCatchedErrors(error)
      })
   return response   
}

export const createGame = async (username, form) => {
   const response = await fetch(`/api/${username}/games`, {
         method: "POST",
         body: form
   })
   .then(handleApiErrors)               
   .catch((error) => {
      handleCatchedErrors(error)
   })
   return response
}