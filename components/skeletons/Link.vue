<template>
    <div class="dashboard-link-skeleton">
        <div class="dashboard-link-skeleton__content"></div>
    </div>
</template>

<script setup lang="ts">
interface SkeletonProps {
    width?: string;
    height?: string;
}

const props = withDefaults(defineProps<SkeletonProps>(), {
    width: '120px',
    height: '42px'
})
</script>

<style lang="css" scoped>
.dashboard-link-skeleton {
    background-color: var(--transparent-gray);
    margin: 0 15px;
    padding: 12px;
    border-radius: 7px;
    max-width: 100%;
    height: 42px;
    position: relative;
    overflow: hidden;
}

.dashboard-link-skeleton__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
            var(--transparent-gray) 0%,
            var(--transparent-white) 50%,
            var(--transparent-gray) 100%);
    animation: shimmer 1.5s infinite;
}
</style>