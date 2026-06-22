import dom from "./dom";
import events from "./events";
import css from "./css";
import moniAjax from "./ajax";
import bootsrap from "./bootsrap";
import animate from "./animate";

interface Moni {
  (selector: string | HTMLElement | HTMLElement[]): MoniInstance;
  fn: MoniInstance;
  version: string;
  loaded(callback: () => void): void;
  ready(callback: () => void): void;
  alias(name: string): Moni;
  noConflict(name?: string): Moni;
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
  const _savedGlobals: Record<string, any> = {};

  const moni = function (this: any, selector: any) {
    return new (moni.fn.init as any)(selector);
  } as Moni;

  moni.version = "2.1.0";

  moni.fn = moni.prototype = {
    constructor: moni,
    length: 0,

    init: function (this: any, selector: any) {
      if (!selector) return this;

      if (selector instanceof moni) return selector;

      if (typeof selector === "string") {
        const nodeList = document.querySelectorAll(selector);
        Array.prototype.push.apply(this, nodeList);
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
    },

    toArray: function () {
      return Array.prototype.slice.call(this);
    },

    eq: function (index: number) {
      const i = index < 0 ? this.length + index : index;
      return i < this.length ? moni(this[i]) : null;
    },

    not: function (selectorOrFn: any) {
      const kept: HTMLElement[] = [];
      this.each(function (el: HTMLElement, index: number) {
        if (typeof selectorOrFn === "function") {
          if (!selectorOrFn.call(el, el, index)) kept.push(el);
        } else {
          if (!el.matches(selectorOrFn)) kept.push(el);
        }
      });
      return moni(kept);
    },
  } as MoniInstance;

  Object.assign(moni.fn, dom, events, css, bootsrap, animate);

  moni.fn.init.prototype = moni.fn;

  moni.loaded = function (callback: () => void) {
    if (document.readyState !== "loading") {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  };

  moni.ready = moni.loaded;

  moni.alias = function (name: string) {
    _savedGlobals[name] = global[name];
    global[name] = moni;
    return moni;
  };

  moni.noConflict = function (name = "$") {
    if (global[name] === moni) {
      global[name] = _savedGlobals[name];
      delete _savedGlobals[name];
    }
    return moni;
  };

  (moni.fn as any).extend = function (methods: Record<string, Function>) {
    Object.assign(moni.fn, methods);
    return moni;
  };

  (moni as any).cookie = function (
    name: string,
    value?: string | null,
    opts: { expires?: number; path?: string; domain?: string; secure?: boolean; sameSite?: string } = {}
  ) {
    if (value === undefined) {
      const match = document.cookie.match(
        new RegExp("(?:^|; )" + encodeURIComponent(name) + "=([^;]*)")
      );
      return match ? decodeURIComponent(match[1]) : null;
    }
    if (value === null) {
      document.cookie =
        encodeURIComponent(name) +
        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      return moni;
    }
    let cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (opts.expires) {
      const d = new Date();
      d.setTime(d.getTime() + opts.expires * 864e5);
      cookie += "; expires=" + d.toUTCString();
    }
    if (opts.path)    cookie += "; path=" + opts.path;
    if (opts.domain)  cookie += "; domain=" + opts.domain;
    if (opts.secure)  cookie += "; secure";
    if (opts.sameSite) cookie += "; SameSite=" + opts.sameSite;
    document.cookie = cookie;
    return moni;
  };

  (moni as any).store = function (key: string, value?: any) {
    if (arguments.length === 1) {
      const raw = localStorage.getItem(key);
      if (raw === null) return null;
      try { return JSON.parse(raw); } catch { return raw; }
    }
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
    return moni;
  };

  return moni;
});

export default moni;
