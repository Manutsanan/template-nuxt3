<template>
  <div class="card">
    <div class="flex items-center align-bottom gap-2">
      <h1 class="text-2xl font-bold">TEMPLATE</h1>
      <span class="text-sm">LOGIN</span>
    </div>
    <hr class="py-1" />
    <form class="grid gap-2" @submit="onSubmit">
      <div>
        <label>{{ $t("Username") }}</label>
        <div
          class="form-input-group"
          :class="(form.username && 'is-valid') || 'is-invalid'"
        >
          <input type="text" v-model="form.username" placeholder="Username" />
        </div>
      </div>
      <div>
        <label>{{ $t("Password") }}</label>
        <div
          class="form-input-group"
          :class="(form.password && 'is-valid') || 'is-invalid'"
        >
          <input
            :type="(showPassword && 'text') || 'Password'"
            v-model="form.password"
            placeholder="password"
          />
          <div class="icon-back">
            <i
              class="fa-solid cursor-pointer eye-password"
              :class="(showPassword && 'fa-eye') || 'fa-eye-slash'"
              @click="showPassword = !showPassword"
            ></i>
          </div>
        </div>
      </div>
      <div class="12 text-end">
        <button type="submit" class="btn-secondary" :disabled="loading">
          <i
            v-if="loading"
            class="fa-duotone fa-spinner-third animate-spin"
          ></i>
          {{ (loading && $t("Loading")) || $t("Login") }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { type LoginRequest } from "@/models/auth.model";

definePageMeta({
  name: "LoginPage",
  layout: "custom",
  middleware: "login",
});

const { $swal }: any = useNuxtApp();
const router = useRouter();

const loading = ref<boolean>(false);
const showPassword = ref<boolean>(false);
const form = reactive<LoginRequest>({
  username: "superadmin",
  password: "123456",
});

const onSubmit = async (event: Event) => {
  event.preventDefault();

  if (!form.username || !form.password) {
    $swal.fire({
      icon: "warning",
      title: "warning !",
      text: "Username or password incorrect.",
    });
    return;
  }

  loading.value = true;
  try {
    // const response: any = await service.auth.login({
    //   username: form.username,
    //   password: form.password,
    // });
    // if (response?.code == "200") {
    //   const refToken = setCookie("token");
    //   refToken.value = response?.data?.access_token || "";
    //   const refUsername = setCookie("username");
    //   refUsername.value = form.username || "";
    //   router.push("/");
    // }

    const refToken = setCookie("token");
    refToken.value =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const refUsername = setCookie("username");
    refUsername.value = form.username || "";

    router.push("/");
  } catch (error) {
    $swal.fire({
      icon: "warning",
      title: "warning !",
      text: error,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.card {
  padding: 12px;
  border: 1px solid #fff;
  border-radius: 8px;
  background-color: #fff;
  width: 300px;
  color: #000;
}
</style>
