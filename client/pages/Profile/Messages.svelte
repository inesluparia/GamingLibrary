<script>
import { onMount } from "svelte"
import Message from "./Message.svelte"
import { user } from "../../stores/store"

let messages = []

onMount( async ()=> {
    const res = await fetch(`/api/${$user.userId}/msgs`)
    const data = await res.json()
    messages = data
})

</script>
<h4>Your recent activity</h4>
<div>
    {#if messages.length}
        {#each messages as msg}
            <Message {...msg}/>
        {/each}
    {:else}
        <h4>You don't have any messages yet</h4>
    {/if}
</div>

