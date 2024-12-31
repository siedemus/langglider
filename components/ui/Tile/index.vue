<script setup lang="ts">
interface TileProps {
    header: string
}

const { header } = defineProps<TileProps>()
</script>

<template>
    <article class="tile">
        <h3 class="tile__header">{{ header }}</h3>
        <span class="tile__text">
            <slot />
        </span>
    </article>
</template>

<style lang="css" scoped>
.tile {
    padding: 15px;
    background-color: rgb(255, 255, 255, 0.2);
    border-radius: 7px;
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.7);
}

.tile__header {
    color: white;
    margin: 0;
    font-weight: 800;
    font-size: 25px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
}

.tile__text {
    font-size: 18px;
    font-weight: 400;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
}
</style>