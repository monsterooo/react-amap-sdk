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

class Polyline extends React.Component {
  constructor(props) {
    super(props);
    const { _map_, visible, onCreate, onInstance } = props;
    const options = omit(props, ["_map_", "visible", "children", "onInstance", "onCreate", "onDestroy", ...Object.keys(EVENT)]);
    this.polylineInstance = new window.AMap.Polyline(options);
    this.polylineInstance.setMap(_map_);
    visible ? this.polylineInstance.show() : this.polylineInstance.hide();
    registerEvent(this.polylineInstance, EVENT, props);
    onCreate && onCreate(this.polylineInstance);
    onInstance && onInstance(this.polylineInstance);
  }
  componentDidUpdate(prevProps) {
    const { path, extData, visible } = this.props;
    if (prevProps.path !== path) {
      this.polylineInstance.setPath(path);
    }
    if (prevProps.extData !== extData) {
      this.polylineInstance.setExtData(extData);
    }
    if (prevProps.visible !== visible) {
      visible ? this.polylineInstance.show() : this.polylineInstance.hide();
    }
    this.updateOptions(prevProps)
  }
  componentWillUnmount() {
    const { onDestroy, _map_ } = this.props

    onDestroy && onDestroy(this.polylineInstance)
    _map_.remove([this.polylineInstance])
  }
  updateOptions(prevProps) {
    const listenOptions = [
      'zIndex',
      'bubble',
      'strokeColor',
      'cursor',
      'geodesic',
      'isOutline',
      'borderWeight',
      'outlineColor',
      'strokeOpacity',
      'strokeWeight',
      'strokeStyle',
      'strokeDasharray',
      'lineJoin',
      'lineCap',
      'draggable',
      'showDir'
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
      this.polylineInstance.setOptions(options)
    }
  }
  render() {
    return null;
  }
}

const COMPONENT_ATTR = {
  zIndex: PropTypes.number,
  bubble: PropTypes.bool,
  cursor: PropTypes.string,
  geodesic: PropTypes.bool,
  isOutline: PropTypes.bool,
  borderWeight: PropTypes.number,
  outlineColor: PropTypes.string,
  path: PropTypes.array,
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWeight: PropTypes.number,
  strokeStyle: PropTypes.string,
  strokeDasharray: PropTypes.array,
  lineJoin: PropTypes.string,
  lineCap: PropTypes.string,
  draggable: PropTypes.bool,
  extData: PropTypes.any,
  showDir: PropTypes.bool,
}

Polyline.defaultProps = {
  visible: true,
}

Polyline.propTypes = COMPONENT_ATTR;


export default Polyline;
