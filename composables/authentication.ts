
export const verify = async () => {
    const refI18n = setCookie('i18n_redirected')
    refI18n.value = refI18n.value || 'en'

    const refToken = setCookie('token')
    if (refToken.value) {
        // 
    } else {
        removeCookie('username')
    }
}