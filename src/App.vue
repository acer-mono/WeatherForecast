<template>
  <ForecastPage />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ForecastPage from "@/views/ForecastPage.vue";

export default defineComponent({
  name: "App",
  components: { ForecastPage },
});
</script>

<style></style>
