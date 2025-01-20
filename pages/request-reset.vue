<template>
    <div class="gradient-background">
        <section class="transparent-section">
            <h1 class="transparent-section__header">
                Forgot Password?
            </h1>
            <form class="transparent-section__form" @submit.prevent="requestPasswordChange(email)">
                <input :disabled="loading" type="email" class="form__input" placeholder="Email" v-model="email" />
                <button class="form__button" type="submit">{{ loading ? "Processing..." : "Submit" }}</button>
                <p v-if="message" class="form__message form__message--teal">{{ message }}</p>
                <p v-if="errorMessage" class="form__message form__message--red">ERROR: {{ errorMessage }}</p>
                <NuxtLink href="/" class="transparent-section__homeLink">Go to Home</NuxtLink>
            </form>
        </section>
    </div>
</template>

<script setup lang="ts">
const email = ref("");

const { loading, errorMessage, message, requestPasswordChange } = useAuth();
</script>

<style lang="css" scoped>
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
    max-width: 290px;
    width: 100%;
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
</style>