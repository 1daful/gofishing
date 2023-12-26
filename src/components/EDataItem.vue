<template>
      <!--div class="text-h6">{{ header.title }}</div>-->
      <template v-for="dataContent in dataItem">
        <template v-for="(v, k) in dataContent">
            <div class="col-lg q-pa-xs">
                <QAvatar :icon="v.icon" v-if="v?.icon"></QAvatar>
                <QAvatar v-if="v?.avatar">
                    <QImg :src="v.avatar"></QImg>
                </QAvatar>
                <QImg style="height: 12em; min-width: 60px" :src="v.thumbnail" v-if="v?.thumbnail">
                    <template v-slot:error>
                        <div class="absolute-full flex flex-center bg-negative text-white">
                        <q-icon name="error" /> Cannot load image
                        </div>
                    </template>
                </QImg>
            </div>
            <div class="col-lg q-pa-xs" v-if="v?.label">
                <QItemLabel> {{ v.label }} </QItemLabel>
            </div>
            <div class="col-lg q-pa-xs" v-if="v?.action">
                <EAction :action-name="v.action.event" :action="v.action"></EAction>
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
import { useRouter } from "vue-router";
const router = useRouter()
defineProps({
    dataItem: {
        type: Object as () => DataItem,
        required: true
    }
})
</script>