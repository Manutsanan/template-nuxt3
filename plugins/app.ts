import mitt from 'mitt';
import Swal from "sweetalert2";

export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  nuxtApp.provide("swal", Swal);

  const emitter = mitt();
  nuxtApp.provide("eventBus", emitter);
});
