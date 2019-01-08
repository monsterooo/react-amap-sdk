const pick = (obj, keys) => {
  return keys
    .filter(key => obj.hasOwnProperty(key))
    .reduce((preValue, key) => {
      preValue[key] = obj[key];
      return preValue;
    }, {});
};

// var o = {
//   a: 1,
//   b: 2,
//   c: 3
// };
// const result = pick(o, ["a", "c"]);
// console.log("测试pick > ", o, result);
// 测试pick >  {a: 1, b: 2, c: 3}  >  {a: 1, c: 3}

export default pick;
