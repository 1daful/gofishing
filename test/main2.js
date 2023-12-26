var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Person_numb_accessor_storage;
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
            icon: dataContent === null || dataContent === void 0 ? void 0 : dataContent.icon,
            img: dataContent === null || dataContent === void 0 ? void 0 : dataContent.img,
            label: `${key}`,
            action: dataContent === null || dataContent === void 0 ? void 0 : dataContent.action,
            horizontal: dataContent === null || dataContent === void 0 ? void 0 : dataContent.horizontal,
            class: dataContent === null || dataContent === void 0 ? void 0 : dataContent.class
        });
    };
};
export class MemberList {
    constructor(data) {
        this.lastName = 'Last';
        Object.assign(this, data);
    }
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
    constructor() {
        _Person_numb_accessor_storage.set(this, 1);
    }
    set age(w) {
        this._age = w;
    }
    get age() {
        return this._age;
    }
    get numb() { return __classPrivateFieldGet(this, _Person_numb_accessor_storage, "f"); }
    set numb(value) { __classPrivateFieldSet(this, _Person_numb_accessor_storage, value, "f"); }
}
_Person_numb_accessor_storage = new WeakMap();
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
