export function isType(obj, classType) {
    return obj instanceof classType;
}
export function isView(section) {
<<<<<<< HEAD
    return (section === null || section === void 0 ? void 0 : section.insert) !== undefined;
}
export function isDataType(section) {
    return (section === null || section === void 0 ? void 0 : section.items) !== undefined;
}
export function isDataList(section) {
    return (section === null || section === void 0 ? void 0 : section.items) && (section === null || section === void 0 ? void 0 : section.actions) !== undefined;
}
export function isQuestionType(section) {
    return (section === null || section === void 0 ? void 0 : section.content) !== undefined;
}
export function isNavList(section) {
    return (section === null || section === void 0 ? void 0 : section.content) !== undefined;
}
export function isVComponent(section) {
    return (section === null || section === void 0 ? void 0 : section.content) !== undefined;
=======
    return section?.insert !== undefined;
}
export function isDataType(section) {
    return section?.items !== undefined;
}
export function isDataList(section) {
    return section?.items && section?.actions !== undefined;
}
export function isQuestionType(section) {
    return section?.content !== undefined;
}
export function isNavList(section) {
    return section?.content !== undefined;
}
export function isVComponent(section) {
    return section?.content !== undefined;
>>>>>>> master
}
export function isComponent(section) {
    return section !== undefined;
}
export function isIView(section) {
<<<<<<< HEAD
    return (section === null || section === void 0 ? void 0 : section.sections) !== undefined;
=======
    return section?.sections !== undefined;
>>>>>>> master
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
export class View {
    constructor(view) {
<<<<<<< HEAD
        this.sections = [];
        this.insert = (...content) => {
            insert(this, ...content);
        };
        Object.assign(this, view);
    }
}
export class Filters {
    constructor(filters) {
        this.layout = 'Grid';
        Object.assign(this, filters);
    }
=======
        Object.assign(this, view);
    }
    heading;
    sections = [];
    icon;
    postion;
    viewport;
    id;
    layout;
    size;
    navType;
    viewGuard;
    insert = (...content) => {
        insert(this, ...content);
    };
}
export class Filters {
    constructor(filters) {
        Object.assign(this, filters);
    }
    heading;
    id;
    sections;
    icon;
    postion;
    viewport;
    class;
    viewGuard;
    layout = 'Grid';
    size;
    actions;
    view;
    indexName;
    options;
    rangeList;
    checks;
>>>>>>> master
}
export class NavList {
    constructor(navList) {
        Object.assign(this, navList);
    }
<<<<<<< HEAD
=======
    sections;
    id;
    content;
    navType;
    style;
    class;
    view;
>>>>>>> master
}
export class DataGraph {
    constructor(data) {
        Object.assign(this, data);
    }
<<<<<<< HEAD
=======
    heading;
    id;
    layout;
    icon;
    postion;
    size;
    viewport;
    class;
    viewGuard;
    sections;
    chartType;
    series;
    label;
    data;
    xaxisType;
    view;
>>>>>>> master
}
export class DataTable {
    constructor(data) {
        Object.assign(this, data);
    }
<<<<<<< HEAD
}
export class DataType {
    constructor(data) {
        this.card = true;
        Object.assign(this, data);
    }
=======
    sections;
    id;
    columns;
    rows;
    setHeader;
    style;
    class;
    actions;
    separator;
    computeAction;
    viewGuard;
}
export class DataType {
    constructor(data) {
        Object.assign(this, data);
    }
    sections;
    id;
    overlay;
    items;
    setHeader;
    style;
    class;
    actions;
    card = true;
    actionOverlay;
    computeAction;
    viewGuard;
>>>>>>> master
}
export class DataList {
    constructor(data) {
        Object.assign(this, data);
    }
<<<<<<< HEAD
=======
    heading;
    id;
    layout;
    icon;
    postion;
    size;
    viewport;
    class;
    viewGuard;
    sections;
    items;
    actions;
>>>>>>> master
}
export class Action {
    constructor(action) {
        Object.assign(this, action);
    }
<<<<<<< HEAD
=======
    id;
    type;
    label;
    icon;
    iconRight;
    args;
    event;
    onResult;
    onError;
    style;
    state;
    class;
    viewGuard;
>>>>>>> master
}
export class ActionGroup {
    constructor(actions) {
        Object.assign(this, actions);
    }
<<<<<<< HEAD
=======
    name;
    actions;
    style;
    state;
    class;
    navType;
    viewGuard;
>>>>>>> master
}
export class Video {
    constructor(video) {
        Object.assign(this, video);
    }
<<<<<<< HEAD
=======
    title;
    duration;
    url;
    isPlaying;
    publishedDate;
    description;
    thumbnailUrl;
>>>>>>> master
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
export class User {
<<<<<<< HEAD
=======
    id;
>>>>>>> master
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
<<<<<<< HEAD
=======
    year;
    month;
    day;
    date;
>>>>>>> master
}
export class Table {
}
export class Form {
}
export class QuestionType {
    constructor(question) {
        Object.assign(this, question);
    }
<<<<<<< HEAD
=======
    viewGuard;
    ViewSection;
    id;
    title;
    index;
    compute;
    class;
    content;
    icon;
    description;
    actions;
    meta;
    viewGuard;
>>>>>>> master
}
export class FormType {
    constructor(form) {
        Object.assign(this, form);
    }
<<<<<<< HEAD
=======
    sections;
    id;
    actions;
    content;
    viewGuard;
>>>>>>> master
}
export class VComponent {
    constructor(comp) {
        Object.assign(this, comp);
    }
<<<<<<< HEAD
}
function insert(view, ...content) {
    var _a;
    (_a = view.sections) === null || _a === void 0 ? void 0 : _a.push(...content);
=======
    id;
    sections;
    content;
    props;
    view;
}
function insert(view, ...content) {
    view.sections?.push(...content);
>>>>>>> master
}
export class TabView extends View {
    constructor(view) {
        super(view);
<<<<<<< HEAD
        this.sections = [];
    }
=======
    }
    sections = [];
    view;
>>>>>>> master
}
export class SectionView extends View {
    constructor(view) {
        super(view);
<<<<<<< HEAD
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
=======
    }
    sections = [];
    view;
}
export class PageView {
    constructor(view) {
        Object.assign(this, view);
    }
    id;
    layout;
    sections = [];
    children = [];
    view;
    insert = (...content) => {
        insert(this, ...content);
    };
>>>>>>> master
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
