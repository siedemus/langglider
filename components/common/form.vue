<template>
    <form class="form" @submit.prevent="submitFunc">
        <input class="form__input" :disabled="loading" v-for="input in inputs" v-bind="input.attributes"
            v-model="input.data.value" @input="updateModelValue($event, input)" :key="input.attributes.placeholder" />
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
        data: {
            value: string,
            updateValue: (value: string) => void
        }
    }[],
}

const updateModelValue = (event: Event, input: FormProps["inputs"][number]) => {
    const value = (event.target as HTMLInputElement).value;
    input.data.updateValue(value)
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
    background-color: var(--transparent-gray);
    color: white;

    &::placeholder {
        color: var(--transparent-white);
    }

    &:disabled {
        background-color: var(--transparent-white);
    }

    &:disabled:hover {
        cursor: not-allowed;
    }
}

.form__button {
    background-color: var(--transparent-lime);
    color: inherit;
    padding: 0.8rem;
    border: none;
    border-radius: 0.5rem;
    transition: all 0.3s;
    cursor: pointer;

    &:disabled:hover {
        background-color: var(--transparent-lime);
        cursor: not-allowed;
    }

    &:hover {
        background-color: var(--transparent-gray);
    }
}
</style>