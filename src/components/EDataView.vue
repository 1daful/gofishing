<template>
  <div v-if="data" class="q-ma-sm">
    <EPanel :data="data" v-if="data.card"></EPanel>
    <EList :data="data" v-else></EList>
  </div>
  <EStepper :form="formsStepper" v-if="formsStepper"></EStepper>
  <EForm :form="form"></EForm>
  <ESlides :slides="slides" v-if="slides"></ESlides>
</template>

<script lang="ts" setup>
import { DataType, LayoutType, FormType, QuestionType } from "../utils/types";
import EList from "./EList.vue";
import EPanel from "./EPanel.vue";
import EStepper from "./EStepper.vue";
import ESlides from "./ECarousel.vue";
import { Slides } from "../utils/DataTypes";
defineProps({
  data: {
    type: Object as () => DataType,
  },
  form: {
    type: Object as () => QuestionType,
  },
  formsStepper: {
    type: Object as () => FormType,
  },
  slides: {
    type: Object as ()=> Slides
  }
});
</script>
