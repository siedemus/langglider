<template>
    <main class="main">
        <CommonTransparentContainer>
            <template #header>
                {{ expired ? 'Request Expired!' : 'Update your Password' }}
            </template>
            <template #content>
                <CommonForm v-if="!expired" :loading="loading" :submit-func="submitForm" :inputs="inputs" />
                <CommonLink to="/">Go to Home</CommonLink>
                <CommonMessageBox variant="Success" v-if="message">{{ message }}</CommonMessageBox>
                <CommonMessageBox variant="Error" v-if="errorMessage">{{ errorMessage }}</CommonMessageBox>
            </template>
        </CommonTransparentContainer>
    </main>
</template>

<script setup lang="ts">
import type { FormProps } from '~/components/common/form.vue';

const route = useRoute();
const expired = route.query.error_code as string === "otp_expired"

const { loading, errorMessage, message, updatePassword } = useAuth()
const password = ref("")

const inputs: FormProps["inputs"] = [
    {
        attributes: { type: "password", placeholder: "Insert password" },
        data: { value: password.value, updateValue: (value) => password.value = value }
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