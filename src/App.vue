<template>
  <div id="app">
    <Header />
    <router-view />
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
}
</style>
