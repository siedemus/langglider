<template>
    <div class="gradient-background">
        <main class="main">
            Main page example
        </main>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "sidebar"
})
</script>

<style lang="css" scoped>
@import url("~/assets/css/gradient-background.css");

.main {
    padding-left: 50px;
    max-width: calc(100vw - 35px);
    height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
    background-color: rgba(15, 15, 15, 0.8);
    overflow-y: auto;
}
</style>