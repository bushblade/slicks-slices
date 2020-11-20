import React from 'react'
import { ItemsGrid, ItemStyles } from '../styles/Grids'

function LoadingGrid({ count }) {
  return (
    <ItemsGrid>
      {Array.from({ length: count }, (_, index) => (
        <ItemStyles key={index}>
          <p>
            <span className='mark'>Loading...</span>
          </p>
          <img
            src='data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII='
            alt='loading'
            className='loading'
            width='500'
            height='400'
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  )
}

export default LoadingGrid
