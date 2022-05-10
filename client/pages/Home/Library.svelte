<script>
    import { onMount } from "svelte";
    import Game from "../../components/Game.svelte"

    let games = []

    onMount( async () => {
        const response = await fetch("/api/games")
        const {data: gamesData} = await response.json()
        games = gamesData
    })
</script>

<div class="flex-container">
    <h2>Library</h2>
    {#each games as game}
        <Game id={game.id} name={game.name} img={game.img} platform={game.platform }></Game>
    {/each}
</div>

<style>
    div{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    
</style>