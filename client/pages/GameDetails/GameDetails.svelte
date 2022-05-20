<script>
   import { onMount } from "svelte"
   import { navigate } from "svelte-routing"
   import NewMessage from "../../components/NewMessage.svelte"
   import { isAuthenticated, user } from "../../stores/store"
   import { toast } from '@zerodevx/svelte-toast'

   export let id = ""
   export let isFav = false
   export let notifySocket

   let renderMessageForm = false
   let game = {}
   
   onMount(async () => {
      const res = await fetch(`/api/games/${id}`)
      const data = await res.json()
      game = data
   });

   async function deleteGame() {
      const res = await fetch(`/api/${$user.username}/games/${id}`, { method: "DELETE" })
         .then((res) => {
            if (res.ok) {
               toast.push('The game was deleted!')
               navigate("/profile");
            } else {
               return res.json().then((body) => {
                  alert(body.message);
               });
            }
         })
         .catch((err) => {
            console.log(err);
            error = err;
            alert(err.message);
         });
   }

</script>

<div class="flex-container">
   <div id="img-wrapper" class="flex-child">
      {#if !game.owner_id === $user.userId}
         <span id="heart">{isFav ? "🖤" : "🤍"}</span>
      {/if}
      <div id="img-container">
         <img
            src="/images/{game.img}"
            alt={game.name}
         />
      </div>
   </div>

   <div class="flex-child">
      {#if !renderMessageForm}
         <div id="txt-wrapper">
            <h2>{game.name}</h2>
            <p>Year: {game.year}</p>
            <p>Platform: {game.platform}</p>
            <p>Owner: {game.username}</p>
            {#if game.owner_id === $user.userId}
               <button on:click|preventDefault={deleteGame}
                  >Delete from your collection</button
               >
            {:else}
               <button on:click|preventDefault={() => navigate(`/users/${game.username}`)}
                  >See {game.username}'s collection</button
               >
               <button on:click|preventDefault={()=> $isAuthenticated ? renderMessageForm = true : navigate("/login")}
                  >Contact {game.username}</button
               >
               {/if}
         </div>
      {:else}
         <NewMessage reciever={game.username} notifySocket={notifySocket}></NewMessage>
      {/if}
   </div>
</div>

<style>
   .flex-container {
      display: flex;
      justify-content: space-around;
   }

   .flex-child {
      width: 42%;
   }

   #img-container {
      margin: auto;
   }

   img {
      height: 500px;
      -webkit-transition: 0.5s ease-in-out;
      transition: 0.5s ease-in-out;
      cursor: pointer;
   }
   img:hover {
      -webkit-transform: scale(1.02);
      transform: scale(1.02);
   }

   #txt-wrapper {
      text-align: left;
      justify-content: center;
      padding: 5%;
      position: relative;
   }
   #img-wrapper {
      text-align: right;
      padding: 5%;
      position: relative;
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

   #heart {
      font-size: x-large;
      position: absolute;
      top: 40px;
      right: 40px;
      z-index: 1;
      cursor: pointer;
   }

   span {
      font-size: larger;
      font-weight: bold;
   }
</style>
