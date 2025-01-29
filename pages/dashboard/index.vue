<template>
    <DashboardPageContainer :error="setStore.error">
        <template #content>
                <DashboardStreak :data="setStore.data" :loading="setStore.loading" />
        </template>
        <template #error>
            error
        </template>
    </DashboardPageContainer>
</template>

<script setup lang="ts">
const setStore = useUserStore();

</script>

<style lang="css" scoped>

</style>