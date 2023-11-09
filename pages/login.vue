<template>
  <div class="card-login p-3">
    <div class="d-flex align-items-center gap-auto">
      <h3 class="text-title m-0">TEMPLATE</h3>
      <span class="text-muted">LOGIN</span>
    </div>
    <hr />
    <form class="row g-2" @submit="onSubmit">
      <div class="col-12">
        <FormGroup
          type="input"
          :title="$t('Username')"
          :data-model="form.username"
          is-unique
          @return="form.username = $event"
        />
      </div>
      <div class="col-12">
        <FormGroup
          type="password"
          :title="$t('Password')"
          :data-model="form.password"
          is-unique
          back
          @return="form.password = $event"
        />
      </div>
      <div class="col-12 text-end">
        <button type="submit" class="btn btn-secondary" :disabled="loading">
          {{ $t("Login") }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { LoginRequest } from "@/models/auth.model";
import { useIndexStore } from "@/store/index.store";
import service from "~/service";

defineComponent({
  setup() {
    definePageMeta({
      name: "LoginPage",
      layout: "custom",
      middleware: "login",
    });
  },
});

const { $swal }: any = useNuxtApp();
const router = useRouter();
const store = useIndexStore();

const loading = ref<boolean>(false);
const form = reactive<LoginRequest>({
  username: "",
  password: "",
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
    const response: any = await service.auth.login({
      username: form.username,
      password: form.password,
    });

    if (response?.code == "200") {
      const refToken = setCookie("token");
      refToken.value = response?.data?.access_token || "";
      const refUsername = setCookie("username");
      refUsername.value = form.username || "";

      router.push("/");
    }
  } catch (error) {
    //
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss">
.card-login {
  padding: 8px;
  border: 1px solid #fff;
  border-radius: 8px;
  background-color: #fff;
  width: 300px;
}
</style>
