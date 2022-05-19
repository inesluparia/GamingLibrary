<script>
    import { onMount } from "svelte";
    import Game from "../../components/Game.svelte"
    import { isAuthenticated } from "../../stores/store"
    import NewMessage from "../../components/NewMessage.svelte"
    import { navigate } from "svelte-routing";
    export let username

    let games = []

    onMount( async () => {
        const response = await fetch( `/api/${username}/games`)
        const gamesData = await response.json()
        games = gamesData
    })

    let renderMessageForm = false
</script>

{#if renderMessageForm}
    <NewMessage reciever={username}></NewMessage>
{:else}
<div>
    <h2>{username}'s Collection</h2>
    <div class="flex-container">
        {#each games as game}
        <Game id={game.id} name={game.name} img={game.img} platform={game.platform}></Game>
        {/each}
    </div>
</div>
<button on:click|preventDefault={()=> $isAuthenticated ? renderMessageForm = true : navigate("/login")}
    >Contact {username}</button
 >

 {/if}
<style>
    div{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>