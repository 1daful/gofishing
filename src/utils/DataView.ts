import { HorizontalPosition, Slide, Slides } from "./DataTypes";
import { Action, DataItem } from "./types";
/*export const decoFunc = (position?: HorizontalPosition, prop?: string, keyLabel?: string, dataContent?: {
    icon?: string;
    img?: string;
    action?: Action
    horizontal?: boolean
    class?: string
  }) => {
    return (target: any, key: any) => {
      let value: any
        let items: DataItem[] = target.constructor.items || (target.constructor.items = []);
        //let items: DataItem[] = this["items"]
        const item: DataItem = {
            content: []
        }
        items.push(item)
  
        const setter = function (this: any, newValue: any) {
            if (keyLabel && prop) {
                item.content.push({
                    icon: dataContent?.icon,
                    [prop]: `${keyLabel} : ${newValue}`,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                })
            }
            else if(prop) {
                item.content.push({
                    icon: dataContent?.icon,
                    [prop]: newValue,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class,
                    position: position
                })
            }
  
            else if (keyLabel){
                item.content.push({
                    icon: dataContent?.icon,
                    label: `${keyLabel} : ${newValue}`,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                })
            }
            else {
                item.content.push({
                    icon: dataContent?.icon,
                    label: newValue,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                })
            }
            this["items"] = items;
        };
        
        const getter = function (this: any) {
          return value
        };
  
        Object.defineProperty(target, key, {
          get: getter,
          set: setter,
          enumerable: true,
          configurable: true,
        });
    }
  }*/


  const decoFunc = (position?: HorizontalPosition, prop?: string, keyLabel?: string, dataContent?: {
    icon?: string;
    img?: string;
    action?: Action
    horizontal?: boolean
    class?: string
  }) => {
    return (target: any, key: any) => {
      let value: any
        let items: DataItem[] = target.constructor.items || (target.constructor.items = []);
        //let items: DataItem[] = this["items"]
        const item: DataItem = {
            header: []
        }
        //items.push(item)
  
        //const setter = function (this: any, newValue: any) {
            if (keyLabel && prop) {
                item.header?.push({
                    icon: dataContent?.icon,
                    [prop]: `${keyLabel} : ${key}`,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                })
            }
            else if(prop) {
                item.header?.push({
                    icon: dataContent?.icon,
                    [prop]: key,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class,
                    position: position
                })
            }
  
            else if (keyLabel){
                item.header?.push({
                    icon: dataContent?.icon,
                    label: `${keyLabel} : ${key}`,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                })
            }
            else {
                item.header?.push({
                    icon: dataContent?.icon,
                    key: key,
                    prop: 'label',
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                })
            }
            target["items"] = item;
        //};
        
        const getter = function (this: any) {
          return value
        };
  
        /*Object.defineProperty(target, key, {
          get: getter,
          set: setter,
          enumerable: true,
          configurable: true,
        });*/
    }
  }
  

export function content (index: number, prop?: string, keyLabel?: string, dataContent?: {
        icon?: string;
        action?: Action
        horizontal?: boolean
        class?: string
}) {
    return (target: any, key: any, descriptor: PropertyDescriptor) => {
        let items: DataItem[] = target.constructor.items || (target.constructor.items = []);
        //let items: DataItem[] = this["items"]
        const item: DataItem = {
            content: []
        }
        items[index] = item

        const originalSet = descriptor.set;
        const originalGet = descriptor.get;

        descriptor.set = function (value: any) {
            originalSet.call(this, value);
            if(prop) {
                item.content.push({
                    icon: dataContent?.icon,
                    [prop]: value,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                })
            }

            else {
                item.content.push({
                    icon: dataContent?.icon,
                    label: value,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                })
            }

            if (keyLabel && prop) {
                items[index].content.push({
                    icon: dataContent?.icon,
                    [prop]: `${keyLabel} : ${prop}`,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                })
            }

            else {
                items[index].content.push({
                    icon: dataContent?.icon,
                    label: `${keyLabel} : ${prop}`,
                    action: dataContent?.action,
                    horizontal: dataContent?.horizontal,
                    class: dataContent?.class
                })
            }
            this["items"] = items;
        };
        descriptor.get = function () {
        // Call the original getter and return its value
        return originalGet.call(this);
        };
    }
}

export function header(position?: HorizontalPosition, prop?: string, keyLabel?: string, dataContent?: {
    icon?: string;
    img?: string;
    action?: Action
    horizontal?: boolean
    class?: string
}) {
    return decoFunc(position, prop, keyLabel, dataContent)
}

export function footer(position?: HorizontalPosition, prop?: string, keyLabel?: string, dataContent?: {
    icon?: string;
    img?: string;
    action?: Action
    horizontal?: boolean
    class?: string
}) {
    return decoFunc(position, prop, keyLabel, dataContent)
}

export function left(position?: HorizontalPosition, prop?: string, keyLabel?: string, dataContent?: {
    icon?: string;
    img?: string;
    action?: Action
    horizontal?: boolean
    class?: string
}) {
    return decoFunc(position, prop, keyLabel, dataContent)
}

export function right(position?: HorizontalPosition, prop?: string, keyLabel?: string, dataContent?: {
    icon?: string;
    img?: string;
    action?: Action
    horizontal?: boolean
    class?: string
}) {
    return decoFunc(position, prop, keyLabel, dataContent)
}

export function center(position?: HorizontalPosition, prop?: string, keyLabel?: string, dataContent?: {
    icon?: string;
    img?: string;
    action?: Action
    horizontal?: boolean
    class?: string
}) {
    return decoFunc(position, prop, keyLabel, dataContent)
}

export function createSlides<T> (Type: new (data: any) => T, props: any) {
    
    let slides: Slides = {
        content: [],
        name: ""
    }
}

/*export type DataView = {
    header: {
        [key: string]: DataContent
    }

}*/

export class Model {
    constructor() {
        this.items = {
            header: [
                {
                    label: this.name
                },
                {
                    avatar: this.avatar
                }
            ]
        }
    }
    items: DataItem
}