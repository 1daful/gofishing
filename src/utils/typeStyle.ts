
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

export type CardStyle = {
    styles: Object
    bordered: boolean
    flat?: boolean
    squared?: boolean
    dark?: boolean
    actionsAlign: 'left' | 'right' | 'center' | 'between' | 'around' | 'evenly' | 'stretch'
}

export type FilterStyle = {

}

export type ImageStyle = {
    height: string
    width: string
    src: string
    attribute: string
}

export type NavStyle = {}

export type HeroStyle = {
  backgroundImage: string,
  position: string,
  height: string,
  backgroundSize: string,
  backgroundPosition: string,
  backgroundColor: string,
  display: string,
  flexDirection: string,
  justifyContent: string,
  alignItems: string,
  fixedNav: boolean,
  headerColor: string,
}

export type HeaderStyle = {
    reveal?: boolean,
    bordered?: boolean,
    elevated?: boolean,
    class?: Record<string, any>,
    style?: Record<string, any>,
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
    class?: Record<string, any>,
    style: Record<any, string>
}


export type ListStyle = {
    bordered?: boolean
    dense?: boolean
    dark?: boolean
    padding?: boolean
    class?: Record<string, any>
}