# moni.js

A lightweight, jQuery-style DOM manipulation library written in TypeScript. No dependencies, works in all modern browsers.

> **v2.1.0** — 60+ chainable methods · animations · AJAX · plugins · custom aliases

**Links:** [Website](https://moniruzzamansaikat.github.io/monijs/) · [npm](https://www.npmjs.com/package/moni22) · [GitHub](https://github.com/moniruzzamansaikat/monijs)

---

## Installation

**CDN**
```html
<script src="https://cdn.jsdelivr.net/npm/moni22"></script>
```

**npm**
```bash
npm install moni22
```

**ES module**
```javascript
import moni from 'moni22';
```

---

## Quick Start

```javascript
moni('#btn').on('click', function () {
  moni('.box').addClass('active').slideDown(200);
});
```

---

## Aliases

The default global is `moni`. Create any alias you want.

```javascript
// Global alias — now you can use $ just like jQuery
moni.alias('$');
$('#app').html('<p>Hello!</p>');

// Chain multiple aliases
moni.alias('$').alias('m');

// Restore a previous $ and get moni back
const moni = $.noConflict();

// Or just assign directly — simplest way
const $ = moni;
const m = moni;
```

---

## Version & DOM Ready

```javascript
console.log(moni.version); // "2.1.0"

moni.loaded(function () { /* DOM is ready */ });
moni.ready(function () { /* same thing — alias */ });
```

---

## Selector

```javascript
moni('#id')          // by ID
moni('.class')       // by class
moni('div > p')      // any CSS selector
moni(element)        // from a native DOM element
moni([el1, el2])     // from an array of elements
```

---

## DOM — Reading & Writing

### `html(value?)`
Get or set inner HTML.
```javascript
const markup = moni('#box').html();
moni('#box').html('<strong>Hello</strong>');
```

### `text(value?)`
Get or set text content.
```javascript
const label = moni('h1').text();
moni('h1').text('New Title');
```

### `val(value?)`
Get or set the value of inputs, selects, and textareas.
```javascript
const name = moni('#name').val();
moni('#name').val('');
```

### `attr(name, value?)`
Get or set an HTML attribute.
```javascript
const href = moni('a').attr('href');
moni('img').attr('alt', 'A photo');
```

### `data(name, value?)`
Get or set a `data-*` attribute.
```javascript
const id = moni('.item').data('id');
moni('.item').data('id', '42');
```

### `prop(name, value?)`
Get or set a DOM property (`checked`, `disabled`, `value`, etc.).
```javascript
const isChecked = moni('#cb').prop('checked');
moni('#cb').prop('checked', true);
moni('#btn').prop('disabled', false);
```

### `values()`
Collect all form field values as a plain object. Handles checkboxes, radios, multi-select, and file inputs.
```javascript
moni('form').on('submit', function (e) {
  e.preventDefault();
  const data = moni('form').values();
  // { username: 'alice', role: 'admin', tags: ['a', 'b'] }
});
```

### `serialize()`
Serialize a form to a URL-encoded query string.
```javascript
const qs = moni('form').serialize();
// "username=alice&role=admin"
```

---

## DOM — Traversal

### `find(selector)`
Search for descendants inside the matched set.
```javascript
moni('#list').find('li.active').css('color', 'green');
```

### `children()`
Get all direct children.
```javascript
moni('ul').children().addClass('list-item');
```

### `parent(selector?)`
Get the parent element, optionally filtered by a selector.
```javascript
moni('li').parent();
moni('li').parent('ul.main');
```

### `siblings()`
Get all sibling elements.
```javascript
moni('.active').siblings().removeClass('active');
```

### `closest(selector)`
Walk up the DOM tree and return the first ancestor that matches.
```javascript
moni('input').closest('form').addClass('has-focus');
```

### `near(query)`
Find the nearest matching ancestor — accepts a selector string or a moni instance.
```javascript
moni('li').near('div').css('background', 'yellow');
```

### `first()` / `last()`
Get the first or last matched element.
```javascript
moni('p').first().css('font-weight', 'bold');
moni('p').last().css('opacity', '0.5');
```

### `at(index)` / `eq(index)`
Get the element at a specific index. Negative indexes count from the end.
```javascript
moni('li').at(2).addClass('third');
moni('li').eq(-1).addClass('last');
```

### `each(callback)`
Iterate over every matched element.
```javascript
moni('p').each(function (el, index) {
  console.log(index, el.textContent);
});
```

### `filter(selectorOrFn)`
Keep only elements that match a selector or pass a test function.
```javascript
moni('li').filter('.active');
moni('li').filter(function (el) { return el.textContent.length > 5; });
```

### `not(selectorOrFn)`
Remove elements that match a selector or fail a test function.
```javascript
moni('li').not('.disabled').addClass('clickable');
```

### `is(selector)`
Check if the first element matches a selector. Returns a boolean.
```javascript
if (moni('#box').is('.active')) { ... }
```

### `index()`
Get the zero-based index of the first element among its siblings.
```javascript
const pos = moni('.selected').index();
```

### `search(query)`
Search for elements inside the matched set using a selector or moni instance.
```javascript
moni('ul').search('.bad').css('color', 'red');
```

### `toArray()`
Convert matched elements to a plain JavaScript array.
```javascript
const els = moni('li').toArray();
els.forEach(el => console.log(el));
```

---

## DOM — Insertion & Removal

### `append(content)` / `add(content, times?)`
Insert content at the **end** inside matched elements.
```javascript
moni('#list').append('<li>New item</li>');
moni('#list').add('<li>Item</li>', 3); // add 3 copies
```

### `prepend(content)`
Insert content at the **beginning** inside matched elements.
```javascript
moni('#list').prepend('<li>First!</li>');
```

### `before(html)` / `after(html)`
Insert HTML before or after each matched element (as a sibling).
```javascript
moni('.section').before('<hr>');
moni('.section').after('<hr>');
```

### `addPrevious(content)` / `addBehind(content)`
Insert content as the previous or next sibling.
```javascript
moni('p').addPrevious('<p>Before</p>');
moni('p').addBehind('<p>After</p>');
```

### `wrap(html)`
Wrap each matched element inside an HTML structure.
```javascript
moni('img').wrap('<figure class="frame"></figure>');
```

### `unwrap()`
Remove the parent element, keeping the element itself in place.
```javascript
moni('img').unwrap();
```

### `replaceWith(content)`
Replace each matched element with new HTML or a moni instance.
```javascript
moni('.old').replaceWith('<div class="new">Replaced</div>');
```

### `remove()`
Remove matched elements from the DOM.
```javascript
moni('.toast').remove();
```

### `empty()`
Remove all children from matched elements.
```javascript
moni('#results').empty();
```

### `clone(deep?)`
Clone matched elements. Deep clone is on by default.
```javascript
const copy = moni('#card').clone();
moni('#container').append(copy);
```

---

## Visibility

### `show()` / `hide()` / `toggle()`
Show, hide, or toggle element visibility with `display`.
```javascript
moni('#modal').show();
moni('#modal').hide();
moni('#btn').on('click', function () {
  moni('#menu').toggle();
});
```

---

## CSS & Classes

### `css(property, value?)`
Get or set a CSS style property.
```javascript
const color = moni('#box').css('color');
moni('#box').css('background-color', '#f00');
```

### `hasClass(className)`
Check if the first element has a class. Returns a boolean.
```javascript
if (moni('#btn').hasClass('active')) { ... }
```

### `addClass(className)`
Add one or more space-separated classes to all matched elements.
```javascript
moni('.card').addClass('highlighted');
moni('.card').addClass('active selected');
```

### `removeClass(className)`
Remove one or more classes from all matched elements.
```javascript
moni('.card').removeClass('highlighted active');
```

### `toggleClass(className, force?)`
Toggle a class on all matched elements. Pass `true`/`false` to force add/remove.
```javascript
moni('.item').toggleClass('active');
moni('.item').toggleClass('active', true);  // always add
moni('.item').toggleClass('active', false); // always remove
```

### `classes()`
Returns a chainable class helper for the first matched element.
```javascript
moni('#box').classes().add('open');
moni('#box').classes().remove('open');
moni('#box').classes().toggle('open');
moni('#box').classes().has('open');    // boolean
moni('#box').classes().toArray();      // ['cls1', 'cls2']
```

---

## Dimensions & Position

### `width()` / `height()`
Rendered width/height from `getBoundingClientRect` (includes padding, excludes border).
```javascript
const w = moni('#box').width();
const h = moni('#box').height();
```

### `innerWidth()` / `innerHeight()`
`clientWidth` / `clientHeight` — padding included, border excluded.
```javascript
moni('#box').innerWidth();
moni('#box').innerHeight();
```

### `outerWidth(includeMargin?)` / `outerHeight(includeMargin?)`
`offsetWidth` / `offsetHeight` — border included. Pass `true` to also include margins.
```javascript
moni('#box').outerWidth();        // border included
moni('#box').outerWidth(true);    // border + margin
moni('#box').outerHeight(true);
```

### `offset()`
Position of the first element relative to the **document**.
```javascript
const pos = moni('#box').offset();
console.log(pos.top, pos.left);
```

### `position()`
Position of the first element relative to its **offset parent**.
```javascript
const pos = moni('#box').position();
console.log(pos.top, pos.left);
```

### `scrollTop(value?)` / `scrollLeft(value?)`
Get or set the scroll position. Works on elements and `document.body`.
```javascript
const top = moni('#feed').scrollTop();
moni('#feed').scrollTop(0);
moni(document.body).scrollTop(500);
```

---

## Native Actions

### `click()` / `focus()` / `blur()` / `submit()`
Programmatically trigger a native browser action on matched elements.
```javascript
moni('#btn').click();
moni('#name').focus();
moni('#name').blur();
moni('form').submit();
```

---

## Intersection / Visibility Observer

### `onVisible(callback, options?)`
Fire a callback when an element enters the viewport, powered by `IntersectionObserver`.
Useful for lazy loading, scroll animations, infinite scroll, and analytics.
```javascript
moni('.lazy-img').onVisible(function (entry) {
  this.src = this.dataset.src; // swap in the real image
});

// With IntersectionObserver options
moni('.card').onVisible(function () {
  moni(this).addClass('animate-in');
}, { threshold: 0.3 }); // fire when 30% visible

// Infinite scroll example
moni('#load-more-sentinel').onVisible(function () {
  loadNextPage();
});
```

---

## Events

### `on(event, callback)`
Attach an event listener.
```javascript
moni('#btn').on('click', function (e) {
  console.log('clicked');
});
```

### `on(event, selector, callback)` — delegated
Event delegation: the listener fires only when the event target matches the selector.
Efficient for dynamic elements — attach once on the parent, works for future children too.
```javascript
moni('#list').on('click', 'li', function (e) {
  moni(this).toggleClass('selected');
});
```

### `delegate(event, selector, callback)`
Named alias for delegated `on()`. More expressive for large event setups.
```javascript
moni('#table').delegate('click', 'tr', function () {
  moni(this).addClass('highlighted');
});
```

### `off(event, callback)`
Remove an event listener.
```javascript
function handler(e) { ... }
moni('#btn').on('click', handler);
moni('#btn').off('click', handler);
```

### `once(event, callback)`
Attach a listener that fires exactly one time, then removes itself.
```javascript
moni('#btn').once('click', function () {
  console.log('fires only once');
});
```

### `trigger(event, data?)`
Dispatch a custom event on matched elements. Data is available as `event.detail`.
```javascript
moni('#form').trigger('submit');
moni('#chat').trigger('message', { text: 'Hello!' });

moni('#chat').on('message', function (e) {
  console.log(e.detail.text); // "Hello!"
});
```

---

## Animation

All animation methods default to **300ms** and return `this` for chaining.

### `fadeIn(duration?)`
Fade an element in (opacity 0 → 1). Shows the element if hidden.
```javascript
moni('#modal').fadeIn();
moni('#modal').fadeIn(500);
```

### `fadeOut(duration?)`
Fade an element out (opacity 1 → 0), then sets `display: none`.
```javascript
moni('#modal').fadeOut();
moni('#alert').fadeOut(150);
```

### `fadeToggle(duration?)`
Fade in if hidden, fade out if visible.
```javascript
moni('#panel').fadeToggle(400);
```

### `slideDown(duration?)`
Animate height from 0 to natural height (reveal).
```javascript
moni('#menu').slideDown();
moni('#menu').slideDown(500);
```

### `slideUp(duration?)`
Animate height to 0 then hide (collapse).
```javascript
moni('#menu').slideUp();
```

### `slideToggle(duration?)`
Slide down if hidden, slide up if visible.
```javascript
moni('#accordion-body').slideToggle();

moni('.accordion-btn').on('click', function () {
  moni(this).closest('.accordion').find('.accordion-body').slideToggle(250);
});
```

### `animate(props, duration?, easing?)`
Animate any set of CSS properties using CSS transitions.
`props` keys can be camelCase — they are auto-converted to kebab-case.
```javascript
moni('#box').animate({ opacity: '0.5', transform: 'scale(0.9)' }, 400);
moni('#box').animate({ marginLeft: '100px', backgroundColor: '#ff0' }, 600, 'ease-in-out');

// Chain animations with setTimeout
moni('#box')
  .animate({ opacity: '0' }, 300);
  setTimeout(function () {
    moni('#box').animate({ opacity: '1', transform: 'translateY(0)' }, 300);
  }, 300);
```

---

## AJAX

Chainable fetch wrapper. All methods return `this` so you can chain them in any order before calling `.execute()`.

```javascript
moni().ajax()
  .request('https://api.example.com/users')
  .type('POST')
  .header({ 'Content-Type': 'application/json' })
  .send({ name: 'Alice' })
  .loading(() => moni('#spinner').show())
  .success((data) => console.log(data))
  .failed((err) => console.error(err.type, err.message))
  .end(() => moni('#spinner').hide())
  .execute();
```

| Method | Description |
|--------|-------------|
| `.request(url)` | Set the request URL |
| `.type(method)` | HTTP method: `'GET'`, `'POST'`, `'PUT'`, `'DELETE'`, etc. |
| `.header(obj)` | Merge request headers |
| `.send(data)` | Request body — auto-converts to `JSON.stringify` or `FormData` |
| `.loading(fn)` | Called before the request starts |
| `.success(fn)` | Called with parsed JSON on a successful response |
| `.failed(fn)` | Called with `{ type, message, originalError }` on failure |
| `.end(fn)` | Always called when the request finishes |
| `.execute()` | Send the request (returns a Promise) |

**Auto Content-Type:** set `Content-Type: application/json` to get JSON serialization; otherwise `.send()` creates `FormData`.

---

## Utilities

### `moni.cookie(name, value?, opts?)`
Get, set, or delete cookies. Returns the value when reading, returns `moni` when writing (chainable).

```javascript
// Get
const token = moni.cookie('token');

// Set
moni.cookie('token', 'abc123');

// Set with options
moni.cookie('token', 'abc123', {
  expires: 7,           // days
  path: '/',
  domain: 'example.com',
  secure: true,
  sameSite: 'Strict',   // 'Strict' | 'Lax' | 'None'
});

// Delete (pass null as value)
moni.cookie('token', null);
```

| Option | Type | Description |
|--------|------|-------------|
| `expires` | `number` | Days until the cookie expires |
| `path` | `string` | Cookie path (default is current path) |
| `domain` | `string` | Cookie domain |
| `secure` | `boolean` | HTTPS only |
| `sameSite` | `string` | `'Strict'`, `'Lax'`, or `'None'` |

### `moni.store(key, value?)`
Get, set, or remove `localStorage` items. Values are automatically JSON-serialized/parsed.

```javascript
// Set (any JSON-serializable value)
moni.store('user', { name: 'Alice', role: 'admin' });
moni.store('count', 42);
moni.store('dark', true);

// Get (auto-parsed from JSON)
const user  = moni.store('user');   // { name: 'Alice', role: 'admin' }
const count = moni.store('count');  // 42

// Remove (pass null)
moni.store('user', null);
```

---

## Bootstrap Modals

Requires Bootstrap JS to be loaded.

```javascript
moni('#myModal').modal().show();
moni('#myModal').modal().hide();
moni('#myModal').modal().toggle();

// With Bootstrap options
moni('#myModal').modal({ backdrop: 'static', keyboard: false }).show();
```

---

## Plugin System

Extend moni with your own methods using `moni.fn.extend()`. Added methods are instantly available on all instances.

```javascript
moni.fn.extend({
  // Custom ripple effect
  ripple() {
    return this.on('click', function (e) {
      const el = moni(this);
      const dot = document.createElement('span');
      dot.className = 'ripple-dot';
      dot.style.cssText = `
        position:absolute; border-radius:50%;
        background:rgba(255,255,255,0.4);
        width:10px; height:10px;
        left:${e.offsetX}px; top:${e.offsetY}px;
        pointer-events:none;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(dot);
      moni(dot).animate({ transform: 'scale(20)', opacity: '0' }, 500);
      setTimeout(() => dot.remove(), 500);
    });
  },

  // Scroll this element into view
  scrollIntoView(behavior = 'smooth') {
    return this.each(function (el) {
      el.scrollIntoView({ behavior, block: 'start' });
    });
  },
});

