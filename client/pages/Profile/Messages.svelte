<script>
import { onMount } from "svelte"
import ListMessage from "./ListMessage.svelte"
import Message from "./Message.svelte"
import { user } from "../../stores/store"
import { getUserMessages } from "../../services/MessagesService";

let messages = []

onMount( async ()=> {
    const response = await getUserMessages(username)
    messages = response.data
})

let display = "activities"
let messageToOpen = {}

function showMessage(id){
    messageToOpen = messages.find( m => m.id == id)
    display = "message"
}

</script>
<div class:hide={display !== "activities"}>
    {#if messages.length}
        <h3>Your recent activity</h3>
        <div id="wrapper">
            {#each messages as msg}
            <ListMessage renderMessage={showMessage} {...msg}/>
            {/each}
        </div>
    {:else}
        <h3>You don't have any messages yet</h3>
    {/if}
</div>
{#if display === "message"}
    <Message {...messageToOpen}/>
{/if}
<div class:hide={display !== "newMessage"}>

</div>

<style>
    .hide {
		display: none;
	}
    #wrapper {
    height: 400px;
    overflow-y: scroll;
    }
    #wrapper::-webkit-scrollbar { 
    display: none;
    }
</style>