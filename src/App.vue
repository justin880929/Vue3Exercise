<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideBar  from "./components/SideBar/SideBar.vue";
import type{ SettingDefaultType } from "./components/SideBar/TS/type/type";
import { ref } from "vue";
const CSRouter:SettingDefaultType={
  isOpen: ref(false),
  isDarkMode:ref(false),
  routesSetting: [
    {
      link: '/1',
      name: 'exercise1',
      tooltip: 'exercise1',
      icon: 'bx-book-content',
    },
    {
      link: '/2',
      name: 'exercise2',
      tooltip: 'exercise2',
      icon: 'bx-bar-chart-alt-2',
    },
    {
      link: '/3',
      name: 'exercise3',
      tooltip: 'exercise3',
      icon: 'bx-transfer-alt',
    },
  ]
}
</script>

<template>
  <SideBar :custzSBS="CSRouter"/>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
