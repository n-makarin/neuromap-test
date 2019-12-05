<template>
  <div class="navigation">
    <router-link v-for="link in linkList" :key="link.title" :to="link.path">{{
      link.title
    }}</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkList: [
        {
          title: "users",
          path: "users"
        },
        {
          title: "events",
          path: "events"
        },
        {
          title: "home",
          path: "/"
        }
      ]
    };
  }
};
</script>

<style></style>
