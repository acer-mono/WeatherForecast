<template>
  <div class="main">
    <div class="box" @click="checkHandler">
      <img v-if="isChecked" src="@/assets/check_mark.svg" alt="check" />
    </div>
    <div class="description">{{ description }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CheckBox",
  props: {
    description: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    checkHandler(): void {
      this.isChecked = !this.isChecked;
    },
  },
});
</script>

<style scoped>
.box {
  border: 3px solid #d1d1d1;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  flex-shrink: 0;
}

img {
  user-select: none;
}

.main {
  display: flex;
  align-items: center;
}

.description {
  color: #7e7e7e;
  font-size: 1.5rem;
}
</style>
