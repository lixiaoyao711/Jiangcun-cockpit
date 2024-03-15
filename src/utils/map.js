import axios from 'axios';
/**
 * GET 方式请求数据，获取本地数据
 * @param url  请求url（已经拼接好的路径）
 * @param params 请求参数
 */
export function getLocalData(url) {
  if (url == null) return;
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'get',
      params: {},
      baseURL: null,
    })
      .then((data) => {
        console.log('data', data);
        if (data.status === 200) resolve(data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// 处理接口返回数据为地图支持的数据格式
export function formatMapData(data, checkList = []) {
  // 处理经纬度点线面数据为高德地图支持的格式
  data.map((item) => {
    // 经济产业带类型渲染类型为线条,不属于多边形和点位,单独处理
    if (item.modular === '经济产业带') {
      item.chartType = 'line';
      item.line = item.pointData.split(';').map((sunItem) => {
        return sunItem.split(',').map((obj) => Number(obj));
      });
    } else if (item.pointData.split(';').length > 1) {
      item.chartType = 'polygons';
      item.path = item.pointData.split(';').map((sunItem) => {
        return sunItem.split(',').map((obj) => Number(obj));
      });
    } else {
      item.point = item.pointData.split(',').map((obj) => Number(obj));
      item.chartType = 'point';
    }
  });
  // 分类处理数据
  for (const key in checkList) {
    data.map((item) => {
      if (item.typeTwo === key || item.type === key || item.modular === key || item.posthouseType === key) {
        checkList[key].data.push(item);
        checkList[key].chartType = item.chartType;
        // 设置每个数据对应的颜色
        item.icon = checkList[key]?.icon;
        item.strokeColor = checkList[key]?.strokeColor;
        item.fillColor = checkList[key]?.fillColor;
      }
    });
  }
}
