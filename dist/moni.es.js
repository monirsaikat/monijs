const dom = {
  find: function(selector) {
    const foundElements = [];
    this.each(function(el) {
      const matchedElements = el.querySelectorAll(selector);
      Array.prototype.push.apply(foundElements, matchedElements);
    });
    return moni(foundElements);
  },
  html: function(value) {
    if (value === void 0) {
      return this[0] ? this[0].innerHTML : void 0;
    }
    this.each(function(el) {
      el.innerHTML = value;
    });
    return this;
  },
  text: function(value) {
    if (value === void 0) {
      return this[0] ? this[0].textContent : void 0;
    }
    this.each(function(el) {
      el.textContent = value;
    });
    return this;
  },
  each: function(callback) {
    Array.prototype.forEach.call(this, function(el, index) {
      callback.call(el, el, index);
    });
    return this;
  },
  remove: function() {
    this.each(function(el) {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
    return this;
  },
  attr: function(name, value) {
    if (value === void 0) {
      return this[0] ? this[0].getAttribute(name) : void 0;
    } else {
      this.each(function(el) {
        el.setAttribute(name, value);
      });
      return this;
    }
  },
  data: function(name, value) {
    if (value === void 0) {
      return this[0] ? this[0].dataset[name] : void 0;
    } else {
      this.each(function(el) {
        el.dataset[name] = value;
      });
      return this;
    }
  },
  add: function(content, times) {
    if (typeof content === "string") {
      if (content.includes("<")) {
        times = times || 1;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < times; i++) {
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = content;
          while (tempDiv.firstChild) {
            fragment.appendChild(tempDiv.firstChild);
          }
        }
        this.each(function(el) {
          el.appendChild(fragment.cloneNode(true));
        });
      } else {
        times = times || 1;
        this.each(function(el) {
          for (let i = 0; i < times; i++) {
            const newElement = document.createElement(content);
            el.appendChild(newElement);
          }
        });
      }
    } else if (content instanceof moni) {
      this.each(function(el) {
        content.each(function(clonedEl) {
          el.appendChild(clonedEl.cloneNode(true));
        });
      });
    }
    return this;
  },
  append: function(content) {
    return this.add(content);
  },
  prepend: function(content) {
    if (typeof content === "string") {
      this.each(function(el) {
        el.insertAdjacentHTML("afterbegin", content);
      });
    } else if (content instanceof moni) {
      this.each(function(el) {
        content.each(function(newEl) {
          el.insertBefore(newEl.cloneNode(true), el.firstChild);
        });
      });
    }
    return this;
  },
  addPrevious: function(content) {
    if (typeof content === "string") {
      this.each(function(el) {
        const fragment = document.createDocumentFragment();
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;
        while (tempDiv.firstChild) {
          fragment.appendChild(tempDiv.firstChild);
        }
        el.parentNode.insertBefore(fragment, el);
      });
    } else if (content instanceof moni) {
      this.each(function(el) {
        content.each(function(clonedEl) {
          el.parentNode.insertBefore(clonedEl.cloneNode(true), el);
        });
      });
    }
    return this;
  },
  addBehind: function(content) {
    if (typeof content === "string") {
      this.each(function(el) {
        const fragment = document.createDocumentFragment();
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;
        while (tempDiv.firstChild) {
          fragment.appendChild(tempDiv.firstChild);
        }
        if (el.nextSibling) {
          el.parentNode.insertBefore(fragment, el.nextSibling);
        } else {
          el.parentNode.appendChild(fragment);
        }
      });
    } else if (content instanceof moni) {
      this.each(function(el) {
        content.each(function(clonedEl) {
          if (el.nextSibling) {
            el.parentNode.insertBefore(
              clonedEl.cloneNode(true),
              el.nextSibling
            );
          } else {
            el.parentNode.appendChild(clonedEl.cloneNode(true));
          }
        });
      });
    }
    return this;
  },
  siblings: function() {
    const siblingsArray = [];
    this.each(function(el) {
      Array.prototype.forEach.call(el.parentNode.children, function(sibling) {
        if (sibling !== el) {
          siblingsArray.push(sibling);
        }
      });
    });
    return moni(siblingsArray);
  },
  val: function(value) {
    if (value === void 0) {
      return this[0] ? this[0].value : void 0;
    } else {
      this.each(function(el) {
        if (el.tagName === "SELECT") {
          el.value = value;
        } else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.value = value;
        }
      });
      return this;
    }
  },
  first: function() {
    const element = this[0];
    if (element) return moni(element);
    return null;
  },
  last: function() {
    const element = this[this.length - 1];
    if (element) return moni(element);
    return null;
  },
  at: function(index) {
    if (index < this.length) {
      return moni(this[index]);
    }
    return null;
  },
  values: function() {
    const values = {};
    const elements = this[0].elements;
    Array.prototype.forEach.call(elements, function(el) {
      if (el.name && !el.disabled) {
        if (el.type === "checkbox" || el.type === "radio") {
          if (el.checked) {
            values[el.name] = el.value;
          }
        } else if (el.tagName === "SELECT" && el.multiple) {
          const selectedValues = [];
          Array.prototype.forEach.call(el.options, function(option) {
            if (option.selected) {
              selectedValues.push(option.value);
            }
          });
          values[el.name] = selectedValues;
        } else if (el.type === "file") {
          values[el.name] = el.files.length > 1 ? el.files : el.files[0];
        } else {
          values[el.name] = el.value;
        }
      }
    });
    return values;
  },
  after: function(html) {
    this.each(function(el) {
      el.insertAdjacentHTML("afterend", html);
    });
    return this;
  },
  before: function(html) {
    this.each(function(el) {
      el.insertAdjacentHTML("beforebegin", html);
    });
    return this;
  },
  children: function() {
    const childrenArray = [];
    this.each(function(el) {
      Array.prototype.push.apply(childrenArray, el.children);
    });
    return moni(childrenArray);
  },
  empty: function() {
    this.each(function(el) {
      el.innerHTML = "";
    });
    return this;
  },
  clone: function(deep = true) {
    const clonedElements = [];
    this.each(function(el) {
      clonedElements.push(el.cloneNode(deep || false));
    });
    return moni(clonedElements);
  },
  search: function(query) {
    const matchedElements = [];
    if (typeof query === "string") {
      this.each(function(el) {
        const foundElements = el.querySelectorAll(query);
        Array.prototype.push.apply(matchedElements, foundElements);
      });
    } else if (query instanceof moni) {
      this.each(function(el) {
        query.each(function(element) {
          if (el.contains(element)) {
            matchedElements.push(element);
          }
        });
      });
    }
    return moni(matchedElements);
  },
  near: function(query) {
    const closestElements = [];
    const isSelector = typeof query === "string";
    let selectors;
    if (isSelector) {
      selectors = [query];
    } else {
      selectors = Array.isArray(query) ? query.map(
        (el) => el.nodeType ? el.tagName.toLowerCase() : null
      ).filter(Boolean) : Array.from(query).map(
        (el) => el.nodeType ? el.tagName.toLowerCase() : null
      ).filter(Boolean);
    }
    this.each(function(el) {
      let currentElement = el;
      while (currentElement && currentElement !== document) {
        if (isSelector) {
          if (currentElement.matches(query)) {
            closestElements.push(currentElement);
            break;
          }
        } else {
          if (selectors.some(
            (selector) => currentElement.tagName.toLowerCase() === selector
          )) {
            closestElements.push(currentElement);
            break;
          }
        }
        currentElement = currentElement.parentElement;
      }
    });
    return moni(closestElements);
  },
  // --- v2.1 additions ---
  show: function() {
    this.each(function(el) {
      el.style.display = "";
      if (getComputedStyle(el).display === "none") {
        el.style.display = "block";
      }
    });
    return this;
  },
  hide: function() {
    this.each(function(el) {
      el.style.display = "none";
    });
    return this;
  },
  toggle: function() {
    this.each(function(el) {
      if (getComputedStyle(el).display === "none") {
        el.style.display = "";
        if (getComputedStyle(el).display === "none") {
          el.style.display = "block";
        }
      } else {
        el.style.display = "none";
      }
    });
    return this;
  },
  parent: function(selector) {
    const parents = [];
    this.each(function(el) {
      const p = el.parentElement;
      if (p) {
        if (!selector || p.matches(selector)) {
          parents.push(p);
        }
      }
    });
    return moni(parents);
  },
  closest: function(selector) {
    const found = [];
    this.each(function(el) {
      const match = el.closest(selector);
      if (match) found.push(match);
    });
    return moni(found);
  },
  is: function(selector) {
    if (!this[0]) return false;
    if (typeof selector === "string") return this[0].matches(selector);
    if (selector instanceof moni) return this[0] === selector[0];
    return this[0] === selector;
  },
  filter: function(selectorOrFn) {
    const matched = [];
    this.each(function(el, index) {
      if (typeof selectorOrFn === "function") {
        if (selectorOrFn.call(el, el, index)) matched.push(el);
      } else {
        if (el.matches(selectorOrFn)) matched.push(el);
      }
    });
    return moni(matched);
  },
  prop: function(name, value) {
    if (value === void 0) {
      return this[0] ? this[0][name] : void 0;
    }
    return this.each(function(el) {
      el[name] = value;
    });
  },
  width: function() {
    return this[0] ? this[0].getBoundingClientRect().width : void 0;
  },
  height: function() {
    return this[0] ? this[0].getBoundingClientRect().height : void 0;
  },
  offset: function() {
    if (!this[0]) return null;
    const rect = this[0].getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    };
  },
  scrollTop: function(value) {
    if (value === void 0) {
      if (!this[0]) return 0;
      const el = this[0];
      return el === document.documentElement || el === document.body ? window.scrollY : el.scrollTop;
    }
    return this.each(function(el) {
      if (el === document.documentElement || el === document.body) {
        window.scrollTo(0, value);
      } else {
        el.scrollTop = value;
      }
    });
  },
  scrollLeft: function(value) {
    if (value === void 0) {
      if (!this[0]) return 0;
      const el = this[0];
      return el === document.documentElement || el === document.body ? window.scrollX : el.scrollLeft;
    }
    return this.each(function(el) {
      if (el === document.documentElement || el === document.body) {
        window.scrollTo(value, 0);
      } else {
        el.scrollLeft = value;
      }
    });
  },
  wrap: function(html) {
    this.each(function(el) {
      if (!el.parentNode) return;
      const temp = document.createElement("div");
      temp.innerHTML = html;
      const wrapper = temp.firstChild;
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);
    });
    return this;
  },
  unwrap: function() {
    this.each(function(el) {
      const parent = el.parentNode;
      if (!parent || parent === document.body || parent === document.documentElement)
        return;
      while (parent.firstChild) {
        parent.parentNode.insertBefore(parent.firstChild, parent);
      }
      parent.parentNode.removeChild(parent);
    });
    return this;
  },
  replaceWith: function(content) {
    this.each(function(el) {
      if (!el.parentNode) return;
      if (typeof content === "string") {
        el.insertAdjacentHTML("afterend", content);
      } else if (content instanceof moni) {
        content.each(function(newEl) {
          el.parentNode.insertBefore(newEl.cloneNode(true), el);
        });
      }
      el.parentNode.removeChild(el);
    });
    return this;
  },
  index: function() {
    if (!this[0] || !this[0].parentNode) return -1;
    return Array.prototype.indexOf.call(
      this[0].parentNode.children,
      this[0]
    );
  },
  serialize: function() {
    const parts = [];
    const elements = this[0] ? this[0].elements || [this[0]] : [];
    Array.prototype.forEach.call(elements, function(el) {
      if (!el.name || el.disabled) return;
      if ((el.type === "checkbox" || el.type === "radio") && !el.checked)
        return;
      if (el.type === "file") return;
      parts.push(
        encodeURIComponent(el.name) + "=" + encodeURIComponent(el.value)
      );
    });
    return parts.join("&");
  },
  // --- dimensions ---
  innerWidth: function() {
    return this[0] ? this[0].clientWidth : void 0;
  },
  innerHeight: function() {
    return this[0] ? this[0].clientHeight : void 0;
  },
  outerWidth: function(includeMargin = false) {
    if (!this[0]) return void 0;
    let w = this[0].offsetWidth;
    if (includeMargin) {
      const s = getComputedStyle(this[0]);
      w += parseInt(s.marginLeft) + parseInt(s.marginRight);
    }
    return w;
  },
  outerHeight: function(includeMargin = false) {
    if (!this[0]) return void 0;
    let h = this[0].offsetHeight;
    if (includeMargin) {
      const s = getComputedStyle(this[0]);
      h += parseInt(s.marginTop) + parseInt(s.marginBottom);
    }
    return h;
  },
  position: function() {
    if (!this[0]) return null;
    return { top: this[0].offsetTop, left: this[0].offsetLeft };
  },
  // --- native actions ---
  click: function() {
    return this.each(function(el) {
      el.click && el.click();
    });
  },
  focus: function() {
    return this.each(function(el) {
      el.focus && el.focus();
    });
  },
  blur: function() {
    return this.each(function(el) {
      el.blur && el.blur();
    });
  },
  submit: function() {
    return this.each(function(el) {
      el.submit && el.submit();
    });
  },
  // --- visibility observer ---
  onVisible: function(callback, options = {}) {
    this.each(function(el) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            callback.call(el, entry);
          }
        });
      }, options);
      observer.observe(el);
    });
    return this;
  }
};
function on(event, selectorOrCallback, callback) {
  if (arguments.length === 2 && typeof selectorOrCallback === "function") {
    this.each(function(el) {
      el.addEventListener(event, selectorOrCallback);
    });
  } else if (arguments.length === 3 && typeof selectorOrCallback === "string") {
    this.each(function(el) {
      el.addEventListener(event, function(e) {
        if (e.target.matches(selectorOrCallback)) {
          callback.call(e.target, e);
        }
      });
    });
  }
  return this;
}
const events = {
  on,
  off: function(event, callback) {
    this.each(function(el) {
      el.removeEventListener(event, callback);
    });
    return this;
  },
  once: function(event, selectorOrCallback, callback) {
    if (arguments.length === 2 && typeof selectorOrCallback === "function") {
      this.each(function(el) {
        el.addEventListener(event, selectorOrCallback, { once: true });
      });
    } else if (arguments.length === 3 && typeof selectorOrCallback === "string") {
      this.each(function(el) {
        const handler = function(e) {
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
  trigger: function(event, data) {
    const customEvent = new CustomEvent(event, {
      detail: data,
      bubbles: true,
      cancelable: true
    });
    this.each(function(el) {
      el.dispatchEvent(customEvent);
    });
    return this;
  },
  delegate: function(event, selector, callback) {
    return this.on(event, selector, callback);
  }
};
const css = {
  css: function(prop, value) {
    if (value === void 0) {
      return this[0] ? getComputedStyle(this[0])[prop] : void 0;
    } else {
      return this.each(function(el) {
        el.style[prop] = value;
      });
    }
  },
  classes: function() {
    const classList = this[0] ? this[0].classList : void 0;
    const methods = {
      has: function(className) {
        return classList ? classList.contains(className) : false;
      },
      add: function(className) {
        if (classList) {
          classList.add(className);
        }
        return this;
      },
      remove: function(className) {
        if (classList) {
          classList.remove(className);
        }
        return this;
      },
      toggle: function(className) {
        if (classList) {
          classList.toggle(className);
        }
        return this;
      },
      toArray: function() {
        return classList ? Array.from(classList) : [];
      }
    };
    return Object.assign(Object.create(this.constructor.fn), methods, this);
  },
  hasClass: function(className) {
    return this[0] ? this[0].classList.contains(className) : false;
  },
  addClass: function(className) {
    const names = className.trim().split(/\s+/);
    return this.each(function(el) {
      el.classList.add(...names);
    });
  },
  removeClass: function(className) {
    const names = className.trim().split(/\s+/);
    return this.each(function(el) {
      el.classList.remove(...names);
    });
  },
  toggleClass: function(className, force) {
    return this.each(function(el) {
      if (force !== void 0) {
        el.classList.toggle(className, force);
      } else {
        el.classList.toggle(className);
      }
    });
  }
};
class Ajax {
  constructor() {
    this.url = "";
    this.method = "GET";
    this.headers = {};
    this.data = null;
    this.callbacks = {
      loading: () => {
      },
      failed: () => {
      },
      success: () => {
      },
      end: () => {
      }
    };
  }
  request(url) {
    this.url = url;
    return this;
  }
  type(method) {
    this.method = method.toUpperCase();
    return this;
  }
  header(headers) {
    this.headers = {
      ...this.headers,
      ...headers
    };
    return this;
  }
  send(data) {
    if (this.headers["Content-Type"] && this.headers["Content-Type"] === "application/json") {
      this.data = JSON.stringify(data);
    } else {
      if (!(data instanceof FormData)) {
        const formData = new FormData();
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
          }
        }
        this.data = formData;
      } else {
        this.data = data;
      }
    }
    return this;
  }
  loading(callback) {
    this.callbacks.loading = callback;
    return this;
  }
  failed(callback) {
    this.callbacks.failed = callback;
    return this;
  }
  success(callback) {
    this.callbacks.success = callback;
    return this;
  }
  end(callback) {
    this.callbacks.end = callback;
    return this;
  }
  async execute() {
    const {
      url,
      method,
      headers,
      data,
      callbacks
    } = this;
    callbacks.loading();
    try {
      const options = {
        method,
        headers: {
          ...headers
        },
        body: data
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      const responseData = await response.json();
      callbacks.success(responseData);
    } catch (error) {
      if (error.message === "Failed to fetch") {
        callbacks.failed({
          type: "Network Error",
          message: "The request could not reach the server. Please check your URL or internet connection.",
          originalError: error
        });
      } else {
        callbacks.failed({
          type: "HTTP Error",
          message: error.message,
          originalError: error
        });
      }
    } finally {
      callbacks.end();
    }
  }
}
function moniAjax() {
  return new Ajax();
}
const bootsrap = {
  modal: function(options = {}) {
    const instance = this;
    return {
      show() {
        instance.each(function(el) {
          if (typeof bootstrap !== "undefined" && bootstrap.Modal) {
            new bootstrap.Modal(el, options).show();
          }
        });
        return instance;
      },
      hide() {
        instance.each(function(el) {
          if (typeof bootstrap !== "undefined" && bootstrap.Modal) {
            new bootstrap.Modal(el).hide();
          }
        });
        return instance;
      },
      toggle() {
        instance.each(function(el) {
          if (typeof bootstrap !== "undefined" && bootstrap.Modal) {
            new bootstrap.Modal(el).toggle();
          }
        });
        return instance;
      }
    };
  }
};
function camelToKebab(prop) {
  return prop.replace(/([A-Z])/g, "-$1").toLowerCase();
}
const animate = {
  fadeIn: function(duration = 300) {
    this.each(function(el) {
      el.style.opacity = "0";
      el.style.display = "";
      if (getComputedStyle(el).display === "none") {
        el.style.display = "block";
      }
      el.style.transition = `opacity ${duration}ms`;
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          el.style.opacity = "1";
          setTimeout(function() {
            el.style.transition = "";
          }, duration);
        });
      });
    });
    return this;
  },
  fadeOut: function(duration = 300) {
    this.each(function(el) {
      el.style.transition = `opacity ${duration}ms`;
      el.style.opacity = "0";
      setTimeout(function() {
        el.style.display = "none";
        el.style.opacity = "";
        el.style.transition = "";
      }, duration);
    });
    return this;
  },
  fadeToggle: function(duration = 300) {
    this.each(function(el) {
      const hidden = getComputedStyle(el).display === "none" || parseFloat(el.style.opacity) === 0;
      if (hidden) {
        el.style.opacity = "0";
        el.style.display = "";
        if (getComputedStyle(el).display === "none") {
          el.style.display = "block";
        }
        el.style.transition = `opacity ${duration}ms`;
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            el.style.opacity = "1";
            setTimeout(function() {
              el.style.transition = "";
            }, duration);
          });
        });
      } else {
        el.style.transition = `opacity ${duration}ms`;
        el.style.opacity = "0";
        setTimeout(function() {
          el.style.display = "none";
          el.style.opacity = "";
          el.style.transition = "";
        }, duration);
      }
    });
    return this;
  },
  slideDown: function(duration = 300) {
    this.each(function(el) {
      el.style.display = "";
      if (getComputedStyle(el).display === "none") {
        el.style.display = "block";
      }
      const targetHeight = el.scrollHeight;
      el.style.overflow = "hidden";
      el.style.height = "0";
      el.style.transition = `height ${duration}ms ease`;
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          el.style.height = targetHeight + "px";
          setTimeout(function() {
            el.style.height = "";
            el.style.overflow = "";
            el.style.transition = "";
          }, duration);
        });
      });
    });
    return this;
  },
  slideUp: function(duration = 300) {
    this.each(function(el) {
      el.style.overflow = "hidden";
      el.style.height = el.offsetHeight + "px";
      el.style.transition = `height ${duration}ms ease`;
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          el.style.height = "0";
          setTimeout(function() {
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
  slideToggle: function(duration = 300) {
    this.each(function(el) {
      if (getComputedStyle(el).display === "none") {
        el.style.display = "block";
        const targetHeight = el.scrollHeight;
        el.style.overflow = "hidden";
        el.style.height = "0";
        el.style.transition = `height ${duration}ms ease`;
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            el.style.height = targetHeight + "px";
            setTimeout(function() {
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
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            el.style.height = "0";
            setTimeout(function() {
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
  animate: function(props, duration = 300, easing = "ease") {
    const keys = Object.keys(props);
    const transitionParts = keys.map(function(prop) {
      return `${camelToKebab(prop)} ${duration}ms ${easing}`;
    });
    this.each(function(el) {
      const prev = el.style.transition;
      el.style.transition = prev ? prev + ", " + transitionParts.join(", ") : transitionParts.join(", ");
      keys.forEach(function(prop) {
        el.style[prop] = props[prop];
      });
      setTimeout(function() {
        el.style.transition = prev || "";
      }, duration);
    });
    return this;
  }
};
(function(global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory(global);
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    global.moni = factory(global);
  }
})(typeof window !== "undefined" ? window : void 0, function(global) {
  const _savedGlobals = {};
  const moni2 = function(selector) {
    return new moni2.fn.init(selector);
  };
  moni2.version = "2.1.0";
  moni2.fn = moni2.prototype = {
    constructor: moni2,
    length: 0,
    init: function(selector) {
      if (!selector) return this;
      if (selector instanceof moni2) return selector;
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
    ajax: function() {
      return moniAjax();
    },
    toArray: function() {
      return Array.prototype.slice.call(this);
    },
    eq: function(index) {
      const i = index < 0 ? this.length + index : index;
      return i < this.length ? moni2(this[i]) : null;
    },
    not: function(selectorOrFn) {
      const kept = [];
      this.each(function(el, index) {
        if (typeof selectorOrFn === "function") {
          if (!selectorOrFn.call(el, el, index)) kept.push(el);
        } else {
          if (!el.matches(selectorOrFn)) kept.push(el);
        }
      });
      return moni2(kept);
    }
  };
  Object.assign(moni2.fn, dom, events, css, bootsrap, animate);
  moni2.fn.init.prototype = moni2.fn;
  moni2.loaded = function(callback) {
    if (document.readyState !== "loading") {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  };
  moni2.ready = moni2.loaded;
  moni2.alias = function(name) {
    _savedGlobals[name] = global[name];
    global[name] = moni2;
    return moni2;
  };
  moni2.noConflict = function(name = "$") {
    if (global[name] === moni2) {
      global[name] = _savedGlobals[name];
      delete _savedGlobals[name];
    }
    return moni2;
  };
  moni2.fn.extend = function(methods) {
    Object.assign(moni2.fn, methods);
    return moni2;
  };
  moni2.cookie = function(name, value, opts = {}) {
    if (value === void 0) {
      const match = document.cookie.match(
        new RegExp("(?:^|; )" + encodeURIComponent(name) + "=([^;]*)")
      );
      return match ? decodeURIComponent(match[1]) : null;
    }
    if (value === null) {
      document.cookie = encodeURIComponent(name) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      return moni2;
    }
    let cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (opts.expires) {
      const d = /* @__PURE__ */ new Date();
      d.setTime(d.getTime() + opts.expires * 864e5);
      cookie += "; expires=" + d.toUTCString();
    }
    if (opts.path) cookie += "; path=" + opts.path;
    if (opts.domain) cookie += "; domain=" + opts.domain;
    if (opts.secure) cookie += "; secure";
    if (opts.sameSite) cookie += "; SameSite=" + opts.sameSite;
    document.cookie = cookie;
    return moni2;
  };
  moni2.store = function(key, value) {
    if (arguments.length === 1) {
      const raw = localStorage.getItem(key);
      if (raw === null) return null;
      try {
        return JSON.parse(raw);
      } catch {
        return raw;
      }
    }
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
    return moni2;
  };
  return moni2;
});
const moni$1 = moni;
export {
  moni$1 as default
};
