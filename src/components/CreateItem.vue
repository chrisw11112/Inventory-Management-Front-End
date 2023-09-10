<template>
    <div class="item-container create-item-container">
        <input v-model="this.title" class="inputs-create-item-title">
        <br>
        <h5 class="create-item-error" v-if="this.error">{{ this.error }}</h5>
        <h4 class="input-titles">Item Unit Size: </h4>
        <input v-model="this.itemSizeUnits" class="inputs-create-item">
        <h4 class="input-titles">COG: </h4>
        <input v-model="this.purchasePrice" class="inputs-create-item">
        <h4 class="input-titles">EbayItemID: </h4>
        <input v-model="this.ebayItemID" class="inputs-create-item">
        <h4 v-if="this.itemSizeUnits != undefined && this.itemSizeUnits !='' && setBinNumber == undefined" class="input-titles">Bin: </h4>
        <AvailableBinDropDown class="inputs-create-item availableBins-input" @input="(bins) => this.availableBins = bins" v-if="this.itemSizeUnits != undefined && this.itemSizeUnits != '' && setBinNumber == undefined" :unitSize="this.itemSizeUnits"/>
        <button @click="addItem()" class="create-item-button create-new-item-button-succeed">Finish</button>
        <button @click="$emit('cancel')" class="create-item-button create-new-item-button-cancel">Cancel</button>
    </div>
</template>

<script>
import store from '../store/index.js';
import AvailableBinDropDown from './AvailableBinDropDown.vue';

export default {
  data () {
    return {
        title: undefined,
        purchasePrice: undefined,
        itemSizeUnits: undefined,
        binNumber: undefined,
        error: undefined,
        availableBins: undefined,
        ebayItemID: undefined
    } 
  },
  components: {
    AvailableBinDropDown
  },
  props: {
    setBinNumber: String
  },
  methods: {
    async addItem() {
        this.error = undefined;
        const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${this.$cookies.get('authToken')}`
        },
        body: `{"purchasePrice":${this.purchasePrice},"title":"${this.title}","size":${this.itemSizeUnits}, "binNumber": ${this.setBinNumber == undefined ? this.availableBins : parseInt(this.setBinNumber)}, "ebayItemID":"${this.ebayItemID}"}`
        };

        let response;
        let result;

        try {
            response = await fetch(`${store.state.url}/itemWithBin`, options);
            result = await response.text();
        }
        catch (ex) {
            this.error = "Unknown Error";
        }

        switch(response.status) {
            case 204:
                this.$emit('create');
                break;
            case 401:
                try {
                    this.$cookies.remove("authToken");
                }
                catch{}
                router.push({ path: '/login'});
                break;
            case 400:
                this.error = "Error Occurred";
                break;
            default: 
                this.error = 'Unknown Error Occured';
        }
    }
  }
}
</script>

<style>
/* styling for this comes from the Item component */
.inputs-create-item {
    font-size: .85rem;
    margin-top: 5rem;
    width: 5rem;
    border-radius: 5px;
    margin-top: 3.9rem;
    height: 1rem;
    margin-top: auto;
    margin-bottom: 4rem;
}
.input-titles {
    margin-right: 1rem;
    margin-left: 1rem;
    margin-top: 4rem;
    height: 1rem;
    margin-bottom: 4.3rem;
}
.create-item-title {
    position: absolute;
    margin-left: 1rem;
}
.create-item-button {
    align-self: flex-end;
    width: 6rem;
    height: 3rem;
    margin-left: 3rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    cursor: pointer;
    position: absolute;
}
.create-item-container {
    display: flex;
}
.create-new-item-button-succeed {
    background-color: #3E54AC;
    color: white;
    margin-left: 42rem;
}
.create-new-item-button-cancel {
    background-color: #f5c11f;
    margin-left: 52rem;
}
.create-item-error {
    position: absolute;
    height: 1rem;
    margin-top: 8rem;
    margin-left: 1rem;
    color: red;
}
.inputs-create-item-title {
    position: absolute;
    height: 1.5rem;
    margin-top: 1rem;
    margin-left: 1rem;
    border-radius: 5px;
    width: 40rem;
}
.availableBins-input {
    margin-left: 0rem;
    margin-bottom: 4.25rem;
}
</style>