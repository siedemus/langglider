<script setup lang="ts">
import Tile from "~/components/ui/Tile/index.vue"

const scrollToSection = () => {
    const scrollerSection = document.getElementById("scroller")

    if (scrollerSection) {
        scrollerSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }
}
</script>

<template>
    <main class="main">
        <section class="main__hero">
            <h1 class="hero__header">LanGGlider</h1>
            <h2 class="hero__subheader">Accelerate Your Language Learning Journey</h2>
        </section>
        <section class="main__scroller" id="scroller">
            <article class="scroller__article">
                <div class="scroller__splitter">
                    <Tile header="AI-Powered Learning">Our advanced AI technology creates personalized flashcards
                        tailored
                        to your learning style.</Tile>
                    <Tile header="Smart Progress">Monitor your learning progress with detailed analytics and insights.
                    </Tile>
                </div>
                <Tile header="Start Your Journey">Begin your language learning adventure today with LanGGlider. Our
                    AI-powered platform makes learning a new language more efficient and enjoyable than ever. Join
                    thousands of successful learners who have already achieved their language goals.</Tile>
                <Tile header="Support The Author">If you find LanGGlider helpful, consider supporting the project. Your
                    contribution helps maintain and improve the platform for language learners worldwide.</Tile>
            </article>

        </section>
    </main>
</template>

<style lang="css" scoped>
.main {
    max-width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;

    @media (min-width: 900px) {
        flex-direction: row;
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
    filter: blur(60px);
    z-index: -1;
}

.main::before {
    background: radial-gradient(circle, rgb(255, 0, 128) 0%, rgb(81, 163, 163, 0) 65%);
    animation: swim 5s ease-in-out infinite alternate
}

.main::after {
    background: radial-gradient(circle, rgb(0, 255, 179) 0%, rgb(81, 163, 163, 0) 65%);
    animation: swim 4s ease-in-out infinite alternate-reverse
}

.main__hero {
    height: 100vh;
    width: 100vw;
    z-index: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;

    @media (min-width: 900px) {
        max-width: 60vw;
    }
}

.hero__header {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
    margin: 0;
    font-size: 40px;
    font-weight: 800;
}

.hero__subheader {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    padding: 0 5px;
}

.main__scroller {
    max-width: 100vw;
    max-height: 100vh;
    background-color: rgb(15, 15, 15, 0.3);
    padding: 15px;
    overflow-y: auto;
    box-shadow: 0 0 3px rgba(36, 36, 36, 0.7);

    @media (min-width: 900px) {
        max-width: 40vw;
    }
}

.scroller__article {
    display: flex;
    gap: 15px;
    flex-direction: column;
}

.scroller__splitter {
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(2, 1fr);
}

@keyframes swim {
    0% {
        transform: translate(-25%, -25%) scale(1);
    }

    50% {
        transform: translate(0%, 0%) scale(1.5);
    }

    100% {
        transform: translate(25%, 25%) scale(1);
    }
}

@keyframes bounce {
    70% {
        transform: translateY(0%);
    }

    75% {
        transform: translateY(-15%);
    }

    80% {
        transform: translateY(0%);
    }

    85% {
        transform: translateY(-7%);
    }

    90% {
        transform: translateY(0%);
    }

    95% {
        transform: translateY(-5%);
    }

    100% {
        transform: translateY(0);
    }
}
</style>