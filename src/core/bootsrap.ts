export default {
    show: function (options = {}) {
      this.each(function (el) {
        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
          const modal = new bootstrap.Modal(el, {...options});
          modal.show();
        }
      });
      return this;
    },
  
    hide: function () {
      this.each(function (el) {
        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
          const modal = new bootstrap.Modal(el);
          modal.hide();
        }
      });
      return this;
    },
  
    toggle: function () {
      this.each(function (el) {
        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
          const modal = new bootstrap.Modal(el);
          modal.toggle();
        }
      });
      return this;
    }
  };
  