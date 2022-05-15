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

<div>
    {#if messages}
        {#each messages as msg}
            <Message {...msg}/>
        {/each}
    {:else}
        <h5>You don't have any messages yet</h5>
    {/if}
</div>

