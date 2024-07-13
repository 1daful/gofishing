import { Action } from "./types";
export class Slides {
    constructor(...data) {
        this.content = data;
    }
<<<<<<< HEAD
=======
    content;
>>>>>>> master
}
export class ListStyle {
    constructor(listStyle) {
        Object.assign(this, listStyle);
    }
<<<<<<< HEAD
}
export class Menu {
    constructor() {
        this.header = {
            reveal: true,
            bordered: false,
            elevated: true,
            class: "fixed-nav"
        };
        this.toolBar = {
            class: "justify-end"
        };
        this.brand = {
            class: ""
        };
        this.hero = {
            backgroundColor: ""
        };
        this.closeBtn = new Action({
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
        this.openBtn = new Action({
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
=======
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
>>>>>>> master
}
