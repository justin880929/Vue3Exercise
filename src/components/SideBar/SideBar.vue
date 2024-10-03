<template>
  <div class="sidebar" :class="{ open: isOpen, 'dark-mode':isDarkMode}">
    <ul class="nav-list">
      <li class="logo">
        <i class='bx bx-planet' @click="sidebarOpen()"></i>
      </li>
      <li class="phRWD" v-for="(item, index) in routesSetting" :key="index">
        <router-link :to="item.link">
          <i class="bx" :class="item.icon"></i>
          <span class="link_name">{{ item.name }}</span>
        </router-link>
        <span class="tooltip">{{ item.tooltip }}</span>
      </li>
    </ul>
  </div>
</template>


<script setup lang="ts">
import type{PropType} from 'vue';
import type {SettingDefaultType} from "./TS/type/type";
import {settingDefault} from "./TS/type/type";

const props = defineProps({
  // custzSBS="customize SideBar Setting"
  custzSBS:{
    type: Object as PropType<SettingDefaultType>,
    required:false,
    default: () => settingDefault,
  }
})
let {isOpen,isDarkMode,routesSetting}=props.custzSBS

function sidebarOpen() {
  isOpen.value = !isOpen.value;
}

</script>

<style scoped>
@import url("https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css");
@import "./CSS/sidebar.css"
</style>