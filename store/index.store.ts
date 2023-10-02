import { defineStore } from "pinia";

interface State {
  accessToken: string;
  displayName: string;
  isOpen: boolean;
}

export const useIndexStore = defineStore("index", {
  state: (): State => ({
    accessToken: '',
    displayName: '',
    isOpen: false,
  }),
  getters: {
    //
  },
  actions: {
    setCookie(name: string, value: string | number, secound: number) {
      let expires = ''
      if (secound) {
        const date = new Date()
        date.setTime(date.getTime() + secound * 1000)
        expires = '; expires=' + date.toUTCString()
      }
      if (typeof window !== 'undefined') {
        document.cookie = name + '=' + (value || '') + expires + '; path=/'
      }
    },
    dcodedCookie(cookie: string, name: string) {
      if (cookie) {
        const ca = cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i]
          while (c.charAt(0) === ' ') {
            c = c.substring(1)
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length)
          }
        }
      }
      return ''
    },
  },
});
