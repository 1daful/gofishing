<template>
    <QTable 
      title="Treats"
      :rows="data.rows"
      :columns="data.columns"
      ></QTable>
</template>

<script setup lang="ts">
import { DataTable } from "../utils/types";
defineProps({
    data: {
        type: Object as ()=> DataTable,
        required: true
    }
})
</script>