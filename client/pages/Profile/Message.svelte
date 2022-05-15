<script>
    export let msg = {}
</script>

<div>
<span>From: {msg.from}</span><span>To: {msg.to}</span>
<p>{msg.content}</p>
</div>

<style>
div {
    background-color: lightcyan;
    border-radius: 0.5rem;
    height: 200px;
    white-space: nowrap;
}

</style>
