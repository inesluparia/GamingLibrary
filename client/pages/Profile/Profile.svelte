<script>
import { user } from "../../stores/store"
import Favorites from "./Favorites.svelte"
import Activities from "./Activities.svelte"
import GamesCollection from "./GamesCollection.svelte"
import Settings from "./Settings.svelte"

let content = "collection"

</script>

<h1>Hello {$user.username}!</h1>

<div class="flex-container">
    <div id="options" class="flex-child">
        <button class:active="{content === "collection"}" on:click={()=> content = "collection"} >My Collection</button>
        <button class:active="{content === "addGame"}" on:click={()=> content = "addGame"} >🎮 Add Game</button>
        <button class:active="{content === "favorites"}" on:click={()=> content = "favorites"}>❤ Favorites</button>
        <button class:active="{content === "activities"}" on:click={()=> content = "activities"}>🔔 Activities</button>
        <button class:active="{content === "settings"}" on:click={()=> content = "settings"}>⚙ Settings</button>
    </div>
    <div id="content" class="flex-child">
        {#if content === "favorites"}
            <Favorites/>
        {/if}
        {#if content === "collection"}
            <GamesCollection/>
        {/if}
        {#if content === "activities"}
            <Activities/>
        {/if}
        {#if content === "activities"}
            <Settings/>
        {/if}
        {#if content === "addGame"}
            <Settings/>
        {/if}
    </div>
</div>

<style>
.flex-container{
display: flex;
justify-content: space-around;
}

#options {
   width: 30%;
   display: flex;
   flex-direction: column;
   text-align: center;
   justify-content: center;
   padding: 5%;
}
#content {
   width: 50%;
   padding: 5%;
}

button {      
   width: 150px; 
   height: 60px;
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

.active {
        background-color: rgb(255, 173, 21); 
        color:white;
    }
</style>