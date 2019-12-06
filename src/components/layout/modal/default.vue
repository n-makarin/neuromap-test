<template>
  <portal to="root">
    <div class="modal-default" v-if="visible">
      <div class="modal-default__content">
        <slot />
      </div>
      <div class="modal-default__overlay" @click="close"></div>
    </div>
  </portal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped></style>
