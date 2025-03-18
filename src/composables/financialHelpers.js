export function useFinancialHelpers () {
  // futureValue - [optional] The future value, or a cash balance you want after the last payment is made. Defaults to 0 (zero).
  // type - [optional] When payments are due. 0 = end of period. 1 = beginning of period. Default is 0.
  const PMT = (annualRate, numberOfPayments, loanAmount, futureValue = 0, type = 0) => {
    const presentValueInterstFector = Math.pow(1 + annualRate, numberOfPayments)
    if (annualRate === 0) {
      return -(futureValue + loanAmount) / numberOfPayments
    }

    return -(annualRate * (futureValue + (presentValueInterstFector * loanAmount))) /
        ((-1 + presentValueInterstFector) * (1 + annualRate * (type)))
  }

  const toCurrencyString = (value, currency = 'USD') => {
    return Math.floor(Number(value)).toLocaleString('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    })
  }

  return { PMT, toCurrencyString }
}
