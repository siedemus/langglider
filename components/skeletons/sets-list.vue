<template>
    <div class="sets-list">
        <ul class="sets">
            <li v-for="n in 3" :key="n" class="sets__flashcards">
                <div class="flashcards__skeleton"></div>
            </li>
        </ul>
    </div>
</template>

<style lang="css" scoped>
.sets-list {
    background-color: var(--dark);
    width: 100%;
    border-radius: 7px;
    min-height: fit-content;
    border: 1px solid var(--transparent-white);
    padding: 15px;
    margin-top: 20px;
}

.sets {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.sets__flashcards {
    list-style: none;
}

.flashcards__skeleton {
    height: 52px;
    background-color: var(--transparent-gray);
    border-radius: 7px;
    position: relative;
    overflow: hidden;
}

.flashcards__skeleton::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(90deg,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.05) 20%,
            rgba(255, 255, 255, 0.1) 60%,
            rgba(255, 255, 255, 0));
    animation: shimmer 2s infinite;
}
</style>