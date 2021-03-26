const utils = (function() {

  var REQUEST_OPTIONS = {
    dataType: 'html',
    headers: { "X-XHR-Turbolinks-Fallback": true }
  };

  var HIGHLIGHT_CLASS = 'highlight';
  var HIGHLIGHT_DURATION = 250; // ms
  var HIDDEN_CLASS = 'hidden';
  var DATE_FORMAT = 'MM/DD/YYYY';

  var visit = Turbolinks.supported ?
    visitWithTurbolinks :
    visitWithXHR;

  var setImmediate = window.setImmediate ? nativeSetImmediate : setImmediateWithTimeout;
  var clearImmediate = window.clearImmediate ? nativeClearImmediate : clearImmediateWithTimeout;
  var _slice = [].slice;

  $(document)
    .on('turbolinks:request-start', pageFetched)
    .on('turbolinks:load', pageReceived);

  function visitWithTurbolinks(path) {
    Turbolinks.visit(path);
  }

  function visitWithXHR(path) {
    trigger('turbolinks:request-start');
    $.ajax(path, REQUEST_OPTIONS).done(visitRequestCompleted);
  }

  function visitRequestCompleted(response) {
    trigger('turbolinks:request-end');
    $('.container-fluid').html(response);
    trigger('turbolinks:load');
  }

  function pageFetched(e) {
    Turbolinks.fetching = true;
  }

  function pageReceived(e) {
    Turbolinks.fetching = false;
  }

  function whenPageReady(callback) {
    $(document).on('turbolinks:load', callback);
  }

  function whenPageReadyIfExists(selector, callback) {
    whenPageReady(function() {
      ifExists(selector, callback);
    });
  }

  function nativeSetImmediate(callback) {
    return window.setImmediate(callback);
  }

  function nativeClearImmediate(id) {
    window.clearImmediate(id);
  }

  function setImmediateWithTimeout(callback) {
    return setTimeout(callback, 0);
  }

  function clearImmediateWithTimeout(id) {
    clearTimeout(id);
  }

  // Global event trigger
  //
  // The event is triggered on document.body so that it can be filtered on
  // the listener side depending on the body's classes or id.
  //
  // If the listener needs to be more precise about which element triggered the event
  // use `$(element).trigger` instead.
  function trigger(eventName /* ... */) {
    var body = $(document.body);
    return body.trigger.apply(body, arguments);
  }

  function ifExists(selector, callback) {
    var $collection = $(selector);
    if ($collection.length) callback($collection);
  }

  function humanize(string) {
    return string
      .replace(/\W/g, ' ')
      .replace(/_/g, ' ')
      .replace(/(\w+)/g, function(match) {
        return match.charAt(0).toUpperCase() + match.slice(1);
      });
  }

  function parameterize(string) {
    return string
      .trim()
      .toLowerCase()
      .replace(/\W/g, "")
      .replace(/\s/g, "-");
  };

  function underscore(string) {
    return string
      .replace(/([A-Z\d]+)([A-Z][a-z])/g, '$1_$2')
      .replace(/([a-z\d])([A-Z])/g, '$1_$2')
      .replace(/-/g, '_')
      .toLowerCase();
  }

  function titleize(string) {
    return humanize(underscore(string));
  }

  function getValueForKey(object, key) {
    var properties = key.split('.'),
        property;
    while (property = properties.shift()) {
      try {
        object = object[property];
      } catch(e) {
        return null;
      }
    }
    return object;
  }

  // Return a shallow clone of the array
  function cloneArray(array) {
    return array.slice(0);
  }

  // Helper method to convert objects into arrays
  // - If `object` is an array, it returns it
  // - If `object` is `null` or `undefined`, it returns an empty array
  // - If `object` is an Arguments object (`arguments` inside a function) if converts it into an array
  // Otherwise it returns `[ object ]`
  function toArray(object) {
    // `null` or `undefined`
    if (object == null) return [];
    try {
      // Most common way of detecting `arguments` objects
      if ('callee' in object) return _slice.call(object);
    // but `in` can throw if `object` is a primitive type
    } catch(e) { }
    return $.isArray(object) ? object : [ object ];
  }

  // `Array#find` doesn't seem to be available on (our current version of) PhantomJS.
  // This method provides the same functionality.
  function findInArray(array, predicate) {
    for (var i = 0, l = array.length; i < l; i++) {
      if (predicate(array[i])) return array[i];
    }
  }

  // Transposes the rows and columns
  function transposeArray(a) {
    return a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
  }

  function strip2dArray(table) {
    return table.filter(function(row) {
      return !row.every(function(val) { return !val; });
    });
  }

  // Removes the given element from the given array in place.
  // Returns:
  // - `true` if the element was removed
  // - `false` otherwise
  function removeArrayElement(array, element) {
    var index = array.indexOf(element);
    var containsElement = index > -1;
    if (containsElement) array.splice(index, 1);
    return containsElement;
  }

  function basename(filename) {
    return filename.replace(/\.[^\.]+$/, '');
  }

  function show(element) {
    $(element).removeClass(HIDDEN_CLASS);
  }

  function hide(element) {
    $(element).addClass(HIDDEN_CLASS);
  }

  function highlight(element) {
    $(element).addClass(HIGHLIGHT_CLASS);
    setTimeout(function() {
      $(element).removeClass(HIGHLIGHT_CLASS);
    }, HIGHLIGHT_DURATION);
  }

  function toggleProp(element, property) {
    $(element).prop(property, !$(element).prop(property));
  }

  // Returns a function, that, as long as it continues to be invoked, will not be triggered.
  // The function will be called after it stops being called for `wait` milliseconds.
  // If immediate is passed, trigger the function on the leading edge, instead of the trailing.
  // Ported from Underscore.js 1.7.0
  // http://underscorejs.org
  function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = new Date - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function debouncedFunction() {
      context = this;
      args = arguments;
      timestamp = +new Date;
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // With argument 'truc.machin.bidule' will create empty objects window.truc.machin.bidule
  function createNamespace(namespace) {
    var parts = namespace.split('.');
    var parentNamespace = window;
    for (var deep = 0; deep < parts.length; deep++) {
      var currentPart = parts[deep];
      if (!(currentPart in parentNamespace)) {
        parentNamespace[currentPart] = {};
      }
      parentNamespace = parentNamespace[currentPart];
    }
    return parentNamespace;
  }

  function getEmailDomain(email) {
    return email.split('@')[1];
  }

  function getDateFormat(){
    return DATE_FORMAT;
  }

  return {
    getEmailDomain: getEmailDomain,
    getDateFormat: getDateFormat,
    visit: visit,
    whenPageReady: whenPageReady,
    whenPageReadyIfExists: whenPageReadyIfExists,
    trigger: trigger,
    ifExists: ifExists,
    humanize: humanize,
    underscore: underscore,
    parameterize: parameterize,
    titleize: titleize,
    basename: basename,
    cloneArray: cloneArray,
    toArray: toArray,
    transposeArray: transposeArray,
    strip2dArray: strip2dArray,
    findInArray: findInArray,
    removeArrayElement: removeArrayElement,
    getValueForKey: getValueForKey,
    show: show,
    hide: hide,
    toggleProp: toggleProp,
    setImmediate: setImmediate,
    clearImmediate: clearImmediate,
    debounce: debounce,
    createNamespace: createNamespace,
    highlight: highlight
  };

})();

export default utils;
