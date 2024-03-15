import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import '../src/assets/css/global.css';
//字体文件
import '@/assets/font/YouSheBiaoTiHei.css';
import '@/assets/font/PangMenZhengDao-3.css';
import '@/assets/font/DINAlternate.css';
import { login } from '@/api/index';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 10000;
const app = createApp(App);
// 注册全局组件
import Tabs from '@/components/tabs';
import Dialog from '@/components/dialog';
import TitleIcon from '@/components/titleIcon';

app.component('Tabs', Tabs);
app.component('Dialog', Dialog);
app.component('TitleIcon', TitleIcon);

axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASE_URL;
// 请求拦截器
axios.interceptors.request.use((config) => {
  // 设置请求头
  config.headers.common['Authorization'] = `Bearer ${localStorage.dptoken}` || '';
  return config;
});
// 响应拦截器
axios.interceptors.response.use(
  (res) => {
    // console.log('响应拦截器', res);
    // let message = Vue.prototype.$message;
    if (res.data.code === 200) {
      // 处理有ossid的附件
      if (res.data.rows && res.data.rows.some((item) => item.ossId)) {
        res.data.rows = res.data.rows.map((obj) => {
          obj.url = `${import.meta.env.VITE_APP_API_BASE_URL}/system/oss/download/${obj.ossId}`;
          if (obj.ossId?.split(',').length > 0) {
            obj.urlList = obj.ossId.split(',').map((item) => {
              return item ? `${import.meta.env.VITE_APP_API_BASE_URL}/system/oss/download/${item}` : null;
            });
            if (obj.urlList.length === 2) {
              obj.urlList = [...obj.urlList, ...obj.urlList];
            }
          }
          return obj;
        });
      }
      return res.data || res.rows;
    }
    if (res.data.code === 401) {
      Login();
      window.location.reload();
      return;
    }
    return res;
  },
  (err) => {
    console.error(err);
    return err;
  }
);
async function init() {
  if (localStorage.dptoken) {
    app
      .use(ElementPlus, {
        locale: zhCn,
      })
      .use(router)
      .use(store)
      .mount('#app');
  } else {
    await Login();
    app
      .use(ElementPlus, {
        locale: zhCn,
      })
      .use(router)
      .use(store)
      .mount('#app');
  }
}
init();

async function Login() {
  localStorage.removeItem('dptoken');
  let user = {
    username: 'admin',
    password: 'Ab@14145794',
  };
  const { data } = await login(user);
  if (data) {
    localStorage.setItem('dptoken', `${data.token}`);
  }
}

// 全局配置el-icon配置后不用每个模块导入
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
