import React from 'react';
import PropTypes from 'prop-types';
import Load from './Load';
import { pick, omit, registerEvent } from "../utils/index";

const EVENT = {
  onComplete: "complete",
  onCilck: "click",
  onDblClick: "dblclick",
  onMapMove: "mapmove",
  onHotSpotClick: "hotspotclick", // v1.3
  onHotSpotover: "hotspotover", // v1.3
  onHotSpotout: "hotspotout", // v1.3
  onMovestart: "movestart",
  onMoveEnd: "moveend",
  onZoomChange: "zoomchange",
  onZoomStart: "zoomstart",
  onZoomEnd: "zoomend",
  onMouseMove: "mousemove",
  onMouseWheel: "mousewheel",
  onMouseOver: "mouseover",
  onMouseOut: "mouseout",
  onMouseUp: "mouseup",
  onMouseDown: "mousedown",
  onRightClick: "rightclick",
  onDragStart: "dragstart",
  onDragging: "dragging",
  onDragEnd: "dragend",
  onResize: "resize",
  onTouchStart: "touchstart",
  onTouchMove: "touchmove",
  onTouchEnd: "touchend"
};

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
    this.mapInstance = null
    this.omitAttr = [
      'mapKey',
      'plugin',
      'version',
      'apiUrl',
      'children',
      'width',
      'height',
      'onCreate',
      'onDestroy',
      'customLoad',
      ...Object.keys(EVENT)
    ]
    this.map_attr = Object.keys(COMPONENT_ATTR)
  }
  componentWillUnmount() {
    const { onDestroy } = this.props

    onDestroy && onDestroy(this.mapInstance)
  }
  handleLoaded = () => {
    const { onCreate } = this.props;
    const options = pick(this.props, this.map_attr);
    this.mapInstance = new window.AMap.Map(this.mapRef.current, options);
    window.map = this.mapInstance; // test
    registerEvent(this.mapInstance, EVENT, this.props);
    onCreate && onCreate(this.mapInstance);
  }
  preProgressChildren(children) {
    if (!children) return null
    return React.Children.map(children, child => {
      if (!child) return null
      return React.cloneElement(child, { _map_: this.mapInstance });
    });
  }
  render() {
    const { width, height, children } = this.props;
    const extProps = omit(this.props, [...this.omitAttr, ...this.map_attr]);

    return (
      <Load {...this.props} onLoaded={this.handleLoaded}>
        {(loaded) => (
          <div
            ref={this.mapRef}
            style={{ width: width, height: height }}
            {...extProps}
          >
            {loaded && this.preProgressChildren(children)}
          </div>
        )}
      </Load>
    )
  }
}

const COMPONENT_ATTR = {
  view: PropTypes.any,
  layers: PropTypes.array,
  zoom: PropTypes.number,
  center: PropTypes.any,
  labelzIndex: PropTypes.number,
  zooms: PropTypes.array,
  lang: PropTypes.string,
  defaultCursor: PropTypes.string,
  crs: PropTypes.string,
  animateEnable: PropTypes.bool,
  isHotspot: PropTypes.bool,
  defaultLayer: PropTypes.any,
  rotateEnable: PropTypes.bool,
  resizeEnable: PropTypes.bool,
  showIndoorMap: PropTypes.bool,
  indoorMap: PropTypes.any,
  expandZoomRange: PropTypes.bool,
  dragEnable: PropTypes.bool,
  zoomEnable: PropTypes.bool,
  doubleClickZoom: PropTypes.bool,
  keyboardEnable: PropTypes.bool,
  jogEnable: PropTypes.bool,
  scrollWheel: PropTypes.bool,
  touchZoom: PropTypes.bool,
  touchZoomCenter: PropTypes.number,
  mapStyle: PropTypes.string,
  features: PropTypes.array,
  showBuildingBlock: PropTypes.bool,
  viewMode: PropTypes.string,
  pitch: PropTypes.number,
  pitchEnable: PropTypes.bool,
  buildingAnimation: PropTypes.bool,
  skyColor: PropTypes.string,
  preloadMode: PropTypes.bool,
  mask: PropTypes.array,
}
Map.propTypes = COMPONENT_ATTR;

export default Map;
