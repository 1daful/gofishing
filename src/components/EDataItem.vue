<template>
      <!--div class="text-h6">{{ header.title }}</div>-->
      <template v-for="(v, k) in dataItem">
        <template v-for="dataContent in v">
            <div class="col-lg q-pa-xs">
                <QAvatar :icon="dataContent.icon" v-if="dataContent.icon"></QAvatar>
                <QAvatar v-if="dataContent.avatar">
                    <QImg :src="dataContent.avatar"></QImg>
                </QAvatar>
                <QImg style="height: 12em; min-width: 60px" :src="dataContent.thumbnail" v-if="dataContent.thumbnail">
                    <template v-slot:error>
                        <div class="absolute-full flex flex-center bg-negative text-white">
                        <q-icon name="error" /> Cannot load image
                        </div>
                    </template>
                </QImg>
            </div>
            <div class="col-lg q-pa-xs" v-if="dataContent.label">
                <QItemLabel> {{ dataContent.label }} </QItemLabel>
            </div>
            <div class="col-lg q-pa-xs" v-if="dataContent.action">
                <EAction :action="dataContent.action"></EAction>
            </div>
        </template>
      </template>
      <!--div>
        {{ header.description }}
      </div>-->
</template>

<script setup lang="ts">
import { DataItem } from '../utils/types';
import EAction from "./EAction.vue";

defineProps({
    dataItem: {
        type: Object as () => DataItem,
        required: true
    }
})
</script>