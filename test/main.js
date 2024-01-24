var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SupabaseRepo } from "@edifiles/services";
import { config } from "../public/config";
import { foreignColumns, filter } from "@edifiles/services/dist/module/utility/Query";
const repo = new SupabaseRepo(config.api.Supabase);
const q = {
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
};
function header(target, key) {
    var _a;
    const item = {
        header: []
    };
    (_a = item.header) === null || _a === void 0 ? void 0 : _a.push({
        key: key,
        prop: 'label'
    });
    target["items"] = item;
}
class Person {
    constructor(name, age) {
        this.age = age;
        this.name = name;
    }
}
__decorate([
    header,
    __metadata("design:type", String)
], Person.prototype, "name", void 0);
let paul = new Person('Paul', 20);
console.log("First person ", paul);
let peter = new Person('Peter', 23);
console.log("Second person ", peter);
