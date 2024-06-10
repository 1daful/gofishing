<template>
  <!--<QLayout>
    <AwNavContainer routeName="Home" :routeParams="params" ref="bay"></AwNavContainer>
    <AwFilters :data="filterData" :query="query"></AwFilters>
    <EDataView :data="data" layout="Grid"></EDataView>
    <div ref="mef">
      <QBtn to="signin"> Sign in</QBtn>
    </div>
    <AwHorizontal :dataList="[data, data, data, data]" layout="Grid"></AwHorizontal>
  </QLayout>-->
  <EView :view="view"></EView>
  
</template>

<script setup lang="ts">
import { onBeforeMount, shallowRef } from "vue";
import EView from "../components/EView.vue";
import { DataType, Filters, View, NavList } from "../utils/types";
import { GlobalView } from "../../config/edifiles.config";
/*import { mount } from "mount-vue-component";

const filterData: Filters = new Filters({
  indexName: "",
  rangeList: [
    "Hello"
  ],
  checks: [
    {
      attribute: "world",
      values: [
        {
          label: "jk",
        },
        {
          label: "ab",
        },
      ],
    },
  ],
});

const viewa = useWidgets();
const data: DataType = {
  //icon: "schedule",
  //overlay: "../../public/hero_sunset.jpeg",
  card: true,
  items: {
      header: [
        {
          label: "The Black Skirt",
        }
      ],
      center: [
        {
          label: "This is about man's fallacy and illusion that leads to infactuation.",
        },
      ],
      footer: [
        {
          label: "27-03-34",
          thumbnail: "../../public/hero_blue.jpeg",
          avatar:  "../../public/logo.png",
        },
        {
          label: "Wonders Ayanfe"
        }
      ]
  },
  setHeader: true,
};
const view2: View = {
  layouts: [
    {
      type: "List",
      data: data,
    },
  ],
};*/

const view = shallowRef(new View({
  heading: 'Welcome',
  id: 'home',
  layout: "Grid",
  navType: 'center',
  size: 'col-8',
  sections: [data, filterData],
}));


//let SBL = viewa.get('Header')

//navList: this.$route.matched[0].children,
onBeforeMount(() => {
  //nextTick(() => {});
  //viewa.insert("Header", view2);
  console.log('SBL', view)
});
</script>
