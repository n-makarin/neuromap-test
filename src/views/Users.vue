<template>
  <div class="users">
    <list :data="list" title="user list" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import List from "@/components/views/users/list";

export default {
  components: {
    List
  },
  computed: {
    ...mapGetters({
      list: "user/list/data"
    })
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
