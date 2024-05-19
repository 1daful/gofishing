import { LocalStorage } from "quasar";
import { auth, dbClient } from "../../config/model";
export const authGuard = async (to, from, next) => {
    if (await auth.getSession()) {
        next();
    }
    else {
        LocalStorage.set("url", to.path);
        LocalStorage.set("message", "you must login first");
        next({
            name: "SignIn",
            path: "signin",
        });
    }
};
export const viewGuard = async (useViewGuard) => {
    var _a, _b, _c;
    let show = false;
    const userIdCol = ((_a = useViewGuard === null || useViewGuard === void 0 ? void 0 : useViewGuard.userColval) === null || _a === void 0 ? void 0 : _a.col) || 'user_id';
    const userIdVal = ((_b = useViewGuard === null || useViewGuard === void 0 ? void 0 : useViewGuard.userColval) === null || _b === void 0 ? void 0 : _b.val) || ((_c = (await auth.getUser()).data.user) === null || _c === void 0 ? void 0 : _c.id);
    const colval = useViewGuard === null || useViewGuard === void 0 ? void 0 : useViewGuard.colval;
    const type = useViewGuard === null || useViewGuard === void 0 ? void 0 : useViewGuard.type;
    if (userIdVal && (!colval || !type)) {
        show = !!useViewGuard;
    }
    else if (colval && type && userIdVal) {
        const query = {
            name: type,
            data: undefined,
            filters: [
                {
                    op: 'eq',
                    col: colval.col,
                    val: colval.val
                },
                {
                    op: 'eq',
                    col: userIdCol,
                    val: userIdVal
                }
            ],
            columns: []
        };
        const data = await dbClient.get(query);
        show = !!data;
    }
    if (!userIdVal) {
        show = !useViewGuard;
    }
    return show;
};
export const navGuard = async (t, from, next) => {
};
