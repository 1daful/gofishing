<template>
  <QCard :class="data.class" :id="data.id" v-if="show">
    <QImg v-if="data.overlay" :src="data.overlay" style="max-width: 30em; max-height: 50em">
      <div class="row">
        <EList :data="data"></EList>
      </div>
    </QImg>
    <template v-else>
      <QCardSection>
          <div class="row">
            <EDataItem v-for="item in data" :dataItem="item"></EDataItem>
          </div>
        <QCardActions>
          <EAction :action="action" v-for="action in data.actions"></EAction>
        </QCardActions>
      </QCardSection>
    </template>
  </QCard>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { DataType } from "../utils/types";
import EList from "../components/EList.vue";
import EAction from "../components/EAction.vue";
import EDataItem from "../components/EDataItem.vue";

export default defineComponent({
  name: "AwPanel",
  components: {
    EList,
    EAction,
    EDataItem
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
    /*if (this.data.setHeader) {
      Object.keys(this.data.meta).forEach((key) => {
        const item = {
          label: "",
        };
        item.label = key;
        this.data.header = [];
        this.data.header?.push(item);
        console.log("Header ", this.data.header);
      });
    }*/
  },
});
</script>
