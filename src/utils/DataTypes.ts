import { CardStyle, ImageStyle } from "./typeStyle";
import { ActionState, ActionString, Colval, DataType, LayoutType, OnResult, ViewSection } from "./types"
import { Component, reactive } from "vue"

/*export function UseComponent<T>(comp: T){
  return comp

}*/

  class Comp{
    static getComp<T>(arg0: { layout: string; props: never[]; sections: never[]; }) {
      throw new Error("Method not implemented.");
    }
    constructor(obj: Object) {
      Object.assign(this, obj)
    }
    comp!: any
  }

  // Define a constructor type
type Constructor<T = {}> = new (...args: any[]) => T;

// Generic mixin function that adds properties to a class
function AddProperties<TBase extends Constructor>(Base: TBase, propertiesToAdd: object) {
  return class extends Base {
    constructor(...args: any[]) {
      super(...args);

      // Dynamically add properties to the instance
      Object.assign(this, propertiesToAdd);
    }
  };
}

  function getComp<T extends Object>(obj: T): T { 
    let comp = new Comp(obj)
  
    Object.assign(comp, obj)
    return comp as unknown as T
  }
 
export class Slides {
    constructor(...data: DataType[]) {
        this.content = data
    }
    content!: DataType[]
}

export type Slide = {
    name: string
    component?: VComponent | Component
    img: string
    content: any
    style?: CarouselStyle
}

export type CarouselStyle = {
    transitionPrev?: 'fade' | 'slide-down' | 'scale',
    transitionNext?: 'fade' | 'slide-down' | 'scale',
    swipeable?: boolean,
    animated?: boolean,
    controlTextColor?: string,
    controlColor?: string,
    controlType?: 'regular' | 'flat' | 'outline' | 'push' | 'unelevated',
    navigation?: boolean,
    padding?: boolean,
    arrows?: boolean,
    height?: string,
    class?: ClassStyle
}

export type HeaderStyle =  {
    reveal?: boolean,
    bordered?: boolean,
    elevated?: boolean,
    class?: ClassStyle
}

export type ListStyle = & {
    bordered?: boolean
    dense?: boolean
    dark?: boolean
    padding?: boolean
}

export type Hero =  {
    title: string,
    subtitle: string,
    buttonText: string,
    class: string
}

export type HorizontalPosition = 'left' | 'center' | 'right'
export type VerticalPosition = 'top' | 'middle' | 'bottom'

export class Menu {
    header: Partial<HeaderStyle> = {
        reveal: true,
        bordered: false,
        elevated: true,
        class: {
            custom: "fixed-nav",
            margin: 'q-ma-auto'
        }
    }

    toolBar = {
        class: "justify-end"
    }

    brand = {
        class: ""
    }

    hero = {
        backgroundColor: ""
    }

    listStyle?: ListStyle

    closeBtn: Action = getComp<Action>({
        id: "closeMenuBtn",
        icon: 'close',
        event: (drawerOpen: boolean)=> {drawerOpen = !drawerOpen},
        style: {
          size: "20px",
          color: "red",
          type: "flat",
          shape: "round",
          dense: true,
        },
        class: "lt-md"
    })
    openBtn: Action = getComp<Action>({
        id: "menuBtn",
        icon: 'menu',
        event: (drawerOpen: boolean)=> {drawerOpen = !drawerOpen},
        style: {
          size: "20px",
          color: "primary",
          type: "flat",
          shape: "round",
          dense: true,
        },
        class: "lt-md"
    })
}

export type DataPoint = {
    x: string | number | Date,
    y: string | number
}

export type Series = {
    type: 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'scatter' | 'bubble' | 'heatmap' | 'radialBar' | 'candlestick'
    data: DataPoint[],
    marker?: any
}[]

export type graphOptions = {
    strokes: any,
    markers: number
}

export type ViewGuard = {
    userColval?: Colval,
    colval?: Colval,
    type?: string
} | boolean

type Position =
  | 'fullscreen'
  | 'fixed'
  | 'absolute'
  | 'fixed-center'
  | 'absolute-center'
  | 'fixed-top'
  | 'absolute-top'
  | 'fixed-right'
  | 'absolute-right'
  | 'fixed-bottom'
  | 'absolute-bottom'
  | 'fixed-left'
  | 'absolute-left'
  | 'fixed-top-left'
  | 'absolute-top-left'
  | 'fixed-top-right'
  | 'absolute-top-right'
  | 'fixed-bottom-left'
  | 'absolute-bottom-left'
  | 'fixed-bottom-right'
  | 'absolute-bottom-right'
  | 'relative-position'
  | 'float-left'
  | 'pull-left'
  | 'float-right'
  | 'pull-right'
  | 'on-left'
  | 'on-right'
  | 'vertical-top'
  | 'vertical-middle'
  | 'vertical-bottom';


  type TextAlignment = 
  | 'text-right'
  | 'text-left'
  | 'text-center'
  | 'text-justify';

