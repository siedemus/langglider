<template>
    <div class="create-container">
        <h1 class="create-container__header">Create new Flashcard</h1>
        <input class="create-container__input" placeholder="Set Title" v-model="currentSet.name" />
        <CommonButtonLink class="create-container__button" @click="addFlashcard">Add Flashcard</CommonButtonLink>
        <div class="create-container__buttons-container">
            <CommonButtonLink class="create-container__button" @click="submitSetCreation">{{
                isEditing ?
                    "Save Changes" : "Create Set" }}
            </CommonButtonLink>
            <CommonButtonLink class="create-container__button" @click="clearSet">Clear</CommonButtonLink>
        </div>
        <ul class="create-container__flashcard-list">
            <li class="flashcard-list__flashcard" v-for="flashcard in currentSet.flashcards" :key="flashcard.id">
                <div class="flashcard__buttons-container">
                    <input class="create-container__input" placeholder="Front" v-model="flashcard.front" />
                    <input class="create-container__input" placeholder="Back" v-model="flashcard.back" />
                </div>
                <CommonButtonLink class="flashcard__delete-button" @click="deleteFlashcard(flashcard.id)">X
                </CommonButtonLink>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';

const route = useRoute();
const userStore = useUserStore();
const editedSet = userStore.getSetById(route.query.edit as string);
const isEditing = route.query.edit !== undefined && editedSet !== undefined;
const { deleteFlashcard, addFlashcard, clearSet, currentSet } = useSetEditor(isEditing ? editedSet : undefined);

const submitSetCreation = async () => {
    if (currentSet.name.length > 50) {
        toast.warning("Set name cannot be longer than 50 characters");
        return;
    }

    if (currentSet.flashcards.length > 60) {
        toast.warning("Set cannot contain more than 60 flashcards");
        return;
    }

    const wrongFlashcardFront = currentSet.flashcards.findIndex(flashcard => flashcard.front.length > 255);

    if (wrongFlashcardFront !== -1) {
        toast.warning(`Flashcard ${wrongFlashcardFront + 1} front side cannot be longer than 255 characters`);
        return;
    }

    const wrongFlashcardBack = currentSet.flashcards.findIndex(flashcard => flashcard.back.length > 255);

    if (wrongFlashcardBack !== -1) {
        toast.warning(`Flashcard ${wrongFlashcardBack + 1} back side cannot be longer than 255 characters`);
        return;
    }

    isEditing ? await userStore.editSet(editedSet!.id, currentSet) : await userStore.createSet(currentSet);
}
</script>

<style lang="css" scoped>
.create-container {
    background-color: var(--dark);
    width: 100%;
    border-radius: 7px;
    border: 1px solid var(--transparent-white);
    padding: 15px;
}

.create-container__header {
    margin: 0 0 15px;
    font-weight: 800;
}

.create-container__input {
    border-radius: 7px;
    border: none;
    width: 100%;
    padding: 0.6rem;
    background-color: var(--transparent-gray);
    color: white;

    &::placeholder {
        color: var(--transparent-white);
    }

    &:disabled {
        background-color: var(--transparent-white);
    }

    &:disabled:hover {
        cursor: not-allowed;
    }
}

.create-container__flashcard-list {
    display: flex;
    gap: 10px;
    flex-direction: column;
    list-style-type: none;
    padding: 0;
    margin: 15px 0 0;
}

.flashcard-list__flashcard {
    display: flex;
    gap: 10px;
}

.flashcard__buttons-container {
    display: flex;
    gap: 10px;
    flex-direction: column;
    width: 100%;

    @media screen and (min-width: 620px) {
        flex-direction: row;
    }
}

.flashcard__delete-button.flashcard__delete-button {
    background-color: var(--cherry);
    text-overflow: clip;
    color: inherit;
}

.create-container__button.create-container__button {
    max-width: 100%;
    width: 100%;
    margin: 15px 0 0;
}

.create-container__buttons-container {
    display: flex;
    gap: 10px;
    margin: 10px 0 0;

    .create-container__button {
        margin: 0;
    }
}
</style>