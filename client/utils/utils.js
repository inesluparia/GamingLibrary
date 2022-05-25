import { toast } from "@zerodevx/svelte-toast"

export function pretifyTime(time){
   const dateTime = new Date(time)
   const prettyTime = dateTime.getHours() + ":" + dateTime.getMinutes() + " " + dateTime.getDate() + "/" + dateTime.getMonth()
   return prettyTime
}

export function handleApiErrors(response) {
    if (!response.ok) {
       return response.json().then((body) => {
          toast.push(body.message, toastErrorOptions)
       })
    } else return response.json()
 }
 
export function handleCatchedErrors(err) {
    console.log(err.message)
    console.error(err)
    toast.push('Error connecting to server!', toastBigErrorOptions)
 }
 
export const toastErrorOptions = {
   theme: {
      '--toastBarBackground': '#C53030'
   }
} 
export const toastBigErrorOptions = {
    theme: {
       '--toastBackground': '#F56565',
       '--toastBarBackground': '#C53030'
    }, duration: 10000
 }

 
export const toastSuccessOptions = {
    theme: {
       '--toastBarBackground': '#2F855A'
    },
 }