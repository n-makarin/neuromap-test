<template>
  <div class="participant-list">
    <div class="participant-list__title">Participants:</div>
    <div
      v-for="(user, index) in data"
      :key="user.id"
      class="participant-list__item"
    >
      {{ `${index + 1}. ${user.name} ${user.surname}` }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.participant-list {
  margin-bottom: 15px;
  &__title {
  }
  &__item {
    padding-left: 10px;
  }
}
</style>
