<template>
  <SearchBox :options="options" :select-handler="selectHandler" />
  <CheckBox description="next 5 days" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SearchBox from "@/components/SearchBox.vue";
import CheckBox from "@/components/CheckBox.vue";

export default defineComponent({
  name: "App",
  components: {
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

<style></style>
