<template>
  <modal-default :visible="visible" @close="$emit('close')" size="md">
    <div class="create">
      <form @submit.prevent="create">
        <div class="create__form-item">
          <label :for="title.id">{{ title.label }}</label>
          <input
            class="create__form-item__field"
            :id="title.id"
            type="text"
            v-model="title.value"
          />
        </div>

        <div class="create__form-item" :id="participantList.id">
          <label :for="participantList.id">{{ participantList.label }}</label>
          <multiselect
            class="create__form-item__field"
            v-model="participantListValue"
            :options="participantList.options"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :searchable="false"
            placeholder="Pick users"
            :custom-label="customLabel"
            :preserve-search="true"
            :preselect-first="false"
            label="user"
            track-by="id"
          />
        </div>

        <div class="create__form-item">
          <label :for="facilitatorUser.id">{{ facilitatorUser.label }}</label>
          <multiselect
            :id="facilitatorUser.id"
            v-model="facilitatorUserValue"
            :options="notBisyPartisipantList"
            :searchable="false"
            placeholder="Pick user"
            :custom-label="customLabel"
          />
        </div>

        <div class="create__form-item">
          <label :for="secretaryUser.id">{{ secretaryUser.label }}</label>
          <multiselect
            :id="secretaryUser.id"
            v-model="secretaryUserValue"
            :options="notBisyPartisipantList"
            :searchable="false"
            placeholder="Pick user"
            :custom-label="customLabel"
          />
        </div>

        <div class="create__form-item">
          <label :for="start.id">{{ start.label }}</label>
          <date-picker v-model="startValue" :config="start.options" />
        </div>

        <div class="create__form-item">
          <label :for="end.id">{{ end.label }}</label>
          <date-picker v-model="endValue" :config="end.options" />
        </div>

        <button>create event</button>
      </form>
    </div>
  </modal-default>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";
import ModalDefault from "@/components/layout/modal/default";
import Multiselect from "vue-multiselect";
import DatePicker from "vue-bootstrap-datetimepicker";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ModalDefault,
    Multiselect,
    DatePicker
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      rawUserList: "user/list/data"
    }),
    notBisyPartisipantList() {
      const rawList = this.rawUserList;
      const result = [];
      rawList.forEach(element => {
        if (
          element.id !== this.facilitatorUserValue.id &&
          element.id !== this.secretaryUserValue.id
        ) {
          result.push(element);
        }
      });
      return result;
    },
    title() {
      return {
        id: "title",
        type: "input",
        label: "title"
      };
    },
    participantList() {
      return {
        id: "participant_list",
        name: "participantList",
        type: "multiselect",
        options: this.rawUserList,
        label: "participant list"
      };
    },
    facilitatorUser() {
      return {
        id: "facilitator_user_id",
        type: "select",
        label: "facilitator"
      };
    },
    secretaryUser() {
      return {
        id: "secretary_user_id",
        type: "select",
        label: "secretary"
      };
    },
    start() {
      return {
        id: "start",
        type: "datetimepicker",
        label: "start",
        options: {
          format: "DD/MM/YYYY",
          useCurrent: false,
          minDate: new Date()
        }
      };
    },
    end() {
      return {
        id: "end",
        type: "datetimepicker",
        label: "end",
        options: {
          format: "DD/MM/YYYY",
          useCurrent: false,
          minDate: this.startValue || new Date()
        }
      };
    }
  },
  data() {
    return {
      titleValue: "",
      participantListValue: [],
      facilitatorUserValue: "",
      secretaryUserValue: "",
      startValue: "",
      endValue: "",
      status: "scheduled"
    };
  },
  methods: {
    ...mapActions({
      getUserRawList: "user/list/get"
    }),
    /**
     * Set custo label to multiselect
     * @param {object} option
     * @returns string
     */
    customLabel(option) {
      return `${option.name}  ${option.surname}`;
    },
    /**
     * Update participant list on change facilitator or secretary users
     * @param {object} newValue
     * @param {object} oldValue
     * @returns void
     */
    updateParticipantList(newValue, oldValue) {
      let hasChoosenUser = false;
      const prevUser = oldValue;
      let filteredUserList = this.participantListValue.filter(element => {
        if (element.id === newValue.id) {
          hasChoosenUser = true;
        }
        // remove prev user from participantList
        return prevUser.id !== element.id;
      });
      // set filtered participantList
      this.participantListValue = filteredUserList;
      // add new user to participantList
      if (hasChoosenUser) {
        return;
      }
      this.participantListValue.push(newValue);
    }
  },
  watch: {
    /**
     * Get userRawList on modal opening
     * @param {boolean} newValue
     * @returns void
     */
    async visible(newValue) {
      if (!newValue || this.rawUserList.length !== 0) {
        return;
      }
      await this.getUserRawList();
    },
    /**
     * Update participantListValue on prop changing
     */
    facilitatorUserValue(newValue, oldValue) {
      if (newValue === "") {
        return;
      }
      this.updateParticipantList(newValue, oldValue);
    },
    /**
     * Update participantListValue on prop changing
     */
    secretaryUserValue(newValue, oldValue) {
      if (newValue === "") {
        return;
      }
      this.updateParticipantList(newValue, oldValue);
    },
    /**
     * Update secretaryUserValue & facilitatorUserValue on prop changing
     */
    participantListValue(newValue) {
      let hasFacilitator = false;
      let hasSecretary = false;
      newValue.forEach(element => {
        if (element.id === this.facilitatorUserValue.id) {
          hasFacilitator = true;
        }
        if (element.id === this.secretaryUserValue.id) {
          hasSecretary = true;
        }
      });
      if (!hasFacilitator) {
        this.facilitatorUserValue = "";
      }
      if (!hasSecretary) {
        this.secretaryUserValue = "";
      }
    }
  }
};
</script>

<style lang="scss">
.create {
  &__form-item {
    margin-bottom: 20px;
    label {
      display: inline-block;
      margin-bottom: 5px;
      &:first-letter {
        text-transform: uppercase;
      }
    }
    &__field {
      display: block;
    }

    .multiselect,
    input {
      @include multiselect;
    }
  }
  #participant_list {
    .multiselect {
      &__tag {
        display: block;
        margin-bottom: 5px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      &__tags-wrap {
      }
    }
  }
}
</style>
