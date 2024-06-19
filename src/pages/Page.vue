<template>
  <div v-for="(view, key) in layout">
      <EView :view="view" :key="view.id"></EView>
  </div>
  <!--RouterView></RouterView>-->
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import EView from "../components/EView.vue";
import { IDataView } from '../../model/IDataView';
import { data } from '../../config/model';
import { GlobalView } from '../../config/edifiles.config';
import { View, isType, NavList, PageView, ActionGroup } from '../utils/types';
import { defineComponent, shallowRef } from "vue";

export default defineComponent({
  data() {
    let dataView: IDataView | PageView | undefined
    const route = useRoute();

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
    

    // Return reactive properties or methods here
    return {
      dataView,
      layout,
      view: shallowRef(sView),
      id,
      type,
      categories,
      filters,
      vie
    };
  },
  components: {
    EView
  },

  methods: {
  processMenus (){
        this.view?.sections.forEach(section => {
            if(isType(section, View) || isType(section, NavList) || isType(section, ActionGroup)) {
                this.layout[section.navType].sections.push(section)
            }
            else {
                this.layout.center.sections.push(section)
            }
        });
    },

    async processView () {
      console.log('Type ', this.type)
      console.log('categories ', this.categories)
      console.log('id ', this.id)
      if (this.type) {
        let section
        this.dataView = GlobalView.mainLayout.children.find((child) => {
         
          return child.id === this.type;
        });
      if (!this.categories && !this.id) {
          console.log('TYPE ', this.type)
          this.view = await this.dataView?.getListData(this.filters);
        } 
      else if (this.categories /*&& !this.id*/) {
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
        if (this.vie()) {
          console.log('VIE ', this.vie())
          this.view = await (this.dataView[this.vie().toString()]).call(this.dataView, this.filters)
          console.log("View: ", this.view)
          
        }
          else {
          this.view = await this.dataView?.getListData(this.filters);
          }
        } 
        else if (this.id) {
          console.log('This ID ', this.id)
          this.view = await this.dataView?.getSingleData(this.id)
          console.log('ID ', this.view)
        }
      } 
      else {
        this.view = GlobalView.mainLayout.children.find((child) => {
          return child.id === 'home';
        }) as PageView;
      }
    },
    async processData() {
      await this.processView()
      this.processMenus()
    }
  },
  mounted() {
    this.processData()
  }
});
</script>