<script>
import { navigate } from "svelte-routing"
import { toast } from '@zerodevx/svelte-toast'
import { createGame } from "../../services/GamesService"
import { user } from "../../stores/store"
import { toastSuccessOptions } from "../../utils/utils"

export let backToCollection

let error = ""
let previewImg
let fileinput
let image
let name
let platform
let year

let requireImg = false

async function submit() {
    
    if (!previewImg){
        requireImg = true
        return
    }
    else {

        const form = new FormData()
        form.append("name", name)
        form.append("platform", platform)
        form.append("year", year)
        form.append("uploaded_img", image)

        //ok is a promise!!!
        let ok = await createGame($user.username, form)
        console.log('logging.........', ok)
        if (ok) {
            navigate("/profile")
            toast.push("Your game was added!", toastSuccessOptions)
            backToCollection()
        }
    }
}

function onFileSelected(e) {
    image = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onload = e => {
        previewImg = e.target.result
    }
}

</script>
<div id="wrapper">
    
    <div class="container">
        <div class="clickable" on:click={fileinput.click()}>Choose an Image</div>
        <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={onFileSelected} bind:this={fileinput}>
        <div id="preview-container">
            {#if previewImg}
            <img src="{previewImg}" alt="Preview" />
            {:else}
            {#if requireImg}
            <span class="red">Please upload an image</span>
            {:else}
            <span>Image preview</span>
            {/if}
            {/if}
        </div>
    </div>
    
    <div class="container">
        <form on:submit|preventDefault={submit}>
            <div>
                <label for="name">Name</label>
                <input name="name" bind:value={name} required>
            </div>        
            <div>
                <label for="year">Year</label>
                <input name="year" bind:value={year} required>
            </div>        
            <div>
                <label for="platform">Platform</label>
                <select bind:value={platform}>
                    <option value="PS4">PS4</option>
                    <option value="PS5">PS5</option>
                    <option value="Xbox">Xbox</option>
                    <option value="Switch">Switch</option>
                    <option value="Wii">Wii</option>
                </select>
            </div>        
            <div class="error-message">
                <small>{error}</small>
            </div>
            <button type="submit">Add Game</button>           
        </form>
    </div>
</div>

<style>

 select {
    width: 200px;
 }   
#wrapper {
    display: flex;
}

.container {
    display: flex;
    margin: 50px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#preview-container {
    width: 150px;
    min-height: 200px;
    border: 2px solid #ddd;
    margin: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #ccc;
  }
  img {
    width: 100%;
  }
  .clickable:hover {
      color: blue;
      cursor: pointer;
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

.red {
    color: red;
}
</style>
