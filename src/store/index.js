import { createStore } from 'vuex';
import axios from 'axios';
import { indicatorSetTreMapList } from '@/api/';
export default createStore({
  state: {
    // 数字政府
    governmentData: {},
    // 数字党建
    partyData: {},
    // 数字经济
    economicData: {},
    // 数字社会
    socialData: {},
    // 数字门户
    generalData: {},
    // 数字文化
    cultureData: {},
    // 数字法治
    ruleOflawData: {},
    // 底部多选框数据
    checkList: [],
    // 首页背景图片
    homeBg: '',
    // 控制footer显隐,在地图加载后显示footer
    isFooter: false,
    //动态更新地图点位infowindow
    infoWindow: {},
  },
  mutations: {
    // 获取数字政府数据
    setGovernmentData(state, value) {
      setTimeout(() => {
        console.log('数字政府', value);
      }, 300);
      state.governmentData = value;
    },
    // 获取数字党建数据
    setPartyData(state, value) {
      setTimeout(() => {
        console.log('数字党建', value);
      }, 300);
      state.partyData = value;
    },
    // 获取数字党建数据
    setEconomicData(state, value) {
      setTimeout(() => {
        console.log('数字经济', value);
      }, 300);
      state.economicData = value;
    },
    // 获取数字社会数据
    setSocialData(state, value) {
      setTimeout(() => {
        console.log('数字社会', value);
      }, 300);
      state.socialData = value;
    },
    // 获取数字文化数据
    setGeneralData(state, value) {
      setTimeout(() => {
        console.log('数字门户', value);
      }, 300);
      state.generalData = value;
    },
    // 获取数字文化数据
    setCultureData(state, value) {
      setTimeout(() => {
        console.log('数字文化', value);
      }, 300);
      state.cultureData = value;
    },
    // 获取数字法治数据
    setRuleOflawData(state, value) {
      setTimeout(() => {
        console.log('数字法治', value);
      }, 300);
      state.ruleOflawData = value;
    },
    // 设置底部多选框选择数据
    setCheckboxData(state, value) {
      console.log('多选框', value);
      state.checkList = value;
    },
    // 设置首页背景图片
    setHomeBg(state, value) {
      console.log('背景图片', value);
      state.homeBg = value;
    },
    // 设置是否显示地图底部显示点位代码
    setIsFooter(state, value) {
      console.log('footer', value);
      state.isFooter = value;
    },
    // 设置地图窗体显示
    setMapInfoWindow(state, value) {
      console.log('infoWindow', value);
      state.infoWindow = value;
    },
  },
  actions: {
    async getAllData({ commit }) {
      var { data } = await indicatorSetTreMapList({
        fullPath: '',
        searchValue: 'isNotNull',
      });
      if (data) {
        commit('setGeneralData', data);
      }
      var { data } = await indicatorSetTreMapList({
        fullPath: '',
        searchValue: '数字党建',
      });
      if (data) {
        commit('setPartyData', data);
      }
      var { data } = await indicatorSetTreMapList({
        fullPath: '',
        searchValue: '数字政府',
      });
      if (data) {
        commit('setGovernmentData', data);
      }
      var { data } = await indicatorSetTreMapList({
        fullPath: '',
        searchValue: '数字经济',
      });
      if (data) {
        commit('setEconomicData', data);
      }
      var { data } = await indicatorSetTreMapList({
        fullPath: '',
        searchValue: '数字社会',
      });
      if (data) {
        commit('setSocialData', data);
      }
      var { data } = await indicatorSetTreMapList({
        fullPath: '',
        searchValue: '数字文化',
      });
      if (data) {
        commit('setCultureData', data);
      }
      var { data } = await indicatorSetTreMapList({
        fullPath: '',
        searchValue: '数字法治',
      });
      if (data) {
        commit('setRuleOflawData', data);
      }
    },
  },
  modules: {},
});
