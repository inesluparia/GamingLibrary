<script>
    import { onMount } from "svelte";
    import Game from "../../components/Game.svelte"

    let games = []
    $: gamesToDisplay = []
    let searchInput = ""

    onMount( async () => {
        const response = await fetch("/api/games")
        const {data: gamesData} = await response.json()
        games = gamesData
        gamesToDisplay = gamesData
    })

    function search() {    
    const upper = searchInput.toUpperCase();
    gamesToDisplay = games.filter(g => {
        const txt = [g.name, g.platform, g.year].join(' ')
        return txt.toUpperCase().indexOf(upper) > -1
        })
    }

</script>

<input on:keyup={search} id="search-input" placeholder=" Search" bind:value={searchInput}>

<div class="flex-container">
    {#each gamesToDisplay as game}
        <Game id={game.id} name={game.name} img={game.img} platform={game.platform }></Game>
    {/each}
</div>

<style>
    div{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin: 0 10%;
    }

    #search-input {
        background-image: url("/images/searchicon.png");
        background-position: 10px 12px;
        background-repeat: no-repeat;
        padding: 12px 20px 12px 40px;
        background-size: 20px 20px;
        margin: 30px;
    }
</style>