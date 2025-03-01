<template>
    <CommonMessageBox variant="Error" v-if="setError">
        Set not found.
    </CommonMessageBox>
    <CommonMessageBox variant="Error" v-else-if="paramsError">
        Invalid parameters provided to page.
    </CommonMessageBox>
    <template v-else>
        <div class="loader-container" v-if="userStore.loading">
            <CommonLoader />
        </div>
        <div class="content" v-else>
            <section class="content__topbar">
                <CommonButtonLink :to="$route.path + '/play'">Play</CommonButtonLink>
                <CommonButtonLink :to="'/dashboard/create?edit=' + set!.id">Edit</CommonButtonLink>
                <CommonButtonLink @click="switchModal(true)">Delete</CommonButtonLink>
            </section>
            <section class="content__set">
                <h1 class="set__header">{{ set!.name }}</h1>
                <p class="set__count">Flashcard: {{ (set!.flashcards as []).length }}</p>
                <p class="set__review">Reviewed: {{ formatDate(set!.last_review) }}</p>
                <template v-if="isNotEmpty">
                    <h2>Flashcards</h2>
                    <CommonFlashcardsList :set="set!" />
                </template>
            </section>
        </div>
        <CommonModal v-model:show-modal="showModal" @confirm="deleteSet">
            Do you really want to delete {{ set!.name }}?
        </CommonModal>
    </template>
</template>

<script setup lang="ts">
const showModal = ref(false);
const switchModal = (value: boolean) => showModal.value = value;

const userStore = useUserStore();
const route = useRoute();
const set = userStore.getSetById(route.params.id as string);
const isNotEmpty = (set!.flashcards as []).length !== 0;
const setError = set === undefined;
const paramsError = typeof route.params.id !== "string";

const deleteSet = async () => {
    showModal.value = false;
    await userStore.deleteSet(set!.id);
    return navigateTo("/dashboard");
};

const formatDate = (dateString: string | null) => {
    if (dateString === null) return "none";

    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};
</script>

<style lang="css" scoped>
.loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.content {
    background: var(--transparent-dark);
    border: 1px solid var(--transparent-white);
    border-radius: 7px;
}

.content__topbar {
    border-bottom: 1px solid var(--transparent-white);
    padding: 15px;
    min-height: 6vh;
    display: flex;
    gap: 0.5rem;
}

.content__set {
    padding: 15px;
}

.set__header {
    margin: 0 0 15px;
    font-weight: 800;
    font-size: 2.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
}

.set__count {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0;
}

.set__review {
    font-size: 1.3rem;
    margin: 0;
}
</style>