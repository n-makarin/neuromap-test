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
            placeholder="Pick a value"
          />
        </div>

        <div class="create__form-item">
          <label :for="facilitatorUser.id">{{ facilitatorUser.label }}</label>
          <multiselect
            :id="facilitatorUser.id"
            v-model="facilitatorUserValue"
            :options="facilitatorUser.options"
            :searchable="false"
            placeholder="Pick a value"
          />
        </div>

        <div class="create__form-item">
          <label :for="secretaryUser.id">{{ secretaryUser.label }}</label>
          <multiselect
            :id="secretaryUser.id"
            v-model="secretaryUserValue"
            :options="secretaryUser.options"
            :searchable="false"
            placeholder="Pick a value"
          />
        </div>

        <button>create event</button>
      </form>
    </div>
  </modal-default>
</template>

<script>
import ModalDefault from "@/components/layout/modal/default";
import Multiselect from "vue-multiselect";

export default {
  components: {
    ModalDefault,
    Multiselect
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
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
        options: ["one", "two", "three"],
        label: "participant list"
      };
    },
    facilitatorUser() {
      return {
        id: "facilitator_user_id",
        type: "select",
        options: ["one", "two", "three"],
        label: "facilitator user"
      };
    },
    secretaryUser() {
      return {
        id: "secretary_user_id",
        type: "select",
        options: ["one", "two", "three"],
        label: "secretary user"
      };
    },
    start() {
      return {
        id: "start",
        type: "datetimepicker",
        label: "start"
      };
    },
    end() {
      return {
        id: "end",
        type: "datetimepicker",
        label: "end"
      };
    }
  },
  data() {
    return {
      titleValue: "",
      participantListValue: "",
      facilitatorUserValue: "",
      secretaryUserValue: "",
      startValue: "",
      endValue: "",
      status: "scheduled"
    };
  },
  methods: {
    /**
     * Create event, add it to store
     * @returns Promise<void>
     */
    async create() {
      // const payload = {
      //   name: this.fieldList[0].value,
      //   surname: this.fieldList[1].value
      // };
      // await this.$store.dispatch("event/create", payload);
      // this.clearFieldListValues();
      // this.$emit("close");
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
