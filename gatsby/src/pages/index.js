import React from 'react'
import useLatestData from '../utils/useLatestData'
import { HomePageGrid } from '../styles/Grids'
import LoadingGrid from '../components/LoadingGrid'

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      {!slicemasters ? <LoadingGrid count={4} /> : null}
      {slicemasters && !slicemasters.length ? (
        <p>No one is working right now!</p>
      ) : null}
    </div>
  )
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      {!hotSlices ? <LoadingGrid count={4} /> : null}
      {hotSlices && !hotSlices.length ? (
        <p>There are no hot slices right now!</p>
      ) : null}
    </div>
  )
}

function HomePage() {
  const { hotSlices, slicemasters } = useLatestData()
  return (
    <div className='center'>
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  )
}

export default HomePage
