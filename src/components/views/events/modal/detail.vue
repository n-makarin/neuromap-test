<template>
  <modal-default :visible="visible" @close="$emit('close')" size="sm">
    <div class="detail">
      <div class="detail__title">{{ event.title }}</div>
      <div class="detail__participant-list">{{ participantList }}</div>
      <div class="detail__facilitator">{{ event.facilitator_user_id }}</div>
      <div class="detail__secretary">{{ event.secretary_user_id }}</div>
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
    event() {
      return this.$store.getters["event/data"];
    },
    participantList() {
      return this.$store.getters["event/participantList"];
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async setParticipantList(participantList) {
      await this.$store.dispatch("event/setParticipantList", participantList);
    },
    /**
     * Remove event from store and db by id
     * @returns Promise<void>
     */
    async remove() {
      await this.$store.dispatch("event/remove", this.event.id);
      if (this.event.id !== 0) {
        return;
      }
      this.close();
    }
  },
  watch: {
    /**
     * Set event data if modal opened
     */
    async visible(newValue) {
      if (!newValue) {
        return;
      }
      if (this.participantList.length === 0) {
        await this.setParticipantList(this.event.participant_list);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
