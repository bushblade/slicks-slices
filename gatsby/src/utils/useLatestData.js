import { useState, useEffect } from 'react'

const gql = String.raw

const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`

function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState()
  // slicemasters
  const [slicemasters, setSlicemasters] = useState()
  // use a side effect to fetch the data from the qraphql endpoint
  useEffect(() => {
    // when the component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemasters {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // TODO: check for errors
        // set data to state
        setHotSlices(data.data.StoreSettings.hotSlices)
        setSlicemasters(data.data.StoreSettings.slicemasters)
      })
  }, [])

  return {
    hotSlices,
    slicemasters,
  }
}

export default useLatestData
