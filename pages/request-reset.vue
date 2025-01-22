<template>
    <main class="main">
        <UiTransparentContainer>
            <template #header>
                Forgot Password?
            </template>
            <template #content>
                <Form :loading="loading" :submit-func="submitForm" :inputs="inputs" />
                <UiLink href="/">Go to Home</UiLink>
                <UiMessageBox variant="Success" v-if="message">{{ message }}</UiMessageBox>
                <UiMessageBox variant="Error" v-if="errorMessage">{{ errorMessage }}</UiMessageBox>
            </template>
        </UiTransparentContainer>
    </main>
</template>

<script setup lang="ts">
import type { FormProps } from '~/components/Form.vue';

const { loading, errorMessage, message, requestPasswordChange } = useAuth();
const email = ref("");

const inputs: FormProps["inputs"] = [
    {
        attributes: { type: "email", placeholder: "Insert email" },
        data: { value: email.value, updateValue: (value) => email.value = value }
    }
]

const submitForm = async () => {
    await requestPasswordChange(email.value)
}
</script>

<style lang="css" scoped>
.main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}
</style>