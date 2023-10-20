
import axios from "axios";
import mitt from 'mitt';
import Swal from "sweetalert2";

export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  nuxtApp.provide("swal", Swal);
  nuxtApp.provide("axios", axios);

  const emitter = mitt();
  nuxtApp.provide("eventBus", emitter);
});
