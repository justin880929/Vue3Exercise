import type{ Ref} from "vue";
import {ref} from "vue";
interface RoutesType {
  link: string;
  name: string;
  tooltip: string;
  icon: string
}
export interface SettingDefaultType{
  isOpen:Ref<boolean>;
  isDarkMode:Ref<boolean>;
  routesSetting: RoutesType[];
}
export const settingDefault: SettingDefaultType = {
  isOpen: ref(false),
  isDarkMode:ref(false),
  routesSetting: [
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
}