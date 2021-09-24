<template>
  <div class="main">
    <div class="search-panel">
      <input
        placeholder="Type city here"
        @focus="isInputInFocus = true"
        @blur="isInputInFocus = false"
        @keydown="$store.commit('reset')"
        v-model="searchString"
      />
      <img src="@/assets/binoculars.svg" alt="binoculars" width="50" />
    </div>
    <div class="options" v-if="isInputInFocus && searchString">
      <div
        class="option"
        v-for="(value, key) in getSuitableOptions"
        :key="key"
        @mousedown="selectHandler(value)"
      >
        {{ value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchBox",
  props: {
    options: {
      type: Array as () => Array<string>,
      required: true,
    },
  },
  data() {
    return {
      searchString: "",
      isInputInFocus: false,
    };
  },
  methods: {
    selectHandler(value: string): void {
      this.$store.dispatch("getCurrentForecast", value);
      this.$store.dispatch("getFiveDaysForecasts", value);
      this.searchString = value;
    },
  },
  computed: {
    getSuitableOptions(): Array<string> {
      return this.options.filter((el) =>
        el.toLowerCase().includes(this.searchString.toLowerCase())
      );
    },
  },
});
</script>

<style scoped>
.main {
  position: relative;
}
.search-panel {
  display: flex;
  flex-flow: row wrap;
  background: #bcbcbc;
  padding: 1rem 2rem;
}
input {
  all: unset;
  font-size: 1.5rem;
  color: #707070;
  background: #ffffff;
  padding: 0.5rem;
  flex-grow: 1;
  margin-right: 1.75rem;
}
.options {
  position: absolute;
  left: 0;
  right: 0;
  font-size: 1.5rem;
  color: #707070;
  border: 1px solid #e8e8e8;
  border-top: 0;
  max-height: 50vh;
  overflow-y: scroll;
}
.option {
  padding: 1rem 2rem;
  background: #ffffff;
  border-top: 1px solid #e8e8e8;
}

.option:first-child {
  border: 0;
}

.option:hover {
  color: #ffffff;
  background: #c6c6c6;
}

@media (max-width: 1050px) {
  img {
    display: none;
  }

  input {
    margin-right: 0;
  }
}
</style>
