<template>
    <main class="main">
        <CommonTransparentContainer v-if="!isAuthenticated">
            <template #header>
                <span class="header__title" ref="joinUsRef">Join Us Today!</span>
                <span class="header__title" ref="welcomeRef">Welcome Back!</span>
            </template>
            <template #content>
                <div class="container">
                    <button class="container__button" :disabled="loading" v-for="option in options"
                        @click="selectOption(option)" :key="option">
                        {{ option }}
                    </button>
                    <div class="container__mask" ref="maskRef" />
                </div>
                <CommonForm :submit-func="submitForm" :loading="loading" :inputs="formInputs" />
                <CommonLink to="/request-reset">
                    Request password reset
                </CommonLink>
                <div class="separator">
                    <div class="separator__line" />
                    <span class="separator__span">or</span>
                    <div class="separator__line" />
                </div>
                <div class="oAuth">
                    <button class="oAuth__button" :disabled="loading" v-for="(url, provider) in oAuthOptions"
                        @click="signInWithOAuth(provider)" :key="provider">
                        <img class="oAuth__image" :src="url" />
                    </button>
                </div>
                <CommonMessageBox variant="Success" v-if="message">{{ message }}</CommonMessageBox>
                <CommonMessageBox variant="Error" v-if="errorMessage">{{ errorMessage }}</CommonMessageBox>
            </template>
        </CommonTransparentContainer>
        <CommonTransparentContainer v-else>
            <template #header>
                You are already logged in.
            </template>
            <template #content>
                <CommonButtonLink href="/">Go to Home</CommonButtonLink>
            </template>
        </CommonTransparentContainer>
    </main>
</template>

<script setup lang="ts">
import { LOGIN_ANIMATION_CONFIG as ANIMATION_CONFIG } from 'assets/const/animationConfigs';
import type { FormProps } from '~/components/common/form.vue';
import { oAuthOptions } from '~/assets/const/oAuthOptions';
import { options } from '~/assets/const/authOptions';
import { gsap } from 'gsap';


// AUTH & FORM

const {
    loading,
    message,
    errorMessage,
    isAuthenticated,
    signUp,
    signInWithPassword,
    signInWithOAuth
} = useAuth();

const formState = reactive({
    email: "",
    password: ""
})

const formInputs: FormProps["inputs"] = [
    {
        attributes: { type: "email", placeholder: "Insert email" },
        data: { value: formState.email, updateValue: (value) => formState.email = value }
    },
    {
        attributes: { type: "password", placeholder: "Insert password" },
        data: { value: formState.password, updateValue: (value) => formState.password = value }
    }
];

const selectedOption = ref<typeof options[number]>("Sign Up");
const selectOption = (option: typeof options[number]) => {
    selectedOption.value = option;
};

const submitForm = async () => {
    if (selectedOption.value === "Sign Up") {
        await signUp(formState.email, formState.password);
        formState.email = "";
        formState.password = "";
    } else {
        await signInWithPassword(formState.email, formState.password);
    };
};

// ANIMATIONS

const maskPositions = { "Sign Up": "0%", "Sign In": "100%" } as const;
const maskRef = ref<null | HTMLDivElement>(null);
const welcomeRef = ref<null | HTMLSpanElement>(null);
const joinUsRef = ref<null | HTMLSpanElement>(null);

const initializeAnimations = () => {
    if (!welcomeRef.value) return

    gsap.set(welcomeRef.value, {
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
    if (!welcomeRef || !joinUsRef) return

    gsap.to(welcomeRef.value, {
        opacity: selectedOption.value === "Sign Up" ? 0 : 1,
        x: selectedOption.value === "Sign Up" ? 200 : 0,
        ...ANIMATION_CONFIG
    })

    gsap.to(joinUsRef.value, {
        opacity: selectedOption.value === "Sign Up" ? 1 : 0,
        x: selectedOption.value === "Sign Up" ? 0 : -200,
        ...ANIMATION_CONFIG
    })
}

watch(selectedOption, () => {
    animateMask()
    animateTitles()
});

onMounted(() => {
    initializeAnimations();
});
</script>

<style lang="css" scoped>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

.header__title {
    position: absolute;
    inset: 0;
}

.header__title:nth-child(even) {
    opacity: 0;
}

.container {
    background-color: var(--transparent-white);
    display: flex;
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
    background-color: var(--transparent-lime);
    width: 50%;
    height: 100%;
    border-radius: 0.5rem;
}

.separator {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
}

.separator__line {
    width: 100%;
    height: 2px;
    background-color: var(--transparent-white);
}

.separator__span {
    color: var(--transparent-white);
    text-transform: uppercase;
}

.oAuth {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.oAuth__button {
    background-color: var(--transparent-gray);
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
        background-color: var(--transparent-lime);
    }

    &:disabled {
        cursor: not-allowed;
    }

    &:disabled:hover {
        background-color: var(--transparent-white);
    }
}

.oAuth__image {
    max-width: 1.8rem;
}
</style>