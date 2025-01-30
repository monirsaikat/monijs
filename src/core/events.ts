export default {
  on: function (event, callback) {
    this.each(function (el) {
      el.addEventListener(event, callback);
    });

    return this;
  },

  off: function (event, callback) {
    this.each(function (el) {
      el.removeEventListener(event, callback);
    });

    return this;
  }
};
