import { Repository, Recommender, EAuth, Mailer } from '@edifiles/services';
import { View, Action, FormType, PageView, QuestionType } from "../src/utils/types";
import Search from "../src/components/ESearch.vue";
import { menus } from "./menus";
import Home from "../src/pages/Home.vue";
import { config } from "../public/config";
import { firstTimer, data } from "./model";
import { Service } from "../model/Service";
import { useRoute } from "vue-router";

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

export const userContacts: QuestionType  = {
    title: 'Contacts',
    index: 0,
    actions: {},
    content: [{
        question: 'Address',
        inputType: 'text',
        answer: '',
        options: [],
        name: '',
        image: ''
    },{
        question: 'Phone number',
        inputType: 'number',
        answer: '',
        options: [],
        name: '',
        image: ''
    },{
        question: 'Email Address',
        inputType: 'email',
        answer: '',
        options: [],
        name: '',
        image: ''
    }
    ]
}
export const userBiodata =  new QuestionType({
    title: 'Sign Up',
    index: 1,
    content: [{
        question: 'First Name',
        inputType: 'text',
        answer: '',
        options: [],
        name: '',
        image: ''
    },{
        question: 'Last Name',
        inputType: 'text',
        answer: '',
        options: [],
        name: '',
        image: ''
    },{
        question: 'Password',
        inputType: 'password',
        answer: '',
        options: [],
        name: '',
        image: ''
    },{
        question: 'Date of Birth',
        inputType: 'date',
        answer: '',
        options: [],
        name: '',
        image: ''
    },{
        question: 'Date of Birth',
        inputType: 'date',
        answer: '',
        options: [],
        name: '',
        image: ''
    },
],
    actions: {
    submit: new Action({
        label: 'Sign Up',
        event: auth.signUp,
        onResult: [
            ()=> {
                new Mailer().sendEmail({
                    name: 'Welcome New User',
                    subject: '',
                    text: '',
                    templateKey: '',
                    html: '',
                    attachments: [],
                    inline_images: [],
                    headers: [],
                    messenger: '',
                    body: ''
                })
            }
        ],
        onError: []
    })},
    meta: {
        isNew: false
    }
})

export const userView: View = new View({
    id: 'userView',
    layout: 'Grid',
    navType: 'center',
    size: 'col-12',
    sections: [new FormType('userForm','Submit', [userBiodata])]
})

const signIn: Action = new Action({
    label: 'Sign In',
    event: 'route',
    args: '/signin',
    onResult: [],
    onError: [],
    style: {
        type: 'outline'
    }
})

const signUp = new Action({
    label: 'Sign Up',
    event: 'route',
    args: '/signup',
    onResult: [],
    onError: []
});

export const userViewResolver = () => {
    const mailer = new Mailer()
    const userSignUp = () => {
        userView
    }
}

export const brand = {
    name: "Go Fishing",
    url: '/'
}

const home: PageView = new PageView({
    id: 'home',
    layout: 'Grid',
    sections: [Home, firstTimer],
    children: []
})
const serviceModel = new Service()
 
const services: PageView = new PageView({
    id: 'services',
    layout: 'Grid',
    sections: [serviceList],
})

const serviceSingle = await serviceModel.getSingleData(useRoute()?.params?.categories[0])

const service: PageView = {
    id: '',
    layout: 'Grid',
    sections: [serviceSingle],
    children: []
}

const mainLayout: PageView = new PageView({
    id: '',
    layout: 'Grid',
    sections: [
        menus, search, signIn, signUp,
    ],
    children: [
        home, serviceModel
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
    sections: []
})

export const globalViewResolver = {
    main: async (params: any) => ({
        menus,
    }),
    userView
}

const filters = (...filters: any[]) => {

}

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