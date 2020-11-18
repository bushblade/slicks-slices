import React from 'react'
import useLatestData from '../utils/useLatestData'

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <p>Currently Slicing</p>
    </div>
  )
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <p>Hot Slices</p>
    </div>
  )
}

function HomePage() {
  const { hotSlices, slicemasters } = useLatestData()
  return (
    <div className='center'>
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <div>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </div>
    </div>
  )
}

export default HomePage
