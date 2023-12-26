<template>
    <div class="q-pa-md">
      <div class="q-gutter-md">
        <q-carousel
          v-bind="slides"
          height="300px"
          class="bg-primary text-white shadow-1 rounded-borders"
        >
          <q-carousel-slide :name="key" class="column no-wrap flex-center"
          v-for="(data, key) in slides.content">
          <EPanel :data="data"></EPanel>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { Slides } from '../utils/DataTypes';
import { DataType } from "../utils/types";
import EPanel from "./EPanel.vue";

const props = defineProps({
    slides: {
        type: Object as ()=> Slides,
        required: true
    },
    data: {
      type: Object as ()=> DataType
    }
});
  </script>
  