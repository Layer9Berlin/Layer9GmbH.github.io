let last = 0
let timer

export function throttle(callback, gap = 300) {
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    const delta = Date.now() - last
    const wait = gap - delta
    if (wait < 0) {
      last = Date.now()
      callback.apply(this, args);
    } else {
      timer = setTimeout(() => {
        last = Date.now()
        callback.apply(this, args);
        timer = undefined;
      }, wait);
    }
  };
}
