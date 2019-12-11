<template>
  <div class="list">
    <h2 class="list__title">{{ title }}</h2>
    <div
      v-for="event in data"
      :key="event.id"
      class="list__item list-item"
      @click="showDetail(event)"
    >
      <div class="list-item__name">{{ event.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: "List"
    }
  },
  methods: {
    /**
     * Show modal with detailed event info
     * @param {object} event
     * @returns void
     */
    showDetail(event) {
      this.$store.dispatch("event/set", event);
      this.$emit("showDetail");
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  &__title {
    font-size: 22px;
    &::first-letter {
      text-transform: uppercase;
    }
  }
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &-item {
    cursor: pointer;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
