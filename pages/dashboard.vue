<template>
    <NuxtLayout name="dashboard">
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
const userStore = useUserStore();

await useAsyncData("setStoreInit", async () => {
    await userStore.fetchUserData()
    return true
});
</script>