<script>
    import { fly } from 'svelte/transition'
    export let accept
</script>
    <div id="wrapper" transition:fly="{{ y: 200, duration: 2000 }}">
        <div>
            <p>GDPR Notice</p>
            <p>Welcome! Please note this site uses only strictly necessary cookies.</p>
        </div>
        <button on:click={accept()}>Accept cookies</button>
    </div>
<style>
    #wrapper {
    font-size: large;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: black;
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px auto;
    }

    button {
        border-color: black;
        color: black;
        margin-right: 4%;
        height: 60px;
        width: 200px;
        float: right;
    }

    button:hover {
        background-color: grey;
    }
</style>