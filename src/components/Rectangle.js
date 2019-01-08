import React from 'react';
import PropTypes from 'prop-types';
import { omit, registerEvent } from "../utils/index";

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

class Rectangle extends React.Component {
  constructor(props) {
    super(props);
    const { _map_, visible, onCreate, onInstance } = props;
    const options = omit(props, ["_map_", "visible", "children", "bounds", "onInstance", "onCreate", "onDestroy", ...Object.keys(EVENT)]);
    const instanceOption = options;
    instanceOption.bounds = this.createBounds();
    this.rectangleInstance = new window.AMap.Rectangle(instanceOption);
    this.rectangleInstance.setMap(_map_);
    visible ? this.rectangleInstance.show() : this.rectangleInstance.hide();
    registerEvent(this.rectangleInstance, EVENT, props);
    onCreate && onCreate(this.rectangleInstance);
    onInstance && onInstance(this.rectangleInstance);
  }
  componentDidUpdate(prevProps) {
    const { bounds, extData, visible } = this.props;
    
    if (prevProps.bounds !== bounds) {
      this.rectangleInstance.setBounds(this.createBounds());
    }
    if (prevProps.extData !== extData) {
      this.rectangleInstance.setExtData(extData);
    }
    if (prevProps.visible !== visible) {
      visible ? this.rectangleInstance.show() : this.rectangleInstance.hide();
    }
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
      'strokeDasharray'
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
      const options = omit(this.props, listenOptions);
      this.rectangleInstance.setOptions(options)
    }
  }
  createBounds() {
    const { bounds } = this.props;
    if (!bounds) return;
    const southWest = new window.AMap.LngLat(bounds[0][0], bounds[0][1]);
    const northEast = new window.AMap.LngLat(bounds[1][0], bounds[1][1]);
    return new window.AMap.Bounds(southWest, northEast);
  }
  render() {
    return null;
  }
}

const COMPONENT_ATTR = {
  zIndex: PropTypes.number,
  bounds: PropTypes.any,
  bubble: PropTypes.bool,
  cursor: PropTypes.string,
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWeight: PropTypes.number,
  fillColor: PropTypes.string,
  fillOpacity: PropTypes.number,
  strokeStyle: PropTypes.string,
  strokeDasharray: PropTypes.array,
  extData: PropTypes.any
};

Rectangle.defaultProps = {
  visible: true,
};

Rectangle.propTypes = COMPONENT_ATTR;

export default Rectangle;