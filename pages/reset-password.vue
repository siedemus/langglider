<template>
    <main class="main">
        <UiTransparentContainer>
            <template #header>
                {{ expired ? 'Request Expired!' : 'Update your Password' }}
            </template>
            <template #content>
                <Form v-if="!expired" :loading="loading" :submit-func="submitForm" :inputs="inputs" />
                <UiLink href="/">Go to Home</UiLink>
                <UiMessageBox variant="Success" v-if="message">{{ message }}</UiMessageBox>
                <UiMessageBox variant="Error" v-if="errorMessage">{{ errorMessage }}</UiMessageBox>
            </template>
        </UiTransparentContainer>
    </main>
</template>

<script setup lang="ts">
import type { FormProps } from '~/components/Form.vue';

const route = useRoute();
const expired = route.query.error_code as string === "otp_expired"

const { loading, errorMessage, message, updatePassword } = useAuth()
const password = ref("")

const inputs: FormProps["inputs"] = [
    {
        attributes: { type: "password", placeholder: "Insert password" },
        vModel: { value: password.value, updateValue: (value) => password.value = value }
    }
]

const submitForm = async () => {
    await updatePassword(password.value)
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