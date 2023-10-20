import { useIndexStore } from '@/store/index.store';
import axios from "axios";

export const verify = () => {
    const store = useIndexStore();
    const i18n_redirected = useCookie('i18n_redirected')
    const runtimeConfig = useRuntimeConfig()
    const accessToken = useCookie('accessToken')
    const displayName = useCookie('displayName')

    store.setCookie("i18n_redirected", i18n_redirected.value || 'th', 2147483647);

    axios.defaults.baseURL = runtimeConfig.public.apiUrl || ''
    axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken.value
    axios.defaults.headers.common['Content-Language'] = i18n_redirected.value || 'th'

    store.$state.accessToken = accessToken.value || ''
    store.$state.displayName = displayName.value || ''

    return accessToken.value || null;
}