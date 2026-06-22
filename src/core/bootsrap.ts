export default {
  modal: function (options = {}) {
    const instance = this;
    return {
      show() {
        instance.each(function (el) {
          if (typeof bootstrap !== "undefined" && bootstrap.Modal) {
            new bootstrap.Modal(el, options).show();
          }
        });
        return instance;
      },
      hide() {
        instance.each(function (el) {
          if (typeof bootstrap !== "undefined" && bootstrap.Modal) {
            new bootstrap.Modal(el).hide();
          }
        });
        return instance;
      },
      toggle() {
        instance.each(function (el) {
          if (typeof bootstrap !== "undefined" && bootstrap.Modal) {
            new bootstrap.Modal(el).toggle();
          }
        });
        return instance;
      },
    };
  },
};
