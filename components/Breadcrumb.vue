<template>
  <div class="card">
    <div class="card-body">
      <div class="row g-2">
        <div class="col-sm-12 col-lg-auto d-flex justify-content-end align-items-center">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb m-0">
              <li class="breadcrumb-item" v-for="list in lists" :key="list.index" :class="list.active && 'active'">
                <template v-if="!list.active">
                  <a :href="list.to">{{ list.name }}</a>
                </template>
                <template v-else>
                  {{ list.name }}
                </template>
              </li>
            </ol>
          </nav>
        </div>
        <div class="col-sm-12 col-lg-auto flex-grow d-flex justify-content-end align-items-center">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  lists: any
}

const props = withDefaults(defineProps<Props>(), {
  lists: [],
})
</script>

<style lang="scss">
.flex-grow {
  flex-grow: 1
}
</style>
