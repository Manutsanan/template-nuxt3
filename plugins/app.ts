import Swal from "sweetalert2";

export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  nuxtApp.provide("swal", Swal);
});
