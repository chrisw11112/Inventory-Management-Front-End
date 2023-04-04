<template>
    <div @click="goToIndividualItem()" class="item-container">
        <h3 class="title">{{ title }}</h3>
        <h3 v-if="sold" class="title sold">Sold</h3>
        <br>
        <p class="variables">Bin: {{ binNumber }} </p>
        <p class="variables">Item Unit Size: {{ itemSizeUnits }}</p>
        <p class="variables">Creation Date: {{ new Date (new Date(createDate).toDateString()).toLocaleDateString() }}</p>
        <p class="variables">COG: ${{ purchasePrice }}</p>
        <p class="variables">SKU: {{ itemID }}</p>
        <p v-if="soldDate" class="variables">Sold Date: {{ new Date(soldDate).toLocaleDateString() }}</p>
        <p v-if="soldPlatform" class="variables">Sold Platform: {{ soldPlatform }}</p>
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
    itemID: Number
  },
  methods: {
    goToIndividualItem() {
        this.$router.push({name:'item', params: { id: `${this.itemID}`}});
    }
  }
}
</script>

<style>
.item-container {
    margin-left: auto;
    margin-right: auto;
    width: 60rem;
    height: 10rem;
    border: 1px solid black;
    border-radius: 10px;
    background-color: lightgrey;
    box-shadow: 2px 2px grey;
    margin-bottom: 1.5rem;
}
.item-container:hover {
    box-shadow: 5px 5px darkgrey;
    cursor: pointer;
}
.title {
    padding-left: 1rem;
    display: inline-block;
}
.variables {
    display: inline-block;
    padding-left: 2rem;
    font-size: .85rem;
    margin-top: .5rem;
    opacity: 80%;
}
.sold {
    color: red;
}
</style>