const omit = (obj, keys) => {
  return Object.keys(obj)
    .filter(key => keys.indexOf(key) < 0)
    .reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
};

// var t = {
//   a: 1,
//   b: 2,
//   c: 3
// };

// omit(t, ["a"]); // {b: 2, c: 3}

export default omit;
