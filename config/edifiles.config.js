var _a, _b;
import { EAuth, Mailer } from '@edifiles/services';
import { View, Action, FormType, PageView, QuestionType } from "../src/utils/types";
import Search from "../src/components/ESearch.vue";
import { menus } from "./menus";
import Home from "../src/pages/Home.vue";
import { config } from "../public/config";
import { firstTimer } from "./model";
import { serviceModel } from "../model/Service";
import { useRoute } from "vue-router";
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
export const userContacts = {
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
        }, {
            question: 'Phone number',
            inputType: 'number',
            answer: '',
            options: [],
            name: '',
            image: ''
        }, {
            question: 'Email Address',
            inputType: 'email',
            answer: '',
            options: [],
            name: '',
            image: ''
        }
    ]
};
export const userBiodata = new QuestionType({
    title: 'Sign Up',
    index: 1,
    content: [{
            question: 'First Name',
            inputType: 'text',
            answer: '',
            options: [],
            name: '',
            image: ''
        }, {
            question: 'Last Name',
            inputType: 'text',
            answer: '',
            options: [],
            name: '',
            image: ''
        }, {
            question: 'Password',
            inputType: 'password',
            answer: '',
            options: [],
            name: '',
            image: ''
        }, {
            question: 'Date of Birth',
            inputType: 'date',
            answer: '',
            options: [],
            name: '',
            image: ''
        }, {
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
                () => {
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
                    });
                }
            ],
            onError: []
        })
    },
    meta: {
        isNew: false
    }
});
export const userView = new View({
    id: 'userView',
    layout: 'Grid',
    navType: 'center',
    size: 'col-12',
    sections: [new FormType('userForm', 'Submit', [userBiodata])]
});
const signIn = new Action({
    label: 'Sign In',
    event: 'route',
    args: '/signin',
    onResult: [],
    onError: [],
    style: {
        type: 'outline'
    }
});
const signUp = new Action({
    label: 'Sign Up',
    event: 'route',
    args: '/signup',
    onResult: [],
    onError: []
});
export const userViewResolver = () => {
    const mailer = new Mailer();
    const userSignUp = () => {
        userView;
    };
};
export const brand = {
    name: "Go Fishing",
    url: '/'
};
const home = new PageView({
    id: 'home',
    layout: 'Grid',
    sections: [Home, firstTimer],
    children: []
});
const serviceList = await serviceModel.getListData();
const services = new PageView({
    id: 'services',
    layout: 'Grid',
    sections: [serviceList],
});
const serviceSingle = await serviceModel.getSingleData((_b = (_a = useRoute()) === null || _a === void 0 ? void 0 : _a.params) === null || _b === void 0 ? void 0 : _b.categories[0]);
const service = {
    id: '',
    layout: 'Grid',
    sections: [serviceSingle],
    children: []
};
const mainLayout = new PageView({
    id: '',
    layout: 'Grid',
    sections: [
        menus, search, signIn, signUp,
    ],
    children: [
        home, services, service
    ]
});
export const GlobalView = {
    mainLayout
};
export const view = new PageView({
    id: '',
    layout: 'Grid',
    sections: []
});
export const globalViewResolver = {
    main: async (params) => ({
        menus,
    }),
    userView
};
const filters = (...filters) => {
};
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
