<template>
    <SkeletonsSetsList v-if="loading" />
    <div class="sets-list" v-else>
        <ul class="sets" v-if="!isEmpty">
            <li class="sets__flashcard" v-for="set in data.sets" :key="set.id">
                <NuxtLink class="flashcard__link" :to="$route.path + `/${set.id}`">{{ set.name }}</NuxtLink>
            </li>
        </ul>
        <div class="sets-list__container" v-else>
            <h2 class="container__header">There's no flashcards yet.</h2>
            <div class="container__buttons">
                <CommonButtonLink to="/dashboard/create">Create Flashcard Set</CommonButtonLink>
                <CommonButtonLink to="/dashboard/create-ai">Create Flashcard Set with AI</CommonButtonLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface SetsListProps { data: UserData; loading: boolean };

const { data, loading } = defineProps<SetsListProps>();

const isEmpty = computed(() => data.sets.length === 0);
</script>

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

.sets-list__container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex-direction: column;
}

.container__header {
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
    padding: 1rem;
    text-align: center;
}

.container__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    flex-direction: column;
    padding-bottom: 1rem;

    @media screen and (min-width: 620px) {
        flex-direction: row;
    }
}

.sets {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.sets__flashcard {
    list-style: none;
}

.flashcard__link {
    text-decoration: none;
    color: inherit;
    display: block;
    text-align: center;
    background-color: var(--transparent-gray);
    padding: 1rem;
    border-radius: 7px;
    transition: background-color 0.3s ease-in-out;
    text-overflow: ellipsis;
    overflow: hidden;
}

.flashcard__link:hover {
    background-color: var(--transparent-white);
}
</style>