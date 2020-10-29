const sizes = {
  s: 0.75,
  m: 1,
  l: 1.25,
}

export default function calculatePizzaPrice(price, size) {
  return price * sizes[size.toLowerCase()]
}
