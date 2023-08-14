<template>

  <div class="item-view-div">
    <div v-if="this.state == 0">
        <h1 class="item-view-title">{{ this.title }}</h1>
      <p class="item-view-p">SKU: {{ this.$route.params.id }}</p>
      <br>
      <p class="item-view-p">Bin: {{ this.binNumber }}</p>
      <br>
      <p class="item-view-p">Item Unit Size: {{ this.unitSize }}</p>
      <br>
      <p class="item-view-p">COG: ${{ this.purchasePrice }}</p>
      <br>
      <p class="item-view-p">Ebay Item Id: {{ this.ebayItemId }}</p>
      <br>
      <p class="item-view-p">Create Time: {{ new Date(new Date(this.createDate).toDateString()).toLocaleDateString() }}</p>
        <div v-if="this.sold">
          <p class="item-view-p">Sold Price: ${{ this.soldPrice }}</p>
          <br>
          <p class="item-view-p">Sold Platform: {{ this.soldPlatform }}</p>
          <br>
          <p class="item-view-p">Shipping Price: ${{ this.shippingPrice }}</p>
        </div>
        <div style="margin-left: 15rem;">
          <button @click="this.state = 2" class="item-view-button" v-if="!this.sold">Mark As Sold</button>
          <button v-if="this.state == 0" @click="this.state = 1" class="item-view-button">Update</button>
          <button @click="this.$router.push({ path: '/'});" class="item-view-button">Cancel</button>
        </div>
    </div>

    <div v-if="this.state == 1">
        <h1 class="item-view-title">{{ this.title }}</h1>
      <p class="item-view-p">SKU: {{ this.$route.params.id }}</p>
      <br>
      <p class="item-view-p">Bin:</p>
      <input v-model="this.updatedbinNumber" class="item-view-input" :placeholder="this.binNumber">
      <br>
      <p class="item-view-p">Item Unit Size:</p>
      <input v-model="this.updatedUnitSize" class="item-view-input" :placeholder="this.unitSize">
      <br>
      <p class="item-view-p">COG:</p>
      <input v-model="this.updatedPurchasePrice" class="item-view-input" :placeholder="this.purchasePrice">
      <br>
      <p class="item-view-p">Create Time: {{ new Date(new Date(this.createDate).toDateString()).toLocaleDateString() }}</p>
      <br>
      <p class="item-view-p">Ebay Item Id: ${{ this.shippingPrice }}</p>
      <input v-model="this.updatedEbayItemId" class="item-view-input" :placeholder="this.ebayItemId">
        <div v-if="this.sold">
          <p class="item-view-p">Sold Price:</p>
          <input v-model="this.updatedSoldPrice" class="item-view-input" :placeholder="this.soldPrice">
          <br>
          <p class="item-view-p">Sold Platform:</p>
          <DropDown :value="this.soldPlatform" @input="(platform) => this.updatedsoldPlatform = platform"/>
          <br>
          <p class="item-view-p">Sold Date: {{ new Date(new Date(this.soldDate).toDateString()).toLocaleDateString() }}</p>
          <br>
          <p class="item-view-p">Shipping Price:</p>
          <input v-model="this.updatedShippingPrice" class="item-view-input" :placeholder="this.shippingPrice">          
        </div>
        <div style="margin-left: 15rem;">
          <button @click="updateItem()" class="item-view-button">Finish</button>
          <button @click="this.state = 0" class="item-view-button">Cancel</button>
        </div>  
    </div>
      
    <div v-if="this.state == 2">
      <h1 class="item-view-title">{{ this.title }}</h1>
      <p class="item-view-p">SKU: {{ this.$route.params.id }}</p>
      <br>
      <p class="item-view-p">Bin: {{ this.binNumber }}</p>
      <br>
      <p class="item-view-p">Item Unit Size: {{ this.unitSize }}</p>
      <br>
      <p class="item-view-p">COG: {{ this.purchasePrice }}</p>
      <br>
      <p class="item-view-p">Create Time: {{ new Date(new Date(this.createDate).toDateString()).toLocaleDateString() }}</p>
      <br>
      <p class="item-view-p">Ebay Item Id: {{ this.ebayItemId }}</p>
      <br>
      <p class="item-view-p">Sold Price: {{ this.soldPrice }}</p>
      <input v-model="this.markAsSoldSoldPrice" class="item-view-input" :placeholder="this.soldPrice">
      <br>
      <p class="item-view-p">Sold Platform:</p>
      <DropDown :value="this.soldPlatform" @input="(platform) => this.markAsSoldSoldPlatforum = platform"/>
      <br>
      <p class="item-view-p">Shipping Price:</p>
      <input v-model="this.markAsSoldShippingPrice" class="item-view-input" :placeholder="this.shippingPrice">
      <div style="margin-left: 15rem;">
        <button @click="markAsSold()" class="item-view-button">Finish</button>
        <button @click="this.state = 0" class="item-view-button">Cancel</button>
      </div>
    </div>

    <h3 v-if="this.error != undefined" style="color: red; margin-left: 2rem;">{{ this.error }}</h3>
  </div>
  
</template>
<script>
import DropDown from '../components/DropDown.vue'
import router from '@/router';

