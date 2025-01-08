<template>
    <main class="gradient-background">
        <section v-if="!isAuthenticated" class="transparent-section">
            <h1 class="transparent-section__header">
                <span class="transparent-section__title" ref="joinUsTitleRef">Join Us Today!</span>
                <span class="transparent-section__title" ref="welcomeTitleRef">Welcome Back!</span>
            </h1>
            <div class="transparent-section__container">
                <button :disabled="loading" v-for="option in options" @click="selectOption(option)"
                    class="container__button">
                    {{ option }}
                </button>
                <div class="container__mask" ref="maskRef" />
            </div>
            <form class="transparent-section__form" @submit.prevent="submitForm">
                <input :disabled="loading" type="email" class="form__input" placeholder="Email" v-model="email" />
                <input :disabled="loading" type="password" class="form__input" placeholder="Password"
                    v-model="password" />
                <NuxtLink href="/reset" class="green-link">Password Reset</NuxtLink>
                <button :disabled="loading" type="submit" class="form__button">{{ loading ? "Processing..." : "Submit"
                    }}</button>
                <p v-if="message" class="form__message form__message--teal">{{ message }}</p>
                <p v-if="errorMessage" class="form__message form__message--red">ERROR: {{ errorMessage }}</p>
            </form>
            <div class="section__separator">
                <div class="separator__line" />
                <span class="separator__span">or</span>
                <div class="separator__line" />
            </div>
            <div class="section__oAuth">
                <button :disabled="loading" v-for="(url, provider) in oAuthOptions" class="oAuth__button"
                    @click="signInWithOAuth(provider)">
                    <img class="oAuth__image" :src="url" />
                </button>
            </div>
        </section>
        <section v-else class="transparent-section">
            <h1 class="transparent-section__header">You are already logged in.</h1>
            <NuxtLink href="/" class="transparent-section__homeLink">Go to Home</NuxtLink>
        </section>
    </main>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { oAuthOptions } from '~/assets/const/oAuthOptions';

// TYPES

type Option = typeof options[number];
interface AnimationConfig {
    duration: number;
    ease: string;
}

// AUTH

const { loading, message, errorMessage, isAuthenticated, signUp, signInWithPassword, signInWithOAuth } = useAuth();
const email = ref("");
const password = ref("");

const submitForm = async () => {
    if (selectedOption.value === "Sign Up") {
        await signUp(email.value, password.value);
        email.value = "";
        password.value = "";
    } else {
        await signInWithPassword(email.value, password.value);
    };
};

// ANIMATIONS & AUTH OPTIONS

const options = ["Sign Up", "Sign In"] as const;
const maskPositions = { "Sign Up": "0%", "Sign In": "100%" } as const;
const selectedOption = ref<Option>("Sign Up");
const maskRef = ref<null | HTMLDivElement>(null);
const welcomeTitleRef = ref<null | HTMLSpanElement>(null);
const joinUsTitleRef = ref<null | HTMLSpanElement>(null);
const ANIMATION_CONFIG: AnimationConfig = {
    duration: 0.3,
    ease: "power2.inOut"
} as const;

const selectOption = (option: Option) => {
    selectedOption.value = option;
};

const initializeAnimations = () => {
    if (!welcomeTitleRef.value) return

    gsap.set(welcomeTitleRef.value, {
        x: 200,
        ...ANIMATION_CONFIG
    });
};

const animateMask = () => {
    if (!maskRef) return;

    gsap.to(maskRef.value, {
        x: maskPositions[selectedOption.value],
        ...ANIMATION_CONFIG
    });
};

const animateTitles = () => {
    if (!welcomeTitleRef || !joinUsTitleRef) return

    gsap.to(welcomeTitleRef.value, {
        opacity: selectedOption.value === "Sign Up" ? 0 : 1,
        x: selectedOption.value === "Sign Up" ? 200 : 0,
        ...ANIMATION_CONFIG
    })

    gsap.to(joinUsTitleRef.value, {
        opacity: selectedOption.value === "Sign Up" ? 1 : 0,
        x: selectedOption.value === "Sign Up" ? 0 : -200,
        ...ANIMATION_CONFIG
    })
}

onMounted(() => {
    initializeAnimations();
});

watch(selectedOption, () => {
    animateMask()
    animateTitles()
});
</script>

<style lang="css" scoped>
@import url("~/assets/css/gradient-background.css");
@import url("~/assets/css/transparent-section.css");
@import url("~/assets/css/green-link.css");

@import url("~/assets/css/form/input.css");
@import url("~/assets/css/form/button.css");
@import url("~/assets/css/form/message.css");


.gradient-background {
    display: flex;
    justify-content: center;
    align-items: center;
}

.transparent-section {
    max-width: 250px;
    width: 100%;
}

.transparent-section__title {
    position: absolute;
    inset: 0;
}

.transparent-section__title:nth-child(even) {
    opacity: 0;
}

.transparent-section__container {
    background-color: rgb(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    position: relative;
}

.container__button {
    background-color: transparent;
    border: none;
    color: inherit;
    padding: 0.8rem;
    max-width: 130px;
    width: 100vw;
    z-index: 1;
    cursor: pointer;
    transition: color 0.3ms;
    font-weight: 600;

    &:disabled:hover {
        cursor: not-allowed;
    }
}

.container__mask {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    background-color: rgba(0, 255, 179, 0.7);
    width: 50%;
    height: 100%;
    border-radius: 0.5rem;
}

.transparent-section__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.transparent-section__homeLink {
    background-color: rgba(0, 255, 179, 0.7);
    color: inherit;
    padding: 0.8rem;
    border: none;
    border-radius: 0.5rem;
    transition: all 0.3s;
    cursor: pointer;
    text-decoration: none;
    text-align: center;

    &:hover {
        background-color: rgb(255, 255, 255, 0.2);
    }
}

.section__separator {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
}

.separator__line {
    width: 100%;
    height: 2px;
    background-color: rgb(255, 255, 255, 0.2);
}

.separator__span {
    color: rgb(255, 255, 255, 0.2);
    text-transform: uppercase;
}

.section__oAuth {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.oAuth__button {
    background-color: rgb(255, 255, 255, 0.2);
    border: none;
    border-radius: 0.5rem;
    padding: 1rem;
    width: 100%;
    max-height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 255, 179, 0.7);
    }

    &:disabled {
        cursor: not-allowed;
    }

    &:disabled:hover {
        background-color: rgb(255, 255, 255, 0.2);
    }
}

.oAuth__image {
    max-width: 1.8rem;
}
</style>