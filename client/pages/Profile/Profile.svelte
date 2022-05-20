<script>
import { isAuthenticated, user } from "../../stores/store"
import Favorites from "./Favorites.svelte"
import GamesCollection from "./GamesCollection.svelte"
import Settings from "./Settings.svelte"
import AddGame from "./AddGame.svelte"
import Messages from "./Messages.svelte"
import { navigate } from "svelte-routing"
import { toast } from "@zerodevx/svelte-toast"

let content = "collection"

async function signOut(){    
    $isAuthenticated = false
    $user = {}
    await fetch("/auth/signout").then(res => {
            if (res.ok) {
                    toast.push("Your are logged out", {
                        theme: {'--toastBackground': '#2F855A' }
                    })
                    navigate("/")
            }
            else {
                return res.json().then((body) => {
                    toast.push(body.message, {
                        theme: {
                            '--toastBackground': '#F56565',
                            '--toastBarBackground': '#C53030'
                        }
                    })
                })
            }    
})}

</script>

<h1>Hello {$user.username}!</h1>

<div class="flex-container">
    <div id="options" class="flex-child">
        <button class:active="{content === "collection"}" on:click={()=> content = "collection"} >👦  Your Collection</button>
        <button class:active="{content === "addGame"}" on:click={()=> content = "addGame"} >🎮  Add Game</button>
        <button class:active="{content === "activities"}" on:click={()=> content = "activities"}>🔔  Activities</button>
        <button class:active="{content === "favorites"}" on:click={()=> content = "favorites"}>❤  Favorites</button>
        <button class:active="{content === "settings"}" on:click={()=> content = "settings"}>⚙  Settings</button>
        <div id="signout" on:click={signOut} >SIGN OUT</div>
    </div>
    <div id="content" class="flex-child">
        {#if content === "favorites"}
            <Favorites/>
        {/if}
        {#if content === "collection"}
            <GamesCollection/>
        {/if}
        {#if content === "activities"}
            <Messages/>
        {/if}
        {#if content === "settings"}
            <Settings/>
        {/if}
        {#if content === "addGame"}
            <AddGame/>
        {/if}
    </div>
</div>

<style>
.flex-container{
display: flex;
justify-content: space-around;
}

#signout {
    text-align: left;
    float: left;
    padding: 20px;
    margin-left: 30px;
}
#signout:hover{
    color: blue;
    cursor: pointer;
}

#options {
   width: 30%;
   display: flex;
   flex-direction: column;
   text-align: center;
   padding: 5%;
}
#content {
   width: 60%;
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
#content{
    text-align: center;
        margin:auto;
        justify-content: center;
}    
</style>