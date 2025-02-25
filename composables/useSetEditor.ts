import { v4 as uuidV4 } from "uuid";

export const useSetEditor = (set?: DatabaseSet) => {
    const defaultSet: TempFlashcardSet = {
        name: "New Set",
        flashcards: [{ id: uuidV4(), front: "Welcome", back: "Create your flashcards!", isMemorized: false }]
    };

    const currentSet = reactive({ ...(set ?? defaultSet), flashcards: [...(set?.flashcards ?? defaultSet.flashcards)] });

    const deleteFlashcard = (id: string) => {
        const newFlashcards = currentSet.flashcards.filter(flashcard => flashcard.id !== id);
        currentSet.flashcards = newFlashcards;
    };

    const addFlashcard = () => {
        const newFlashcard: TempFlashcard = { id: uuidV4(), front: "New", back: "Flashcard", isMemorized: false };
        currentSet.flashcards = [
            newFlashcard,
            ...currentSet.flashcards
        ]
    };

    const clearSet = () => {
        currentSet.flashcards = [
            { id: uuidV4(), front: "Set", back: "cleared!", isMemorized: false }
        ];
    }

    return {
        currentSet,
        deleteFlashcard,
        addFlashcard,
        clearSet,
    }
}