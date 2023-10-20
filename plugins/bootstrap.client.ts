import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle';

export default defineNuxtPlugin((nuxtApp: any) => {
  nuxtApp.provide("bootstrap", bootstrap);
})