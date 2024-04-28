<template>
  <EFilter :data=filter>
  </EFilter>
  <input type="file" id="fileInput" style="display: none;" />
  <QBtn @click="selectFile()">Select File</QBtn>
</template>

<script setup lang="ts">
import * as Papa from "papaparse";
import { useUser } from "../utils/useUser";
import { Store } from "pinia";
import EFilter from "../components/EFilters.vue";
import { Action, Filters } from "../utils/types";
import { Ref, ref } from "vue";
import { FilterCheck } from "@edifiles/services";
import ECheck from "../components/ECheck.vue";
import { useRoute } from "vue-router";
import { required } from "@vuelidate/validators";

const props = defineProps({
  args: {
    type: Array
  },
  actions: {
    type: Array as ()=> Action[],
    required: true
  }
})

let us: Store = useUser()
let parsedData
let checks: FilterCheck[]
let filter: Ref<Filters> = ref({
  sections: [],
  layout: "Grid",
  id: '',
  size: '',
  indexName: '',
  actions: props.actions,
  checks: [
    {
      attribute: 'Select users',
      id: 'user',
      values: [
        'hello', 'world'
      ],
      model: []
    }
  ]
})
let model = ref({})
let selectedFile: Blob

function selectFile() {
  const fileInput = document.getElementById('fileInput');
  
  // Trigger a click event on the file input
  fileInput?.click();
  
  // Listen for changes in the file input value (when a file is selected)
  fileInput?.addEventListener('change', handleSingleFile);
}

function handleSingleFile(event: { target: { files: any[]; removeEventListener: (arg0: string, arg1: (event: any) => void) => void; }; }) {
  selectedFile = event.target.files[0];
  if (selectedFile) {
    Papa.parse(selectedFile, {
      header: true,
      dynamicTyping: true,
      complete: function (results: { data: any; }) {
        parsedData = results.data
        filter.value.checks[0].values = parsedData
        console.log('PROPS ', props)
        useUser().insert(parsedData)
      },
      error: function (error: any) {
        console.error('Error occurred while parsing: ', error);
      }
    });
  } else {
    console.error('No file selected');
  }
  
  // Remove the event listener to avoid multiple file selections
  event.target.removeEventListener('change', handleSingleFile);
}

function handleMultiFileSelection(event: { target: { files: any[]; }; }) {
  selectedFile = event.target.files[0];
}

</script>