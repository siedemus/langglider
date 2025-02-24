const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
export const TWENTY_FOUR_HOURS_MS = HOUR * 24;

export const useStreak = (data: UserData) => {
    const userStore = useUserStore();
    const countdown = ref(0);
    let timer: NodeJS.Timeout;

    const latestReview = computed(() => {
        if (!data.sets.length) return 0;
        return Math.max(...data.sets.map(set =>
            set.last_review ? new Date(set.last_review).getTime() : 0
        ));
    });

    const hasStreak = computed(() => {
        if (!data.reviews[0].review_since) return false;
        const timeDiff = Date.now() - TWENTY_FOUR_HOURS_MS;
        return latestReview.value > timeDiff;
    });

    const dayStreak = computed(() => {
        if (!hasStreak.value) return 0;
        const streakStart = new Date(data.reviews[0].review_since!).getTime();
        return Math.floor((Date.now() - streakStart) / TWENTY_FOUR_HOURS_MS) + 1;
    });

    const initialCountdown = computed(() => {
        if (!hasStreak.value) return 0;
        const remaining = latestReview.value + TWENTY_FOUR_HOURS_MS - Date.now();
        return remaining <= SECOND ? 0 : remaining;
    });

    const displayCountdown = (countdown: number) => {
        const hours = Math.floor(countdown / HOUR);
        const minutes = Math.floor((countdown % HOUR / MINUTE));
        const seconds = Math.floor((countdown % MINUTE) / SECOND);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    onMounted(() => {
        countdown.value = initialCountdown.value;
        

        if (countdown.value > 0) {
            timer = setInterval(async () => {
                countdown.value -= SECOND;
                if (countdown.value < SECOND) {
                    clearInterval(timer);
                    await userStore.updateReview(null);
                };
            }, SECOND);
        }
    });

    onUnmounted(() => clearInterval(timer));

    return { hasStreak, dayStreak, countdown, displayCountdown };
}