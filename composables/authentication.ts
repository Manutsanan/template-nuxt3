import service from "~/service";

export const verify = async () => {
    const refI18n = setCookie('i18n_redirected')
    refI18n.value = refI18n.value || 'en'

    const refToken = setCookie('token')
    if (refToken.value) {
        const response: any = await service.profile.info();
        const refUsername = setCookie('username')
        refUsername.value = response?.data?.username || ''
    } else {
        removeCookie('username')
    }
}