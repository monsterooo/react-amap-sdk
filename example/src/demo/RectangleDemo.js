import React from "react";
import { Map, PolyEditor, Rectangle } from 'react-amap-sdk';

class RectangleDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      version: "1.4.8",
      bounds: [[116.356449, 39.859008], [116.417901, 39.893797]],
      bounds2: [[116.326449, 39.829008], [116.397901, 39.873797]],
      strokeColor: "#006600",
      editing: false,
      center: [116.397992, 39.904478],
      zoom: 12
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
    const { bounds, bounds2, editing, zoom, center } = this.state;
    const boundsTemp = [[116.356149, 39.856008], [116.414901, 39.890797]];
    return (
      <div className="marker_demo">
        <div>
          <button onClick={this.changeState("bounds", boundsTemp)}>
            修改 Bounds
          </button>
          <button onClick={this.changeState("editing", true)}>
            编辑 Bounds
          </button>
        </div>
        <Map
          mapKey=""
          version="1.4.8"
          width={300}
          height={300}
          zoom={zoom}
          center={center}
        >
          <Rectangle bounds={bounds}  onCreate={(e) => {
            console.log('rectangle 1创建 > ', e);
          }}/>
          <PolyEditor edit={editing}>
            <Rectangle bounds={bounds2} fillColor="gold" strokeColor="orange" onCreate={(e) => {
              console.log('rectangle 2创建 > ', e);
            }}/>
          </PolyEditor>
        </Map>
      </div>
    );
  }
}

export default RectangleDemo;
