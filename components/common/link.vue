<template>CommonLink href=
    <NuxtLink :to="to" class="link">
        <slot />
    </NuxtLink>
</template>

<script setup lang="ts">
interface LinkProps {
    to: string
}

const { to } = defineProps<LinkProps>()
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