import { useState } from 'react'

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults)

  function updateValues(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  return [values, updateValues]
}
