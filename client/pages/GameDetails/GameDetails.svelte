<script>
import { onMount } from "svelte";
import { navigate } from "svelte-routing";

import Logo from "../../components/logo.svelte";
let game = {}
export let id = ""
export let isFav = false

onMount( async () => {
   const res = await fetch(`/api/games/${id}`)
   const data = await res.json()
   game = data
})

</script>
<div class="flex-container">

   <div id="img-wrapper" class="flex-child">
      <span id="heart">{isFav ? '🖤' : '🤍'}</span>
      <div id="img-container">
         <img src="/images/{game.img}" alt={game.name} style="height:600px;width:auto;"/>
      </div>
   </div>
   
   <div class="flex-child">
      <div id="txt-wrapper">
         <h2>{game.name}</h2>
         <p>Year: {game.year}</p>
         <p>Platform: {game.platform}</p>
         <p> Owner: {game.username}</p>
         <button on:click|preventDefault={navigate(`/users/${id}`)}>See owner's collection</button>
         <button on:click|preventDefault={navigate(`/profile/${id}`)}>Contact owner</button>
      </div>
   </div>
</div>
   
<style>
.flex-container{
    display: flex;
    justify-content: space-around;
}

.flex-child {
    width: 42%;
}

#img-container {
   margin:auto;
}

img {
   width: 400px;
   -webkit-transition: 0.5s ease-in-out;
   transition: 0.5s ease-in-out;
   cursor: pointer;
}
img:hover {
   -webkit-transform: scale(1.05);
   transform: scale(1.05);
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