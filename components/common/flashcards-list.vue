<template>
    <ul class="flashcards">
        <li class="flashcard" v-for="(flashcard, index) in set.flashcards" :key="flashcard.id">
            <p class="flashcard__count">Card {{ index + 1 }}</p>
            <p class="flashcard__content"><span class="content__span">Front:</span>
                {{ flashcard.front }}
            </p>
            <p class="flashcard__content"><span class="content__span">Back:</span>
                {{ flashcard.back }}
            </p>
        </li>
    </ul>
</template>

<script setup lang="ts">
interface SetListProps {
    set: TempFlashcardSet
}

const { set } = defineProps<SetListProps>();
</script>

<style lang="css" scoped>
.flashcards {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.flashcard {
    background-color: var(--transparent-gray);
    padding: 6px;
    border-radius: 7px;
}

.flashcard__count {
    margin: 0;
    padding: 10px 0 10px 10px;
    font-weight: 800;
}

.flashcard__content {
    margin: 0;
    font-size: 1.5rem;
    padding: 0 0 10px 10px;
    word-break: break-all;
}

.content__span {
    font-weight: 800;
}
</style>