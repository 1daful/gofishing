class Comp {
    constructor(obj) {
        Object.assign(this, obj);
    }
    comp;
}
function AddProperties(Base, propertiesToAdd) {
    return class extends Base {
        constructor(...args) {
            super(...args);
            Object.assign(this, propertiesToAdd);
        }
    };
}
function getComp(obj) {
    let comp = new Comp(obj);
    Object.assign(comp, obj);
    return comp;
}
export class Slides {
    constructor(...data) {
        this.content = data;
    }
    content;
}
export class Menu {
    header = {
        reveal: true,
        bordered: false,
        elevated: true,
        class: {
            custom: "fixed-nav",
            margin: 'q-ma-auto'
        }
    };
    toolBar = {
        class: "justify-end"
    };
    brand = {
        class: ""
    };
    hero = {
        backgroundColor: ""
    };
    listStyle;
    closeBtn = getComp({
        id: "closeMenuBtn",
        icon: 'close',
        event: (drawerOpen) => { drawerOpen = !drawerOpen; },
        style: {
            size: "20px",
            color: "red",
            type: "flat",
            shape: "round",
            dense: true,
        },
        class: "lt-md"
    });
    openBtn = getComp({
        id: "menuBtn",
        icon: 'menu',
        event: (drawerOpen) => { drawerOpen = !drawerOpen; },
        style: {
            size: "20px",
            color: "primary",
            type: "flat",
            shape: "round",
            dense: true,
        },
        class: "lt-md"
    });
}
;
let view = {
    layout: "Grid",
    props: undefined,
    events: undefined,
    sections: [],
    viewGuard: false
};
