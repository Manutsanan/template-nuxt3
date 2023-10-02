<template>
  <div class="row g-2">
    <div class="col-12">
      <Breadcrumb :lists="[
        { name: 'User', to: '#', active: true }
      ]">
        <button class="btn btn-primary btn-sm">New</button>
      </Breadcrumb>
    </div>
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          Content
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineComponent({
  setup() {
    definePageMeta({
      name: 'UserPageChildList',
      middleware: 'auth'
    });
  },
})
</script>