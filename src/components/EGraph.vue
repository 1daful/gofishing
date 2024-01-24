<template>
    <div id="chart"></div>
</template>
<script setup lang="ts">
import ApexCharts from "apexcharts";
import { DataGraph } from "../utils/types";
const props = defineProps({
  graphData: {
    type: Object as () => DataGraph,
    required: true
  }
})
const options = {
  chart: {
    type: props.graphData.chartType
  },
  series: [{
    name: 'Data',
    data: props.graphData.data,
    markers: {
      size: 4, // Enable markers and set their size
      fillColors: '#fff', // Set marker fill color to white
      strokeColors: '#000', // Set marker stroke color to black
      strokeWidth: 2 // Set marker stroke width to 2px
    }
  }],
  xaxis: {
      type: props.graphData.xaxisType
  }
};

var chart = new ApexCharts(document.querySelector('#chart'), options);

chart.render();
</script>