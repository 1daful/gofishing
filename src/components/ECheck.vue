<template>
    <QCard>
      <QCardSection>
    <div>
        {{ check.attribute }}
        <QItemLabel>
          {{ Object.keys(check.values[0]).join(' ') }}
        </QItemLabel>
        <QCheckbox v-for="(ch, i) in check.values"
        @update:model-value="emit"
          :label="Object.values(ch).join(' ')"
          :checked-icon="ch.iChecked"
          :indeterminate-icon="ch.iUndetermined"
          :unchecked-icon="ch.iUnchecked"
          :val="Object.values(ch).join(' ')"
          v-model="model"
          :key="i"
        ></QCheckbox>
    </div>
    </QCardSection>
    <QCardActions>
      <EAction :action="act" :args="check"></EAction>
    </QCardActions>
  </QCard>
</template>
<script setup lang="ts">
import { Action, Filters } from "../utils/types";
import { Filter, FilterCheck, FilterRange } from '@edifiles/services';
import { Ref, onMounted, ref, defineEmits } from "vue";
import EAction from "./EAction.vue";

let model = ref({});
const emitt =() => {
  emit('checkModel', model)
}
//let select: string[];
const props = defineProps({
  check: {
    type: Object as () => FilterCheck,
    required: true,
  },

  /*action: {
    type: Object as () => Action,
    required: true
  },*/

  /*keyword: {
    type: String,
    required: true,
  },*/
});

let select = ref('')
const act = new Action({
  label: 'ACT',
  event: (model)=> {
    console.log('ACT ', model)
    emit('checkModel', model)
  }
})
const emit = defineEmits(['checkModel']);
const filt = ref(props.check);

let cModel = ref([])

const filterCheck = () => {
  let filters: FilterCheck[] = [];
  if (props.data.checks)
  props.data.checks.forEach((check) => {
    let filter: FilterCheck = {
      attribute: check.attribute,
      values: model[check.attribute].value,
    };
    filters.push(filter);
  });
  console.log('Model ', model.value)
  return filters;
};

onMounted(() => {
  /*if (props.action) {
    defaultAction = props.action;
  }*/
  //window.dispatchEvent(defaultAction.event);
});
/*onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});*/
</script>