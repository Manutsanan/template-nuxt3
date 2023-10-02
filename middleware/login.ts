import { verify } from '~/composables/authentication';

export default defineNuxtRouteMiddleware((to, from) => {
    let accessToken = verify()

    if (accessToken) {
        // return navigateTo("/");
    }
})