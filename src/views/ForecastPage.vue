<template>
  <div class="header">Weather forecast</div>
  <SearchBox class="control" :options="cities" />
  <ForecastPreviewList class="control" />
  <Forecast class="control" v-if="$store.state.currentForecast" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBox from "@/components/SearchBox.vue";
import ForecastPreviewList from "@/components/ForecastPreviewList.vue";
import Forecast from "@/components/Forecast.vue";

export default defineComponent({
  name: "ForecastPage",
  components: { Forecast, ForecastPreviewList, SearchBox },
  computed: {
    cities() {
      return this.$store.state.cities;
    },
  },

  mounted() {
    this.$store.dispatch("getCities");
  },
});
</script>

<style scoped>
.header {
  text-align: center;
  color: #868585;
  font-size: 2.5rem;
}

.control {
  margin-top: 1.5rem;
}
</style>
