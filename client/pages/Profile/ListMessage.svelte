<script>
    import { updateMessage } from "../../services/MessagesService"
    import { user } from "../../stores/store"
    import { pretifyTime } from "../../utils/utils"

    export let time
    export let sender
    export let reciever
    export let content
    export let id
    export let is_read
    export let renderMessage

    time = pretifyTime(time)

    $: showAsRead = sender === $user.username ? true : is_read

    async function openMessage() {
        if (!showAsRead) {
            await updateMessage($user.username, id)
            showAsRead = true
        }
        renderMessage(id)
    }

</script>

<div class="container" class:notRead={!showAsRead} on:click={openMessage}>
    <div id="top-wrapper">
        <small class:notRead={!showAsRead}>
            {sender === $user.username ? `To: ${reciever}` : `From: ${sender}` }
        </small>
        <small id="time">{time}</small>
    </div>
    <p>{content}</p>
</div>

<style>
    #top-wrapper {
        display: flex;
        justify-content: space-between;
    }
    .container {
        display: block;
        background-color: #f0f0f0;
        border: 2px solid #dedede;
        border-radius: 5px;
        padding-top:10px;
        padding-left:10px;
        margin: 10px;
    }
    p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding:0 15px;

    }
    .container:hover {
        box-shadow: 0 4px 6px 0 rgb(0 0 0 / 10%), 0 5px 80px 0 rgb(0 0 0 / 5%);
        cursor: pointer;
    }
    small {
        margin:0 15px;
    }
    .notRead {
        font-weight: bold;
        background-color: rgb(239, 255, 255);
    }
</style>