type TextTransformation = 
  | 'text-uppercase'
  | 'text-lowercase'
  | 'text-capitalize';

type TextFontWeight = 
  | 'text-weight-thin'
  | 'text-weight-light'
  | 'text-weight-regular'
  | 'text-weight-medium'
  | 'text-weight-bold'
  | 'text-weight-bolder';

type TextFontStyle = 'text-italic'
| 'quote'
| 'block'
| 'no-margin'
| 'no-padding';;

type TextTruncation = 'text-truncate';

type TextType = 
  | 'text-h1'
  | 'text-h2'
  | 'text-h3'
  | 'text-h4'
  | 'text-h5'
  | 'text-h6'
  | 'text-subtitle1'
  | 'text-subtitle2'
  | 'text-body1'
  | 'text-body2'
  | 'text-caption'
  | 'text-overline'
  | 'caption'
  | 'light-paragraph'
  | 'thin-paragraph';


type Typography = {
    alignment: TextAlignment,
    transformation: TextTransformation,
    weight: TextFontWeight,
    font: TextFontStyle,
    truncate: TextTruncation,
    type: TextType
}

type Shadow =
  | 'no-shadow'
  | 'inset-shadow'
  | 'shadow-1'
  | 'shadow-2'
  | 'shadow-3'
  | 'shadow-4'
  | 'shadow-5'
  | 'shadow-6'
  | 'shadow-7'
  | 'shadow-8'
  | 'shadow-9'
  | 'shadow-10'
  | 'shadow-11'
  | 'shadow-12'
  | 'shadow-13'
  | 'shadow-14'
  | 'shadow-15'
  | 'shadow-16'
  | 'shadow-17'
  | 'shadow-18'
  | 'shadow-19'
  | 'shadow-20'
  | 'shadow-21'
  | 'shadow-22'
  | 'shadow-23'
  | 'shadow-24'
  | 'shadow-up-1'
  | 'shadow-up-2'
  | 'shadow-up-3'
  | 'shadow-up-4'
  | 'shadow-up-5'
  | 'shadow-up-6'
  | 'shadow-up-7'
  | 'shadow-up-8'
  | 'shadow-up-9'
  | 'shadow-up-10'
  | 'shadow-up-11'
  | 'shadow-up-12'
  | 'shadow-up-13'
  | 'shadow-up-14'
  | 'shadow-up-15'
  | 'shadow-up-16'
  | 'shadow-up-17'
  | 'shadow-up-18'
  | 'shadow-up-19'
  | 'shadow-up-20'
  | 'shadow-up-21'
  | 'shadow-up-22'
  | 'shadow-up-23'
  | 'shadow-up-24'
  | 'shadow-transition';

  type Padding = 
  | 'q-pa-none' | 'q-pa-xs' | 'q-pa-sm' | 'q-pa-md' | 'q-pa-lg' | 'q-pa-xl'
  | 'q-pt-none' | 'q-pt-xs' | 'q-pt-sm' | 'q-pt-md' | 'q-pt-lg' | 'q-pt-xl'
  | 'q-pr-none' | 'q-pr-xs' | 'q-pr-sm' | 'q-pr-md' | 'q-pr-lg' | 'q-pr-xl'
  | 'q-pb-none' | 'q-pb-xs' | 'q-pb-sm' | 'q-pb-md' | 'q-pb-lg' | 'q-pb-xl'
  | 'q-pl-none' | 'q-pl-xs' | 'q-pl-sm' | 'q-pl-md' | 'q-pl-lg' | 'q-pl-xl'
  | 'q-px-none' | 'q-px-xs' | 'q-px-sm' | 'q-px-md' | 'q-px-lg' | 'q-px-xl'
  | 'q-py-none' | 'q-py-xs' | 'q-py-sm' | 'q-py-md' | 'q-py-lg' | 'q-py-xl';

  type Margin = 
  | 'q-ma-none' | 'q-ma-auto' | 'q-ma-xs' | 'q-ma-sm' | 'q-ma-md' | 'q-ma-lg' | 'q-ma-xl'
  | 'q-mt-none' | 'q-mt-auto' | 'q-mt-xs' | 'q-mt-sm' | 'q-mt-md' | 'q-mt-lg' | 'q-mt-xl'
  | 'q-mr-none' | 'q-mr-auto' | 'q-mr-xs' | 'q-mr-sm' | 'q-mr-md' | 'q-mr-lg' | 'q-mr-xl'
  | 'q-mb-none' | 'q-mb-auto' | 'q-mb-xs' | 'q-mb-sm' | 'q-mb-md' | 'q-mb-lg' | 'q-mb-xl'
  | 'q-ml-none' | 'q-ml-auto' | 'q-ml-xs' | 'q-ml-sm' | 'q-ml-md' | 'q-ml-lg' | 'q-ml-xl'
  | 'q-mx-none' | 'q-mx-auto' | 'q-mx-xs' | 'q-mx-sm' | 'q-mx-md' | 'q-mx-lg' | 'q-mx-xl'
  | 'q-my-none' | 'q-my-auto' | 'q-my-xs' | 'q-my-sm' | 'q-my-md' | 'q-my-lg' | 'q-my-xl';

  type Visibility =
  'hidden'
  | 'invisible'
  | 'transparent'
  | 'disabled'
  | 'dimmed'
  | 'light-dimmed'
  | 'highlight-and-fade'
  | 'ellipsis'
  | 'ellipsis-2-lines'
  | 'ellipsis-3-lines'
  | 'z-top'
  | 'z-max'
  | 'z-absolute';

  type Animate =
  | 'animate-spin'
  | 'animate-spin-reverse'
  | 'animate-blink'
  | 'animate-pop'
  | 'animate-scale'
  | 'animate-fade'
  | 'animate-bounce'

  type PlatformOnly =
  'desktop-only'
  | 'mobile-only'
  | 'cordova-only'
  | 'electron-only'
  | 'touch-only'
  | 'no-touch-only'
  | 'mat-only'
  | 'ios-only'
  | 'platform-ios-only'
  | 'platform-android-only'
  | 'within-iframe-only'

  type PlatformHide =
  'desktop-hide'
  | 'mobile-hide'
  | 'cordova-hide'
  | 'electron-hide'
  | 'touch-hide'
  | 'no-touch-hide'
  | 'mat-hide'
  | 'ios-hide'
  | 'platform-ios-hide'
  | 'platform-android-hide'
  | 'within-iframe-hide'

  type Orientation =
  'orientation-portrait' | 'orientation-landscape'

  type WindowWidth =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'lt-sm'
  | 'lt-md'
  | 'lt-lg'
  | 'lt-xl'
  | 'gt-xs'
  | 'gt-sm'
  | 'gt-md'
  | 'gt-lg';

  type ClassStyle = Partial<{
    margin: Margin,
    padding: Padding,
    shadow: Shadow,
    position: Position,
    orientation: Orientation,
    width: WindowWidth,
    visibility: Visibility,
    animate: Animate,
    custom: string
  }>

  interface IComponent {
    component: VComponent
  }

  type VComponent = {
    id?: string,
    props?: Record<string, any>
    events?: Record<string, any>
    sections?: ViewSection
    component?: Component
    viewGuard?: ViewGuard
    style?:  Record<string, any>
    class?: any
    watcher?: Function
  }

  type View = VComponent & {
    sections: ViewSection
    layout: LayoutType
    card?: boolean | CardStyle
  }

  type Input = VComponent & {
    model: any
    label: string
    icon?: string
  }

  type Visual = VComponent & {
    label?: string
    icon?: string
  }

  type Loader = VComponent & {
    loading: boolean
  }

  type FormView = View & {
    title: Label
    actions: Record<string, Action>
  }

  type FormList = View & {
    title: Label
    forms: FormView[]
    actions: Record<string, Action>
  }

  type DataView = View & {
    title: Label
    dataContents: Record<string, DataContent>
    thumbnail?: string | ImageStyle
    overlay?: string | ImageStyle
    actions?: Record<string, Action>
  }

  type DataList = View & {
    dataList: []
  }

  export type Label = Visual | string

export type DataContent = Label | Action

  export type Action = Visual & {
    type?: string
    iconRight?: string
    args?: any
    event: Function | ActionString
    onResult?: OnResult
    onError?: OnResult
    state?: ActionState
}





export type ViewSection = View | DataType | FormView | VComponent | Component | NavList | Slides | DataGraph | DataTable



  let view: View = {
    layout: "Grid",
    props: undefined,
    events: undefined,
    sections: [],
    viewGuard: false
  }
  let gh = Comp.getComp<View>({
    layout: 'Horizontal',
    props: [],
    sections: []
  })


  let dataView: DataView = {
    sections: [
      getComp<Action>({
        sections: [],
        event: 'Filter'
      })
    ],
    layout: 'Vertical'
  }