export default {
async beforeMount() {
  await this.getItem();
},
components: {
  DropDown
},
data() {
    return {
        title: undefined,
        purchasePrice: undefined,
        sold: true,
        soldPrice: undefined,
        binNumber: undefined,
        createDate: undefined,
        soldDate: undefined,
        soldPlatform: undefined,
        unitSize: undefined,
        shippingPrice: undefined,
        error: undefined,
        ebayItemId: undefined,
        //0 = item view 1 = update view 2 = mark as sold
        state: 0,

        //Updated State
        updatedPurchasePrice: this.updatedPurchasePrice,
        updatedSoldPrice: this.updatedSoldPrice,
        updatedbinNumber: this.updatedbinNumber,
        updatedsoldPlatform: this.updatedSoldPlatform,
        updatedUnitSize: this.updatedUnitSize,
        updatedShippingPrice: this.updatedShippingPrice,
        updatedEbayItemId: this.updatedEbayItemId,

        //Mark as Sold State
        markAsSoldSoldPrice: undefined,
        markAsSoldSoldPlatforum: undefined,
        markAsSoldShippingPrice: undefined
    }
},
methods: {
  async getItem() {
    this.error = undefined;
    const options = {
      mthod: 'GET',
      headers: {
        Authorization: `bearer ${this.$cookies.get('authToken')}`
      }
    };
    let response;
    let result;
    try {
      response = await fetch(`${this.$store.state.url}/item/itemid/${this.$route.params.id}`, options);
    }
    catch {
      this.error = "Exception While Getting Item";
    }
    switch(response.status) {
      case 200:
        result = await response.json();
        this.purchasePrice = result.purchasePrice;
        this.sold = result.sold;
        this.title = result.title;
        this.soldPrice = result.soldPrice;
        this.binNumber = result.binNumber;
        this.createDate = new Date(result.createDate);
        this.soldDate = new Date(result.soldDate);
        this.soldPlatform = result.soldPlatform;
        this.unitSize = result.size;
        this.shippingPrice = result.shippingPrice;
        this.ebayItemId= result.ebayItemID;
        console.log(this.ebayItemId);
        break;
      case 401:
        try {
          this.$cookies.remove("authToken");
        }
        catch{}
          router.push({ path: '/login'});
        break;
      case 404:
        this.error = "Item ID Not Found";
        break;
      default:
        this.error = "Unknown Error Occurred"
      }
  },
  async updateItem() {
    this.error = undefined;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${this.$cookies.get('authToken')}`
      },
      body: 
      `{"itemID":${this.$route.params.id},
      "purchasePrice":${this.updatedPurchasePrice == undefined || '' ? this.purchasePrice : this.updatedPurchasePrice},
      "title":"${this.title}",
      "soldPrice":${this.updatedSoldPrice  == undefined || '' ? this.soldPrice : this.updatedSoldPrice},
      "binNumber":${this.updatedbinNumber  == undefined || '' ? this.binNumber : this.updatedbinNumber},
      "soldPlatform":"${this.updatedsoldPlatform  == undefined || '' ? this.soldPlatform : this.updatedSoldPlatform}",
      "size":${this.updatedUnitSize  == undefined || '' ? this.unitSize : this.updatedUnitSize},
      "sold":${this.sold},
      "ebayItemId":"${this.updatedEbayItemId  == undefined || '' ? this.ebayItemId : this.updatedEbayItemId}",
      "shippingCost":${this.updatedShippingPrice  == undefined || '' ? this.shippingPrice : this.updatedShippingPrice}}`
    };

    let response;
    try {
      response = await fetch(`${this.$store.state.url}/item`, options);
    }
    catch {
      this.error = "Unknown Exception"
    }
    switch(response.status) {
      case 204:
        await this.getItem();
        this.state = 0;
        break;
      case 400:
      const result = await response.text();

      if(result == "Bin Doesn't Have Enough Space")
      {
        this.error = "Bin Doesn't Have Enough Space"
      }
      else{
        this.error = "Unknown Error"
      }
      break;
      case 401:
        try {
            this.$cookies.remove("authToken");
          }
          catch{}
            router.push({ path: '/login'});
          break;
      default:
        this.error = "Unknown Error Occurred";
    }
  },
  async markAsSold() {
    this.error = undefined

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${this.$cookies.get('authToken')}`
      },
      body: `{"itemID":${this.$route.params.id},"soldPlatform":"${this.markAsSoldSoldPlatforum}","soldPrice":${this.markAsSoldSoldPrice},"shippingPrice":${this.markAsSoldShippingPrice}}`
    };
    let response;
    try {
      response = await fetch(`${this.$store.state.url}/item/markassold`, options);
    }
    catch {
      this.error = "Exception Occured While Trying To Mark As Sold";
    }

    switch(response.status) {
      case 401: 
        try {
          this.$cookies.remove("authToken");
        }
        catch{}
        router.push({ path: '/login'});
        break;
      case 204:
        await this.getItem();
        this.state = 0
        break;
      case 400:
        this.error = "Could Not Mark As Sold";
        break;
      default:
        this.error = "Unknown Error Occured";
    }
  }
}
}
</script>
<style>
.item-view-div {
width: 50rem;
background-color: #FAF9F6;
box-shadow: 2px 2px darkgrey;
border: 1px solid black;
border-radius: 10px;
margin-left: auto;
margin-right: auto;
margin-top: 2rem;
}
.item-view-p {
margin-left: 2rem;
display: inline-block;
}
.item-view-input {
margin-left: 1rem;
border-radius: 5px;
}
.item-view-title {
margin-left: auto;
margin-right: auto;
width: 20rem;
margin-bottom: 2rem;
}
.item-view-button {
margin-right: 2rem;
border-radius: 5px;
height: 3rem;
width: 8rem;
background-color: #3E54AC;
color: white;
margin-bottom: 2rem;
opacity: 95%;
border: 1px solid black;
}
.item-view-button:hover {
cursor: pointer;
}

</style>