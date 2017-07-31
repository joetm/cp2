/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 537);
/******/ })
/************************************************************************/
/******/ ({

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(538);


/***/ }),

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.deepstream = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || Object.create(null);
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || Object.create(null);

  // all
  if (0 == arguments.length) {
    this._callbacks = Object.create(null);
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks[event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || Object.create(null);

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks[event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || Object.create(null);
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

/**
 * Returns an array listing the events for which the emitter has registered listeners.
 *
 * @return {Array}
 * @api public
 */
Emitter.prototype.eventNames = function(){
  return this._callbacks ? Object.keys(this._callbacks) : [];
}

},{}],2:[function(_dereq_,module,exports){

},{}],3:[function(_dereq_,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(_dereq_,module,exports){
(function (global){
/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(_dereq_,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],6:[function(_dereq_,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],7:[function(_dereq_,module,exports){
'use strict';

exports.decode = exports.parse = _dereq_('./decode');
exports.encode = exports.stringify = _dereq_('./encode');

},{"./decode":5,"./encode":6}],8:[function(_dereq_,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var punycode = _dereq_('punycode');
var util = _dereq_('./util');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = _dereq_('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

},{"./util":9,"punycode":4,"querystring":7}],9:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};

},{}],10:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('./constants/constants');
var MS = _dereq_('./constants/merge-strategies');
var Emitter = _dereq_('component-emitter2');
var Connection = _dereq_('./message/connection');
var EventHandler = _dereq_('./event/event-handler');
var RpcHandler = _dereq_('./rpc/rpc-handler');
var RecordHandler = _dereq_('./record/record-handler');
var PresenceHandler = _dereq_('./presence/presence-handler');
var defaultOptions = _dereq_('./default-options');
var AckTimeoutRegistry = _dereq_('./utils/ack-timeout-registry');

/**
 * deepstream.io javascript client
 *
 * @copyright 2016 deepstreamHub GmbH
 * @author deepstreamHub GmbH
 *
 *
 * @{@link http://deepstream.io}
 *
 *
 * @param {String} url     URL to connect to. The protocol can be ommited, e.g. <host>:<port>.
 * @param {Object} options A map of options that extend the ones specified in default-options.js
 *
 * @public
 * @constructor
 */
var Client = function Client(url, options) {
  this._url = url;
  this._options = this._getOptions(options || {});

  this._connection = new Connection(this, this._url, this._options);
  this._ackTimeoutRegistry = new AckTimeoutRegistry(this, this._options);

  this.event = new EventHandler(this._options, this._connection, this);
  this.rpc = new RpcHandler(this._options, this._connection, this);
  this.record = new RecordHandler(this._options, this._connection, this);
  this.presence = new PresenceHandler(this._options, this._connection, this);

  this._messageCallbacks = {};
  this._messageCallbacks[C.TOPIC.EVENT] = this.event._$handle.bind(this.event);
  this._messageCallbacks[C.TOPIC.RPC] = this.rpc._$handle.bind(this.rpc);
  this._messageCallbacks[C.TOPIC.RECORD] = this.record._$handle.bind(this.record);
  this._messageCallbacks[C.TOPIC.PRESENCE] = this.presence._$handle.bind(this.presence);
  this._messageCallbacks[C.TOPIC.ERROR] = this._onErrorMessage.bind(this);
};

Emitter(Client.prototype); // eslint-disable-line

/**
 * Send authentication parameters to the client to fully open
 * the connection.
 *
 * Please note: Authentication parameters are send over an already established
 * connection, rather than appended to the server URL. This means the parameters
 * will be encrypted when used with a WSS / HTTPS connection. If the deepstream server
 * on the other side has message logging enabled it will however be written to the logs in
 * plain text. If additional security is a requirement it might therefor make sense to hash
 * the password on the client.
 *
 * If the connection is not yet established the authentication parameter will be
 * stored and send once it becomes available
 *
 * authParams can be any JSON serializable data structure and its up for the
 * permission handler on the server to make sense of them, although something
 * like { username: 'someName', password: 'somePass' } will probably make the most sense.
 *
 * login can be called multiple times until either the connection is authenticated or
 * forcefully closed by the server since its maxAuthAttempts threshold has been exceeded
 *
 * @param   {Object}   authParams JSON.serializable authentication data
 * @param   {Function} callback   Will be called with either (true) or (false, data)
 *
 * @public
 * @returns {Client}
 */
Client.prototype.login = function (authParamsOrCallback, callback) {
  if (typeof authParamsOrCallback === 'function') {
    this._connection.authenticate({}, authParamsOrCallback);
  } else {
    this._connection.authenticate(authParamsOrCallback || {}, callback);
  }
  return this;
};

/**
 * Closes the connection to the server.
 *
 * @public
 * @returns {void}
 */
Client.prototype.close = function () {
  this._connection.close();
};

/**
 * Returns the current state of the connection.
 *
 * connectionState is one of CONSTANTS.CONNECTION_STATE
 *
 * @returns {[type]} [description]
 */
Client.prototype.getConnectionState = function () {
  return this._connection.getState();
};

/**
 * Returns a random string. The first block of characters
 * is a timestamp, in order to allow databases to optimize for semi-
 * sequentuel numberings
 *
 * @public
 * @returns {String} unique id
 */
Client.prototype.getUid = function () {
  var timestamp = new Date().getTime().toString(36);
  var randomString = (Math.random() * 10000000000000000).toString(36).replace('.', '');

  return timestamp + '-' + randomString;
};

/**
 * Package private ack timeout registry. This is how all classes can get access to
 * register timeouts.
 * (Well... that's the intention anyways)
 *
 * @package private
 * @returns {AckTimeoutRegistry}
 */
Client.prototype._$getAckTimeoutRegistry = function () {
  return this._ackTimeoutRegistry;
};

/**
 * Package private callback for parsed incoming messages. Will be invoked
 * by the connection class
 *
 * @param   {Object} message parsed deepstream message
 *
 * @package private
 * @returns {void}
 */
Client.prototype._$onMessage = function (message) {
  if (this._messageCallbacks[message.topic]) {
    this._messageCallbacks[message.topic](message);
  } else {
    message.processedError = true;
    this._$onError(message.topic, C.EVENT.MESSAGE_PARSE_ERROR, 'Received message for unknown topic ' + message.topic);
  }

  if (message.action === C.ACTIONS.ERROR && !message.processedError) {
    this._$onError(message.topic, message.data[0], message.data.slice(0));
  }
};

/**
 * Package private error callback. This is the single point at which
 * errors are thrown in the client. (Well... that's the intention anyways)
 *
 * The expectations would be for implementations to subscribe
 * to the client's error event to prevent errors from being thrown
 * and then decide based on the event and topic parameters how
 * to handle the errors
 *
 * IMPORTANT: Errors that are specific to a request, e.g. a RPC
 * timing out or a record not being permissioned are passed directly
 * to the method that requested them
 *
 * @param   {String} topic One of CONSTANTS.TOPIC
 * @param   {String} event One of CONSTANTS.EVENT
 * @param   {String} msg   Error dependent message
 *
 * @package private
 * @returns {void}
 */
Client.prototype._$onError = function (topic, event, msg) {
  var errorMsg = void 0;

  /*
   * Help to diagnose the problem quicker by checking for
   * some common problems
   */
  if (event === C.EVENT.ACK_TIMEOUT || event === C.EVENT.RESPONSE_TIMEOUT) {
    if (this.getConnectionState() === C.CONNECTION_STATE.AWAITING_AUTHENTICATION) {
      errorMsg = 'Your message timed out because you\'re not authenticated. Have you called login()?';
      setTimeout(this._$onError.bind(this, C.EVENT.NOT_AUTHENTICATED, C.TOPIC.ERROR, errorMsg), 1);
    }
  }

  if (this.hasListeners('error')) {
    this.emit('error', msg, event, topic);
    this.emit(event, topic, msg);
  } else {
    console.log('--- You can catch all deepstream errors by subscribing to the error event ---');

    errorMsg = event + ': ' + msg;

    if (topic) {
      errorMsg += ' (' + topic + ')';
    }

    throw new Error(errorMsg);
  }
};

/**
 * Passes generic messages from the error topic
 * to the _$onError handler
 *
 * @param {Object} errorMessage parsed deepstream error message
 *
 * @private
 * @returns {void}
 */
Client.prototype._onErrorMessage = function (errorMessage) {
  this._$onError(errorMessage.topic, errorMessage.data[0], errorMessage.data[1]);
};

/**
 * Creates a new options map by extending default
 * options with the passed in options
 *
 * @param   {Object} options The user specified client configuration options
 *
 * @private
 * @returns {Object}  merged options
 */
Client.prototype._getOptions = function (options) {
  var mergedOptions = {};

  for (var key in defaultOptions) {
    if (typeof options[key] === 'undefined') {
      mergedOptions[key] = defaultOptions[key];
    } else {
      mergedOptions[key] = options[key];
    }
  }

  return mergedOptions;
};

/**
 * Exports factory function to adjust to the current JS style of
 * disliking 'new' :-)
 *
 * @param {String} url     URL to connect to. The protocol can be ommited, e.g. <host>:<port>.
 * @param {Object} options A map of options that extend the ones specified in default-options.js
 *
 * @public
 * @returns {void}
 */
function createDeepstream(url, options) {
  return new Client(url, options);
}

/**
 * Expose constants to allow consumers to access them
*/
Client.prototype.CONSTANTS = C;
createDeepstream.CONSTANTS = C;

/**
 * Expose merge strategies to allow consumers to access them
*/
Client.prototype.MERGE_STRATEGIES = MS;
createDeepstream.MERGE_STRATEGIES = MS;

module.exports = createDeepstream;

},{"./constants/constants":11,"./constants/merge-strategies":12,"./default-options":13,"./event/event-handler":14,"./message/connection":15,"./presence/presence-handler":18,"./record/record-handler":22,"./rpc/rpc-handler":24,"./utils/ack-timeout-registry":27,"component-emitter2":1}],11:[function(_dereq_,module,exports){
'use strict';

exports.CONNECTION_STATE = {};

exports.CONNECTION_STATE.CLOSED = 'CLOSED';
exports.CONNECTION_STATE.AWAITING_CONNECTION = 'AWAITING_CONNECTION';
exports.CONNECTION_STATE.CHALLENGING = 'CHALLENGING';
exports.CONNECTION_STATE.AWAITING_AUTHENTICATION = 'AWAITING_AUTHENTICATION';
exports.CONNECTION_STATE.AUTHENTICATING = 'AUTHENTICATING';
exports.CONNECTION_STATE.OPEN = 'OPEN';
exports.CONNECTION_STATE.ERROR = 'ERROR';
exports.CONNECTION_STATE.RECONNECTING = 'RECONNECTING';

exports.MESSAGE_SEPERATOR = String.fromCharCode(30); // ASCII Record Seperator 1E
exports.MESSAGE_PART_SEPERATOR = String.fromCharCode(31); // ASCII Unit Separator 1F

exports.TYPES = {};
exports.TYPES.STRING = 'S';
exports.TYPES.OBJECT = 'O';
exports.TYPES.NUMBER = 'N';
exports.TYPES.NULL = 'L';
exports.TYPES.TRUE = 'T';
exports.TYPES.FALSE = 'F';
exports.TYPES.UNDEFINED = 'U';

exports.TOPIC = {};
exports.TOPIC.CONNECTION = 'C';
exports.TOPIC.AUTH = 'A';
exports.TOPIC.ERROR = 'X';
exports.TOPIC.EVENT = 'E';
exports.TOPIC.RECORD = 'R';
exports.TOPIC.RPC = 'P';
exports.TOPIC.PRESENCE = 'U';
exports.TOPIC.PRIVATE = 'PRIVATE/';

exports.EVENT = {};
exports.EVENT.CONNECTION_ERROR = 'connectionError';
exports.EVENT.CONNECTION_STATE_CHANGED = 'connectionStateChanged';
exports.EVENT.MAX_RECONNECTION_ATTEMPTS_REACHED = 'MAX_RECONNECTION_ATTEMPTS_REACHED';
exports.EVENT.CONNECTION_AUTHENTICATION_TIMEOUT = 'CONNECTION_AUTHENTICATION_TIMEOUT';
exports.EVENT.ACK_TIMEOUT = 'ACK_TIMEOUT';
exports.EVENT.NO_RPC_PROVIDER = 'NO_RPC_PROVIDER';
exports.EVENT.RESPONSE_TIMEOUT = 'RESPONSE_TIMEOUT';
exports.EVENT.DELETE_TIMEOUT = 'DELETE_TIMEOUT';
exports.EVENT.UNSOLICITED_MESSAGE = 'UNSOLICITED_MESSAGE';
exports.EVENT.MESSAGE_DENIED = 'MESSAGE_DENIED';
exports.EVENT.MESSAGE_PARSE_ERROR = 'MESSAGE_PARSE_ERROR';
exports.EVENT.VERSION_EXISTS = 'VERSION_EXISTS';
exports.EVENT.NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';
exports.EVENT.MESSAGE_PERMISSION_ERROR = 'MESSAGE_PERMISSION_ERROR';
exports.EVENT.LISTENER_EXISTS = 'LISTENER_EXISTS';
exports.EVENT.NOT_LISTENING = 'NOT_LISTENING';
exports.EVENT.TOO_MANY_AUTH_ATTEMPTS = 'TOO_MANY_AUTH_ATTEMPTS';
exports.EVENT.INVALID_AUTH_MSG = 'INVALID_AUTH_MSG';
exports.EVENT.IS_CLOSED = 'IS_CLOSED';
exports.EVENT.RECORD_NOT_FOUND = 'RECORD_NOT_FOUND';
exports.EVENT.NOT_SUBSCRIBED = 'NOT_SUBSCRIBED';

exports.ACTIONS = {};
exports.ACTIONS.PING = 'PI';
exports.ACTIONS.PONG = 'PO';
exports.ACTIONS.ACK = 'A';
exports.ACTIONS.REDIRECT = 'RED';
exports.ACTIONS.CHALLENGE = 'CH';
exports.ACTIONS.CHALLENGE_RESPONSE = 'CHR';
exports.ACTIONS.READ = 'R';
exports.ACTIONS.CREATE = 'C';
exports.ACTIONS.UPDATE = 'U';
exports.ACTIONS.PATCH = 'P';
exports.ACTIONS.DELETE = 'D';
exports.ACTIONS.SUBSCRIBE = 'S';
exports.ACTIONS.UNSUBSCRIBE = 'US';
exports.ACTIONS.HAS = 'H';
exports.ACTIONS.SNAPSHOT = 'SN';
exports.ACTIONS.INVOKE = 'I';
exports.ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND = 'SP';
exports.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED = 'SR';
exports.ACTIONS.SUBSCRIPTION_HAS_PROVIDER = 'SH';
exports.ACTIONS.LISTEN = 'L';
exports.ACTIONS.UNLISTEN = 'UL';
exports.ACTIONS.LISTEN_ACCEPT = 'LA';
exports.ACTIONS.LISTEN_REJECT = 'LR';
exports.ACTIONS.PROVIDER_UPDATE = 'PU';
exports.ACTIONS.QUERY = 'Q';
exports.ACTIONS.CREATEORREAD = 'CR';
exports.ACTIONS.CREATEANDUPDATE = 'CU';
exports.ACTIONS.EVENT = 'EVT';
exports.ACTIONS.ERROR = 'E';
exports.ACTIONS.REQUEST = 'REQ';
exports.ACTIONS.RESPONSE = 'RES';
exports.ACTIONS.REJECTION = 'REJ';
exports.ACTIONS.PRESENCE_JOIN = 'PNJ';
exports.ACTIONS.PRESENCE_LEAVE = 'PNL';
exports.ACTIONS.QUERY = 'Q';
exports.ACTIONS.WRITE_ACKNOWLEDGEMENT = 'WA';

exports.CALL_STATE = {};
exports.CALL_STATE.INITIAL = 'INITIAL';
exports.CALL_STATE.CONNECTING = 'CONNECTING';
exports.CALL_STATE.ESTABLISHED = 'ESTABLISHED';
exports.CALL_STATE.ACCEPTED = 'ACCEPTED';
exports.CALL_STATE.DECLINED = 'DECLINED';
exports.CALL_STATE.ENDED = 'ENDED';
exports.CALL_STATE.ERROR = 'ERROR';

},{}],12:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  /**
  *  Choose the server's state over the client's
  **/
  REMOTE_WINS: function REMOTE_WINS(record, remoteValue, remoteVersion, callback) {
    callback(null, remoteValue);
  },

  /**
  *  Choose the local state over the server's
  **/
  LOCAL_WINS: function LOCAL_WINS(record, remoteValue, remoteVersion, callback) {
    callback(null, record.get());
  }
};

},{}],13:[function(_dereq_,module,exports){
'use strict';

var MERGE_STRATEGIES = _dereq_('./constants/merge-strategies');

module.exports = {
  /**
   * @param {Number} heartBeatInterval           How often you expect the heartbeat to be sent.
   *                                             If two heatbeats are missed in a row the client
   *                                             will consider the server to have disconnected
   *                                             and will close the connection in order to
   *                                             establish a new one.
   */
  heartbeatInterval: 30000,

  /**
   * @param {Number} reconnectIntervalIncrement  Specifies the number of milliseconds by
   *                                             which the time until the next reconnection
   *                                             attempt will be incremented after every
   *                                             unsuccesful attempt.
   *                                             E.g. for 1500: if the connection is lost,
   *                                             the client will attempt to reconnect immediatly,
   *                                             if that fails it will try again after 1.5 seconds,
   *                                             if that fails it will try again after 3 seconds
   *                                             and so on
   */
  reconnectIntervalIncrement: 4000,

  /**
   * @param {Number} maxReconnectInterval        Specifies the maximum number of milliseconds for
   *                                             the reconnectIntervalIncrement
   *                                             The amount of reconnections will reach this value
   *                                             then reconnectIntervalIncrement will be ignored.
   */
  maxReconnectInterval: 180000,

  /**
   * @param {Number} maxReconnectAttempts        The number of reconnection attempts until the
   *                                             client gives up and declares the connection closed
   */
  maxReconnectAttempts: 5,

  /**
   * @param {Number} rpcAckTimeout               The number of milliseconds after which a rpc will
   *                                             create an error if no Ack-message has been received
   */
  rpcAckTimeout: 6000,

  /**
   * @param {Number} rpcResponseTimeout          The number of milliseconds after which a rpc will
   *                                             create an error if no response-message has been
   *                                             received
   */
  rpcResponseTimeout: 10000,

  /**
   * @param {Number} subscriptionTimeout         The number of milliseconds that can pass after
   *                                             providing/unproviding a RPC or subscribing/
   *                                             unsubscribing/listening to a record before an
   *                                             error is thrown
   */
  subscriptionTimeout: 2000,

  /**
   * @param {Number} maxMessagesPerPacket        If the implementation tries to send a large
   *                                             number of messages at the same time, the deepstream
   *                                             client will try to split them into smaller packets
   *                                             and send these every
   *                                             <timeBetweenSendingQueuedPackages> ms.
   *
   *                                             This parameter specifies the number of messages
   *                                             after which deepstream sends the packet and
   *                                             queues the remaining messages.
   *                                             Set to Infinity to turn the feature off.
   *
   */
  maxMessagesPerPacket: 100,

  /**
   * @param {Number} timeBetweenSendingQueuedPackages
   *                                             Please see description for
   *                                             maxMessagesPerPacket. Sets the time in ms.
   */
  timeBetweenSendingQueuedPackages: 16,

  /**
   * @param {Number} recordReadAckTimeout       The number of milliseconds from the moment
   *                                            client.record.getRecord() is called until an error
   *                                            is thrown since no ack message has been received.
   */
  recordReadAckTimeout: 15000,

  /**
   * @param {Number} recordReadTimeout           The number of milliseconds from the moment
   *                                             client.record.getRecord() is called until an error
   *                                             is thrown since no data has been received.
   */
  recordReadTimeout: 15000,

  /**
   * @param {Number} recordDeleteTimeout         The number of milliseconds from the moment
   *                                             record.delete() is called until an error is
   *                                             thrown since no delete ack message had been
   *                                             received.
   *                                             Please take into account that the deletion is only
   *                                             complete after the record has been deleted from
   *                                             both cache and storage
   */
  recordDeleteTimeout: 15000,

  /**
   * @param {String} path path to connect to
   */
  path: '/deepstream',

  /**
   *  @param {Function} mergeStrategy            This provides the default strategy used to
   *                                             deal with merge conflicts.
   *                                             If the merge strategy is not succesfull it will
   *                                             set an error, else set the returned data as the
   *                                             latest revision. This can be overriden on a per
   *                                             record basis by setting the `setMergeStrategy`.
   */
  mergeStrategy: MERGE_STRATEGIES.REMOTE_WINS,

  /**
   * @param {Boolean} recordDeepCopy             Setting to false disabled deepcopying of record
   *                                             data when provided via `get()` in a `subscribe`
   *                                             callback. This improves speed at the expense of
   *                                             the user having to ensure object immutability.
   */
  recordDeepCopy: true,

  /**
   * https://github.com/websockets/ws/blob/master/doc/ws.md#new-websocketaddress-protocols-options
   *
   * @param {Object} nodeSocketOptions           Options to pass to the websocket constructor in
   *                                             node.
   * @default null
   */
  nodeSocketOptions: null
};

},{"./constants/merge-strategies":12}],14:[function(_dereq_,module,exports){
'use strict';

var messageBuilder = _dereq_('../message/message-builder');
var messageParser = _dereq_('../message/message-parser');
var ResubscribeNotifier = _dereq_('../utils/resubscribe-notifier');
var C = _dereq_('../constants/constants');
var Listener = _dereq_('../utils/listener');
var EventEmitter = _dereq_('component-emitter2');

/**
 * This class handles incoming and outgoing messages in relation
 * to deepstream events. It basically acts like an event-hub that's
 * replicated across all connected clients.
 *
 * @param {Object} options    deepstream options
 * @param {Connection} connection
 * @param {Client} client
 * @public
 * @constructor
 */
var EventHandler = function EventHandler(options, connection, client) {
  this._options = options;
  this._connection = connection;
  this._client = client;
  this._emitter = new EventEmitter();
  this._listener = {};
  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._resubscribeNotifier = new ResubscribeNotifier(this._client, this._resubscribe.bind(this));
};

/**
 * Subscribe to an event. This will receive both locally emitted events
 * as well as events emitted by other connected clients.
 *
 * @param   {String}   name
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.subscribe = function (name, callback) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }
  if (typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  if (!this._emitter.hasListeners(name)) {
    this._ackTimeoutRegistry.add({
      topic: C.TOPIC.EVENT,
      action: C.ACTIONS.SUBSCRIBE,
      name: name
    });
    this._connection.sendMsg(C.TOPIC.EVENT, C.ACTIONS.SUBSCRIBE, [name]);
  }

  this._emitter.on(name, callback);
};

/**
 * Removes a callback for a specified event. If all callbacks
 * for an event have been removed, the server will be notified
 * that the client is unsubscribed as a listener
 *
 * @param   {String}   name
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.unsubscribe = function (name, callback) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }
  if (callback !== undefined && typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }
  this._emitter.off(name, callback);

  if (!this._emitter.hasListeners(name)) {
    this._ackTimeoutRegistry.add({
      topic: C.TOPIC.EVENT,
      action: C.ACTIONS.UNSUBSCRIBE,
      name: name
    });
    this._connection.sendMsg(C.TOPIC.EVENT, C.ACTIONS.UNSUBSCRIBE, [name]);
  }
};

/**
 * Emits an event locally and sends a message to the server to
 * broadcast the event to the other connected clients
 *
 * @param   {String} name
 * @param   {Mixed} data will be serialized and deserialized to its original type.
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.emit = function (name, data) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }

  this._connection.sendMsg(C.TOPIC.EVENT, C.ACTIONS.EVENT, [name, messageBuilder.typed(data)]);
  this._emitter.emit(name, data);
};

/**
 * Allows to listen for event subscriptions made by this or other clients. This
 * is useful to create "active" data providers, e.g. providers that only provide
 * data for a particular event if a user is actually interested in it
 *
 * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.listen = function (pattern, callback) {
  if (typeof pattern !== 'string' || pattern.length === 0) {
    throw new Error('invalid argument pattern');
  }
  if (typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  if (this._listener[pattern] && !this._listener[pattern].destroyPending) {
    this._client._$onError(C.TOPIC.EVENT, C.EVENT.LISTENER_EXISTS, pattern);
    return;
  } else if (this._listener[pattern]) {
    this._listener[pattern].destroy();
  }

  this._listener[pattern] = new Listener(C.TOPIC.EVENT, pattern, callback, this._options, this._client, this._connection);
};

/**
 * Removes a listener that was previously registered with listenForSubscriptions
 *
 * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.unlisten = function (pattern) {
  if (typeof pattern !== 'string' || pattern.length === 0) {
    throw new Error('invalid argument pattern');
  }

  var listener = this._listener[pattern];

  if (listener && !listener.destroyPending) {
    listener.sendDestroy();
  } else if (this._listener[pattern]) {
    this._ackTimeoutRegistry.add({
      topic: C.TOPIC.EVENT,
      action: C.EVENT.UNLISTEN,
      name: pattern
    });
    this._listener[pattern].destroy();
    delete this._listener[pattern];
  } else {
    this._client._$onError(C.TOPIC.RECORD, C.EVENT.NOT_LISTENING, pattern);
  }
};

/**
 * Handles incoming messages from the server
 *
 * @param   {Object} message parsed deepstream message
 *
 * @package private
 * @returns {void}
 */
EventHandler.prototype._$handle = function (message) {
  var name = message.data[message.action === C.ACTIONS.ACK ? 1 : 0];

  if (message.action === C.ACTIONS.EVENT) {
    if (message.data && message.data.length === 2) {
      this._emitter.emit(name, messageParser.convertTyped(message.data[1], this._client));
    } else {
      this._emitter.emit(name);
    }
    return;
  }

  if (message.action === C.ACTIONS.ACK && message.data[0] === C.ACTIONS.UNLISTEN && this._listener[name] && this._listener[name].destroyPending) {
    this._listener[name].destroy();
    delete this._listener[name];
    return;
  } else if (this._listener[name]) {
    this._listener[name]._$onMessage(message);
    return;
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED) {
    // An unlisten ACK was received before an PATTERN_REMOVED which is a valid case
    return;
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_HAS_PROVIDER) {
    // record can receive a HAS_PROVIDER after discarding the record
    return;
  }

  if (message.action === C.ACTIONS.ACK) {
    this._ackTimeoutRegistry.clear(message);
    return;
  }

  if (message.action === C.ACTIONS.ERROR) {
    if (message.data[0] === C.EVENT.MESSAGE_DENIED) {
      this._ackTimeoutRegistry.remove({
        topic: C.TOPIC.EVENT,
        name: message.data[1],
        action: message.data[2]
      });
    } else if (message.data[0] === C.EVENT.NOT_SUBSCRIBED) {
      this._ackTimeoutRegistry.remove({
        topic: C.TOPIC.EVENT,
        name: message.data[1],
        action: C.ACTIONS.UNSUBSCRIBE
      });
    }
    message.processedError = true;
    this._client._$onError(C.TOPIC.EVENT, message.data[0], message.data[1]);
    return;
  }

  this._client._$onError(C.TOPIC.EVENT, C.EVENT.UNSOLICITED_MESSAGE, name);
};

/**
 * Resubscribes to events when connection is lost
 *
 * @package private
 * @returns {void}
 */
EventHandler.prototype._resubscribe = function () {
  var callbacks = this._emitter._callbacks;
  for (var eventName in callbacks) {
    this._connection.sendMsg(C.TOPIC.EVENT, C.ACTIONS.SUBSCRIBE, [eventName]);
  }
};

module.exports = EventHandler;

},{"../constants/constants":11,"../message/message-builder":16,"../message/message-parser":17,"../utils/listener":28,"../utils/resubscribe-notifier":29,"component-emitter2":1}],15:[function(_dereq_,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
var NodeWebSocket = _dereq_('ws');
var messageParser = _dereq_('./message-parser');
var messageBuilder = _dereq_('./message-builder');
var utils = _dereq_('../utils/utils');
var C = _dereq_('../constants/constants');

/**
 * Establishes a connection to a deepstream server using websockets
 *
 * @param {Client} client
 * @param {String} url     Short url, e.g. <host>:<port>. Deepstream works out the protocol
 * @param {Object} options connection options
 *
 * @constructor
 */
var Connection = function Connection(client, url, options) {
  this._client = client;
  this._options = options;
  this._authParams = null;
  this._authCallback = null;
  this._deliberateClose = false;
  this._redirecting = false;
  this._tooManyAuthAttempts = false;
  this._connectionAuthenticationTimeout = false;
  this._challengeDenied = false;
  this._queuedMessages = [];
  this._reconnectTimeout = null;
  this._reconnectionAttempt = 0;
  this._currentPacketMessageCount = 0;
  this._sendNextPacketTimeout = null;
  this._currentMessageResetTimeout = null;
  this._endpoint = null;
  this._lastHeartBeat = null;
  this._heartbeatInterval = null;

  this._originalUrl = utils.parseUrl(url, this._options.path);
  this._url = this._originalUrl;

  this._state = C.CONNECTION_STATE.CLOSED;
  this._createEndpoint();
};

/**
 * Returns the current connection state.
 * (One of constants.CONNECTION_STATE)
 *
 * @public
 * @returns {String} connectionState
 */
Connection.prototype.getState = function () {
  return this._state;
};

/**
 * Sends the specified authentication parameters
 * to the server. Can be called up to <maxAuthAttempts>
 * times for the same connection.
 *
 * @param   {Object}   authParams A map of user defined auth parameters.
 *                                E.g. { username:<String>, password:<String> }
 * @param   {Function} callback   A callback that will be invoked with the authenticationr result
 *
 * @public
 * @returns {void}
 */
Connection.prototype.authenticate = function (authParams, callback) {
  if ((typeof authParams === 'undefined' ? 'undefined' : _typeof(authParams)) !== 'object') {
    this._client._$onError(C.TOPIC.ERROR, C.EVENT.INVALID_AUTH_MSG, 'authParams is not an object');
    return;
  }

  this._authParams = authParams;
  this._authCallback = callback;

  if (this._tooManyAuthAttempts || this._challengeDenied || this._connectionAuthenticationTimeout) {
    this._client._$onError(C.TOPIC.ERROR, C.EVENT.IS_CLOSED, 'this client\'s connection was closed');
    return;
  } else if (this._deliberateClose === true && this._state === C.CONNECTION_STATE.CLOSED) {
    this._createEndpoint();
    this._deliberateClose = false;
    return;
  }

  if (this._state === C.CONNECTION_STATE.AWAITING_AUTHENTICATION) {
    this._sendAuthParams();
  }
};

/**
 * High level send message method. Creates a deepstream message
 * string and invokes the actual send method.
 *
 * @param   {String} topic  One of C.TOPIC
 * @param   {String} action One of C.ACTIONS
 * @param   {[Mixed]} data   Date that will be added to the message. Primitive values will
 *                          be appended directly, objects and arrays will be serialized as JSON
 *
 * @private
 * @returns {void}
 */
Connection.prototype.sendMsg = function (topic, action, data) {
  this.send(messageBuilder.getMsg(topic, action, data));
};

/**
 * Main method for sending messages. Doesn't send messages instantly,
 * but instead achieves conflation by adding them to the message
 * buffer that will be drained on the next tick
 *
 * @param   {String} message deepstream message
 *
 * @public
 * @returns {void}
 */
Connection.prototype.send = function (message) {
  this._queuedMessages.push(message);
  this._currentPacketMessageCount++;

  if (this._currentMessageResetTimeout === null) {
    this._currentMessageResetTimeout = utils.nextTick(this._resetCurrentMessageCount.bind(this));
  }

  if (this._state === C.CONNECTION_STATE.OPEN && this._queuedMessages.length < this._options.maxMessagesPerPacket && this._currentPacketMessageCount < this._options.maxMessagesPerPacket) {
    this._sendQueuedMessages();
  } else if (this._sendNextPacketTimeout === null) {
    this._queueNextPacket();
  }
};

/**
 * Closes the connection. Using this method
 * sets a _deliberateClose flag that will prevent the client from
 * reconnecting.
 *
 * @public
 * @returns {void}
 */
Connection.prototype.close = function () {
  clearInterval(this._heartbeatInterval);
  this._deliberateClose = true;
  this._endpoint.close();
};

/**
 * Creates the endpoint to connect to using the url deepstream
 * was initialised with.
 *
 * @private
 * @returns {void}
 */
Connection.prototype._createEndpoint = function () {
  this._endpoint = BrowserWebSocket ? new BrowserWebSocket(this._url) : new NodeWebSocket(this._url, this._options.nodeSocketOptions);

  this._endpoint.onopen = this._onOpen.bind(this);
  this._endpoint.onerror = this._onError.bind(this);
  this._endpoint.onclose = this._onClose.bind(this);
  this._endpoint.onmessage = this._onMessage.bind(this);
};

/**
 * When the implementation tries to send a large
 * number of messages in one execution thread, the first
 * <maxMessagesPerPacket> are send straight away.
 *
 * _currentPacketMessageCount keeps track of how many messages
 * went into that first packet. Once this number has been exceeded
 * the remaining messages are written to a queue and this message
 * is invoked on a timeout to reset the count.
 *
 * @private
 * @returns {void}
 */
Connection.prototype._resetCurrentMessageCount = function () {
  this._currentPacketMessageCount = 0;
  this._currentMessageResetTimeout = null;
};

/**
 * Concatenates the messages in the current message queue
 * and sends them as a single package. This will also
 * empty the message queue and conclude the send process.
 *
 * @private
 * @returns {void}
 */
Connection.prototype._sendQueuedMessages = function () {
  if (this._state !== C.CONNECTION_STATE.OPEN || this._endpoint.readyState !== this._endpoint.OPEN) {
    return;
  }

  if (this._queuedMessages.length === 0) {
    this._sendNextPacketTimeout = null;
    return;
  }

  var message = this._queuedMessages.splice(0, this._options.maxMessagesPerPacket).join('');

  if (this._queuedMessages.length !== 0) {
    this._queueNextPacket();
  } else {
    this._sendNextPacketTimeout = null;
  }

  this._submit(message);
};

/**
 * Sends a message to over the endpoint connection directly
 *
 * Will generate a connection error if the websocket was closed
 * prior to an onclose event.
 *
 * @private
 * @returns {void}
 */
Connection.prototype._submit = function (message) {
  if (this._endpoint.readyState === this._endpoint.OPEN) {
    this._endpoint.send(message);
  } else {
    this._onError('Tried to send message on a closed websocket connection');
  }
};

/**
 * Schedules the next packet whilst the connection is under
 * heavy load.
 *
 * @private
 * @returns {void}
 */
Connection.prototype._queueNextPacket = function () {
  var fn = this._sendQueuedMessages.bind(this);
  var delay = this._options.timeBetweenSendingQueuedPackages;

  this._sendNextPacketTimeout = setTimeout(fn, delay);
};

/**
 * Sends authentication params to the server. Please note, this
 * doesn't use the queued message mechanism, but rather sends the message directly
 *
 * @private
 * @returns {void}
 */
Connection.prototype._sendAuthParams = function () {
  this._setState(C.CONNECTION_STATE.AUTHENTICATING);
  var authMessage = messageBuilder.getMsg(C.TOPIC.AUTH, C.ACTIONS.REQUEST, [this._authParams]);
  this._submit(authMessage);
};

/**
 * Ensures that a heartbeat was not missed more than once, otherwise it considers the connection
 * to have been lost and closes it for reconnection.
 * @return {void}
 */
Connection.prototype._checkHeartBeat = function () {
  var heartBeatTolerance = this._options.heartbeatInterval * 2;

  if (Date.now() - this._lastHeartBeat > heartBeatTolerance) {
    clearInterval(this._heartbeatInterval);
    this._endpoint.close();
    this._client._$onError(C.TOPIC.CONNECTION, C.EVENT.CONNECTION_ERROR, 'heartbeat not received in the last ' + heartBeatTolerance + ' milliseconds');
  }
};

/**
 * Will be invoked once the connection is established. The client
 * can't send messages yet, and needs to get a connection ACK or REDIRECT
 * from the server before authenticating
 *
 * @private
 * @returns {void}
 */
Connection.prototype._onOpen = function () {
  this._clearReconnect();
  this._lastHeartBeat = Date.now();
  this._heartbeatInterval = utils.setInterval(this._checkHeartBeat.bind(this), this._options.heartbeatInterval);
  this._setState(C.CONNECTION_STATE.AWAITING_CONNECTION);
};

/**
 * Callback for generic connection errors. Forwards
 * the error to the client.
 *
 * The connection is considered broken once this method has been
 * invoked.
 *
 * @param   {String|Error} error connection error
 *
 * @private
 * @returns {void}
 */
Connection.prototype._onError = function (error) {
  var _this = this;

  clearInterval(this._heartbeatInterval);
  this._setState(C.CONNECTION_STATE.ERROR);

  /*
   * If the implementation isn't listening on the error event this will throw
   * an error. So let's defer it to allow the reconnection to kick in.
   */
  setTimeout(function () {
    var msg = void 0;
    if (error.code === 'ECONNRESET' || error.code === 'ECONNREFUSED') {
      msg = 'Can\'t connect! Deepstream server unreachable on ' + _this._originalUrl;
    } else {
      msg = error.toString();
    }
    _this._client._$onError(C.TOPIC.CONNECTION, C.EVENT.CONNECTION_ERROR, msg);
  }, 1);
};

/**
 * Callback when the connection closes. This might have been a deliberate
 * close triggered by the client or the result of the connection getting
 * lost.
 *
 * In the latter case the client will try to reconnect using the configured
 * strategy.
 *
 * @private
 * @returns {void}
 */
Connection.prototype._onClose = function () {
  clearInterval(this._heartbeatInterval);

  if (this._redirecting === true) {
    this._redirecting = false;
    this._createEndpoint();
  } else if (this._deliberateClose === true) {
    this._setState(C.CONNECTION_STATE.CLOSED);
  } else {
    this._tryReconnect();
  }
};

/**
 * Callback for messages received on the connection.
 *
 * @param   {String} message deepstream message
 *
 * @private
 * @returns {void}
 */
Connection.prototype._onMessage = function (message) {
  var parsedMessages = messageParser.parse(message.data, this._client);

  for (var i = 0; i < parsedMessages.length; i++) {
    if (parsedMessages[i] === null) {
      continue;
    } else if (parsedMessages[i].topic === C.TOPIC.CONNECTION) {
      this._handleConnectionResponse(parsedMessages[i]);
    } else if (parsedMessages[i].topic === C.TOPIC.AUTH) {
      this._handleAuthResponse(parsedMessages[i]);
    } else {
      this._client._$onMessage(parsedMessages[i]);
    }
  }
};

/**
 * The connection response will indicate whether the deepstream connection
 * can be used or if it should be forwarded to another instance. This
 * allows us to introduce load-balancing if needed.
 *
 * If authentication parameters are already provided this will kick of
 * authentication immediately. The actual 'open' event won't be emitted
 * by the client until the authentication is successful.
 *
 * If a challenge is recieved, the user will send the url to the server
 * in response to get the appropriate redirect. If the URL is invalid the
 * server will respond with a REJECTION resulting in the client connection
 * being permanently closed.
 *
 * If a redirect is recieved, this connection is closed and updated with
 * a connection to the url supplied in the message.
 *
 * @param   {Object} message parsed connection message
 *
 * @private
 * @returns {void}
 */
Connection.prototype._handleConnectionResponse = function (message) {
  if (message.action === C.ACTIONS.PING) {
    this._lastHeartBeat = Date.now();
    this._submit(messageBuilder.getMsg(C.TOPIC.CONNECTION, C.ACTIONS.PONG));
  } else if (message.action === C.ACTIONS.ACK) {
    this._setState(C.CONNECTION_STATE.AWAITING_AUTHENTICATION);
    if (this._authParams) {
      this._sendAuthParams();
    }
  } else if (message.action === C.ACTIONS.CHALLENGE) {
    this._setState(C.CONNECTION_STATE.CHALLENGING);
    this._submit(messageBuilder.getMsg(C.TOPIC.CONNECTION, C.ACTIONS.CHALLENGE_RESPONSE, [this._originalUrl]));
  } else if (message.action === C.ACTIONS.REJECTION) {
    this._challengeDenied = true;
    this.close();
  } else if (message.action === C.ACTIONS.REDIRECT) {
    this._url = message.data[0];
    this._redirecting = true;
    this._endpoint.close();
  } else if (message.action === C.ACTIONS.ERROR) {
    if (message.data[0] === C.EVENT.CONNECTION_AUTHENTICATION_TIMEOUT) {
      this._deliberateClose = true;
      this._connectionAuthenticationTimeout = true;
      this._client._$onError(C.TOPIC.CONNECTION, message.data[0], message.data[1]);
    }
  }
};

/**
 * Callback for messages received for the AUTH topic. If
 * the authentication was successful this method will
 * open the connection and send all messages that the client
 * tried to send so far.
 *
 * @param   {Object} message parsed auth message
 *
 * @private
 * @returns {void}
 */
Connection.prototype._handleAuthResponse = function (message) {
  if (message.action === C.ACTIONS.ERROR) {

    if (message.data[0] === C.EVENT.TOO_MANY_AUTH_ATTEMPTS) {
      this._deliberateClose = true;
      this._tooManyAuthAttempts = true;
    } else if (message.data[0] === C.EVENT.INVALID_AUTH_MSG) {
      this._deliberateClose = true;

      if (this._authCallback) {
        this._authCallback(false, 'invalid authentication message');
      }

      return;
    } else {
      this._setState(C.CONNECTION_STATE.AWAITING_AUTHENTICATION);
    }

    if (this._authCallback) {
      this._authCallback(false, this._getAuthData(message.data[1]));
    }
  } else if (message.action === C.ACTIONS.ACK) {
    this._setState(C.CONNECTION_STATE.OPEN);

    if (this._authCallback) {
      this._authCallback(true, this._getAuthData(message.data[0]));
    }

    this._sendQueuedMessages();
  }
};

/**
 * Checks if data is present with login ack and converts it
 * to the correct type
 *
 * @param {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {object}
 */
Connection.prototype._getAuthData = function (data) {
  if (data === undefined) {
    return null;
  }
  return messageParser.convertTyped(data, this._client);
};

/**
 * Updates the connection state and emits the
 * connectionStateChanged event on the client
 *
 * @private
 * @returns {void}
 */
Connection.prototype._setState = function (state) {
  this._state = state;
  this._client.emit(C.EVENT.CONNECTION_STATE_CHANGED, state);
};

/**
 * If the connection drops or is closed in error this
 * method schedules increasing reconnection intervals
 *
 * If the number of failed reconnection attempts exceeds
 * options.maxReconnectAttempts the connection is closed
 *
 * @private
 * @returns {void}
 */
Connection.prototype._tryReconnect = function () {
  if (this._reconnectTimeout !== null) {
    return;
  }

  if (this._reconnectionAttempt < this._options.maxReconnectAttempts) {
    this._setState(C.CONNECTION_STATE.RECONNECTING);
    this._reconnectTimeout = setTimeout(this._tryOpen.bind(this), Math.min(this._options.maxReconnectInterval, this._options.reconnectIntervalIncrement * this._reconnectionAttempt));
    this._reconnectionAttempt++;
  } else {
    this._clearReconnect();
    this.close();
    this._client.emit(C.EVENT.MAX_RECONNECTION_ATTEMPTS_REACHED, this._reconnectionAttempt);
  }
};

/**
 * Attempts to open a errourosly closed connection
 *
 * @private
 * @returns {void}
 */
Connection.prototype._tryOpen = function () {
  if (this._originalUrl !== this._url) {
    this._url = this._originalUrl;
  }
  this._createEndpoint();
  this._reconnectTimeout = null;
};

/**
 * Stops all further reconnection attempts,
 * either because the connection is open again
 * or because the maximal number of reconnection
 * attempts has been exceeded
 *
 * @private
 * @returns {void}
 */
Connection.prototype._clearReconnect = function () {
  clearTimeout(this._reconnectTimeout);
  this._reconnectTimeout = null;
  this._reconnectionAttempt = 0;
};

module.exports = Connection;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../constants/constants":11,"../utils/utils":31,"./message-builder":16,"./message-parser":17,"ws":2}],16:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var C = _dereq_('../constants/constants');

var SEP = C.MESSAGE_PART_SEPERATOR;

/**
 * Creates a deepstream message string, based on the
 * provided parameters
 *
 * @param   {String} topic  One of CONSTANTS.TOPIC
 * @param   {String} action One of CONSTANTS.ACTIONS
 * @param   {Array} data An array of strings or JSON-serializable objects
 *
 * @returns {String} deepstream message string
 */
exports.getMsg = function (topic, action, data) {
  if (data && !(data instanceof Array)) {
    throw new Error('data must be an array');
  }
  var sendData = [topic, action];

  if (data) {
    for (var i = 0; i < data.length; i++) {
      if (_typeof(data[i]) === 'object') {
        sendData.push(JSON.stringify(data[i]));
      } else {
        sendData.push(data[i]);
      }
    }
  }

  return sendData.join(SEP) + C.MESSAGE_SEPERATOR;
};

/**
 * Converts a serializable value into its string-representation and adds
 * a flag that provides instructions on how to deserialize it.
 *
 * Please see messageParser.convertTyped for the counterpart of this method
 *
 * @param {Mixed} value
 *
 * @public
 * @returns {String} string representation of the value
 */
exports.typed = function (value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

  if (type === 'string') {
    return C.TYPES.STRING + value;
  }

  if (value === null) {
    return C.TYPES.NULL;
  }

  if (type === 'object') {
    return C.TYPES.OBJECT + JSON.stringify(value);
  }

  if (type === 'number') {
    return C.TYPES.NUMBER + value.toString();
  }

  if (value === true) {
    return C.TYPES.TRUE;
  }

  if (value === false) {
    return C.TYPES.FALSE;
  }

  if (value === undefined) {
    return C.TYPES.UNDEFINED;
  }

  throw new Error('Can\'t serialize type ' + value);
};

},{"../constants/constants":11}],17:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('../constants/constants');

/**
 * Parses ASCII control character seperated
 * message strings into digestable maps
 *
 * @constructor
 */
var MessageParser = function MessageParser() {
  this._actions = this._getActions();
};

/**
 * Main interface method. Receives a raw message
 * string, containing one or more messages
 * and returns an array of parsed message objects
 * or null for invalid messages
 *
 * @param   {String} message raw message
 *
 * @public
 *
 * @returns {Array} array of parsed message objects
 *                  following the format
 *                  {
 *                    raw: <original message string>
 *                    topic: <string>
 *                    action: <string - shortcode>
 *                    data: <array of strings>
 *                  }
 */
MessageParser.prototype.parse = function (message, client) {
  var parsedMessages = [];
  var rawMessages = message.split(C.MESSAGE_SEPERATOR);

  for (var i = 0; i < rawMessages.length; i++) {
    if (rawMessages[i].length > 2) {
      parsedMessages.push(this._parseMessage(rawMessages[i], client));
    }
  }

  return parsedMessages;
};

/**
 * Deserializes values created by MessageBuilder.typed to
 * their original format
 *
 * @param {String} value
 *
 * @public
 * @returns {Mixed} original value
 */
MessageParser.prototype.convertTyped = function (value, client) {
  var type = value.charAt(0);

  if (type === C.TYPES.STRING) {
    return value.substr(1);
  }

  if (type === C.TYPES.OBJECT) {
    try {
      return JSON.parse(value.substr(1));
    } catch (e) {
      client._$onError(C.TOPIC.ERROR, C.EVENT.MESSAGE_PARSE_ERROR, e.toString() + '(' + value + ')');
      return undefined;
    }
  }

  if (type === C.TYPES.NUMBER) {
    return parseFloat(value.substr(1));
  }

  if (type === C.TYPES.NULL) {
    return null;
  }

  if (type === C.TYPES.TRUE) {
    return true;
  }

  if (type === C.TYPES.FALSE) {
    return false;
  }

  if (type === C.TYPES.UNDEFINED) {
    return undefined;
  }

  client._$onError(C.TOPIC.ERROR, C.EVENT.MESSAGE_PARSE_ERROR, 'UNKNOWN_TYPE (' + value + ')');
  return undefined;
};

/**
 * Turns the ACTION:SHORTCODE constants map
 * around to facilitate shortcode lookup
 *
 * @private
 *
 * @returns {Object} actions
 */
MessageParser.prototype._getActions = function () {
  var actions = {};

  for (var key in C.ACTIONS) {
    actions[C.ACTIONS[key]] = key;
  }

  return actions;
};

/**
 * Parses an individual message (as oppnosed to a
 * block of multiple messages as is processed by .parse())
 *
 * @param   {String} message
 *
 * @private
 *
 * @returns {Object} parsedMessage
 */
MessageParser.prototype._parseMessage = function (message, client) {
  var parts = message.split(C.MESSAGE_PART_SEPERATOR);
  var messageObject = {};

  if (parts.length < 2) {
    client._$onError(C.TOPIC.ERROR, C.EVENT.MESSAGE_PARSE_ERROR, 'Insufficiant message parts');
    return null;
  }

  if (this._actions[parts[1]] === undefined) {
    client._$onError(C.TOPIC.ERROR, C.EVENT.MESSAGE_PARSE_ERROR, 'Unknown action ' + parts[1]);
    return null;
  }

  messageObject.raw = message;
  messageObject.topic = parts[0];
  messageObject.action = parts[1];
  messageObject.data = parts.splice(2);

  return messageObject;
};

module.exports = new MessageParser();

},{"../constants/constants":11}],18:[function(_dereq_,module,exports){
'use strict';

var EventEmitter = _dereq_('component-emitter2');
var C = _dereq_('../constants/constants');
var ResubscribeNotifier = _dereq_('../utils/resubscribe-notifier');

/**
 * The main class for presence in deepstream
 *
 * Provides the presence interface and handles incoming messages
 * on the presence topic
 *
 * @param {Object} options deepstream configuration options
 * @param {Connection} connection
 * @param {Client} client
 *
 * @constructor
 * @public
 */
var PresenceHandler = function PresenceHandler(options, connection, client) {
  this._options = options;
  this._connection = connection;
  this._client = client;
  this._emitter = new EventEmitter();
  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._resubscribeNotifier = new ResubscribeNotifier(this._client, this._resubscribe.bind(this));
};

/**
 * Queries for clients logged into deepstream.
 *
 * @param   {Function} callback Will be invoked with an array of clients
 *
 * @public
 * @returns {void}
 */
PresenceHandler.prototype.getAll = function (callback) {
  if (!this._emitter.hasListeners(C.ACTIONS.QUERY)) {
    // At least one argument is required for a message to be permissionable
    this._connection.sendMsg(C.TOPIC.PRESENCE, C.ACTIONS.QUERY, [C.ACTIONS.QUERY]);
  }
  this._emitter.once(C.ACTIONS.QUERY, callback);
};

/**
 * Subscribes to client logins or logouts in deepstream
 *
 * @param   {Function} callback Will be invoked with the username of a client,
 *                              and a boolean to indicate if it was a login or
 *                              logout event
 * @public
 * @returns {void}
 */
PresenceHandler.prototype.subscribe = function (callback) {
  if (callback !== undefined && typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  if (!this._emitter.hasListeners(C.TOPIC.PRESENCE)) {
    this._ackTimeoutRegistry.add({
      topic: C.TOPIC.PRESENCE,
      action: C.ACTIONS.SUBSCRIBE,
      name: C.TOPIC.PRESENCE
    });
    this._connection.sendMsg(C.TOPIC.PRESENCE, C.ACTIONS.SUBSCRIBE, [C.ACTIONS.SUBSCRIBE]);
  }

  this._emitter.on(C.TOPIC.PRESENCE, callback);
};

/**
 * Removes a callback for a specified presence event
 *
 * @param   {Function} callback The callback to unregister via {PresenceHandler#unsubscribe}
 *
 * @public
 * @returns {void}
 */
PresenceHandler.prototype.unsubscribe = function (callback) {
  if (callback !== undefined && typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  this._emitter.off(C.TOPIC.PRESENCE, callback);

  if (!this._emitter.hasListeners(C.TOPIC.PRESENCE)) {
    this._ackTimeoutRegistry.add({
      topic: C.TOPIC.PRESENCE,
      action: C.ACTIONS.UNSUBSCRIBE,
      name: C.TOPIC.PRESENCE
    });
    this._connection.sendMsg(C.TOPIC.PRESENCE, C.ACTIONS.UNSUBSCRIBE, [C.ACTIONS.UNSUBSCRIBE]);
  }
};

/**
 * Handles incoming messages from the server
 *
 * @param   {Object} message parsed deepstream message
 *
 * @package private
 * @returns {void}
 */
PresenceHandler.prototype._$handle = function (message) {
  if (message.action === C.ACTIONS.ERROR && message.data[0] === C.EVENT.MESSAGE_DENIED) {
    this._ackTimeoutRegistry.remove(C.TOPIC.PRESENCE, message.data[1]);
    message.processedError = true;
    this._client._$onError(C.TOPIC.PRESENCE, C.EVENT.MESSAGE_DENIED, message.data[1]);
  } else if (message.action === C.ACTIONS.ACK) {
    this._ackTimeoutRegistry.clear(message);
  } else if (message.action === C.ACTIONS.PRESENCE_JOIN) {
    this._emitter.emit(C.TOPIC.PRESENCE, message.data[0], true);
  } else if (message.action === C.ACTIONS.PRESENCE_LEAVE) {
    this._emitter.emit(C.TOPIC.PRESENCE, message.data[0], false);
  } else if (message.action === C.ACTIONS.QUERY) {
    this._emitter.emit(C.ACTIONS.QUERY, message.data);
  } else {
    this._client._$onError(C.TOPIC.PRESENCE, C.EVENT.UNSOLICITED_MESSAGE, message.action);
  }
};

/**
 * Resubscribes to presence subscription when connection is lost
 *
 * @package private
 * @returns {void}
 */
PresenceHandler.prototype._resubscribe = function () {
  var callbacks = this._emitter._callbacks;
  if (callbacks && callbacks[C.TOPIC.PRESENCE]) {
    this._connection.sendMsg(C.TOPIC.PRESENCE, C.ACTIONS.SUBSCRIBE, [C.ACTIONS.SUBSCRIBE]);
  }
};

module.exports = PresenceHandler;

},{"../constants/constants":11,"../utils/resubscribe-notifier":29,"component-emitter2":1}],19:[function(_dereq_,module,exports){
'use strict';
/* eslint-disable prefer-rest-params, prefer-spread */

var Record = _dereq_('./record');
var EventEmitter = _dereq_('component-emitter2');

/**
 * An AnonymousRecord is a record without a predefined name. It
 * acts like a wrapper around an actual record that can
 * be swapped out for another one whilst keeping all bindings intact.
 *
 * Imagine a customer relationship management system with a list of users
 * on the left and a user detail panel on the right. The user detail
 * panel could use the anonymous record to set up its bindings, yet whenever
 * a user is chosen from the list of existing users the anonymous record's
 * setName method is called and the detail panel will update to
 * show the selected user's details
 *
 * @param {RecordHandler} recordHandler
 *
 * @constructor
 */
var AnonymousRecord = function AnonymousRecord(recordHandler) {
  this.name = null;
  this._recordHandler = recordHandler;
  this._record = null;
  this._subscriptions = [];
  this._proxyMethod('delete');
  this._proxyMethod('set');
  this._proxyMethod('discard');
};

EventEmitter(AnonymousRecord.prototype); // eslint-disable-line

/**
 * Proxies the actual record's get method. It is valid
 * to call get prior to setName - if no record exists,
 * the method returns undefined
 *
 * @param   {[String]} path A json path. If non is provided,
 *                          the entire record is returned.
 *
 * @public
 * @returns {mixed}    the value of path or the entire object
 */
AnonymousRecord.prototype.get = function (path) {
  if (this._record === null) {
    return undefined;
  }

  return this._record.get(path);
};

/**
 * Proxies the actual record's subscribe method. The same parameters
 * can be used. Can be called prior to setName(). Please note, triggerIfReady
 * will always be set to true to reflect changes in the underlying record.
 *
 * @param   {[String]} path   A json path. If non is provided,
 *                              it subscribes to changes for the entire record.
 *
 * @param   {Function} callback A callback function that will be invoked whenever
 *                              the subscribed path or record updates
 *
 * @public
 * @returns {void}
 */
AnonymousRecord.prototype.subscribe = function () {
  var parameters = Record.prototype._normalizeArguments(arguments);
  parameters.triggerNow = true;
  this._subscriptions.push(parameters);

  if (this._record !== null) {
    this._record.subscribe(parameters);
  }
};

/**
 * Proxies the actual record's unsubscribe method. The same parameters
 * can be used. Can be called prior to setName()
 *
 * @param   {[String]} path   A json path. If non is provided,
 *                              it subscribes to changes for the entire record.
 *
 * @param   {Function} callback A callback function that will be invoked whenever
 *                              the subscribed path or record updates
 *
 * @public
 * @returns {void}
 */
AnonymousRecord.prototype.unsubscribe = function () {
  var parameters = Record.prototype._normalizeArguments(arguments);
  var subscriptions = [];
  var i = void 0;

  for (i = 0; i < this._subscriptions.length; i++) {
    if (this._subscriptions[i].path !== parameters.path || this._subscriptions[i].callback !== parameters.callback) {
      subscriptions.push(this._subscriptions[i]);
    }
  }

  this._subscriptions = subscriptions;

  if (this._record !== null) {
    this._record.unsubscribe(parameters);
  }
};

/**
 * Sets the underlying record the anonymous record is bound
 * to. Can be called multiple times.
 *
 * @param {String} recordName
 *
 * @public
 * @returns {void}
 */
AnonymousRecord.prototype.setName = function (recordName) {
  if (this.name === recordName) {
    return;
  }

  this.name = recordName;

  var i = void 0;

  if (this._record !== null && !this._record.isDestroyed) {
    for (i = 0; i < this._subscriptions.length; i++) {
      this._record.unsubscribe(this._subscriptions[i]);
    }
    this._record.discard();
  }

  this._record = this._recordHandler.getRecord(recordName);

  for (i = 0; i < this._subscriptions.length; i++) {
    this._record.subscribe(this._subscriptions[i]);
  }

  this._record.whenReady(this.emit.bind(this, 'ready'));
  this.emit('nameChanged', recordName);
};

/**
 * Adds the specified method to this method and forwards it
 * to _callMethodOnRecord
 *
 * @param   {String} methodName
 *
 * @private
 * @returns {void}
 */
AnonymousRecord.prototype._proxyMethod = function (methodName) {
  this[methodName] = this._callMethodOnRecord.bind(this, methodName);
};

/**
 * Invokes the specified method with the provided parameters on
 * the underlying record. Throws erros if the method is not
 * specified yet or doesn't expose the method in question
 *
 * @param   {String} methodName
 *
 * @private
 * @returns {Mixed} the return value of the actual method
 */
AnonymousRecord.prototype._callMethodOnRecord = function (methodName) {
  if (this._record === null) {
    throw new Error('Can`t invoke ' + methodName + '. AnonymousRecord not initialised. Call setName first');
  }

  if (typeof this._record[methodName] !== 'function') {
    throw new Error(methodName + ' is not a method on the record');
  }

  var args = Array.prototype.slice.call(arguments, 1);

  return this._record[methodName].apply(this._record, args);
};

module.exports = AnonymousRecord;

},{"./record":23,"component-emitter2":1}],20:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = _dereq_('../utils/utils');

var PARTS_REG_EXP = /([^.[\]\s]+)/g;
var cache = Object.create(null);

/**
 * Returns the value of the path or
 * undefined if the path can't be resolved
 *
 * @public
 * @returns {Mixed}
 */
module.exports.get = function (data, path, deepCopy) {
  var tokens = tokenize(path);
  var value = data;
  for (var i = 0; i < tokens.length; i++) {
    if (value === undefined) {
      return undefined;
    }
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
      throw new Error('invalid data or path');
    }
    value = value[tokens[i]];
  }

  return deepCopy !== false ? utils.deepCopy(value) : value;
};

/**
 * Sets the value of the path. If the path (or parts
 * of it) doesn't exist yet, it will be created
 *
 * @param {Mixed} value
 *
 * @public
 * @returns {Mixed} updated value
 */
module.exports.set = function (data, path, value, deepCopy) {
  var tokens = tokenize(path);

  if (tokens.length === 0) {
    return patch(data, value, deepCopy);
  }

  var oldValue = module.exports.get(data, path, false);
  var newValue = patch(oldValue, value, deepCopy);

  if (newValue === oldValue) {
    return data;
  }

  var result = utils.shallowCopy(data);

  var node = result;
  for (var i = 0; i < tokens.length; i++) {
    if (i === tokens.length - 1) {
      node[tokens[i]] = newValue;
    } else if (node[tokens[i]] !== undefined) {
      node = node[tokens[i]] = utils.shallowCopy(node[tokens[i]]);
    } else if (tokens[i + 1] && !isNaN(tokens[i + 1])) {
      node = node[tokens[i]] = [];
    } else {
      node = node[tokens[i]] = Object.create(null);
    }
  }

  return result;
};

/**
 * Merge the new value into the old value
 * @param  {Mixed} oldValue
 * @param  {Mixed} newValue
 * @param  {boolean} deepCopy
 * @return {Mixed}
 */
function patch(oldValue, newValue, deepCopy) {
  var i = void 0;
  var j = void 0;
  if (oldValue === null || newValue === null) {
    return newValue;
  } else if (Array.isArray(oldValue) && Array.isArray(newValue)) {
    var arr = void 0;
    for (i = 0; i < newValue.length; i++) {
      var value = patch(oldValue[i], newValue[i], false);
      if (!arr) {
        if (value === oldValue[i]) {
          continue;
        }
        arr = [];
        for (j = 0; j < i; ++j) {
          arr[j] = oldValue[j];
        }
      }
      arr[i] = value;
    }
    arr = arr && deepCopy !== false ? utils.deepCopy(arr) : arr;
    arr = arr || (oldValue.length === newValue.length ? oldValue : newValue);
    return arr;
  } else if (!Array.isArray(newValue) && (typeof oldValue === 'undefined' ? 'undefined' : _typeof(oldValue)) === 'object' && (typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object') {
    var obj = void 0;
    var props = Object.keys(newValue);
    for (i = 0; i < props.length; i++) {
      var _value = patch(oldValue[props[i]], newValue[props[i]], false);
      if (!obj) {
        if (_value === oldValue[props[i]]) {
          continue;
        }
        obj = Object.create(null);
        for (j = 0; j < i; ++j) {
          obj[props[j]] = oldValue[props[j]];
        }
      }
      obj[props[i]] = newValue[props[i]];
    }
    obj = obj && deepCopy !== false ? utils.deepCopy(obj) : obj;
    obj = obj || (Object.keys(oldValue).length === props.length ? oldValue : newValue);
    return obj;
  } else if (newValue !== oldValue) {
    return deepCopy !== false ? utils.deepCopy(newValue) : newValue;
  }

  return oldValue;
}

/**
 * Parses the path. Splits it into
 * keys for objects and indices for arrays.
 *
 * @returns Array of tokens
 */
function tokenize(path) {
  if (cache[path]) {
    return cache[path];
  }

  var parts = String(path) !== 'undefined' ? String(path).match(PARTS_REG_EXP) : [];

  if (!parts) {
    throw new Error('invalid path ' + path);
  }

  cache[path] = parts;
  return cache[path];
}

},{"../utils/utils":31}],21:[function(_dereq_,module,exports){
'use strict';
/* eslint-disable prefer-rest-params */

var EventEmitter = _dereq_('component-emitter2');
var Record = _dereq_('./record');
var C = _dereq_('../constants/constants');

var ENTRY_ADDED_EVENT = 'entry-added';
var ENTRY_REMOVED_EVENT = 'entry-removed';
var ENTRY_MOVED_EVENT = 'entry-moved';

/**
 * A List is a specialised Record that contains
 * an Array of recordNames and provides a number
 * of convinience methods for interacting with them.
 *
 * @param {RecordHanlder} recordHandler
 * @param {String} name    The name of the list
 *
 * @constructor
 */
var List = function List(recordHandler, name, options) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }

  this._recordHandler = recordHandler;
  this._record = this._recordHandler.getRecord(name, options);
  this._record._applyUpdate = this._applyUpdate.bind(this);

  this._record.on('delete', this.emit.bind(this, 'delete'));
  this._record.on('discard', this._onDiscard.bind(this));
  this._record.on('ready', this._onReady.bind(this));

  this.isDestroyed = this._record.isDestroyed;
  this.isReady = this._record.isReady;
  this.name = name;
  this._queuedMethods = [];
  this._beforeStructure = null;
  this._hasAddListener = null;
  this._hasRemoveListener = null;
  this._hasMoveListener = null;

  this.delete = this._record.delete.bind(this._record);
  this.discard = this._record.discard.bind(this._record);
  this.whenReady = this._record.whenReady.bind(this);
};

EventEmitter(List.prototype); // eslint-disable-line

/**
 * Returns the array of list entries or an
 * empty array if the list hasn't been populated yet.
 *
 * @public
 * @returns {Array} entries
 */
List.prototype.getEntries = function () {
  var entries = this._record.get();

  if (!(entries instanceof Array)) {
    return [];
  }

  return entries;
};

/**
 * Returns true if the list is empty
 *
 * @public
 * @returns {Boolean} isEmpty
 */
List.prototype.isEmpty = function () {
  return this.getEntries().length === 0;
};

/**
 * Updates the list with a new set of entries
 *
 * @public
 * @param {Array} entries
 */
List.prototype.setEntries = function (entries) {
  var errorMsg = 'entries must be an array of record names';
  var i = void 0;

  if (!(entries instanceof Array)) {
    throw new Error(errorMsg);
  }

  for (i = 0; i < entries.length; i++) {
    if (typeof entries[i] !== 'string') {
      throw new Error(errorMsg);
    }
  }

  if (this._record.isReady === false) {
    this._queuedMethods.push(this.setEntries.bind(this, entries));
  } else {
    this._beforeChange();
    this._record.set(entries);
    this._afterChange();
  }
};

/**
 * Removes an entry from the list
 *
 * @param {String} entry
 * @param {Number} [index]
 *
 * @public
 * @returns {void}
 */
List.prototype.removeEntry = function (entry, index) {
  if (this._record.isReady === false) {
    this._queuedMethods.push(this.removeEntry.bind(this, entry, index));
    return;
  }

  var currentEntries = this._record.get();
  var hasIndex = this._hasIndex(index);
  var entries = [];
  var i = void 0;

  for (i = 0; i < currentEntries.length; i++) {
    if (currentEntries[i] !== entry || hasIndex && index !== i) {
      entries.push(currentEntries[i]);
    }
  }
  this._beforeChange();
  this._record.set(entries);
  this._afterChange();
};

/**
 * Adds an entry to the list
 *
 * @param {String} entry
 * @param {Number} [index]
 *
 * @public
 * @returns {void}
 */
List.prototype.addEntry = function (entry, index) {
  if (typeof entry !== 'string') {
    throw new Error('Entry must be a recordName');
  }

  if (this._record.isReady === false) {
    this._queuedMethods.push(this.addEntry.bind(this, entry, index));
    return;
  }

  var hasIndex = this._hasIndex(index);
  var entries = this.getEntries();
  if (hasIndex) {
    entries.splice(index, 0, entry);
  } else {
    entries.push(entry);
  }
  this._beforeChange();
  this._record.set(entries);
  this._afterChange();
};

/**
 * Proxies the underlying Record's subscribe method. Makes sure
 * that no path is provided
 *
 * @public
 * @returns {void}
 */
List.prototype.subscribe = function () {
  var parameters = Record.prototype._normalizeArguments(arguments);

  if (parameters.path) {
    throw new Error('path is not supported for List.subscribe');
  }

  // Make sure the callback is invoked with an empty array for new records
  var listCallback = function (callback) {
    callback(this.getEntries());
  }.bind(this, parameters.callback);

  /**
  * Adding a property onto a function directly is terrible practice,
  * and we will change this as soon as we have a more seperate approach
  * of creating lists that doesn't have records default state.
  *
  * The reason we are holding a referencing to wrapped array is so that
  * on unsubscribe it can provide a reference to the actual method the
  * record is subscribed too.
  **/
  parameters.callback.wrappedCallback = listCallback;
  parameters.callback = listCallback;

  this._record.subscribe(parameters);
};

/**
 * Proxies the underlying Record's unsubscribe method. Makes sure
 * that no path is provided
 *
 * @public
 * @returns {void}
 */
List.prototype.unsubscribe = function () {
  var parameters = Record.prototype._normalizeArguments(arguments);

  if (parameters.path) {
    throw new Error('path is not supported for List.unsubscribe');
  }

  parameters.callback = parameters.callback.wrappedCallback;
  this._record.unsubscribe(parameters);
};

/**
 * Listens for changes in the Record's ready state
 * and applies them to this list
 *
 * @private
 * @returns {void}
 */
List.prototype._onReady = function () {
  this.isReady = true;

  for (var i = 0; i < this._queuedMethods.length; i++) {
    this._queuedMethods[i]();
  }

  this._queuedMethods = [];
  this.emit('ready');
};

/**
 * Listens for the record discard event and applies
 * changes to list
 *
 * @private
 * @returns {void}
 */
List.prototype._onDiscard = function () {
  this.isDestroyed = true;
  this.emit('discard');
};

/**
 * Proxies the underlying Record's _update method. Set's
 * data to an empty array if no data is provided.
 *
 * @param   {null}   path must (should :-)) be null
 * @param   {Array}  data
 *
 * @private
 * @returns {void}
 */
List.prototype._applyUpdate = function (message) {
  if (message.action === C.ACTIONS.PATCH) {
    throw new Error('PATCH is not supported for Lists');
  }

  if (message.data[2].charAt(0) !== '[') {
    message.data[2] = '[]';
  }

  this._beforeChange();
  Record.prototype._applyUpdate.call(this._record, message);
  this._afterChange();
};

/**
 * Validates that the index provided is within the current set of entries.
 *
 * @param {Number} index
 *
 * @private
 * @returns {Number}
 */
List.prototype._hasIndex = function (index) {
  var hasIndex = false;
  var entries = this.getEntries();
  if (index !== undefined) {
    if (isNaN(index)) {
      throw new Error('Index must be a number');
    }
    if (index !== entries.length && (index >= entries.length || index < 0)) {
      throw new Error('Index must be within current entries');
    }
    hasIndex = true;
  }
  return hasIndex;
};

/**
 * Establishes the current structure of the list, provided the client has attached any
 * add / move / remove listener
 *
 * This will be called before any change to the list, regardsless if the change was triggered
 * by an incoming message from the server or by the client
 *
 * @private
 * @returns {void}
 */
List.prototype._beforeChange = function () {
  this._hasAddListener = this.listeners(ENTRY_ADDED_EVENT).length > 0;
  this._hasRemoveListener = this.listeners(ENTRY_REMOVED_EVENT).length > 0;
  this._hasMoveListener = this.listeners(ENTRY_MOVED_EVENT).length > 0;

  if (this._hasAddListener || this._hasRemoveListener || this._hasMoveListener) {
    this._beforeStructure = this._getStructure();
  } else {
    this._beforeStructure = null;
  }
};

/**
 * Compares the structure of the list after a change to its previous structure and notifies
 * any add / move / remove listener. Won't do anything if no listeners are attached.
 *
 * @private
 * @returns {void}
 */
List.prototype._afterChange = function () {
  if (this._beforeStructure === null) {
    return;
  }

  var after = this._getStructure();
  var before = this._beforeStructure;
  var entry = void 0;
  var i = void 0;

  if (this._hasRemoveListener) {
    for (entry in before) {
      for (i = 0; i < before[entry].length; i++) {
        if (after[entry] === undefined || after[entry][i] === undefined) {
          this.emit(ENTRY_REMOVED_EVENT, entry, before[entry][i]);
        }
      }
    }
  }

  if (this._hasAddListener || this._hasMoveListener) {
    for (entry in after) {
      if (before[entry] === undefined) {
        for (i = 0; i < after[entry].length; i++) {
          this.emit(ENTRY_ADDED_EVENT, entry, after[entry][i]);
        }
      } else {
        for (i = 0; i < after[entry].length; i++) {
          if (before[entry][i] !== after[entry][i]) {
            if (before[entry][i] === undefined) {
              this.emit(ENTRY_ADDED_EVENT, entry, after[entry][i]);
            } else {
              this.emit(ENTRY_MOVED_EVENT, entry, after[entry][i]);
            }
          }
        }
      }
    }
  }
};

/**
 * Iterates through the list and creates a map with the entry as a key
 * and an array of its position(s) within the list as a value, e.g.
 *
 * {
 *   'recordA': [ 0, 3 ],
 *   'recordB': [ 1 ],
 *   'recordC': [ 2 ]
 * }
 *
 * @private
 * @returns {Array} structure
 */
List.prototype._getStructure = function () {
  var structure = {};
  var i = void 0;
  var entries = this._record.get();

  for (i = 0; i < entries.length; i++) {
    if (structure[entries[i]] === undefined) {
      structure[entries[i]] = [i];
    } else {
      structure[entries[i]].push(i);
    }
  }

  return structure;
};

module.exports = List;

},{"../constants/constants":11,"./record":23,"component-emitter2":1}],22:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Record = _dereq_('./record');
var AnonymousRecord = _dereq_('./anonymous-record');
var List = _dereq_('./list');
var Listener = _dereq_('../utils/listener');
var SingleNotifier = _dereq_('../utils/single-notifier');
var C = _dereq_('../constants/constants');
var messageParser = _dereq_('../message/message-parser');
var messageBuilder = _dereq_('../message/message-builder');
var EventEmitter = _dereq_('component-emitter2');

/**
 * A collection of factories for records. This class
 * is exposed as client.record
 *
 * @param {Object} options    deepstream options
 * @param {Connection} connection
 * @param {Client} client
 */
var RecordHandler = function RecordHandler(options, connection, client) {
  this._options = options;
  this._connection = connection;
  this._client = client;
  this._records = {};
  this._lists = {};
  this._listener = {};
  this._writeCallbacks = {};
  this._destroyEventEmitter = new EventEmitter();

  this._hasRegistry = new SingleNotifier(client, connection, C.TOPIC.RECORD, C.ACTIONS.HAS, this._options.recordReadTimeout);
  this._snapshotRegistry = new SingleNotifier(client, connection, C.TOPIC.RECORD, C.ACTIONS.SNAPSHOT, this._options.recordReadTimeout);
};

/**
 * Returns an existing record or creates a new one.
 *
 * @param   {String} name              the unique name of the record
 * @param   {[Object]} recordOptions   A map of parameters for this particular record.
 *                                      { persist: true }
 *
 * @public
 * @returns {Record}
 */
RecordHandler.prototype.getRecord = function (name, recordOptions) {
  if (!this._records[name]) {
    this._records[name] = new Record(name, recordOptions || {}, this._connection, this._options, this._client);
    this._records[name].on('error', this._onRecordError.bind(this, name));
    this._records[name].on('destroyPending', this._onDestroyPending.bind(this, name));
    this._records[name].on('delete', this._removeRecord.bind(this, name));
    this._records[name].on('discard', this._removeRecord.bind(this, name));
  }

  this._records[name].usages++;

  return this._records[name];
};

/**
 * Returns an existing List or creates a new one. A list is a specialised
 * type of record that holds an array of recordNames.
 *
 * @param   {String} name       the unique name of the list
 * @param   {[Object]} options   A map of parameters for this particular list.
 *                              { persist: true }
 *
 * @public
 * @returns {List}
 */
RecordHandler.prototype.getList = function (name, options) {
  if (!this._lists[name]) {
    this._lists[name] = new List(this, name, options);
  } else {
    this._records[name].usages++;
  }
  return this._lists[name];
};

/**
 * Returns an anonymous record. A anonymous record is effectively
 * a wrapper that mimicks the API of a record, but allows for the
 * underlying record to be swapped without loosing subscriptions etc.
 *
 * This is particularly useful when selecting from a number of similarly
 * structured records. E.g. a list of users that can be choosen from a list
 *
 * The only API difference to a normal record is an additional setName( name ) method.
 *
 *
 * @public
 * @returns {AnonymousRecord}
 */
RecordHandler.prototype.getAnonymousRecord = function () {
  return new AnonymousRecord(this);
};

/**
 * Allows to listen for record subscriptions made by this or other clients. This
 * is useful to create "active" data providers, e.g. providers that only provide
 * data for a particular record if a user is actually interested in it
 *
 * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
RecordHandler.prototype.listen = function (pattern, callback) {
  if (typeof pattern !== 'string' || pattern.length === 0) {
    throw new Error('invalid argument pattern');
  }
  if (typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  if (this._listener[pattern] && !this._listener[pattern].destroyPending) {
    this._client._$onError(C.TOPIC.RECORD, C.EVENT.LISTENER_EXISTS, pattern);
    return;
  }

  if (this._listener[pattern]) {
    this._listener[pattern].destroy();
  }

  this._listener[pattern] = new Listener(C.TOPIC.RECORD, pattern, callback, this._options, this._client, this._connection);
};

/**
 * Removes a listener that was previously registered with listenForSubscriptions
 *
 * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
RecordHandler.prototype.unlisten = function (pattern) {
  if (typeof pattern !== 'string' || pattern.length === 0) {
    throw new Error('invalid argument pattern');
  }

  var listener = this._listener[pattern];
  if (listener && !listener.destroyPending) {
    listener.sendDestroy();
  } else if (this._listener[pattern]) {
    this._listener[pattern].destroy();
    delete this._listener[pattern];
  } else {
    this._client._$onError(C.TOPIC.RECORD, C.EVENT.NOT_LISTENING, pattern);
  }
};

/**
 * Retrieve the current record data without subscribing to changes
 *
 * @param   {String}  name the unique name of the record
 * @param   {Function}  callback
 *
 * @public
 */
RecordHandler.prototype.snapshot = function (name, callback) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }

  if (this._records[name] && this._records[name].isReady) {
    callback(null, this._records[name].get());
  } else {
    this._snapshotRegistry.request(name, callback);
  }
};

/**
 * Allows the user to query to see whether or not the record exists.
 *
 * @param   {String}  name the unique name of the record
 * @param   {Function}  callback
 *
 * @public
 */
RecordHandler.prototype.has = function (name, callback) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }

  if (this._records[name]) {
    callback(null, true);
  } else {
    this._hasRegistry.request(name, callback);
  }
};

/**
 * Allows setting the data for a record without being subscribed to it. If
 * the client is subscribed to the record locally, the update will be proxied
 * through the record object like a normal call to Record.set. Otherwise a force
 * write will be performed that overwrites any remote data.
 *
 * @param {String} recordName the name of the record to write to
 * @param {String|Object} pathOrData either the path to write data to or the data to
 *                                   set the record to
 * @param {Object|Primitive|Function} dataOrCallback either the data to write to the
 *                                                   record or a callback function
 *                                                   indicating write success
 * @param {Function} callback if provided this will be called with the result of the
 *                            write
 */
RecordHandler.prototype.setData = function (recordName, pathOrData, dataOrCallback, callback) {
  var path = void 0;
  var data = void 0;
  var cb = void 0;
  var valid = false;

  if (arguments.length === 4) {
    // setData(recordName, path, data, cb)
    path = pathOrData;
    data = dataOrCallback;
    cb = callback;
    valid = true;
  } else if (arguments.length === 3) {
    if (typeof pathOrData === 'string' && typeof dataOrCallback !== 'function') {
      // setData(recordName, path, data)
      path = pathOrData;
      data = dataOrCallback;
      valid = true;
    } else if ((typeof pathOrData === 'undefined' ? 'undefined' : _typeof(pathOrData)) === 'object' && typeof dataOrCallback === 'function') {
      // setData(recordName, data, callback)
      path = null;
      data = pathOrData;
      cb = dataOrCallback;
      valid = true;
    }
  } else if (arguments.length === 2 && (typeof pathOrData === 'undefined' ? 'undefined' : _typeof(pathOrData)) === 'object') {
    // setData(recordName, data)
    data = pathOrData;
    valid = true;
  }

  if (!valid) {
    throw new Error('incorrect arguments used: records must exist as objects at the root level');
  }

  var record = this._records[recordName];
  if (record) {
    if (path && cb) {
      record.set(path, data, cb);
    } else if (path) {
      record.set(path, data);
    } else if (cb) {
      record.set(data, cb);
    } else {
      record.set(data);
    }
  } else {
    var recordData = path ? [recordName, -1, path, messageBuilder.typed(data)] : [recordName, -1, data];
    var config = {};
    if (cb) {
      config.writeSuccess = true;
      this._writeCallbacks[recordName] = {};
      this._writeCallbacks[recordName][-1] = cb;
    }
    recordData.push(config);
    this._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.CREATEANDUPDATE, recordData);
  }
};

/**
 * Will be called by the client for incoming messages on the RECORD topic
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @package private
 * @returns {void}
 */
RecordHandler.prototype._$handle = function (message) {
  var name = void 0;

  if (message.action === C.ACTIONS.ERROR && message.data[0] !== C.EVENT.VERSION_EXISTS && message.data[0] !== C.ACTIONS.SNAPSHOT && message.data[0] !== C.ACTIONS.HAS && message.data[0] !== C.EVENT.MESSAGE_DENIED) {
    message.processedError = true;
    this._client._$onError(C.TOPIC.RECORD, message.data[0], message.data[1]);
    return;
  }

  if (message.action === C.ACTIONS.ACK || message.action === C.ACTIONS.ERROR) {
    name = message.data[1];

    /*
     * The following prevents errors that occur when a record is discarded or deleted and
     * recreated before the discard / delete ack message is received.
     *
     * A (presumably unsolvable) problem remains when a client deletes a record in the exact moment
     * between another clients creation and read message for the same record
     */
    if (message.data[0] === C.ACTIONS.DELETE || message.data[0] === C.ACTIONS.UNSUBSCRIBE || message.data[0] === C.EVENT.MESSAGE_DENIED && message.data[2] === C.ACTIONS.DELETE) {
      this._destroyEventEmitter.emit('destroy_ack_' + name, message);

      if (message.data[0] === C.ACTIONS.DELETE && this._records[name]) {
        this._records[name]._$onMessage(message);
      }

      return;
    }

    if (message.data[0] === C.ACTIONS.SNAPSHOT) {
      message.processedError = true;
      this._snapshotRegistry.recieve(name, message.data[2]);
      return;
    }

    if (message.data[0] === C.ACTIONS.HAS) {
      message.processedError = true;
      this._snapshotRegistry.recieve(name, message.data[2]);
      return;
    }
  } else {
    name = message.data[0];
  }

  var processed = false;

  var record = this._records[name];
  if (record) {
    processed = true;
    record._$onMessage(message);
  }

  if (message.action === C.ACTIONS.READ && this._snapshotRegistry.hasRequest(name)) {
    processed = true;
    this._snapshotRegistry.recieve(name, null, JSON.parse(message.data[2]));
  } else if (message.action === C.ACTIONS.HAS && this._hasRegistry.hasRequest(name)) {
    processed = true;
    this._hasRegistry.recieve(name, null, messageParser.convertTyped(message.data[1]));
  } else if (message.action === C.ACTIONS.WRITE_ACKNOWLEDGEMENT && !record) {
    processed = true;
    Record._handleWriteAcknowledgements(message, this._writeCallbacks[name], this._client);
  } else if (message.action === C.ACTIONS.ACK && message.data[0] === C.ACTIONS.UNLISTEN && this._listener[name] && this._listener[name].destroyPending) {
    processed = true;
    this._listener[name].destroy();
    delete this._listener[name];
  } else if (this._listener[name]) {
    processed = true;
    this._listener[name]._$onMessage(message);
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED) {
    // An unlisten ACK was received before an PATTERN_REMOVED which is a valid case
    processed = true;
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_HAS_PROVIDER) {
    // record can receive a HAS_PROVIDER after discarding the record
    processed = true;
  }

  if (!processed) {
    message.processedError = true;
    this._client._$onError(C.TOPIC.RECORD, C.EVENT.UNSOLICITED_MESSAGE, name);
  }
};

/**
 * Callback for 'error' events from the record.
 *
 * @param   {String} recordName
 * @param   {String} error
 *
 * @private
 * @returns {void}
 */
RecordHandler.prototype._onRecordError = function (recordName, error) {
  this._client._$onError(C.TOPIC.RECORD, error, recordName);
};

/**
 * When the client calls discard or delete on a record, there is a short delay
 * before the corresponding ACK message is received from the server. To avoid
 * race conditions if the record is re-requested straight away the old record is
 * removed from the cache straight awy and will only listen for one last ACK message
 *
 * @param   {String} recordName The name of the record that was just deleted / discarded
 *
 * @private
 * @returns {void}
 */
RecordHandler.prototype._onDestroyPending = function (recordName) {
  if (!this._records[recordName]) {
    this._client._$onError(C.TOPIC.RECORD, 'Record attempted to be destroyed but does not exists', recordName);
    return;
  }
  var onMessage = this._records[recordName]._$onMessage.bind(this._records[recordName]);
  this._destroyEventEmitter.once('destroy_ack_' + recordName, onMessage);
  this._removeRecord(recordName);
};

/**
 * Callback for 'deleted' and 'discard' events from a record. Removes the record from
 * the registry
 *
 * @param   {String} recordName
 *
 * @returns {void}
 */
RecordHandler.prototype._removeRecord = function (recordName) {
  delete this._records[recordName];
  delete this._lists[recordName];
};

module.exports = RecordHandler;

},{"../constants/constants":11,"../message/message-builder":16,"../message/message-parser":17,"../utils/listener":28,"../utils/single-notifier":30,"./anonymous-record":19,"./list":21,"./record":23,"component-emitter2":1}],23:[function(_dereq_,module,exports){
'use strict';
/* eslint-disable prefer-spread, prefer-rest-params */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var jsonPath = _dereq_('./json-path');
var ResubscribeNotifier = _dereq_('../utils/resubscribe-notifier');
var EventEmitter = _dereq_('component-emitter2');
var C = _dereq_('../constants/constants');
var messageBuilder = _dereq_('../message/message-builder');
var messageParser = _dereq_('../message/message-parser');
var utils = _dereq_('../utils/utils');

/**
 * This class represents a single record - an observable
 * dataset returned by client.record.getRecord()
 *
 * @extends {EventEmitter}
 *
 * @param {String} name              The unique name of the record
 * @param {Object} recordOptions     A map of options, e.g. { persist: true }
 * @param {Connection} Connection    The instance of the server connection
 * @param {Object} options        Deepstream options
 * @param {Client} client        deepstream.io client
 *
 * @constructor
 */
var Record = function Record(name, recordOptions, connection, options, client) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }

  this.name = name;
  this.usages = 0;
  this._recordOptions = recordOptions;
  this._connection = connection;
  this._client = client;
  this._options = options;
  this.isReady = false;
  this.isDestroyed = false;
  this.hasProvider = false;
  this._$data = Object.create(null);
  this.version = null;
  this._eventEmitter = new EventEmitter();
  this._queuedMethodCalls = [];
  this._writeCallbacks = {};

  this._mergeStrategy = null;
  if (options.mergeStrategy) {
    this.setMergeStrategy(options.mergeStrategy);
  }

  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._resubscribeNotifier = new ResubscribeNotifier(this._client, this._sendRead.bind(this));

  this._readAckTimeout = this._ackTimeoutRegistry.add({
    topic: C.TOPIC.RECORD,
    name: name,
    action: C.ACTIONS.SUBSCRIBE,
    timeout: this._options.recordReadAckTimeout
  });
  this._responseTimeout = this._ackTimeoutRegistry.add({
    topic: C.TOPIC.RECORD,
    name: name,
    action: C.ACTIONS.READ,
    event: C.EVENT.RESPONSE_TIMEOUT,
    timeout: this._options.recordReadTimeout
  });
  this._sendRead();
};

EventEmitter(Record.prototype); // eslint-disable-line

/**
 * Set a merge strategy to resolve any merge conflicts that may occur due
 * to offline work or write conflicts. The function will be called with the
 * local record, the remote version/data and a callback to call once the merge has
 * completed or if an error occurs ( which leaves it in an inconsistent state until
 * the next update merge attempt ).
 *
 * @param   {Function} mergeStrategy A Function that can resolve merge issues.
 *
 * @public
 * @returns {void}
 */
Record.prototype.setMergeStrategy = function (mergeStrategy) {
  if (typeof mergeStrategy === 'function') {
    this._mergeStrategy = mergeStrategy;
  } else {
    throw new Error('Invalid merge strategy: Must be a Function');
  }
};

/**
 * Returns a copy of either the entire dataset of the record
 * or - if called with a path - the value of that path within
 * the record's dataset.
 *
 * Returning a copy rather than the actual value helps to prevent
 * the record getting out of sync due to unintentional changes to
 * its data
 *
 * @param   {[String]} path A JSON path, e.g. users[ 2 ].firstname
 *
 * @public
 * @returns {Mixed} value
 */
Record.prototype.get = function (path) {
  return jsonPath.get(this._$data, path, this._options.recordDeepCopy);
};

/**
 * Sets the value of either the entire dataset
 * or of a specific path within the record
 * and submits the changes to the server
 *
 * If the new data is equal to the current data, nothing will happen
 *
 * @param {[String|Object]} pathOrData Either a JSON path when called with
 *                                     two arguments or the data itself
 * @param {Object} data     The data that should be stored in the record
 *
 * @public
 * @returns {void}
 */
Record.prototype.set = function (pathOrData, dataOrCallback, callback) {
  var path = void 0;
  var data = void 0;
  if (arguments.length === 1) {
    // set( object )
    if ((typeof pathOrData === 'undefined' ? 'undefined' : _typeof(pathOrData)) !== 'object') {
      throw new Error('invalid argument data');
    }
    data = pathOrData;
  } else if (arguments.length === 2) {
    if (typeof pathOrData === 'string' && pathOrData.length !== 0 && typeof dataOrCallback !== 'function') {
      // set( path, data )
      path = pathOrData;
      data = dataOrCallback;
    } else if ((typeof pathOrData === 'undefined' ? 'undefined' : _typeof(pathOrData)) === 'object' && typeof dataOrCallback === 'function') {
      // set( data, callback )
      data = pathOrData;
      callback = dataOrCallback; // eslint-disable-line
    } else {
      throw new Error('invalid argument path');
    }
  } else if (arguments.length === 3) {
    // set( path, data, callback )
    if (typeof pathOrData !== 'string' || pathOrData.length === 0 || typeof callback !== 'function') {
      throw new Error('invalid arguments, must pass in a string, a value and a function');
    }
    path = pathOrData;
    data = dataOrCallback;
  }

  if (!path && (data === null || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object')) {
    throw new Error('invalid arguments, scalar values cannot be set without path');
  }

  if (this._checkDestroyed('set')) {
    return this;
  }

  if (!this.isReady) {
    this._queuedMethodCalls.push({ method: 'set', args: arguments });
    return this;
  }

  var oldValue = this._$data;
  var newValue = jsonPath.set(oldValue, path, data, this._options.recordDeepCopy);

  if (oldValue === newValue) {
    if (typeof callback === 'function') {
      var errorMessage = null;
      if (!utils.isConnected(this._client)) {
        errorMessage = 'Connection error: error updating record as connection was closed';
      }
      utils.requestIdleCallback(function () {
        return callback(errorMessage);
      });
    }
    return this;
  }

  var config = void 0;
  if (typeof callback === 'function') {
    config = {};
    config.writeSuccess = true;
    if (!utils.isConnected(this._client)) {
      utils.requestIdleCallback(function () {
        return callback('Connection error: error updating record as connection was closed');
      });
    } else {
      this._setUpCallback(this.version, callback);
    }
  }
  this._sendUpdate(path, data, config);
  this._applyChange(newValue);
  return this;
};

/**
 * Subscribes to changes to the records dataset.
 *
 * Callback is the only mandatory argument.
 *
 * When called with a path, it will only subscribe to updates
 * to that path, rather than the entire record
 *
 * If called with true for triggerNow, the callback will
 * be called immediatly with the current value
 *
 * @param   {[String]}    path      A JSON path within the record to subscribe to
 * @param   {Function}    callback         Callback function to notify on changes
 * @param   {[Boolean]}   triggerNow      A flag to specify whether the callback should
 *                                         be invoked immediatly with the current value
 *
 * @public
 * @returns {void}
 */
// eslint-disable-next-line
Record.prototype.subscribe = function (path, callback, triggerNow) {
  var _this = this;

  var args = this._normalizeArguments(arguments);

  if (args.path !== undefined && (typeof args.path !== 'string' || args.path.length === 0)) {
    throw new Error('invalid argument path');
  }
  if (typeof args.callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  if (this._checkDestroyed('subscribe')) {
    return;
  }

  if (args.triggerNow) {
    this.whenReady(function () {
      _this._eventEmitter.on(args.path, args.callback);
      args.callback(_this.get(args.path));
    });
  } else {
    this._eventEmitter.on(args.path, args.callback);
  }
};

/**
 * Removes a subscription that was previously made using record.subscribe()
 *
 * Can be called with a path to remove the callback for this specific
 * path or only with a callback which removes it from the generic subscriptions
 *
 * Please Note: unsubscribe is a purely client side operation. If the app is no longer
 * interested in receiving updates for this record from the server it needs to call
 * discard instead
 *
 * @param   {[String|Function]}   pathOrCallback A JSON path
 * @param   {Function}         callback     The callback method. Please note, if a bound
 *                                          method was passed to subscribe, the same method
 *                                          must be passed to unsubscribe as well.
 *
 * @public
 * @returns {void}
 */
// eslint-disable-next-line
Record.prototype.unsubscribe = function (pathOrCallback, callback) {
  var args = this._normalizeArguments(arguments);

  if (args.path !== undefined && (typeof args.path !== 'string' || args.path.length === 0)) {
    throw new Error('invalid argument path');
  }
  if (args.callback !== undefined && typeof args.callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  if (this._checkDestroyed('unsubscribe')) {
    return;
  }
  this._eventEmitter.off(args.path, args.callback);
};

/**
 * Removes all change listeners and notifies the server that the client is
 * no longer interested in updates for this record
 *
 * @public
 * @returns {void}
 */
Record.prototype.discard = function () {
  var _this2 = this;

  if (this._checkDestroyed('discard')) {
    return;
  }
  this.whenReady(function () {
    _this2.usages--;
    if (_this2.usages <= 0) {
      _this2.emit('destroyPending');
      _this2._discardTimeout = _this2._ackTimeoutRegistry.add({
        topic: C.TOPIC.RECORD,
        name: _this2.name,
        action: C.ACTIONS.UNSUBSCRIBE
      });
      _this2._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.UNSUBSCRIBE, [_this2.name]);
    }
  });
};

/**
 * Deletes the record on the server.
 *
 * @public
 * @returns {void}
 */
Record.prototype.delete = function () {
  var _this3 = this;

  if (this._checkDestroyed('delete')) {
    return;
  }
  this.whenReady(function () {
    _this3.emit('destroyPending');
    _this3._deleteAckTimeout = _this3._ackTimeoutRegistry.add({
      topic: C.TOPIC.RECORD,
      name: _this3.name,
      action: C.ACTIONS.DELETE,
      event: C.EVENT.DELETE_TIMEOUT,
      timeout: _this3._options.recordDeleteTimeout
    });
    _this3._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.DELETE, [_this3.name]);
  });
};

/**
 * Convenience method, similar to promises. Executes callback
 * whenever the record is ready, either immediatly or once the ready
 * event is fired
 *
 * @param   {Function} callback Will be called when the record is ready
 *
 * @returns {void}
 */
Record.prototype.whenReady = function (callback) {
  if (this.isReady === true) {
    callback(this);
  } else {
    this.once('ready', callback.bind(this, this));
  }
};

/**
 * Callback for incoming messages from the message handler
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @package private
 * @returns {void}
 */
Record.prototype._$onMessage = function (message) {
  if (message.action === C.ACTIONS.READ) {
    if (this.version === null) {
      this._ackTimeoutRegistry.clear(message);
      this._onRead(message);
    } else {
      this._applyUpdate(message, this._client);
    }
  } else if (message.action === C.ACTIONS.ACK) {
    this._processAckMessage(message);
  } else if (message.action === C.ACTIONS.UPDATE || message.action === C.ACTIONS.PATCH) {
    this._applyUpdate(message, this._client);
  } else if (message.action === C.ACTIONS.WRITE_ACKNOWLEDGEMENT) {
    Record._handleWriteAcknowledgements(message, this._writeCallbacks, this._client);
  } else if (message.data[0] === C.EVENT.VERSION_EXISTS) {
    // Otherwise it should be an error, and dealt with accordingly
    this._recoverRecord(message.data[2], JSON.parse(message.data[3]), message);
  } else if (message.data[0] === C.EVENT.MESSAGE_DENIED) {
    this._clearTimeouts();
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_HAS_PROVIDER) {
    var hasProvider = messageParser.convertTyped(message.data[1], this._client);
    this.hasProvider = hasProvider;
    this.emit('hasProviderChanged', hasProvider);
  }
};

Record._handleWriteAcknowledgements = function (message, callbacks, client) {
  var versions = JSON.parse(message.data[1]);
  for (var i = 0; i < versions.length; i++) {
    var callback = callbacks[versions[i]];
    if (callback !== undefined) {
      callback(messageParser.convertTyped(message.data[2], client));
      delete callbacks[versions[i]];
    }
  }
};

/**
 * Called when a merge conflict is detected by a VERSION_EXISTS error or if an update recieved
 * is directly after the clients. If no merge strategy is configure it will emit a VERSION_EXISTS
 * error and the record will remain in an inconsistent state.
 *
 * @param   {Number} remoteVersion The remote version number
 * @param   {Object} remoteData The remote object data
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._recoverRecord = function (remoteVersion, remoteData, message) {
  message.processedError = true;
  if (this._mergeStrategy) {
    this._mergeStrategy(this, remoteData, remoteVersion, this._onRecordRecovered.bind(this, remoteVersion, remoteData, message));
  } else {
    this.emit('error', C.EVENT.VERSION_EXISTS, 'received update for ' + remoteVersion + ' but version is ' + this.version);
  }
};

Record.prototype._sendUpdate = function (path, data, config) {
  this.version++;
  var msgData = void 0;
  if (!path) {
    msgData = config === undefined ? [this.name, this.version, data] : [this.name, this.version, data, config];
    this._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.UPDATE, msgData);
  } else {
    msgData = config === undefined ? [this.name, this.version, path, messageBuilder.typed(data)] : [this.name, this.version, path, messageBuilder.typed(data), config];
    this._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.PATCH, msgData);
  }
};

/**
 * Callback once the record merge has completed. If successful it will set the
 * record state, else emit and error and the record will remain in an
 * inconsistent state until the next update.
 *
 * @param   {Number} remoteVersion The remote version number
 * @param   {Object} remoteData The remote object data
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._onRecordRecovered = function (remoteVersion, remoteData, message, error, data) {
  if (!error) {
    var oldVersion = this.version;
    this.version = remoteVersion;

    var oldValue = this._$data;

    if (utils.deepEquals(oldValue, remoteData)) {
      return;
    }

    var newValue = jsonPath.set(oldValue, undefined, data, false);

    if (utils.deepEquals(data, remoteData)) {
      this._applyChange(data);

      var callback = this._writeCallbacks[remoteVersion];
      if (callback !== undefined) {
        callback(null);
        delete this._writeCallbacks[remoteVersion];
      }
      return;
    }

    var config = message.data[4];
    if (config && JSON.parse(config).writeSuccess) {
      var _callback = this._writeCallbacks[oldVersion];
      delete this._writeCallbacks[oldVersion];
      this._setUpCallback(this.version, _callback);
    }
    this._sendUpdate(undefined, data, config);
    this._applyChange(newValue);
  } else {
    this.emit('error', C.EVENT.VERSION_EXISTS, 'received update for ' + remoteVersion + ' but version is ' + this.version);
  }
};

/**
 * Callback for ack-messages. Acks can be received for
 * subscriptions, discards and deletes
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._processAckMessage = function (message) {
  var acknowledgedAction = message.data[0];

  if (acknowledgedAction === C.ACTIONS.SUBSCRIBE) {
    this._ackTimeoutRegistry.clear(message);
  } else if (acknowledgedAction === C.ACTIONS.DELETE) {
    this.emit('delete');
    this._destroy();
  } else if (acknowledgedAction === C.ACTIONS.UNSUBSCRIBE) {
    this.emit('discard');
    this._destroy();
  }
};

/**
 * Applies incoming updates and patches to the record's dataset
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._applyUpdate = function (message) {
  var version = parseInt(message.data[1], 10);
  var data = void 0;
  if (message.action === C.ACTIONS.PATCH) {
    data = messageParser.convertTyped(message.data[3], this._client);
  } else {
    data = JSON.parse(message.data[2]);
  }

  if (this.version === null) {
    this.version = version;
  } else if (this.version + 1 !== version) {
    if (message.action === C.ACTIONS.PATCH) {
      /**
      * Request a snapshot so that a merge can be done with the read reply which contains
      * the full state of the record
      **/
      this._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.SNAPSHOT, [this.name]);
    } else {
      this._recoverRecord(version, data, message);
    }
    return;
  }

  this.version = version;
  this._applyChange(jsonPath.set(this._$data, message.action === C.ACTIONS.PATCH ? message.data[2] : undefined, data));
};

/**
 * Callback for incoming read messages
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._onRead = function (message) {
  this.version = parseInt(message.data[1], 10);
  this._applyChange(jsonPath.set(this._$data, undefined, JSON.parse(message.data[2])));
  this._setReady();
};

/**
 * Invokes method calls that where queued while the record wasn't ready
 * and emits the ready event
 *
 * @private
 * @returns {void}
 */
Record.prototype._setReady = function () {
  this.isReady = true;
  for (var i = 0; i < this._queuedMethodCalls.length; i++) {
    this[this._queuedMethodCalls[i].method].apply(this, this._queuedMethodCalls[i].args);
  }
  this._queuedMethodCalls = [];
  this.emit('ready');
};

Record.prototype._setUpCallback = function (currentVersion, callback) {
  var newVersion = Number(this.version) + 1;
  this._writeCallbacks[newVersion] = callback;
};

/**
 * Sends the read message, either initially at record
 * creation or after a lost connection has been re-established
 *
 * @private
 * @returns {void}
 */
Record.prototype._sendRead = function () {
  this._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.CREATEORREAD, [this.name]);
};

/**
 * Compares the new values for every path with the previously stored ones and
 * updates the subscribers if the value has changed
 *
 * @private
 * @returns {void}
 */
Record.prototype._applyChange = function (newData) {
  if (this.isDestroyed) {
    return;
  }

  var oldData = this._$data;
  this._$data = newData;

  var paths = this._eventEmitter.eventNames();
  for (var i = 0; i < paths.length; i++) {
    var newValue = jsonPath.get(newData, paths[i], false);
    var oldValue = jsonPath.get(oldData, paths[i], false);

    if (newValue !== oldValue) {
      this._eventEmitter.emit(paths[i], this.get(paths[i]));
    }
  }
};

/**
 * Creates a map based on the types of the provided arguments
 *
 * @param {Arguments} args
 *
 * @private
 * @returns {Object} arguments map
 */
Record.prototype._normalizeArguments = function (args) {
  // If arguments is already a map of normalized parameters
  // (e.g. when called by AnonymousRecord), just return it.
  if (args.length === 1 && _typeof(args[0]) === 'object') {
    return args[0];
  }

  var result = Object.create(null);

  for (var i = 0; i < args.length; i++) {
    if (typeof args[i] === 'string') {
      result.path = args[i];
    } else if (typeof args[i] === 'function') {
      result.callback = args[i];
    } else if (typeof args[i] === 'boolean') {
      result.triggerNow = args[i];
    }
  }

  return result;
};

/**
 * Clears all timeouts that are set when the record is created
 *
 * @private
 * @returns {void}
 */
Record.prototype._clearTimeouts = function () {
  this._ackTimeoutRegistry.remove({ ackId: this._readAckTimeout, silent: true });
  this._ackTimeoutRegistry.remove({ ackId: this._responseTimeout, silent: true });
  this._ackTimeoutRegistry.remove({ ackId: this._deleteAckTimeout, silent: true });
  this._ackTimeoutRegistry.remove({ ackId: this._discardTimeout, silent: true });
};

/**
 * A quick check that's carried out by most methods that interact with the record
 * to make sure it hasn't been destroyed yet - and to handle it gracefully if it has.
 *
 * @param   {String} methodName The name of the method that invoked this check
 *
 * @private
 * @returns {Boolean} is destroyed
 */
Record.prototype._checkDestroyed = function (methodName) {
  if (this.isDestroyed) {
    this.emit('error', 'Can\'t invoke \'' + methodName + '\'. Record \'' + this.name + '\' is already destroyed');
    return true;
  }

  return false;
};

/**
 * Destroys the record and nulls all
 * its dependencies
 *
 * @private
 * @returns {void}
 */
Record.prototype._destroy = function () {
  this._clearTimeouts();
  this._eventEmitter.off();
  this._resubscribeNotifier.destroy();
  this.isDestroyed = true;
  this.isReady = false;
  this._client = null;
  this._eventEmitter = null;
  this._connection = null;
};

module.exports = Record;

},{"../constants/constants":11,"../message/message-builder":16,"../message/message-parser":17,"../utils/resubscribe-notifier":29,"../utils/utils":31,"./json-path":20,"component-emitter2":1}],24:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('../constants/constants');
var ResubscribeNotifier = _dereq_('../utils/resubscribe-notifier');
var RpcResponse = _dereq_('./rpc-response');
var Rpc = _dereq_('./rpc');
var messageParser = _dereq_('../message/message-parser');
var messageBuilder = _dereq_('../message/message-builder');

/**
 * The main class for remote procedure calls
 *
 * Provides the rpc interface and handles incoming messages
 * on the rpc topic
 *
 * @param {Object} options deepstream configuration options
 * @param {Connection} connection
 * @param {Client} client
 *
 * @constructor
 * @public
 */
var RpcHandler = function RpcHandler(options, connection, client) {
  this._options = options;
  this._connection = connection;
  this._client = client;
  this._rpcs = {};
  this._providers = {};
  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._resubscribeNotifier = new ResubscribeNotifier(this._client, this._reprovide.bind(this));
};

/**
 * Registers a callback function as a RPC provider. If another connected client calls
 * client.rpc.make() the request will be routed to this method
 *
 * The callback will be invoked with two arguments:
 *     {Mixed} data The data passed to the client.rpc.make function
 *     {RpcResponse} rpcResponse An object with methods to response,
 *                               acknowledge or reject the request
 *
 * Only one callback can be registered for a RPC at a time
 *
 * Please note: Deepstream tries to deliver data in its original format.
 * Data passed to client.rpc.make as a String will arrive as a String,
 * numbers or implicitly JSON serialized objects will arrive in their
 * respective format as well
 *
 * @public
 * @returns void
 */
RpcHandler.prototype.provide = function (name, callback) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }
  if (this._providers[name]) {
    throw new Error('RPC ' + name + ' already registered');
  }
  if (typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  this._ackTimeoutRegistry.add({
    topic: C.TOPIC.RPC,
    name: name,
    action: C.ACTIONS.SUBSCRIBE
  });
  this._providers[name] = callback;
  this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.SUBSCRIBE, [name]);
};

/**
 * Unregisters this client as a provider for a remote procedure call
 *
 * @param   {String} name the name of the rpc
 *
 * @public
 * @returns {void}
 */
RpcHandler.prototype.unprovide = function (name) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }

  if (this._providers[name]) {
    delete this._providers[name];
    this._ackTimeoutRegistry.add({
      topic: C.TOPIC.RPC,
      name: name,
      action: C.ACTIONS.UNSUBSCRIBE
    });
    this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.UNSUBSCRIBE, [name]);
  }
};

/**
 * Executes the actual remote procedure call
 *
 * @param   {String}   name     The name of the rpc
 * @param   {Mixed}    data     Serializable data that will be passed to the provider
 * @param   {Function} callback Will be invoked with the returned result or if the rpc failed
 *                              receives to arguments: error or null and the result
 *
 * @public
 * @returns {void}
 */
RpcHandler.prototype.make = function (name, data, callback) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }
  if (typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  var uid = this._client.getUid();
  var typedData = messageBuilder.typed(data);

  this._rpcs[uid] = new Rpc(name, callback, this._options, this._client);
  this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.REQUEST, [name, uid, typedData]);
};

/**
 * Retrieves a RPC instance for a correlationId or throws an error
 * if it can't be found (which should never happen)
 *
 * @param {String} correlationId
 * @param {String} rpcName
 *
 * @private
 * @returns {Rpc}
 */
RpcHandler.prototype._getRpc = function (correlationId, rpcName, rawMessage) {
  var rpc = this._rpcs[correlationId];

  if (!rpc) {
    this._client._$onError(C.TOPIC.RPC, C.EVENT.UNSOLICITED_MESSAGE, rawMessage);
    return null;
  }

  return rpc;
};

/**
 * Handles incoming rpc REQUEST messages. Instantiates a new response object
 * and invokes the provider callback or rejects the request if no rpc provider
 * is present (which shouldn't really happen, but might be the result of a race condition
 * if this client sends a unprovide message whilst an incoming request is already in flight)
 *
 * @param   {Object} message The parsed deepstream RPC request message.
 *
 * @private
 * @returns {void}
 */
RpcHandler.prototype._respondToRpc = function (message) {
  var name = message.data[0];
  var correlationId = message.data[1];
  var data = null;
  var response = void 0;

  if (message.data[2]) {
    data = messageParser.convertTyped(message.data[2], this._client);
  }

  if (this._providers[name]) {
    response = new RpcResponse(this._connection, name, correlationId);
    this._providers[name](data, response);
  } else {
    this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.REJECTION, [name, correlationId]);
  }
};

/**
 * Distributes incoming messages from the server
 * based on their action
 *
 * @param   {Object} message A parsed deepstream message
 *
 * @private
 * @returns {void}
 */
RpcHandler.prototype._$handle = function (message) {
  var rpcName = void 0;
  var correlationId = void 0;

  // RPC Requests
  if (message.action === C.ACTIONS.REQUEST) {
    this._respondToRpc(message);
    return;
  }

  // RPC subscription Acks
  if (message.action === C.ACTIONS.ACK && (message.data[0] === C.ACTIONS.SUBSCRIBE || message.data[0] === C.ACTIONS.UNSUBSCRIBE)) {
    this._ackTimeoutRegistry.clear(message);
    return;
  }

  // handle auth/denied subscription errors
  if (message.action === C.ACTIONS.ERROR) {
    if (message.data[0] === C.EVENT.MESSAGE_PERMISSION_ERROR) {
      return;
    }
    if (message.data[0] === C.EVENT.MESSAGE_DENIED && message.data[2] === C.ACTIONS.SUBSCRIBE) {
      this._ackTimeoutRegistry.remove({
        topic: C.TOPIC.RPC,
        action: C.ACTIONS.SUBSCRIBE,
        name: message.data[1]
      });
      return;
    }
  }

  /*
   * Error messages always have the error as first parameter. So the
   * order is different to ack and response messages
   */
  if (message.action === C.ACTIONS.ERROR || message.action === C.ACTIONS.ACK) {
    if (message.data[0] === C.EVENT.MESSAGE_DENIED && message.data[2] === C.ACTIONS.REQUEST) {
      correlationId = message.data[3];
    } else {
      correlationId = message.data[2];
    }
    rpcName = message.data[1];
  } else {
    rpcName = message.data[0];
    correlationId = message.data[1];
  }

  /*
  * Retrieve the rpc object
  */
  var rpc = this._getRpc(correlationId, rpcName, message.raw);
  if (rpc === null) {
    return;
  }

  // RPC Responses
  if (message.action === C.ACTIONS.ACK) {
    rpc.ack();
  } else if (message.action === C.ACTIONS.RESPONSE) {
    rpc.respond(message.data[2]);
    delete this._rpcs[correlationId];
  } else if (message.action === C.ACTIONS.ERROR) {
    message.processedError = true;
    rpc.error(message.data[0]);
    delete this._rpcs[correlationId];
  }
};

/**
 * Reregister providers to events when connection is lost
 *
 * @package private
 * @returns {void}
 */
RpcHandler.prototype._reprovide = function () {
  for (var rpcName in this._providers) {
    this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.SUBSCRIBE, [rpcName]);
  }
};

module.exports = RpcHandler;

},{"../constants/constants":11,"../message/message-builder":16,"../message/message-parser":17,"../utils/resubscribe-notifier":29,"./rpc":26,"./rpc-response":25}],25:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('../constants/constants');
var utils = _dereq_('../utils/utils');
var messageBuilder = _dereq_('../message/message-builder');

/**
 * This object provides a number of methods that allow a rpc provider
 * to respond to a request
 *
 * @param {Connection} connection - the clients connection object
 * @param {String} name the name of the rpc
 * @param {String} correlationId the correlationId for the RPC
 */
var RpcResponse = function RpcResponse(connection, name, correlationId) {
  this._connection = connection;
  this._name = name;
  this._correlationId = correlationId;
  this._isAcknowledged = false;
  this._isComplete = false;
  this.autoAck = true;
  utils.nextTick(this._performAutoAck.bind(this));
};

/**
 * Acknowledges the receipt of the request. This
 * will happen implicitly unless the request callback
 * explicitly sets autoAck to false
 *
 * @public
 * @returns   {void}
 */
RpcResponse.prototype.ack = function () {
  if (this._isAcknowledged === false) {
    this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.ACK, [C.ACTIONS.REQUEST, this._name, this._correlationId]);
    this._isAcknowledged = true;
  }
};

/**
 * Reject the request. This might be necessary if the client
 * is already processing a large number of requests. If deepstream
 * receives a rejection message it will try to route the request to
 * another provider - or return a NO_RPC_PROVIDER error if there are no
 * providers left
 *
 * @public
 * @returns  {void}
 */
RpcResponse.prototype.reject = function () {
  this.autoAck = false;
  this._isComplete = true;
  this._isAcknowledged = true;
  this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.REJECTION, [this._name, this._correlationId]);
};

/**
 * Notifies the server that an error has occured while trying to process the request.
 * This will complete the rpc.
 *
 * @param {String} errorMsg the message used to describe the error that occured
 * @public
 * @returns  {void}
 */
RpcResponse.prototype.error = function (errorMsg) {
  this.autoAck = false;
  this._isComplete = true;
  this._isAcknowledged = true;
  this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.ERROR, [errorMsg, this._name, this._correlationId]);
};

/**
 * Completes the request by sending the response data
 * to the server. If data is an array or object it will
 * automatically be serialised.
 * If autoAck is disabled and the response is sent before
 * the ack message the request will still be completed and the
 * ack message ignored
 *
 * @param {String} data the data send by the provider. Might be JSON serialized
 *
 * @public
 * @returns {void}
 */
RpcResponse.prototype.send = function (data) {
  if (this._isComplete === true) {
    throw new Error('Rpc ' + this._name + ' already completed');
  }
  this.ack();

  var typedData = messageBuilder.typed(data);
  this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.RESPONSE, [this._name, this._correlationId, typedData]);
  this._isComplete = true;
};

/**
 * Callback for the autoAck timeout. Executes ack
 * if autoAck is not disabled
 *
 * @private
 * @returns {void}
 */
RpcResponse.prototype._performAutoAck = function () {
  if (this.autoAck === true) {
    this.ack();
  }
};

module.exports = RpcResponse;

},{"../constants/constants":11,"../message/message-builder":16,"../utils/utils":31}],26:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('../constants/constants');
var messageParser = _dereq_('../message/message-parser');

/**
 * This class represents a single remote procedure
 * call made from the client to the server. It's main function
 * is to encapsulate the logic around timeouts and to convert the
 * incoming response data
 *
 * @param {Object}   options           deepstream client config
 * @param {Function} callback          the function that will be called once the request
 *                                     is complete or failed
 * @param {Client} client
 *
 * @constructor
 */
var Rpc = function Rpc(name, callback, options, client) {
  this._options = options;
  this._callback = callback;
  this._client = client;
  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._ackTimeout = this._ackTimeoutRegistry.add({
    topic: C.TOPIC.RPC,
    action: C.ACTIONS.ACK,
    name: name,
    timeout: this._options.rpcAckTimeout,
    callback: this.error.bind(this)
  });
  this._responseTimeout = this._ackTimeoutRegistry.add({
    topic: C.TOPIC.RPC,
    action: C.ACTIONS.REQUEST,
    name: name,
    event: C.EVENT.RESPONSE_TIMEOUT,
    timeout: this._options.rpcResponseTimeout,
    callback: this.error.bind(this)
  });
};

/**
 * Called once an ack message is received from the server
 *
 * @public
 * @returns {void}
 */
Rpc.prototype.ack = function () {
  this._ackTimeoutRegistry.remove({
    ackId: this._ackTimeout
  });
};

/**
 * Called once a response message is received from the server.
 * Converts the typed data and completes the request
 *
 * @param   {String} data typed value
 *
 * @public
 * @returns {void}
 */
Rpc.prototype.respond = function (data) {
  var convertedData = messageParser.convertTyped(data, this._client);
  this._callback(null, convertedData);
  this._complete();
};

/**
 * Callback for error messages received from the server. Once
 * an error is received the request is considered completed. Even
 * if a response arrives later on it will be ignored / cause an
 * UNSOLICITED_MESSAGE error
 *
 * @param   {String} errorMsg @TODO should be CODE and message
 *
 * @public
 * @returns {void}
 */
Rpc.prototype.error = function (timeout) {
  this._callback(timeout.event || timeout);
  this._complete();
};

/**
 * Called after either an error or a response
 * was received
 *
 * @private
 * @returns {void}
 */
Rpc.prototype._complete = function () {
  this._ackTimeoutRegistry.remove({
    ackId: this._ackTimeout
  });
  this._ackTimeoutRegistry.remove({
    ackId: this._responseTimeout
  });
};

module.exports = Rpc;

},{"../constants/constants":11,"../message/message-parser":17}],27:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('../constants/constants');
var EventEmitter = _dereq_('component-emitter2');

/**
 * Subscriptions to events are in a pending state until deepstream acknowledges
 * them. This is a pattern that's used by numerour classes. This registry aims
 * to centralise the functionality necessary to keep track of subscriptions and
 * their respective timeouts.
 *
 * @param {Client} client          The deepstream client
 * @param {String} topic           Constant. One of C.TOPIC
 * @param {Number} timeoutDuration The duration of the timeout in milliseconds
 *
 * @extends {EventEmitter}
 * @constructor
 */
var AckTimeoutRegistry = function AckTimeoutRegistry(client, options) {
  this._options = options;
  this._client = client;
  this._register = {};
  this._counter = 1;
  client.on('connectionStateChanged', this._onConnectionStateChanged.bind(this));
};

EventEmitter(AckTimeoutRegistry.prototype); // eslint-disable-line

/**
 * Add an entry
 *
 * @param {String} name An identifier for the subscription, e.g. a record name or an event name.
 *
 * @public
 * @returns {Number} The timeout identifier
 */
AckTimeoutRegistry.prototype.add = function (timeout) {
  var timeoutDuration = timeout.timeout || this._options.subscriptionTimeout;

  if (this._client.getConnectionState() !== C.CONNECTION_STATE.OPEN || timeoutDuration < 1) {
    return -1;
  }

  this.remove(timeout);
  timeout.ackId = this._counter++;
  timeout.event = timeout.event || C.EVENT.ACK_TIMEOUT;
  timeout.__timeout = setTimeout(this._onTimeout.bind(this, timeout), timeoutDuration);
  this._register[this._getUniqueName(timeout)] = timeout;
  return timeout.ackId;
};

/**
 * Remove an entry
 *
 * @param {String} name An identifier for the subscription, e.g. a record name or an event name.
 *
 * @public
 * @returns {void}
 */
AckTimeoutRegistry.prototype.remove = function (timeout) {
  if (timeout.ackId) {
    for (var uniqueName in this._register) {
      if (timeout.ackId === this._register[uniqueName].ackId) {
        this.clear({
          topic: this._register[uniqueName].topic,
          action: this._register[uniqueName].action,
          data: [this._register[uniqueName].name]
        });
      }
    }
  }

  if (this._register[this._getUniqueName(timeout)]) {
    this.clear({
      topic: timeout.topic,
      action: timeout.action,
      data: [timeout.name]
    });
  }
};

/**
 * Processes an incoming ACK-message and removes the corresponding subscription
 *
 * @param   {Object} message A parsed deepstream ACK message
 *
 * @public
 * @returns {void}
 */
AckTimeoutRegistry.prototype.clear = function (message) {
  var uniqueName = void 0;
  if (message.action === C.ACTIONS.ACK && message.data.length > 1) {
    uniqueName = message.topic + message.data[0] + (message.data[1] ? message.data[1] : '');
  } else {
    uniqueName = message.topic + message.action + message.data[0];
  }

  if (this._register[uniqueName]) {
    clearTimeout(this._register[uniqueName].__timeout);
  }

  delete this._register[uniqueName];
};

/**
 * Will be invoked if the timeout has occured before the ack message was received
 *
 * @param {Object} name The timeout object registered
 *
 * @private
 * @returns {void}
 */
AckTimeoutRegistry.prototype._onTimeout = function (timeout) {
  delete this._register[this._getUniqueName(timeout)];

  if (timeout.callback) {
    delete timeout.__timeout;
    delete timeout.timeout;
    timeout.callback(timeout);
  } else {
    var msg = 'No ACK message received in time' + (timeout.name ? ' for ' + timeout.name : '');
    this._client._$onError(timeout.topic, timeout.event, msg);
  }
};

/**
 * Returns a unique name from the timeout
 *
 * @private
 * @returns {void}
 */
AckTimeoutRegistry.prototype._getUniqueName = function (timeout) {
  return timeout.topic + timeout.action + (timeout.name ? timeout.name : '');
};

/**
 * Remote all timeouts when connection disconnects
 *
 * @private
 * @returns {void}
 */
AckTimeoutRegistry.prototype._onConnectionStateChanged = function (connectionState) {
  if (connectionState !== C.CONNECTION_STATE.OPEN) {
    for (var uniqueName in this._register) {
      clearTimeout(this._register[uniqueName].__timeout);
    }
  }
};

module.exports = AckTimeoutRegistry;

},{"../constants/constants":11,"component-emitter2":1}],28:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('../constants/constants');
var ResubscribeNotifier = _dereq_('./resubscribe-notifier');

/*
 * Creates a listener instance which is usedby deepstream Records and Events.
 *
 * @param {String} topic                 One of CONSTANTS.TOPIC
 * @param {String} pattern              A pattern that can be compiled via new RegExp(pattern)
 * @param {Function} callback           The function which is called when pattern was found and
 *                                      removed
 * @param {Connection} Connection       The instance of the server connection
 * @param {Object} options              Deepstream options
 * @param {Client} client               deepstream.io client
 *
 * @constructor
 */
var Listener = function Listener(topic, pattern, callback, options, client, connection) {
  this._topic = topic;
  this._callback = callback;
  this._pattern = pattern;
  this._options = options;
  this._client = client;
  this._connection = connection;
  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._ackTimeoutRegistry.add({
    topic: this._topic,
    name: pattern,
    action: C.ACTIONS.LISTEN
  });

  this._resubscribeNotifier = new ResubscribeNotifier(client, this._sendListen.bind(this));
  this._sendListen();
  this.destroyPending = false;
};

Listener.prototype.sendDestroy = function () {
  this.destroyPending = true;
  this._connection.sendMsg(this._topic, C.ACTIONS.UNLISTEN, [this._pattern]);
  this._resubscribeNotifier.destroy();
};

/*
 * Resets internal properties. Is called when provider cals unlisten.
 *
 * @returns {void}
 */
Listener.prototype.destroy = function () {
  this._callback = null;
  this._pattern = null;
  this._client = null;
  this._connection = null;
};

/*
 * Accepting a listener request informs deepstream that the current provider is willing to
 * provide the record or event matching the subscriptionName . This will establish the current
 * provider as the only publisher for the actual subscription with the deepstream cluster.
 * Either accept or reject needs to be called by the listener, otherwise it prints out a
 * deprecated warning.
 *
 * @returns {void}
 */
Listener.prototype.accept = function (name) {
  this._connection.sendMsg(this._topic, C.ACTIONS.LISTEN_ACCEPT, [this._pattern, name]);
};

/*
 * Rejecting a listener request informs deepstream that the current provider is not willing
 * to provide the record or event matching the subscriptionName . This will result in deepstream
 * requesting another provider to do so instead. If no other provider accepts or exists, the
 * record will remain unprovided.
 * Either accept or reject needs to be called by the listener, otherwise it prints out a
 * deprecated warning.
 *
 * @returns {void}
 */
Listener.prototype.reject = function (name) {
  this._connection.sendMsg(this._topic, C.ACTIONS.LISTEN_REJECT, [this._pattern, name]);
};

/*
 * Wraps accept and reject as an argument for the callback function.
 *
 * @private
 * @returns {Object}
 */
Listener.prototype._createCallbackResponse = function (message) {
  return {
    accept: this.accept.bind(this, message.data[1]),
    reject: this.reject.bind(this, message.data[1])
  };
};

/*
 * Handles the incomming message.
 *
 * @private
 * @returns {void}
 */
Listener.prototype._$onMessage = function (message) {
  if (message.action === C.ACTIONS.ACK) {
    this._ackTimeoutRegistry.clear(message);
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND) {
    this._callback(message.data[1], true, this._createCallbackResponse(message));
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED) {
    this._callback(message.data[1], false);
  } else {
    this._client._$onError(this._topic, C.EVENT.UNSOLICITED_MESSAGE, message.data[0] + '|' + message.data[1]);
  }
};

/*
 * Sends a C.ACTIONS.LISTEN to deepstream.
 *
 * @private
 * @returns {void}
 */
Listener.prototype._sendListen = function () {
  this._connection.sendMsg(this._topic, C.ACTIONS.LISTEN, [this._pattern]);
};

module.exports = Listener;

},{"../constants/constants":11,"./resubscribe-notifier":29}],29:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('../constants/constants');

/**
 * Makes sure that all functionality is resubscribed on reconnect. Subscription is called
 * when the connection drops - which seems counterintuitive, but in fact just means
 * that the re-subscription message will be added to the queue of messages that
 * need re-sending as soon as the connection is re-established.
 *
 * Resubscribe logic should only occur once per connection loss
 *
 * @param {Client} client          The deepstream client
 * @param {Function} reconnect     Function to call to allow resubscribing
 *
 * @constructor
 */
var ResubscribeNotifier = function ResubscribeNotifier(client, resubscribe) {
  this._client = client;
  this._resubscribe = resubscribe;

  this._isReconnecting = false;
  this._connectionStateChangeHandler = this._handleConnectionStateChanges.bind(this);
  this._client.on('connectionStateChanged', this._connectionStateChangeHandler);
};

/**
 * Call this whenever this functionality is no longer needed to remove links
 *
 * @returns {void}
 */
ResubscribeNotifier.prototype.destroy = function () {
  this._client.removeListener('connectionStateChanged', this._connectionStateChangeHandler);
  this._connectionStateChangeHandler = null;
  this._client = null;
};

/**
* Check whenever the connection state changes if it is in reconnecting to resubscribe
* @private
* @returns {void}
*/
ResubscribeNotifier.prototype._handleConnectionStateChanges = function () {
  var state = this._client.getConnectionState();

  if (state === C.CONNECTION_STATE.RECONNECTING && this._isReconnecting === false) {
    this._isReconnecting = true;
  }
  if (state === C.CONNECTION_STATE.OPEN && this._isReconnecting === true) {
    this._isReconnecting = false;
    this._resubscribe();
  }
};

module.exports = ResubscribeNotifier;

},{"../constants/constants":11}],30:[function(_dereq_,module,exports){
'use strict';

var C = _dereq_('../constants/constants');
var ResubscribeNotifier = _dereq_('./resubscribe-notifier');

/**
 * Provides a scaffold for subscriptionless requests to deepstream, such as the SNAPSHOT
 * and HAS functionality. The SingleNotifier multiplexes all the client requests so
 * that they can can be notified at once, and also includes reconnection funcionality
 * incase the connection drops.
 *
 * @param {Client} client          The deepstream client
 * @param {Connection} connection  The deepstream connection
 * @param {String} topic           Constant. One of C.TOPIC
 * @param {String} action          Constant. One of C.ACTIONS
 * @param {Number} timeoutDuration The duration of the timeout in milliseconds
 *
 * @constructor
 */
var SingleNotifier = function SingleNotifier(client, connection, topic, action, timeoutDuration) {
  this._client = client;
  this._connection = connection;
  this._topic = topic;
  this._action = action;
  this._timeoutDuration = timeoutDuration;
  this._requests = {};
  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._resubscribeNotifier = new ResubscribeNotifier(this._client, this._resendRequests.bind(this));
  this._onResponseTimeout = this._onResponseTimeout.bind(this);
};

/**
 * Check if there is a request pending with a specified name
 *
 * @param {String} name An identifier for the request, e.g. a record name
 *
 * @public
 * @returns {void}
 */
SingleNotifier.prototype.hasRequest = function (name) {
  return !!this._requests[name];
};

/**
 * Add a request. If one has already been made it will skip the server request
 * and multiplex the response
 *
 * @param {String} name An identifier for the request, e.g. a record name

 *
 * @public
 * @returns {void}
 */
SingleNotifier.prototype.request = function (name, callback) {
  if (!this._requests[name]) {
    this._requests[name] = [];
    this._connection.sendMsg(this._topic, this._action, [name]);
  }

  var ackId = this._ackTimeoutRegistry.add({
    topic: this._topic,
    event: C.EVENT.RESPONSE_TIMEOUT,
    name: name,
    action: this._action,
    timeout: this._timeoutDuration,
    callback: this._onResponseTimeout
  });
  this._requests[name].push({ callback: callback, ackId: ackId });
};

/**
 * Process a response for a request. This has quite a flexible API since callback functions
 * differ greatly and helps maximise reuse.
 *
 * @param {String} name An identifier for the request, e.g. a record name
 * @param {String} error Error message
 * @param {Object} data If successful, the response data
 *
 * @public
 * @returns {void}
 */
SingleNotifier.prototype.recieve = function (name, error, data) {
  var entries = this._requests[name];

  if (!entries) {
    this._client._$onError(this._topic, C.EVENT.UNSOLICITED_MESSAGE, 'no entry for ' + name);
    return;
  }

  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    this._ackTimeoutRegistry.remove({
      ackId: entry.ackId
    });
    entry.callback(error, data);
  }
  delete this._requests[name];
};

/**
 * Will be invoked if a timeout occurs before a response arrives from the server
 *
 * @param {String} name An identifier for the request, e.g. a record name
 *
 * @private
 * @returns {void}
 */
SingleNotifier.prototype._onResponseTimeout = function (timeout) {
  var msg = 'No response received in time for ' + this._topic + '|' + this._action + '|' + timeout.name;
  this._client._$onError(this._topic, C.EVENT.RESPONSE_TIMEOUT, msg);
};

/**
 * Resends all the requests once the connection is back up
 *
 * @private
 * @returns {void}
 */
SingleNotifier.prototype._resendRequests = function () {
  for (var request in this._requests) {
    this._connection.sendMsg(this._topic, this._action, [request]);
  }
};

module.exports = SingleNotifier;

},{"../constants/constants":11,"./resubscribe-notifier":29}],31:[function(_dereq_,module,exports){
(function (process){
'use strict';
/* eslint-disable valid-typeof */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var C = _dereq_('../constants/constants');

/**
 * A regular expression that matches whitespace on either side, but
 * not in the center of a string
 *
 * @type {RegExp}
 */
var TRIM_REGULAR_EXPRESSION = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

/**
 * Used in typeof comparisons
 *
 * @type {String}
 */
var OBJECT = 'object';

/**
 * True if environment is node, false if it's a browser
 * This seems somewhat inelegant, if anyone knows a better solution,
 * let's change this (must identify browserify's pseudo node implementation though)
 *
 * @public
 * @type {Boolean}
 */
exports.isNode = typeof process !== 'undefined' && process.toString() === '[object process]';

/**
 * Provides as soon as possible async execution in a cross
 * platform way
 *
 * @param   {Function} fn the function to be executed in an asynchronous fashion
 *
 * @public
 * @returns {void}
 */
exports.nextTick = function (fn) {
  if (exports.isNode) {
    process.nextTick(fn);
  } else {
    setTimeout(fn, 0);
  }
};

/**
 * Removes whitespace from the beginning and end of a string
 *
 * @param   {String} inputString
 *
 * @public
 * @returns {String} trimmedString
 */
exports.trim = function (inputString) {
  if (inputString.trim) {
    return inputString.trim();
  }
  return inputString.replace(TRIM_REGULAR_EXPRESSION, '');
};

/**
 * Compares two objects for deep (recoursive) equality
 *
 * This used to be a significantly more complex custom implementation,
 * but JSON.stringify has gotten so fast that it now outperforms the custom
 * way by a factor of 1.5 to 3.
 *
 * In IE11 / Edge the custom implementation is still slightly faster, but for
 * consistencies sake and the upsides of leaving edge-case handling to the native
 * browser / node implementation we'll go for JSON.stringify from here on.
 *
 * Please find performance test results here
 *
 * http://jsperf.com/deep-equals-code-vs-json
 *
 * @param   {Mixed} objA
 * @param   {Mixed} objB
 *
 * @public
 * @returns {Boolean} isEqual
 */
exports.deepEquals = function (objA, objB) {
  if (objA === objB) {
    return true;
  } else if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== OBJECT || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== OBJECT) {
    return false;
  }

  return JSON.stringify(objA) === JSON.stringify(objB);
};

/**
 * Similar to deepEquals above, tests have shown that JSON stringify outperforms any attempt of
 * a code based implementation by 50% - 100% whilst also handling edge-cases and keeping
 * implementation complexity low.
 *
 * If ES6/7 ever decides to implement deep copying natively (what happened to Object.clone?
 * that was briefly a thing...), let's switch it for the native implementation. For now though,
 * even Object.assign({}, obj) only provides a shallow copy.
 *
 * Please find performance test results backing these statements here:
 *
 * http://jsperf.com/object-deep-copy-assign
 *
 * @param   {Mixed} obj the object that should be cloned
 *
 * @public
 * @returns {Mixed} clone
 */
exports.deepCopy = function (obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === OBJECT) {
    return JSON.parse(JSON.stringify(obj));
  }
  return obj;
};

/**
 * Copy the top level of items, but do not copy its items recourisvely. This
 * is much quicker than deepCopy does not guarantee the object items are new/unique.
 * Mainly used to change the reference to the actual object itself, but not its children.
 *
 * @param   {Mixed} obj the object that should cloned
 *
 * @public
 * @returns {Mixed} clone
 */
exports.shallowCopy = function (obj) {
  if (Array.isArray(obj)) {
    return obj.slice(0);
  } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === OBJECT) {
    var copy = Object.create(null);
    var props = Object.keys(obj);
    for (var i = 0; i < props.length; i++) {
      copy[props[i]] = obj[props[i]];
    }
    return copy;
  }
  return obj;
};

/**
 * Set timeout utility that adds support for disabling a timeout
 * by passing null
 *
 * @param {Function} callback        the function that will be called after the given time
 * @param {Number}   timeoutDuration the duration of the timeout in milliseconds
 *
 * @public
 * @returns {Number} timeoutId
 */
exports.setTimeout = function (callback, timeoutDuration) {
  if (timeoutDuration !== null) {
    return setTimeout(callback, timeoutDuration);
  }
  return -1;
};

/**
 * Set Interval utility that adds support for disabling an interval
 * by passing null
 *
 * @param {Function} callback        the function that will be called after the given time
 * @param {Number}   intervalDuration the duration of the interval in milliseconds
 *
 * @public
 * @returns {Number} intervalId
 */
exports.setInterval = function (callback, intervalDuration) {
  if (intervalDuration !== null) {
    return setInterval(callback, intervalDuration);
  }
  return -1;
};

/**
 * This method is used to break up long running operations and run a callback function immediately
 * after the browser has completed other operations such as events and display updates.
 *
 * @param {Function} callback        the function that will be called after the given time
 * @param {...*}     param1, ..., paramN additional parameters which are passed through to the
 *                                     callback
 *
 * @public
 */
exports.requestIdleCallback = !exports.isNode && window.requestIdleCallback && window.requestIdleCallback.bind(window) || function (cb) {
  var start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.cancelIdleCallback = !exports.isNode && window.cancelIdleCallback && window.cancelIdleCallback.bind(window) || function (id) {
  clearTimeout(id);
};

/**
 * Used to see if a protocol is specified within the url
 * @type {RegExp}
 */
var hasUrlProtocol = /^wss:|^ws:|^\/\//;

/**
 * Used to see if the protocol contains any unsupported protocols
 * @type {RegExp}
 */
var unsupportedProtocol = /^http:|^https:/;

var URL = _dereq_('url');

/**
 * Take the url passed when creating the client and ensure the correct
 * protocol is provided
 * @param  {String} url Url passed in by client
 * @return {String} Url with supported protocol
 */
exports.parseUrl = function (initialURl, defaultPath) {
  var url = initialURl;
  if (unsupportedProtocol.test(url)) {
    throw new Error('Only ws and wss are supported');
  }
  if (!hasUrlProtocol.test(url)) {
    url = 'ws://' + url;
  } else if (url.indexOf('//') === 0) {
    url = 'ws:' + url;
  }
  var serverUrl = URL.parse(url);
  if (!serverUrl.host) {
    throw new Error('invalid url, missing host');
  }
  serverUrl.protocol = serverUrl.protocol ? serverUrl.protocol : 'ws:';
  serverUrl.pathname = serverUrl.pathname ? serverUrl.pathname : defaultPath;
  return URL.format(serverUrl);
};

/**
 * Returns true is the connection state is OPEN
 * @return {Boolean}
 */
exports.isConnected = function (client) {
  var connectionState = client.getConnectionState();
  return connectionState === C.CONNECTION_STATE.OPEN;
};

}).call(this,_dereq_('_process'))
},{"../constants/constants":11,"_process":3,"url":8}]},{},[10])(10)
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(86)))

/***/ }),

/***/ 86:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDAwZGQ0MWI2MmNlOGRhMTYzM2IiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlZXBzdHJlYW0uaW8tY2xpZW50LWpzL2Rpc3QvZGVlcHN0cmVhbS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OzswREM3REEseUJBQWEsU0FBMkQsbUJBQW1CLGdEQUFnRCxhQUFhLEtBQUssTUFBTSxnQ0FBZ0MsU0FBUyxxQ0FBcUMsU0FBUyxtQ0FBbUMsT0FBTyxLQUFLLE9BQU8sb0JBQW9CLGFBQWEsMEJBQTBCLDBCQUEwQixnQkFBZ0IsVUFBVSxVQUFVLDBDQUEwQyw4QkFBd0Isb0JBQW9CLDhDQUE4QyxrQ0FBa0MsWUFBWSxZQUFZLG1DQUFtQyxpQkFBaUIsZ0JBQWdCLHNCQUFzQixvQkFBb0IsMENBQTBDLFlBQVksV0FBVyxZQUFZLFNBQVMsR0FBRzs7QUFFOXlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsU0FBUztBQUNwQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsU0FBUztBQUNwQixZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxNQUFNO0FBQ2pCLFlBQVk7QUFDWjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQ0FBMkMsU0FBUztBQUNwRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEdBQUc7O0FBRUosQ0FBQyxHQUFHO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVELENBQUMscUlBQXFJO0FBQ3RJLENBQUMsR0FBRztBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEdBQUc7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGVBQWU7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxHQUFHO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQSxDQUFDLEVBQUUsMEJBQTBCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLEtBQUs7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0EsMkNBQTJDLEtBQUs7QUFDaEQsMENBQTBDLEtBQUs7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsNEJBQTRCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLHlCQUF5QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxPQUFPO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLE9BQU87QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsT0FBTztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixtQkFBbUI7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlCQUFpQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixRQUFRO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLE1BQU07QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEVBQUUsd0NBQXdDO0FBQzNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyxHQUFHO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEOztBQUVoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCQUEwQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLDZDQUE2QztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEMsR0FBRztBQUNILDREQUE0RDtBQUM1RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLENBQUMsRUFBRSw0S0FBNEs7QUFDL0s7QUFDQTs7QUFFQSxvR0FBb0csbUJBQW1CLEVBQUUsbUJBQW1CLDhIQUE4SDs7QUFFMVE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQix3Q0FBd0M7QUFDeEMsYUFBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsT0FBTztBQUNwQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQztBQUNELENBQUMsRUFBRSxpREFBaUQsRUFBRSxHQUFHO0FBQ3pELENBQUMsRTs7Ozs7Ozs7QUN0Nk1EOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDIiwiZmlsZSI6InZlbmRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1MzcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDAwMGRkNDFiNjJjZThkYTE2MzNiIiwiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuZGVlcHN0cmVhbSA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblxuLyoqXG4gKiBFeHBvc2UgYEVtaXR0ZXJgLlxuICovXG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn07XG5cbi8qKlxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICh0aGlzLl9jYWxsYmFja3NbZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXSlcbiAgICAucHVzaChmbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcbiAqIHRpbWUgdGhlbiBhdXRvbWF0aWNhbGx5IHJlbW92ZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIGZ1bmN0aW9uIG9uKCkge1xuICAgIHRoaXMub2ZmKGV2ZW50LCBvbik7XG4gICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIG9uLmZuID0gZm47XG4gIHRoaXMub24oZXZlbnQsIG9uKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXG4gKiByZWdpc3RlcmVkIGNhbGxiYWNrcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vZmYgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwgT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAvLyBhbGxcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzcGVjaWZpYyBldmVudFxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgdmFyIGNiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVtb3ZlIGV2ZW50IHNwZWNpZmljIGFycmF5cyBmb3IgZXZlbnQgdHlwZXMgdGhhdCBub1xuICAvLyBvbmUgaXMgc3Vic2NyaWJlZCBmb3IgdG8gYXZvaWQgbWVtb3J5IGxlYWsuXG4gIGlmIChjYWxsYmFja3MubGVuZ3RoID09PSAwKSB7XG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge01peGVkfSAuLi5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuXG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gIH1cblxuICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBsaXN0aW5nIHRoZSBldmVudHMgZm9yIHdoaWNoIHRoZSBlbWl0dGVyIGhhcyByZWdpc3RlcmVkIGxpc3RlbmVycy5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cbkVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzID8gT2JqZWN0LmtleXModGhpcy5fY2FsbGJhY2tzKSA6IFtdO1xufVxuXG59LHt9XSwyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblxufSx7fV0sMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG59LHt9XSw0OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbi8qISBodHRwczovL210aHMuYmUvcHVueWNvZGUgdjEuNC4xIGJ5IEBtYXRoaWFzICovXG47KGZ1bmN0aW9uKHJvb3QpIHtcblxuXHQvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGVzICovXG5cdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiZcblx0XHQhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXHR2YXIgZnJlZU1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmXG5cdFx0IW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cdHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG5cdGlmIChcblx0XHRmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fFxuXHRcdGZyZWVHbG9iYWwud2luZG93ID09PSBmcmVlR2xvYmFsIHx8XG5cdFx0ZnJlZUdsb2JhbC5zZWxmID09PSBmcmVlR2xvYmFsXG5cdCkge1xuXHRcdHJvb3QgPSBmcmVlR2xvYmFsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBgcHVueWNvZGVgIG9iamVjdC5cblx0ICogQG5hbWUgcHVueWNvZGVcblx0ICogQHR5cGUgT2JqZWN0XG5cdCAqL1xuXHR2YXIgcHVueWNvZGUsXG5cblx0LyoqIEhpZ2hlc3QgcG9zaXRpdmUgc2lnbmVkIDMyLWJpdCBmbG9hdCB2YWx1ZSAqL1xuXHRtYXhJbnQgPSAyMTQ3NDgzNjQ3LCAvLyBha2EuIDB4N0ZGRkZGRkYgb3IgMl4zMS0xXG5cblx0LyoqIEJvb3RzdHJpbmcgcGFyYW1ldGVycyAqL1xuXHRiYXNlID0gMzYsXG5cdHRNaW4gPSAxLFxuXHR0TWF4ID0gMjYsXG5cdHNrZXcgPSAzOCxcblx0ZGFtcCA9IDcwMCxcblx0aW5pdGlhbEJpYXMgPSA3Mixcblx0aW5pdGlhbE4gPSAxMjgsIC8vIDB4ODBcblx0ZGVsaW1pdGVyID0gJy0nLCAvLyAnXFx4MkQnXG5cblx0LyoqIFJlZ3VsYXIgZXhwcmVzc2lvbnMgKi9cblx0cmVnZXhQdW55Y29kZSA9IC9eeG4tLS8sXG5cdHJlZ2V4Tm9uQVNDSUkgPSAvW15cXHgyMC1cXHg3RV0vLCAvLyB1bnByaW50YWJsZSBBU0NJSSBjaGFycyArIG5vbi1BU0NJSSBjaGFyc1xuXHRyZWdleFNlcGFyYXRvcnMgPSAvW1xceDJFXFx1MzAwMlxcdUZGMEVcXHVGRjYxXS9nLCAvLyBSRkMgMzQ5MCBzZXBhcmF0b3JzXG5cblx0LyoqIEVycm9yIG1lc3NhZ2VzICovXG5cdGVycm9ycyA9IHtcblx0XHQnb3ZlcmZsb3cnOiAnT3ZlcmZsb3c6IGlucHV0IG5lZWRzIHdpZGVyIGludGVnZXJzIHRvIHByb2Nlc3MnLFxuXHRcdCdub3QtYmFzaWMnOiAnSWxsZWdhbCBpbnB1dCA+PSAweDgwIChub3QgYSBiYXNpYyBjb2RlIHBvaW50KScsXG5cdFx0J2ludmFsaWQtaW5wdXQnOiAnSW52YWxpZCBpbnB1dCdcblx0fSxcblxuXHQvKiogQ29udmVuaWVuY2Ugc2hvcnRjdXRzICovXG5cdGJhc2VNaW51c1RNaW4gPSBiYXNlIC0gdE1pbixcblx0Zmxvb3IgPSBNYXRoLmZsb29yLFxuXHRzdHJpbmdGcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLFxuXG5cdC8qKiBUZW1wb3JhcnkgdmFyaWFibGUgKi9cblx0a2V5O1xuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKlxuXHQgKiBBIGdlbmVyaWMgZXJyb3IgdXRpbGl0eSBmdW5jdGlvbi5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVGhlIGVycm9yIHR5cGUuXG5cdCAqIEByZXR1cm5zIHtFcnJvcn0gVGhyb3dzIGEgYFJhbmdlRXJyb3JgIHdpdGggdGhlIGFwcGxpY2FibGUgZXJyb3IgbWVzc2FnZS5cblx0ICovXG5cdGZ1bmN0aW9uIGVycm9yKHR5cGUpIHtcblx0XHR0aHJvdyBuZXcgUmFuZ2VFcnJvcihlcnJvcnNbdHlwZV0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBgQXJyYXkjbWFwYCB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnkgYXJyYXlcblx0ICogaXRlbS5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBhcnJheSBvZiB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZnVuY3Rpb24gbWFwKGFycmF5LCBmbikge1xuXHRcdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xuXHRcdHdoaWxlIChsZW5ndGgtLSkge1xuXHRcdFx0cmVzdWx0W2xlbmd0aF0gPSBmbihhcnJheVtsZW5ndGhdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHNpbXBsZSBgQXJyYXkjbWFwYC1saWtlIHdyYXBwZXIgdG8gd29yayB3aXRoIGRvbWFpbiBuYW1lIHN0cmluZ3Mgb3IgZW1haWxcblx0ICogYWRkcmVzc2VzLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZG9tYWluIFRoZSBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnlcblx0ICogY2hhcmFjdGVyLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IHN0cmluZyBvZiBjaGFyYWN0ZXJzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFja1xuXHQgKiBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcERvbWFpbihzdHJpbmcsIGZuKSB7XG5cdFx0dmFyIHBhcnRzID0gc3RyaW5nLnNwbGl0KCdAJyk7XG5cdFx0dmFyIHJlc3VsdCA9ICcnO1xuXHRcdGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG5cdFx0XHQvLyBJbiBlbWFpbCBhZGRyZXNzZXMsIG9ubHkgdGhlIGRvbWFpbiBuYW1lIHNob3VsZCBiZSBwdW55Y29kZWQuIExlYXZlXG5cdFx0XHQvLyB0aGUgbG9jYWwgcGFydCAoaS5lLiBldmVyeXRoaW5nIHVwIHRvIGBAYCkgaW50YWN0LlxuXHRcdFx0cmVzdWx0ID0gcGFydHNbMF0gKyAnQCc7XG5cdFx0XHRzdHJpbmcgPSBwYXJ0c1sxXTtcblx0XHR9XG5cdFx0Ly8gQXZvaWQgYHNwbGl0KHJlZ2V4KWAgZm9yIElFOCBjb21wYXRpYmlsaXR5LiBTZWUgIzE3LlxuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlZ2V4U2VwYXJhdG9ycywgJ1xceDJFJyk7XG5cdFx0dmFyIGxhYmVscyA9IHN0cmluZy5zcGxpdCgnLicpO1xuXHRcdHZhciBlbmNvZGVkID0gbWFwKGxhYmVscywgZm4pLmpvaW4oJy4nKTtcblx0XHRyZXR1cm4gcmVzdWx0ICsgZW5jb2RlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIG51bWVyaWMgY29kZSBwb2ludHMgb2YgZWFjaCBVbmljb2RlXG5cdCAqIGNoYXJhY3RlciBpbiB0aGUgc3RyaW5nLiBXaGlsZSBKYXZhU2NyaXB0IHVzZXMgVUNTLTIgaW50ZXJuYWxseSxcblx0ICogdGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgYSBwYWlyIG9mIHN1cnJvZ2F0ZSBoYWx2ZXMgKGVhY2ggb2Ygd2hpY2hcblx0ICogVUNTLTIgZXhwb3NlcyBhcyBzZXBhcmF0ZSBjaGFyYWN0ZXJzKSBpbnRvIGEgc2luZ2xlIGNvZGUgcG9pbnQsXG5cdCAqIG1hdGNoaW5nIFVURi0xNi5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5lbmNvZGVgXG5cdCAqIEBzZWUgPGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nPlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuXHQgKiBAbmFtZSBkZWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgVW5pY29kZSBpbnB1dCBzdHJpbmcgKFVDUy0yKS5cblx0ICogQHJldHVybnMge0FycmF5fSBUaGUgbmV3IGFycmF5IG9mIGNvZGUgcG9pbnRzLlxuXHQgKi9cblx0ZnVuY3Rpb24gdWNzMmRlY29kZShzdHJpbmcpIHtcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGNvdW50ZXIgPSAwLFxuXHRcdCAgICBsZW5ndGggPSBzdHJpbmcubGVuZ3RoLFxuXHRcdCAgICB2YWx1ZSxcblx0XHQgICAgZXh0cmE7XG5cdFx0d2hpbGUgKGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdHZhbHVlID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdGlmICh2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdFx0Ly8gaGlnaCBzdXJyb2dhdGUsIGFuZCB0aGVyZSBpcyBhIG5leHQgY2hhcmFjdGVyXG5cdFx0XHRcdGV4dHJhID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdFx0aWYgKChleHRyYSAmIDB4RkMwMCkgPT0gMHhEQzAwKSB7IC8vIGxvdyBzdXJyb2dhdGVcblx0XHRcdFx0XHRvdXRwdXQucHVzaCgoKHZhbHVlICYgMHgzRkYpIDw8IDEwKSArIChleHRyYSAmIDB4M0ZGKSArIDB4MTAwMDApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIHVubWF0Y2hlZCBzdXJyb2dhdGU7IG9ubHkgYXBwZW5kIHRoaXMgY29kZSB1bml0LCBpbiBjYXNlIHRoZSBuZXh0XG5cdFx0XHRcdFx0Ly8gY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdGNvdW50ZXItLTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBzdHJpbmcgYmFzZWQgb24gYW4gYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5kZWNvZGVgXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZS51Y3MyXG5cdCAqIEBuYW1lIGVuY29kZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBjb2RlUG9pbnRzIFRoZSBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgbmV3IFVuaWNvZGUgc3RyaW5nIChVQ1MtMikuXG5cdCAqL1xuXHRmdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KSB7XG5cdFx0cmV0dXJuIG1hcChhcnJheSwgZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHRcdGlmICh2YWx1ZSA+IDB4RkZGRikge1xuXHRcdFx0XHR2YWx1ZSAtPSAweDEwMDAwO1xuXHRcdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKTtcblx0XHRcdFx0dmFsdWUgPSAweERDMDAgfCB2YWx1ZSAmIDB4M0ZGO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSk7XG5cdFx0XHRyZXR1cm4gb3V0cHV0O1xuXHRcdH0pLmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgYmFzaWMgY29kZSBwb2ludCBpbnRvIGEgZGlnaXQvaW50ZWdlci5cblx0ICogQHNlZSBgZGlnaXRUb0Jhc2ljKClgXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlUG9pbnQgVGhlIGJhc2ljIG51bWVyaWMgY29kZSBwb2ludCB2YWx1ZS5cblx0ICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50IChmb3IgdXNlIGluXG5cdCAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaW4gdGhlIHJhbmdlIGAwYCB0byBgYmFzZSAtIDFgLCBvciBgYmFzZWAgaWZcblx0ICogdGhlIGNvZGUgcG9pbnQgZG9lcyBub3QgcmVwcmVzZW50IGEgdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBiYXNpY1RvRGlnaXQoY29kZVBvaW50KSB7XG5cdFx0aWYgKGNvZGVQb2ludCAtIDQ4IDwgMTApIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSAyMjtcblx0XHR9XG5cdFx0aWYgKGNvZGVQb2ludCAtIDY1IDwgMjYpIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA2NTtcblx0XHR9XG5cdFx0aWYgKGNvZGVQb2ludCAtIDk3IDwgMjYpIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA5Nztcblx0XHR9XG5cdFx0cmV0dXJuIGJhc2U7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBkaWdpdC9pbnRlZ2VyIGludG8gYSBiYXNpYyBjb2RlIHBvaW50LlxuXHQgKiBAc2VlIGBiYXNpY1RvRGlnaXQoKWBcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRpZ2l0IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludC5cblx0ICogQHJldHVybnMge051bWJlcn0gVGhlIGJhc2ljIGNvZGUgcG9pbnQgd2hvc2UgdmFsdWUgKHdoZW4gdXNlZCBmb3Jcblx0ICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpcyBgZGlnaXRgLCB3aGljaCBuZWVkcyB0byBiZSBpbiB0aGUgcmFuZ2Vcblx0ICogYDBgIHRvIGBiYXNlIC0gMWAuIElmIGBmbGFnYCBpcyBub24temVybywgdGhlIHVwcGVyY2FzZSBmb3JtIGlzXG5cdCAqIHVzZWQ7IGVsc2UsIHRoZSBsb3dlcmNhc2UgZm9ybSBpcyB1c2VkLiBUaGUgYmVoYXZpb3IgaXMgdW5kZWZpbmVkXG5cdCAqIGlmIGBmbGFnYCBpcyBub24temVybyBhbmQgYGRpZ2l0YCBoYXMgbm8gdXBwZXJjYXNlIGZvcm0uXG5cdCAqL1xuXHRmdW5jdGlvbiBkaWdpdFRvQmFzaWMoZGlnaXQsIGZsYWcpIHtcblx0XHQvLyAgMC4uMjUgbWFwIHRvIEFTQ0lJIGEuLnogb3IgQS4uWlxuXHRcdC8vIDI2Li4zNSBtYXAgdG8gQVNDSUkgMC4uOVxuXHRcdHJldHVybiBkaWdpdCArIDIyICsgNzUgKiAoZGlnaXQgPCAyNikgLSAoKGZsYWcgIT0gMCkgPDwgNSk7XG5cdH1cblxuXHQvKipcblx0ICogQmlhcyBhZGFwdGF0aW9uIGZ1bmN0aW9uIGFzIHBlciBzZWN0aW9uIDMuNCBvZiBSRkMgMzQ5Mi5cblx0ICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM0OTIjc2VjdGlvbi0zLjRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIGFkYXB0KGRlbHRhLCBudW1Qb2ludHMsIGZpcnN0VGltZSkge1xuXHRcdHZhciBrID0gMDtcblx0XHRkZWx0YSA9IGZpcnN0VGltZSA/IGZsb29yKGRlbHRhIC8gZGFtcCkgOiBkZWx0YSA+PiAxO1xuXHRcdGRlbHRhICs9IGZsb29yKGRlbHRhIC8gbnVtUG9pbnRzKTtcblx0XHRmb3IgKC8qIG5vIGluaXRpYWxpemF0aW9uICovOyBkZWx0YSA+IGJhc2VNaW51c1RNaW4gKiB0TWF4ID4+IDE7IGsgKz0gYmFzZSkge1xuXHRcdFx0ZGVsdGEgPSBmbG9vcihkZWx0YSAvIGJhc2VNaW51c1RNaW4pO1xuXHRcdH1cblx0XHRyZXR1cm4gZmxvb3IoayArIChiYXNlTWludXNUTWluICsgMSkgKiBkZWx0YSAvIChkZWx0YSArIHNrZXcpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMgdG8gYSBzdHJpbmcgb2YgVW5pY29kZVxuXHQgKiBzeW1ib2xzLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0XHQvLyBEb24ndCB1c2UgVUNTLTJcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoLFxuXHRcdCAgICBvdXQsXG5cdFx0ICAgIGkgPSAwLFxuXHRcdCAgICBuID0gaW5pdGlhbE4sXG5cdFx0ICAgIGJpYXMgPSBpbml0aWFsQmlhcyxcblx0XHQgICAgYmFzaWMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIGluZGV4LFxuXHRcdCAgICBvbGRpLFxuXHRcdCAgICB3LFxuXHRcdCAgICBrLFxuXHRcdCAgICBkaWdpdCxcblx0XHQgICAgdCxcblx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0ICAgIGJhc2VNaW51c1Q7XG5cblx0XHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzOiBsZXQgYGJhc2ljYCBiZSB0aGUgbnVtYmVyIG9mIGlucHV0IGNvZGVcblx0XHQvLyBwb2ludHMgYmVmb3JlIHRoZSBsYXN0IGRlbGltaXRlciwgb3IgYDBgIGlmIHRoZXJlIGlzIG5vbmUsIHRoZW4gY29weVxuXHRcdC8vIHRoZSBmaXJzdCBiYXNpYyBjb2RlIHBvaW50cyB0byB0aGUgb3V0cHV0LlxuXG5cdFx0YmFzaWMgPSBpbnB1dC5sYXN0SW5kZXhPZihkZWxpbWl0ZXIpO1xuXHRcdGlmIChiYXNpYyA8IDApIHtcblx0XHRcdGJhc2ljID0gMDtcblx0XHR9XG5cblx0XHRmb3IgKGogPSAwOyBqIDwgYmFzaWM7ICsraikge1xuXHRcdFx0Ly8gaWYgaXQncyBub3QgYSBiYXNpYyBjb2RlIHBvaW50XG5cdFx0XHRpZiAoaW5wdXQuY2hhckNvZGVBdChqKSA+PSAweDgwKSB7XG5cdFx0XHRcdGVycm9yKCdub3QtYmFzaWMnKTtcblx0XHRcdH1cblx0XHRcdG91dHB1dC5wdXNoKGlucHV0LmNoYXJDb2RlQXQoaikpO1xuXHRcdH1cblxuXHRcdC8vIE1haW4gZGVjb2RpbmcgbG9vcDogc3RhcnQganVzdCBhZnRlciB0aGUgbGFzdCBkZWxpbWl0ZXIgaWYgYW55IGJhc2ljIGNvZGVcblx0XHQvLyBwb2ludHMgd2VyZSBjb3BpZWQ7IHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmcgb3RoZXJ3aXNlLlxuXG5cdFx0Zm9yIChpbmRleCA9IGJhc2ljID4gMCA/IGJhc2ljICsgMSA6IDA7IGluZGV4IDwgaW5wdXRMZW5ndGg7IC8qIG5vIGZpbmFsIGV4cHJlc3Npb24gKi8pIHtcblxuXHRcdFx0Ly8gYGluZGV4YCBpcyB0aGUgaW5kZXggb2YgdGhlIG5leHQgY2hhcmFjdGVyIHRvIGJlIGNvbnN1bWVkLlxuXHRcdFx0Ly8gRGVjb2RlIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIgaW50byBgZGVsdGFgLFxuXHRcdFx0Ly8gd2hpY2ggZ2V0cyBhZGRlZCB0byBgaWAuIFRoZSBvdmVyZmxvdyBjaGVja2luZyBpcyBlYXNpZXJcblx0XHRcdC8vIGlmIHdlIGluY3JlYXNlIGBpYCBhcyB3ZSBnbywgdGhlbiBzdWJ0cmFjdCBvZmYgaXRzIHN0YXJ0aW5nXG5cdFx0XHQvLyB2YWx1ZSBhdCB0aGUgZW5kIHRvIG9idGFpbiBgZGVsdGFgLlxuXHRcdFx0Zm9yIChvbGRpID0gaSwgdyA9IDEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXG5cdFx0XHRcdGlmIChpbmRleCA+PSBpbnB1dExlbmd0aCkge1xuXHRcdFx0XHRcdGVycm9yKCdpbnZhbGlkLWlucHV0Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkaWdpdCA9IGJhc2ljVG9EaWdpdChpbnB1dC5jaGFyQ29kZUF0KGluZGV4KyspKTtcblxuXHRcdFx0XHRpZiAoZGlnaXQgPj0gYmFzZSB8fCBkaWdpdCA+IGZsb29yKChtYXhJbnQgLSBpKSAvIHcpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpICs9IGRpZ2l0ICogdztcblx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cblx0XHRcdFx0aWYgKGRpZ2l0IDwgdCkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRpZiAodyA+IGZsb29yKG1heEludCAvIGJhc2VNaW51c1QpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR3ICo9IGJhc2VNaW51c1Q7XG5cblx0XHRcdH1cblxuXHRcdFx0b3V0ID0gb3V0cHV0Lmxlbmd0aCArIDE7XG5cdFx0XHRiaWFzID0gYWRhcHQoaSAtIG9sZGksIG91dCwgb2xkaSA9PSAwKTtcblxuXHRcdFx0Ly8gYGlgIHdhcyBzdXBwb3NlZCB0byB3cmFwIGFyb3VuZCBmcm9tIGBvdXRgIHRvIGAwYCxcblx0XHRcdC8vIGluY3JlbWVudGluZyBgbmAgZWFjaCB0aW1lLCBzbyB3ZSdsbCBmaXggdGhhdCBub3c6XG5cdFx0XHRpZiAoZmxvb3IoaSAvIG91dCkgPiBtYXhJbnQgLSBuKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRuICs9IGZsb29yKGkgLyBvdXQpO1xuXHRcdFx0aSAlPSBvdXQ7XG5cblx0XHRcdC8vIEluc2VydCBgbmAgYXQgcG9zaXRpb24gYGlgIG9mIHRoZSBvdXRwdXRcblx0XHRcdG91dHB1dC5zcGxpY2UoaSsrLCAwLCBuKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB1Y3MyZW5jb2RlKG91dHB1dCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzIChlLmcuIGEgZG9tYWluIG5hbWUgbGFiZWwpIHRvIGFcblx0ICogUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZW5jb2RlKGlucHV0KSB7XG5cdFx0dmFyIG4sXG5cdFx0ICAgIGRlbHRhLFxuXHRcdCAgICBoYW5kbGVkQ1BDb3VudCxcblx0XHQgICAgYmFzaWNMZW5ndGgsXG5cdFx0ICAgIGJpYXMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIG0sXG5cdFx0ICAgIHEsXG5cdFx0ICAgIGssXG5cdFx0ICAgIHQsXG5cdFx0ICAgIGN1cnJlbnRWYWx1ZSxcblx0XHQgICAgb3V0cHV0ID0gW10sXG5cdFx0ICAgIC8qKiBgaW5wdXRMZW5ndGhgIHdpbGwgaG9sZCB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIGluIGBpbnB1dGAuICovXG5cdFx0ICAgIGlucHV0TGVuZ3RoLFxuXHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHQgICAgaGFuZGxlZENQQ291bnRQbHVzT25lLFxuXHRcdCAgICBiYXNlTWludXNULFxuXHRcdCAgICBxTWludXNUO1xuXG5cdFx0Ly8gQ29udmVydCB0aGUgaW5wdXQgaW4gVUNTLTIgdG8gVW5pY29kZVxuXHRcdGlucHV0ID0gdWNzMmRlY29kZShpbnB1dCk7XG5cblx0XHQvLyBDYWNoZSB0aGUgbGVuZ3RoXG5cdFx0aW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cblx0XHQvLyBJbml0aWFsaXplIHRoZSBzdGF0ZVxuXHRcdG4gPSBpbml0aWFsTjtcblx0XHRkZWx0YSA9IDA7XG5cdFx0YmlhcyA9IGluaXRpYWxCaWFzO1xuXG5cdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50c1xuXHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCAweDgwKSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShjdXJyZW50VmFsdWUpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRoYW5kbGVkQ1BDb3VudCA9IGJhc2ljTGVuZ3RoID0gb3V0cHV0Lmxlbmd0aDtcblxuXHRcdC8vIGBoYW5kbGVkQ1BDb3VudGAgaXMgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyB0aGF0IGhhdmUgYmVlbiBoYW5kbGVkO1xuXHRcdC8vIGBiYXNpY0xlbmd0aGAgaXMgdGhlIG51bWJlciBvZiBiYXNpYyBjb2RlIHBvaW50cy5cblxuXHRcdC8vIEZpbmlzaCB0aGUgYmFzaWMgc3RyaW5nIC0gaWYgaXQgaXMgbm90IGVtcHR5IC0gd2l0aCBhIGRlbGltaXRlclxuXHRcdGlmIChiYXNpY0xlbmd0aCkge1xuXHRcdFx0b3V0cHV0LnB1c2goZGVsaW1pdGVyKTtcblx0XHR9XG5cblx0XHQvLyBNYWluIGVuY29kaW5nIGxvb3A6XG5cdFx0d2hpbGUgKGhhbmRsZWRDUENvdW50IDwgaW5wdXRMZW5ndGgpIHtcblxuXHRcdFx0Ly8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dFxuXHRcdFx0Ly8gbGFyZ2VyIG9uZTpcblx0XHRcdGZvciAobSA9IG1heEludCwgaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID49IG4gJiYgY3VycmVudFZhbHVlIDwgbSkge1xuXHRcdFx0XHRcdG0gPSBjdXJyZW50VmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5jcmVhc2UgYGRlbHRhYCBlbm91Z2ggdG8gYWR2YW5jZSB0aGUgZGVjb2RlcidzIDxuLGk+IHN0YXRlIHRvIDxtLDA+LFxuXHRcdFx0Ly8gYnV0IGd1YXJkIGFnYWluc3Qgb3ZlcmZsb3dcblx0XHRcdGhhbmRsZWRDUENvdW50UGx1c09uZSA9IGhhbmRsZWRDUENvdW50ICsgMTtcblx0XHRcdGlmIChtIC0gbiA+IGZsb29yKChtYXhJbnQgLSBkZWx0YSkgLyBoYW5kbGVkQ1BDb3VudFBsdXNPbmUpKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWx0YSArPSAobSAtIG4pICogaGFuZGxlZENQQ291bnRQbHVzT25lO1xuXHRcdFx0biA9IG07XG5cblx0XHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCBuICYmICsrZGVsdGEgPiBtYXhJbnQpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPT0gbikge1xuXHRcdFx0XHRcdC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyXG5cdFx0XHRcdFx0Zm9yIChxID0gZGVsdGEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXHRcdFx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cdFx0XHRcdFx0XHRpZiAocSA8IHQpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRxTWludXNUID0gcSAtIHQ7XG5cdFx0XHRcdFx0XHRiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdFx0XHRvdXRwdXQucHVzaChcblx0XHRcdFx0XHRcdFx0c3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QsIDApKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHEgPSBmbG9vcihxTWludXNUIC8gYmFzZU1pbnVzVCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyhxLCAwKSkpO1xuXHRcdFx0XHRcdGJpYXMgPSBhZGFwdChkZWx0YSwgaGFuZGxlZENQQ291bnRQbHVzT25lLCBoYW5kbGVkQ1BDb3VudCA9PSBiYXNpY0xlbmd0aCk7XG5cdFx0XHRcdFx0ZGVsdGEgPSAwO1xuXHRcdFx0XHRcdCsraGFuZGxlZENQQ291bnQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0KytkZWx0YTtcblx0XHRcdCsrbjtcblxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3Ncblx0ICogdG8gVW5pY29kZS4gT25seSB0aGUgUHVueWNvZGVkIHBhcnRzIG9mIHRoZSBpbnB1dCB3aWxsIGJlIGNvbnZlcnRlZCwgaS5lLlxuXHQgKiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCBvbiBhIHN0cmluZyB0aGF0IGhhcyBhbHJlYWR5IGJlZW5cblx0ICogY29udmVydGVkIHRvIFVuaWNvZGUuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlZCBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvXG5cdCAqIGNvbnZlcnQgdG8gVW5pY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFVuaWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIFB1bnljb2RlXG5cdCAqIHN0cmluZy5cblx0ICovXG5cdGZ1bmN0aW9uIHRvVW5pY29kZShpbnB1dCkge1xuXHRcdHJldHVybiBtYXBEb21haW4oaW5wdXQsIGZ1bmN0aW9uKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHJlZ2V4UHVueWNvZGUudGVzdChzdHJpbmcpXG5cdFx0XHRcdD8gZGVjb2RlKHN0cmluZy5zbGljZSg0KS50b0xvd2VyQ2FzZSgpKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFVuaWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3MgdG9cblx0ICogUHVueWNvZGUuIE9ubHkgdGhlIG5vbi1BU0NJSSBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgd2lsbCBiZSBjb252ZXJ0ZWQsXG5cdCAqIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0J3MgYWxyZWFkeSBpblxuXHQgKiBBU0NJSS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcyB0byBjb252ZXJ0LCBhcyBhXG5cdCAqIFVuaWNvZGUgc3RyaW5nLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgUHVueWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIGRvbWFpbiBuYW1lIG9yXG5cdCAqIGVtYWlsIGFkZHJlc3MuXG5cdCAqL1xuXHRmdW5jdGlvbiB0b0FTQ0lJKGlucHV0KSB7XG5cdFx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gcmVnZXhOb25BU0NJSS50ZXN0KHN0cmluZylcblx0XHRcdFx0PyAneG4tLScgKyBlbmNvZGUoc3RyaW5nKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKiBEZWZpbmUgdGhlIHB1YmxpYyBBUEkgKi9cblx0cHVueWNvZGUgPSB7XG5cdFx0LyoqXG5cdFx0ICogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IFB1bnljb2RlLmpzIHZlcnNpb24gbnVtYmVyLlxuXHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdCAqIEB0eXBlIFN0cmluZ1xuXHRcdCAqL1xuXHRcdCd2ZXJzaW9uJzogJzEuNC4xJyxcblx0XHQvKipcblx0XHQgKiBBbiBvYmplY3Qgb2YgbWV0aG9kcyB0byBjb252ZXJ0IGZyb20gSmF2YVNjcmlwdCdzIGludGVybmFsIGNoYXJhY3RlclxuXHRcdCAqIHJlcHJlc2VudGF0aW9uIChVQ1MtMikgdG8gVW5pY29kZSBjb2RlIHBvaW50cywgYW5kIGJhY2suXG5cdFx0ICogQHNlZSA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgT2JqZWN0XG5cdFx0ICovXG5cdFx0J3VjczInOiB7XG5cdFx0XHQnZGVjb2RlJzogdWNzMmRlY29kZSxcblx0XHRcdCdlbmNvZGUnOiB1Y3MyZW5jb2RlXG5cdFx0fSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J3RvQVNDSUknOiB0b0FTQ0lJLFxuXHRcdCd0b1VuaWNvZGUnOiB0b1VuaWNvZGVcblx0fTtcblxuXHQvKiogRXhwb3NlIGBwdW55Y29kZWAgKi9cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoJ3B1bnljb2RlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gcHVueWNvZGU7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgZnJlZU1vZHVsZSkge1xuXHRcdGlmIChtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cykge1xuXHRcdFx0Ly8gaW4gTm9kZS5qcywgaW8uanMsIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gcHVueWNvZGU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG5cdFx0XHRmb3IgKGtleSBpbiBwdW55Y29kZSkge1xuXHRcdFx0XHRwdW55Y29kZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gcHVueWNvZGVba2V5XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LnB1bnljb2RlID0gcHVueWNvZGU7XG5cdH1cblxufSh0aGlzKSk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7fV0sNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBJZiBvYmouaGFzT3duUHJvcGVydHkgaGFzIGJlZW4gb3ZlcnJpZGRlbiwgdGhlbiBjYWxsaW5nXG4vLyBvYmouaGFzT3duUHJvcGVydHkocHJvcCkgd2lsbCBicmVhay5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2lzc3Vlcy8xNzA3XG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHFzLCBzZXAsIGVxLCBvcHRpb25zKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICB2YXIgb2JqID0ge307XG5cbiAgaWYgKHR5cGVvZiBxcyAhPT0gJ3N0cmluZycgfHwgcXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHZhciByZWdleHAgPSAvXFwrL2c7XG4gIHFzID0gcXMuc3BsaXQoc2VwKTtcblxuICB2YXIgbWF4S2V5cyA9IDEwMDA7XG4gIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLm1heEtleXMgPT09ICdudW1iZXInKSB7XG4gICAgbWF4S2V5cyA9IG9wdGlvbnMubWF4S2V5cztcbiAgfVxuXG4gIHZhciBsZW4gPSBxcy5sZW5ndGg7XG4gIC8vIG1heEtleXMgPD0gMCBtZWFucyB0aGF0IHdlIHNob3VsZCBub3QgbGltaXQga2V5cyBjb3VudFxuICBpZiAobWF4S2V5cyA+IDAgJiYgbGVuID4gbWF4S2V5cykge1xuICAgIGxlbiA9IG1heEtleXM7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgdmFyIHggPSBxc1tpXS5yZXBsYWNlKHJlZ2V4cCwgJyUyMCcpLFxuICAgICAgICBpZHggPSB4LmluZGV4T2YoZXEpLFxuICAgICAgICBrc3RyLCB2c3RyLCBrLCB2O1xuXG4gICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICBrc3RyID0geC5zdWJzdHIoMCwgaWR4KTtcbiAgICAgIHZzdHIgPSB4LnN1YnN0cihpZHggKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAga3N0ciA9IHg7XG4gICAgICB2c3RyID0gJyc7XG4gICAgfVxuXG4gICAgayA9IGRlY29kZVVSSUNvbXBvbmVudChrc3RyKTtcbiAgICB2ID0gZGVjb2RlVVJJQ29tcG9uZW50KHZzdHIpO1xuXG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShvYmosIGspKSB7XG4gICAgICBvYmpba10gPSB2O1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShvYmpba10pKSB7XG4gICAgICBvYmpba10ucHVzaCh2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqW2tdID0gW29ialtrXSwgdl07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG59LHt9XSw2OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XG4gIHN3aXRjaCAodHlwZW9mIHYpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHY7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgc2VwLCBlcSwgbmFtZSkge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBtYXAob2JqZWN0S2V5cyhvYmopLCBmdW5jdGlvbihrKSB7XG4gICAgICB2YXIga3MgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKGspKSArIGVxO1xuICAgICAgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICByZXR1cm4gbWFwKG9ialtrXSwgZnVuY3Rpb24odikge1xuICAgICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUodikpO1xuICAgICAgICB9KS5qb2luKHNlcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9ialtrXSkpO1xuICAgICAgfVxuICAgIH0pLmpvaW4oc2VwKTtcblxuICB9XG5cbiAgaWYgKCFuYW1lKSByZXR1cm4gJyc7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG5hbWUpKSArIGVxICtcbiAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqKSk7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuZnVuY3Rpb24gbWFwICh4cywgZikge1xuICBpZiAoeHMubWFwKSByZXR1cm4geHMubWFwKGYpO1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICByZXMucHVzaChmKHhzW2ldLCBpKSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSByZXMucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXM7XG59O1xuXG59LHt9XSw3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5kZWNvZGUgPSBleHBvcnRzLnBhcnNlID0gX2RlcmVxXygnLi9kZWNvZGUnKTtcbmV4cG9ydHMuZW5jb2RlID0gZXhwb3J0cy5zdHJpbmdpZnkgPSBfZGVyZXFfKCcuL2VuY29kZScpO1xuXG59LHtcIi4vZGVjb2RlXCI6NSxcIi4vZW5jb2RlXCI6Nn1dLDg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHB1bnljb2RlID0gX2RlcmVxXygncHVueWNvZGUnKTtcbnZhciB1dGlsID0gX2RlcmVxXygnLi91dGlsJyk7XG5cbmV4cG9ydHMucGFyc2UgPSB1cmxQYXJzZTtcbmV4cG9ydHMucmVzb2x2ZSA9IHVybFJlc29sdmU7XG5leHBvcnRzLnJlc29sdmVPYmplY3QgPSB1cmxSZXNvbHZlT2JqZWN0O1xuZXhwb3J0cy5mb3JtYXQgPSB1cmxGb3JtYXQ7XG5cbmV4cG9ydHMuVXJsID0gVXJsO1xuXG5mdW5jdGlvbiBVcmwoKSB7XG4gIHRoaXMucHJvdG9jb2wgPSBudWxsO1xuICB0aGlzLnNsYXNoZXMgPSBudWxsO1xuICB0aGlzLmF1dGggPSBudWxsO1xuICB0aGlzLmhvc3QgPSBudWxsO1xuICB0aGlzLnBvcnQgPSBudWxsO1xuICB0aGlzLmhvc3RuYW1lID0gbnVsbDtcbiAgdGhpcy5oYXNoID0gbnVsbDtcbiAgdGhpcy5zZWFyY2ggPSBudWxsO1xuICB0aGlzLnF1ZXJ5ID0gbnVsbDtcbiAgdGhpcy5wYXRobmFtZSA9IG51bGw7XG4gIHRoaXMucGF0aCA9IG51bGw7XG4gIHRoaXMuaHJlZiA9IG51bGw7XG59XG5cbi8vIFJlZmVyZW5jZTogUkZDIDM5ODYsIFJGQyAxODA4LCBSRkMgMjM5NlxuXG4vLyBkZWZpbmUgdGhlc2UgaGVyZSBzbyBhdCBsZWFzdCB0aGV5IG9ubHkgaGF2ZSB0byBiZVxuLy8gY29tcGlsZWQgb25jZSBvbiB0aGUgZmlyc3QgbW9kdWxlIGxvYWQuXG52YXIgcHJvdG9jb2xQYXR0ZXJuID0gL14oW2EtejAtOS4rLV0rOikvaSxcbiAgICBwb3J0UGF0dGVybiA9IC86WzAtOV0qJC8sXG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIGEgc2ltcGxlIHBhdGggVVJMXG4gICAgc2ltcGxlUGF0aFBhdHRlcm4gPSAvXihcXC9cXC8/KD8hXFwvKVteXFw/XFxzXSopKFxcP1teXFxzXSopPyQvLFxuXG4gICAgLy8gUkZDIDIzOTY6IGNoYXJhY3RlcnMgcmVzZXJ2ZWQgZm9yIGRlbGltaXRpbmcgVVJMcy5cbiAgICAvLyBXZSBhY3R1YWxseSBqdXN0IGF1dG8tZXNjYXBlIHRoZXNlLlxuICAgIGRlbGltcyA9IFsnPCcsICc+JywgJ1wiJywgJ2AnLCAnICcsICdcXHInLCAnXFxuJywgJ1xcdCddLFxuXG4gICAgLy8gUkZDIDIzOTY6IGNoYXJhY3RlcnMgbm90IGFsbG93ZWQgZm9yIHZhcmlvdXMgcmVhc29ucy5cbiAgICB1bndpc2UgPSBbJ3snLCAnfScsICd8JywgJ1xcXFwnLCAnXicsICdgJ10uY29uY2F0KGRlbGltcyksXG5cbiAgICAvLyBBbGxvd2VkIGJ5IFJGQ3MsIGJ1dCBjYXVzZSBvZiBYU1MgYXR0YWNrcy4gIEFsd2F5cyBlc2NhcGUgdGhlc2UuXG4gICAgYXV0b0VzY2FwZSA9IFsnXFwnJ10uY29uY2F0KHVud2lzZSksXG4gICAgLy8gQ2hhcmFjdGVycyB0aGF0IGFyZSBuZXZlciBldmVyIGFsbG93ZWQgaW4gYSBob3N0bmFtZS5cbiAgICAvLyBOb3RlIHRoYXQgYW55IGludmFsaWQgY2hhcnMgYXJlIGFsc28gaGFuZGxlZCwgYnV0IHRoZXNlXG4gICAgLy8gYXJlIHRoZSBvbmVzIHRoYXQgYXJlICpleHBlY3RlZCogdG8gYmUgc2Vlbiwgc28gd2UgZmFzdC1wYXRoXG4gICAgLy8gdGhlbS5cbiAgICBub25Ib3N0Q2hhcnMgPSBbJyUnLCAnLycsICc/JywgJzsnLCAnIyddLmNvbmNhdChhdXRvRXNjYXBlKSxcbiAgICBob3N0RW5kaW5nQ2hhcnMgPSBbJy8nLCAnPycsICcjJ10sXG4gICAgaG9zdG5hbWVNYXhMZW4gPSAyNTUsXG4gICAgaG9zdG5hbWVQYXJ0UGF0dGVybiA9IC9eWythLXowLTlBLVpfLV17MCw2M30kLyxcbiAgICBob3N0bmFtZVBhcnRTdGFydCA9IC9eKFsrYS16MC05QS1aXy1dezAsNjN9KSguKikkLyxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBjYW4gYWxsb3cgXCJ1bnNhZmVcIiBhbmQgXCJ1bndpc2VcIiBjaGFycy5cbiAgICB1bnNhZmVQcm90b2NvbCA9IHtcbiAgICAgICdqYXZhc2NyaXB0JzogdHJ1ZSxcbiAgICAgICdqYXZhc2NyaXB0Oic6IHRydWVcbiAgICB9LFxuICAgIC8vIHByb3RvY29scyB0aGF0IG5ldmVyIGhhdmUgYSBob3N0bmFtZS5cbiAgICBob3N0bGVzc1Byb3RvY29sID0ge1xuICAgICAgJ2phdmFzY3JpcHQnOiB0cnVlLFxuICAgICAgJ2phdmFzY3JpcHQ6JzogdHJ1ZVxuICAgIH0sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgYWx3YXlzIGNvbnRhaW4gYSAvLyBiaXQuXG4gICAgc2xhc2hlZFByb3RvY29sID0ge1xuICAgICAgJ2h0dHAnOiB0cnVlLFxuICAgICAgJ2h0dHBzJzogdHJ1ZSxcbiAgICAgICdmdHAnOiB0cnVlLFxuICAgICAgJ2dvcGhlcic6IHRydWUsXG4gICAgICAnZmlsZSc6IHRydWUsXG4gICAgICAnaHR0cDonOiB0cnVlLFxuICAgICAgJ2h0dHBzOic6IHRydWUsXG4gICAgICAnZnRwOic6IHRydWUsXG4gICAgICAnZ29waGVyOic6IHRydWUsXG4gICAgICAnZmlsZTonOiB0cnVlXG4gICAgfSxcbiAgICBxdWVyeXN0cmluZyA9IF9kZXJlcV8oJ3F1ZXJ5c3RyaW5nJyk7XG5cbmZ1bmN0aW9uIHVybFBhcnNlKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpIHtcbiAgaWYgKHVybCAmJiB1dGlsLmlzT2JqZWN0KHVybCkgJiYgdXJsIGluc3RhbmNlb2YgVXJsKSByZXR1cm4gdXJsO1xuXG4gIHZhciB1ID0gbmV3IFVybDtcbiAgdS5wYXJzZSh1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KTtcbiAgcmV0dXJuIHU7XG59XG5cblVybC5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbih1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KSB7XG4gIGlmICghdXRpbC5pc1N0cmluZyh1cmwpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlBhcmFtZXRlciAndXJsJyBtdXN0IGJlIGEgc3RyaW5nLCBub3QgXCIgKyB0eXBlb2YgdXJsKTtcbiAgfVxuXG4gIC8vIENvcHkgY2hyb21lLCBJRSwgb3BlcmEgYmFja3NsYXNoLWhhbmRsaW5nIGJlaGF2aW9yLlxuICAvLyBCYWNrIHNsYXNoZXMgYmVmb3JlIHRoZSBxdWVyeSBzdHJpbmcgZ2V0IGNvbnZlcnRlZCB0byBmb3J3YXJkIHNsYXNoZXNcbiAgLy8gU2VlOiBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MjU5MTZcbiAgdmFyIHF1ZXJ5SW5kZXggPSB1cmwuaW5kZXhPZignPycpLFxuICAgICAgc3BsaXR0ZXIgPVxuICAgICAgICAgIChxdWVyeUluZGV4ICE9PSAtMSAmJiBxdWVyeUluZGV4IDwgdXJsLmluZGV4T2YoJyMnKSkgPyAnPycgOiAnIycsXG4gICAgICB1U3BsaXQgPSB1cmwuc3BsaXQoc3BsaXR0ZXIpLFxuICAgICAgc2xhc2hSZWdleCA9IC9cXFxcL2c7XG4gIHVTcGxpdFswXSA9IHVTcGxpdFswXS5yZXBsYWNlKHNsYXNoUmVnZXgsICcvJyk7XG4gIHVybCA9IHVTcGxpdC5qb2luKHNwbGl0dGVyKTtcblxuICB2YXIgcmVzdCA9IHVybDtcblxuICAvLyB0cmltIGJlZm9yZSBwcm9jZWVkaW5nLlxuICAvLyBUaGlzIGlzIHRvIHN1cHBvcnQgcGFyc2Ugc3R1ZmYgbGlrZSBcIiAgaHR0cDovL2Zvby5jb20gIFxcblwiXG4gIHJlc3QgPSByZXN0LnRyaW0oKTtcblxuICBpZiAoIXNsYXNoZXNEZW5vdGVIb3N0ICYmIHVybC5zcGxpdCgnIycpLmxlbmd0aCA9PT0gMSkge1xuICAgIC8vIFRyeSBmYXN0IHBhdGggcmVnZXhwXG4gICAgdmFyIHNpbXBsZVBhdGggPSBzaW1wbGVQYXRoUGF0dGVybi5leGVjKHJlc3QpO1xuICAgIGlmIChzaW1wbGVQYXRoKSB7XG4gICAgICB0aGlzLnBhdGggPSByZXN0O1xuICAgICAgdGhpcy5ocmVmID0gcmVzdDtcbiAgICAgIHRoaXMucGF0aG5hbWUgPSBzaW1wbGVQYXRoWzFdO1xuICAgICAgaWYgKHNpbXBsZVBhdGhbMl0pIHtcbiAgICAgICAgdGhpcy5zZWFyY2ggPSBzaW1wbGVQYXRoWzJdO1xuICAgICAgICBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuICAgICAgICAgIHRoaXMucXVlcnkgPSBxdWVyeXN0cmluZy5wYXJzZSh0aGlzLnNlYXJjaC5zdWJzdHIoMSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucXVlcnkgPSB0aGlzLnNlYXJjaC5zdWJzdHIoMSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuICAgICAgICB0aGlzLnNlYXJjaCA9ICcnO1xuICAgICAgICB0aGlzLnF1ZXJ5ID0ge307XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cblxuICB2YXIgcHJvdG8gPSBwcm90b2NvbFBhdHRlcm4uZXhlYyhyZXN0KTtcbiAgaWYgKHByb3RvKSB7XG4gICAgcHJvdG8gPSBwcm90b1swXTtcbiAgICB2YXIgbG93ZXJQcm90byA9IHByb3RvLnRvTG93ZXJDYXNlKCk7XG4gICAgdGhpcy5wcm90b2NvbCA9IGxvd2VyUHJvdG87XG4gICAgcmVzdCA9IHJlc3Quc3Vic3RyKHByb3RvLmxlbmd0aCk7XG4gIH1cblxuICAvLyBmaWd1cmUgb3V0IGlmIGl0J3MgZ290IGEgaG9zdFxuICAvLyB1c2VyQHNlcnZlciBpcyAqYWx3YXlzKiBpbnRlcnByZXRlZCBhcyBhIGhvc3RuYW1lLCBhbmQgdXJsXG4gIC8vIHJlc29sdXRpb24gd2lsbCB0cmVhdCAvL2Zvby9iYXIgYXMgaG9zdD1mb28scGF0aD1iYXIgYmVjYXVzZSB0aGF0J3NcbiAgLy8gaG93IHRoZSBicm93c2VyIHJlc29sdmVzIHJlbGF0aXZlIFVSTHMuXG4gIGlmIChzbGFzaGVzRGVub3RlSG9zdCB8fCBwcm90byB8fCByZXN0Lm1hdGNoKC9eXFwvXFwvW15AXFwvXStAW15AXFwvXSsvKSkge1xuICAgIHZhciBzbGFzaGVzID0gcmVzdC5zdWJzdHIoMCwgMikgPT09ICcvLyc7XG4gICAgaWYgKHNsYXNoZXMgJiYgIShwcm90byAmJiBob3N0bGVzc1Byb3RvY29sW3Byb3RvXSkpIHtcbiAgICAgIHJlc3QgPSByZXN0LnN1YnN0cigyKTtcbiAgICAgIHRoaXMuc2xhc2hlcyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFob3N0bGVzc1Byb3RvY29sW3Byb3RvXSAmJlxuICAgICAgKHNsYXNoZXMgfHwgKHByb3RvICYmICFzbGFzaGVkUHJvdG9jb2xbcHJvdG9dKSkpIHtcblxuICAgIC8vIHRoZXJlJ3MgYSBob3N0bmFtZS5cbiAgICAvLyB0aGUgZmlyc3QgaW5zdGFuY2Ugb2YgLywgPywgOywgb3IgIyBlbmRzIHRoZSBob3N0LlxuICAgIC8vXG4gICAgLy8gSWYgdGhlcmUgaXMgYW4gQCBpbiB0aGUgaG9zdG5hbWUsIHRoZW4gbm9uLWhvc3QgY2hhcnMgKmFyZSogYWxsb3dlZFxuICAgIC8vIHRvIHRoZSBsZWZ0IG9mIHRoZSBsYXN0IEAgc2lnbiwgdW5sZXNzIHNvbWUgaG9zdC1lbmRpbmcgY2hhcmFjdGVyXG4gICAgLy8gY29tZXMgKmJlZm9yZSogdGhlIEAtc2lnbi5cbiAgICAvLyBVUkxzIGFyZSBvYm5veGlvdXMuXG4gICAgLy9cbiAgICAvLyBleDpcbiAgICAvLyBodHRwOi8vYUBiQGMvID0+IHVzZXI6YUBiIGhvc3Q6Y1xuICAgIC8vIGh0dHA6Ly9hQGI/QGMgPT4gdXNlcjphIGhvc3Q6YyBwYXRoOi8/QGNcblxuICAgIC8vIHYwLjEyIFRPRE8oaXNhYWNzKTogVGhpcyBpcyBub3QgcXVpdGUgaG93IENocm9tZSBkb2VzIHRoaW5ncy5cbiAgICAvLyBSZXZpZXcgb3VyIHRlc3QgY2FzZSBhZ2FpbnN0IGJyb3dzZXJzIG1vcmUgY29tcHJlaGVuc2l2ZWx5LlxuXG4gICAgLy8gZmluZCB0aGUgZmlyc3QgaW5zdGFuY2Ugb2YgYW55IGhvc3RFbmRpbmdDaGFyc1xuICAgIHZhciBob3N0RW5kID0gLTE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBob3N0RW5kaW5nQ2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBoZWMgPSByZXN0LmluZGV4T2YoaG9zdEVuZGluZ0NoYXJzW2ldKTtcbiAgICAgIGlmIChoZWMgIT09IC0xICYmIChob3N0RW5kID09PSAtMSB8fCBoZWMgPCBob3N0RW5kKSlcbiAgICAgICAgaG9zdEVuZCA9IGhlYztcbiAgICB9XG5cbiAgICAvLyBhdCB0aGlzIHBvaW50LCBlaXRoZXIgd2UgaGF2ZSBhbiBleHBsaWNpdCBwb2ludCB3aGVyZSB0aGVcbiAgICAvLyBhdXRoIHBvcnRpb24gY2Fubm90IGdvIHBhc3QsIG9yIHRoZSBsYXN0IEAgY2hhciBpcyB0aGUgZGVjaWRlci5cbiAgICB2YXIgYXV0aCwgYXRTaWduO1xuICAgIGlmIChob3N0RW5kID09PSAtMSkge1xuICAgICAgLy8gYXRTaWduIGNhbiBiZSBhbnl3aGVyZS5cbiAgICAgIGF0U2lnbiA9IHJlc3QubGFzdEluZGV4T2YoJ0AnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYXRTaWduIG11c3QgYmUgaW4gYXV0aCBwb3J0aW9uLlxuICAgICAgLy8gaHR0cDovL2FAYi9jQGQgPT4gaG9zdDpiIGF1dGg6YSBwYXRoOi9jQGRcbiAgICAgIGF0U2lnbiA9IHJlc3QubGFzdEluZGV4T2YoJ0AnLCBob3N0RW5kKTtcbiAgICB9XG5cbiAgICAvLyBOb3cgd2UgaGF2ZSBhIHBvcnRpb24gd2hpY2ggaXMgZGVmaW5pdGVseSB0aGUgYXV0aC5cbiAgICAvLyBQdWxsIHRoYXQgb2ZmLlxuICAgIGlmIChhdFNpZ24gIT09IC0xKSB7XG4gICAgICBhdXRoID0gcmVzdC5zbGljZSgwLCBhdFNpZ24pO1xuICAgICAgcmVzdCA9IHJlc3Quc2xpY2UoYXRTaWduICsgMSk7XG4gICAgICB0aGlzLmF1dGggPSBkZWNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgfVxuXG4gICAgLy8gdGhlIGhvc3QgaXMgdGhlIHJlbWFpbmluZyB0byB0aGUgbGVmdCBvZiB0aGUgZmlyc3Qgbm9uLWhvc3QgY2hhclxuICAgIGhvc3RFbmQgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vbkhvc3RDaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhlYyA9IHJlc3QuaW5kZXhPZihub25Ib3N0Q2hhcnNbaV0pO1xuICAgICAgaWYgKGhlYyAhPT0gLTEgJiYgKGhvc3RFbmQgPT09IC0xIHx8IGhlYyA8IGhvc3RFbmQpKVxuICAgICAgICBob3N0RW5kID0gaGVjO1xuICAgIH1cbiAgICAvLyBpZiB3ZSBzdGlsbCBoYXZlIG5vdCBoaXQgaXQsIHRoZW4gdGhlIGVudGlyZSB0aGluZyBpcyBhIGhvc3QuXG4gICAgaWYgKGhvc3RFbmQgPT09IC0xKVxuICAgICAgaG9zdEVuZCA9IHJlc3QubGVuZ3RoO1xuXG4gICAgdGhpcy5ob3N0ID0gcmVzdC5zbGljZSgwLCBob3N0RW5kKTtcbiAgICByZXN0ID0gcmVzdC5zbGljZShob3N0RW5kKTtcblxuICAgIC8vIHB1bGwgb3V0IHBvcnQuXG4gICAgdGhpcy5wYXJzZUhvc3QoKTtcblxuICAgIC8vIHdlJ3ZlIGluZGljYXRlZCB0aGF0IHRoZXJlIGlzIGEgaG9zdG5hbWUsXG4gICAgLy8gc28gZXZlbiBpZiBpdCdzIGVtcHR5LCBpdCBoYXMgdG8gYmUgcHJlc2VudC5cbiAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZSB8fCAnJztcblxuICAgIC8vIGlmIGhvc3RuYW1lIGJlZ2lucyB3aXRoIFsgYW5kIGVuZHMgd2l0aCBdXG4gICAgLy8gYXNzdW1lIHRoYXQgaXQncyBhbiBJUHY2IGFkZHJlc3MuXG4gICAgdmFyIGlwdjZIb3N0bmFtZSA9IHRoaXMuaG9zdG5hbWVbMF0gPT09ICdbJyAmJlxuICAgICAgICB0aGlzLmhvc3RuYW1lW3RoaXMuaG9zdG5hbWUubGVuZ3RoIC0gMV0gPT09ICddJztcblxuICAgIC8vIHZhbGlkYXRlIGEgbGl0dGxlLlxuICAgIGlmICghaXB2Nkhvc3RuYW1lKSB7XG4gICAgICB2YXIgaG9zdHBhcnRzID0gdGhpcy5ob3N0bmFtZS5zcGxpdCgvXFwuLyk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGhvc3RwYXJ0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIHBhcnQgPSBob3N0cGFydHNbaV07XG4gICAgICAgIGlmICghcGFydCkgY29udGludWU7XG4gICAgICAgIGlmICghcGFydC5tYXRjaChob3N0bmFtZVBhcnRQYXR0ZXJuKSkge1xuICAgICAgICAgIHZhciBuZXdwYXJ0ID0gJyc7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGsgPSBwYXJ0Lmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgaWYgKHBhcnQuY2hhckNvZGVBdChqKSA+IDEyNykge1xuICAgICAgICAgICAgICAvLyB3ZSByZXBsYWNlIG5vbi1BU0NJSSBjaGFyIHdpdGggYSB0ZW1wb3JhcnkgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgLy8gd2UgbmVlZCB0aGlzIHRvIG1ha2Ugc3VyZSBzaXplIG9mIGhvc3RuYW1lIGlzIG5vdFxuICAgICAgICAgICAgICAvLyBicm9rZW4gYnkgcmVwbGFjaW5nIG5vbi1BU0NJSSBieSBub3RoaW5nXG4gICAgICAgICAgICAgIG5ld3BhcnQgKz0gJ3gnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV3cGFydCArPSBwYXJ0W2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyB3ZSB0ZXN0IGFnYWluIHdpdGggQVNDSUkgY2hhciBvbmx5XG4gICAgICAgICAgaWYgKCFuZXdwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFBhdHRlcm4pKSB7XG4gICAgICAgICAgICB2YXIgdmFsaWRQYXJ0cyA9IGhvc3RwYXJ0cy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgIHZhciBub3RIb3N0ID0gaG9zdHBhcnRzLnNsaWNlKGkgKyAxKTtcbiAgICAgICAgICAgIHZhciBiaXQgPSBwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFN0YXJ0KTtcbiAgICAgICAgICAgIGlmIChiaXQpIHtcbiAgICAgICAgICAgICAgdmFsaWRQYXJ0cy5wdXNoKGJpdFsxXSk7XG4gICAgICAgICAgICAgIG5vdEhvc3QudW5zaGlmdChiaXRbMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vdEhvc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJlc3QgPSAnLycgKyBub3RIb3N0LmpvaW4oJy4nKSArIHJlc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmhvc3RuYW1lID0gdmFsaWRQYXJ0cy5qb2luKCcuJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5ob3N0bmFtZS5sZW5ndGggPiBob3N0bmFtZU1heExlbikge1xuICAgICAgdGhpcy5ob3N0bmFtZSA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBob3N0bmFtZXMgYXJlIGFsd2F5cyBsb3dlciBjYXNlLlxuICAgICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICBpZiAoIWlwdjZIb3N0bmFtZSkge1xuICAgICAgLy8gSUROQSBTdXBwb3J0OiBSZXR1cm5zIGEgcHVueWNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIFwiZG9tYWluXCIuXG4gICAgICAvLyBJdCBvbmx5IGNvbnZlcnRzIHBhcnRzIG9mIHRoZSBkb21haW4gbmFtZSB0aGF0XG4gICAgICAvLyBoYXZlIG5vbi1BU0NJSSBjaGFyYWN0ZXJzLCBpLmUuIGl0IGRvZXNuJ3QgbWF0dGVyIGlmXG4gICAgICAvLyB5b3UgY2FsbCBpdCB3aXRoIGEgZG9tYWluIHRoYXQgYWxyZWFkeSBpcyBBU0NJSS1vbmx5LlxuICAgICAgdGhpcy5ob3N0bmFtZSA9IHB1bnljb2RlLnRvQVNDSUkodGhpcy5ob3N0bmFtZSk7XG4gICAgfVxuXG4gICAgdmFyIHAgPSB0aGlzLnBvcnQgPyAnOicgKyB0aGlzLnBvcnQgOiAnJztcbiAgICB2YXIgaCA9IHRoaXMuaG9zdG5hbWUgfHwgJyc7XG4gICAgdGhpcy5ob3N0ID0gaCArIHA7XG4gICAgdGhpcy5ocmVmICs9IHRoaXMuaG9zdDtcblxuICAgIC8vIHN0cmlwIFsgYW5kIF0gZnJvbSB0aGUgaG9zdG5hbWVcbiAgICAvLyB0aGUgaG9zdCBmaWVsZCBzdGlsbCByZXRhaW5zIHRoZW0sIHRob3VnaFxuICAgIGlmIChpcHY2SG9zdG5hbWUpIHtcbiAgICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lLnN1YnN0cigxLCB0aGlzLmhvc3RuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgaWYgKHJlc3RbMF0gIT09ICcvJykge1xuICAgICAgICByZXN0ID0gJy8nICsgcmVzdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBub3cgcmVzdCBpcyBzZXQgdG8gdGhlIHBvc3QtaG9zdCBzdHVmZi5cbiAgLy8gY2hvcCBvZmYgYW55IGRlbGltIGNoYXJzLlxuICBpZiAoIXVuc2FmZVByb3RvY29sW2xvd2VyUHJvdG9dKSB7XG5cbiAgICAvLyBGaXJzdCwgbWFrZSAxMDAlIHN1cmUgdGhhdCBhbnkgXCJhdXRvRXNjYXBlXCIgY2hhcnMgZ2V0XG4gICAgLy8gZXNjYXBlZCwgZXZlbiBpZiBlbmNvZGVVUklDb21wb25lbnQgZG9lc24ndCB0aGluayB0aGV5XG4gICAgLy8gbmVlZCB0byBiZS5cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGF1dG9Fc2NhcGUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIgYWUgPSBhdXRvRXNjYXBlW2ldO1xuICAgICAgaWYgKHJlc3QuaW5kZXhPZihhZSkgPT09IC0xKVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIHZhciBlc2MgPSBlbmNvZGVVUklDb21wb25lbnQoYWUpO1xuICAgICAgaWYgKGVzYyA9PT0gYWUpIHtcbiAgICAgICAgZXNjID0gZXNjYXBlKGFlKTtcbiAgICAgIH1cbiAgICAgIHJlc3QgPSByZXN0LnNwbGl0KGFlKS5qb2luKGVzYyk7XG4gICAgfVxuICB9XG5cblxuICAvLyBjaG9wIG9mZiBmcm9tIHRoZSB0YWlsIGZpcnN0LlxuICB2YXIgaGFzaCA9IHJlc3QuaW5kZXhPZignIycpO1xuICBpZiAoaGFzaCAhPT0gLTEpIHtcbiAgICAvLyBnb3QgYSBmcmFnbWVudCBzdHJpbmcuXG4gICAgdGhpcy5oYXNoID0gcmVzdC5zdWJzdHIoaGFzaCk7XG4gICAgcmVzdCA9IHJlc3Quc2xpY2UoMCwgaGFzaCk7XG4gIH1cbiAgdmFyIHFtID0gcmVzdC5pbmRleE9mKCc/Jyk7XG4gIGlmIChxbSAhPT0gLTEpIHtcbiAgICB0aGlzLnNlYXJjaCA9IHJlc3Quc3Vic3RyKHFtKTtcbiAgICB0aGlzLnF1ZXJ5ID0gcmVzdC5zdWJzdHIocW0gKyAxKTtcbiAgICBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5c3RyaW5nLnBhcnNlKHRoaXMucXVlcnkpO1xuICAgIH1cbiAgICByZXN0ID0gcmVzdC5zbGljZSgwLCBxbSk7XG4gIH0gZWxzZSBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuICAgIC8vIG5vIHF1ZXJ5IHN0cmluZywgYnV0IHBhcnNlUXVlcnlTdHJpbmcgc3RpbGwgcmVxdWVzdGVkXG4gICAgdGhpcy5zZWFyY2ggPSAnJztcbiAgICB0aGlzLnF1ZXJ5ID0ge307XG4gIH1cbiAgaWYgKHJlc3QpIHRoaXMucGF0aG5hbWUgPSByZXN0O1xuICBpZiAoc2xhc2hlZFByb3RvY29sW2xvd2VyUHJvdG9dICYmXG4gICAgICB0aGlzLmhvc3RuYW1lICYmICF0aGlzLnBhdGhuYW1lKSB7XG4gICAgdGhpcy5wYXRobmFtZSA9ICcvJztcbiAgfVxuXG4gIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgaWYgKHRoaXMucGF0aG5hbWUgfHwgdGhpcy5zZWFyY2gpIHtcbiAgICB2YXIgcCA9IHRoaXMucGF0aG5hbWUgfHwgJyc7XG4gICAgdmFyIHMgPSB0aGlzLnNlYXJjaCB8fCAnJztcbiAgICB0aGlzLnBhdGggPSBwICsgcztcbiAgfVxuXG4gIC8vIGZpbmFsbHksIHJlY29uc3RydWN0IHRoZSBocmVmIGJhc2VkIG9uIHdoYXQgaGFzIGJlZW4gdmFsaWRhdGVkLlxuICB0aGlzLmhyZWYgPSB0aGlzLmZvcm1hdCgpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGZvcm1hdCBhIHBhcnNlZCBvYmplY3QgaW50byBhIHVybCBzdHJpbmdcbmZ1bmN0aW9uIHVybEZvcm1hdChvYmopIHtcbiAgLy8gZW5zdXJlIGl0J3MgYW4gb2JqZWN0LCBhbmQgbm90IGEgc3RyaW5nIHVybC5cbiAgLy8gSWYgaXQncyBhbiBvYmosIHRoaXMgaXMgYSBuby1vcC5cbiAgLy8gdGhpcyB3YXksIHlvdSBjYW4gY2FsbCB1cmxfZm9ybWF0KCkgb24gc3RyaW5nc1xuICAvLyB0byBjbGVhbiB1cCBwb3RlbnRpYWxseSB3b25reSB1cmxzLlxuICBpZiAodXRpbC5pc1N0cmluZyhvYmopKSBvYmogPSB1cmxQYXJzZShvYmopO1xuICBpZiAoIShvYmogaW5zdGFuY2VvZiBVcmwpKSByZXR1cm4gVXJsLnByb3RvdHlwZS5mb3JtYXQuY2FsbChvYmopO1xuICByZXR1cm4gb2JqLmZvcm1hdCgpO1xufVxuXG5VcmwucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYXV0aCA9IHRoaXMuYXV0aCB8fCAnJztcbiAgaWYgKGF1dGgpIHtcbiAgICBhdXRoID0gZW5jb2RlVVJJQ29tcG9uZW50KGF1dGgpO1xuICAgIGF1dGggPSBhdXRoLnJlcGxhY2UoLyUzQS9pLCAnOicpO1xuICAgIGF1dGggKz0gJ0AnO1xuICB9XG5cbiAgdmFyIHByb3RvY29sID0gdGhpcy5wcm90b2NvbCB8fCAnJyxcbiAgICAgIHBhdGhuYW1lID0gdGhpcy5wYXRobmFtZSB8fCAnJyxcbiAgICAgIGhhc2ggPSB0aGlzLmhhc2ggfHwgJycsXG4gICAgICBob3N0ID0gZmFsc2UsXG4gICAgICBxdWVyeSA9ICcnO1xuXG4gIGlmICh0aGlzLmhvc3QpIHtcbiAgICBob3N0ID0gYXV0aCArIHRoaXMuaG9zdDtcbiAgfSBlbHNlIGlmICh0aGlzLmhvc3RuYW1lKSB7XG4gICAgaG9zdCA9IGF1dGggKyAodGhpcy5ob3N0bmFtZS5pbmRleE9mKCc6JykgPT09IC0xID9cbiAgICAgICAgdGhpcy5ob3N0bmFtZSA6XG4gICAgICAgICdbJyArIHRoaXMuaG9zdG5hbWUgKyAnXScpO1xuICAgIGlmICh0aGlzLnBvcnQpIHtcbiAgICAgIGhvc3QgKz0gJzonICsgdGhpcy5wb3J0O1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aGlzLnF1ZXJ5ICYmXG4gICAgICB1dGlsLmlzT2JqZWN0KHRoaXMucXVlcnkpICYmXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLnF1ZXJ5KS5sZW5ndGgpIHtcbiAgICBxdWVyeSA9IHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh0aGlzLnF1ZXJ5KTtcbiAgfVxuXG4gIHZhciBzZWFyY2ggPSB0aGlzLnNlYXJjaCB8fCAocXVlcnkgJiYgKCc/JyArIHF1ZXJ5KSkgfHwgJyc7XG5cbiAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLnN1YnN0cigtMSkgIT09ICc6JykgcHJvdG9jb2wgKz0gJzonO1xuXG4gIC8vIG9ubHkgdGhlIHNsYXNoZWRQcm90b2NvbHMgZ2V0IHRoZSAvLy4gIE5vdCBtYWlsdG86LCB4bXBwOiwgZXRjLlxuICAvLyB1bmxlc3MgdGhleSBoYWQgdGhlbSB0byBiZWdpbiB3aXRoLlxuICBpZiAodGhpcy5zbGFzaGVzIHx8XG4gICAgICAoIXByb3RvY29sIHx8IHNsYXNoZWRQcm90b2NvbFtwcm90b2NvbF0pICYmIGhvc3QgIT09IGZhbHNlKSB7XG4gICAgaG9zdCA9ICcvLycgKyAoaG9zdCB8fCAnJyk7XG4gICAgaWYgKHBhdGhuYW1lICYmIHBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gJy8nKSBwYXRobmFtZSA9ICcvJyArIHBhdGhuYW1lO1xuICB9IGVsc2UgaWYgKCFob3N0KSB7XG4gICAgaG9zdCA9ICcnO1xuICB9XG5cbiAgaWYgKGhhc2ggJiYgaGFzaC5jaGFyQXQoMCkgIT09ICcjJykgaGFzaCA9ICcjJyArIGhhc2g7XG4gIGlmIChzZWFyY2ggJiYgc2VhcmNoLmNoYXJBdCgwKSAhPT0gJz8nKSBzZWFyY2ggPSAnPycgKyBzZWFyY2g7XG5cbiAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKC9bPyNdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChtYXRjaCk7XG4gIH0pO1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZSgnIycsICclMjMnKTtcblxuICByZXR1cm4gcHJvdG9jb2wgKyBob3N0ICsgcGF0aG5hbWUgKyBzZWFyY2ggKyBoYXNoO1xufTtcblxuZnVuY3Rpb24gdXJsUmVzb2x2ZShzb3VyY2UsIHJlbGF0aXZlKSB7XG4gIHJldHVybiB1cmxQYXJzZShzb3VyY2UsIGZhbHNlLCB0cnVlKS5yZXNvbHZlKHJlbGF0aXZlKTtcbn1cblxuVXJsLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24ocmVsYXRpdmUpIHtcbiAgcmV0dXJuIHRoaXMucmVzb2x2ZU9iamVjdCh1cmxQYXJzZShyZWxhdGl2ZSwgZmFsc2UsIHRydWUpKS5mb3JtYXQoKTtcbn07XG5cbmZ1bmN0aW9uIHVybFJlc29sdmVPYmplY3Qoc291cmNlLCByZWxhdGl2ZSkge1xuICBpZiAoIXNvdXJjZSkgcmV0dXJuIHJlbGF0aXZlO1xuICByZXR1cm4gdXJsUGFyc2Uoc291cmNlLCBmYWxzZSwgdHJ1ZSkucmVzb2x2ZU9iamVjdChyZWxhdGl2ZSk7XG59XG5cblVybC5wcm90b3R5cGUucmVzb2x2ZU9iamVjdCA9IGZ1bmN0aW9uKHJlbGF0aXZlKSB7XG4gIGlmICh1dGlsLmlzU3RyaW5nKHJlbGF0aXZlKSkge1xuICAgIHZhciByZWwgPSBuZXcgVXJsKCk7XG4gICAgcmVsLnBhcnNlKHJlbGF0aXZlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgcmVsYXRpdmUgPSByZWw7XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gbmV3IFVybCgpO1xuICB2YXIgdGtleXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcbiAgZm9yICh2YXIgdGsgPSAwOyB0ayA8IHRrZXlzLmxlbmd0aDsgdGsrKykge1xuICAgIHZhciB0a2V5ID0gdGtleXNbdGtdO1xuICAgIHJlc3VsdFt0a2V5XSA9IHRoaXNbdGtleV07XG4gIH1cblxuICAvLyBoYXNoIGlzIGFsd2F5cyBvdmVycmlkZGVuLCBubyBtYXR0ZXIgd2hhdC5cbiAgLy8gZXZlbiBocmVmPVwiXCIgd2lsbCByZW1vdmUgaXQuXG4gIHJlc3VsdC5oYXNoID0gcmVsYXRpdmUuaGFzaDtcblxuICAvLyBpZiB0aGUgcmVsYXRpdmUgdXJsIGlzIGVtcHR5LCB0aGVuIHRoZXJlJ3Mgbm90aGluZyBsZWZ0IHRvIGRvIGhlcmUuXG4gIGlmIChyZWxhdGl2ZS5ocmVmID09PSAnJykge1xuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBocmVmcyBsaWtlIC8vZm9vL2JhciBhbHdheXMgY3V0IHRvIHRoZSBwcm90b2NvbC5cbiAgaWYgKHJlbGF0aXZlLnNsYXNoZXMgJiYgIXJlbGF0aXZlLnByb3RvY29sKSB7XG4gICAgLy8gdGFrZSBldmVyeXRoaW5nIGV4Y2VwdCB0aGUgcHJvdG9jb2wgZnJvbSByZWxhdGl2ZVxuICAgIHZhciBya2V5cyA9IE9iamVjdC5rZXlzKHJlbGF0aXZlKTtcbiAgICBmb3IgKHZhciByayA9IDA7IHJrIDwgcmtleXMubGVuZ3RoOyByaysrKSB7XG4gICAgICB2YXIgcmtleSA9IHJrZXlzW3JrXTtcbiAgICAgIGlmIChya2V5ICE9PSAncHJvdG9jb2wnKVxuICAgICAgICByZXN1bHRbcmtleV0gPSByZWxhdGl2ZVtya2V5XTtcbiAgICB9XG5cbiAgICAvL3VybFBhcnNlIGFwcGVuZHMgdHJhaWxpbmcgLyB0byB1cmxzIGxpa2UgaHR0cDovL3d3dy5leGFtcGxlLmNvbVxuICAgIGlmIChzbGFzaGVkUHJvdG9jb2xbcmVzdWx0LnByb3RvY29sXSAmJlxuICAgICAgICByZXN1bHQuaG9zdG5hbWUgJiYgIXJlc3VsdC5wYXRobmFtZSkge1xuICAgICAgcmVzdWx0LnBhdGggPSByZXN1bHQucGF0aG5hbWUgPSAnLyc7XG4gICAgfVxuXG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmIChyZWxhdGl2ZS5wcm90b2NvbCAmJiByZWxhdGl2ZS5wcm90b2NvbCAhPT0gcmVzdWx0LnByb3RvY29sKSB7XG4gICAgLy8gaWYgaXQncyBhIGtub3duIHVybCBwcm90b2NvbCwgdGhlbiBjaGFuZ2luZ1xuICAgIC8vIHRoZSBwcm90b2NvbCBkb2VzIHdlaXJkIHRoaW5nc1xuICAgIC8vIGZpcnN0LCBpZiBpdCdzIG5vdCBmaWxlOiwgdGhlbiB3ZSBNVVNUIGhhdmUgYSBob3N0LFxuICAgIC8vIGFuZCBpZiB0aGVyZSB3YXMgYSBwYXRoXG4gICAgLy8gdG8gYmVnaW4gd2l0aCwgdGhlbiB3ZSBNVVNUIGhhdmUgYSBwYXRoLlxuICAgIC8vIGlmIGl0IGlzIGZpbGU6LCB0aGVuIHRoZSBob3N0IGlzIGRyb3BwZWQsXG4gICAgLy8gYmVjYXVzZSB0aGF0J3Mga25vd24gdG8gYmUgaG9zdGxlc3MuXG4gICAgLy8gYW55dGhpbmcgZWxzZSBpcyBhc3N1bWVkIHRvIGJlIGFic29sdXRlLlxuICAgIGlmICghc2xhc2hlZFByb3RvY29sW3JlbGF0aXZlLnByb3RvY29sXSkge1xuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhyZWxhdGl2ZSk7XG4gICAgICBmb3IgKHZhciB2ID0gMDsgdiA8IGtleXMubGVuZ3RoOyB2KyspIHtcbiAgICAgICAgdmFyIGsgPSBrZXlzW3ZdO1xuICAgICAgICByZXN1bHRba10gPSByZWxhdGl2ZVtrXTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXN1bHQucHJvdG9jb2wgPSByZWxhdGl2ZS5wcm90b2NvbDtcbiAgICBpZiAoIXJlbGF0aXZlLmhvc3QgJiYgIWhvc3RsZXNzUHJvdG9jb2xbcmVsYXRpdmUucHJvdG9jb2xdKSB7XG4gICAgICB2YXIgcmVsUGF0aCA9IChyZWxhdGl2ZS5wYXRobmFtZSB8fCAnJykuc3BsaXQoJy8nKTtcbiAgICAgIHdoaWxlIChyZWxQYXRoLmxlbmd0aCAmJiAhKHJlbGF0aXZlLmhvc3QgPSByZWxQYXRoLnNoaWZ0KCkpKTtcbiAgICAgIGlmICghcmVsYXRpdmUuaG9zdCkgcmVsYXRpdmUuaG9zdCA9ICcnO1xuICAgICAgaWYgKCFyZWxhdGl2ZS5ob3N0bmFtZSkgcmVsYXRpdmUuaG9zdG5hbWUgPSAnJztcbiAgICAgIGlmIChyZWxQYXRoWzBdICE9PSAnJykgcmVsUGF0aC51bnNoaWZ0KCcnKTtcbiAgICAgIGlmIChyZWxQYXRoLmxlbmd0aCA8IDIpIHJlbFBhdGgudW5zaGlmdCgnJyk7XG4gICAgICByZXN1bHQucGF0aG5hbWUgPSByZWxQYXRoLmpvaW4oJy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0LnBhdGhuYW1lID0gcmVsYXRpdmUucGF0aG5hbWU7XG4gICAgfVxuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgcmVzdWx0Lmhvc3QgPSByZWxhdGl2ZS5ob3N0IHx8ICcnO1xuICAgIHJlc3VsdC5hdXRoID0gcmVsYXRpdmUuYXV0aDtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSByZWxhdGl2ZS5ob3N0bmFtZSB8fCByZWxhdGl2ZS5ob3N0O1xuICAgIHJlc3VsdC5wb3J0ID0gcmVsYXRpdmUucG9ydDtcbiAgICAvLyB0byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmIChyZXN1bHQucGF0aG5hbWUgfHwgcmVzdWx0LnNlYXJjaCkge1xuICAgICAgdmFyIHAgPSByZXN1bHQucGF0aG5hbWUgfHwgJyc7XG4gICAgICB2YXIgcyA9IHJlc3VsdC5zZWFyY2ggfHwgJyc7XG4gICAgICByZXN1bHQucGF0aCA9IHAgKyBzO1xuICAgIH1cbiAgICByZXN1bHQuc2xhc2hlcyA9IHJlc3VsdC5zbGFzaGVzIHx8IHJlbGF0aXZlLnNsYXNoZXM7XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHZhciBpc1NvdXJjZUFicyA9IChyZXN1bHQucGF0aG5hbWUgJiYgcmVzdWx0LnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSxcbiAgICAgIGlzUmVsQWJzID0gKFxuICAgICAgICAgIHJlbGF0aXZlLmhvc3QgfHxcbiAgICAgICAgICByZWxhdGl2ZS5wYXRobmFtZSAmJiByZWxhdGl2ZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJ1xuICAgICAgKSxcbiAgICAgIG11c3RFbmRBYnMgPSAoaXNSZWxBYnMgfHwgaXNTb3VyY2VBYnMgfHxcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdC5ob3N0ICYmIHJlbGF0aXZlLnBhdGhuYW1lKSksXG4gICAgICByZW1vdmVBbGxEb3RzID0gbXVzdEVuZEFicyxcbiAgICAgIHNyY1BhdGggPSByZXN1bHQucGF0aG5hbWUgJiYgcmVzdWx0LnBhdGhuYW1lLnNwbGl0KCcvJykgfHwgW10sXG4gICAgICByZWxQYXRoID0gcmVsYXRpdmUucGF0aG5hbWUgJiYgcmVsYXRpdmUucGF0aG5hbWUuc3BsaXQoJy8nKSB8fCBbXSxcbiAgICAgIHBzeWNob3RpYyA9IHJlc3VsdC5wcm90b2NvbCAmJiAhc2xhc2hlZFByb3RvY29sW3Jlc3VsdC5wcm90b2NvbF07XG5cbiAgLy8gaWYgdGhlIHVybCBpcyBhIG5vbi1zbGFzaGVkIHVybCwgdGhlbiByZWxhdGl2ZVxuICAvLyBsaW5rcyBsaWtlIC4uLy4uIHNob3VsZCBiZSBhYmxlXG4gIC8vIHRvIGNyYXdsIHVwIHRvIHRoZSBob3N0bmFtZSwgYXMgd2VsbC4gIFRoaXMgaXMgc3RyYW5nZS5cbiAgLy8gcmVzdWx0LnByb3RvY29sIGhhcyBhbHJlYWR5IGJlZW4gc2V0IGJ5IG5vdy5cbiAgLy8gTGF0ZXIgb24sIHB1dCB0aGUgZmlyc3QgcGF0aCBwYXJ0IGludG8gdGhlIGhvc3QgZmllbGQuXG4gIGlmIChwc3ljaG90aWMpIHtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSAnJztcbiAgICByZXN1bHQucG9ydCA9IG51bGw7XG4gICAgaWYgKHJlc3VsdC5ob3N0KSB7XG4gICAgICBpZiAoc3JjUGF0aFswXSA9PT0gJycpIHNyY1BhdGhbMF0gPSByZXN1bHQuaG9zdDtcbiAgICAgIGVsc2Ugc3JjUGF0aC51bnNoaWZ0KHJlc3VsdC5ob3N0KTtcbiAgICB9XG4gICAgcmVzdWx0Lmhvc3QgPSAnJztcbiAgICBpZiAocmVsYXRpdmUucHJvdG9jb2wpIHtcbiAgICAgIHJlbGF0aXZlLmhvc3RuYW1lID0gbnVsbDtcbiAgICAgIHJlbGF0aXZlLnBvcnQgPSBudWxsO1xuICAgICAgaWYgKHJlbGF0aXZlLmhvc3QpIHtcbiAgICAgICAgaWYgKHJlbFBhdGhbMF0gPT09ICcnKSByZWxQYXRoWzBdID0gcmVsYXRpdmUuaG9zdDtcbiAgICAgICAgZWxzZSByZWxQYXRoLnVuc2hpZnQocmVsYXRpdmUuaG9zdCk7XG4gICAgICB9XG4gICAgICByZWxhdGl2ZS5ob3N0ID0gbnVsbDtcbiAgICB9XG4gICAgbXVzdEVuZEFicyA9IG11c3RFbmRBYnMgJiYgKHJlbFBhdGhbMF0gPT09ICcnIHx8IHNyY1BhdGhbMF0gPT09ICcnKTtcbiAgfVxuXG4gIGlmIChpc1JlbEFicykge1xuICAgIC8vIGl0J3MgYWJzb2x1dGUuXG4gICAgcmVzdWx0Lmhvc3QgPSAocmVsYXRpdmUuaG9zdCB8fCByZWxhdGl2ZS5ob3N0ID09PSAnJykgP1xuICAgICAgICAgICAgICAgICAgcmVsYXRpdmUuaG9zdCA6IHJlc3VsdC5ob3N0O1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IChyZWxhdGl2ZS5ob3N0bmFtZSB8fCByZWxhdGl2ZS5ob3N0bmFtZSA9PT0gJycpID9cbiAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZS5ob3N0bmFtZSA6IHJlc3VsdC5ob3N0bmFtZTtcbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgIHNyY1BhdGggPSByZWxQYXRoO1xuICAgIC8vIGZhbGwgdGhyb3VnaCB0byB0aGUgZG90LWhhbmRsaW5nIGJlbG93LlxuICB9IGVsc2UgaWYgKHJlbFBhdGgubGVuZ3RoKSB7XG4gICAgLy8gaXQncyByZWxhdGl2ZVxuICAgIC8vIHRocm93IGF3YXkgdGhlIGV4aXN0aW5nIGZpbGUsIGFuZCB0YWtlIHRoZSBuZXcgcGF0aCBpbnN0ZWFkLlxuICAgIGlmICghc3JjUGF0aCkgc3JjUGF0aCA9IFtdO1xuICAgIHNyY1BhdGgucG9wKCk7XG4gICAgc3JjUGF0aCA9IHNyY1BhdGguY29uY2F0KHJlbFBhdGgpO1xuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gIH0gZWxzZSBpZiAoIXV0aWwuaXNOdWxsT3JVbmRlZmluZWQocmVsYXRpdmUuc2VhcmNoKSkge1xuICAgIC8vIGp1c3QgcHVsbCBvdXQgdGhlIHNlYXJjaC5cbiAgICAvLyBsaWtlIGhyZWY9Jz9mb28nLlxuICAgIC8vIFB1dCB0aGlzIGFmdGVyIHRoZSBvdGhlciB0d28gY2FzZXMgYmVjYXVzZSBpdCBzaW1wbGlmaWVzIHRoZSBib29sZWFuc1xuICAgIGlmIChwc3ljaG90aWMpIHtcbiAgICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlc3VsdC5ob3N0ID0gc3JjUGF0aC5zaGlmdCgpO1xuICAgICAgLy9vY2NhdGlvbmFseSB0aGUgYXV0aCBjYW4gZ2V0IHN0dWNrIG9ubHkgaW4gaG9zdFxuICAgICAgLy90aGlzIGVzcGVjaWFsbHkgaGFwcGVucyBpbiBjYXNlcyBsaWtlXG4gICAgICAvL3VybC5yZXNvbHZlT2JqZWN0KCdtYWlsdG86bG9jYWwxQGRvbWFpbjEnLCAnbG9jYWwyQGRvbWFpbjInKVxuICAgICAgdmFyIGF1dGhJbkhvc3QgPSByZXN1bHQuaG9zdCAmJiByZXN1bHQuaG9zdC5pbmRleE9mKCdAJykgPiAwID9cbiAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmhvc3Quc3BsaXQoJ0AnKSA6IGZhbHNlO1xuICAgICAgaWYgKGF1dGhJbkhvc3QpIHtcbiAgICAgICAgcmVzdWx0LmF1dGggPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICAgIHJlc3VsdC5ob3N0ID0gcmVzdWx0Lmhvc3RuYW1lID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAoIXV0aWwuaXNOdWxsKHJlc3VsdC5wYXRobmFtZSkgfHwgIXV0aWwuaXNOdWxsKHJlc3VsdC5zZWFyY2gpKSB7XG4gICAgICByZXN1bHQucGF0aCA9IChyZXN1bHQucGF0aG5hbWUgPyByZXN1bHQucGF0aG5hbWUgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgICAocmVzdWx0LnNlYXJjaCA/IHJlc3VsdC5zZWFyY2ggOiAnJyk7XG4gICAgfVxuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAoIXNyY1BhdGgubGVuZ3RoKSB7XG4gICAgLy8gbm8gcGF0aCBhdCBhbGwuICBlYXN5LlxuICAgIC8vIHdlJ3ZlIGFscmVhZHkgaGFuZGxlZCB0aGUgb3RoZXIgc3R1ZmYgYWJvdmUuXG4gICAgcmVzdWx0LnBhdGhuYW1lID0gbnVsbDtcbiAgICAvL3RvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gICAgaWYgKHJlc3VsdC5zZWFyY2gpIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gJy8nICsgcmVzdWx0LnNlYXJjaDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0LnBhdGggPSBudWxsO1xuICAgIH1cbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gaWYgYSB1cmwgRU5EcyBpbiAuIG9yIC4uLCB0aGVuIGl0IG11c3QgZ2V0IGEgdHJhaWxpbmcgc2xhc2guXG4gIC8vIGhvd2V2ZXIsIGlmIGl0IGVuZHMgaW4gYW55dGhpbmcgZWxzZSBub24tc2xhc2h5LFxuICAvLyB0aGVuIGl0IG11c3QgTk9UIGdldCBhIHRyYWlsaW5nIHNsYXNoLlxuICB2YXIgbGFzdCA9IHNyY1BhdGguc2xpY2UoLTEpWzBdO1xuICB2YXIgaGFzVHJhaWxpbmdTbGFzaCA9IChcbiAgICAgIChyZXN1bHQuaG9zdCB8fCByZWxhdGl2ZS5ob3N0IHx8IHNyY1BhdGgubGVuZ3RoID4gMSkgJiZcbiAgICAgIChsYXN0ID09PSAnLicgfHwgbGFzdCA9PT0gJy4uJykgfHwgbGFzdCA9PT0gJycpO1xuXG4gIC8vIHN0cmlwIHNpbmdsZSBkb3RzLCByZXNvbHZlIGRvdWJsZSBkb3RzIHRvIHBhcmVudCBkaXJcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IHNyY1BhdGgubGVuZ3RoOyBpID49IDA7IGktLSkge1xuICAgIGxhc3QgPSBzcmNQYXRoW2ldO1xuICAgIGlmIChsYXN0ID09PSAnLicpIHtcbiAgICAgIHNyY1BhdGguc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHNyY1BhdGguc3BsaWNlKGksIDEpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGUgcGF0aCBpcyBhbGxvd2VkIHRvIGdvIGFib3ZlIHRoZSByb290LCByZXN0b3JlIGxlYWRpbmcgLi5zXG4gIGlmICghbXVzdEVuZEFicyAmJiAhcmVtb3ZlQWxsRG90cykge1xuICAgIGZvciAoOyB1cC0tOyB1cCkge1xuICAgICAgc3JjUGF0aC51bnNoaWZ0KCcuLicpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtdXN0RW5kQWJzICYmIHNyY1BhdGhbMF0gIT09ICcnICYmXG4gICAgICAoIXNyY1BhdGhbMF0gfHwgc3JjUGF0aFswXS5jaGFyQXQoMCkgIT09ICcvJykpIHtcbiAgICBzcmNQYXRoLnVuc2hpZnQoJycpO1xuICB9XG5cbiAgaWYgKGhhc1RyYWlsaW5nU2xhc2ggJiYgKHNyY1BhdGguam9pbignLycpLnN1YnN0cigtMSkgIT09ICcvJykpIHtcbiAgICBzcmNQYXRoLnB1c2goJycpO1xuICB9XG5cbiAgdmFyIGlzQWJzb2x1dGUgPSBzcmNQYXRoWzBdID09PSAnJyB8fFxuICAgICAgKHNyY1BhdGhbMF0gJiYgc3JjUGF0aFswXS5jaGFyQXQoMCkgPT09ICcvJyk7XG5cbiAgLy8gcHV0IHRoZSBob3N0IGJhY2tcbiAgaWYgKHBzeWNob3RpYykge1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlc3VsdC5ob3N0ID0gaXNBYnNvbHV0ZSA/ICcnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyY1BhdGgubGVuZ3RoID8gc3JjUGF0aC5zaGlmdCgpIDogJyc7XG4gICAgLy9vY2NhdGlvbmFseSB0aGUgYXV0aCBjYW4gZ2V0IHN0dWNrIG9ubHkgaW4gaG9zdFxuICAgIC8vdGhpcyBlc3BlY2lhbGx5IGhhcHBlbnMgaW4gY2FzZXMgbGlrZVxuICAgIC8vdXJsLnJlc29sdmVPYmplY3QoJ21haWx0bzpsb2NhbDFAZG9tYWluMScsICdsb2NhbDJAZG9tYWluMicpXG4gICAgdmFyIGF1dGhJbkhvc3QgPSByZXN1bHQuaG9zdCAmJiByZXN1bHQuaG9zdC5pbmRleE9mKCdAJykgPiAwID9cbiAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ob3N0LnNwbGl0KCdAJykgOiBmYWxzZTtcbiAgICBpZiAoYXV0aEluSG9zdCkge1xuICAgICAgcmVzdWx0LmF1dGggPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICByZXN1bHQuaG9zdCA9IHJlc3VsdC5ob3N0bmFtZSA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICB9XG4gIH1cblxuICBtdXN0RW5kQWJzID0gbXVzdEVuZEFicyB8fCAocmVzdWx0Lmhvc3QgJiYgc3JjUGF0aC5sZW5ndGgpO1xuXG4gIGlmIChtdXN0RW5kQWJzICYmICFpc0Fic29sdXRlKSB7XG4gICAgc3JjUGF0aC51bnNoaWZ0KCcnKTtcbiAgfVxuXG4gIGlmICghc3JjUGF0aC5sZW5ndGgpIHtcbiAgICByZXN1bHQucGF0aG5hbWUgPSBudWxsO1xuICAgIHJlc3VsdC5wYXRoID0gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQucGF0aG5hbWUgPSBzcmNQYXRoLmpvaW4oJy8nKTtcbiAgfVxuXG4gIC8vdG8gc3VwcG9ydCByZXF1ZXN0Lmh0dHBcbiAgaWYgKCF1dGlsLmlzTnVsbChyZXN1bHQucGF0aG5hbWUpIHx8ICF1dGlsLmlzTnVsbChyZXN1bHQuc2VhcmNoKSkge1xuICAgIHJlc3VsdC5wYXRoID0gKHJlc3VsdC5wYXRobmFtZSA/IHJlc3VsdC5wYXRobmFtZSA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAocmVzdWx0LnNlYXJjaCA/IHJlc3VsdC5zZWFyY2ggOiAnJyk7XG4gIH1cbiAgcmVzdWx0LmF1dGggPSByZWxhdGl2ZS5hdXRoIHx8IHJlc3VsdC5hdXRoO1xuICByZXN1bHQuc2xhc2hlcyA9IHJlc3VsdC5zbGFzaGVzIHx8IHJlbGF0aXZlLnNsYXNoZXM7XG4gIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuVXJsLnByb3RvdHlwZS5wYXJzZUhvc3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhvc3QgPSB0aGlzLmhvc3Q7XG4gIHZhciBwb3J0ID0gcG9ydFBhdHRlcm4uZXhlYyhob3N0KTtcbiAgaWYgKHBvcnQpIHtcbiAgICBwb3J0ID0gcG9ydFswXTtcbiAgICBpZiAocG9ydCAhPT0gJzonKSB7XG4gICAgICB0aGlzLnBvcnQgPSBwb3J0LnN1YnN0cigxKTtcbiAgICB9XG4gICAgaG9zdCA9IGhvc3Quc3Vic3RyKDAsIGhvc3QubGVuZ3RoIC0gcG9ydC5sZW5ndGgpO1xuICB9XG4gIGlmIChob3N0KSB0aGlzLmhvc3RuYW1lID0gaG9zdDtcbn07XG5cbn0se1wiLi91dGlsXCI6OSxcInB1bnljb2RlXCI6NCxcInF1ZXJ5c3RyaW5nXCI6N31dLDk6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNTdHJpbmc6IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB0eXBlb2YoYXJnKSA9PT0gJ3N0cmluZyc7XG4gIH0sXG4gIGlzT2JqZWN0OiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gdHlwZW9mKGFyZykgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbiAgfSxcbiAgaXNOdWxsOiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gYXJnID09PSBudWxsO1xuICB9LFxuICBpc051bGxPclVuZGVmaW5lZDogZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGFyZyA9PSBudWxsO1xuICB9XG59O1xuXG59LHt9XSwxMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBDID0gX2RlcmVxXygnLi9jb25zdGFudHMvY29uc3RhbnRzJyk7XG52YXIgTVMgPSBfZGVyZXFfKCcuL2NvbnN0YW50cy9tZXJnZS1zdHJhdGVnaWVzJyk7XG52YXIgRW1pdHRlciA9IF9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyMicpO1xudmFyIENvbm5lY3Rpb24gPSBfZGVyZXFfKCcuL21lc3NhZ2UvY29ubmVjdGlvbicpO1xudmFyIEV2ZW50SGFuZGxlciA9IF9kZXJlcV8oJy4vZXZlbnQvZXZlbnQtaGFuZGxlcicpO1xudmFyIFJwY0hhbmRsZXIgPSBfZGVyZXFfKCcuL3JwYy9ycGMtaGFuZGxlcicpO1xudmFyIFJlY29yZEhhbmRsZXIgPSBfZGVyZXFfKCcuL3JlY29yZC9yZWNvcmQtaGFuZGxlcicpO1xudmFyIFByZXNlbmNlSGFuZGxlciA9IF9kZXJlcV8oJy4vcHJlc2VuY2UvcHJlc2VuY2UtaGFuZGxlcicpO1xudmFyIGRlZmF1bHRPcHRpb25zID0gX2RlcmVxXygnLi9kZWZhdWx0LW9wdGlvbnMnKTtcbnZhciBBY2tUaW1lb3V0UmVnaXN0cnkgPSBfZGVyZXFfKCcuL3V0aWxzL2Fjay10aW1lb3V0LXJlZ2lzdHJ5Jyk7XG5cbi8qKlxuICogZGVlcHN0cmVhbS5pbyBqYXZhc2NyaXB0IGNsaWVudFxuICpcbiAqIEBjb3B5cmlnaHQgMjAxNiBkZWVwc3RyZWFtSHViIEdtYkhcbiAqIEBhdXRob3IgZGVlcHN0cmVhbUh1YiBHbWJIXG4gKlxuICpcbiAqIEB7QGxpbmsgaHR0cDovL2RlZXBzdHJlYW0uaW99XG4gKlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgICAgIFVSTCB0byBjb25uZWN0IHRvLiBUaGUgcHJvdG9jb2wgY2FuIGJlIG9tbWl0ZWQsIGUuZy4gPGhvc3Q+Ojxwb3J0Pi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEEgbWFwIG9mIG9wdGlvbnMgdGhhdCBleHRlbmQgdGhlIG9uZXMgc3BlY2lmaWVkIGluIGRlZmF1bHQtb3B0aW9ucy5qc1xuICpcbiAqIEBwdWJsaWNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52YXIgQ2xpZW50ID0gZnVuY3Rpb24gQ2xpZW50KHVybCwgb3B0aW9ucykge1xuICB0aGlzLl91cmwgPSB1cmw7XG4gIHRoaXMuX29wdGlvbnMgPSB0aGlzLl9nZXRPcHRpb25zKG9wdGlvbnMgfHwge30pO1xuXG4gIHRoaXMuX2Nvbm5lY3Rpb24gPSBuZXcgQ29ubmVjdGlvbih0aGlzLCB0aGlzLl91cmwsIHRoaXMuX29wdGlvbnMpO1xuICB0aGlzLl9hY2tUaW1lb3V0UmVnaXN0cnkgPSBuZXcgQWNrVGltZW91dFJlZ2lzdHJ5KHRoaXMsIHRoaXMuX29wdGlvbnMpO1xuXG4gIHRoaXMuZXZlbnQgPSBuZXcgRXZlbnRIYW5kbGVyKHRoaXMuX29wdGlvbnMsIHRoaXMuX2Nvbm5lY3Rpb24sIHRoaXMpO1xuICB0aGlzLnJwYyA9IG5ldyBScGNIYW5kbGVyKHRoaXMuX29wdGlvbnMsIHRoaXMuX2Nvbm5lY3Rpb24sIHRoaXMpO1xuICB0aGlzLnJlY29yZCA9IG5ldyBSZWNvcmRIYW5kbGVyKHRoaXMuX29wdGlvbnMsIHRoaXMuX2Nvbm5lY3Rpb24sIHRoaXMpO1xuICB0aGlzLnByZXNlbmNlID0gbmV3IFByZXNlbmNlSGFuZGxlcih0aGlzLl9vcHRpb25zLCB0aGlzLl9jb25uZWN0aW9uLCB0aGlzKTtcblxuICB0aGlzLl9tZXNzYWdlQ2FsbGJhY2tzID0ge307XG4gIHRoaXMuX21lc3NhZ2VDYWxsYmFja3NbQy5UT1BJQy5FVkVOVF0gPSB0aGlzLmV2ZW50Ll8kaGFuZGxlLmJpbmQodGhpcy5ldmVudCk7XG4gIHRoaXMuX21lc3NhZ2VDYWxsYmFja3NbQy5UT1BJQy5SUENdID0gdGhpcy5ycGMuXyRoYW5kbGUuYmluZCh0aGlzLnJwYyk7XG4gIHRoaXMuX21lc3NhZ2VDYWxsYmFja3NbQy5UT1BJQy5SRUNPUkRdID0gdGhpcy5yZWNvcmQuXyRoYW5kbGUuYmluZCh0aGlzLnJlY29yZCk7XG4gIHRoaXMuX21lc3NhZ2VDYWxsYmFja3NbQy5UT1BJQy5QUkVTRU5DRV0gPSB0aGlzLnByZXNlbmNlLl8kaGFuZGxlLmJpbmQodGhpcy5wcmVzZW5jZSk7XG4gIHRoaXMuX21lc3NhZ2VDYWxsYmFja3NbQy5UT1BJQy5FUlJPUl0gPSB0aGlzLl9vbkVycm9yTWVzc2FnZS5iaW5kKHRoaXMpO1xufTtcblxuRW1pdHRlcihDbGllbnQucHJvdG90eXBlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4vKipcbiAqIFNlbmQgYXV0aGVudGljYXRpb24gcGFyYW1ldGVycyB0byB0aGUgY2xpZW50IHRvIGZ1bGx5IG9wZW5cbiAqIHRoZSBjb25uZWN0aW9uLlxuICpcbiAqIFBsZWFzZSBub3RlOiBBdXRoZW50aWNhdGlvbiBwYXJhbWV0ZXJzIGFyZSBzZW5kIG92ZXIgYW4gYWxyZWFkeSBlc3RhYmxpc2hlZFxuICogY29ubmVjdGlvbiwgcmF0aGVyIHRoYW4gYXBwZW5kZWQgdG8gdGhlIHNlcnZlciBVUkwuIFRoaXMgbWVhbnMgdGhlIHBhcmFtZXRlcnNcbiAqIHdpbGwgYmUgZW5jcnlwdGVkIHdoZW4gdXNlZCB3aXRoIGEgV1NTIC8gSFRUUFMgY29ubmVjdGlvbi4gSWYgdGhlIGRlZXBzdHJlYW0gc2VydmVyXG4gKiBvbiB0aGUgb3RoZXIgc2lkZSBoYXMgbWVzc2FnZSBsb2dnaW5nIGVuYWJsZWQgaXQgd2lsbCBob3dldmVyIGJlIHdyaXR0ZW4gdG8gdGhlIGxvZ3MgaW5cbiAqIHBsYWluIHRleHQuIElmIGFkZGl0aW9uYWwgc2VjdXJpdHkgaXMgYSByZXF1aXJlbWVudCBpdCBtaWdodCB0aGVyZWZvciBtYWtlIHNlbnNlIHRvIGhhc2hcbiAqIHRoZSBwYXNzd29yZCBvbiB0aGUgY2xpZW50LlxuICpcbiAqIElmIHRoZSBjb25uZWN0aW9uIGlzIG5vdCB5ZXQgZXN0YWJsaXNoZWQgdGhlIGF1dGhlbnRpY2F0aW9uIHBhcmFtZXRlciB3aWxsIGJlXG4gKiBzdG9yZWQgYW5kIHNlbmQgb25jZSBpdCBiZWNvbWVzIGF2YWlsYWJsZVxuICpcbiAqIGF1dGhQYXJhbXMgY2FuIGJlIGFueSBKU09OIHNlcmlhbGl6YWJsZSBkYXRhIHN0cnVjdHVyZSBhbmQgaXRzIHVwIGZvciB0aGVcbiAqIHBlcm1pc3Npb24gaGFuZGxlciBvbiB0aGUgc2VydmVyIHRvIG1ha2Ugc2Vuc2Ugb2YgdGhlbSwgYWx0aG91Z2ggc29tZXRoaW5nXG4gKiBsaWtlIHsgdXNlcm5hbWU6ICdzb21lTmFtZScsIHBhc3N3b3JkOiAnc29tZVBhc3MnIH0gd2lsbCBwcm9iYWJseSBtYWtlIHRoZSBtb3N0IHNlbnNlLlxuICpcbiAqIGxvZ2luIGNhbiBiZSBjYWxsZWQgbXVsdGlwbGUgdGltZXMgdW50aWwgZWl0aGVyIHRoZSBjb25uZWN0aW9uIGlzIGF1dGhlbnRpY2F0ZWQgb3JcbiAqIGZvcmNlZnVsbHkgY2xvc2VkIGJ5IHRoZSBzZXJ2ZXIgc2luY2UgaXRzIG1heEF1dGhBdHRlbXB0cyB0aHJlc2hvbGQgaGFzIGJlZW4gZXhjZWVkZWRcbiAqXG4gKiBAcGFyYW0gICB7T2JqZWN0fSAgIGF1dGhQYXJhbXMgSlNPTi5zZXJpYWxpemFibGUgYXV0aGVudGljYXRpb24gZGF0YVxuICogQHBhcmFtICAge0Z1bmN0aW9ufSBjYWxsYmFjayAgIFdpbGwgYmUgY2FsbGVkIHdpdGggZWl0aGVyICh0cnVlKSBvciAoZmFsc2UsIGRhdGEpXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge0NsaWVudH1cbiAqL1xuQ2xpZW50LnByb3RvdHlwZS5sb2dpbiA9IGZ1bmN0aW9uIChhdXRoUGFyYW1zT3JDYWxsYmFjaywgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBhdXRoUGFyYW1zT3JDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRoaXMuX2Nvbm5lY3Rpb24uYXV0aGVudGljYXRlKHt9LCBhdXRoUGFyYW1zT3JDYWxsYmFjayk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fY29ubmVjdGlvbi5hdXRoZW50aWNhdGUoYXV0aFBhcmFtc09yQ2FsbGJhY2sgfHwge30sIGNhbGxiYWNrKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ2xvc2VzIHRoZSBjb25uZWN0aW9uIHRvIHRoZSBzZXJ2ZXIuXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkNsaWVudC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX2Nvbm5lY3Rpb24uY2xvc2UoKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgY29ubmVjdGlvbi5cbiAqXG4gKiBjb25uZWN0aW9uU3RhdGUgaXMgb25lIG9mIENPTlNUQU5UUy5DT05ORUNUSU9OX1NUQVRFXG4gKlxuICogQHJldHVybnMge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICovXG5DbGllbnQucHJvdG90eXBlLmdldENvbm5lY3Rpb25TdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuX2Nvbm5lY3Rpb24uZ2V0U3RhdGUoKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHJhbmRvbSBzdHJpbmcuIFRoZSBmaXJzdCBibG9jayBvZiBjaGFyYWN0ZXJzXG4gKiBpcyBhIHRpbWVzdGFtcCwgaW4gb3JkZXIgdG8gYWxsb3cgZGF0YWJhc2VzIHRvIG9wdGltaXplIGZvciBzZW1pLVxuICogc2VxdWVudHVlbCBudW1iZXJpbmdzXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge1N0cmluZ30gdW5pcXVlIGlkXG4gKi9cbkNsaWVudC5wcm90b3R5cGUuZ2V0VWlkID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdGltZXN0YW1wID0gbmV3IERhdGUoKS5nZXRUaW1lKCkudG9TdHJpbmcoMzYpO1xuICB2YXIgcmFuZG9tU3RyaW5nID0gKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDAwMDAwMDAwMCkudG9TdHJpbmcoMzYpLnJlcGxhY2UoJy4nLCAnJyk7XG5cbiAgcmV0dXJuIHRpbWVzdGFtcCArICctJyArIHJhbmRvbVN0cmluZztcbn07XG5cbi8qKlxuICogUGFja2FnZSBwcml2YXRlIGFjayB0aW1lb3V0IHJlZ2lzdHJ5LiBUaGlzIGlzIGhvdyBhbGwgY2xhc3NlcyBjYW4gZ2V0IGFjY2VzcyB0b1xuICogcmVnaXN0ZXIgdGltZW91dHMuXG4gKiAoV2VsbC4uLiB0aGF0J3MgdGhlIGludGVudGlvbiBhbnl3YXlzKVxuICpcbiAqIEBwYWNrYWdlIHByaXZhdGVcbiAqIEByZXR1cm5zIHtBY2tUaW1lb3V0UmVnaXN0cnl9XG4gKi9cbkNsaWVudC5wcm90b3R5cGUuXyRnZXRBY2tUaW1lb3V0UmVnaXN0cnkgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLl9hY2tUaW1lb3V0UmVnaXN0cnk7XG59O1xuXG4vKipcbiAqIFBhY2thZ2UgcHJpdmF0ZSBjYWxsYmFjayBmb3IgcGFyc2VkIGluY29taW5nIG1lc3NhZ2VzLiBXaWxsIGJlIGludm9rZWRcbiAqIGJ5IHRoZSBjb25uZWN0aW9uIGNsYXNzXG4gKlxuICogQHBhcmFtICAge09iamVjdH0gbWVzc2FnZSBwYXJzZWQgZGVlcHN0cmVhbSBtZXNzYWdlXG4gKlxuICogQHBhY2thZ2UgcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkNsaWVudC5wcm90b3R5cGUuXyRvbk1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICBpZiAodGhpcy5fbWVzc2FnZUNhbGxiYWNrc1ttZXNzYWdlLnRvcGljXSkge1xuICAgIHRoaXMuX21lc3NhZ2VDYWxsYmFja3NbbWVzc2FnZS50b3BpY10obWVzc2FnZSk7XG4gIH0gZWxzZSB7XG4gICAgbWVzc2FnZS5wcm9jZXNzZWRFcnJvciA9IHRydWU7XG4gICAgdGhpcy5fJG9uRXJyb3IobWVzc2FnZS50b3BpYywgQy5FVkVOVC5NRVNTQUdFX1BBUlNFX0VSUk9SLCAnUmVjZWl2ZWQgbWVzc2FnZSBmb3IgdW5rbm93biB0b3BpYyAnICsgbWVzc2FnZS50b3BpYyk7XG4gIH1cblxuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5FUlJPUiAmJiAhbWVzc2FnZS5wcm9jZXNzZWRFcnJvcikge1xuICAgIHRoaXMuXyRvbkVycm9yKG1lc3NhZ2UudG9waWMsIG1lc3NhZ2UuZGF0YVswXSwgbWVzc2FnZS5kYXRhLnNsaWNlKDApKTtcbiAgfVxufTtcblxuLyoqXG4gKiBQYWNrYWdlIHByaXZhdGUgZXJyb3IgY2FsbGJhY2suIFRoaXMgaXMgdGhlIHNpbmdsZSBwb2ludCBhdCB3aGljaFxuICogZXJyb3JzIGFyZSB0aHJvd24gaW4gdGhlIGNsaWVudC4gKFdlbGwuLi4gdGhhdCdzIHRoZSBpbnRlbnRpb24gYW55d2F5cylcbiAqXG4gKiBUaGUgZXhwZWN0YXRpb25zIHdvdWxkIGJlIGZvciBpbXBsZW1lbnRhdGlvbnMgdG8gc3Vic2NyaWJlXG4gKiB0byB0aGUgY2xpZW50J3MgZXJyb3IgZXZlbnQgdG8gcHJldmVudCBlcnJvcnMgZnJvbSBiZWluZyB0aHJvd25cbiAqIGFuZCB0aGVuIGRlY2lkZSBiYXNlZCBvbiB0aGUgZXZlbnQgYW5kIHRvcGljIHBhcmFtZXRlcnMgaG93XG4gKiB0byBoYW5kbGUgdGhlIGVycm9yc1xuICpcbiAqIElNUE9SVEFOVDogRXJyb3JzIHRoYXQgYXJlIHNwZWNpZmljIHRvIGEgcmVxdWVzdCwgZS5nLiBhIFJQQ1xuICogdGltaW5nIG91dCBvciBhIHJlY29yZCBub3QgYmVpbmcgcGVybWlzc2lvbmVkIGFyZSBwYXNzZWQgZGlyZWN0bHlcbiAqIHRvIHRoZSBtZXRob2QgdGhhdCByZXF1ZXN0ZWQgdGhlbVxuICpcbiAqIEBwYXJhbSAgIHtTdHJpbmd9IHRvcGljIE9uZSBvZiBDT05TVEFOVFMuVE9QSUNcbiAqIEBwYXJhbSAgIHtTdHJpbmd9IGV2ZW50IE9uZSBvZiBDT05TVEFOVFMuRVZFTlRcbiAqIEBwYXJhbSAgIHtTdHJpbmd9IG1zZyAgIEVycm9yIGRlcGVuZGVudCBtZXNzYWdlXG4gKlxuICogQHBhY2thZ2UgcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkNsaWVudC5wcm90b3R5cGUuXyRvbkVycm9yID0gZnVuY3Rpb24gKHRvcGljLCBldmVudCwgbXNnKSB7XG4gIHZhciBlcnJvck1zZyA9IHZvaWQgMDtcblxuICAvKlxuICAgKiBIZWxwIHRvIGRpYWdub3NlIHRoZSBwcm9ibGVtIHF1aWNrZXIgYnkgY2hlY2tpbmcgZm9yXG4gICAqIHNvbWUgY29tbW9uIHByb2JsZW1zXG4gICAqL1xuICBpZiAoZXZlbnQgPT09IEMuRVZFTlQuQUNLX1RJTUVPVVQgfHwgZXZlbnQgPT09IEMuRVZFTlQuUkVTUE9OU0VfVElNRU9VVCkge1xuICAgIGlmICh0aGlzLmdldENvbm5lY3Rpb25TdGF0ZSgpID09PSBDLkNPTk5FQ1RJT05fU1RBVEUuQVdBSVRJTkdfQVVUSEVOVElDQVRJT04pIHtcbiAgICAgIGVycm9yTXNnID0gJ1lvdXIgbWVzc2FnZSB0aW1lZCBvdXQgYmVjYXVzZSB5b3VcXCdyZSBub3QgYXV0aGVudGljYXRlZC4gSGF2ZSB5b3UgY2FsbGVkIGxvZ2luKCk/JztcbiAgICAgIHNldFRpbWVvdXQodGhpcy5fJG9uRXJyb3IuYmluZCh0aGlzLCBDLkVWRU5ULk5PVF9BVVRIRU5USUNBVEVELCBDLlRPUElDLkVSUk9SLCBlcnJvck1zZyksIDEpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aGlzLmhhc0xpc3RlbmVycygnZXJyb3InKSkge1xuICAgIHRoaXMuZW1pdCgnZXJyb3InLCBtc2csIGV2ZW50LCB0b3BpYyk7XG4gICAgdGhpcy5lbWl0KGV2ZW50LCB0b3BpYywgbXNnKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygnLS0tIFlvdSBjYW4gY2F0Y2ggYWxsIGRlZXBzdHJlYW0gZXJyb3JzIGJ5IHN1YnNjcmliaW5nIHRvIHRoZSBlcnJvciBldmVudCAtLS0nKTtcblxuICAgIGVycm9yTXNnID0gZXZlbnQgKyAnOiAnICsgbXNnO1xuXG4gICAgaWYgKHRvcGljKSB7XG4gICAgICBlcnJvck1zZyArPSAnICgnICsgdG9waWMgKyAnKSc7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKGVycm9yTXNnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBQYXNzZXMgZ2VuZXJpYyBtZXNzYWdlcyBmcm9tIHRoZSBlcnJvciB0b3BpY1xuICogdG8gdGhlIF8kb25FcnJvciBoYW5kbGVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVycm9yTWVzc2FnZSBwYXJzZWQgZGVlcHN0cmVhbSBlcnJvciBtZXNzYWdlXG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5DbGllbnQucHJvdG90eXBlLl9vbkVycm9yTWVzc2FnZSA9IGZ1bmN0aW9uIChlcnJvck1lc3NhZ2UpIHtcbiAgdGhpcy5fJG9uRXJyb3IoZXJyb3JNZXNzYWdlLnRvcGljLCBlcnJvck1lc3NhZ2UuZGF0YVswXSwgZXJyb3JNZXNzYWdlLmRhdGFbMV0pO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG9wdGlvbnMgbWFwIGJ5IGV4dGVuZGluZyBkZWZhdWx0XG4gKiBvcHRpb25zIHdpdGggdGhlIHBhc3NlZCBpbiBvcHRpb25zXG4gKlxuICogQHBhcmFtICAge09iamVjdH0gb3B0aW9ucyBUaGUgdXNlciBzcGVjaWZpZWQgY2xpZW50IGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSAgbWVyZ2VkIG9wdGlvbnNcbiAqL1xuQ2xpZW50LnByb3RvdHlwZS5fZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIHZhciBtZXJnZWRPcHRpb25zID0ge307XG5cbiAgZm9yICh2YXIga2V5IGluIGRlZmF1bHRPcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBtZXJnZWRPcHRpb25zW2tleV0gPSBkZWZhdWx0T3B0aW9uc1trZXldO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXJnZWRPcHRpb25zW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1lcmdlZE9wdGlvbnM7XG59O1xuXG4vKipcbiAqIEV4cG9ydHMgZmFjdG9yeSBmdW5jdGlvbiB0byBhZGp1c3QgdG8gdGhlIGN1cnJlbnQgSlMgc3R5bGUgb2ZcbiAqIGRpc2xpa2luZyAnbmV3JyA6LSlcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsICAgICBVUkwgdG8gY29ubmVjdCB0by4gVGhlIHByb3RvY29sIGNhbiBiZSBvbW1pdGVkLCBlLmcuIDxob3N0Pjo8cG9ydD4uXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBBIG1hcCBvZiBvcHRpb25zIHRoYXQgZXh0ZW5kIHRoZSBvbmVzIHNwZWNpZmllZCBpbiBkZWZhdWx0LW9wdGlvbnMuanNcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRGVlcHN0cmVhbSh1cmwsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBDbGllbnQodXJsLCBvcHRpb25zKTtcbn1cblxuLyoqXG4gKiBFeHBvc2UgY29uc3RhbnRzIHRvIGFsbG93IGNvbnN1bWVycyB0byBhY2Nlc3MgdGhlbVxuKi9cbkNsaWVudC5wcm90b3R5cGUuQ09OU1RBTlRTID0gQztcbmNyZWF0ZURlZXBzdHJlYW0uQ09OU1RBTlRTID0gQztcblxuLyoqXG4gKiBFeHBvc2UgbWVyZ2Ugc3RyYXRlZ2llcyB0byBhbGxvdyBjb25zdW1lcnMgdG8gYWNjZXNzIHRoZW1cbiovXG5DbGllbnQucHJvdG90eXBlLk1FUkdFX1NUUkFURUdJRVMgPSBNUztcbmNyZWF0ZURlZXBzdHJlYW0uTUVSR0VfU1RSQVRFR0lFUyA9IE1TO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZURlZXBzdHJlYW07XG5cbn0se1wiLi9jb25zdGFudHMvY29uc3RhbnRzXCI6MTEsXCIuL2NvbnN0YW50cy9tZXJnZS1zdHJhdGVnaWVzXCI6MTIsXCIuL2RlZmF1bHQtb3B0aW9uc1wiOjEzLFwiLi9ldmVudC9ldmVudC1oYW5kbGVyXCI6MTQsXCIuL21lc3NhZ2UvY29ubmVjdGlvblwiOjE1LFwiLi9wcmVzZW5jZS9wcmVzZW5jZS1oYW5kbGVyXCI6MTgsXCIuL3JlY29yZC9yZWNvcmQtaGFuZGxlclwiOjIyLFwiLi9ycGMvcnBjLWhhbmRsZXJcIjoyNCxcIi4vdXRpbHMvYWNrLXRpbWVvdXQtcmVnaXN0cnlcIjoyNyxcImNvbXBvbmVudC1lbWl0dGVyMlwiOjF9XSwxMTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuQ09OTkVDVElPTl9TVEFURSA9IHt9O1xuXG5leHBvcnRzLkNPTk5FQ1RJT05fU1RBVEUuQ0xPU0VEID0gJ0NMT1NFRCc7XG5leHBvcnRzLkNPTk5FQ1RJT05fU1RBVEUuQVdBSVRJTkdfQ09OTkVDVElPTiA9ICdBV0FJVElOR19DT05ORUNUSU9OJztcbmV4cG9ydHMuQ09OTkVDVElPTl9TVEFURS5DSEFMTEVOR0lORyA9ICdDSEFMTEVOR0lORyc7XG5leHBvcnRzLkNPTk5FQ1RJT05fU1RBVEUuQVdBSVRJTkdfQVVUSEVOVElDQVRJT04gPSAnQVdBSVRJTkdfQVVUSEVOVElDQVRJT04nO1xuZXhwb3J0cy5DT05ORUNUSU9OX1NUQVRFLkFVVEhFTlRJQ0FUSU5HID0gJ0FVVEhFTlRJQ0FUSU5HJztcbmV4cG9ydHMuQ09OTkVDVElPTl9TVEFURS5PUEVOID0gJ09QRU4nO1xuZXhwb3J0cy5DT05ORUNUSU9OX1NUQVRFLkVSUk9SID0gJ0VSUk9SJztcbmV4cG9ydHMuQ09OTkVDVElPTl9TVEFURS5SRUNPTk5FQ1RJTkcgPSAnUkVDT05ORUNUSU5HJztcblxuZXhwb3J0cy5NRVNTQUdFX1NFUEVSQVRPUiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMzApOyAvLyBBU0NJSSBSZWNvcmQgU2VwZXJhdG9yIDFFXG5leHBvcnRzLk1FU1NBR0VfUEFSVF9TRVBFUkFUT1IgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDMxKTsgLy8gQVNDSUkgVW5pdCBTZXBhcmF0b3IgMUZcblxuZXhwb3J0cy5UWVBFUyA9IHt9O1xuZXhwb3J0cy5UWVBFUy5TVFJJTkcgPSAnUyc7XG5leHBvcnRzLlRZUEVTLk9CSkVDVCA9ICdPJztcbmV4cG9ydHMuVFlQRVMuTlVNQkVSID0gJ04nO1xuZXhwb3J0cy5UWVBFUy5OVUxMID0gJ0wnO1xuZXhwb3J0cy5UWVBFUy5UUlVFID0gJ1QnO1xuZXhwb3J0cy5UWVBFUy5GQUxTRSA9ICdGJztcbmV4cG9ydHMuVFlQRVMuVU5ERUZJTkVEID0gJ1UnO1xuXG5leHBvcnRzLlRPUElDID0ge307XG5leHBvcnRzLlRPUElDLkNPTk5FQ1RJT04gPSAnQyc7XG5leHBvcnRzLlRPUElDLkFVVEggPSAnQSc7XG5leHBvcnRzLlRPUElDLkVSUk9SID0gJ1gnO1xuZXhwb3J0cy5UT1BJQy5FVkVOVCA9ICdFJztcbmV4cG9ydHMuVE9QSUMuUkVDT1JEID0gJ1InO1xuZXhwb3J0cy5UT1BJQy5SUEMgPSAnUCc7XG5leHBvcnRzLlRPUElDLlBSRVNFTkNFID0gJ1UnO1xuZXhwb3J0cy5UT1BJQy5QUklWQVRFID0gJ1BSSVZBVEUvJztcblxuZXhwb3J0cy5FVkVOVCA9IHt9O1xuZXhwb3J0cy5FVkVOVC5DT05ORUNUSU9OX0VSUk9SID0gJ2Nvbm5lY3Rpb25FcnJvcic7XG5leHBvcnRzLkVWRU5ULkNPTk5FQ1RJT05fU1RBVEVfQ0hBTkdFRCA9ICdjb25uZWN0aW9uU3RhdGVDaGFuZ2VkJztcbmV4cG9ydHMuRVZFTlQuTUFYX1JFQ09OTkVDVElPTl9BVFRFTVBUU19SRUFDSEVEID0gJ01BWF9SRUNPTk5FQ1RJT05fQVRURU1QVFNfUkVBQ0hFRCc7XG5leHBvcnRzLkVWRU5ULkNPTk5FQ1RJT05fQVVUSEVOVElDQVRJT05fVElNRU9VVCA9ICdDT05ORUNUSU9OX0FVVEhFTlRJQ0FUSU9OX1RJTUVPVVQnO1xuZXhwb3J0cy5FVkVOVC5BQ0tfVElNRU9VVCA9ICdBQ0tfVElNRU9VVCc7XG5leHBvcnRzLkVWRU5ULk5PX1JQQ19QUk9WSURFUiA9ICdOT19SUENfUFJPVklERVInO1xuZXhwb3J0cy5FVkVOVC5SRVNQT05TRV9USU1FT1VUID0gJ1JFU1BPTlNFX1RJTUVPVVQnO1xuZXhwb3J0cy5FVkVOVC5ERUxFVEVfVElNRU9VVCA9ICdERUxFVEVfVElNRU9VVCc7XG5leHBvcnRzLkVWRU5ULlVOU09MSUNJVEVEX01FU1NBR0UgPSAnVU5TT0xJQ0lURURfTUVTU0FHRSc7XG5leHBvcnRzLkVWRU5ULk1FU1NBR0VfREVOSUVEID0gJ01FU1NBR0VfREVOSUVEJztcbmV4cG9ydHMuRVZFTlQuTUVTU0FHRV9QQVJTRV9FUlJPUiA9ICdNRVNTQUdFX1BBUlNFX0VSUk9SJztcbmV4cG9ydHMuRVZFTlQuVkVSU0lPTl9FWElTVFMgPSAnVkVSU0lPTl9FWElTVFMnO1xuZXhwb3J0cy5FVkVOVC5OT1RfQVVUSEVOVElDQVRFRCA9ICdOT1RfQVVUSEVOVElDQVRFRCc7XG5leHBvcnRzLkVWRU5ULk1FU1NBR0VfUEVSTUlTU0lPTl9FUlJPUiA9ICdNRVNTQUdFX1BFUk1JU1NJT05fRVJST1InO1xuZXhwb3J0cy5FVkVOVC5MSVNURU5FUl9FWElTVFMgPSAnTElTVEVORVJfRVhJU1RTJztcbmV4cG9ydHMuRVZFTlQuTk9UX0xJU1RFTklORyA9ICdOT1RfTElTVEVOSU5HJztcbmV4cG9ydHMuRVZFTlQuVE9PX01BTllfQVVUSF9BVFRFTVBUUyA9ICdUT09fTUFOWV9BVVRIX0FUVEVNUFRTJztcbmV4cG9ydHMuRVZFTlQuSU5WQUxJRF9BVVRIX01TRyA9ICdJTlZBTElEX0FVVEhfTVNHJztcbmV4cG9ydHMuRVZFTlQuSVNfQ0xPU0VEID0gJ0lTX0NMT1NFRCc7XG5leHBvcnRzLkVWRU5ULlJFQ09SRF9OT1RfRk9VTkQgPSAnUkVDT1JEX05PVF9GT1VORCc7XG5leHBvcnRzLkVWRU5ULk5PVF9TVUJTQ1JJQkVEID0gJ05PVF9TVUJTQ1JJQkVEJztcblxuZXhwb3J0cy5BQ1RJT05TID0ge307XG5leHBvcnRzLkFDVElPTlMuUElORyA9ICdQSSc7XG5leHBvcnRzLkFDVElPTlMuUE9ORyA9ICdQTyc7XG5leHBvcnRzLkFDVElPTlMuQUNLID0gJ0EnO1xuZXhwb3J0cy5BQ1RJT05TLlJFRElSRUNUID0gJ1JFRCc7XG5leHBvcnRzLkFDVElPTlMuQ0hBTExFTkdFID0gJ0NIJztcbmV4cG9ydHMuQUNUSU9OUy5DSEFMTEVOR0VfUkVTUE9OU0UgPSAnQ0hSJztcbmV4cG9ydHMuQUNUSU9OUy5SRUFEID0gJ1InO1xuZXhwb3J0cy5BQ1RJT05TLkNSRUFURSA9ICdDJztcbmV4cG9ydHMuQUNUSU9OUy5VUERBVEUgPSAnVSc7XG5leHBvcnRzLkFDVElPTlMuUEFUQ0ggPSAnUCc7XG5leHBvcnRzLkFDVElPTlMuREVMRVRFID0gJ0QnO1xuZXhwb3J0cy5BQ1RJT05TLlNVQlNDUklCRSA9ICdTJztcbmV4cG9ydHMuQUNUSU9OUy5VTlNVQlNDUklCRSA9ICdVUyc7XG5leHBvcnRzLkFDVElPTlMuSEFTID0gJ0gnO1xuZXhwb3J0cy5BQ1RJT05TLlNOQVBTSE9UID0gJ1NOJztcbmV4cG9ydHMuQUNUSU9OUy5JTlZPS0UgPSAnSSc7XG5leHBvcnRzLkFDVElPTlMuU1VCU0NSSVBUSU9OX0ZPUl9QQVRURVJOX0ZPVU5EID0gJ1NQJztcbmV4cG9ydHMuQUNUSU9OUy5TVUJTQ1JJUFRJT05fRk9SX1BBVFRFUk5fUkVNT1ZFRCA9ICdTUic7XG5leHBvcnRzLkFDVElPTlMuU1VCU0NSSVBUSU9OX0hBU19QUk9WSURFUiA9ICdTSCc7XG5leHBvcnRzLkFDVElPTlMuTElTVEVOID0gJ0wnO1xuZXhwb3J0cy5BQ1RJT05TLlVOTElTVEVOID0gJ1VMJztcbmV4cG9ydHMuQUNUSU9OUy5MSVNURU5fQUNDRVBUID0gJ0xBJztcbmV4cG9ydHMuQUNUSU9OUy5MSVNURU5fUkVKRUNUID0gJ0xSJztcbmV4cG9ydHMuQUNUSU9OUy5QUk9WSURFUl9VUERBVEUgPSAnUFUnO1xuZXhwb3J0cy5BQ1RJT05TLlFVRVJZID0gJ1EnO1xuZXhwb3J0cy5BQ1RJT05TLkNSRUFURU9SUkVBRCA9ICdDUic7XG5leHBvcnRzLkFDVElPTlMuQ1JFQVRFQU5EVVBEQVRFID0gJ0NVJztcbmV4cG9ydHMuQUNUSU9OUy5FVkVOVCA9ICdFVlQnO1xuZXhwb3J0cy5BQ1RJT05TLkVSUk9SID0gJ0UnO1xuZXhwb3J0cy5BQ1RJT05TLlJFUVVFU1QgPSAnUkVRJztcbmV4cG9ydHMuQUNUSU9OUy5SRVNQT05TRSA9ICdSRVMnO1xuZXhwb3J0cy5BQ1RJT05TLlJFSkVDVElPTiA9ICdSRUonO1xuZXhwb3J0cy5BQ1RJT05TLlBSRVNFTkNFX0pPSU4gPSAnUE5KJztcbmV4cG9ydHMuQUNUSU9OUy5QUkVTRU5DRV9MRUFWRSA9ICdQTkwnO1xuZXhwb3J0cy5BQ1RJT05TLlFVRVJZID0gJ1EnO1xuZXhwb3J0cy5BQ1RJT05TLldSSVRFX0FDS05PV0xFREdFTUVOVCA9ICdXQSc7XG5cbmV4cG9ydHMuQ0FMTF9TVEFURSA9IHt9O1xuZXhwb3J0cy5DQUxMX1NUQVRFLklOSVRJQUwgPSAnSU5JVElBTCc7XG5leHBvcnRzLkNBTExfU1RBVEUuQ09OTkVDVElORyA9ICdDT05ORUNUSU5HJztcbmV4cG9ydHMuQ0FMTF9TVEFURS5FU1RBQkxJU0hFRCA9ICdFU1RBQkxJU0hFRCc7XG5leHBvcnRzLkNBTExfU1RBVEUuQUNDRVBURUQgPSAnQUNDRVBURUQnO1xuZXhwb3J0cy5DQUxMX1NUQVRFLkRFQ0xJTkVEID0gJ0RFQ0xJTkVEJztcbmV4cG9ydHMuQ0FMTF9TVEFURS5FTkRFRCA9ICdFTkRFRCc7XG5leHBvcnRzLkNBTExfU1RBVEUuRVJST1IgPSAnRVJST1InO1xuXG59LHt9XSwxMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvKipcbiAgKiAgQ2hvb3NlIHRoZSBzZXJ2ZXIncyBzdGF0ZSBvdmVyIHRoZSBjbGllbnQnc1xuICAqKi9cbiAgUkVNT1RFX1dJTlM6IGZ1bmN0aW9uIFJFTU9URV9XSU5TKHJlY29yZCwgcmVtb3RlVmFsdWUsIHJlbW90ZVZlcnNpb24sIGNhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2sobnVsbCwgcmVtb3RlVmFsdWUpO1xuICB9LFxuXG4gIC8qKlxuICAqICBDaG9vc2UgdGhlIGxvY2FsIHN0YXRlIG92ZXIgdGhlIHNlcnZlcidzXG4gICoqL1xuICBMT0NBTF9XSU5TOiBmdW5jdGlvbiBMT0NBTF9XSU5TKHJlY29yZCwgcmVtb3RlVmFsdWUsIHJlbW90ZVZlcnNpb24sIGNhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2sobnVsbCwgcmVjb3JkLmdldCgpKTtcbiAgfVxufTtcblxufSx7fV0sMTM6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTUVSR0VfU1RSQVRFR0lFUyA9IF9kZXJlcV8oJy4vY29uc3RhbnRzL21lcmdlLXN0cmF0ZWdpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge051bWJlcn0gaGVhcnRCZWF0SW50ZXJ2YWwgICAgICAgICAgIEhvdyBvZnRlbiB5b3UgZXhwZWN0IHRoZSBoZWFydGJlYXQgdG8gYmUgc2VudC5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZiB0d28gaGVhdGJlYXRzIGFyZSBtaXNzZWQgaW4gYSByb3cgdGhlIGNsaWVudFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbGwgY29uc2lkZXIgdGhlIHNlcnZlciB0byBoYXZlIGRpc2Nvbm5lY3RlZFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCB3aWxsIGNsb3NlIHRoZSBjb25uZWN0aW9uIGluIG9yZGVyIHRvXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXN0YWJsaXNoIGEgbmV3IG9uZS5cbiAgICovXG4gIGhlYXJ0YmVhdEludGVydmFsOiAzMDAwMCxcblxuICAvKipcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJlY29ubmVjdEludGVydmFsSW5jcmVtZW50ICBTcGVjaWZpZXMgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgYnlcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGljaCB0aGUgdGltZSB1bnRpbCB0aGUgbmV4dCByZWNvbm5lY3Rpb25cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRlbXB0IHdpbGwgYmUgaW5jcmVtZW50ZWQgYWZ0ZXIgZXZlcnlcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bnN1Y2Nlc2Z1bCBhdHRlbXB0LlxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEUuZy4gZm9yIDE1MDA6IGlmIHRoZSBjb25uZWN0aW9uIGlzIGxvc3QsXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIGNsaWVudCB3aWxsIGF0dGVtcHQgdG8gcmVjb25uZWN0IGltbWVkaWF0bHksXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgdGhhdCBmYWlscyBpdCB3aWxsIHRyeSBhZ2FpbiBhZnRlciAxLjUgc2Vjb25kcyxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiB0aGF0IGZhaWxzIGl0IHdpbGwgdHJ5IGFnYWluIGFmdGVyIDMgc2Vjb25kc1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBzbyBvblxuICAgKi9cbiAgcmVjb25uZWN0SW50ZXJ2YWxJbmNyZW1lbnQ6IDQwMDAsXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtYXhSZWNvbm5lY3RJbnRlcnZhbCAgICAgICAgU3BlY2lmaWVzIHRoZSBtYXhpbXVtIG51bWJlciBvZiBtaWxsaXNlY29uZHMgZm9yXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHJlY29ubmVjdEludGVydmFsSW5jcmVtZW50XG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGFtb3VudCBvZiByZWNvbm5lY3Rpb25zIHdpbGwgcmVhY2ggdGhpcyB2YWx1ZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW4gcmVjb25uZWN0SW50ZXJ2YWxJbmNyZW1lbnQgd2lsbCBiZSBpZ25vcmVkLlxuICAgKi9cbiAgbWF4UmVjb25uZWN0SW50ZXJ2YWw6IDE4MDAwMCxcblxuICAvKipcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG1heFJlY29ubmVjdEF0dGVtcHRzICAgICAgICBUaGUgbnVtYmVyIG9mIHJlY29ubmVjdGlvbiBhdHRlbXB0cyB1bnRpbCB0aGVcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQgZ2l2ZXMgdXAgYW5kIGRlY2xhcmVzIHRoZSBjb25uZWN0aW9uIGNsb3NlZFxuICAgKi9cbiAgbWF4UmVjb25uZWN0QXR0ZW1wdHM6IDUsXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBycGNBY2tUaW1lb3V0ICAgICAgICAgICAgICAgVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgYWZ0ZXIgd2hpY2ggYSBycGMgd2lsbFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZSBhbiBlcnJvciBpZiBubyBBY2stbWVzc2FnZSBoYXMgYmVlbiByZWNlaXZlZFxuICAgKi9cbiAgcnBjQWNrVGltZW91dDogNjAwMCxcblxuICAvKipcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJwY1Jlc3BvbnNlVGltZW91dCAgICAgICAgICBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBhZnRlciB3aGljaCBhIHJwYyB3aWxsXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlIGFuIGVycm9yIGlmIG5vIHJlc3BvbnNlLW1lc3NhZ2UgaGFzIGJlZW5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlaXZlZFxuICAgKi9cbiAgcnBjUmVzcG9uc2VUaW1lb3V0OiAxMDAwMCxcblxuICAvKipcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHN1YnNjcmlwdGlvblRpbWVvdXQgICAgICAgICBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGNhbiBwYXNzIGFmdGVyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkaW5nL3VucHJvdmlkaW5nIGEgUlBDIG9yIHN1YnNjcmliaW5nL1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuc3Vic2NyaWJpbmcvbGlzdGVuaW5nIHRvIGEgcmVjb3JkIGJlZm9yZSBhblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yIGlzIHRocm93blxuICAgKi9cbiAgc3Vic2NyaXB0aW9uVGltZW91dDogMjAwMCxcblxuICAvKipcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG1heE1lc3NhZ2VzUGVyUGFja2V0ICAgICAgICBJZiB0aGUgaW1wbGVtZW50YXRpb24gdHJpZXMgdG8gc2VuZCBhIGxhcmdlXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtYmVyIG9mIG1lc3NhZ2VzIGF0IHRoZSBzYW1lIHRpbWUsIHRoZSBkZWVwc3RyZWFtXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50IHdpbGwgdHJ5IHRvIHNwbGl0IHRoZW0gaW50byBzbWFsbGVyIHBhY2tldHNcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgc2VuZCB0aGVzZSBldmVyeVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aW1lQmV0d2VlblNlbmRpbmdRdWV1ZWRQYWNrYWdlcz4gbXMuXG4gICAqXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhpcyBwYXJhbWV0ZXIgc3BlY2lmaWVzIHRoZSBudW1iZXIgb2YgbWVzc2FnZXNcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZnRlciB3aGljaCBkZWVwc3RyZWFtIHNlbmRzIHRoZSBwYWNrZXQgYW5kXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVldWVzIHRoZSByZW1haW5pbmcgbWVzc2FnZXMuXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2V0IHRvIEluZmluaXR5IHRvIHR1cm4gdGhlIGZlYXR1cmUgb2ZmLlxuICAgKlxuICAgKi9cbiAgbWF4TWVzc2FnZXNQZXJQYWNrZXQ6IDEwMCxcblxuICAvKipcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVCZXR3ZWVuU2VuZGluZ1F1ZXVlZFBhY2thZ2VzXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGxlYXNlIHNlZSBkZXNjcmlwdGlvbiBmb3JcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhNZXNzYWdlc1BlclBhY2tldC4gU2V0cyB0aGUgdGltZSBpbiBtcy5cbiAgICovXG4gIHRpbWVCZXR3ZWVuU2VuZGluZ1F1ZXVlZFBhY2thZ2VzOiAxNixcblxuICAvKipcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJlY29yZFJlYWRBY2tUaW1lb3V0ICAgICAgIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGZyb20gdGhlIG1vbWVudFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50LnJlY29yZC5nZXRSZWNvcmQoKSBpcyBjYWxsZWQgdW50aWwgYW4gZXJyb3JcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzIHRocm93biBzaW5jZSBubyBhY2sgbWVzc2FnZSBoYXMgYmVlbiByZWNlaXZlZC5cbiAgICovXG4gIHJlY29yZFJlYWRBY2tUaW1lb3V0OiAxNTAwMCxcblxuICAvKipcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJlY29yZFJlYWRUaW1lb3V0ICAgICAgICAgICBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBmcm9tIHRoZSBtb21lbnRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQucmVjb3JkLmdldFJlY29yZCgpIGlzIGNhbGxlZCB1bnRpbCBhbiBlcnJvclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzIHRocm93biBzaW5jZSBubyBkYXRhIGhhcyBiZWVuIHJlY2VpdmVkLlxuICAgKi9cbiAgcmVjb3JkUmVhZFRpbWVvdXQ6IDE1MDAwLFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge051bWJlcn0gcmVjb3JkRGVsZXRlVGltZW91dCAgICAgICAgIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGZyb20gdGhlIG1vbWVudFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZC5kZWxldGUoKSBpcyBjYWxsZWQgdW50aWwgYW4gZXJyb3IgaXNcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvd24gc2luY2Ugbm8gZGVsZXRlIGFjayBtZXNzYWdlIGhhZCBiZWVuXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZWl2ZWQuXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGxlYXNlIHRha2UgaW50byBhY2NvdW50IHRoYXQgdGhlIGRlbGV0aW9uIGlzIG9ubHlcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZSBhZnRlciB0aGUgcmVjb3JkIGhhcyBiZWVuIGRlbGV0ZWQgZnJvbVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdGggY2FjaGUgYW5kIHN0b3JhZ2VcbiAgICovXG4gIHJlY29yZERlbGV0ZVRpbWVvdXQ6IDE1MDAwLFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCBwYXRoIHRvIGNvbm5lY3QgdG9cbiAgICovXG4gIHBhdGg6ICcvZGVlcHN0cmVhbScsXG5cbiAgLyoqXG4gICAqICBAcGFyYW0ge0Z1bmN0aW9ufSBtZXJnZVN0cmF0ZWd5ICAgICAgICAgICAgVGhpcyBwcm92aWRlcyB0aGUgZGVmYXVsdCBzdHJhdGVneSB1c2VkIHRvXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVhbCB3aXRoIG1lcmdlIGNvbmZsaWN0cy5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJZiB0aGUgbWVyZ2Ugc3RyYXRlZ3kgaXMgbm90IHN1Y2Nlc2Z1bGwgaXQgd2lsbFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldCBhbiBlcnJvciwgZWxzZSBzZXQgdGhlIHJldHVybmVkIGRhdGEgYXMgdGhlXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF0ZXN0IHJldmlzaW9uLiBUaGlzIGNhbiBiZSBvdmVycmlkZW4gb24gYSBwZXJcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNvcmQgYmFzaXMgYnkgc2V0dGluZyB0aGUgYHNldE1lcmdlU3RyYXRlZ3lgLlxuICAgKi9cbiAgbWVyZ2VTdHJhdGVneTogTUVSR0VfU1RSQVRFR0lFUy5SRU1PVEVfV0lOUyxcblxuICAvKipcbiAgICogQHBhcmFtIHtCb29sZWFufSByZWNvcmREZWVwQ29weSAgICAgICAgICAgICBTZXR0aW5nIHRvIGZhbHNlIGRpc2FibGVkIGRlZXBjb3B5aW5nIG9mIHJlY29yZFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgd2hlbiBwcm92aWRlZCB2aWEgYGdldCgpYCBpbiBhIGBzdWJzY3JpYmVgXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suIFRoaXMgaW1wcm92ZXMgc3BlZWQgYXQgdGhlIGV4cGVuc2Ugb2ZcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgdXNlciBoYXZpbmcgdG8gZW5zdXJlIG9iamVjdCBpbW11dGFiaWxpdHkuXG4gICAqL1xuICByZWNvcmREZWVwQ29weTogdHJ1ZSxcblxuICAvKipcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3dlYnNvY2tldHMvd3MvYmxvYi9tYXN0ZXIvZG9jL3dzLm1kI25ldy13ZWJzb2NrZXRhZGRyZXNzLXByb3RvY29scy1vcHRpb25zXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBub2RlU29ja2V0T3B0aW9ucyAgICAgICAgICAgT3B0aW9ucyB0byBwYXNzIHRvIHRoZSB3ZWJzb2NrZXQgY29uc3RydWN0b3IgaW5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLlxuICAgKiBAZGVmYXVsdCBudWxsXG4gICAqL1xuICBub2RlU29ja2V0T3B0aW9uczogbnVsbFxufTtcblxufSx7XCIuL2NvbnN0YW50cy9tZXJnZS1zdHJhdGVnaWVzXCI6MTJ9XSwxNDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBtZXNzYWdlQnVpbGRlciA9IF9kZXJlcV8oJy4uL21lc3NhZ2UvbWVzc2FnZS1idWlsZGVyJyk7XG52YXIgbWVzc2FnZVBhcnNlciA9IF9kZXJlcV8oJy4uL21lc3NhZ2UvbWVzc2FnZS1wYXJzZXInKTtcbnZhciBSZXN1YnNjcmliZU5vdGlmaWVyID0gX2RlcmVxXygnLi4vdXRpbHMvcmVzdWJzY3JpYmUtbm90aWZpZXInKTtcbnZhciBDID0gX2RlcmVxXygnLi4vY29uc3RhbnRzL2NvbnN0YW50cycpO1xudmFyIExpc3RlbmVyID0gX2RlcmVxXygnLi4vdXRpbHMvbGlzdGVuZXInKTtcbnZhciBFdmVudEVtaXR0ZXIgPSBfZGVyZXFfKCdjb21wb25lbnQtZW1pdHRlcjInKTtcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGhhbmRsZXMgaW5jb21pbmcgYW5kIG91dGdvaW5nIG1lc3NhZ2VzIGluIHJlbGF0aW9uXG4gKiB0byBkZWVwc3RyZWFtIGV2ZW50cy4gSXQgYmFzaWNhbGx5IGFjdHMgbGlrZSBhbiBldmVudC1odWIgdGhhdCdzXG4gKiByZXBsaWNhdGVkIGFjcm9zcyBhbGwgY29ubmVjdGVkIGNsaWVudHMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgICAgZGVlcHN0cmVhbSBvcHRpb25zXG4gKiBAcGFyYW0ge0Nvbm5lY3Rpb259IGNvbm5lY3Rpb25cbiAqIEBwYXJhbSB7Q2xpZW50fSBjbGllbnRcbiAqIEBwdWJsaWNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52YXIgRXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gRXZlbnRIYW5kbGVyKG9wdGlvbnMsIGNvbm5lY3Rpb24sIGNsaWVudCkge1xuICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5fY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XG4gIHRoaXMuX2NsaWVudCA9IGNsaWVudDtcbiAgdGhpcy5fZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgdGhpcy5fbGlzdGVuZXIgPSB7fTtcbiAgdGhpcy5fYWNrVGltZW91dFJlZ2lzdHJ5ID0gY2xpZW50Ll8kZ2V0QWNrVGltZW91dFJlZ2lzdHJ5KCk7XG4gIHRoaXMuX3Jlc3Vic2NyaWJlTm90aWZpZXIgPSBuZXcgUmVzdWJzY3JpYmVOb3RpZmllcih0aGlzLl9jbGllbnQsIHRoaXMuX3Jlc3Vic2NyaWJlLmJpbmQodGhpcykpO1xufTtcblxuLyoqXG4gKiBTdWJzY3JpYmUgdG8gYW4gZXZlbnQuIFRoaXMgd2lsbCByZWNlaXZlIGJvdGggbG9jYWxseSBlbWl0dGVkIGV2ZW50c1xuICogYXMgd2VsbCBhcyBldmVudHMgZW1pdHRlZCBieSBvdGhlciBjb25uZWN0ZWQgY2xpZW50cy5cbiAqXG4gKiBAcGFyYW0gICB7U3RyaW5nfSAgIG5hbWVcbiAqIEBwYXJhbSAgIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCBuYW1lLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBhcmd1bWVudCBuYW1lJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBhcmd1bWVudCBjYWxsYmFjaycpO1xuICB9XG5cbiAgaWYgKCF0aGlzLl9lbWl0dGVyLmhhc0xpc3RlbmVycyhuYW1lKSkge1xuICAgIHRoaXMuX2Fja1RpbWVvdXRSZWdpc3RyeS5hZGQoe1xuICAgICAgdG9waWM6IEMuVE9QSUMuRVZFTlQsXG4gICAgICBhY3Rpb246IEMuQUNUSU9OUy5TVUJTQ1JJQkUsXG4gICAgICBuYW1lOiBuYW1lXG4gICAgfSk7XG4gICAgdGhpcy5fY29ubmVjdGlvbi5zZW5kTXNnKEMuVE9QSUMuRVZFTlQsIEMuQUNUSU9OUy5TVUJTQ1JJQkUsIFtuYW1lXSk7XG4gIH1cblxuICB0aGlzLl9lbWl0dGVyLm9uKG5hbWUsIGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhIGNhbGxiYWNrIGZvciBhIHNwZWNpZmllZCBldmVudC4gSWYgYWxsIGNhbGxiYWNrc1xuICogZm9yIGFuIGV2ZW50IGhhdmUgYmVlbiByZW1vdmVkLCB0aGUgc2VydmVyIHdpbGwgYmUgbm90aWZpZWRcbiAqIHRoYXQgdGhlIGNsaWVudCBpcyB1bnN1YnNjcmliZWQgYXMgYSBsaXN0ZW5lclxuICpcbiAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgbmFtZVxuICogQHBhcmFtICAge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgbmFtZS5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgYXJndW1lbnQgbmFtZScpO1xuICB9XG4gIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBhcmd1bWVudCBjYWxsYmFjaycpO1xuICB9XG4gIHRoaXMuX2VtaXR0ZXIub2ZmKG5hbWUsIGNhbGxiYWNrKTtcblxuICBpZiAoIXRoaXMuX2VtaXR0ZXIuaGFzTGlzdGVuZXJzKG5hbWUpKSB7XG4gICAgdGhpcy5fYWNrVGltZW91dFJlZ2lzdHJ5LmFkZCh7XG4gICAgICB0b3BpYzogQy5UT1BJQy5FVkVOVCxcbiAgICAgIGFjdGlvbjogQy5BQ1RJT05TLlVOU1VCU0NSSUJFLFxuICAgICAgbmFtZTogbmFtZVxuICAgIH0pO1xuICAgIHRoaXMuX2Nvbm5lY3Rpb24uc2VuZE1zZyhDLlRPUElDLkVWRU5ULCBDLkFDVElPTlMuVU5TVUJTQ1JJQkUsIFtuYW1lXSk7XG4gIH1cbn07XG5cbi8qKlxuICogRW1pdHMgYW4gZXZlbnQgbG9jYWxseSBhbmQgc2VuZHMgYSBtZXNzYWdlIHRvIHRoZSBzZXJ2ZXIgdG9cbiAqIGJyb2FkY2FzdCB0aGUgZXZlbnQgdG8gdGhlIG90aGVyIGNvbm5lY3RlZCBjbGllbnRzXG4gKlxuICogQHBhcmFtICAge1N0cmluZ30gbmFtZVxuICogQHBhcmFtICAge01peGVkfSBkYXRhIHdpbGwgYmUgc2VyaWFsaXplZCBhbmQgZGVzZXJpYWxpemVkIHRvIGl0cyBvcmlnaW5hbCB0eXBlLlxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5FdmVudEhhbmRsZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAobmFtZSwgZGF0YSkge1xuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8IG5hbWUubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGFyZ3VtZW50IG5hbWUnKTtcbiAgfVxuXG4gIHRoaXMuX2Nvbm5lY3Rpb24uc2VuZE1zZyhDLlRPUElDLkVWRU5ULCBDLkFDVElPTlMuRVZFTlQsIFtuYW1lLCBtZXNzYWdlQnVpbGRlci50eXBlZChkYXRhKV0pO1xuICB0aGlzLl9lbWl0dGVyLmVtaXQobmFtZSwgZGF0YSk7XG59O1xuXG4vKipcbiAqIEFsbG93cyB0byBsaXN0ZW4gZm9yIGV2ZW50IHN1YnNjcmlwdGlvbnMgbWFkZSBieSB0aGlzIG9yIG90aGVyIGNsaWVudHMuIFRoaXNcbiAqIGlzIHVzZWZ1bCB0byBjcmVhdGUgXCJhY3RpdmVcIiBkYXRhIHByb3ZpZGVycywgZS5nLiBwcm92aWRlcnMgdGhhdCBvbmx5IHByb3ZpZGVcbiAqIGRhdGEgZm9yIGEgcGFydGljdWxhciBldmVudCBpZiBhIHVzZXIgaXMgYWN0dWFsbHkgaW50ZXJlc3RlZCBpbiBpdFxuICpcbiAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgcGF0dGVybiAgQSBjb21iaW5hdGlvbiBvZiBhbHBoYSBudW1lcmljIGNoYXJhY3RlcnMgYW5kIHdpbGRjYXJkcyggKiApXG4gKiBAcGFyYW0gICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkV2ZW50SGFuZGxlci5wcm90b3R5cGUubGlzdGVuID0gZnVuY3Rpb24gKHBhdHRlcm4sIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgcGF0dGVybiAhPT0gJ3N0cmluZycgfHwgcGF0dGVybi5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgYXJndW1lbnQgcGF0dGVybicpO1xuICB9XG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgYXJndW1lbnQgY2FsbGJhY2snKTtcbiAgfVxuXG4gIGlmICh0aGlzLl9saXN0ZW5lcltwYXR0ZXJuXSAmJiAhdGhpcy5fbGlzdGVuZXJbcGF0dGVybl0uZGVzdHJveVBlbmRpbmcpIHtcbiAgICB0aGlzLl9jbGllbnQuXyRvbkVycm9yKEMuVE9QSUMuRVZFTlQsIEMuRVZFTlQuTElTVEVORVJfRVhJU1RTLCBwYXR0ZXJuKTtcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAodGhpcy5fbGlzdGVuZXJbcGF0dGVybl0pIHtcbiAgICB0aGlzLl9saXN0ZW5lcltwYXR0ZXJuXS5kZXN0cm95KCk7XG4gIH1cblxuICB0aGlzLl9saXN0ZW5lcltwYXR0ZXJuXSA9IG5ldyBMaXN0ZW5lcihDLlRPUElDLkVWRU5ULCBwYXR0ZXJuLCBjYWxsYmFjaywgdGhpcy5fb3B0aW9ucywgdGhpcy5fY2xpZW50LCB0aGlzLl9jb25uZWN0aW9uKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhIGxpc3RlbmVyIHRoYXQgd2FzIHByZXZpb3VzbHkgcmVnaXN0ZXJlZCB3aXRoIGxpc3RlbkZvclN1YnNjcmlwdGlvbnNcbiAqXG4gKiBAcGFyYW0gICB7U3RyaW5nfSAgIHBhdHRlcm4gIEEgY29tYmluYXRpb24gb2YgYWxwaGEgbnVtZXJpYyBjaGFyYWN0ZXJzIGFuZCB3aWxkY2FyZHMoICogKVxuICogQHBhcmFtICAge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnVubGlzdGVuID0gZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgaWYgKHR5cGVvZiBwYXR0ZXJuICE9PSAnc3RyaW5nJyB8fCBwYXR0ZXJuLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBhcmd1bWVudCBwYXR0ZXJuJyk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSB0aGlzLl9saXN0ZW5lcltwYXR0ZXJuXTtcblxuICBpZiAobGlzdGVuZXIgJiYgIWxpc3RlbmVyLmRlc3Ryb3lQZW5kaW5nKSB7XG4gICAgbGlzdGVuZXIuc2VuZERlc3Ryb3koKTtcbiAgfSBlbHNlIGlmICh0aGlzLl9saXN0ZW5lcltwYXR0ZXJuXSkge1xuICAgIHRoaXMuX2Fja1RpbWVvdXRSZWdpc3RyeS5hZGQoe1xuICAgICAgdG9waWM6IEMuVE9QSUMuRVZFTlQsXG4gICAgICBhY3Rpb246IEMuRVZFTlQuVU5MSVNURU4sXG4gICAgICBuYW1lOiBwYXR0ZXJuXG4gICAgfSk7XG4gICAgdGhpcy5fbGlzdGVuZXJbcGF0dGVybl0uZGVzdHJveSgpO1xuICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcltwYXR0ZXJuXTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9jbGllbnQuXyRvbkVycm9yKEMuVE9QSUMuUkVDT1JELCBDLkVWRU5ULk5PVF9MSVNURU5JTkcsIHBhdHRlcm4pO1xuICB9XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgaW5jb21pbmcgbWVzc2FnZXMgZnJvbSB0aGUgc2VydmVyXG4gKlxuICogQHBhcmFtICAge09iamVjdH0gbWVzc2FnZSBwYXJzZWQgZGVlcHN0cmVhbSBtZXNzYWdlXG4gKlxuICogQHBhY2thZ2UgcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkV2ZW50SGFuZGxlci5wcm90b3R5cGUuXyRoYW5kbGUgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICB2YXIgbmFtZSA9IG1lc3NhZ2UuZGF0YVttZXNzYWdlLmFjdGlvbiA9PT0gQy5BQ1RJT05TLkFDSyA/IDEgOiAwXTtcblxuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5FVkVOVCkge1xuICAgIGlmIChtZXNzYWdlLmRhdGEgJiYgbWVzc2FnZS5kYXRhLmxlbmd0aCA9PT0gMikge1xuICAgICAgdGhpcy5fZW1pdHRlci5lbWl0KG5hbWUsIG1lc3NhZ2VQYXJzZXIuY29udmVydFR5cGVkKG1lc3NhZ2UuZGF0YVsxXSwgdGhpcy5fY2xpZW50KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VtaXR0ZXIuZW1pdChuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBDLkFDVElPTlMuQUNLICYmIG1lc3NhZ2UuZGF0YVswXSA9PT0gQy5BQ1RJT05TLlVOTElTVEVOICYmIHRoaXMuX2xpc3RlbmVyW25hbWVdICYmIHRoaXMuX2xpc3RlbmVyW25hbWVdLmRlc3Ryb3lQZW5kaW5nKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJbbmFtZV0uZGVzdHJveSgpO1xuICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcltuYW1lXTtcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAodGhpcy5fbGlzdGVuZXJbbmFtZV0pIHtcbiAgICB0aGlzLl9saXN0ZW5lcltuYW1lXS5fJG9uTWVzc2FnZShtZXNzYWdlKTtcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5TVUJTQ1JJUFRJT05fRk9SX1BBVFRFUk5fUkVNT1ZFRCkge1xuICAgIC8vIEFuIHVubGlzdGVuIEFDSyB3YXMgcmVjZWl2ZWQgYmVmb3JlIGFuIFBBVFRFUk5fUkVNT1ZFRCB3aGljaCBpcyBhIHZhbGlkIGNhc2VcbiAgICByZXR1cm47XG4gIH0gZWxzZSBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5TVUJTQ1JJUFRJT05fSEFTX1BST1ZJREVSKSB7XG4gICAgLy8gcmVjb3JkIGNhbiByZWNlaXZlIGEgSEFTX1BST1ZJREVSIGFmdGVyIGRpc2NhcmRpbmcgdGhlIHJlY29yZFxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gQy5BQ1RJT05TLkFDSykge1xuICAgIHRoaXMuX2Fja1RpbWVvdXRSZWdpc3RyeS5jbGVhcihtZXNzYWdlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5FUlJPUikge1xuICAgIGlmIChtZXNzYWdlLmRhdGFbMF0gPT09IEMuRVZFTlQuTUVTU0FHRV9ERU5JRUQpIHtcbiAgICAgIHRoaXMuX2Fja1RpbWVvdXRSZWdpc3RyeS5yZW1vdmUoe1xuICAgICAgICB0b3BpYzogQy5UT1BJQy5FVkVOVCxcbiAgICAgICAgbmFtZTogbWVzc2FnZS5kYXRhWzFdLFxuICAgICAgICBhY3Rpb246IG1lc3NhZ2UuZGF0YVsyXVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlLmRhdGFbMF0gPT09IEMuRVZFTlQuTk9UX1NVQlNDUklCRUQpIHtcbiAgICAgIHRoaXMuX2Fja1RpbWVvdXRSZWdpc3RyeS5yZW1vdmUoe1xuICAgICAgICB0b3BpYzogQy5UT1BJQy5FVkVOVCxcbiAgICAgICAgbmFtZTogbWVzc2FnZS5kYXRhWzFdLFxuICAgICAgICBhY3Rpb246IEMuQUNUSU9OUy5VTlNVQlNDUklCRVxuICAgICAgfSk7XG4gICAgfVxuICAgIG1lc3NhZ2UucHJvY2Vzc2VkRXJyb3IgPSB0cnVlO1xuICAgIHRoaXMuX2NsaWVudC5fJG9uRXJyb3IoQy5UT1BJQy5FVkVOVCwgbWVzc2FnZS5kYXRhWzBdLCBtZXNzYWdlLmRhdGFbMV0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuX2NsaWVudC5fJG9uRXJyb3IoQy5UT1BJQy5FVkVOVCwgQy5FVkVOVC5VTlNPTElDSVRFRF9NRVNTQUdFLCBuYW1lKTtcbn07XG5cbi8qKlxuICogUmVzdWJzY3JpYmVzIHRvIGV2ZW50cyB3aGVuIGNvbm5lY3Rpb24gaXMgbG9zdFxuICpcbiAqIEBwYWNrYWdlIHByaXZhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5FdmVudEhhbmRsZXIucHJvdG90eXBlLl9yZXN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2VtaXR0ZXIuX2NhbGxiYWNrcztcbiAgZm9yICh2YXIgZXZlbnROYW1lIGluIGNhbGxiYWNrcykge1xuICAgIHRoaXMuX2Nvbm5lY3Rpb24uc2VuZE1zZyhDLlRPUElDLkVWRU5ULCBDLkFDVElPTlMuU1VCU0NSSUJFLCBbZXZlbnROYW1lXSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRIYW5kbGVyO1xuXG59LHtcIi4uL2NvbnN0YW50cy9jb25zdGFudHNcIjoxMSxcIi4uL21lc3NhZ2UvbWVzc2FnZS1idWlsZGVyXCI6MTYsXCIuLi9tZXNzYWdlL21lc3NhZ2UtcGFyc2VyXCI6MTcsXCIuLi91dGlscy9saXN0ZW5lclwiOjI4LFwiLi4vdXRpbHMvcmVzdWJzY3JpYmUtbm90aWZpZXJcIjoyOSxcImNvbXBvbmVudC1lbWl0dGVyMlwiOjF9XSwxNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIEJyb3dzZXJXZWJTb2NrZXQgPSBnbG9iYWwuV2ViU29ja2V0IHx8IGdsb2JhbC5Nb3pXZWJTb2NrZXQ7XG52YXIgTm9kZVdlYlNvY2tldCA9IF9kZXJlcV8oJ3dzJyk7XG52YXIgbWVzc2FnZVBhcnNlciA9IF9kZXJlcV8oJy4vbWVzc2FnZS1wYXJzZXInKTtcbnZhciBtZXNzYWdlQnVpbGRlciA9IF9kZXJlcV8oJy4vbWVzc2FnZS1idWlsZGVyJyk7XG52YXIgdXRpbHMgPSBfZGVyZXFfKCcuLi91dGlscy91dGlscycpO1xudmFyIEMgPSBfZGVyZXFfKCcuLi9jb25zdGFudHMvY29uc3RhbnRzJyk7XG5cbi8qKlxuICogRXN0YWJsaXNoZXMgYSBjb25uZWN0aW9uIHRvIGEgZGVlcHN0cmVhbSBzZXJ2ZXIgdXNpbmcgd2Vic29ja2V0c1xuICpcbiAqIEBwYXJhbSB7Q2xpZW50fSBjbGllbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgICAgIFNob3J0IHVybCwgZS5nLiA8aG9zdD46PHBvcnQ+LiBEZWVwc3RyZWFtIHdvcmtzIG91dCB0aGUgcHJvdG9jb2xcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIGNvbm5lY3Rpb24gb3B0aW9uc1xuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52YXIgQ29ubmVjdGlvbiA9IGZ1bmN0aW9uIENvbm5lY3Rpb24oY2xpZW50LCB1cmwsIG9wdGlvbnMpIHtcbiAgdGhpcy5fY2xpZW50ID0gY2xpZW50O1xuICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5fYXV0aFBhcmFtcyA9IG51bGw7XG4gIHRoaXMuX2F1dGhDYWxsYmFjayA9IG51bGw7XG4gIHRoaXMuX2RlbGliZXJhdGVDbG9zZSA9IGZhbHNlO1xuICB0aGlzLl9yZWRpcmVjdGluZyA9IGZhbHNlO1xuICB0aGlzLl90b29NYW55QXV0aEF0dGVtcHRzID0gZmFsc2U7XG4gIHRoaXMuX2Nvbm5lY3Rpb25BdXRoZW50aWNhdGlvblRpbWVvdXQgPSBmYWxzZTtcbiAgdGhpcy5fY2hhbGxlbmdlRGVuaWVkID0gZmFsc2U7XG4gIHRoaXMuX3F1ZXVlZE1lc3NhZ2VzID0gW107XG4gIHRoaXMuX3JlY29ubmVjdFRpbWVvdXQgPSBudWxsO1xuICB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0ID0gMDtcbiAgdGhpcy5fY3VycmVudFBhY2tldE1lc3NhZ2VDb3VudCA9IDA7XG4gIHRoaXMuX3NlbmROZXh0UGFja2V0VGltZW91dCA9IG51bGw7XG4gIHRoaXMuX2N1cnJlbnRNZXNzYWdlUmVzZXRUaW1lb3V0ID0gbnVsbDtcbiAgdGhpcy5fZW5kcG9pbnQgPSBudWxsO1xuICB0aGlzLl9sYXN0SGVhcnRCZWF0ID0gbnVsbDtcbiAgdGhpcy5faGVhcnRiZWF0SW50ZXJ2YWwgPSBudWxsO1xuXG4gIHRoaXMuX29yaWdpbmFsVXJsID0gdXRpbHMucGFyc2VVcmwodXJsLCB0aGlzLl9vcHRpb25zLnBhdGgpO1xuICB0aGlzLl91cmwgPSB0aGlzLl9vcmlnaW5hbFVybDtcblxuICB0aGlzLl9zdGF0ZSA9IEMuQ09OTkVDVElPTl9TVEFURS5DTE9TRUQ7XG4gIHRoaXMuX2NyZWF0ZUVuZHBvaW50KCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGN1cnJlbnQgY29ubmVjdGlvbiBzdGF0ZS5cbiAqIChPbmUgb2YgY29uc3RhbnRzLkNPTk5FQ1RJT05fU1RBVEUpXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge1N0cmluZ30gY29ubmVjdGlvblN0YXRlXG4gKi9cbkNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5fc3RhdGU7XG59O1xuXG4vKipcbiAqIFNlbmRzIHRoZSBzcGVjaWZpZWQgYXV0aGVudGljYXRpb24gcGFyYW1ldGVyc1xuICogdG8gdGhlIHNlcnZlci4gQ2FuIGJlIGNhbGxlZCB1cCB0byA8bWF4QXV0aEF0dGVtcHRzPlxuICogdGltZXMgZm9yIHRoZSBzYW1lIGNvbm5lY3Rpb24uXG4gKlxuICogQHBhcmFtICAge09iamVjdH0gICBhdXRoUGFyYW1zIEEgbWFwIG9mIHVzZXIgZGVmaW5lZCBhdXRoIHBhcmFtZXRlcnMuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRS5nLiB7IHVzZXJuYW1lOjxTdHJpbmc+LCBwYXNzd29yZDo8U3RyaW5nPiB9XG4gKiBAcGFyYW0gICB7RnVuY3Rpb259IGNhbGxiYWNrICAgQSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgaW52b2tlZCB3aXRoIHRoZSBhdXRoZW50aWNhdGlvbnIgcmVzdWx0XG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkNvbm5lY3Rpb24ucHJvdG90eXBlLmF1dGhlbnRpY2F0ZSA9IGZ1bmN0aW9uIChhdXRoUGFyYW1zLCBjYWxsYmFjaykge1xuICBpZiAoKHR5cGVvZiBhdXRoUGFyYW1zID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihhdXRoUGFyYW1zKSkgIT09ICdvYmplY3QnKSB7XG4gICAgdGhpcy5fY2xpZW50Ll8kb25FcnJvcihDLlRPUElDLkVSUk9SLCBDLkVWRU5ULklOVkFMSURfQVVUSF9NU0csICdhdXRoUGFyYW1zIGlzIG5vdCBhbiBvYmplY3QnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLl9hdXRoUGFyYW1zID0gYXV0aFBhcmFtcztcbiAgdGhpcy5fYXV0aENhbGxiYWNrID0gY2FsbGJhY2s7XG5cbiAgaWYgKHRoaXMuX3Rvb01hbnlBdXRoQXR0ZW1wdHMgfHwgdGhpcy5fY2hhbGxlbmdlRGVuaWVkIHx8IHRoaXMuX2Nvbm5lY3Rpb25BdXRoZW50aWNhdGlvblRpbWVvdXQpIHtcbiAgICB0aGlzLl9jbGllbnQuXyRvbkVycm9yKEMuVE9QSUMuRVJST1IsIEMuRVZFTlQuSVNfQ0xPU0VELCAndGhpcyBjbGllbnRcXCdzIGNvbm5lY3Rpb24gd2FzIGNsb3NlZCcpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmICh0aGlzLl9kZWxpYmVyYXRlQ2xvc2UgPT09IHRydWUgJiYgdGhpcy5fc3RhdGUgPT09IEMuQ09OTkVDVElPTl9TVEFURS5DTE9TRUQpIHtcbiAgICB0aGlzLl9jcmVhdGVFbmRwb2ludCgpO1xuICAgIHRoaXMuX2RlbGliZXJhdGVDbG9zZSA9IGZhbHNlO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0aGlzLl9zdGF0ZSA9PT0gQy5DT05ORUNUSU9OX1NUQVRFLkFXQUlUSU5HX0FVVEhFTlRJQ0FUSU9OKSB7XG4gICAgdGhpcy5fc2VuZEF1dGhQYXJhbXMoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBIaWdoIGxldmVsIHNlbmQgbWVzc2FnZSBtZXRob2QuIENyZWF0ZXMgYSBkZWVwc3RyZWFtIG1lc3NhZ2VcbiAqIHN0cmluZyBhbmQgaW52b2tlcyB0aGUgYWN0dWFsIHNlbmQgbWV0aG9kLlxuICpcbiAqIEBwYXJhbSAgIHtTdHJpbmd9IHRvcGljICBPbmUgb2YgQy5UT1BJQ1xuICogQHBhcmFtICAge1N0cmluZ30gYWN0aW9uIE9uZSBvZiBDLkFDVElPTlNcbiAqIEBwYXJhbSAgIHtbTWl4ZWRdfSBkYXRhICAgRGF0ZSB0aGF0IHdpbGwgYmUgYWRkZWQgdG8gdGhlIG1lc3NhZ2UuIFByaW1pdGl2ZSB2YWx1ZXMgd2lsbFxuICogICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGFwcGVuZGVkIGRpcmVjdGx5LCBvYmplY3RzIGFuZCBhcnJheXMgd2lsbCBiZSBzZXJpYWxpemVkIGFzIEpTT05cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkNvbm5lY3Rpb24ucHJvdG90eXBlLnNlbmRNc2cgPSBmdW5jdGlvbiAodG9waWMsIGFjdGlvbiwgZGF0YSkge1xuICB0aGlzLnNlbmQobWVzc2FnZUJ1aWxkZXIuZ2V0TXNnKHRvcGljLCBhY3Rpb24sIGRhdGEpKTtcbn07XG5cbi8qKlxuICogTWFpbiBtZXRob2QgZm9yIHNlbmRpbmcgbWVzc2FnZXMuIERvZXNuJ3Qgc2VuZCBtZXNzYWdlcyBpbnN0YW50bHksXG4gKiBidXQgaW5zdGVhZCBhY2hpZXZlcyBjb25mbGF0aW9uIGJ5IGFkZGluZyB0aGVtIHRvIHRoZSBtZXNzYWdlXG4gKiBidWZmZXIgdGhhdCB3aWxsIGJlIGRyYWluZWQgb24gdGhlIG5leHQgdGlja1xuICpcbiAqIEBwYXJhbSAgIHtTdHJpbmd9IG1lc3NhZ2UgZGVlcHN0cmVhbSBtZXNzYWdlXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkNvbm5lY3Rpb24ucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICB0aGlzLl9xdWV1ZWRNZXNzYWdlcy5wdXNoKG1lc3NhZ2UpO1xuICB0aGlzLl9jdXJyZW50UGFja2V0TWVzc2FnZUNvdW50Kys7XG5cbiAgaWYgKHRoaXMuX2N1cnJlbnRNZXNzYWdlUmVzZXRUaW1lb3V0ID09PSBudWxsKSB7XG4gICAgdGhpcy5fY3VycmVudE1lc3NhZ2VSZXNldFRpbWVvdXQgPSB1dGlscy5uZXh0VGljayh0aGlzLl9yZXNldEN1cnJlbnRNZXNzYWdlQ291bnQuYmluZCh0aGlzKSk7XG4gIH1cblxuICBpZiAodGhpcy5fc3RhdGUgPT09IEMuQ09OTkVDVElPTl9TVEFURS5PUEVOICYmIHRoaXMuX3F1ZXVlZE1lc3NhZ2VzLmxlbmd0aCA8IHRoaXMuX29wdGlvbnMubWF4TWVzc2FnZXNQZXJQYWNrZXQgJiYgdGhpcy5fY3VycmVudFBhY2tldE1lc3NhZ2VDb3VudCA8IHRoaXMuX29wdGlvbnMubWF4TWVzc2FnZXNQZXJQYWNrZXQpIHtcbiAgICB0aGlzLl9zZW5kUXVldWVkTWVzc2FnZXMoKTtcbiAgfSBlbHNlIGlmICh0aGlzLl9zZW5kTmV4dFBhY2tldFRpbWVvdXQgPT09IG51bGwpIHtcbiAgICB0aGlzLl9xdWV1ZU5leHRQYWNrZXQoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDbG9zZXMgdGhlIGNvbm5lY3Rpb24uIFVzaW5nIHRoaXMgbWV0aG9kXG4gKiBzZXRzIGEgX2RlbGliZXJhdGVDbG9zZSBmbGFnIHRoYXQgd2lsbCBwcmV2ZW50IHRoZSBjbGllbnQgZnJvbVxuICogcmVjb25uZWN0aW5nLlxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5Db25uZWN0aW9uLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgY2xlYXJJbnRlcnZhbCh0aGlzLl9oZWFydGJlYXRJbnRlcnZhbCk7XG4gIHRoaXMuX2RlbGliZXJhdGVDbG9zZSA9IHRydWU7XG4gIHRoaXMuX2VuZHBvaW50LmNsb3NlKCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgdGhlIGVuZHBvaW50IHRvIGNvbm5lY3QgdG8gdXNpbmcgdGhlIHVybCBkZWVwc3RyZWFtXG4gKiB3YXMgaW5pdGlhbGlzZWQgd2l0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVFbmRwb2ludCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fZW5kcG9pbnQgPSBCcm93c2VyV2ViU29ja2V0ID8gbmV3IEJyb3dzZXJXZWJTb2NrZXQodGhpcy5fdXJsKSA6IG5ldyBOb2RlV2ViU29ja2V0KHRoaXMuX3VybCwgdGhpcy5fb3B0aW9ucy5ub2RlU29ja2V0T3B0aW9ucyk7XG5cbiAgdGhpcy5fZW5kcG9pbnQub25vcGVuID0gdGhpcy5fb25PcGVuLmJpbmQodGhpcyk7XG4gIHRoaXMuX2VuZHBvaW50Lm9uZXJyb3IgPSB0aGlzLl9vbkVycm9yLmJpbmQodGhpcyk7XG4gIHRoaXMuX2VuZHBvaW50Lm9uY2xvc2UgPSB0aGlzLl9vbkNsb3NlLmJpbmQodGhpcyk7XG4gIHRoaXMuX2VuZHBvaW50Lm9ubWVzc2FnZSA9IHRoaXMuX29uTWVzc2FnZS5iaW5kKHRoaXMpO1xufTtcblxuLyoqXG4gKiBXaGVuIHRoZSBpbXBsZW1lbnRhdGlvbiB0cmllcyB0byBzZW5kIGEgbGFyZ2VcbiAqIG51bWJlciBvZiBtZXNzYWdlcyBpbiBvbmUgZXhlY3V0aW9uIHRocmVhZCwgdGhlIGZpcnN0XG4gKiA8bWF4TWVzc2FnZXNQZXJQYWNrZXQ+IGFyZSBzZW5kIHN0cmFpZ2h0IGF3YXkuXG4gKlxuICogX2N1cnJlbnRQYWNrZXRNZXNzYWdlQ291bnQga2VlcHMgdHJhY2sgb2YgaG93IG1hbnkgbWVzc2FnZXNcbiAqIHdlbnQgaW50byB0aGF0IGZpcnN0IHBhY2tldC4gT25jZSB0aGlzIG51bWJlciBoYXMgYmVlbiBleGNlZWRlZFxuICogdGhlIHJlbWFpbmluZyBtZXNzYWdlcyBhcmUgd3JpdHRlbiB0byBhIHF1ZXVlIGFuZCB0aGlzIG1lc3NhZ2VcbiAqIGlzIGludm9rZWQgb24gYSB0aW1lb3V0IHRvIHJlc2V0IHRoZSBjb3VudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkNvbm5lY3Rpb24ucHJvdG90eXBlLl9yZXNldEN1cnJlbnRNZXNzYWdlQ291bnQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX2N1cnJlbnRQYWNrZXRNZXNzYWdlQ291bnQgPSAwO1xuICB0aGlzLl9jdXJyZW50TWVzc2FnZVJlc2V0VGltZW91dCA9IG51bGw7XG59O1xuXG4vKipcbiAqIENvbmNhdGVuYXRlcyB0aGUgbWVzc2FnZXMgaW4gdGhlIGN1cnJlbnQgbWVzc2FnZSBxdWV1ZVxuICogYW5kIHNlbmRzIHRoZW0gYXMgYSBzaW5nbGUgcGFja2FnZS4gVGhpcyB3aWxsIGFsc29cbiAqIGVtcHR5IHRoZSBtZXNzYWdlIHF1ZXVlIGFuZCBjb25jbHVkZSB0aGUgc2VuZCBwcm9jZXNzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuQ29ubmVjdGlvbi5wcm90b3R5cGUuX3NlbmRRdWV1ZWRNZXNzYWdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuX3N0YXRlICE9PSBDLkNPTk5FQ1RJT05fU1RBVEUuT1BFTiB8fCB0aGlzLl9lbmRwb2ludC5yZWFkeVN0YXRlICE9PSB0aGlzLl9lbmRwb2ludC5PUEVOKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRoaXMuX3F1ZXVlZE1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRoaXMuX3NlbmROZXh0UGFja2V0VGltZW91dCA9IG51bGw7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG1lc3NhZ2UgPSB0aGlzLl9xdWV1ZWRNZXNzYWdlcy5zcGxpY2UoMCwgdGhpcy5fb3B0aW9ucy5tYXhNZXNzYWdlc1BlclBhY2tldCkuam9pbignJyk7XG5cbiAgaWYgKHRoaXMuX3F1ZXVlZE1lc3NhZ2VzLmxlbmd0aCAhPT0gMCkge1xuICAgIHRoaXMuX3F1ZXVlTmV4dFBhY2tldCgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX3NlbmROZXh0UGFja2V0VGltZW91dCA9IG51bGw7XG4gIH1cblxuICB0aGlzLl9zdWJtaXQobWVzc2FnZSk7XG59O1xuXG4vKipcbiAqIFNlbmRzIGEgbWVzc2FnZSB0byBvdmVyIHRoZSBlbmRwb2ludCBjb25uZWN0aW9uIGRpcmVjdGx5XG4gKlxuICogV2lsbCBnZW5lcmF0ZSBhIGNvbm5lY3Rpb24gZXJyb3IgaWYgdGhlIHdlYnNvY2tldCB3YXMgY2xvc2VkXG4gKiBwcmlvciB0byBhbiBvbmNsb3NlIGV2ZW50LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuQ29ubmVjdGlvbi5wcm90b3R5cGUuX3N1Ym1pdCA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gIGlmICh0aGlzLl9lbmRwb2ludC5yZWFkeVN0YXRlID09PSB0aGlzLl9lbmRwb2ludC5PUEVOKSB7XG4gICAgdGhpcy5fZW5kcG9pbnQuc2VuZChtZXNzYWdlKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9vbkVycm9yKCdUcmllZCB0byBzZW5kIG1lc3NhZ2Ugb24gYSBjbG9zZWQgd2Vic29ja2V0IGNvbm5lY3Rpb24nKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTY2hlZHVsZXMgdGhlIG5leHQgcGFja2V0IHdoaWxzdCB0aGUgY29ubmVjdGlvbiBpcyB1bmRlclxuICogaGVhdnkgbG9hZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkNvbm5lY3Rpb24ucHJvdG90eXBlLl9xdWV1ZU5leHRQYWNrZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBmbiA9IHRoaXMuX3NlbmRRdWV1ZWRNZXNzYWdlcy5iaW5kKHRoaXMpO1xuICB2YXIgZGVsYXkgPSB0aGlzLl9vcHRpb25zLnRpbWVCZXR3ZWVuU2VuZGluZ1F1ZXVlZFBhY2thZ2VzO1xuXG4gIHRoaXMuX3NlbmROZXh0UGFja2V0VGltZW91dCA9IHNldFRpbWVvdXQoZm4sIGRlbGF5KTtcbn07XG5cbi8qKlxuICogU2VuZHMgYXV0aGVudGljYXRpb24gcGFyYW1zIHRvIHRoZSBzZXJ2ZXIuIFBsZWFzZSBub3RlLCB0aGlzXG4gKiBkb2Vzbid0IHVzZSB0aGUgcXVldWVkIG1lc3NhZ2UgbWVjaGFuaXNtLCBidXQgcmF0aGVyIHNlbmRzIHRoZSBtZXNzYWdlIGRpcmVjdGx5XG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5Db25uZWN0aW9uLnByb3RvdHlwZS5fc2VuZEF1dGhQYXJhbXMgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX3NldFN0YXRlKEMuQ09OTkVDVElPTl9TVEFURS5BVVRIRU5USUNBVElORyk7XG4gIHZhciBhdXRoTWVzc2FnZSA9IG1lc3NhZ2VCdWlsZGVyLmdldE1zZyhDLlRPUElDLkFVVEgsIEMuQUNUSU9OUy5SRVFVRVNULCBbdGhpcy5fYXV0aFBhcmFtc10pO1xuICB0aGlzLl9zdWJtaXQoYXV0aE1lc3NhZ2UpO1xufTtcblxuLyoqXG4gKiBFbnN1cmVzIHRoYXQgYSBoZWFydGJlYXQgd2FzIG5vdCBtaXNzZWQgbW9yZSB0aGFuIG9uY2UsIG90aGVyd2lzZSBpdCBjb25zaWRlcnMgdGhlIGNvbm5lY3Rpb25cbiAqIHRvIGhhdmUgYmVlbiBsb3N0IGFuZCBjbG9zZXMgaXQgZm9yIHJlY29ubmVjdGlvbi5cbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbkNvbm5lY3Rpb24ucHJvdG90eXBlLl9jaGVja0hlYXJ0QmVhdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhlYXJ0QmVhdFRvbGVyYW5jZSA9IHRoaXMuX29wdGlvbnMuaGVhcnRiZWF0SW50ZXJ2YWwgKiAyO1xuXG4gIGlmIChEYXRlLm5vdygpIC0gdGhpcy5fbGFzdEhlYXJ0QmVhdCA+IGhlYXJ0QmVhdFRvbGVyYW5jZSkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faGVhcnRiZWF0SW50ZXJ2YWwpO1xuICAgIHRoaXMuX2VuZHBvaW50LmNsb3NlKCk7XG4gICAgdGhpcy5fY2xpZW50Ll8kb25FcnJvcihDLlRPUElDLkNPTk5FQ1RJT04sIEMuRVZFTlQuQ09OTkVDVElPTl9FUlJPUiwgJ2hlYXJ0YmVhdCBub3QgcmVjZWl2ZWQgaW4gdGhlIGxhc3QgJyArIGhlYXJ0QmVhdFRvbGVyYW5jZSArICcgbWlsbGlzZWNvbmRzJyk7XG4gIH1cbn07XG5cbi8qKlxuICogV2lsbCBiZSBpbnZva2VkIG9uY2UgdGhlIGNvbm5lY3Rpb24gaXMgZXN0YWJsaXNoZWQuIFRoZSBjbGllbnRcbiAqIGNhbid0IHNlbmQgbWVzc2FnZXMgeWV0LCBhbmQgbmVlZHMgdG8gZ2V0IGEgY29ubmVjdGlvbiBBQ0sgb3IgUkVESVJFQ1RcbiAqIGZyb20gdGhlIHNlcnZlciBiZWZvcmUgYXV0aGVudGljYXRpbmdcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkNvbm5lY3Rpb24ucHJvdG90eXBlLl9vbk9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX2NsZWFyUmVjb25uZWN0KCk7XG4gIHRoaXMuX2xhc3RIZWFydEJlYXQgPSBEYXRlLm5vdygpO1xuICB0aGlzLl9oZWFydGJlYXRJbnRlcnZhbCA9IHV0aWxzLnNldEludGVydmFsKHRoaXMuX2NoZWNrSGVhcnRCZWF0LmJpbmQodGhpcyksIHRoaXMuX29wdGlvbnMuaGVhcnRiZWF0SW50ZXJ2YWwpO1xuICB0aGlzLl9zZXRTdGF0ZShDLkNPTk5FQ1RJT05fU1RBVEUuQVdBSVRJTkdfQ09OTkVDVElPTik7XG59O1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciBnZW5lcmljIGNvbm5lY3Rpb24gZXJyb3JzLiBGb3J3YXJkc1xuICogdGhlIGVycm9yIHRvIHRoZSBjbGllbnQuXG4gKlxuICogVGhlIGNvbm5lY3Rpb24gaXMgY29uc2lkZXJlZCBicm9rZW4gb25jZSB0aGlzIG1ldGhvZCBoYXMgYmVlblxuICogaW52b2tlZC5cbiAqXG4gKiBAcGFyYW0gICB7U3RyaW5nfEVycm9yfSBlcnJvciBjb25uZWN0aW9uIGVycm9yXG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5Db25uZWN0aW9uLnByb3RvdHlwZS5fb25FcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIGNsZWFySW50ZXJ2YWwodGhpcy5faGVhcnRiZWF0SW50ZXJ2YWwpO1xuICB0aGlzLl9zZXRTdGF0ZShDLkNPTk5FQ1RJT05fU1RBVEUuRVJST1IpO1xuXG4gIC8qXG4gICAqIElmIHRoZSBpbXBsZW1lbnRhdGlvbiBpc24ndCBsaXN0ZW5pbmcgb24gdGhlIGVycm9yIGV2ZW50IHRoaXMgd2lsbCB0aHJvd1xuICAgKiBhbiBlcnJvci4gU28gbGV0J3MgZGVmZXIgaXQgdG8gYWxsb3cgdGhlIHJlY29ubmVjdGlvbiB0byBraWNrIGluLlxuICAgKi9cbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG1zZyA9IHZvaWQgMDtcbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ0VDT05OUkVTRVQnIHx8IGVycm9yLmNvZGUgPT09ICdFQ09OTlJFRlVTRUQnKSB7XG4gICAgICBtc2cgPSAnQ2FuXFwndCBjb25uZWN0ISBEZWVwc3RyZWFtIHNlcnZlciB1bnJlYWNoYWJsZSBvbiAnICsgX3RoaXMuX29yaWdpbmFsVXJsO1xuICAgIH0gZWxzZSB7XG4gICAgICBtc2cgPSBlcnJvci50b1N0cmluZygpO1xuICAgIH1cbiAgICBfdGhpcy5fY2xpZW50Ll8kb25FcnJvcihDLlRPUElDLkNPTk5FQ1RJT04sIEMuRVZFTlQuQ09OTkVDVElPTl9FUlJPUiwgbXNnKTtcbiAgfSwgMSk7XG59O1xuXG4vKipcbiAqIENhbGxiYWNrIHdoZW4gdGhlIGNvbm5lY3Rpb24gY2xvc2VzLiBUaGlzIG1pZ2h0IGhhdmUgYmVlbiBhIGRlbGliZXJhdGVcbiAqIGNsb3NlIHRyaWdnZXJlZCBieSB0aGUgY2xpZW50IG9yIHRoZSByZXN1bHQgb2YgdGhlIGNvbm5lY3Rpb24gZ2V0dGluZ1xuICogbG9zdC5cbiAqXG4gKiBJbiB0aGUgbGF0dGVyIGNhc2UgdGhlIGNsaWVudCB3aWxsIHRyeSB0byByZWNvbm5lY3QgdXNpbmcgdGhlIGNvbmZpZ3VyZWRcbiAqIHN0cmF0ZWd5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuQ29ubmVjdGlvbi5wcm90b3R5cGUuX29uQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIGNsZWFySW50ZXJ2YWwodGhpcy5faGVhcnRiZWF0SW50ZXJ2YWwpO1xuXG4gIGlmICh0aGlzLl9yZWRpcmVjdGluZyA9PT0gdHJ1ZSkge1xuICAgIHRoaXMuX3JlZGlyZWN0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5fY3JlYXRlRW5kcG9pbnQoKTtcbiAgfSBlbHNlIGlmICh0aGlzLl9kZWxpYmVyYXRlQ2xvc2UgPT09IHRydWUpIHtcbiAgICB0aGlzLl9zZXRTdGF0ZShDLkNPTk5FQ1RJT05fU1RBVEUuQ0xPU0VEKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl90cnlSZWNvbm5lY3QoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgbWVzc2FnZXMgcmVjZWl2ZWQgb24gdGhlIGNvbm5lY3Rpb24uXG4gKlxuICogQHBhcmFtICAge1N0cmluZ30gbWVzc2FnZSBkZWVwc3RyZWFtIG1lc3NhZ2VcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkNvbm5lY3Rpb24ucHJvdG90eXBlLl9vbk1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICB2YXIgcGFyc2VkTWVzc2FnZXMgPSBtZXNzYWdlUGFyc2VyLnBhcnNlKG1lc3NhZ2UuZGF0YSwgdGhpcy5fY2xpZW50KTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnNlZE1lc3NhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHBhcnNlZE1lc3NhZ2VzW2ldID09PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9IGVsc2UgaWYgKHBhcnNlZE1lc3NhZ2VzW2ldLnRvcGljID09PSBDLlRPUElDLkNPTk5FQ1RJT04pIHtcbiAgICAgIHRoaXMuX2hhbmRsZUNvbm5lY3Rpb25SZXNwb25zZShwYXJzZWRNZXNzYWdlc1tpXSk7XG4gICAgfSBlbHNlIGlmIChwYXJzZWRNZXNzYWdlc1tpXS50b3BpYyA9PT0gQy5UT1BJQy5BVVRIKSB7XG4gICAgICB0aGlzLl9oYW5kbGVBdXRoUmVzcG9uc2UocGFyc2VkTWVzc2FnZXNbaV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jbGllbnQuXyRvbk1lc3NhZ2UocGFyc2VkTWVzc2FnZXNbaV0pO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBUaGUgY29ubmVjdGlvbiByZXNwb25zZSB3aWxsIGluZGljYXRlIHdoZXRoZXIgdGhlIGRlZXBzdHJlYW0gY29ubmVjdGlvblxuICogY2FuIGJlIHVzZWQgb3IgaWYgaXQgc2hvdWxkIGJlIGZvcndhcmRlZCB0byBhbm90aGVyIGluc3RhbmNlLiBUaGlzXG4gKiBhbGxvd3MgdXMgdG8gaW50cm9kdWNlIGxvYWQtYmFsYW5jaW5nIGlmIG5lZWRlZC5cbiAqXG4gKiBJZiBhdXRoZW50aWNhdGlvbiBwYXJhbWV0ZXJzIGFyZSBhbHJlYWR5IHByb3ZpZGVkIHRoaXMgd2lsbCBraWNrIG9mXG4gKiBhdXRoZW50aWNhdGlvbiBpbW1lZGlhdGVseS4gVGhlIGFjdHVhbCAnb3BlbicgZXZlbnQgd29uJ3QgYmUgZW1pdHRlZFxuICogYnkgdGhlIGNsaWVudCB1bnRpbCB0aGUgYXV0aGVudGljYXRpb24gaXMgc3VjY2Vzc2Z1bC5cbiAqXG4gKiBJZiBhIGNoYWxsZW5nZSBpcyByZWNpZXZlZCwgdGhlIHVzZXIgd2lsbCBzZW5kIHRoZSB1cmwgdG8gdGhlIHNlcnZlclxuICogaW4gcmVzcG9uc2UgdG8gZ2V0IHRoZSBhcHByb3ByaWF0ZSByZWRpcmVjdC4gSWYgdGhlIFVSTCBpcyBpbnZhbGlkIHRoZVxuICogc2VydmVyIHdpbGwgcmVzcG9uZCB3aXRoIGEgUkVKRUNUSU9OIHJlc3VsdGluZyBpbiB0aGUgY2xpZW50IGNvbm5lY3Rpb25cbiAqIGJlaW5nIHBlcm1hbmVudGx5IGNsb3NlZC5cbiAqXG4gKiBJZiBhIHJlZGlyZWN0IGlzIHJlY2lldmVkLCB0aGlzIGNvbm5lY3Rpb24gaXMgY2xvc2VkIGFuZCB1cGRhdGVkIHdpdGhcbiAqIGEgY29ubmVjdGlvbiB0byB0aGUgdXJsIHN1cHBsaWVkIGluIHRoZSBtZXNzYWdlLlxuICpcbiAqIEBwYXJhbSAgIHtPYmplY3R9IG1lc3NhZ2UgcGFyc2VkIGNvbm5lY3Rpb24gbWVzc2FnZVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuQ29ubmVjdGlvbi5wcm90b3R5cGUuX2hhbmRsZUNvbm5lY3Rpb25SZXNwb25zZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gQy5BQ1RJT05TLlBJTkcpIHtcbiAgICB0aGlzLl9sYXN0SGVhcnRCZWF0ID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLl9zdWJtaXQobWVzc2FnZUJ1aWxkZXIuZ2V0TXNnKEMuVE9QSUMuQ09OTkVDVElPTiwgQy5BQ1RJT05TLlBPTkcpKTtcbiAgfSBlbHNlIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gQy5BQ1RJT05TLkFDSykge1xuICAgIHRoaXMuX3NldFN0YXRlKEMuQ09OTkVDVElPTl9TVEFURS5BV0FJVElOR19BVVRIRU5USUNBVElPTik7XG4gICAgaWYgKHRoaXMuX2F1dGhQYXJhbXMpIHtcbiAgICAgIHRoaXMuX3NlbmRBdXRoUGFyYW1zKCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBDLkFDVElPTlMuQ0hBTExFTkdFKSB7XG4gICAgdGhpcy5fc2V0U3RhdGUoQy5DT05ORUNUSU9OX1NUQVRFLkNIQUxMRU5HSU5HKTtcbiAgICB0aGlzLl9zdWJtaXQobWVzc2FnZUJ1aWxkZXIuZ2V0TXNnKEMuVE9QSUMuQ09OTkVDVElPTiwgQy5BQ1RJT05TLkNIQUxMRU5HRV9SRVNQT05TRSwgW3RoaXMuX29yaWdpbmFsVXJsXSkpO1xuICB9IGVsc2UgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBDLkFDVElPTlMuUkVKRUNUSU9OKSB7XG4gICAgdGhpcy5fY2hhbGxlbmdlRGVuaWVkID0gdHJ1ZTtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH0gZWxzZSBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5SRURJUkVDVCkge1xuICAgIHRoaXMuX3VybCA9IG1lc3NhZ2UuZGF0YVswXTtcbiAgICB0aGlzLl9yZWRpcmVjdGluZyA9IHRydWU7XG4gICAgdGhpcy5fZW5kcG9pbnQuY2xvc2UoKTtcbiAgfSBlbHNlIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gQy5BQ1RJT05TLkVSUk9SKSB7XG4gICAgaWYgKG1lc3NhZ2UuZGF0YVswXSA9PT0gQy5FVkVOVC5DT05ORUNUSU9OX0FVVEhFTlRJQ0FUSU9OX1RJTUVPVVQpIHtcbiAgICAgIHRoaXMuX2RlbGliZXJhdGVDbG9zZSA9IHRydWU7XG4gICAgICB0aGlzLl9jb25uZWN0aW9uQXV0aGVudGljYXRpb25UaW1lb3V0ID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2NsaWVudC5fJG9uRXJyb3IoQy5UT1BJQy5DT05ORUNUSU9OLCBtZXNzYWdlLmRhdGFbMF0sIG1lc3NhZ2UuZGF0YVsxXSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciBtZXNzYWdlcyByZWNlaXZlZCBmb3IgdGhlIEFVVEggdG9waWMuIElmXG4gKiB0aGUgYXV0aGVudGljYXRpb24gd2FzIHN1Y2Nlc3NmdWwgdGhpcyBtZXRob2Qgd2lsbFxuICogb3BlbiB0aGUgY29ubmVjdGlvbiBhbmQgc2VuZCBhbGwgbWVzc2FnZXMgdGhhdCB0aGUgY2xpZW50XG4gKiB0cmllZCB0byBzZW5kIHNvIGZhci5cbiAqXG4gKiBAcGFyYW0gICB7T2JqZWN0fSBtZXNzYWdlIHBhcnNlZCBhdXRoIG1lc3NhZ2VcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkNvbm5lY3Rpb24ucHJvdG90eXBlLl9oYW5kbGVBdXRoUmVzcG9uc2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5FUlJPUikge1xuXG4gICAgaWYgKG1lc3NhZ2UuZGF0YVswXSA9PT0gQy5FVkVOVC5UT09fTUFOWV9BVVRIX0FUVEVNUFRTKSB7XG4gICAgICB0aGlzLl9kZWxpYmVyYXRlQ2xvc2UgPSB0cnVlO1xuICAgICAgdGhpcy5fdG9vTWFueUF1dGhBdHRlbXB0cyA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChtZXNzYWdlLmRhdGFbMF0gPT09IEMuRVZFTlQuSU5WQUxJRF9BVVRIX01TRykge1xuICAgICAgdGhpcy5fZGVsaWJlcmF0ZUNsb3NlID0gdHJ1ZTtcblxuICAgICAgaWYgKHRoaXMuX2F1dGhDYWxsYmFjaykge1xuICAgICAgICB0aGlzLl9hdXRoQ2FsbGJhY2soZmFsc2UsICdpbnZhbGlkIGF1dGhlbnRpY2F0aW9uIG1lc3NhZ2UnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXRTdGF0ZShDLkNPTk5FQ1RJT05fU1RBVEUuQVdBSVRJTkdfQVVUSEVOVElDQVRJT04pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9hdXRoQ2FsbGJhY2spIHtcbiAgICAgIHRoaXMuX2F1dGhDYWxsYmFjayhmYWxzZSwgdGhpcy5fZ2V0QXV0aERhdGEobWVzc2FnZS5kYXRhWzFdKSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBDLkFDVElPTlMuQUNLKSB7XG4gICAgdGhpcy5fc2V0U3RhdGUoQy5DT05ORUNUSU9OX1NUQVRFLk9QRU4pO1xuXG4gICAgaWYgKHRoaXMuX2F1dGhDYWxsYmFjaykge1xuICAgICAgdGhpcy5fYXV0aENhbGxiYWNrKHRydWUsIHRoaXMuX2dldEF1dGhEYXRhKG1lc3NhZ2UuZGF0YVswXSkpO1xuICAgIH1cblxuICAgIHRoaXMuX3NlbmRRdWV1ZWRNZXNzYWdlcygpO1xuICB9XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBkYXRhIGlzIHByZXNlbnQgd2l0aCBsb2dpbiBhY2sgYW5kIGNvbnZlcnRzIGl0XG4gKiB0byB0aGUgY29ycmVjdCB0eXBlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG1lc3NhZ2UgcGFyc2VkIGFuZCB2YWxpZGF0ZWQgZGVlcHN0cmVhbSBtZXNzYWdlXG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKi9cbkNvbm5lY3Rpb24ucHJvdG90eXBlLl9nZXRBdXRoRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gbWVzc2FnZVBhcnNlci5jb252ZXJ0VHlwZWQoZGF0YSwgdGhpcy5fY2xpZW50KTtcbn07XG5cbi8qKlxuICogVXBkYXRlcyB0aGUgY29ubmVjdGlvbiBzdGF0ZSBhbmQgZW1pdHMgdGhlXG4gKiBjb25uZWN0aW9uU3RhdGVDaGFuZ2VkIGV2ZW50IG9uIHRoZSBjbGllbnRcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkNvbm5lY3Rpb24ucHJvdG90eXBlLl9zZXRTdGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xuICB0aGlzLl9jbGllbnQuZW1pdChDLkVWRU5ULkNPTk5FQ1RJT05fU1RBVEVfQ0hBTkdFRCwgc3RhdGUpO1xufTtcblxuLyoqXG4gKiBJZiB0aGUgY29ubmVjdGlvbiBkcm9wcyBvciBpcyBjbG9zZWQgaW4gZXJyb3IgdGhpc1xuICogbWV0aG9kIHNjaGVkdWxlcyBpbmNyZWFzaW5nIHJlY29ubmVjdGlvbiBpbnRlcnZhbHNcbiAqXG4gKiBJZiB0aGUgbnVtYmVyIG9mIGZhaWxlZCByZWNvbm5lY3Rpb24gYXR0ZW1wdHMgZXhjZWVkc1xuICogb3B0aW9ucy5tYXhSZWNvbm5lY3RBdHRlbXB0cyB0aGUgY29ubmVjdGlvbiBpcyBjbG9zZWRcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkNvbm5lY3Rpb24ucHJvdG90eXBlLl90cnlSZWNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLl9yZWNvbm5lY3RUaW1lb3V0ICE9PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHQgPCB0aGlzLl9vcHRpb25zLm1heFJlY29ubmVjdEF0dGVtcHRzKSB7XG4gICAgdGhpcy5fc2V0U3RhdGUoQy5DT05ORUNUSU9OX1NUQVRFLlJFQ09OTkVDVElORyk7XG4gICAgdGhpcy5fcmVjb25uZWN0VGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5fdHJ5T3Blbi5iaW5kKHRoaXMpLCBNYXRoLm1pbih0aGlzLl9vcHRpb25zLm1heFJlY29ubmVjdEludGVydmFsLCB0aGlzLl9vcHRpb25zLnJlY29ubmVjdEludGVydmFsSW5jcmVtZW50ICogdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdCkpO1xuICAgIHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHQrKztcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9jbGVhclJlY29ubmVjdCgpO1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgICB0aGlzLl9jbGllbnQuZW1pdChDLkVWRU5ULk1BWF9SRUNPTk5FQ1RJT05fQVRURU1QVFNfUkVBQ0hFRCwgdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdCk7XG4gIH1cbn07XG5cbi8qKlxuICogQXR0ZW1wdHMgdG8gb3BlbiBhIGVycm91cm9zbHkgY2xvc2VkIGNvbm5lY3Rpb25cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkNvbm5lY3Rpb24ucHJvdG90eXBlLl90cnlPcGVuID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5fb3JpZ2luYWxVcmwgIT09IHRoaXMuX3VybCkge1xuICAgIHRoaXMuX3VybCA9IHRoaXMuX29yaWdpbmFsVXJsO1xuICB9XG4gIHRoaXMuX2NyZWF0ZUVuZHBvaW50KCk7XG4gIHRoaXMuX3JlY29ubmVjdFRpbWVvdXQgPSBudWxsO1xufTtcblxuLyoqXG4gKiBTdG9wcyBhbGwgZnVydGhlciByZWNvbm5lY3Rpb24gYXR0ZW1wdHMsXG4gKiBlaXRoZXIgYmVjYXVzZSB0aGUgY29ubmVjdGlvbiBpcyBvcGVuIGFnYWluXG4gKiBvciBiZWNhdXNlIHRoZSBtYXhpbWFsIG51bWJlciBvZiByZWNvbm5lY3Rpb25cbiAqIGF0dGVtcHRzIGhhcyBiZWVuIGV4Y2VlZGVkXG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5Db25uZWN0aW9uLnByb3RvdHlwZS5fY2xlYXJSZWNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIGNsZWFyVGltZW91dCh0aGlzLl9yZWNvbm5lY3RUaW1lb3V0KTtcbiAgdGhpcy5fcmVjb25uZWN0VGltZW91dCA9IG51bGw7XG4gIHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHQgPSAwO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb25uZWN0aW9uO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbn0se1wiLi4vY29uc3RhbnRzL2NvbnN0YW50c1wiOjExLFwiLi4vdXRpbHMvdXRpbHNcIjozMSxcIi4vbWVzc2FnZS1idWlsZGVyXCI6MTYsXCIuL21lc3NhZ2UtcGFyc2VyXCI6MTcsXCJ3c1wiOjJ9XSwxNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIEMgPSBfZGVyZXFfKCcuLi9jb25zdGFudHMvY29uc3RhbnRzJyk7XG5cbnZhciBTRVAgPSBDLk1FU1NBR0VfUEFSVF9TRVBFUkFUT1I7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlZXBzdHJlYW0gbWVzc2FnZSBzdHJpbmcsIGJhc2VkIG9uIHRoZVxuICogcHJvdmlkZWQgcGFyYW1ldGVyc1xuICpcbiAqIEBwYXJhbSAgIHtTdHJpbmd9IHRvcGljICBPbmUgb2YgQ09OU1RBTlRTLlRPUElDXG4gKiBAcGFyYW0gICB7U3RyaW5nfSBhY3Rpb24gT25lIG9mIENPTlNUQU5UUy5BQ1RJT05TXG4gKiBAcGFyYW0gICB7QXJyYXl9IGRhdGEgQW4gYXJyYXkgb2Ygc3RyaW5ncyBvciBKU09OLXNlcmlhbGl6YWJsZSBvYmplY3RzXG4gKlxuICogQHJldHVybnMge1N0cmluZ30gZGVlcHN0cmVhbSBtZXNzYWdlIHN0cmluZ1xuICovXG5leHBvcnRzLmdldE1zZyA9IGZ1bmN0aW9uICh0b3BpYywgYWN0aW9uLCBkYXRhKSB7XG4gIGlmIChkYXRhICYmICEoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgIHRocm93IG5ldyBFcnJvcignZGF0YSBtdXN0IGJlIGFuIGFycmF5Jyk7XG4gIH1cbiAgdmFyIHNlbmREYXRhID0gW3RvcGljLCBhY3Rpb25dO1xuXG4gIGlmIChkYXRhKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoX3R5cGVvZihkYXRhW2ldKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgc2VuZERhdGEucHVzaChKU09OLnN0cmluZ2lmeShkYXRhW2ldKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZW5kRGF0YS5wdXNoKGRhdGFbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzZW5kRGF0YS5qb2luKFNFUCkgKyBDLk1FU1NBR0VfU0VQRVJBVE9SO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIHNlcmlhbGl6YWJsZSB2YWx1ZSBpbnRvIGl0cyBzdHJpbmctcmVwcmVzZW50YXRpb24gYW5kIGFkZHNcbiAqIGEgZmxhZyB0aGF0IHByb3ZpZGVzIGluc3RydWN0aW9ucyBvbiBob3cgdG8gZGVzZXJpYWxpemUgaXQuXG4gKlxuICogUGxlYXNlIHNlZSBtZXNzYWdlUGFyc2VyLmNvbnZlcnRUeXBlZCBmb3IgdGhlIGNvdW50ZXJwYXJ0IG9mIHRoaXMgbWV0aG9kXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZhbHVlXG4gKi9cbmV4cG9ydHMudHlwZWQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKTtcblxuICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gQy5UWVBFUy5TVFJJTkcgKyB2YWx1ZTtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBDLlRZUEVTLk5VTEw7XG4gIH1cblxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gQy5UWVBFUy5PQkpFQ1QgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gIH1cblxuICBpZiAodHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gQy5UWVBFUy5OVU1CRVIgKyB2YWx1ZS50b1N0cmluZygpO1xuICB9XG5cbiAgaWYgKHZhbHVlID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIEMuVFlQRVMuVFJVRTtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gQy5UWVBFUy5GQUxTRTtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIEMuVFlQRVMuVU5ERUZJTkVEO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKCdDYW5cXCd0IHNlcmlhbGl6ZSB0eXBlICcgKyB2YWx1ZSk7XG59O1xuXG59LHtcIi4uL2NvbnN0YW50cy9jb25zdGFudHNcIjoxMX1dLDE3OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIEMgPSBfZGVyZXFfKCcuLi9jb25zdGFudHMvY29uc3RhbnRzJyk7XG5cbi8qKlxuICogUGFyc2VzIEFTQ0lJIGNvbnRyb2wgY2hhcmFjdGVyIHNlcGVyYXRlZFxuICogbWVzc2FnZSBzdHJpbmdzIGludG8gZGlnZXN0YWJsZSBtYXBzXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZhciBNZXNzYWdlUGFyc2VyID0gZnVuY3Rpb24gTWVzc2FnZVBhcnNlcigpIHtcbiAgdGhpcy5fYWN0aW9ucyA9IHRoaXMuX2dldEFjdGlvbnMoKTtcbn07XG5cbi8qKlxuICogTWFpbiBpbnRlcmZhY2UgbWV0aG9kLiBSZWNlaXZlcyBhIHJhdyBtZXNzYWdlXG4gKiBzdHJpbmcsIGNvbnRhaW5pbmcgb25lIG9yIG1vcmUgbWVzc2FnZXNcbiAqIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mIHBhcnNlZCBtZXNzYWdlIG9iamVjdHNcbiAqIG9yIG51bGwgZm9yIGludmFsaWQgbWVzc2FnZXNcbiAqXG4gKiBAcGFyYW0gICB7U3RyaW5nfSBtZXNzYWdlIHJhdyBtZXNzYWdlXG4gKlxuICogQHB1YmxpY1xuICpcbiAqIEByZXR1cm5zIHtBcnJheX0gYXJyYXkgb2YgcGFyc2VkIG1lc3NhZ2Ugb2JqZWN0c1xuICogICAgICAgICAgICAgICAgICBmb2xsb3dpbmcgdGhlIGZvcm1hdFxuICogICAgICAgICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgICAgICAgcmF3OiA8b3JpZ2luYWwgbWVzc2FnZSBzdHJpbmc+XG4gKiAgICAgICAgICAgICAgICAgICAgdG9waWM6IDxzdHJpbmc+XG4gKiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiA8c3RyaW5nIC0gc2hvcnRjb2RlPlxuICogICAgICAgICAgICAgICAgICAgIGRhdGE6IDxhcnJheSBvZiBzdHJpbmdzPlxuICogICAgICAgICAgICAgICAgICB9XG4gKi9cbk1lc3NhZ2VQYXJzZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKG1lc3NhZ2UsIGNsaWVudCkge1xuICB2YXIgcGFyc2VkTWVzc2FnZXMgPSBbXTtcbiAgdmFyIHJhd01lc3NhZ2VzID0gbWVzc2FnZS5zcGxpdChDLk1FU1NBR0VfU0VQRVJBVE9SKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJhd01lc3NhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHJhd01lc3NhZ2VzW2ldLmxlbmd0aCA+IDIpIHtcbiAgICAgIHBhcnNlZE1lc3NhZ2VzLnB1c2godGhpcy5fcGFyc2VNZXNzYWdlKHJhd01lc3NhZ2VzW2ldLCBjbGllbnQpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGFyc2VkTWVzc2FnZXM7XG59O1xuXG4vKipcbiAqIERlc2VyaWFsaXplcyB2YWx1ZXMgY3JlYXRlZCBieSBNZXNzYWdlQnVpbGRlci50eXBlZCB0b1xuICogdGhlaXIgb3JpZ2luYWwgZm9ybWF0XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge01peGVkfSBvcmlnaW5hbCB2YWx1ZVxuICovXG5NZXNzYWdlUGFyc2VyLnByb3RvdHlwZS5jb252ZXJ0VHlwZWQgPSBmdW5jdGlvbiAodmFsdWUsIGNsaWVudCkge1xuICB2YXIgdHlwZSA9IHZhbHVlLmNoYXJBdCgwKTtcblxuICBpZiAodHlwZSA9PT0gQy5UWVBFUy5TVFJJTkcpIHtcbiAgICByZXR1cm4gdmFsdWUuc3Vic3RyKDEpO1xuICB9XG5cbiAgaWYgKHR5cGUgPT09IEMuVFlQRVMuT0JKRUNUKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlLnN1YnN0cigxKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY2xpZW50Ll8kb25FcnJvcihDLlRPUElDLkVSUk9SLCBDLkVWRU5ULk1FU1NBR0VfUEFSU0VfRVJST1IsIGUudG9TdHJpbmcoKSArICcoJyArIHZhbHVlICsgJyknKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGUgPT09IEMuVFlQRVMuTlVNQkVSKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUuc3Vic3RyKDEpKTtcbiAgfVxuXG4gIGlmICh0eXBlID09PSBDLlRZUEVTLk5VTEwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmICh0eXBlID09PSBDLlRZUEVTLlRSVUUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlID09PSBDLlRZUEVTLkZBTFNFKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGUgPT09IEMuVFlQRVMuVU5ERUZJTkVEKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNsaWVudC5fJG9uRXJyb3IoQy5UT1BJQy5FUlJPUiwgQy5FVkVOVC5NRVNTQUdFX1BBUlNFX0VSUk9SLCAnVU5LTk9XTl9UWVBFICgnICsgdmFsdWUgKyAnKScpO1xuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuLyoqXG4gKiBUdXJucyB0aGUgQUNUSU9OOlNIT1JUQ09ERSBjb25zdGFudHMgbWFwXG4gKiBhcm91bmQgdG8gZmFjaWxpdGF0ZSBzaG9ydGNvZGUgbG9va3VwXG4gKlxuICogQHByaXZhdGVcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBhY3Rpb25zXG4gKi9cbk1lc3NhZ2VQYXJzZXIucHJvdG90eXBlLl9nZXRBY3Rpb25zID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYWN0aW9ucyA9IHt9O1xuXG4gIGZvciAodmFyIGtleSBpbiBDLkFDVElPTlMpIHtcbiAgICBhY3Rpb25zW0MuQUNUSU9OU1trZXldXSA9IGtleTtcbiAgfVxuXG4gIHJldHVybiBhY3Rpb25zO1xufTtcblxuLyoqXG4gKiBQYXJzZXMgYW4gaW5kaXZpZHVhbCBtZXNzYWdlIChhcyBvcHBub3NlZCB0byBhXG4gKiBibG9jayBvZiBtdWx0aXBsZSBtZXNzYWdlcyBhcyBpcyBwcm9jZXNzZWQgYnkgLnBhcnNlKCkpXG4gKlxuICogQHBhcmFtICAge1N0cmluZ30gbWVzc2FnZVxuICpcbiAqIEBwcml2YXRlXG4gKlxuICogQHJldHVybnMge09iamVjdH0gcGFyc2VkTWVzc2FnZVxuICovXG5NZXNzYWdlUGFyc2VyLnByb3RvdHlwZS5fcGFyc2VNZXNzYWdlID0gZnVuY3Rpb24gKG1lc3NhZ2UsIGNsaWVudCkge1xuICB2YXIgcGFydHMgPSBtZXNzYWdlLnNwbGl0KEMuTUVTU0FHRV9QQVJUX1NFUEVSQVRPUik7XG4gIHZhciBtZXNzYWdlT2JqZWN0ID0ge307XG5cbiAgaWYgKHBhcnRzLmxlbmd0aCA8IDIpIHtcbiAgICBjbGllbnQuXyRvbkVycm9yKEMuVE9QSUMuRVJST1IsIEMuRVZFTlQuTUVTU0FHRV9QQVJTRV9FUlJPUiwgJ0luc3VmZmljaWFudCBtZXNzYWdlIHBhcnRzJyk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAodGhpcy5fYWN0aW9uc1twYXJ0c1sxXV0gPT09IHVuZGVmaW5lZCkge1xuICAgIGNsaWVudC5fJG9uRXJyb3IoQy5UT1BJQy5FUlJPUiwgQy5FVkVOVC5NRVNTQUdFX1BBUlNFX0VSUk9SLCAnVW5rbm93biBhY3Rpb24gJyArIHBhcnRzWzFdKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG1lc3NhZ2VPYmplY3QucmF3ID0gbWVzc2FnZTtcbiAgbWVzc2FnZU9iamVjdC50b3BpYyA9IHBhcnRzWzBdO1xuICBtZXNzYWdlT2JqZWN0LmFjdGlvbiA9IHBhcnRzWzFdO1xuICBtZXNzYWdlT2JqZWN0LmRhdGEgPSBwYXJ0cy5zcGxpY2UoMik7XG5cbiAgcmV0dXJuIG1lc3NhZ2VPYmplY3Q7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBNZXNzYWdlUGFyc2VyKCk7XG5cbn0se1wiLi4vY29uc3RhbnRzL2NvbnN0YW50c1wiOjExfV0sMTg6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgRXZlbnRFbWl0dGVyID0gX2RlcmVxXygnY29tcG9uZW50LWVtaXR0ZXIyJyk7XG52YXIgQyA9IF9kZXJlcV8oJy4uL2NvbnN0YW50cy9jb25zdGFudHMnKTtcbnZhciBSZXN1YnNjcmliZU5vdGlmaWVyID0gX2RlcmVxXygnLi4vdXRpbHMvcmVzdWJzY3JpYmUtbm90aWZpZXInKTtcblxuLyoqXG4gKiBUaGUgbWFpbiBjbGFzcyBmb3IgcHJlc2VuY2UgaW4gZGVlcHN0cmVhbVxuICpcbiAqIFByb3ZpZGVzIHRoZSBwcmVzZW5jZSBpbnRlcmZhY2UgYW5kIGhhbmRsZXMgaW5jb21pbmcgbWVzc2FnZXNcbiAqIG9uIHRoZSBwcmVzZW5jZSB0b3BpY1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIGRlZXBzdHJlYW0gY29uZmlndXJhdGlvbiBvcHRpb25zXG4gKiBAcGFyYW0ge0Nvbm5lY3Rpb259IGNvbm5lY3Rpb25cbiAqIEBwYXJhbSB7Q2xpZW50fSBjbGllbnRcbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwdWJsaWNcbiAqL1xudmFyIFByZXNlbmNlSGFuZGxlciA9IGZ1bmN0aW9uIFByZXNlbmNlSGFuZGxlcihvcHRpb25zLCBjb25uZWN0aW9uLCBjbGllbnQpIHtcbiAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gIHRoaXMuX2Nvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xuICB0aGlzLl9jbGllbnQgPSBjbGllbnQ7XG4gIHRoaXMuX2VtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHRoaXMuX2Fja1RpbWVvdXRSZWdpc3RyeSA9IGNsaWVudC5fJGdldEFja1RpbWVvdXRSZWdpc3RyeSgpO1xuICB0aGlzLl9yZXN1YnNjcmliZU5vdGlmaWVyID0gbmV3IFJlc3Vic2NyaWJlTm90aWZpZXIodGhpcy5fY2xpZW50LCB0aGlzLl9yZXN1YnNjcmliZS5iaW5kKHRoaXMpKTtcbn07XG5cbi8qKlxuICogUXVlcmllcyBmb3IgY2xpZW50cyBsb2dnZWQgaW50byBkZWVwc3RyZWFtLlxuICpcbiAqIEBwYXJhbSAgIHtGdW5jdGlvbn0gY2FsbGJhY2sgV2lsbCBiZSBpbnZva2VkIHdpdGggYW4gYXJyYXkgb2YgY2xpZW50c1xuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5QcmVzZW5jZUhhbmRsZXIucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBpZiAoIXRoaXMuX2VtaXR0ZXIuaGFzTGlzdGVuZXJzKEMuQUNUSU9OUy5RVUVSWSkpIHtcbiAgICAvLyBBdCBsZWFzdCBvbmUgYXJndW1lbnQgaXMgcmVxdWlyZWQgZm9yIGEgbWVzc2FnZSB0byBiZSBwZXJtaXNzaW9uYWJsZVxuICAgIHRoaXMuX2Nvbm5lY3Rpb24uc2VuZE1zZyhDLlRPUElDLlBSRVNFTkNFLCBDLkFDVElPTlMuUVVFUlksIFtDLkFDVElPTlMuUVVFUlldKTtcbiAgfVxuICB0aGlzLl9lbWl0dGVyLm9uY2UoQy5BQ1RJT05TLlFVRVJZLCBjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIFN1YnNjcmliZXMgdG8gY2xpZW50IGxvZ2lucyBvciBsb2dvdXRzIGluIGRlZXBzdHJlYW1cbiAqXG4gKiBAcGFyYW0gICB7RnVuY3Rpb259IGNhbGxiYWNrIFdpbGwgYmUgaW52b2tlZCB3aXRoIHRoZSB1c2VybmFtZSBvZiBhIGNsaWVudCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIGEgYm9vbGVhbiB0byBpbmRpY2F0ZSBpZiBpdCB3YXMgYSBsb2dpbiBvclxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dvdXQgZXZlbnRcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5QcmVzZW5jZUhhbmRsZXIucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgYXJndW1lbnQgY2FsbGJhY2snKTtcbiAgfVxuXG4gIGlmICghdGhpcy5fZW1pdHRlci5oYXNMaXN0ZW5lcnMoQy5UT1BJQy5QUkVTRU5DRSkpIHtcbiAgICB0aGlzLl9hY2tUaW1lb3V0UmVnaXN0cnkuYWRkKHtcbiAgICAgIHRvcGljOiBDLlRPUElDLlBSRVNFTkNFLFxuICAgICAgYWN0aW9uOiBDLkFDVElPTlMuU1VCU0NSSUJFLFxuICAgICAgbmFtZTogQy5UT1BJQy5QUkVTRU5DRVxuICAgIH0pO1xuICAgIHRoaXMuX2Nvbm5lY3Rpb24uc2VuZE1zZyhDLlRPUElDLlBSRVNFTkNFLCBDLkFDVElPTlMuU1VCU0NSSUJFLCBbQy5BQ1RJT05TLlNVQlNDUklCRV0pO1xuICB9XG5cbiAgdGhpcy5fZW1pdHRlci5vbihDLlRPUElDLlBSRVNFTkNFLCBjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgYSBjYWxsYmFjayBmb3IgYSBzcGVjaWZpZWQgcHJlc2VuY2UgZXZlbnRcbiAqXG4gKiBAcGFyYW0gICB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byB1bnJlZ2lzdGVyIHZpYSB7UHJlc2VuY2VIYW5kbGVyI3Vuc3Vic2NyaWJlfVxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5QcmVzZW5jZUhhbmRsZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBhcmd1bWVudCBjYWxsYmFjaycpO1xuICB9XG5cbiAgdGhpcy5fZW1pdHRlci5vZmYoQy5UT1BJQy5QUkVTRU5DRSwgY2FsbGJhY2spO1xuXG4gIGlmICghdGhpcy5fZW1pdHRlci5oYXNMaXN0ZW5lcnMoQy5UT1BJQy5QUkVTRU5DRSkpIHtcbiAgICB0aGlzLl9hY2tUaW1lb3V0UmVnaXN0cnkuYWRkKHtcbiAgICAgIHRvcGljOiBDLlRPUElDLlBSRVNFTkNFLFxuICAgICAgYWN0aW9uOiBDLkFDVElPTlMuVU5TVUJTQ1JJQkUsXG4gICAgICBuYW1lOiBDLlRPUElDLlBSRVNFTkNFXG4gICAgfSk7XG4gICAgdGhpcy5fY29ubmVjdGlvbi5zZW5kTXNnKEMuVE9QSUMuUFJFU0VOQ0UsIEMuQUNUSU9OUy5VTlNVQlNDUklCRSwgW0MuQUNUSU9OUy5VTlNVQlNDUklCRV0pO1xuICB9XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgaW5jb21pbmcgbWVzc2FnZXMgZnJvbSB0aGUgc2VydmVyXG4gKlxuICogQHBhcmFtICAge09iamVjdH0gbWVzc2FnZSBwYXJzZWQgZGVlcHN0cmVhbSBtZXNzYWdlXG4gKlxuICogQHBhY2thZ2UgcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblByZXNlbmNlSGFuZGxlci5wcm90b3R5cGUuXyRoYW5kbGUgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5FUlJPUiAmJiBtZXNzYWdlLmRhdGFbMF0gPT09IEMuRVZFTlQuTUVTU0FHRV9ERU5JRUQpIHtcbiAgICB0aGlzLl9hY2tUaW1lb3V0UmVnaXN0cnkucmVtb3ZlKEMuVE9QSUMuUFJFU0VOQ0UsIG1lc3NhZ2UuZGF0YVsxXSk7XG4gICAgbWVzc2FnZS5wcm9jZXNzZWRFcnJvciA9IHRydWU7XG4gICAgdGhpcy5fY2xpZW50Ll8kb25FcnJvcihDLlRPUElDLlBSRVNFTkNFLCBDLkVWRU5ULk1FU1NBR0VfREVOSUVELCBtZXNzYWdlLmRhdGFbMV0pO1xuICB9IGVsc2UgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBDLkFDVElPTlMuQUNLKSB7XG4gICAgdGhpcy5fYWNrVGltZW91dFJlZ2lzdHJ5LmNsZWFyKG1lc3NhZ2UpO1xuICB9IGVsc2UgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBDLkFDVElPTlMuUFJFU0VOQ0VfSk9JTikge1xuICAgIHRoaXMuX2VtaXR0ZXIuZW1pdChDLlRPUElDLlBSRVNFTkNFLCBtZXNzYWdlLmRhdGFbMF0sIHRydWUpO1xuICB9IGVsc2UgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBDLkFDVElPTlMuUFJFU0VOQ0VfTEVBVkUpIHtcbiAgICB0aGlzLl9lbWl0dGVyLmVtaXQoQy5UT1BJQy5QUkVTRU5DRSwgbWVzc2FnZS5kYXRhWzBdLCBmYWxzZSk7XG4gIH0gZWxzZSBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5RVUVSWSkge1xuICAgIHRoaXMuX2VtaXR0ZXIuZW1pdChDLkFDVElPTlMuUVVFUlksIG1lc3NhZ2UuZGF0YSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fY2xpZW50Ll8kb25FcnJvcihDLlRPUElDLlBSRVNFTkNFLCBDLkVWRU5ULlVOU09MSUNJVEVEX01FU1NBR0UsIG1lc3NhZ2UuYWN0aW9uKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXN1YnNjcmliZXMgdG8gcHJlc2VuY2Ugc3Vic2NyaXB0aW9uIHdoZW4gY29ubmVjdGlvbiBpcyBsb3N0XG4gKlxuICogQHBhY2thZ2UgcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblByZXNlbmNlSGFuZGxlci5wcm90b3R5cGUuX3Jlc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fZW1pdHRlci5fY2FsbGJhY2tzO1xuICBpZiAoY2FsbGJhY2tzICYmIGNhbGxiYWNrc1tDLlRPUElDLlBSRVNFTkNFXSkge1xuICAgIHRoaXMuX2Nvbm5lY3Rpb24uc2VuZE1zZyhDLlRPUElDLlBSRVNFTkNFLCBDLkFDVElPTlMuU1VCU0NSSUJFLCBbQy5BQ1RJT05TLlNVQlNDUklCRV0pO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByZXNlbmNlSGFuZGxlcjtcblxufSx7XCIuLi9jb25zdGFudHMvY29uc3RhbnRzXCI6MTEsXCIuLi91dGlscy9yZXN1YnNjcmliZS1ub3RpZmllclwiOjI5LFwiY29tcG9uZW50LWVtaXR0ZXIyXCI6MX1dLDE5OltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1yZXN0LXBhcmFtcywgcHJlZmVyLXNwcmVhZCAqL1xuXG52YXIgUmVjb3JkID0gX2RlcmVxXygnLi9yZWNvcmQnKTtcbnZhciBFdmVudEVtaXR0ZXIgPSBfZGVyZXFfKCdjb21wb25lbnQtZW1pdHRlcjInKTtcblxuLyoqXG4gKiBBbiBBbm9ueW1vdXNSZWNvcmQgaXMgYSByZWNvcmQgd2l0aG91dCBhIHByZWRlZmluZWQgbmFtZS4gSXRcbiAqIGFjdHMgbGlrZSBhIHdyYXBwZXIgYXJvdW5kIGFuIGFjdHVhbCByZWNvcmQgdGhhdCBjYW5cbiAqIGJlIHN3YXBwZWQgb3V0IGZvciBhbm90aGVyIG9uZSB3aGlsc3Qga2VlcGluZyBhbGwgYmluZGluZ3MgaW50YWN0LlxuICpcbiAqIEltYWdpbmUgYSBjdXN0b21lciByZWxhdGlvbnNoaXAgbWFuYWdlbWVudCBzeXN0ZW0gd2l0aCBhIGxpc3Qgb2YgdXNlcnNcbiAqIG9uIHRoZSBsZWZ0IGFuZCBhIHVzZXIgZGV0YWlsIHBhbmVsIG9uIHRoZSByaWdodC4gVGhlIHVzZXIgZGV0YWlsXG4gKiBwYW5lbCBjb3VsZCB1c2UgdGhlIGFub255bW91cyByZWNvcmQgdG8gc2V0IHVwIGl0cyBiaW5kaW5ncywgeWV0IHdoZW5ldmVyXG4gKiBhIHVzZXIgaXMgY2hvc2VuIGZyb20gdGhlIGxpc3Qgb2YgZXhpc3RpbmcgdXNlcnMgdGhlIGFub255bW91cyByZWNvcmQnc1xuICogc2V0TmFtZSBtZXRob2QgaXMgY2FsbGVkIGFuZCB0aGUgZGV0YWlsIHBhbmVsIHdpbGwgdXBkYXRlIHRvXG4gKiBzaG93IHRoZSBzZWxlY3RlZCB1c2VyJ3MgZGV0YWlsc1xuICpcbiAqIEBwYXJhbSB7UmVjb3JkSGFuZGxlcn0gcmVjb3JkSGFuZGxlclxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52YXIgQW5vbnltb3VzUmVjb3JkID0gZnVuY3Rpb24gQW5vbnltb3VzUmVjb3JkKHJlY29yZEhhbmRsZXIpIHtcbiAgdGhpcy5uYW1lID0gbnVsbDtcbiAgdGhpcy5fcmVjb3JkSGFuZGxlciA9IHJlY29yZEhhbmRsZXI7XG4gIHRoaXMuX3JlY29yZCA9IG51bGw7XG4gIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBbXTtcbiAgdGhpcy5fcHJveHlNZXRob2QoJ2RlbGV0ZScpO1xuICB0aGlzLl9wcm94eU1ldGhvZCgnc2V0Jyk7XG4gIHRoaXMuX3Byb3h5TWV0aG9kKCdkaXNjYXJkJyk7XG59O1xuXG5FdmVudEVtaXR0ZXIoQW5vbnltb3VzUmVjb3JkLnByb3RvdHlwZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuLyoqXG4gKiBQcm94aWVzIHRoZSBhY3R1YWwgcmVjb3JkJ3MgZ2V0IG1ldGhvZC4gSXQgaXMgdmFsaWRcbiAqIHRvIGNhbGwgZ2V0IHByaW9yIHRvIHNldE5hbWUgLSBpZiBubyByZWNvcmQgZXhpc3RzLFxuICogdGhlIG1ldGhvZCByZXR1cm5zIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSAgIHtbU3RyaW5nXX0gcGF0aCBBIGpzb24gcGF0aC4gSWYgbm9uIGlzIHByb3ZpZGVkLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBlbnRpcmUgcmVjb3JkIGlzIHJldHVybmVkLlxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHttaXhlZH0gICAgdGhlIHZhbHVlIG9mIHBhdGggb3IgdGhlIGVudGlyZSBvYmplY3RcbiAqL1xuQW5vbnltb3VzUmVjb3JkLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAocGF0aCkge1xuICBpZiAodGhpcy5fcmVjb3JkID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9yZWNvcmQuZ2V0KHBhdGgpO1xufTtcblxuLyoqXG4gKiBQcm94aWVzIHRoZSBhY3R1YWwgcmVjb3JkJ3Mgc3Vic2NyaWJlIG1ldGhvZC4gVGhlIHNhbWUgcGFyYW1ldGVyc1xuICogY2FuIGJlIHVzZWQuIENhbiBiZSBjYWxsZWQgcHJpb3IgdG8gc2V0TmFtZSgpLiBQbGVhc2Ugbm90ZSwgdHJpZ2dlcklmUmVhZHlcbiAqIHdpbGwgYWx3YXlzIGJlIHNldCB0byB0cnVlIHRvIHJlZmxlY3QgY2hhbmdlcyBpbiB0aGUgdW5kZXJseWluZyByZWNvcmQuXG4gKlxuICogQHBhcmFtICAge1tTdHJpbmddfSBwYXRoICAgQSBqc29uIHBhdGguIElmIG5vbiBpcyBwcm92aWRlZCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXQgc3Vic2NyaWJlcyB0byBjaGFuZ2VzIGZvciB0aGUgZW50aXJlIHJlY29yZC5cbiAqXG4gKiBAcGFyYW0gICB7RnVuY3Rpb259IGNhbGxiYWNrIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGludm9rZWQgd2hlbmV2ZXJcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHN1YnNjcmliZWQgcGF0aCBvciByZWNvcmQgdXBkYXRlc1xuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5Bbm9ueW1vdXNSZWNvcmQucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHBhcmFtZXRlcnMgPSBSZWNvcmQucHJvdG90eXBlLl9ub3JtYWxpemVBcmd1bWVudHMoYXJndW1lbnRzKTtcbiAgcGFyYW1ldGVycy50cmlnZ2VyTm93ID0gdHJ1ZTtcbiAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKHBhcmFtZXRlcnMpO1xuXG4gIGlmICh0aGlzLl9yZWNvcmQgIT09IG51bGwpIHtcbiAgICB0aGlzLl9yZWNvcmQuc3Vic2NyaWJlKHBhcmFtZXRlcnMpO1xuICB9XG59O1xuXG4vKipcbiAqIFByb3hpZXMgdGhlIGFjdHVhbCByZWNvcmQncyB1bnN1YnNjcmliZSBtZXRob2QuIFRoZSBzYW1lIHBhcmFtZXRlcnNcbiAqIGNhbiBiZSB1c2VkLiBDYW4gYmUgY2FsbGVkIHByaW9yIHRvIHNldE5hbWUoKVxuICpcbiAqIEBwYXJhbSAgIHtbU3RyaW5nXX0gcGF0aCAgIEEganNvbiBwYXRoLiBJZiBub24gaXMgcHJvdmlkZWQsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0IHN1YnNjcmliZXMgdG8gY2hhbmdlcyBmb3IgdGhlIGVudGlyZSByZWNvcmQuXG4gKlxuICogQHBhcmFtICAge0Z1bmN0aW9ufSBjYWxsYmFjayBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBpbnZva2VkIHdoZW5ldmVyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSBzdWJzY3JpYmVkIHBhdGggb3IgcmVjb3JkIHVwZGF0ZXNcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuQW5vbnltb3VzUmVjb3JkLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHBhcmFtZXRlcnMgPSBSZWNvcmQucHJvdG90eXBlLl9ub3JtYWxpemVBcmd1bWVudHMoYXJndW1lbnRzKTtcbiAgdmFyIHN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgdmFyIGkgPSB2b2lkIDA7XG5cbiAgZm9yIChpID0gMDsgaSA8IHRoaXMuX3N1YnNjcmlwdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uc1tpXS5wYXRoICE9PSBwYXJhbWV0ZXJzLnBhdGggfHwgdGhpcy5fc3Vic2NyaXB0aW9uc1tpXS5jYWxsYmFjayAhPT0gcGFyYW1ldGVycy5jYWxsYmFjaykge1xuICAgICAgc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMuX3N1YnNjcmlwdGlvbnNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBzdWJzY3JpcHRpb25zO1xuXG4gIGlmICh0aGlzLl9yZWNvcmQgIT09IG51bGwpIHtcbiAgICB0aGlzLl9yZWNvcmQudW5zdWJzY3JpYmUocGFyYW1ldGVycyk7XG4gIH1cbn07XG5cbi8qKlxuICogU2V0cyB0aGUgdW5kZXJseWluZyByZWNvcmQgdGhlIGFub255bW91cyByZWNvcmQgaXMgYm91bmRcbiAqIHRvLiBDYW4gYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByZWNvcmROYW1lXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkFub255bW91c1JlY29yZC5wcm90b3R5cGUuc2V0TmFtZSA9IGZ1bmN0aW9uIChyZWNvcmROYW1lKSB7XG4gIGlmICh0aGlzLm5hbWUgPT09IHJlY29yZE5hbWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLm5hbWUgPSByZWNvcmROYW1lO1xuXG4gIHZhciBpID0gdm9pZCAwO1xuXG4gIGlmICh0aGlzLl9yZWNvcmQgIT09IG51bGwgJiYgIXRoaXMuX3JlY29yZC5pc0Rlc3Ryb3llZCkge1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLl9zdWJzY3JpcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLl9yZWNvcmQudW5zdWJzY3JpYmUodGhpcy5fc3Vic2NyaXB0aW9uc1tpXSk7XG4gICAgfVxuICAgIHRoaXMuX3JlY29yZC5kaXNjYXJkKCk7XG4gIH1cblxuICB0aGlzLl9yZWNvcmQgPSB0aGlzLl9yZWNvcmRIYW5kbGVyLmdldFJlY29yZChyZWNvcmROYW1lKTtcblxuICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5fc3Vic2NyaXB0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIHRoaXMuX3JlY29yZC5zdWJzY3JpYmUodGhpcy5fc3Vic2NyaXB0aW9uc1tpXSk7XG4gIH1cblxuICB0aGlzLl9yZWNvcmQud2hlblJlYWR5KHRoaXMuZW1pdC5iaW5kKHRoaXMsICdyZWFkeScpKTtcbiAgdGhpcy5lbWl0KCduYW1lQ2hhbmdlZCcsIHJlY29yZE5hbWUpO1xufTtcblxuLyoqXG4gKiBBZGRzIHRoZSBzcGVjaWZpZWQgbWV0aG9kIHRvIHRoaXMgbWV0aG9kIGFuZCBmb3J3YXJkcyBpdFxuICogdG8gX2NhbGxNZXRob2RPblJlY29yZFxuICpcbiAqIEBwYXJhbSAgIHtTdHJpbmd9IG1ldGhvZE5hbWVcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkFub255bW91c1JlY29yZC5wcm90b3R5cGUuX3Byb3h5TWV0aG9kID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcbiAgdGhpc1ttZXRob2ROYW1lXSA9IHRoaXMuX2NhbGxNZXRob2RPblJlY29yZC5iaW5kKHRoaXMsIG1ldGhvZE5hbWUpO1xufTtcblxuLyoqXG4gKiBJbnZva2VzIHRoZSBzcGVjaWZpZWQgbWV0aG9kIHdpdGggdGhlIHByb3ZpZGVkIHBhcmFtZXRlcnMgb25cbiAqIHRoZSB1bmRlcmx5aW5nIHJlY29yZC4gVGhyb3dzIGVycm9zIGlmIHRoZSBtZXRob2QgaXMgbm90XG4gKiBzcGVjaWZpZWQgeWV0IG9yIGRvZXNuJ3QgZXhwb3NlIHRoZSBtZXRob2QgaW4gcXVlc3Rpb25cbiAqXG4gKiBAcGFyYW0gICB7U3RyaW5nfSBtZXRob2ROYW1lXG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHtNaXhlZH0gdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgYWN0dWFsIG1ldGhvZFxuICovXG5Bbm9ueW1vdXNSZWNvcmQucHJvdG90eXBlLl9jYWxsTWV0aG9kT25SZWNvcmQgPSBmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xuICBpZiAodGhpcy5fcmVjb3JkID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5gdCBpbnZva2UgJyArIG1ldGhvZE5hbWUgKyAnLiBBbm9ueW1vdXNSZWNvcmQgbm90IGluaXRpYWxpc2VkLiBDYWxsIHNldE5hbWUgZmlyc3QnKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdGhpcy5fcmVjb3JkW21ldGhvZE5hbWVdICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1ldGhvZE5hbWUgKyAnIGlzIG5vdCBhIG1ldGhvZCBvbiB0aGUgcmVjb3JkJyk7XG4gIH1cblxuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgcmV0dXJuIHRoaXMuX3JlY29yZFttZXRob2ROYW1lXS5hcHBseSh0aGlzLl9yZWNvcmQsIGFyZ3MpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBbm9ueW1vdXNSZWNvcmQ7XG5cbn0se1wiLi9yZWNvcmRcIjoyMyxcImNvbXBvbmVudC1lbWl0dGVyMlwiOjF9XSwyMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIHV0aWxzID0gX2RlcmVxXygnLi4vdXRpbHMvdXRpbHMnKTtcblxudmFyIFBBUlRTX1JFR19FWFAgPSAvKFteLltcXF1cXHNdKykvZztcbnZhciBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIHBhdGggb3JcbiAqIHVuZGVmaW5lZCBpZiB0aGUgcGF0aCBjYW4ndCBiZSByZXNvbHZlZFxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHtNaXhlZH1cbiAqL1xubW9kdWxlLmV4cG9ydHMuZ2V0ID0gZnVuY3Rpb24gKGRhdGEsIHBhdGgsIGRlZXBDb3B5KSB7XG4gIHZhciB0b2tlbnMgPSB0b2tlbml6ZShwYXRoKTtcbiAgdmFyIHZhbHVlID0gZGF0YTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKCh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHZhbHVlKSkgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgZGF0YSBvciBwYXRoJyk7XG4gICAgfVxuICAgIHZhbHVlID0gdmFsdWVbdG9rZW5zW2ldXTtcbiAgfVxuXG4gIHJldHVybiBkZWVwQ29weSAhPT0gZmFsc2UgPyB1dGlscy5kZWVwQ29weSh2YWx1ZSkgOiB2YWx1ZTtcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgdmFsdWUgb2YgdGhlIHBhdGguIElmIHRoZSBwYXRoIChvciBwYXJ0c1xuICogb2YgaXQpIGRvZXNuJ3QgZXhpc3QgeWV0LCBpdCB3aWxsIGJlIGNyZWF0ZWRcbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHtNaXhlZH0gdXBkYXRlZCB2YWx1ZVxuICovXG5tb2R1bGUuZXhwb3J0cy5zZXQgPSBmdW5jdGlvbiAoZGF0YSwgcGF0aCwgdmFsdWUsIGRlZXBDb3B5KSB7XG4gIHZhciB0b2tlbnMgPSB0b2tlbml6ZShwYXRoKTtcblxuICBpZiAodG9rZW5zLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBwYXRjaChkYXRhLCB2YWx1ZSwgZGVlcENvcHkpO1xuICB9XG5cbiAgdmFyIG9sZFZhbHVlID0gbW9kdWxlLmV4cG9ydHMuZ2V0KGRhdGEsIHBhdGgsIGZhbHNlKTtcbiAgdmFyIG5ld1ZhbHVlID0gcGF0Y2gob2xkVmFsdWUsIHZhbHVlLCBkZWVwQ29weSk7XG5cbiAgaWYgKG5ld1ZhbHVlID09PSBvbGRWYWx1ZSkge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IHV0aWxzLnNoYWxsb3dDb3B5KGRhdGEpO1xuXG4gIHZhciBub2RlID0gcmVzdWx0O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChpID09PSB0b2tlbnMubGVuZ3RoIC0gMSkge1xuICAgICAgbm9kZVt0b2tlbnNbaV1dID0gbmV3VmFsdWU7XG4gICAgfSBlbHNlIGlmIChub2RlW3Rva2Vuc1tpXV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgbm9kZSA9IG5vZGVbdG9rZW5zW2ldXSA9IHV0aWxzLnNoYWxsb3dDb3B5KG5vZGVbdG9rZW5zW2ldXSk7XG4gICAgfSBlbHNlIGlmICh0b2tlbnNbaSArIDFdICYmICFpc05hTih0b2tlbnNbaSArIDFdKSkge1xuICAgICAgbm9kZSA9IG5vZGVbdG9rZW5zW2ldXSA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gbm9kZVt0b2tlbnNbaV1dID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBNZXJnZSB0aGUgbmV3IHZhbHVlIGludG8gdGhlIG9sZCB2YWx1ZVxuICogQHBhcmFtICB7TWl4ZWR9IG9sZFZhbHVlXG4gKiBAcGFyYW0gIHtNaXhlZH0gbmV3VmFsdWVcbiAqIEBwYXJhbSAge2Jvb2xlYW59IGRlZXBDb3B5XG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqL1xuZnVuY3Rpb24gcGF0Y2gob2xkVmFsdWUsIG5ld1ZhbHVlLCBkZWVwQ29weSkge1xuICB2YXIgaSA9IHZvaWQgMDtcbiAgdmFyIGogPSB2b2lkIDA7XG4gIGlmIChvbGRWYWx1ZSA9PT0gbnVsbCB8fCBuZXdWYWx1ZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9sZFZhbHVlKSAmJiBBcnJheS5pc0FycmF5KG5ld1ZhbHVlKSkge1xuICAgIHZhciBhcnIgPSB2b2lkIDA7XG4gICAgZm9yIChpID0gMDsgaSA8IG5ld1ZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdmFsdWUgPSBwYXRjaChvbGRWYWx1ZVtpXSwgbmV3VmFsdWVbaV0sIGZhbHNlKTtcbiAgICAgIGlmICghYXJyKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gb2xkVmFsdWVbaV0pIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBhcnIgPSBbXTtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IGk7ICsraikge1xuICAgICAgICAgIGFycltqXSA9IG9sZFZhbHVlW2pdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhcnJbaV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgYXJyID0gYXJyICYmIGRlZXBDb3B5ICE9PSBmYWxzZSA/IHV0aWxzLmRlZXBDb3B5KGFycikgOiBhcnI7XG4gICAgYXJyID0gYXJyIHx8IChvbGRWYWx1ZS5sZW5ndGggPT09IG5ld1ZhbHVlLmxlbmd0aCA/IG9sZFZhbHVlIDogbmV3VmFsdWUpO1xuICAgIHJldHVybiBhcnI7XG4gIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkobmV3VmFsdWUpICYmICh0eXBlb2Ygb2xkVmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG9sZFZhbHVlKSkgPT09ICdvYmplY3QnICYmICh0eXBlb2YgbmV3VmFsdWUgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG5ld1ZhbHVlKSkgPT09ICdvYmplY3QnKSB7XG4gICAgdmFyIG9iaiA9IHZvaWQgMDtcbiAgICB2YXIgcHJvcHMgPSBPYmplY3Qua2V5cyhuZXdWYWx1ZSk7XG4gICAgZm9yIChpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgX3ZhbHVlID0gcGF0Y2gob2xkVmFsdWVbcHJvcHNbaV1dLCBuZXdWYWx1ZVtwcm9wc1tpXV0sIGZhbHNlKTtcbiAgICAgIGlmICghb2JqKSB7XG4gICAgICAgIGlmIChfdmFsdWUgPT09IG9sZFZhbHVlW3Byb3BzW2ldXSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIG9iaiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBpOyArK2opIHtcbiAgICAgICAgICBvYmpbcHJvcHNbal1dID0gb2xkVmFsdWVbcHJvcHNbal1dO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvYmpbcHJvcHNbaV1dID0gbmV3VmFsdWVbcHJvcHNbaV1dO1xuICAgIH1cbiAgICBvYmogPSBvYmogJiYgZGVlcENvcHkgIT09IGZhbHNlID8gdXRpbHMuZGVlcENvcHkob2JqKSA6IG9iajtcbiAgICBvYmogPSBvYmogfHwgKE9iamVjdC5rZXlzKG9sZFZhbHVlKS5sZW5ndGggPT09IHByb3BzLmxlbmd0aCA/IG9sZFZhbHVlIDogbmV3VmFsdWUpO1xuICAgIHJldHVybiBvYmo7XG4gIH0gZWxzZSBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgcmV0dXJuIGRlZXBDb3B5ICE9PSBmYWxzZSA/IHV0aWxzLmRlZXBDb3B5KG5ld1ZhbHVlKSA6IG5ld1ZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9sZFZhbHVlO1xufVxuXG4vKipcbiAqIFBhcnNlcyB0aGUgcGF0aC4gU3BsaXRzIGl0IGludG9cbiAqIGtleXMgZm9yIG9iamVjdHMgYW5kIGluZGljZXMgZm9yIGFycmF5cy5cbiAqXG4gKiBAcmV0dXJucyBBcnJheSBvZiB0b2tlbnNcbiAqL1xuZnVuY3Rpb24gdG9rZW5pemUocGF0aCkge1xuICBpZiAoY2FjaGVbcGF0aF0pIHtcbiAgICByZXR1cm4gY2FjaGVbcGF0aF07XG4gIH1cblxuICB2YXIgcGFydHMgPSBTdHJpbmcocGF0aCkgIT09ICd1bmRlZmluZWQnID8gU3RyaW5nKHBhdGgpLm1hdGNoKFBBUlRTX1JFR19FWFApIDogW107XG5cbiAgaWYgKCFwYXJ0cykge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBwYXRoICcgKyBwYXRoKTtcbiAgfVxuXG4gIGNhY2hlW3BhdGhdID0gcGFydHM7XG4gIHJldHVybiBjYWNoZVtwYXRoXTtcbn1cblxufSx7XCIuLi91dGlscy91dGlsc1wiOjMxfV0sMjE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLXJlc3QtcGFyYW1zICovXG5cbnZhciBFdmVudEVtaXR0ZXIgPSBfZGVyZXFfKCdjb21wb25lbnQtZW1pdHRlcjInKTtcbnZhciBSZWNvcmQgPSBfZGVyZXFfKCcuL3JlY29yZCcpO1xudmFyIEMgPSBfZGVyZXFfKCcuLi9jb25zdGFudHMvY29uc3RhbnRzJyk7XG5cbnZhciBFTlRSWV9BRERFRF9FVkVOVCA9ICdlbnRyeS1hZGRlZCc7XG52YXIgRU5UUllfUkVNT1ZFRF9FVkVOVCA9ICdlbnRyeS1yZW1vdmVkJztcbnZhciBFTlRSWV9NT1ZFRF9FVkVOVCA9ICdlbnRyeS1tb3ZlZCc7XG5cbi8qKlxuICogQSBMaXN0IGlzIGEgc3BlY2lhbGlzZWQgUmVjb3JkIHRoYXQgY29udGFpbnNcbiAqIGFuIEFycmF5IG9mIHJlY29yZE5hbWVzIGFuZCBwcm92aWRlcyBhIG51bWJlclxuICogb2YgY29udmluaWVuY2UgbWV0aG9kcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCB0aGVtLlxuICpcbiAqIEBwYXJhbSB7UmVjb3JkSGFubGRlcn0gcmVjb3JkSGFuZGxlclxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgICAgVGhlIG5hbWUgb2YgdGhlIGxpc3RcbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmFyIExpc3QgPSBmdW5jdGlvbiBMaXN0KHJlY29yZEhhbmRsZXIsIG5hbWUsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCBuYW1lLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBhcmd1bWVudCBuYW1lJyk7XG4gIH1cblxuICB0aGlzLl9yZWNvcmRIYW5kbGVyID0gcmVjb3JkSGFuZGxlcjtcbiAgdGhpcy5fcmVjb3JkID0gdGhpcy5fcmVjb3JkSGFuZGxlci5nZXRSZWNvcmQobmFtZSwgb3B0aW9ucyk7XG4gIHRoaXMuX3JlY29yZC5fYXBwbHlVcGRhdGUgPSB0aGlzLl9hcHBseVVwZGF0ZS5iaW5kKHRoaXMpO1xuXG4gIHRoaXMuX3JlY29yZC5vbignZGVsZXRlJywgdGhpcy5lbWl0LmJpbmQodGhpcywgJ2RlbGV0ZScpKTtcbiAgdGhpcy5fcmVjb3JkLm9uKCdkaXNjYXJkJywgdGhpcy5fb25EaXNjYXJkLmJpbmQodGhpcykpO1xuICB0aGlzLl9yZWNvcmQub24oJ3JlYWR5JywgdGhpcy5fb25SZWFkeS5iaW5kKHRoaXMpKTtcblxuICB0aGlzLmlzRGVzdHJveWVkID0gdGhpcy5fcmVjb3JkLmlzRGVzdHJveWVkO1xuICB0aGlzLmlzUmVhZHkgPSB0aGlzLl9yZWNvcmQuaXNSZWFkeTtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5fcXVldWVkTWV0aG9kcyA9IFtdO1xuICB0aGlzLl9iZWZvcmVTdHJ1Y3R1cmUgPSBudWxsO1xuICB0aGlzLl9oYXNBZGRMaXN0ZW5lciA9IG51bGw7XG4gIHRoaXMuX2hhc1JlbW92ZUxpc3RlbmVyID0gbnVsbDtcbiAgdGhpcy5faGFzTW92ZUxpc3RlbmVyID0gbnVsbDtcblxuICB0aGlzLmRlbGV0ZSA9IHRoaXMuX3JlY29yZC5kZWxldGUuYmluZCh0aGlzLl9yZWNvcmQpO1xuICB0aGlzLmRpc2NhcmQgPSB0aGlzLl9yZWNvcmQuZGlzY2FyZC5iaW5kKHRoaXMuX3JlY29yZCk7XG4gIHRoaXMud2hlblJlYWR5ID0gdGhpcy5fcmVjb3JkLndoZW5SZWFkeS5iaW5kKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyKExpc3QucHJvdG90eXBlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGFycmF5IG9mIGxpc3QgZW50cmllcyBvciBhblxuICogZW1wdHkgYXJyYXkgaWYgdGhlIGxpc3QgaGFzbid0IGJlZW4gcG9wdWxhdGVkIHlldC5cbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJucyB7QXJyYXl9IGVudHJpZXNcbiAqL1xuTGlzdC5wcm90b3R5cGUuZ2V0RW50cmllcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGVudHJpZXMgPSB0aGlzLl9yZWNvcmQuZ2V0KCk7XG5cbiAgaWYgKCEoZW50cmllcyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJldHVybiBlbnRyaWVzO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGxpc3QgaXMgZW1wdHlcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gaXNFbXB0eVxuICovXG5MaXN0LnByb3RvdHlwZS5pc0VtcHR5ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5nZXRFbnRyaWVzKCkubGVuZ3RoID09PSAwO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBsaXN0IHdpdGggYSBuZXcgc2V0IG9mIGVudHJpZXNcbiAqXG4gKiBAcHVibGljXG4gKiBAcGFyYW0ge0FycmF5fSBlbnRyaWVzXG4gKi9cbkxpc3QucHJvdG90eXBlLnNldEVudHJpZXMgPSBmdW5jdGlvbiAoZW50cmllcykge1xuICB2YXIgZXJyb3JNc2cgPSAnZW50cmllcyBtdXN0IGJlIGFuIGFycmF5IG9mIHJlY29yZCBuYW1lcyc7XG4gIHZhciBpID0gdm9pZCAwO1xuXG4gIGlmICghKGVudHJpZXMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNc2cpO1xuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodHlwZW9mIGVudHJpZXNbaV0gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNc2cpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aGlzLl9yZWNvcmQuaXNSZWFkeSA9PT0gZmFsc2UpIHtcbiAgICB0aGlzLl9xdWV1ZWRNZXRob2RzLnB1c2godGhpcy5zZXRFbnRyaWVzLmJpbmQodGhpcywgZW50cmllcykpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2JlZm9yZUNoYW5nZSgpO1xuICAgIHRoaXMuX3JlY29yZC5zZXQoZW50cmllcyk7XG4gICAgdGhpcy5fYWZ0ZXJDaGFuZ2UoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZW1vdmVzIGFuIGVudHJ5IGZyb20gdGhlIGxpc3RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZW50cnlcbiAqIEBwYXJhbSB7TnVtYmVyfSBbaW5kZXhdXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkxpc3QucHJvdG90eXBlLnJlbW92ZUVudHJ5ID0gZnVuY3Rpb24gKGVudHJ5LCBpbmRleCkge1xuICBpZiAodGhpcy5fcmVjb3JkLmlzUmVhZHkgPT09IGZhbHNlKSB7XG4gICAgdGhpcy5fcXVldWVkTWV0aG9kcy5wdXNoKHRoaXMucmVtb3ZlRW50cnkuYmluZCh0aGlzLCBlbnRyeSwgaW5kZXgpKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgY3VycmVudEVudHJpZXMgPSB0aGlzLl9yZWNvcmQuZ2V0KCk7XG4gIHZhciBoYXNJbmRleCA9IHRoaXMuX2hhc0luZGV4KGluZGV4KTtcbiAgdmFyIGVudHJpZXMgPSBbXTtcbiAgdmFyIGkgPSB2b2lkIDA7XG5cbiAgZm9yIChpID0gMDsgaSA8IGN1cnJlbnRFbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGN1cnJlbnRFbnRyaWVzW2ldICE9PSBlbnRyeSB8fCBoYXNJbmRleCAmJiBpbmRleCAhPT0gaSkge1xuICAgICAgZW50cmllcy5wdXNoKGN1cnJlbnRFbnRyaWVzW2ldKTtcbiAgICB9XG4gIH1cbiAgdGhpcy5fYmVmb3JlQ2hhbmdlKCk7XG4gIHRoaXMuX3JlY29yZC5zZXQoZW50cmllcyk7XG4gIHRoaXMuX2FmdGVyQ2hhbmdlKCk7XG59O1xuXG4vKipcbiAqIEFkZHMgYW4gZW50cnkgdG8gdGhlIGxpc3RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZW50cnlcbiAqIEBwYXJhbSB7TnVtYmVyfSBbaW5kZXhdXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkxpc3QucHJvdG90eXBlLmFkZEVudHJ5ID0gZnVuY3Rpb24gKGVudHJ5LCBpbmRleCkge1xuICBpZiAodHlwZW9mIGVudHJ5ICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRW50cnkgbXVzdCBiZSBhIHJlY29yZE5hbWUnKTtcbiAgfVxuXG4gIGlmICh0aGlzLl9yZWNvcmQuaXNSZWFkeSA9PT0gZmFsc2UpIHtcbiAgICB0aGlzLl9xdWV1ZWRNZXRob2RzLnB1c2godGhpcy5hZGRFbnRyeS5iaW5kKHRoaXMsIGVudHJ5LCBpbmRleCkpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBoYXNJbmRleCA9IHRoaXMuX2hhc0luZGV4KGluZGV4KTtcbiAgdmFyIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcbiAgaWYgKGhhc0luZGV4KSB7XG4gICAgZW50cmllcy5zcGxpY2UoaW5kZXgsIDAsIGVudHJ5KTtcbiAgfSBlbHNlIHtcbiAgICBlbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG4gIHRoaXMuX2JlZm9yZUNoYW5nZSgpO1xuICB0aGlzLl9yZWNvcmQuc2V0KGVudHJpZXMpO1xuICB0aGlzLl9hZnRlckNoYW5nZSgpO1xufTtcblxuLyoqXG4gKiBQcm94aWVzIHRoZSB1bmRlcmx5aW5nIFJlY29yZCdzIHN1YnNjcmliZSBtZXRob2QuIE1ha2VzIHN1cmVcbiAqIHRoYXQgbm8gcGF0aCBpcyBwcm92aWRlZFxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5MaXN0LnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBwYXJhbWV0ZXJzID0gUmVjb3JkLnByb3RvdHlwZS5fbm9ybWFsaXplQXJndW1lbnRzKGFyZ3VtZW50cyk7XG5cbiAgaWYgKHBhcmFtZXRlcnMucGF0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcigncGF0aCBpcyBub3Qgc3VwcG9ydGVkIGZvciBMaXN0LnN1YnNjcmliZScpO1xuICB9XG5cbiAgLy8gTWFrZSBzdXJlIHRoZSBjYWxsYmFjayBpcyBpbnZva2VkIHdpdGggYW4gZW1wdHkgYXJyYXkgZm9yIG5ldyByZWNvcmRzXG4gIHZhciBsaXN0Q2FsbGJhY2sgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayh0aGlzLmdldEVudHJpZXMoKSk7XG4gIH0uYmluZCh0aGlzLCBwYXJhbWV0ZXJzLmNhbGxiYWNrKTtcblxuICAvKipcbiAgKiBBZGRpbmcgYSBwcm9wZXJ0eSBvbnRvIGEgZnVuY3Rpb24gZGlyZWN0bHkgaXMgdGVycmlibGUgcHJhY3RpY2UsXG4gICogYW5kIHdlIHdpbGwgY2hhbmdlIHRoaXMgYXMgc29vbiBhcyB3ZSBoYXZlIGEgbW9yZSBzZXBlcmF0ZSBhcHByb2FjaFxuICAqIG9mIGNyZWF0aW5nIGxpc3RzIHRoYXQgZG9lc24ndCBoYXZlIHJlY29yZHMgZGVmYXVsdCBzdGF0ZS5cbiAgKlxuICAqIFRoZSByZWFzb24gd2UgYXJlIGhvbGRpbmcgYSByZWZlcmVuY2luZyB0byB3cmFwcGVkIGFycmF5IGlzIHNvIHRoYXRcbiAgKiBvbiB1bnN1YnNjcmliZSBpdCBjYW4gcHJvdmlkZSBhIHJlZmVyZW5jZSB0byB0aGUgYWN0dWFsIG1ldGhvZCB0aGVcbiAgKiByZWNvcmQgaXMgc3Vic2NyaWJlZCB0b28uXG4gICoqL1xuICBwYXJhbWV0ZXJzLmNhbGxiYWNrLndyYXBwZWRDYWxsYmFjayA9IGxpc3RDYWxsYmFjaztcbiAgcGFyYW1ldGVycy5jYWxsYmFjayA9IGxpc3RDYWxsYmFjaztcblxuICB0aGlzLl9yZWNvcmQuc3Vic2NyaWJlKHBhcmFtZXRlcnMpO1xufTtcblxuLyoqXG4gKiBQcm94aWVzIHRoZSB1bmRlcmx5aW5nIFJlY29yZCdzIHVuc3Vic2NyaWJlIG1ldGhvZC4gTWFrZXMgc3VyZVxuICogdGhhdCBubyBwYXRoIGlzIHByb3ZpZGVkXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkxpc3QucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcGFyYW1ldGVycyA9IFJlY29yZC5wcm90b3R5cGUuX25vcm1hbGl6ZUFyZ3VtZW50cyhhcmd1bWVudHMpO1xuXG4gIGlmIChwYXJhbWV0ZXJzLnBhdGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3BhdGggaXMgbm90IHN1cHBvcnRlZCBmb3IgTGlzdC51bnN1YnNjcmliZScpO1xuICB9XG5cbiAgcGFyYW1ldGVycy5jYWxsYmFjayA9IHBhcmFtZXRlcnMuY2FsbGJhY2sud3JhcHBlZENhbGxiYWNrO1xuICB0aGlzLl9yZWNvcmQudW5zdWJzY3JpYmUocGFyYW1ldGVycyk7XG59O1xuXG4vKipcbiAqIExpc3RlbnMgZm9yIGNoYW5nZXMgaW4gdGhlIFJlY29yZCdzIHJlYWR5IHN0YXRlXG4gKiBhbmQgYXBwbGllcyB0aGVtIHRvIHRoaXMgbGlzdFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuTGlzdC5wcm90b3R5cGUuX29uUmVhZHkgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuaXNSZWFkeSA9IHRydWU7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9xdWV1ZWRNZXRob2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgdGhpcy5fcXVldWVkTWV0aG9kc1tpXSgpO1xuICB9XG5cbiAgdGhpcy5fcXVldWVkTWV0aG9kcyA9IFtdO1xuICB0aGlzLmVtaXQoJ3JlYWR5Jyk7XG59O1xuXG4vKipcbiAqIExpc3RlbnMgZm9yIHRoZSByZWNvcmQgZGlzY2FyZCBldmVudCBhbmQgYXBwbGllc1xuICogY2hhbmdlcyB0byBsaXN0XG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5MaXN0LnByb3RvdHlwZS5fb25EaXNjYXJkID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmlzRGVzdHJveWVkID0gdHJ1ZTtcbiAgdGhpcy5lbWl0KCdkaXNjYXJkJyk7XG59O1xuXG4vKipcbiAqIFByb3hpZXMgdGhlIHVuZGVybHlpbmcgUmVjb3JkJ3MgX3VwZGF0ZSBtZXRob2QuIFNldCdzXG4gKiBkYXRhIHRvIGFuIGVtcHR5IGFycmF5IGlmIG5vIGRhdGEgaXMgcHJvdmlkZWQuXG4gKlxuICogQHBhcmFtICAge251bGx9ICAgcGF0aCBtdXN0IChzaG91bGQgOi0pKSBiZSBudWxsXG4gKiBAcGFyYW0gICB7QXJyYXl9ICBkYXRhXG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5MaXN0LnByb3RvdHlwZS5fYXBwbHlVcGRhdGUgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5QQVRDSCkge1xuICAgIHRocm93IG5ldyBFcnJvcignUEFUQ0ggaXMgbm90IHN1cHBvcnRlZCBmb3IgTGlzdHMnKTtcbiAgfVxuXG4gIGlmIChtZXNzYWdlLmRhdGFbMl0uY2hhckF0KDApICE9PSAnWycpIHtcbiAgICBtZXNzYWdlLmRhdGFbMl0gPSAnW10nO1xuICB9XG5cbiAgdGhpcy5fYmVmb3JlQ2hhbmdlKCk7XG4gIFJlY29yZC5wcm90b3R5cGUuX2FwcGx5VXBkYXRlLmNhbGwodGhpcy5fcmVjb3JkLCBtZXNzYWdlKTtcbiAgdGhpcy5fYWZ0ZXJDaGFuZ2UoKTtcbn07XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoYXQgdGhlIGluZGV4IHByb3ZpZGVkIGlzIHdpdGhpbiB0aGUgY3VycmVudCBzZXQgb2YgZW50cmllcy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xuTGlzdC5wcm90b3R5cGUuX2hhc0luZGV4ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gIHZhciBoYXNJbmRleCA9IGZhbHNlO1xuICB2YXIgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChpc05hTihpbmRleCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW5kZXggbXVzdCBiZSBhIG51bWJlcicpO1xuICAgIH1cbiAgICBpZiAoaW5kZXggIT09IGVudHJpZXMubGVuZ3RoICYmIChpbmRleCA+PSBlbnRyaWVzLmxlbmd0aCB8fCBpbmRleCA8IDApKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luZGV4IG11c3QgYmUgd2l0aGluIGN1cnJlbnQgZW50cmllcycpO1xuICAgIH1cbiAgICBoYXNJbmRleCA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIGhhc0luZGV4O1xufTtcblxuLyoqXG4gKiBFc3RhYmxpc2hlcyB0aGUgY3VycmVudCBzdHJ1Y3R1cmUgb2YgdGhlIGxpc3QsIHByb3ZpZGVkIHRoZSBjbGllbnQgaGFzIGF0dGFjaGVkIGFueVxuICogYWRkIC8gbW92ZSAvIHJlbW92ZSBsaXN0ZW5lclxuICpcbiAqIFRoaXMgd2lsbCBiZSBjYWxsZWQgYmVmb3JlIGFueSBjaGFuZ2UgdG8gdGhlIGxpc3QsIHJlZ2FyZHNsZXNzIGlmIHRoZSBjaGFuZ2Ugd2FzIHRyaWdnZXJlZFxuICogYnkgYW4gaW5jb21pbmcgbWVzc2FnZSBmcm9tIHRoZSBzZXJ2ZXIgb3IgYnkgdGhlIGNsaWVudFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuTGlzdC5wcm90b3R5cGUuX2JlZm9yZUNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5faGFzQWRkTGlzdGVuZXIgPSB0aGlzLmxpc3RlbmVycyhFTlRSWV9BRERFRF9FVkVOVCkubGVuZ3RoID4gMDtcbiAgdGhpcy5faGFzUmVtb3ZlTGlzdGVuZXIgPSB0aGlzLmxpc3RlbmVycyhFTlRSWV9SRU1PVkVEX0VWRU5UKS5sZW5ndGggPiAwO1xuICB0aGlzLl9oYXNNb3ZlTGlzdGVuZXIgPSB0aGlzLmxpc3RlbmVycyhFTlRSWV9NT1ZFRF9FVkVOVCkubGVuZ3RoID4gMDtcblxuICBpZiAodGhpcy5faGFzQWRkTGlzdGVuZXIgfHwgdGhpcy5faGFzUmVtb3ZlTGlzdGVuZXIgfHwgdGhpcy5faGFzTW92ZUxpc3RlbmVyKSB7XG4gICAgdGhpcy5fYmVmb3JlU3RydWN0dXJlID0gdGhpcy5fZ2V0U3RydWN0dXJlKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fYmVmb3JlU3RydWN0dXJlID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBDb21wYXJlcyB0aGUgc3RydWN0dXJlIG9mIHRoZSBsaXN0IGFmdGVyIGEgY2hhbmdlIHRvIGl0cyBwcmV2aW91cyBzdHJ1Y3R1cmUgYW5kIG5vdGlmaWVzXG4gKiBhbnkgYWRkIC8gbW92ZSAvIHJlbW92ZSBsaXN0ZW5lci4gV29uJ3QgZG8gYW55dGhpbmcgaWYgbm8gbGlzdGVuZXJzIGFyZSBhdHRhY2hlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkxpc3QucHJvdG90eXBlLl9hZnRlckNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuX2JlZm9yZVN0cnVjdHVyZSA9PT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBhZnRlciA9IHRoaXMuX2dldFN0cnVjdHVyZSgpO1xuICB2YXIgYmVmb3JlID0gdGhpcy5fYmVmb3JlU3RydWN0dXJlO1xuICB2YXIgZW50cnkgPSB2b2lkIDA7XG4gIHZhciBpID0gdm9pZCAwO1xuXG4gIGlmICh0aGlzLl9oYXNSZW1vdmVMaXN0ZW5lcikge1xuICAgIGZvciAoZW50cnkgaW4gYmVmb3JlKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgYmVmb3JlW2VudHJ5XS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYWZ0ZXJbZW50cnldID09PSB1bmRlZmluZWQgfHwgYWZ0ZXJbZW50cnldW2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLmVtaXQoRU5UUllfUkVNT1ZFRF9FVkVOVCwgZW50cnksIGJlZm9yZVtlbnRyeV1baV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMuX2hhc0FkZExpc3RlbmVyIHx8IHRoaXMuX2hhc01vdmVMaXN0ZW5lcikge1xuICAgIGZvciAoZW50cnkgaW4gYWZ0ZXIpIHtcbiAgICAgIGlmIChiZWZvcmVbZW50cnldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGFmdGVyW2VudHJ5XS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuZW1pdChFTlRSWV9BRERFRF9FVkVOVCwgZW50cnksIGFmdGVyW2VudHJ5XVtpXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhZnRlcltlbnRyeV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoYmVmb3JlW2VudHJ5XVtpXSAhPT0gYWZ0ZXJbZW50cnldW2ldKSB7XG4gICAgICAgICAgICBpZiAoYmVmb3JlW2VudHJ5XVtpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHRoaXMuZW1pdChFTlRSWV9BRERFRF9FVkVOVCwgZW50cnksIGFmdGVyW2VudHJ5XVtpXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmVtaXQoRU5UUllfTU9WRURfRVZFTlQsIGVudHJ5LCBhZnRlcltlbnRyeV1baV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlcyB0aHJvdWdoIHRoZSBsaXN0IGFuZCBjcmVhdGVzIGEgbWFwIHdpdGggdGhlIGVudHJ5IGFzIGEga2V5XG4gKiBhbmQgYW4gYXJyYXkgb2YgaXRzIHBvc2l0aW9uKHMpIHdpdGhpbiB0aGUgbGlzdCBhcyBhIHZhbHVlLCBlLmcuXG4gKlxuICoge1xuICogICAncmVjb3JkQSc6IFsgMCwgMyBdLFxuICogICAncmVjb3JkQic6IFsgMSBdLFxuICogICAncmVjb3JkQyc6IFsgMiBdXG4gKiB9XG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHtBcnJheX0gc3RydWN0dXJlXG4gKi9cbkxpc3QucHJvdG90eXBlLl9nZXRTdHJ1Y3R1cmUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdHJ1Y3R1cmUgPSB7fTtcbiAgdmFyIGkgPSB2b2lkIDA7XG4gIHZhciBlbnRyaWVzID0gdGhpcy5fcmVjb3JkLmdldCgpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0cnVjdHVyZVtlbnRyaWVzW2ldXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBzdHJ1Y3R1cmVbZW50cmllc1tpXV0gPSBbaV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0cnVjdHVyZVtlbnRyaWVzW2ldXS5wdXNoKGkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdHJ1Y3R1cmU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3Q7XG5cbn0se1wiLi4vY29uc3RhbnRzL2NvbnN0YW50c1wiOjExLFwiLi9yZWNvcmRcIjoyMyxcImNvbXBvbmVudC1lbWl0dGVyMlwiOjF9XSwyMjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIFJlY29yZCA9IF9kZXJlcV8oJy4vcmVjb3JkJyk7XG52YXIgQW5vbnltb3VzUmVjb3JkID0gX2RlcmVxXygnLi9hbm9ueW1vdXMtcmVjb3JkJyk7XG52YXIgTGlzdCA9IF9kZXJlcV8oJy4vbGlzdCcpO1xudmFyIExpc3RlbmVyID0gX2RlcmVxXygnLi4vdXRpbHMvbGlzdGVuZXInKTtcbnZhciBTaW5nbGVOb3RpZmllciA9IF9kZXJlcV8oJy4uL3V0aWxzL3NpbmdsZS1ub3RpZmllcicpO1xudmFyIEMgPSBfZGVyZXFfKCcuLi9jb25zdGFudHMvY29uc3RhbnRzJyk7XG52YXIgbWVzc2FnZVBhcnNlciA9IF9kZXJlcV8oJy4uL21lc3NhZ2UvbWVzc2FnZS1wYXJzZXInKTtcbnZhciBtZXNzYWdlQnVpbGRlciA9IF9kZXJlcV8oJy4uL21lc3NhZ2UvbWVzc2FnZS1idWlsZGVyJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gX2RlcmVxXygnY29tcG9uZW50LWVtaXR0ZXIyJyk7XG5cbi8qKlxuICogQSBjb2xsZWN0aW9uIG9mIGZhY3RvcmllcyBmb3IgcmVjb3Jkcy4gVGhpcyBjbGFzc1xuICogaXMgZXhwb3NlZCBhcyBjbGllbnQucmVjb3JkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgICAgZGVlcHN0cmVhbSBvcHRpb25zXG4gKiBAcGFyYW0ge0Nvbm5lY3Rpb259IGNvbm5lY3Rpb25cbiAqIEBwYXJhbSB7Q2xpZW50fSBjbGllbnRcbiAqL1xudmFyIFJlY29yZEhhbmRsZXIgPSBmdW5jdGlvbiBSZWNvcmRIYW5kbGVyKG9wdGlvbnMsIGNvbm5lY3Rpb24sIGNsaWVudCkge1xuICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5fY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XG4gIHRoaXMuX2NsaWVudCA9IGNsaWVudDtcbiAgdGhpcy5fcmVjb3JkcyA9IHt9O1xuICB0aGlzLl9saXN0cyA9IHt9O1xuICB0aGlzLl9saXN0ZW5lciA9IHt9O1xuICB0aGlzLl93cml0ZUNhbGxiYWNrcyA9IHt9O1xuICB0aGlzLl9kZXN0cm95RXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHRoaXMuX2hhc1JlZ2lzdHJ5ID0gbmV3IFNpbmdsZU5vdGlmaWVyKGNsaWVudCwgY29ubmVjdGlvbiwgQy5UT1BJQy5SRUNPUkQsIEMuQUNUSU9OUy5IQVMsIHRoaXMuX29wdGlvbnMucmVjb3JkUmVhZFRpbWVvdXQpO1xuICB0aGlzLl9zbmFwc2hvdFJlZ2lzdHJ5ID0gbmV3IFNpbmdsZU5vdGlmaWVyKGNsaWVudCwgY29ubmVjdGlvbiwgQy5UT1BJQy5SRUNPUkQsIEMuQUNUSU9OUy5TTkFQU0hPVCwgdGhpcy5fb3B0aW9ucy5yZWNvcmRSZWFkVGltZW91dCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gZXhpc3RpbmcgcmVjb3JkIG9yIGNyZWF0ZXMgYSBuZXcgb25lLlxuICpcbiAqIEBwYXJhbSAgIHtTdHJpbmd9IG5hbWUgICAgICAgICAgICAgIHRoZSB1bmlxdWUgbmFtZSBvZiB0aGUgcmVjb3JkXG4gKiBAcGFyYW0gICB7W09iamVjdF19IHJlY29yZE9wdGlvbnMgICBBIG1hcCBvZiBwYXJhbWV0ZXJzIGZvciB0aGlzIHBhcnRpY3VsYXIgcmVjb3JkLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgcGVyc2lzdDogdHJ1ZSB9XG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge1JlY29yZH1cbiAqL1xuUmVjb3JkSGFuZGxlci5wcm90b3R5cGUuZ2V0UmVjb3JkID0gZnVuY3Rpb24gKG5hbWUsIHJlY29yZE9wdGlvbnMpIHtcbiAgaWYgKCF0aGlzLl9yZWNvcmRzW25hbWVdKSB7XG4gICAgdGhpcy5fcmVjb3Jkc1tuYW1lXSA9IG5ldyBSZWNvcmQobmFtZSwgcmVjb3JkT3B0aW9ucyB8fCB7fSwgdGhpcy5fY29ubmVjdGlvbiwgdGhpcy5fb3B0aW9ucywgdGhpcy5fY2xpZW50KTtcbiAgICB0aGlzLl9yZWNvcmRzW25hbWVdLm9uKCdlcnJvcicsIHRoaXMuX29uUmVjb3JkRXJyb3IuYmluZCh0aGlzLCBuYW1lKSk7XG4gICAgdGhpcy5fcmVjb3Jkc1tuYW1lXS5vbignZGVzdHJveVBlbmRpbmcnLCB0aGlzLl9vbkRlc3Ryb3lQZW5kaW5nLmJpbmQodGhpcywgbmFtZSkpO1xuICAgIHRoaXMuX3JlY29yZHNbbmFtZV0ub24oJ2RlbGV0ZScsIHRoaXMuX3JlbW92ZVJlY29yZC5iaW5kKHRoaXMsIG5hbWUpKTtcbiAgICB0aGlzLl9yZWNvcmRzW25hbWVdLm9uKCdkaXNjYXJkJywgdGhpcy5fcmVtb3ZlUmVjb3JkLmJpbmQodGhpcywgbmFtZSkpO1xuICB9XG5cbiAgdGhpcy5fcmVjb3Jkc1tuYW1lXS51c2FnZXMrKztcblxuICByZXR1cm4gdGhpcy5fcmVjb3Jkc1tuYW1lXTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBleGlzdGluZyBMaXN0IG9yIGNyZWF0ZXMgYSBuZXcgb25lLiBBIGxpc3QgaXMgYSBzcGVjaWFsaXNlZFxuICogdHlwZSBvZiByZWNvcmQgdGhhdCBob2xkcyBhbiBhcnJheSBvZiByZWNvcmROYW1lcy5cbiAqXG4gKiBAcGFyYW0gICB7U3RyaW5nfSBuYW1lICAgICAgIHRoZSB1bmlxdWUgbmFtZSBvZiB0aGUgbGlzdFxuICogQHBhcmFtICAge1tPYmplY3RdfSBvcHRpb25zICAgQSBtYXAgb2YgcGFyYW1ldGVycyBmb3IgdGhpcyBwYXJ0aWN1bGFyIGxpc3QuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgcGVyc2lzdDogdHJ1ZSB9XG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge0xpc3R9XG4gKi9cblJlY29yZEhhbmRsZXIucHJvdG90eXBlLmdldExpc3QgPSBmdW5jdGlvbiAobmFtZSwgb3B0aW9ucykge1xuICBpZiAoIXRoaXMuX2xpc3RzW25hbWVdKSB7XG4gICAgdGhpcy5fbGlzdHNbbmFtZV0gPSBuZXcgTGlzdCh0aGlzLCBuYW1lLCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9yZWNvcmRzW25hbWVdLnVzYWdlcysrO1xuICB9XG4gIHJldHVybiB0aGlzLl9saXN0c1tuYW1lXTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBhbm9ueW1vdXMgcmVjb3JkLiBBIGFub255bW91cyByZWNvcmQgaXMgZWZmZWN0aXZlbHlcbiAqIGEgd3JhcHBlciB0aGF0IG1pbWlja3MgdGhlIEFQSSBvZiBhIHJlY29yZCwgYnV0IGFsbG93cyBmb3IgdGhlXG4gKiB1bmRlcmx5aW5nIHJlY29yZCB0byBiZSBzd2FwcGVkIHdpdGhvdXQgbG9vc2luZyBzdWJzY3JpcHRpb25zIGV0Yy5cbiAqXG4gKiBUaGlzIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgd2hlbiBzZWxlY3RpbmcgZnJvbSBhIG51bWJlciBvZiBzaW1pbGFybHlcbiAqIHN0cnVjdHVyZWQgcmVjb3Jkcy4gRS5nLiBhIGxpc3Qgb2YgdXNlcnMgdGhhdCBjYW4gYmUgY2hvb3NlbiBmcm9tIGEgbGlzdFxuICpcbiAqIFRoZSBvbmx5IEFQSSBkaWZmZXJlbmNlIHRvIGEgbm9ybWFsIHJlY29yZCBpcyBhbiBhZGRpdGlvbmFsIHNldE5hbWUoIG5hbWUgKSBtZXRob2QuXG4gKlxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHtBbm9ueW1vdXNSZWNvcmR9XG4gKi9cblJlY29yZEhhbmRsZXIucHJvdG90eXBlLmdldEFub255bW91c1JlY29yZCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIG5ldyBBbm9ueW1vdXNSZWNvcmQodGhpcyk7XG59O1xuXG4vKipcbiAqIEFsbG93cyB0byBsaXN0ZW4gZm9yIHJlY29yZCBzdWJzY3JpcHRpb25zIG1hZGUgYnkgdGhpcyBvciBvdGhlciBjbGllbnRzLiBUaGlzXG4gKiBpcyB1c2VmdWwgdG8gY3JlYXRlIFwiYWN0aXZlXCIgZGF0YSBwcm92aWRlcnMsIGUuZy4gcHJvdmlkZXJzIHRoYXQgb25seSBwcm92aWRlXG4gKiBkYXRhIGZvciBhIHBhcnRpY3VsYXIgcmVjb3JkIGlmIGEgdXNlciBpcyBhY3R1YWxseSBpbnRlcmVzdGVkIGluIGl0XG4gKlxuICogQHBhcmFtICAge1N0cmluZ30gICBwYXR0ZXJuICBBIGNvbWJpbmF0aW9uIG9mIGFscGhhIG51bWVyaWMgY2hhcmFjdGVycyBhbmQgd2lsZGNhcmRzKCAqIClcbiAqIEBwYXJhbSAgIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuUmVjb3JkSGFuZGxlci5wcm90b3R5cGUubGlzdGVuID0gZnVuY3Rpb24gKHBhdHRlcm4sIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgcGF0dGVybiAhPT0gJ3N0cmluZycgfHwgcGF0dGVybi5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgYXJndW1lbnQgcGF0dGVybicpO1xuICB9XG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgYXJndW1lbnQgY2FsbGJhY2snKTtcbiAgfVxuXG4gIGlmICh0aGlzLl9saXN0ZW5lcltwYXR0ZXJuXSAmJiAhdGhpcy5fbGlzdGVuZXJbcGF0dGVybl0uZGVzdHJveVBlbmRpbmcpIHtcbiAgICB0aGlzLl9jbGllbnQuXyRvbkVycm9yKEMuVE9QSUMuUkVDT1JELCBDLkVWRU5ULkxJU1RFTkVSX0VYSVNUUywgcGF0dGVybik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRoaXMuX2xpc3RlbmVyW3BhdHRlcm5dKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJbcGF0dGVybl0uZGVzdHJveSgpO1xuICB9XG5cbiAgdGhpcy5fbGlzdGVuZXJbcGF0dGVybl0gPSBuZXcgTGlzdGVuZXIoQy5UT1BJQy5SRUNPUkQsIHBhdHRlcm4sIGNhbGxiYWNrLCB0aGlzLl9vcHRpb25zLCB0aGlzLl9jbGllbnQsIHRoaXMuX2Nvbm5lY3Rpb24pO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGEgbGlzdGVuZXIgdGhhdCB3YXMgcHJldmlvdXNseSByZWdpc3RlcmVkIHdpdGggbGlzdGVuRm9yU3Vic2NyaXB0aW9uc1xuICpcbiAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgcGF0dGVybiAgQSBjb21iaW5hdGlvbiBvZiBhbHBoYSBudW1lcmljIGNoYXJhY3RlcnMgYW5kIHdpbGRjYXJkcyggKiApXG4gKiBAcGFyYW0gICB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblJlY29yZEhhbmRsZXIucHJvdG90eXBlLnVubGlzdGVuID0gZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgaWYgKHR5cGVvZiBwYXR0ZXJuICE9PSAnc3RyaW5nJyB8fCBwYXR0ZXJuLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBhcmd1bWVudCBwYXR0ZXJuJyk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSB0aGlzLl9saXN0ZW5lcltwYXR0ZXJuXTtcbiAgaWYgKGxpc3RlbmVyICYmICFsaXN0ZW5lci5kZXN0cm95UGVuZGluZykge1xuICAgIGxpc3RlbmVyLnNlbmREZXN0cm95KCk7XG4gIH0gZWxzZSBpZiAodGhpcy5fbGlzdGVuZXJbcGF0dGVybl0pIHtcbiAgICB0aGlzLl9saXN0ZW5lcltwYXR0ZXJuXS5kZXN0cm95KCk7XG4gICAgZGVsZXRlIHRoaXMuX2xpc3RlbmVyW3BhdHRlcm5dO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2NsaWVudC5fJG9uRXJyb3IoQy5UT1BJQy5SRUNPUkQsIEMuRVZFTlQuTk9UX0xJU1RFTklORywgcGF0dGVybik7XG4gIH1cbn07XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIGN1cnJlbnQgcmVjb3JkIGRhdGEgd2l0aG91dCBzdWJzY3JpYmluZyB0byBjaGFuZ2VzXG4gKlxuICogQHBhcmFtICAge1N0cmluZ30gIG5hbWUgdGhlIHVuaXF1ZSBuYW1lIG9mIHRoZSByZWNvcmRcbiAqIEBwYXJhbSAgIHtGdW5jdGlvbn0gIGNhbGxiYWNrXG4gKlxuICogQHB1YmxpY1xuICovXG5SZWNvcmRIYW5kbGVyLnByb3RvdHlwZS5zbmFwc2hvdCA9IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8IG5hbWUubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGFyZ3VtZW50IG5hbWUnKTtcbiAgfVxuXG4gIGlmICh0aGlzLl9yZWNvcmRzW25hbWVdICYmIHRoaXMuX3JlY29yZHNbbmFtZV0uaXNSZWFkeSkge1xuICAgIGNhbGxiYWNrKG51bGwsIHRoaXMuX3JlY29yZHNbbmFtZV0uZ2V0KCkpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX3NuYXBzaG90UmVnaXN0cnkucmVxdWVzdChuYW1lLCBjYWxsYmFjayk7XG4gIH1cbn07XG5cbi8qKlxuICogQWxsb3dzIHRoZSB1c2VyIHRvIHF1ZXJ5IHRvIHNlZSB3aGV0aGVyIG9yIG5vdCB0aGUgcmVjb3JkIGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0gICB7U3RyaW5nfSAgbmFtZSB0aGUgdW5pcXVlIG5hbWUgb2YgdGhlIHJlY29yZFxuICogQHBhcmFtICAge0Z1bmN0aW9ufSAgY2FsbGJhY2tcbiAqXG4gKiBAcHVibGljXG4gKi9cblJlY29yZEhhbmRsZXIucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8IG5hbWUubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGFyZ3VtZW50IG5hbWUnKTtcbiAgfVxuXG4gIGlmICh0aGlzLl9yZWNvcmRzW25hbWVdKSB7XG4gICAgY2FsbGJhY2sobnVsbCwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5faGFzUmVnaXN0cnkucmVxdWVzdChuYW1lLCBjYWxsYmFjayk7XG4gIH1cbn07XG5cbi8qKlxuICogQWxsb3dzIHNldHRpbmcgdGhlIGRhdGEgZm9yIGEgcmVjb3JkIHdpdGhvdXQgYmVpbmcgc3Vic2NyaWJlZCB0byBpdC4gSWZcbiAqIHRoZSBjbGllbnQgaXMgc3Vic2NyaWJlZCB0byB0aGUgcmVjb3JkIGxvY2FsbHksIHRoZSB1cGRhdGUgd2lsbCBiZSBwcm94aWVkXG4gKiB0aHJvdWdoIHRoZSByZWNvcmQgb2JqZWN0IGxpa2UgYSBub3JtYWwgY2FsbCB0byBSZWNvcmQuc2V0LiBPdGhlcndpc2UgYSBmb3JjZVxuICogd3JpdGUgd2lsbCBiZSBwZXJmb3JtZWQgdGhhdCBvdmVyd3JpdGVzIGFueSByZW1vdGUgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVjb3JkTmFtZSB0aGUgbmFtZSBvZiB0aGUgcmVjb3JkIHRvIHdyaXRlIHRvXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHBhdGhPckRhdGEgZWl0aGVyIHRoZSBwYXRoIHRvIHdyaXRlIGRhdGEgdG8gb3IgdGhlIGRhdGEgdG9cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXQgdGhlIHJlY29yZCB0b1xuICogQHBhcmFtIHtPYmplY3R8UHJpbWl0aXZlfEZ1bmN0aW9ufSBkYXRhT3JDYWxsYmFjayBlaXRoZXIgdGhlIGRhdGEgdG8gd3JpdGUgdG8gdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZCBvciBhIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGljYXRpbmcgd3JpdGUgc3VjY2Vzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgaWYgcHJvdmlkZWQgdGhpcyB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSByZXN1bHQgb2YgdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cml0ZVxuICovXG5SZWNvcmRIYW5kbGVyLnByb3RvdHlwZS5zZXREYXRhID0gZnVuY3Rpb24gKHJlY29yZE5hbWUsIHBhdGhPckRhdGEsIGRhdGFPckNhbGxiYWNrLCBjYWxsYmFjaykge1xuICB2YXIgcGF0aCA9IHZvaWQgMDtcbiAgdmFyIGRhdGEgPSB2b2lkIDA7XG4gIHZhciBjYiA9IHZvaWQgMDtcbiAgdmFyIHZhbGlkID0gZmFsc2U7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQpIHtcbiAgICAvLyBzZXREYXRhKHJlY29yZE5hbWUsIHBhdGgsIGRhdGEsIGNiKVxuICAgIHBhdGggPSBwYXRoT3JEYXRhO1xuICAgIGRhdGEgPSBkYXRhT3JDYWxsYmFjaztcbiAgICBjYiA9IGNhbGxiYWNrO1xuICAgIHZhbGlkID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgaWYgKHR5cGVvZiBwYXRoT3JEYXRhID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgZGF0YU9yQ2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIHNldERhdGEocmVjb3JkTmFtZSwgcGF0aCwgZGF0YSlcbiAgICAgIHBhdGggPSBwYXRoT3JEYXRhO1xuICAgICAgZGF0YSA9IGRhdGFPckNhbGxiYWNrO1xuICAgICAgdmFsaWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoKHR5cGVvZiBwYXRoT3JEYXRhID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihwYXRoT3JEYXRhKSkgPT09ICdvYmplY3QnICYmIHR5cGVvZiBkYXRhT3JDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gc2V0RGF0YShyZWNvcmROYW1lLCBkYXRhLCBjYWxsYmFjaylcbiAgICAgIHBhdGggPSBudWxsO1xuICAgICAgZGF0YSA9IHBhdGhPckRhdGE7XG4gICAgICBjYiA9IGRhdGFPckNhbGxiYWNrO1xuICAgICAgdmFsaWQgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmICh0eXBlb2YgcGF0aE9yRGF0YSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YocGF0aE9yRGF0YSkpID09PSAnb2JqZWN0Jykge1xuICAgIC8vIHNldERhdGEocmVjb3JkTmFtZSwgZGF0YSlcbiAgICBkYXRhID0gcGF0aE9yRGF0YTtcbiAgICB2YWxpZCA9IHRydWU7XG4gIH1cblxuICBpZiAoIXZhbGlkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbmNvcnJlY3QgYXJndW1lbnRzIHVzZWQ6IHJlY29yZHMgbXVzdCBleGlzdCBhcyBvYmplY3RzIGF0IHRoZSByb290IGxldmVsJyk7XG4gIH1cblxuICB2YXIgcmVjb3JkID0gdGhpcy5fcmVjb3Jkc1tyZWNvcmROYW1lXTtcbiAgaWYgKHJlY29yZCkge1xuICAgIGlmIChwYXRoICYmIGNiKSB7XG4gICAgICByZWNvcmQuc2V0KHBhdGgsIGRhdGEsIGNiKTtcbiAgICB9IGVsc2UgaWYgKHBhdGgpIHtcbiAgICAgIHJlY29yZC5zZXQocGF0aCwgZGF0YSk7XG4gICAgfSBlbHNlIGlmIChjYikge1xuICAgICAgcmVjb3JkLnNldChkYXRhLCBjYik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlY29yZC5zZXQoZGF0YSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciByZWNvcmREYXRhID0gcGF0aCA/IFtyZWNvcmROYW1lLCAtMSwgcGF0aCwgbWVzc2FnZUJ1aWxkZXIudHlwZWQoZGF0YSldIDogW3JlY29yZE5hbWUsIC0xLCBkYXRhXTtcbiAgICB2YXIgY29uZmlnID0ge307XG4gICAgaWYgKGNiKSB7XG4gICAgICBjb25maWcud3JpdGVTdWNjZXNzID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3dyaXRlQ2FsbGJhY2tzW3JlY29yZE5hbWVdID0ge307XG4gICAgICB0aGlzLl93cml0ZUNhbGxiYWNrc1tyZWNvcmROYW1lXVstMV0gPSBjYjtcbiAgICB9XG4gICAgcmVjb3JkRGF0YS5wdXNoKGNvbmZpZyk7XG4gICAgdGhpcy5fY29ubmVjdGlvbi5zZW5kTXNnKEMuVE9QSUMuUkVDT1JELCBDLkFDVElPTlMuQ1JFQVRFQU5EVVBEQVRFLCByZWNvcmREYXRhKTtcbiAgfVxufTtcblxuLyoqXG4gKiBXaWxsIGJlIGNhbGxlZCBieSB0aGUgY2xpZW50IGZvciBpbmNvbWluZyBtZXNzYWdlcyBvbiB0aGUgUkVDT1JEIHRvcGljXG4gKlxuICogQHBhcmFtICAge09iamVjdH0gbWVzc2FnZSBwYXJzZWQgYW5kIHZhbGlkYXRlZCBkZWVwc3RyZWFtIG1lc3NhZ2VcbiAqXG4gKiBAcGFja2FnZSBwcml2YXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuUmVjb3JkSGFuZGxlci5wcm90b3R5cGUuXyRoYW5kbGUgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICB2YXIgbmFtZSA9IHZvaWQgMDtcblxuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5FUlJPUiAmJiBtZXNzYWdlLmRhdGFbMF0gIT09IEMuRVZFTlQuVkVSU0lPTl9FWElTVFMgJiYgbWVzc2FnZS5kYXRhWzBdICE9PSBDLkFDVElPTlMuU05BUFNIT1QgJiYgbWVzc2FnZS5kYXRhWzBdICE9PSBDLkFDVElPTlMuSEFTICYmIG1lc3NhZ2UuZGF0YVswXSAhPT0gQy5FVkVOVC5NRVNTQUdFX0RFTklFRCkge1xuICAgIG1lc3NhZ2UucHJvY2Vzc2VkRXJyb3IgPSB0cnVlO1xuICAgIHRoaXMuX2NsaWVudC5fJG9uRXJyb3IoQy5UT1BJQy5SRUNPUkQsIG1lc3NhZ2UuZGF0YVswXSwgbWVzc2FnZS5kYXRhWzFdKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5BQ0sgfHwgbWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5FUlJPUikge1xuICAgIG5hbWUgPSBtZXNzYWdlLmRhdGFbMV07XG5cbiAgICAvKlxuICAgICAqIFRoZSBmb2xsb3dpbmcgcHJldmVudHMgZXJyb3JzIHRoYXQgb2NjdXIgd2hlbiBhIHJlY29yZCBpcyBkaXNjYXJkZWQgb3IgZGVsZXRlZCBhbmRcbiAgICAgKiByZWNyZWF0ZWQgYmVmb3JlIHRoZSBkaXNjYXJkIC8gZGVsZXRlIGFjayBtZXNzYWdlIGlzIHJlY2VpdmVkLlxuICAgICAqXG4gICAgICogQSAocHJlc3VtYWJseSB1bnNvbHZhYmxlKSBwcm9ibGVtIHJlbWFpbnMgd2hlbiBhIGNsaWVudCBkZWxldGVzIGEgcmVjb3JkIGluIHRoZSBleGFjdCBtb21lbnRcbiAgICAgKiBiZXR3ZWVuIGFub3RoZXIgY2xpZW50cyBjcmVhdGlvbiBhbmQgcmVhZCBtZXNzYWdlIGZvciB0aGUgc2FtZSByZWNvcmRcbiAgICAgKi9cbiAgICBpZiAobWVzc2FnZS5kYXRhWzBdID09PSBDLkFDVElPTlMuREVMRVRFIHx8IG1lc3NhZ2UuZGF0YVswXSA9PT0gQy5BQ1RJT05TLlVOU1VCU0NSSUJFIHx8IG1lc3NhZ2UuZGF0YVswXSA9PT0gQy5FVkVOVC5NRVNTQUdFX0RFTklFRCAmJiBtZXNzYWdlLmRhdGFbMl0gPT09IEMuQUNUSU9OUy5ERUxFVEUpIHtcbiAgICAgIHRoaXMuX2Rlc3Ryb3lFdmVudEVtaXR0ZXIuZW1pdCgnZGVzdHJveV9hY2tfJyArIG5hbWUsIG1lc3NhZ2UpO1xuXG4gICAgICBpZiAobWVzc2FnZS5kYXRhWzBdID09PSBDLkFDVElPTlMuREVMRVRFICYmIHRoaXMuX3JlY29yZHNbbmFtZV0pIHtcbiAgICAgICAgdGhpcy5fcmVjb3Jkc1tuYW1lXS5fJG9uTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChtZXNzYWdlLmRhdGFbMF0gPT09IEMuQUNUSU9OUy5TTkFQU0hPVCkge1xuICAgICAgbWVzc2FnZS5wcm9jZXNzZWRFcnJvciA9IHRydWU7XG4gICAgICB0aGlzLl9zbmFwc2hvdFJlZ2lzdHJ5LnJlY2lldmUobmFtZSwgbWVzc2FnZS5kYXRhWzJdKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobWVzc2FnZS5kYXRhWzBdID09PSBDLkFDVElPTlMuSEFTKSB7XG4gICAgICBtZXNzYWdlLnByb2Nlc3NlZEVycm9yID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3NuYXBzaG90UmVnaXN0cnkucmVjaWV2ZShuYW1lLCBtZXNzYWdlLmRhdGFbMl0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBuYW1lID0gbWVzc2FnZS5kYXRhWzBdO1xuICB9XG5cbiAgdmFyIHByb2Nlc3NlZCA9IGZhbHNlO1xuXG4gIHZhciByZWNvcmQgPSB0aGlzLl9yZWNvcmRzW25hbWVdO1xuICBpZiAocmVjb3JkKSB7XG4gICAgcHJvY2Vzc2VkID0gdHJ1ZTtcbiAgICByZWNvcmQuXyRvbk1lc3NhZ2UobWVzc2FnZSk7XG4gIH1cblxuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5SRUFEICYmIHRoaXMuX3NuYXBzaG90UmVnaXN0cnkuaGFzUmVxdWVzdChuYW1lKSkge1xuICAgIHByb2Nlc3NlZCA9IHRydWU7XG4gICAgdGhpcy5fc25hcHNob3RSZWdpc3RyeS5yZWNpZXZlKG5hbWUsIG51bGwsIEpTT04ucGFyc2UobWVzc2FnZS5kYXRhWzJdKSk7XG4gIH0gZWxzZSBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5IQVMgJiYgdGhpcy5faGFzUmVnaXN0cnkuaGFzUmVxdWVzdChuYW1lKSkge1xuICAgIHByb2Nlc3NlZCA9IHRydWU7XG4gICAgdGhpcy5faGFzUmVnaXN0cnkucmVjaWV2ZShuYW1lLCBudWxsLCBtZXNzYWdlUGFyc2VyLmNvbnZlcnRUeXBlZChtZXNzYWdlLmRhdGFbMV0pKTtcbiAgfSBlbHNlIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gQy5BQ1RJT05TLldSSVRFX0FDS05PV0xFREdFTUVOVCAmJiAhcmVjb3JkKSB7XG4gICAgcHJvY2Vzc2VkID0gdHJ1ZTtcbiAgICBSZWNvcmQuX2hhbmRsZVdyaXRlQWNrbm93bGVkZ2VtZW50cyhtZXNzYWdlLCB0aGlzLl93cml0ZUNhbGxiYWNrc1tuYW1lXSwgdGhpcy5fY2xpZW50KTtcbiAgfSBlbHNlIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gQy5BQ1RJT05TLkFDSyAmJiBtZXNzYWdlLmRhdGFbMF0gPT09IEMuQUNUSU9OUy5VTkxJU1RFTiAmJiB0aGlzLl9saXN0ZW5lcltuYW1lXSAmJiB0aGlzLl9saXN0ZW5lcltuYW1lXS5kZXN0cm95UGVuZGluZykge1xuICAgIHByb2Nlc3NlZCA9IHRydWU7XG4gICAgdGhpcy5fbGlzdGVuZXJbbmFtZV0uZGVzdHJveSgpO1xuICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcltuYW1lXTtcbiAgfSBlbHNlIGlmICh0aGlzLl9saXN0ZW5lcltuYW1lXSkge1xuICAgIHByb2Nlc3NlZCA9IHRydWU7XG4gICAgdGhpcy5fbGlzdGVuZXJbbmFtZV0uXyRvbk1lc3NhZ2UobWVzc2FnZSk7XG4gIH0gZWxzZSBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5TVUJTQ1JJUFRJT05fRk9SX1BBVFRFUk5fUkVNT1ZFRCkge1xuICAgIC8vIEFuIHVubGlzdGVuIEFDSyB3YXMgcmVjZWl2ZWQgYmVmb3JlIGFuIFBBVFRFUk5fUkVNT1ZFRCB3aGljaCBpcyBhIHZhbGlkIGNhc2VcbiAgICBwcm9jZXNzZWQgPSB0cnVlO1xuICB9IGVsc2UgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBDLkFDVElPTlMuU1VCU0NSSVBUSU9OX0hBU19QUk9WSURFUikge1xuICAgIC8vIHJlY29yZCBjYW4gcmVjZWl2ZSBhIEhBU19QUk9WSURFUiBhZnRlciBkaXNjYXJkaW5nIHRoZSByZWNvcmRcbiAgICBwcm9jZXNzZWQgPSB0cnVlO1xuICB9XG5cbiAgaWYgKCFwcm9jZXNzZWQpIHtcbiAgICBtZXNzYWdlLnByb2Nlc3NlZEVycm9yID0gdHJ1ZTtcbiAgICB0aGlzLl9jbGllbnQuXyRvbkVycm9yKEMuVE9QSUMuUkVDT1JELCBDLkVWRU5ULlVOU09MSUNJVEVEX01FU1NBR0UsIG5hbWUpO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciAnZXJyb3InIGV2ZW50cyBmcm9tIHRoZSByZWNvcmQuXG4gKlxuICogQHBhcmFtICAge1N0cmluZ30gcmVjb3JkTmFtZVxuICogQHBhcmFtICAge1N0cmluZ30gZXJyb3JcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblJlY29yZEhhbmRsZXIucHJvdG90eXBlLl9vblJlY29yZEVycm9yID0gZnVuY3Rpb24gKHJlY29yZE5hbWUsIGVycm9yKSB7XG4gIHRoaXMuX2NsaWVudC5fJG9uRXJyb3IoQy5UT1BJQy5SRUNPUkQsIGVycm9yLCByZWNvcmROYW1lKTtcbn07XG5cbi8qKlxuICogV2hlbiB0aGUgY2xpZW50IGNhbGxzIGRpc2NhcmQgb3IgZGVsZXRlIG9uIGEgcmVjb3JkLCB0aGVyZSBpcyBhIHNob3J0IGRlbGF5XG4gKiBiZWZvcmUgdGhlIGNvcnJlc3BvbmRpbmcgQUNLIG1lc3NhZ2UgaXMgcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyLiBUbyBhdm9pZFxuICogcmFjZSBjb25kaXRpb25zIGlmIHRoZSByZWNvcmQgaXMgcmUtcmVxdWVzdGVkIHN0cmFpZ2h0IGF3YXkgdGhlIG9sZCByZWNvcmQgaXNcbiAqIHJlbW92ZWQgZnJvbSB0aGUgY2FjaGUgc3RyYWlnaHQgYXd5IGFuZCB3aWxsIG9ubHkgbGlzdGVuIGZvciBvbmUgbGFzdCBBQ0sgbWVzc2FnZVxuICpcbiAqIEBwYXJhbSAgIHtTdHJpbmd9IHJlY29yZE5hbWUgVGhlIG5hbWUgb2YgdGhlIHJlY29yZCB0aGF0IHdhcyBqdXN0IGRlbGV0ZWQgLyBkaXNjYXJkZWRcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblJlY29yZEhhbmRsZXIucHJvdG90eXBlLl9vbkRlc3Ryb3lQZW5kaW5nID0gZnVuY3Rpb24gKHJlY29yZE5hbWUpIHtcbiAgaWYgKCF0aGlzLl9yZWNvcmRzW3JlY29yZE5hbWVdKSB7XG4gICAgdGhpcy5fY2xpZW50Ll8kb25FcnJvcihDLlRPUElDLlJFQ09SRCwgJ1JlY29yZCBhdHRlbXB0ZWQgdG8gYmUgZGVzdHJveWVkIGJ1dCBkb2VzIG5vdCBleGlzdHMnLCByZWNvcmROYW1lKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG9uTWVzc2FnZSA9IHRoaXMuX3JlY29yZHNbcmVjb3JkTmFtZV0uXyRvbk1lc3NhZ2UuYmluZCh0aGlzLl9yZWNvcmRzW3JlY29yZE5hbWVdKTtcbiAgdGhpcy5fZGVzdHJveUV2ZW50RW1pdHRlci5vbmNlKCdkZXN0cm95X2Fja18nICsgcmVjb3JkTmFtZSwgb25NZXNzYWdlKTtcbiAgdGhpcy5fcmVtb3ZlUmVjb3JkKHJlY29yZE5hbWUpO1xufTtcblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgJ2RlbGV0ZWQnIGFuZCAnZGlzY2FyZCcgZXZlbnRzIGZyb20gYSByZWNvcmQuIFJlbW92ZXMgdGhlIHJlY29yZCBmcm9tXG4gKiB0aGUgcmVnaXN0cnlcbiAqXG4gKiBAcGFyYW0gICB7U3RyaW5nfSByZWNvcmROYW1lXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblJlY29yZEhhbmRsZXIucHJvdG90eXBlLl9yZW1vdmVSZWNvcmQgPSBmdW5jdGlvbiAocmVjb3JkTmFtZSkge1xuICBkZWxldGUgdGhpcy5fcmVjb3Jkc1tyZWNvcmROYW1lXTtcbiAgZGVsZXRlIHRoaXMuX2xpc3RzW3JlY29yZE5hbWVdO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWNvcmRIYW5kbGVyO1xuXG59LHtcIi4uL2NvbnN0YW50cy9jb25zdGFudHNcIjoxMSxcIi4uL21lc3NhZ2UvbWVzc2FnZS1idWlsZGVyXCI6MTYsXCIuLi9tZXNzYWdlL21lc3NhZ2UtcGFyc2VyXCI6MTcsXCIuLi91dGlscy9saXN0ZW5lclwiOjI4LFwiLi4vdXRpbHMvc2luZ2xlLW5vdGlmaWVyXCI6MzAsXCIuL2Fub255bW91cy1yZWNvcmRcIjoxOSxcIi4vbGlzdFwiOjIxLFwiLi9yZWNvcmRcIjoyMyxcImNvbXBvbmVudC1lbWl0dGVyMlwiOjF9XSwyMzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItc3ByZWFkLCBwcmVmZXItcmVzdC1wYXJhbXMgKi9cblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIganNvblBhdGggPSBfZGVyZXFfKCcuL2pzb24tcGF0aCcpO1xudmFyIFJlc3Vic2NyaWJlTm90aWZpZXIgPSBfZGVyZXFfKCcuLi91dGlscy9yZXN1YnNjcmliZS1ub3RpZmllcicpO1xudmFyIEV2ZW50RW1pdHRlciA9IF9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyMicpO1xudmFyIEMgPSBfZGVyZXFfKCcuLi9jb25zdGFudHMvY29uc3RhbnRzJyk7XG52YXIgbWVzc2FnZUJ1aWxkZXIgPSBfZGVyZXFfKCcuLi9tZXNzYWdlL21lc3NhZ2UtYnVpbGRlcicpO1xudmFyIG1lc3NhZ2VQYXJzZXIgPSBfZGVyZXFfKCcuLi9tZXNzYWdlL21lc3NhZ2UtcGFyc2VyJyk7XG52YXIgdXRpbHMgPSBfZGVyZXFfKCcuLi91dGlscy91dGlscycpO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIHNpbmdsZSByZWNvcmQgLSBhbiBvYnNlcnZhYmxlXG4gKiBkYXRhc2V0IHJldHVybmVkIGJ5IGNsaWVudC5yZWNvcmQuZ2V0UmVjb3JkKClcbiAqXG4gKiBAZXh0ZW5kcyB7RXZlbnRFbWl0dGVyfVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lICAgICAgICAgICAgICBUaGUgdW5pcXVlIG5hbWUgb2YgdGhlIHJlY29yZFxuICogQHBhcmFtIHtPYmplY3R9IHJlY29yZE9wdGlvbnMgICAgIEEgbWFwIG9mIG9wdGlvbnMsIGUuZy4geyBwZXJzaXN0OiB0cnVlIH1cbiAqIEBwYXJhbSB7Q29ubmVjdGlvbn0gQ29ubmVjdGlvbiAgICBUaGUgaW5zdGFuY2Ugb2YgdGhlIHNlcnZlciBjb25uZWN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAgICAgICAgRGVlcHN0cmVhbSBvcHRpb25zXG4gKiBAcGFyYW0ge0NsaWVudH0gY2xpZW50ICAgICAgICBkZWVwc3RyZWFtLmlvIGNsaWVudFxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52YXIgUmVjb3JkID0gZnVuY3Rpb24gUmVjb3JkKG5hbWUsIHJlY29yZE9wdGlvbnMsIGNvbm5lY3Rpb24sIG9wdGlvbnMsIGNsaWVudCkge1xuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8IG5hbWUubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGFyZ3VtZW50IG5hbWUnKTtcbiAgfVxuXG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMudXNhZ2VzID0gMDtcbiAgdGhpcy5fcmVjb3JkT3B0aW9ucyA9IHJlY29yZE9wdGlvbnM7XG4gIHRoaXMuX2Nvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xuICB0aGlzLl9jbGllbnQgPSBjbGllbnQ7XG4gIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICB0aGlzLmlzUmVhZHkgPSBmYWxzZTtcbiAgdGhpcy5pc0Rlc3Ryb3llZCA9IGZhbHNlO1xuICB0aGlzLmhhc1Byb3ZpZGVyID0gZmFsc2U7XG4gIHRoaXMuXyRkYXRhID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdGhpcy52ZXJzaW9uID0gbnVsbDtcbiAgdGhpcy5fZXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICB0aGlzLl9xdWV1ZWRNZXRob2RDYWxscyA9IFtdO1xuICB0aGlzLl93cml0ZUNhbGxiYWNrcyA9IHt9O1xuXG4gIHRoaXMuX21lcmdlU3RyYXRlZ3kgPSBudWxsO1xuICBpZiAob3B0aW9ucy5tZXJnZVN0cmF0ZWd5KSB7XG4gICAgdGhpcy5zZXRNZXJnZVN0cmF0ZWd5KG9wdGlvbnMubWVyZ2VTdHJhdGVneSk7XG4gIH1cblxuICB0aGlzLl9hY2tUaW1lb3V0UmVnaXN0cnkgPSBjbGllbnQuXyRnZXRBY2tUaW1lb3V0UmVnaXN0cnkoKTtcbiAgdGhpcy5fcmVzdWJzY3JpYmVOb3RpZmllciA9IG5ldyBSZXN1YnNjcmliZU5vdGlmaWVyKHRoaXMuX2NsaWVudCwgdGhpcy5fc2VuZFJlYWQuYmluZCh0aGlzKSk7XG5cbiAgdGhpcy5fcmVhZEFja1RpbWVvdXQgPSB0aGlzLl9hY2tUaW1lb3V0UmVnaXN0cnkuYWRkKHtcbiAgICB0b3BpYzogQy5UT1BJQy5SRUNPUkQsXG4gICAgbmFtZTogbmFtZSxcbiAgICBhY3Rpb246IEMuQUNUSU9OUy5TVUJTQ1JJQkUsXG4gICAgdGltZW91dDogdGhpcy5fb3B0aW9ucy5yZWNvcmRSZWFkQWNrVGltZW91dFxuICB9KTtcbiAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0ID0gdGhpcy5fYWNrVGltZW91dFJlZ2lzdHJ5LmFkZCh7XG4gICAgdG9waWM6IEMuVE9QSUMuUkVDT1JELFxuICAgIG5hbWU6IG5hbWUsXG4gICAgYWN0aW9uOiBDLkFDVElPTlMuUkVBRCxcbiAgICBldmVudDogQy5FVkVOVC5SRVNQT05TRV9USU1FT1VULFxuICAgIHRpbWVvdXQ6IHRoaXMuX29wdGlvbnMucmVjb3JkUmVhZFRpbWVvdXRcbiAgfSk7XG4gIHRoaXMuX3NlbmRSZWFkKCk7XG59O1xuXG5FdmVudEVtaXR0ZXIoUmVjb3JkLnByb3RvdHlwZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuLyoqXG4gKiBTZXQgYSBtZXJnZSBzdHJhdGVneSB0byByZXNvbHZlIGFueSBtZXJnZSBjb25mbGljdHMgdGhhdCBtYXkgb2NjdXIgZHVlXG4gKiB0byBvZmZsaW5lIHdvcmsgb3Igd3JpdGUgY29uZmxpY3RzLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGVcbiAqIGxvY2FsIHJlY29yZCwgdGhlIHJlbW90ZSB2ZXJzaW9uL2RhdGEgYW5kIGEgY2FsbGJhY2sgdG8gY2FsbCBvbmNlIHRoZSBtZXJnZSBoYXNcbiAqIGNvbXBsZXRlZCBvciBpZiBhbiBlcnJvciBvY2N1cnMgKCB3aGljaCBsZWF2ZXMgaXQgaW4gYW4gaW5jb25zaXN0ZW50IHN0YXRlIHVudGlsXG4gKiB0aGUgbmV4dCB1cGRhdGUgbWVyZ2UgYXR0ZW1wdCApLlxuICpcbiAqIEBwYXJhbSAgIHtGdW5jdGlvbn0gbWVyZ2VTdHJhdGVneSBBIEZ1bmN0aW9uIHRoYXQgY2FuIHJlc29sdmUgbWVyZ2UgaXNzdWVzLlxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5SZWNvcmQucHJvdG90eXBlLnNldE1lcmdlU3RyYXRlZ3kgPSBmdW5jdGlvbiAobWVyZ2VTdHJhdGVneSkge1xuICBpZiAodHlwZW9mIG1lcmdlU3RyYXRlZ3kgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLl9tZXJnZVN0cmF0ZWd5ID0gbWVyZ2VTdHJhdGVneTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbWVyZ2Ugc3RyYXRlZ3k6IE11c3QgYmUgYSBGdW5jdGlvbicpO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSBjb3B5IG9mIGVpdGhlciB0aGUgZW50aXJlIGRhdGFzZXQgb2YgdGhlIHJlY29yZFxuICogb3IgLSBpZiBjYWxsZWQgd2l0aCBhIHBhdGggLSB0aGUgdmFsdWUgb2YgdGhhdCBwYXRoIHdpdGhpblxuICogdGhlIHJlY29yZCdzIGRhdGFzZXQuXG4gKlxuICogUmV0dXJuaW5nIGEgY29weSByYXRoZXIgdGhhbiB0aGUgYWN0dWFsIHZhbHVlIGhlbHBzIHRvIHByZXZlbnRcbiAqIHRoZSByZWNvcmQgZ2V0dGluZyBvdXQgb2Ygc3luYyBkdWUgdG8gdW5pbnRlbnRpb25hbCBjaGFuZ2VzIHRvXG4gKiBpdHMgZGF0YVxuICpcbiAqIEBwYXJhbSAgIHtbU3RyaW5nXX0gcGF0aCBBIEpTT04gcGF0aCwgZS5nLiB1c2Vyc1sgMiBdLmZpcnN0bmFtZVxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHtNaXhlZH0gdmFsdWVcbiAqL1xuUmVjb3JkLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAocGF0aCkge1xuICByZXR1cm4ganNvblBhdGguZ2V0KHRoaXMuXyRkYXRhLCBwYXRoLCB0aGlzLl9vcHRpb25zLnJlY29yZERlZXBDb3B5KTtcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgdmFsdWUgb2YgZWl0aGVyIHRoZSBlbnRpcmUgZGF0YXNldFxuICogb3Igb2YgYSBzcGVjaWZpYyBwYXRoIHdpdGhpbiB0aGUgcmVjb3JkXG4gKiBhbmQgc3VibWl0cyB0aGUgY2hhbmdlcyB0byB0aGUgc2VydmVyXG4gKlxuICogSWYgdGhlIG5ldyBkYXRhIGlzIGVxdWFsIHRvIHRoZSBjdXJyZW50IGRhdGEsIG5vdGhpbmcgd2lsbCBoYXBwZW5cbiAqXG4gKiBAcGFyYW0ge1tTdHJpbmd8T2JqZWN0XX0gcGF0aE9yRGF0YSBFaXRoZXIgYSBKU09OIHBhdGggd2hlbiBjYWxsZWQgd2l0aFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHdvIGFyZ3VtZW50cyBvciB0aGUgZGF0YSBpdHNlbGZcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhICAgICBUaGUgZGF0YSB0aGF0IHNob3VsZCBiZSBzdG9yZWQgaW4gdGhlIHJlY29yZFxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5SZWNvcmQucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChwYXRoT3JEYXRhLCBkYXRhT3JDYWxsYmFjaywgY2FsbGJhY2spIHtcbiAgdmFyIHBhdGggPSB2b2lkIDA7XG4gIHZhciBkYXRhID0gdm9pZCAwO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIC8vIHNldCggb2JqZWN0IClcbiAgICBpZiAoKHR5cGVvZiBwYXRoT3JEYXRhID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihwYXRoT3JEYXRhKSkgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgYXJndW1lbnQgZGF0YScpO1xuICAgIH1cbiAgICBkYXRhID0gcGF0aE9yRGF0YTtcbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgaWYgKHR5cGVvZiBwYXRoT3JEYXRhID09PSAnc3RyaW5nJyAmJiBwYXRoT3JEYXRhLmxlbmd0aCAhPT0gMCAmJiB0eXBlb2YgZGF0YU9yQ2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIHNldCggcGF0aCwgZGF0YSApXG4gICAgICBwYXRoID0gcGF0aE9yRGF0YTtcbiAgICAgIGRhdGEgPSBkYXRhT3JDYWxsYmFjaztcbiAgICB9IGVsc2UgaWYgKCh0eXBlb2YgcGF0aE9yRGF0YSA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YocGF0aE9yRGF0YSkpID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZGF0YU9yQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIHNldCggZGF0YSwgY2FsbGJhY2sgKVxuICAgICAgZGF0YSA9IHBhdGhPckRhdGE7XG4gICAgICBjYWxsYmFjayA9IGRhdGFPckNhbGxiYWNrOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBhcmd1bWVudCBwYXRoJyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAvLyBzZXQoIHBhdGgsIGRhdGEsIGNhbGxiYWNrIClcbiAgICBpZiAodHlwZW9mIHBhdGhPckRhdGEgIT09ICdzdHJpbmcnIHx8IHBhdGhPckRhdGEubGVuZ3RoID09PSAwIHx8IHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGFyZ3VtZW50cywgbXVzdCBwYXNzIGluIGEgc3RyaW5nLCBhIHZhbHVlIGFuZCBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIHBhdGggPSBwYXRoT3JEYXRhO1xuICAgIGRhdGEgPSBkYXRhT3JDYWxsYmFjaztcbiAgfVxuXG4gIGlmICghcGF0aCAmJiAoZGF0YSA9PT0gbnVsbCB8fCAodHlwZW9mIGRhdGEgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKGRhdGEpKSAhPT0gJ29iamVjdCcpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGFyZ3VtZW50cywgc2NhbGFyIHZhbHVlcyBjYW5ub3QgYmUgc2V0IHdpdGhvdXQgcGF0aCcpO1xuICB9XG5cbiAgaWYgKHRoaXMuX2NoZWNrRGVzdHJveWVkKCdzZXQnKSkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKCF0aGlzLmlzUmVhZHkpIHtcbiAgICB0aGlzLl9xdWV1ZWRNZXRob2RDYWxscy5wdXNoKHsgbWV0aG9kOiAnc2V0JywgYXJnczogYXJndW1lbnRzIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIG9sZFZhbHVlID0gdGhpcy5fJGRhdGE7XG4gIHZhciBuZXdWYWx1ZSA9IGpzb25QYXRoLnNldChvbGRWYWx1ZSwgcGF0aCwgZGF0YSwgdGhpcy5fb3B0aW9ucy5yZWNvcmREZWVwQ29weSk7XG5cbiAgaWYgKG9sZFZhbHVlID09PSBuZXdWYWx1ZSkge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBudWxsO1xuICAgICAgaWYgKCF1dGlscy5pc0Nvbm5lY3RlZCh0aGlzLl9jbGllbnQpKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSA9ICdDb25uZWN0aW9uIGVycm9yOiBlcnJvciB1cGRhdGluZyByZWNvcmQgYXMgY29ubmVjdGlvbiB3YXMgY2xvc2VkJztcbiAgICAgIH1cbiAgICAgIHV0aWxzLnJlcXVlc3RJZGxlQ2FsbGJhY2soZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3JNZXNzYWdlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHZhciBjb25maWcgPSB2b2lkIDA7XG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25maWcgPSB7fTtcbiAgICBjb25maWcud3JpdGVTdWNjZXNzID0gdHJ1ZTtcbiAgICBpZiAoIXV0aWxzLmlzQ29ubmVjdGVkKHRoaXMuX2NsaWVudCkpIHtcbiAgICAgIHV0aWxzLnJlcXVlc3RJZGxlQ2FsbGJhY2soZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soJ0Nvbm5lY3Rpb24gZXJyb3I6IGVycm9yIHVwZGF0aW5nIHJlY29yZCBhcyBjb25uZWN0aW9uIHdhcyBjbG9zZWQnKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXRVcENhbGxiYWNrKHRoaXMudmVyc2lvbiwgY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuICB0aGlzLl9zZW5kVXBkYXRlKHBhdGgsIGRhdGEsIGNvbmZpZyk7XG4gIHRoaXMuX2FwcGx5Q2hhbmdlKG5ld1ZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFN1YnNjcmliZXMgdG8gY2hhbmdlcyB0byB0aGUgcmVjb3JkcyBkYXRhc2V0LlxuICpcbiAqIENhbGxiYWNrIGlzIHRoZSBvbmx5IG1hbmRhdG9yeSBhcmd1bWVudC5cbiAqXG4gKiBXaGVuIGNhbGxlZCB3aXRoIGEgcGF0aCwgaXQgd2lsbCBvbmx5IHN1YnNjcmliZSB0byB1cGRhdGVzXG4gKiB0byB0aGF0IHBhdGgsIHJhdGhlciB0aGFuIHRoZSBlbnRpcmUgcmVjb3JkXG4gKlxuICogSWYgY2FsbGVkIHdpdGggdHJ1ZSBmb3IgdHJpZ2dlck5vdywgdGhlIGNhbGxiYWNrIHdpbGxcbiAqIGJlIGNhbGxlZCBpbW1lZGlhdGx5IHdpdGggdGhlIGN1cnJlbnQgdmFsdWVcbiAqXG4gKiBAcGFyYW0gICB7W1N0cmluZ119ICAgIHBhdGggICAgICBBIEpTT04gcGF0aCB3aXRoaW4gdGhlIHJlY29yZCB0byBzdWJzY3JpYmUgdG9cbiAqIEBwYXJhbSAgIHtGdW5jdGlvbn0gICAgY2FsbGJhY2sgICAgICAgICBDYWxsYmFjayBmdW5jdGlvbiB0byBub3RpZnkgb24gY2hhbmdlc1xuICogQHBhcmFtICAge1tCb29sZWFuXX0gICB0cmlnZ2VyTm93ICAgICAgQSBmbGFnIHRvIHNwZWNpZnkgd2hldGhlciB0aGUgY2FsbGJhY2sgc2hvdWxkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmUgaW52b2tlZCBpbW1lZGlhdGx5IHdpdGggdGhlIGN1cnJlbnQgdmFsdWVcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG5SZWNvcmQucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIChwYXRoLCBjYWxsYmFjaywgdHJpZ2dlck5vdykge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIHZhciBhcmdzID0gdGhpcy5fbm9ybWFsaXplQXJndW1lbnRzKGFyZ3VtZW50cyk7XG5cbiAgaWYgKGFyZ3MucGF0aCAhPT0gdW5kZWZpbmVkICYmICh0eXBlb2YgYXJncy5wYXRoICE9PSAnc3RyaW5nJyB8fCBhcmdzLnBhdGgubGVuZ3RoID09PSAwKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBhcmd1bWVudCBwYXRoJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBhcmdzLmNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGFyZ3VtZW50IGNhbGxiYWNrJyk7XG4gIH1cblxuICBpZiAodGhpcy5fY2hlY2tEZXN0cm95ZWQoJ3N1YnNjcmliZScpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGFyZ3MudHJpZ2dlck5vdykge1xuICAgIHRoaXMud2hlblJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLl9ldmVudEVtaXR0ZXIub24oYXJncy5wYXRoLCBhcmdzLmNhbGxiYWNrKTtcbiAgICAgIGFyZ3MuY2FsbGJhY2soX3RoaXMuZ2V0KGFyZ3MucGF0aCkpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2V2ZW50RW1pdHRlci5vbihhcmdzLnBhdGgsIGFyZ3MuY2FsbGJhY2spO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgYSBzdWJzY3JpcHRpb24gdGhhdCB3YXMgcHJldmlvdXNseSBtYWRlIHVzaW5nIHJlY29yZC5zdWJzY3JpYmUoKVxuICpcbiAqIENhbiBiZSBjYWxsZWQgd2l0aCBhIHBhdGggdG8gcmVtb3ZlIHRoZSBjYWxsYmFjayBmb3IgdGhpcyBzcGVjaWZpY1xuICogcGF0aCBvciBvbmx5IHdpdGggYSBjYWxsYmFjayB3aGljaCByZW1vdmVzIGl0IGZyb20gdGhlIGdlbmVyaWMgc3Vic2NyaXB0aW9uc1xuICpcbiAqIFBsZWFzZSBOb3RlOiB1bnN1YnNjcmliZSBpcyBhIHB1cmVseSBjbGllbnQgc2lkZSBvcGVyYXRpb24uIElmIHRoZSBhcHAgaXMgbm8gbG9uZ2VyXG4gKiBpbnRlcmVzdGVkIGluIHJlY2VpdmluZyB1cGRhdGVzIGZvciB0aGlzIHJlY29yZCBmcm9tIHRoZSBzZXJ2ZXIgaXQgbmVlZHMgdG8gY2FsbFxuICogZGlzY2FyZCBpbnN0ZWFkXG4gKlxuICogQHBhcmFtICAge1tTdHJpbmd8RnVuY3Rpb25dfSAgIHBhdGhPckNhbGxiYWNrIEEgSlNPTiBwYXRoXG4gKiBAcGFyYW0gICB7RnVuY3Rpb259ICAgICAgICAgY2FsbGJhY2sgICAgIFRoZSBjYWxsYmFjayBtZXRob2QuIFBsZWFzZSBub3RlLCBpZiBhIGJvdW5kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZCB3YXMgcGFzc2VkIHRvIHN1YnNjcmliZSwgdGhlIHNhbWUgbWV0aG9kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11c3QgYmUgcGFzc2VkIHRvIHVuc3Vic2NyaWJlIGFzIHdlbGwuXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuUmVjb3JkLnByb3RvdHlwZS51bnN1YnNjcmliZSA9IGZ1bmN0aW9uIChwYXRoT3JDYWxsYmFjaywgY2FsbGJhY2spIHtcbiAgdmFyIGFyZ3MgPSB0aGlzLl9ub3JtYWxpemVBcmd1bWVudHMoYXJndW1lbnRzKTtcblxuICBpZiAoYXJncy5wYXRoICE9PSB1bmRlZmluZWQgJiYgKHR5cGVvZiBhcmdzLnBhdGggIT09ICdzdHJpbmcnIHx8IGFyZ3MucGF0aC5sZW5ndGggPT09IDApKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGFyZ3VtZW50IHBhdGgnKTtcbiAgfVxuICBpZiAoYXJncy5jYWxsYmFjayAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBhcmdzLmNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGFyZ3VtZW50IGNhbGxiYWNrJyk7XG4gIH1cblxuICBpZiAodGhpcy5fY2hlY2tEZXN0cm95ZWQoJ3Vuc3Vic2NyaWJlJykpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5fZXZlbnRFbWl0dGVyLm9mZihhcmdzLnBhdGgsIGFyZ3MuY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBjaGFuZ2UgbGlzdGVuZXJzIGFuZCBub3RpZmllcyB0aGUgc2VydmVyIHRoYXQgdGhlIGNsaWVudCBpc1xuICogbm8gbG9uZ2VyIGludGVyZXN0ZWQgaW4gdXBkYXRlcyBmb3IgdGhpcyByZWNvcmRcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuUmVjb3JkLnByb3RvdHlwZS5kaXNjYXJkID0gZnVuY3Rpb24gKCkge1xuICB2YXIgX3RoaXMyID0gdGhpcztcblxuICBpZiAodGhpcy5fY2hlY2tEZXN0cm95ZWQoJ2Rpc2NhcmQnKSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLndoZW5SZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgX3RoaXMyLnVzYWdlcy0tO1xuICAgIGlmIChfdGhpczIudXNhZ2VzIDw9IDApIHtcbiAgICAgIF90aGlzMi5lbWl0KCdkZXN0cm95UGVuZGluZycpO1xuICAgICAgX3RoaXMyLl9kaXNjYXJkVGltZW91dCA9IF90aGlzMi5fYWNrVGltZW91dFJlZ2lzdHJ5LmFkZCh7XG4gICAgICAgIHRvcGljOiBDLlRPUElDLlJFQ09SRCxcbiAgICAgICAgbmFtZTogX3RoaXMyLm5hbWUsXG4gICAgICAgIGFjdGlvbjogQy5BQ1RJT05TLlVOU1VCU0NSSUJFXG4gICAgICB9KTtcbiAgICAgIF90aGlzMi5fY29ubmVjdGlvbi5zZW5kTXNnKEMuVE9QSUMuUkVDT1JELCBDLkFDVElPTlMuVU5TVUJTQ1JJQkUsIFtfdGhpczIubmFtZV0pO1xuICAgIH1cbiAgfSk7XG59O1xuXG4vKipcbiAqIERlbGV0ZXMgdGhlIHJlY29yZCBvbiB0aGUgc2VydmVyLlxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5SZWNvcmQucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgaWYgKHRoaXMuX2NoZWNrRGVzdHJveWVkKCdkZWxldGUnKSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLndoZW5SZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgX3RoaXMzLmVtaXQoJ2Rlc3Ryb3lQZW5kaW5nJyk7XG4gICAgX3RoaXMzLl9kZWxldGVBY2tUaW1lb3V0ID0gX3RoaXMzLl9hY2tUaW1lb3V0UmVnaXN0cnkuYWRkKHtcbiAgICAgIHRvcGljOiBDLlRPUElDLlJFQ09SRCxcbiAgICAgIG5hbWU6IF90aGlzMy5uYW1lLFxuICAgICAgYWN0aW9uOiBDLkFDVElPTlMuREVMRVRFLFxuICAgICAgZXZlbnQ6IEMuRVZFTlQuREVMRVRFX1RJTUVPVVQsXG4gICAgICB0aW1lb3V0OiBfdGhpczMuX29wdGlvbnMucmVjb3JkRGVsZXRlVGltZW91dFxuICAgIH0pO1xuICAgIF90aGlzMy5fY29ubmVjdGlvbi5zZW5kTXNnKEMuVE9QSUMuUkVDT1JELCBDLkFDVElPTlMuREVMRVRFLCBbX3RoaXMzLm5hbWVdKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIENvbnZlbmllbmNlIG1ldGhvZCwgc2ltaWxhciB0byBwcm9taXNlcy4gRXhlY3V0ZXMgY2FsbGJhY2tcbiAqIHdoZW5ldmVyIHRoZSByZWNvcmQgaXMgcmVhZHksIGVpdGhlciBpbW1lZGlhdGx5IG9yIG9uY2UgdGhlIHJlYWR5XG4gKiBldmVudCBpcyBmaXJlZFxuICpcbiAqIEBwYXJhbSAgIHtGdW5jdGlvbn0gY2FsbGJhY2sgV2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgcmVjb3JkIGlzIHJlYWR5XG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblJlY29yZC5wcm90b3R5cGUud2hlblJlYWR5ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIGlmICh0aGlzLmlzUmVhZHkgPT09IHRydWUpIHtcbiAgICBjYWxsYmFjayh0aGlzKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLm9uY2UoJ3JlYWR5JywgY2FsbGJhY2suYmluZCh0aGlzLCB0aGlzKSk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGJhY2sgZm9yIGluY29taW5nIG1lc3NhZ2VzIGZyb20gdGhlIG1lc3NhZ2UgaGFuZGxlclxuICpcbiAqIEBwYXJhbSAgIHtPYmplY3R9IG1lc3NhZ2UgcGFyc2VkIGFuZCB2YWxpZGF0ZWQgZGVlcHN0cmVhbSBtZXNzYWdlXG4gKlxuICogQHBhY2thZ2UgcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblJlY29yZC5wcm90b3R5cGUuXyRvbk1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5SRUFEKSB7XG4gICAgaWYgKHRoaXMudmVyc2lvbiA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWNrVGltZW91dFJlZ2lzdHJ5LmNsZWFyKG1lc3NhZ2UpO1xuICAgICAgdGhpcy5fb25SZWFkKG1lc3NhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hcHBseVVwZGF0ZShtZXNzYWdlLCB0aGlzLl9jbGllbnQpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gQy5BQ1RJT05TLkFDSykge1xuICAgIHRoaXMuX3Byb2Nlc3NBY2tNZXNzYWdlKG1lc3NhZ2UpO1xuICB9IGVsc2UgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBDLkFDVElPTlMuVVBEQVRFIHx8IG1lc3NhZ2UuYWN0aW9uID09PSBDLkFDVElPTlMuUEFUQ0gpIHtcbiAgICB0aGlzLl9hcHBseVVwZGF0ZShtZXNzYWdlLCB0aGlzLl9jbGllbnQpO1xuICB9IGVsc2UgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBDLkFDVElPTlMuV1JJVEVfQUNLTk9XTEVER0VNRU5UKSB7XG4gICAgUmVjb3JkLl9oYW5kbGVXcml0ZUFja25vd2xlZGdlbWVudHMobWVzc2FnZSwgdGhpcy5fd3JpdGVDYWxsYmFja3MsIHRoaXMuX2NsaWVudCk7XG4gIH0gZWxzZSBpZiAobWVzc2FnZS5kYXRhWzBdID09PSBDLkVWRU5ULlZFUlNJT05fRVhJU1RTKSB7XG4gICAgLy8gT3RoZXJ3aXNlIGl0IHNob3VsZCBiZSBhbiBlcnJvciwgYW5kIGRlYWx0IHdpdGggYWNjb3JkaW5nbHlcbiAgICB0aGlzLl9yZWNvdmVyUmVjb3JkKG1lc3NhZ2UuZGF0YVsyXSwgSlNPTi5wYXJzZShtZXNzYWdlLmRhdGFbM10pLCBtZXNzYWdlKTtcbiAgfSBlbHNlIGlmIChtZXNzYWdlLmRhdGFbMF0gPT09IEMuRVZFTlQuTUVTU0FHRV9ERU5JRUQpIHtcbiAgICB0aGlzLl9jbGVhclRpbWVvdXRzKCk7XG4gIH0gZWxzZSBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5TVUJTQ1JJUFRJT05fSEFTX1BST1ZJREVSKSB7XG4gICAgdmFyIGhhc1Byb3ZpZGVyID0gbWVzc2FnZVBhcnNlci5jb252ZXJ0VHlwZWQobWVzc2FnZS5kYXRhWzFdLCB0aGlzLl9jbGllbnQpO1xuICAgIHRoaXMuaGFzUHJvdmlkZXIgPSBoYXNQcm92aWRlcjtcbiAgICB0aGlzLmVtaXQoJ2hhc1Byb3ZpZGVyQ2hhbmdlZCcsIGhhc1Byb3ZpZGVyKTtcbiAgfVxufTtcblxuUmVjb3JkLl9oYW5kbGVXcml0ZUFja25vd2xlZGdlbWVudHMgPSBmdW5jdGlvbiAobWVzc2FnZSwgY2FsbGJhY2tzLCBjbGllbnQpIHtcbiAgdmFyIHZlcnNpb25zID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGFbMV0pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHZlcnNpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNhbGxiYWNrID0gY2FsbGJhY2tzW3ZlcnNpb25zW2ldXTtcbiAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2FsbGJhY2sobWVzc2FnZVBhcnNlci5jb252ZXJ0VHlwZWQobWVzc2FnZS5kYXRhWzJdLCBjbGllbnQpKTtcbiAgICAgIGRlbGV0ZSBjYWxsYmFja3NbdmVyc2lvbnNbaV1dO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgd2hlbiBhIG1lcmdlIGNvbmZsaWN0IGlzIGRldGVjdGVkIGJ5IGEgVkVSU0lPTl9FWElTVFMgZXJyb3Igb3IgaWYgYW4gdXBkYXRlIHJlY2lldmVkXG4gKiBpcyBkaXJlY3RseSBhZnRlciB0aGUgY2xpZW50cy4gSWYgbm8gbWVyZ2Ugc3RyYXRlZ3kgaXMgY29uZmlndXJlIGl0IHdpbGwgZW1pdCBhIFZFUlNJT05fRVhJU1RTXG4gKiBlcnJvciBhbmQgdGhlIHJlY29yZCB3aWxsIHJlbWFpbiBpbiBhbiBpbmNvbnNpc3RlbnQgc3RhdGUuXG4gKlxuICogQHBhcmFtICAge051bWJlcn0gcmVtb3RlVmVyc2lvbiBUaGUgcmVtb3RlIHZlcnNpb24gbnVtYmVyXG4gKiBAcGFyYW0gICB7T2JqZWN0fSByZW1vdGVEYXRhIFRoZSByZW1vdGUgb2JqZWN0IGRhdGFcbiAqIEBwYXJhbSAgIHtPYmplY3R9IG1lc3NhZ2UgcGFyc2VkIGFuZCB2YWxpZGF0ZWQgZGVlcHN0cmVhbSBtZXNzYWdlXG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5SZWNvcmQucHJvdG90eXBlLl9yZWNvdmVyUmVjb3JkID0gZnVuY3Rpb24gKHJlbW90ZVZlcnNpb24sIHJlbW90ZURhdGEsIG1lc3NhZ2UpIHtcbiAgbWVzc2FnZS5wcm9jZXNzZWRFcnJvciA9IHRydWU7XG4gIGlmICh0aGlzLl9tZXJnZVN0cmF0ZWd5KSB7XG4gICAgdGhpcy5fbWVyZ2VTdHJhdGVneSh0aGlzLCByZW1vdGVEYXRhLCByZW1vdGVWZXJzaW9uLCB0aGlzLl9vblJlY29yZFJlY292ZXJlZC5iaW5kKHRoaXMsIHJlbW90ZVZlcnNpb24sIHJlbW90ZURhdGEsIG1lc3NhZ2UpKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmVtaXQoJ2Vycm9yJywgQy5FVkVOVC5WRVJTSU9OX0VYSVNUUywgJ3JlY2VpdmVkIHVwZGF0ZSBmb3IgJyArIHJlbW90ZVZlcnNpb24gKyAnIGJ1dCB2ZXJzaW9uIGlzICcgKyB0aGlzLnZlcnNpb24pO1xuICB9XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLl9zZW5kVXBkYXRlID0gZnVuY3Rpb24gKHBhdGgsIGRhdGEsIGNvbmZpZykge1xuICB0aGlzLnZlcnNpb24rKztcbiAgdmFyIG1zZ0RhdGEgPSB2b2lkIDA7XG4gIGlmICghcGF0aCkge1xuICAgIG1zZ0RhdGEgPSBjb25maWcgPT09IHVuZGVmaW5lZCA/IFt0aGlzLm5hbWUsIHRoaXMudmVyc2lvbiwgZGF0YV0gOiBbdGhpcy5uYW1lLCB0aGlzLnZlcnNpb24sIGRhdGEsIGNvbmZpZ107XG4gICAgdGhpcy5fY29ubmVjdGlvbi5zZW5kTXNnKEMuVE9QSUMuUkVDT1JELCBDLkFDVElPTlMuVVBEQVRFLCBtc2dEYXRhKTtcbiAgfSBlbHNlIHtcbiAgICBtc2dEYXRhID0gY29uZmlnID09PSB1bmRlZmluZWQgPyBbdGhpcy5uYW1lLCB0aGlzLnZlcnNpb24sIHBhdGgsIG1lc3NhZ2VCdWlsZGVyLnR5cGVkKGRhdGEpXSA6IFt0aGlzLm5hbWUsIHRoaXMudmVyc2lvbiwgcGF0aCwgbWVzc2FnZUJ1aWxkZXIudHlwZWQoZGF0YSksIGNvbmZpZ107XG4gICAgdGhpcy5fY29ubmVjdGlvbi5zZW5kTXNnKEMuVE9QSUMuUkVDT1JELCBDLkFDVElPTlMuUEFUQ0gsIG1zZ0RhdGEpO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxiYWNrIG9uY2UgdGhlIHJlY29yZCBtZXJnZSBoYXMgY29tcGxldGVkLiBJZiBzdWNjZXNzZnVsIGl0IHdpbGwgc2V0IHRoZVxuICogcmVjb3JkIHN0YXRlLCBlbHNlIGVtaXQgYW5kIGVycm9yIGFuZCB0aGUgcmVjb3JkIHdpbGwgcmVtYWluIGluIGFuXG4gKiBpbmNvbnNpc3RlbnQgc3RhdGUgdW50aWwgdGhlIG5leHQgdXBkYXRlLlxuICpcbiAqIEBwYXJhbSAgIHtOdW1iZXJ9IHJlbW90ZVZlcnNpb24gVGhlIHJlbW90ZSB2ZXJzaW9uIG51bWJlclxuICogQHBhcmFtICAge09iamVjdH0gcmVtb3RlRGF0YSBUaGUgcmVtb3RlIG9iamVjdCBkYXRhXG4gKiBAcGFyYW0gICB7T2JqZWN0fSBtZXNzYWdlIHBhcnNlZCBhbmQgdmFsaWRhdGVkIGRlZXBzdHJlYW0gbWVzc2FnZVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuUmVjb3JkLnByb3RvdHlwZS5fb25SZWNvcmRSZWNvdmVyZWQgPSBmdW5jdGlvbiAocmVtb3RlVmVyc2lvbiwgcmVtb3RlRGF0YSwgbWVzc2FnZSwgZXJyb3IsIGRhdGEpIHtcbiAgaWYgKCFlcnJvcikge1xuICAgIHZhciBvbGRWZXJzaW9uID0gdGhpcy52ZXJzaW9uO1xuICAgIHRoaXMudmVyc2lvbiA9IHJlbW90ZVZlcnNpb247XG5cbiAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLl8kZGF0YTtcblxuICAgIGlmICh1dGlscy5kZWVwRXF1YWxzKG9sZFZhbHVlLCByZW1vdGVEYXRhKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXdWYWx1ZSA9IGpzb25QYXRoLnNldChvbGRWYWx1ZSwgdW5kZWZpbmVkLCBkYXRhLCBmYWxzZSk7XG5cbiAgICBpZiAodXRpbHMuZGVlcEVxdWFscyhkYXRhLCByZW1vdGVEYXRhKSkge1xuICAgICAgdGhpcy5fYXBwbHlDaGFuZ2UoZGF0YSk7XG5cbiAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuX3dyaXRlQ2FsbGJhY2tzW3JlbW90ZVZlcnNpb25dO1xuICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl93cml0ZUNhbGxiYWNrc1tyZW1vdGVWZXJzaW9uXTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgY29uZmlnID0gbWVzc2FnZS5kYXRhWzRdO1xuICAgIGlmIChjb25maWcgJiYgSlNPTi5wYXJzZShjb25maWcpLndyaXRlU3VjY2Vzcykge1xuICAgICAgdmFyIF9jYWxsYmFjayA9IHRoaXMuX3dyaXRlQ2FsbGJhY2tzW29sZFZlcnNpb25dO1xuICAgICAgZGVsZXRlIHRoaXMuX3dyaXRlQ2FsbGJhY2tzW29sZFZlcnNpb25dO1xuICAgICAgdGhpcy5fc2V0VXBDYWxsYmFjayh0aGlzLnZlcnNpb24sIF9jYWxsYmFjayk7XG4gICAgfVxuICAgIHRoaXMuX3NlbmRVcGRhdGUodW5kZWZpbmVkLCBkYXRhLCBjb25maWcpO1xuICAgIHRoaXMuX2FwcGx5Q2hhbmdlKG5ld1ZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmVtaXQoJ2Vycm9yJywgQy5FVkVOVC5WRVJTSU9OX0VYSVNUUywgJ3JlY2VpdmVkIHVwZGF0ZSBmb3IgJyArIHJlbW90ZVZlcnNpb24gKyAnIGJ1dCB2ZXJzaW9uIGlzICcgKyB0aGlzLnZlcnNpb24pO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciBhY2stbWVzc2FnZXMuIEFja3MgY2FuIGJlIHJlY2VpdmVkIGZvclxuICogc3Vic2NyaXB0aW9ucywgZGlzY2FyZHMgYW5kIGRlbGV0ZXNcbiAqXG4gKiBAcGFyYW0gICB7T2JqZWN0fSBtZXNzYWdlIHBhcnNlZCBhbmQgdmFsaWRhdGVkIGRlZXBzdHJlYW0gbWVzc2FnZVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuUmVjb3JkLnByb3RvdHlwZS5fcHJvY2Vzc0Fja01lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICB2YXIgYWNrbm93bGVkZ2VkQWN0aW9uID0gbWVzc2FnZS5kYXRhWzBdO1xuXG4gIGlmIChhY2tub3dsZWRnZWRBY3Rpb24gPT09IEMuQUNUSU9OUy5TVUJTQ1JJQkUpIHtcbiAgICB0aGlzLl9hY2tUaW1lb3V0UmVnaXN0cnkuY2xlYXIobWVzc2FnZSk7XG4gIH0gZWxzZSBpZiAoYWNrbm93bGVkZ2VkQWN0aW9uID09PSBDLkFDVElPTlMuREVMRVRFKSB7XG4gICAgdGhpcy5lbWl0KCdkZWxldGUnKTtcbiAgICB0aGlzLl9kZXN0cm95KCk7XG4gIH0gZWxzZSBpZiAoYWNrbm93bGVkZ2VkQWN0aW9uID09PSBDLkFDVElPTlMuVU5TVUJTQ1JJQkUpIHtcbiAgICB0aGlzLmVtaXQoJ2Rpc2NhcmQnKTtcbiAgICB0aGlzLl9kZXN0cm95KCk7XG4gIH1cbn07XG5cbi8qKlxuICogQXBwbGllcyBpbmNvbWluZyB1cGRhdGVzIGFuZCBwYXRjaGVzIHRvIHRoZSByZWNvcmQncyBkYXRhc2V0XG4gKlxuICogQHBhcmFtICAge09iamVjdH0gbWVzc2FnZSBwYXJzZWQgYW5kIHZhbGlkYXRlZCBkZWVwc3RyZWFtIG1lc3NhZ2VcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblJlY29yZC5wcm90b3R5cGUuX2FwcGx5VXBkYXRlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgdmFyIHZlcnNpb24gPSBwYXJzZUludChtZXNzYWdlLmRhdGFbMV0sIDEwKTtcbiAgdmFyIGRhdGEgPSB2b2lkIDA7XG4gIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gQy5BQ1RJT05TLlBBVENIKSB7XG4gICAgZGF0YSA9IG1lc3NhZ2VQYXJzZXIuY29udmVydFR5cGVkKG1lc3NhZ2UuZGF0YVszXSwgdGhpcy5fY2xpZW50KTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGFbMl0pO1xuICB9XG5cbiAgaWYgKHRoaXMudmVyc2lvbiA9PT0gbnVsbCkge1xuICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gIH0gZWxzZSBpZiAodGhpcy52ZXJzaW9uICsgMSAhPT0gdmVyc2lvbikge1xuICAgIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gQy5BQ1RJT05TLlBBVENIKSB7XG4gICAgICAvKipcbiAgICAgICogUmVxdWVzdCBhIHNuYXBzaG90IHNvIHRoYXQgYSBtZXJnZSBjYW4gYmUgZG9uZSB3aXRoIHRoZSByZWFkIHJlcGx5IHdoaWNoIGNvbnRhaW5zXG4gICAgICAqIHRoZSBmdWxsIHN0YXRlIG9mIHRoZSByZWNvcmRcbiAgICAgICoqL1xuICAgICAgdGhpcy5fY29ubmVjdGlvbi5zZW5kTXNnKEMuVE9QSUMuUkVDT1JELCBDLkFDVElPTlMuU05BUFNIT1QsIFt0aGlzLm5hbWVdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVjb3ZlclJlY29yZCh2ZXJzaW9uLCBkYXRhLCBtZXNzYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgdGhpcy5fYXBwbHlDaGFuZ2UoanNvblBhdGguc2V0KHRoaXMuXyRkYXRhLCBtZXNzYWdlLmFjdGlvbiA9PT0gQy5BQ1RJT05TLlBBVENIID8gbWVzc2FnZS5kYXRhWzJdIDogdW5kZWZpbmVkLCBkYXRhKSk7XG59O1xuXG4vKipcbiAqIENhbGxiYWNrIGZvciBpbmNvbWluZyByZWFkIG1lc3NhZ2VzXG4gKlxuICogQHBhcmFtICAge09iamVjdH0gbWVzc2FnZSBwYXJzZWQgYW5kIHZhbGlkYXRlZCBkZWVwc3RyZWFtIG1lc3NhZ2VcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblJlY29yZC5wcm90b3R5cGUuX29uUmVhZCA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gIHRoaXMudmVyc2lvbiA9IHBhcnNlSW50KG1lc3NhZ2UuZGF0YVsxXSwgMTApO1xuICB0aGlzLl9hcHBseUNoYW5nZShqc29uUGF0aC5zZXQodGhpcy5fJGRhdGEsIHVuZGVmaW5lZCwgSlNPTi5wYXJzZShtZXNzYWdlLmRhdGFbMl0pKSk7XG4gIHRoaXMuX3NldFJlYWR5KCk7XG59O1xuXG4vKipcbiAqIEludm9rZXMgbWV0aG9kIGNhbGxzIHRoYXQgd2hlcmUgcXVldWVkIHdoaWxlIHRoZSByZWNvcmQgd2Fzbid0IHJlYWR5XG4gKiBhbmQgZW1pdHMgdGhlIHJlYWR5IGV2ZW50XG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5SZWNvcmQucHJvdG90eXBlLl9zZXRSZWFkeSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9xdWV1ZWRNZXRob2RDYWxscy5sZW5ndGg7IGkrKykge1xuICAgIHRoaXNbdGhpcy5fcXVldWVkTWV0aG9kQ2FsbHNbaV0ubWV0aG9kXS5hcHBseSh0aGlzLCB0aGlzLl9xdWV1ZWRNZXRob2RDYWxsc1tpXS5hcmdzKTtcbiAgfVxuICB0aGlzLl9xdWV1ZWRNZXRob2RDYWxscyA9IFtdO1xuICB0aGlzLmVtaXQoJ3JlYWR5Jyk7XG59O1xuXG5SZWNvcmQucHJvdG90eXBlLl9zZXRVcENhbGxiYWNrID0gZnVuY3Rpb24gKGN1cnJlbnRWZXJzaW9uLCBjYWxsYmFjaykge1xuICB2YXIgbmV3VmVyc2lvbiA9IE51bWJlcih0aGlzLnZlcnNpb24pICsgMTtcbiAgdGhpcy5fd3JpdGVDYWxsYmFja3NbbmV3VmVyc2lvbl0gPSBjYWxsYmFjaztcbn07XG5cbi8qKlxuICogU2VuZHMgdGhlIHJlYWQgbWVzc2FnZSwgZWl0aGVyIGluaXRpYWxseSBhdCByZWNvcmRcbiAqIGNyZWF0aW9uIG9yIGFmdGVyIGEgbG9zdCBjb25uZWN0aW9uIGhhcyBiZWVuIHJlLWVzdGFibGlzaGVkXG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5SZWNvcmQucHJvdG90eXBlLl9zZW5kUmVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fY29ubmVjdGlvbi5zZW5kTXNnKEMuVE9QSUMuUkVDT1JELCBDLkFDVElPTlMuQ1JFQVRFT1JSRUFELCBbdGhpcy5uYW1lXSk7XG59O1xuXG4vKipcbiAqIENvbXBhcmVzIHRoZSBuZXcgdmFsdWVzIGZvciBldmVyeSBwYXRoIHdpdGggdGhlIHByZXZpb3VzbHkgc3RvcmVkIG9uZXMgYW5kXG4gKiB1cGRhdGVzIHRoZSBzdWJzY3JpYmVycyBpZiB0aGUgdmFsdWUgaGFzIGNoYW5nZWRcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblJlY29yZC5wcm90b3R5cGUuX2FwcGx5Q2hhbmdlID0gZnVuY3Rpb24gKG5ld0RhdGEpIHtcbiAgaWYgKHRoaXMuaXNEZXN0cm95ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgb2xkRGF0YSA9IHRoaXMuXyRkYXRhO1xuICB0aGlzLl8kZGF0YSA9IG5ld0RhdGE7XG5cbiAgdmFyIHBhdGhzID0gdGhpcy5fZXZlbnRFbWl0dGVyLmV2ZW50TmFtZXMoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRocy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBuZXdWYWx1ZSA9IGpzb25QYXRoLmdldChuZXdEYXRhLCBwYXRoc1tpXSwgZmFsc2UpO1xuICAgIHZhciBvbGRWYWx1ZSA9IGpzb25QYXRoLmdldChvbGREYXRhLCBwYXRoc1tpXSwgZmFsc2UpO1xuXG4gICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgdGhpcy5fZXZlbnRFbWl0dGVyLmVtaXQocGF0aHNbaV0sIHRoaXMuZ2V0KHBhdGhzW2ldKSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgYmFzZWQgb24gdGhlIHR5cGVzIG9mIHRoZSBwcm92aWRlZCBhcmd1bWVudHNcbiAqXG4gKiBAcGFyYW0ge0FyZ3VtZW50c30gYXJnc1xuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBhcmd1bWVudHMgbWFwXG4gKi9cblJlY29yZC5wcm90b3R5cGUuX25vcm1hbGl6ZUFyZ3VtZW50cyA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gIC8vIElmIGFyZ3VtZW50cyBpcyBhbHJlYWR5IGEgbWFwIG9mIG5vcm1hbGl6ZWQgcGFyYW1ldGVyc1xuICAvLyAoZS5nLiB3aGVuIGNhbGxlZCBieSBBbm9ueW1vdXNSZWNvcmQpLCBqdXN0IHJldHVybiBpdC5cbiAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIF90eXBlb2YoYXJnc1swXSkgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGFyZ3NbMF07XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodHlwZW9mIGFyZ3NbaV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXN1bHQucGF0aCA9IGFyZ3NbaV07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnc1tpXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVzdWx0LmNhbGxiYWNrID0gYXJnc1tpXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBhcmdzW2ldID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJlc3VsdC50cmlnZ2VyTm93ID0gYXJnc1tpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBDbGVhcnMgYWxsIHRpbWVvdXRzIHRoYXQgYXJlIHNldCB3aGVuIHRoZSByZWNvcmQgaXMgY3JlYXRlZFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuUmVjb3JkLnByb3RvdHlwZS5fY2xlYXJUaW1lb3V0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fYWNrVGltZW91dFJlZ2lzdHJ5LnJlbW92ZSh7IGFja0lkOiB0aGlzLl9yZWFkQWNrVGltZW91dCwgc2lsZW50OiB0cnVlIH0pO1xuICB0aGlzLl9hY2tUaW1lb3V0UmVnaXN0cnkucmVtb3ZlKHsgYWNrSWQ6IHRoaXMuX3Jlc3BvbnNlVGltZW91dCwgc2lsZW50OiB0cnVlIH0pO1xuICB0aGlzLl9hY2tUaW1lb3V0UmVnaXN0cnkucmVtb3ZlKHsgYWNrSWQ6IHRoaXMuX2RlbGV0ZUFja1RpbWVvdXQsIHNpbGVudDogdHJ1ZSB9KTtcbiAgdGhpcy5fYWNrVGltZW91dFJlZ2lzdHJ5LnJlbW92ZSh7IGFja0lkOiB0aGlzLl9kaXNjYXJkVGltZW91dCwgc2lsZW50OiB0cnVlIH0pO1xufTtcblxuLyoqXG4gKiBBIHF1aWNrIGNoZWNrIHRoYXQncyBjYXJyaWVkIG91dCBieSBtb3N0IG1ldGhvZHMgdGhhdCBpbnRlcmFjdCB3aXRoIHRoZSByZWNvcmRcbiAqIHRvIG1ha2Ugc3VyZSBpdCBoYXNuJ3QgYmVlbiBkZXN0cm95ZWQgeWV0IC0gYW5kIHRvIGhhbmRsZSBpdCBncmFjZWZ1bGx5IGlmIGl0IGhhcy5cbiAqXG4gKiBAcGFyYW0gICB7U3RyaW5nfSBtZXRob2ROYW1lIFRoZSBuYW1lIG9mIHRoZSBtZXRob2QgdGhhdCBpbnZva2VkIHRoaXMgY2hlY2tcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge0Jvb2xlYW59IGlzIGRlc3Ryb3llZFxuICovXG5SZWNvcmQucHJvdG90eXBlLl9jaGVja0Rlc3Ryb3llZCA9IGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XG4gIGlmICh0aGlzLmlzRGVzdHJveWVkKSB7XG4gICAgdGhpcy5lbWl0KCdlcnJvcicsICdDYW5cXCd0IGludm9rZSBcXCcnICsgbWV0aG9kTmFtZSArICdcXCcuIFJlY29yZCBcXCcnICsgdGhpcy5uYW1lICsgJ1xcJyBpcyBhbHJlYWR5IGRlc3Ryb3llZCcpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBEZXN0cm95cyB0aGUgcmVjb3JkIGFuZCBudWxscyBhbGxcbiAqIGl0cyBkZXBlbmRlbmNpZXNcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblJlY29yZC5wcm90b3R5cGUuX2Rlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX2NsZWFyVGltZW91dHMoKTtcbiAgdGhpcy5fZXZlbnRFbWl0dGVyLm9mZigpO1xuICB0aGlzLl9yZXN1YnNjcmliZU5vdGlmaWVyLmRlc3Ryb3koKTtcbiAgdGhpcy5pc0Rlc3Ryb3llZCA9IHRydWU7XG4gIHRoaXMuaXNSZWFkeSA9IGZhbHNlO1xuICB0aGlzLl9jbGllbnQgPSBudWxsO1xuICB0aGlzLl9ldmVudEVtaXR0ZXIgPSBudWxsO1xuICB0aGlzLl9jb25uZWN0aW9uID0gbnVsbDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVjb3JkO1xuXG59LHtcIi4uL2NvbnN0YW50cy9jb25zdGFudHNcIjoxMSxcIi4uL21lc3NhZ2UvbWVzc2FnZS1idWlsZGVyXCI6MTYsXCIuLi9tZXNzYWdlL21lc3NhZ2UtcGFyc2VyXCI6MTcsXCIuLi91dGlscy9yZXN1YnNjcmliZS1ub3RpZmllclwiOjI5LFwiLi4vdXRpbHMvdXRpbHNcIjozMSxcIi4vanNvbi1wYXRoXCI6MjAsXCJjb21wb25lbnQtZW1pdHRlcjJcIjoxfV0sMjQ6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQyA9IF9kZXJlcV8oJy4uL2NvbnN0YW50cy9jb25zdGFudHMnKTtcbnZhciBSZXN1YnNjcmliZU5vdGlmaWVyID0gX2RlcmVxXygnLi4vdXRpbHMvcmVzdWJzY3JpYmUtbm90aWZpZXInKTtcbnZhciBScGNSZXNwb25zZSA9IF9kZXJlcV8oJy4vcnBjLXJlc3BvbnNlJyk7XG52YXIgUnBjID0gX2RlcmVxXygnLi9ycGMnKTtcbnZhciBtZXNzYWdlUGFyc2VyID0gX2RlcmVxXygnLi4vbWVzc2FnZS9tZXNzYWdlLXBhcnNlcicpO1xudmFyIG1lc3NhZ2VCdWlsZGVyID0gX2RlcmVxXygnLi4vbWVzc2FnZS9tZXNzYWdlLWJ1aWxkZXInKTtcblxuLyoqXG4gKiBUaGUgbWFpbiBjbGFzcyBmb3IgcmVtb3RlIHByb2NlZHVyZSBjYWxsc1xuICpcbiAqIFByb3ZpZGVzIHRoZSBycGMgaW50ZXJmYWNlIGFuZCBoYW5kbGVzIGluY29taW5nIG1lc3NhZ2VzXG4gKiBvbiB0aGUgcnBjIHRvcGljXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgZGVlcHN0cmVhbSBjb25maWd1cmF0aW9uIG9wdGlvbnNcbiAqIEBwYXJhbSB7Q29ubmVjdGlvbn0gY29ubmVjdGlvblxuICogQHBhcmFtIHtDbGllbnR9IGNsaWVudFxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHB1YmxpY1xuICovXG52YXIgUnBjSGFuZGxlciA9IGZ1bmN0aW9uIFJwY0hhbmRsZXIob3B0aW9ucywgY29ubmVjdGlvbiwgY2xpZW50KSB7XG4gIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICB0aGlzLl9jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcbiAgdGhpcy5fY2xpZW50ID0gY2xpZW50O1xuICB0aGlzLl9ycGNzID0ge307XG4gIHRoaXMuX3Byb3ZpZGVycyA9IHt9O1xuICB0aGlzLl9hY2tUaW1lb3V0UmVnaXN0cnkgPSBjbGllbnQuXyRnZXRBY2tUaW1lb3V0UmVnaXN0cnkoKTtcbiAgdGhpcy5fcmVzdWJzY3JpYmVOb3RpZmllciA9IG5ldyBSZXN1YnNjcmliZU5vdGlmaWVyKHRoaXMuX2NsaWVudCwgdGhpcy5fcmVwcm92aWRlLmJpbmQodGhpcykpO1xufTtcblxuLyoqXG4gKiBSZWdpc3RlcnMgYSBjYWxsYmFjayBmdW5jdGlvbiBhcyBhIFJQQyBwcm92aWRlci4gSWYgYW5vdGhlciBjb25uZWN0ZWQgY2xpZW50IGNhbGxzXG4gKiBjbGllbnQucnBjLm1ha2UoKSB0aGUgcmVxdWVzdCB3aWxsIGJlIHJvdXRlZCB0byB0aGlzIG1ldGhvZFxuICpcbiAqIFRoZSBjYWxsYmFjayB3aWxsIGJlIGludm9rZWQgd2l0aCB0d28gYXJndW1lbnRzOlxuICogICAgIHtNaXhlZH0gZGF0YSBUaGUgZGF0YSBwYXNzZWQgdG8gdGhlIGNsaWVudC5ycGMubWFrZSBmdW5jdGlvblxuICogICAgIHtScGNSZXNwb25zZX0gcnBjUmVzcG9uc2UgQW4gb2JqZWN0IHdpdGggbWV0aG9kcyB0byByZXNwb25zZSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFja25vd2xlZGdlIG9yIHJlamVjdCB0aGUgcmVxdWVzdFxuICpcbiAqIE9ubHkgb25lIGNhbGxiYWNrIGNhbiBiZSByZWdpc3RlcmVkIGZvciBhIFJQQyBhdCBhIHRpbWVcbiAqXG4gKiBQbGVhc2Ugbm90ZTogRGVlcHN0cmVhbSB0cmllcyB0byBkZWxpdmVyIGRhdGEgaW4gaXRzIG9yaWdpbmFsIGZvcm1hdC5cbiAqIERhdGEgcGFzc2VkIHRvIGNsaWVudC5ycGMubWFrZSBhcyBhIFN0cmluZyB3aWxsIGFycml2ZSBhcyBhIFN0cmluZyxcbiAqIG51bWJlcnMgb3IgaW1wbGljaXRseSBKU09OIHNlcmlhbGl6ZWQgb2JqZWN0cyB3aWxsIGFycml2ZSBpbiB0aGVpclxuICogcmVzcGVjdGl2ZSBmb3JtYXQgYXMgd2VsbFxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHZvaWRcbiAqL1xuUnBjSGFuZGxlci5wcm90b3R5cGUucHJvdmlkZSA9IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8IG5hbWUubGVuZ3RoID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGFyZ3VtZW50IG5hbWUnKTtcbiAgfVxuICBpZiAodGhpcy5fcHJvdmlkZXJzW25hbWVdKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdSUEMgJyArIG5hbWUgKyAnIGFscmVhZHkgcmVnaXN0ZXJlZCcpO1xuICB9XG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgYXJndW1lbnQgY2FsbGJhY2snKTtcbiAgfVxuXG4gIHRoaXMuX2Fja1RpbWVvdXRSZWdpc3RyeS5hZGQoe1xuICAgIHRvcGljOiBDLlRPUElDLlJQQyxcbiAgICBuYW1lOiBuYW1lLFxuICAgIGFjdGlvbjogQy5BQ1RJT05TLlNVQlNDUklCRVxuICB9KTtcbiAgdGhpcy5fcHJvdmlkZXJzW25hbWVdID0gY2FsbGJhY2s7XG4gIHRoaXMuX2Nvbm5lY3Rpb24uc2VuZE1zZyhDLlRPUElDLlJQQywgQy5BQ1RJT05TLlNVQlNDUklCRSwgW25hbWVdKTtcbn07XG5cbi8qKlxuICogVW5yZWdpc3RlcnMgdGhpcyBjbGllbnQgYXMgYSBwcm92aWRlciBmb3IgYSByZW1vdGUgcHJvY2VkdXJlIGNhbGxcbiAqXG4gKiBAcGFyYW0gICB7U3RyaW5nfSBuYW1lIHRoZSBuYW1lIG9mIHRoZSBycGNcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuUnBjSGFuZGxlci5wcm90b3R5cGUudW5wcm92aWRlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCBuYW1lLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBhcmd1bWVudCBuYW1lJyk7XG4gIH1cblxuICBpZiAodGhpcy5fcHJvdmlkZXJzW25hbWVdKSB7XG4gICAgZGVsZXRlIHRoaXMuX3Byb3ZpZGVyc1tuYW1lXTtcbiAgICB0aGlzLl9hY2tUaW1lb3V0UmVnaXN0cnkuYWRkKHtcbiAgICAgIHRvcGljOiBDLlRPUElDLlJQQyxcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICBhY3Rpb246IEMuQUNUSU9OUy5VTlNVQlNDUklCRVxuICAgIH0pO1xuICAgIHRoaXMuX2Nvbm5lY3Rpb24uc2VuZE1zZyhDLlRPUElDLlJQQywgQy5BQ1RJT05TLlVOU1VCU0NSSUJFLCBbbmFtZV0pO1xuICB9XG59O1xuXG4vKipcbiAqIEV4ZWN1dGVzIHRoZSBhY3R1YWwgcmVtb3RlIHByb2NlZHVyZSBjYWxsXG4gKlxuICogQHBhcmFtICAge1N0cmluZ30gICBuYW1lICAgICBUaGUgbmFtZSBvZiB0aGUgcnBjXG4gKiBAcGFyYW0gICB7TWl4ZWR9ICAgIGRhdGEgICAgIFNlcmlhbGl6YWJsZSBkYXRhIHRoYXQgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIHByb3ZpZGVyXG4gKiBAcGFyYW0gICB7RnVuY3Rpb259IGNhbGxiYWNrIFdpbGwgYmUgaW52b2tlZCB3aXRoIHRoZSByZXR1cm5lZCByZXN1bHQgb3IgaWYgdGhlIHJwYyBmYWlsZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjZWl2ZXMgdG8gYXJndW1lbnRzOiBlcnJvciBvciBudWxsIGFuZCB0aGUgcmVzdWx0XG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblJwY0hhbmRsZXIucHJvdG90eXBlLm1ha2UgPSBmdW5jdGlvbiAobmFtZSwgZGF0YSwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCBuYW1lLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBhcmd1bWVudCBuYW1lJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBhcmd1bWVudCBjYWxsYmFjaycpO1xuICB9XG5cbiAgdmFyIHVpZCA9IHRoaXMuX2NsaWVudC5nZXRVaWQoKTtcbiAgdmFyIHR5cGVkRGF0YSA9IG1lc3NhZ2VCdWlsZGVyLnR5cGVkKGRhdGEpO1xuXG4gIHRoaXMuX3JwY3NbdWlkXSA9IG5ldyBScGMobmFtZSwgY2FsbGJhY2ssIHRoaXMuX29wdGlvbnMsIHRoaXMuX2NsaWVudCk7XG4gIHRoaXMuX2Nvbm5lY3Rpb24uc2VuZE1zZyhDLlRPUElDLlJQQywgQy5BQ1RJT05TLlJFUVVFU1QsIFtuYW1lLCB1aWQsIHR5cGVkRGF0YV0pO1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZXMgYSBSUEMgaW5zdGFuY2UgZm9yIGEgY29ycmVsYXRpb25JZCBvciB0aHJvd3MgYW4gZXJyb3JcbiAqIGlmIGl0IGNhbid0IGJlIGZvdW5kICh3aGljaCBzaG91bGQgbmV2ZXIgaGFwcGVuKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBjb3JyZWxhdGlvbklkXG4gKiBAcGFyYW0ge1N0cmluZ30gcnBjTmFtZVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7UnBjfVxuICovXG5ScGNIYW5kbGVyLnByb3RvdHlwZS5fZ2V0UnBjID0gZnVuY3Rpb24gKGNvcnJlbGF0aW9uSWQsIHJwY05hbWUsIHJhd01lc3NhZ2UpIHtcbiAgdmFyIHJwYyA9IHRoaXMuX3JwY3NbY29ycmVsYXRpb25JZF07XG5cbiAgaWYgKCFycGMpIHtcbiAgICB0aGlzLl9jbGllbnQuXyRvbkVycm9yKEMuVE9QSUMuUlBDLCBDLkVWRU5ULlVOU09MSUNJVEVEX01FU1NBR0UsIHJhd01lc3NhZ2UpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHJwYztcbn07XG5cbi8qKlxuICogSGFuZGxlcyBpbmNvbWluZyBycGMgUkVRVUVTVCBtZXNzYWdlcy4gSW5zdGFudGlhdGVzIGEgbmV3IHJlc3BvbnNlIG9iamVjdFxuICogYW5kIGludm9rZXMgdGhlIHByb3ZpZGVyIGNhbGxiYWNrIG9yIHJlamVjdHMgdGhlIHJlcXVlc3QgaWYgbm8gcnBjIHByb3ZpZGVyXG4gKiBpcyBwcmVzZW50ICh3aGljaCBzaG91bGRuJ3QgcmVhbGx5IGhhcHBlbiwgYnV0IG1pZ2h0IGJlIHRoZSByZXN1bHQgb2YgYSByYWNlIGNvbmRpdGlvblxuICogaWYgdGhpcyBjbGllbnQgc2VuZHMgYSB1bnByb3ZpZGUgbWVzc2FnZSB3aGlsc3QgYW4gaW5jb21pbmcgcmVxdWVzdCBpcyBhbHJlYWR5IGluIGZsaWdodClcbiAqXG4gKiBAcGFyYW0gICB7T2JqZWN0fSBtZXNzYWdlIFRoZSBwYXJzZWQgZGVlcHN0cmVhbSBSUEMgcmVxdWVzdCBtZXNzYWdlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuUnBjSGFuZGxlci5wcm90b3R5cGUuX3Jlc3BvbmRUb1JwYyA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gIHZhciBuYW1lID0gbWVzc2FnZS5kYXRhWzBdO1xuICB2YXIgY29ycmVsYXRpb25JZCA9IG1lc3NhZ2UuZGF0YVsxXTtcbiAgdmFyIGRhdGEgPSBudWxsO1xuICB2YXIgcmVzcG9uc2UgPSB2b2lkIDA7XG5cbiAgaWYgKG1lc3NhZ2UuZGF0YVsyXSkge1xuICAgIGRhdGEgPSBtZXNzYWdlUGFyc2VyLmNvbnZlcnRUeXBlZChtZXNzYWdlLmRhdGFbMl0sIHRoaXMuX2NsaWVudCk7XG4gIH1cblxuICBpZiAodGhpcy5fcHJvdmlkZXJzW25hbWVdKSB7XG4gICAgcmVzcG9uc2UgPSBuZXcgUnBjUmVzcG9uc2UodGhpcy5fY29ubmVjdGlvbiwgbmFtZSwgY29ycmVsYXRpb25JZCk7XG4gICAgdGhpcy5fcHJvdmlkZXJzW25hbWVdKGRhdGEsIHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9jb25uZWN0aW9uLnNlbmRNc2coQy5UT1BJQy5SUEMsIEMuQUNUSU9OUy5SRUpFQ1RJT04sIFtuYW1lLCBjb3JyZWxhdGlvbklkXSk7XG4gIH1cbn07XG5cbi8qKlxuICogRGlzdHJpYnV0ZXMgaW5jb21pbmcgbWVzc2FnZXMgZnJvbSB0aGUgc2VydmVyXG4gKiBiYXNlZCBvbiB0aGVpciBhY3Rpb25cbiAqXG4gKiBAcGFyYW0gICB7T2JqZWN0fSBtZXNzYWdlIEEgcGFyc2VkIGRlZXBzdHJlYW0gbWVzc2FnZVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuUnBjSGFuZGxlci5wcm90b3R5cGUuXyRoYW5kbGUgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICB2YXIgcnBjTmFtZSA9IHZvaWQgMDtcbiAgdmFyIGNvcnJlbGF0aW9uSWQgPSB2b2lkIDA7XG5cbiAgLy8gUlBDIFJlcXVlc3RzXG4gIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gQy5BQ1RJT05TLlJFUVVFU1QpIHtcbiAgICB0aGlzLl9yZXNwb25kVG9ScGMobWVzc2FnZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gUlBDIHN1YnNjcmlwdGlvbiBBY2tzXG4gIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gQy5BQ1RJT05TLkFDSyAmJiAobWVzc2FnZS5kYXRhWzBdID09PSBDLkFDVElPTlMuU1VCU0NSSUJFIHx8IG1lc3NhZ2UuZGF0YVswXSA9PT0gQy5BQ1RJT05TLlVOU1VCU0NSSUJFKSkge1xuICAgIHRoaXMuX2Fja1RpbWVvdXRSZWdpc3RyeS5jbGVhcihtZXNzYWdlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBoYW5kbGUgYXV0aC9kZW5pZWQgc3Vic2NyaXB0aW9uIGVycm9yc1xuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5FUlJPUikge1xuICAgIGlmIChtZXNzYWdlLmRhdGFbMF0gPT09IEMuRVZFTlQuTUVTU0FHRV9QRVJNSVNTSU9OX0VSUk9SKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChtZXNzYWdlLmRhdGFbMF0gPT09IEMuRVZFTlQuTUVTU0FHRV9ERU5JRUQgJiYgbWVzc2FnZS5kYXRhWzJdID09PSBDLkFDVElPTlMuU1VCU0NSSUJFKSB7XG4gICAgICB0aGlzLl9hY2tUaW1lb3V0UmVnaXN0cnkucmVtb3ZlKHtcbiAgICAgICAgdG9waWM6IEMuVE9QSUMuUlBDLFxuICAgICAgICBhY3Rpb246IEMuQUNUSU9OUy5TVUJTQ1JJQkUsXG4gICAgICAgIG5hbWU6IG1lc3NhZ2UuZGF0YVsxXVxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogRXJyb3IgbWVzc2FnZXMgYWx3YXlzIGhhdmUgdGhlIGVycm9yIGFzIGZpcnN0IHBhcmFtZXRlci4gU28gdGhlXG4gICAqIG9yZGVyIGlzIGRpZmZlcmVudCB0byBhY2sgYW5kIHJlc3BvbnNlIG1lc3NhZ2VzXG4gICAqL1xuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5FUlJPUiB8fCBtZXNzYWdlLmFjdGlvbiA9PT0gQy5BQ1RJT05TLkFDSykge1xuICAgIGlmIChtZXNzYWdlLmRhdGFbMF0gPT09IEMuRVZFTlQuTUVTU0FHRV9ERU5JRUQgJiYgbWVzc2FnZS5kYXRhWzJdID09PSBDLkFDVElPTlMuUkVRVUVTVCkge1xuICAgICAgY29ycmVsYXRpb25JZCA9IG1lc3NhZ2UuZGF0YVszXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29ycmVsYXRpb25JZCA9IG1lc3NhZ2UuZGF0YVsyXTtcbiAgICB9XG4gICAgcnBjTmFtZSA9IG1lc3NhZ2UuZGF0YVsxXTtcbiAgfSBlbHNlIHtcbiAgICBycGNOYW1lID0gbWVzc2FnZS5kYXRhWzBdO1xuICAgIGNvcnJlbGF0aW9uSWQgPSBtZXNzYWdlLmRhdGFbMV07XG4gIH1cblxuICAvKlxuICAqIFJldHJpZXZlIHRoZSBycGMgb2JqZWN0XG4gICovXG4gIHZhciBycGMgPSB0aGlzLl9nZXRScGMoY29ycmVsYXRpb25JZCwgcnBjTmFtZSwgbWVzc2FnZS5yYXcpO1xuICBpZiAocnBjID09PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gUlBDIFJlc3BvbnNlc1xuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5BQ0spIHtcbiAgICBycGMuYWNrKCk7XG4gIH0gZWxzZSBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5SRVNQT05TRSkge1xuICAgIHJwYy5yZXNwb25kKG1lc3NhZ2UuZGF0YVsyXSk7XG4gICAgZGVsZXRlIHRoaXMuX3JwY3NbY29ycmVsYXRpb25JZF07XG4gIH0gZWxzZSBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5FUlJPUikge1xuICAgIG1lc3NhZ2UucHJvY2Vzc2VkRXJyb3IgPSB0cnVlO1xuICAgIHJwYy5lcnJvcihtZXNzYWdlLmRhdGFbMF0pO1xuICAgIGRlbGV0ZSB0aGlzLl9ycGNzW2NvcnJlbGF0aW9uSWRdO1xuICB9XG59O1xuXG4vKipcbiAqIFJlcmVnaXN0ZXIgcHJvdmlkZXJzIHRvIGV2ZW50cyB3aGVuIGNvbm5lY3Rpb24gaXMgbG9zdFxuICpcbiAqIEBwYWNrYWdlIHByaXZhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5ScGNIYW5kbGVyLnByb3RvdHlwZS5fcmVwcm92aWRlID0gZnVuY3Rpb24gKCkge1xuICBmb3IgKHZhciBycGNOYW1lIGluIHRoaXMuX3Byb3ZpZGVycykge1xuICAgIHRoaXMuX2Nvbm5lY3Rpb24uc2VuZE1zZyhDLlRPUElDLlJQQywgQy5BQ1RJT05TLlNVQlNDUklCRSwgW3JwY05hbWVdKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBScGNIYW5kbGVyO1xuXG59LHtcIi4uL2NvbnN0YW50cy9jb25zdGFudHNcIjoxMSxcIi4uL21lc3NhZ2UvbWVzc2FnZS1idWlsZGVyXCI6MTYsXCIuLi9tZXNzYWdlL21lc3NhZ2UtcGFyc2VyXCI6MTcsXCIuLi91dGlscy9yZXN1YnNjcmliZS1ub3RpZmllclwiOjI5LFwiLi9ycGNcIjoyNixcIi4vcnBjLXJlc3BvbnNlXCI6MjV9XSwyNTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBDID0gX2RlcmVxXygnLi4vY29uc3RhbnRzL2NvbnN0YW50cycpO1xudmFyIHV0aWxzID0gX2RlcmVxXygnLi4vdXRpbHMvdXRpbHMnKTtcbnZhciBtZXNzYWdlQnVpbGRlciA9IF9kZXJlcV8oJy4uL21lc3NhZ2UvbWVzc2FnZS1idWlsZGVyJyk7XG5cbi8qKlxuICogVGhpcyBvYmplY3QgcHJvdmlkZXMgYSBudW1iZXIgb2YgbWV0aG9kcyB0aGF0IGFsbG93IGEgcnBjIHByb3ZpZGVyXG4gKiB0byByZXNwb25kIHRvIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7Q29ubmVjdGlvbn0gY29ubmVjdGlvbiAtIHRoZSBjbGllbnRzIGNvbm5lY3Rpb24gb2JqZWN0XG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSB0aGUgbmFtZSBvZiB0aGUgcnBjXG4gKiBAcGFyYW0ge1N0cmluZ30gY29ycmVsYXRpb25JZCB0aGUgY29ycmVsYXRpb25JZCBmb3IgdGhlIFJQQ1xuICovXG52YXIgUnBjUmVzcG9uc2UgPSBmdW5jdGlvbiBScGNSZXNwb25zZShjb25uZWN0aW9uLCBuYW1lLCBjb3JyZWxhdGlvbklkKSB7XG4gIHRoaXMuX2Nvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xuICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgdGhpcy5fY29ycmVsYXRpb25JZCA9IGNvcnJlbGF0aW9uSWQ7XG4gIHRoaXMuX2lzQWNrbm93bGVkZ2VkID0gZmFsc2U7XG4gIHRoaXMuX2lzQ29tcGxldGUgPSBmYWxzZTtcbiAgdGhpcy5hdXRvQWNrID0gdHJ1ZTtcbiAgdXRpbHMubmV4dFRpY2sodGhpcy5fcGVyZm9ybUF1dG9BY2suYmluZCh0aGlzKSk7XG59O1xuXG4vKipcbiAqIEFja25vd2xlZGdlcyB0aGUgcmVjZWlwdCBvZiB0aGUgcmVxdWVzdC4gVGhpc1xuICogd2lsbCBoYXBwZW4gaW1wbGljaXRseSB1bmxlc3MgdGhlIHJlcXVlc3QgY2FsbGJhY2tcbiAqIGV4cGxpY2l0bHkgc2V0cyBhdXRvQWNrIHRvIGZhbHNlXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMgICB7dm9pZH1cbiAqL1xuUnBjUmVzcG9uc2UucHJvdG90eXBlLmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuX2lzQWNrbm93bGVkZ2VkID09PSBmYWxzZSkge1xuICAgIHRoaXMuX2Nvbm5lY3Rpb24uc2VuZE1zZyhDLlRPUElDLlJQQywgQy5BQ1RJT05TLkFDSywgW0MuQUNUSU9OUy5SRVFVRVNULCB0aGlzLl9uYW1lLCB0aGlzLl9jb3JyZWxhdGlvbklkXSk7XG4gICAgdGhpcy5faXNBY2tub3dsZWRnZWQgPSB0cnVlO1xuICB9XG59O1xuXG4vKipcbiAqIFJlamVjdCB0aGUgcmVxdWVzdC4gVGhpcyBtaWdodCBiZSBuZWNlc3NhcnkgaWYgdGhlIGNsaWVudFxuICogaXMgYWxyZWFkeSBwcm9jZXNzaW5nIGEgbGFyZ2UgbnVtYmVyIG9mIHJlcXVlc3RzLiBJZiBkZWVwc3RyZWFtXG4gKiByZWNlaXZlcyBhIHJlamVjdGlvbiBtZXNzYWdlIGl0IHdpbGwgdHJ5IHRvIHJvdXRlIHRoZSByZXF1ZXN0IHRvXG4gKiBhbm90aGVyIHByb3ZpZGVyIC0gb3IgcmV0dXJuIGEgTk9fUlBDX1BST1ZJREVSIGVycm9yIGlmIHRoZXJlIGFyZSBub1xuICogcHJvdmlkZXJzIGxlZnRcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJucyAge3ZvaWR9XG4gKi9cblJwY1Jlc3BvbnNlLnByb3RvdHlwZS5yZWplY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuYXV0b0FjayA9IGZhbHNlO1xuICB0aGlzLl9pc0NvbXBsZXRlID0gdHJ1ZTtcbiAgdGhpcy5faXNBY2tub3dsZWRnZWQgPSB0cnVlO1xuICB0aGlzLl9jb25uZWN0aW9uLnNlbmRNc2coQy5UT1BJQy5SUEMsIEMuQUNUSU9OUy5SRUpFQ1RJT04sIFt0aGlzLl9uYW1lLCB0aGlzLl9jb3JyZWxhdGlvbklkXSk7XG59O1xuXG4vKipcbiAqIE5vdGlmaWVzIHRoZSBzZXJ2ZXIgdGhhdCBhbiBlcnJvciBoYXMgb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gcHJvY2VzcyB0aGUgcmVxdWVzdC5cbiAqIFRoaXMgd2lsbCBjb21wbGV0ZSB0aGUgcnBjLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBlcnJvck1zZyB0aGUgbWVzc2FnZSB1c2VkIHRvIGRlc2NyaWJlIHRoZSBlcnJvciB0aGF0IG9jY3VyZWRcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zICB7dm9pZH1cbiAqL1xuUnBjUmVzcG9uc2UucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycm9yTXNnKSB7XG4gIHRoaXMuYXV0b0FjayA9IGZhbHNlO1xuICB0aGlzLl9pc0NvbXBsZXRlID0gdHJ1ZTtcbiAgdGhpcy5faXNBY2tub3dsZWRnZWQgPSB0cnVlO1xuICB0aGlzLl9jb25uZWN0aW9uLnNlbmRNc2coQy5UT1BJQy5SUEMsIEMuQUNUSU9OUy5FUlJPUiwgW2Vycm9yTXNnLCB0aGlzLl9uYW1lLCB0aGlzLl9jb3JyZWxhdGlvbklkXSk7XG59O1xuXG4vKipcbiAqIENvbXBsZXRlcyB0aGUgcmVxdWVzdCBieSBzZW5kaW5nIHRoZSByZXNwb25zZSBkYXRhXG4gKiB0byB0aGUgc2VydmVyLiBJZiBkYXRhIGlzIGFuIGFycmF5IG9yIG9iamVjdCBpdCB3aWxsXG4gKiBhdXRvbWF0aWNhbGx5IGJlIHNlcmlhbGlzZWQuXG4gKiBJZiBhdXRvQWNrIGlzIGRpc2FibGVkIGFuZCB0aGUgcmVzcG9uc2UgaXMgc2VudCBiZWZvcmVcbiAqIHRoZSBhY2sgbWVzc2FnZSB0aGUgcmVxdWVzdCB3aWxsIHN0aWxsIGJlIGNvbXBsZXRlZCBhbmQgdGhlXG4gKiBhY2sgbWVzc2FnZSBpZ25vcmVkXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgdGhlIGRhdGEgc2VuZCBieSB0aGUgcHJvdmlkZXIuIE1pZ2h0IGJlIEpTT04gc2VyaWFsaXplZFxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5ScGNSZXNwb25zZS5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIGlmICh0aGlzLl9pc0NvbXBsZXRlID09PSB0cnVlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdScGMgJyArIHRoaXMuX25hbWUgKyAnIGFscmVhZHkgY29tcGxldGVkJyk7XG4gIH1cbiAgdGhpcy5hY2soKTtcblxuICB2YXIgdHlwZWREYXRhID0gbWVzc2FnZUJ1aWxkZXIudHlwZWQoZGF0YSk7XG4gIHRoaXMuX2Nvbm5lY3Rpb24uc2VuZE1zZyhDLlRPUElDLlJQQywgQy5BQ1RJT05TLlJFU1BPTlNFLCBbdGhpcy5fbmFtZSwgdGhpcy5fY29ycmVsYXRpb25JZCwgdHlwZWREYXRhXSk7XG4gIHRoaXMuX2lzQ29tcGxldGUgPSB0cnVlO1xufTtcblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgdGhlIGF1dG9BY2sgdGltZW91dC4gRXhlY3V0ZXMgYWNrXG4gKiBpZiBhdXRvQWNrIGlzIG5vdCBkaXNhYmxlZFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuUnBjUmVzcG9uc2UucHJvdG90eXBlLl9wZXJmb3JtQXV0b0FjayA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuYXV0b0FjayA9PT0gdHJ1ZSkge1xuICAgIHRoaXMuYWNrKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUnBjUmVzcG9uc2U7XG5cbn0se1wiLi4vY29uc3RhbnRzL2NvbnN0YW50c1wiOjExLFwiLi4vbWVzc2FnZS9tZXNzYWdlLWJ1aWxkZXJcIjoxNixcIi4uL3V0aWxzL3V0aWxzXCI6MzF9XSwyNjpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBDID0gX2RlcmVxXygnLi4vY29uc3RhbnRzL2NvbnN0YW50cycpO1xudmFyIG1lc3NhZ2VQYXJzZXIgPSBfZGVyZXFfKCcuLi9tZXNzYWdlL21lc3NhZ2UtcGFyc2VyJyk7XG5cbi8qKlxuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIGEgc2luZ2xlIHJlbW90ZSBwcm9jZWR1cmVcbiAqIGNhbGwgbWFkZSBmcm9tIHRoZSBjbGllbnQgdG8gdGhlIHNlcnZlci4gSXQncyBtYWluIGZ1bmN0aW9uXG4gKiBpcyB0byBlbmNhcHN1bGF0ZSB0aGUgbG9naWMgYXJvdW5kIHRpbWVvdXRzIGFuZCB0byBjb252ZXJ0IHRoZVxuICogaW5jb21pbmcgcmVzcG9uc2UgZGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSAgIG9wdGlvbnMgICAgICAgICAgIGRlZXBzdHJlYW0gY2xpZW50IGNvbmZpZ1xuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgICAgICAgICAgdGhlIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgb25jZSB0aGUgcmVxdWVzdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXMgY29tcGxldGUgb3IgZmFpbGVkXG4gKiBAcGFyYW0ge0NsaWVudH0gY2xpZW50XG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZhciBScGMgPSBmdW5jdGlvbiBScGMobmFtZSwgY2FsbGJhY2ssIG9wdGlvbnMsIGNsaWVudCkge1xuICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgdGhpcy5fY2xpZW50ID0gY2xpZW50O1xuICB0aGlzLl9hY2tUaW1lb3V0UmVnaXN0cnkgPSBjbGllbnQuXyRnZXRBY2tUaW1lb3V0UmVnaXN0cnkoKTtcbiAgdGhpcy5fYWNrVGltZW91dCA9IHRoaXMuX2Fja1RpbWVvdXRSZWdpc3RyeS5hZGQoe1xuICAgIHRvcGljOiBDLlRPUElDLlJQQyxcbiAgICBhY3Rpb246IEMuQUNUSU9OUy5BQ0ssXG4gICAgbmFtZTogbmFtZSxcbiAgICB0aW1lb3V0OiB0aGlzLl9vcHRpb25zLnJwY0Fja1RpbWVvdXQsXG4gICAgY2FsbGJhY2s6IHRoaXMuZXJyb3IuYmluZCh0aGlzKVxuICB9KTtcbiAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0ID0gdGhpcy5fYWNrVGltZW91dFJlZ2lzdHJ5LmFkZCh7XG4gICAgdG9waWM6IEMuVE9QSUMuUlBDLFxuICAgIGFjdGlvbjogQy5BQ1RJT05TLlJFUVVFU1QsXG4gICAgbmFtZTogbmFtZSxcbiAgICBldmVudDogQy5FVkVOVC5SRVNQT05TRV9USU1FT1VULFxuICAgIHRpbWVvdXQ6IHRoaXMuX29wdGlvbnMucnBjUmVzcG9uc2VUaW1lb3V0LFxuICAgIGNhbGxiYWNrOiB0aGlzLmVycm9yLmJpbmQodGhpcylcbiAgfSk7XG59O1xuXG4vKipcbiAqIENhbGxlZCBvbmNlIGFuIGFjayBtZXNzYWdlIGlzIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlclxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5ScGMucHJvdG90eXBlLmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fYWNrVGltZW91dFJlZ2lzdHJ5LnJlbW92ZSh7XG4gICAgYWNrSWQ6IHRoaXMuX2Fja1RpbWVvdXRcbiAgfSk7XG59O1xuXG4vKipcbiAqIENhbGxlZCBvbmNlIGEgcmVzcG9uc2UgbWVzc2FnZSBpcyByZWNlaXZlZCBmcm9tIHRoZSBzZXJ2ZXIuXG4gKiBDb252ZXJ0cyB0aGUgdHlwZWQgZGF0YSBhbmQgY29tcGxldGVzIHRoZSByZXF1ZXN0XG4gKlxuICogQHBhcmFtICAge1N0cmluZ30gZGF0YSB0eXBlZCB2YWx1ZVxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5ScGMucHJvdG90eXBlLnJlc3BvbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB2YXIgY29udmVydGVkRGF0YSA9IG1lc3NhZ2VQYXJzZXIuY29udmVydFR5cGVkKGRhdGEsIHRoaXMuX2NsaWVudCk7XG4gIHRoaXMuX2NhbGxiYWNrKG51bGwsIGNvbnZlcnRlZERhdGEpO1xuICB0aGlzLl9jb21wbGV0ZSgpO1xufTtcblxuLyoqXG4gKiBDYWxsYmFjayBmb3IgZXJyb3IgbWVzc2FnZXMgcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyLiBPbmNlXG4gKiBhbiBlcnJvciBpcyByZWNlaXZlZCB0aGUgcmVxdWVzdCBpcyBjb25zaWRlcmVkIGNvbXBsZXRlZC4gRXZlblxuICogaWYgYSByZXNwb25zZSBhcnJpdmVzIGxhdGVyIG9uIGl0IHdpbGwgYmUgaWdub3JlZCAvIGNhdXNlIGFuXG4gKiBVTlNPTElDSVRFRF9NRVNTQUdFIGVycm9yXG4gKlxuICogQHBhcmFtICAge1N0cmluZ30gZXJyb3JNc2cgQFRPRE8gc2hvdWxkIGJlIENPREUgYW5kIG1lc3NhZ2VcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuUnBjLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uICh0aW1lb3V0KSB7XG4gIHRoaXMuX2NhbGxiYWNrKHRpbWVvdXQuZXZlbnQgfHwgdGltZW91dCk7XG4gIHRoaXMuX2NvbXBsZXRlKCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCBhZnRlciBlaXRoZXIgYW4gZXJyb3Igb3IgYSByZXNwb25zZVxuICogd2FzIHJlY2VpdmVkXG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5ScGMucHJvdG90eXBlLl9jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fYWNrVGltZW91dFJlZ2lzdHJ5LnJlbW92ZSh7XG4gICAgYWNrSWQ6IHRoaXMuX2Fja1RpbWVvdXRcbiAgfSk7XG4gIHRoaXMuX2Fja1RpbWVvdXRSZWdpc3RyeS5yZW1vdmUoe1xuICAgIGFja0lkOiB0aGlzLl9yZXNwb25zZVRpbWVvdXRcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJwYztcblxufSx7XCIuLi9jb25zdGFudHMvY29uc3RhbnRzXCI6MTEsXCIuLi9tZXNzYWdlL21lc3NhZ2UtcGFyc2VyXCI6MTd9XSwyNzpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBDID0gX2RlcmVxXygnLi4vY29uc3RhbnRzL2NvbnN0YW50cycpO1xudmFyIEV2ZW50RW1pdHRlciA9IF9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyMicpO1xuXG4vKipcbiAqIFN1YnNjcmlwdGlvbnMgdG8gZXZlbnRzIGFyZSBpbiBhIHBlbmRpbmcgc3RhdGUgdW50aWwgZGVlcHN0cmVhbSBhY2tub3dsZWRnZXNcbiAqIHRoZW0uIFRoaXMgaXMgYSBwYXR0ZXJuIHRoYXQncyB1c2VkIGJ5IG51bWVyb3VyIGNsYXNzZXMuIFRoaXMgcmVnaXN0cnkgYWltc1xuICogdG8gY2VudHJhbGlzZSB0aGUgZnVuY3Rpb25hbGl0eSBuZWNlc3NhcnkgdG8ga2VlcCB0cmFjayBvZiBzdWJzY3JpcHRpb25zIGFuZFxuICogdGhlaXIgcmVzcGVjdGl2ZSB0aW1lb3V0cy5cbiAqXG4gKiBAcGFyYW0ge0NsaWVudH0gY2xpZW50ICAgICAgICAgIFRoZSBkZWVwc3RyZWFtIGNsaWVudFxuICogQHBhcmFtIHtTdHJpbmd9IHRvcGljICAgICAgICAgICBDb25zdGFudC4gT25lIG9mIEMuVE9QSUNcbiAqIEBwYXJhbSB7TnVtYmVyfSB0aW1lb3V0RHVyYXRpb24gVGhlIGR1cmF0aW9uIG9mIHRoZSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kc1xuICpcbiAqIEBleHRlbmRzIHtFdmVudEVtaXR0ZXJ9XG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmFyIEFja1RpbWVvdXRSZWdpc3RyeSA9IGZ1bmN0aW9uIEFja1RpbWVvdXRSZWdpc3RyeShjbGllbnQsIG9wdGlvbnMpIHtcbiAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gIHRoaXMuX2NsaWVudCA9IGNsaWVudDtcbiAgdGhpcy5fcmVnaXN0ZXIgPSB7fTtcbiAgdGhpcy5fY291bnRlciA9IDE7XG4gIGNsaWVudC5vbignY29ubmVjdGlvblN0YXRlQ2hhbmdlZCcsIHRoaXMuX29uQ29ubmVjdGlvblN0YXRlQ2hhbmdlZC5iaW5kKHRoaXMpKTtcbn07XG5cbkV2ZW50RW1pdHRlcihBY2tUaW1lb3V0UmVnaXN0cnkucHJvdG90eXBlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4vKipcbiAqIEFkZCBhbiBlbnRyeVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIEFuIGlkZW50aWZpZXIgZm9yIHRoZSBzdWJzY3JpcHRpb24sIGUuZy4gYSByZWNvcmQgbmFtZSBvciBhbiBldmVudCBuYW1lLlxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSB0aW1lb3V0IGlkZW50aWZpZXJcbiAqL1xuQWNrVGltZW91dFJlZ2lzdHJ5LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodGltZW91dCkge1xuICB2YXIgdGltZW91dER1cmF0aW9uID0gdGltZW91dC50aW1lb3V0IHx8IHRoaXMuX29wdGlvbnMuc3Vic2NyaXB0aW9uVGltZW91dDtcblxuICBpZiAodGhpcy5fY2xpZW50LmdldENvbm5lY3Rpb25TdGF0ZSgpICE9PSBDLkNPTk5FQ1RJT05fU1RBVEUuT1BFTiB8fCB0aW1lb3V0RHVyYXRpb24gPCAxKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgdGhpcy5yZW1vdmUodGltZW91dCk7XG4gIHRpbWVvdXQuYWNrSWQgPSB0aGlzLl9jb3VudGVyKys7XG4gIHRpbWVvdXQuZXZlbnQgPSB0aW1lb3V0LmV2ZW50IHx8IEMuRVZFTlQuQUNLX1RJTUVPVVQ7XG4gIHRpbWVvdXQuX190aW1lb3V0ID0gc2V0VGltZW91dCh0aGlzLl9vblRpbWVvdXQuYmluZCh0aGlzLCB0aW1lb3V0KSwgdGltZW91dER1cmF0aW9uKTtcbiAgdGhpcy5fcmVnaXN0ZXJbdGhpcy5fZ2V0VW5pcXVlTmFtZSh0aW1lb3V0KV0gPSB0aW1lb3V0O1xuICByZXR1cm4gdGltZW91dC5hY2tJZDtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGVudHJ5XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgQW4gaWRlbnRpZmllciBmb3IgdGhlIHN1YnNjcmlwdGlvbiwgZS5nLiBhIHJlY29yZCBuYW1lIG9yIGFuIGV2ZW50IG5hbWUuXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkFja1RpbWVvdXRSZWdpc3RyeS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKHRpbWVvdXQpIHtcbiAgaWYgKHRpbWVvdXQuYWNrSWQpIHtcbiAgICBmb3IgKHZhciB1bmlxdWVOYW1lIGluIHRoaXMuX3JlZ2lzdGVyKSB7XG4gICAgICBpZiAodGltZW91dC5hY2tJZCA9PT0gdGhpcy5fcmVnaXN0ZXJbdW5pcXVlTmFtZV0uYWNrSWQpIHtcbiAgICAgICAgdGhpcy5jbGVhcih7XG4gICAgICAgICAgdG9waWM6IHRoaXMuX3JlZ2lzdGVyW3VuaXF1ZU5hbWVdLnRvcGljLFxuICAgICAgICAgIGFjdGlvbjogdGhpcy5fcmVnaXN0ZXJbdW5pcXVlTmFtZV0uYWN0aW9uLFxuICAgICAgICAgIGRhdGE6IFt0aGlzLl9yZWdpc3Rlclt1bmlxdWVOYW1lXS5uYW1lXVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAodGhpcy5fcmVnaXN0ZXJbdGhpcy5fZ2V0VW5pcXVlTmFtZSh0aW1lb3V0KV0pIHtcbiAgICB0aGlzLmNsZWFyKHtcbiAgICAgIHRvcGljOiB0aW1lb3V0LnRvcGljLFxuICAgICAgYWN0aW9uOiB0aW1lb3V0LmFjdGlvbixcbiAgICAgIGRhdGE6IFt0aW1lb3V0Lm5hbWVdXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogUHJvY2Vzc2VzIGFuIGluY29taW5nIEFDSy1tZXNzYWdlIGFuZCByZW1vdmVzIHRoZSBjb3JyZXNwb25kaW5nIHN1YnNjcmlwdGlvblxuICpcbiAqIEBwYXJhbSAgIHtPYmplY3R9IG1lc3NhZ2UgQSBwYXJzZWQgZGVlcHN0cmVhbSBBQ0sgbWVzc2FnZVxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5BY2tUaW1lb3V0UmVnaXN0cnkucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgdmFyIHVuaXF1ZU5hbWUgPSB2b2lkIDA7XG4gIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gQy5BQ1RJT05TLkFDSyAmJiBtZXNzYWdlLmRhdGEubGVuZ3RoID4gMSkge1xuICAgIHVuaXF1ZU5hbWUgPSBtZXNzYWdlLnRvcGljICsgbWVzc2FnZS5kYXRhWzBdICsgKG1lc3NhZ2UuZGF0YVsxXSA/IG1lc3NhZ2UuZGF0YVsxXSA6ICcnKTtcbiAgfSBlbHNlIHtcbiAgICB1bmlxdWVOYW1lID0gbWVzc2FnZS50b3BpYyArIG1lc3NhZ2UuYWN0aW9uICsgbWVzc2FnZS5kYXRhWzBdO1xuICB9XG5cbiAgaWYgKHRoaXMuX3JlZ2lzdGVyW3VuaXF1ZU5hbWVdKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3JlZ2lzdGVyW3VuaXF1ZU5hbWVdLl9fdGltZW91dCk7XG4gIH1cblxuICBkZWxldGUgdGhpcy5fcmVnaXN0ZXJbdW5pcXVlTmFtZV07XG59O1xuXG4vKipcbiAqIFdpbGwgYmUgaW52b2tlZCBpZiB0aGUgdGltZW91dCBoYXMgb2NjdXJlZCBiZWZvcmUgdGhlIGFjayBtZXNzYWdlIHdhcyByZWNlaXZlZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBuYW1lIFRoZSB0aW1lb3V0IG9iamVjdCByZWdpc3RlcmVkXG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5BY2tUaW1lb3V0UmVnaXN0cnkucHJvdG90eXBlLl9vblRpbWVvdXQgPSBmdW5jdGlvbiAodGltZW91dCkge1xuICBkZWxldGUgdGhpcy5fcmVnaXN0ZXJbdGhpcy5fZ2V0VW5pcXVlTmFtZSh0aW1lb3V0KV07XG5cbiAgaWYgKHRpbWVvdXQuY2FsbGJhY2spIHtcbiAgICBkZWxldGUgdGltZW91dC5fX3RpbWVvdXQ7XG4gICAgZGVsZXRlIHRpbWVvdXQudGltZW91dDtcbiAgICB0aW1lb3V0LmNhbGxiYWNrKHRpbWVvdXQpO1xuICB9IGVsc2Uge1xuICAgIHZhciBtc2cgPSAnTm8gQUNLIG1lc3NhZ2UgcmVjZWl2ZWQgaW4gdGltZScgKyAodGltZW91dC5uYW1lID8gJyBmb3IgJyArIHRpbWVvdXQubmFtZSA6ICcnKTtcbiAgICB0aGlzLl9jbGllbnQuXyRvbkVycm9yKHRpbWVvdXQudG9waWMsIHRpbWVvdXQuZXZlbnQsIG1zZyk7XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHVuaXF1ZSBuYW1lIGZyb20gdGhlIHRpbWVvdXRcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkFja1RpbWVvdXRSZWdpc3RyeS5wcm90b3R5cGUuX2dldFVuaXF1ZU5hbWUgPSBmdW5jdGlvbiAodGltZW91dCkge1xuICByZXR1cm4gdGltZW91dC50b3BpYyArIHRpbWVvdXQuYWN0aW9uICsgKHRpbWVvdXQubmFtZSA/IHRpbWVvdXQubmFtZSA6ICcnKTtcbn07XG5cbi8qKlxuICogUmVtb3RlIGFsbCB0aW1lb3V0cyB3aGVuIGNvbm5lY3Rpb24gZGlzY29ubmVjdHNcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkFja1RpbWVvdXRSZWdpc3RyeS5wcm90b3R5cGUuX29uQ29ubmVjdGlvblN0YXRlQ2hhbmdlZCA9IGZ1bmN0aW9uIChjb25uZWN0aW9uU3RhdGUpIHtcbiAgaWYgKGNvbm5lY3Rpb25TdGF0ZSAhPT0gQy5DT05ORUNUSU9OX1NUQVRFLk9QRU4pIHtcbiAgICBmb3IgKHZhciB1bmlxdWVOYW1lIGluIHRoaXMuX3JlZ2lzdGVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fcmVnaXN0ZXJbdW5pcXVlTmFtZV0uX190aW1lb3V0KTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQWNrVGltZW91dFJlZ2lzdHJ5O1xuXG59LHtcIi4uL2NvbnN0YW50cy9jb25zdGFudHNcIjoxMSxcImNvbXBvbmVudC1lbWl0dGVyMlwiOjF9XSwyODpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBDID0gX2RlcmVxXygnLi4vY29uc3RhbnRzL2NvbnN0YW50cycpO1xudmFyIFJlc3Vic2NyaWJlTm90aWZpZXIgPSBfZGVyZXFfKCcuL3Jlc3Vic2NyaWJlLW5vdGlmaWVyJyk7XG5cbi8qXG4gKiBDcmVhdGVzIGEgbGlzdGVuZXIgaW5zdGFuY2Ugd2hpY2ggaXMgdXNlZGJ5IGRlZXBzdHJlYW0gUmVjb3JkcyBhbmQgRXZlbnRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0b3BpYyAgICAgICAgICAgICAgICAgT25lIG9mIENPTlNUQU5UUy5UT1BJQ1xuICogQHBhcmFtIHtTdHJpbmd9IHBhdHRlcm4gICAgICAgICAgICAgIEEgcGF0dGVybiB0aGF0IGNhbiBiZSBjb21waWxlZCB2aWEgbmV3IFJlZ0V4cChwYXR0ZXJuKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgICAgICAgICAgIFRoZSBmdW5jdGlvbiB3aGljaCBpcyBjYWxsZWQgd2hlbiBwYXR0ZXJuIHdhcyBmb3VuZCBhbmRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkXG4gKiBAcGFyYW0ge0Nvbm5lY3Rpb259IENvbm5lY3Rpb24gICAgICAgVGhlIGluc3RhbmNlIG9mIHRoZSBzZXJ2ZXIgY29ubmVjdGlvblxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgICAgICAgICAgICAgIERlZXBzdHJlYW0gb3B0aW9uc1xuICogQHBhcmFtIHtDbGllbnR9IGNsaWVudCAgICAgICAgICAgICAgIGRlZXBzdHJlYW0uaW8gY2xpZW50XG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZhciBMaXN0ZW5lciA9IGZ1bmN0aW9uIExpc3RlbmVyKHRvcGljLCBwYXR0ZXJuLCBjYWxsYmFjaywgb3B0aW9ucywgY2xpZW50LCBjb25uZWN0aW9uKSB7XG4gIHRoaXMuX3RvcGljID0gdG9waWM7XG4gIHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG4gIHRoaXMuX3BhdHRlcm4gPSBwYXR0ZXJuO1xuICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5fY2xpZW50ID0gY2xpZW50O1xuICB0aGlzLl9jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcbiAgdGhpcy5fYWNrVGltZW91dFJlZ2lzdHJ5ID0gY2xpZW50Ll8kZ2V0QWNrVGltZW91dFJlZ2lzdHJ5KCk7XG4gIHRoaXMuX2Fja1RpbWVvdXRSZWdpc3RyeS5hZGQoe1xuICAgIHRvcGljOiB0aGlzLl90b3BpYyxcbiAgICBuYW1lOiBwYXR0ZXJuLFxuICAgIGFjdGlvbjogQy5BQ1RJT05TLkxJU1RFTlxuICB9KTtcblxuICB0aGlzLl9yZXN1YnNjcmliZU5vdGlmaWVyID0gbmV3IFJlc3Vic2NyaWJlTm90aWZpZXIoY2xpZW50LCB0aGlzLl9zZW5kTGlzdGVuLmJpbmQodGhpcykpO1xuICB0aGlzLl9zZW5kTGlzdGVuKCk7XG4gIHRoaXMuZGVzdHJveVBlbmRpbmcgPSBmYWxzZTtcbn07XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5zZW5kRGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5kZXN0cm95UGVuZGluZyA9IHRydWU7XG4gIHRoaXMuX2Nvbm5lY3Rpb24uc2VuZE1zZyh0aGlzLl90b3BpYywgQy5BQ1RJT05TLlVOTElTVEVOLCBbdGhpcy5fcGF0dGVybl0pO1xuICB0aGlzLl9yZXN1YnNjcmliZU5vdGlmaWVyLmRlc3Ryb3koKTtcbn07XG5cbi8qXG4gKiBSZXNldHMgaW50ZXJuYWwgcHJvcGVydGllcy4gSXMgY2FsbGVkIHdoZW4gcHJvdmlkZXIgY2FscyB1bmxpc3Rlbi5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuTGlzdGVuZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX2NhbGxiYWNrID0gbnVsbDtcbiAgdGhpcy5fcGF0dGVybiA9IG51bGw7XG4gIHRoaXMuX2NsaWVudCA9IG51bGw7XG4gIHRoaXMuX2Nvbm5lY3Rpb24gPSBudWxsO1xufTtcblxuLypcbiAqIEFjY2VwdGluZyBhIGxpc3RlbmVyIHJlcXVlc3QgaW5mb3JtcyBkZWVwc3RyZWFtIHRoYXQgdGhlIGN1cnJlbnQgcHJvdmlkZXIgaXMgd2lsbGluZyB0b1xuICogcHJvdmlkZSB0aGUgcmVjb3JkIG9yIGV2ZW50IG1hdGNoaW5nIHRoZSBzdWJzY3JpcHRpb25OYW1lIC4gVGhpcyB3aWxsIGVzdGFibGlzaCB0aGUgY3VycmVudFxuICogcHJvdmlkZXIgYXMgdGhlIG9ubHkgcHVibGlzaGVyIGZvciB0aGUgYWN0dWFsIHN1YnNjcmlwdGlvbiB3aXRoIHRoZSBkZWVwc3RyZWFtIGNsdXN0ZXIuXG4gKiBFaXRoZXIgYWNjZXB0IG9yIHJlamVjdCBuZWVkcyB0byBiZSBjYWxsZWQgYnkgdGhlIGxpc3RlbmVyLCBvdGhlcndpc2UgaXQgcHJpbnRzIG91dCBhXG4gKiBkZXByZWNhdGVkIHdhcm5pbmcuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkxpc3RlbmVyLnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbiAobmFtZSkge1xuICB0aGlzLl9jb25uZWN0aW9uLnNlbmRNc2codGhpcy5fdG9waWMsIEMuQUNUSU9OUy5MSVNURU5fQUNDRVBULCBbdGhpcy5fcGF0dGVybiwgbmFtZV0pO1xufTtcblxuLypcbiAqIFJlamVjdGluZyBhIGxpc3RlbmVyIHJlcXVlc3QgaW5mb3JtcyBkZWVwc3RyZWFtIHRoYXQgdGhlIGN1cnJlbnQgcHJvdmlkZXIgaXMgbm90IHdpbGxpbmdcbiAqIHRvIHByb3ZpZGUgdGhlIHJlY29yZCBvciBldmVudCBtYXRjaGluZyB0aGUgc3Vic2NyaXB0aW9uTmFtZSAuIFRoaXMgd2lsbCByZXN1bHQgaW4gZGVlcHN0cmVhbVxuICogcmVxdWVzdGluZyBhbm90aGVyIHByb3ZpZGVyIHRvIGRvIHNvIGluc3RlYWQuIElmIG5vIG90aGVyIHByb3ZpZGVyIGFjY2VwdHMgb3IgZXhpc3RzLCB0aGVcbiAqIHJlY29yZCB3aWxsIHJlbWFpbiB1bnByb3ZpZGVkLlxuICogRWl0aGVyIGFjY2VwdCBvciByZWplY3QgbmVlZHMgdG8gYmUgY2FsbGVkIGJ5IHRoZSBsaXN0ZW5lciwgb3RoZXJ3aXNlIGl0IHByaW50cyBvdXQgYVxuICogZGVwcmVjYXRlZCB3YXJuaW5nLlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5MaXN0ZW5lci5wcm90b3R5cGUucmVqZWN0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdGhpcy5fY29ubmVjdGlvbi5zZW5kTXNnKHRoaXMuX3RvcGljLCBDLkFDVElPTlMuTElTVEVOX1JFSkVDVCwgW3RoaXMuX3BhdHRlcm4sIG5hbWVdKTtcbn07XG5cbi8qXG4gKiBXcmFwcyBhY2NlcHQgYW5kIHJlamVjdCBhcyBhbiBhcmd1bWVudCBmb3IgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5MaXN0ZW5lci5wcm90b3R5cGUuX2NyZWF0ZUNhbGxiYWNrUmVzcG9uc2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICByZXR1cm4ge1xuICAgIGFjY2VwdDogdGhpcy5hY2NlcHQuYmluZCh0aGlzLCBtZXNzYWdlLmRhdGFbMV0pLFxuICAgIHJlamVjdDogdGhpcy5yZWplY3QuYmluZCh0aGlzLCBtZXNzYWdlLmRhdGFbMV0pXG4gIH07XG59O1xuXG4vKlxuICogSGFuZGxlcyB0aGUgaW5jb21taW5nIG1lc3NhZ2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5MaXN0ZW5lci5wcm90b3R5cGUuXyRvbk1lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5BQ0spIHtcbiAgICB0aGlzLl9hY2tUaW1lb3V0UmVnaXN0cnkuY2xlYXIobWVzc2FnZSk7XG4gIH0gZWxzZSBpZiAobWVzc2FnZS5hY3Rpb24gPT09IEMuQUNUSU9OUy5TVUJTQ1JJUFRJT05fRk9SX1BBVFRFUk5fRk9VTkQpIHtcbiAgICB0aGlzLl9jYWxsYmFjayhtZXNzYWdlLmRhdGFbMV0sIHRydWUsIHRoaXMuX2NyZWF0ZUNhbGxiYWNrUmVzcG9uc2UobWVzc2FnZSkpO1xuICB9IGVsc2UgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBDLkFDVElPTlMuU1VCU0NSSVBUSU9OX0ZPUl9QQVRURVJOX1JFTU9WRUQpIHtcbiAgICB0aGlzLl9jYWxsYmFjayhtZXNzYWdlLmRhdGFbMV0sIGZhbHNlKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9jbGllbnQuXyRvbkVycm9yKHRoaXMuX3RvcGljLCBDLkVWRU5ULlVOU09MSUNJVEVEX01FU1NBR0UsIG1lc3NhZ2UuZGF0YVswXSArICd8JyArIG1lc3NhZ2UuZGF0YVsxXSk7XG4gIH1cbn07XG5cbi8qXG4gKiBTZW5kcyBhIEMuQUNUSU9OUy5MSVNURU4gdG8gZGVlcHN0cmVhbS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbkxpc3RlbmVyLnByb3RvdHlwZS5fc2VuZExpc3RlbiA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fY29ubmVjdGlvbi5zZW5kTXNnKHRoaXMuX3RvcGljLCBDLkFDVElPTlMuTElTVEVOLCBbdGhpcy5fcGF0dGVybl0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMaXN0ZW5lcjtcblxufSx7XCIuLi9jb25zdGFudHMvY29uc3RhbnRzXCI6MTEsXCIuL3Jlc3Vic2NyaWJlLW5vdGlmaWVyXCI6Mjl9XSwyOTpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBDID0gX2RlcmVxXygnLi4vY29uc3RhbnRzL2NvbnN0YW50cycpO1xuXG4vKipcbiAqIE1ha2VzIHN1cmUgdGhhdCBhbGwgZnVuY3Rpb25hbGl0eSBpcyByZXN1YnNjcmliZWQgb24gcmVjb25uZWN0LiBTdWJzY3JpcHRpb24gaXMgY2FsbGVkXG4gKiB3aGVuIHRoZSBjb25uZWN0aW9uIGRyb3BzIC0gd2hpY2ggc2VlbXMgY291bnRlcmludHVpdGl2ZSwgYnV0IGluIGZhY3QganVzdCBtZWFuc1xuICogdGhhdCB0aGUgcmUtc3Vic2NyaXB0aW9uIG1lc3NhZ2Ugd2lsbCBiZSBhZGRlZCB0byB0aGUgcXVldWUgb2YgbWVzc2FnZXMgdGhhdFxuICogbmVlZCByZS1zZW5kaW5nIGFzIHNvb24gYXMgdGhlIGNvbm5lY3Rpb24gaXMgcmUtZXN0YWJsaXNoZWQuXG4gKlxuICogUmVzdWJzY3JpYmUgbG9naWMgc2hvdWxkIG9ubHkgb2NjdXIgb25jZSBwZXIgY29ubmVjdGlvbiBsb3NzXG4gKlxuICogQHBhcmFtIHtDbGllbnR9IGNsaWVudCAgICAgICAgICBUaGUgZGVlcHN0cmVhbSBjbGllbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlY29ubmVjdCAgICAgRnVuY3Rpb24gdG8gY2FsbCB0byBhbGxvdyByZXN1YnNjcmliaW5nXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZhciBSZXN1YnNjcmliZU5vdGlmaWVyID0gZnVuY3Rpb24gUmVzdWJzY3JpYmVOb3RpZmllcihjbGllbnQsIHJlc3Vic2NyaWJlKSB7XG4gIHRoaXMuX2NsaWVudCA9IGNsaWVudDtcbiAgdGhpcy5fcmVzdWJzY3JpYmUgPSByZXN1YnNjcmliZTtcblxuICB0aGlzLl9pc1JlY29ubmVjdGluZyA9IGZhbHNlO1xuICB0aGlzLl9jb25uZWN0aW9uU3RhdGVDaGFuZ2VIYW5kbGVyID0gdGhpcy5faGFuZGxlQ29ubmVjdGlvblN0YXRlQ2hhbmdlcy5iaW5kKHRoaXMpO1xuICB0aGlzLl9jbGllbnQub24oJ2Nvbm5lY3Rpb25TdGF0ZUNoYW5nZWQnLCB0aGlzLl9jb25uZWN0aW9uU3RhdGVDaGFuZ2VIYW5kbGVyKTtcbn07XG5cbi8qKlxuICogQ2FsbCB0aGlzIHdoZW5ldmVyIHRoaXMgZnVuY3Rpb25hbGl0eSBpcyBubyBsb25nZXIgbmVlZGVkIHRvIHJlbW92ZSBsaW5rc1xuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5SZXN1YnNjcmliZU5vdGlmaWVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9jbGllbnQucmVtb3ZlTGlzdGVuZXIoJ2Nvbm5lY3Rpb25TdGF0ZUNoYW5nZWQnLCB0aGlzLl9jb25uZWN0aW9uU3RhdGVDaGFuZ2VIYW5kbGVyKTtcbiAgdGhpcy5fY29ubmVjdGlvblN0YXRlQ2hhbmdlSGFuZGxlciA9IG51bGw7XG4gIHRoaXMuX2NsaWVudCA9IG51bGw7XG59O1xuXG4vKipcbiogQ2hlY2sgd2hlbmV2ZXIgdGhlIGNvbm5lY3Rpb24gc3RhdGUgY2hhbmdlcyBpZiBpdCBpcyBpbiByZWNvbm5lY3RpbmcgdG8gcmVzdWJzY3JpYmVcbiogQHByaXZhdGVcbiogQHJldHVybnMge3ZvaWR9XG4qL1xuUmVzdWJzY3JpYmVOb3RpZmllci5wcm90b3R5cGUuX2hhbmRsZUNvbm5lY3Rpb25TdGF0ZUNoYW5nZXMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IHRoaXMuX2NsaWVudC5nZXRDb25uZWN0aW9uU3RhdGUoKTtcblxuICBpZiAoc3RhdGUgPT09IEMuQ09OTkVDVElPTl9TVEFURS5SRUNPTk5FQ1RJTkcgJiYgdGhpcy5faXNSZWNvbm5lY3RpbmcgPT09IGZhbHNlKSB7XG4gICAgdGhpcy5faXNSZWNvbm5lY3RpbmcgPSB0cnVlO1xuICB9XG4gIGlmIChzdGF0ZSA9PT0gQy5DT05ORUNUSU9OX1NUQVRFLk9QRU4gJiYgdGhpcy5faXNSZWNvbm5lY3RpbmcgPT09IHRydWUpIHtcbiAgICB0aGlzLl9pc1JlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgIHRoaXMuX3Jlc3Vic2NyaWJlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVzdWJzY3JpYmVOb3RpZmllcjtcblxufSx7XCIuLi9jb25zdGFudHMvY29uc3RhbnRzXCI6MTF9XSwzMDpbZnVuY3Rpb24oX2RlcmVxXyxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBDID0gX2RlcmVxXygnLi4vY29uc3RhbnRzL2NvbnN0YW50cycpO1xudmFyIFJlc3Vic2NyaWJlTm90aWZpZXIgPSBfZGVyZXFfKCcuL3Jlc3Vic2NyaWJlLW5vdGlmaWVyJyk7XG5cbi8qKlxuICogUHJvdmlkZXMgYSBzY2FmZm9sZCBmb3Igc3Vic2NyaXB0aW9ubGVzcyByZXF1ZXN0cyB0byBkZWVwc3RyZWFtLCBzdWNoIGFzIHRoZSBTTkFQU0hPVFxuICogYW5kIEhBUyBmdW5jdGlvbmFsaXR5LiBUaGUgU2luZ2xlTm90aWZpZXIgbXVsdGlwbGV4ZXMgYWxsIHRoZSBjbGllbnQgcmVxdWVzdHMgc29cbiAqIHRoYXQgdGhleSBjYW4gY2FuIGJlIG5vdGlmaWVkIGF0IG9uY2UsIGFuZCBhbHNvIGluY2x1ZGVzIHJlY29ubmVjdGlvbiBmdW5jaW9uYWxpdHlcbiAqIGluY2FzZSB0aGUgY29ubmVjdGlvbiBkcm9wcy5cbiAqXG4gKiBAcGFyYW0ge0NsaWVudH0gY2xpZW50ICAgICAgICAgIFRoZSBkZWVwc3RyZWFtIGNsaWVudFxuICogQHBhcmFtIHtDb25uZWN0aW9ufSBjb25uZWN0aW9uICBUaGUgZGVlcHN0cmVhbSBjb25uZWN0aW9uXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9waWMgICAgICAgICAgIENvbnN0YW50LiBPbmUgb2YgQy5UT1BJQ1xuICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbiAgICAgICAgICBDb25zdGFudC4gT25lIG9mIEMuQUNUSU9OU1xuICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVvdXREdXJhdGlvbiBUaGUgZHVyYXRpb24gb2YgdGhlIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZhciBTaW5nbGVOb3RpZmllciA9IGZ1bmN0aW9uIFNpbmdsZU5vdGlmaWVyKGNsaWVudCwgY29ubmVjdGlvbiwgdG9waWMsIGFjdGlvbiwgdGltZW91dER1cmF0aW9uKSB7XG4gIHRoaXMuX2NsaWVudCA9IGNsaWVudDtcbiAgdGhpcy5fY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XG4gIHRoaXMuX3RvcGljID0gdG9waWM7XG4gIHRoaXMuX2FjdGlvbiA9IGFjdGlvbjtcbiAgdGhpcy5fdGltZW91dER1cmF0aW9uID0gdGltZW91dER1cmF0aW9uO1xuICB0aGlzLl9yZXF1ZXN0cyA9IHt9O1xuICB0aGlzLl9hY2tUaW1lb3V0UmVnaXN0cnkgPSBjbGllbnQuXyRnZXRBY2tUaW1lb3V0UmVnaXN0cnkoKTtcbiAgdGhpcy5fcmVzdWJzY3JpYmVOb3RpZmllciA9IG5ldyBSZXN1YnNjcmliZU5vdGlmaWVyKHRoaXMuX2NsaWVudCwgdGhpcy5fcmVzZW5kUmVxdWVzdHMuYmluZCh0aGlzKSk7XG4gIHRoaXMuX29uUmVzcG9uc2VUaW1lb3V0ID0gdGhpcy5fb25SZXNwb25zZVRpbWVvdXQuYmluZCh0aGlzKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlcmUgaXMgYSByZXF1ZXN0IHBlbmRpbmcgd2l0aCBhIHNwZWNpZmllZCBuYW1lXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgQW4gaWRlbnRpZmllciBmb3IgdGhlIHJlcXVlc3QsIGUuZy4gYSByZWNvcmQgbmFtZVxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5TaW5nbGVOb3RpZmllci5wcm90b3R5cGUuaGFzUmVxdWVzdCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiAhIXRoaXMuX3JlcXVlc3RzW25hbWVdO1xufTtcblxuLyoqXG4gKiBBZGQgYSByZXF1ZXN0LiBJZiBvbmUgaGFzIGFscmVhZHkgYmVlbiBtYWRlIGl0IHdpbGwgc2tpcCB0aGUgc2VydmVyIHJlcXVlc3RcbiAqIGFuZCBtdWx0aXBsZXggdGhlIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgQW4gaWRlbnRpZmllciBmb3IgdGhlIHJlcXVlc3QsIGUuZy4gYSByZWNvcmQgbmFtZVxuXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblNpbmdsZU5vdGlmaWVyLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrKSB7XG4gIGlmICghdGhpcy5fcmVxdWVzdHNbbmFtZV0pIHtcbiAgICB0aGlzLl9yZXF1ZXN0c1tuYW1lXSA9IFtdO1xuICAgIHRoaXMuX2Nvbm5lY3Rpb24uc2VuZE1zZyh0aGlzLl90b3BpYywgdGhpcy5fYWN0aW9uLCBbbmFtZV0pO1xuICB9XG5cbiAgdmFyIGFja0lkID0gdGhpcy5fYWNrVGltZW91dFJlZ2lzdHJ5LmFkZCh7XG4gICAgdG9waWM6IHRoaXMuX3RvcGljLFxuICAgIGV2ZW50OiBDLkVWRU5ULlJFU1BPTlNFX1RJTUVPVVQsXG4gICAgbmFtZTogbmFtZSxcbiAgICBhY3Rpb246IHRoaXMuX2FjdGlvbixcbiAgICB0aW1lb3V0OiB0aGlzLl90aW1lb3V0RHVyYXRpb24sXG4gICAgY2FsbGJhY2s6IHRoaXMuX29uUmVzcG9uc2VUaW1lb3V0XG4gIH0pO1xuICB0aGlzLl9yZXF1ZXN0c1tuYW1lXS5wdXNoKHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhY2tJZDogYWNrSWQgfSk7XG59O1xuXG4vKipcbiAqIFByb2Nlc3MgYSByZXNwb25zZSBmb3IgYSByZXF1ZXN0LiBUaGlzIGhhcyBxdWl0ZSBhIGZsZXhpYmxlIEFQSSBzaW5jZSBjYWxsYmFjayBmdW5jdGlvbnNcbiAqIGRpZmZlciBncmVhdGx5IGFuZCBoZWxwcyBtYXhpbWlzZSByZXVzZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBBbiBpZGVudGlmaWVyIGZvciB0aGUgcmVxdWVzdCwgZS5nLiBhIHJlY29yZCBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3IgRXJyb3IgbWVzc2FnZVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgSWYgc3VjY2Vzc2Z1bCwgdGhlIHJlc3BvbnNlIGRhdGFcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuU2luZ2xlTm90aWZpZXIucHJvdG90eXBlLnJlY2lldmUgPSBmdW5jdGlvbiAobmFtZSwgZXJyb3IsIGRhdGEpIHtcbiAgdmFyIGVudHJpZXMgPSB0aGlzLl9yZXF1ZXN0c1tuYW1lXTtcblxuICBpZiAoIWVudHJpZXMpIHtcbiAgICB0aGlzLl9jbGllbnQuXyRvbkVycm9yKHRoaXMuX3RvcGljLCBDLkVWRU5ULlVOU09MSUNJVEVEX01FU1NBR0UsICdubyBlbnRyeSBmb3IgJyArIG5hbWUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaV07XG4gICAgdGhpcy5fYWNrVGltZW91dFJlZ2lzdHJ5LnJlbW92ZSh7XG4gICAgICBhY2tJZDogZW50cnkuYWNrSWRcbiAgICB9KTtcbiAgICBlbnRyeS5jYWxsYmFjayhlcnJvciwgZGF0YSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX3JlcXVlc3RzW25hbWVdO1xufTtcblxuLyoqXG4gKiBXaWxsIGJlIGludm9rZWQgaWYgYSB0aW1lb3V0IG9jY3VycyBiZWZvcmUgYSByZXNwb25zZSBhcnJpdmVzIGZyb20gdGhlIHNlcnZlclxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIEFuIGlkZW50aWZpZXIgZm9yIHRoZSByZXF1ZXN0LCBlLmcuIGEgcmVjb3JkIG5hbWVcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cblNpbmdsZU5vdGlmaWVyLnByb3RvdHlwZS5fb25SZXNwb25zZVRpbWVvdXQgPSBmdW5jdGlvbiAodGltZW91dCkge1xuICB2YXIgbXNnID0gJ05vIHJlc3BvbnNlIHJlY2VpdmVkIGluIHRpbWUgZm9yICcgKyB0aGlzLl90b3BpYyArICd8JyArIHRoaXMuX2FjdGlvbiArICd8JyArIHRpbWVvdXQubmFtZTtcbiAgdGhpcy5fY2xpZW50Ll8kb25FcnJvcih0aGlzLl90b3BpYywgQy5FVkVOVC5SRVNQT05TRV9USU1FT1VULCBtc2cpO1xufTtcblxuLyoqXG4gKiBSZXNlbmRzIGFsbCB0aGUgcmVxdWVzdHMgb25jZSB0aGUgY29ubmVjdGlvbiBpcyBiYWNrIHVwXG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5TaW5nbGVOb3RpZmllci5wcm90b3R5cGUuX3Jlc2VuZFJlcXVlc3RzID0gZnVuY3Rpb24gKCkge1xuICBmb3IgKHZhciByZXF1ZXN0IGluIHRoaXMuX3JlcXVlc3RzKSB7XG4gICAgdGhpcy5fY29ubmVjdGlvbi5zZW5kTXNnKHRoaXMuX3RvcGljLCB0aGlzLl9hY3Rpb24sIFtyZXF1ZXN0XSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2luZ2xlTm90aWZpZXI7XG5cbn0se1wiLi4vY29uc3RhbnRzL2NvbnN0YW50c1wiOjExLFwiLi9yZXN1YnNjcmliZS1ub3RpZmllclwiOjI5fV0sMzE6W2Z1bmN0aW9uKF9kZXJlcV8sbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzKXtcbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIHZhbGlkLXR5cGVvZiAqL1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBDID0gX2RlcmVxXygnLi4vY29uc3RhbnRzL2NvbnN0YW50cycpO1xuXG4vKipcbiAqIEEgcmVndWxhciBleHByZXNzaW9uIHRoYXQgbWF0Y2hlcyB3aGl0ZXNwYWNlIG9uIGVpdGhlciBzaWRlLCBidXRcbiAqIG5vdCBpbiB0aGUgY2VudGVyIG9mIGEgc3RyaW5nXG4gKlxuICogQHR5cGUge1JlZ0V4cH1cbiAqL1xudmFyIFRSSU1fUkVHVUxBUl9FWFBSRVNTSU9OID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nO1xuXG4vKipcbiAqIFVzZWQgaW4gdHlwZW9mIGNvbXBhcmlzb25zXG4gKlxuICogQHR5cGUge1N0cmluZ31cbiAqL1xudmFyIE9CSkVDVCA9ICdvYmplY3QnO1xuXG4vKipcbiAqIFRydWUgaWYgZW52aXJvbm1lbnQgaXMgbm9kZSwgZmFsc2UgaWYgaXQncyBhIGJyb3dzZXJcbiAqIFRoaXMgc2VlbXMgc29tZXdoYXQgaW5lbGVnYW50LCBpZiBhbnlvbmUga25vd3MgYSBiZXR0ZXIgc29sdXRpb24sXG4gKiBsZXQncyBjaGFuZ2UgdGhpcyAobXVzdCBpZGVudGlmeSBicm93c2VyaWZ5J3MgcHNldWRvIG5vZGUgaW1wbGVtZW50YXRpb24gdGhvdWdoKVxuICpcbiAqIEBwdWJsaWNcbiAqIEB0eXBlIHtCb29sZWFufVxuICovXG5leHBvcnRzLmlzTm9kZSA9IHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IHByb2Nlc3NdJztcblxuLyoqXG4gKiBQcm92aWRlcyBhcyBzb29uIGFzIHBvc3NpYmxlIGFzeW5jIGV4ZWN1dGlvbiBpbiBhIGNyb3NzXG4gKiBwbGF0Zm9ybSB3YXlcbiAqXG4gKiBAcGFyYW0gICB7RnVuY3Rpb259IGZuIHRoZSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBpbiBhbiBhc3luY2hyb25vdXMgZmFzaGlvblxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnRzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZuKSB7XG4gIGlmIChleHBvcnRzLmlzTm9kZSkge1xuICAgIHByb2Nlc3MubmV4dFRpY2soZm4pO1xuICB9IGVsc2Uge1xuICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgd2hpdGVzcGFjZSBmcm9tIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSAgIHtTdHJpbmd9IGlucHV0U3RyaW5nXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge1N0cmluZ30gdHJpbW1lZFN0cmluZ1xuICovXG5leHBvcnRzLnRyaW0gPSBmdW5jdGlvbiAoaW5wdXRTdHJpbmcpIHtcbiAgaWYgKGlucHV0U3RyaW5nLnRyaW0pIHtcbiAgICByZXR1cm4gaW5wdXRTdHJpbmcudHJpbSgpO1xuICB9XG4gIHJldHVybiBpbnB1dFN0cmluZy5yZXBsYWNlKFRSSU1fUkVHVUxBUl9FWFBSRVNTSU9OLCAnJyk7XG59O1xuXG4vKipcbiAqIENvbXBhcmVzIHR3byBvYmplY3RzIGZvciBkZWVwIChyZWNvdXJzaXZlKSBlcXVhbGl0eVxuICpcbiAqIFRoaXMgdXNlZCB0byBiZSBhIHNpZ25pZmljYW50bHkgbW9yZSBjb21wbGV4IGN1c3RvbSBpbXBsZW1lbnRhdGlvbixcbiAqIGJ1dCBKU09OLnN0cmluZ2lmeSBoYXMgZ290dGVuIHNvIGZhc3QgdGhhdCBpdCBub3cgb3V0cGVyZm9ybXMgdGhlIGN1c3RvbVxuICogd2F5IGJ5IGEgZmFjdG9yIG9mIDEuNSB0byAzLlxuICpcbiAqIEluIElFMTEgLyBFZGdlIHRoZSBjdXN0b20gaW1wbGVtZW50YXRpb24gaXMgc3RpbGwgc2xpZ2h0bHkgZmFzdGVyLCBidXQgZm9yXG4gKiBjb25zaXN0ZW5jaWVzIHNha2UgYW5kIHRoZSB1cHNpZGVzIG9mIGxlYXZpbmcgZWRnZS1jYXNlIGhhbmRsaW5nIHRvIHRoZSBuYXRpdmVcbiAqIGJyb3dzZXIgLyBub2RlIGltcGxlbWVudGF0aW9uIHdlJ2xsIGdvIGZvciBKU09OLnN0cmluZ2lmeSBmcm9tIGhlcmUgb24uXG4gKlxuICogUGxlYXNlIGZpbmQgcGVyZm9ybWFuY2UgdGVzdCByZXN1bHRzIGhlcmVcbiAqXG4gKiBodHRwOi8vanNwZXJmLmNvbS9kZWVwLWVxdWFscy1jb2RlLXZzLWpzb25cbiAqXG4gKiBAcGFyYW0gICB7TWl4ZWR9IG9iakFcbiAqIEBwYXJhbSAgIHtNaXhlZH0gb2JqQlxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHtCb29sZWFufSBpc0VxdWFsXG4gKi9cbmV4cG9ydHMuZGVlcEVxdWFscyA9IGZ1bmN0aW9uIChvYmpBLCBvYmpCKSB7XG4gIGlmIChvYmpBID09PSBvYmpCKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoKHR5cGVvZiBvYmpBID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvYmpBKSkgIT09IE9CSkVDVCB8fCAodHlwZW9mIG9iakIgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG9iakIpKSAhPT0gT0JKRUNUKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iakEpID09PSBKU09OLnN0cmluZ2lmeShvYmpCKTtcbn07XG5cbi8qKlxuICogU2ltaWxhciB0byBkZWVwRXF1YWxzIGFib3ZlLCB0ZXN0cyBoYXZlIHNob3duIHRoYXQgSlNPTiBzdHJpbmdpZnkgb3V0cGVyZm9ybXMgYW55IGF0dGVtcHQgb2ZcbiAqIGEgY29kZSBiYXNlZCBpbXBsZW1lbnRhdGlvbiBieSA1MCUgLSAxMDAlIHdoaWxzdCBhbHNvIGhhbmRsaW5nIGVkZ2UtY2FzZXMgYW5kIGtlZXBpbmdcbiAqIGltcGxlbWVudGF0aW9uIGNvbXBsZXhpdHkgbG93LlxuICpcbiAqIElmIEVTNi83IGV2ZXIgZGVjaWRlcyB0byBpbXBsZW1lbnQgZGVlcCBjb3B5aW5nIG5hdGl2ZWx5ICh3aGF0IGhhcHBlbmVkIHRvIE9iamVjdC5jbG9uZT9cbiAqIHRoYXQgd2FzIGJyaWVmbHkgYSB0aGluZy4uLiksIGxldCdzIHN3aXRjaCBpdCBmb3IgdGhlIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbi4gRm9yIG5vdyB0aG91Z2gsXG4gKiBldmVuIE9iamVjdC5hc3NpZ24oe30sIG9iaikgb25seSBwcm92aWRlcyBhIHNoYWxsb3cgY29weS5cbiAqXG4gKiBQbGVhc2UgZmluZCBwZXJmb3JtYW5jZSB0ZXN0IHJlc3VsdHMgYmFja2luZyB0aGVzZSBzdGF0ZW1lbnRzIGhlcmU6XG4gKlxuICogaHR0cDovL2pzcGVyZi5jb20vb2JqZWN0LWRlZXAtY29weS1hc3NpZ25cbiAqXG4gKiBAcGFyYW0gICB7TWl4ZWR9IG9iaiB0aGUgb2JqZWN0IHRoYXQgc2hvdWxkIGJlIGNsb25lZFxuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHtNaXhlZH0gY2xvbmVcbiAqL1xuZXhwb3J0cy5kZWVwQ29weSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgaWYgKCh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvYmopKSA9PT0gT0JKRUNUKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn07XG5cbi8qKlxuICogQ29weSB0aGUgdG9wIGxldmVsIG9mIGl0ZW1zLCBidXQgZG8gbm90IGNvcHkgaXRzIGl0ZW1zIHJlY291cmlzdmVseS4gVGhpc1xuICogaXMgbXVjaCBxdWlja2VyIHRoYW4gZGVlcENvcHkgZG9lcyBub3QgZ3VhcmFudGVlIHRoZSBvYmplY3QgaXRlbXMgYXJlIG5ldy91bmlxdWUuXG4gKiBNYWlubHkgdXNlZCB0byBjaGFuZ2UgdGhlIHJlZmVyZW5jZSB0byB0aGUgYWN0dWFsIG9iamVjdCBpdHNlbGYsIGJ1dCBub3QgaXRzIGNoaWxkcmVuLlxuICpcbiAqIEBwYXJhbSAgIHtNaXhlZH0gb2JqIHRoZSBvYmplY3QgdGhhdCBzaG91bGQgY2xvbmVkXG4gKlxuICogQHB1YmxpY1xuICogQHJldHVybnMge01peGVkfSBjbG9uZVxuICovXG5leHBvcnRzLnNoYWxsb3dDb3B5ID0gZnVuY3Rpb24gKG9iaikge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iai5zbGljZSgwKTtcbiAgfSBlbHNlIGlmICgodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yob2JqKSkgPT09IE9CSkVDVCkge1xuICAgIHZhciBjb3B5ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB2YXIgcHJvcHMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvcHlbcHJvcHNbaV1dID0gb2JqW3Byb3BzW2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIGNvcHk7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn07XG5cbi8qKlxuICogU2V0IHRpbWVvdXQgdXRpbGl0eSB0aGF0IGFkZHMgc3VwcG9ydCBmb3IgZGlzYWJsaW5nIGEgdGltZW91dFxuICogYnkgcGFzc2luZyBudWxsXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgICAgICAgIHRoZSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIGFmdGVyIHRoZSBnaXZlbiB0aW1lXG4gKiBAcGFyYW0ge051bWJlcn0gICB0aW1lb3V0RHVyYXRpb24gdGhlIGR1cmF0aW9uIG9mIHRoZSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kc1xuICpcbiAqIEBwdWJsaWNcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRpbWVvdXRJZFxuICovXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIHRpbWVvdXREdXJhdGlvbikge1xuICBpZiAodGltZW91dER1cmF0aW9uICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoY2FsbGJhY2ssIHRpbWVvdXREdXJhdGlvbik7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcblxuLyoqXG4gKiBTZXQgSW50ZXJ2YWwgdXRpbGl0eSB0aGF0IGFkZHMgc3VwcG9ydCBmb3IgZGlzYWJsaW5nIGFuIGludGVydmFsXG4gKiBieSBwYXNzaW5nIG51bGxcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAgICAgICAgdGhlIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgdGhlIGdpdmVuIHRpbWVcbiAqIEBwYXJhbSB7TnVtYmVyfSAgIGludGVydmFsRHVyYXRpb24gdGhlIGR1cmF0aW9uIG9mIHRoZSBpbnRlcnZhbCBpbiBtaWxsaXNlY29uZHNcbiAqXG4gKiBAcHVibGljXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBpbnRlcnZhbElkXG4gKi9cbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGludGVydmFsRHVyYXRpb24pIHtcbiAgaWYgKGludGVydmFsRHVyYXRpb24gIT09IG51bGwpIHtcbiAgICByZXR1cm4gc2V0SW50ZXJ2YWwoY2FsbGJhY2ssIGludGVydmFsRHVyYXRpb24pO1xuICB9XG4gIHJldHVybiAtMTtcbn07XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBicmVhayB1cCBsb25nIHJ1bm5pbmcgb3BlcmF0aW9ucyBhbmQgcnVuIGEgY2FsbGJhY2sgZnVuY3Rpb24gaW1tZWRpYXRlbHlcbiAqIGFmdGVyIHRoZSBicm93c2VyIGhhcyBjb21wbGV0ZWQgb3RoZXIgb3BlcmF0aW9ucyBzdWNoIGFzIGV2ZW50cyBhbmQgZGlzcGxheSB1cGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrICAgICAgICB0aGUgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCBhZnRlciB0aGUgZ2l2ZW4gdGltZVxuICogQHBhcmFtIHsuLi4qfSAgICAgcGFyYW0xLCAuLi4sIHBhcmFtTiBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgd2hpY2ggYXJlIHBhc3NlZCB0aHJvdWdoIHRvIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2tcbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydHMucmVxdWVzdElkbGVDYWxsYmFjayA9ICFleHBvcnRzLmlzTm9kZSAmJiB3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjayAmJiB3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjay5iaW5kKHdpbmRvdykgfHwgZnVuY3Rpb24gKGNiKSB7XG4gIHZhciBzdGFydCA9IERhdGUubm93KCk7XG4gIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBjYih7XG4gICAgICBkaWRUaW1lb3V0OiBmYWxzZSxcbiAgICAgIHRpbWVSZW1haW5pbmc6IGZ1bmN0aW9uIHRpbWVSZW1haW5pbmcoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCA1MCAtIChEYXRlLm5vdygpIC0gc3RhcnQpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSwgMSk7XG59O1xuXG5leHBvcnRzLmNhbmNlbElkbGVDYWxsYmFjayA9ICFleHBvcnRzLmlzTm9kZSAmJiB3aW5kb3cuY2FuY2VsSWRsZUNhbGxiYWNrICYmIHdpbmRvdy5jYW5jZWxJZGxlQ2FsbGJhY2suYmluZCh3aW5kb3cpIHx8IGZ1bmN0aW9uIChpZCkge1xuICBjbGVhclRpbWVvdXQoaWQpO1xufTtcblxuLyoqXG4gKiBVc2VkIHRvIHNlZSBpZiBhIHByb3RvY29sIGlzIHNwZWNpZmllZCB3aXRoaW4gdGhlIHVybFxuICogQHR5cGUge1JlZ0V4cH1cbiAqL1xudmFyIGhhc1VybFByb3RvY29sID0gL153c3M6fF53czp8XlxcL1xcLy87XG5cbi8qKlxuICogVXNlZCB0byBzZWUgaWYgdGhlIHByb3RvY29sIGNvbnRhaW5zIGFueSB1bnN1cHBvcnRlZCBwcm90b2NvbHNcbiAqIEB0eXBlIHtSZWdFeHB9XG4gKi9cbnZhciB1bnN1cHBvcnRlZFByb3RvY29sID0gL15odHRwOnxeaHR0cHM6LztcblxudmFyIFVSTCA9IF9kZXJlcV8oJ3VybCcpO1xuXG4vKipcbiAqIFRha2UgdGhlIHVybCBwYXNzZWQgd2hlbiBjcmVhdGluZyB0aGUgY2xpZW50IGFuZCBlbnN1cmUgdGhlIGNvcnJlY3RcbiAqIHByb3RvY29sIGlzIHByb3ZpZGVkXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHVybCBVcmwgcGFzc2VkIGluIGJ5IGNsaWVudFxuICogQHJldHVybiB7U3RyaW5nfSBVcmwgd2l0aCBzdXBwb3J0ZWQgcHJvdG9jb2xcbiAqL1xuZXhwb3J0cy5wYXJzZVVybCA9IGZ1bmN0aW9uIChpbml0aWFsVVJsLCBkZWZhdWx0UGF0aCkge1xuICB2YXIgdXJsID0gaW5pdGlhbFVSbDtcbiAgaWYgKHVuc3VwcG9ydGVkUHJvdG9jb2wudGVzdCh1cmwpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPbmx5IHdzIGFuZCB3c3MgYXJlIHN1cHBvcnRlZCcpO1xuICB9XG4gIGlmICghaGFzVXJsUHJvdG9jb2wudGVzdCh1cmwpKSB7XG4gICAgdXJsID0gJ3dzOi8vJyArIHVybDtcbiAgfSBlbHNlIGlmICh1cmwuaW5kZXhPZignLy8nKSA9PT0gMCkge1xuICAgIHVybCA9ICd3czonICsgdXJsO1xuICB9XG4gIHZhciBzZXJ2ZXJVcmwgPSBVUkwucGFyc2UodXJsKTtcbiAgaWYgKCFzZXJ2ZXJVcmwuaG9zdCkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCB1cmwsIG1pc3NpbmcgaG9zdCcpO1xuICB9XG4gIHNlcnZlclVybC5wcm90b2NvbCA9IHNlcnZlclVybC5wcm90b2NvbCA/IHNlcnZlclVybC5wcm90b2NvbCA6ICd3czonO1xuICBzZXJ2ZXJVcmwucGF0aG5hbWUgPSBzZXJ2ZXJVcmwucGF0aG5hbWUgPyBzZXJ2ZXJVcmwucGF0aG5hbWUgOiBkZWZhdWx0UGF0aDtcbiAgcmV0dXJuIFVSTC5mb3JtYXQoc2VydmVyVXJsKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlzIHRoZSBjb25uZWN0aW9uIHN0YXRlIGlzIE9QRU5cbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydHMuaXNDb25uZWN0ZWQgPSBmdW5jdGlvbiAoY2xpZW50KSB7XG4gIHZhciBjb25uZWN0aW9uU3RhdGUgPSBjbGllbnQuZ2V0Q29ubmVjdGlvblN0YXRlKCk7XG4gIHJldHVybiBjb25uZWN0aW9uU3RhdGUgPT09IEMuQ09OTkVDVElPTl9TVEFURS5PUEVOO1xufTtcblxufSkuY2FsbCh0aGlzLF9kZXJlcV8oJ19wcm9jZXNzJykpXG59LHtcIi4uL2NvbnN0YW50cy9jb25zdGFudHNcIjoxMSxcIl9wcm9jZXNzXCI6MyxcInVybFwiOjh9XX0se30sWzEwXSkoMTApXG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kZWVwc3RyZWFtLmlvLWNsaWVudC1qcy9kaXN0L2RlZXBzdHJlYW0uanNcbi8vIG1vZHVsZSBpZCA9IDUzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIl0sInNvdXJjZVJvb3QiOiIifQ==