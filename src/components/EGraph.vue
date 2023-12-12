<template>
    <div id="chart"></div>
</template>
<script setup lang="ts">
import ApexCharts from "apexcharts";
import { DataPoint } from "../utils/DataTypes";
const props = defineProps({
    chartType: {
        type: String
    },
    series: {
      type: Array
    },
    data: {
        type: Array as () => DataPoint[],
    },
    xaxisType: {
        type: String as () => 'category' | 'number',
        required: true
    },
    options: {
        type: Object
    }
})
const options = {
    chart: {
      type: props.chartType
    },
    series: [{
      name: 'Data',
      data: props.data,
      markers: {
        size: 4, // Enable markers and set their size
        fillColors: '#fff', // Set marker fill color to white
        strokeColors: '#000', // Set marker stroke color to black
        strokeWidth: 2 // Set marker stroke width to 2px
      }
    }],
    xaxis: {
        type: props.xaxisType
    }
  };
  
  var chart = new ApexCharts(document.querySelector('#chart'), options);
  
  chart.render();
  

var chart = new ApexCharts(document.querySelector('#chart'), options);

chart.render();
</script>