<template>
  <div
    class="flex flex-col items-center text-2xl font-semibold"
    style="row-gap: 16px;"
  >
    <div
      class="flex grow flex-row flex-wrap items-center justify-center"
      style="row-gap: 16px;"
    >
      <div>I need</div>
      <inputCurrency
        v-model="loanAmount"
        v-model:text="loanAmountText"
        :min="loanAmountMin"
        :max="loanAmountMax"
        :max-length="11"
        :max-width="180"
        data-cy="loan-amount"
        class="text-accent"
      />
      <div>for</div>
      <selectUnderline
        v-model="purposeSelected"
        class="mx-2 block px-2 text-secondary"
        :items="purposes"
        data-cy="loan-purpose"
      />
    </div>
    <div class="flex grow flex-row flex-wrap items-center justify-center">
      <div>repaid</div>
      <selectUnderline
        v-model="periodSelected"
        class="mx-2 px-2 text-secondary"
        :items="periods"
        data-cy="loan-period"
      />
      <div>over</div>
      <selectUnderline
        v-model="termSelected"
        class="mx-2 px-2 text-secondary"
        :items="terms"
        data-cy="loan-term"
      />
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
import inputCurrency from './inputCurrency.vue'
import selectUnderline from './selectUnderline.vue'
import { useFetch } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useFinancialHelpers } from '../composables/financialHelpers'

const { PMT, toCurrencyString } = useFinancialHelpers()

const { data: purposes } = useFetch('http://localhost:4000/loan-purposes').get().json()
const { data: periods } = useFetch('http://localhost:4000/requested-repayment-periods').get().json()
const { data: terms } = useFetch('http://localhost:4000/requested-term-months').get().json()

const loanAmountMin = 1000
const loanAmountMax = 20000000

const loanAmount = ref(30000)
const loanAmountText = ref(null)
const purposeSelected = ref('general')
const periodSelected = ref(12)
const termSelected = ref(24)

const isLoading = computed(() => {
  return purposes.value == null || periods.value == null || terms.value == null
})

const repayments = computed(() => {
  const totalMonths = termSelected.value
  const repaymentPerYear = periodSelected.value
  const annualRate = purposes.value.find(purpose => purpose.value === purposeSelected.value).annualRate
  const result = Math.abs(PMT(annualRate / repaymentPerYear, totalMonths, loanAmount.value))
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

<style scoped>
  hr {
    width: 100%;
    border-bottom: 2px solid;
    opacity: 0.05;
  }
</style>
