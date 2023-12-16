import { useHead } from "unhead";
import { SFacebook, STwitter } from "vue-socials";
import { Action } from "../src/utils/types";
export class Share {
    constructor(id) {
        this.id = 'share';
        if (id)
            this.id = id;
    }
    getCreateData(media) {
        useHead({
            meta: [
                {
                    name: "og:url",
                    content: media.url
                },
                {
                    name: "og:type",
                    content: "article"
                },
                {
                    name: "og:title",
                    content: media.title
                },
                {
                    name: "og:description",
                    content: media.description
                },
                {
                    name: "og:image",
                    content: media.thumbnail
                }
            ]
        });
        const shareOptions = {
            url: media.url,
            quote: media.description,
            hashtag: '#Github',
        };
        const Facebook = {
            content: SFacebook,
            props: {
                shareOptions
            }
        };
        const Twitter = {
            content: STwitter,
            props: {
                shareOptions
            }
        };
        const view = {
            id: "",
            layout: "Grid",
            size: "",
            navType: "top",
            sections: [
                Facebook, Twitter
            ],
        };
        return view;
    }
    getListData(query) {
        throw new Error("Method not implemented.");
    }
    getSingleData(id) {
        throw new Error("Method not implemented.");
    }
    getShare(media) {
        const action = new Action({
            event: 'Modal',
            args: [this.getCreateData(media)],
            onResult: [],
            onError: []
        });
        return action;
    }
}
