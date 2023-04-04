<template>
    <div style="display: inline-block;">
        <select class="dropdown-select" v-model="platform">
            <option value="Depop">Depop</option>
            <option value="Mercari">Mercari</option>
            <option value="Ebay">Ebay</option>
            <option value="Poshmark">Poshmark</option>
            <option value="Grailed">Grailed</option>
            <option value="Facebook Marketplace">Facebook Marketplace</option>
            <option value="Etsy">Etsy</option>
            <option value="Shopify">Shopify</option>
            <option value="Tradesy">Tradesy</option>
            <option value="Kidizen">Kidizen</option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        value: String
    },
    computed: {
        platform: {
            get() {return this.value},
            set(v) {this.$emit('input', v)}
        }
    }
}
</script>

<style>
.dropdown-select {
    border-radius: 5px;
    margin-left: 1rem;
    border: 2px solid black;
}
</style>