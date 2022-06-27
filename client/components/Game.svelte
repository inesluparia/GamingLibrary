<script>
    import { navigate } from "svelte-routing"
    export let platform
    export let name
    export let img
    export let id
</script>

<div id="wrapper" on:click|preventDefault={navigate("/games/" + id)}>
    <div id="img-container">
        <img src="/images/{img}" alt={name} />
    </div>
    <div><b>{name}</b></div>
    <div>{platform}</div>
</div>

<style>
     #wrapper {
        background-color: rgb(255, 255, 255);
        margin: 1%;
        position: relative;
        width: 150px;
    }

    #img-container {
        width: 150px;
        height: 150px;
        overflow: hidden;
    }
    img {
        width: 150px;
        -webkit-transition: 0.3s ease-in-out;
        transition: 0.3s ease-in-out;
        cursor: pointer;

    }
    img:hover {
        -webkit-transform: scale(1.05);
        transform: scale(1.05);
    }
</style>