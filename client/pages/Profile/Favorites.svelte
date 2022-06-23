<script>
    import { onMount } from "svelte"
    import Game from "../../components/Game.svelte"
    import { getUserFavorites } from "../../services/FavoritesService"
    import { user } from "../../stores/store"
    
    let games = []
    
    onMount( async () => { games = await getUserFavorites($user.username) })
    
    </script>
    
    <div>
        {#if games.length}
        <h2>Your Favorites Collection</h2>
        <div class="flex-container">
            {#each games as game}
            <Game id={game.id} name={game.name} img={game.img} platform={game.platform}></Game>
            {/each}
        </div>
        {:else}
            <h2>Your favorites collection is empty</h2>
        {/if}
    </div>
    
    <style>
        div{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }
    </style>