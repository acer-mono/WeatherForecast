<template>
  <SearchBox :options="cities" :select-handler="selectHandler" />
  <CheckBox description="next 5 days" />
  <ForecastPreviewList />
  <Forecast />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBox from "@/components/SearchBox.vue";
import CheckBox from "@/components/CheckBox.vue";
import ForecastPreviewList from "@/components/ForecastPreviewList.vue";
import Forecast from "@/components/Forecast.vue";

export default defineComponent({
  name: "App",
  components: {
    Forecast,
    ForecastPreviewList,
    CheckBox,
    SearchBox,
  },
  data() {
    return {
      selectHandler(value: string): void {
        console.log(value);
      },
    };
  },
  computed: {
    cities() {
      return this.$store.state.cities;
    },
  },
});
</script>

<style></style>
