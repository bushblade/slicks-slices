import calculatePizzaPrice from './calculatePizzaPrice'
import formatMoney from './formatMoney'

export default function attachNamesAndPrices(order) {
  return order.map(({ name, image, price, size }) => ({
    name,
    thumbnail: image.asset.fluid.src,
    price: formatMoney(calculatePizzaPrice(price, size)),
    size,
  }))
}
