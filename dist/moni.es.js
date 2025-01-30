const dom = {
  html: function(value) {
    if (!value) {
      return this[0] ? this[0].innerHTML : void 0;
    }
    this.each(function(el) {
      el.innerHTML = value;
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
    if (!value) {
      return this[0] ? this[0].getAttribute(name) : void 0;
    } else {
      this.each(function(el) {
        el.setAttribute(name, value);
      });
      return this;
    }
  },
  data: function(name, value) {
    if (!value) {
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
            el.parentNode.insertBefore(clonedEl.cloneNode(true), el.nextSibling);
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
      selectors = Array.isArray(query) ? query.map((el) => el.nodeType ? el.tagName.toLowerCase() : null).filter(Boolean) : Array.from(query).map((el) => el.nodeType ? el.tagName.toLowerCase() : null).filter(Boolean);
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
          if (selectors.some((selector) => currentElement.tagName.toLowerCase() === selector)) {
            closestElements.push(currentElement);
            break;
          }
        }
        currentElement = currentElement.parentElement;
      }
    });
    return moni(closestElements);
  }
};
const events = {
  on: function(event, callback) {
    this.each(function(el) {
      el.addEventListener(event, callback);
    });
    return this;
  },
  off: function(event, callback) {
    this.each(function(el) {
      el.removeEventListener(event, callback);
    });
    return this;
  }
};
const css = {
  css: function(prop, value) {
    if (!value) {
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
(function(global, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory(global);
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    global.moni = factory(global);
  }
})(typeof window !== "undefined" ? window : void 0, function(global) {
  const moni2 = function(selector) {
    return new moni2.fn.init(selector);
  };
  moni2.fn = moni2.prototype = {
    constructor: moni2,
    length: 0,
    init: function(selector) {
      if (!selector) return this;
      if (selector instanceof moni2) return selector;
      if (typeof selector === "string") {
        if (selector[0] === "#") {
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
    ajax: function() {
      return moniAjax();
    }
  };
  Object.assign(moni2.fn, dom, events, css);
  moni2.loaded = function(callback) {
    if (document.readyState !== "loading") {
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", callback);
    }
  };
  moni2.fn.init.prototype = moni2.fn;
  return moni2;
});
const moni$1 = moni;
export {
  moni$1 as default
};
