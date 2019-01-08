# react-amap-sdk

>

[![NPM](https://img.shields.io/npm/v/react-amap-sdk.svg)](https://www.npmjs.com/package/react-amap-sdk) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-amap-sdk
```

## Usage

```jsx
import React, { Component } from 'react'

import { Map, Marker } from 'react-amap-sdk'

class Example extends Component {
  render () {
    return (
      <Map
        scriptLoad
        mapKey='您的高德地图key'
        version='1.4.8'
        plugin={this.plugin}
        width={300}
        height={300}
        zoom={zoom}
        center={center}
      >
        <Marker
          icon={icon}
          position={position}
          onClick={e => {
            console.log('我被点击了', e.target)
          }}
          draggable={true}
        />
      </Map>
    )
  }
}
```

## License

MIT © [monsterooo](https://github.com/monsterooo)
