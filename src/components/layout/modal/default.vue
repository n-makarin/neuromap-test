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

<style lang="scss" scoped>
.modal-default {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $z-index_modal;
  &__content {
    padding: 20px;
    border-radius: 3px;
    background: white;
    z-index: $z-index_modal-content;
  }
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: $z-index_overlay;
    background: $gray-transparent;
    cursor: pointer;
  }
}
</style>
