<script setup>
import loanCalculator from './components/loanCalculator.vue'

defineOptions({
  name: 'App',
})
</script>

<template>
  <loanCalculator />
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
