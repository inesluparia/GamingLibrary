<script>
import { user } from "../stores/store"
import { navigate } from "svelte-routing"
import { toast } from "@zerodevx/svelte-toast"
import { toastSuccessOptions } from "../utils/utils"
import { createMessage } from "../services/MessagesService"

export let reciever
let content = `Hi ${reciever}! 
\nDo you want to exchange games?
\nCheck out my collection and let's get in touch!`
let error = ""
export let notifySocket

async function sendMessage() {
    const ok = await createMessage($user.username, content, reciever)
    if (ok) {
        toast.push("Your message was sent!", toastSuccessOptions)
        notifySocket({
            sender: $user.username,
            reciever: reciever,
            content: content
        })
        navigate("/profile")
    }
}   
</script>

<div id="container">

    <span>To: {reciever}</span>
    <span>From: {$user.username}</span>
    <p>
        <textarea bind:value={content} type="text"></textarea>
    </p>
    <small>{error}</small>
    <button on:click={sendMessage}>Send message</button>
</div>

<style>
    #container{
        display: block;
        align-items: center;
        justify-content: center;
        padding: 5%;
        margin-top: 30px;
    }
    textarea {
        width: 80%;
        height: 400px;
        padding: 12px 20px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        background-color: #f8f8f8;
        font-size: 16px;
        resize: none;
    }
    span {
        margin: 5%;
        font-weight: bold;
    }

   button {
      width: 150px;
      height: 40px;
      margin: 15px;
      vertical-align: bottom;
      border: 0;
      box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 2px 10px 0 rgb(0 0 0 / 10%);
      font-weight: 500;
   }
   button:hover {
      box-shadow: 0 5px 7px 0 rgb(0 0 0 / 20%), 0 5px 12px 0 rgb(0 0 0 / 15%);
      cursor: pointer;
   }
</style>