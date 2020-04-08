import deepClone from './deepClone';

export const sortNumerically = (data = [], desc = true) => {
  if (desc) {
    return data.sort((a, b) => {
      return b - a;
    });
  } else {
    return data.sort((a, b) => {
      return a - b;
    });
  }
}

/*
p1 - property name for number sorting
p2 - property name for alphabetical sorting
desc - boolean for sorting in descending order
*/
export const sortByNumberAndAlphabeticOrder = (data = [], p1, p2, desc = true) => {
  const result = deepClone(data);
  result.sort(function (a, b) {
    if (desc) {
      if (b[p1] - a[p1] === 0) {
        if (a[p2].toLowerCase().replace(/[^0-9a-zA-Z]/g, '') > b[p2].toLowerCase().replace(/[^0-9a-zA-Z]/g, '')) {
          return 1;
        } else if (a[p2].toLowerCase().replace(/[^0-9a-zA-Z]/g, '') < b[p2].toLowerCase().replace(/[^0-9a-zA-Z]/g, '')) {
          return -1;
        } else {
          return 0;
        }
      } else {
        return b[p1] - a[p1];
      }
    } else {
      if (a[p1] - b[p1] === 0) {
        if (a[p2].toLowerCase().replace(/[^0-9a-zA-Z]/g, '') > b[p2].toLowerCase().replace(/[^0-9a-zA-Z]/g, '')) {
          return 1;
        } else if (a[p2].toLowerCase().replace(/[^0-9a-zA-Z]/g, '') < b[p2].toLowerCase().replace(/[^0-9a-zA-Z]/g, '')) {
          return -1;
        } else {
          return 0;
        }
      } else {
        return a[p1] - b[p1];
      }
    }
  });
  return result;
};