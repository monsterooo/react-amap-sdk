import React from "react";
import { Map, InfoWindow } from 'react-amap-sdk';

class InfoWindowDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      version: "1.4.8",
      visible: false,
      position: [116.397992, 39.904478],
      size: [50, 50],
      offset: [0, 0],
      center: [116.397992, 39.904478],
      zoom: 12,
      blockShow: false
    };
    this.plugin = ["AMap.MouseTool", "AMap.PolyEditor"];
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
      version: "1.4.6"
    });
  };
  changeState = (key, val) => () => {
    this.setState({ [key]: val });
  };
  handleMapCreate = (map) => {
    this.setState({
      map
    });
  }
  handleCreate = (infoWindow) => {
    this.setState({
      infoWindow
    });
  }
  handleOpen = () => {
    const { infoWindow, map } = this.state;

    infoWindow.open(map, map.getCenter())
  }
  handleSetSize = () => {
    this.setState({
      // size: new window.AMap.Size(100, 100),
      size: [100, 200]
    })
  }
  render() {
    const { visible, position, size, offset, zoom, center, blockShow } = this.state;

    return (
      <div className="marker_demo">
        <div>
          <button onClick={this.handleOpen}>
            打开窗口js控制
          </button>
          <button onClick={this.changeState("visible", true)}>
            属性控制窗体显示
          </button>
          <button onClick={this.changeState("position", [116.430608, 39.877082])}>
            改变窗体Center
          </button>
          <button onClick={this.handleSetSize}>
            改变窗体 Size
          </button>
          <button onClick={this.changeState("offset", [20, 0])}>
            改变窗体 Offset
          </button>
          <button onClick={this.changeState("blockShow", true)}>
            销毁 InfoWindow
          </button>
        </div>
        <Map
          mapKey=""
          version="1.4.8"
          plugin={this.plugin}
          width={300}
          height={300}
          zoom={zoom}
          center={center}
          onClick={this.handleMapClick}
          onCreate={this.handleMapCreate}
        >
          {
            !blockShow ? <InfoWindow offset={offset} onCreate={this.handleCreate} visible={visible} position={position} size={size} onDestroy={(e) => {
              console.log('销毁InfoWindow > ', e)
            }}>
              <div>abc</div>
            </InfoWindow> : null
          }
        </Map>
      </div>
    );
  }
}

export default InfoWindowDemo;
