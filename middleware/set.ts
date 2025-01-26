export default defineNuxtRouteMiddleware(async () => {
    const setStore = useSetStore();
    const supabase = useSupabaseClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        console.error(error);
        return navigateTo("/login")
    }

    await setStore.fetchSets();
})