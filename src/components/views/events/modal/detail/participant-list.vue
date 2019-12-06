<template>
  <div class="participant-list">
    <div>Participants:</div>
    <div v-for="user in data" :key="user.id" class="participant-list__item">
      {{ `${user.name} ${user.surname}` }}
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

<style lang="scss" scoped></style>
