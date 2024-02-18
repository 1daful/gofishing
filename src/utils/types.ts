import { Component } from "vue"
import { CarouselStyle, DataPoint, HorizontalPosition, Slides, VerticalPosition, ViewGuard } from "./DataTypes";
import { IDataView } from "../../model/IDataView";

export function isType<T>(obj: any, classType: new (...args: any[]) => T): obj is T {
    return obj instanceof classType;
}

// Define a type guard function for View
export function isView(section: ViewSection): section is View {
    return (section as View)?.insert !== undefined;
}

// Define a type guard function for DataType
export function isDataType(section: ViewSection): section is DataType {
    return (section as DataType)?.items !== undefined;
}

export function isDataList(section: ViewSection): section is DataList {
    return (section as DataList)?.items && (section as DataList)?.actions !== undefined;
}

// Define a type guard function for QuestionType
export function isQuestionType(section: ViewSection): section is QuestionType {
    return (section as QuestionType)?.content !== undefined;
}

// Define a type guard function for QuestionType
export function isNavList(section: ViewSection): section is NavList {
    return (section as NavList)?.content !== undefined;
}

// Define a type guard function for VComponent
export function isVComponent(section: ViewSection): section is VComponent {
    return (section as VComponent)?.content !== undefined;
    //return 'content' in section;
}

// Define a type guard function for VComponent
export function isComponent(section: ViewSection): section is Component {
    return (section as Component) !== undefined;
}

// Define a type guard function for IView
export function isIView(section: any): section is IView {
    return (section as IView)?.sections !== undefined;
}

// Function to check if a value is a valid SecTionType
function isSectionType(value: string): value is SecTionType {
    return value === 'x-section' || value === 'y-section';
}

// Function to check if a value is a valid TabType
export function isTabType(value: string): value is TabType {
    return value === 'x-tab' || value === 'y-tab';
}

export function isActionString(value: any): value is ActionString {
    return value === 'submit' || value === 'filter'
}

export type ViewAccess = 'public' | 'private' | 'mutual'

export class Filters{
    constructor(filters: Filters) {
        Object.assign(this, filters)
    }
    view?: ViewAccess
    indexName!: string
    options?: OptionsType
    rangeList?: string[]
    checks?: {
        attribute: string,
        values: {
            label: string,
            iChecked?: string,
            iUndetermined?: string,
            iUnchecked?: string,
        }[]
    }[]
}

export type WidgetName = 'Header' | 'SidebarLeft' | 'SidebarRight' | 'Footer' | 'Main'


export type NavLink = {
    icon?: string,
    path: string,
    name: string,
    params?: any,
    query?: any,
    children?: NavLink[],
    page?: ViewSection,
    class?: string
    view?: ViewAccess
}

export class NavList {
    constructor(navList: NavList) {
        Object.assign(this, navList)
    }

    id!: string
    content!: NavLink[]
    navType!: TabType
    style?: {
        bordered?: boolean,
        dense?: boolean,
        dark?: boolean
    }
    class?: string
    view?: ViewAccess
}

export type LayoutType = 'Grid' | 'Relative' | 'Vertical' | 'Horizontal'

export type DataContent = {
    [x: string]: any;
    icon?: string;
    thumbnail?: string;
    avatar?: string;
    label?: string;
    action?: Action
    horizontal?: boolean
    class?: string
    position?: VerticalPosition | HorizontalPosition
    view?: ViewAccess
}

export type DataItem = {
    header?: DataContent[] | (DataItem | DataType)[],
    center?: DataContent[] | (DataItem | DataType)[],
    footer?: DataContent[] | (DataItem | DataType)[],
    left?: DataContent[] | (DataItem | DataType)[],
    right?: DataContent[] | (DataItem | DataType)[],
}

export type CardStyle = {
    styles: Object
    bordered: boolean
    flat?: boolean
    squared?: boolean
    dark?: boolean
    actionsAlign: 'left' | 'right' | 'center' | 'between' | 'around' | 'evenly' | 'stretch'
    view?: ViewAccess
}

export class DataGraph {
    constructor(data: DataGraph) {
        Object.assign(this, data)
    }
    chartType?: string
    series?: []
    label?: []
    data?: DataPoint[]
    xaxisType!: 'category' | 'number'
    view?: ViewAccess
}

export class DataTable {
    constructor(data: DataTable) {
        Object.assign(this, data)   
    }
    //[x: string]: any;
    id?: any;
    columns!: {
        name: string,
        align: "left" | "right" | "center",
        label: string,
        field: string,
        required?: boolean,
        sortable: boolean
    }[]
    rows!: Record<string, any>[]
    setHeader?: boolean;
    style?: CardStyle | CarouselStyle
    class?: string
    actions?: Action[]
    separator?: string
    computeAction?: Function
    viewGuard?: Action
}

