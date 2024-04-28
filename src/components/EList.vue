<template>
  <q-list v-if="show">
    <div class="row">
      <div class="col">
        <div class="row">
          <EDataItem :dataItem="data.items"></EDataItem>
        </div>
        <!--q-item-section v-for="(v, k) in data.meta" :key="k">
          {{ v }}
        </q-item-section>
        <q-item-section class="text-3">
          <q-item-label caption>
          {{ data.title }}
          </q-item-label>
        </q-item-section>-->
      </div>
    </div>
    <div class="q-gutter-xs">
      <EAction
        v-for="action in data.actions"
        actionName=""
        :action="action"></EAction>
    </div>
  </q-list>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { DataType } from "../utils/types";
import EDataItem from "./EDataItem.vue"
import EAction from "./EAction.vue";

export default defineComponent({
  name: "awlist",
  components: {
    EDataItem,
    EAction
  },
  data() {
    return {
      show: true
    }
  },
  props: {
    data: {
      required: true,
      type: Object as () => DataType,
    },
  },

  async beforeMount() { 
    if (this.data.viewGuard && typeof this.data.viewGuard.event === 'function') {
        this.show = await this.data.viewGuard.event(this.data.viewGuard.args)
      }
  },
});
</script>
