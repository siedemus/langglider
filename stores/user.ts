import { toast } from "vue-sonner";
import { acceptHMRUpdate, defineStore } from "pinia";

const ERROR_MESSAGES = {
    UNKNOWN: "An unknown error occured.",
    IMPORTANT_DATA_MISSING: "No important data found. Please reload the page or contact support if the issue persists.",
    MISSING_VALUES: "Edit function is missing at least one value.",
    SET_NOT_FOUND: "Couldn't find the set to update. Please reload the page."
};

const SUCCESS_MESSAGES = {
    SET_DELETED: "Set successfully deleted",
    SET_CREATED: "Set successfully created",
    SET_UPDATED: "Set successfully updated"
};

export const useUserStore = defineStore("user", () => {
    let data = reactive<UserData>({ sets: [], reviews: [] });
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);
    const supabase = useSupabaseClient<Database>();

    const fetchUserData = async () => {
        loading.value = true;
        error.value = null;

        try {
            const { data: setsData, error: setsError } = await supabase.from("sets").select("*");
            if (setsError) throw Error(setsError.message);

            const { data: reviewsData, error: reviewsError } = await supabase.from("reviews").select("*");
            if (reviewsError) throw Error(reviewsError.message);
            if (reviewsData.length === 0) throw Error(ERROR_MESSAGES.IMPORTANT_DATA_MISSING);

            data.sets = setsData;
            data.reviews = reviewsData;
        } catch (e: unknown) {
            error.value = e instanceof Error ? e.message : ERROR_MESSAGES.UNKNOWN;
        } finally {
            loading.value = false;
        };
    };

    const deleteSet = async (id: string) => {
        loading.value = true;

        try {
            const { error: deleteError } = await supabase.from("sets").delete().eq("id", id);
            if (deleteError) throw Error(deleteError.message);

            data.sets = data.sets.filter(set => set.id !== id);

            if (!data.sets.length) {
                const { error: deleteError } = await supabase.from("reviews").update({ review_since: null }).eq("id", data.reviews[0].id);

                if (deleteError) throw Error(deleteError.message);

                data.reviews[0].review_since = null;
            };

            toast.success(SUCCESS_MESSAGES.SET_DELETED);
        } catch (e: unknown) {
            toast.error(e instanceof Error ? e.message : ERROR_MESSAGES.UNKNOWN);
        } finally {
            loading.value = false;
        };
    };

    const createSet = async (tempSet: TempFlashcardSet) => {
        loading.value = true;

        try {
            const { data: insertedSet, error: insertError } = await supabase
                .from("sets")
                .insert(tempSet).select();
            if (insertError) throw Error(insertError.message);

            data.sets = [
                ...data.sets,
                insertedSet[0]
            ];
            toast.success(SUCCESS_MESSAGES.SET_CREATED);
            return insertedSet[0];
        } catch (e: unknown) {
            toast.error(e instanceof Error ? e.message : ERROR_MESSAGES.UNKNOWN);
        } finally {
            loading.value = false;
        };
    };

    const editSet = async (id: string, updates: SetUpdateValues) => {
        loading.value = true;

        try {
            const update: Partial<DatabaseSet> = {};
            if (updates.name !== undefined) update.name = updates.name;
            if (updates.flashcards !== undefined) update.flashcards = updates.flashcards;
            if (updates.last_review !== undefined) update.last_review = updates.last_review;
            if (Object.keys(update).length === 0) throw Error(ERROR_MESSAGES.MISSING_VALUES);

            const { data: updatedSet, error: updateError } = await supabase
                .from("sets")
                .update(update)
                .eq("id", id)
                .select();
            if (updateError) throw Error(updateError.message)

            const index = data.sets.findIndex(set => set.id === id);
            if (index === -1) throw Error(ERROR_MESSAGES.SET_NOT_FOUND);

            data.sets = [
                ...data.sets.slice(0, index),
                updatedSet[0],
                ...data.sets.slice(index + 1)
            ];

            toast.success(SUCCESS_MESSAGES.SET_UPDATED);
        } catch (e: unknown) {
            toast.error(e instanceof Error ? e.message : ERROR_MESSAGES.UNKNOWN);
        } finally {
            loading.value = false;
        };
    };

    const updateReview = async (date: string | null) => {
        loading.value = true;

        try {
            if (date) {
                const latestReview = Math.max(...data.sets.map(set =>
                    set.last_review ? new Date(set.last_review).getTime() : 0
                ));

                if ((Date.now() - latestReview) < TWENTY_FOUR_HOURS_MS) return;
            }

            const { data: reviewData, error: reviewError } = await supabase.from("reviews").update({ review_since: date }).eq("id", data.reviews[0].id).select();
            if (reviewError) throw Error(reviewError.message);
            
            data.reviews[0].review_since = reviewData![0].review_since;
        } catch (e: unknown) {
            toast.error(e instanceof Error ? e.message : ERROR_MESSAGES.UNKNOWN);
        } finally {
            loading.value = false;
        }
    };

    const getSetById = computed(() => {
        return (id: string) => data.sets.find(set => set.id === id);
    });

    return {
        data,
        loading,
        error,
        fetchUserData,
        deleteSet,
        createSet,
        editSet,
        getSetById,
        updateReview

    } as const;
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
};