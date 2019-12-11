<template>
  <modal-default :visible="visible" @close="$emit('close')" size="md">
    <div class="detail">
      <div class="detail__title">{{ event.title }}</div>
      <participant-list
        :data="participantList"
        class="detail__participant-list"
      />
      <div class="detail__facilitator">
        Facilitator: {{ fullName.facilitatorUser }}
      </div>
      <div class="detail__secretary">
        Secretary: {{ fullName.secretaryUser }}
      </div>
      <div class="detail__duration">
        <div class="detail__start">{{ event.duration.start }}</div>
        <div class="detail__end">{{ event.duration.end }}</div>
      </div>
      <div class="detail__status">
        {{ event.status }}
      </div>
      <button class="button-default" @click="close">close</button>
      <button class="button-remove" @click="remove">remove</button>
    </div>
  </modal-default>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModalDefault from "@/components/layout/modal/default";
import ParticipantList from "@/components/views/events/modal/detail/participant-list";

export default {
  components: {
    ModalDefault,
    ParticipantList
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fullName: {
        facilitatorUser: "",
        secretaryUser: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      event: "event/data",
      participantList: "event/participantList",
      facilitatorUser: "event/facilitatorUser",
      secretaryUser: "event/secretaryUser"
    })
  },
  methods: {
    close() {
      this.$emit("close");
    },
    ...mapActions({
      setParticipantList: "event/setParticipantList",
      setFacilitatorUser: "event/setFacilitatorUser",
      setSecretaryUser: "event/setSecretaryUser"
    }),
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
    },
    /**
     * Set facilitator and secretary full names
     * @returns void
     */
    setFullNames() {
      this.fullName.facilitatorUser = `${this.facilitatorUser.name} ${this.facilitatorUser.surname}`;
      this.fullName.secretaryUser = `${this.secretaryUser.name} ${this.secretaryUser.surname}`;
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
      await this.setParticipantList(this.event.participant_list);
      await this.setFacilitatorUser(this.event.facilitator_user_id);
      await this.setSecretaryUser(this.event.secretary_user_id);
      this.setFullNames();
    }
  }
};
</script>

<style lang="scss" scoped>
.detail {
  &__title {
    font-size: 20px;
    font-weight: bolder;
    margin-bottom: 10px;
  }
  &__facilitator {
    margin-bottom: 10px;
  }
  &__secretary {
    margin-bottom: 15px;
  }
  &__duration {
    margin-bottom: 10px;
  }
  &__status {
    margin-bottom: 15px;
  }
  .button-default {
    margin-right: 10px;
  }
}
</style>
