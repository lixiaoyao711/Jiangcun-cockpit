<template>
  <div class="left2">
    <div class="title">
      <div class="left">
        <img class="title-img" src="@/assets/image/lsjt.png" alt="" />
        <div class="text">爱心幼苗</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="info">
      <div class="info-title">
        <div class="name">困境儿童信息</div>
        <div class="value-box">
          <div class="number">{{ showDataMap('数字社会', '1649303083504988162').value }}</div>
          <div class="unit">个</div>
        </div>
      </div>
      <div class="sub-info">
        <div class="info-title">
          <div class="name">幼托点位</div>
          <div class="value-box">
            <div class="number">{{ showDataMap('数字社会', '1649306892679606274').value }}</div>
            <div class="unit">个</div>
          </div>
        </div>
        <div class="info-title">
          <div class="name">托位人数</div>
          <div class="value-box">
            <div class="number">{{ showDataMap('数字社会', '1649307024984731650').value }}</div>
            <div class="unit">人</div>
          </div>
        </div>
      </div>
      <div class="charts" id="min3dpie"></div>

      <div class="sub1">
        <div class="sub-title">
          <el-icon><CaretRight /></el-icon>
          <div class="text">成长驿站活动</div>
        </div>
        <el-carousel class="window-box" direction="vertical" :autoplay="true" indicator-position="none">
          <el-carousel-item v-for="(item, index) in listData" :key="index" class="window" @click="showDialog(item)">
            <img :src="item.url" alt="" />
            <span class="text">{{ item.subject }}</span>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <Dialog :title="dialogData.subject" @close="isShowDialog = false" v-if="isShowDialog">
      <template v-slot:content>
        <div class="dialog-content">
          <img :src="dialogData.url" alt="" />
          <span class="text">{{ dialogData.content }}</span>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import * as echarts from 'echarts';
import { IndicatorGrowthPosthouseList, IndicatorSetTableTrendsList } from '@/api/index';
import { showDataMap } from '@/utils/common';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const test = computed(() => {
  return null;
});
let isShowDialog = ref(false);
function showDialog(row) {
  console.log(123);
  dialogData.value = row;
  isShowDialog.value = true;
}
let dialogData = ref({});
let listData = ref([]);
let myChart = null;
let optionData = ref([]);
async function getChartsData() {
  const res = await IndicatorSetTableTrendsList('age_group_distribution');
  if (res.code === 200) {
    optionData.value = res.rows.map((item) => {
      item.name = item.ages;
      item.value = item.num;
      return item;
    });
    init();
  }
}
let option = {};
async function getList() {
  const res = await IndicatorGrowthPosthouseList();
  if (res.code === 200) {
    listData.value = res.rows;
  }
}
function init() {
  //构建3d饼状图
  myChart = echarts.init(document.getElementById('min3dpie'));
  // 传入数据生成 option
  option = getPie3D(optionData.value, 0.8);
  myChart.setOption(option);
  //是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
  option.series.push({
    name: 'pie2d',
    type: 'pie',
    color: ['#2D9BFC', '#20BE5E', '#FFC97A'],
    labelLine: {
      show: false,
    },

    startAngle: -20, //起始角度，支持范围[0, 360]。
    clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
    radius: ['20%', '50%'],
    center: ['20%', '20%'],
    data: optionData.value,
    itemStyle: {
      opacity: 0,
    },
  });
  myChart.setOption(option);
  bindListen(myChart);
}

