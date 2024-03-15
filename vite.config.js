import { defineConfig,loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import AutoImport from 'unplugin-auto-import/vite';

const { resolve } = require('path'); //必须要引入resolve

// https://vitejs.dev/config/
export default({mode})=> defineConfig({
  base:'./',
  // base:loadEnv(mode, process.cwd()).VITE_APP_CONTEXT_PATH,

  build: {
    target: 'es2020',
  },
  optimizedeps: {
    esbuildoptions: {
      target: 'es2020',
    },
  },

  define: {
    'process.env': {},
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'], // 自动导入vue和vue-router相关函数
      dts: 'src/auto-import.d.js', // 生成 `auto-import.d.ts` 全局声明
    }),
    // 配置插件
    // viteExternalsPlugin({
    //   echarts: 'echarts',
    //   lazy: ['echarts'],
    // }),
  ],
  //配置端口
  server: {
    host: '0.0.0.0',
    port: 5052,
    proxy: {
      '^/dev-api': {
        // 236 何奕, 126 玮琪, 147 本地测试， 137 柴思进，
        // target: 'http://192.168.1.156:8081',
        // target: 'http://jcadmin.xhnic.com/api',//测试环境
        target: 'https://jcjdszc.hzxh.gov.cn/api',//正式环境
        rewrite: (path) => path.replace(/^\/dev-api/, ''),
        changeOrigin: true,
      },
    },
  },
  resolve: {
    //配置可忽略的后缀名
    extensions: ['.js', '.vue', '.json'],
    //配置路径别名
    alias: [
      // webComponents配置
      { find: '@', replacement: resolve(__dirname, 'src') },
    ],
  },
});
