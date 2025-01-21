<template>
    <NuxtLink :href="href" class="link">
        <slot />
    </NuxtLink>
</template>

<script setup lang="ts">
const { href } = defineProps<{ href: string }>()
</script>

<style lang="css" scoped>
.link {
    color: var(--lime);
    cursor: pointer;
    text-align: center;
    transition: all 0.3s ease;
    text-decoration: none;
    text-shadow: var(--shadow-lime);

    &:hover {
        filter: brightness(120%);
    }
}
</style>