<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import { useWindowSize } from "@vueuse/core";

const negativeButton = ref();
const initialLeft = ref(0);
const initialRight = ref(0);
const initialTop = ref(0);
const initialBottom = ref(0);

const loading = ref(false);
const happy = ref(false);

const { width, height } = useWindowSize();
const el = useElementSize(negativeButton);

function makeMeHappy() {
  loading.value = true;

  useFetch("/api", { method: "POST" })
    .then(({ data }) => {
      happy.value = true;
    })
    .finally(() => {
      loading.value = false;
    });
}

function setInital() {
  if (negativeButton.value) {
    negativeButton.value.style.transform = null;
    initialLeft.value = negativeButton.value.offsetLeft * -1;
    initialTop.value = negativeButton.value.offsetTop * -1;
    initialRight.value =
      width.value - (negativeButton.value.offsetLeft + el.width.value);
    initialBottom.value =
      width.value - (negativeButton.value.offsetTop + el.height.value);
  }
}

function setRandPosition() {
  if (negativeButton.value) {
    let X =
      Math.floor(Math.random() * (initialRight.value - initialLeft.value + 1)) +
      initialLeft.value;
    let Y =
      Math.floor(Math.random() * (initialBottom.value - initialTop.value + 1)) +
      initialTop.value;

    negativeButton.value.style.transform = `translate(${X}px, ${Y}px)`;
  }
}

onMounted(() => {
  setInital();
});

watch(width, () => {
  setInital();
});

watch(height, () => {
  setInital();
});
</script>

<template>
  <main class="main" v-if="!happy && !loading">
    <div class="form">
      <img src="/cat-please.gif" alt="" draggable="false" />
      <div class="text">Пойдем гулять?</div>
      <div class="buttons">
        <button class="positive" @click="makeMeHappy">Да!</button>
        <button class="negative" ref="negativeButton" @click="setRandPosition">
          Нет :(
        </button>
      </div>
    </div>
  </main>
  <main class="main" v-if="loading">
    <div class="form">
      <img src="/loading.gif" alt="" draggable="false" />
      <div class="text">Я в думке, подожди 5-10 сек.!</div>
    </div>
  </main>
  <main class="main" v-if="happy">
    <div class="form">
      <img src="/cat-happy.gif" alt="" draggable="false" />
      <div class="text">УРААААА, ГОУ ГОУ ГОУ! ❤️</div>
    </div>
  </main>
</template>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  user-select: none;
}

.form img {
  width: 50vw;
}

.form .text {
  font-size: 1.5rem;
  text-align: center;
  font-weight: 700;
}

.form .buttons {
  display: flex;
  gap: 2rem;
  flex-direction: row;
  justify-content: space-between;
}

.form .buttons button {
  appearance: none;
  cursor: pointer;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 0.8rem;
  font-weight: 600;
  z-index: 50;
}

.form .buttons button.negative {
  background: var(--negative-color);
  color: var(--light-color);
}

.form .buttons button.positive {
  background: var(--blue-color);
  color: var(--light-color);
}
</style>
