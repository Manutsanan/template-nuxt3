<template>
  <div class="w-full min-h-screen h-full">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineComponent({
  setup() {
    definePageMeta({
      name: "DefaultLayout",
    });
  },
});
</script>

<style lang="scss">
//
</style>
