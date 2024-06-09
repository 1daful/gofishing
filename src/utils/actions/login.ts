import { auth } from "../../../config/model";
import { Action } from "../types";

export const loginEvent = async (providerId: string) => {
    return await auth.login(providerId)
}

export const signupEvent = async (user: any, data: any)=> {
    return await auth.signUp(user, data)
}

export const googleAction = (event: Function)=> {
    return new Action({
        icon: '../../../google.svg',
        label: 'Google',
        event,
        args: 'google'
    })
}

export const facebookAction = (event: Function)=> {
    return new Action({
        icon: '../../../public/facebook.svg',
        label: 'Facebook',
        event,
        args: 'facebook'
    })
}

export const XAction = (event: Function)=> {
    return new Action({
        icon: '../../../public/x.svg',
        label: 'X',
        event,
        args: 'twitter'
    })
}