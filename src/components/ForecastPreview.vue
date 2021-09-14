<template>
  <div class="main" @click="clickHandler(forecast.id)">
    <div class="header">{{ forecast.date }}</div>
    <img
      class="weather-label"
      src="../assets/heavy_cloud.svg"
      alt="heavy cloud"
    />
    <div>
      <div class="measuring-box">
        <img src="../assets/temperature.svg" alt="temperature" />
        <span>{{ forecast.temperature }} °C</span>
      </div>
      <div class="measuring-box">
        <img src="../assets/humidity.svg" alt="temperature" />
        <span>{{ forecast.humidity }}%</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Forecast } from "@/store";

export default defineComponent({
  name: "ForecastPreview",
  props: {
    forecast: {
      type: Object as PropType<Forecast>,
      required: true,
    },
  },
  methods: {
    clickHandler(id: string): void {
      this.$store.commit("setCurrentForecast", id);
    },
  },
});
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
}

.main:hover {
  background: #f6f6f6;
}

.header {
  color: #8b8a8a;
  font-size: 1.6rem;
}

.weather-label {
  width: 6rem;
}

.measuring-box {
  display: flex;
  align-items: center;
  color: #696969;
  margin-top: 0.3rem;
  font-size: 1.2rem;
}
</style>
