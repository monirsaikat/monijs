export default {
  css: function (prop, value) {
    if (!value) {
      return this[0] ? getComputedStyle(this[0])[prop] : undefined;
    } else {
      return this.each(function (el) {
        el.style[prop] = value;
      });
    }
  },

  classes: function () {
    const classList = this[0] ? this[0].classList : undefined;

    const methods = {
      has: function (className) {
        return classList ? classList.contains(className) : false;
      },
      add: function (className) {
        if (classList) {
          classList.add(className);
        }
        return this;
      },
      remove: function (className) {
        if (classList) {
          classList.remove(className);
        }
        return this;
      },
      toggle: function (className) {
        if (classList) {
          classList.toggle(className);
        }
        return this;
      },
      toArray: function () {
        return classList ? Array.from(classList) : [];
      }
    };

    return Object.assign(Object.create(this.constructor.fn), methods, this);
  }
};