![Muon Header Image](resources/muon-full.png)
#### Muon
*A teensy-weensy declarative custom elements library with support for Ractive.js.*

#### Features
 * Quick-and-simple declarative syntax for declaring custom elements.
 * Support for easy data-driven templating with [Ractive.js](http://ractivejs.org)
 * Teensy-weensy.
 * Designed for use in modern environments, such as [electron](https://github.com/atom/electron) or [nw.js](https://github.com/nwjs/nw.js).
 * No legacy-browser-supporting code. (This is usually a minus, to be honest.)
 * Total size is less than 3KB when minified. Even smaller gzipped.

#### Status
Muon is in early alpha and is probably not ready for production use. Use with care and please report any bugs you find!

#### Usage
Include `dist/muon-VERSION.min.js` (or `muon-dev.js` for the unminified development version) in your code with your preferred method. (Script tags, AMD modules, and CommonJS/Node module formats are supported.)

**If using Ractive.js:**

Ractive.js will be autodetected if it is loaded before Muon into the global scope (Either `window.Ractive` or `global.Ractive`). Otherwise, you will have to pass in the Ractive function with `Muon.init(Ractive)`.

**Defining an element:**

An element can be defined anywhere in a HTML page using the `muon-element` element, like so:
```html
<!-- Add the shadow attribute to clone the template inside the Shadow DOM of your element. -->
<muon-element tag-name="my-awesome-element" shadow>
  <!-- Template is optional -->
  <template>
    <h2>My Awesome Header</h2>
    <!-- Content gets rendered here -->
    <content></content>
  </template>
  
  <!-- If you don't need to handle any custom registration logic,
  omit this tag and add a auto-register attribute to the definition element -->
  <script>
    Muon('my-awesome-element', {
      // All parameters are optional.
      // Instance lifecycle methods.
      onPreCreate: function() {
        // Executed before the template is filled in on each instance of the element.
      },
      onCreated: function() {
        // Executed immediately after the template is filled in.
      },
      onAttached: function() {
        // Executed when the element is attached to the DOM tree.
      },
      onDetached: function() {
        // Executed when the element is detached from the DOM tree.
      },
      onAttributeChanged: function(attributeName, oldValue, newValue) {
        // Executed when an attribute of your custom element is changed.
      },
      
      // Ractive.js options.
      ractiveOptions: {
        magic: true,
        // Any valid Ractive.js constructor options can go here.
      }
    })
  </script>
</muon-element>

<!-- To use your element, simply add it to the DOM tree. -->
<my-awesome-element>
  <em>Other contents rendered inside the content tag.</em>
</my-awesome-element>
```

**Defining a dynamic element with Ractive.js:**

Writing an element that uses Ractive.js is quite straightforward:

```html
<!-- Add a ractive attribute to your element definition. Works with the shadow and auto-register attributes as well -->
<muon-element tag-name="my-ractive-element" ractive shadow auto-register>
  <!-- Simply include the Ractive expression inside the template block. -->
  <template>
    <p>{{greeting}}, {{name}}!<p>
  </template>
</muon-element>

<!-- Using it is as smiple as this: -->
<my-ractive-element id="greetingElement"></my-ractive-element>
```
At this point, your element will only render a comma. To remedy this, grab an instance of your element (perhaps with `document.getElementById()`), and call it's `setRactiveData()` method.

```javascript
document.getElementById('greetingElement').setRactiveData({
  greeting: 'Hello',
  name: 'World'
})
```

Your element will now show: "Hello, World!"

The Ractive instance of your element can be accessed through `element._Ractive`.

#### Common Pitfalls
 * Forgetting to add a `tag-name` attribute to your `muon-element` definition. You can't have an element without a name!
 * Tag names must contain at least one `-` character in them, or they will fail to register.
 * You cannot overwrite a previous element definition, unfortunately.
 * If your element fails to register completely or properly, make sure you are using either a `Muon()` call in a script tag to finalize your element, or have the `auto-register` attribute set on your `muon-element` definition.
 
#### License
```
COPYRIGHT (c) 2015 Joshua Bemenderfer (Tribex)

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
