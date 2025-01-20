<template>
    <NuxtLink :href="href" :style="maxWidth ? { maxWidth: maxWidth + 'px' } : {}" class="button-link">
        <slot />
    </NuxtLink>
</template>

<script setup lang="ts">
interface ButtonProps { href: string, maxWidth?: string }

const { href, maxWidth } = defineProps<ButtonProps>()
</script>

<style lang="css" scoped>
.button-link {
    font-size: clamp(1rem, 5vw, 1.2rem);
    max-width: 100%;
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: var(--white);
    text-decoration: none;
    padding: 0.7rem 1rem;
    border: none;
    border-radius: 0.5rem;
    transition: all 300ms ease;
    font-weight: 600;
    color: var(--dark);
    text-align: center;
    cursor: pointer;
    margin: 0.5rem;

    &:hover {
        transform: scale(1.01) translateY(-2px);
        filter: brightness(0.95);
        box-shadow: var(--shadow-white);
    }
}
</style>