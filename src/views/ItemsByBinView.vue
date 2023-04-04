<template>
    <NavBar/>
    <div class="container">
        <div class="title-filter-container">
            <input v-model="titleFilter" v-on:input="this.changeShowItems()" type="text" placeholder="Title" class="title-filter">
        </div>

        <h3 class="error-message" v-if="error != undefined" >{{ this.error }}</h3>

        <button @click="$event => this.hideCreateItem = false" class="button new-item-button">New Item</button>
        <CreateItem :setBinNumber="this.$route.params.id" @cancel="this.hideCreateItem = true" @create="this.submitNewItem()" v-if="!this.hideCreateItem"/>
        <div v-for="item in shownItems">
            <Item class="items" :title="item.title" :itemSizeUnits="item.size" :purchasePrice="item.purchasePrice" :binNumber="item.binNumber" :sold="item.sold" :itemID="item.itemID" :createDate="item.createDate" />
        </div>    
    </div>
</template>

<script>
import Item from '../components/Item.vue';
import NavBar from '../components/NavBar.vue';
import CreateItem from '@/components/CreateItem.vue';

export default {
    data() {
        return {
            titleFilter: undefined,
            items: [],
            error: undefined,
            shownItems: undefined,
            hideCreateItem: true
        }
    },
    async beforeMount() {
        await this.getItemsByBin();
        this.changeShowItems();
    },
    methods: {
        async getItemsByBin() {
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
                response = await fetch(`${this.$store.state.url}/items/binNumber/${this.$route.params.id}`, options);
                result = await response.json();
            }
            catch (err) {
                this.error = "Unknown Error";
            }
            switch (response.status) {
                case 200:
                    this.items.splice(0, this.items.length);
                    this.items.push(...result.items);
                    this.filterData
                    break;
                case 401: 
                    try {
                        this.$cookies.remove("authToken");
                    }
                    catch{}
                    router.push({ path: '/login'});
                case 400:
                    this.items = undefined;
                    this.error = "No Matching Results With Given Title Found";
            }
        },
        async filterData() {
            if(this.titleFilter != undefined && this.titleFilter != '') {
                return this.items.filter( x => x.title.toLowerCase().includes(this.titleFilter.toLowerCase()))
            }
            else {
                return this.items;
            }
        },
        async changeShowItems() {
            this.error = undefined;
            let result = await this.filterData();
            if(result.length != 0) {
                this.shownItems = result;
            }
            else {
                this.shownItems = undefined;
                this.error = "No Results";
            }
        },
        async submitNewItem() {
        this.hideCreateItem = true;
        await this.getItemsByBin()
    }
    },
    components: {
        Item,
        NavBar,
        CreateItem
    }
}
</script>

<style>

</style>