<template>
    <div ref="container">
        <NavBar/>
        <div class="container" >
            <div class="title-filter-container">
                <input v-model="titleFilter" type="text" placeholder="Title" class="title-filter">
            </div>
            <router-link to="/createcontainer" custom v-slot="{ navigate }">
                <button @click="navigate" class="button new-item-button">New Bin</button>
            </router-link>
                <button @click="$event => this.hideCreateItem = false" class="button new-item-button">New Item</button>

            <h3 class="error-message" v-if="errorMessage != undefined" >{{ this.errorMessage }}</h3>
            
            <CreateItem @cancel="this.hideCreateItem = true" @create="submitNewItem()" v-if="!this.hideCreateItem"/>
            <div v-for="item in items">
                <item class="items" :title="item.title" :itemSizeUnits="item.size" :purchasePrice="item.purchasePrice" :binNumber="item.binNumber" :sold="item.sold" :itemID="item.itemID" :createDate="item.createDate" />
            </div>    
        </div>
    </div>
</template>

<script>
import Item from '../components/Item.vue'
import store from '../store/index.js'
import router from '../router/index.js'
import CreateItem from '../components/CreateItem.vue'
import NavBar from '../components/NavBar.vue'

export default {
  async beforeMount() {
    await this.getItems;
  },
  mounted() {
    window.addEventListener('wheel', this.scroll);
  },
  unmounted() {
    window.removeEventListener('wheel', this.scroll);
  },
  data() {
    return {
        titleFilter: '',
        currentPage: 1,
        items: undefined,
        nextUrl: undefined,
        errorMessage: undefined,
        hideCreateItem: true,
        refreshKey: 0
    }
  },
  components: {
    Item,
    CreateItem,
    NavBar
  },
  watch: {
    titleFilter: async function() {
        this.currentPage = 1;
        await this.getItems;
    }
  },
  computed: {
    async getItems() {
        this.refreshKey;
        this.errorMessage = undefined;
        const options = {
        method: 'GET',
        headers: {
            Authorization: `bearer ${this.$cookies.get('authToken')}`
            }
        };
        let response;
        let result;
        try {
            response = await fetch(`${store.state.url}/item/${this.titleFilter == '' ? '%20' : this.titleFilter}?pageSize=30&pageNumber=${this.currentPage}`, options);
            result = await response.json();
        }
        catch (err) {
            this.errorMessage = "Unknown Error";
        }
        switch (response.status) {
            case 200:
                this.nextUrl = result.uri;
                if(this.currentPage == 1) {
                    this.items = result.items;
                }
                else {
                    this.items.push(...result.items);
                }
                break;
            case 401: 
                try {
                    this.$cookies.remove("authToken");
                }
                catch{}
                router.push({ path: '/login'});
            case 400:
                this.items = undefined;
                this.errorMessage = "No Matching Results With Given Title Found";
        }
    }   
  },
  methods: {
    async submitNewItem() {
        this.hideCreateItem = true;
        this.refreshKey++;
        await this.getItems;
    },
    async scroll () {
            if (this.$refs.container.offsetHeight - window.pageYOffset < 1000 && this.items.length > 0 && this.nextUrl != null) {
                window.removeEventListener('wheel', this.scroll);
                this.currentPage++;
                await this.getItems;
                window.addEventListener('wheel', this.scroll);
            }
    }
  }
}
</script>
<style>
.title-filter-container {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    width: 60rem;
    margin-right: auto;
    margin-left: auto;
}
.title-filter {
    margin-top: 2rem;
    margin-bottom: 3rem;
    border-radius: 5px;
    height: 1.5rem;
    width: 20rem;
}
.title-filter:hover {
    box-shadow: 2px 2px darkgrey;
}
.error-message {
    text-align: center;
}
.container {
    border: 1px solid black;
    width: 65rem;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    box-shadow: 2px 2px darkgrey;
    margin-top: 2.5rem;
    background-color: #FAF9F6;
    margin-bottom: 2rem;
}
.button {
    border-radius: 5px;
    height: 3rem;
    width: 8rem;
    background-color: #3E54AC;
    color: white;
    opacity: 95%;
    margin-bottom: 2rem;
}
.new-item-button { 
    margin-left: 2.5rem;
}
.new-container-button {
    margin-left: 2.5rem;
}
.button:hover {
    cursor: pointer;
}
.notallowed {
    cursor: not-allowed;
}
</style>