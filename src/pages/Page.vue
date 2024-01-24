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
import { View, isType, NavList, PageView } from '../utils/types';
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
    });

    const id: string | number = route.params.id as string;
    const type: string = route.params.type as string;
    const categories: string[] = route.params.categories as string[];
    const filters = route.params.filters    
    

    // Return reactive properties or methods here
    return {
      dataView,
      layout,
      view: shallowRef(sView),
      id,
      type,
      categories,
      filters
    };
  },
  components: {
    EView
  },

  methods: {
  processMenus (){
        this.view?.sections.forEach(section => {
            if(isType(section, View) || isType(section, NavList)) {
                this.layout[section.navType].sections.push(section)
            }
            else {
                this.layout.center.sections.push(section)
            }
        });
    },

    async processView () {
      if (this.type) {
        this.dataView = GlobalView.mainLayout.children.find((child) => {
         
          return child.id === this.type;
        });
        if (!this.categories && !this.id) {
          this.view = await this.dataView?.getListData(this.filters, data);
        } else if (this.categories && !this.id) {
          if (this.categories[0] === 'create') {
            this.view = await this.dataView?.getCreateData(this.filters);
          }
          else 
          this.view = await this.dataView?.getListData(this.filters);
        } else if (this.id) {
          this.view = await this.dataView?.getSingleData(this.id, data);
        } 
      } else {
        this.view = GlobalView.mainLayout.children.find((child) => {
          return child.id === 'home';
        }) as PageView;
      }
      console.log('WTF');
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