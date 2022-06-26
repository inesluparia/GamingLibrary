<script>
import { onMount } from "svelte"
import { navigate } from "svelte-routing"
import { isAuthenticated, user } from "../../stores/store"
import { getGamesByUser } from "../../services/GamesService"
import Game from "../../components/Game.svelte"
import NewMessage from "../../components/NewMessage.svelte"

export let username
export let notifySocket

let games = []

onMount( async () => { games = await getGamesByUser(username) })

let renderMessageForm = false

</script>

{#if renderMessageForm}
    <NewMessage notifySocket={notifySocket} reciever={username} goBack={()=> renderMessageForm=false}></NewMessage>
{:else}
    <div>
        <h2>{username}'s Collection</h2>
        <div class="flex-container">
            {#each games as game}
            <Game id={game.id} name={game.name} img={game.img} platform={game.platform}></Game>
            {/each}
        </div>
    </div>
    {#if $user.username != username}
        <button 
            on:click|preventDefault={()=> 
            $isAuthenticated ? renderMessageForm = true : navigate(`/login?url=${encodeURIComponent("/users/" + username)}`)}
            >Contact {username}
        </button>
    {/if}
{/if}

<style>
    .flex-container{
        margin: 25 0px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
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