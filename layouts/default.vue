<template>
    <header class="header">
        <nav class="header__navigation">
            <NuxtLink href="/" class="header__link">
                <img class="header__logo" src="public/images/logo.png" />
                <span class="header__span">LanGGlider</span>
            </NuxtLink>
            <div>
                <button class="header__button">Log In</button>
                <button class="header__button header__button--secondary">Sign Up</button>
            </div>
        </nav>
    </header>
    <slot />
</template>

<style lang="css" scoped>
.header {
    width: 100%;
    height: 60px;
}

.header__navigation {
    width: 100%;
    height: 100%;
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
    width: 60px;
    height: 60px;
}

.header__span {
    color: #1B946A;
    font-size: 35px;
    font-weight: 600;

    @media (max-width: 520px) {
        display: none;
    }
}

.header__button {
    padding: 4px 8px;
    font-weight: 500;
    font-size: 20px;
    font-weight: 700;
    color: #1B946A;
    border: 3px solid #1B946A;
    border-radius: 6px;
    transition: all 0.3s ease;
    background-color: white;
    font-family: inherit;
    margin-right: 6px;
}

.header__button:hover {
    cursor: pointer;
    background-color: #1B946A;
    color: white;
}

.header__button--secondary {
    background-color: #1B946A;
    color: white;
}

.header__button--secondary:hover {
    background-color: white;
    color: #1B946A;
}
</style>