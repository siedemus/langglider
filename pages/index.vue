<script setup lang="ts">
import Button from "@/components/ui/Button.vue"

const { $anime } = useNuxtApp()

onMounted(() => {
    $anime({
        targets: [".section__header", ".section__subheader", ".section__buttonContainer"],
        translateY: [-100, 0],
        opacity: [0, 1],
        delay: $anime.stagger(100),
        duration: 1000,
        easing: "easeInOutBack"
    })

    $anime({
        targets: ".section",
        opacity: [0, 1],
        delay: 100,
        duration: 1000,
        easing: "easeInOutBack"
    })
})
</script>

<template>
    <section class="section">
        <h1 class="section__header">Accelerate Your Language Learning Journey</h1>
        <h2 class="section__subheader">Automate Your Flashcard Creation with AI - Spend More Time Learning</h2>
        <div class="section__buttonContainer">
            <Button variant="Primary" class="section__button">Get Started Now</Button>
        </div>
    </section>
</template>

<style lang="css" scoped>
.section {
    background-image: url("assets/images/wallpaper.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.section::before {
    content: "";
    min-height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.65);
    pointer-events: none;
}

.section__header {
    color: #1B946A;
    margin-top: 150px;
    position: relative;
    font-weight: 800;
    font-size: 80px;
    max-width: 700px;
    text-align: center;
    padding: 0 5px;
    line-height: 1.1;
    margin-bottom: 0;

    @media (max-width: 680px) {
        font-size: 60px;
    }

    @media (max-height: 620px) {
        font-size: 40px;
    }
}

.section__subheader {
    color: #1B946A;
    position: relative;
    font-weight: 700;
    font-size: 20px;
    max-width: 600px;
    text-align: center;
    padding: 0 5px;

    @media (max-width: 680px) {
        max-width: 400px;
    }

    @media (max-height: 620px) {
        font-size: 15px;
    }
}

.section__button {
    position: relative;
    padding: 10px 15px;
    font-size: 20px;

    @media (max-height: 620px) {
        font-size: 12px;
    }
}
</style>