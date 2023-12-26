export function isType(obj, classType) {
    return obj instanceof classType;
}
export function isView(section) {
    return section.insert !== undefined;
}
export function isDataType(section) {
    return section.items !== undefined;
}
export function isQuestionType(section) {
    return section.content !== undefined;
}
export function isNavList(section) {
    return section.content !== undefined;
}
export function isVComponent(section) {
    return section.content !== undefined;
}
export function isComponent(section) {
    return section !== undefined;
}
export function isIView(section) {
    return section.sections !== undefined;
}
function isSectionType(value) {
    return value === 'x-section' || value === 'y-section';
}
export function isTabType(value) {
    return value === 'x-tab' || value === 'y-tab';
}
export function isActionString(value) {
    return value === 'submit' || value === 'filter';
}
export class NavList {
    constructor(navList) {
        Object.assign(this, navList);
    }
}
export class DataType {
    constructor(data) {
        this.card = true;
        Object.assign(this, data);
    }
}
export class Action {
    constructor(action) {
        Object.assign(this, action);
    }
}
export class ActionGroup {
    constructor(actions) {
        Object.assign(this, actions);
    }
}
export class Video {
    constructor(video) {
        Object.assign(this, video);
    }
    play() {
        if (!this.isPlaying) {
            console.log(`Playing ${this.title}`);
            this.isPlaying = true;
        }
    }
    pause() {
        if (this.isPlaying) {
            console.log(`Pausing ${this.title}`);
            this.isPlaying = false;
        }
    }
    stop() {
        if (this.isPlaying) {
            console.log(`Stopping ${this.title}`);
            this.isPlaying = false;
        }
    }
    getInfo() {
        return {
            title: this.title,
            duration: this.duration,
            url: this.url,
            publishedDate: this.publishedDate,
            description: this.description,
            thumbnailUrl: this.thumbnailUrl
        };
    }
}
export class Notification {
}
export class Blog {
}
export class Music {
}
export class Product {
}
export class Book {
}
export class Picture {
}
export class Comment {
}
export class Text {
}
export class Calendar {
}
export class Table {
}
export class Form {
}
export class QuestionType {
    constructor(data) {
        this.title = data.title;
        this.index = data.index;
        this.content = data.content;
        this.icon = data.icon;
        this.description = data.description;
        if (isActionString(data.actions)) {
            this.actions = {
                submit: new Action({
                    label: data.actions,
                    event: data.actions,
                    onResult: [],
                    onError: [],
                    args: [this.content],
                    icon: data.actions
                })
            };
        }
        else {
            this.actions = data.actions;
        }
        this.meta = data.meta;
    }
}
export class FormType {
    constructor(name, submit, content) {
        this.name = name;
        this.content = content;
        if (isActionString(submit)) {
            this.actions = {
                submit: new Action({
                    label: submit,
                    event: submit,
                    args: [this.content],
                    icon: submit,
                    onResult: [],
                    onError: []
                })
            };
        }
        else {
            this.actions = { submit };
        }
    }
}
function insert(view, ...content) {
    var _a;
    (_a = view.sections) === null || _a === void 0 ? void 0 : _a.push(...content);
}
export class View {
    constructor(view) {
        this.sections = [];
        this.insert = (...content) => {
            insert(this, ...content);
        };
        Object.assign(this, view);
    }
}
export class TabView extends View {
    constructor(view) {
        super(view);
        this.sections = [];
    }
}
export class SectionView extends View {
    constructor(view) {
        super(view);
        this.sections = [];
    }
}
export class PageView {
    constructor(view) {
        this.sections = [];
        this.children = [];
        this.insert = (...content) => {
            insert(this, ...content);
        };
        Object.assign(this, view);
    }
}
export const Layout = {
    top: new View({
        id: 'top',
        layout: 'Grid',
        navType: 'top',
        sections: [],
        size: 'col-12'
    }),
    bottom: new View({
        id: 'bottom',
        layout: 'Grid',
        navType: 'bottom',
        sections: [],
        size: 'col-12'
    }),
    left: new View({
        id: 'left',
        layout: 'Grid',
        navType: 'left',
        sections: [],
        size: 'col-4'
    }),
    right: new View({
        id: 'right',
        layout: 'Grid',
        navType: 'right',
        sections: [],
        size: 'col-4'
    }),
    center: new View({
        id: 'center',
        layout: 'Grid',
        navType: 'center',
        sections: [],
        size: 'col-8'
    })
};
