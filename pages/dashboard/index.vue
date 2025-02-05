<template>
    <template v-if="!userStore.error">
        <DashboardStreak :data="userStore.data" :loading="userStore.loading" />
        <DashboardSetsList :data="userStore.data" :loading="userStore.loading"/>
    </template>
    <template v-else>
        <CommonMessageBox variant="Error">
            {{ userStore.error }}
        </CommonMessageBox>
    </template>
</template>

<script setup lang="ts">
const userStore = useUserStore();

</script>

<style lang="css" scoped></style>