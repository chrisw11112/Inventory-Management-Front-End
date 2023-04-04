<template>
    <div @click="this.$router.push({name:'itemsbybinnumber', params: { id: `${binNumber}`}});" class="bin-container" :class="{'bin-opacity': remainingSpace <= 0}">
        <h1 class="bin-title">{{ binNumber }}</h1>
        <h4 class="bin-text">Remaining Space: {{remainingSpace}}</h4>
        <h4 class="bin-text">Max Space: {{ maxSpace }}</h4>
    </div>
</template>

<script>
export default {
    props: {
        binNumber: Number,
        remainingSpace: Number,
        maxSpace: Number
    }
}
</script>

<style>
.bin-container {
    height: 13rem;
    width: 13rem;
    background-color: lightgrey;
    margin: 1.5rem;
    border-radius: 5px;
    box-shadow: 2px 2px grey;
    border: 1px solid black;
}
.bin-title {
    display: block;
    text-align: center;
    padding-top: 3rem;
}
.bin-text {
    margin-left: 1rem;
}
.bin-container:hover {
    box-shadow: 5px 5px darkgrey;
    cursor: pointer;
}
.bin-opacity {
    opacity: 60%;
}
</style>