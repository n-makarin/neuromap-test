<template>
  <modal-default :visible="visible" @close="$emit('close')" size="sm">
    <div class="detail">
      <div class="detail__name">{{ user.name }}</div>
      <div class="detail__surname">{{ user.surname }}</div>
      <button @click="close">close</button>
      <button @click="remove">remove</button>
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
    close() {
      this.$emit("close");
    },
    async remove() {
      await this.$store.dispatch("user/remove", this.user.id);
      if (this.user.id !== 0) {
        return;
      }
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped></style>
