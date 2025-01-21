<template>
    <form class="form" @submit.prevent="submitFunc">
        <input class="form__input" :disabled="loading" v-for="input in inputs" v-bind="input.attributes"
            v-model="input.vModel.value" @input="updateModelValue($event, input)" />
        <button class="form__button" :disabled="loading" type="submit">{{ loading ? "Processing..." :
            "Submit"
            }}</button>
    </form>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

export interface FormProps {
    submitFunc: (() => void) | (() => Promise<void>),
    loading: boolean,
    inputs: {
        attributes: InputHTMLAttributes,
        vModel: {
            value: string,
            updateValue: (value: string) => void
        }
    }[],
}

const updateModelValue = (event: Event, input: FormProps["inputs"][number]) => {
    const value = (event.target as HTMLInputElement).value;
    input.vModel.updateValue(value)
}

const { submitFunc, loading, inputs } = defineProps<FormProps>();
</script>

<style lang="css" scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form__input {
    border-radius: 0.5rem;
    border: none;
    padding: 0.8rem;
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
</style>