import React from "react";
import { Map, Circle, Polygon, PolyEditor } from 'react-amap-sdk'


const pathTemp = [116.395992, 39.904278];
const extDataTemp = { name: 'monsterooo' };

class PolygonDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      version: "1.4.8",
      strokeColor: "#006600",
      editing: false,
      center: [116.397992, 39.904478],
      zoom: 12,
      circleCenter: [116.397992, 39.904478],
      radius: 100,
      extData: {ext: 'greeting'}
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
  render() {
    const { circleCenter, editing, zoom, center, radius, extData } = this.state;

    return (
      <div className="marker_demo">
        <div>
          <button onClick={this.changeState("circleCenter", pathTemp)}>
            修改 Circle Center
          </button>
          <button onClick={this.changeState("radius", 500)}>
            修改 Circle Radius
          </button>
          <button onClick={this.changeState("extData", extDataTemp)}>
            修改 Circle extData
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
        >
          <Circle center={circleCenter} radius={radius} extData={extData} onClick={(e) => {
            console.log('获取Circle数据 > ', e.target.getExtData());
          }} />
        </Map>
      </div>
    );
  }
}

export default PolygonDemo;
