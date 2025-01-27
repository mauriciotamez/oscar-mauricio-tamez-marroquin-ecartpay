<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const currentSlide = ref(0)
const slides = [
  {
    image: 'https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/hero-1.jpg',
    title: 'High Performance GPUs',
    description: 'Experience next-gen gaming with our latest graphics cards'
  },
  {
    image: 'https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/hero-2.jpg',
    title: 'RTX 4070 Series',
    description: 'Powered by NVIDIA Ada Lovelace architecture'
  },
  {
    image: 'https://pub-482ca486c9994a8dae819b04e50b55b7.r2.dev/hero-3.jpg',
    title: 'Advanced Cooling',
    description: 'Stay cool under pressure with our advanced cooling solutions'
  }
]

const timer = ref<number>()

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

const startSlideShow = () => {
  timer.value = setInterval(nextSlide, 5000)
}

const stopSlideShow = () => {
  if (timer.value) clearInterval(timer.value)
}

onMounted(() => {
  startSlideShow()
})

onBeforeUnmount(() => {
  stopSlideShow()
})
</script>

<template>
  <div
    class="slider-container"
    @mouseenter="stopSlideShow"
    @mouseleave="startSlideShow"
  >
    <div class="slides" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="slide"
      >
        <img :src="slide.image" :alt="slide.title">
        <div class="slide-content">
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.description }}</p>
        </div>
      </div>
    </div>

    <button class="slider-button prev" @click="prevSlide">❮</button>
    <button class="slider-button next" @click="nextSlide">❯</button>

    <div class="slider-dots">
      <button
        v-for="(_, index) in slides"
        :key="index"
        :class="['dot', { active: currentSlide === index }]"
        @click="currentSlide = index"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.slider-container {
  width: calc(100% + 4rem);
  margin-left: -2rem;
  height: 600px;
  position: relative;
  overflow: hidden;
}

.slides {
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
}

.slide {
  min-width: 100%;
  position: relative;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-content {
  position: absolute;
  bottom: 20%;
  left: 10%;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.slide-content h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.slide-content p {
  font-size: 1.5rem;
}

.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 1rem;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background-color 0.3s;
}

.slider-button:hover {
  background: rgba(0, 0, 0, 0.8);
}

.prev {
  left: 1rem;
}

.next {
  right: 1rem;
}

.slider-dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0;
}

.dot.active {
  background: white;
}
</style>
