/**
 * NBBA Broadcast Graphics - DOM Utilities Module
 * 
 * Helper functions for DOM manipulation, element creation, and event handling.
 */

/**
 * Query a single element
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (optional, defaults to document)
 * @returns {Element|null} First matching element or null
 */
function select(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Query multiple elements
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (optional)
 * @returns {NodeList} All matching elements
 */
function selectAll(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

/**
 * Create an element with optional attributes and classes
 * @param {string} tag - HTML tag name
 * @param {Object} options - Configuration object
 * @param {string} options.id - Element ID
 * @param {Array<string>} options.classes - CSS classes
 * @param {Object} options.attributes - HTML attributes
 * @param {string} options.text - Text content
 * @param {string} options.html - HTML content
 * @returns {Element} Created element
 */
function createElement(tag, options = {}) {
  const element = document.createElement(tag);

  if (options.id) {
    element.id = options.id;
  }

  if (options.classes) {
    element.classList.add(...(Array.isArray(options.classes) ? options.classes : [options.classes]));
  }

  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  if (options.text) {
    element.textContent = options.text;
  }

  if (options.html) {
    element.innerHTML = options.html;
  }

  return element;
}

/**
 * Add classes to element
 * @param {Element} element - Target element
 * @param {string|Array<string>} classes - Class name(s)
 */
function addClass(element, classes) {
  if (Array.isArray(classes)) {
    element.classList.add(...classes);
  } else {
    element.classList.add(classes);
  }
}

/**
 * Remove classes from element
 * @param {Element} element - Target element
 * @param {string|Array<string>} classes - Class name(s)
 */
function removeClass(element, classes) {
  if (Array.isArray(classes)) {
    element.classList.remove(...classes);
  } else {
    element.classList.remove(classes);
  }
}

/**
 * Toggle a class
 * @param {Element} element - Target element
 * @param {string} className - Class name
 * @param {boolean} force - Force add/remove (optional)
 * @returns {boolean} True if class is now present
 */
function toggleClass(element, className, force = undefined) {
  return element.classList.toggle(className, force);
}

/**
 * Check if element has class
 * @param {Element} element - Target element
 * @param {string} className - Class name
 * @returns {boolean} True if element has class
 */
function hasClass(element, className) {
  return element.classList.contains(className);
}

/**
 * Set element text content
 * @param {Element} element - Target element
 * @param {string} text - Text to set
 */
function setText(element, text) {
  element.textContent = text;
}

/**
 * Get element text content
 * @param {Element} element - Target element
 * @returns {string} Element text
 */
function getText(element) {
  return element.textContent;
}

/**
 * Set element HTML
 * @param {Element} element - Target element
 * @param {string} html - HTML to set
 */
function setHTML(element, html) {
  element.innerHTML = html;
}

/**
 * Get element HTML
 * @param {Element} element - Target element
 * @returns {string} Element HTML
 */
function getHTML(element) {
  return element.innerHTML;
}

/**
 * Set element style
 * @param {Element} element - Target element
 * @param {Object} styles - Style object (camelCase keys)
 */
function setStyle(element, styles) {
  Object.entries(styles).forEach(([key, value]) => {
    element.style[key] = value;
  });
}

/**
 * Get computed style
 * @param {Element} element - Target element
 * @param {string} property - CSS property name
 * @returns {string} Computed value
 */
function getStyle(element, property) {
  return window.getComputedStyle(element).getPropertyValue(property);
}

/**
 * Show element
 * @param {Element} element - Target element
 */
function show(element) {
  element.style.display = '';
}

/**
 * Hide element
 * @param {Element} element - Target element
 */
function hide(element) {
  element.style.display = 'none';
}

/**
 * Toggle element visibility
 * @param {Element} element - Target element
 */
function toggle(element) {
  element.style.display = element.style.display === 'none' ? '' : 'none';
}

/**
 * Check if element is visible
 * @param {Element} element - Target element
 * @returns {boolean} True if visible
 */
function isVisible(element) {
  return element.style.display !== 'none';
}

/**
 * Add event listener
 * @param {Element} element - Target element
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @returns {Function} Remove listener function
 */
function on(element, event, handler) {
  element.addEventListener(event, handler);
  return () => element.removeEventListener(event, handler);
}

/**
 * Add one-time event listener
 * @param {Element} element - Target element
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @returns {Function} Remove listener function
 */
function once(element, event, handler) {
  const wrappedHandler = (e) => {
    handler(e);
    element.removeEventListener(event, wrappedHandler);
  };
  element.addEventListener(event, wrappedHandler);
  return () => element.removeEventListener(event, wrappedHandler);
}

/**
 * Remove all event listeners of a type
 * @param {Element} element - Target element
 * @param {string} event - Event type
 */
function off(element, event) {
  const newElement = element.cloneNode(true);
  element.parentNode.replaceChild(newElement, element);
}

/**
 * Append child element(s)
 * @param {Element} parent - Parent element
 * @param {Element|Array<Element>} children - Child element(s)
 */
function append(parent, children) {
  if (Array.isArray(children)) {
    children.forEach(child => parent.appendChild(child));
  } else {
    parent.appendChild(children);
  }
}

/**
 * Prepend child element(s)
 * @param {Element} parent - Parent element
 * @param {Element|Array<Element>} children - Child element(s)
 */
function prepend(parent, children) {
  if (Array.isArray(children)) {
    children.forEach(child => parent.insertBefore(child, parent.firstChild));
  } else {
    parent.insertBefore(children, parent.firstChild);
  }
}

/**
 * Empty element (remove all children)
 * @param {Element} element - Target element
 */
function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Remove element from DOM
 * @param {Element} element - Element to remove
 */
function remove(element) {
  element.remove();
}

/**
 * Get element position and dimensions
 * @param {Element} element - Target element
 * @returns {Object} Object with top, left, width, height
 */
function getRect(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    right: rect.right,
    bottom: rect.bottom,
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  select,
  selectAll,
  createElement,
  addClass,
  removeClass,
  toggleClass,
  hasClass,
  setText,
  getText,
  setHTML,
  getHTML,
  setStyle,
  getStyle,
  show,
  hide,
  toggle,
  isVisible,
  on,
  once,
  off,
  append,
  prepend,
  empty,
  remove,
  getRect,
};
