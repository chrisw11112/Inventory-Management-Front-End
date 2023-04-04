<template>
    <NavBar/>
    <div class="bins-container">
        <Bin  v-for="bin in bins" :binNumber="bin.binNumber" :remainingSpace="bin.remainingSpace" :maxSpace="bin.containerMaxSize"/>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import Bin from '../components/Bin.vue'

export default {
    async beforeMount() {
        await this.getBins();
    },
    components: {
        NavBar,
        Bin
    },
    data () {
        return {
            error: undefined,
            bins: undefined
        }
    },
    methods: {
        async getBins() {
            this.error = undefined;
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `bearer ${this.$cookies.get('authToken')}`
                }
            };
            let response;
            let result;
            try {
                response = await fetch(`${this.$store.state.url}/containers`, options);
                result = await response.json();
            }
            catch {
                this.error = "Exception While Trying To Get Containers"
            }

            switch(response.status) {
                case 401:
                    try {
                        this.$cookies.remove("authToken");
                    }
                    catch{}
                    router.push({ path: '/login'});
                    break;
                case 400:
                    this.error = "Error Bad Request"
                    break;
                case 200:
                    this.bins = result.containers
                    break;
                default:
                    this.error = "Unknown Error Occurred"
            }
        }
    }
}
</script>

<style>
.bins-container {
    border: 1px solid black;
    width: 65rem;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    box-shadow: 2px 2px darkgrey;
    margin-top: 2.5rem;
    background-color: #FAF9F6;
    margin-bottom: 2rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>