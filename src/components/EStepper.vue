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
        <div v-for="dialogue in section.content">
          <component
            :is="dialogue.component"
            v-if="dialogue.component"
            v-bind="$attrs"
            :ref="dialogue.name"
          ></component>
          <q-item-label> {{ dialogue.question }} </q-item-label>
          <QSelect
            v-model="dialogue.answer"
            :options="dialogue.options"
            v-if="dialogue.options"
            :ref="dialogue.name"
          >
      
            <template v-slot:option="scope">
              <q-item v-if="!scope.opt.group"
                v-bind="scope.itemProps"
              >              
                <q-item-section avatar>
                  <q-icon :name="scope.opt.icon" ></q-icon>
                </q-item-section>
                <q-item-section>
                  <q-item-label v-html="scope.opt.label" ></q-item-label>
                  <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-if="scope.opt.group"
                  v-bind="scope.itemProps"
              >
              <q-item-label header>{{ scope.opt.group }}</q-item-label>
              </q-item>
            </template>



            <template v-slot:after-options>
              <p v-if="dialogue.options.group"> Hey</p>
            </template>

          </QSelect>

          <template 
            v-else-if="dialogue.inputType">
            <QInput
              type="date"
              v-model="dialogue.answer"
              outlined
              :ref="dialogue.name"
              v-if="dialogue.inputType === 'schedule'"
              @update:model-value="schedule"
            ></QInput>
            <QInput
              :type="dialogue.inputType"
              v-model="dialogue.answer"
              outlined
              :ref="dialogue.name"
              v-else
            ></QInput>
          </template>
        </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
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
import { Repository, RestClient } from "@edifiles/services";
import { FormType } from "../utils/types";
import { config } from "../../public/config";

import { defineComponent } from "vue";
const repository = new Repository(config.api.Supabase);

export default defineComponent({
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
    dynamicComponent: {
      required: false,
      type: String,
    },
  },
  computed: {
    filledForm() {
      let form = {};

      Object.values(this.$refs).forEach((ref) => {
        Object.assign(form, {
          [ref]: ref,
        });
      });


      return;
    },
  },
  methods: {
    schedule(value: string) {
      //const client = new RestClient(config.api.Auth)
      //client.post('schedule', new Date(value))
      console.log("Schedule: ", value)
    },
    submit() {
      const { data, error } = this.form.actions.submit.event(...this.form.actions.submit.args);
      if (data) {
        this.form.actions.submit.onResult.forEach(func => {
          func()
        });
      }
    }
  },
});
</script>
