<script>
    import { onMount } from "svelte"
    import ListMessage from "./ListMessage.svelte"
    import Message from "./Message.svelte"
    import { user } from "../../stores/store"
    import { getUserMessages } from "../../services/MessagesService"

    export let notifySocket

    let messages = []

    onMount( async ()=> {
        loadMessages()
    })

    async function loadMessages() {
        const response = await getUserMessages($user.username)
        messages = response.data
    }

    let display = "messages"
    let messageToOpen = {}

    function showMessage(id){
        messageToOpen = messages.find( m => m.id == id)
        display = "message"
    }
</script>

<div class:hide={display !== "messages"}>
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
    <Message updateMessages={loadMessages} {...messageToOpen} notifySocket={notifySocket} goBack={() => display = "messages"}/>
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