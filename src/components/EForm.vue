<template>
  <div v-for="dialogue in form.content">
    <component
      :is="dialogue.component"
      v-if="dialogue.component"
      v-bind="$attrs"
      :ref="dialogue.name"
    ></component>
    <QSelect
    :label="dialogue.question"
      v-model="filledForm[dialogue.name]"
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

    </QSelect>

    <template 
      v-else-if="dialogue.inputType">
      <QInput
        :label="dialogue.question"
        type="date"
        v-model="filledForm[dialogue.name]"
        outlined
        :ref="dialogue.name"
        v-if="dialogue.inputType === 'schedule'"
        @update:model-value="schedule"
      ></QInput>
      <QInput
        :label="dialogue.question"
        :type="dialogue.inputType"
        v-model="filledForm[dialogue.name]"
        outlined
        :ref="dialogue.name"
        v-else
      ></QInput>
    </template>
  </div>
  <template v-for="(action, key) in form.actions">
    <EAction :action="submit" v-if="key === 'submit'"></EAction>
  </template>
  </template>

  <script lang="ts">
  import { Action, QuestionType } from "../utils/types";
  import { defineComponent } from "vue";
  import EAction from "./EAction.vue";
  
  let filledForm: Record<string, any> = {}
  
  export default defineComponent({
    data() {
      return {
        filledForm,
      };
    },
    computed: {
      submit() {
        if(this.form.compute) {
          this.form.compute(this.filledForm)
        }
        return this.form.actions.submit
      }
    },
    /*setup () {
      return {
        step: ref(1)
      }
    },*/
    components: {
      EAction
    },
    props: {
      form: {
        type: Object as () => QuestionType,
        required: true,
      }
    },
    methods: {
      schedule(value: string) {
        //const client = new RestClient(config.api.Auth)
        //client.post('schedule', new Date(value))
        console.log("Schedule: ", value)
      },
    },
    onBeforeMount() {
    }
  });
  </script>