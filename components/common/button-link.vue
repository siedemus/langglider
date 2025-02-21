<template>
    <component class="button-link" :is="componentType" v-bind="linkProps" @click="$emit('click')">
        <slot />
    </component>
</template>

<script setup lang="ts">
interface ButtonLinkProps {
    to?: string;
    disabled?: boolean
};
interface ButtonLinkEmits {
    click: [];
}

const { to, disabled } = defineProps<ButtonLinkProps>();
defineEmits<ButtonLinkEmits>();

const componentType = computed(() => to ? defineNuxtLink({}) : "button");
const linkProps = computed(() => to ? { to } : { disabled });
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
    transition: all 0.3s ease-in-out;
    font-weight: 600;
    text-align: center;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        transform: translateY(-2px);
    }

    &:disabled {
        cursor: not-allowed;
        filter: brightness(70%);
    }

    &:disabled:hover {
        transform: translateY(0);
    }
}
</style>