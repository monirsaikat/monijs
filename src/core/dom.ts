export default {
  find: function (selector) {
    const foundElements = [];

    this.each(function (el) {
      const matchedElements = el.querySelectorAll(selector);
      Array.prototype.push.apply(foundElements, matchedElements);
    });

    return moni(foundElements);
  },

  html: function (value) {
    if (value === undefined) {
      return this[0] ? this[0].innerHTML : undefined;
    }

    this.each(function (el) {
      el.innerHTML = value;
    });

    return this;
  },

  text: function (value) {
    if (value === undefined) {
      return this[0] ? this[0].textContent : undefined;
    }

    this.each(function (el) {
      el.textContent = value;
    });

    return this;
  },

  each: function (callback) {
    Array.prototype.forEach.call(this, function (el, index) {
      callback.call(el, el, index);
    });

    return this;
  },

  remove: function () {
    this.each(function (el) {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });

    return this;
  },

  attr: function (name, value) {
    if (value === undefined) {
      return this[0] ? this[0].getAttribute(name) : undefined;
    } else {
      this.each(function (el) {
        el.setAttribute(name, value);
      });

      return this;
    }
  },

  data: function (name, value) {
    if (value === undefined) {
      return this[0] ? this[0].dataset[name] : undefined;
    } else {
      this.each(function (el) {
        el.dataset[name] = value;
      });

      return this;
    }
  },

  add: function (content, times) {
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

        this.each(function (el) {
          el.appendChild(fragment.cloneNode(true));
        });
      } else {
        times = times || 1;

        this.each(function (el) {
          for (let i = 0; i < times; i++) {
            const newElement = document.createElement(content);
            el.appendChild(newElement);
          }
        });
      }
    } else if (content instanceof moni) {
      this.each(function (el) {
        content.each(function (clonedEl) {
          el.appendChild(clonedEl.cloneNode(true));
        });
      });
    }

    return this;
  },

  append: function (content) {
    return this.add(content);
  },

  prepend: function (content) {
    if (typeof content === "string") {
      this.each(function (el) {
        el.insertAdjacentHTML("afterbegin", content);
      });
    } else if (content instanceof moni) {
      this.each(function (el) {
        content.each(function (newEl) {
          el.insertBefore(newEl.cloneNode(true), el.firstChild);
        });
      });
    }
    return this;
  },

  addPrevious: function (content) {
    if (typeof content === "string") {
      this.each(function (el) {
        const fragment = document.createDocumentFragment();
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;
        while (tempDiv.firstChild) {
          fragment.appendChild(tempDiv.firstChild);
        }
        el.parentNode.insertBefore(fragment, el);
      });
    } else if (content instanceof moni) {
      this.each(function (el) {
        content.each(function (clonedEl) {
          el.parentNode.insertBefore(clonedEl.cloneNode(true), el);
        });
      });
    }

    return this;
  },

  addBehind: function (content) {
    if (typeof content === "string") {
      this.each(function (el) {
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
      this.each(function (el) {
        content.each(function (clonedEl) {
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

  siblings: function () {
    const siblingsArray = [];

    this.each(function (el) {
      Array.prototype.forEach.call(el.parentNode.children, function (sibling) {
        if (sibling !== el) {
          siblingsArray.push(sibling);
        }
      });
    });

    return moni(siblingsArray);
  },

  val: function (value) {
    if (value === undefined) {
      return this[0] ? this[0].value : undefined;
    } else {
      this.each(function (el) {
        if (el.tagName === "SELECT") {
          el.value = value;
        } else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.value = value;
        }
      });
      return this;
    }
  },

  first: function () {
    const element = this[0];
    if (element) return moni(element);

    return null;
  },

  last: function () {
    const element = this[this.length - 1];
    if (element) return moni(element);

    return null;
  },

  at: function (index) {
    if (index < this.length) {
      return moni(this[index]);
    }

    return null;
  },

  values: function () {
    const values = {};
    const elements = this[0].elements;

    Array.prototype.forEach.call(elements, function (el) {
      if (el.name && !el.disabled) {
        if (el.type === "checkbox" || el.type === "radio") {
          if (el.checked) {
            values[el.name] = el.value;
          }
        } else if (el.tagName === "SELECT" && el.multiple) {
          const selectedValues = [];
          Array.prototype.forEach.call(el.options, function (option) {
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

  after: function (html) {
    this.each(function (el) {
      el.insertAdjacentHTML("afterend", html);
    });
    return this;
  },

  before: function (html) {
    this.each(function (el) {
      el.insertAdjacentHTML("beforebegin", html);
    });
    return this;
  },

  children: function () {
    const childrenArray = [];

    this.each(function (el) {
      Array.prototype.push.apply(childrenArray, el.children);
    });

    return moni(childrenArray);
  },

  empty: function () {
    this.each(function (el) {
      el.innerHTML = "";
    });

    return this;
  },

  clone: function (deep = true) {
    const clonedElements = [];

    this.each(function (el) {
      clonedElements.push(el.cloneNode(deep || false));
    });

    return moni(clonedElements);
  },

  search: function (query) {
    const matchedElements = [];

    if (typeof query === "string") {
      this.each(function (el) {
        const foundElements = el.querySelectorAll(query);
        Array.prototype.push.apply(matchedElements, foundElements);
      });
    } else if (query instanceof moni) {
      this.each(function (el) {
        query.each(function (element) {
          if (el.contains(element)) {
            matchedElements.push(element);
          }
        });
      });
    }

    return moni(matchedElements);
  },

  near: function (query) {
    const closestElements = [];

    const isSelector = typeof query === "string";

    let selectors;
    if (isSelector) {
      selectors = [query];
    } else {
      selectors = Array.isArray(query)
        ? query
            .map((el: Element) =>
              el.nodeType ? el.tagName.toLowerCase() : null
            )
            .filter(Boolean)
        : Array.from(query)
            .map((el: Element) =>
              el.nodeType ? el.tagName.toLowerCase() : null
            )
            .filter(Boolean);
    }

    this.each(function (el) {
      let currentElement = el;
      while (currentElement && currentElement !== document) {
        if (isSelector) {
          if (currentElement.matches(query)) {
            closestElements.push(currentElement);
            break;
          }
        } else {
          if (
            selectors.some(
              (selector) => currentElement.tagName.toLowerCase() === selector
            )
          ) {
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

  show: function () {
    this.each(function (el) {
      el.style.display = "";
      if (getComputedStyle(el).display === "none") {
        el.style.display = "block";
      }
    });
    return this;
  },

  hide: function () {
    this.each(function (el) {
      el.style.display = "none";
    });
    return this;
  },

  toggle: function () {
    this.each(function (el) {
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

  parent: function (selector?) {
    const parents = [];
    this.each(function (el) {
      const p = el.parentElement;
      if (p) {
        if (!selector || p.matches(selector)) {
          parents.push(p);
        }
      }
    });
    return moni(parents);
  },

  closest: function (selector) {
    const found = [];
    this.each(function (el) {
      const match = el.closest(selector);
      if (match) found.push(match);
    });
    return moni(found);
  },

  is: function (selector) {
    if (!this[0]) return false;
    if (typeof selector === "string") return this[0].matches(selector);
    if (selector instanceof moni) return this[0] === selector[0];
    return this[0] === selector;
  },

  filter: function (selectorOrFn) {
    const matched = [];
    this.each(function (el, index) {
      if (typeof selectorOrFn === "function") {
        if (selectorOrFn.call(el, el, index)) matched.push(el);
      } else {
        if (el.matches(selectorOrFn)) matched.push(el);
      }
    });
    return moni(matched);
  },

  prop: function (name, value?) {
    if (value === undefined) {
      return this[0] ? this[0][name] : undefined;
    }
    return this.each(function (el) {
      el[name] = value;
    });
  },

  width: function () {
    return this[0] ? this[0].getBoundingClientRect().width : undefined;
  },

  height: function () {
    return this[0] ? this[0].getBoundingClientRect().height : undefined;
  },

  offset: function () {
    if (!this[0]) return null;
    const rect = this[0].getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    };
  },

  scrollTop: function (value?) {
    if (value === undefined) {
      if (!this[0]) return 0;
      const el = this[0];
      return el === document.documentElement || el === document.body
        ? window.scrollY
        : el.scrollTop;
    }
    return this.each(function (el) {
      if (el === document.documentElement || el === document.body) {
        window.scrollTo(0, value);
      } else {
        el.scrollTop = value;
      }
    });
  },

  scrollLeft: function (value?) {
    if (value === undefined) {
      if (!this[0]) return 0;
      const el = this[0];
      return el === document.documentElement || el === document.body
        ? window.scrollX
        : el.scrollLeft;
    }
    return this.each(function (el) {
      if (el === document.documentElement || el === document.body) {
        window.scrollTo(value, 0);
      } else {
        el.scrollLeft = value;
      }
    });
  },

  wrap: function (html) {
    this.each(function (el) {
      if (!el.parentNode) return;
      const temp = document.createElement("div");
      temp.innerHTML = html;
      const wrapper = temp.firstChild as HTMLElement;
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);
    });
    return this;
  },

  unwrap: function () {
    this.each(function (el) {
      const parent = el.parentNode;
      if (
        !parent ||
        parent === document.body ||
        parent === document.documentElement
      )
        return;
      while (parent.firstChild) {
        parent.parentNode.insertBefore(parent.firstChild, parent);
      }
      parent.parentNode.removeChild(parent);
    });
    return this;
  },

  replaceWith: function (content) {
    this.each(function (el) {
      if (!el.parentNode) return;
      if (typeof content === "string") {
        el.insertAdjacentHTML("afterend", content);
      } else if (content instanceof moni) {
        content.each(function (newEl) {
          el.parentNode.insertBefore(newEl.cloneNode(true), el);
        });
      }
      el.parentNode.removeChild(el);
    });
    return this;
  },

  index: function () {
    if (!this[0] || !this[0].parentNode) return -1;
    return Array.prototype.indexOf.call(
      this[0].parentNode.children,
      this[0]
    );
  },

  serialize: function () {
    const parts = [];
    const elements = this[0]
      ? this[0].elements || [this[0]]
      : [];

    Array.prototype.forEach.call(elements, function (el) {
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

  innerWidth: function () {
    return this[0] ? this[0].clientWidth : undefined;
  },

  innerHeight: function () {
    return this[0] ? this[0].clientHeight : undefined;
  },

  outerWidth: function (includeMargin = false) {
    if (!this[0]) return undefined;
    let w = this[0].offsetWidth;
    if (includeMargin) {
      const s = getComputedStyle(this[0]);
      w += parseInt(s.marginLeft) + parseInt(s.marginRight);
    }
    return w;
  },

  outerHeight: function (includeMargin = false) {
    if (!this[0]) return undefined;
    let h = this[0].offsetHeight;
    if (includeMargin) {
      const s = getComputedStyle(this[0]);
      h += parseInt(s.marginTop) + parseInt(s.marginBottom);
    }
    return h;
  },

  position: function () {
    if (!this[0]) return null;
    return { top: this[0].offsetTop, left: this[0].offsetLeft };
  },

  // --- native actions ---

  click: function () {
    return this.each(function (el) { el.click && el.click(); });
  },

  focus: function () {
    return this.each(function (el) { el.focus && el.focus(); });
  },

  blur: function () {
    return this.each(function (el) { el.blur && el.blur(); });
  },

  submit: function () {
    return this.each(function (el) { el.submit && el.submit(); });
  },

  // --- visibility observer ---

  onVisible: function (callback, options = {}) {
    this.each(function (el) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            callback.call(el, entry);
          }
        });
      }, options);
      observer.observe(el);
    });
    return this;
  },
};
