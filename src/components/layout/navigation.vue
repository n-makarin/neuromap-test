<template>
  <div class="navigation">
    <router-link
      v-for="link in linkList"
      :key="link.title"
      :to="link.path"
      class="navigation__item"
      >{{ link.title }}</router-link
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkList: [
        {
          title: "home",
          path: "/"
        },
        {
          title: "users",
          path: "users"
        },
        {
          title: "events",
          path: "events"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  &__item {
    display: inline-block;
    text-decoration: none;
    margin-right: 20px;
    font-size: 15px;
    color: $gray;

    &:first-letter {
      text-transform: uppercase;
    }
    &:hover {
      color: $green-dark;
    }
    &.router-link-exact-active {
      color: $gray-light;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
