<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
    if (user.value) {
        return navigateTo('/app')
    }
}, { immediate: true })
</script>

<template>
    <div class="messageBox">Wait a second...</div>
</template>

<style lang="css" scoped>
.messageBox {
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