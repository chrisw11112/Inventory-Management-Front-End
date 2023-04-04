<template>
    <div class="login">
        <form>
            <h1>Please Login</h1>
            <p v-if="usernameFailed" class="failed-response">Invalid Username</p>
            <p v-if="passwordFailed" class="failed-response">Password Incorrect</p>
            <p v-if="invalid" class="failed-response">Unknown Error</p>
            <label class="login-labels" for="username">Username: </label>
            <input v-model="username" class="login-inputs" type="text" name="username">
            <br>
            <label class="login-labels" for="password">Password: </label>
            <input v-model="password" class="login-inputs" type="password" name="password">
            <br>
            <button class="login-submit" @click.stop.prevent="login" @keydown.enter.stop.prevent="login">Submit</button>
        </form>
    </div>
</template>

<script>
import store from '../store/index.js'

export default {
    data() {
        return {
            username: '',
            password: '',
            usernameFailed: false,
            passwordFailed: false,
            invalid: false
        }
    },
    methods: {
        async login() {
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: `{"username":"${this.username}","password":"${this.password}"}`
            };

            let response;
            let result;
            try {
                response = await fetch(`${store.state.url}/Login`, options);
                result = await response.text();
            }
            catch(err) {

            }
            if (response.status == 200) {

                this.$cookies.set("authToken", result);
                store.state.authToken = result;
                store.state.isAuthorized = true;
                this.$router.push({ path: '/'});
            }
            else if (response.status == 404 && result == "Username Not Found") {

                this.invalid = false;
                this.passwordFailed = false;
                this.usernameFailed = true;
            }
            else if (response.status == 404 && result == "Incorrect Password") {

                this.invalid = false;
                this.usernameFailed = false;
                this.passwordFailed = true;
            }
            else {

                this.usernameFailed = false;
                this.passwordFailed = false;
                this.invalid = true;
            } 
        }
    }
}
</script>

<style>
    .login {
        margin-left: auto;
        margin-right: auto;
        margin-top: 10rem;
        text-align: center;
        width: 25rem;
        height: 18rem;
        border-radius: 10px;
        border: 1px solid black;
        background-color: lightgrey;
        box-shadow: 3px 3px grey;
    }
    .login-inputs {
        margin-top: 2rem;
        border-radius: 5px;
    }
    .login-submit {
        margin-top: 1rem;
        border-radius: 5px;
    }
    .failed-response {
        color: red;
        margin-top: 0;
        margin-bottom: 0;
        padding: none;
    }
</style>