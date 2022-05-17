<script>
import { user } from "../stores/store";
import { navigate } from "svelte-routing";
export let reciever
let content = "Hi! Do you want to exchange games? Check out my collection :)"
let error = ""

function renderMessageForm() {
    let time = new Date()
    time = time.toISOString().slice(0, 19).replace('T', ' ')
    fetch(`/api/${$user.username}/msgs`, {
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
        .then(res => {
            if (res.ok) {
                return res.json().then(() => {                        
                    navigate("/profile")
                    alert("Cannot  reload yet, your message was sent!")

                    });
            } else {
                return res.json().then((body) => {
                        alert(body.message)
                    })
            }
        })
        .catch((err) => {
                console.log(err)
                error = err
                alert(err.message)
            });
}
</script>

<div id="flex-container">

    <p>To: {reciever}</p>
    <p>From: {$user.username}</p>
    <p>
        <label for="content">Message</label>
        <input bind:value={content} type="text"/>
    </p>
    <small>{error}</small>
    <button on:click={renderMessageForm}>Send message</button>

</div>