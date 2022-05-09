<script>
import { Route, Router, Link } from "svelte-routing"
import About from "../pages/About/About.svelte"
import Library from "../pages/Library/Library.svelte"
import Details from "../pages/Details/Details.svelte"
import Login from "../pages/Login-Signup/Login.svelte"
import Button from "../components/button.svelte"

export let url = ""

</script>

<Button>Click me</Button>

<Router {url}>	
	<main>
		<nav>
			<Link to="/">Home</Link>
			<Link to="/Library">Library</Link>
			<Link to="/Login">Log in</Link>
		</nav>
		<div>
			<Route path="/"><About /></Route>
			<Route path="games/:id"><Details /></Route>
		</div>
	</main>
</Router>	

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>