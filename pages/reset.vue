<template>
    <div class="gradient-background">
        <section class="transparent-section">
            <h1 class="transparent-section__header">
                Forgot Password?
            </h1>
            <form class="transparent-section__form" @submit.prevent="requestPasswordChange(email)">
                <input :disabled="loading" type="email" class="form__input" placeholder="Email" v-model="email" />
                <NuxtLink class="green-link" href="/login">Login Page</NuxtLink>
                <button class="form__button" type="submit">{{ loading ? "Processing..." : "Submit" }}</button>
                <p v-if="message" class="form__message form__message--teal">{{ message }}</p>
                <p v-if="errorMessage" class="form__message form__message--red">ERROR: {{ errorMessage }}</p>
            </form>
        </section>
    </div>
</template>

<script setup lang="ts">
const email = ref("");

const { loading, errorMessage, message, requestPasswordChange } = useAuth();
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
    max-width: 290px;
    width: 100%;
}

.transparent-section__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>