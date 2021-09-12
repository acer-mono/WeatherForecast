<template>
  <SearchBox :options="cities" :select-handler="selectHandler" />
  <CheckBox description="next 5 days" />
  <ForecastPreviewList />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBox from "@/components/SearchBox.vue";
import CheckBox from "@/components/CheckBox.vue";
import ForecastPreviewList from "@/components/ForecastPreviewList.vue";

export default defineComponent({
  name: "App",
  components: {
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
