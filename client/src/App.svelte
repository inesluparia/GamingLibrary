<script>
	import { Route, Router, Link } from "svelte-routing"
	import About from "../pages/About/About.svelte"
	import Home from "../pages/Home/Home.svelte"
	import Details from "../pages/GameDetails/GameDetails.svelte"
	import Login from "../pages/Login-Signup/Login-Signup.svelte"
	import Button from "../components/button.svelte"
	import Profile from "../pages/Profile/Profile.svelte"
	import Logo from "../components/logo.svelte"
	import { isAuthenticated } from "../stores/store"
	import Footer from "../components/Footer.svelte"
	export let url = ""
</script>

<Router {url}>
	<main>
		<nav>
			<div id="logo" class="nav-link">
				<Link to="/"><Logo/></Link>
			</div>
			<div class="nav-link">
				<Link to="/about">ABOUT</Link>
			</div>
			<div class="nav-link">
				<Link to="/">HOME</Link>
			</div>
			<div class="nav-link">
				{#if $isAuthenticated}
					<Link to="/profile">PROFILE</Link>
				{:else}
					<Link to="/login">LOG IN</Link>
				{/if}
			</div>
		</nav>
		
		<Route path="/"><Home /></Route>
		<Route path="/about"><About /></Route>
			<Route path="/login"><Login /></Route>
			<Route path="/profile">
				{#if $isAuthenticated}
					<Profile />
				{:else}
					<Login />
				{/if}	
			</Route>
			<Route path="/games/:id" let:params>
				<Details id={params.id} />
			</Route>
			<Route path="/users/:id" let:params>
				<Details id={params.id} />
			</Route>
		
	</main>
	
</Router>
<Footer></Footer>

<style>
	nav {
		background-color: rgb(241, 241, 241);
		padding: 1.3rem;
		display: flex;
		justify-content: space-around;
		text-align: justify;
		text-decoration: none;
	}
	nav > div {
		margin: 0px 30px 0px 30px;
		cursor: pointer;
		align-self: center;
	}
	#logo {
		font-weight: bolder;
		position:absolute;
		top:20px; 
		left:0px;
		width:70px;
		height:40px;
		overflow:hidden;
	}

	.nav-link,
	.nav-link > :global(a) {
		text-decoration: none;
		color: rgb(0, 0, 103);
		-webkit-transition: 0.1s ease-in-out;
		transition: 0.1s ease-in-out;
		display: flex;
	}
	.nav-link:hover,
	.nav-link > :global(a):hover {
		color:rgb(255, 17, 17);
		font-weight: 500;
	}
	main {
		text-align: center;
		max-width: 240px;
		margin: 0 auto;
		min-height: calc(100vh - 3.7em);
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
