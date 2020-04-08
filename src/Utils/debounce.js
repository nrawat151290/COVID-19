const debounce = (func, delay) => {
  let debounceTimer = null;
  return function () {
    const context = this
    const args = arguments
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      const result = func.apply(context, args);
      return result;
    }, delay)
  }
}

export default debounce;