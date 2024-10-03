import { defineStore } from "pinia";
import { ref, computed } from "vue";
interface RoutesType {
  link: string;
  name: string;
  tooltip: string;
  icon: string
};
// ***Tips***
// Using Composition API to define separate state
// **Recommended**
// - Pinia can detect and manage state effectively
// - Child components receive reactive props correctly
// - Pinia only subscribes to the top-level ref() state
// - Use computed to make the state visible in Pinia devtools
// Example:
//   const routesSetting = computed(() => routesObjArr);
//   return { routesSetting }

export const useTestStore = defineStore('testStore', () => {
  const isOpen= ref(false)
  const isLogin= ref(false)
  const isDarkMode= ref(false)
  const routesObjArr: RoutesType[] = [
      {
        link: '/home',
        name: 'Home',
        tooltip: '首頁',
        icon: 'bx-home-alt',
      },
      {
        link: '/purchase',
        name: 'Purchase',
        tooltip: '購物車',
        icon: 'bx-cart-alt',
      },
      {
        link: '/user',
        name: 'User',
        tooltip: '會員',
        icon: 'bx-user',
      },
  ]
  const routesSetting=computed(()=>routesObjArr)

  return {isOpen,isLogin,isDarkMode,routesSetting}
})
// 
//Vue components
// <script setup lang="ts">
// import Sidebar from './components/SideBar/SideBar.vue'
// import {useTestStore} from "./stores/test";        //<-
// import { storeToRefs } from "pinia";
// import { ref} from "vue";
// const store=useTestStore()
// const{isLogin,isOpen,isDarkMode}=storeToRefs(store)//<-
// const {routesSetting}=store                        //<-
// const testProps={                                  //<-
//   isLogin:isLogin,                                 //<-
//   isOpen:isOpen,                                   //<-
//   isDarkMode:isDarkMode,                           //<-
//   routesSetting:routesSetting                      //<-
// }                                                  //<-
// </script>