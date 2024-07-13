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
<<<<<<< HEAD
export const viewGuard = async (userColval, colval, type) => {
    var _a;
    let show = false;
    const userIdCol = (userColval === null || userColval === void 0 ? void 0 : userColval.col) || 'user_id';
    const userIdVal = (userColval === null || userColval === void 0 ? void 0 : userColval.val) || await ((_a = (await auth.getUser()).data.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!colval || !type && userIdVal) {
        show = true;
=======
export const viewGuard = async (useViewGuard) => {
    let show = false;
    const userIdCol = useViewGuard?.userColval?.col || 'user_id';
    const userIdVal = useViewGuard?.userColval?.val || (await auth.getUser()).data.user?.id;
    const colval = useViewGuard?.colval;
    const type = useViewGuard?.type;
    if (userIdVal && (!colval || !type)) {
        show = !!useViewGuard;
>>>>>>> master
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
<<<<<<< HEAD
        if (data) {
            show = true;
        }
        else
            show = false;
=======
        show = !!data;
    }
    if (!userIdVal) {
        show = !useViewGuard;
>>>>>>> master
    }
    return show;
};
export const navGuard = async (t, from, next) => {
};
