import React from 'react'
import { Map, Marker } from 'react-amap-sdk'

class MarkerDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      version: '1.4.8',
      test: 'a',
      icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png',
      markerPosition1: [104.068957, 30.537758],
      markerPosition2: [104.068957, 30.537758],
      markerOffset1: [-15, -15],
      markerOffset2: [0, 0],
      markerVisible1: false,
      zIndex: 100,
      angle: 0,
      clickable: true,
      center: [104.068968, 30.537758],
      zoom: 19
    }
    this.plugin = ['AMap.MouseTool', 'AMap.PolyEditor']
    this.extData = {
      greeting: 'hello, marker'
    }
  }
  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({ test: "b" });
    // }, 3000);
    // setInterval(() => {
    //   this.setState(state => ({ count: ++state.count }));
    // }, 2000);
  }
  handleChangeVersion = () => {
    this.setState({
      version: '1.4.6'
    })
  };
  handleChangeIcon = () => {
    this.setState({
      icon: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png'
    })
  };
  handleMapClick = e => {
    console.log('鼠标左键单击事件', e)
  };
  handleChangeOffset = () => {
    this.setState({ markerOffset: [-20, -20] })
  };
  handleChangePosition = () => {
    this.setState({ markerPosition2: [104.068978, 30.537768] })
  };
  handleChangeVisible = () => {
    this.setState({ markerVisible1: true })
  };
  handleChangeZindex = () => {
    this.setState({ zIndex: 101 })
  };
  handleChangeAngle = () => {
    this.setState({ angle: 60 })
  };
  handleChangeClickable = () => {
    this.setState({ clickable: false })
  };
  render() {
    const {
      icon,
      markerPosition1,
      markerPosition2,
      markerOffset1,
      markerOffset2,
      markerVisible1,
      zIndex,
      angle,
      clickable,
      zoom,
      center
    } = this.state
    return (
      <div className='marker_demo'>
        <div>
          <button onClick={this.handleChangeVersion}>改变版本</button>
          <button onClick={this.handleChangeIcon}>改变Marker Icon</button>
          <button onClick={this.handleChangeOffset}>改变Marker Offset</button>
          <button onClick={this.handleChangePosition}>
            改变Marker1 Position
          </button>
          <button onClick={this.handleChangeVisible}>改变Marker Visible</button>
          <button onClick={this.handleChangeZindex}>改变Marker zIndex</button>
          <button onClick={this.handleChangeAngle}>改变Marker Angle</button>
          <button onClick={this.handleChangeClickable}>
            改变Marker Clickable
          </button>
        </div>
        <Map
          scriptLoad
          mapKey=''
          version='1.4.8'
          width={300}
          height={300}
          doubleClickZoom={false}
          zoom={zoom}
          center={center}
          onClick={this.handleMapClick}
        >
          <Marker
            visible_back={markerVisible1}
            icon={icon}
            position={markerPosition1}
            offset={markerOffset1}
            zIndex={zIndex}
          >
            <div
              style={{
                width: 30,
                height: 30,
                background: 'rgba(56,56,56,0.5'
              }}
            />
            <div
              style={{
                width: 60,
                height: 60,
                background: 'rgba(56,56,56,0.5'
              }}
            />
          </Marker>
          <Marker
            icon={icon}
            position={markerPosition2}
            offset={markerOffset2}
            angle={angle}
            title='我是鼠标滑过的提示文字'
            onClick={e => {
              console.log('我被点击了', e.target.getExtData())
            }}
            draggable={true}
            clickable={clickable}
            extData={this.extData}
          />
        </Map>
      </div>
    )
  }
}

export default MarkerDemo
