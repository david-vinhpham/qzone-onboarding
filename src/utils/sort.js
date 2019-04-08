const sortBy = (list, property) => {
  if (list && list.length) {
    list.sort((a, b) => {
      let compareResult = 0;
      const aProp = a[property] ? (a[property]).toLowerCase() : null;
      const bProp = b[property] ? (b[property]).toLowerCase() : null;
      if (aProp < bProp) {
        compareResult = -1;
      } else if (aProp > bProp) {
        compareResult = 1;
      }
      return compareResult;
    });
  }
  return list;
};

export default sortBy;
