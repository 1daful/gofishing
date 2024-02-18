<template>
  <q-input
    @keyup.enter="doSearch"
    @keydown="changed"
    color="black"
    dense
    outlined
    class="q-ml-md search-input"
    type="search"
    standout
    v-model="search"
    v-bind="$attrs"
  >
    <template v-slot:append>
      <q-icon
        v-if="search"
        name="clear"
        class="cursor-pointer"
        @click="search = ''"
      ></q-icon>
      <q-icon
        color="primary"
        size="lg"
        name="search"
        class="cursor-pointer"
        @click="doSearch"
      ></q-icon>
    </template>
  </q-input>
  <EView :view="dataView"></EView>
  <!--<VueInfiniteComplete
    dataSource="options"
    :value="value"
    @select="$emit(select)"
  ></VueInfiniteComplete>-->
  <!--q-card class="bg-blue fixed margin z-top" v-if="search">
    <div class="row">
      <div class="col-3" v-for="item in searchItems" :key="item">
        <h5>{{ item }}</h5>
        <div v-if="item">
          <q-item v-for="item in searchItems.items" :key="item.id">
            <q-item-section><q-img :src="item."></q-img></q-item-section>
            <q-item-section> {{ item.meta.title }} </q-item-section>
          </q-item>
        </div>
      </div>
    </div>
    <q-item>
      <q-item-section v-for="mediaItem in searchItems" :key="mediaItem.name">
        <q-item-label class="text-h5"> {{mediaItem.name}} </q-item-label>
      </q-item-section>
    </q-item>
  </q-card-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Search } from "@edifiles/services";
import { models } from "../../config/model";
import { View } from "../utils/types";

let dataView: View
export default defineComponent({
  data() {
    return {
      value: "",
      options: [],
      select: "onSelect",
      search: "",
      suggestions: [],
      suggestionAttribute: {},
      models,
      dataView
    };
  },
  components: {
    //VueInfiniteComplete,
  },
  methods: {
    doSearch() {
      this.$router.push({
        name: "Search",
        query: { keyword: this.search },
      });
    },
    changed(e: KeyboardEvent) {
      this.debounce(e);
    },
    debounce(e: KeyboardEvent) {
      let debounce;
      // get keycode of current keypress event
      var code = e.key;

      // do nothing if it's an arrow key or enter
      if (
        code == "ArrowUp" ||
        code == "ArrowDown" ||
        code == "ArrowRight" ||
        code == "ArrowLeft" ||
        code == "Enter"
      ) {
        return;
      }

      // do normal behavior for any other key
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const search = new Search();
        this.models.forEach(async (item, i) => {
          const p = await search.search(item.name, String(this.search));
          const view: View = {
            sections: [item.val.listDataItems(p.hits).sections],
            heading: item.name,
            id: "",
            layout: "Grid",
            size: "",
            navType: "top"
          }
          this.dataView.sections.push(view)
          //item.items = p.hits;
          //this.suggestions[i] = p.hits;
        });
      }, 350);
    },
  },
});
</script>

<style scoped>
</style>
