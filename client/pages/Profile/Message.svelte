<script>
    import { user } from "../../stores/store"

    export let time
    export let sender
    export let reciever
    export let content
    
    time = new Date(time)
    time = time.getHours() +":"+ time.getMinutes() +" "+ time.getDate() +"/"+ time.getMonth()
    
</script>

<div class="container">
    <span>Message {sender === $user.username ? `to ${reciever}` : `from: ${sender}`}</span>
    <span id="time"> {time} </span>
    <p>{content}</p>
    <button>Reply to {sender === $user.username ? reciever : sender}</button>
</div>

<style>
    .container {
        display: flex;
        margin: 50px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    p {
        width: 80%;
        height: 200px;
        padding: 12px 20px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        background-color: #f8f8f8;
        font-size: 16px;
        resize: none;
    }
    button {
        width: 300px;
        height: 40px;
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
    #time {
        float: right;
    }
    span {
        font-weight: bold;
    }
</style>
