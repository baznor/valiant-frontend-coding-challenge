<template>
  <div class="relative">
    <input
      v-model="inputCache"
      type="text"
      class="relative mx-2 border-b-2 border-dashed border-current bg-transparent px-2 py-0.5 text-center outline-none"
      :class="{ 'border-error text-error': error != null }"
      :min="props.min"
      :max="props.max"
      :style="maxWidth ? `max-width: ${props.maxWidth}px` : ''"
    >
    <div
      v-if="error"
      class="absolute -bottom-4 left-0 w-full text-center text-xs leading-3 text-error"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useFinancialHelpers } from '../composables/financialHelpers'
const { toCurrencyString } = useFinancialHelpers()

const model = defineModel({ type: Number })
const modelText = defineModel('text', { type: String, required: false })

const props = defineProps({
  min: {
    required: false,
    type: Number,
    default: 0,
  },
  max: {
    required: false,
    type: Number,
    default: 1000000,
  },
  maxWidth: {
    required: false,
    type: Number,
    default: 1000,
  },
  maxLength: {
    required: false,
    type: Number,
    default: 1000,
  },
})

const inputCache = ref('')
const inputCacheNumber = ref(0)

onMounted(() => {
  inputCache.value = toCurrencyString(Number(model.value))
})

watch(inputCache, () => {
  // TODO: issue - removing the first digit of a number with only trailing zeros will change it to one - doesn't feel nice
  const amount = Number(inputCache.value.replace(/\D/g, ''))
  const formatted = toCurrencyString(Number(amount))
  inputCache.value = props.maxLength ? formatted.slice(0, props.maxLength) : formatted
  inputCacheNumber.value = amount
  model.value = Math.max(props.min, Math.min(inputCacheNumber.value, props.max))
  modelText.value = inputCache.value
})

const error = computed(() => {
  if (inputCacheNumber.value < props.min) {
    return `must be larger than ${toCurrencyString(props.min)}`
  } else if (inputCacheNumber.value > props.max) {
    return `must be less than ${toCurrencyString(props.max)}`
  }
  return null
})

</script>
