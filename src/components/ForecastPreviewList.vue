<template>
  <div class="previews">
    <forecast-preview
      v-for="value in forecasts"
      :forecast="value"
      :key="value.id"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ForecastPreview from "@/components/ForecastPreview.vue";
import { Forecast } from "@/store";

export default defineComponent({
  name: "ForecastPreviewList",
  components: { ForecastPreview },
  computed: {
    forecasts(): Forecast[] {
      return this.$store.getters.forecasts;
    },
  },
});
</script>

<style scoped>
.previews {
  display: flex;
  justify-content: space-between;
}
</style>
