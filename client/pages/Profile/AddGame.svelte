<script>
import { navigate } from "svelte-routing";

    import { user } from "../../stores/store"
    let error = ""
    let previewImg
    let fileinput
    let image
    let name
    let platform
    let year

    import { toast } from '@zerodevx/svelte-toast'

    function submit() {
        
        const form = new FormData()
        form.append("name", name)
        form.append("platform", platform)
        form.append("year", year)
        form.append("uploaded_img", image)

        fetch(`/api/${$user.username}/games`, {
            method: "POST",
            body: form
        })
        .then(res => {
            if (res.ok) {
                return res.json().then(() => {                        
                    toast.push("Your game was added!", {
                        theme: {'--toastBarBackground': '#2F855A' }
                    })
                    navigate("/profile")
                });
            } else {
                return res.json().then((body) => {
                    toast.push(body.message, {
                        theme: {
                            '--toastBackground': '#F56565',
                            '--toastBarBackground': '#C53030'
                        }
                    })
                })
            }
        })
        .catch((err) => {
                console.log(err)
                error = err
                alert(err.message)
            });
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
        <!-- <span><input type="file" name="uploaded_img" bind:this={input}/></span> -->
        <div class="clickable" on:click={fileinput.click()}>Choose an Image</div>
        <input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={onFileSelected} bind:this={fileinput} >
        <div id="preview-container">
            {#if previewImg}
            <img src="{previewImg}" alt="Preview" />
            {:else}
            <span>Image Preview</span>
            {/if}
        </div>
    </div>
    <div class="container">
        <div>
            <label for="name">Name</label>
            <input name="name" bind:value={name}/>
        </div>        
        <div>
            <label for="platform">Platform</label>
            <input name="platform" bind:value={platform}/>
        </div>        
        <div>
            <label for="year">Year</label>
            <input name="year" bind:value={year}/>
        </div>        
        <div class="error-message">
            <small>{error}</small>
        </div>
        <button on:click={submit}>Add Game</button>           
    </div>
</div>
<style>
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
</style>
