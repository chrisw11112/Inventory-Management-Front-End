<template>
    <div class="container-createitem">
        <h1 class="title-create-container">Create A New Bin</h1>
        <h3 class="item-titles-createitem">Bin Size: </h3>
        <input v-model="binSize" class="item-titles-createitem input-createitem">
        <br>
        <h3 class="create-bin-error" v-if="this.errorMessage != undefined">{{ this.errorMessage }}</h3>
        <button @click="this.createBin()" class="create-bin-button create-bin-success">Create Bin</button>
        <RouterLink to="/" custom v-slot="{ navigate }">
            <button @click="navigate" class="create-bin-button create-bin-cancel">Cancel</button>
        </RouterLink>
    </div>
</template>

<script>
import store from '../store/index.js'
import router from '../router/index.js'

export default {
    data() {
        return {
            binSize: undefined,
            errorMessage: undefined
        }
    },
    methods: {
        async createBin() {
            this.errorMessage = undefined;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${this.$cookies.get('authToken')}`
                },
                body: `{"containerMaxSize": ${this.binSize}}`
            };

            let response;
            try {
                response = await fetch(`${store.state.url}/container`, options);
            }
            catch (ex) {
                this.errorMessage = "Exception While Creating Container";
            }
            switch(response.status) {
                case 200:
                    router.push({ path: '/'});
                    break;
                case 400:
                    this.errorMessage = 'Container Not Created Successfully';
                    break;
                case 401:
                    router.push({ path: '/login'});
                    break;
                default:
                    this.errorMessage = 'Unknown Error Occurred'
            }
        }
    }
}
</script>

<style>
.container-createitem {
    border: 1px solid black;
    width: 40rem;
    height: 12.5rem;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    box-shadow: 2px 2px darkgrey;
    margin-top: 2.5rem;
    background-color: #FAF9F6;
    justify-content: center;
}
.title-create-container {
    text-align: center;
}
.item-titles-createitem {
    margin-left: 2rem;
    display: inline;
    margin-bottom: 1rem;
}
.input-createitem {
    margin-left: .5rem;
    border-radius: 5px;
}
.create-bin-button {
    margin-top: 1rem;
    align-self: flex-end;
    width: 6rem;
    height: 3rem;
    cursor: pointer;
    border-radius: 5px;
}
.create-bin-success {
    margin-left: 20rem;
    background-color: #3E54AC;
    color: white;
}
.create-bin-cancel {
    margin-left: 3rem;
    background-color: #f5c11f;
}
.create-bin-error {
    color: red;
    position: absolute;
    margin-top: 1rem;
    margin-left: 1rem;
    width: 15rem;
}
</style>