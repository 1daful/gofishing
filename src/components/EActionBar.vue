<template class="bg-primary text-white row justify-end">
    <!--q-btn v-for="action in actions.actions" :key="action.label" :[type]="true" :[shape]="actions.style" dense :icon="action.icon" class="q-mr-sm" :label="action.label" @click="action.event" /-->
    <EAction :action="action" v-for="action in actions.actions" :key="action.label"></EAction>
  </template>
<script setup lang="ts">
import { ActionGroup } from "../utils/types";
import EAction from "./EAction.vue";

const props = defineProps({
    actions: {
        required: true,
        type:  Object as () => ActionGroup
    }
})

const type = props.actions.style?.type || 'flat'
const shape = props.actions.style?.shape || 'none'
</script>