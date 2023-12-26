<template>
  <!--QBtn :label="action.label" @click="event()" :[type]="true" :[shape]="true" 
  dense :icon="action.icon" 
  :size="action.style?.size" 
  class="q-mr-sm" v-if="event" 
  color="primary"
  :aria-label="action.style?.ariaLabel"></QBtn-->

  <QBtn v-if="event" :label="action.label" @click="event()"></QBtn>
  <QBtn :label="action.label" v-else-if="component">
    <QPopupProxy cover>
      <EView :view="component" v-bind="$attrs"></EView>
      <!--<component :is="g" v-bind="$attrs" v-else></component>-->
      <!--<AwDialog v-bind="$attrs" ref="gh"></AwDialog>-->
    </QPopupProxy>
  </QBtn>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref } from "vue";
import { Action, VComponent, View } from "../utils/types";
import { useRouter } from "vue-router";
import EView from "./EView.vue";

const props = defineProps({
  actionName: {
    type: String,
  },
  action: {
    type: Object as () => Action,
    required: true
  }
});

const type = props.action?.style?.type || 'unelevated'
const shape = props.action?.style?.shape || 'none'

let component: View
let event: Function

const AwDialog = defineAsyncComponent(
  () =>
    import(
      "../components/" +
        "Aw" +
        props.actionName?.charAt(0).toUpperCase() +
        props.actionName?.slice(1) +
        ".vue"
    )
);


/*const defaultComponent = () => {
  let components;
  if (props.actionName) {
    switch (props.actionName) {
      case "filter":
        components = AwFilters;
        break;
      case "filters":
        break;
      default:
        break;
    }
  }
  return components;
};*/
const router = useRouter()
onBeforeMount(() => {
  if (props.action) {
    switch (props.action.event) {
      case 'Route':
        event = () => {
          router.push(props.action?.args)
        }
        break;
      case 'Modal':
        component = props.action.args
        break;
    
      default:
        break;
    }
    if (typeof props.action.event === 'function') {
      event = () => {
       props.action.event(props.action.args);
      }
    }
  }
});
</script>
