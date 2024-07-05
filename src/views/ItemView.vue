<template>

  <div class="item-view-div">
    <div v-if="this.state == 0">
        <h1 class="item-view-title">{{ this.title }}</h1>
      <p class="item-view-p">SKU: {{ this.$route.params.id }}</p>
      <p class="item-view-p">Bin: {{ this.binNumber }}</p>
      <p class="item-view-p">Item Unit Size: {{ this.unitSize }}</p>
      <p class="item-view-p">COG: ${{ this.purchasePrice }}</p>
      <p class="item-view-p">Ebay Item Id: {{ this.ebayItemId }}</p>
      <p class="item-view-p">Create Time: {{ new Date(new Date(this.createDate).toDateString()).toLocaleDateString() }}</p>
      <p v-if="this.weightInPounds" class="item-view-p">Pounds: {{ this.weightInPounds }}</p>
      <p v-if="this.weightInOunces" class="item-view-p">Ounces: {{ this.weightInOunces }}</p>
      <p v-if="this.length" class="item-view-p">Length: {{ this.length }}</p>
      <p v-if="this.width" class="item-view-p">Width: {{ this.width }}</p>
      <p v-if="this.height" class="item-view-p">Height: {{ this.height }}</p>
        <div v-if="this.sold">
          <p class="item-view-p">Sold Price: ${{ this.soldPrice }}</p>
          <p class="item-view-p">Sold Platform: {{ this.soldPlatform }}</p>
          <p class="item-view-p">Shipping Price: ${{ this.shippingPrice }}</p>
        </div>
        <div class="buttons-container">
          <button @click="this.state = 2" class="item-view-button" v-if="!this.sold">Mark As Sold</button>
          <button v-if="this.state == 0" @click="this.state = 1" class="item-view-button">Update</button>
          <button @click="this.$router.push({ path: '/'});" class="item-view-button">Cancel</button>
        </div>
    </div>

    <div v-if="this.state == 1">
        <h1 class="item-view-title">{{ this.title }}</h1>
      <p class="item-view-p">SKU: {{ this.$route.params.id }}</p>
      <p class="item-view-p">Bin:
        <input v-model="this.updatedbinNumber" class="item-view-input" :placeholder="this.binNumber">
      </p>
      <p class="item-view-p">Item Unit Size:
        <input v-model="this.updatedUnitSize" class="item-view-input" :placeholder="this.unitSize">
      </p>
      <p class="item-view-p">COG:
        <input v-model="this.updatedPurchasePrice" class="item-view-input" :placeholder="this.purchasePrice">
      </p>
      <p class="item-view-p">Create Time: {{ new Date(new Date(this.createDate).toDateString()).toLocaleDateString() }}</p>
      <p class="item-view-p">Ebay Item Id: {{ this.shippingPrice }}
        <input v-model="this.updatedEbayItemId" class="item-view-input" :placeholder="this.ebayItemId">
      </p>
      <p class="item-view-p">
        Pounds: <input v-model="this.updatedWeightInPounds" class="item-view-input" :placeholder="this.weightInPounds ? weightInPounds : 0">
        Ounces: <input v-model="this.updatedWeightInOunces" class="item-view-input" :placeholder="this.weightInOunces ? weightInOunces : 0">
      </p>
      <p class="item-view-p">Length:
        <input v-model="this.updatedLength" class="item-view-input" :placeholder="this.length ? length : 0">
      </p>
      <p class="item-view-p">Width:
        <input v-model="this.updatedWidth" class="item-view-input" :placeholder="this.width ? width : 0">
      </p>
      <p class="item-view-p">Height
        <input v-model="this.updatedHeight" class="item-view-input" :placeholder="this.height ? weightInPounds : 0">
      </p>
        <div v-if="this.sold">
          <p class="item-view-p">Sold Price:
            <input v-model="this.updatedSoldPrice" class="item-view-input" :placeholder="this.soldPrice">
          </p>
          <p class="item-view-p">Sold Platform:
            <DropDown :value="this.soldPlatform" @input="(platform) => this.updatedsoldPlatform = platform"/>
          </p>
          <p class="item-view-p">Sold Date: {{ new Date(new Date(this.soldDate).toDateString()).toLocaleDateString() }}</p>
          <p class="item-view-p">Shipping Price:
            <input v-model="this.updatedShippingPrice" class="item-view-input" :placeholder="this.shippingPrice">
          </p>          
        </div>
        <div class="buttons-container">
          <button @click="updateItem()" class="item-view-button">Finish</button>
          <button @click="this.state = 0" class="item-view-button">Cancel</button>
        </div>  
    </div>
      
    <div v-if="this.state == 2">
      <h1 class="item-view-title">{{ this.title }}</h1>
      <p class="item-view-p">SKU: {{ this.$route.params.id }}</p>
      <p class="item-view-p">Bin: {{ this.binNumber }}</p>
      <p class="item-view-p">Item Unit Size: {{ this.unitSize }}</p>
      <p class="item-view-p">COG: {{ this.purchasePrice }}</p>
      <p class="item-view-p">Create Time: {{ new Date(new Date(this.createDate).toDateString()).toLocaleDateString() }}</p>
      <p class="item-view-p">Ebay Item Id: {{ this.ebayItemId }}</p>
      <p class="item-view-p">Sold Price: {{ this.soldPrice }}
      <p v-if="this.weightInPounds" class="item-view-p">Pounds: {{ this.weightInPounds }}</p>
      <p v-if="this.weightInOunces" class="item-view-p">Ounces: {{ this.weightInOunces }}</p>
      <p v-if="this.length" class="item-view-p">Length: {{ this.length }}</p>
      <p v-if="this.width" class="item-view-p">Width: {{ this.width }}</p>
      <p v-if="this.height" class="item-view-p">Height: {{ this.height }}</p>
        <input v-model="this.markAsSoldSoldPrice" class="item-view-input" :placeholder="this.soldPrice">
      </p>
      <p class="item-view-p">Sold Platform:
        <DropDown :value="this.soldPlatform" @input="(platform) => this.markAsSoldSoldPlatforum = platform"/>
      </p>
      <p class="item-view-p">Shipping Price:
        <input v-model="this.markAsSoldShippingPrice" class="item-view-input" :placeholder="this.shippingPrice">
      </p>
      <div class="buttons-container">
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
        weightInPounds: 0,
        weightInOunces: 0,
        length: 0,
        width: 0,
        height: 0,
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
        updatedWeightInPounds: this.updatedWeightInPounds,
        updatedWeightInOunces: this.updatedWeightInOunces,
        updatedLength: this.updatedLength,
        updatedWidth: this.updatedWidth,
        updatedHeight: this.updatedHeight,

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
        this.weightInPounds = Math.floor(result.weightInPounds);
        this.weightInOunces = result.weightInPounds ? 16 * (result.weightInPounds - Math.floor(result.weightInPounds)) : null,
        this.height = result.height;
        this.width = result.width;
        this.length = result.length;
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
    let pounds = 0.0;
    if (this.updatedWeightInPounds) {
      pounds += Math.floor(this.updatedWeightInPounds);
    }
    if (this.updatedWeightInOunces) {
      pounds += this.updatedWeightInOunces / 16
    }
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${this.$cookies.get('authToken')}`
      },
      body: 
      `{
      "itemID":${this.$route.params.id},
      "purchasePrice":${this.updatedPurchasePrice == undefined || '' ? this.purchasePrice : this.updatedPurchasePrice},
      "title":"${this.title}",
      "soldPrice":${this.updatedSoldPrice  == undefined || '' ? this.soldPrice : this.updatedSoldPrice},
      "binNumber":${this.updatedbinNumber  == undefined || '' ? this.binNumber : this.updatedbinNumber},
      "soldPlatform":"${this.updatedsoldPlatform  == undefined || '' ? this.soldPlatform : this.updatedSoldPlatform}",
      "size":${this.updatedUnitSize  == undefined || '' ? this.unitSize : this.updatedUnitSize},
      "sold":${this.sold},
      "ebayItemId":"${this.updatedEbayItemId  == undefined || '' ? this.ebayItemId : this.updatedEbayItemId}",
      "shippingCost":${this.updatedShippingPrice  == undefined || '' ? this.shippingPrice : this.updatedShippingPrice},
      "weightInPounds":${pounds ? pounds : this.weightInPounds },
      "length":${this.updatedLength ? this.updatedLength : this.length},
      "width":${this.updatedWidth ? this.updatedWidth : this.width},
      "height":${this.updatedHeight ? this.updatedHeight : this.height}
      }`
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
.buttons-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.item-view-div {
  width: 50rem;
  background-color: #FAF9F6;
  box-shadow: 2px 2px darkgrey;
  border: 1px solid black;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
  display: flex;
}
.item-view-p {
  margin-left: 2rem;
  display: inline-block;
  width: 100%;
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