// Use like any built-in method
moni('.btn').ripple();
moni('#section').scrollIntoView();
```

---

## Chaining

Every method that doesn't return a value returns the moni instance for chaining.

```javascript
moni('#card')
  .addClass('visible')
  .css('opacity', '1')
  .attr('aria-hidden', 'false')
  .find('button')
    .prop('disabled', false)
    .on('click', handler);

// Animations chain too
moni('#hero')
  .fadeIn(400)
  .find('h1')
    .animate({ transform: 'translateY(0)', opacity: '1' }, 600);
```

---

## Full Method Reference

| Category | Method | Description |
|----------|--------|-------------|
| **Core** | `moni(selector)` | Select elements |
| | `moni.version` | Version string |
| | `moni.loaded(fn)` / `moni.ready(fn)` | DOM ready callback |
| | `moni.alias(name)` | Create a global alias |
| | `moni.noConflict(name?)` | Restore a previous global, returns moni |
| | `moni.fn.extend(methods)` | Add plugin methods |
| **Utilities** | `moni.cookie(name, val?, opts?)` | Get / set / delete cookies |
| | `moni.store(key, val?)` | Get / set / remove localStorage (auto-JSON) |
| **Reading** | `html()` | Get inner HTML |
| | `text()` | Get text content |
| | `val()` | Get field value |
| | `attr(name)` | Get attribute |
| | `data(name)` | Get data attribute |
| | `prop(name)` | Get DOM property |
| | `css(prop)` | Get computed style |
| | `width()` / `height()` | Bounding rect dimensions |
| | `innerWidth()` / `innerHeight()` | clientWidth / clientHeight |
| | `outerWidth(margin?)` / `outerHeight(margin?)` | offsetWidth / offsetHeight (+ optional margin) |
| | `offset()` | `{top, left}` from document |
| | `position()` | `{top, left}` from offset parent |
| | `scrollTop()` / `scrollLeft()` | Get scroll position |
| | `index()` | Sibling index |
| | `is(selector)` | Test against selector (boolean) |
| | `hasClass(cls)` | Check class presence (boolean) |
| | `values()` | Collect form data as object |
| | `serialize()` | Serialize form to query string |
| **Writing** | `html(v)` | Set inner HTML |
| | `text(v)` | Set text content |
| | `val(v)` | Set field value |
| | `attr(name, v)` | Set attribute |
| | `data(name, v)` | Set data attribute |
| | `prop(name, v)` | Set DOM property |
| | `css(prop, v)` | Set inline style |
| | `scrollTop(v)` / `scrollLeft(v)` | Set scroll position |
| **Insertion** | `append(content)` / `add(content)` | Insert at end inside |
| | `prepend(content)` | Insert at start inside |
| | `before(html)` / `after(html)` | Insert outside as sibling |
| | `addPrevious(content)` / `addBehind(content)` | Insert as prev/next sibling |
| | `wrap(html)` | Wrap in HTML |
| | `unwrap()` | Remove parent |
| | `replaceWith(content)` | Replace element |
| | `clone(deep?)` | Clone element(s) |
| **Removal** | `remove()` | Remove from DOM |
| | `empty()` | Clear children |
| **Traversal** | `find(selector)` | Descendants |
| | `children()` | Direct children |
| | `parent(selector?)` | Parent element |
| | `siblings()` | All siblings |
| | `closest(selector)` | Nearest matching ancestor |
| | `near(query)` | Nearest ancestor by element ref |
| | `first()` / `last()` | First / last match |
| | `at(i)` / `eq(i)` | Element at index (supports negatives) |
| | `each(fn)` | Iterate |
| | `filter(sel/fn)` | Keep matching |
| | `not(sel/fn)` | Exclude matching |
| | `search(query)` | Search inside |
| | `toArray()` | Convert to plain array |
| **Visibility** | `show()` | Make visible |
| | `hide()` | Set `display:none` |
| | `toggle()` | Toggle visibility |
| **Classes** | `addClass(cls)` | Add class(es) |
| | `removeClass(cls)` | Remove class(es) |
| | `toggleClass(cls, force?)` | Toggle class |
| | `hasClass(cls)` | Check class (boolean) |
| | `classes()` | Class helper object |
| **Actions** | `click()` | Trigger native click |
| | `focus()` | Trigger native focus |
| | `blur()` | Trigger native blur |
| | `submit()` | Trigger native submit |
| **Events** | `on(event, fn)` | Attach listener |
| | `on(event, selector, fn)` | Delegated listener |
| | `delegate(event, selector, fn)` | Named delegated listener |
| | `off(event, fn)` | Remove listener |
| | `once(event, fn)` | One-time listener |
| | `trigger(event, data?)` | Dispatch custom event |
| **Animation** | `fadeIn(ms?)` | Fade in |
| | `fadeOut(ms?)` | Fade out |
| | `fadeToggle(ms?)` | Fade in/out |
| | `slideDown(ms?)` | Reveal by height |
| | `slideUp(ms?)` | Collapse by height |
| | `slideToggle(ms?)` | Slide in/out |
| | `animate(props, ms?, easing?)` | Animate CSS properties |
| **Observer** | `onVisible(fn, opts?)` | Fire when element enters viewport |
| **AJAX** | `ajax()` | Chainable fetch builder |
| **Bootstrap** | `modal(opts?)` | Bootstrap modal accessor |

---

## License

MIT © 2024 [Moniruzzaman Saikat](https://github.com/moniruzzamansaikat)
