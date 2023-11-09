import { setCookie } from "~/composables/useCookie";

export default defineNuxtRouteMiddleware((to, from) => {
    verify()
    const refToken = setCookie('token')

    if (refToken.value) {
        return navigateTo("/");
    }
})