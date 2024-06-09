import { Action } from "./types";
export class Slides {
    constructor(...data) {
        this.content = data;
    }
    content;
}
export class ListStyle {
    constructor(listStyle) {
        Object.assign(this, listStyle);
    }
    bordered;
    dense;
    dark;
    padding;
}
export class Menu {
    header = {
        reveal: true,
        bordered: false,
        elevated: true,
        class: "fixed-nav"
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
    closeBtn = new Action({
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
    openBtn = new Action({
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
