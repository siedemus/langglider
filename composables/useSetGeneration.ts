import { v4 as uuidV4 } from "uuid";
import type { languages } from "~/assets/const/languages";

interface ApiResponse {
    response: string;
    context: number[];
}

interface UserInput {
    message: string;
    language: typeof languages[number];
    targetLanguage: typeof languages[number]
}

interface Flashcard {
    front: string;
    back: string;
}

const system = "You're an assistant in Langglider app. Your purpose is to help users create efficient flashcard sets. Follow these rules when creating flashcards: 1) By default, 'front' contains phrases in the user's language and 'back' contains translations in the target language. 2) Create contextual phrases rather than simple word -> definition pairs. For example, if user requests 'Spanish food set', use 'I like tomatoes' (front) and 'Me gusta los tomates' (back) instead of just 'tomatoes'/'tomates'. 3) Quantity rules: - Default: 10 flashcards if no quantity specified - Minimum: 1 flashcard - Maximum: 25 flashcards (cap higher requests at 25)."

export const useSetGeneration = () => {
    const runtime = useRuntimeConfig();
    const loading = ref(false);
    const error = ref<string | null>(null);
    const userInput = reactive<UserInput>({
        message: "",
        language: "English",
        targetLanguage: "Spanish"
    })
    const flashcardSet = reactive<TempFlashcardSet>({
        flashcards: [],
        name: "New Generated Set"
    });
    let context: number[] = [];
    const format = {
        type: "array",
        items: {
            type: "object",
            properties: {
                front: { type: "string" },
                back: { type: "string" }
            },
            required: ["front", "back"]
        }
    }

    const addIdsToFlashcards = (flashcards: Flashcard[]): TempFlashcard[] => {
        return flashcards.map(card => ({
            ...card,
            id: uuidV4(),
            isMemorized: false
        }));
    };

    const isValidFlashcardArray = (parsedResponse: unknown): parsedResponse is Flashcard[] => {
        if (!Array.isArray(parsedResponse)) return false;

        return parsedResponse.every(item =>
            typeof item === "object"
            && item !== null
            && "front" in item
            && "back" in item
            && typeof item.front === "string"
            && typeof item.back === "string"
        );
    };

    const fetchResponse = async () => {
        loading.value = true;
        error.value = null;

        const prompt = userInput.message.trim() + " " + `User's language: ${userInput.language}` + " " + `Target Language: ${userInput.targetLanguage}`;

        console.log(prompt);
        
        try {
            const requestBody = {
                model: "mistral",
                stream: false,
                system,
                context,
                prompt,
                format
            };

            const { response, context: responseContext } = await $fetch<ApiResponse>(runtime.public.apiUrl, {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
                method: "POST",
            });

            context = responseContext;

            const parsedResponse = JSON.parse(response);
            if (!isValidFlashcardArray) throw Error("Invalid response format. Expected an array of flashcards.");
            flashcardSet.flashcards = addIdsToFlashcards(parsedResponse);
            userInput.message = "";
        } catch (e) {
            error.value = e instanceof Error ? e.message : "Unknown Error.";
        } finally {
            loading.value = false;
        }
    };

    return {
        loading, error, userInput, flashcardSet, fetchResponse
    } as const;
};