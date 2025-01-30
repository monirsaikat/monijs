# moni.js

`moni.js` is a minimal library for DOM manipulation and event handling. Below is a list of available methods with usage examples.

> Website: https://moniruzzamansaikat.github.io/monijs/

#### Getting Started
Include `moni.js` in your project and start manipulating DOM elements using the `moni` keyword.
```javascript
<script src="path/to/moni.umd.js"></script>
```
Or, using npm:

```shell
npm i moni22
```
Or, using cdn:

```html
<script src="https://cdn.jsdelivr.net/npm/moni22"></script>

```


### Methods
#### moni(selector)
Selects DOM elements.
```javascript
moni('#myDiv');  // Select an element with ID 'myDiv'
moni('.myClass'); // Select elements with class 'myClass'
```

#### html(value)
Gets or sets the HTML content of the selected element.
```javascript
// Get HTML content
const content = moni('#myDiv').html();

// Set HTML content
moni('#myDiv').html('<p>Hello, World!</p>');
```

#### on(event, callback)
Attaches an event listener to the selected elements.
```javascript
moni('#myButton').on('click', function() {
  alert('Button clicked!');
});
```

#### each(callback)
Executes a callback for each selected element.
```javascript
moni('.myClass').each(function(el) {
  console.log(el);
});
```
#### remove()
Remove elements from the dom
```javascript
moni('div').remove()
```
#### attr(key, ?value)
Get or set attributes
```javascript
moni('button').on('click', function() {
  const id = moni("#myDiv").css('color', 'red').attr('id');
  moni('#myDiv').attr('data-abc', 'xyz');
});
```
#### data(key, ?value)
Get or set dataset attributes
```javascript
moni('button').on('click', function() {
  const name = moni('div').data('name');
  
  console.log(name);
});
```
#### add(element, ?times)
Add new elements inside another element
```javascript
moni('button').on('click', function() {
  moni('div').add('<strong>Small</strong>', 4);
  moni('div').add('<p>Paragraph</p>');
});
```
#### val(?value)
Get or set value for a given element
```javascript
moni('form').on('submit', function(e) {
  e.preventDefault();
  
  const username = moni('input').val();
  const coding   = moni('select').val()

  console.log(username);
  console.log(coding);

  moni('select').val('js');
  moni('input').val('');
  moni('textarea').val('message');
});
```
#### first()
Get the first matched element
```javascript
moni('p').first().css('color', 'red');
```

#### last()
Get the last matched element
```javascript
moni('p').last().css('color', 'red');
```
#### at(index)
Get the element at the given index
```javascript
moni('p').at(2).css('color', 'purple');
```
#### values(index)
Grab a form's data simply
```javascript
moni('form').on('submit', function(e) {
  e.preventDefault();
  const values = moni('form').values();
  console.log(values);
});
```
#### before(elem)
Add an element before the matched element
```javascript
moni('div').before('<div>Div 0</div>')
```

#### after(elem)
Add an element after the matched element
```javascript
moni('div').after('<div>Div 1</div>')
```

#### children()
Return a list of all the children of the matched element
```javascript
const children   = moni('div').children();
const firstChild = children.at(0);          // .first();
```

#### empty()
Empty the contents of the matched element
```javascript
moni('ul').empty();
```

#### clone(?deep = true)
Clone a matched element. By default deep cloning is set. 
```javascript
const cloned = moni('ul').clone(); // or clone(false);
moni('body').add(cloned);
```

#### addPrevious(element)
Add an element to the previous of moni(selector)
```javascript
moni('p').addPrevious('<p>Another paragraph</p>');
```

#### addBehind(element)
Add an element to the behind of moni(selector)
```javascript
moni('p').addBehind('<div>Another paragraph</div>');
```

#### siblings(element)
Select all the siblings of matched element
```javascript
moni('ul li').siblings().css('color', 'red');
```

#### search(query)
Search elements inside moni(selector)
```javascript
moni('ul').search(
  moni('.bad')
).css('color', 'red');
```

#### near(query)
Find the nearest matching element.
```javascript
moni('li').near(
  moni('div')
).css('background-color', 'blue');

moni('li').near('div').css('background-color', 'blue');

```

#### classes()
Provides methods to interact with the class list of an element.
##### has(className)
```javascript
const hasClass = moni('#myDiv').classes().has('active');
```
##### add(className)
Adds a class to the element.
```javascript
moni('#myDiv').classes().add('active');
```
##### remove(className)
Removes a class from the element.
```javascript
moni('#myDiv').classes().remove('active');
```
##### toggle(className)
Toggle a class for the element.
```javascript
moni('button').on('click', function() {
  moni('#myDiv').classes().toggle('active');
});
```
##### toArray()
Converts the class list to an array.
```javascript
const classArray = moni('#myDiv').classes().toArray();
```

### css(property, value)
Gets or sets the CSS style of the selected elements.

```javascript
// Get the 'color' property
const color = moni('#myDiv').css('color');

// Set the 'color' property
moni('#myDiv').css('color', 'red');
```


#### moni().ajax()
Follow the example: 
```javascript
moni('form').on('submit', e => {
  e.preventDefault();

  const formData = moni('form').values();

  moni()
    .ajax()
    .request('http://localhost:3000/users')
    .type('POST')
    .loading(() => console.log('Loading...'))
    .header({
      'Content-Type': 'application/json',
    })
    .send(formData)
    .failed((error) => console.error(error))
    .success((response) => console.log('Success:', response))
    .end(() => console.log('Request finished'))
    .execute();

});
```
