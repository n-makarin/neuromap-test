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
        <button>create event</button>
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
    /**
     * Create event, add it to store
     * @returns Promise<void>
     */
    async create() {
      const payload = {
        name: this.fieldList[0].value,
        surname: this.fieldList[1].value
      };
      await this.$store.dispatch("event/create", payload);
      this.clearFieldListValues();
      this.$emit("close");
    },
    /**
     * @returns void
     */
    clearFieldListValues() {
      this.fieldList[0].value = "";
      this.fieldList[1].value = "";
    }
  }
};
</script>

<style lang="scss" scoped></style>