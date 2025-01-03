<script setup lang="ts">
const { appUrl } = useRuntimeConfig().public

import Tile from "~/components/ui/Tile/index.vue"
</script>

<template>
    <main class="main">
        <section class="main__hero">
            <h1 class="hero__header">LanGGlider</h1>
            <h2 class="hero__subheader">Accelerate Your Language Learning Journey</h2>
            <NuxtLink href="/dashboard" class="hero__link">Get Started</NuxtLink>
        </section>
        <section class="main__scroller">
            <article class="scroller__article">
                <div class="scroller__splitter">
                    <Tile header="AI-Powered Learning">AI crafts personalized flashcards tailored to
                        your unique learning style and pace. Experience smarter, more efficient learning
                        designed just for you!</Tile>
                    <Tile header="Smart Progress">Track your growth with intuitive progress monitoring tools that
                        provide
                        real-time insights into your learning journey.
                    </Tile>
                </div>
                <Tile header="Personalized Content Recommendations">
                    Let our AI guide you to the best immersive content based on your preferences, skill level, and
                    goals.
                    Every recommendation is designed to enhance your learning journey.
                </Tile>
                <Tile header="Start Your Journey">Begin your language learning adventure today with LanGGlider. Our
                    AI-powered platform makes learning a new language more efficient and enjoyable than ever. Join
                    thousands of successful learners who have already achieved their language goals.
                </Tile>
                <div class="scroller__splitter">
                    <Tile header="Learn by Doing">
                        Immerse yourself in hands-on experiences that teach you through action, not just theory. Our
                        platform ensures you’re actively acquiring skills and knowledge while exploring engaging
                        content.
                    </Tile>
                    <Tile header="Guided Effort">
                        We don’t promise effortless learning—we promise results. Our platform helps you channel your
                        energy
                        into proven, effective methods, making the journey challenging but highly rewarding.
                    </Tile>
                </div>
                <Tile header="Support The Author">If you find LanGGlider helpful, consider supporting the project. Your
                    contribution helps maintain and improve the platform for language learners worldwide.</Tile>
                <div class="scroller__splitter">
                    <Tile header="Learn by Doing">
                        Immerse yourself in hands-on experiences that teach you through action, not just theory. Our
                        platform ensures you’re actively acquiring skills and knowledge while exploring engaging
                        content.
                    </Tile>
                    <Tile header="Guided Effort">
                        We don’t promise effortless learning—we promise results. Our platform helps you channel your
                        energy
                        into proven, effective methods, making the journey challenging but highly rewarding.
                    </Tile>
                </div>
                <Tile header="Support The Author">If you find LanGGlider helpful, consider supporting the project. Your
                    contribution helps maintain and improve the platform for language learners worldwide.</Tile>
            </article>
        </section>
    </main>
</template>

<style lang="css" scoped>
.main {
    min-height: 100vh;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 1100px) {
        flex-direction: row;
        max-height: 100vh;
    }
}

.main::before,
.main::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200vw;
    height: 200vh;
    opacity: 0.7;
    -webkit-filter: blur(60px);
    filter: blur(60px);
    z-index: -1;
    transform: translateZ(0);
    backface-visibility: hidden;

    @media screen and (max-width: 1100px) {
        width: 400vw;
        height: 400vh;
    }
}

.main::before {
    background: radial-gradient(circle, rgb(255, 0, 128) 0%, rgb(81, 163, 163, 0) 65%);
    -webkit-animation: swim 5s ease-in-out infinite alternate;
    animation: swim 5s ease-in-out infinite alternate;
    will-change: transform;
}

.main::after {
    background: radial-gradient(circle, rgb(0, 255, 179) 0%, rgb(81, 163, 163, 0) 65%);
    -webkit-animation: swim 5s ease-in-out infinite alternate;
    animation: swim 4s ease-in-out infinite alternate-reverse;
    will-change: transform;
}

.main__hero {
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

.hero__header {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
    margin: 0;
    font-size: clamp(3rem, 5vw, 4rem);
    font-weight: 800;
}

.hero__subheader {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
    margin: 0;
    font-size: clamp(1rem, 2vw, 2rem);
    font-weight: 600;
    padding: 0 0.5rem;
}

.hero__link {
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

.main__scroller {
    max-width: 100vw;
    max-height: 100vh;
    background-color: rgb(15, 15, 15, 0.3);
    padding: 1rem;
    box-shadow: 0 0 3px rgba(36, 36, 36, 0.7);
    overflow-y: auto;

    @media (min-width: 1100px) {
        max-width: 40vw;
    }
}

.scroller__article {
    display: flex;
    gap: 1rem;
    flex-direction: column;
}

.scroller__splitter {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;

    @media (min-width: 1100px) {
        grid-template-columns: repeat(2, 1fr);
    }
}

.scroller__button {
    display: block;
}

@keyframes swim {
    from {
        transform: translate(-25%, -25%);
    }

    to {
        transform: translate(25%, 25%);
    }
}
</style>