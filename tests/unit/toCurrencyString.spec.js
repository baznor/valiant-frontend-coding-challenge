import { useFinancialHelpers } from '@/composables/financialHelpers'
const { toCurrencyString } = useFinancialHelpers()

describe('toCurrencyString', () => {
  it('comma in the right place', () => {
    expect(toCurrencyString(0)).toEqual('$0')
    expect(toCurrencyString(1)).toEqual('$1')
    expect(toCurrencyString(10)).toEqual('$10')
    expect(toCurrencyString(100)).toEqual('$100')
    expect(toCurrencyString(1000)).toEqual('$1,000')
    expect(toCurrencyString(10000)).toEqual('$10,000')
    expect(toCurrencyString(100000)).toEqual('$100,000')
    expect(toCurrencyString(1000000)).toEqual('$1,000,000')
  })

  it('handles negative numbers', () => {
    expect(toCurrencyString(-100)).toEqual('-$100')
    expect(toCurrencyString(-1000)).toEqual('-$1,000')
  })

  it('handles decimals', () => {
    expect(toCurrencyString(10.1234)).toEqual('$10')
  })

  it('handles different currencies', () => {
    expect(toCurrencyString(1000, 'EUR')).toEqual('€1,000')
    expect(toCurrencyString(1000, 'USD')).toEqual('$1,000')
    expect(toCurrencyString(1000, 'JPY')).toEqual('¥1,000')
    expect(toCurrencyString(1000, 'GBP')).toEqual('£1,000')
  })
})
