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

class Circle extends React.Component {
  constructor(props) {
    super(props);
    const { _map_, visible, onCreate, onInstance } = props;
    const options = omit(props, ["_map_", "visible", "children", "onInstance", "onCreate", "onDestroy", ...Object.keys(EVENT)]);
    this.circleInstance = new window.AMap.Circle(options);
    this.circleInstance.setMap(_map_);
    visible ? this.circleInstance.show() : this.circleInstance.hide();
    registerEvent(this.circleInstance, EVENT, props);
    onCreate && onCreate(this.circleInstance);
    onInstance && onInstance(this.circleInstance);
  }
  componentDidUpdate(prevProps) {
    const { visible } = this.props;

    if (prevProps.visible !== visible) {
      visible ? this.circleInstance.show() : this.circleInstance.hide();
    }
    this.updateOptions(prevProps);
  }
  componentWillUnmount() {
    const { onDestroy, _map_ } = this.props

    onDestroy && onDestroy(this.circleInstance)
    _map_.remove([this.circleInstance])
  }
  updateOptions(prevProps) {
    const listenOptions = [
      'zIndex',
      'center',
      'bubble',
      'cursor',
      'radius',
      'strokeColor',
      'strokeOpacity',
      'strokeWeight',
      'fillColor',
      'fillOpacity',
      'strokeStyle',
      'extData',
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
      const options = pick(this.props, listenOptions);
      this.circleInstance.setOptions(options)
    }
  }
  render() {
    return null;
  }
}

const COMPONENT_ATTR = {
  zIndex: PropTypes.number,
  center: PropTypes.any,
  bubble: PropTypes.bool,
  cursor: PropTypes.string,
  radius: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWeight: PropTypes.number,
  fillColor: PropTypes.string,
  fillOpacity: PropTypes.number,
  strokeStyle: PropTypes.string,
  strokeDasharray: PropTypes.array,
  extData: PropTypes.any,
}
Circle.defaultProps = {
  visible: true,
}
Circle.propTypes = COMPONENT_ATTR;


export default Circle;
