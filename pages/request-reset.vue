<template>
    <main class="main">
        <CommonTransparentContainer>
            <template #header>
                Forgot Password?
            </template>
            <template #content>
                <CommonForm :loading="loading" :submit-func="submitForm" :inputs="inputs" />
                <CommonLink to="/">Go to Home</CommonLink>
                <CommonMessageBox variant="Success" v-if="message">{{ message }}</CommonMessageBox>
                <CommonMessageBox variant="Error" v-if="errorMessage">{{ errorMessage }}</CommonMessageBox>
            </template>
        </CommonTransparentContainer>
    </main>
</template>

<script setup lang="ts">
import type { FormProps } from '~/components/common/form.vue';

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