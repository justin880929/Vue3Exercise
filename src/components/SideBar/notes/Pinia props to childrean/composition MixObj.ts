//test.ts
import { defineStore } from "pinia";
import { ref, Ref } from "vue";
interface RoutesType {
  link: string;
  name: string;
  tooltip: string;
  icon: string
};
interface SettingDefaultType {
  isOpen: Ref<boolean>;
  isLogin: Ref<boolean>;
  isDarkMode: Ref<boolean>;
  routesSetting: RoutesType[];
}

// ***Tips***
// Using the Composition API to define state with a MixinObject
// **Not recommended**
// - Defining state as an object of type SettingDefaultType in Pinia
// - Pinia devtools cannot display state properties clearly, making it difficult to see state properties passed to children components

// To make state visible in Pinia devtools, use computed properties
// Example:
// const isOpen = computed(() => testSet.isOpen);
// return { isOpen }
export const useTestStore = defineStore('testStore', () => {
  const testSet: SettingDefaultType = {
    isOpen: ref(false),
    isLogin: ref(false),
    isDarkMode: ref(false),
    routesSetting: [
      {
        link: '/home',
        name: 'Home',
        tooltip: 'Test',
        icon: 'bx-home-alt',
      },
      {
        link: '/purchase',
        name: 'Purchase',
        tooltip: 'Test',
        icon: 'bx-cart-alt',
      },
      {
        link: '/user',
        name: 'User',
        tooltip: 'Test',
        icon: 'bx-user',
      },
    ]
  }
  return {testSet}
})

// 
//Vue components
// <template>
//   <Sidebar :custzSBS="testProps"></Sidebar> 
// </template>
// <script setup lang="ts">
// import Sidebar from './components/SideBar/SideBar.vue'
// import {useTestStore} from "./stores/test";
// import { ref,toRef } from "vue";                    //<-
// const store=useTestStore()
// const testProps={                                   //<-
//   isOpen: toRef(store.testSet, 'isOpen'),           //<-
//   isLogin: toRef(store.testSet, 'isLogin'),         //<-
//   isDarkMode: toRef(store.testSet, 'isDarkMode'),   //<-
//   routesSetting: store.testSet.routesSetting        //<-
// }                                                   //<-
// </script>