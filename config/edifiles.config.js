import { EAuth } from '@edifiles/services';
import { View, Action, PageView, ActionGroup } from "../src/utils/types";
import Search from "../src/components/ESearch.vue";
import { menus } from "./menus";
import Home from "../src/pages/Home.vue";
import { config } from "../public/config";
import { Service } from "../model/Service";
import { ReachOut } from '../model/ReachOut';
import { Event } from '../model/Event';
<<<<<<< HEAD
=======
import { Member } from '../model/Member';
import { Attendance } from '../model/Attendance';
>>>>>>> master
const auth = new EAuth(config.api.Supabase);
const search = new View({
    id: 'search',
    layout: 'Grid',
    navType: 'top',
    size: 'col-4',
    sections: [{
            content: Search
        }]
});
const authAction = new ActionGroup({
    navType: 'top',
    actions: [
        new Action({
            label: 'Sign In',
            event: 'Route',
            args: '/signin',
            style: {
                type: 'outline'
            },
            viewGuard: false
        }),
        new Action({
            label: 'Sign Up',
            event: 'Route',
            args: '/signup',
            viewGuard: false
        }),
        new Action({
            label: 'Sign Out',
<<<<<<< HEAD
            event: auth.logout,
=======
            event: async () => {
                return await auth.logout();
            },
            onResult: {
                redirect: '/'
            },
>>>>>>> master
            viewGuard: true
        })
    ]
});
const home = new PageView({
    id: 'home',
    layout: 'Grid',
    sections: [Home],
    children: []
});
const serviceModel = new Service();
const eventModel = new Event();
const reachoutModel = new ReachOut();
<<<<<<< HEAD
async function userIcon() {
    var _a;
    const names = (_a = (await auth.getUser()).data.user) === null || _a === void 0 ? void 0 : _a.user_metadata;
    return names === null || names === void 0 ? void 0 : names.firstName;
=======
const memberModel = new Member();
const attendanceModel = new Attendance();
async function userIcon() {
    const names = (await auth.getUser()).data.user?.user_metadata;
    return names?.firstName;
>>>>>>> master
}
const userAvatar = new Action({
    icon: await userIcon(),
    event: 'Modal'
});
const mainLayout = new PageView({
    id: '',
    layout: 'Grid',
    sections: [
        menus, search, authAction, userAvatar
    ],
    children: [
<<<<<<< HEAD
        home, serviceModel, eventModel, reachoutModel
=======
        home, serviceModel, eventModel, reachoutModel, memberModel, attendanceModel
>>>>>>> master
    ]
});
export const GlobalView = {
    mainLayout
};
export const view = new PageView({
    id: '',
    layout: 'Grid',
<<<<<<< HEAD
    sections: []
=======
    sections: [],
    children: []
>>>>>>> master
});
export const config2 = {
    template: {
        views: [],
        xlinks: [],
        ylinks: [],
        style: {
            background: {},
            foreground: {},
            visuals: {},
            cards: {}
        },
        services: {}
    }
};
