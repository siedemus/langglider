import { toast } from "vue-sonner";

export const useFlashcards = (foundSet: DatabaseSet) => {
    const currentFlashcardIndex = ref(0);
    const isFlipped = ref(false);

    const isReviewed = foundSet.flashcards.every(flashcard => flashcard.isMemorized);

    const foundFlashcards = reactive(foundSet.flashcards.map(flashcard => ({ ...flashcard, isMemorized: isReviewed ? false : flashcard.isMemorized })));

    const nonMemorizedFlashcards = reactive(foundFlashcards.map((flashcard, index) => ({ ...flashcard, index }))).filter(flashcard => !flashcard.isMemorized);

    const hasChanged = computed(() => foundFlashcards.some((flashcard, index) => foundSet.flashcards[index].isMemorized !== flashcard.isMemorized));

    const isFinished = computed(() => currentFlashcardIndex.value === nonMemorizedFlashcards.length);

    const reviewedFlashcardsCount = computed(() => foundFlashcards.filter(flashcard => flashcard.isMemorized).length);

    const flipFlashcard = () => {
        isFlipped.value = !isFlipped.value;
    };

    const nextFlashcard = (isMemorized: boolean) => {
        if (currentFlashcardIndex.value === nonMemorizedFlashcards.length) return;
        const flashcardIndex = nonMemorizedFlashcards[currentFlashcardIndex.value].index
        if (isMemorized) foundFlashcards[flashcardIndex].isMemorized = true;
        currentFlashcardIndex.value++;
        if (currentFlashcardIndex.value === nonMemorizedFlashcards.length) toast.success(`Congratulations! You've finished reviewing! 🎉`)
    };

    const previousFlashcard = () => {
        if (currentFlashcardIndex.value === 0) return;
        const flashcardIndex = nonMemorizedFlashcards[currentFlashcardIndex.value - 1].index;
        if (foundFlashcards[flashcardIndex].isMemorized) foundFlashcards[flashcardIndex].isMemorized = false;
        currentFlashcardIndex.value--;
    }

    return {
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
    }
};