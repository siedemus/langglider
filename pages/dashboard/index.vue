<template>
    <DashboardStreak :data="userStore.data" :loading="userStore.loading" />
    <DashboardSetsList :data="userStore.data" :loading="userStore.loading" />
</template>

<script setup lang="ts">
const userStore = useUserStore();

</script>

<style lang="css" scoped></style>