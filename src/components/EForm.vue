<template>
  <div :id="form.id" v-if=show class="q-ma-md">
    <p>{{ form.title }}</p>
  <QSelect label="LABEL" @update:model-value="onOptionSelected" v-model="model.oty" :options="options"></QSelect>
  <div v-for="dialogue in form.content" class="q-gutter-md margin q-ma-md">
    <component
      :is="dialogue.component.content"
      v-if="dialogue.component"
      v-bind="dialogue.component.props"
      v-on="dialogue.component.events"
      :ref="dialogue.name"
    ></component>
    <QSelect
    :label="dialogue.question"
      @update:model-value="onOptionSelected"
      v-bind="dialogue.props"
      v-model="filledForm[dialogue.label]"
      :options="dialogue.options"
      v-if="dialogue.options"
      :ref="dialogue.name"
    >

      <template v-slot:option="scope">
            <q-item
            v-if="!scope.opt.children"
              clickable
              v-ripple
              v-close-popup
                @click="() => {
                filledForm[dialogue.name] = scope.opt.meta
                filledForm[dialogue.label] = scope.opt.label
                if(dialogue.events)
                dialogue.events.selected()
              }"
              :class="{ 'bg-light-blue-1': filledForm[dialogue.name] === scope.opt.label }"
            >
              <q-item-section>
                <q-item-label v-html="scope.opt.label" class="q-ml-md" ></q-item-label>
              </q-item-section>
              <!--q-item-section>
                <q-input class="q-ml-md" :type="scope.opt.inputType" v-model="scope.opt.label"></q-input>
              </q-item-section-->
            </q-item>
        <q-expansion-item v-else="scope.opt.children"
          expand-separator
          group="somegroup"
          :default-opened="hasChild(scope, dialogue.name)"
            header-class="text-weight-bold"
          :label="scope.opt.label"
        >
          <template v-for="child in scope.opt.children"
          :key="child.id">
            <q-item
              clickable
              v-ripple
              v-close-popup
              v-on="child.events"
              @click="() => {
                //filledForm[dialogue.name] = child.id || child.label
                filledForm[dialogue.name] = child.meta
                filledForm[dialogue.label] = child.label
              }"
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
        type="datetime-local"
        :label="dialogue.question"
        v-model="filledForm[dialogue.name]"
        outlined
        :ref="dialogue.name"
        v-if="dialogue.inputType === 'schedule'"
        v-on="dialogue.events"
        v-bind="dialogue.props"
        @update:model-value="handleInput(dialogue.inputType, filledForm[dialogue.name])"
      ></QInput>
      <QInput
        :label="dialogue.question"
        :type="dialogue.inputType"
        v-model="filledForm[dialogue.name]"
        v-on="dialogue.events"
        v-bind="dialogue.props"
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
  let view: View
  //let model = []
  
  export default defineComponent({
    data() {
      return {
        options: ['Aaaaaaaaaaaaa', 'Bbbbnnnnn'],
        model: {},
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
      onOptionSelected (value) {
      console.log('Selected option:', value)
      // Your custom logic here
    },
      getValue (scope: any) {
        return scope.label
      },
      showOpt (value: string) {
        console.log("OPTION ", value)
      },
      hasChild (scope: any, name: string) {
        console.log('SCOPE: ', scope.opt)
        //return scope.opt.children.some(c => c.label === this.filledForm[name])
      }
    },
    async onBeforeMount() {
      this.view =  new View({
        id: '',
        sections: this.form.sections,
        navType: "center",
        layout: "Grid",
        size: ""
      })
      if (this.form.viewGuard) {
        this.show = await viewGuard(this.form.viewGuard.userColval, this.form.viewGuard.colval, this.form.viewGuard.type)
      }
    }
  });
  </script>