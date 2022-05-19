import { writable } from "svelte/store"

export const isAuthenticated = writable(localStorage.isAuth === 'true' ? true : false)

isAuthenticated.subscribe( value => localStorage.isAuth = String(value))


export const user = writable(JSON.parse(localStorage.user))

user.subscribe(value => localStorage.user = JSON.stringify(value))

