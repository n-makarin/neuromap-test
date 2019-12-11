<template>
  <div class="users">
    <button class="button-create" @click="modal.create.visible = true">
      create user
    </button>
    <list
      :data="list"
      title="user list"
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
import List from "@/components/views/users/list";
import Create from "@/components/views/users/modal/create";
import Detail from "@/components/views/users/modal/detail";

export default {
  components: {
    List,
    Create,
    Detail
  },
  computed: {
    ...mapGetters({
      list: "user/list/data"
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
      getList: "user/list/get"
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
