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
    let show = false;
    const userIdCol = useViewGuard?.userColval?.col || 'user_id';
    const userIdVal = useViewGuard?.userColval?.val || (await auth.getUser()).data.user?.id;
    const colval = useViewGuard?.colval;
    const type = useViewGuard?.type;
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
