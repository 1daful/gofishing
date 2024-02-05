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
//import { mount } from "mount-vue-component";

const filterData: Filters = {
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
};

//const viewa = useWidgets();
const data: DataType = {
  //icon: "schedule",
  //overlay: "../../public/hero_sunset.jpeg",
  card: true,
  items: {
      header: [
        {
          label: "The Black Skirt",
        },
        {
          label: "This is about man's fallacy and illusion that leads to infactuation.",
        },
        {
          label: "27-03-34",
          thumbnail: "../../public/logo.png",
          avatar:  "../../public/logo.png",
        },
        {
          label: "Wonders Ayanfe"
        }
      ]
  },
  actions: [
    {
      name: "Create",
      type: "Create",
      label: "Create",
      icon: "whatshot",
      event: 'Route',
    },
    {
      name: "Read",
      type: "Read",
      label: "Read",
      icon: "bluetooth",
      event: 'Route',
    },
  ],
  setHeader: true,
};
/*const view2: View = {
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
  console.log('SBL')
});
</script>
