import { NavList } from "../src/utils/types";
import Home from "../src/pages/Home.vue";
import Billing from "../src/pages/Billing.vue";
const HomeComponent = {
    content: Home
};
const BillingComponent = {
    content: Billing
};
export const menus1 = new NavList({
    id: "",
    content: [
        {
            path: '/',
            name: 'Home',
        },
        {
            path: '/billing',
            name: 'Billing',
        },
        {
            path: '/tools',
            name: 'Tools',
        },
    ],
    navType: "top"
});
export const createMenus = (id, navType, menus) => {
    let navList = new NavList({
        id: id,
        content: [],
        navType: navType
    });
    menus.forEach(menu => {
        navList.content.push({
            path: "/" + menu,
            name: menu
        });
    });
    return navList;
};
export const menus = createMenus('mainMain', 'top', [
    'services',
    'groups',
    'announcement',
    'members',
    'messages',
    'events',
    'reachouts'
]);