export class DataType {
    constructor(data: DataType) {
        Object.assign(this, data)
        
    }
    //[x: string]: any;
    id?: any;
    overlay?: string;
    items!: DataItem
    setHeader?: boolean;
    style?: CardStyle | CarouselStyle
    class?: string
    actions?: Action[]
    card?: boolean = true
    actionOverlay?: Function | ActionString //the main action when the whole card is clicked
    computeAction?: Function
    viewGuard?: Action
}

export class DataList {
    constructor(data: DataType) {
        Object.assign(this, data)  
    }
    items!: DataType[]
    actions!: Action[]
}

export type ActionStyle = {
    type?: 'flat' | 'glossy' | 'push' | 'outline' | 'unelevated'
    shape?: 'round' | 'rounded' | 'square'
    dense?: boolean,
    size?: string, 
    ripple?: boolean
    fab?: 'fab' | 'fab-mini'
    stack?: boolean
    stretch?: boolean
    align?: 'center' | 'right' | 'left' | 'around' | 'between' | 'evenly'
    noWrap?: boolean
    noCaps?: boolean,
    color?: string,
    ariaLabel?: string
}

export type ActionState = {
    loading: boolean
    percentage: number
    darkPercentage?: boolean
    diasble?: boolean
}

export type ActionString = 'Submit' | 'Filter' | 'Route' | 'Modal' | 'Upload'

export class Action {
    constructor(action: Action) {
        Object.assign(this, action)
    }
    id?: string
    type?: string
    label?: string
    icon?: string
    iconRight?: string
    args?: any
    event!: Function | ActionString
    onResult?: Function
    onError?: Function
    style?: ActionStyle
    state?: ActionState
    class?: string
    viewGuard?: ViewGuard
}

export class ActionGroup {
    constructor(actions: ActionGroup) {
        Object.assign(this, actions)
    }
    name?: string
    actions!: Action[]
    style?: ActionStyle
    state?: ActionState
    class?: string
    navType!: TabType
    viewGuard?: Action
}
    
export class Video {
    constructor(video: Video) {
        Object.assign(this, video)
    }
    private title!: string;
    private duration!: number;
    private url!: string;
    private isPlaying!: boolean;
    private publishedDate!: Date;
    private description!: string;
    private thumbnailUrl!: string;

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
    id!: string
}

export class Notification {}

export class Blog {}

export class Music {}

export class Product {}

export class Book {}

export class Picture {}

export class Comment {}

export class Text {}

export class Calendar {
    year!: string
    month!: string
    day!: number
    date!: Date
}

export class Table {}

export class Form {}

export type InputType = 'number' | 'search' | 'textarea' | 'time' | 'text' | 'password' | 'email' | 'tel' | 'file' | 'url' | 'date' | 'schedule'

export type OptionsType = ({
    id?: string | number,
    label: string,
    inputType?: InputType,
    children?: OptionsType,
    params?: any
} | string)[]

/*export class QuestionType {
    constructor(data: {
        id: string,
        title: string,
        index: number,
        compute?: Function,
        class?: string,
        content: {
            question: string,
            inputType?: InputType
            options?: OptionsType
            component?: Component,
            answer: any,
            action?: Action,
            name: string,
            image?: string,
            icon?: string,
            rules?: any
        }[],
        icon?: string,
        description?: string,
        actions: Record<string, Action>
        meta?: any
    }) {
        this.id = data.id
        this.title = data.title;
        this.index = data.index;
        this.content = data.content;
        this.icon = data.icon;
        this.description = data.description;
        this.class = data.class
        if (isActionString(data.actions)) {
            this.actions = {
                submit: new Action({
                label: data.actions,
                event: data.actions,
                onResult() {},
                onError() {},
                args: [this.content],
                icon: data.actions
            })}
        }
        else {
            this.actions = data.actions
        }
        this.meta = data.meta;
    }
    id: string;
    title: string;
    index: number;
    compute?: Function;
    class?: string;
    content: {
        question: string;
        inputType?: 'number' | 'search' | 'textarea' | 'time' | 'text' | 'password' | 'email' | 'tel' | 'file' | 'url' | 'date' | 'schedule';
        component?: Component;
        answer: any;
        options?: OptionsType;
        action?: Action;
        name: string;
        image?: string;
        icon?: string,
        rules?: any,
    }[];
    icon?: string;
    description?: string;
    actions: Record<string, Action>
    meta?: any
    view?: ViewAccess
}*/

