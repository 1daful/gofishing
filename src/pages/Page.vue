<template>
  <div v-for="(view, key) in layout">
    <Suspense>
    <EView :view="view" :key="view.id"></EView>
    </Suspense>
  </div>
  <!--RouterView></RouterView>-->
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import EView from "../components/EView.vue";
import { IDataView } from '../../model/IDataView';
import { GlobalView } from '../../config/edifiles.config';
import { View, isType, NavList, PageView, ActionGroup } from '../utils/types';
import { defineComponent, onBeforeMount, onMounted, ref, shallowRef } from "vue";

//export default defineComponent({
  //data() {
    let dataView: IDataView | PageView | undefined
    const route = useRoute();
    const layout = ref({})

    const sView: PageView = new PageView({
      id: 'listView',
      layout: 'Grid',
      sections: [],
      children: []
    });

    const id: string | number = route.params.id as string;
    const type: string = route.params.type as string;
    const categories: string[] = route.params.categories as string[];
    const filters = route.query.filters
    const vie = ()=> {
      if (Array.isArray(categories))
      return categories?.[categories.length - 1]
      else return categories
    }
    console.log('Query ', route)
    let view
    // Return reactive properties or methods here
   /* return {
      dataView,
      layout,
      id,
      type,
      categories,
      filters,
      vie
    };*/

  //let view = shallowRef(sView)
  /*let view: PageView = new PageView({
    children: [],
    sections: [],
    id: '',
    layout: 'Grid'
  })*/
  function processMenus (view: PageView){
    const layout = {
    top: new View({
        id: '',
        layout: 'Grid',
        navType: 'top',
        size: '',
        sections: []
    }),
    left: new View({
        id: '',
        layout: 'Grid',
        navType: 'left',
        size: '',
        sections: []
    }),
    bottom: new View({
        id: '',
        layout: 'Grid',
        navType: 'bottom',
        size: '',
        sections: []
    }),
    center: new View({
        id: '',
        layout: 'Grid',
        navType: 'center',
        size: '',
        sections: []
    }),
    right: new View({
        id: '',
        layout: 'Grid',
        navType: 'right',
        size: '',
        sections: []
    })
}

        view.sections.forEach(section => {
            if(isType(section, View) || isType(section, NavList) || isType(section, ActionGroup)) {
                layout[section.navType].sections.push(section)
            }
            else {
                layout.center.sections.push(section)
            }
        });
        console.log('Layout ', layout)
        return layout
    }

    async function processView () {
      let vieew
      console.log('Type ', type)
      console.log('categories ', categories)
      console.log('id ', id)
      if (type) {
        let section
        dataView = GlobalView.mainLayout.children.find((child) => {
         
          return child.id === type;
        });
      if (!categories && !id) {
          console.log('TYPE ', type)
          vieew = await dataView?.getListData(filters);
          console.log('Type View ', vieew)
        } 
      else if (categories /*&& !this.id*/) {
          /*if (this.categories[0] === 'create') {
          section = await this.dataView?.getCreateData(this.filters);
            this.view = section
          }*/

        /*if (this.categories || this.id) {
          console.log('This ID ', this.id)
          section = await this.dataView?.getSingleData(this.id)
          this.view = view
          console.log('ID ', this.view)
        }*/
        if (vie()) {
          console.log('VIE ', vie())
          vieew = await (dataView[vie().toString()]).call(dataView, filters)
          console.log("View: ", vieew)
          
        }
          else {
          vieew = await dataView?.getListData(filters);
          }
        } 
        else if (id) {
          console.log('This ID ', id)
          vieew = await dataView?.getSingleData(id)
          console.log('ID ', vieew)
        }
      } 
      else {
        vieew = GlobalView.mainLayout.children.find((child) => {
          return child.id === 'home';
        }) as PageView;
      }
      return vieew
    }
    async function processData() {
      view = await processView()
      layout.value = processMenus(view)
    }
  
  onBeforeMount(()=> {
    processData()
    console.log('LAYOUT ', layout)
  })
</script>