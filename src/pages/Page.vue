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
    const filters = route.params.filters
    const vie = categories[categories.length - 1]
    

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
    console.log('VIE ', this.vie)
      if (this.type) {
        let section
        this.dataView = GlobalView.mainLayout.children.find((child) => {
         
          return child.id === this.type;
        });
        if (this.vie) {
          this.view = await (this.dataView[this.vie.toString()]).call(this.dataView, this.filters)
          /*this.view = new PageView(
            {
              id:'',
              layout: 'Grid',
              children: [],
              sections: [new View(this.vie)]

            }
          )*/
        }
         else if (!this.categories && !this.id) {
          section = await this.dataView?.getListData(this.filters);
          this.view = section
        } 
        else if (this.categories && !this.id) {
          if (this.categories[0] === 'create') {
          section = await this.dataView?.getCreateData(this.filters);
            this.view = section
          }
          else {
          section = await this.dataView?.getListData(this.filters);
          this.view = section
          }
        } 
        else if (this.id) {
          section = await this.dataView?.getSingleData(this.id);
          this.view = section
        } 
      } 
      else {
        this.view = GlobalView.mainLayout.children.find((child) => {
          return child.id === 'home';
        }) as PageView;
      }
      console.log('WTF ', this.categories);
      console.log('type', this.$route.params);
      console.log('view', this.view);
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