export class QuestionType {
    constructor(question: QuestionType) {
        Object.assign(this, question)
    }
    id!: string;
    title!: string;
    index!: number;
    compute?: Function;
    class?: string;
    content!: {
        question: string;
        inputType?: 'number' | 'search' | 'textarea' | 'time' | 'text' | 'password' | 'email' | 'tel' | 'file' | 'url' | 'date' | 'schedule';
        component?: Component;
        options?: OptionsType;
        action?: Action;
        name: string;
        image?: string;
        icon?: string,
        rules?: any,
    }[];
    icon?: string;
    description?: string;
    actions!: Record<string, Action>
    meta?: any
    viewGuard?: ViewGuard
}

/*export class FormType {
    constructor(name: string, submit: Action | ActionString, content: QuestionType[]) {
        this.name = name
        this.content = content
        if (isActionString(submit)) {
            this.actions = {
                submit: new Action({
                    label: submit,
                    event: submit,
                    args: [this.content],
                    icon: submit,
                    onResult() {},
                    onError() {}
                })
            }
        }
        else {
            this.actions = {submit}
        }
    }
    name: string
    actions: Record<string, Action>
    content: QuestionType[]
    viewGuard?: Action
}*/
export class FormType {
    constructor(form: FormType) {
        Object.assign(this, form)
    }
    name!: string
    actions!: Record<string, Action>
    content!: QuestionType[]
    viewGuard?: Action
}

export type VComponent = {
    content: Component
    props?: any
    view?: ViewAccess
}

export interface IView {
    heading?: string
    id: string
    layout: LayoutType
    sections: ViewSection[]
    icon?: string
    postion?: {y: number, x: number}
    size?: string
    viewport?: string
    children? : ViewSection[]
    class?: string
    viewGuard?: Action
}

export type ViewSection = View | DataType | QuestionType | VComponent | Component | NavList | Slides | DataGraph | DataTable

function insert(view: IView, ...content: ViewSection[]) {
    view.sections?.push(...content)
}

/*function get(view: IView, id: string) {
    let item = view.sections.find(item => { if(isType(item, View) || isType(item, PageView)) item.id === 2})
}*/

//Abstract class View
export class View implements IView {
    /*constructor() {
        if (this.constructor === View) {
            throw new Error("Can't instantiate abstract class!");
        }
    }*/
    constructor(view: View) {
        Object.assign(this, view);
    }
    heading?: string;
    sections: ViewSection[] = []
    icon?: string | undefined;
    postion?: { y: number; x: number; } | undefined;
    viewport?: string | undefined;
    id!: string
    layout!: LayoutType
    size!: string
    navType!: SecTionType | TabType
    viewGuard?: Action

    insert? = (...content: ViewSection[]) => {
        insert(this, ...content)
    }
}

export class TabView extends View {
    constructor(view: View) {
        super(view)
    }

    sections: ViewSection[] = []
    view?: ViewAccess
}

export class SectionView extends View {
    constructor(view: View) {
        super(view)
    }
    sections: ViewSection[] = []
    view?: ViewAccess
}

export class PageView implements IView {
    constructor(view: IView) {
        Object.assign(this, view);
    }
    id!: string;
    layout!: LayoutType;
    sections: ViewSection[] = [];
    children: (PageView | IDataView)[] = []
    view?: ViewAccess
    /*insert(...content: ViewSection[]){
        content.forEach(element => {
            if(element instanceof View) {
                if(isSectionType(element.navType)) {
                    this.sections?.push(element)
                }
                if(isTabType(element.navType)) {
                    this.navMenus?.push(element)
                }
            }
        });
    }*/
    insert? = (...content: ViewSection[]) => {
        insert(this, ...content)
    }
}

export type SecTionType = 'top' | 'bottom' | 'left' | 'right' | 'center'

export type TabType ='top' | 'bottom' | 'left' | 'right'

export type DataSection = {
    navType: string;
    name: string,
    content: DataType[] | DataSection[],
    view?: ViewAccess
}

export type Recommendation = 'popular' | 'latest' | 'recommended' | 'related'

export interface Post {
    id: string;
    title: string;
    content: string;
    author: User;
    createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  posts: Post[];
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
}

export type Argument = {
    name: string,
    value: string
}

export type Selection = {
    arguments?: Argument[],
    name: string,
    selections?: Selection[]
}

export interface IDataType{
    new(data: any): DataType
}

export type Client = {
    name: string,
    auth: any
}

export type Privacy = 'mutual' | 'private'
export type Colval = {
    col: string,
    val: any
}