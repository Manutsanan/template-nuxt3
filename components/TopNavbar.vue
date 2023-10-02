<template>
  <div class="top-navbar">
    <template v-if="props.isMobile">
      <span><i class="fa-solid fa-user"></i> {{ displayName || '-' }}</span>
      <div class="d-flex align-items-center gap-auto">
        <button type="button" class="btn btn-secondary btn-sm" @click="onLogout">Logout</button>
        <i class="fa-solid fa-bars fa-xl" @click="sidebarSlide"></i>
      </div>
    </template>
    <template v-else>
      <i class="fa-solid fa-bars fa-xl" @click="sidebarSlide"></i>
      <div class="d-flex align-items-center gap-auto">
        <span><i class="fa-solid fa-user"></i> {{ displayName || '-' }}</span>
        <button type="button" class="btn btn-secondary btn-sm" @click="onLogout">Logout</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useIndexStore } from '@/store/index.store';

export interface Props {
  isMobile: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isMobile: false,
})

const router = useRouter();
const store = useIndexStore();

const displayName = computed(() => {
  return store.$state.displayName
})
const isOpen = computed(() => {
  return store.$state.isOpen
})

const sidebarSlide = () => {
  store.$state.isOpen = !isOpen.value
}

const onLogout = () => {
  store.setCookie('accessToken', '', 0)
  store.setCookie('displayName', '', 0)
  router.push("/login");
}
</script>

<style lang="scss">
.top-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  width: auto;
  min-height: 50px;
  background-color: #fff;
  border-left: 1px solid #cacaca;
  border-right: 1px solid #cacaca;

  .fa-bars {
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
