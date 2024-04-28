<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" 
    ref="stepper" 
    color="primary" animated>
      <q-step
        v-for="section in form.content"
        :name="1"
        :title="section.title"
        :icon="section.icon"
        :caption="section.description"
        :done="step > section.index"
      >
      <EForm :form="section"></EForm>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <EAction :action="action" v-for="(action, k) in form.content[step].actions" :key="k"></EAction>
          <q-btn
            @click="step === form.content.length ? submit() : $refs.stepper.next()"
            color="primary"
            :label="step === form.content.length ? 'Finish' : 'Continue'"
          />
          <q-btn
            v-if="step > 1"
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>
<script lang="ts">
import { Repository } from "@edifiles/services";
import { FormType } from "../utils/types";
import { config } from "../../public/config";
import EAction from "./EAction.vue";
import EForm from "./EForm.vue";

import { defineComponent } from "vue";
const repository = new Repository(config.api.Supabase);

export default defineComponent({
  component: {
    EAction,
    EForm
  },
  data() {
    return {
      step: 1,
      repository,
    };
  },
  /*setup () {
    return {
      step: ref(1)
    }
  },*/
  props: {
    form: {
      type: Object as () => FormType,
      required: true,
    },
  },
  methods: {
    schedule(value: string) {
      //const client = new RestClient(config.api.Auth)
      //client.post('schedule', new Date(value))
      console.log("Schedule: ", value)
    },
    submit() {
      const fo = this.form.content.map((data)=> {
        data.content?.map((dat)=> {
          return {
            [dat.name]: dat.answer
          }
        })
      })
      const { data, error } = this.form.actions.submit.event(...this.form.actions.submit.args);
      if (data && this.form.actions.submit.onResult) {
        this.form.actions.submit.onResult();
      }
    }
  },
});
</script>
