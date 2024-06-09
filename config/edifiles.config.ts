import { EAuth, Mailer } from '@edifiles/services';
import { View, Action, FormType, PageView, QuestionType, ActionGroup } from "../src/utils/types";
import Search from "../src/components/ESearch.vue";
import { menus } from "./menus";
import Home from "../src/pages/Home.vue";
import { config } from "../public/config";
//import { firstTimer } from "./model";
import { Service } from "../model/Service";
import { ReachOut } from '../model/ReachOut';
import { Event } from '../model/Event';
<<<<<<< HEAD
=======
import { Member } from '../model/Member';
import { Attendance } from '../model/Attendance';
//import { auth } from './model';
>>>>>>> master

/*const postQuery = `
  query GetPost($postId: ID!) {
    post(id: $postId) {
      id
      title
      content
      author
      createdAt
    }
  }`;*/

/*const { data, fetching, error } = useQuery({
    query: postQuery,
    variables: { postId: 'your-post-id' },
});*/

//const repo = new Repository(config.api.Supabase)
//const recom = new Recommender(config)
const auth = new EAuth(config.api.Supabase)

const search: View = new View({
    id: 'search',
    layout: 'Grid',
    navType: 'top',
    size: 'col-4',
    sections: [{
        content: Search
    }]
})

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
                return await auth.logout()
            },
            onResult: {
                redirect: '/'
            },
>>>>>>> master
            viewGuard: true
        })
    ]
})

const home: PageView = new PageView({
    id: 'home',
    layout: 'Grid',
    sections: [Home],
    children: []
})
const serviceModel = new Service()
const eventModel = new Event()
const reachoutModel = new ReachOut()
<<<<<<< HEAD
=======
const memberModel = new Member()
const attendanceModel = new Attendance()
>>>>>>> master

async function userIcon() {
    const names = (await auth.getUser()).data.user?.user_metadata
    return names?.firstName
}
const userAvatar: Action = new Action({
    icon: await userIcon(),
    event: 'Modal'
})

const mainLayout: PageView = new PageView({
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
})
export const GlobalView = {
    mainLayout
}

/*export const setGlobal = () => {
    Object.keys(GlobalView).forEach((key) => {
        const widgetKey = key as WidgetName;
        useWidgets().get(widgetKey).insert(...GlobalView[widgetKey])
      });
}*/

export  const view = new PageView({
    id: '',
    layout: 'Grid',
<<<<<<< HEAD
    sections: []
=======
    sections: [],
    children: []
>>>>>>> master
})

/*const resolver = (type: string) => {
    repo.readItems('',{type, })
    return {
        id: '',
        name: ''
    }
}*/

export const config2 = {
    template: {
        views: [
        ],
        xlinks: [],
        ylinks: [],
        style: {
            background: {},
            foreground: {},
            visuals: {}, //buttons, headers etc
            cards: {}
        },
        services: {}
    }
}