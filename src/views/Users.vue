<template>
  <div class="users">
    <h1>users</h1>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "home",
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
