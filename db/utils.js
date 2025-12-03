function createRefObj(array, key1, key2) {
  const refObj = {};

  if (array.length === 0) {
    return refObj;
  }
  for (let i = 0; i < array.length; i++) {
    const refKey = array[i][key1];
    const refVal = array[i][key2];
    refObj[refKey] = refVal;
  }
  return refObj;
}

module.exports = createRefObj;
