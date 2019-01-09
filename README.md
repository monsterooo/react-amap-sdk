# react-amap-sdk

>

[![NPM](https://img.shields.io/npm/v/react-amap-sdk.svg)](https://www.npmjs.com/package/react-amap-sdk) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## 安装

```bash
npm install --save react-amap-sdk
```

## 基础使用

```jsx
import React, { Component } from 'react'

import { Map, Marker } from 'react-amap-sdk'

class Example extends Component {
  render () {
    return (
      <Map
        mapKey='您的高德地图key'
        version='1.4.8'
        plugin={this.plugin}
        width={300}
        height={300}
        center={center}
      >
        <Marker
          icon={icon}
          position={position}
          onClick={e => {
            console.log('我被点击了', e.target)
          }}
        />
      </Map>
    )
  }
}
```

## Map组件加载

Map组件支持自动创建`script`去加载高德sdk和直接在网页中引入`script`脚本。如果在Map中加载组件需要三个参数代码如下：

```javascript
// 自动加载高德sdk
<Map
  mapKey='您的高德地图key'
  version='1.4.8'
  plugin={this.plugin}
/>
```

其中`mapKey`和`version`为必选，`plugin`为可选它是您要加载高德地图的扩展插件。`mapKey`为您在高德地图中申请的`key`

手动在html中插入`scirpt`引入高德sdk，并且在Map组件中使用`customeLoad`属性即可

```javascript
<Map
  customeLoad
/>
```

## 属性映射

所有的属性都和高德地图的属性一一对应，使用时直接使用高德地图对应的属性即可。除了事件和少数扩展属性和高德地图不同之外。这里拿Marker组件来进行演示代码如下：

```javascript
<Map
  customeLoad
>
  <Marker
    icon={icon}
    position={markerPosition}
    offset={markerOffset}
    angle={angle}
    title='我是鼠标滑过的提示文字'
    draggable={true}
    clickable={clickable}
    extData={this.extData}
    onClick={e => {
      console.log('我被点击了', e.target.getExtData())
    }}
  />
</Map>
```

在上面Marker组件的属性中，除了onClick之外，其余的属性都是保持和高德地图一致，目的在于简化使用和记忆。

注：对于事件保持了和react官方一致的命名方法

## 扩展功能

  所有的组件都有两个和扩展相关的事件：`onCreate`和`onDestroy`，`onCreate`在创建完高德地图的对象时调用，`onDestroy`在React组件被销毁时调用。

  如果需要一些更个性化的定制，可以使用`onCreate`去获得到高德地图对应的对象实例。然后即可调用高德地图原生sdk的方法从而进行更个性化的定制。

## 更多演示

暂时请看`/example/src/demo/`下面的示例文件


## 组件列表

* Map

* Marker

* Polyline

* Polygon

* Rectangle

* Circle

* PolyEditor

* InfoWindow


## License

MIT © [monsterooo](https://github.com/monsterooo)
