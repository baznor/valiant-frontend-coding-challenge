<template>
  <select v-model="model">
    <template
      v-for="item in items"
      :key="item[props.itemValue]"
    >
      <option :value="item[props.itemValue]">
        {{ item[props.itemLabel] }}
      </option>
    </template>
  </select>
</template>

<script setup>
const model = defineModel()
const props = defineProps({
  items: {
    required: false,
    type: Array,
    default: () => [],
  },
  itemValue: {
    required: false,
    type: String,
    default: 'value',
  },
  itemKey: {
    required: false,
    type: String,
    default: 'key',
  },
  itemLabel: {
    required: false,
    type: String,
    default: 'label',
  },
})
</script>

<style scoped>

  select {
    background: none;
    appearance: none;
    -webkit-appearance: none;
    border-bottom: 2px dashed;
    border-radius: 0px;
    padding: 2px 8px;
    text-align: center;
    min-width: 100px;
  }
</style>
