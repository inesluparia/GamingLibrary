<script>
    import { onMount } from "svelte";
    import Game from "../../components/Game.svelte"
    import { user } from "../../stores/store"

    let games = []

    onMount( async () => {
        const response = await fetch( `/api/${$user.username}/games`)
        const gamesData = await response.json()
        games = gamesData
    })
</script>
<div>
    <h2>Your Collection</h2>
    <div class="flex-container">
        {#each games as game}
        <Game id={game.id} name={game.name} img={game.img} platform={game.platform}></Game>
        {/each}
    </div>
</div>

<style>
    div{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>