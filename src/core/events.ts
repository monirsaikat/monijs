function on(event, selectorOrCallback, callback) {
  if (arguments.length === 2 && typeof selectorOrCallback === "function") {
    this.each(function (el) {
      el.addEventListener(event, selectorOrCallback);
    });
  } else if (arguments.length === 3 && typeof selectorOrCallback === "string") {
    this.each(function (el) {
      el.addEventListener(event, function (e) {
        if (e.target.matches(selectorOrCallback)) {
          callback.call(e.target, e);
        }
      });
    });
  }

  return this;
}

export default {
  on,
  off: function (event, callback) {
    this.each(function (el) {
      el.removeEventListener(event, callback);
    });

    return this;
  },
};
