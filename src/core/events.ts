function on(event, selectorOrCallback, callback?) {
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

  once: function (event, selectorOrCallback, callback?) {
    if (arguments.length === 2 && typeof selectorOrCallback === "function") {
      this.each(function (el) {
        el.addEventListener(event, selectorOrCallback, { once: true });
      });
    } else if (
      arguments.length === 3 &&
      typeof selectorOrCallback === "string"
    ) {
      this.each(function (el) {
        const handler = function (e) {
          if (e.target.matches(selectorOrCallback)) {
            callback.call(e.target, e);
            el.removeEventListener(event, handler);
          }
        };
        el.addEventListener(event, handler);
      });
    }

    return this;
  },

  trigger: function (event, data?) {
    const customEvent = new CustomEvent(event, {
      detail: data,
      bubbles: true,
      cancelable: true,
    });

    this.each(function (el) {
      el.dispatchEvent(customEvent);
    });

    return this;
  },

  delegate: function (event, selector, callback) {
    return this.on(event, selector, callback);
  },
};
