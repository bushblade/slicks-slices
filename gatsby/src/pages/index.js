import React from 'react'
import useLatestData from '../utils/useLatestData'
import { HomePageGrid } from '../styles/Grids'
import LoadingGrid from '../components/LoadingGrid'
import ItemGrid from '../components/ItemGrid'

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className='center'>
        <span className='mark tilt'>Slicemasters on</span>
      </h2>
      <p>Standing by, ready to slice you up!</p>
      {!slicemasters ? (
        <LoadingGrid count={4} />
      ) : (
        <ItemGrid items={slicemasters} />
      )}
      {slicemasters && !slicemasters.length ? (
        <p>No one is working right now!</p>
      ) : null}
    </div>
  )
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className='center'>
        <span className='mark tilt'>Hot Slices on</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotSlices ? <LoadingGrid count={4} /> : <ItemGrid items={hotSlices} />}
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
