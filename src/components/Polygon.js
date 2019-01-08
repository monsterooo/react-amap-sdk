import React from 'react';
import PropTypes from 'prop-types';
import { pick, omit, registerEvent } from "../utils/index";

const EVENT = {
  onClick: "click",
  onDblClick: "dblclick",
  onRightClick: "rightclick",
  onHide: "hide",
  onShow: "show",
  onMouseDown: "mousedown",
  onMouseUp: "mouseup",
  onMouseOver: "mouseover",
  onMouseOut: "mouseout",
  onChange: "change",
  onTouchStart: "touchstart",
  onTouchMove: "touchmove",
  onTouchEnd: "touchend"
};

class Polygon extends React.Component {
  constructor(props) {
    super(props);
    const { _map_, visible, onCreate, onInstance } = props;
    const options = omit(props, ["_map_", "visible", "children", "onInstance", "onCreate", "onDestroy", ...Object.keys(EVENT)]);
    this.polygonInstance = new window.AMap.Polygon(options);
    this.polygonInstance.setMap(_map_);
    visible ? this.polygonInstance.show() : this.polygonInstance.hide();
    registerEvent(this.polygonInstance, EVENT, props);
    onCreate && onCreate(this.polygonInstance);
    onInstance && onInstance(this.polygonInstance);
  }
  componentDidUpdate(prevProps) {
    const { path, extData, visible } = this.props;

    if (prevProps.path !== path) {
      this.polygonInstance.setPath(path);
    }
    if (prevProps.extData !== extData) {
      this.polygonInstance.setExtData(extData);
    }
    if (prevProps.visible !== visible) {
      visible ? this.polygonInstance.show() : this.polygonInstance.hide();
    }
    this.updateOptions();
  }
  updateOptions(prevProps) {
    const listenOptions = [
      'zIndex',
      'bubble',
      'strokeColor',
      'cursor',
      'fillColor',
      'fillOpacity',
      'strokeOpacity',
      'strokeWeight',
      'strokeStyle',
      'strokeDasharray',
      'draggable'
    ];
    const len = listenOptions.length;
    let isChanged = false;
    for(let i = 0; i <= len - 1; i++) {
      const key = listenOptions[i];
      if (prevProps[key] !== this.props[key]) {
        isChanged = true;
        break;
      }
    }
    if (isChanged) {
      const options = pick(this.props, listenOptions);
      this.polygonInstance.setOptions(options)
    }
  }
  render() {
    return null;
  }
}

const COMPONENT_ATTR = {
  zIndex: PropTypes.number,
  path: PropTypes.array,
  bubble: PropTypes.bool,
  cursor: PropTypes.string,
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWeight: PropTypes.number,
  fillColor: PropTypes.string,
  fillOpacity: PropTypes.number,
  draggable: PropTypes.bool,
  strokeStyle: PropTypes.string,
  strokeDasharray: PropTypes.array,
  extData: PropTypes.any,
}

Polygon.defaultProps = {
  visible: true,
}

Polygon.propTypes = COMPONENT_ATTR;


export default Polygon;