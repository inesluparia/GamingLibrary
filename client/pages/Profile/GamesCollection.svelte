<script>
import { onMount } from "svelte";
import Game from "../../components/Game.svelte"
import { getGamesByUser } from "../../services/GamesService";
import { user } from "../../stores/store"

let games = []

onMount( async () => { games = await getGamesByUser($user.username) })

</script>

<div>
    {#if games.length}
    <h2>Your Collection</h2>
    <div class="flex-container">
        {#each games as game}
        <Game id={game.id} name={game.name} img={game.img} platform={game.platform}></Game>
        {/each}
    </div>
    {:else}
        <h2>Your games collection is empty</h2>
    {/if}
</div>

<style>
    div{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>