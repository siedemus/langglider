<template>
    <NuxtLink class="dashboard-link" :class="{ 'dashboard-link--special': special }" :href="href">
        <slot />
    </NuxtLink>
</template>

<script setup lang="ts">
interface LinkProps {
    href: string;
    special?: boolean
}

const { href, special } = defineProps<LinkProps>()
</script>

<style lang="css" scoped>
.dashboard-link {
    background-color: var(--transparent-gray);
    margin: 0 15px;
    padding: 12px;
    border-radius: 7px;
    color: inherit;
    text-decoration: none;
    font-weight: 600;
    transition: all 300ms ease;
    max-width: 220px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        background-color: var(--transparent-white);
    }
}

.dashboard-link--special {
    background-size: 300% 100%;
    background-image: linear-gradient(45deg,
            var(--lime) 0%,
            var(--cherry) 50%,
            var(--lime) 100%);
    transition: all 800ms cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        background-position: 100% 0;
    }
}
</style>