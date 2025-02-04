<template>
    <component :is="componentType" v-bind="linkProps" @click="handleClick" class="button-link">
        <slot />
    </component>
</template>

<script setup lang="ts">
interface ButtonLinkProps {
    to?: string;
};

const { to } = defineProps<ButtonLinkProps>();
const componentType = computed(() => {
    if (to) return defineNuxtLink({})
    return "button";
});
const linkProps = computed(() => {
    if (to) return { to };
    return {};
});

const emit = defineEmits(["click"]);
const handleClick = () => {
    emit("click");
};
</script>

<style lang="css" scoped>
.button-link {
    background-color: var(--white);
    border: none;
    text-decoration: none;
    color: var(--dark);
    padding: 0.7rem 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius: 0.3rem;
    transition: all 300ms ease;
    font-weight: 600;
    text-align: center;
    cursor: pointer;

    &:hover {
        transform: scale(1.1) translateY(-1px);
    }
}
</style>