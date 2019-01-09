import React from 'react';
import { registerEvent } from "../utils/index";

const EVENT = {
  onAddNode: "addnode",
  onAdjust: "adjust",
  onRemoveNode: "removenode",
  onEnd: "end"
};

class PolyEditor extends React.Component {
  componentDidUpdate(prevProps) {
    const { edit } = this.props;

    if (prevProps.edit !== edit) {
      edit ? this.polyEditorInstance.open() : this.polyEditorInstance.close();
    }
  }
  getInstance = (object) => {
    const { _map_, onCreate } = this.props;
    this.polyEditorInstance = new window.AMap.PolyEditor(_map_, object);
    registerEvent(this.polyEditorInstance, EVENT, this.props);
    onCreate && onCreate(this.polyEditorInstance);
  }
  render() {
    const { _map_, children } = this.props;
    const EditorObject = React.cloneElement(children, {
      _map_,
      onInstance: this.getInstance
    });
    return EditorObject;
  }
}

export default PolyEditor;
