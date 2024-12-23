<script setup lang="ts">
const { $anime } = useNuxtApp()

onMounted(() => {
    $anime({
        targets: ".header",
        translateY: [-100, 0],
        opacity: [0, 1],
        delay: 100,
        duration: 1000,
        easing: "easeInOutBack"
    })
})
</script>

<template>
    <header class="header">
        <nav class="header__navigation">
            <NuxtLink href="/" class="header__link">
                <img class="header__logo" src="assets/images/logo.png" alt="flying squirrel logo" />
                <span class="header__span">LanGGlider</span>
            </NuxtLink>
            <div class="header__hamburger">
                <div class="header__hamburger-line"></div>
                <div class="header__hamburger-line"></div>
                <div class="header__hamburger-line"></div>
            </div>
        </nav>
    </header>
    <slot />
</template>

<style lang="css" scoped>
.header {
    max-width: 100vw;
    max-height: 85px;
    background-color: transparent;
    padding: 15px 20px;

    @media (max-width: 860px) {
        padding: 10px;
    }

    @media (max-width: 460px) {
        padding: 5px;
    }
}

.header__navigation {
    width: 100%;
    max-height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header__link {
    display: flex;
    align-items: center;
    text-decoration: none;
}

.header__logo {
    width: 85px;
    height: 85px;

    @media (max-width: 460px) {
        width: 75px;
        height: 75px;
    }
}

.header__span {
    color: #1B946A;
    font-size: 45px;
    font-weight: 700;

    @media (max-width: 560px) {
        display: none;
    }
}

.header__hamburger {
    cursor: pointer;
    padding: 20px;
}

.header__hamburger-line {
    width: 40px;
    height: 5px;
    border-radius: 7px;
    background-color: #1B946A;
    margin: 5px 0;
    transition: 0.3s;
}
</style>