<template>
  <modal-default :visible="visible" @close="$emit('close')" size="sm">
    <div class="detail">
      <div class="detail__full-name">{{ fullName }}</div>
      <button class="button-default" @click="close">close</button>
      <button class="button-remove" @click="remove">remove</button>
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
    },
    fullName() {
      return `${this.user.name} ${this.user.surname}`;
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    /**
     * Remove user from store and db by id
     * @returns Promise<void>
     */
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

<style lang="scss" scoped>
.detail {
  .button-default {
    margin-right: 10px;
  }
  &__full-name {
    font-size: 20px;
    margin-bottom: 15px;
  }
}
</style>
