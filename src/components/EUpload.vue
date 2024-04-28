<template>
    <QCard>
        <QCardSection>
            <QUploader :multiple="props.settings.multiple" :url="url" 
            :label="props.settings.label" 
            :batch="props.settings.batch" :filter="props.settings.filter" 
            :factory="props.settings.factory"
            method="PUT"></QUploader>
        </QCardSection>
    </QCard>
</template>

<script setup lang="ts">
import { EdiStorage, RestClient } from '@edifiles/services';
import { onMounted } from 'vue';
import { ref } from 'vue';

const props = defineProps({
    storageProvider: {
        type: String,
        default: "youtube"
    },
    settings: {
        type: Object,
        default: {
            filter: '',
            batch: true,
            multiple: true,
            label: "Click or drag files here",
            factory: undefined
        }
    }
})

let url = ref('')
let input = ref('')
let headers = ref([{}])

let store: RestClient | EdiStorage

onMounted(async ()=> {
    switch (props.storageProvider) {
        case 'youtube':
            async function postDta( 
            data = {
                "snippet": {
                    "title": "My video title",
                    "description": "This is a description of my video",
                    "tags": ["cool", "video", "more keywords"],
                    "categoryId": 22
                },
                "status": {
                    "privacyStatus": "public",
                    "embeddable": 'True',
                    "license": "youtube"
                }
            }) {
                    // Default options are marked with *
                    const response = await fetch('/upload/youtube/v3/videos?uploadType=resumable&part=parts', {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                        credentials: "same-origin", // include, *same-origin, omit
                        headers: {
                            host: 'www.googleapis.com',
                            authorization: 'bearer auth_token',
                            'Content-Length': '278',
                            'Content-Type': 'application/json; charset=utf-8',
                            'X-Upload-Content-Length': '3000000',
                            'X-Upload-Content-Type': 'video/*'
                        },
                        body: JSON.stringify(data), // body data type must match "Content-Type" header
                    });
                    const res: {
                        'Location': string
                        'Content-Length': number
                    } =  await response.json();
                    url.value = res.Location
                        headers.value = [{
                            name: 'authorization',
                            value: 'bearer auth_token'
                        },
                        {
                            name: 'Content-Length',
                            value: '278'
                        },
                        {
                            name: 'Content-Type',
                            value: 'application/json; charset=utf-8'
                        }
                    ]
        }

        
        break;
        case 'storage':
            store = new EdiStorage()
            break;
    
        default:
            break;
        }
})
</script>