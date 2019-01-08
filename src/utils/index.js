import omit from "./omit";
import pick from "./pick";

// 注册实例事件
function registerEvent(object, events, props) {
  Object.keys(events).forEach(eventName => {
    if (props[eventName]) {
      object.on(events[eventName], props[eventName]);
    }
  });
}

/**
 * 从数组中排除指定的值
 * omitArray([1,2,3], [2]) => [1, 3]
 * @param {*} array 
 * @param {*} omit 
 */
function omitArray(array, omit) {
  return array.filter((key) => omit.indexOf(key) === -1);
}

export { omit, pick, registerEvent, omitArray };
