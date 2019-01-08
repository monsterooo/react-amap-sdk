import React from "react";
import { Map, Polygon, PolyEditor } from 'react-amap-sdk';

class PolygonDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      version: "1.4.8",
      path1: [
        [116.403322, 39.920255],
        [116.410703, 39.897555],
        [116.402292, 39.892353],
        [116.389846, 39.891365]
      ],
      path2: [
        [116.405322, 39.922255],
        [116.412703, 39.899555],
        [116.404292, 39.894353],
        [116.393846, 39.893365]
      ],
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
    const { path1, path2, strokeColor, editing, zoom, center } = this.state;
    const pathTemp = [
      [116.362209, 39.887487],
      [116.422887, 39.878],
      [116.372105, 39.90651]
    ];
    return (
      <div className="marker_demo">
        <div>
          <button onClick={this.changeState("path1", pathTemp)}>
            修改 Path
          </button>
          <button onClick={this.changeState("strokeColor", "red")}>
            修改 strokeColor
          </button>
          <button onClick={this.changeState("editing", true)}>
            修改 strokeColor
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
          <PolyEditor edit={editing}>
            <Polygon path={path1} isOutline={true} strokeColor="#ff33ff" />
          </PolyEditor>
        </Map>
      </div>
    );
  }
}

export default PolygonDemo;
