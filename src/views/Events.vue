<template>
  <div class="events">
    <button @click="modal.create.visible = true">create event</button>
    <list
      :data="list"
      title="event list"
      @showDetail="modal.detail.visible = true"
    />
    <create
      :visible="modal.create.visible"
      @close="modal.create.visible = false"
    />
    <detail
      :visible="modal.detail.visible"
      @close="modal.detail.visible = false"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import List from "@/components/views/events/list";
import Create from "@/components/views/events/modal/create";
import Detail from "@/components/views/events/modal/detail";

export default {
  components: {
    List,
    Create,
    Detail
  },
  computed: {
    ...mapGetters({
      list: "event/list/data"
    })
  },
  data() {
    return {
      modal: {
        create: {
          visible: false
        },
        detail: {
          visible: false
        }
      }
    };
  },
  methods: {
    ...mapActions({
      getList: "event/list/get"
    })
  },
  mounted() {
    // await while vm instance will be created
    this.$nextTick(async () => {
      await this.getList();
    });
  }
};
</script>
