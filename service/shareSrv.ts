import { useHead } from "unhead";
import { SFacebook, STwitter } from "vue-socials";
import { Action, DataType, VComponent, View } from "../src/utils/types";
import { IDataView } from "../model/IDataView";

export class Share implements IDataView {
    constructor (id?: string) {
        if(id)
        this.id = id
    }
    id: string = 'share';
    getCreateData(media: {
        url: string,
        title: string,
        description: string,
        thumbnail: string,
    }): View {
        useHead({
            meta:[
                    {
                        name: "og:url", 
                        content: media.url},
                    {
                        name: "og:type", 
                        content: "article"
                    },
                    {
                        name:"og:title", 
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
            })

        const shareOptions = {
            url: media.url,
            quote: media.description,
            hashtag: '#Github',
          }
        const Facebook: VComponent = {
            content: SFacebook,
            props: {
                shareOptions
            }
        }

        const Twitter: VComponent = {
            content: STwitter,
            props: {
                shareOptions
            }
        }
        const view: View = {
            id: "",
            layout: "Grid",
            size: "",
            navType: "top",
            sections: [
                Facebook, Twitter
            ],
        }
        return view
    }
    getListData(query?: any): Promise<DataType> {
        throw new Error("Method not implemented.");
    }
    getSingleData(id: string): Promise<DataType> {
        throw new Error("Method not implemented.");
    }
    
    getShare(media: {
        url: string,
        title: string,
        description: string,
        thumbnail: string,
    }) {
        const action: Action = new Action({
            event: 'Modal',
            args: [this.getCreateData(media)],
            onResult: [],
            onError: []
        })
        return action
    }
    
} 