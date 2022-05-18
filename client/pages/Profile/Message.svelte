<script>
    import { user } from "../../stores/store";

    export let time;
    export let sender;
    export let reciever;
    export let content;
    // export let id
    // export let is_read

    // let prettyTime = new Date(time)
    // prettyTime = prettyTime.getHours() + ":" + prettyTime.getMinutes() + " " + prettyTime.getDate() + "/" + prettyTime.getMonth()

    time = new Date(time);
    time =
        time.getHours() +
        ":" +
        time.getMinutes() +
        " " +
        time.getDate() +
        "/" +
        time.getMonth();
</script>

<div class="container">
    <div id="time">{time}</div>
    <div>
        {sender === $user.username ? `To: ${reciever}` : `From: ${sender}`}
    </div>
    <p>{content}</p>
    <button
        >Write a message to {sender === $user.username
            ? reciever
            : sender}</button
    >
</div>

<style>
    .container {
        background-color: #f0f0f0;
        border: 2px solid #dedede;
        border-radius: 5px;
        padding: 10px;
        height: 400px;
        margin: 10px;
    }

    #time {
        float: right;
        padding: 10px;
    }
</style>
