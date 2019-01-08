import React from "react";
import { Map, Polyline, PolyEditor } from 'react-amap-sdk';

class PolylineDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      version: "1.4.8",
      path1: [
        [116.362209, 39.887487],
        [116.422897, 39.878002],
        [116.372105, 39.90651],
        [116.428945, 39.89663]
      ],
      path2: [
        [116.382209, 39.907487],
        [116.442897, 39.898002],
        [116.392105, 39.92651],
        [116.448945, 39.91663]
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
          {/* <Polyline
            visible={true}
            path={path1}
            strokeColor={strokeColor}
            onClick={e => {
              console.log("Polyline Click", e);
            }}
          /> */}
          {/* <Polyline
              visible={true}
              path={path2}
              strokeColor="red"
              onClick={e => {
                console.log("Polyline Click", e);
              }}
            /> */}
          <PolyEditor
            edit={editing}
            onAdjust={() => {
              console.log("调整节点");
            }}
          >
            <Polyline
              visible={true}
              path={path2}
              strokeColor="red"
              onClick={e => {
                console.log("Polyline Click", e);
              }}
            />
          </PolyEditor>
        </Map>
      </div>
    );
  }
}

export default PolylineDemo;
