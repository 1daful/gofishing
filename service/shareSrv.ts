import { useHead } from "unhead";
import { SFacebook } from "vue-socials";
import { onMounted } from "vue";
import { Action, VComponent } from "../src/utils/types";

export function share(media) {
    onMounted(()=> useHead(
        {
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
                content: media.thumbnailsmall
            }
        ]
    }))

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

    return {Facebook}
}

function getShare() {
    const action: Action = new Action({
        event: share,
        args: [],
        onResult: [],
        onError: []
    })
}