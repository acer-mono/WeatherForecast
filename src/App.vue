<template>
  <SearchBox :options="options" :select-handler="selectHandler" />
  <CheckBox description="next 5 days" />
  <div class="previews">
    <ForecastPreview />
    <ForecastPreview />
    <ForecastPreview />
    <ForecastPreview />
    <ForecastPreview />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBox from "@/components/SearchBox.vue";
import CheckBox from "@/components/CheckBox.vue";
import ForecastPreview from "@/components/ForecastPreview.vue";

export default defineComponent({
  name: "App",
  components: {
    ForecastPreview,
    CheckBox,
    SearchBox,
  },
  data() {
    return {
      options: ["one", "two", "three"],
      selectHandler(value: string): void {
        console.log(value);
      },
    };
  },
});
</script>

<style scoped>
.previews {
  display: flex;
}
</style>
