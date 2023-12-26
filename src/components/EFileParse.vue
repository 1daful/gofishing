<template>
    <input type="file" id="fileInput" style="display: none;" />
    <QBtn @click="selectFile()">Select File</QBtn>
</template>

<script setup lang="ts">
import * as Papa from "papaparse";
let selectedFile: Blob
let parsedData

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
        parsedData = results
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