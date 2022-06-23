<script>
   import { onMount } from "svelte"
   import { navigate } from "svelte-routing"
   import { toast } from "@zerodevx/svelte-toast"
   import { isAuthenticated, user } from "../../stores/store"
   import { deleteGame, getGameById } from "../../services/GamesService"
   import { addFavorite, removeFavorite } from "../../services/FavoritesService"
   import { toastSuccessOptions } from "../../utils/utils"
   import NewMessage from "../../components/NewMessage.svelte"

   export let id = ""
   export let isFav = false
   export let notifySocket

   let renderNewMessage = false
   let game = {}
   
   onMount( async () => game = await getGameById(id))

   function onDeleteGame() {
      let ok = deleteGame($user.username, id)
      if (ok) {
         navigate("/profile", {replace:true})
         toast.push("Your game was deleted!", toastSuccessOptions)
      }
   }

   function toggleFav(){
      if (isFav === false){
         let ok = addFavorite($user.username, id)
         if (ok) {
            toast.push("Game added to your favorites list ❤️")
            isFav = true
         }
      } else {
         let ok = removeFavorite($user.username, id)
         if (ok) {
            toast.push("Game removed from favorites.")
            isFav = false
         }
      }
   }

</script>

<div class="flex-container">
   <div id="img-wrapper" class="flex-child">
      <div id="img-container">
         <img
            src="/images/{game.img}"
            alt={game.name}
         />
      </div>
   </div>

   <div class="flex-child">
      {#if !renderNewMessage}
         <div id="txt-wrapper">
            <h2>{game.name}</h2>
            {#if game.owner_id !== $user.userId}
               <span id="heart" on:click={toggleFav}>{isFav ? "❤️" : "🤍"}</span>
            {/if}
            <p>Year: {game.year}</p>
            <p>Platform: {game.platform}</p>
            <p>Owner: {game.username}</p>
            {#if game.owner_id === $user.userId}
               <button on:click|preventDefault={onDeleteGame}
                  >Delete from your collection</button
               >
            {:else}
               <button on:click|preventDefault={() => navigate(`/users/${game.username}`)}
                  >See {game.username}'s collection</button
               >
               <button on:click|preventDefault={()=> $isAuthenticated ? renderNewMessage = true : navigate("/login", {
                  replace: true
                })}
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
      /* position: absolute;
      top: 40px;
      right: 40px; */
      /* z-index: 1; */
      cursor: pointer;
   }
   span {
      font-size: larger;
      font-weight: bold;
   }
</style>
