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

    card.style.setProperty("--x", `${x}px`)
    card.style.setProperty("--y", `${y}px`)
}
</script>

<template>
    <article class="tile" @mousemove="onMouseMove">
        <h3 class="tile__header">{{ header }}</h3>
        <span class="tile__text">
            <slot />
        </span>
    </article>
</template>

<style lang="css" scoped>
.tile {
    position: relative;
    padding: 1rem;
    background-color: rgb(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    overflow: hidden;
    transition: all 300ms;
}

.tile:hover {
    transform: scale(1.01) translateY(-0.5px);
}

.tile::before {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    top: var(--y);
    left: var(--x);
    transform: translate(-50%, -50%) scale(2);
    background: radial-gradient(rgba(224, 224, 224, 0.2), transparent, transparent);
    opacity: 0;
    transition: all 10ms;
}

.tile:hover::before {
    opacity: 1;
}

.tile__header {
    color: white;
    margin: 0 0 0.5rem;
    font-weight: 800;
    font-size: 1.8rem;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
}

.tile__text {
    font-size: 1.3rem;
    font-weight: 400;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
}
</style>