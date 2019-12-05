<template>
  <div class="detail" v-if="visible">
    <div class="detail__name">{{ user.name }}</div>
    <div class="detail__surname">{{ user.surname }}</div>
    <button @click="$emit('close')">close</button>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.getters["user/data"];
    }
  },
  methods: {
    close() {}
  }
};
</script>

<style lang="scss" scoped></style>
