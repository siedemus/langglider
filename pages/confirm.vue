<template>
    <div class="message-box">Wait a second...</div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
    if (user.value) {
        return navigateTo('/')
    }
}, { immediate: true })
</script>

<style lang="css" scoped>
.message-box {
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(0, 255, 179);
    font-weight: 800;
    text-shadow: 0 0 10px rgba(0, 255, 179, 0.7);
    font-size: 2rem;
}
</style>