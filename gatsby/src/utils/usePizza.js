import { useContext, useState } from 'react'
import { OrderContext } from '../components/OrderContext'
import formatMoney from './formatMoney'
import calculateOrderTotal from './calculateOrderTotal'
import attachNamesAndPrices from './attachNamesAndPrices'

export default function usePizza(formData) {
  // 1. create some state to hold our order
  const [order, setOrder] = useContext(OrderContext)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  // 2. make a function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza])
  }
  // 3. make a function remove things from order
  function removeFromOrder(index) {
    setOrder(order.filter((_, i) => i !== index))
  }

  // this is the form submit handler
  async function submitOrder(e) {
    e.preventDefault()
    setLoading(true)
    // get all data
    const body = {
      order: attachNamesAndPrices(order),
      total: formatMoney(calculateOrderTotal(order)),
      ...formData,
    }
    // 4. send this data to a serverless function when then checkout
    const res = await fetch(
      // `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      '/api/placeOrder',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )
    const data = await res.json()

    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false) // turn off loading
      setError(data.message)
    } else {
      // it worked
      setLoading(false)
      setMessage('Success! Come on down for your pizza')
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  }
}
