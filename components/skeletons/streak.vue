<template>
    <div class="streak-skeleton">
        <div class="streak-skeleton__content">
            <div class="content__image-skeleton"></div>
            <div class="content__info">
                <div class="info__title-skeleton"></div>
                <div class="info__text-skeleton"></div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.streak-skeleton {
    background-color: var(--dark);
    width: 100%;
    min-height: fit-content;
    border-radius: 7px;
    border: 1px solid var(--transparent-white);
    padding: 15px;
}

.streak-skeleton__content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;

    @media screen and (min-width: 625px) {
        flex-direction: row;
        justify-content: start;
    }
}

.content__image-skeleton {
    width: 180px;
    height: 180px;
    background-color: var(--transparent-gray);
    border-radius: 7px;
    position: relative;
    overflow: hidden;
}

.content__info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 300px;
}

.info__title-skeleton {
    height: 2.5rem;
    background-color: var(--transparent-gray);
    border-radius: 7px;
    position: relative;
    overflow: hidden;
}

.info__text-skeleton {
    height: 1.5rem;
    background-color: var(--transparent-gray);
    border-radius: 7px;
    position: relative;
    overflow: hidden;
    min-width: 200px;
}

.content__image-skeleton::after,
.info__title-skeleton::after,
.info__text-skeleton::after {
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