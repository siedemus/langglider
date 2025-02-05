<template>
    <article class="streak-container">
        <div class="streak-container__loader" v-if="loading">
            <CommonLoader />
        </div>
        <div class="streak-container__content" v-else>
            <img :src="streakImage" class="content__image" v-if="hasStreak" />
            <img :src="sadImage" class="content__image" v-else />
            <div class="content__streak-info">
                <p class="content__days"><span class="days__span">{{ dayStreak }}</span> Day
                    Streak!</p>
                <p class="content__countdown" v-if="hasStreak">
                    <span class="countdown__span">{{ displayCountdown(countdown) }}</span> hours left to
                    maintain your streak.
                </p>
                <p class="content__countdown" v-else>
                    You can restore your streak just by reviewing your flashcards.
                </p>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import streakImage from "~/assets/images/streak.gif";
import sadImage from "~/assets/images/sad.gif";

interface StreakProps { data: UserData; loading: boolean }

const { data, loading } = defineProps<StreakProps>()
const { hasStreak, dayStreak, countdown, displayCountdown } = useStreak(data)
</script>

<style lang="css" scoped>
.streak-container {
    background-color: var(--dark);
    width: 100%;
    min-height: fit-content;
    border-radius: 7px;
    border: 1px solid var(--transparent-white);
    padding: 15px;
}

.streak-container__content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media screen and (min-width: 625px) {
        flex-direction: row;
        justify-content: start;
        gap: 1rem;
    }
}

.streak-container__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.content__image {
    max-width: 180px;
    max-height: 180px;
}

.content__streak-info {
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 625px) {
        gap: 0.2rem;
    }
}

.content__days {
    font-size: 2rem;
    font-weight: 800;
    margin: 0;
    text-align: center;

    @media screen and (min-width: 625px) {
        text-align: left;
    }
}

.days__span {
    color: var(--lime)
}

.content__countdown {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
    text-align: center;

    @media screen and (min-width: 625px) {
        text-align: left;
    }
}

.countdown__span {
    color: var(--cherry)
}
</style>
