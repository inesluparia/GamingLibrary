<script>
    import { onMount } from "svelte";
    import Game from "../../components/Game.svelte"
    import { user } from "../../stores/store"

    let games = []

    onMount( async () => {
        const response = await fetch( `/api/${$user.userId}/games`)
        const gamesData = await response.json()
        games = gamesData
    })
</script>

<div class="flex-container">
    {#each games as game}
        <Game id={game.id} name={game.name} img={game.img} platform={game.platform}></Game>
    {/each}
</div>

<style>
    div{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>