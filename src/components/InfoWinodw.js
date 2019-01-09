import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { omit, registerEvent } from "../utils/index";

const EVENT = {
  onChange: 'change',
  onOpen: 'open',
  onClose: 'close'
};

class InfoWindow extends React.Component {
  constructor(props) {
    super(props);
    const { _map_, onCreate, offset } = props;
    const options = omit(props, ["_map_", "children", "offset", "onCreate", "onDestroy", ...Object.keys(EVENT)]);
    const instanceOption = options;
    if (offset) {
      instanceOption.offset = new window.AMap.Pixel(offset[0], offset[1]);
    }
    this.infoElement = document.createElement("div");
    this.InfoWindowInstance = new window.AMap.InfoWindow(instanceOption);
    this.InfoWindowInstance.setMap(_map_);
    this.renderContent();
    registerEvent(this.InfoWindowInstance, EVENT, props);
    onCreate && onCreate(this.InfoWindowInstance);
  }
  componentDidUpdate(prevProps) {
    const { _map_, visible, position, size, offset } = this.props;

    if (prevProps.visible !== visible) {
      visible ? this.InfoWindowInstance.open(_map_, position) : this.InfoWindowInstance.close()
    }
    if (prevProps.position !== position) {
      this.InfoWindowInstance.setPosition(position);
    }
    if(prevProps.size !== size) {
      this.InfoWindowInstance.setSize(size);
    }
    if (prevProps.offset !== offset) {
      const newOffset = new window.AMap.Pixel(offset[0], offset[1]);
      this.InfoWindowInstance.setOffset(newOffset);
    }
    this.renderContent();
  }
  componentWillUnmount() {
    const { onDestroy, _map_ } = this.props

    onDestroy && onDestroy(this.InfoWindowInstance)
    _map_.remove([this.InfoWindowInstance])
  }
  renderContent() {
    const { children } = this.props;

    if (!children) return false;
    render(children, this.infoElement);
    this.InfoWindowInstance.setContent(this.infoElement);
  }
  render() {
    return null;
  }
}

InfoWindow.propTypes = {
  isCustom: PropTypes.bool, // 是否自定义窗体
  autoMove: PropTypes.bool,
  closeWhenClickMap: PropTypes.bool,
  position: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  size: PropTypes.oneOfType([ // 信息窗体尺寸（isCustom为true时，该属性无效）
    PropTypes.object,
    PropTypes.array,
  ])
}

export default InfoWindow;
