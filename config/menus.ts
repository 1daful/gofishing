import { NavList, NavLink, VComponent, TabType } from "../src/utils/types";
import Home from "../src/pages/Home.vue";
import Billing from "../src/pages/Billing.vue";
//import { TabType } from "@edifiles/services";

const HomeComponent: VComponent = {
    content: Home
}

const BillingComponent: VComponent = {
    content: Billing
}

export const menus1: NavList = new NavList({
    id: "",
    content: [
        {
            path: '/',
            name: 'Home',
            //query: {},
            //params: {}
        },
        {
            path: '/billing',
            name: 'Billing',
            //query: {},
            //params: {}
        },
        {
            path: '/tools',
            name: 'Tools',
            //query: {},
            //params: {}
        },
    ],
    navType: "top"
})

export const createMenus = (id: string, navType: TabType, menus: string[]) => {
    let navList: NavList = new NavList({
        id: id,
        content: [],
        navType: navType
    })
    menus.forEach(menu => {
        navList.content.push({
            path: "/" + menu,
            name: menu
        })
    });

    return navList
}

export const menus = createMenus(
    'mainMain',
    'top',
    [
        'services', 
        'groups', 
        'announcement', 
        'members', 
        'messages',
        'events',
        'reachouts'
    ],
    )