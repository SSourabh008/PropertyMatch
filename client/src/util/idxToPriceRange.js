export const arrPriceRanges = [
    "0-100000",
    "100000-1000000",
    "1000000-5000000",
    "5000000-10000000",
    "10000000-100000000"
]

export const priceRangeToIndex = (priceRange) => {
   const index = arrPriceRanges.findIndex(priceRg => priceRg === priceRange)

   return index
}