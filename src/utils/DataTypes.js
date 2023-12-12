import { Action } from "./types";
export class Slides {
    constructor(...data) {
        this.content = data;
    }
}
export class ListStyle {
    constructor(listStyle) {
        Object.assign(this, listStyle);
    }
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
            name: "closeMenuBtn",
            icon: 'close',
            event: (drawerOpen) => { drawerOpen = !drawerOpen; },
            onResult: [],
            onError: [],
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
            name: "menuBtn",
            icon: 'menu',
            event: (drawerOpen) => { drawerOpen = !drawerOpen; },
            onResult: [],
            onError: [],
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
}
