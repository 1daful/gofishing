import { Action, Colval, DataType, VComponent } from "./types"
import { Component } from "vue"

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
    class?: string
}

export type HeaderStyle = {
    reveal?: boolean,
    bordered?: boolean,
    elevated?: boolean,
    class?: string
}

export class ListStyle {
    constructor(listStyle: ListStyle) {
        Object.assign(this, listStyle)
    }

    bordered?: boolean
    dense?: boolean
    dark?: boolean
    padding?: boolean
}

export type Hero = {
    title: string,
    subtitle: string,
    buttonText: string,
    class: string
}

export type HorizontalPosition = 'left' | 'center' | 'right'
export type VerticalPosition = 'top' | 'middle' | 'bottom'

export class Menu {
    header: HeaderStyle = {
        reveal: true,
        bordered: false,
        elevated: true,
        class: "fixed-nav"
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

    closeBtn: Action = new Action({
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
    openBtn: Action = new Action({
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