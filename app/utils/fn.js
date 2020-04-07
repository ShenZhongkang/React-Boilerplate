const flatObj = obj => {
  const compare = (a, b) => {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }
  const keys = Object.keys(obj).sort(compare);
  let res = keys.map(key => `${key}${(obj[key] !== null && typeof obj[key] === 'object') ? JSON.stringify(obj[key]) : obj[key]}`).join('');
  return res;
};

export {
  flatObj
};
