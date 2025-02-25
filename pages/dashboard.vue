<template>
    <CommonMessageBox class="message-box" variant="Error" v-if="userStore.error">
        ERROR: {{ userStore.error }}
    </CommonMessageBox>
    <NuxtLayout name="dashboard" v-else>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
const userStore = useUserStore();

await useAsyncData("userStoreInit", async () => {
    await userStore.fetchUserData()
    return true
});
</script>

<style lang="css" scoped>
.message-box {
    margin: 15px;
}
</style>