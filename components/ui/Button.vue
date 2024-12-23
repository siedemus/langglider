<script setup lang="ts">
const { disabled, variant, class: className } = defineProps<{
    variant: "Primary" | "Secondary"
    disabled?: boolean
    class?: string
}>()

const buttonClasses = [
    "button",
    className,
    `button--${variant.toLowerCase()}`
]
</script>

<template>
    <button :disabled="disabled" :class="buttonClasses">
        <slot />
    </button>
</template>

<style lang="css" scoped>
.button {
    border-radius: 8px;
    padding: 8px 16px;
    font-weight: 600;
    cursor: pointer;
    font-size: 15px;
    transition: all 300ms ease;
}

.button:hover {
    transform: scale(1.1);
}

.button--primary {
    background-color: #1B946A;
    border: #1B946A solid 3px;
    color: white;
}

.button--primary:hover {
    filter: brightness(1.2);
}

.button--secondary {
    background-color: white;
    border: #1B946A solid 3px;
    color: #1B946A;
}

.button--secondary:hover {
    filter: brightness(0.9);
}
</style>