<template>
  <div
    class="flex flex-col items-center"
    style="row-gap: 16px;"
  >
    <div
      class="flex grow flex-row flex-wrap items-center justify-center"
      style="row-gap: 16px;"
    >
      <div>I need</div>
      <div style="position: relative;">
        <input
          v-model="loanAmount"
          type="text"
          class="mx-2 px-2"
          :class="{ error: loanAmountInValid }"
          min="1000"
          max="20000000"
          data-cy="loan-amount"
        >
        <errorText
          v-if="loanAmountInValid"
          data-cy="error-text"
        >
          {{ loanAmountInValidText }}
        </errorText>
      </div>
      <div>for</div>
      <select
        v-model="purposeSelected"
        class="mx-2 block px-2 pe-9"
        data-cy="loan-purpose"
      >
        <template
          v-for="purpose in purposes"
          :key="purpose.value"
        >
          <option :value="purpose.value">
            {{ purpose.label }}
          </option>
        </template>
      </select>
    </div>
    <div class="flex grow flex-row flex-wrap items-center justify-center">
      <div>repaid</div>
      <select
        v-model="periodSelected"
        class="mx-2 px-2"
        data-cy="loan-period"
      >
        <template
          v-for="period in periods"
          :key="period.value"
        >
          <option :value="period.value">
            {{ period.label }}
          </option>
        </template>
      </select>
      <div>over</div>
      <select
        v-model="termSelected"
        class="mx-2 px-2"
        data-cy="loan-term"
      >
        <template
          v-for="term in terms"
          :key="term.value"
        >
          <option :value="term.value">
            {{ term.label }}
          </option>
        </template>
      </select>
    </div>
    <hr>
    <div
      class="text-primary"
      data-cy="loan-repayment"
    >
      {{ repaymentPretty }} {{ periodSelectedLabel }} repayments
    </div>
    <div
      class="text-secondary"
      data-cy="loan-total-repayment"
    >
      {{ totalRepayment }} Total repayments
    </div>
  </div>
</template>

<script setup>
import { useFetch } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useFinancialHelpers } from '../composables/financialHelpers'

const { PMT, toCurrencyString } = useFinancialHelpers()

const { data: purposes } = useFetch('http://localhost:4000/loan-purposes').get().json()
const { data: periods } = useFetch('http://localhost:4000/requested-repayment-periods').get().json()
const { data: terms } = useFetch('http://localhost:4000/requested-term-months').get().json()

const loanAmountMin = 1000
const loadAmountMax = 20000000

const loanAmount = ref('$30,000')
const purposeSelected = ref('general')
const periodSelected = ref(12)
const termSelected = ref(24)

const isLoading = computed(() => {
  return purposes.value == null || periods.value == null || terms.value == null
})

const loanAmountInValid = computed(() => {
  return loanAmountNumber.value < loanAmountMin || loanAmountNumber.value > loadAmountMax
})

const loanAmountInValidText = computed(() => {
  if (loanAmountNumber.value < loanAmountMin) {
    return 'must be larger than $1,000'
  } else if (loanAmountNumber.value > loadAmountMax) {
    return 'must be less than $20,000,000'
  }
  return null
})

const loanAmountNumber = computed(() => {
  return Number(loanAmount.value.replace(/\D/g, ''))
})

const loanAmountNumberClamped = computed(() => {
  return Math.max(loanAmountMin, Math.min(loanAmountNumber.value, loadAmountMax))
})

watch(loanAmount, () => {
  // TODO: issue - removing the first digit of a number with only trailing zeros will change it to one - doesn't feel nice
  const amount = Number(loanAmount.value.replace(/\D/g, ''))
  loanAmount.value = toCurrencyString(Number(amount))
  loanAmount.value = loanAmount.value.slice(0, 11) // clamp to a maximum of 11 characters to fit inside input
})

const repayments = computed(() => {
  const totalMonths = termSelected.value
  const repaymentPerYear = periodSelected.value
  const annualRate = purposes.value.find(purpose => purpose.value === purposeSelected.value).annualRate
  const result = Math.abs(PMT(annualRate / repaymentPerYear, totalMonths, loanAmountNumberClamped.value))
  return result / (periodSelected.value / 12)
})

const repaymentPretty = computed(() => {
  if (isLoading.value) {
    return '$0'
  }
  return toCurrencyString(repayments.value)
})

const periodSelectedLabel = computed(() => {
  if (isLoading.value) {
    return 'Monthly'
  }
  return periods.value.find(period => period.value === periodSelected.value).label
})

const totalRepayment = computed(() => {
  if (isLoading.value) {
    return '$0'
  }
  return toCurrencyString(Math.floor(repayments.value) * termSelected.value)
})

</script>

<style>
  /* TODO: this style should be scoped too */
  /* TODO: Im not familiar with how to use tailwind styling so will just put values here for now */
  :root {
    --color-text: #272c2d;
    --color-secondary: #8792a1;
    --color-primary: #00b67a;
    --color-accent: #07bbc4;
    --color-error: #ef5350;
  }

  div {
    color: var(--color-text);
    font-size: 24px;
    line-height: 32px;
    font-weight: 700;
  }

  input {
    max-width: 180px;
    text-align: center;
    color: var(--color-accent);
    border-bottom: 2px dashed var(--color-accent);
    padding: 2px 8px;
    background: none;
    position: relative;
  }

  input.error {
    color: var(--color-error) !important;
    border-color: var(--color-error) !important;
  }

  textarea:focus, input:focus{
    outline: none;
  }

  select {
    background: none;
    appearance: none;
    -webkit-appearance: none;
    color: var(--color-secondary);
    border-bottom: 2px dashed var(--color-secondary);
    border-radius: 0px;
    padding: 2px 8px;
    text-align: center;
    min-width: 100px;
  }

  .text-secondary {
    color: var(--color-secondary);
  }

  .text-primary {
    color: var(--color-primary);
  }

  hr {
    width: 100%;
    border-bottom: 2px solid var(--color-secondary);
    opacity: 0.1;
  }

  errorText {
    color: var(--color-error);
    position: absolute;
    font-size: 12px;
    line-height: 12px;
    bottom: -16px;
    left: 0px;
    text-align: center;
    width: 100%;
  }
</style>
