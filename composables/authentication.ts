import { useIndexStore } from '@/store/index.store';

export const verify = () => {
    const store = useIndexStore();
    const accessToken = useCookie('accessToken')
    const displayName = useCookie('displayName')

    store.$state.accessToken = accessToken.value || ''
    store.$state.displayName = displayName.value || ''

    return accessToken.value || null;
}