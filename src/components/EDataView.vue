<template>
  <div v-if="sData" class="q-ma-sm">
    <EPanel :data="sData" v-if="sData.card"></EPanel>
    <EList :data="sData" v-else></EList>
  </div>
  <EStepper :form="formsStepper" v-if="formsStepper"></EStepper>
  <EForm :form="sForm" v-if="sForm"></EForm>
  <ESlides :slides="slides" v-if="slides"></ESlides>
</template>

<script lang="ts" setup>
import { DataType, FormType, QuestionType } from "../utils/types";
import EList from "./EList.vue";
import EPanel from "./EPanel.vue";
import EStepper from "./EStepper.vue";
import ESlides from "./ECarousel.vue";
import EForm from "./EForm.vue";
import { Slides } from "../utils/DataTypes";
import { shallowRef } from "vue";
const props = defineProps({
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

const sForm = shallowRef(props.form)
const sFormsSteppers = shallowRef(props.formsStepper)
const sSlides = shallowRef(props.slides)
const sData = shallowRef(props.data)

</script>
