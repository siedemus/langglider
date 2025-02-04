import { acceptHMRUpdate, defineStore } from "pinia";

export interface Set {
    id: string;
    name: string;
    user_id: string;
    lastReview: string | null
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
    since: string | null;
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

    const getSetById = computed(() => {
        return (id: string) => data.sets.find(set => set.id === id)
    })

    const deleteSet = async (id: string) => {
        loading.value = true;
        error.value = null;

        const { error: deleteError } = await supabase.from("flashcard_set").delete().eq("id", id);

        if (deleteError) {
            error.value = deleteError.message;
            loading.value = false;
            return;
        }

        data.sets = data.sets.filter(set => set.id !== id);
        loading.value = false;
    }

    return {
        data,
        loading,
        error,
        supabase,
        fetchUserData,
        getSetById,
        deleteSet
    } as const;
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}