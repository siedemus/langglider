const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const TWENTY_FOUR_HOURS_MS = HOUR * 24;

export const useStreak = (data: UserData) => {
    const hasStreak = computed(() => {
        if (data.review === null) return false;

        const lastReview = new Date(data.review.last).getTime();
        const timeDiff = Date.now() - lastReview;

        return timeDiff < TWENTY_FOUR_HOURS_MS;
    });

    const dayStreak = computed(() => {
        if (!hasStreak.value) return 0;

        const streakSince = new Date(data.review!.since).getTime();

        return Math.floor(((Date.now() - streakSince) / TWENTY_FOUR_HOURS_MS)) + 1;
    })

    const initialCountdown = computed(() => {
        if (data.review === null) return 0;

        const lastReview = new Date(data.review.last).getTime();
        const expiresIn = lastReview + TWENTY_FOUR_HOURS_MS;

        const countdownResult = expiresIn - Date.now();

        if (countdownResult <= SECOND) return 0;

        return countdownResult;
    });

    const displayCountdown = (countdown: number) => {
        const hours = Math.floor(countdown / HOUR);
        const minutes = Math.floor((countdown % HOUR / MINUTE));
        const seconds = Math.floor((countdown % MINUTE) / SECOND);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const countdown = ref(0);
    let timer: ReturnType<typeof setInterval>;

    onMounted(() => {
        countdown.value = initialCountdown.value;

        timer = setInterval(() => {
            countdown.value = countdown.value - 1000;
        }, 1000);
    })

    onUnmounted(() => {
        clearInterval(timer)
    })

    return {
        hasStreak,
        dayStreak,
        countdown,
        displayCountdown
    } as const;
}