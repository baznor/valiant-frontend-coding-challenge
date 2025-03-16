<template>
  <div class="currencyInput">
    <input
      v-model="inputCache"
      type="text"
      class="mx-2 px-2"
      :class="{ error: error != null }"
      :min="props.min"
      :max="props.max"
      :style="maxWidth ? `max-width: ${props.maxWidth}px` : ''"
    >
    <div
      v-if="error"
      class="errorText"
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

<style scoped>
  .currencyInput {
    position: relative;

    input {
      text-align: center;
      border-bottom: 2px dashed;
      padding: 2px 8px;
      background: none;
      position: relative;
    }

    input.error {
      color: #ef5350 !important;
      border-color: #ef5350 !important;
    }

    textarea:focus, input:focus{
      outline: none;
    }

    .errorText {
      color: #ef5350;
      position: absolute;
      font-size: 12px;
      line-height: 12px;
      bottom: -16px;
      left: 0px;
      text-align: center;
      width: 100%;
    }
  }
</style>
