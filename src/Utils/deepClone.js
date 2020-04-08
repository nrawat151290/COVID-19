const deepClone = (data) => {
  if (data) {
    return JSON.parse(JSON.stringify(data));
  }
}

export default deepClone;