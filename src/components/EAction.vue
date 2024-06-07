<template>
  <QBtn :id="action.id" :label="action.label" @click="event()" :[type]="true" :[shape]="true" 
  dense :icon="action.icon" 
  :size="action.style?.size" 
  class="q-mr-sm" :class="action.class" v-if="event && show" 
  color="primary"
  :aria-label="action.style?.ariaLabel"
  :loading="loading"
  :disable="loading"></QBtn>
  <QBtn :id="action.id" :label="action.label" :icon="action.icon" v-else-if="component && show">
    <QPopupProxy cover>
      <EView :view="component" v-bind="$attrs"></EView>
      <!--<component :is="g" v-bind="$attrs" v-else></component>-->
      <!--<AwDialog v-bind="$attrs" ref="gh"></AwDialog>-->
    </QPopupProxy>
  </QBtn>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, onMounted, ref } from "vue";
import { Action, View } from "../utils/types";
import { useRouter } from "vue-router";
import EView from "./EView.vue";
import { viewGuard } from "../utils/AuthGuard";

const props = defineProps({
  actionName: {
    type: String,
  },
  action: {
    type: Object as () => Action,
    required: true
  },
  args: {
  }
});

const type = props.action?.style?.type || 'unelevated'
const shape = props.action?.style?.shape || 'none'

//const act = props.action

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
let show = ref(false)
let loading = ref(false)
//let show = true
onBeforeMount(() => {
  if (props.action) {
    
    //if (show)
    switch (props.action.event) {
      case 'Route':
        event = () => {
          router.push(props.action.args || props.args)
        }
        break;
      case 'Modal':
        component = props.action.args || props.args
        break;
      case 'Filter':
        component = props.action.args || props.args
        break;
    
      default:
        break;
    }
    if (typeof props.action.event === 'function') {
      event = () => {
        loading.value = true
        //const { data, error } = props.action.event(props.action.args || props.args);
        try {
          props.action.event(props.action.args || props.args);
        loading.value =false
          if (/*data &&*/ props.action.onResult) {
            if(props.action.onResult.redirect) {
              router.push(props.action.onResult.redirect)
            }
            else if(props.action.onResult.function) {
              props.action.onResult.function(props.action.onResult.args)
            }
          }
        }
        catch {
          if(props.action.onError?.function)
            props.action.onError.function(props.action.onError.args)
        }
      }
    }
  }
});
onMounted(async () => {
    /**if (typeof props.action.viewGuard === 'object') {
      show.value = await viewGuard(props.action.viewGuard)
    }
     if (props.action.viewGuard === true) {
      show.value = await viewGuard()
    }
    else if (props.action.viewGuard === false) {
      const guard = await viewGuard()
      if(guard) show.value = false
    }**/
  if (props.action.viewGuard !== undefined) {
    show.value = await viewGuard(props.action.viewGuard)
  }
  else show.value = true
})
</script>
