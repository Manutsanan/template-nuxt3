import { defineStore } from "pinia";

interface State {
  displayName: string;
}

export const useIndexStore = defineStore("index", {
  state: (): State => ({
    displayName: '',
  }),
  getters: {
    //
  },
  actions: {
    // 
  },
});
