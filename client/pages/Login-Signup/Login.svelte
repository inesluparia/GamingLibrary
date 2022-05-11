<script>
    import { navigate } from "svelte-routing"
    import { isAuthenticated, user } from "../../stores/store"

    let error = ""
    let email = ""
    let password = ""

    async function login() {
        await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((body) => {
                        alert(body.message)
                    });
                } else {
                    return res.json().then((jsonUser) => {
                        user.set(jsonUser)
                        isAuthenticated.set(true)
                        navigate("/profile", { replace: true })
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                error = err
                alert(err.message)
            })
    }

</script>

<div id="flex-container">
    <h2>Log in</h2>
    <form on:submit|preventDefault={login}>
        <div>
            <label for="email">Email</label>
            <input type="email" bind:value={email} />
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" bind:value={password} />
        </div>

        <button type="submit">Log in</button>

        <div class="error-message">
            <small>{error}</small>
        </div>
    </form>
</div>

<style>

    input {
        width: 300px;
    }
    button {   
        background: linear-gradient(to right, rgb(255, 171, 88), rgb(255, 71, 71));
        color: white;
        width: 150px; 
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

    .error-message{
        color: red;
    }
</style>