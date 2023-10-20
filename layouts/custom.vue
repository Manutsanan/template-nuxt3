<template>
  <div class="layout">
    <div class="language">
      <div v-for="(item, index) in locales" :key="index">
        <img
          class="flag"
          :class="locale === item.code && 'active'"
          :src="item.path_image"
          :alt="item.name"
          width="40"
          @click="setLocale(item.code)"
        />
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
defineComponent({
  setup() {
    definePageMeta({
      name: "CustomLayout",
    });
  },
});

const { locales, locale, setLocale }: any = useI18n();

onMounted(() => {
  const i18n_redirected = useCookie("i18n_redirected");
  if (i18n_redirected) {
    setLocale(i18n_redirected.value);
  }
});
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .language {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    display: flex;
    gap: 8px;

    .flag {
      border: 2px solid transparent;
      cursor: pointer;
      &:hover {
        opacity: 0.6;
      }
      &.active {
        border-color: #fff !important;
      }
    }
  }
}
</style>
