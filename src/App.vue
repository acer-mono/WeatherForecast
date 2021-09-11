<template>
  <SearchBox :options="options" :select-handler="selectHandler" />
  <div>Some information for test</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBox from "@/components/SearchBox.vue";

export default defineComponent({
  name: "App",
  components: {
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

<style></style>
