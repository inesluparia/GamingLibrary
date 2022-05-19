<script>
    import { navigate } from "svelte-routing";
    import { user, isAuthenticated } from "../../stores/store"

    let username = ""
    let email = ""
    let phone = ""
    let password = ""
    let confPassword = ""
    let error = ""

    async function signup() {
        await fetch("/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                phone,
                password
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((body) => {
                        alert(body.message)
                    })
                } else {
                    const newUser = res.json()
                    if (newUser !== undefined) {
                        user.set({
                            username: newUser.username,
                            userId: newUser.userId,
                        })
                        isAuthenticated.set(true)
                    }
                    navigate("/profile")
                }
            })
            .catch((err) => {
                console.log(err)
                error = err
                alert(err.message)
            })
        }

    function checkPasswords() {
        error = password !== confPassword ? "Passwords do not match" : ""
    }
</script>

<div>
    <h2>Sign up</h2>
    <form autocomplete="off" on:submit|preventDefault={signup}>
        <input
            autocomplete="false"
            name="hidden"
            type="text"
            style="display:none;"
        />
        <div>
            <label for="username">Username</label>
            <input type="username" bind:value={username} />
        </div>
        <div>
            <label for="email">Email</label>
            <input
                type="email"
                bind:value={email}
                autocomplete="new-password"
            />
        </div>
        <div>
            <label for="phone">Phone Nr</label>
            <input id="phone" bind:value={phone} />
        </div>
        <div>
            <label for="password">Password</label>
            <input
                on:keyup={checkPasswords}
                type="password"
                bind:value={password}
                autocomplete="new-password"
            />
        </div>
        <div>
            <label for="password">Password confirmation</label>
            <input
                on:keyup={checkPasswords}
                type="password"
                bind:value={confPassword}
                autocomplete="new-password"
            />
        </div>
        <div class="error-message">
            <small>{error}</small>
        </div>
        <button type="submit">Sign up</button>
    </form>
</div>

<style>
    input {
        /* border: 1px solid #555;
        box-sizing: border-box;
        height: 30px;
        padding-left: 50px; */
        width: 300px;
    }
    button {
        width: 150px;
        background: linear-gradient(to right, rgb(255, 171, 88), rgb(255, 71, 71));
        color:white;
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

    .error-message {
        color: red;
    }
</style>
