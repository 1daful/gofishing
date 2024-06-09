export const getEvent = async (callback, ...args) => {
    return await callback(...args);
};
const decoFunc = (position, prop, keyLabel, dataContent) => {
    return (target, key) => {
        let value;
        let items = target.constructor.items || (target.constructor.items = []);
        const item = {
            header: []
        };
        if (keyLabel && prop) {
            item.header?.push({
                icon: dataContent?.icon,
                [prop]: `${keyLabel} : ${key}`,
                action: dataContent?.action,
                horizontal: dataContent?.horizontal,
                class: dataContent?.class
            });
        }
        else if (prop) {
            item.header?.push({
                icon: dataContent?.icon,
                [prop]: key,
                action: dataContent?.action,
                horizontal: dataContent?.horizontal,
                class: dataContent?.class,
                position: position
            });
        }
        else if (keyLabel) {
            item.header?.push({
                icon: dataContent?.icon,
                label: `${keyLabel} : ${key}`,
                action: dataContent?.action,
                horizontal: dataContent?.horizontal,
                class: dataContent?.class
            });
        }
        else {
            item.header?.push({
                icon: dataContent?.icon,
                key: key,
                prop: 'label',
                action: dataContent?.action,
                horizontal: dataContent?.horizontal,
                class: dataContent?.class
            });
        }
        target["items"] = item;
        const getter = function () {
            return value;
        };
    };
};
export function content(index, prop, keyLabel, dataContent) {
    return (target, key, descriptor) => {
        let items = target.constructor.items || (target.constructor.items = []);
        const item = {
            content: []
        };
        items[index] = item;
        const originalSet = descriptor.set;
        const originalGet = descriptor.get;
        descriptor.set = function (value) {
            originalSet.call(this, value);
            if (prop) {
                item.content.push({
                    icon: dataContent?.icon,
                    [prop]: value,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                });
            }
            else {
                item.content.push({
                    icon: dataContent?.icon,
                    label: value,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                });
            }
            if (keyLabel && prop) {
                items[index].content.push({
                    icon: dataContent?.icon,
                    [prop]: `${keyLabel} : ${prop}`,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                });
            }
            else {
                items[index].content.push({
                    icon: dataContent?.icon,
                    label: `${keyLabel} : ${prop}`,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                });
            }
            this["items"] = items;
        };
        descriptor.get = function () {
            return originalGet.call(this);
        };
    };
}
export function header(position, prop, keyLabel, dataContent) {
    return decoFunc(position, prop, keyLabel, dataContent);
}
export function footer(position, prop, keyLabel, dataContent) {
    return decoFunc(position, prop, keyLabel, dataContent);
}
export function left(position, prop, keyLabel, dataContent) {
    return decoFunc(position, prop, keyLabel, dataContent);
}
export function right(position, prop, keyLabel, dataContent) {
    return decoFunc(position, prop, keyLabel, dataContent);
}
export function center(position, prop, keyLabel, dataContent) {
    return decoFunc(position, prop, keyLabel, dataContent);
}
export function createSlides(Type, props) {
    let slides = {
        content: [],
        name: ""
    };
}
export class Model {
    constructor() {
        this.items = {
            header: [
                {
                    label: this.name
                },
                {
                    avatar: this.avatar
                }
            ]
        };
    }
    items;
}
