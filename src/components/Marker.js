import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { omit, registerEvent } from "../utils/index";

/**
 * 事件映射说明
 * click => onClick
 * dblclick => on
 */
const EVENT = {
  onClick: "click",
  onDblClick: "dblclick",
  onRightClick: "rightclick",
  onMouseMove: "mousemove",
  onMouseOver: "mouseover",
  onMouseout: "mouseout",
  onMouseDown: "mousedown",
  onMouseUp: "mouseup",
  onDragStart: "dragstart",
  onDragging: "dragging",
  onDragEnd: "dragend",
  onMoving: "moving",
  onMoveEnd: "moveend",
  onMoveaLong: "movealong",
  onTouchStart: "touchstart",
  onTouchMove: "touchmove",
  onTouchEnd: "touchend"
};


class Marker extends React.Component {
  constructor(props) {
    super(props);
    const { _map_, onCreate, visible, onInstance, offset } = props;
    const instanceOption = omit(props, ["_map_", "visible", "children", "offset", "onInstance", "onCreate", "onDestroy", ...Object.keys(EVENT)]);
    if (offset) {
      instanceOption.offset = new window.AMap.Pixel(offset[0], offset[1]);
    }
    this.markerElement = document.createElement("div");
    this.markerInstance = new window.AMap.Marker(instanceOption);
    this.markerInstance.setMap(_map_);
    visible ? this.markerInstance.show() : this.markerInstance.hide();
    this.renderContent();
    registerEvent(this.markerInstance, EVENT, props);
    onCreate && onCreate(this.markerInstance);
    onInstance && onInstance(this.markerInstance);
  }
  componentDidUpdate(prevProps) {
    const { angle, icon, offset, position, visible, zIndex, animation, title, clickable, shape, extData } = this.props;

    if (prevProps.angle !== angle) {
      this.markerInstance.setAngle(angle);
    }
    if (prevProps.icon !== icon) {
      this.markerInstance.setIcon(icon);
    }
    if (prevProps.offset !== offset) {
      const newOffset = new window.AMap.Pixel(offset[0], offset[1]);
      this.markerInstance.setOffset(newOffset);
    }
    if (prevProps.position !== position) {
      this.markerInstance.setPosition(position);
    }
    if (prevProps.visible !== visible) {
      visible ? this.markerInstance.show() : this.markerInstance.hide();
    }
    if (prevProps.zindex !== zIndex) {
      this.markerInstance.setzIndex(zIndex);
    }
    if (prevProps.animation !== animation) {
      this.markerInstance.setAnimation(animation);
    }
    if (prevProps.title !== title) {
      this.markerInstance.setTitle(title);
    }
    if (prevProps.clickable !== clickable) {
      this.markerInstance.setClickable(clickable);
    }
    if (prevProps.shape !== shape) {
      this.markerInstance.setShape(shape);
    }
    if (prevProps.extData !== extData) {
      this.markerInstance.setExtData(extData);
    }
    this.renderContent();
  }
  componentWillUnmount() {
    const { onDestroy } = this.props;

    onDestroy && onDestroy(this.markerInstance);
  }
  renderContent() {
    const { children } = this.props;

    if (!children) return false;
    render(children, this.markerElement);
    this.markerInstance.setContent(this.markerElement);
  }
  render() {
    return null;
  }
}

const COMPONENT_ATTR = {
  position: PropTypes.array,
  offset: PropTypes.array,
  icon: PropTypes.any,
  topWhenClick: PropTypes.bool,
  bubble: PropTypes.bool,
  draggable: PropTypes.bool,
  raiseOnDrag: PropTypes.bool,
  cursor: PropTypes.string,
  visible: PropTypes.bool,
  zIndex: PropTypes.number,
  angle: PropTypes.number,
  autoRotation: PropTypes.bool,
  animation: PropTypes.string,
  shadow: PropTypes.any,
  title: PropTypes.string,
  clickable: PropTypes.bool,
  shape: PropTypes.any,
  extData: PropTypes.any,
  label: PropTypes.any,
}

Marker.defaultProps = {
  visible: true,
}
Marker.propTypes = COMPONENT_ATTR;

export default Marker;