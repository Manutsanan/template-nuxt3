<template>
  <div class="layout-default">
    <LeftSidebar />
    <div class="layout-content" :class="[
      (isMobile && 'mobile') || 'desktop',
      (!isOpen && 'is-close') || 'is-open'
    ]">
      <TopNavbar :is-mobile="isMobile" />
      <!-- CONTENT -->
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIndexStore } from '@/store/index.store';

defineComponent({
  setup() {
    definePageMeta({
      name: 'DefaultLayout',
    });
  },
})

const store = useIndexStore();

const screenWidth = ref<number>(0);
const screenWidthMobile = ref<number>(1280);

const isOpen = computed(() => {
  return store.$state.isOpen
})
const isMobile = computed(() => {
  const isMobile = screenWidth.value <= screenWidthMobile.value
  store.$state.isOpen = !isMobile
  return isMobile
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    initDate()
  }
})

const initDate = () => {
  updateScreenWidth()
  window.addEventListener('resize', updateScreenWidth)
}
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth
}

</script>

<style lang="scss">
.layout-default {
  display: flex;
  width: 100%;
  height: 100vh;

  .layout-content {
    display: flex;
    flex-direction: column;
    width: 100%;

    &.desktop {
      margin-left: 300px;

      &.is-close {
        margin-left: 0 !important;
      }
    }

    &.mobile {
      margin-left: 0 !important;
    }

    .content {
      padding: 18px 16px;
      width: 100%;
    }
  }
}
</style>
