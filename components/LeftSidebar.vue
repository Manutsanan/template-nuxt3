<template>
  <div class="left-sidebar" :class="isOpen && 'show'">
    <div class="text-center logo">
      <h4 class="text-title m-0">TEMPLATE</h4>
      <div class="boder-line"></div>
    </div>
    <div class="menu-list">
      <div v-for="menu in menuLists" :key="menu?.index" class="menu">
        <template v-if="menu?.childs?.length">
          <div
            class="menu-header cursor-pointer"
            @click="menu.show = !menu.show"
          >
            <div class="menu-title">
              <i v-if="menu?.icon" :class="menu?.icon"></i>
              {{ menu?.name || "-" }}
            </div>
            <i
              class="fa-regular"
              :class="(menu.show && 'fa-caret-down') || 'fa-caret-left'"
            ></i>
          </div>
          <div v-if="menu?.show == true" class="menu-child">
            <div
              v-for="child in menu.childs"
              :key="child.index"
              class="child cursor-pointer"
              :class="child.active && 'active'"
              @click="onClickNextRoute(child.to)"
            >
              <i class="fa-solid fa-minus fa-2xs"></i>{{ child.name }}
            </div>
          </div>
        </template>
        <template v-else>
          <div
            class="menu-header-main cursor-pointer"
            :class="menu.active && 'active'"
            @click="onClickNextRoute(menu.to)"
          >
            <div class="menu-title">
              <i v-if="menu?.icon" :class="menu?.icon"></i>
              {{ menu?.name || "-" }}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIndexStore } from "@/store/index.store";

const router = useRouter();
const route = useRoute();
const store = useIndexStore();

const menuLists = ref<any>([
  {
    active: false,
    name: "Dashboard",
    icon: "fa-solid fa-grid-horizontal",
    to: "/",
  },
  {
    show: true,
    name: "User Manage",
    icon: "fa-solid fa-users",
    childs: [
      {
        active: false,
        name: "User",
        to: "/user-manage/user",
      },
    ],
  },
  {
    show: true,
    name: "Role Permission",
    icon: "fa-solid fa-shield-halved",
    childs: [
      {
        active: false,
        name: "Role",
        to: "/role-permission/role",
      },
      {
        active: false,
        name: "Permission",
        to: "/role-permission/permission",
      },
    ],
  },
  {
    active: false,
    name: "Setting",
    icon: "fa-solid fa-gear",
    to: "/setting",
  },
  {
    active: false,
    name: "Log",
    icon: "fa-regular fa-arrow-progress",
    to: "/log",
  },
]);

const isOpen = computed(() => {
  return store.$state.isOpen;
});

watch(
  () => route.path,
  () => {
    initDate();
  },
  {
    deep: true,
  }
);

onMounted(() => {
  initDate();
});

const initDate = () => {
  for (let index = 0; index < menuLists.value.length; index++) {
    const menuList = menuLists.value[index];
    if (menuList?.to && menuList?.to === route.path) {
      menuList.active = true;
    } else if (menuList?.childs?.length) {
      for (let index = 0; index < menuList.childs.length; index++) {
        const child = menuList.childs[index];
        if (child?.to && child?.to === route.path) {
          menuList.show = true;
          child.active = true;
        } else {
          child.active = false;
        }
      }
    } else {
      menuList.active = false;
    }
  }
};

const onClickNextRoute = (to: string) => {
  router.push(to);
};
</script>

<style lang="scss">
.left-sidebar {
  position: absolute;
  z-index: 9999;
  display: none;
  flex-direction: column;
  width: 300px;
  height: 100vh;
  background-color: #fff;
  word-wrap: normal;
  border-right: 1px solid #cacaca;
  transition: all 0.2s ease-in-out;

  &.show {
    display: flex;
  }

  .logo {
    padding: 12px 12px 0 12px;
  }

  .boder-line {
    margin: 8px 0;
    border-bottom: 1px solid #000;
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 4px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 12px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    .menu {
      padding: 4px 18px;

      .menu-header {
        display: flex;
        justify-content: space-between;
        padding: 8px;

        &:hover {
          opacity: 0.8;
        }

        .menu-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      }

      .menu-header-main {
        display: flex;
        align-items: center;
        gap: 8px;
        border: 1px solid transparent;
        border-radius: 8px;
        padding: 8px;

        &:hover {
          border: 1px solid #000;
          background-color: #606060;
          color: #fff;
        }

        &.active {
          border: 1px solid #000;
          background-color: #606060;
          color: #fff;
        }
      }

      .menu-child {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding-left: 18px;
        padding-top: 6px;

        .child {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid transparent;
          border-radius: 8px;
          padding: 8px;

          &:hover {
            border: 1px solid #000;
            background-color: #606060;
            color: #fff;
          }

          &.active {
            border: 1px solid #000;
            background-color: #606060;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
