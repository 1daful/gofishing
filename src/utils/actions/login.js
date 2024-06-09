import { auth } from "../../../config/model";
import { Action } from "../types";
export const loginEvent = async (providerId) => {
    return await auth.login(providerId);
};
export const signupEvent = async (user, data) => {
    return await auth.signUp(user, data);
};
export const googleAction = (event) => {
    return new Action({
        icon: '../../../google.svg',
        label: 'Google',
        event,
        args: 'google'
    });
};
export const facebookAction = (event) => {
    return new Action({
        icon: '../../../public/facebook.svg',
        label: 'Facebook',
        event,
        args: 'facebook'
    });
};
export const XAction = (event) => {
    return new Action({
        icon: '../../../public/x.svg',
        label: 'X',
        event,
        args: 'twitter'
    });
};
