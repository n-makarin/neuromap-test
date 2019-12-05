<template>
  <div class="header">
    <navigation />
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

<style lang="scss" scoped>
.header {
  padding: 7px;
  border-bottom: 1px solid rgb(216, 216, 216);
}
</style>
