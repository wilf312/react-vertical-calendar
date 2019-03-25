import * as React from 'react'
import { render } from 'react-dom'
import State from './State'
import { SelectMode } from './const'

const App = () => {
  return (
    <div className="App">
      <State selectMode={SelectMode.RANGE} />
    </div>
  )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)
