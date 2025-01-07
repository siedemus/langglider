<template>
    <main class="main">
        <section v-if="!isAuthenticated" class="main__section">
            <h1 class="section__header">
                <span class="header__title" ref="joinUsTitleRef">Join Us Today!</span>
                <span class="header__title" ref="welcomeTitleRef">Welcome Back!</span>
            </h1>
            <div class="section__container">
                <button :disabled="loading" v-for="option in options" @click="selectOption(option)"
                    class="container__button">
                    {{ option }}
                </button>
                <div class="container__mask" ref="maskRef" />
            </div>
            <form class="section__form" @submit.prevent="submitForm">
                <input :disabled="loading" type="email" class="form__input" placeholder="Email" v-model="email" />
                <input :disabled="loading" type="password" class="form__input" placeholder="Password"
                    v-model="password" />
                <NuxtLink href="/reset" class="form__passwordReset">Password Reset</NuxtLink>
                <button :disabled="loading" type="submit" class="form__button">Submit</button>
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
        <section v-else class="main__section">
            <h1 class="section__header">You are already logged in.</h1>
            <NuxtLink href="/" class="section__homeLink">Go to Home</NuxtLink>
        </section>
    </main>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import googleImage from "~/assets/images/google.svg";
import discordImage from "~/assets/images/discord.svg";

type Option = typeof options[number];
interface AnimationConfig {
    duration: number;
    ease: string;
}

const { loading, message, errorMessage, isAuthenticated, signUp, signInWithPassword, signInWithOAuth } = useAuth();
const oAuthOptions = { "google": googleImage, "discord": discordImage };
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

const options = ["Sign Up", "Sign In"] as const;
const maskPositions = { "Sign Up": "0%", "Sign In": "100%" } as const;

const selectedOption = ref<Option>("Sign Up");
const maskRef = ref<null | HTMLDivElement>(null);
const welcomeTitleRef = ref<null | HTMLSpanElement>(null);
const joinUsTitleRef = ref<null | HTMLSpanElement>(null);

const selectOption = (option: Option) => {
    selectedOption.value = option;
};

const ANIMATION_CONFIG: AnimationConfig = {
    duration: 0.3,
    ease: "power2.inOut"
};

const initializeAnimations = () => {
    if (!welcomeTitleRef.value) return

    gsap.set(welcomeTitleRef.value, {
        opacity: 0,
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
.main {
    min-height: 100vh;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.main::before,
.main::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200vw;
    height: 200vh;
    opacity: 0.7;
    -webkit-filter: blur(60px);
    filter: blur(60px);
    z-index: -1;
    transform: translateZ(0);
    backface-visibility: hidden;

    @media screen and (max-width: 1100px) {
        width: 400vw;
        height: 400vh;
    }
}

.main::before {
    background: radial-gradient(circle, rgb(0, 255, 179) 0%, rgb(81, 163, 163, 0) 65%);
    -webkit-animation: swim 5s ease-in-out infinite alternate;
    animation: swim 5s ease-in-out infinite alternate;
    will-change: transform;
}

.main::after {
    background: radial-gradient(circle, rgb(255, 0, 128) 0%, rgb(81, 163, 163, 0) 65%);
    -webkit-animation: swim 5s ease-in-out infinite alternate;
    animation: swim 4s ease-in-out infinite alternate-reverse;
    will-change: transform;
}

.main__section {
    max-width: 250px;
    width: 100%;
    background-color: rgb(15, 15, 15, 0.3);
    box-shadow: 0 0 3px rgba(36, 36, 36, 0.7);
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 0.4rem;
}

.section__header {
    margin: 0;
    text-align: center;
    font-weight: 800;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
    position: relative;
    overflow: hidden;
    min-height: 2rem;
}

.section__homeLink {
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

.header__title {
    position: absolute;
    inset: 0;
}

.section__container {
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

.section__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form__input {
    border-radius: 0.5rem;
    border: none;
    padding: 0.5rem;
    background-color: rgb(255, 255, 255, 0.2);
    color: white;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    &:disabled {
        background-color: rgb(255, 255, 255, 0.4);
    }

    &:disabled:hover {
        cursor: not-allowed;
    }
}

.form__passwordReset {
    color: rgba(0, 255, 179);
    text-shadow: 0 0 10px rgba(0, 255, 179, 0.2);
    cursor: pointer;
    text-align: left;
    transition: all 0.3s ease;
    text-decoration: none;

    &:hover {
        text-shadow: 0 0 10px rgba(0, 255, 179, 0.9);
    }
}

.form__button {
    background-color: rgba(0, 255, 179, 0.7);
    color: inherit;
    padding: 0.8rem;
    border: none;
    border-radius: 0.5rem;
    transition: all 0.3s;
    cursor: pointer;

    &:disabled:hover {
        background-color: rgba(0, 255, 179, 0.7);
        cursor: not-allowed;
    }

    &:hover {
        background-color: rgb(255, 255, 255, 0.2);
    }
}

.form__message {
    background-color: rgb(15, 15, 15, 0.3);
    box-shadow: 0 0 3px rgba(36, 36, 36, 0.7);
    border-radius: 0.5rem;
    padding: 0.8rem;
    font-weight: 600;
    margin: 0;
}

.form__message--red {
    color: rgb(255, 0, 0);
    text-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
}

.form__message--teal {
    color: rgb(0, 255, 179);
    text-shadow: 0 0 10px rgba(0, 255, 179, 0.7);
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

@keyframes swim {
    from {
        transform: translate(-25%, -25%);
    }

    to {
        transform: translate(25%, 25%);
    }
}
</style>