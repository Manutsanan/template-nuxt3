<template>
  <div class="layout">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineComponent({
  setup() {
    definePageMeta({
      name: 'CustomLayout',
    });
  },
})
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
</style>
