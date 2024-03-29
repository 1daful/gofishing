import { cacheExchange, fetchExchange } from "@edifiles/services";
export const config = {
    "title": "Edifeeds",
    "baseUrl": "/",
    "backEndApi": {
        baseUrl: "http://localhost:2000/api",
        baseConfig: {},
        requests: {
            schedule(params, data) {
                return {
                    url: '/schedule',
                    params: params,
                    data: data
                };
            },
            callback: {
                url: '/call'
            }
        }
    },
    "logo": "../logo.png",
    "email": {
        "bounceAddress": "admin@bounce.edifeeds.com",
        "address": "support@edifeeds.com",
        "name": "Edifeeds"
    },
    "socials": [
        {
            "id": "Google",
            "icon": "mdi-google"
        },
        {
            "id": "Facebook",
            "icon": "mdi-facebook"
        },
        {
            "id": "Twitter",
            "icon": "mdi-twitter"
        }
    ],
    "contacts": [
        {
            "name": "facebook",
            "icon": "facebook",
            "color": "blue",
            "id": "/wonderayanfe"
        },
        {
            "name": "pinterest",
            "icon": "pinterest",
            "color": "red"
        },
        {
            "name": "twitter",
            "icon": "twitter",
            "color": "cornflowerblue",
            "id": "@wonderayanfe0"
        },
        {
            "name": "linkedIn",
            "icon": "fi-social-linkedin",
            "color": "blue"
        },
        {
            "name": "email",
            "icon": "fi-mail",
            "color": "#DCBDBC",
            "id": "contact@edifeeds.com"
        },
        {
            "name": "phone",
            "icon": "fi-telephone",
            "color": "blue",
            "id": "+2348071397909"
        }
    ],
    "menuItems": [
        {
            "name": "Contact",
            "path": "/contact",
            "component": "Contact",
            "title": "Contact"
        },
        {
            "name": "About",
            "path": "/about",
            "component": "About"
        },
        {
            "name": "Sign Up",
            "path": "signup",
            "component": "SignUp"
        },
        {
            "name": "Sign In",
            "path": "signin",
            "component": "SignIn"
        }
    ],
    "tosUrl": "/term-of-use",
    "privacyPolicyUrl": "/privacy-policy",
    "hero": {
        "title": "Edificient stories, music, great quotes, videos and books, it all starts with Edifeeds.",
        "subtitle": "",
        "buttonText": ""
    },
    "apiClient": "axios",
    "api": {
        "Zeptomail": {
            "baseUrl": "https://api.zeptomail.com/v1.1",
            "config": {
                "header": {
                    "Authorization": "Zoho-enczapikey wSsVR612qBX1CvoomjepILs7nQxXBVqkFE0ojlfyuCD0H/HD9sc/kkLMUQSjHfJMRWNsEjUS8u4hnhoIhjRchtR7mwpVDiiF9mqRe1U4J3x17qnvhDzNX2xVmhSKL4MNxgVommRnG8En+g=="
                },
                "baseParams": {}
            }
        },
        "Pexels": {
            "baseUrl": "https://api.pexels.com/v1",
            "attribution": {
                "href": "https://www.pexels.com",
                "src": "https://images.pexels.com/lib/api/pexels.png"
            },
            "config": {
                "header": {
                    "Authorization": "563492ad6f91700001000001da2c276cc81440fd966c2ec19ba234c2"
                }
            }
        },
        "Unsplash": {
            "baseUrl": "https://api.unsplash.com",
            "config": {
                "baseParams": {
                    "client_id": "h2QN0xKvn2yEbGzLAzt__xrgVQI_AVu2Gwn3WdZn0gE"
                }
            }
        },
        "auth0": {
            "name": "Edifeeds",
            "clientId": "Sz3hqM05IKi5dEIYVoACKvIAXjd4azW5",
            "domain": "dev-x-wx5tsn.auth0.com",
            "clientSecret": "tRctqxf33O6MrHUwNj-DqFkTGfdlrZqKai3oF134_CiK1-Ya31EPS2L_Uc3x3sVy"
        },
        Infobip: {
            baseUrl: "https://yrlnmj.api.infobip.com",
            baseConfig: {
                headers: {
                    'Authorization': 'App 7ca8a7b599ebdf21e0915e6f15c21c59-c39394c8-7161-412f-8df9-d2b2dc7c1033',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            },
            request: {
                sms(msg) {
                    return {
                        url: '/sms/2/text/advanced',
                        data: {
                            messages: [{
                                    destinations: [{ to: msg.address }],
                                    from: 'ServiceSMS',
                                    text: msg.body,
                                }],
                        }
                    };
                }
            }
        },
        "Gorse": {
            "id": "http://127.0.0.1:8088",
            "key": ""
        },
        "Regommend": {
            "baseUrl": "http://localhost:2000/api"
        },
        "Algolia": {
            "id": "JFUHLV2WO0",
            "key": "f97b7d76b80539c4d02d0e4316220e87"
        },
        "Typesense": {
            "config": {
                "baseParams": {
                    "host": "rpqa2i8vyu4z57wdp-1.a1.typesense.net",
                    "apikey": "YUKVclEUeLRXKk9xPEQZ06xTAhuNsUpe"
                }
            }
        },
        "Auth": {
            "url": "http://localhost:8080/auth",
            "realm": "edifeeds",
            "clientId": "edifeeds-app",
            "onLoad": "login-required"
        },
        Urql: {
            config: {
                url: "twitter.com",
                exchanges: [cacheExchange, fetchExchange]
            }
        },
        Supabase: {
            "url": "https://liagcjidevdramrvncxm.supabase.co",
            "key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpYWdjamlkZXZkcmFtcnZuY3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2MzU1ODcsImV4cCI6MjAwMzIxMTU4N30.D4yhnLSCJHOeQJnfvv7aRVBQ8KX42PRyvzcEsp-uIJs",
            "options": {
                "schema": "public",
                "autoRefreshToken": true,
                "persistSession": true,
                "detectSessionInUrl": true
            }
        },
        supabaseGql: {
            url: '',
            key: ''
        },
        "zenserp": {
            "baseUrl": "https://app.zenserp.com/api/v2",
            "config": {
                "baseParams": {
                    "apikey": "83d52500-bbe4-11ec-97af-3769629ae33a"
                }
            }
        },
        "PouchDB": {
            "url": ""
        },
        "Supertokens": {
            "appName": "Edifeeds",
            "apiDomain": "http://localhost:2000/api"
        },
        ListMonk: {
            "baseUrl": "http://localhost:8000/api",
            "baseConfig": {
                "apikey": "AIzaSyAlbER-HPdipvFgKJc-PWWZYhBIBSPxBNQ"
            },
            requests: {
                transact: (format) => {
                    return {
                        url: "/api/tx",
                        params: {},
                        data: {
                            subscriber_email: format.address,
                            subscriber_id: format.userId,
                            template_id: format.templateKey,
                            data: format.data,
                            headers: format.headers,
                            content_type: format.contentType
                        }
                    };
                },
                campaign: (format) => {
                    return {
                        url: "/api/campaigns",
                        params: {},
                        data: {
                            name: format.name,
                            subject: format.subject,
                            lists: format.lists,
                            from_email: format.address,
                            type: format.type,
                            content_type: format.contentType,
                            body: format.body,
                            send_at: format.date,
                            messenger: format.messenger,
                            template_id: format.templateKey,
                            tags: format.tags
                        }
                    };
                },
                subscriber: (format, data) => {
                    return {
                        url: "/subscribers",
                        params: {
                            page: format.page,
                            per_page: format.per_page
                        },
                        data: {
                            name: data.name,
                            email: data.address,
                            status: data.status,
                            lists: data.lists,
                            attribs: data.attributes,
                            preconfirm_subscriptions: data.preconfirmedSub
                        }
                    };
                }
            }
        },
        "ZincSearch": {
            "baseUrl": "http://localhost:4080/api",
            "config": {
                "auth": {
                    "username": "admin",
                    "password": "Complexpass#123"
                }
            }
        },
        "Meilisearch": {
            "host": "https://ms-3c59deb7e96a-1832.sfo.meilisearch.io",
            "apiKey": "d449e47884967a7a8267ec683fce149df78e3f8e"
        }
    },
    "genres": {},
    "signInProps": {
        "signInSucessUrl": "index.html"
    },
};
