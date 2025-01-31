<template>
    <button class="sidebar-button" :class="{ 'sidebar-button--open': isSidebarOpen }" @click="switchSidebarOpen">
        <div class="sidebar-button__line" />
        <div class="sidebar-button__line" />
        <div class="sidebar-button__line" />
    </button>
    <div class="page-wrapper">
        <nav class="sidebar" :class="{ 'sidebar--open': isSidebarOpen }" @touchmove.left="handleSidebarClose">
            <h2 class="sidebar__subheader">
                LanGGlider
            </h2>
            <div class="sidebar__group">
                <LayoutLink href="/dashboard">Dashboard</LayoutLink>
                <LayoutLink href="/dashboard/create">Create Flashcards</LayoutLink>
                <LayoutLink :special="true" href="/dashboard/create-ai">Create AI Flashcards</LayoutLink>
            </div>
            <LayoutCategoryLabel>Flashcard Sets</LayoutCategoryLabel>
            <div class="sidebar__group">
                <template v-if="userStore.loading">
                    <SkeletonsLink />
                    <SkeletonsLink />
                    <SkeletonsLink />
                </template>
                <template v-else>
                    <LayoutLink v-for="set of userStore.data.sets" :key="set.id" :href="`/dashboard/${set.id}`">{{
                        set.name }}
                    </LayoutLink>
                </template>
            </div>
        </nav>
        <slot />
    </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();

const isSidebarOpen = ref(false)
const switchSidebarOpen = () => isSidebarOpen.value = !isSidebarOpen.value
const handleSidebarClose = () => isSidebarOpen.value = false
</script>

<style lang="css" scoped>
.sidebar-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
    background-color: var(--dark);
    border-radius: 4px;
    border: 2px solid var(--transparent-white);
    height: 40px;
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    z-index: 1;

    @media screen and (min-width: 1100px) {
        display: none;
    }
}

.sidebar-button--open {
    filter: brightness(180%)
}

.sidebar-button__line {
    background-color: var(--white);
    width: 25px;
    height: 2px;
    border-radius: 7px;
}

.page-wrapper {
    display: flex;
}

.sidebar {
    background-color: var(--dark);
    height: 100vh;
    max-width: 250px;
    width: 100%;
    border-right: 1.5px solid var(--transparent-white);
    position: fixed;
    z-index: 1;
    transform: translateX(-110%);
    transition: transform 0.3s ease;

    @media screen and (min-width: 1100px) {
        transform: translateX(0%);
        position: relative;
    }
}

.sidebar--open {
    transform: translateX(0);
}

.sidebar__subheader {
    margin: 0 0 15px;
    padding: 15px 0 15px 15px;
    border-bottom: 1.5px solid var(--transparent-white);
}

.sidebar__group {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
</style>
