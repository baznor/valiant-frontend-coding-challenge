<script setup>
import loanCalulator from './components/loanCalulator.vue'

defineOptions({
  name: 'App',
})
</script>

<template>
  <loanCalulator />
</template>

<style>
body {
  background: #f5f7f9;
  min-height: 100dvh;
  width: 100%;
  display: grid;
  place-items: center;
}
</style>
