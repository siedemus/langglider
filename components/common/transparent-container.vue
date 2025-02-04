<template>
    <section class="transparent-container">
        <h1 class="transparent-container__header">
            <slot name="header" />
        </h1>
        <slot name="content" />
    </section>
</template>

<style lang="css" scoped>
.transparent-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--transparent-dark);
    box-shadow: var(--shadow-dark);
    padding: 1rem;
    border-radius: 0.5rem;
    gap: 1rem;
    margin: 0.4rem;
    max-width: 290px;
}

.transparent-container__header {
    margin: 0;
    text-align: center;
    font-weight: 800;
    text-shadow: var(--shadow-white);
    position: relative;
    overflow: hidden;
    min-height: 2rem;
}
</style>