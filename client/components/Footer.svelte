<script>
	import { navigate } from "svelte-routing"
</script>

<footer>
	<span>©{new Date().getFullYear()}</span>
	<span on:click={()=> navigate("/about")}>About</span>
	<span><a href = "mailto: inesluparia@gmail.com">Contact</a></span>
</footer>

<style>
	footer {
		color: rgb(78, 78, 78);
		padding: 30px;
        text-align: center;
	}
	span {
		padding: 0 5px;
		cursor: pointer;
	}
	a {
		color:inherit;
		text-decoration: none;
	}
 </style>   