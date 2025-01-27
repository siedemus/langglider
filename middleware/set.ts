import { getActivePinia } from "pinia";

export default defineNuxtRouteMiddleware(async () => {
    const pinia = getActivePinia()
    const setStore = useSetStore(pinia);
    const supabase = useSupabaseClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        console.error(error ?? "Not logged in.");
        return navigateTo("/login")
    }

    await useAsyncData("setStoreInit", async () => {
        await setStore.fetchSets()
        return true
    })
})