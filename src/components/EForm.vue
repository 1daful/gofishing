<template>
    <div class="q-pa-md">
      <div class="q-gutter-y-md column" style="max-width: 300px">
        <q-input :label="input.name" rounded filled v-model="input.answer" v-for="input in form.content">
          <template v-slot:prepend>
            <q-icon :name="input.icon" />
            <q-avatar>
              <img :src="input.image">
            </q-avatar>
          </template>
        </q-input>
  
        <q-input rounded outlined v-model="input.answer" v-for="input in form.content">
          <template v-slot:append>
            <q-icon :name="input.icon" />
            <q-avatar>
              <img :src="input.image">
            </q-avatar>
          </template>
        </q-input>

        <div v-for="input in form.content">
          <component
            :is="input.component"
            v-if="input.component"
            v-bind="$attrs"
            :ref="input.name"
          ></component>

          <QImg
            v-if="input.image"
            :src="input.image"
          ></QImg>

          <QSelect
            v-model="input.answer"
            :options="input.options"
            v-if="input.options"
            :ref="input.name"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-icon :name="scope.opt.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label> {{ scope.opt.label }} </q-item-label>
                  <q-item-label caption> {{ scope.opt.description }} </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </QSelect>

          <QInput
            v-else
            :label="input.question"
            :type="input.inputType"
            v-model="input.answer"
            outlined
            :ref="input.name"
          >
          <template v-slot:prepend>
            <q-icon :name="input.icon" />
            <q-avatar>
              <img :src="input.image">
            </q-avatar>
          </template>
          
        </QInput>
        </div>
      </div>
    </div>
  </template>

  <script lang="ts">
  import { QuestionType } from "../utils/types";
  import { defineComponent } from "vue";
  
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
        type: Object as () => QuestionType,
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
        this.$refs.forEach((element: any) => {
          Object.assign(form, {
            [element]: element,
          });
        });
        return;
      },
    },
    methods: {
      submit() {
        this.form.submit.event(...this.form.submit.args);
        
      }
    },
  });
  </script>
  