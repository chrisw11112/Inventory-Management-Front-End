<template>
    <nav class="nav">
        <router-link class="nav-link" to="/bins">Bins</router-link>
        <router-link class="nav-link" to="/">Items</router-link>
    </nav>
    <router-view/>
</template>
<style>
.nav {
    text-align: center;
    padding: 30px;
}
.nav-link {
    padding: 20px;
    color: black;
    text-decoration: none;
}
</style>