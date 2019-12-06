<template>
  <modal-default :visible="visible" @close="$emit('close')" size="md">
    <div class="create">
      <form @submit.prevent="create">
        <div
          class="create__item create-item"
          v-for="item in fieldList"
          :key="item.id"
        >
          <label :for="item.id">{{ item.label }}</label>
          <input :id="item.id" type="text" v-model="item.value" />
        </div>
        <button>create user</button>
      </form>
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
    return {
      fieldList: [
        {
          id: "name",
          value: "",
          label: "name"
        },
        {
          id: "surname",
          value: "",
          label: "surname"
        }
      ]
    };
  },
  methods: {
    create() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped></style>
