<template>
  <div id="app">
    <navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "@/components/layout/navigation.vue";

export default {
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
#app {
}
</style>
