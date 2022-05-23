import { toast } from "@zerodevx/svelte-toast"

export function handleApiErrors(response) {
    if (!response.ok) {
       return res.json().then((body) => {
          toast.push('API error: ' + body.message, toastErrorOptions)
       })
    } else return response.json()
 }
 
export function handleCatchedErrors(err) {
    console.log(err.message)
    console.error(err)
    toast.push('Error connecting to server!', toastErrorOptions)
 }
 
export const toastErrorOptions = {
    theme: {
       '--toastBackground': '#F56565',
       '--toastBarBackground': '#C53030'
    }, duration: 20000
 }
 
export const toastSuccessOptions = {
    theme: {
       '--toastBarBackground': '#2F855A'
    },
 }