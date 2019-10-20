import {Checkbox, CheckboxGroup, Stepper, Popup, Dialog, Tab, Tabs, Button, Toast, Loading, Sidebar, SidebarItem, NavBar, AddressEdit  } from 'vant'

const components = [Checkbox, CheckboxGroup, Stepper, Popup, Dialog, Tab, Tabs, Button, Toast, Loading, Sidebar, SidebarItem, NavBar, AddressEdit ]

export default {
  // Vue.use会触发一个 名叫install触发并接受Vue对象作为第一个参数
  install(Vue) {
    components.forEach(c => Vue.use(c))
  }
}
