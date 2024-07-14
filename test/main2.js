var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import gql from "graphql-tag";
import { parse } from "graphql";
import { parseQuery } from "@edifiles/services";
import { firstTimer, createSlides } from "../config/model";
const noName = 'name';
const query = gql `
{
    user(id: 5) {
        firstName
        lastName
    }
}`;
const queer = parse(`
{
    user(id: 5) {
        firstName
        lastName
    }
}`);
const computedDate = new Date().setDate(new Date().getDate() - 7);
const firstTimerQuery = gql `{
    user(filter: {gt: {firstTime:${computedDate} }}) {
        firstName
        lastName
    }
}`;
export const content = (index, keyLabel, dataContent) => {
    return (target, key) => {
        let items = target.constructor.items || (target.constructor.items = []);
        const item = {
            content: []
        };
        items[0] = item;
        item.content.push({
            icon: dataContent?.icon,
            img: dataContent?.img,
            label: `${key}`,
            action: dataContent?.action,
            horizontal: dataContent?.horizontal,
            class: dataContent?.class
        });
    };
};
export class MemberList {
    constructor(data) {
        Object.assign(this, data);
    }
    id;
    firstName;
    lastName = 'Last';
    contacts;
    address;
    createdAt;
    lastTime;
    image;
}
__decorate([
    content(1),
    __metadata("design:type", String)
], MemberList.prototype, "firstName", void 0);
__decorate([
    content(1),
    __metadata("design:type", Object)
], MemberList.prototype, "lastName", void 0);
__decorate([
    content(2),
    __metadata("design:type", String)
], MemberList.prototype, "address", void 0);
__decorate([
    content(2, 'last seen'),
    __metadata("design:type", Object)
], MemberList.prototype, "lastTime", void 0);
__decorate([
    content(0),
    __metadata("design:type", String)
], MemberList.prototype, "image", void 0);
const accessorDecorator = (target, propertyName, descriptor) => {
};
class Person {
    _age;
    set age(w) {
        this._age = w;
    }
    get age() {
        return this._age;
    }
    accessor numb = 1;
}
const person = new Person();
person.age = 12;
console.log("Person age: ", person.age);
person.age = 20;
console.log("Person age: ", person.age);
person.numb = 5;
console.log("Person number: ", person.numb);
person.numb = 20;
console.log("Person number: ", person.numb);
console.log("Parse ", parseQuery(firstTimerQuery));
function model(cls) {
    let tableName = cls.name.toLowerCase();
    let properties = Object.getOwnPropertyNames(cls.prototype);
    properties.splice(properties.indexOf("constructor"), 1);
    let columns = [];
    for (let prop of properties) {
        let type = typeof cls.prototype[prop];
        let sqlType;
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
                continue;
            default:
                console.log("MODEL", cls.prototype);
        }
        columns.push(`${prop} ${sqlType}`);
    }
    let columnString = columns.join(", ");
    console.log(`CREATE TABLE, ${tableName} (${columnString});`);
    console.log(`CREATE TABLE, ${tableName} (${columnString});`);
    console.log("MODEL", cls.prototype.constructor.items);
}
console.log("FISRT TIMERS ", firstTimer);
let p = { firstName: "", lastTime: "" };
const mem = createSlides(p);
console.log("MEM,", mem);
function uppercase(target, propertyKey) {
    let value;
    const getter = function () {
        return value;
    };
    const setter = function (newVal) {
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
    name;
    constructor(name) {
        this.name = name;
    }
}
__decorate([
    uppercase,
    __metadata("design:type", String)
], Example.prototype, "name", void 0);
const example = new Example("John Doe");
console.log(example.name);
