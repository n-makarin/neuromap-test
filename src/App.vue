<template>
  <div id="app">
    <Header />
    <router-view />
    <portal-target name="root" />
  </div>
</template>

<script>
import Header from "@/components/layout/header.vue";

export default {
  components: {
    Header
  }
};
</script>

<style lang="scss">
#app {
  padding: 0 20%;
}
</style>
