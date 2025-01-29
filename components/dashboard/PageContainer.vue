<template>
    <div class="page-container">
        <slot name="content" v-if="!error" />
        <slot name="error" v-else />
    </div>
</template>

<script setup lang="ts">
interface PageContainerProps {
    error: string | null;
}

const { error } = defineProps<PageContainerProps>()
</script>

<style lang="css" scoped>
.page-container {
    background-color: var(--transparent-dark);
    max-width: 100vw;
    width: 100%;
    height: 100vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
}
</style>