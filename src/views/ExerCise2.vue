<template>
  <div class="echarts-container">
    <apiEcharts></apiEcharts>
  </div>
</template>

<script setup lang="ts">
import apiEcharts from "../components/Echarts/APIEcharts.vue";
</script>

<style lang="scss" scoped>
.echarts-container{
  width: 1000px;
  height: 400px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>