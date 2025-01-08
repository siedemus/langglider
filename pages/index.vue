<template>
    <div class="gradient-background">
        <main class="gradient-background__main">
            <h1 class="main__header">LanGGlider</h1>
            <h2 class="main__subheader">Accelerate Your Language Learning Journey</h2>
            <NuxtLink href="/dashboard" class="main__link">Get Started</NuxtLink>
        </main>
        <section class="gradient-background__section">
            <article class="section__article">
                <div class="article__splitter">
                    <Tile header="AI-Powered Learning">
                        AI crafts personalized flashcards tailored to
                        your unique learning style and pace. Experience smarter,
                        more efficient learning designed just for you!
                    </Tile>
                    <Tile header="Smart Progress">
                        Track your growth with intuitive progress monitoring tools that provide
                        real-time insights into your learning journey.
                    </Tile>
                </div>
                <Tile header="Personalized Content Recommendations">
                    Let our AI guide you to the best immersive content based on your preferences,
                    skill level, and goals. Every recommendation is designed to enhance your learning journey.
                </Tile>
                <Tile header="Start Your Journey">
                    Begin your language learning adventure today with LanGGlider. Our
                    AI-powered platform makes learning a new language more efficient
                    and enjoyable than ever. Join thousands of successful learners
                    who have already achieved their language goals.
                </Tile>
                <div class="article__splitter">
                    <Tile header="Learn by Doing">
                        Immerse yourself in hands-on experiences that teach you through action, not just theory.
                        Our platform ensures you're actively acquiring skills and knowledge
                        while exploring engaging content.
                    </Tile>
                    <Tile header="Guided Effort">
                        We don't promise effortless learning—we promise results. Our platform helps you channel your
                        energy into proven,
                        effective methods, making the journey challenging but highly rewarding.
                    </Tile>
                </div>
                <Tile header="Support The Author">
                    If you find LanGGlider helpful, consider supporting the project. Your
                    contribution helps maintain and improve the platform for language learners worldwide.
                </Tile>
                <div class="article__splitter">
                    <Tile header="Learn by Doing">
                        Immerse yourself in hands-on experiences that teach you through action, not just theory. Our
                        platform ensures you're actively acquiring skills and knowledge while exploring engaging
                        content.
                    </Tile>
                    <Tile header="Guided Effort">
                        We don't promise effortless learning—we promise results.
                        Our platform helps you channel your energy
                        into proven, effective methods, making the journey challenging but highly rewarding.
                    </Tile>
                </div>
                <Tile header="Support The Author">
                    If you find LanGGlider helpful, consider supporting the project. Your
                    contribution helps maintain and improve the platform for language learners worldwide.
                </Tile>
            </article>
        </section>
    </div>
</template>

<script setup lang="ts">
import Tile from "~/components/ui/Tile/index.vue"
</script>

<style lang="css" scoped>
@import url("~/assets/css/gradient-background.css");

.gradient-background {
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 1100px) {
        max-height: 100vh;
        flex-direction: row;
    }
}

.gradient-background__main {
    height: 100vh;
    width: 100%;
    max-width: 100vw;
    z-index: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    will-change: transform;
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;

    @media (min-width: 1100px) {
        max-width: 60vw;
    }
}

.main__header {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
    margin: 0;
    font-size: clamp(3rem, 5vw, 4rem);
    font-weight: 800;
}

.main__subheader {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
    margin: 0;
    font-size: clamp(1rem, 2vw, 2rem);
    font-weight: 600;
    padding: 0 0.5rem;
}

.main__link {
    font-size: clamp(1rem, 1.2vw, 1.4rem);
    max-width: 200px;
    margin-top: 0.8rem;
    padding: 0.7rem 1rem;
    border: none;
    border-radius: 0.5rem;
    transition: all 300ms ease;
    font-weight: 600;
    background-color: white;
    text-decoration: none;
    color: black;
    text-align: center;
    cursor: pointer;

    &:hover {
        transform: scale(1.01) translateY(-2px);
        filter: brightness(0.95);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
}

.gradient-background__section {
    max-width: 100vw;
    max-height: 100vh;
    background-color: rgb(15, 15, 15, 0.3);
    padding: 1rem;
    box-shadow: 0 0 3px rgba(36, 36, 36, 0.7);
    overflow-y: auto;

    @media (min-width: 1100px) {
        max-width: 40vw;
    }

    &::-webkit-scrollbar {
        width: 0.6rem;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(255, 255, 255, 0.2);
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: rgb(255, 255, 255, 0.4);
    }
}

.section__article {
    display: flex;
    gap: 1rem;
    flex-direction: column;
}

.article__splitter {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;

    @media (min-width: 1100px) {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>