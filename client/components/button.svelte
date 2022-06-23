<style>
button{
    padding: 0.15rem 0.5rem;
    background-color: #1b1a1a;
    border: 1px solid  aliceblue ;
    cursor: pointer;
    color: white;
}

button {
        background: linear-gradient(to right, rgb(91, 79, 247), rgb(255, 17, 17));text-transform: uppercase;
        color:white;
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

<button on:click >
<slot/>
</button>
