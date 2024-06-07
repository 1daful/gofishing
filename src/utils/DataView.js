export const getEvent = async (callback, ...args) => {
    return await callback(...args);
};
const decoFunc = (position, prop, keyLabel, dataContent) => {
    return (target, key) => {
        var _a, _b, _c, _d;
        let value;
        let items = target.constructor.items || (target.constructor.items = []);
        const item = {
            header: []
        };
        if (keyLabel && prop) {
            (_a = item.header) === null || _a === void 0 ? void 0 : _a.push({
                icon: dataContent === null || dataContent === void 0 ? void 0 : dataContent.icon,
                [prop]: `${keyLabel} : ${key}`,
                action: dataContent === null || dataContent === void 0 ? void 0 : dataContent.action,
                horizontal: dataContent === null || dataContent === void 0 ? void 0 : dataContent.horizontal,
                class: dataContent === null || dataContent === void 0 ? void 0 : dataContent.class
            });
        }
        else if (prop) {
            (_b = item.header) === null || _b === void 0 ? void 0 : _b.push({
                icon: dataContent === null || dataContent === void 0 ? void 0 : dataContent.icon,
                [prop]: key,
                action: dataContent === null || dataContent === void 0 ? void 0 : dataContent.action,
                horizontal: dataContent === null || dataContent === void 0 ? void 0 : dataContent.horizontal,
                class: dataContent === null || dataContent === void 0 ? void 0 : dataContent.class,
                position: position
            });
        }
        else if (keyLabel) {
            (_c = item.header) === null || _c === void 0 ? void 0 : _c.push({
                icon: dataContent === null || dataContent === void 0 ? void 0 : dataContent.icon,
                label: `${keyLabel} : ${key}`,
                action: dataContent === null || dataContent === void 0 ? void 0 : dataContent.action,
                horizontal: dataContent === null || dataContent === void 0 ? void 0 : dataContent.horizontal,
                class: dataContent === null || dataContent === void 0 ? void 0 : dataContent.class
            });
        }
        else {
            (_d = item.header) === null || _d === void 0 ? void 0 : _d.push({
                icon: dataContent === null || dataContent === void 0 ? void 0 : dataContent.icon,
                key: key,
                prop: 'label',
                action: dataContent === null || dataContent === void 0 ? void 0 : dataContent.action,
                horizontal: dataContent === null || dataContent === void 0 ? void 0 : dataContent.horizontal,
                class: dataContent === null || dataContent === void 0 ? void 0 : dataContent.class
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
                    icon: dataContent === null || dataContent === void 0 ? void 0 : dataContent.icon,
                    [prop]: value,
                    action: dataContent === null || dataContent === void 0 ? void 0 : dataContent.action,
                    horizontal: dataContent === null || dataContent === void 0 ? void 0 : dataContent.horizontal,
                    class: dataContent === null || dataContent === void 0 ? void 0 : dataContent.class
                });
            }
            else {
                item.content.push({
                    icon: dataContent === null || dataContent === void 0 ? void 0 : dataContent.icon,
                    label: value,
                    action: dataContent === null || dataContent === void 0 ? void 0 : dataContent.action,
                    horizontal: dataContent === null || dataContent === void 0 ? void 0 : dataContent.horizontal,
                    class: dataContent === null || dataContent === void 0 ? void 0 : dataContent.class
                });
            }
            if (keyLabel && prop) {
                items[index].content.push({
                    icon: dataContent === null || dataContent === void 0 ? void 0 : dataContent.icon,
                    [prop]: `${keyLabel} : ${prop}`,
                    action: dataContent === null || dataContent === void 0 ? void 0 : dataContent.action,
                    horizontal: dataContent === null || dataContent === void 0 ? void 0 : dataContent.horizontal,
                    class: dataContent === null || dataContent === void 0 ? void 0 : dataContent.class
                });
            }
            else {
                items[index].content.push({
                    icon: dataContent === null || dataContent === void 0 ? void 0 : dataContent.icon,
                    label: `${keyLabel} : ${prop}`,
                    action: dataContent === null || dataContent === void 0 ? void 0 : dataContent.action,
                    horizontal: dataContent === null || dataContent === void 0 ? void 0 : dataContent.horizontal,
                    class: dataContent === null || dataContent === void 0 ? void 0 : dataContent.class
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
}
