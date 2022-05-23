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

export const deleteGame = async (username, gameId) => {
   const res = await fetch(`/api/${username}/games/${gameId}`, { method: "DELETE" })
      .then(handleApiErrors)               
      .catch((error) => {
         handleCatchedErrors(error)
      })
}