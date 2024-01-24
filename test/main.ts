/*import gql from "graphql-tag";
import {  parse } from "graphql";
import { DateLocale } from "quasar";
import { Action, DataItem } from "../src/utils/types";
import { firstTimer, getNotificationSlides } from "../config/model";
import { HorizontalPosition } from "../src/utils/DataTypes";*/

/*const decoFunc = (position?: HorizontalPosition, prop?: string, keyLabel?: string, dataContent?: {
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
}

export class MemberList {
  constructor(data: Record<string, any>) {
      Object.assign(this, data)
  }
  //items = []
  overlay!: string
  id!: string
  card = true
  @decoFunc('left') firstName!: string
  @decoFunc('center') lastName!: string
  contacts!: []
  address!: ''
  createdAt!: DateLocale
  @decoFunc('left', '', 'last seen') lastTime!: DateLocale
  @decoFunc('center', 'thumbnail') thumbnail!: string
}

class Person {
  constructor(data: Record<string, any>) {
      this.name = data.name
      this.avatar = data.age
      this.dataView = {
          header: [
              {
                  icon: '',
                  label: this.name
              },
              {
                  avatar: this.avatar
              }
          ]
      }
  }

  name: string
  avatar: string
  dataView: DataItem
}

function model<T extends {new (...args: any[]): {}}> (cls: T) {
        // get the class name as the table name
        let tableName = cls.name.toLowerCase();
        // get the class properties as an array of strings
        let properties = Object.getOwnPropertyNames(cls.prototype);
        // remove the constructor property as it is not needed for the table
        properties.splice(properties.indexOf("constructor"), 1);
        // initialize an empty array to store the column definitions
        let columns: string[] = [];
        // loop through the properties and generate the column definitions
        for (let prop of properties) {
          // get the data type of the property value
          let type = typeof cls.prototype[prop];
          // map the data type to a SQL data type
          let sqlType: string;
          switch (type) {
            case "string":
              sqlType = "TEXT";
              break;
            case "number":
              sqlType = "NUMERIC";
              break;
            case "boolean":
              sqlType = "BOOLEAN";
              break;
            case "function":
              // skip the methods as they are not needed for the table
              continue;
            default:
              // throw an error if the data type is not supported
              //throw new Error(`Unsupported data type: ${type} and ${cls.prototype[prop]}`);
              console.log("MODEL", cls.prototype)
          }
          // add the column definition to the array
          columns.push(`${prop} ${sqlType}`);
        }
        // join the column definitions with commas
        let columnString = columns.join(", ");
        // return the SQL query string to create the table
        console.log(`CREATE TABLE, ${tableName} (${columnString});`);

    console.log(`CREATE TABLE, ${tableName} (${columnString});`);
    console.log("MODEL", cls.prototype.constructor.items)
    }

    console.log("FISRT TIMERS ", firstTimer)
    let p = {firstName: "", lastTime: ""}
    const mem = getNotificationSlides
    console.log("MEM,", mem)*/


//export const members = get(Person)

//console.log("Main MEMBERS: ", members)


/*export function get<T>(Type: new (data: any) => T, params?: string, value?: string) {
  if (value) {
      //const data = await db.readItem(Type.name, params, value)
     
      //return new Type(data)
  }
  //const data = await db.readItems(Type.name, undefined, [])
  const data = {

      id: '1',
      firstName: "John",
      lastName: "Ral",
      contacts: [],
      address: '',
      createdAt: new Date(),
      lastTime: new Date(),
      thumbnail: '../public/logo.png',
      overlay: '../public/logo.png'
  }
  return Object.freeze(new Type(data))
  //return new Type(data)
}

export function get2<T>(Type: new (data: any) => T, params?: string, value?: string) {
  if (value) {
      //const data = await db.readItem(Type.name, params, value)
     
      //return new Type(data)
  }
  //const data = await db.readItems(Type.name, undefined, [])
  const data = {

      id: '1',
      firstName: "Petr",
      lastName: "Israel",
      contacts: [],
      address: '',
      createdAt: new Date(),
      lastTime: new Date(),
      thumbnail: '../public/logo.png',
      overlay: '../public/logo.png'
  }
  return Object.freeze(new Type(data))
  //return new Type(data)
}*/

    /*function uppercase(target: any, propertyKey: string) {
      let value: string;
    
      const getter = function () {
        return value;
      };
    
      const setter = function (newVal: string) {
        value = newVal.toUpperCase();
      };
    
      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
      });
    }*/
    
    //const example = new Example("John Doe");
    //console.log(example.name); // Output: "JOHN DOE"


/*const decoFunc2 = (position?: HorizontalPosition, prop?: string, keyLabel?: string, dataContent?: {
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
      });
  }
}

    class Car {
      [x: string]: any;
      constructor() {
        this.avatar = 150
        this.firstName = 'red'
        console.log("ITEMS ", this.items)
        this.items.header.forEach(content => {
          let key = content[content.prop]
          let value = this[content.key]
          let gh = []
          gh[key] = value
          content[content.prop] = this[content.key]
          console.log('PROP ', content)
        });
      }
      //items!: DataItem
      @decoFunc2() avatar: number
      @decoFunc2() firstName: string
    }*/

import { SupabaseRepo } from "@edifiles/services";
import { config } from "../public/config";
import { QueryType } from "@edifiles/services";
import { foreignColumns, filter } from "@edifiles/services/dist/module/utility/Query";
import { HorizontalPosition } from "../src/utils/DataTypes";
import { Action, DataItem } from "../src/utils/types";
import { content } from "../src/utils/DataView";

const repo = new SupabaseRepo(config.api.Supabase)
const q: QueryType = {
  name: "User",
  data: undefined,
  filter: [
    filter('lt', 'age', 20),
    {
      op: 'lt',
      args: [
        'age',
        20
      ]
    }
  ],
  columns: [
    'title',
    foreignColumns('user', ['name', 'age']),
  ]
}

function header(target: any, key: any) {
  const item: DataItem = {
    header: []
}

  item.header?.push({
    key: key,
    prop: 'label'
  })

  target["items"] = item;
}

class Person{
  constructor(name: string, age: number) {
    
    this.age = age
    this.name = name
  }
  @header name: string
  age: number
  items!: any
}

let paul = new Person('Paul', 20)
console.log("First person ", paul)

let peter = new Person('Peter', 23)
console.log("Second person ", peter)