function getPie3D(pieData, internalDiameterRatio) {
  //internalDiameterRatio:透明的空心占比
  let series = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  let legendData = [];
  let legendBfb = [];
  let k = 1 - internalDiameterRatio;
  pieData.sort((a, b) => {
    return b.value - a.value;
  });
  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;
    let seriesItem = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,

      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k,
      },
      center: ['10%', '50%'],
    };

    if (typeof pieData[i].itemStyle != 'undefined') {
      let itemStyle = {};
      typeof pieData[i].itemStyle.color != 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
      typeof pieData[i].itemStyle.opacity != 'undefined' ? (itemStyle.opacity = pieData[i].itemStyle.opacity) : null;
      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  legendData = [];
  legendBfb = [];
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;
    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    );
    startValue = endValue;
    let bfb = fomatFloat(series[i].pieData.value / sumValue, 4);
    legendData.push({
      name: series[i].name,
      value: bfb,
    });
    legendBfb.push({
      name: series[i].name,
      value: bfb,
    });
  }
  let boxHeight = getHeight3D(series, 26); //通过传参设定3d饼/环的高度，26代表26px
  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  let option = {
    legend: {
      data: legendData,
      orient: 'vertical',
      right: 70,
      top: 40,
      itemGap: 10,
      textStyle: {
        color: '#fff',
        fontSize: '16',
      },
      type: 'scroll',
      show: true,
      itemWidth: 10,
      itemHeight: 10,
      formatter: function (param) {
        let item = optionData.value.filter((item) => item.name == param)[0];
        let bfs = fomatFloat(item.value * 100, 2) + '%';
        return `${item.name}  ${item.value}人`;
      },
    },
    labelLine: {
      show: true,
      lineStyle: {
        color: '#7BC0CB',
      },
    },
    label: {
      show: true,
      position: 'outside',
      rich: {
        b: {
          color: '#7BC0CB',
          fontSize: 12,
          lineHeight: 20,
        },
        c: {
          fontSize: 16,
        },
      },
      formatter: '{b|{b} \n}{c|{c}}{b|  亩}',
    },
    tooltip: {
      formatter: (params) => {
        if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
          let bfb = (
            (option.series[params.seriesIndex].pieData.endRatio -
              option.series[params.seriesIndex].pieData.startRatio) *
            100
          ).toFixed(2);
          return (
            `${params.seriesName}<br/>` +
            `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
            `${bfb}%`
          );
        }
      },
    },
    xAxis3D: {
      min: -1,
      max: 1,
    },
    yAxis3D: {
      min: -1,
      max: 1,
    },
    zAxis3D: {
      min: -1,
      max: 1,
    },
    grid3D: {
      show: false,
      boxHeight: boxHeight, //圆环的高度
      left: -100,
      viewControl: {
        //3d效果可以放大、旋转等，请自己去查看官方配置
        alpha: 40, //角度
        distance: 200, //调整视角到主体的距离，类似调整zoom
        rotateSensitivity: 0, //设置为0无法旋转
        zoomSensitivity: 0, //设置为0无法缩放
        panSensitivity: 0, //设置为0无法平移
        autoRotate: false, //自动旋转
      },
    },
    series: series,
  };
  return option;
}
function bindListen(myChart) {
  // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
  let selectedIndex = '';
  let hoveredIndex = '';
  // 监听点击事件，实现选中效果（单选）
  myChart.on('click', function (params) {
    // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
    let isSelected = !option.series[params.seriesIndex].pieStatus.selected;
    let isHovered = option.series[params.seriesIndex].pieStatus.hovered;
    let k = option.series[params.seriesIndex].pieStatus.k;
    let startRatio = option.series[params.seriesIndex].pieData.startRatio;
    let endRatio = option.series[params.seriesIndex].pieData.endRatio;
    // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
    if (selectedIndex !== '' && selectedIndex !== params.seriesIndex) {
      option.series[selectedIndex].parametricEquation = getParametricEquation(
        option.series[selectedIndex].pieData.startRatio,
        option.series[selectedIndex].pieData.endRatio,
        false,
        false,
        k,
        option.series[selectedIndex].pieData.value
      );
      option.series[selectedIndex].pieStatus.selected = false;
    }
    // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
    option.series[params.seriesIndex].parametricEquation = getParametricEquation(
      startRatio,
      endRatio,
      isSelected,
      isHovered,
      k,
      option.series[params.seriesIndex].pieData.value
    );
    option.series[params.seriesIndex].pieStatus.selected = isSelected;
    // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
    isSelected ? (selectedIndex = params.seriesIndex) : null;
    // 使用更新后的 option，渲染图表
    myChart.setOption(option);
  });
  // 监听 mouseover，近似实现高亮（放大）效果
  myChart.on('mouseover', function (params) {
    // 准备重新渲染扇形所需的参数
    let isSelected;
    let isHovered;
    let startRatio;
    let endRatio;
    let k;
    // 如果触发 mouseover 的扇形当前已高亮，则不做操作
    if (hoveredIndex === params.seriesIndex) {
      return;
      // 否则进行高亮及必要的取消高亮操作
    } else {
      // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
      if (hoveredIndex !== '') {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
        isSelected = option.series[hoveredIndex].pieStatus.selected;
        isHovered = false;
        startRatio = option.series[hoveredIndex].pieData.startRatio;
        endRatio = option.series[hoveredIndex].pieData.endRatio;
        k = option.series[hoveredIndex].pieStatus.k;
        // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
        option.series[hoveredIndex].parametricEquation = getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          option.series[hoveredIndex].pieData.value
        );
        option.series[hoveredIndex].pieStatus.hovered = isHovered;
        // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
        hoveredIndex = '';
      }
      // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
      if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
        isSelected = option.series[params.seriesIndex].pieStatus.selected;
        isHovered = true;
        startRatio = option.series[params.seriesIndex].pieData.startRatio;
        endRatio = option.series[params.seriesIndex].pieData.endRatio;
        k = option.series[params.seriesIndex].pieStatus.k;
        // 对当前点击的扇形，执行高亮操作（对 option 更新）
        option.series[params.seriesIndex].parametricEquation = getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          option.series[params.seriesIndex].pieData.value + 5
        );
        option.series[params.seriesIndex].pieStatus.hovered = isHovered;
        // 记录上次高亮的扇形对应的系列号 seriesIndex
        hoveredIndex = params.seriesIndex;
      }
      // 使用更新后的 option，渲染图表
      myChart.setOption(option);
    }
  });
  // 修正取消高亮失败的 bug
  myChart.on('globalout', function () {
    // 准备重新渲染扇形所需的参数
    let isSelected;
    let isHovered;
    let startRatio;
    let endRatio;
    let k;
    if (hoveredIndex !== '') {
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
      isSelected = option.series[hoveredIndex].pieStatus.selected;
      isHovered = false;
      k = option.series[hoveredIndex].pieStatus.k;
      startRatio = option.series[hoveredIndex].pieData.startRatio;
      endRatio = option.series[hoveredIndex].pieData.endRatio;
      // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
      option.series[hoveredIndex].parametricEquation = getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k,
        option.series[hoveredIndex].pieData.value
      );
      option.series[hoveredIndex].pieStatus.hovered = isHovered;
      // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
      hoveredIndex = '';
    }
    // 使用更新后的 option，渲染图表
    myChart.setOption(option);
  });
}

//获取3d丙图的最高扇区的高度
function getHeight3D(series, height) {
  series.sort((a, b) => {
    return b.pieData.value - a.pieData.value;
  });
  return (height * 25) / series[0].pieData.value;
}

// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
  // 计算
  let midRatio = (startRatio + endRatio) / 2;
  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;
  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3;
  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.05 : 1;
  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },
    x: function (u, v) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    y: function (u, v) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1;
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    },
  };
}

function fomatFloat(num, n) {
  var f = parseFloat(num);
  if (isNaN(f)) {
    return false;
  }
  f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // n 幂
  var s = f.toString();
  var rs = s.indexOf('.');
  //判定如果是整数，增加小数点再补0
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + n) {
    s += '0';
  }
  return s;
}
watch();
onMounted(() => {
  getList();
  getChartsData();
});
onUnmounted(() => {
  myChart && myChart.dispose();
});
</script>
<style lang="less" scoped>
.left2 {
  margin: 8px 0 0 0;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    padding: 0 0 8px 0;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
      .title-img {
        width: 16.97px;
        height: 16.97px;
        margin: 0 10px 0 0;
      }
      .text {
        font-family: PingFangSC-S0pxibold;
        font-weight: 600;
        font-size: 20px;
        color: #ffffff;
      }
    }
    .icon {
      width: 12px;
      height: 12px;
      background: rgba(255, 255, 255, 0.5);
    }
  }
  .info {
    margin: 16px 0 0 0;
    .sub-info {
      display: flex;
      justify-content: space-between;
      margin: 10px 0 0 0;
      .info-title {
        width: 48%;
      }
    }
    .charts {
      height: 140px;
    }
    .info-title {
      // width: 429px;
      height: 43px;
      // background-image: linear-gradient(90deg, rgba(108, 167, 255, 0.2) 0%, rgba(67, 102, 255, 0.3) 100%);
      background: url('@/assets/image/home-iten-bg.png');
      background-size: 100% 100%;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
      box-sizing: border-box;
      .name {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
      }
      .value-box {
        display: flex;
        align-items: center;
        .number {
          font-family: PingFangSC-S0pxibold;
          font-weight: 600;
          font-size: 24px;
          color: #ffffff;
          margin: 0 8px 0 0;
        }
        .unit {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
      }
    }
    .sub1 {
      margin: 0 0 0 0;
      .sub-title {
        display: flex;
        align-items: center;
        color: #fff;
        .text {
          margin: 0 0px 0 6px;
        }
      }
      .window-box {
        height: 90px;
        overflow: hidden;
      }
      .window {
        width: 428px;
        height: 60px;
        background: rgba(25, 116, 195, 0.1);
        border-radius: 8px;
        display: flex;
        align-items: center;
        padding: 0 0 0 16px;
        box-sizing: border-box;
        margin: 16px 0 0 0;

        img {
          width: 58px;
          height: 58px;
          border-radius: 4px;
          margin: 0 22px 0 0;
        }
        .text {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
      }
    }
    .dialog-content {
      img {
        max-width: 400px;
        max-height: 400px;
        width: auto;
        height: auto;
        object-fit: scale-down;
        float: left;
        margin-right: 20px;
        line-height: 1;
        vertical-align: top;
      }
    }
  }
}
</style>
