<template>
  <select
    v-model="model"
    class="min-w-[100px] rounded-none border-b-2 border-dashed border-current bg-transparent px-2 py-0.5 text-center outline-none"
  >
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
const model = defineModel({ type: String })
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
