<template>
  <modal-default :visible="visible" @close="$emit('close')">
    <div class="detail">
      <div class="detail__name">{{ user.name }}</div>
      <div class="detail__surname">{{ user.surname }}</div>
      <button @click="$emit('close')">close</button>
    </div>
  </modal-default>
</template>

<script>
import ModalDefault from "@/components/layout/modal/default";

export default {
  components: {
    ModalDefault
  },
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
