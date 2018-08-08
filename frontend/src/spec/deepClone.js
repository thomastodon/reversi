export const deepClone = (val, instanceClone) => {
  switch (typeof val) {
    case 'object':
      return cloneObjectDeep(val, instanceClone);
    case 'array':
      return cloneArrayDeep(val, instanceClone);
    default: {
      return Object.assign(val);
    }
  }
};

function cloneObjectDeep(val, instanceClone) {
  if (typeof instanceClone === 'function') {
    return instanceClone(val);
  }
  if (typeof val === 'object') {
    const res = new val.constructor();
    for (const key in val) {
      res[key] = deepClone(val[key], instanceClone);
    }
    return res;
  }
  return val;
}

function cloneArrayDeep(val, instanceClone) {
  const res = new val.constructor(val.length);
  for (let i = 0; i < val.length; i++) {
    res[i] = deepClone(val[i], instanceClone);
  }
  return res;
}