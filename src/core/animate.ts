function camelToKebab(prop: string): string {
  return prop.replace(/([A-Z])/g, "-$1").toLowerCase();
}

export default {
  fadeIn: function (duration = 300) {
    this.each(function (el) {
      el.style.opacity = "0";
      el.style.display = "";
      if (getComputedStyle(el).display === "none") {
        el.style.display = "block";
      }
      el.style.transition = `opacity ${duration}ms`;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.style.opacity = "1";
          setTimeout(function () {
            el.style.transition = "";
          }, duration);
        });
      });
    });
    return this;
  },

  fadeOut: function (duration = 300) {
    this.each(function (el) {
      el.style.transition = `opacity ${duration}ms`;
      el.style.opacity = "0";
      setTimeout(function () {
        el.style.display = "none";
        el.style.opacity = "";
        el.style.transition = "";
      }, duration);
    });
    return this;
  },

  fadeToggle: function (duration = 300) {
    this.each(function (el) {
      const hidden =
        getComputedStyle(el).display === "none" ||
        parseFloat(el.style.opacity) === 0;

      if (hidden) {
        el.style.opacity = "0";
        el.style.display = "";
        if (getComputedStyle(el).display === "none") {
          el.style.display = "block";
        }
        el.style.transition = `opacity ${duration}ms`;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            el.style.opacity = "1";
            setTimeout(function () {
              el.style.transition = "";
            }, duration);
          });
        });
      } else {
        el.style.transition = `opacity ${duration}ms`;
        el.style.opacity = "0";
        setTimeout(function () {
          el.style.display = "none";
          el.style.opacity = "";
          el.style.transition = "";
        }, duration);
      }
    });
    return this;
  },

  slideDown: function (duration = 300) {
    this.each(function (el) {
      el.style.display = "";
      if (getComputedStyle(el).display === "none") {
        el.style.display = "block";
      }
      const targetHeight = el.scrollHeight;
      el.style.overflow = "hidden";
      el.style.height = "0";
      el.style.transition = `height ${duration}ms ease`;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.style.height = targetHeight + "px";
          setTimeout(function () {
            el.style.height = "";
            el.style.overflow = "";
            el.style.transition = "";
          }, duration);
        });
      });
    });
    return this;
  },

  slideUp: function (duration = 300) {
    this.each(function (el) {
      el.style.overflow = "hidden";
      el.style.height = el.offsetHeight + "px";
      el.style.transition = `height ${duration}ms ease`;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.style.height = "0";
          setTimeout(function () {
            el.style.display = "none";
            el.style.height = "";
            el.style.overflow = "";
            el.style.transition = "";
          }, duration);
        });
      });
    });
    return this;
  },

  slideToggle: function (duration = 300) {
    this.each(function (el) {
      if (getComputedStyle(el).display === "none") {
        el.style.display = "block";
        const targetHeight = el.scrollHeight;
        el.style.overflow = "hidden";
        el.style.height = "0";
        el.style.transition = `height ${duration}ms ease`;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            el.style.height = targetHeight + "px";
            setTimeout(function () {
              el.style.height = "";
              el.style.overflow = "";
              el.style.transition = "";
            }, duration);
          });
        });
      } else {
        el.style.overflow = "hidden";
        el.style.height = el.offsetHeight + "px";
        el.style.transition = `height ${duration}ms ease`;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            el.style.height = "0";
            setTimeout(function () {
              el.style.display = "none";
              el.style.height = "";
              el.style.overflow = "";
              el.style.transition = "";
            }, duration);
          });
        });
      }
    });
    return this;
  },

  animate: function (props: Record<string, string>, duration = 300, easing = "ease") {
    const keys = Object.keys(props);
    const transitionParts = keys.map(function (prop) {
      return `${camelToKebab(prop)} ${duration}ms ${easing}`;
    });

    this.each(function (el) {
      const prev = el.style.transition;
      el.style.transition = prev
        ? prev + ", " + transitionParts.join(", ")
        : transitionParts.join(", ");
      keys.forEach(function (prop) {
        el.style[prop] = props[prop];
      });
      setTimeout(function () {
        el.style.transition = prev || "";
      }, duration);
    });
    return this;
  },
};
