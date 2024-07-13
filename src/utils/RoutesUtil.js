import { useRoute } from 'vue-router';
export function getRoute(name) {
    let url;
    const r = useRoute().matched;
    if (r) {
        r.forEach(route => {
            if (route.name === name && route.children)
<<<<<<< HEAD
                url = route === null || route === void 0 ? void 0 : route.children;
=======
                url = route?.children;
>>>>>>> master
        });
    }
    console.log("rouet", url);
    return url;
}
