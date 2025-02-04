<template>
    <div class="wrapper">
        <main class="main">
            <h1 class="main__header">LanGGlider</h1>
            <h2 class="main__subheader">Accelerate Your Language Learning Journey.</h2>
            <CommonButtonLink to="/dashboard" class="main__button-link">Get Started</CommonButtonLink>
        </main>
        <section class="about">
            <div class="about__container">
                <div class="container__splitter">
                    <CommonTile v-for="tile in splitterTiles1" :key="tile.header" :header="tile.header">
                        {{ tile.content }}
                    </CommonTile>
                </div>
                <CommonTile v-for="tile in singleTiles" :key="tile.header" :header="tile.header">
                    {{ tile.content }}
                </CommonTile>
                <div class="container__splitter">
                    <CommonTile v-for="tile in splitterTiles2" :key="tile.header" :header="tile.header">
                        {{ tile.content }}
                    </CommonTile>
                </div>
                <CommonTile v-for="tile in splitterTiles1" :key="tile.header" :header="tile.header">
                    {{ tile.content }}
                </CommonTile>
                <CommonTile v-for="tile in singleTiles" :key="tile.header" :header="tile.header">
                    {{ tile.content }}
                </CommonTile>
                <CommonTile v-for="tile in splitterTiles2" :key="tile.header" :header="tile.header">
                    {{ tile.content }}
                </CommonTile>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const splitterTiles1 = [
    {
        header: "AI-Powered Learning",
        content: "AI crafts personalized flashcards tailored to your unique learning style and pace. Experience smarter, more efficient learning designed just for you!"
    },
    {
        header: "Smart Progress",
        content: "Track your growth with intuitive progress monitoring tools that provide real-time insights into your learning journey."
    }
];

const singleTiles = [
    {
        header: "Personalized Content Recommendations",
        content: "Let our AI guide you to the best immersive content based on your preferences, skill level, and goals. Every recommendation is designed to enhance your learning journey."
    },
    {
        header: "Start Your Journey",
        content: "Begin your language learning adventure today with LanGGlider. Our AI-powered platform makes learning a new language more efficient and enjoyable than ever. Join thousands of successful learners who have already achieved their language goals."
    }
];

const splitterTiles2 = [
    {
        header: "Learn by Doing",
        content: "Immerse yourself in hands-on experiences that teach you through action, not just theory. Our platform ensures you're actively acquiring skills and knowledge while exploring engaging content."
    },
    {
        header: "Guided Effort",
        content: "We don't promise effortless learning—we promise results. Our platform helps you channel your energy into proven, effective methods, making the journey challenging but highly rewarding."
    }
];
</script>

<style lang="css" scoped>
.wrapper {
    max-height: 100vh;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    @media screen and (min-width: 1100px) {
        flex-direction: row;
        overflow: hidden;
    }

    &::-webkit-scrollbar {
        width: 0;
    }
}

.main {
    min-height: 100vh;
    width: 100%;
    max-width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    padding: 0.5rem;

    @media screen and (min-width: 1100px) {
        max-width: 60vw;
    }
}

.main__header {
    text-shadow: var(--shadow-white);
    margin: 0;
    font-size: clamp(2rem, 15vw, 5rem);
    font-weight: 800;
}

.main__subheader {
    text-shadow: var(--shadow-white);
    margin: 0;
    font-size: clamp(1rem, 15vw, 1.4rem);
    font-weight: 800;
}

.main__button-link {
    margin-top: 15px;
    box-shadow: var(--shadow-white);
    font-size: 1.4rem;
}

.about {
    min-height: 100vh;
    width: 100%;
    max-width: 100vw;
    background-color: var(--transparent-dark);
    box-shadow: var(--shadow-dark);
    overflow-y: auto;
    padding: 1rem;
    position: sticky;

    @media screen and (min-width: 1100px) {
        max-height: 100vh;
        max-width: 40vw;
    }

    &::-webkit-scrollbar {
        width: 0;
    }
}

.about__container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.container__splitter {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;

    @media screen and (min-width: 1100px) {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>