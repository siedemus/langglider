<template>
    <CommonMessageBox variant="Error" v-if="error">
        {{ error }}
    </CommonMessageBox>
    <div class="content" v-else>
        <section class="content__container">
            <h1 class="container__header">Create new Flashcard</h1>
            <form class="container__form" @submit.prevent="fetchResponse">
                <div class="form__container">
                    <label class="form__label">
                        Your Language
                        <select class="form__input" v-model="userInput.language">
                            <option class="form__option" v-for="language in languages" :value="language">{{ language }}
                            </option>
                        </select>
                    </label>
                    <label class="form__label">
                        Target Language
                        <select class="form__input" v-model="userInput.targetLanguage">
                            <option class="form__option" v-for="language in languages" :value="language">{{ language }}
                            </option>
                        </select>
                    </label>
                </div>
                <input :disabled="isDisabled.value" class="form__input" placeholder="What's in your mind?"
                    v-model="userInput.message" />
                <CommonButtonLink type="submit" :disabled="isDisabled.value">{{ loading ? "Generating..." : "Submit" }}
                </CommonButtonLink>
            </form>
            <p class="container__description">Max. set length is 25 flashcards.</p>
        </section>
        <section class="content__container" v-if="!isFlashcardsListEmpty">
            <h1 class="container__header">Your new set</h1>
            <input class="form__input form__input--set-name" v-model="flashcardSet.name" :disabled="isDisabled.value"/>
            <CommonButtonLink @click="createSet(flashcardSet)" class="content__button-link" :disabled="isDisabled.value">{{ storeLoading ? "Creating" : "Submit" }}
            </CommonButtonLink>
            <CommonFlashcardsList :set="flashcardSet" />
        </section>
    </div>
</template>

<script setup lang="ts">
import { languages } from '~/assets/const/languages';

const {
    loading, error, userInput, flashcardSet, fetchResponse
} = useSetGeneration();

const { createSet, loading: storeLoading } = useUserStore();

const isDisabled = computed(() => loading || storeLoading);
const isFlashcardsListEmpty = computed(() => flashcardSet.flashcards.length === 0);
</script>

<style lang="css" scoped>
.content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.content__container {
    background: var(--dark);
    border: 1px solid var(--transparent-white);
    border-radius: 7px;
    padding: 15px;
}

.container__header {
    margin: 0 0 15px;
    font-weight: 800;
}

.container__form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form__container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;

    @media screen and (min-width: 600px) {
        flex-direction: row;
    }
}

.form__label {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    width: 100%;
}

.form__input {
    background-color: var(--transparent-gray);
    border: none;
    border-radius: 7px;
    padding: 0.6rem;
    color: inherit;
    width: 100%;

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

.form__input--set-name {
    margin-bottom: 0.5rem;
}

.content__button-link {
    margin-bottom: 1rem;
    width: 100%;
}

.form__option {
    background-color: var(--dark);
}

.container__description {
    margin: 15px 0 0;
    text-align: center;
}
</style>