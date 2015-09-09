;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Muon = factory();
  }
}(this, function() {
'use strict';
// COPYRIGHT (c) 2015 Joshua Bemenderfer (Tribex)
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// Muon ES6 sources.
// Auto-generated version number.
var VERSION = '0.1.0';

var _Ractive = window.Ractive || (typeof global !== 'undefined' ? global.Ractive : null) || null;

// An object holding name->element mappings of elements which have been declared but not initialized.
var partiallyRegisteredElements = {};

// An object holding name->element prototype mappings on initialized elements.
var elements = {};

/**
 * Initializes a Muon Element.
 * @param {string} tagName The tag name of the element which is being initialized.
 * @param {Object} properties Properties of the element being initialized.
 * @return {void}
 */
var Muon = function Muon(tagName, properties) {

  // If this element has previously been registered and is not already initialized.
  if (partiallyRegisteredElements[tagName] && !elements[tagName]) {
    log('Registering element \'' + tagName + '\'.');
    var prototype = Object.create(HTMLDivElement.prototype);

    // Clone key-value mappings of properties into the prototype.
    if (properties) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(properties)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          prototype[key] = properties[key];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    var definitionElement = partiallyRegisteredElements[tagName];
    prototype.muonTemplate = definitionElement.getElementsByTagName('template')[0] || null;
    prototype.isRactive = definitionElement.hasAttribute('ractive');
    prototype.isShadow = definitionElement.hasAttribute('shadow');

    prototype.createdCallback = function () {
      // The precreate callback may tell us to skip creation.
      var skipCreate = false;

      // If this.onPreCreate() returns true, skip the default creation logic.
      if (this.onPreCreate) skipCreate = this.onPreCreate();

      if (!skipCreate) {
        var rootElement = this.isShadow ? this.createShadowRoot() : this;

        if (this.isRactive && _Ractive) {
          // Use defined ractiveOptions object, if it exists.
          var opts = this.ractiveOptions ? Object.create(this.ractiveOptions) : {};

          // Define element to render to.
          opts.el = rootElement;

          // Use the definition's template, falling back to a template provided by ractiveOptions.
          opts.template = this.muonTemplate ? this.muonTemplate.innerHTML : opts.template;

          // Use "magic" mode by default. (No need for special methods to set data, uses ES7 `Object.observe()`. Experimental.
          opts.magic = opts.magic != null ? opts.magic : true;

          // Initialize Ractive object
          this._Ractive = new _Ractive(opts);
        } else {
          rootElement.appendChild(this.muonTemplate.content.cloneNode(true));
        }
      }

      // Add a utility method to set the Ractive object's data property, since we don't set it ourselves.
      /**
       * (Re)sets the data object of this element's _Ractive controller. Does nothing if this element doesn't use Ractive.js
       *
       * @param {Object} data An object with children which are rendered in the Ractive template.
       * @returns {boolean} false if Ractive.js is not found by Muon.
       */
      this.setRactiveData = function (data) {
        if (this.isRactive && _Ractive) {
          this._Ractive.reset(data);
        }
      };

      if (this.onCreated) return this.onCreated();
    };

    prototype.attachedCallback = function () {
      if (this.onAttached) return this.onAttached();
    };

    prototype.detachedCallback = function () {
      if (this.onDetached) return this.onDetached();
    };

    prototype.attributeChangedCallback = function (attrName, oldVal, newVal) {
      if (this.onAttributeChanged) return this.onAttributeChanged(attrName, oldVal, newVal);
    };

    elements[tagName] = document.registerElement(tagName, {
      prototype: prototype
    });

    partiallyRegisteredElements[tagName] = undefined;
  } else if (elements[tagName]) {
    log('The element \'' + tagName + '\' has already been registered! Perhaps you called \'Muon()\' on an element with an \'auto-register\' attribute?', true);
  }
};

// ** MUON METHODS ** //

/**
 * Sets up optional dependencies for Muon. Currently only Ractive.js.
 *
 * @param {function} Ractive The `Ractive()` constructor from Ractive.js.
 * @returns {void}
 */
Muon.init = function (Ractive) {
  _Ractive = Ractive;
};

/**
 * Begins the process of registering a new element from a `muon-element` description.
 *
 * @param {HTMLElement} definitionElement The source description element.
 * @return {void}
 */
Muon.registerMuonElement = function (definitionElement) {
  // The tag name which this new element will have. Taken from the tag-name attribute of the descriptor.
  var tagName = definitionElement.getAttribute('tag-name');
  /* The auto-register attribute tells us to initialize the element now,
   * instead of letting it initialize itself with the `Muon()` method.
   */
  var autoRegister = definitionElement.hasAttribute('auto-register');

  // Ensure we actually have a valid name here.
  if (tagName) {
    // Make sure this element has not been already registered. TODO: Check against *all* HTML elements.
    if (elements[tagName] || partiallyRegisteredElements[tagName]) {
      throw new Error('Unable to register a pre-exisiting custom element definition: \'' + tagName + '\'.');
      // Make sure this element's name is valid (containing a dash).
    } else if (tagName.indexOf('-') === -1) {
        throw new Error('Invalid tag name: \'' + tagName + '\'. Must contain a \'-\' (dash) character.');
      }

    // Add this element to the map of partially registered elements.
    partiallyRegisteredElements[tagName] = definitionElement;

    // If there's no initialization script, initialize the element here.
    if (autoRegister) Muon(tagName, {});
  } else log('Attempted to register a Muon element with no tag name!', true);
};

// ** UTILITY METHODS ** //

/**
 * Quick-n-dirty logging utility.
 *
 * @param {string} message The message to log.
 * @param {boolean} [warn] Set to true to use `console.warn` instead of `console.log`.
 * @return {void}
 */
var log = function log(message, warn) {
  message = typeof message === 'string' ? message : JSON.stringify(message);
  message = '[Muon ' + VERSION + '] ' + message;
  warn ? console.warn(message) : console.log(message);
};
// ** STARTUP TASKS **/

// Register muon-element for use in the DOM.
var mainElementProto = Object.create(HTMLElement.prototype);
mainElementProto.createdCallback = function () {
  Muon.registerMuonElement(this);
};

elements['muon-element'] = document.registerElement('muon-element', {
  prototype: mainElementProto
});
return Muon;
}));
