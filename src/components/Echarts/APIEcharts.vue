<template>
  <div class="container">
    <div class="echarts" id="charts1" ref="chart1"></div>
    <div class="echarts" id="charts2" ref="chart2"></div>
    <button @click="reflashEcharts">callAPI</button>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import { reqData } from "./API/api";
const chart1 = ref(null);
const chart2 = ref(null);
let myChart1: echarts.ECharts | null = null;
let myChart2: echarts.ECharts | null = null;
onMounted(() => {
  myChart1 = echarts.init(chart1.value);
  myChart2 = echarts.init(chart2.value);
  createEcharts("掛載callAPI", myChart1, false)
  createEcharts("按鈕callAPI", myChart2, false)
});
async function createEcharts(charName: string, myChart: any, isInit: boolean) {
  if (charName === "掛載callAPI" && !isInit) {
    myChart.showLoading()
    const dataArray: { name: string; number: number }[] = await callAPI();
    myChart.hideLoading();
    myChart.setOption({
      title: {
        text: charName
      },
      tooltip: {},
      legend: {},
      xAxis: {
        data: dataArray.map(item => item.name)
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: dataArray.map(item => item.number)
        }
      ]
    })
  } else if (charName === "按鈕callAPI" && !isInit) {
    myChart.setOption({
      title: {
        text: charName
      },
      tooltip: {},
      legend: {},
      xAxis: {
        data: ["c", "a", "l", "l", "A", "P", "I"]
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: []
        }
      ]
    })
  } else {
    myChart.showLoading()
    const dataArray: { name: string; number: number }[] = await callAPI();
    myChart.hideLoading();
    myChart.setOption({
      xAxis: {
        data: dataArray.map(item => item.name)
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: dataArray.map(item => item.number)
        }
      ]
    })
  }
  if (!isInit) {
    window.addEventListener(
      "resize",
      () => {
        myChart.resize();
      },
      false
    );
  }
}

async function callAPI() {
  try {
    const response: any = await reqData();
    return response.record[0].data

  } catch (error) {
    console.error(error);
  }
}
function reflashEcharts() {
  createEcharts("按鈕callAPI", myChart2, true)
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 100px;
}

#charts1,
#charts2 {
  width: 400px;
  height: 400px;
}



button {
  height: 50px;
  width: 100px;
  cursor: pointer;
  border: transparent;
  border-radius: 20px;
  color: #fff;
  background-color: #007cff;
}
</style>