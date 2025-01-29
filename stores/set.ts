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

export interface Review {
    id: string;
    user_id: string;
    since: string;
    last: string;
}

export interface UserData {
    sets: SetWithFlashcards[];
    review: Review | null
}

export const useUserStore = defineStore("Set", () => {
    let data = reactive<UserData>({ sets: [], review: null });
    const loading = ref(false);
    const error = ref<string | null>(null);
    const supabase = useSupabaseClient();

    const fetchUserData = async () => {
        loading.value = true;
        error.value = null;

        const { data: setData, error: setError } = await supabase.from("flashcard_set").select("*, flashcards:flashcard(*)");

        if (setError) {
            error.value = setError.message;
            return;
        }

        const { data: reviewData, error: reviewError } = await supabase.from("review").select("*");

        if (reviewError) {
            error.value = reviewError.message;
            return;
        }

        data.review = reviewData[0] || null;
        data.sets = setData || [];

        loading.value = false;
    };

    return {
        data,
        loading,
        error,
        supabase,
        fetchUserData,
    } as const;
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}