<template>
    <div class="q-pa-md">
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        animated
      >
        <q-step
          :name="1"
          title="Select campaign settings"
          icon="settings"
          :done="step > 1"
        v-for="section in form.content"
        >
          For each ad campaign that you create, you can control how much you're willing to
          spend on clicks and conversions, which networks and geographical locations you want
          your ads to show on, and more.
        </q-step>
  
        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 4 ? 'Finish' : 'Continue'" />
            <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue'
import { FormType } from '../utils/types';
  
  export default {
  props: {
    form: {
      type: Object as () => FormType,
      required: true,
    },
    dynamicComponent: {
      required: false,
      type: String,
    },
  },
    setup (props) {
      return {
        step: ref(1)
      }
    }
  }
  </script>
  