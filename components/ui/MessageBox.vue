<template>
    <p class="message" :class="{
        'message--red': variant === 'Error',
        'message--teal': variant === 'Success'
    }">
        <slot />
    </p>
</template>

<script setup lang="ts">
const { variant } = defineProps<{ variant?: "Error" | "Success" }>()
</script>

<style lang="css" scoped>
.message {
    background-color: var(--transparent-dark);
    box-shadow: var(--shadow-dark);
    border-radius: 0.5rem;
    padding: 0.8rem;
    font-weight: 600;
    margin: 0;
}

.message--red {
    color: var(--red);
}

.message--teal {
    color: var(--lime);
}
</style>