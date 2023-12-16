<template>
  <div v-for="(view, key) in layout">
      <EView :view="view" :key="view.id"></EView>
  </div>
  <!--RouterView></RouterView>-->
</template>

<script lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import EView from "../components/EView.vue";
import { IDataView } from '../../model/IDataView';
import { data } from '../../config/model';
import { GlobalView } from '../../config/edifiles.config';
import { View, isType, NavList, PageView } from '../utils/types';
import { defineComponent } from "vue";

export default defineComponent({
  data() {
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
        navType: 'top',
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
        navType: 'top',
        size: '',
        sections: []
    })
}

    const view: PageView = new PageView({
      id: 'listView',
      layout: 'Grid',
      sections: [],
    });

    const id: string | number = route.params.id as string;
    const type: string = route.params.type as string;
    const categories: string[] = route.params.categories as string[];

    
    

    // Return reactive properties or methods here
    return {
      layout,
      view,
      id,
      type,
      categories,
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
        const dataView: IDataView | undefined = GlobalView.mainLayout.children.find((child) => {
         
          return child.id === this.type;
        });
        if (!this.categories && !this.id) {
          console.log('children ', GlobalView.mainLayout.children)
          console.log('DataView ', dataView)
          this.view = await dataView?.getListData(data);
        } else if (this.categories && !this.id) {
          this.view = await dataView?.getListData(this.categories);
        } else if (this.id) {
          this.view = await dataView?.getSingleData(this.id);
        } else if (this.categories[0] === 'create') {
          this.view = await dataView?.getCreateData();
        }
      } else {
        this.view = GlobalView.mainLayout.children.find((child) => {
          return child.id === 'home';
        }) as PageView;
      }
      console.log('WTF');
      console.log('type', this.$route.params);
      console.log('view', this.view);
    }
  },
  async beforeMount() {
    await this.processView()
    this.processMenus()
  }
});
</script>