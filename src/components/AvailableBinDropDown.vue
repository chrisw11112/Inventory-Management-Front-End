<template>
    <div style="display: inline-block;">
        <select class="available-bin-dropdown-select" v-model="bin">
            <option v-if="this.bins == null" value="None">No Bins With Size</option>
            <option v-for="bin in bins" :value="bin.binNumber">{{ bin.binNumber }}</option>
        </select>
    </div>
</template>

<script>

export default {
    async beforeMount() {
        await this.getContainersWithRemainingSpace();
    },
    data() {
        return {
            bins: undefined,
            size: this.unitSize
        }
    },
    watch: {
        unitSize: async function() {
            await this.getContainersWithRemainingSpace();
        }
    },
    props: {
        value: String,
        unitSize: String
    },
    computed: {
        bin: {
            get() {return this.value},
            set(v) {this.$emit('input', v)}
        }
    },
    methods: {
        async getContainersWithRemainingSpace() {
            const options = {
            method: 'GET',
            headers: {Authorization: `bearer ${this.$cookies.get('authToken')}`}
            };
            let response;
            let result;
            try {
                const intUnitSize = parseInt(this.unitSize);
                response = await fetch(`${this.$store.state.url}/ContainersWithRemainingSpace/${intUnitSize}`, options);
                result = await response.json();
            }
            catch {
                this.$emit('dropdownError');
            }
            
            switch(response.status) {
                case 200:
                    try {
                        this.bins = result.containers;
                    }
                    catch {
                        this.$emit('dropdownError');
                    }
                    break;
                case 400:
                    this.$emit('dropdownBadRequest');
                    break;
                case 404:
                    this.$emit('dropdownNotFound');
                    break;
                case 401:
                    try {
                        this.$cookies.remove("authToken");
                    }
                    catch{}
                    router.push({ path: '/login'});
                    break;
                default:
                    this.$emit('dropdownError');
            }
        }
    }
}
</script>

<style>
.available-bin-dropdown-select {
    border-radius: 5px;
    margin-left: 1rem;
    border: 2px solid black;
}
</style>
