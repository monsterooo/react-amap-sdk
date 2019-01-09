import React, { Component } from 'react'
import MarkerDemo from './demo/MarkerDemo';
import InfoWindowDemo from './demo/InfoWindowDemo';
import RectangleDemo from './demo/RectangleDemo';

export default class App extends Component {
  render () {
    return (
      <div>
        {/* <MarkerDemo /> */}
        <InfoWindowDemo />
        {/* <RectangleDemo /> */}
      </div>
    )
  }
}
