<script>
import Login from "./Login.svelte"
import Signup from "./Signup.svelte"

export let loginSocket
let toggle = true

</script>

<div id="container">
    <div>
        <button class:active="{toggle}" on:click={() => toggle = true } >I already have a user</button>
        <button class:active="{!toggle}" on:click={() => toggle = false } >I am new here</button>
    </div>
    <div>
        {#if toggle}
        <Login loginSocket={loginSocket}></Login>
        {:else}
        <Signup></Signup>
        {/if}
    </div>
</div>

<style>
    #container {
        margin-top: 5%;
    }
    .active {
        background-color: rgb(255, 173, 21); 
        color:white;
    }

    button {      
        width: 200px; 
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