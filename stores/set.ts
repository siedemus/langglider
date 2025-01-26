import { acceptHMRUpdate, defineStore } from "pinia";

export interface Set {
    id: string;
    name: string;
    user_id: string;
};

export interface Flashcard {
    id: string;
    flashcard_set_id: string;
    front: string;
    reverse: string;
};

export interface SetWithFlashcards extends Set {
    flashcards: Flashcard[];
};

export const useSetStore = defineStore("Set", () => {
    const data = ref<SetWithFlashcards[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const supabase = useSupabaseClient();

    const fetchSets = async () => {
        loading.value = true;
        error.value = null;

        const { data: fetchedData, error: fetchingError } = await supabase.from("flashcard_set").select("*,flashcards:flashcard(*)");

        if (fetchingError) {
            error.value = fetchingError.message;
            return;
        }

        data.value = fetchedData || [];
        loading.value = false;
    };

    return {
        data,
        loading,
        error,
        supabase,
        fetchSets
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSetStore, import.meta.hot))
}