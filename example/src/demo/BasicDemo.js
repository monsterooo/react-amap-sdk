import React from 'react'
import { Map, Marker } from 'react-amap-sdk'

class BasicDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      version: '1.4.8',
      markerPosition: [104.068957, 30.537758],
      center: [104.068968, 30.537758],
    }
  }
  render() {
    const {
      markerPosition,
      center,
    } = this.state
    return (
      <div className='marker_demo'>
        <Map
          mapKey=''
          version='1.4.8'
          width={300}
          height={300}
          center={center}
        >
          <Marker
            position={markerPosition}
            onClick={e => {
              console.log('我被点击了', e)
            }}
          />
        </Map>
      </div>
    )
  }
}

export default BasicDemo
