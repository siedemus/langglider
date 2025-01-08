type AvailableProvider = "discord"
type Error = null | string
type Message = null | string

export const useAuth = () => {
    const { public: env } = useRuntimeConfig();
    const { auth } = useSupabaseClient();
    const user = useSupabaseUser()
    const router = useRouter();

    const loading = ref<boolean>(false);
    const message = ref<Message>("");
    const errorMessage = ref<Error>(null)
    const isAuthenticated = user.value

    const messageCleanUp = () => {
        if (message.value && message.value.length > 0) message.value = null
        if (errorMessage.value && errorMessage.value.length > 0) errorMessage.value = null
    };

    const signUp = async (email: string, password: string) => {
        try {
            loading.value = true;
            messageCleanUp();

            const { error } = await auth.signUp({ email, password });

            if (error) throw error;

            message.value = "Please check your email for a verification link. It may take a few minutes to arrive. If you don't receive it, check your spam folder or try logging in if you already have an account.";
        } catch (error: any) {
            errorMessage.value = error.message
        } finally {
            loading.value = false
        }
    };

    const signInWithPassword = async (email: string, password: string) => {
        try {
            loading.value = true
            messageCleanUp()

            const { error } = await auth.signInWithPassword({ email, password });

            if (error) throw error

            router.push("/dashboard")
        } catch (error: any) {
            errorMessage.value = error.message
        } finally {
            loading.value = false
        }
    };

    const signOut = async () => {
        try {
            loading.value = true
            messageCleanUp()

            const { error } = await auth.signOut()

            if (error) throw error

            router.push("/")
        } catch (error: any) {
            errorMessage.value = error.message
        } finally {
            loading.value = false
        }
    };

    const signInWithOAuth = async (provider: AvailableProvider) => {
        try {
            loading.value = true
            messageCleanUp()

            const { error } = await auth.signInWithOAuth({
                provider
            })

            if (error) throw error
        } catch (error: any) {
            errorMessage.value = error.message
        } finally {
            loading.value = false
        }
    };

    const requestPasswordChange = async (email: string) => {
        try {
            loading.value = true

            const { error } = await auth.resetPasswordForEmail(email, {
                redirectTo: `${env.appUrl}/reset`
            })

            if (error) throw error

            message.value = "Please check your email for a secure password reset link.";
        } catch (error: any) {
            errorMessage.value = error.message
        } finally {
            loading.value = false
        }
    };

    return {
        loading,
        message,
        errorMessage,
        isAuthenticated,
        signUp,
        signInWithPassword,
        signInWithOAuth,
        signOut,
        requestPasswordChange
    };
};