import gql from "graphql-tag";
import {  parse } from "graphql";
import { SDKClient } from "@edifiles/services";
import { SupabaseRepo } from "@edifiles/services/dist/module/model/SupabaseRepo";
import { parseQuery } from "@edifiles/services";
import { DateLocale } from "quasar";
import { Action } from "../src/utils/types";
import { firstTimer, createSlides } from "../config/model";
//import { content } from "../utils/DataView";

const noName = 'name'
const query = gql`
{
    user(id: 5) {
        firstName
        lastName
    }
}`

const queer = parse(`
{
    user(id: 5) {
        firstName
        lastName
    }
}`)


const computedDate = new Date().setDate(new Date().getDate() -7)

const firstTimerQuery = gql`{
    user(filter: {gt: {firstTime:${
        computedDate
    } }}) {
        firstName
        lastName
    }
}`

export const content = (index: number, keyLabel?: string, dataContent?: {
    icon?: string;
    img?: string;
    action?: Action
    horizontal?: boolean
    class?: string
}) => {
/*return (target: any, key: any) => {
    let items = target.constructor.items || (target.constructor.items = []);
    if(keyLabel) {
        items[index].content.push({
            icon: dataContent?.icon,
            img: dataContent?.img,
            label: `${keyLabel} : ${key}`,
            action: dataContent?.action,
            horizontal: dataContent?.horizontal,
            class: dataContent?.class
        })
    }
    
    else {
        items[index].content.push({
            icon: dataContent?.icon,
            img: dataContent?.img,
            label: key,
            action: dataContent?.action,
            horizontal: dataContent?.horizontal,
            class: dataContent?.class
        })
    }
}*/
return (target: any, key: any) => {
    let items:[] = target.constructor.items || (target.constructor.items = []);
    const item = {
        content: []
    }
    items[0] = item
    item.content.push({
        icon: dataContent?.icon,
        img: dataContent?.img,
        label: `${key}`,
        action: dataContent?.action,
        horizontal: dataContent?.horizontal,
        class: dataContent?.class
    })
}
}
export class MemberList {
    constructor(data: Record<string, any>) {
        Object.assign(this, data)
    }
    id!: string
    @content(1) firstName!: string
    @content(1) lastName = 'Last'
    contacts!: []
    @content(2) address!: ''
    createdAt!: DateLocale
    @content(2, 'last seen') lastTime!: DateLocale
    @content(0) image!: string
}

//const dbClient = new SDKClient(new SupabaseRepo())

//const members = dbClient.get(MemberList)

//const firstTimer = dbClient.get(MemberList, firstTimerQuery)

//console.log('FIRST_TIMER: ', firstTimer)

// Use an accessor decorator instead of a property decorator
const accessorDecorator = (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    // Save the original setter and getter
    /*const originalSet = descriptor.set;
    const originalGet = descriptor.get;
    
    // Modify the descriptor
    descriptor.set = function (value: any) {
        let items = target.constructor.items || (target.constructor.items = []);
        const item = {
            content: []
        }
        items[0] = item

        const originalSet = descriptor.set;
        const originalGet = descriptor.get;
    // Add validation logic
    // Call the original setter with the new value
    originalSet.call(this, value);
    originalSet.call(this, value);
    item.content.push({
        label: value
    })
    target.prototype.items = items
    console.log("DECO: ", items)
    };
    
    descriptor.get = function () {
    // Add logging functionality
    console.log("Log Accessor: ", {
    target,
    propertyName,
    descriptor,
    });
    // Call the original getter and return its value
    return originalGet.call(this);
    };*/
    };
    
    class Person {
        // Use a regular private property instead of a private field
        private _age: number;
        
        // Apply the accessor decorator to the age accessor
        
        set age(w: number) {
        this._age = w;
        }
        get age() {
        return this._age;
        }
        
        accessor numb: number = 1
    }
    
    const person = new Person();
    person.age = 12; // This will not change the age because it is less than 18
    console.log("Person age: ", person.age); // This will log the accessor details and then print undefined
    person.age = 20; // This will change the age to 20
    console.log("Person age: ", person.age); // This will log the accessor details and then print 20
    person.numb = 5
    console.log("Person number: ", person.numb)
    person.numb = 20
    console.log("Person number: ", person.numb)

// A decorator factory that returns a readonly decorator
/*function readonly<T>(fields: Fields<T>) {
    return function (target: any, propertyKey: string) {
      // Get the original descriptor
      const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
      // Make the setter throw an error
      descriptor.set = function (value) {
        throw new Error(`Cannot assign to read only property '${propertyKey}'`);
      };
      // Redefine the property
      Object.defineProperty(target, propertyKey, descriptor);
    };
  }
  
  // A hypothetical library that provides Fields
  import { Fields } from "hypothetical-lib";
  
  // An interface for the person data
  interface PersonData {
    name: string;
  }
  
  // A class that uses the autoAccessor and readonly decorators
  class Person {
    // A Fields object to store the data
    private fields: Fields<PersonData> = Fields();
  
    // An autoAccessor property with a readonly decorator
    @readonly(this.fields)
    accessor name = "John";
  
    // A method to log the name
    logName() {
      console.log(this.name);
    }
  }
  
  // Create a new person instance
  const person = new Person();
  
  // Log the name
  person.logName(); // John
  
  // Try to change the name
  person.name = "Jane"; // Error: Cannot assign to read only property 'name'*/
  
console.log("Parse ", parseQuery(firstTimerQuery))



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
    const mem = createSlides(p)
    console.log("MEM,", mem)

    function uppercase(target: any, propertyKey: string) {
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
    }
    
    class Example {
      @uppercase
      name: string;
    
      constructor(name: string) {
        this.name = name;
      }
    }
    
    const example = new Example("John Doe");
    console.log(example.name); // Output: "JOHN DOE"