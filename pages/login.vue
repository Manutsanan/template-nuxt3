<template>
  <div class="card-login p-3">
    <div class="d-flex align-items-center gap-auto">
      <h3 class="text-title m-0">TEMPLATE</h3>
      <span class="text-muted">LOGIN</span>
    </div>
    <hr />
    <form class="row g-2" @submit="onSubmit">
      <div class="col-12">
        <FormGroup type="input" title="Username" :data-model="form.Username" is-unique @return="form.Username = $event" />
      </div>
      <div class="col-12">
        <FormGroup type="password" title="Password" :data-model="form.Password" is-unique back
          @return="form.Password = $event" />
      </div>
      <div class="col-12 text-end">
        <button type="submit" class="btn btn-secondary" :disabled="loading"> Login </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { LoginRequest } from '@/models/auth.model';
import { useIndexStore } from '@/store/index.store';

defineComponent({
  setup() {
    definePageMeta({
      name: 'LoginPage',
      layout: 'custom',
      middleware: 'login'
    });
  },
})

const { $swal }: any = useNuxtApp();
const router = useRouter();
const store = useIndexStore();

const loading = ref<boolean>(false);
const form = ref<LoginRequest>({
  Username: '',
  Password: ''
});

const onSubmit = async (event: Event) => {
  event.preventDefault()

  if (!form.value.Username || !form.value.Password) {
    $swal.fire({
      icon: 'warning',
      title: 'warning !',
      text: 'Username or password incorrect.'
    })
    return
  }

  loading.value = true
  try {
    const token = Math.floor(new Date().getTime() / 1000)
    store.setCookie('accessToken', token, 60 * 60 * 12)
    store.setCookie('displayName', form.value.Username, 60 * 60 * 12)

    router.push("/");
  } catch (error) {
    // 
  } finally {
    loading.value = false
  }
}
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
