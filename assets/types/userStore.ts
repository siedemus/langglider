export type UserData = { sets: DatabaseSet[], reviews: DatabaseReview[] };

export type TempFlashcard = { id: string, front: string, back: string, isMemorized: boolean };
export type TempFlashcardSet = { flashcards: TempFlashcard[], name: string };

export type SetUpdateValues = { name?: string, flashcards?: TempFlashcard[], last_review?: string | null };