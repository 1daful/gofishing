<template>
    <div v-for="(view, key) in layout">
        <EView :view="view" :key="view.id"></EView>
    </div>
    <!--RouterView></RouterView>-->
</template>

<script lang="ts">
import { View, isType, NavList, PageView } from '../utils/types';
import { GlobalView } from "../../config/edifiles.config";
import { useRoute } from "vue-router";
import EView from "../components/EView.vue";
import { onBeforeMount, ref } from 'vue';
import { IDataView } from '../../model/IDataView';
import { data } from "../../config/model";
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
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

let view: PageView = new PageView({
    id: 'listView',
    layout: 'Grid',
    sections: [],
})

const view2 = new PageView({
    id: 'listView',
    layout: 'Grid',
    sections: [
    {
          //icon: "schedule",
          img: "../../public/hero_sunset.jpeg",
          overlay: "g",
          meta: {
            title: "The Black Skirt",
            description: "This is about man's fallacy and illusion that leads to infactuation.",
            created: "27-03-34",
            author: "Wonders Ayanfe",
          },
          actions: [
            {
              name: "Create",
              type: "Create",
              label: "Create",
              icon: "whatshot",
              event: "Create",
              onResult: [],
              onError: []
            },
            {
              name: "Read",
              type: "Read",
              label: "Read",
              icon: "bluetooth",
              event: "",
              onResult: [],
              onError: []
            },
          ],
          setHeader: true,
        }
    ],
})

let id: string | number = useRoute().params.id as string
let type: string = useRoute().params.type as string
let categories: string[] = useRoute().params.categories as string[]

const processMenus = () => {
    view?.sections.forEach(section => {
        if(isType(section, View) || isType(section, NavList)) {
            layout[section.navType].sections.push(section)
        }
        else {
            layout.center.sections.push(section)
        }
    });
}

const processView = async () => {
    if(type) {
        const dataView: IDataView | undefined = GlobalView.mainLayout.children.find((child) => {
            return child.id === type
        })
        if(!categories && !id) {
            view = await dataView?.getListData(data)
        }
        else if(categories && !id) {
            view = await dataView?.getListData(categories)
        }
        else if(id){
            view = await dataView?.getSingleData(id)
        }

        else if(categories[0] === 'create') {
            view = await dataView?.getCreateData()
        }
        
    }
    else {
        view = GlobalView.mainLayout.children.find((child) => {
            return child.id === 'home'
        })
    }
    console.log('type', useRoute()?.params)
    console.log('view', view)
}

const processData = async () => {
    await processView();
    processMenus();
}

onBeforeMount(async () => {
    processData()
})

return {
    layout, view, id, type, categories, processMenus,
    processView
}
    },
    components: {
        EView
    }
})

    
    

/*const processMenus = (view: View) => {
    const filteredSections = view.sections.filter(section =>
    isType(section, View) && section.navType !== 'center') as View[];

    const extractlink = (section: View): NavLink => ({
    path: section.id,
    name: section.id,
    params: {
        type: useRoute().params.type,
        categories: useRoute().params.categories
    },
    query: {}
    });

    const top: NavLink[] = filteredSections
    .filter(section => section.navType === 'top')
    .map(extractlink);

    const left: NavLink[] = filteredSections
    .filter(section => section.navType === 'y-tab')
    .map(extractlink);

    return { top, left };
};*/


</script>