<template>
    <div class="gradient-background">
        <nav class="sidebar" ref="sidebarRef">
            <div class="sidebar__content">
                <h1 class="content__header">LanGGlider</h1>
            </div>
            <div class="sidebar__menu">
                <button class="menu__button" @click="changeSidebarVisibility">
                    <div class="button__line" />
                    <div class="button__line" />
                    <div class="button__line" />
                </button>
            </div>
        </nav>
        <main class="main">
        </main>
    </div>
</template>

<script lang="ts" setup>
import gsap from 'gsap';

const isSidebarOpen = ref<boolean>(false);
const sidebarRef = ref<HTMLDivElement | null>(null)

const changeSidebarVisibility = () => {
    isSidebarOpen.value = !isSidebarOpen.value
}

const initializeAnimation = () => {
    if (!sidebarRef.value) return

    gsap.set(sidebarRef.value, {
        x: "-85%"
    })
}

const animateSidebar = () => {
    gsap.to(sidebarRef.value, {
        x: isSidebarOpen.value ? "0" : "-85%"
    })
}

watch(isSidebarOpen, () => {
    animateSidebar()
}, { immediate: true })

onMounted(() => {
    initializeAnimation()
}) 
</script>

<style lang="css" scoped>
@import url("~/assets/css/gradient-background.css");

.sidebar {
    background-color: rgb(15, 15, 15);
    width: 300px;
    min-height: 100vh;
    display: flex;
    position: absolute;
}

.sidebar__content {
    width: 85%;
    max-height: 100vh;
    overflow-y: auto;
}

.content__header {
    margin: 0;
    border-bottom: 2px solid rgba(231, 231, 231, 0.2);
    padding: 0.5rem 0 0.5rem 0.5rem;
}

.sidebar__menu {
    width: 15%;
    border-left: 2px solid rgba(231, 231, 231, 0.2);
    display: flex;
    justify-content: center;
}

.menu__button {
    max-height: 40px;
    background-color: transparent;
    border: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    margin: 0.5rem;
    border-radius: 5px;

    &:hover {
        background-color: rgba(231, 231, 231, 0.2);
        cursor: pointer;
    }
}

.button__line {
    background-color: white;
    width: 25px;
    height: 3px;
    border-radius: 7px;
}

.main {
    padding-left: 55px;
    max-width: calc(100vw - 35px);
    max-height: 100vh;
    overflow-y: auto;
}
</style>