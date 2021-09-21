<template>
  <div class="wrapper">
    <div class="header">{{ forecast.date }}</div>
    <div class="label">
      <img :src="forecast.icon" alt="condition icon" />
    </div>
    <div class="measure1">
      <div class="measuring-box">
        <img
          src="@/assets/temperature.svg"
          alt="Temperature"
          title="Temperature"
        />
        <span>{{ forecast.temperature }}°C</span>
      </div>
      <div class="measuring-box">
        <img
          src="@/assets/wind_speed.svg"
          alt="Wind speed"
          title="Wind speed"
        />
        <span>{{ forecast.windSpeed }}&nbsp;mph</span>
      </div>
      <div class="measuring-box">
        <img
          src="@/assets/wind_direction.svg"
          alt="Wind direction"
          title="Wind direction"
        />
        <span>{{ forecast.windDirection }}°</span>
      </div>
    </div>
    <div class="measure2">
      <div class="measuring-box">
        <img
          src="@/assets/air_pressure.svg"
          alt="Air pressure"
          title="Air pressure"
        />
        <span>{{ forecast.airPressure }}&nbsp;mbar</span>
      </div>
      <div class="measuring-box">
        <img src="@/assets/humidity.svg" alt="Humidity" title="Humidity" />
        <span>{{ forecast.humidity }}%</span>
      </div>
      <div class="measuring-box">
        <img
          src="@/assets/visibility.svg"
          alt="Visibility"
          title="Visibility"
        />
        <span>{{ forecast.visibility }}&nbsp;km</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Forecast",
  computed: {
    forecast() {
      return this.$store.state.currentForecast;
    },
  },
});
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: 2rem 1fr;
  grid-template-columns: 1.5fr 1fr 1fr;
  grid-template-areas:
    "header header header"
    "label measure1 measure2";
  align-items: center;
  max-width: 550px;
}
.header {
  grid-area: header;
  color: #878787;
  font-size: 2rem;
}

.label {
  grid-area: label;
}

.label img {
  width: 12rem;
}

.measure1 {
  grid-area: measure1;
}

.measure2 {
  grid-area: measure2;
}

.measuring-box {
  display: flex;
  align-items: center;
  color: #696969;
  margin-top: 0.3rem;
  font-size: 1.6rem;
}

.measuring-box img {
  width: 2rem;
  margin-right: 0.5rem;
}
</style>
