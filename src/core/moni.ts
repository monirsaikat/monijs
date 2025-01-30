import dom from './dom';
import events from './events';
import css from './css';
import moniAjax from './ajax';

interface Moni {
  (selector: string | HTMLElement | HTMLElement[]): MoniInstance;
  fn: MoniInstance;
  loaded(callback: () => void): void;
}

interface MoniInstance {
  length: number;
  [index: number]: HTMLElement;
  init(selector: string | HTMLElement | HTMLElement[]): MoniInstance;
  ajax(): ReturnType<typeof moniAjax>;
}

(function (global: any, factory: (global: any) => Moni) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory(global);
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    global.moni = factory(global);
  }
})(typeof window !== "undefined" ? window : this, function (global: any) {
  const moni = function (this: any, selector: any) {

    return new (moni.fn.init as any)(selector);

  } as Moni;

  moni.fn = moni.prototype = {
    constructor: moni,
    length: 0,

    init: function (this: any, selector: any) {
      if (!selector) return this;

      if (selector instanceof moni) return selector;

      if (typeof selector === 'string') {
        if (selector[0] === '#') {
          this[0] = document.getElementById(selector.slice(1));
          this.length = 1;
        } else {
          const nodeList = document.querySelectorAll(selector);
          Array.prototype.push.apply(this, nodeList);
        }
      } else if (selector.nodeType) {
        this[0] = selector;
        this.length = 1;
      } else if (Array.isArray(selector)) {
        Array.prototype.push.apply(this, selector);
      }

      return this;
    },

    ajax: function () {
      return moniAjax();
    }
  } as MoniInstance;

  Object.assign(moni.fn, dom, events, css);

  moni.loaded = function (callback: () => void) {
    if (document.readyState !== 'loading') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  };

  moni.fn.init.prototype = moni.fn;

  return moni;
});

export default moni;