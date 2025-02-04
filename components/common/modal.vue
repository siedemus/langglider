<template>
    <div class="cover" v-if="showModal">
        <div class="modal">
            <p class="modal__text">
                <slot></slot>
            </p>
            <div class="modal__button-container">
                <CommonButtonLink @click="dedicatedFunction">
                    Yes
                </CommonButtonLink>
                <CommonButtonLink @click="switchModal(false)">
                    No
                </CommonButtonLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface ModalProps {
    showModal: boolean;
    switchModal: (value: boolean) => void;
    dedicatedFunction: () => Promise<any>;
}

const { showModal, switchModal, dedicatedFunction } = defineProps<ModalProps>()
</script>

<style lang="css" scoped>
.cover {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: var(--transparent-dark);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    padding: 15px;
    background-color: var(--dark);
    border-radius: 7px;
    margin: 15px;
    max-width: 450px;
    border: 1px solid var(--transparent-white);
}

.modal__text {
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
}

.modal__button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    gap: 15px;
}
</style>