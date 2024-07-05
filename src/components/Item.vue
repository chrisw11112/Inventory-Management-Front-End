<template>
    <div @click="goToIndividualItem()" class="item-container">
        <h3 class="title">{{ title }}</h3>
        <h3 v-if="sold" class="title sold">Sold</h3>
        <div class="text-container">
            <br>
            <p class="variables">Bin: {{ binNumber }} </p>
            <p class="variables">Item Unit Size: {{ itemSizeUnits }}</p>
            <p class="variables">Creation Date: {{ new Date (new Date(createDate).toDateString()).toLocaleDateString() }}</p>
            <p class="variables">COG: ${{ purchasePrice }}</p>
            <p class="variables">SKU: {{ itemID }}</p>
            <p v-if="soldDate" class="variables">Sold Date: {{ new Date(soldDate).toLocaleDateString() }}</p>
            <p v-if="soldPlatform" class="variables">Sold Platform: {{ soldPlatform }}</p>
            <p v-if="weightInPounds" class="variables">Pounds: {{ Math.floor(weightInPounds) }}</p>
            <p v-if="weightInOunces" class="variables">Ounces: {{ weightInOunces }}</p>
            <p v-if="length" class="variables">Length: {{ length }}</p>
            <p v-if="width" class="variables">Width: {{ width }}</p>
            <p v-if="height" class="variables">Height: {{ height }}</p>
        </div>
        <div class="img-container">
            <img class="item-img" v-if="pictureLink != null" v-bind:src="pictureLink">
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
    binNumber: Number,
    sold: Boolean,
    createDate: String,
    soldDate: String,
    itemSizeUnits: Number,
    purchasePrice: Number,
    soldPlatform: String,
    itemID: Number,
    pictureLink: String,
    weightInPounds: Number,
    length: Number,
    width: Number,
    height: Number
  },
  data () {
    return {
        weightInOunces: 16 * (this.weightInPounds - Math.floor(this.weightInPounds))
    }
  },
  methods: {
    goToIndividualItem() {
        this.$router.push({name:'item', params: { id: `${this.itemID}`}});
    }
  }
}
</script>

<style>
.img-container {
    display: flex;
    width: 10rem;
    height: 60%;
}
.item-img {
    margin-left: auto;
    margin-right: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: top;
}
.item-container {
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    height: 15rem;
    border: 1px solid black;
    border-radius: 10px;
    background-color: lightgrey;
    box-shadow: 2px 2px grey;
    margin-bottom: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
}
.item-container:hover {
    display: flex;
    box-shadow: 5px 5px darkgrey;
    cursor: pointer;
}
.title {
    padding-left: 1rem;
    width: 100%;
}
.variables {
    height: 20px;
    width: 10%;
    padding-left: 2rem;
    font-size: .85rem;
    opacity: 80%;
}
.sold {
    color: red;
}
.text-container {
    width: 70%;
    display: flex;
    height: 80%;
    margin-right: 4rem;
    flex-wrap: wrap;
}
</style>