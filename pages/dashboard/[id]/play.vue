<template>
    <CommonMessageBox variant="Error" v-if="setError">
        Set not found.
    </CommonMessageBox>
    <CommonMessageBox variant="Error" v-else-if="paramsError">
        Invalid parameters provided to page.
    </CommonMessageBox>
    <template v-else>
        <div class="loader-container" v-if="userStore.loading">
            <CommonLoader />
        </div>
        <div class="content" v-else>
            <div v-if="currentFlashcardIndex === nonMemorizedFlashcards.length">
                <h1 class="content__header">You finished reviewing your set.</h1>
                <p class="content__counter">You already memorized {{ reviewedFlashcardsCount }} out of {{
                    foundFlashcards.length }}</p>
            </div>
            <div class="flip-card" v-else>
                <div class="flip-card__inner" :class="{ 'is-flipped': isFlipped }">
                    <div class="flip-card__front">
                        {{ nonMemorizedFlashcards[currentFlashcardIndex].front }}
                    </div>
                    <div class="flip-card__back">
                        {{ nonMemorizedFlashcards[currentFlashcardIndex].back }}
                    </div>
                </div>
            </div>
            <div class="button-container">
                <CommonButtonLink @click="flipFlashcard" class="button-link" v-if="!isFinished">
                    Flip
                </CommonButtonLink>
                <div class="button-container__splitter">
                    <CommonButtonLink @click="nextFlashcard(true)" class="button-link" v-if="!isFinished">Memorized
                    </CommonButtonLink>
                    <CommonButtonLink @click="nextFlashcard(false)" class="button-link" v-if="!isFinished">Next
                    </CommonButtonLink>
                </div>
                <CommonButtonLink @click="finishReviewing" class="button-link" v-if="isFinished">Finish
                </CommonButtonLink>
                <CommonButtonLink @click="previousFlashcard" class="button-link">Previous</CommonButtonLink>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
const route = useRoute();
const userStore = useUserStore();

const foundSet = userStore.getSetById(route.params.id as string);
const {
    foundFlashcards,
    nonMemorizedFlashcards,
    currentFlashcardIndex,
    isFlipped,

    hasChanged,
    isFinished,
    reviewedFlashcardsCount,

    flipFlashcard,
    nextFlashcard,
    previousFlashcard
} = useFlashcards(foundSet!);

const finishReviewing = async () => {
    if (hasChanged) {
        const date = new Date().toISOString();
        await userStore.updateReview(date)
        await userStore.editSet(foundSet!.id, { flashcards: foundFlashcards, last_review: date, });
    }
    return navigateTo("/dashboard/" + foundSet!.id)
}

const setError = foundSet === undefined;
const paramsError = typeof route.params.id !== "string";
</script>

<style lang="css" scoped>
.loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.content {
    background: var(--transparent-dark);
    border: 1px solid var(--transparent-white);
    border-radius: 7px;
    padding: 15px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.content__header {
    font-weight: 800;
    text-align: center;
}

.content__counter {
    text-align: center;
    font-size: 1.5rem;
}

.flip-card {
    background-color: transparent;
    max-width: 400px;
    width: 100%;
    height: 400px;
    perspective: 4000px;
}

.flip-card__inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
}

.flip-card__inner.is-flipped {
    transform: rotateY(-180deg);
}

.flip-card__front,
.flip-card__back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: flex;
    align-items: start;
    justify-content: center;
    padding: 20px;
    word-break: break-all;
    overflow-y: auto;
    font-size: 1.3rem;
    border-radius: 7px;
    border: 2px solid;

    &::-webkit-scrollbar {
        width: 2px;
    }

    &::-webkit-scrollbar-track {
        background: var(--transparent-gray);
    }

    &::-webkit-scrollbar-thumb {
        background: var(--transparent-white);
        border-radius: 4px;
        transition: all 300ms ease;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: var(--transparent-white);
    }
}

.flip-card__front {
    background-color: var(--transparent-dark);
    color: var(--white);
    border-color: var(--cherry);
    border-radius: 7px;
}

.flip-card__back {
    background-color: var(--transparent-dark);
    color: var(--white);
    border-color: var(--lime);
    border-radius: 7px;
    transform: rotateY(180deg);
}

.button-container {
    max-width: 400px;
    width: 100%;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    margin-top: 1rem;
}

.button-container__splitter {
    display: flex;
    gap: 0.5rem;
}

.button-link {
    width: 100%;
}
</style>