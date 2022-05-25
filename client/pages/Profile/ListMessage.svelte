<script>
import { user } from "../../stores/store"
import { pretifyTime } from "../../utils/utils";

    export let time
    export let sender
    export let reciever
    export let content
    export let id
    export let is_read
    export let renderMessage

    time = pretifyTime(time)

    $: showAsRead = sender === $user.username ? true : is_read

    function openMessage() {
        if (!showAsRead) {
            //fetch and update state
            showAsRead = true
        }
        renderMessage(id)
    }
</script>

<div class="container" class:notRead={!showAsRead} on:click={openMessage}>
<small id="time">{time}</small>
<small class:notRead={!showAsRead}>
    {sender === $user.username ? `To: ${reciever}` : `From: ${sender}` }
</small>
<p>{content}</p>
</div>

<style>
.container {
    text-align: left;
    background-color: #f0f0f0;
    white-space: nowrap;
    border: 2px solid #dedede;
    border-radius: 5px;
    padding-top:10px;
    padding-left:10px;
    margin: 10px;
}

.container:hover {
   box-shadow: 0 4px 6px 0 rgb(0 0 0 / 10%), 0 5px 80px 0 rgb(0 0 0 / 5%);
   cursor: pointer;
}
small {
    margin: 0, 5, 0, 5px;
}

#time {
    float: right;
    padding: 10px;
}

.notRead {
    font-weight: bold;
    background-color: rgb(239, 255, 255);
}
</style>
