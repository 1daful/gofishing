
import { LocalStorage } from "quasar";
import { auth, dbClient } from "../../config/model";
import { QueryType } from "@edifiles/services";
import { filter } from "@edifiles/services/dist/module/utility/Query";
import { Colval, Privacy } from "./types";
export const authGuard = async (to: any, from: any, next: any) => {
  //const auth = new Auth();
  //const auth = new SupabaseAuth()
  if (await auth.getSession()) {
    next();
  }
  else {
    LocalStorage.set("url", to.path)
    LocalStorage.set("message", "you must login first")
    next({
      name: "SignIn",
      path: "signin",
    })
  }
}

export const viewGuard = async (userColval?: Colval, colval?: Colval, type?: string) => {
  let show = false
  const userIdCol = userColval?.col || 'user_id'
  const userIdVal = userColval?.val || await (await auth.getUser()).data.user?.id

  if (!colval || !type && userIdVal) {
    show = true
  }

  else if (colval && type && userIdVal) {
    const query: QueryType = {
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
    }
    const data = await dbClient.get(query)
    if (data) {
      show = true
    }
    else show = false
  }
  return show
}

  export const navGuard = async (t: any, from: any, next: any) => {
    
  }