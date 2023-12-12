export class InstanceLoader {
    constructor(context) {
        this.context = context;
    }
    getInstance(name, ...args) {
        const instance = Object.create(this.context[name].prototype);
        instance.constructor.apply(instance, args);
        return instance;
    }
}
