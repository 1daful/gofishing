<template class="row">
    <div :key="view.id" :class="`col-${view.size} ${view.viewport}`" v-if="view.layout === 'Grid' && show">
    <!--template :key="view.id" class="col-md" v-if="view.layout === 'Grid'"-->
      <h4 v-if="view.heading">{{ view.heading }}</h4>
      <div class="row">
        <div class="col-auto" v-for="section in view.sections">
        <QList :bordered="menu.listStyle?.bordered"
          :dense="menu.listStyle?.dense"
          :dark="menu.listStyle?.dark">
          <ENav v-if="isType(section, NavList)" :menuList="section" :navType="section.navType"></ENav>
        </QList>
          <Component v-if="isVComponent(section)"
            :is="section.content"
            v-bind="{...section.props, ...$attrs }" :key="section.content.name">
          </Component>
          <Component v-if="isComponent(section)"
            :is="section"
            v-bind="{...$attrs }" :key="section.name">
          </Component>
          <EDataView v-if="isDataType(section)" :data="section" :key="section.id"></EDataView>
          <template v-if="isDataList(section)">
            <EDataView :data="data" :key="data.id" v-for="data in section.items"></EDataView>
          </template>
          <EDataView v-if="isType(section, QuestionType)" :form="section" :key="section.index"></EDataView>
          <EDataView v-if="isType(section, FormType)" :formsSteppers="section" :key="section.id"></EDataView>
          <EDataView v-if="isType(section, Slides)" :slide="section"></EDataView>
          <EFilters v-if="isType(section, Filters)" :data="section"></EFilters>
          <EAction v-if="isType(section, Action)" :action="section"></EAction>
          <EActionBar v-if="isType(section, ActionGroup)" :actions="section"></EActionBar>
          <EGraph v-if="isType(section, DataGraph)" :graphData="section"></EGraph>
          <ETable v-if="isType(section, DataTable)" :data="section"></ETable>
          <EView v-if="isType(section, View) || isType(section, PageView)" :view="section" :key="section.id"></EView>
          
          <!--<ENav
          navType="y-tab"
          :menuList="processMenus(view).yMenus"></ENav>
          <RouterView :key="$route.fullPath"></RouterView>-->
          </div>
      </div>

<!--<div v-for="section in view.sections">
        <ENav v-if="isNavList(section)" :menuList="section.content" :navType="section.navType"></ENav>
        <Component v-if="isVComponent(section)"
          :is="section.content"
          v-bind="{...section.props, ...$attrs }" :key="section.content.name">
        </Component>
        <Component v-if="isComponent(section)"
          :is="section"
          v-bind="{...$attrs }" :key="section.name">
        </Component>
        <EDataView v-if="isDataType(section)" :data="section" :key="section.id"></EDataView>
        <EView v-if="isType(section, View)" :view="section" :key="section.id"></EView>
</div>-->

      <!--<ETabView :widgets="view">
      </ETabView>-->
    </div>
</template>

<script lang="ts">
import EDataView from "./EDataView.vue";
import ENav from "./ENav.vue";
import { Layout, View, TabView, SectionView,
   PageView, isVComponent, isDataType, isDataList,
  isQuestionType, isView,isComponent, 
  isNavList, isType, NavLink, 
  FormType, VComponent, 
  QuestionType,
  Filters,
  NavList, IView, DataType, Action, ActionGroup,
DataTable, DataGraph } from "../utils/types";
import { Menu, Slides } from "../utils/DataTypes";
import ETabView from "./ETabView.vue";
import EAction from "./EAction.vue";
import EActionBar from "./EActionBar.vue";
import EFilters from "./EFilters.vue";
import EGraph from "./EGraph.vue";
import ETable from "./ETable.vue";
import { Component, defineComponent } from "vue";

let topMenus: NavLink[] = []
let bottomMenus: NavLink[] = []
let leftMenus: NavLink[] = []
let rightMenus: NavLink[] = []

let review = new View({
  id: '',
  layout: 'Grid',
  navType: 'center',
  sections: [],
  size: 'col-8'})

let widgets = Layout
let navViews: View[] = []

const menuList: NavList[] = []

const menu = new Menu()

const views: IView[] = []

const dataList: DataType[] = []

const formList: FormType[] = []

const components: Component[] = []

const vComponents: VComponent[] = []

export default defineComponent({
  name: "EView",
  data() {
    return {
      isComponent,
      isVComponent,
      isDataType,
      isDataList,
      isView,
      isQuestionType,
      isNavList,
      isType,
      Action,
      ActionGroup,
      NavList,
      QuestionType,
      FormType,
      View,
      TabView,
      SectionView,
      PageView,
      Slides,
      DataTable,
      DataGraph,
      Filters,
      review,
      widgets,
      navViews,
      menu,
      show: true
      /*menuList,
      views,
      dataList,
      formList,
      components,
      vComponents*/
    }
  },
  components: { EDataView, ETabView, ENav, EAction, EActionBar,  EGraph, ETable, EFilters},

  props: {
    view: {
      required: true,
      type: Object as () => IView,
    },
    /*hello: {
      required: true,
      type: String,
    },*/
    dynamicProps: {
      type: null
    }
  },
  methods: {
    /*processMenus(section: TabView) {
      /*const extractlink = (section: Nav): NavLink => ({
        path: section.id,
        name: section.id,
        params: {
            type: useRoute().params.type,
            categories: useRoute().params.categories
        }
      });
          topMenus.push(section);
          else if (section.navType === 'left') {
            leftMenus.push(extractlink(section));
          }
          else if (section.navType === 'right') {
            rightMenus.push(extractlink(section));
          }
          else if (section.navType === 'bottom') {
            bottomMenus.push(extractlink(section));
          }
      return { rightMenus, leftMenus, bottomMenus, topMenus };
    },*/

    processView() {
      this.view.sections.forEach(section => {
        /*if(isType(section, TabView)) {
          //const widget = getWidgetInstance(section.navType)
          if(section.navType === 'bottom' || section.navType === 'center' || section.navType === 'left' || section.navType === 'right' || section.navType === 'top') {
              this.widgets[section.navType].sections.push(section)
              return widgets
          }
          else {
              useWidgets().get(section.navType)
          }
        }*/
        if (isType(section, TabView) && section.navType !== 'center') {
          this.navViews.push(section)
        }
        /*else {
          this.review.sections.push(section)
        }*/
        
      });
    },
    /*processTabView(tabview: TabView) {
      this.widgets[tabview.navType].sections.push(tabview)
    }*/
  },

  async beforeMount() {
      /*if (this.view.viewGuard && typeof this.view.viewGuard.event === 'function') {
        this.show = await this.view.viewGuard.event(this.view.viewGuard.args)
      }*/
    //this.processView()
    this.$emit('emitted', this.navViews)
    /*this.view.sections.forEach(element => {
      if (isType(element, NavList)) {
        this.menuList.push(element)
      }
      else if (isType(element, View || isType(element, PageView))) {
        this.views.push(element)
      }
      else if (isType(element, DataType)) {
        this.dataList.push(element)
      }
      else if (isType(element, FormType)) {
        this.formList.push(element)
      }
      else if (isVComponent(element)) {
        this.vComponents.push(element)
      }
      else if (isComponent(element)) {
        this.components.push(element)
      }
    });*/
  },
});
</script>
<style scoped>

</style>
