<template>
  <div class="list">
    <h2 class="list__title">{{ title }}</h2>
    <div
      v-for="user in data"
      :key="user.id"
      class="list__item list-item"
      @click="showDetail(user.id)"
    >
      <div class="list-item__name">{{ user.name }}</div>
      <div class="list-item__surname">{{ user.surname }}</div>
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
     * Show modal with detailed user info
     * @param {number} userId
     * @returns void
     */
    showDetail(userId) {
      console.log(userId);
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  &__item {
  }
  &__title {
    &::first-letter {
      text-transform: uppercase;
    }
  }
  &-item {
    display: flex;
  }
}
</style>
