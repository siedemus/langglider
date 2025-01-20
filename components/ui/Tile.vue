<template>
    <article class="tile" @mousemove="onMouseMove">
        <h3 class="tile__header">{{ header }}</h3>
        <span class="tile__text">
            <slot />
        </span>
    </article>
</template>

<script setup lang="ts">
interface TileProps {
    header: string
}

const { header } = defineProps<TileProps>()

const onMouseMove = (e: MouseEvent) => {
    const card = e.target as HTMLElement
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top

    card.style.setProperty("--tile-x", `${x}px`)
    card.style.setProperty("--tile-y", `${y}px`)
}
</script>

<style lang="css" scoped>
.tile {
    position: relative;
    padding: 1rem;
    background-color: var(--transparent-gray);
    border-radius: 0.5rem;
    overflow: hidden;
    transition: all 300ms ease;
}

.tile:hover {
    transform: scale(1.01) translateY(-0.5px);
}

.tile::before {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    top: var(--tile-y);
    left: var(--tile-x);
    transform: translate(-50%, -50%) scale(2);
    background: radial-gradient(var(--transparent-white), transparent, transparent);
    transition: opacity 300ms ease-out;
    opacity: 0;
}

.tile:hover::before {
    opacity: 1;
}

.tile__header {
    margin: 0 0 0.2rem;
    line-height: 1;
    font-weight: 800;
    font-size: 1.8rem;
}

.tile__text {
    font-size: 1.2rem;
}
</style>