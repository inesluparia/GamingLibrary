<script>
	import About from "../pages/About/About.svelte"
	import Home from "../pages/Home/Home.svelte"
	import GameDetails from "../pages/GameDetails/GameDetails.svelte"
	import UserDetails from "../pages/UserDetails/UserDetails.svelte"
	import Login from "../pages/Login-Signup/Login-Signup.svelte"
	import Profile from "../pages/Profile/Profile.svelte"
	import Footer from "../components/Footer.svelte"
	import GdprBanner from "../components/GdprBanner.svelte"
	
	import { Route, Router, Link } from "svelte-routing"
	import { isAuthenticated, user } from "../stores/store"

	import { SvelteToast } from '@zerodevx/svelte-toast'
    import { toast } from '@zerodevx/svelte-toast'

	import io from "socket.io-client"
	import { onMount } from "svelte"
	
	onMount(async () => {
		const res = await fetch("/auth/getuser")
		const {username} = await res.json()
		if ( $isAuthenticated && username === $user.username) {
			socketLogin()
		} else { 
			localStorage.clear()
			$isAuthenticated = false
			$user = {}
			notifyGdpr = true
		}	
	})

	let notifyGdpr = false

	let socket 

	function socketLogin() {
		socket = io()
		socket.emit("login", {username: $user.username})
		socket.on("notify reciever", (data)=> {
			toast.push(`You just recieved a new message from ${data.sender}!`)
		})
	}

	function socketNewMessage(data){
		socket.emit("new message", data)
	}

	export let url = ""	

</script>
<SvelteToast/>

<Router {url}>
	<main>
		<nav>
			<div id="logo" class="nav-link">
				<Link to="/"><img src="./images/logo.png" alt="logo"></Link>
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
			<Route path="/login"><Login loginSocket={socketLogin}/></Route>
			<Route path="/profile">
				{#if $isAuthenticated}
					<Profile notifySocket={socketNewMessage}/>
				{:else}
					<Login loginSocket={socketLogin}/>
				{/if}	
			</Route>
			<Route path="/games/:id" let:params>
				<GameDetails id={params.id} notifySocket={socketNewMessage}/>
			</Route>
			<Route path="/users/:username" let:params>
				<UserDetails username={params.username} notifySocket={socketNewMessage}/>
			</Route>
		
	</main>
	
</Router>
{#if notifyGdpr}
	<GdprBanner accept={() => notifyGdpr = false}></GdprBanner>/>
{/if}	
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
		min-height: calc(100vh - 6em);
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
