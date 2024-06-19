export function isType(obj, classType) {
    return obj instanceof classType;
}
export function isView(section) {
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
}
export function isComponent(section) {
    return section !== undefined;
}
export function isIView(section) {
    return section?.sections !== undefined;
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
}
export class NavList {
    constructor(navList) {
        Object.assign(this, navList);
    }
    sections;
    id;
    content;
    navType;
    style;
    class;
    view;
}
export class DataGraph {
    constructor(data) {
        Object.assign(this, data);
    }
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
}
export class DataTable {
    constructor(data) {
        Object.assign(this, data);
    }
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
}
export class DataList {
    constructor(data) {
        Object.assign(this, data);
    }
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
}
export class Action {
    constructor(action) {
        Object.assign(this, action);
    }
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
}
export class ActionGroup {
    constructor(actions) {
        Object.assign(this, actions);
    }
    name;
    actions;
    style;
    state;
    class;
    navType;
    viewGuard;
}
export class Video {
    constructor(video) {
        Object.assign(this, video);
    }
    title;
    duration;
    url;
    isPlaying;
    publishedDate;
    description;
    thumbnailUrl;
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
    id;
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
    year;
    month;
    day;
    date;
}
export class Table {
}
export class Form {
}
export class QuestionType {
    constructor(question) {
        Object.assign(this, question);
    }
    sections;
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
}
export class FormType {
    constructor(form) {
        Object.assign(this, form);
    }
    sections;
    id;
    actions;
    content;
    viewGuard;
}
export class VComponent {
    constructor(comp) {
        Object.assign(this, comp);
    }
    id;
    sections;
    content;
    props;
    view;
}
function insert(view, ...content) {
    view.sections?.push(...content);
}
export class TabView extends View {
    constructor(view) {
        super(view);
    }
    sections = [];
    view;
}
export class SectionView extends View {
    constructor(view) {
        super(view);
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
