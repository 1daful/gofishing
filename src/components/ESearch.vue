<template>
  <q-input
    rounded
    @keyup.enter="doSearch"
    @keydown="changed"
    color="black"
    dense
    outlined
    class="q-ml-md"
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
  <!--<VueInfiniteComplete
    dataSource="options"
    :value="value"
    @select="$emit(select)"
  ></VueInfiniteComplete>-->
  <q-card class="bg-blue fixed margin z-top" v-if="search">
    <div class="row">
      <div class="col-3" v-for="mediaItem in mediaItems" :key="mediaItem.index">
        <h5>{{ mediaItem.index }}</h5>
        <div v-if="mediaItem">
          <q-item v-for="item in mediaItem.items" :key="item.id">
            <q-item-section><q-img :src="item.img"></q-img></q-item-section>
            <q-item-section> {{ item.meta.title }} </q-item-section>
          </q-item>
        </div>
      </div>
    </div>
    <!--<q-item>
              <q-item-section v-for="mediaItem in mediaItems" :key="mediaItem.name">
                <q-item-label class="text-h5"> {{mediaItem.name}} </q-item-label>
              </q-item-section>
              </q-item>-->
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Search } from "@edifiles/services";
import { mediaItems } from "../../config/model";

export default defineComponent({
  data() {
    return {
      value: "",
      options: [],
      select: "onSelect",
      search: "",
      suggestions: [],
      suggestionAttribute: {},
      mediaItems,
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
        this.mediaItems.forEach(async (item, i) => {
          let p = await search.search(item.index, String(this.search));
          item.items = p.hits;
          //this.suggestions[i] = p.hits;
        });
      }, 350);
    },
  },
});
</script>
