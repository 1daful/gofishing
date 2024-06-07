<template>
  <div :id="form.id" v-if=show class="q-ma-md">
    <p>{{ form.title }}</p>
  <div v-for="dialogue in form.content" class="q-gutter-md margin q-ma-md">
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
        <q-expansion-item
          expand-separator
          group="somegroup"
          :default-opened="hasChild(scope, dialogue.name)"
            header-class="text-weight-bold"
          :label="scope.opt.label"
        >
            <q-item
            v-if="!scope.opt.children"
              clickable
              v-ripple
              v-close-popup
              @click="filledForm[dialogue.name] = scope.opt.id || scope.opt.label"
              :class="{ 'bg-light-blue-1': filledForm[dialogue.name] === scope.opt.label }"
            >
              <q-item-section>
                <q-item-label v-html="scope.opt.label" class="q-ml-md" ></q-item-label>
              </q-item-section>
              <q-item-section>
                <q-input class="q-ml-md" :type="scope.opt.inputType" v-model="scope.opt.answer"></q-input>
              </q-item-section>
            </q-item>
          <template v-for="child in scope.opt.children"
          :key="child.id">
            <q-item
              clickable
              v-ripple
              v-close-popup
              @click="filledForm[dialogue.name] = child.id || child.label"
              :class="{ 'bg-light-blue-1': filledForm[dialogue.name] === child.label }"
            >
              <q-item-section>
                <q-item-label v-html="child.label" class="q-ml-md" ></q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-expansion-item>
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
        @update:model-value="handleInput(dialogue.inputType, filledForm[dialogue.name])"
      ></QInput>
      <QInput
        :label="dialogue.question"
        :type="dialogue.inputType"
        v-model="filledForm[dialogue.name]"
        @update:model-value="handleInput(dialogue.inputType, filledForm[dialogue.name])"
        outlined
        :ref="dialogue.name"
        v-else
      ></QInput>
    </template>
  </div>
  <EView :view="view"></EView>
  <template v-for="(action, key) in form.actions" :key="key">
    <EAction :action=action :args="filledForm"></EAction>
  </template>
  </div>
</template>

  <script lang="ts">
  import { InputType, QuestionType, View } from "../utils/types";
  import { defineComponent } from "vue";
  import EAction from "./EAction.vue";
  import EView from "./EView.vue";
import { viewGuard } from "../utils/AuthGuard";
  
  let filledForm: Record<string, any> = {}
  let show: boolean = true
  let view
  
  export default defineComponent({
    data() {
      return {
        view,
        filledForm,
        show
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
      schedule(type: InputType, value: string) {
        //const client = new RestClient(config.api.Auth)
        //client.post('schedule', new Date(value))
        //console.log("Schedule: ", value)
        //useData().set(type, value)
      },
      handleInput(type: InputType, value: string) {
        //useData().set(type, value)
      console.log('FILLED_FORM', this.filledForm)
      },
      getValue (scope: any) {
        return scope.label
      },
      hasChild (scope: any, name: string) {
        return scope.opt.children.some(c => c.label === this.filledForm[name])
      }
    },
    async onBeforeMount() {
      this.view =  new View({
        id: '',
        sections: this.form.sections
      }),
      if (this.form.viewGuard) {
        this.show = await viewGuard(this.form.viewGuard.userColval, this.form.viewGuard.colval, this.form.viewGuard.type)
      }
    }
  });
  </script>