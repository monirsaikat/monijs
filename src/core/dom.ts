export default {
  html: function (value) {
    if (!value) {
      return this[0] ? this[0].innerHTML : undefined;
    }

    this.each(function (el) {
      el.innerHTML = value;
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
    if (!value) {
      return this[0] ? this[0].getAttribute(name) : undefined;
    } else {
      this.each(function (el) {
        el.setAttribute(name, value);
      });

      return this;
    }
  },

  data: function (name, value) {
    if (!value) {
      return this[0] ? this[0].dataset[name] : undefined;
    } else {
      this.each(function (el) {
        el.dataset[name] = value;
      });

      return this;
    }
  },

  add: function (content, times) {
    if (typeof content === 'string') {
      if (content.includes('<')) {
        times = times || 1;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < times; i++) {
          const tempDiv = document.createElement('div');
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

  addPrevious: function (content) {
    if (typeof content === 'string') {
      this.each(function (el) {
        const fragment = document.createDocumentFragment();
        const tempDiv = document.createElement('div');
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
    if (typeof content === 'string') {
      this.each(function (el) {
        const fragment = document.createDocumentFragment();
        const tempDiv = document.createElement('div');
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
            el.parentNode.insertBefore(clonedEl.cloneNode(true), el.nextSibling);
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
        if (el.tagName === 'SELECT') {
          el.value = value;
        } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
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
        if ((el.type === 'checkbox' || el.type === 'radio')) {
          if (el.checked) {
            values[el.name] = el.value;
          }
        } else if (el.tagName === 'SELECT' && el.multiple) {
          const selectedValues = [];
          Array.prototype.forEach.call(el.options, function (option) {
            if (option.selected) {
              selectedValues.push(option.value);
            }
          });
          values[el.name] = selectedValues;
        } else if (el.type === 'file') {
          values[el.name] = el.files.length > 1 ? el.files : el.files[0]; // For multiple files or a single file
        } else {
          values[el.name] = el.value;
        }
      }
    });

    return values;
  },

  after: function (html) {
    this.each(function (el) {
      el.insertAdjacentHTML('afterend', html);
    });
    return this;
  },

  before: function (html) {
    this.each(function (el) {
      el.insertAdjacentHTML('beforebegin', html);
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
      el.innerHTML = '';
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

    if (typeof query === 'string') {
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

    const isSelector = typeof query === 'string';

    let selectors;
    if (isSelector) {
      selectors = [query];
    } else {
      selectors = Array.isArray(query) ?
        query.map((el: Element) => el.nodeType ? el.tagName.toLowerCase() : null).filter(Boolean) :
        Array.from(query).map((el: Element) => el.nodeType ? el.tagName.toLowerCase() : null).filter(Boolean);
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
          if (selectors.some(selector => currentElement.tagName.toLowerCase() === selector)) {
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