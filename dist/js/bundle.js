!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof module&&module.exports?module.exports=b():a.svg4everybody=b()}(this,function(){function a(a,b,c){if(c){var d=document.createDocumentFragment(),e=!b.hasAttribute("viewBox")&&c.getAttribute("viewBox");e&&b.setAttribute("viewBox",e);for(var f=c.cloneNode(!0);f.childNodes.length;)d.appendChild(f.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=b._cachedDocument;c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),b._embeds.splice(0).map(function(d){var e=b._cachedTarget[d.id];e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),a(d.parent,d.svg,e)})}},b.onreadystatechange()}function c(c){function e(){for(var c=0;c<o.length;){var h=o[c],i=h.parentNode,j=d(i),k=h.getAttribute("xlink:href")||h.getAttribute("href");if(!k&&g.attributeName&&(k=h.getAttribute(g.attributeName)),j&&k){if(f)if(!g.validate||g.validate(k,j,h)){i.removeChild(h);var l=k.split("#"),q=l.shift(),r=l.join("#");if(q.length){var s=m[q];s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),s._embeds.push({parent:i,svg:j,id:r}),b(s)}else a(i,j,document.getElementById(r))}else++c,++p}else++c}(!o.length||o.length-p>0)&&n(e,67)}var f,g=Object(c),h=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,i=/\bAppleWebKit\/(\d+)\b/,j=/\bEdge\/12\.(\d+)\b/,k=/\bEdge\/.(\d+)\b/,l=window.top!==window.self;f="polyfill"in g?g.polyfill:h.test(navigator.userAgent)||(navigator.userAgent.match(j)||[])[1]<10547||(navigator.userAgent.match(i)||[])[1]<537||k.test(navigator.userAgent)&&l;var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use"),p=0;f&&e()}function d(a){for(var b=a;"svg"!==b.nodeName.toLowerCase()&&(b=b.parentNode););return b}return c});
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.IMask = {}));
}(this, function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var O = 'object';

	var check = function (it) {
	  return it && it.Math == Math && it;
	}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


	var global_1 = // eslint-disable-next-line no-undef
	check(typeof globalThis == O && globalThis) || check(typeof window == O && window) || check(typeof self == O && self) || check(typeof commonjsGlobal == O && commonjsGlobal) || // eslint-disable-next-line no-new-func
	Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty


	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
	  1: 2
	}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings




	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string


	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty


	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) {
	    /* empty */
	  }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  }

	  return it;
	};

	var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty

	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) {
	    /* empty */
	  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var hide = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    hide(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  }

	  return value;
	};

	var shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});
	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.1.3',
	  mode:  'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var functionToString = shared('native-function-to-string', Function.toString);

	var WeakMap = global_1.WeakMap;
	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;

	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    }

	    return state;
	  };
	};

	if (nativeWeakMap) {
	  var store = new WeakMap$1();
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;

	  set = function (it, metadata) {
	    wmset.call(store, it, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };

	  has$1 = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;

	  set = function (it, metadata) {
	    hide(it, STATE, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };

	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(functionToString).split('toString');
	shared('inspectSource', function (it) {
	  return functionToString.call(it);
	});
	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;

	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }

	  if (O === global_1) {
	    if (simple) O[key] = value;else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }

	  if (simple) O[key] = value;else hide(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor; // `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger

	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min; // `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength

	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min; // Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).

	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation


	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value; // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare

	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++]; // eslint-disable-next-line no-self-compare

	      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    }
	    return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;



	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;

	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }

	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols


	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';
	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;










	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/


	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }

	  if (target) for (key in source) {
	    sourceProperty = source[key];

	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];

	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    } // add a flag to not completely full polyfills


	    if (options.sham || targetProperty && targetProperty.sham) {
	      hide(sourceProperty, 'sham', true);
	    } // extend global


	    redefine(target, key, sourceProperty, options);
	  }
	};

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys


	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject


	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var nativeAssign = Object.assign; // `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	// should work with symbols and should have deterministic property order (V8 bug)

	var objectAssign = !nativeAssign || fails(function () {
	  var A = {};
	  var B = {}; // eslint-disable-next-line no-undef

	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) {
	    B[chr] = chr;
	  });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;

	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;

	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  }

	  return T;
	} : nativeAssign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign


	_export({
	  target: 'Object',
	  stat: true,
	  forced: Object.assign !== objectAssign
	}, {
	  assign: objectAssign
	});

	// `String.prototype.repeat` method implementation
	// https://tc39.github.io/ecma262/#sec-string.prototype.repeat


	var stringRepeat = ''.repeat || function repeat(count) {
	  var str = String(requireObjectCoercible(this));
	  var result = '';
	  var n = toInteger(count);
	  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');

	  for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;

	  return result;
	};

	// https://github.com/tc39/proposal-string-pad-start-end






	var ceil$1 = Math.ceil; // `String.prototype.{ padStart, padEnd }` methods implementation

	var createMethod$1 = function (IS_END) {
	  return function ($this, maxLength, fillString) {
	    var S = String(requireObjectCoercible($this));
	    var stringLength = S.length;
	    var fillStr = fillString === undefined ? ' ' : String(fillString);
	    var intMaxLength = toLength(maxLength);
	    var fillLen, stringFiller;
	    if (intMaxLength <= stringLength || fillStr == '') return S;
	    fillLen = intMaxLength - stringLength;
	    stringFiller = stringRepeat.call(fillStr, ceil$1(fillLen / fillStr.length));
	    if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
	    return IS_END ? S + stringFiller : stringFiller + S;
	  };
	};

	var stringPad = {
	  // `String.prototype.padStart` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.padstart
	  start: createMethod$1(false),
	  // `String.prototype.padEnd` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.padend
	  end: createMethod$1(true)
	};

	var userAgent = getBuiltIn('navigator', 'userAgent') || '';

	// https://github.com/zloirock/core-js/issues/280
	 // eslint-disable-next-line unicorn/no-unsafe-regex


	var webkitStringPadBug = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

	var $padEnd = stringPad.end;

	 // `String.prototype.padEnd` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.padend


	_export({
	  target: 'String',
	  proto: true,
	  forced: webkitStringPadBug
	}, {
	  padEnd: function padEnd(maxLength
	  /* , fillString = ' ' */
	  ) {
	    return $padEnd(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $padStart = stringPad.start;

	 // `String.prototype.padStart` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.padstart


	_export({
	  target: 'String',
	  proto: true,
	  forced: webkitStringPadBug
	}, {
	  padStart: function padStart(maxLength
	  /* , fillString = ' ' */
	  ) {
	    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// `String.prototype.repeat` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.repeat


	_export({
	  target: 'String',
	  proto: true
	}, {
	  repeat: stringRepeat
	});

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};

	  var target = _objectWithoutPropertiesLoose(source, excluded);

	  var key, i;

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = _getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    _get = Reflect.get;
	  } else {
	    _get = function _get(target, property, receiver) {
	      var base = _superPropBase(target, property);

	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get(target, property, receiver || target);
	}

	function set$1(target, property, value, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.set) {
	    set$1 = Reflect.set;
	  } else {
	    set$1 = function set(target, property, value, receiver) {
	      var base = _superPropBase(target, property);

	      var desc;

	      if (base) {
	        desc = Object.getOwnPropertyDescriptor(base, property);

	        if (desc.set) {
	          desc.set.call(receiver, value);
	          return true;
	        } else if (!desc.writable) {
	          return false;
	        }
	      }

	      desc = Object.getOwnPropertyDescriptor(receiver, property);

	      if (desc) {
	        if (!desc.writable) {
	          return false;
	        }

	        desc.value = value;
	        Object.defineProperty(receiver, property, desc);
	      } else {
	        _defineProperty(receiver, property, value);
	      }

	      return true;
	    };
	  }

	  return set$1(target, property, value, receiver);
	}

	function _set(target, property, value, receiver, isStrict) {
	  var s = set$1(target, property, value, receiver || target);

	  if (!s && isStrict) {
	    throw new Error('failed to set property');
	  }

	  return value;
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArrayLimit(arr, i) {
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	/** Checks if value is string */
	function isString(str) {
	  return typeof str === 'string' || str instanceof String;
	}
	/**
	  Direction
	  @prop {string} NONE
	  @prop {string} LEFT
	  @prop {string} FORCE_LEFT
	  @prop {string} RIGHT
	  @prop {string} FORCE_RIGHT
	*/

	var DIRECTION = {
	  NONE: 'NONE',
	  LEFT: 'LEFT',
	  FORCE_LEFT: 'FORCE_LEFT',
	  RIGHT: 'RIGHT',
	  FORCE_RIGHT: 'FORCE_RIGHT'
	  /**
	    Direction
	    @enum {string}
	  */

	};
	/** */

	function forceDirection(direction) {
	  switch (direction) {
	    case DIRECTION.LEFT:
	      return DIRECTION.FORCE_LEFT;

	    case DIRECTION.RIGHT:
	      return DIRECTION.FORCE_RIGHT;

	    default:
	      return direction;
	  }
	}
	/** Escapes regular expression control chars */

	function escapeRegExp(str) {
	  return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
	} // cloned from https://github.com/epoberezkin/fast-deep-equal with small changes

	function objectIncludes(b, a) {
	  if (a === b) return true;
	  var arrA = Array.isArray(a),
	      arrB = Array.isArray(b),
	      i;

	  if (arrA && arrB) {
	    if (a.length != b.length) return false;

	    for (i = 0; i < a.length; i++) {
	      if (!objectIncludes(a[i], b[i])) return false;
	    }

	    return true;
	  }

	  if (arrA != arrB) return false;

	  if (a && b && _typeof(a) === 'object' && _typeof(b) === 'object') {
	    var dateA = a instanceof Date,
	        dateB = b instanceof Date;
	    if (dateA && dateB) return a.getTime() == b.getTime();
	    if (dateA != dateB) return false;
	    var regexpA = a instanceof RegExp,
	        regexpB = b instanceof RegExp;
	    if (regexpA && regexpB) return a.toString() == b.toString();
	    if (regexpA != regexpB) return false;
	    var keys = Object.keys(a); // if (keys.length !== Object.keys(b).length) return false;

	    for (i = 0; i < keys.length; i++) {
	      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
	    }

	    for (i = 0; i < keys.length; i++) {
	      if (!objectIncludes(b[keys[i]], a[keys[i]])) return false;
	    }

	    return true;
	  } else if (a && b && typeof a === 'function' && typeof b === 'function') {
	    return a.toString() === b.toString();
	  }

	  return false;
	}
	/* eslint-disable no-undef */

	var g = typeof window !== 'undefined' && window || typeof global !== 'undefined' && global.global === global && global || typeof self !== 'undefined' && self.self === self && self || {};
	/* eslint-enable no-undef */

	/** Selection range */

	/** Provides details of changing input */

	var ActionDetails =
	/*#__PURE__*/
	function () {
	  /** Current input value */

	  /** Current cursor position */

	  /** Old input value */

	  /** Old selection */
	  function ActionDetails(value, cursorPos, oldValue, oldSelection) {
	    _classCallCheck(this, ActionDetails);

	    this.value = value;
	    this.cursorPos = cursorPos;
	    this.oldValue = oldValue;
	    this.oldSelection = oldSelection; // double check if left part was changed (autofilling, other non-standard input triggers)

	    while (this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos)) {
	      --this.oldSelection.start;
	    }
	  }
	  /**
	    Start changing position
	    @readonly
	  */


	  _createClass(ActionDetails, [{
	    key: "startChangePos",
	    get: function get() {
	      return Math.min(this.cursorPos, this.oldSelection.start);
	    }
	    /**
	      Inserted symbols count
	      @readonly
	    */

	  }, {
	    key: "insertedCount",
	    get: function get() {
	      return this.cursorPos - this.startChangePos;
	    }
	    /**
	      Inserted symbols
	      @readonly
	    */

	  }, {
	    key: "inserted",
	    get: function get() {
	      return this.value.substr(this.startChangePos, this.insertedCount);
	    }
	    /**
	      Removed symbols count
	      @readonly
	    */

	  }, {
	    key: "removedCount",
	    get: function get() {
	      // Math.max for opposite operation
	      return Math.max(this.oldSelection.end - this.startChangePos || // for Delete
	      this.oldValue.length - this.value.length, 0);
	    }
	    /**
	      Removed symbols
	      @readonly
	    */

	  }, {
	    key: "removed",
	    get: function get() {
	      return this.oldValue.substr(this.startChangePos, this.removedCount);
	    }
	    /**
	      Unchanged head symbols
	      @readonly
	    */

	  }, {
	    key: "head",
	    get: function get() {
	      return this.value.substring(0, this.startChangePos);
	    }
	    /**
	      Unchanged tail symbols
	      @readonly
	    */

	  }, {
	    key: "tail",
	    get: function get() {
	      return this.value.substring(this.startChangePos + this.insertedCount);
	    }
	    /**
	      Remove direction
	      @readonly
	    */

	  }, {
	    key: "removeDirection",
	    get: function get() {
	      if (!this.removedCount || this.insertedCount) return DIRECTION.NONE; // align right if delete at right or if range removed (event with backspace)

	      return this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos ? DIRECTION.RIGHT : DIRECTION.LEFT;
	    }
	  }]);

	  return ActionDetails;
	}();

	/**
	  Provides details of changing model value
	  @param {Object} [details]
	  @param {string} [details.inserted] - Inserted symbols
	  @param {boolean} [details.skip] - Can skip chars
	  @param {number} [details.removeCount] - Removed symbols count
	  @param {number} [details.tailShift] - Additional offset if any changes occurred before tail
	*/
	var ChangeDetails =
	/*#__PURE__*/
	function () {
	  /** Inserted symbols */

	  /** Can skip chars */

	  /** Additional offset if any changes occurred before tail */

	  /** Raw inserted is used by dynamic mask */
	  function ChangeDetails(details) {
	    _classCallCheck(this, ChangeDetails);

	    Object.assign(this, {
	      inserted: '',
	      rawInserted: '',
	      skip: false,
	      tailShift: 0
	    }, details);
	  }
	  /**
	    Aggregate changes
	    @returns {ChangeDetails} `this`
	  */


	  _createClass(ChangeDetails, [{
	    key: "aggregate",
	    value: function aggregate(details) {
	      this.rawInserted += details.rawInserted;
	      this.skip = this.skip || details.skip;
	      this.inserted += details.inserted;
	      this.tailShift += details.tailShift;
	      return this;
	    }
	    /** Total offset considering all changes */

	  }, {
	    key: "offset",
	    get: function get() {
	      return this.tailShift + this.inserted.length;
	    }
	  }]);

	  return ChangeDetails;
	}();

	/** Provides details of continuous extracted tail */
	var ContinuousTailDetails =
	/*#__PURE__*/
	function () {
	  /** Tail value as string */

	  /** Tail start position */

	  /** Start position */
	  function ContinuousTailDetails() {
	    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var stop = arguments.length > 2 ? arguments[2] : undefined;

	    _classCallCheck(this, ContinuousTailDetails);

	    this.value = value;
	    this.from = from;
	    this.stop = stop;
	  }

	  _createClass(ContinuousTailDetails, [{
	    key: "toString",
	    value: function toString() {
	      return this.value;
	    }
	  }, {
	    key: "extend",
	    value: function extend(tail) {
	      this.value += String(tail);
	    }
	  }, {
	    key: "appendTo",
	    value: function appendTo(masked) {
	      return masked.append(this.toString(), {
	        tail: true
	      }).aggregate(masked._appendPlaceholder());
	    }
	  }, {
	    key: "shiftBefore",
	    value: function shiftBefore(pos) {
	      if (this.from >= pos || !this.value.length) return '';
	      var shiftChar = this.value[0];
	      this.value = this.value.slice(1);
	      return shiftChar;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        value: this.value,
	        from: this.from,
	        stop: this.stop
	      };
	    },
	    set: function set(state) {
	      Object.assign(this, state);
	    }
	  }]);

	  return ContinuousTailDetails;
	}();

	/** Provides common masking stuff */
	var Masked =
	/*#__PURE__*/
	function () {
	  // $Shape<MaskedOptions>; TODO after fix https://github.com/facebook/flow/issues/4773

	  /** @type {Mask} */

	  /** */
	  // $FlowFixMe no ideas

	  /** Transforms value before mask processing */

	  /** Validates if value is acceptable */

	  /** Does additional processing in the end of editing */

	  /** Enable characters overwriting */

	  /** */
	  function Masked(opts) {
	    _classCallCheck(this, Masked);

	    this._value = '';

	    this._update(opts);

	    this.isInitialized = true;
	  }
	  /** Sets and applies new options */


	  _createClass(Masked, [{
	    key: "updateOptions",
	    value: function updateOptions(opts) {
	      if (!Object.keys(opts).length) return;
	      this.withValueRefresh(this._update.bind(this, opts));
	    }
	    /**
	      Sets new options
	      @protected
	    */

	  }, {
	    key: "_update",
	    value: function _update(opts) {
	      Object.assign(this, opts);
	    }
	    /** Mask state */

	  }, {
	    key: "reset",

	    /** Resets value */
	    value: function reset() {
	      this._value = '';
	    }
	    /** */

	  }, {
	    key: "resolve",

	    /** Resolve new value */
	    value: function resolve(value) {
	      this.reset();
	      this.append(value, {
	        input: true
	      }, '');
	      this.doCommit();
	      return this.value;
	    }
	    /** */

	  }, {
	    key: "nearestInputPos",

	    /** Finds nearest input position in direction */
	    value: function nearestInputPos(cursorPos, direction) {
	      return cursorPos;
	    }
	    /** Extracts value in range considering flags */

	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      return this.value.slice(fromPos, toPos);
	    }
	    /** Extracts tail in range */

	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      return new ContinuousTailDetails(this.extractInput(fromPos, toPos), fromPos);
	    }
	    /** Appends tail */
	    // $FlowFixMe no ideas

	  }, {
	    key: "appendTail",
	    value: function appendTail(tail) {
	      if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
	      return tail.appendTo(this);
	    }
	    /** Appends char */

	  }, {
	    key: "_appendCharRaw",
	    value: function _appendCharRaw(ch) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      ch = this.doPrepare(ch, flags);
	      if (!ch) return new ChangeDetails();
	      this._value += ch;
	      return new ChangeDetails({
	        inserted: ch,
	        rawInserted: ch
	      });
	    }
	    /** Appends char */

	  }, {
	    key: "_appendChar",
	    value: function _appendChar(ch) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var checkTail = arguments.length > 2 ? arguments[2] : undefined;
	      var consistentState = this.state;

	      var details = this._appendCharRaw(ch, flags);

	      if (details.inserted) {
	        var consistentTail;
	        var appended = this.doValidate(flags) !== false;

	        if (appended && checkTail != null) {
	          // validation ok, check tail
	          var beforeTailState = this.state;

	          if (this.overwrite) {
	            consistentTail = checkTail.state;
	            checkTail.shiftBefore(this.value.length);
	          }

	          var tailDetails = this.appendTail(checkTail);
	          appended = tailDetails.rawInserted === checkTail.toString(); // if ok, rollback state after tail

	          if (appended && tailDetails.inserted) this.state = beforeTailState;
	        } // revert all if something went wrong


	        if (!appended) {
	          details.rawInserted = details.inserted = '';
	          this.state = consistentState;
	          if (checkTail && consistentTail) checkTail.state = consistentTail;
	        }
	      }

	      return details;
	    }
	    /** Appends optional placeholder at end */

	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder() {
	      return new ChangeDetails();
	    }
	    /** Appends symbols considering flags */
	    // $FlowFixMe no ideas

	  }, {
	    key: "append",
	    value: function append(str, flags, tail) {
	      if (!isString(str)) throw new Error('value should be string');
	      var details = new ChangeDetails();
	      var checkTail = isString(tail) ? new ContinuousTailDetails(String(tail)) : tail;
	      if (flags.tail) flags._beforeTailState = this.state;

	      for (var ci = 0; ci < str.length; ++ci) {
	        details.aggregate(this._appendChar(str[ci], flags, checkTail));
	      } // append tail but aggregate only tailShift


	      if (checkTail != null) {
	        details.tailShift += this.appendTail(checkTail).tailShift; // TODO it's a good idea to clear state after appending ends
	        // but it causes bugs when one append calls another (when dynamic dispatch set rawInputValue)
	        // this._resetBeforeTailState();
	      }

	      return details;
	    }
	    /** */

	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      this._value = this.value.slice(0, fromPos) + this.value.slice(toPos);
	      return new ChangeDetails();
	    }
	    /** Calls function and reapplies current value */

	  }, {
	    key: "withValueRefresh",
	    value: function withValueRefresh(fn) {
	      if (this._refreshing || !this.isInitialized) return fn();
	      this._refreshing = true;
	      var unmasked = this.unmaskedValue;
	      var value = this.value;
	      var ret = fn(); // try to update with raw value first to keep fixed chars

	      if (this.resolve(value) !== value) {
	        // or fallback to unmasked
	        this.unmaskedValue = unmasked;
	      }

	      delete this._refreshing;
	      return ret;
	    }
	    /**
	      Prepares string before mask processing
	      @protected
	    */

	  }, {
	    key: "doPrepare",
	    value: function doPrepare(str) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      return this.prepare ? this.prepare(str, this, flags) : str;
	    }
	    /**
	      Validates if value is acceptable
	      @protected
	    */

	  }, {
	    key: "doValidate",
	    value: function doValidate(flags) {
	      return (!this.validate || this.validate(this.value, this, flags)) && (!this.parent || this.parent.doValidate(flags));
	    }
	    /**
	      Does additional processing in the end of editing
	      @protected
	    */

	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      if (this.commit) this.commit(this.value, this);
	    }
	    /** */

	  }, {
	    key: "splice",
	    value: function splice(start, deleteCount, inserted, removeDirection) {
	      var tailPos = start + deleteCount;
	      var tail = this.extractTail(tailPos);
	      var startChangePos = this.nearestInputPos(start, removeDirection);
	      var changeDetails = new ChangeDetails({
	        tailShift: startChangePos - start // adjust tailShift if start was aligned

	      }).aggregate(this.remove(startChangePos)).aggregate(this.append(inserted, {
	        input: true
	      }, tail));
	      return changeDetails;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        _value: this.value
	      };
	    },
	    set: function set(state) {
	      this._value = state._value;
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this._value;
	    },
	    set: function set(value) {
	      this.resolve(value);
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.value;
	    },
	    set: function set(value) {
	      this.reset();
	      this.append(value, {}, '');
	      this.doCommit();
	    }
	    /** */

	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.unmaskedValue;
	    },
	    set: function set(value) {
	      this.unmaskedValue = value;
	    }
	    /** Value that includes raw user input */

	  }, {
	    key: "rawInputValue",
	    get: function get() {
	      return this.extractInput(0, this.value.length, {
	        raw: true
	      });
	    },
	    set: function set(value) {
	      this.reset();
	      this.append(value, {
	        raw: true
	      }, '');
	      this.doCommit();
	    }
	    /** */

	  }, {
	    key: "isComplete",
	    get: function get() {
	      return true;
	    }
	  }]);

	  return Masked;
	}();

	/** Get Masked class by mask type */
	function maskedClass(mask) {
	  if (mask == null) {
	    throw new Error('mask property should be defined');
	  }

	  if (mask instanceof RegExp) return g.IMask.MaskedRegExp;
	  if (isString(mask)) return g.IMask.MaskedPattern;
	  if (mask instanceof Date || mask === Date) return g.IMask.MaskedDate;
	  if (mask instanceof Number || typeof mask === 'number' || mask === Number) return g.IMask.MaskedNumber;
	  if (Array.isArray(mask) || mask === Array) return g.IMask.MaskedDynamic; // $FlowFixMe

	  if (mask.prototype instanceof g.IMask.Masked) return mask; // $FlowFixMe

	  if (mask instanceof Function) return g.IMask.MaskedFunction;
	  console.warn('Mask not found for mask', mask); // eslint-disable-line no-console

	  return g.IMask.Masked;
	}
	/** Creates new {@link Masked} depending on mask type */

	function createMask(opts) {
	  opts = Object.assign({}, opts);
	  var mask = opts.mask;
	  if (mask instanceof g.IMask.Masked) return mask;
	  var MaskedClass = maskedClass(mask);
	  return new MaskedClass(opts);
	}

	var DEFAULT_INPUT_DEFINITIONS = {
	  '0': /\d/,
	  'a': /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
	  // http://stackoverflow.com/a/22075070
	  '*': /./
	};
	/** */

	var PatternInputDefinition =
	/*#__PURE__*/
	function () {
	  /** */

	  /** */

	  /** */

	  /** */

	  /** */

	  /** */
	  function PatternInputDefinition(opts) {
	    _classCallCheck(this, PatternInputDefinition);

	    var mask = opts.mask,
	        blockOpts = _objectWithoutProperties(opts, ["mask"]);

	    this.masked = createMask({
	      mask: mask
	    });
	    Object.assign(this, blockOpts);
	  }

	  _createClass(PatternInputDefinition, [{
	    key: "reset",
	    value: function reset() {
	      this._isFilled = false;
	      this.masked.reset();
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;

	      if (fromPos === 0 && toPos >= 1) {
	        this._isFilled = false;
	        return this.masked.remove(fromPos, toPos);
	      }

	      return new ChangeDetails();
	    }
	  }, {
	    key: "_appendChar",
	    value: function _appendChar(str) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      if (this._isFilled) return new ChangeDetails();
	      var state = this.masked.state; // simulate input

	      var details = this.masked._appendChar(str, flags);

	      if (details.inserted && this.doValidate(flags) === false) {
	        details.inserted = details.rawInserted = '';
	        this.masked.state = state;
	      }

	      if (!details.inserted && !this.isOptional && !this.lazy && !flags.input) {
	        details.inserted = this.placeholderChar;
	      }

	      details.skip = !details.inserted && !this.isOptional;
	      this._isFilled = Boolean(details.inserted);
	      return details;
	    }
	  }, {
	    key: "append",
	    value: function append() {
	      var _this$masked;

	      return (_this$masked = this.masked).append.apply(_this$masked, arguments);
	    }
	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder() {
	      var details = new ChangeDetails();
	      if (this._isFilled || this.isOptional) return details;
	      this._isFilled = true;
	      details.inserted = this.placeholderChar;
	      return details;
	    }
	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var _this$masked2;

	      return (_this$masked2 = this.masked).extractTail.apply(_this$masked2, arguments);
	    }
	  }, {
	    key: "appendTail",
	    value: function appendTail() {
	      var _this$masked3;

	      return (_this$masked3 = this.masked).appendTail.apply(_this$masked3, arguments);
	    }
	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var flags = arguments.length > 2 ? arguments[2] : undefined;
	      return this.masked.extractInput(fromPos, toPos, flags);
	    }
	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos) {
	      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
	      var minPos = 0;
	      var maxPos = this.value.length;
	      var boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);

	      switch (direction) {
	        case DIRECTION.LEFT:
	        case DIRECTION.FORCE_LEFT:
	          return this.isComplete ? boundPos : minPos;

	        case DIRECTION.RIGHT:
	        case DIRECTION.FORCE_RIGHT:
	          return this.isComplete ? boundPos : maxPos;

	        case DIRECTION.NONE:
	        default:
	          return boundPos;
	      }
	    }
	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _this$masked4, _this$parent;

	      return (_this$masked4 = this.masked).doValidate.apply(_this$masked4, arguments) && (!this.parent || (_this$parent = this.parent).doValidate.apply(_this$parent, arguments));
	    }
	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      this.masked.doCommit();
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this.masked.value || (this._isFilled && !this.isOptional ? this.placeholderChar : '');
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.masked.unmaskedValue;
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return Boolean(this.masked.value) || this.isOptional;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        masked: this.masked.state,
	        _isFilled: this._isFilled
	      };
	    },
	    set: function set(state) {
	      this.masked.state = state.masked;
	      this._isFilled = state._isFilled;
	    }
	  }]);

	  return PatternInputDefinition;
	}();

	var PatternFixedDefinition =
	/*#__PURE__*/
	function () {
	  /** */

	  /** */

	  /** */

	  /** */
	  function PatternFixedDefinition(opts) {
	    _classCallCheck(this, PatternFixedDefinition);

	    Object.assign(this, opts);
	    this._value = '';
	  }

	  _createClass(PatternFixedDefinition, [{
	    key: "reset",
	    value: function reset() {
	      this._isRawInput = false;
	      this._value = '';
	    }
	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
	      this._value = this._value.slice(0, fromPos) + this._value.slice(toPos);
	      if (!this._value) this._isRawInput = false;
	      return new ChangeDetails();
	    }
	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos) {
	      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
	      var minPos = 0;
	      var maxPos = this._value.length;

	      switch (direction) {
	        case DIRECTION.LEFT:
	        case DIRECTION.FORCE_LEFT:
	          return minPos;

	        case DIRECTION.NONE:
	        case DIRECTION.RIGHT:
	        case DIRECTION.FORCE_RIGHT:
	        default:
	          return maxPos;
	      }
	    }
	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
	      var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      return flags.raw && this._isRawInput && this._value.slice(fromPos, toPos) || '';
	    }
	  }, {
	    key: "_appendChar",
	    value: function _appendChar(str) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var details = new ChangeDetails();
	      if (this._value) return details;
	      var appended = this.char === str[0];
	      var isResolved = appended && (this.isUnmasking || flags.input || flags.raw) && !flags.tail;
	      if (isResolved) details.rawInserted = this.char;
	      this._value = details.inserted = this.char;
	      this._isRawInput = isResolved && (flags.raw || flags.input);
	      return details;
	    }
	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder() {
	      var details = new ChangeDetails();
	      if (this._value) return details;
	      this._value = details.inserted = this.char;
	      return details;
	    }
	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      return new ContinuousTailDetails('');
	    } // $FlowFixMe no ideas

	  }, {
	    key: "appendTail",
	    value: function appendTail(tail) {
	      if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
	      return tail.appendTo(this);
	    }
	  }, {
	    key: "append",
	    value: function append(str, flags, tail) {
	      var details = this._appendChar(str, flags);

	      if (tail != null) {
	        details.tailShift += this.appendTail(tail).tailShift;
	      }

	      return details;
	    }
	  }, {
	    key: "doCommit",
	    value: function doCommit() {}
	  }, {
	    key: "value",
	    get: function get() {
	      return this._value;
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.isUnmasking ? this.value : '';
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return true;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        _value: this._value,
	        _isRawInput: this._isRawInput
	      };
	    },
	    set: function set(state) {
	      Object.assign(this, state);
	    }
	  }]);

	  return PatternFixedDefinition;
	}();

	var ChunksTailDetails =
	/*#__PURE__*/
	function () {
	  /** */
	  function ChunksTailDetails() {
	    var chunks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	    _classCallCheck(this, ChunksTailDetails);

	    this.chunks = chunks;
	    this.from = from;
	  }

	  _createClass(ChunksTailDetails, [{
	    key: "toString",
	    value: function toString() {
	      return this.chunks.map(String).join('');
	    } // $FlowFixMe no ideas

	  }, {
	    key: "extend",
	    value: function extend(tailChunk) {
	      if (!String(tailChunk)) return;
	      if (isString(tailChunk)) tailChunk = new ContinuousTailDetails(String(tailChunk));
	      var lastChunk = this.chunks[this.chunks.length - 1];
	      var extendLast = lastChunk && ( // if stops are same or tail has no stop
	      lastChunk.stop === tailChunk.stop || tailChunk.stop == null) && // if tail chunk goes just after last chunk
	      tailChunk.from === lastChunk.from + lastChunk.toString().length;

	      if (tailChunk instanceof ContinuousTailDetails) {
	        // check the ability to extend previous chunk
	        if (extendLast) {
	          // extend previous chunk
	          lastChunk.extend(tailChunk.toString());
	        } else {
	          // append new chunk
	          this.chunks.push(tailChunk);
	        }
	      } else if (tailChunk instanceof ChunksTailDetails) {
	        if (tailChunk.stop == null) {
	          // unwrap floating chunks to parent, keeping `from` pos
	          var firstTailChunk;

	          while (tailChunk.chunks.length && tailChunk.chunks[0].stop == null) {
	            firstTailChunk = tailChunk.chunks.shift();
	            firstTailChunk.from += tailChunk.from;
	            this.extend(firstTailChunk);
	          }
	        } // if tail chunk still has value


	        if (tailChunk.toString()) {
	          // if chunks contains stops, then popup stop to container
	          tailChunk.stop = tailChunk.blockIndex;
	          this.chunks.push(tailChunk);
	        }
	      }
	    }
	  }, {
	    key: "appendTo",
	    value: function appendTo(masked) {
	      if (!(masked instanceof g.IMask.MaskedPattern)) {
	        var tail = new ContinuousTailDetails(this.toString());
	        return tail.appendTo(masked);
	      }

	      var details = new ChangeDetails();

	      for (var ci = 0; ci < this.chunks.length && !details.skip; ++ci) {
	        var chunk = this.chunks[ci];

	        var lastBlockIter = masked._mapPosToBlock(masked.value.length);

	        var stop = chunk.stop;
	        var chunkBlock = void 0;

	        if (stop && ( // if block not found or stop is behind lastBlock
	        !lastBlockIter || lastBlockIter.index <= stop)) {
	          if (chunk instanceof ChunksTailDetails || // for continuous block also check if stop is exist
	          masked._stops.indexOf(stop) >= 0) {
	            details.aggregate(masked._appendPlaceholder(stop));
	          }

	          chunkBlock = chunk instanceof ChunksTailDetails && masked._blocks[stop];
	        }

	        if (chunkBlock) {
	          var tailDetails = chunkBlock.appendTail(chunk);
	          tailDetails.skip = false; // always ignore skip, it will be set on last

	          details.aggregate(tailDetails);
	          masked._value += tailDetails.inserted; // get not inserted chars

	          var remainChars = chunk.toString().slice(tailDetails.rawInserted.length);
	          if (remainChars) details.aggregate(masked.append(remainChars, {
	            tail: true
	          }));
	        } else {
	          details.aggregate(masked.append(chunk.toString(), {
	            tail: true
	          }));
	        }
	      }
	      return details;
	    }
	  }, {
	    key: "shiftBefore",
	    value: function shiftBefore(pos) {
	      if (this.from >= pos || !this.chunks.length) return '';
	      var chunkShiftPos = pos - this.from;
	      var ci = 0;

	      while (ci < this.chunks.length) {
	        var chunk = this.chunks[ci];
	        var shiftChar = chunk.shiftBefore(chunkShiftPos);

	        if (chunk.toString()) {
	          // chunk still contains value
	          // but not shifted - means no more available chars to shift
	          if (!shiftChar) break;
	          ++ci;
	        } else {
	          // clean if chunk has no value
	          this.chunks.splice(ci, 1);
	        }

	        if (shiftChar) return shiftChar;
	      }

	      return '';
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        chunks: this.chunks.map(function (c) {
	          return c.state;
	        }),
	        from: this.from,
	        stop: this.stop,
	        blockIndex: this.blockIndex
	      };
	    },
	    set: function set(state) {
	      var chunks = state.chunks,
	          props = _objectWithoutProperties(state, ["chunks"]);

	      Object.assign(this, props);
	      this.chunks = chunks.map(function (cstate) {
	        var chunk = "chunks" in cstate ? new ChunksTailDetails() : new ContinuousTailDetails(); // $FlowFixMe already checked above

	        chunk.state = cstate;
	        return chunk;
	      });
	    }
	  }]);

	  return ChunksTailDetails;
	}();

	/**
	  Pattern mask
	  @param {Object} opts
	  @param {Object} opts.blocks
	  @param {Object} opts.definitions
	  @param {string} opts.placeholderChar
	  @param {boolean} opts.lazy
	*/
	var MaskedPattern =
	/*#__PURE__*/
	function (_Masked) {
	  _inherits(MaskedPattern, _Masked);

	  /** */

	  /** */

	  /** Single char for empty input */

	  /** Show placeholder only when needed */
	  function MaskedPattern() {
	    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, MaskedPattern);

	    // TODO type $Shape<MaskedPatternOptions>={} does not work
	    opts.definitions = Object.assign({}, DEFAULT_INPUT_DEFINITIONS, opts.definitions);
	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedPattern).call(this, Object.assign({}, MaskedPattern.DEFAULTS, {}, opts)));
	  }
	  /**
	    @override
	    @param {Object} opts
	  */


	  _createClass(MaskedPattern, [{
	    key: "_update",
	    value: function _update() {
	      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      opts.definitions = Object.assign({}, this.definitions, opts.definitions);

	      _get(_getPrototypeOf(MaskedPattern.prototype), "_update", this).call(this, opts);

	      this._rebuildMask();
	    }
	    /** */

	  }, {
	    key: "_rebuildMask",
	    value: function _rebuildMask() {
	      var _this = this;

	      var defs = this.definitions;
	      this._blocks = [];
	      this._stops = [];
	      this._maskedBlocks = {};
	      var pattern = this.mask;
	      if (!pattern || !defs) return;
	      var unmaskingBlock = false;
	      var optionalBlock = false;

	      for (var i = 0; i < pattern.length; ++i) {
	        if (this.blocks) {
	          var _ret = function () {
	            var p = pattern.slice(i);
	            var bNames = Object.keys(_this.blocks).filter(function (bName) {
	              return p.indexOf(bName) === 0;
	            }); // order by key length

	            bNames.sort(function (a, b) {
	              return b.length - a.length;
	            }); // use block name with max length

	            var bName = bNames[0];

	            if (bName) {
	              var maskedBlock = createMask(Object.assign({
	                parent: _this,
	                lazy: _this.lazy,
	                placeholderChar: _this.placeholderChar,
	                overwrite: _this.overwrite
	              }, _this.blocks[bName]));

	              if (maskedBlock) {
	                _this._blocks.push(maskedBlock); // store block index


	                if (!_this._maskedBlocks[bName]) _this._maskedBlocks[bName] = [];

	                _this._maskedBlocks[bName].push(_this._blocks.length - 1);
	              }

	              i += bName.length - 1;
	              return "continue";
	            }
	          }();

	          if (_ret === "continue") continue;
	        }

	        var char = pattern[i];

	        var _isInput = char in defs;

	        if (char === MaskedPattern.STOP_CHAR) {
	          this._stops.push(this._blocks.length);

	          continue;
	        }

	        if (char === '{' || char === '}') {
	          unmaskingBlock = !unmaskingBlock;
	          continue;
	        }

	        if (char === '[' || char === ']') {
	          optionalBlock = !optionalBlock;
	          continue;
	        }

	        if (char === MaskedPattern.ESCAPE_CHAR) {
	          ++i;
	          char = pattern[i];
	          if (!char) break;
	          _isInput = false;
	        }

	        var def = _isInput ? new PatternInputDefinition({
	          parent: this,
	          lazy: this.lazy,
	          placeholderChar: this.placeholderChar,
	          mask: defs[char],
	          isOptional: optionalBlock
	        }) : new PatternFixedDefinition({
	          char: char,
	          isUnmasking: unmaskingBlock
	        });

	        this._blocks.push(def);
	      }
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "reset",

	    /**
	      @override
	    */
	    value: function reset() {
	      _get(_getPrototypeOf(MaskedPattern.prototype), "reset", this).call(this);

	      this._blocks.forEach(function (b) {
	        return b.reset();
	      });
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doCommit",

	    /**
	      @override
	    */
	    value: function doCommit() {
	      this._blocks.forEach(function (b) {
	        return b.doCommit();
	      });

	      _get(_getPrototypeOf(MaskedPattern.prototype), "doCommit", this).call(this);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "appendTail",

	    /**
	      @override
	    */
	    value: function appendTail(tail) {
	      return _get(_getPrototypeOf(MaskedPattern.prototype), "appendTail", this).call(this, tail).aggregate(this._appendPlaceholder());
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "_appendCharRaw",
	    value: function _appendCharRaw(ch) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      ch = this.doPrepare(ch, flags);

	      var blockIter = this._mapPosToBlock(this.value.length);

	      var details = new ChangeDetails();
	      if (!blockIter) return details;

	      for (var bi = blockIter.index;; ++bi) {
	        var _block = this._blocks[bi];
	        if (!_block) break;

	        var blockDetails = _block._appendChar(ch, flags);

	        var skip = blockDetails.skip;
	        details.aggregate(blockDetails);
	        if (skip || blockDetails.rawInserted) break; // go next char
	      }

	      return details;
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var _this2 = this;

	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var chunkTail = new ChunksTailDetails();
	      if (fromPos === toPos) return chunkTail;

	      this._forEachBlocksInRange(fromPos, toPos, function (b, bi, bFromPos, bToPos) {
	        var blockChunk = b.extractTail(bFromPos, bToPos);
	        blockChunk.stop = _this2._findStopBefore(bi);
	        blockChunk.from = _this2._blockStartPos(bi);
	        if (blockChunk instanceof ChunksTailDetails) blockChunk.blockIndex = bi;
	        chunkTail.extend(blockChunk);
	      });

	      return chunkTail;
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      if (fromPos === toPos) return '';
	      var input = '';

	      this._forEachBlocksInRange(fromPos, toPos, function (b, _, fromPos, toPos) {
	        input += b.extractInput(fromPos, toPos, flags);
	      });

	      return input;
	    }
	  }, {
	    key: "_findStopBefore",
	    value: function _findStopBefore(blockIndex) {
	      var stopBefore;

	      for (var si = 0; si < this._stops.length; ++si) {
	        var stop = this._stops[si];
	        if (stop <= blockIndex) stopBefore = stop;else break;
	      }

	      return stopBefore;
	    }
	    /** Appends placeholder depending on laziness */

	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder(toBlockIndex) {
	      var _this3 = this;

	      var details = new ChangeDetails();
	      if (this.lazy && toBlockIndex == null) return details;

	      var startBlockIter = this._mapPosToBlock(this.value.length);

	      if (!startBlockIter) return details;
	      var startBlockIndex = startBlockIter.index;
	      var endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;

	      this._blocks.slice(startBlockIndex, endBlockIndex).forEach(function (b) {
	        if (!b.lazy || toBlockIndex != null) {
	          // $FlowFixMe `_blocks` may not be present
	          var args = b._blocks != null ? [b._blocks.length] : [];

	          var bDetails = b._appendPlaceholder.apply(b, args);

	          _this3._value += bDetails.inserted;
	          details.aggregate(bDetails);
	        }
	      });

	      return details;
	    }
	    /** Finds block in pos */

	  }, {
	    key: "_mapPosToBlock",
	    value: function _mapPosToBlock(pos) {
	      var accVal = '';

	      for (var bi = 0; bi < this._blocks.length; ++bi) {
	        var _block2 = this._blocks[bi];
	        var blockStartPos = accVal.length;
	        accVal += _block2.value;

	        if (pos <= accVal.length) {
	          return {
	            index: bi,
	            offset: pos - blockStartPos
	          };
	        }
	      }
	    }
	    /** */

	  }, {
	    key: "_blockStartPos",
	    value: function _blockStartPos(blockIndex) {
	      return this._blocks.slice(0, blockIndex).reduce(function (pos, b) {
	        return pos += b.value.length;
	      }, 0);
	    }
	    /** */

	  }, {
	    key: "_forEachBlocksInRange",
	    value: function _forEachBlocksInRange(fromPos) {
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var fn = arguments.length > 2 ? arguments[2] : undefined;

	      var fromBlockIter = this._mapPosToBlock(fromPos);

	      if (fromBlockIter) {
	        var toBlockIter = this._mapPosToBlock(toPos); // process first block


	        var isSameBlock = toBlockIter && fromBlockIter.index === toBlockIter.index;
	        var fromBlockStartPos = fromBlockIter.offset;
	        var fromBlockEndPos = toBlockIter && isSameBlock ? toBlockIter.offset : this._blocks[fromBlockIter.index].value.length;
	        fn(this._blocks[fromBlockIter.index], fromBlockIter.index, fromBlockStartPos, fromBlockEndPos);

	        if (toBlockIter && !isSameBlock) {
	          // process intermediate blocks
	          for (var bi = fromBlockIter.index + 1; bi < toBlockIter.index; ++bi) {
	            fn(this._blocks[bi], bi, 0, this._blocks[bi].value.length);
	          } // process last block


	          fn(this._blocks[toBlockIter.index], toBlockIter.index, 0, toBlockIter.offset);
	        }
	      }
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;

	      var removeDetails = _get(_getPrototypeOf(MaskedPattern.prototype), "remove", this).call(this, fromPos, toPos);

	      this._forEachBlocksInRange(fromPos, toPos, function (b, _, bFromPos, bToPos) {
	        removeDetails.aggregate(b.remove(bFromPos, bToPos));
	      });

	      return removeDetails;
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos) {
	      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
	      // TODO refactor - extract alignblock
	      var beginBlockData = this._mapPosToBlock(cursorPos) || {
	        index: 0,
	        offset: 0
	      };
	      var beginBlockOffset = beginBlockData.offset,
	          beginBlockIndex = beginBlockData.index;
	      var beginBlock = this._blocks[beginBlockIndex];
	      if (!beginBlock) return cursorPos;
	      var beginBlockCursorPos = beginBlockOffset; // if position inside block - try to adjust it

	      if (beginBlockCursorPos !== 0 && beginBlockCursorPos < beginBlock.value.length) {
	        beginBlockCursorPos = beginBlock.nearestInputPos(beginBlockOffset, forceDirection(direction));
	      }

	      var cursorAtRight = beginBlockCursorPos === beginBlock.value.length;
	      var cursorAtLeft = beginBlockCursorPos === 0; //  cursor is INSIDE first block (not at bounds)

	      if (!cursorAtLeft && !cursorAtRight) return this._blockStartPos(beginBlockIndex) + beginBlockCursorPos;
	      var searchBlockIndex = cursorAtRight ? beginBlockIndex + 1 : beginBlockIndex;

	      if (direction === DIRECTION.NONE) {
	        // NONE direction used to calculate start input position if no chars were removed
	        // FOR NONE:
	        // -
	        // input|any
	        // ->
	        //  any|input
	        // <-
	        //  filled-input|any
	        // check if first block at left is input
	        if (searchBlockIndex > 0) {
	          var blockIndexAtLeft = searchBlockIndex - 1;
	          var blockAtLeft = this._blocks[blockIndexAtLeft];
	          var blockInputPos = blockAtLeft.nearestInputPos(0, DIRECTION.NONE); // is input

	          if (!blockAtLeft.value.length || blockInputPos !== blockAtLeft.value.length) {
	            return this._blockStartPos(searchBlockIndex);
	          }
	        } // ->


	        var firstInputAtRight = searchBlockIndex;

	        for (var bi = firstInputAtRight; bi < this._blocks.length; ++bi) {
	          var blockAtRight = this._blocks[bi];

	          var _blockInputPos = blockAtRight.nearestInputPos(0, DIRECTION.NONE);

	          if (!blockAtRight.value.length || _blockInputPos !== blockAtRight.value.length) {
	            return this._blockStartPos(bi) + _blockInputPos;
	          }
	        } // <-
	        // find first non-fixed symbol


	        for (var _bi = searchBlockIndex - 1; _bi >= 0; --_bi) {
	          var _block3 = this._blocks[_bi];

	          var _blockInputPos2 = _block3.nearestInputPos(0, DIRECTION.NONE); // is input


	          if (!_block3.value.length || _blockInputPos2 !== _block3.value.length) {
	            return this._blockStartPos(_bi) + _block3.value.length;
	          }
	        }

	        return cursorPos;
	      }

	      if (direction === DIRECTION.LEFT || direction === DIRECTION.FORCE_LEFT) {
	        // -
	        //  any|filled-input
	        // <-
	        //  any|first not empty is not-len-aligned
	        //  not-0-aligned|any
	        // ->
	        //  any|not-len-aligned or end
	        // check if first block at right is filled input
	        var firstFilledBlockIndexAtRight;

	        for (var _bi2 = searchBlockIndex; _bi2 < this._blocks.length; ++_bi2) {
	          if (this._blocks[_bi2].value) {
	            firstFilledBlockIndexAtRight = _bi2;
	            break;
	          }
	        }

	        if (firstFilledBlockIndexAtRight != null) {
	          var filledBlock = this._blocks[firstFilledBlockIndexAtRight];

	          var _blockInputPos3 = filledBlock.nearestInputPos(0, DIRECTION.RIGHT);

	          if (_blockInputPos3 === 0 && filledBlock.unmaskedValue.length) {
	            // filled block is input
	            return this._blockStartPos(firstFilledBlockIndexAtRight) + _blockInputPos3;
	          }
	        } // <-
	        // find this vars


	        var firstFilledInputBlockIndex = -1;
	        var firstEmptyInputBlockIndex; // TODO consider nested empty inputs

	        for (var _bi3 = searchBlockIndex - 1; _bi3 >= 0; --_bi3) {
	          var _block4 = this._blocks[_bi3];

	          var _blockInputPos4 = _block4.nearestInputPos(_block4.value.length, DIRECTION.FORCE_LEFT);

	          if (!_block4.value || _blockInputPos4 !== 0) firstEmptyInputBlockIndex = _bi3;

	          if (_blockInputPos4 !== 0) {
	            if (_blockInputPos4 !== _block4.value.length) {
	              // aligned inside block - return immediately
	              return this._blockStartPos(_bi3) + _blockInputPos4;
	            } else {
	              // found filled
	              firstFilledInputBlockIndex = _bi3;
	              break;
	            }
	          }
	        }

	        if (direction === DIRECTION.LEFT) {
	          // try find first empty input before start searching position only when not forced
	          for (var _bi4 = firstFilledInputBlockIndex + 1; _bi4 <= Math.min(searchBlockIndex, this._blocks.length - 1); ++_bi4) {
	            var _block5 = this._blocks[_bi4];

	            var _blockInputPos5 = _block5.nearestInputPos(0, DIRECTION.NONE);

	            var blockAlignedPos = this._blockStartPos(_bi4) + _blockInputPos5;

	            if (blockAlignedPos > cursorPos) break; // if block is not lazy input

	            if (_blockInputPos5 !== _block5.value.length) return blockAlignedPos;
	          }
	        } // process overflow


	        if (firstFilledInputBlockIndex >= 0) {
	          return this._blockStartPos(firstFilledInputBlockIndex) + this._blocks[firstFilledInputBlockIndex].value.length;
	        } // for lazy if has aligned left inside fixed and has came to the start - use start position


	        if (direction === DIRECTION.FORCE_LEFT || this.lazy && !this.extractInput() && !isInput(this._blocks[searchBlockIndex])) {
	          return 0;
	        }

	        if (firstEmptyInputBlockIndex != null) {
	          return this._blockStartPos(firstEmptyInputBlockIndex);
	        } // find first input


	        for (var _bi5 = searchBlockIndex; _bi5 < this._blocks.length; ++_bi5) {
	          var _block6 = this._blocks[_bi5];

	          var _blockInputPos6 = _block6.nearestInputPos(0, DIRECTION.NONE); // is input


	          if (!_block6.value.length || _blockInputPos6 !== _block6.value.length) {
	            return this._blockStartPos(_bi5) + _blockInputPos6;
	          }
	        }

	        return 0;
	      }

	      if (direction === DIRECTION.RIGHT || direction === DIRECTION.FORCE_RIGHT) {
	        // ->
	        //  any|not-len-aligned and filled
	        //  any|not-len-aligned
	        // <-
	        //  not-0-aligned or start|any
	        var firstInputBlockAlignedIndex;
	        var firstInputBlockAlignedPos;

	        for (var _bi6 = searchBlockIndex; _bi6 < this._blocks.length; ++_bi6) {
	          var _block7 = this._blocks[_bi6];

	          var _blockInputPos7 = _block7.nearestInputPos(0, DIRECTION.NONE);

	          if (_blockInputPos7 !== _block7.value.length) {
	            firstInputBlockAlignedPos = this._blockStartPos(_bi6) + _blockInputPos7;
	            firstInputBlockAlignedIndex = _bi6;
	            break;
	          }
	        }

	        if (firstInputBlockAlignedIndex != null && firstInputBlockAlignedPos != null) {
	          for (var _bi7 = firstInputBlockAlignedIndex; _bi7 < this._blocks.length; ++_bi7) {
	            var _block8 = this._blocks[_bi7];

	            var _blockInputPos8 = _block8.nearestInputPos(0, DIRECTION.FORCE_RIGHT);

	            if (_blockInputPos8 !== _block8.value.length) {
	              return this._blockStartPos(_bi7) + _blockInputPos8;
	            }
	          }

	          return direction === DIRECTION.FORCE_RIGHT ? this.value.length : firstInputBlockAlignedPos;
	        }

	        for (var _bi8 = Math.min(searchBlockIndex, this._blocks.length - 1); _bi8 >= 0; --_bi8) {
	          var _block9 = this._blocks[_bi8];

	          var _blockInputPos9 = _block9.nearestInputPos(_block9.value.length, DIRECTION.LEFT);

	          if (_blockInputPos9 !== 0) {
	            var alignedPos = this._blockStartPos(_bi8) + _blockInputPos9;

	            if (alignedPos >= cursorPos) return alignedPos;
	            break;
	          }
	        }
	      }

	      return cursorPos;
	    }
	    /** Get block by name */

	  }, {
	    key: "maskedBlock",
	    value: function maskedBlock(name) {
	      return this.maskedBlocks(name)[0];
	    }
	    /** Get all blocks by name */

	  }, {
	    key: "maskedBlocks",
	    value: function maskedBlocks(name) {
	      var _this4 = this;

	      var indices = this._maskedBlocks[name];
	      if (!indices) return [];
	      return indices.map(function (gi) {
	        return _this4._blocks[gi];
	      });
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return Object.assign({}, _get(_getPrototypeOf(MaskedPattern.prototype), "state", this), {
	        _blocks: this._blocks.map(function (b) {
	          return b.state;
	        })
	      });
	    },
	    set: function set(state) {
	      var _blocks = state._blocks,
	          maskedState = _objectWithoutProperties(state, ["_blocks"]);

	      this._blocks.forEach(function (b, bi) {
	        return b.state = _blocks[bi];
	      });

	      _set(_getPrototypeOf(MaskedPattern.prototype), "state", maskedState, this, true);
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return this._blocks.every(function (b) {
	        return b.isComplete;
	      });
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this._blocks.reduce(function (str, b) {
	        return str += b.unmaskedValue;
	      }, '');
	    },
	    set: function set(unmaskedValue) {
	      _set(_getPrototypeOf(MaskedPattern.prototype), "unmaskedValue", unmaskedValue, this, true);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "value",
	    get: function get() {
	      // TODO return _value when not in change?
	      return this._blocks.reduce(function (str, b) {
	        return str += b.value;
	      }, '');
	    },
	    set: function set(value) {
	      _set(_getPrototypeOf(MaskedPattern.prototype), "value", value, this, true);
	    }
	  }]);

	  return MaskedPattern;
	}(Masked);
	MaskedPattern.DEFAULTS = {
	  lazy: true,
	  placeholderChar: '_'
	};
	MaskedPattern.STOP_CHAR = '`';
	MaskedPattern.ESCAPE_CHAR = '\\';
	MaskedPattern.InputDefinition = PatternInputDefinition;
	MaskedPattern.FixedDefinition = PatternFixedDefinition;

	function isInput(block) {
	  if (!block) return false;
	  var value = block.value;
	  return !value || block.nearestInputPos(0, DIRECTION.NONE) !== value.length;
	}

	/** Pattern which accepts ranges */
	var MaskedRange =
	/*#__PURE__*/
	function (_MaskedPattern) {
	  _inherits(MaskedRange, _MaskedPattern);

	  function MaskedRange() {
	    _classCallCheck(this, MaskedRange);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedRange).apply(this, arguments));
	  }

	  _createClass(MaskedRange, [{
	    key: "_update",

	    /**
	      @override
	    */
	    value: function _update(opts) {
	      // TODO type
	      opts = Object.assign({
	        to: this.to || 0,
	        from: this.from || 0
	      }, opts);
	      var maxLength = String(opts.to).length;
	      if (opts.maxLength != null) maxLength = Math.max(maxLength, opts.maxLength);
	      opts.maxLength = maxLength;
	      var fromStr = String(opts.from).padStart(maxLength, '0');
	      var toStr = String(opts.to).padStart(maxLength, '0');
	      var sameCharsCount = 0;

	      while (sameCharsCount < toStr.length && toStr[sameCharsCount] === fromStr[sameCharsCount]) {
	        ++sameCharsCount;
	      }

	      opts.mask = toStr.slice(0, sameCharsCount).replace(/0/g, '\\0') + '0'.repeat(maxLength - sameCharsCount);

	      _get(_getPrototypeOf(MaskedRange.prototype), "_update", this).call(this, opts);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "boundaries",
	    value: function boundaries(str) {
	      var minstr = '';
	      var maxstr = '';

	      var _ref = str.match(/^(\D*)(\d*)(\D*)/) || [],
	          _ref2 = _slicedToArray(_ref, 3),
	          placeholder = _ref2[1],
	          num = _ref2[2];

	      if (num) {
	        minstr = '0'.repeat(placeholder.length) + num;
	        maxstr = '9'.repeat(placeholder.length) + num;
	      }

	      minstr = minstr.padEnd(this.maxLength, '0');
	      maxstr = maxstr.padEnd(this.maxLength, '9');
	      return [minstr, maxstr];
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doPrepare",
	    value: function doPrepare(str) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      str = _get(_getPrototypeOf(MaskedRange.prototype), "doPrepare", this).call(this, str, flags).replace(/\D/g, '');
	      if (!this.autofix) return str;
	      var fromStr = String(this.from).padStart(this.maxLength, '0');
	      var toStr = String(this.to).padStart(this.maxLength, '0');
	      var val = this.value;
	      var prepStr = '';

	      for (var ci = 0; ci < str.length; ++ci) {
	        var nextVal = val + prepStr + str[ci];

	        var _this$boundaries = this.boundaries(nextVal),
	            _this$boundaries2 = _slicedToArray(_this$boundaries, 2),
	            minstr = _this$boundaries2[0],
	            maxstr = _this$boundaries2[1];

	        if (Number(maxstr) < this.from) prepStr += fromStr[nextVal.length - 1];else if (Number(minstr) > this.to) prepStr += toStr[nextVal.length - 1];else prepStr += str[ci];
	      }

	      return prepStr;
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _get2;

	      var str = this.value;
	      var firstNonZero = str.search(/[^0]/);
	      if (firstNonZero === -1 && str.length <= this._matchFrom) return true;

	      var _this$boundaries3 = this.boundaries(str),
	          _this$boundaries4 = _slicedToArray(_this$boundaries3, 2),
	          minstr = _this$boundaries4[0],
	          maxstr = _this$boundaries4[1];

	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return this.from <= Number(maxstr) && Number(minstr) <= this.to && (_get2 = _get(_getPrototypeOf(MaskedRange.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args));
	    }
	  }, {
	    key: "_matchFrom",

	    /**
	      Optionally sets max length of pattern.
	      Used when pattern length is longer then `to` param length. Pads zeros at start in this case.
	    */

	    /** Min bound */

	    /** Max bound */

	    /** */
	    get: function get() {
	      return this.maxLength - String(this.from).length;
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return _get(_getPrototypeOf(MaskedRange.prototype), "isComplete", this) && Boolean(this.value);
	    }
	  }]);

	  return MaskedRange;
	}(MaskedPattern);

	/** Date mask */

	var MaskedDate =
	/*#__PURE__*/
	function (_MaskedPattern) {
	  _inherits(MaskedDate, _MaskedPattern);

	  /** Parse string to Date */

	  /** Format Date to string */

	  /** Pattern mask for date according to {@link MaskedDate#format} */

	  /** Start date */

	  /** End date */

	  /** */

	  /**
	    @param {Object} opts
	  */
	  function MaskedDate(opts) {
	    _classCallCheck(this, MaskedDate);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedDate).call(this, Object.assign({}, MaskedDate.DEFAULTS, {}, opts)));
	  }
	  /**
	    @override
	  */


	  _createClass(MaskedDate, [{
	    key: "_update",
	    value: function _update(opts) {
	      if (opts.mask === Date) delete opts.mask;
	      if (opts.pattern) opts.mask = opts.pattern;
	      var blocks = opts.blocks;
	      opts.blocks = Object.assign({}, MaskedDate.GET_DEFAULT_BLOCKS()); // adjust year block

	      if (opts.min) opts.blocks.Y.from = opts.min.getFullYear();
	      if (opts.max) opts.blocks.Y.to = opts.max.getFullYear();

	      if (opts.min && opts.max && opts.blocks.Y.from === opts.blocks.Y.to) {
	        opts.blocks.m.from = opts.min.getMonth() + 1;
	        opts.blocks.m.to = opts.max.getMonth() + 1;

	        if (opts.blocks.m.from === opts.blocks.m.to) {
	          opts.blocks.d.from = opts.min.getDate();
	          opts.blocks.d.to = opts.max.getDate();
	        }
	      }

	      Object.assign(opts.blocks, blocks); // add autofix

	      Object.keys(opts.blocks).forEach(function (bk) {
	        var b = opts.blocks[bk];
	        if (!('autofix' in b)) b.autofix = opts.autofix;
	      });

	      _get(_getPrototypeOf(MaskedDate.prototype), "_update", this).call(this, opts);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _get2;

	      var date = this.date;

	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return (_get2 = _get(_getPrototypeOf(MaskedDate.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args)) && (!this.isComplete || this.isDateExist(this.value) && date != null && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
	    }
	    /** Checks if date is exists */

	  }, {
	    key: "isDateExist",
	    value: function isDateExist(str) {
	      return this.format(this.parse(str)) === str;
	    }
	    /** Parsed Date */

	  }, {
	    key: "date",
	    get: function get() {
	      return this.isComplete ? this.parse(this.value) : null;
	    },
	    set: function set(date) {
	      this.value = this.format(date);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.date;
	    },
	    set: function set(value) {
	      this.date = value;
	    }
	  }]);

	  return MaskedDate;
	}(MaskedPattern);
	MaskedDate.DEFAULTS = {
	  pattern: 'd{.}`m{.}`Y',
	  format: function format(date) {
	    var day = String(date.getDate()).padStart(2, '0');
	    var month = String(date.getMonth() + 1).padStart(2, '0');
	    var year = date.getFullYear();
	    return [day, month, year].join('.');
	  },
	  parse: function parse(str) {
	    var _str$split = str.split('.'),
	        _str$split2 = _slicedToArray(_str$split, 3),
	        day = _str$split2[0],
	        month = _str$split2[1],
	        year = _str$split2[2];

	    return new Date(year, month - 1, day);
	  }
	};

	MaskedDate.GET_DEFAULT_BLOCKS = function () {
	  return {
	    d: {
	      mask: MaskedRange,
	      from: 1,
	      to: 31,
	      maxLength: 2
	    },
	    m: {
	      mask: MaskedRange,
	      from: 1,
	      to: 12,
	      maxLength: 2
	    },
	    Y: {
	      mask: MaskedRange,
	      from: 1900,
	      to: 9999
	    }
	  };
	};

	/**
	  Generic element API to use with mask
	  @interface
	*/
	var MaskElement =
	/*#__PURE__*/
	function () {
	  function MaskElement() {
	    _classCallCheck(this, MaskElement);
	  }

	  _createClass(MaskElement, [{
	    key: "select",

	    /** Safely sets element selection */
	    value: function select(start, end) {
	      if (start == null || end == null || start === this.selectionStart && end === this.selectionEnd) return;

	      try {
	        this._unsafeSelect(start, end);
	      } catch (e) {}
	    }
	    /** Should be overriden in subclasses */

	  }, {
	    key: "_unsafeSelect",
	    value: function _unsafeSelect(start, end) {}
	    /** Should be overriden in subclasses */

	  }, {
	    key: "bindEvents",

	    /** Should be overriden in subclasses */
	    value: function bindEvents(handlers) {}
	    /** Should be overriden in subclasses */

	  }, {
	    key: "unbindEvents",
	    value: function unbindEvents() {}
	  }, {
	    key: "selectionStart",

	    /** */

	    /** */

	    /** */

	    /** Safely returns selection start */
	    get: function get() {
	      var start;

	      try {
	        start = this._unsafeSelectionStart;
	      } catch (e) {}

	      return start != null ? start : this.value.length;
	    }
	    /** Safely returns selection end */

	  }, {
	    key: "selectionEnd",
	    get: function get() {
	      var end;

	      try {
	        end = this._unsafeSelectionEnd;
	      } catch (e) {}

	      return end != null ? end : this.value.length;
	    }
	  }, {
	    key: "isActive",
	    get: function get() {
	      return false;
	    }
	  }]);

	  return MaskElement;
	}();

	/** Bridge between HTMLElement and {@link Masked} */

	var HTMLMaskElement =
	/*#__PURE__*/
	function (_MaskElement) {
	  _inherits(HTMLMaskElement, _MaskElement);

	  /** Mapping between HTMLElement events and mask internal events */

	  /** HTMLElement to use mask on */

	  /**
	    @param {HTMLInputElement|HTMLTextAreaElement} input
	  */
	  function HTMLMaskElement(input) {
	    var _this;

	    _classCallCheck(this, HTMLMaskElement);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(HTMLMaskElement).call(this));
	    _this.input = input;
	    _this._handlers = {};
	    return _this;
	  }
	  /**
	    Is element in focus
	    @readonly
	  */


	  _createClass(HTMLMaskElement, [{
	    key: "_unsafeSelect",

	    /**
	      Sets HTMLElement selection
	      @override
	    */
	    value: function _unsafeSelect(start, end) {
	      this.input.setSelectionRange(start, end);
	    }
	    /**
	      HTMLElement value
	      @override
	    */

	  }, {
	    key: "bindEvents",

	    /**
	      Binds HTMLElement events to mask internal events
	      @override
	    */
	    value: function bindEvents(handlers) {
	      var _this2 = this;

	      Object.keys(handlers).forEach(function (event) {
	        return _this2._toggleEventHandler(HTMLMaskElement.EVENTS_MAP[event], handlers[event]);
	      });
	    }
	    /**
	      Unbinds HTMLElement events to mask internal events
	      @override
	    */

	  }, {
	    key: "unbindEvents",
	    value: function unbindEvents() {
	      var _this3 = this;

	      Object.keys(this._handlers).forEach(function (event) {
	        return _this3._toggleEventHandler(event);
	      });
	    }
	    /** */

	  }, {
	    key: "_toggleEventHandler",
	    value: function _toggleEventHandler(event, handler) {
	      if (this._handlers[event]) {
	        this.input.removeEventListener(event, this._handlers[event]);
	        delete this._handlers[event];
	      }

	      if (handler) {
	        this.input.addEventListener(event, handler);
	        this._handlers[event] = handler;
	      }
	    }
	  }, {
	    key: "isActive",
	    get: function get() {
	      return this.input === document.activeElement;
	    }
	    /**
	      Returns HTMLElement selection start
	      @override
	    */

	  }, {
	    key: "_unsafeSelectionStart",
	    get: function get() {
	      return this.input.selectionStart;
	    }
	    /**
	      Returns HTMLElement selection end
	      @override
	    */

	  }, {
	    key: "_unsafeSelectionEnd",
	    get: function get() {
	      return this.input.selectionEnd;
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this.input.value;
	    },
	    set: function set(value) {
	      this.input.value = value;
	    }
	  }]);

	  return HTMLMaskElement;
	}(MaskElement);
	HTMLMaskElement.EVENTS_MAP = {
	  selectionChange: 'keydown',
	  input: 'input',
	  drop: 'drop',
	  click: 'click',
	  focus: 'focus',
	  commit: 'blur'
	};

	/** Listens to element events and controls changes between element and {@link Masked} */

	var InputMask =
	/*#__PURE__*/
	function () {
	  /**
	    View element
	    @readonly
	  */

	  /**
	    Internal {@link Masked} model
	    @readonly
	  */

	  /**
	    @param {MaskElement|HTMLInputElement|HTMLTextAreaElement} el
	    @param {Object} opts
	  */
	  function InputMask(el, opts) {
	    _classCallCheck(this, InputMask);

	    this.el = el instanceof MaskElement ? el : new HTMLMaskElement(el);
	    this.masked = createMask(opts);
	    this._listeners = {};
	    this._value = '';
	    this._unmaskedValue = '';
	    this._saveSelection = this._saveSelection.bind(this);
	    this._onInput = this._onInput.bind(this);
	    this._onChange = this._onChange.bind(this);
	    this._onDrop = this._onDrop.bind(this);
	    this._onFocus = this._onFocus.bind(this);
	    this.alignCursor = this.alignCursor.bind(this);
	    this.alignCursorFriendly = this.alignCursorFriendly.bind(this);

	    this._bindEvents(); // refresh


	    this.updateValue();

	    this._onChange();
	  }
	  /** Read or update mask */


	  _createClass(InputMask, [{
	    key: "maskEquals",
	    value: function maskEquals(mask) {
	      return mask == null || mask === this.masked.mask || mask === Date && this.masked instanceof MaskedDate;
	    }
	  }, {
	    key: "_bindEvents",

	    /**
	      Starts listening to element events
	      @protected
	    */
	    value: function _bindEvents() {
	      this.el.bindEvents({
	        selectionChange: this._saveSelection,
	        input: this._onInput,
	        drop: this._onDrop,
	        click: this.alignCursorFriendly,
	        focus: this._onFocus,
	        commit: this._onChange
	      });
	    }
	    /**
	      Stops listening to element events
	      @protected
	     */

	  }, {
	    key: "_unbindEvents",
	    value: function _unbindEvents() {
	      this.el.unbindEvents();
	    }
	    /**
	      Fires custom event
	      @protected
	     */

	  }, {
	    key: "_fireEvent",
	    value: function _fireEvent(ev) {
	      var listeners = this._listeners[ev];
	      if (!listeners) return;
	      listeners.forEach(function (l) {
	        return l();
	      });
	    }
	    /**
	      Current selection start
	      @readonly
	    */

	  }, {
	    key: "_saveSelection",

	    /**
	      Stores current selection
	      @protected
	    */
	    value: function _saveSelection()
	    /* ev */
	    {
	      if (this.value !== this.el.value) {
	        console.warn('Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly.'); // eslint-disable-line no-console
	      }

	      this._selection = {
	        start: this.selectionStart,
	        end: this.cursorPos
	      };
	    }
	    /** Syncronizes model value from view */

	  }, {
	    key: "updateValue",
	    value: function updateValue() {
	      this.masked.value = this.el.value;
	      this._value = this.masked.value;
	    }
	    /** Syncronizes view from model value, fires change events */

	  }, {
	    key: "updateControl",
	    value: function updateControl() {
	      var newUnmaskedValue = this.masked.unmaskedValue;
	      var newValue = this.masked.value;
	      var isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue;
	      this._unmaskedValue = newUnmaskedValue;
	      this._value = newValue;
	      if (this.el.value !== newValue) this.el.value = newValue;
	      if (isChanged) this._fireChangeEvents();
	    }
	    /** Updates options with deep equal check, recreates @{link Masked} model if mask type changes */

	  }, {
	    key: "updateOptions",
	    value: function updateOptions(opts) {
	      var mask = opts.mask,
	          restOpts = _objectWithoutProperties(opts, ["mask"]);

	      var updateMask = !this.maskEquals(mask);
	      var updateOpts = !objectIncludes(this.masked, restOpts);
	      if (updateMask) this.mask = mask;
	      if (updateOpts) this.masked.updateOptions(restOpts);
	      if (updateMask || updateOpts) this.updateControl();
	    }
	    /** Updates cursor */

	  }, {
	    key: "updateCursor",
	    value: function updateCursor(cursorPos) {
	      if (cursorPos == null) return;
	      this.cursorPos = cursorPos; // also queue change cursor for mobile browsers

	      this._delayUpdateCursor(cursorPos);
	    }
	    /**
	      Delays cursor update to support mobile browsers
	      @private
	    */

	  }, {
	    key: "_delayUpdateCursor",
	    value: function _delayUpdateCursor(cursorPos) {
	      var _this = this;

	      this._abortUpdateCursor();

	      this._changingCursorPos = cursorPos;
	      this._cursorChanging = setTimeout(function () {
	        if (!_this.el) return; // if was destroyed

	        _this.cursorPos = _this._changingCursorPos;

	        _this._abortUpdateCursor();
	      }, 10);
	    }
	    /**
	      Fires custom events
	      @protected
	    */

	  }, {
	    key: "_fireChangeEvents",
	    value: function _fireChangeEvents() {
	      this._fireEvent('accept');

	      if (this.masked.isComplete) this._fireEvent('complete');
	    }
	    /**
	      Aborts delayed cursor update
	      @private
	    */

	  }, {
	    key: "_abortUpdateCursor",
	    value: function _abortUpdateCursor() {
	      if (this._cursorChanging) {
	        clearTimeout(this._cursorChanging);
	        delete this._cursorChanging;
	      }
	    }
	    /** Aligns cursor to nearest available position */

	  }, {
	    key: "alignCursor",
	    value: function alignCursor() {
	      this.cursorPos = this.masked.nearestInputPos(this.cursorPos, DIRECTION.LEFT);
	    }
	    /** Aligns cursor only if selection is empty */

	  }, {
	    key: "alignCursorFriendly",
	    value: function alignCursorFriendly() {
	      if (this.selectionStart !== this.cursorPos) return; // skip if range is selected

	      this.alignCursor();
	    }
	    /** Adds listener on custom event */

	  }, {
	    key: "on",
	    value: function on(ev, handler) {
	      if (!this._listeners[ev]) this._listeners[ev] = [];

	      this._listeners[ev].push(handler);

	      return this;
	    }
	    /** Removes custom event listener */

	  }, {
	    key: "off",
	    value: function off(ev, handler) {
	      if (!this._listeners[ev]) return this;

	      if (!handler) {
	        delete this._listeners[ev];
	        return this;
	      }

	      var hIndex = this._listeners[ev].indexOf(handler);

	      if (hIndex >= 0) this._listeners[ev].splice(hIndex, 1);
	      return this;
	    }
	    /** Handles view input event */

	  }, {
	    key: "_onInput",
	    value: function _onInput() {
	      this._abortUpdateCursor(); // fix strange IE behavior


	      if (!this._selection) return this.updateValue();
	      var details = new ActionDetails( // new state
	      this.el.value, this.cursorPos, // old state
	      this.value, this._selection);
	      var oldRawValue = this.masked.rawInputValue;
	      var offset = this.masked.splice(details.startChangePos, details.removed.length, details.inserted, details.removeDirection).offset; // force align in remove direction only if no input chars were removed
	      // otherwise we still need to align with NONE (to get out from fixed symbols for instance)

	      var removeDirection = oldRawValue === this.masked.rawInputValue ? details.removeDirection : DIRECTION.NONE;
	      var cursorPos = this.masked.nearestInputPos(details.startChangePos + offset, removeDirection);
	      this.updateControl();
	      this.updateCursor(cursorPos);
	    }
	    /** Handles view change event and commits model value */

	  }, {
	    key: "_onChange",
	    value: function _onChange() {
	      if (this.value !== this.el.value) {
	        this.updateValue();
	      }

	      this.masked.doCommit();
	      this.updateControl();

	      this._saveSelection();
	    }
	    /** Handles view drop event, prevents by default */

	  }, {
	    key: "_onDrop",
	    value: function _onDrop(ev) {
	      ev.preventDefault();
	      ev.stopPropagation();
	    }
	    /** Restore last selection on focus */

	  }, {
	    key: "_onFocus",
	    value: function _onFocus(ev) {
	      if (this.selectionStart !== this.cursorPos) return; // skip if range is selected

	      if (this._selection) this.cursorPos = this._selection.end;
	      this.alignCursorFriendly();
	    }
	    /** Unbind view events and removes element reference */

	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this._unbindEvents(); // $FlowFixMe why not do so?


	      this._listeners.length = 0;
	      delete this.el;
	    }
	  }, {
	    key: "mask",
	    get: function get() {
	      return this.masked.mask;
	    },
	    set: function set(mask) {
	      if (this.maskEquals(mask)) return;

	      if (this.masked.constructor === maskedClass(mask)) {
	        this.masked.updateOptions({
	          mask: mask
	        });
	        return;
	      }

	      var masked = createMask({
	        mask: mask
	      });
	      masked.unmaskedValue = this.masked.unmaskedValue;
	      this.masked = masked;
	    }
	    /** Raw value */

	  }, {
	    key: "value",
	    get: function get() {
	      return this._value;
	    },
	    set: function set(str) {
	      this.masked.value = str;
	      this.updateControl();
	      this.alignCursor();
	    }
	    /** Unmasked value */

	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this._unmaskedValue;
	    },
	    set: function set(str) {
	      this.masked.unmaskedValue = str;
	      this.updateControl();
	      this.alignCursor();
	    }
	    /** Typed unmasked value */

	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.masked.typedValue;
	    },
	    set: function set(val) {
	      this.masked.typedValue = val;
	      this.updateControl();
	      this.alignCursor();
	    }
	  }, {
	    key: "selectionStart",
	    get: function get() {
	      return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
	    }
	    /** Current cursor position */

	  }, {
	    key: "cursorPos",
	    get: function get() {
	      return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
	    },
	    set: function set(pos) {
	      if (!this.el.isActive) return;
	      this.el.select(pos, pos);

	      this._saveSelection();
	    }
	  }]);

	  return InputMask;
	}();

	/** Pattern which validates enum values */

	var MaskedEnum =
	/*#__PURE__*/
	function (_MaskedPattern) {
	  _inherits(MaskedEnum, _MaskedPattern);

	  function MaskedEnum() {
	    _classCallCheck(this, MaskedEnum);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedEnum).apply(this, arguments));
	  }

	  _createClass(MaskedEnum, [{
	    key: "_update",

	    /**
	      @override
	      @param {Object} opts
	    */
	    value: function _update(opts) {
	      // TODO type
	      if (opts.enum) opts.mask = '*'.repeat(opts.enum[0].length);

	      _get(_getPrototypeOf(MaskedEnum.prototype), "_update", this).call(this, opts);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _this = this,
	          _get2;

	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return this.enum.some(function (e) {
	        return e.indexOf(_this.unmaskedValue) >= 0;
	      }) && (_get2 = _get(_getPrototypeOf(MaskedEnum.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args));
	    }
	  }]);

	  return MaskedEnum;
	}(MaskedPattern);

	/**
	  Number mask
	  @param {Object} opts
	  @param {string} opts.radix - Single char
	  @param {string} opts.thousandsSeparator - Single char
	  @param {Array<string>} opts.mapToRadix - Array of single chars
	  @param {number} opts.min
	  @param {number} opts.max
	  @param {number} opts.scale - Digits after point
	  @param {boolean} opts.signed - Allow negative
	  @param {boolean} opts.normalizeZeros - Flag to remove leading and trailing zeros in the end of editing
	  @param {boolean} opts.padFractionalZeros - Flag to pad trailing zeros after point in the end of editing
	*/
	var MaskedNumber =
	/*#__PURE__*/
	function (_Masked) {
	  _inherits(MaskedNumber, _Masked);

	  /** Single char */

	  /** Single char */

	  /** Array of single chars */

	  /** */

	  /** */

	  /** Digits after point */

	  /** */

	  /** Flag to remove leading and trailing zeros in the end of editing */

	  /** Flag to pad trailing zeros after point in the end of editing */
	  function MaskedNumber(opts) {
	    _classCallCheck(this, MaskedNumber);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedNumber).call(this, Object.assign({}, MaskedNumber.DEFAULTS, {}, opts)));
	  }
	  /**
	    @override
	  */


	  _createClass(MaskedNumber, [{
	    key: "_update",
	    value: function _update(opts) {
	      _get(_getPrototypeOf(MaskedNumber.prototype), "_update", this).call(this, opts);

	      this._updateRegExps();
	    }
	    /** */

	  }, {
	    key: "_updateRegExps",
	    value: function _updateRegExps() {
	      // use different regexp to process user input (more strict, input suffix) and tail shifting
	      var start = '^' + (this.allowNegative ? '[+|\\-]?' : '');
	      var midInput = '(0|([1-9]+\\d*))?';
	      var mid = '\\d*';
	      var end = (this.scale ? '(' + escapeRegExp(this.radix) + '\\d{0,' + this.scale + '})?' : '') + '$';
	      this._numberRegExpInput = new RegExp(start + midInput + end);
	      this._numberRegExp = new RegExp(start + mid + end);
	      this._mapToRadixRegExp = new RegExp('[' + this.mapToRadix.map(escapeRegExp).join('') + ']', 'g');
	      this._thousandsSeparatorRegExp = new RegExp(escapeRegExp(this.thousandsSeparator), 'g');
	    }
	    /** */

	  }, {
	    key: "_removeThousandsSeparators",
	    value: function _removeThousandsSeparators(value) {
	      return value.replace(this._thousandsSeparatorRegExp, '');
	    }
	    /** */

	  }, {
	    key: "_insertThousandsSeparators",
	    value: function _insertThousandsSeparators(value) {
	      // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
	      var parts = value.split(this.radix);
	      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
	      return parts.join(this.radix);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doPrepare",
	    value: function doPrepare(str) {
	      var _get2;

	      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      return (_get2 = _get(_getPrototypeOf(MaskedNumber.prototype), "doPrepare", this)).call.apply(_get2, [this, this._removeThousandsSeparators(str.replace(this._mapToRadixRegExp, this.radix))].concat(args));
	    }
	    /** */

	  }, {
	    key: "_separatorsCount",
	    value: function _separatorsCount(to) {
	      var extendOnSeparators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      var count = 0;

	      for (var pos = 0; pos < to; ++pos) {
	        if (this._value.indexOf(this.thousandsSeparator, pos) === pos) {
	          ++count;
	          if (extendOnSeparators) to += this.thousandsSeparator.length;
	        }
	      }

	      return count;
	    }
	    /** */

	  }, {
	    key: "_separatorsCountFromSlice",
	    value: function _separatorsCountFromSlice() {
	      var slice = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._value;
	      return this._separatorsCount(this._removeThousandsSeparators(slice).length, true);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "extractInput",
	    value: function extractInput() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
	      var flags = arguments.length > 2 ? arguments[2] : undefined;

	      var _this$_adjustRangeWit = this._adjustRangeWithSeparators(fromPos, toPos);

	      var _this$_adjustRangeWit2 = _slicedToArray(_this$_adjustRangeWit, 2);

	      fromPos = _this$_adjustRangeWit2[0];
	      toPos = _this$_adjustRangeWit2[1];
	      return this._removeThousandsSeparators(_get(_getPrototypeOf(MaskedNumber.prototype), "extractInput", this).call(this, fromPos, toPos, flags));
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "_appendCharRaw",
	    value: function _appendCharRaw(ch) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      if (!this.thousandsSeparator) return _get(_getPrototypeOf(MaskedNumber.prototype), "_appendCharRaw", this).call(this, ch, flags);
	      var prevBeforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;

	      var prevBeforeTailSeparatorsCount = this._separatorsCountFromSlice(prevBeforeTailValue);

	      this._value = this._removeThousandsSeparators(this.value);

	      var appendDetails = _get(_getPrototypeOf(MaskedNumber.prototype), "_appendCharRaw", this).call(this, ch, flags);

	      this._value = this._insertThousandsSeparators(this._value);
	      var beforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;

	      var beforeTailSeparatorsCount = this._separatorsCountFromSlice(beforeTailValue);

	      appendDetails.tailShift += (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length;
	      return appendDetails;
	    }
	    /** */

	  }, {
	    key: "_findSeparatorAround",
	    value: function _findSeparatorAround(pos) {
	      if (this.thousandsSeparator) {
	        var searchFrom = pos - this.thousandsSeparator.length + 1;
	        var separatorPos = this.value.indexOf(this.thousandsSeparator, searchFrom);
	        if (separatorPos <= pos) return separatorPos;
	      }

	      return -1;
	    }
	  }, {
	    key: "_adjustRangeWithSeparators",
	    value: function _adjustRangeWithSeparators(from, to) {
	      var separatorAroundFromPos = this._findSeparatorAround(from);

	      if (separatorAroundFromPos >= 0) from = separatorAroundFromPos;

	      var separatorAroundToPos = this._findSeparatorAround(to);

	      if (separatorAroundToPos >= 0) to = separatorAroundToPos + this.thousandsSeparator.length;
	      return [from, to];
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "remove",
	    value: function remove() {
	      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;

	      var _this$_adjustRangeWit3 = this._adjustRangeWithSeparators(fromPos, toPos);

	      var _this$_adjustRangeWit4 = _slicedToArray(_this$_adjustRangeWit3, 2);

	      fromPos = _this$_adjustRangeWit4[0];
	      toPos = _this$_adjustRangeWit4[1];
	      var valueBeforePos = this.value.slice(0, fromPos);
	      var valueAfterPos = this.value.slice(toPos);

	      var prevBeforeTailSeparatorsCount = this._separatorsCount(valueBeforePos.length);

	      this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(valueBeforePos + valueAfterPos));

	      var beforeTailSeparatorsCount = this._separatorsCountFromSlice(valueBeforePos);

	      return new ChangeDetails({
	        tailShift: (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length
	      });
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos(cursorPos, direction) {
	      if (!this.thousandsSeparator) return cursorPos;

	      switch (direction) {
	        case DIRECTION.NONE:
	        case DIRECTION.LEFT:
	        case DIRECTION.FORCE_LEFT:
	          {
	            var separatorAtLeftPos = this._findSeparatorAround(cursorPos - 1);

	            if (separatorAtLeftPos >= 0) {
	              var separatorAtLeftEndPos = separatorAtLeftPos + this.thousandsSeparator.length;

	              if (cursorPos < separatorAtLeftEndPos || this.value.length <= separatorAtLeftEndPos || direction === DIRECTION.FORCE_LEFT) {
	                return separatorAtLeftPos;
	              }
	            }

	            break;
	          }

	        case DIRECTION.RIGHT:
	        case DIRECTION.FORCE_RIGHT:
	          {
	            var separatorAtRightPos = this._findSeparatorAround(cursorPos);

	            if (separatorAtRightPos >= 0) {
	              return separatorAtRightPos + this.thousandsSeparator.length;
	            }
	          }
	      }

	      return cursorPos;
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doValidate",
	    value: function doValidate(flags) {
	      var regexp = flags.input ? this._numberRegExpInput : this._numberRegExp; // validate as string

	      var valid = regexp.test(this._removeThousandsSeparators(this.value));

	      if (valid) {
	        // validate as number
	        var number = this.number;
	        valid = valid && !isNaN(number) && ( // check min bound for negative values
	        this.min == null || this.min >= 0 || this.min <= this.number) && ( // check max bound for positive values
	        this.max == null || this.max <= 0 || this.number <= this.max);
	      }

	      return valid && _get(_getPrototypeOf(MaskedNumber.prototype), "doValidate", this).call(this, flags);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      if (this.value) {
	        var number = this.number;
	        var validnum = number; // check bounds

	        if (this.min != null) validnum = Math.max(validnum, this.min);
	        if (this.max != null) validnum = Math.min(validnum, this.max);
	        if (validnum !== number) this.unmaskedValue = String(validnum);
	        var formatted = this.value;
	        if (this.normalizeZeros) formatted = this._normalizeZeros(formatted);
	        if (this.padFractionalZeros) formatted = this._padFractionalZeros(formatted);
	        this._value = formatted;
	      }

	      _get(_getPrototypeOf(MaskedNumber.prototype), "doCommit", this).call(this);
	    }
	    /** */

	  }, {
	    key: "_normalizeZeros",
	    value: function _normalizeZeros(value) {
	      var parts = this._removeThousandsSeparators(value).split(this.radix); // remove leading zeros


	      parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, function (match, sign, zeros, num) {
	        return sign + num;
	      }); // add leading zero

	      if (value.length && !/\d$/.test(parts[0])) parts[0] = parts[0] + '0';

	      if (parts.length > 1) {
	        parts[1] = parts[1].replace(/0*$/, ''); // remove trailing zeros

	        if (!parts[1].length) parts.length = 1; // remove fractional
	      }

	      return this._insertThousandsSeparators(parts.join(this.radix));
	    }
	    /** */

	  }, {
	    key: "_padFractionalZeros",
	    value: function _padFractionalZeros(value) {
	      if (!value) return value;
	      var parts = value.split(this.radix);
	      if (parts.length < 2) parts.push('');
	      parts[1] = parts[1].padEnd(this.scale, '0');
	      return parts.join(this.radix);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, '.');
	    },
	    set: function set(unmaskedValue) {
	      _set(_getPrototypeOf(MaskedNumber.prototype), "unmaskedValue", unmaskedValue.replace('.', this.radix), this, true);
	    }
	    /** Parsed Number */

	  }, {
	    key: "number",
	    get: function get() {
	      return Number(this.unmaskedValue);
	    },
	    set: function set(number) {
	      this.unmaskedValue = String(number);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.number;
	    },
	    set: function set(value) {
	      this.number = value;
	    }
	    /**
	      Is negative allowed
	      @readonly
	    */

	  }, {
	    key: "allowNegative",
	    get: function get() {
	      return this.signed || this.min != null && this.min < 0 || this.max != null && this.max < 0;
	    }
	  }]);

	  return MaskedNumber;
	}(Masked);
	MaskedNumber.DEFAULTS = {
	  radix: ',',
	  thousandsSeparator: '',
	  mapToRadix: ['.'],
	  scale: 2,
	  signed: false,
	  normalizeZeros: true,
	  padFractionalZeros: false
	};

	/** Masking by RegExp */

	var MaskedRegExp =
	/*#__PURE__*/
	function (_Masked) {
	  _inherits(MaskedRegExp, _Masked);

	  function MaskedRegExp() {
	    _classCallCheck(this, MaskedRegExp);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedRegExp).apply(this, arguments));
	  }

	  _createClass(MaskedRegExp, [{
	    key: "_update",

	    /**
	      @override
	      @param {Object} opts
	    */
	    value: function _update(opts) {
	      if (opts.mask) opts.validate = function (value) {
	        return value.search(opts.mask) >= 0;
	      };

	      _get(_getPrototypeOf(MaskedRegExp.prototype), "_update", this).call(this, opts);
	    }
	  }]);

	  return MaskedRegExp;
	}(Masked);

	/** Masking by custom Function */

	var MaskedFunction =
	/*#__PURE__*/
	function (_Masked) {
	  _inherits(MaskedFunction, _Masked);

	  function MaskedFunction() {
	    _classCallCheck(this, MaskedFunction);

	    return _possibleConstructorReturn(this, _getPrototypeOf(MaskedFunction).apply(this, arguments));
	  }

	  _createClass(MaskedFunction, [{
	    key: "_update",

	    /**
	      @override
	      @param {Object} opts
	    */
	    value: function _update(opts) {
	      if (opts.mask) opts.validate = opts.mask;

	      _get(_getPrototypeOf(MaskedFunction.prototype), "_update", this).call(this, opts);
	    }
	  }]);

	  return MaskedFunction;
	}(Masked);

	/** Dynamic mask for choosing apropriate mask in run-time */
	var MaskedDynamic =
	/*#__PURE__*/
	function (_Masked) {
	  _inherits(MaskedDynamic, _Masked);

	  /** Currently chosen mask */

	  /** Compliled {@link Masked} options */

	  /** Chooses {@link Masked} depending on input value */

	  /**
	    @param {Object} opts
	  */
	  function MaskedDynamic(opts) {
	    var _this;

	    _classCallCheck(this, MaskedDynamic);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(MaskedDynamic).call(this, Object.assign({}, MaskedDynamic.DEFAULTS, {}, opts)));
	    _this.currentMask = null;
	    return _this;
	  }
	  /**
	    @override
	  */


	  _createClass(MaskedDynamic, [{
	    key: "_update",
	    value: function _update(opts) {
	      _get(_getPrototypeOf(MaskedDynamic.prototype), "_update", this).call(this, opts);

	      if ('mask' in opts) {
	        // mask could be totally dynamic with only `dispatch` option
	        this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map(function (m) {
	          return createMask(m);
	        }) : [];
	      }
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "_appendCharRaw",
	    value: function _appendCharRaw() {
	      var details = this._applyDispatch.apply(this, arguments);

	      if (this.currentMask) {
	        var _this$currentMask;

	        details.aggregate((_this$currentMask = this.currentMask)._appendChar.apply(_this$currentMask, arguments));
	      }

	      return details;
	    }
	  }, {
	    key: "_applyDispatch",
	    value: function _applyDispatch() {
	      var appended = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var prevValueBeforeTail = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._value : this.value;
	      var inputValue = this.rawInputValue;
	      var insertValue = flags.tail && flags._beforeTailState != null ? // $FlowFixMe - tired to fight with type system
	      flags._beforeTailState._rawInputValue : inputValue;
	      var tailValue = inputValue.slice(insertValue.length);
	      var prevMask = this.currentMask;
	      var details = new ChangeDetails();
	      var prevMaskState = prevMask && prevMask.state; // clone flags to prevent overwriting `_beforeTailState`

	      this.currentMask = this.doDispatch(appended, Object.assign({}, flags)); // restore state after dispatch

	      if (this.currentMask) {
	        if (this.currentMask !== prevMask) {
	          // if mask changed reapply input
	          this.currentMask.reset(); // $FlowFixMe - it's ok, we don't change current mask above

	          var d = this.currentMask.append(insertValue, {
	            raw: true
	          });
	          details.tailShift = d.inserted.length - prevValueBeforeTail.length;

	          if (tailValue) {
	            // $FlowFixMe - it's ok, we don't change current mask above
	            details.tailShift += this.currentMask.append(tailValue, {
	              raw: true,
	              tail: true
	            }).tailShift;
	          }
	        } else {
	          // Dispatch can do something bad with state, so
	          // restore prev mask state
	          this.currentMask.state = prevMaskState;
	        }
	      }

	      return details;
	    }
	  }, {
	    key: "_appendPlaceholder",
	    value: function _appendPlaceholder() {
	      var details = this._applyDispatch.apply(this, arguments);

	      if (this.currentMask) {
	        details.aggregate(this.currentMask._appendPlaceholder());
	      }

	      return details;
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doDispatch",
	    value: function doDispatch(appended) {
	      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      return this.dispatch(appended, this, flags);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doValidate",
	    value: function doValidate() {
	      var _get2, _this$currentMask2;

	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return (_get2 = _get(_getPrototypeOf(MaskedDynamic.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args)) && (!this.currentMask || (_this$currentMask2 = this.currentMask).doValidate.apply(_this$currentMask2, args));
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "reset",
	    value: function reset() {
	      if (this.currentMask) this.currentMask.reset();
	      this.compiledMasks.forEach(function (m) {
	        return m.reset();
	      });
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "remove",

	    /**
	      @override
	    */
	    value: function remove() {
	      var details = new ChangeDetails();

	      if (this.currentMask) {
	        var _this$currentMask3;

	        details.aggregate((_this$currentMask3 = this.currentMask).remove.apply(_this$currentMask3, arguments)) // update with dispatch
	        .aggregate(this._applyDispatch());
	      }

	      return details;
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "extractInput",

	    /**
	      @override
	    */
	    value: function extractInput() {
	      var _this$currentMask4;

	      return this.currentMask ? (_this$currentMask4 = this.currentMask).extractInput.apply(_this$currentMask4, arguments) : '';
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "extractTail",
	    value: function extractTail() {
	      var _this$currentMask5, _get3;

	      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      return this.currentMask ? (_this$currentMask5 = this.currentMask).extractTail.apply(_this$currentMask5, args) : (_get3 = _get(_getPrototypeOf(MaskedDynamic.prototype), "extractTail", this)).call.apply(_get3, [this].concat(args));
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "doCommit",
	    value: function doCommit() {
	      if (this.currentMask) this.currentMask.doCommit();

	      _get(_getPrototypeOf(MaskedDynamic.prototype), "doCommit", this).call(this);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "nearestInputPos",
	    value: function nearestInputPos() {
	      var _this$currentMask6, _get4;

	      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      return this.currentMask ? (_this$currentMask6 = this.currentMask).nearestInputPos.apply(_this$currentMask6, args) : (_get4 = _get(_getPrototypeOf(MaskedDynamic.prototype), "nearestInputPos", this)).call.apply(_get4, [this].concat(args));
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this.currentMask ? this.currentMask.value : '';
	    },
	    set: function set(value) {
	      _set(_getPrototypeOf(MaskedDynamic.prototype), "value", value, this, true);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.currentMask ? this.currentMask.unmaskedValue : '';
	    },
	    set: function set(unmaskedValue) {
	      _set(_getPrototypeOf(MaskedDynamic.prototype), "unmaskedValue", unmaskedValue, this, true);
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.currentMask ? this.currentMask.typedValue : '';
	    } // probably typedValue should not be used with dynamic
	    ,
	    set: function set(value) {
	      var unmaskedValue = String(value); // double check it

	      if (this.currentMask) {
	        this.currentMask.typedValue = value;
	        unmaskedValue = this.currentMask.unmaskedValue;
	      }

	      this.unmaskedValue = unmaskedValue;
	    }
	    /**
	      @override
	    */

	  }, {
	    key: "isComplete",
	    get: function get() {
	      return !!this.currentMask && this.currentMask.isComplete;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return Object.assign({}, _get(_getPrototypeOf(MaskedDynamic.prototype), "state", this), {
	        _rawInputValue: this.rawInputValue,
	        compiledMasks: this.compiledMasks.map(function (m) {
	          return m.state;
	        }),
	        currentMaskRef: this.currentMask,
	        currentMask: this.currentMask && this.currentMask.state
	      });
	    },
	    set: function set(state) {
	      var compiledMasks = state.compiledMasks,
	          currentMaskRef = state.currentMaskRef,
	          currentMask = state.currentMask,
	          maskedState = _objectWithoutProperties(state, ["compiledMasks", "currentMaskRef", "currentMask"]);

	      this.compiledMasks.forEach(function (m, mi) {
	        return m.state = compiledMasks[mi];
	      });

	      if (currentMaskRef != null) {
	        this.currentMask = currentMaskRef;
	        this.currentMask.state = currentMask;
	      }

	      _set(_getPrototypeOf(MaskedDynamic.prototype), "state", maskedState, this, true);
	    }
	  }, {
	    key: "overwrite",
	    get: function get() {
	      return this.currentMask ? this.currentMask.overwrite : _get(_getPrototypeOf(MaskedDynamic.prototype), "overwrite", this);
	    },
	    set: function set(overwrite) {
	      console.warn('"overwrite" option is not available in dynamic mask, use this option in siblings');
	    }
	  }]);

	  return MaskedDynamic;
	}(Masked);
	MaskedDynamic.DEFAULTS = {
	  dispatch: function dispatch(appended, masked, flags) {
	    if (!masked.compiledMasks.length) return;
	    var inputValue = masked.rawInputValue; // simulate input

	    var inputs = masked.compiledMasks.map(function (m, index) {
	      m.reset();
	      m.append(inputValue, {
	        raw: true
	      });
	      m.append(appended, flags);
	      var weight = m.rawInputValue.length;
	      return {
	        weight: weight,
	        index: index
	      };
	    }); // pop masks with longer values first

	    inputs.sort(function (i1, i2) {
	      return i2.weight - i1.weight;
	    });
	    return masked.compiledMasks[inputs[0].index];
	  }
	};

	/**
	 * Applies mask on element.
	 * @constructor
	 * @param {HTMLInputElement|HTMLTextAreaElement|MaskElement} el - Element to apply mask
	 * @param {Object} opts - Custom mask options
	 * @return {InputMask}
	 */

	function IMask(el) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  // currently available only for input-like elements
	  return new InputMask(el, opts);
	}
	/** {@link InputMask} */


	IMask.InputMask = InputMask;
	/** {@link Masked} */

	IMask.Masked = Masked;
	/** {@link MaskedPattern} */

	IMask.MaskedPattern = MaskedPattern;
	/** {@link MaskedEnum} */

	IMask.MaskedEnum = MaskedEnum;
	/** {@link MaskedRange} */

	IMask.MaskedRange = MaskedRange;
	/** {@link MaskedNumber} */

	IMask.MaskedNumber = MaskedNumber;
	/** {@link MaskedDate} */

	IMask.MaskedDate = MaskedDate;
	/** {@link MaskedRegExp} */

	IMask.MaskedRegExp = MaskedRegExp;
	/** {@link MaskedFunction} */

	IMask.MaskedFunction = MaskedFunction;
	/** {@link MaskedDynamic} */

	IMask.MaskedDynamic = MaskedDynamic;
	/** {@link createMask} */

	IMask.createMask = createMask;
	/** {@link MaskElement} */

	IMask.MaskElement = MaskElement;
	/** {@link HTMLMaskElement} */

	IMask.HTMLMaskElement = HTMLMaskElement;
	g.IMask = IMask;

	exports.HTMLMaskElement = HTMLMaskElement;
	exports.InputMask = InputMask;
	exports.MaskElement = MaskElement;
	exports.Masked = Masked;
	exports.MaskedDate = MaskedDate;
	exports.MaskedDynamic = MaskedDynamic;
	exports.MaskedEnum = MaskedEnum;
	exports.MaskedFunction = MaskedFunction;
	exports.MaskedNumber = MaskedNumber;
	exports.MaskedPattern = MaskedPattern;
	exports.MaskedRange = MaskedRange;
	exports.MaskedRegExp = MaskedRegExp;
	exports.createMask = createMask;
	exports.default = IMask;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=imask.js.map

/*
    A simple jQuery modal (http://github.com/kylefox/jquery-modal)
    Version 0.9.1
*/
!function(o){"object"==typeof module&&"object"==typeof module.exports?o(require("jquery"),window,document):o(jQuery,window,document)}(function(o,t,i,e){var s=[],l=function(){return s.length?s[s.length-1]:null},n=function(){var o,t=!1;for(o=s.length-1;o>=0;o--)s[o].$blocker&&(s[o].$blocker.toggleClass("current",!t).toggleClass("behind",t),t=!0)};o.modal=function(t,i){var e,n;if(this.$body=o("body"),this.options=o.extend({},o.modal.defaults,i),this.options.doFade=!isNaN(parseInt(this.options.fadeDuration,10)),this.$blocker=null,this.options.closeExisting)for(;o.modal.isActive();)o.modal.close();if(s.push(this),t.is("a"))if(n=t.attr("href"),this.anchor=t,/^#/.test(n)){if(this.$elm=o(n),1!==this.$elm.length)return null;this.$body.append(this.$elm),this.open()}else this.$elm=o("<div>"),this.$body.append(this.$elm),e=function(o,t){t.elm.remove()},this.showSpinner(),t.trigger(o.modal.AJAX_SEND),o.get(n).done(function(i){if(o.modal.isActive()){t.trigger(o.modal.AJAX_SUCCESS);var s=l();s.$elm.empty().append(i).on(o.modal.CLOSE,e),s.hideSpinner(),s.open(),t.trigger(o.modal.AJAX_COMPLETE)}}).fail(function(){t.trigger(o.modal.AJAX_FAIL);var i=l();i.hideSpinner(),s.pop(),t.trigger(o.modal.AJAX_COMPLETE)});else this.$elm=t,this.anchor=t,this.$body.append(this.$elm),this.open()},o.modal.prototype={constructor:o.modal,open:function(){var t=this;this.block(),this.anchor.blur(),this.options.doFade?setTimeout(function(){t.show()},this.options.fadeDuration*this.options.fadeDelay):this.show(),o(i).off("keydown.modal").on("keydown.modal",function(o){var t=l();27===o.which&&t.options.escapeClose&&t.close()}),this.options.clickClose&&this.$blocker.click(function(t){t.target===this&&o.modal.close()})},close:function(){s.pop(),this.unblock(),this.hide(),o.modal.isActive()||o(i).off("keydown.modal")},block:function(){this.$elm.trigger(o.modal.BEFORE_BLOCK,[this._ctx()]),this.$body.css("overflow","hidden"),this.$blocker=o('<div class="'+this.options.blockerClass+' blocker current"></div>').appendTo(this.$body),n(),this.options.doFade&&this.$blocker.css("opacity",0).animate({opacity:1},this.options.fadeDuration),this.$elm.trigger(o.modal.BLOCK,[this._ctx()])},unblock:function(t){!t&&this.options.doFade?this.$blocker.fadeOut(this.options.fadeDuration,this.unblock.bind(this,!0)):(this.$blocker.children().appendTo(this.$body),this.$blocker.remove(),this.$blocker=null,n(),o.modal.isActive()||this.$body.css("overflow",""))},show:function(){this.$elm.trigger(o.modal.BEFORE_OPEN,[this._ctx()]),this.options.showClose&&(this.closeButton=o('<a href="#close-modal" rel="modal:close" class="close-modal '+this.options.closeClass+'">'+this.options.closeText+"</a>"),this.$elm.append(this.closeButton)),this.$elm.addClass(this.options.modalClass).appendTo(this.$blocker),this.options.doFade?this.$elm.css({opacity:0,display:"inline-block"}).animate({opacity:1},this.options.fadeDuration):this.$elm.css("display","inline-block"),this.$elm.trigger(o.modal.OPEN,[this._ctx()])},hide:function(){this.$elm.trigger(o.modal.BEFORE_CLOSE,[this._ctx()]),this.closeButton&&this.closeButton.remove();var t=this;this.options.doFade?this.$elm.fadeOut(this.options.fadeDuration,function(){t.$elm.trigger(o.modal.AFTER_CLOSE,[t._ctx()])}):this.$elm.hide(0,function(){t.$elm.trigger(o.modal.AFTER_CLOSE,[t._ctx()])}),this.$elm.trigger(o.modal.CLOSE,[this._ctx()])},showSpinner:function(){this.options.showSpinner&&(this.spinner=this.spinner||o('<div class="'+this.options.modalClass+'-spinner"></div>').append(this.options.spinnerHtml),this.$body.append(this.spinner),this.spinner.show())},hideSpinner:function(){this.spinner&&this.spinner.remove()},_ctx:function(){return{elm:this.$elm,$elm:this.$elm,$blocker:this.$blocker,options:this.options}}},o.modal.close=function(t){if(o.modal.isActive()){t&&t.preventDefault();var i=l();return i.close(),i.$elm}},o.modal.isActive=function(){return s.length>0},o.modal.getCurrent=l,o.modal.defaults={closeExisting:!0,escapeClose:!0,clickClose:!0,closeText:"Close",closeClass:"",modalClass:"modal",blockerClass:"jquery-modal",spinnerHtml:'<div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div>',showSpinner:!0,showClose:!0,fadeDuration:null,fadeDelay:1},o.modal.BEFORE_BLOCK="modal:before-block",o.modal.BLOCK="modal:block",o.modal.BEFORE_OPEN="modal:before-open",o.modal.OPEN="modal:open",o.modal.BEFORE_CLOSE="modal:before-close",o.modal.CLOSE="modal:close",o.modal.AFTER_CLOSE="modal:after-close",o.modal.AJAX_SEND="modal:ajax:send",o.modal.AJAX_SUCCESS="modal:ajax:success",o.modal.AJAX_FAIL="modal:ajax:fail",o.modal.AJAX_COMPLETE="modal:ajax:complete",o.fn.modal=function(t){return 1===this.length&&new o.modal(this,t),this},o(i).on("click.modal",'a[rel~="modal:close"]',o.modal.close),o(i).on("click.modal",'a[rel~="modal:open"]',function(t){t.preventDefault(),o(this).modal()})});
/*!
* Parsley.js
* Version 2.8.1 - built Sat, Feb 3rd 2018, 2:27 pm
* http://parsleyjs.org
* Guillaume Potier - <guillaume@wisembly.com>
* Marc-Andre Lafortune - <petroselinum@marc-andre.ca>
* MIT Licensed
*/
function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}var _slice=Array.prototype.slice,_slicedToArray=function(){function e(e,t){var i=[],n=!0,r=!1,s=void 0;try{for(var a,o=e[Symbol.iterator]();!(n=(a=o.next()).done)&&(i.push(a.value),!t||i.length!==t);n=!0);}catch(l){r=!0,s=l}finally{try{!n&&o["return"]&&o["return"]()}finally{if(r)throw s}}return i}return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n])}return e};!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],t):e.parsley=t(e.jQuery)}(this,function(e){"use strict";function t(e,t){return e.parsleyAdaptedCallback||(e.parsleyAdaptedCallback=function(){var i=Array.prototype.slice.call(arguments,0);i.unshift(this),e.apply(t||M,i)}),e.parsleyAdaptedCallback}function i(e){return 0===e.lastIndexOf(D,0)?e.substr(D.length):e}/**
   * inputevent - Alleviate browser bugs for input events
   * https://github.com/marcandre/inputevent
   * @version v0.0.3 - (built Thu, Apr 14th 2016, 5:58 pm)
   * @author Marc-Andre Lafortune <github@marc-andre.ca>
   * @license MIT
   */
function n(){var t=this,i=window||global;_extends(this,{isNativeEvent:function(e){return e.originalEvent&&e.originalEvent.isTrusted!==!1},fakeInputEvent:function(i){t.isNativeEvent(i)&&e(i.target).trigger("input")},misbehaves:function(i){t.isNativeEvent(i)&&(t.behavesOk(i),e(document).on("change.inputevent",i.data.selector,t.fakeInputEvent),t.fakeInputEvent(i))},behavesOk:function(i){t.isNativeEvent(i)&&e(document).off("input.inputevent",i.data.selector,t.behavesOk).off("change.inputevent",i.data.selector,t.misbehaves)},install:function(){if(!i.inputEventPatched){i.inputEventPatched="0.0.3";for(var n=["select",'input[type="checkbox"]','input[type="radio"]','input[type="file"]'],r=0;r<n.length;r++){var s=n[r];e(document).on("input.inputevent",s,{selector:s},t.behavesOk).on("change.inputevent",s,{selector:s},t.misbehaves)}}},uninstall:function(){delete i.inputEventPatched,e(document).off(".inputevent")}})}var r=1,s={},a={attr:function(e,t,i){var n,r,s,a=new RegExp("^"+t,"i");if("undefined"==typeof i)i={};else for(n in i)i.hasOwnProperty(n)&&delete i[n];if(!e)return i;for(s=e.attributes,n=s.length;n--;)r=s[n],r&&r.specified&&a.test(r.name)&&(i[this.camelize(r.name.slice(t.length))]=this.deserializeValue(r.value));return i},checkAttr:function(e,t,i){return e.hasAttribute(t+i)},setAttr:function(e,t,i,n){e.setAttribute(this.dasherize(t+i),String(n))},getType:function(e){return e.getAttribute("type")||"text"},generateID:function(){return""+r++},deserializeValue:function(e){var t;try{return e?"true"==e||"false"!=e&&("null"==e?null:isNaN(t=Number(e))?/^[\[\{]/.test(e)?JSON.parse(e):e:t):e}catch(i){return e}},camelize:function(e){return e.replace(/-+(.)?/g,function(e,t){return t?t.toUpperCase():""})},dasherize:function(e){return e.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()},warn:function(){var e;window.console&&"function"==typeof window.console.warn&&(e=window.console).warn.apply(e,arguments)},warnOnce:function(e){s[e]||(s[e]=!0,this.warn.apply(this,arguments))},_resetWarnings:function(){s={}},trimString:function(e){return e.replace(/^\s+|\s+$/g,"")},parse:{date:function S(e){var t=e.match(/^(\d{4,})-(\d\d)-(\d\d)$/);if(!t)return null;var i=t.map(function(e){return parseInt(e,10)}),n=_slicedToArray(i,4),r=(n[0],n[1]),s=n[2],a=n[3],S=new Date(r,s-1,a);return S.getFullYear()!==r||S.getMonth()+1!==s||S.getDate()!==a?null:S},string:function(e){return e},integer:function(e){return isNaN(e)?null:parseInt(e,10)},number:function(e){if(isNaN(e))throw null;return parseFloat(e)},"boolean":function(e){return!/^\s*false\s*$/i.test(e)},object:function(e){return a.deserializeValue(e)},regexp:function(e){var t="";return/^\/.*\/(?:[gimy]*)$/.test(e)?(t=e.replace(/.*\/([gimy]*)$/,"$1"),e=e.replace(new RegExp("^/(.*?)/"+t+"$"),"$1")):e="^"+e+"$",new RegExp(e,t)}},parseRequirement:function(e,t){var i=this.parse[e||"string"];if(!i)throw'Unknown requirement specification: "'+e+'"';var n=i(t);if(null===n)throw"Requirement is not a "+e+': "'+t+'"';return n},namespaceEvents:function(t,i){return t=this.trimString(t||"").split(/\s+/),t[0]?e.map(t,function(e){return e+"."+i}).join(" "):""},difference:function(t,i){var n=[];return e.each(t,function(e,t){i.indexOf(t)==-1&&n.push(t)}),n},all:function(t){return e.when.apply(e,_toConsumableArray(t).concat([42,42]))},objectCreate:Object.create||function(){var e=function(){};return function(t){if(arguments.length>1)throw Error("Second argument not supported");if("object"!=typeof t)throw TypeError("Argument must be an object");e.prototype=t;var i=new e;return e.prototype=null,i}}(),_SubmitSelector:'input[type="submit"], button:submit'},o={namespace:"data-parsley-",inputs:"input, textarea, select",excluded:"input[type=button], input[type=submit], input[type=reset], input[type=hidden]",priorityEnabled:!0,multiple:null,group:null,uiEnabled:!0,validationThreshold:3,focus:"first",trigger:!1,triggerAfterFailure:"input",errorClass:"parsley-error",successClass:"parsley-success",classHandler:function(e){},errorsContainer:function(e){},errorsWrapper:'<ul class="parsley-errors-list"></ul>',errorTemplate:"<li></li>"},l=function(){this.__id__=a.generateID()};l.prototype={asyncSupport:!0,_pipeAccordingToValidationResult:function(){var t=this,i=function(){var i=e.Deferred();return!0!==t.validationResult&&i.reject(),i.resolve().promise()};return[i,i]},actualizeOptions:function(){return a.attr(this.element,this.options.namespace,this.domOptions),this.parent&&this.parent.actualizeOptions&&this.parent.actualizeOptions(),this},_resetOptions:function(e){this.domOptions=a.objectCreate(this.parent.options),this.options=a.objectCreate(this.domOptions);for(var t in e)e.hasOwnProperty(t)&&(this.options[t]=e[t]);this.actualizeOptions()},_listeners:null,on:function(e,t){this._listeners=this._listeners||{};var i=this._listeners[e]=this._listeners[e]||[];return i.push(t),this},subscribe:function(t,i){e.listenTo(this,t.toLowerCase(),i)},off:function(e,t){var i=this._listeners&&this._listeners[e];if(i)if(t)for(var n=i.length;n--;)i[n]===t&&i.splice(n,1);else delete this._listeners[e];return this},unsubscribe:function(t,i){e.unsubscribeTo(this,t.toLowerCase())},trigger:function(e,t,i){t=t||this;var n,r=this._listeners&&this._listeners[e];if(r)for(var s=r.length;s--;)if(n=r[s].call(t,t,i),n===!1)return n;return!this.parent||this.parent.trigger(e,t,i)},asyncIsValid:function(e,t){return a.warnOnce("asyncIsValid is deprecated; please use whenValid instead"),this.whenValid({group:e,force:t})},_findRelated:function(){return this.options.multiple?e(this.parent.element.querySelectorAll("["+this.options.namespace+'multiple="'+this.options.multiple+'"]')):this.$element}};var u=function(e,t){var i=e.match(/^\s*\[(.*)\]\s*$/);if(!i)throw'Requirement is not an array: "'+e+'"';var n=i[1].split(",").map(a.trimString);if(n.length!==t)throw"Requirement has "+n.length+" values when "+t+" are needed";return n},d=function(e,t,i){var n=null,r={};for(var s in e)if(s){var o=i(s);"string"==typeof o&&(o=a.parseRequirement(e[s],o)),r[s]=o}else n=a.parseRequirement(e[s],t);return[n,r]},h=function(t){e.extend(!0,this,t)};h.prototype={validate:function(e,t){if(this.fn)return arguments.length>3&&(t=[].slice.call(arguments,1,-1)),this.fn(e,t);if(Array.isArray(e)){if(!this.validateMultiple)throw"Validator `"+this.name+"` does not handle multiple values";return this.validateMultiple.apply(this,arguments)}var i=arguments[arguments.length-1];if(this.validateDate&&i._isDateInput())return arguments[0]=a.parse.date(arguments[0]),null!==arguments[0]&&this.validateDate.apply(this,arguments);if(this.validateNumber)return!isNaN(e)&&(arguments[0]=parseFloat(arguments[0]),this.validateNumber.apply(this,arguments));if(this.validateString)return this.validateString.apply(this,arguments);throw"Validator `"+this.name+"` only handles multiple values"},parseRequirements:function(t,i){if("string"!=typeof t)return Array.isArray(t)?t:[t];var n=this.requirementType;if(Array.isArray(n)){for(var r=u(t,n.length),s=0;s<r.length;s++)r[s]=a.parseRequirement(n[s],r[s]);return r}return e.isPlainObject(n)?d(n,t,i):[a.parseRequirement(n,t)]},requirementType:"string",priority:2};var p=function(e,t){this.__class__="ValidatorRegistry",this.locale="en",this.init(e||{},t||{})},c={email:/^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/,number:/^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,integer:/^-?\d+$/,digits:/^\d+$/,alphanum:/^\w+$/i,date:{test:function(e){return null!==a.parse.date(e)}},url:new RegExp("^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-zA-Z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$")};c.range=c.number;var f=function(e){var t=(""+e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return t?Math.max(0,(t[1]?t[1].length:0)-(t[2]?+t[2]:0)):0},m=function(e,t){return t.map(a.parse[e])},g=function(e,t){return function(i){for(var n=arguments.length,r=Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return r.pop(),t.apply(void 0,[i].concat(_toConsumableArray(m(e,r))))}},v=function(e){return{validateDate:g("date",e),validateNumber:g("number",e),requirementType:e.length<=2?"string":["string","string"],priority:30}};p.prototype={init:function(e,t){this.catalog=t,this.validators=_extends({},this.validators);for(var i in e)this.addValidator(i,e[i].fn,e[i].priority);window.Parsley.trigger("parsley:validator:init")},setLocale:function(e){if("undefined"==typeof this.catalog[e])throw new Error(e+" is not available in the catalog");return this.locale=e,this},addCatalog:function(e,t,i){return"object"==typeof t&&(this.catalog[e]=t),!0===i?this.setLocale(e):this},addMessage:function(e,t,i){return"undefined"==typeof this.catalog[e]&&(this.catalog[e]={}),this.catalog[e][t]=i,this},addMessages:function(e,t){for(var i in t)this.addMessage(e,i,t[i]);return this},addValidator:function(e,t,i){if(this.validators[e])a.warn('Validator "'+e+'" is already defined.');else if(o.hasOwnProperty(e))return void a.warn('"'+e+'" is a restricted keyword and is not a valid validator name.');return this._setValidator.apply(this,arguments)},hasValidator:function(e){return!!this.validators[e]},updateValidator:function(e,t,i){return this.validators[e]?this._setValidator.apply(this,arguments):(a.warn('Validator "'+e+'" is not already defined.'),this.addValidator.apply(this,arguments))},removeValidator:function(e){return this.validators[e]||a.warn('Validator "'+e+'" is not defined.'),delete this.validators[e],this},_setValidator:function(e,t,i){"object"!=typeof t&&(t={fn:t,priority:i}),t.validate||(t=new h(t)),this.validators[e]=t;for(var n in t.messages||{})this.addMessage(n,e,t.messages[n]);return this},getErrorMessage:function(e){var t;if("type"===e.name){var i=this.catalog[this.locale][e.name]||{};t=i[e.requirements]}else t=this.formatMessage(this.catalog[this.locale][e.name],e.requirements);return t||this.catalog[this.locale].defaultMessage||this.catalog.en.defaultMessage},formatMessage:function(e,t){if("object"==typeof t){for(var i in t)e=this.formatMessage(e,t[i]);return e}return"string"==typeof e?e.replace(/%s/i,t):""},validators:{notblank:{validateString:function(e){return/\S/.test(e)},priority:2},required:{validateMultiple:function(e){return e.length>0},validateString:function(e){return/\S/.test(e)},priority:512},type:{validateString:function(e,t){var i=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],n=i.step,r=void 0===n?"any":n,s=i.base,a=void 0===s?0:s,o=c[t];if(!o)throw new Error("validator type `"+t+"` is not supported");if(!o.test(e))return!1;if("number"===t&&!/^any$/i.test(r||"")){var l=Number(e),u=Math.max(f(r),f(a));if(f(l)>u)return!1;var d=function(e){return Math.round(e*Math.pow(10,u))};if((d(l)-d(a))%d(r)!=0)return!1}return!0},requirementType:{"":"string",step:"string",base:"number"},priority:256},pattern:{validateString:function(e,t){return t.test(e)},requirementType:"regexp",priority:64},minlength:{validateString:function(e,t){return e.length>=t},requirementType:"integer",priority:30},maxlength:{validateString:function(e,t){return e.length<=t},requirementType:"integer",priority:30},length:{validateString:function(e,t,i){return e.length>=t&&e.length<=i},requirementType:["integer","integer"],priority:30},mincheck:{validateMultiple:function(e,t){return e.length>=t},requirementType:"integer",priority:30},maxcheck:{validateMultiple:function(e,t){return e.length<=t},requirementType:"integer",priority:30},check:{validateMultiple:function(e,t,i){return e.length>=t&&e.length<=i},requirementType:["integer","integer"],priority:30},min:v(function(e,t){return e>=t}),max:v(function(e,t){return e<=t}),range:v(function(e,t,i){return e>=t&&e<=i}),equalto:{validateString:function(t,i){var n=e(i);return n.length?t===n.val():t===i},priority:256}}};var y={},_=function k(e,t,i){for(var n=[],r=[],s=0;s<e.length;s++){for(var a=!1,o=0;o<t.length;o++)if(e[s].assert.name===t[o].assert.name){a=!0;break}a?r.push(e[s]):n.push(e[s])}return{kept:r,added:n,removed:i?[]:k(t,e,!0).added}};y.Form={_actualizeTriggers:function(){var e=this;this.$element.on("submit.Parsley",function(t){e.onSubmitValidate(t)}),this.$element.on("click.Parsley",a._SubmitSelector,function(t){e.onSubmitButton(t)}),!1!==this.options.uiEnabled&&this.element.setAttribute("novalidate","")},focus:function(){if(this._focusedField=null,!0===this.validationResult||"none"===this.options.focus)return null;for(var e=0;e<this.fields.length;e++){var t=this.fields[e];if(!0!==t.validationResult&&t.validationResult.length>0&&"undefined"==typeof t.options.noFocus&&(this._focusedField=t.$element,"first"===this.options.focus))break}return null===this._focusedField?null:this._focusedField.focus()},_destroyUI:function(){this.$element.off(".Parsley")}},y.Field={_reflowUI:function(){if(this._buildUI(),this._ui){var e=_(this.validationResult,this._ui.lastValidationResult);this._ui.lastValidationResult=this.validationResult,this._manageStatusClass(),this._manageErrorsMessages(e),this._actualizeTriggers(),!e.kept.length&&!e.added.length||this._failedOnce||(this._failedOnce=!0,this._actualizeTriggers())}},getErrorsMessages:function(){if(!0===this.validationResult)return[];for(var e=[],t=0;t<this.validationResult.length;t++)e.push(this.validationResult[t].errorMessage||this._getErrorMessage(this.validationResult[t].assert));return e},addError:function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=t.message,n=t.assert,r=t.updateClass,s=void 0===r||r;this._buildUI(),this._addError(e,{message:i,assert:n}),s&&this._errorClass()},updateError:function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=t.message,n=t.assert,r=t.updateClass,s=void 0===r||r;this._buildUI(),this._updateError(e,{message:i,assert:n}),s&&this._errorClass()},removeError:function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=t.updateClass,n=void 0===i||i;this._buildUI(),this._removeError(e),n&&this._manageStatusClass()},_manageStatusClass:function(){this.hasConstraints()&&this.needsValidation()&&!0===this.validationResult?this._successClass():this.validationResult.length>0?this._errorClass():this._resetClass()},_manageErrorsMessages:function(t){if("undefined"==typeof this.options.errorsMessagesDisabled){if("undefined"!=typeof this.options.errorMessage)return t.added.length||t.kept.length?(this._insertErrorWrapper(),0===this._ui.$errorsWrapper.find(".parsley-custom-error-message").length&&this._ui.$errorsWrapper.append(e(this.options.errorTemplate).addClass("parsley-custom-error-message")),this._ui.$errorsWrapper.addClass("filled").find(".parsley-custom-error-message").html(this.options.errorMessage)):this._ui.$errorsWrapper.removeClass("filled").find(".parsley-custom-error-message").remove();for(var i=0;i<t.removed.length;i++)this._removeError(t.removed[i].assert.name);for(i=0;i<t.added.length;i++)this._addError(t.added[i].assert.name,{message:t.added[i].errorMessage,assert:t.added[i].assert});for(i=0;i<t.kept.length;i++)this._updateError(t.kept[i].assert.name,{message:t.kept[i].errorMessage,assert:t.kept[i].assert})}},_addError:function(t,i){var n=i.message,r=i.assert;this._insertErrorWrapper(),this._ui.$errorClassHandler.attr("aria-describedby",this._ui.errorsWrapperId),this._ui.$errorsWrapper.addClass("filled").append(e(this.options.errorTemplate).addClass("parsley-"+t).html(n||this._getErrorMessage(r)))},_updateError:function(e,t){var i=t.message,n=t.assert;this._ui.$errorsWrapper.addClass("filled").find(".parsley-"+e).html(i||this._getErrorMessage(n))},_removeError:function(e){this._ui.$errorClassHandler.removeAttr("aria-describedby"),this._ui.$errorsWrapper.removeClass("filled").find(".parsley-"+e).remove()},_getErrorMessage:function(e){var t=e.name+"Message";return"undefined"!=typeof this.options[t]?window.Parsley.formatMessage(this.options[t],e.requirements):window.Parsley.getErrorMessage(e)},_buildUI:function(){if(!this._ui&&!1!==this.options.uiEnabled){var t={};this.element.setAttribute(this.options.namespace+"id",this.__id__),t.$errorClassHandler=this._manageClassHandler(),t.errorsWrapperId="parsley-id-"+(this.options.multiple?"multiple-"+this.options.multiple:this.__id__),t.$errorsWrapper=e(this.options.errorsWrapper).attr("id",t.errorsWrapperId),t.lastValidationResult=[],t.validationInformationVisible=!1,this._ui=t}},_manageClassHandler:function(){if("string"==typeof this.options.classHandler&&e(this.options.classHandler).length)return e(this.options.classHandler);var t=this.options.classHandler;if("string"==typeof this.options.classHandler&&"function"==typeof window[this.options.classHandler]&&(t=window[this.options.classHandler]),"function"==typeof t){var i=t.call(this,this);if("undefined"!=typeof i&&i.length)return i}else{if("object"==typeof t&&t instanceof jQuery&&t.length)return t;t&&a.warn("The class handler `"+t+"` does not exist in DOM nor as a global JS function")}return this._inputHolder()},_inputHolder:function(){return this.options.multiple&&"SELECT"!==this.element.nodeName?this.$element.parent():this.$element},_insertErrorWrapper:function(){var t=this.options.errorsContainer;if(0!==this._ui.$errorsWrapper.parent().length)return this._ui.$errorsWrapper.parent();if("string"==typeof t){if(e(t).length)return e(t).append(this._ui.$errorsWrapper);"function"==typeof window[t]?t=window[t]:a.warn("The errors container `"+t+"` does not exist in DOM nor as a global JS function")}return"function"==typeof t&&(t=t.call(this,this)),"object"==typeof t&&t.length?t.append(this._ui.$errorsWrapper):this._inputHolder().after(this._ui.$errorsWrapper)},_actualizeTriggers:function(){var e,t=this,i=this._findRelated();i.off(".Parsley"),this._failedOnce?i.on(a.namespaceEvents(this.options.triggerAfterFailure,"Parsley"),function(){t._validateIfNeeded()}):(e=a.namespaceEvents(this.options.trigger,"Parsley"))&&i.on(e,function(e){t._validateIfNeeded(e)})},_validateIfNeeded:function(e){var t=this;e&&/key|input/.test(e.type)&&(!this._ui||!this._ui.validationInformationVisible)&&this.getValue().length<=this.options.validationThreshold||(this.options.debounce?(window.clearTimeout(this._debounced),this._debounced=window.setTimeout(function(){return t.validate()},this.options.debounce)):this.validate())},_resetUI:function(){this._failedOnce=!1,this._actualizeTriggers(),"undefined"!=typeof this._ui&&(this._ui.$errorsWrapper.removeClass("filled").children().remove(),this._resetClass(),this._ui.lastValidationResult=[],this._ui.validationInformationVisible=!1)},_destroyUI:function(){this._resetUI(),"undefined"!=typeof this._ui&&this._ui.$errorsWrapper.remove(),delete this._ui},_successClass:function(){this._ui.validationInformationVisible=!0,this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass)},_errorClass:function(){this._ui.validationInformationVisible=!0,this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass)},_resetClass:function(){this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass)}};var w=function(t,i,n){this.__class__="Form",this.element=t,this.$element=e(t),this.domOptions=i,this.options=n,this.parent=window.Parsley,this.fields=[],this.validationResult=null},b={pending:null,resolved:!0,rejected:!1};w.prototype={onSubmitValidate:function(e){var t=this;if(!0!==e.parsley){var i=this._submitSource||this.$element.find(a._SubmitSelector)[0];if(this._submitSource=null,this.$element.find(".parsley-synthetic-submit-button").prop("disabled",!0),!i||null===i.getAttribute("formnovalidate")){window.Parsley._remoteCache={};var n=this.whenValidate({event:e});"resolved"===n.state()&&!1!==this._trigger("submit")||(e.stopImmediatePropagation(),e.preventDefault(),"pending"===n.state()&&n.done(function(){t._submit(i)}))}}},onSubmitButton:function(e){this._submitSource=e.currentTarget},_submit:function(t){if(!1!==this._trigger("submit")){if(t){var i=this.$element.find(".parsley-synthetic-submit-button").prop("disabled",!1);0===i.length&&(i=e('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element)),i.attr({name:t.getAttribute("name"),value:t.getAttribute("value")})}this.$element.trigger(_extends(e.Event("submit"),{parsley:!0}))}},validate:function(t){if(arguments.length>=1&&!e.isPlainObject(t)){a.warnOnce("Calling validate on a parsley form without passing arguments as an object is deprecated.");var i=_slice.call(arguments),n=i[0],r=i[1],s=i[2];t={group:n,force:r,event:s}}return b[this.whenValidate(t).state()]},whenValidate:function(){var t,i=this,n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=n.group,s=n.force,o=n.event;this.submitEvent=o,o&&(this.submitEvent=_extends({},o,{preventDefault:function(){a.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`"),i.validationResult=!1}})),this.validationResult=!0,this._trigger("validate"),this._refreshFields();var l=this._withoutReactualizingFormOptions(function(){return e.map(i.fields,function(e){return e.whenValidate({force:s,group:r})})});return(t=a.all(l).done(function(){i._trigger("success")}).fail(function(){i.validationResult=!1,i.focus(),i._trigger("error")}).always(function(){i._trigger("validated")})).pipe.apply(t,_toConsumableArray(this._pipeAccordingToValidationResult()))},isValid:function(t){if(arguments.length>=1&&!e.isPlainObject(t)){a.warnOnce("Calling isValid on a parsley form without passing arguments as an object is deprecated.");var i=_slice.call(arguments),n=i[0],r=i[1];t={group:n,force:r}}return b[this.whenValid(t).state()]},whenValid:function(){var t=this,i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=i.group,r=i.force;this._refreshFields();var s=this._withoutReactualizingFormOptions(function(){return e.map(t.fields,function(e){return e.whenValid({group:n,force:r})})});return a.all(s)},refresh:function(){return this._refreshFields(),this},reset:function(){for(var e=0;e<this.fields.length;e++)this.fields[e].reset();this._trigger("reset")},destroy:function(){this._destroyUI();for(var e=0;e<this.fields.length;e++)this.fields[e].destroy();this.$element.removeData("Parsley"),this._trigger("destroy")},_refreshFields:function(){return this.actualizeOptions()._bindFields()},_bindFields:function(){var t=this,i=this.fields;return this.fields=[],this.fieldsMappedById={},this._withoutReactualizingFormOptions(function(){t.$element.find(t.options.inputs).not(t.options.excluded).each(function(e,i){var n=new window.Parsley.Factory(i,{},t);if(("Field"===n.__class__||"FieldMultiple"===n.__class__)&&!0!==n.options.excluded){var r=n.__class__+"-"+n.__id__;"undefined"==typeof t.fieldsMappedById[r]&&(t.fieldsMappedById[r]=n,t.fields.push(n))}}),e.each(a.difference(i,t.fields),function(e,t){t.reset()})}),this},_withoutReactualizingFormOptions:function(e){var t=this.actualizeOptions;this.actualizeOptions=function(){return this};var i=e();return this.actualizeOptions=t,i},_trigger:function(e){return this.trigger("form:"+e)}};var F=function(e,t,i,n,r){var s=window.Parsley._validatorRegistry.validators[t],a=new h(s);n=n||e.options[t+"Priority"]||a.priority,r=!0===r,_extends(this,{validator:a,name:t,requirements:i,priority:n,isDomConstraint:r}),this._parseRequirements(e.options)},C=function(e){var t=e[0].toUpperCase();return t+e.slice(1)};F.prototype={validate:function(e,t){var i;return(i=this.validator).validate.apply(i,[e].concat(_toConsumableArray(this.requirementList),[t]))},_parseRequirements:function(e){var t=this;this.requirementList=this.validator.parseRequirements(this.requirements,function(i){return e[t.name+C(i)]})}};var A=function(t,i,n,r){this.__class__="Field",this.element=t,this.$element=e(t),"undefined"!=typeof r&&(this.parent=r),this.options=n,this.domOptions=i,this.constraints=[],this.constraintsByName={},this.validationResult=!0,this._bindConstraints()},E={pending:null,resolved:!0,rejected:!1};A.prototype={validate:function(t){arguments.length>=1&&!e.isPlainObject(t)&&(a.warnOnce("Calling validate on a parsley field without passing arguments as an object is deprecated."),t={options:t});var i=this.whenValidate(t);if(!i)return!0;switch(i.state()){case"pending":return null;case"resolved":return!0;case"rejected":return this.validationResult}},whenValidate:function(){var e,t=this,i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=i.force,r=i.group;if(this.refresh(),!r||this._isInGroup(r))return this.value=this.getValue(),this._trigger("validate"),(e=this.whenValid({force:n,value:this.value,_refreshed:!0}).always(function(){t._reflowUI()}).done(function(){t._trigger("success")}).fail(function(){t._trigger("error")}).always(function(){t._trigger("validated")})).pipe.apply(e,_toConsumableArray(this._pipeAccordingToValidationResult()))},hasConstraints:function(){return 0!==this.constraints.length},needsValidation:function(e){return"undefined"==typeof e&&(e=this.getValue()),!(!e.length&&!this._isRequired()&&"undefined"==typeof this.options.validateIfEmpty)},_isInGroup:function(t){return Array.isArray(this.options.group)?-1!==e.inArray(t,this.options.group):this.options.group===t},isValid:function(t){if(arguments.length>=1&&!e.isPlainObject(t)){a.warnOnce("Calling isValid on a parsley field without passing arguments as an object is deprecated.");var i=_slice.call(arguments),n=i[0],r=i[1];t={force:n,value:r}}var s=this.whenValid(t);return!s||E[s.state()]},whenValid:function(){var t=this,i=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=i.force,r=void 0!==n&&n,s=i.value,o=i.group,l=i._refreshed;if(l||this.refresh(),!o||this._isInGroup(o)){if(this.validationResult=!0,!this.hasConstraints())return e.when();if("undefined"!=typeof s&&null!==s||(s=this.getValue()),!this.needsValidation(s)&&!0!==r)return e.when();var u=this._getGroupedConstraints(),d=[];return e.each(u,function(i,n){var r=a.all(e.map(n,function(e){return t._validateConstraint(s,e)}));if(d.push(r),"rejected"===r.state())return!1}),a.all(d)}},_validateConstraint:function(t,i){var n=this,r=i.validate(t,this);return!1===r&&(r=e.Deferred().reject()),a.all([r]).fail(function(e){n.validationResult instanceof Array||(n.validationResult=[]),n.validationResult.push({assert:i,errorMessage:"string"==typeof e&&e})})},getValue:function(){var e;return e="function"==typeof this.options.value?this.options.value(this):"undefined"!=typeof this.options.value?this.options.value:this.$element.val(),"undefined"==typeof e||null===e?"":this._handleWhitespace(e)},reset:function(){return this._resetUI(),this._trigger("reset")},destroy:function(){this._destroyUI(),this.$element.removeData("Parsley"),this.$element.removeData("FieldMultiple"),this._trigger("destroy")},refresh:function(){return this._refreshConstraints(),this},_refreshConstraints:function(){return this.actualizeOptions()._bindConstraints()},refreshConstraints:function(){return a.warnOnce("Parsley's refreshConstraints is deprecated. Please use refresh"),this.refresh()},addConstraint:function(e,t,i,n){if(window.Parsley._validatorRegistry.validators[e]){var r=new F(this,e,t,i,n);"undefined"!==this.constraintsByName[r.name]&&this.removeConstraint(r.name),this.constraints.push(r),this.constraintsByName[r.name]=r}return this},removeConstraint:function(e){for(var t=0;t<this.constraints.length;t++)if(e===this.constraints[t].name){this.constraints.splice(t,1);break}return delete this.constraintsByName[e],this},updateConstraint:function(e,t,i){return this.removeConstraint(e).addConstraint(e,t,i)},_bindConstraints:function(){for(var e=[],t={},i=0;i<this.constraints.length;i++)!1===this.constraints[i].isDomConstraint&&(e.push(this.constraints[i]),t[this.constraints[i].name]=this.constraints[i]);this.constraints=e,this.constraintsByName=t;for(var n in this.options)this.addConstraint(n,this.options[n],void 0,!0);return this._bindHtml5Constraints()},_bindHtml5Constraints:function(){null!==this.element.getAttribute("required")&&this.addConstraint("required",!0,void 0,!0),null!==this.element.getAttribute("pattern")&&this.addConstraint("pattern",this.element.getAttribute("pattern"),void 0,!0);var e=this.element.getAttribute("min"),t=this.element.getAttribute("max");null!==e&&null!==t?this.addConstraint("range",[e,t],void 0,!0):null!==e?this.addConstraint("min",e,void 0,!0):null!==t&&this.addConstraint("max",t,void 0,!0),null!==this.element.getAttribute("minlength")&&null!==this.element.getAttribute("maxlength")?this.addConstraint("length",[this.element.getAttribute("minlength"),this.element.getAttribute("maxlength")],void 0,!0):null!==this.element.getAttribute("minlength")?this.addConstraint("minlength",this.element.getAttribute("minlength"),void 0,!0):null!==this.element.getAttribute("maxlength")&&this.addConstraint("maxlength",this.element.getAttribute("maxlength"),void 0,!0);var i=a.getType(this.element);return"number"===i?this.addConstraint("type",["number",{step:this.element.getAttribute("step")||"1",base:e||this.element.getAttribute("value")}],void 0,!0):/^(email|url|range|date)$/i.test(i)?this.addConstraint("type",i,void 0,!0):this},_isRequired:function(){return"undefined"!=typeof this.constraintsByName.required&&!1!==this.constraintsByName.required.requirements},_trigger:function(e){return this.trigger("field:"+e)},_handleWhitespace:function(e){return!0===this.options.trimValue&&a.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'),"squish"===this.options.whitespace&&(e=e.replace(/\s{2,}/g," ")),"trim"!==this.options.whitespace&&"squish"!==this.options.whitespace&&!0!==this.options.trimValue||(e=a.trimString(e)),e},_isDateInput:function(){var e=this.constraintsByName.type;return e&&"date"===e.requirements},_getGroupedConstraints:function(){if(!1===this.options.priorityEnabled)return[this.constraints];for(var e=[],t={},i=0;i<this.constraints.length;i++){var n=this.constraints[i].priority;t[n]||e.push(t[n]=[]),t[n].push(this.constraints[i])}return e.sort(function(e,t){return t[0].priority-e[0].priority}),e}};var x=A,$=function(){this.__class__="FieldMultiple"};$.prototype={addElement:function(e){return this.$elements.push(e),this},_refreshConstraints:function(){var t;if(this.constraints=[],"SELECT"===this.element.nodeName)return this.actualizeOptions()._bindConstraints(),this;for(var i=0;i<this.$elements.length;i++)if(e("html").has(this.$elements[i]).length){t=this.$elements[i].data("FieldMultiple")._refreshConstraints().constraints;for(var n=0;n<t.length;n++)this.addConstraint(t[n].name,t[n].requirements,t[n].priority,t[n].isDomConstraint)}else this.$elements.splice(i,1);return this},getValue:function(){if("function"==typeof this.options.value)return this.options.value(this);if("undefined"!=typeof this.options.value)return this.options.value;if("INPUT"===this.element.nodeName){var t=a.getType(this.element);if("radio"===t)return this._findRelated().filter(":checked").val()||"";if("checkbox"===t){
var i=[];return this._findRelated().filter(":checked").each(function(){i.push(e(this).val())}),i}}return"SELECT"===this.element.nodeName&&null===this.$element.val()?[]:this.$element.val()},_init:function(){return this.$elements=[this.$element],this}};var P=function(t,i,n){this.element=t,this.$element=e(t);var r=this.$element.data("Parsley");if(r)return"undefined"!=typeof n&&r.parent===window.Parsley&&(r.parent=n,r._resetOptions(r.options)),"object"==typeof i&&_extends(r.options,i),r;if(!this.$element.length)throw new Error("You must bind Parsley on an existing element.");if("undefined"!=typeof n&&"Form"!==n.__class__)throw new Error("Parent instance must be a Form instance");return this.parent=n||window.Parsley,this.init(i)};P.prototype={init:function(e){return this.__class__="Parsley",this.__version__="2.8.1",this.__id__=a.generateID(),this._resetOptions(e),"FORM"===this.element.nodeName||a.checkAttr(this.element,this.options.namespace,"validate")&&!this.$element.is(this.options.inputs)?this.bind("parsleyForm"):this.isMultiple()?this.handleMultiple():this.bind("parsleyField")},isMultiple:function(){var e=a.getType(this.element);return"radio"===e||"checkbox"===e||"SELECT"===this.element.nodeName&&null!==this.element.getAttribute("multiple")},handleMultiple:function(){var t,i,n=this;if(this.options.multiple=this.options.multiple||(t=this.element.getAttribute("name"))||this.element.getAttribute("id"),"SELECT"===this.element.nodeName&&null!==this.element.getAttribute("multiple"))return this.options.multiple=this.options.multiple||this.__id__,this.bind("parsleyFieldMultiple");if(!this.options.multiple)return a.warn("To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.",this.$element),this;this.options.multiple=this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g,""),t&&e('input[name="'+t+'"]').each(function(e,t){var i=a.getType(t);"radio"!==i&&"checkbox"!==i||t.setAttribute(n.options.namespace+"multiple",n.options.multiple)});for(var r=this._findRelated(),s=0;s<r.length;s++)if(i=e(r.get(s)).data("Parsley"),"undefined"!=typeof i){this.$element.data("FieldMultiple")||i.addElement(this.$element);break}return this.bind("parsleyField",!0),i||this.bind("parsleyFieldMultiple")},bind:function(t,i){var n;switch(t){case"parsleyForm":n=e.extend(new w(this.element,this.domOptions,this.options),new l,window.ParsleyExtend)._bindFields();break;case"parsleyField":n=e.extend(new x(this.element,this.domOptions,this.options,this.parent),new l,window.ParsleyExtend);break;case"parsleyFieldMultiple":n=e.extend(new x(this.element,this.domOptions,this.options,this.parent),new $,new l,window.ParsleyExtend)._init();break;default:throw new Error(t+"is not a supported Parsley type")}return this.options.multiple&&a.setAttr(this.element,this.options.namespace,"multiple",this.options.multiple),"undefined"!=typeof i?(this.$element.data("FieldMultiple",n),n):(this.$element.data("Parsley",n),n._actualizeTriggers(),n._trigger("init"),n)}};var V=e.fn.jquery.split(".");if(parseInt(V[0])<=1&&parseInt(V[1])<8)throw"The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";V.forEach||a.warn("Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim");var T=_extends(new l,{element:document,$element:e(document),actualizeOptions:null,_resetOptions:null,Factory:P,version:"2.8.1"});_extends(x.prototype,y.Field,l.prototype),_extends(w.prototype,y.Form,l.prototype),_extends(P.prototype,l.prototype),e.fn.parsley=e.fn.psly=function(t){if(this.length>1){var i=[];return this.each(function(){i.push(e(this).parsley(t))}),i}if(0!=this.length)return new P(this[0],t)},"undefined"==typeof window.ParsleyExtend&&(window.ParsleyExtend={}),T.options=_extends(a.objectCreate(o),window.ParsleyConfig),window.ParsleyConfig=T.options,window.Parsley=window.psly=T,T.Utils=a,window.ParsleyUtils={},e.each(a,function(e,t){"function"==typeof t&&(window.ParsleyUtils[e]=function(){return a.warnOnce("Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead."),a[e].apply(a,arguments)})});var O=window.Parsley._validatorRegistry=new p(window.ParsleyConfig.validators,window.ParsleyConfig.i18n);window.ParsleyValidator={},e.each("setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator hasValidator".split(" "),function(e,t){window.Parsley[t]=function(){return O[t].apply(O,arguments)},window.ParsleyValidator[t]=function(){var e;return a.warnOnce("Accessing the method '"+t+"' through Validator is deprecated. Simply call 'window.Parsley."+t+"(...)'"),(e=window.Parsley)[t].apply(e,arguments)}}),window.Parsley.UI=y,window.ParsleyUI={removeError:function(e,t,i){var n=!0!==i;return a.warnOnce("Accessing UI is deprecated. Call 'removeError' on the instance directly. Please comment in issue 1073 as to your need to call this method."),e.removeError(t,{updateClass:n})},getErrorsMessages:function(e){return a.warnOnce("Accessing UI is deprecated. Call 'getErrorsMessages' on the instance directly."),e.getErrorsMessages()}},e.each("addError updateError".split(" "),function(e,t){window.ParsleyUI[t]=function(e,i,n,r,s){var o=!0!==s;return a.warnOnce("Accessing UI is deprecated. Call '"+t+"' on the instance directly. Please comment in issue 1073 as to your need to call this method."),e[t](i,{message:n,assert:r,updateClass:o})}}),!1!==window.ParsleyConfig.autoBind&&e(function(){e("[data-parsley-validate]").length&&e("[data-parsley-validate]").parsley()});var M=e({}),R=function(){a.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley")},D="parsley:";e.listen=function(e,n){var r;if(R(),"object"==typeof arguments[1]&&"function"==typeof arguments[2]&&(r=arguments[1],n=arguments[2]),"function"!=typeof n)throw new Error("Wrong parameters");window.Parsley.on(i(e),t(n,r))},e.listenTo=function(e,n,r){if(R(),!(e instanceof x||e instanceof w))throw new Error("Must give Parsley instance");if("string"!=typeof n||"function"!=typeof r)throw new Error("Wrong parameters");e.on(i(n),t(r))},e.unsubscribe=function(e,t){if(R(),"string"!=typeof e||"function"!=typeof t)throw new Error("Wrong arguments");window.Parsley.off(i(e),t.parsleyAdaptedCallback)},e.unsubscribeTo=function(e,t){if(R(),!(e instanceof x||e instanceof w))throw new Error("Must give Parsley instance");e.off(i(t))},e.unsubscribeAll=function(t){R(),window.Parsley.off(i(t)),e("form,input,textarea,select").each(function(){var n=e(this).data("Parsley");n&&n.off(i(t))})},e.emit=function(e,t){var n;R();var r=t instanceof x||t instanceof w,s=Array.prototype.slice.call(arguments,r?2:1);s.unshift(i(e)),r||(t=window.Parsley),(n=t).trigger.apply(n,_toConsumableArray(s))};e.extend(!0,T,{asyncValidators:{"default":{fn:function(e){return e.status>=200&&e.status<300},url:!1},reverse:{fn:function(e){return e.status<200||e.status>=300},url:!1}},addAsyncValidator:function(e,t,i,n){return T.asyncValidators[e]={fn:t,url:i||!1,options:n||{}},this}}),T.addValidator("remote",{requirementType:{"":"string",validator:"string",reverse:"boolean",options:"object"},validateString:function(t,i,n,r){var s,a,o={},l=n.validator||(!0===n.reverse?"reverse":"default");if("undefined"==typeof T.asyncValidators[l])throw new Error("Calling an undefined async validator: `"+l+"`");i=T.asyncValidators[l].url||i,i.indexOf("{value}")>-1?i=i.replace("{value}",encodeURIComponent(t)):o[r.element.getAttribute("name")||r.element.getAttribute("id")]=t;var u=e.extend(!0,n.options||{},T.asyncValidators[l].options);s=e.extend(!0,{},{url:i,data:o,type:"GET"},u),r.trigger("field:ajaxoptions",r,s),a=e.param(s),"undefined"==typeof T._remoteCache&&(T._remoteCache={});var d=T._remoteCache[a]=T._remoteCache[a]||e.ajax(s),h=function(){var t=T.asyncValidators[l].fn.call(r,d,i,n);return t||(t=e.Deferred().reject()),e.when(t)};return d.then(h,h)},priority:-1}),T.on("form:submit",function(){T._remoteCache={}}),l.prototype.addAsyncValidator=function(){return a.warnOnce("Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`"),T.addAsyncValidator.apply(T,arguments)},T.addMessages("en",{defaultMessage:"This value seems to be invalid.",type:{email:"This value should be a valid email.",url:"This value should be a valid url.",number:"This value should be a valid number.",integer:"This value should be a valid integer.",digits:"This value should be digits.",alphanum:"This value should be alphanumeric."},notblank:"This value should not be blank.",required:"This value is required.",pattern:"This value seems to be invalid.",min:"This value should be greater than or equal to %s.",max:"This value should be lower than or equal to %s.",range:"This value should be between %s and %s.",minlength:"This value is too short. It should have %s characters or more.",maxlength:"This value is too long. It should have %s characters or fewer.",length:"This value length is invalid. It should be between %s and %s characters long.",mincheck:"You must select at least %s choices.",maxcheck:"You must select %s choices or fewer.",check:"You must select between %s and %s choices.",equalto:"This value should be the same."}),T.setLocale("en");var I=new n;I.install();var q=T;return q});
//# sourceMappingURL=parsley.min.js.map

// Validation errors messages for Parsley
// Load this after Parsley

Parsley.addMessages('ru', {
  defaultMessage: "Некорректное значение.",
  type: {
    email:        "Введите адрес электронной почты.",
    url:          "Введите URL адрес.",
    number:       "Введите число.",
    integer:      "Введите целое число.",
    digits:       "Введите только цифры.",
    alphanum:     "Введите буквенно-цифровое значение."
  },
  notblank:       "Это поле должно быть заполнено.",
  required:       "Обязательное поле.",
  pattern:        "Это значение некорректно.",
  min:            "Это значение должно быть не менее чем %s.",
  max:            "Это значение должно быть не более чем %s.",
  range:          "Это значение должно быть от %s до %s.",
  minlength:      "Это значение должно содержать не менее %s символов.",
  maxlength:      "Это значение должно содержать не более %s символов.",
  length:         "Это значение должно содержать от %s до %s символов.",
  mincheck:       "Выберите не менее %s значений.",
  maxcheck:       "Выберите не более %s значений.",
  check:          "Выберите от %s до %s значений.",
  equalto:        "Это значение должно совпадать."
});

Parsley.setLocale('ru');

(function(e){e.fn.customScrollbar=function(i,t){var o={skin:undefined,hScroll:true,vScroll:true,updateOnWindowResize:false,animationSpeed:300,onCustomScroll:undefined,swipeSpeed:1,wheelSpeed:40,fixedThumbWidth:undefined,fixedThumbHeight:undefined};var s=function(i,t){this.$element=e(i);this.options=t;this.addScrollableClass();this.addSkinClass();this.addScrollBarComponents();if(this.options.vScroll)this.vScrollbar=new n(this,new r);if(this.options.hScroll)this.hScrollbar=new n(this,new l);this.$element.data("scrollable",this);this.initKeyboardScrolling();this.bindEvents()};s.prototype={addScrollableClass:function(){if(!this.$element.hasClass("scrollable")){this.scrollableAdded=true;this.$element.addClass("scrollable")}},removeScrollableClass:function(){if(this.scrollableAdded)this.$element.removeClass("scrollable")},addSkinClass:function(){if(typeof this.options.skin=="string"&&!this.$element.hasClass(this.options.skin)){this.skinClassAdded=true;this.$element.addClass(this.options.skin)}},removeSkinClass:function(){if(this.skinClassAdded)this.$element.removeClass(this.options.skin)},addScrollBarComponents:function(){this.assignViewPort();if(this.$viewPort.length==0){this.$element.wrapInner('<div class="viewport" />');this.assignViewPort();this.viewPortAdded=true}this.assignOverview();if(this.$overview.length==0){this.$viewPort.wrapInner('<div class="overview" />');this.assignOverview();this.overviewAdded=true}this.addScrollBar("vertical","prepend");this.addScrollBar("horizontal","append")},removeScrollbarComponents:function(){this.removeScrollbar("vertical");this.removeScrollbar("horizontal");if(this.overviewAdded)this.$element.unwrap();if(this.viewPortAdded)this.$element.unwrap()},removeScrollbar:function(e){if(this[e+"ScrollbarAdded"])this.$element.find(".scroll-bar."+e).remove()},assignViewPort:function(){this.$viewPort=this.$element.find(".viewport")},assignOverview:function(){this.$overview=this.$viewPort.find(".overview")},addScrollBar:function(e,i){if(this.$element.find(".scroll-bar."+e).length==0){this.$element[i]("<div class='scroll-bar "+e+"'><div class='thumb'></div></div>");this[e+"ScrollbarAdded"]=true}},resize:function(e){if(this.vScrollbar)this.vScrollbar.resize(e);if(this.hScrollbar)this.hScrollbar.resize(e)},scrollTo:function(e){if(this.vScrollbar)this.vScrollbar.scrollToElement(e);if(this.hScrollbar)this.hScrollbar.scrollToElement(e)},scrollToXY:function(e,i){this.scrollToX(e);this.scrollToY(i)},scrollToX:function(e){if(this.hScrollbar)this.hScrollbar.scrollOverviewTo(e,true)},scrollToY:function(e){if(this.vScrollbar)this.vScrollbar.scrollOverviewTo(e,true)},remove:function(){this.removeScrollableClass();this.removeSkinClass();this.removeScrollbarComponents();this.$element.data("scrollable",null);this.removeKeyboardScrolling();if(this.vScrollbar)this.vScrollbar.remove();if(this.hScrollbar)this.hScrollbar.remove()},setAnimationSpeed:function(e){this.options.animationSpeed=e},isInside:function(i,t){var o=e(i);var s=e(t);var n=o.offset();var l=s.offset();return n.top>=l.top&&n.left>=l.left&&n.top+o.height()<=l.top+s.height()&&n.left+o.width()<=l.left+s.width()},initKeyboardScrolling:function(){var e=this;this.elementKeydown=function(i){if(document.activeElement===e.$element[0]){if(e.vScrollbar)e.vScrollbar.keyScroll(i);if(e.hScrollbar)e.hScrollbar.keyScroll(i)}};this.$element.attr("tabindex","-1").keydown(this.elementKeydown)},removeKeyboardScrolling:function(){this.$element.removeAttr("tabindex").unbind("keydown",this.elementKeydown)},bindEvents:function(){if(this.options.onCustomScroll)this.$element.on("customScroll",this.options.onCustomScroll)}};var n=function(e,i){this.scrollable=e;this.sizing=i;this.$scrollBar=this.sizing.scrollBar(this.scrollable.$element);this.$thumb=this.$scrollBar.find(".thumb");this.setScrollPosition(0,0);this.resize();this.initMouseMoveScrolling();this.initMouseWheelScrolling();this.initTouchScrolling();this.initMouseClickScrolling();this.initWindowResize()};n.prototype={resize:function(e){this.scrollable.$viewPort.height(this.scrollable.$element.height());this.sizing.size(this.scrollable.$viewPort,this.sizing.size(this.scrollable.$element));this.viewPortSize=this.sizing.size(this.scrollable.$viewPort);this.overviewSize=this.sizing.size(this.scrollable.$overview);this.ratio=this.viewPortSize/this.overviewSize;this.sizing.size(this.$scrollBar,this.viewPortSize);this.thumbSize=this.calculateThumbSize();this.sizing.size(this.$thumb,this.thumbSize);this.maxThumbPosition=this.calculateMaxThumbPosition();this.maxOverviewPosition=this.calculateMaxOverviewPosition();this.enabled=this.overviewSize>this.viewPortSize;if(this.scrollPercent===undefined)this.scrollPercent=0;if(this.enabled)this.rescroll(e);else this.setScrollPosition(0,0);this.$scrollBar.toggle(this.enabled)},calculateThumbSize:function(){var e=this.sizing.fixedThumbSize(this.scrollable.options);var i;if(e)i=e;else i=this.ratio*this.viewPortSize;return Math.max(i,this.sizing.minSize(this.$thumb))},initMouseMoveScrolling:function(){var i=this;this.$thumb.mousedown(function(e){if(i.enabled)i.startMouseMoveScrolling(e)});this.documentMouseup=function(e){i.stopMouseMoveScrolling(e)};e(document).mouseup(this.documentMouseup);this.documentMousemove=function(e){i.mouseMoveScroll(e)};e(document).mousemove(this.documentMousemove);this.$thumb.click(function(e){e.stopPropagation()})},removeMouseMoveScrolling:function(){this.$thumb.unbind();e(document).unbind("mouseup",this.documentMouseup);e(document).unbind("mousemove",this.documentMousemove)},initMouseWheelScrolling:function(){var e=this;this.scrollable.$element.mousewheel(function(i,t,o,s){if(e.enabled){if(e.mouseWheelScroll(o,s)){i.stopPropagation();i.preventDefault()}}})},removeMouseWheelScrolling:function(){this.scrollable.$element.unbind("mousewheel")},initTouchScrolling:function(){if(document.addEventListener){var e=this;this.elementTouchstart=function(i){if(e.enabled)e.startTouchScrolling(i)};this.scrollable.$element[0].addEventListener("touchstart",this.elementTouchstart);this.documentTouchmove=function(i){e.touchScroll(i)};document.addEventListener("touchmove",this.documentTouchmove);this.elementTouchend=function(i){e.stopTouchScrolling(i)};this.scrollable.$element[0].addEventListener("touchend",this.elementTouchend)}},removeTouchScrolling:function(){if(document.addEventListener){this.scrollable.$element[0].removeEventListener("touchstart",this.elementTouchstart);document.removeEventListener("touchmove",this.documentTouchmove);this.scrollable.$element[0].removeEventListener("touchend",this.elementTouchend)}},initMouseClickScrolling:function(){var e=this;this.scrollBarClick=function(i){e.mouseClickScroll(i)};this.$scrollBar.click(this.scrollBarClick)},removeMouseClickScrolling:function(){this.$scrollBar.unbind("click",this.scrollBarClick)},initWindowResize:function(){if(this.scrollable.options.updateOnWindowResize){var i=this;this.windowResize=function(){i.resize()};e(window).resize(this.windowResize)}},removeWindowResize:function(){e(window).unbind("resize",this.windowResize)},isKeyScrolling:function(e){return this.keyScrollDelta(e)!=null},keyScrollDelta:function(e){for(var i in this.sizing.scrollingKeys)if(i==e)return this.sizing.scrollingKeys[e](this.viewPortSize);return null},startMouseMoveScrolling:function(i){this.mouseMoveScrolling=true;e("html").addClass("not-selectable");this.setUnselectable(e("html"),"on");this.setScrollEvent(i)},stopMouseMoveScrolling:function(i){this.mouseMoveScrolling=false;e("html").removeClass("not-selectable");this.setUnselectable(e("html"),null)},setUnselectable:function(e,i){if(e.attr("unselectable")!=i){e.attr("unselectable",i);e.find(":not(input)").attr("unselectable",i)}},mouseMoveScroll:function(e){if(this.mouseMoveScrolling){var i=this.sizing.mouseDelta(this.scrollEvent,e);this.scrollThumbBy(i);this.setScrollEvent(e)}},startTouchScrolling:function(e){if(e.touches&&e.touches.length==1){this.setScrollEvent(e.touches[0]);this.touchScrolling=true;e.stopPropagation()}},touchScroll:function(e){if(this.touchScrolling&&e.touches&&e.touches.length==1){var i=-this.sizing.mouseDelta(this.scrollEvent,e.touches[0])*this.scrollable.options.swipeSpeed;var t=this.scrollOverviewBy(i);if(t){e.stopPropagation();e.preventDefault();this.setScrollEvent(e.touches[0])}}},stopTouchScrolling:function(e){this.touchScrolling=false;e.stopPropagation()},mouseWheelScroll:function(e,i){var t=-this.sizing.wheelDelta(e,i)*this.scrollable.options.wheelSpeed;if(t!=0)return this.scrollOverviewBy(t)},mouseClickScroll:function(e){var i=this.viewPortSize-20;if(e["page"+this.sizing.scrollAxis()]<this.$thumb.offset()[this.sizing.offsetComponent()])// mouse click over thumb
i=-i;this.scrollOverviewBy(i)},keyScroll:function(e){var i=e.which;if(this.enabled&&this.isKeyScrolling(i)){if(this.scrollOverviewBy(this.keyScrollDelta(i)))e.preventDefault()}},scrollThumbBy:function(e){var i=this.thumbPosition();i+=e;i=this.positionOrMax(i,this.maxThumbPosition);var t=this.scrollPercent;this.scrollPercent=i/this.maxThumbPosition;var o=i*this.maxOverviewPosition/this.maxThumbPosition;this.setScrollPosition(o,i);if(t!=this.scrollPercent){this.triggerCustomScroll(t);return true}else return false},thumbPosition:function(){return this.$thumb.position()[this.sizing.offsetComponent()]},scrollOverviewBy:function(e){var i=this.overviewPosition()+e;return this.scrollOverviewTo(i,false)},overviewPosition:function(){return-this.scrollable.$overview.position()[this.sizing.offsetComponent()]},scrollOverviewTo:function(e,i){e=this.positionOrMax(e,this.maxOverviewPosition);var t=this.scrollPercent;this.scrollPercent=e/this.maxOverviewPosition;var o=this.scrollPercent*this.maxThumbPosition;if(i)this.setScrollPositionWithAnimation(e,o);else this.setScrollPosition(e,o);if(t!=this.scrollPercent){this.triggerCustomScroll(t);return true}else return false},positionOrMax:function(e,i){if(e<0)return 0;else if(e>i)return i;else return e},triggerCustomScroll:function(e){this.scrollable.$element.trigger("customScroll",{scrollAxis:this.sizing.scrollAxis(),direction:this.sizing.scrollDirection(e,this.scrollPercent),scrollPercent:this.scrollPercent*100})},rescroll:function(e){if(e){var i=this.positionOrMax(this.overviewPosition(),this.maxOverviewPosition);this.scrollPercent=i/this.maxOverviewPosition;var t=this.scrollPercent*this.maxThumbPosition;this.setScrollPosition(i,t)}else{var t=this.scrollPercent*this.maxThumbPosition;var i=this.scrollPercent*this.maxOverviewPosition;this.setScrollPosition(i,t)}},setScrollPosition:function(e,i){this.$thumb.css(this.sizing.offsetComponent(),i+"px");this.scrollable.$overview.css(this.sizing.offsetComponent(),-e+"px")},setScrollPositionWithAnimation:function(e,i){var t={};var o={};t[this.sizing.offsetComponent()]=i+"px";this.$thumb.animate(t,this.scrollable.options.animationSpeed);o[this.sizing.offsetComponent()]=-e+"px";this.scrollable.$overview.animate(o,this.scrollable.options.animationSpeed)},calculateMaxThumbPosition:function(){return this.sizing.size(this.$scrollBar)-this.thumbSize},calculateMaxOverviewPosition:function(){return this.sizing.size(this.scrollable.$overview)-this.sizing.size(this.scrollable.$viewPort)},setScrollEvent:function(e){var i="page"+this.sizing.scrollAxis();if(!this.scrollEvent||this.scrollEvent[i]!=e[i])this.scrollEvent={pageX:e.pageX,pageY:e.pageY}},scrollToElement:function(i){var t=e(i);if(this.sizing.isInside(t,this.scrollable.$overview)&&!this.sizing.isInside(t,this.scrollable.$viewPort)){var o=t.offset();var s=this.scrollable.$overview.offset();var n=this.scrollable.$viewPort.offset();this.scrollOverviewTo(o[this.sizing.offsetComponent()]-s[this.sizing.offsetComponent()],true)}},remove:function(){this.removeMouseMoveScrolling();this.removeMouseWheelScrolling();this.removeTouchScrolling();this.removeMouseClickScrolling();this.removeWindowResize()}};var l=function(){};l.prototype={size:function(e,i){if(i)return e.width(i);else return e.width()},minSize:function(e){return parseInt(e.css("min-width"))||0},fixedThumbSize:function(e){return e.fixedThumbWidth},scrollBar:function(e){return e.find(".scroll-bar.horizontal")},mouseDelta:function(e,i){return i.pageX-e.pageX},offsetComponent:function(){return"left"},wheelDelta:function(e,i){return e},scrollAxis:function(){return"X"},scrollDirection:function(e,i){return e<i?"right":"left"},scrollingKeys:{37:function(e){return-10},39:function(e){return 10}},isInside:function(i,t){var o=e(i);var s=e(t);var n=o.offset();var l=s.offset();return n.left>=l.left&&n.left+o.width()<=l.left+s.width()}};var r=function(){};r.prototype={size:function(e,i){if(i)return e.height(i);else return e.height()},minSize:function(e){return parseInt(e.css("min-height"))||0},fixedThumbSize:function(e){return e.fixedThumbHeight},scrollBar:function(e){return e.find(".scroll-bar.vertical")},mouseDelta:function(e,i){return i.pageY-e.pageY},offsetComponent:function(){return"top"},wheelDelta:function(e,i){return i},scrollAxis:function(){return"Y"},scrollDirection:function(e,i){return e<i?"down":"up"},scrollingKeys:{38:function(e){return-10},40:function(e){return 10},33:function(e){return-(e-20)},34:function(e){return e-20}},isInside:function(i,t){var o=e(i);var s=e(t);var n=o.offset();var l=s.offset();return n.top>=l.top&&n.top+o.height()<=l.top+s.height()}};return this.each(function(){if(i==undefined)i=o;if(typeof i=="string"){var n=e(this).data("scrollable");if(n)n[i](t)}else if(typeof i=="object"){i=e.extend(o,i);new s(e(this),i)}else throw"Invalid type of options"})}})(jQuery);(function(e){var i=["DOMMouseScroll","mousewheel"];if(e.event.fixHooks){for(var t=i.length;t;){e.event.fixHooks[i[--t]]=e.event.mouseHooks}}e.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var e=i.length;e;){this.addEventListener(i[--e],o,false)}}else{this.onmousewheel=o}},teardown:function(){if(this.removeEventListener){for(var e=i.length;e;){this.removeEventListener(i[--e],o,false)}}else{this.onmousewheel=null}}};e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}});function o(i){var t=i||window.event,o=[].slice.call(arguments,1),s=0,n=true,l=0,r=0;i=e.event.fix(t);i.type="mousewheel";// Old school scrollwheel delta
if(t.wheelDelta){s=t.wheelDelta/120}if(t.detail){s=-t.detail/3}// New school multidimensional scroll (touchpads) deltas
r=s;// Gecko
if(t.axis!==undefined&&t.axis===t.HORIZONTAL_AXIS){r=0;l=s}// Webkit
if(t.wheelDeltaY!==undefined){r=t.wheelDeltaY/120}if(t.wheelDeltaX!==undefined){l=t.wheelDeltaX/120}// Add event and delta to the front of the arguments
o.unshift(i,s,l,r);return(e.event.dispatch||e.event.handle).apply(this,o)}})(jQuery);
// ==================================================
// fancyBox v3.5.7
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2019 fancyApps
//
// ==================================================
!function(t,e,n,o){"use strict";function i(t,e){var o,i,a,s=[],r=0;t&&t.isDefaultPrevented()||(t.preventDefault(),e=e||{},t&&t.data&&(e=h(t.data.options,e)),o=e.$target||n(t.currentTarget).trigger("blur"),(a=n.fancybox.getInstance())&&a.$trigger&&a.$trigger.is(o)||(e.selector?s=n(e.selector):(i=o.attr("data-fancybox")||"",i?(s=t.data?t.data.items:[],s=s.length?s.filter('[data-fancybox="'+i+'"]'):n('[data-fancybox="'+i+'"]')):s=[o]),r=n(s).index(o),r<0&&(r=0),a=n.fancybox.open(s,e,r),a.$trigger=o))}if(t.console=t.console||{info:function(t){}},n){if(n.fn.fancybox)return void console.info("fancyBox already initialized");var a={closeExisting:!1,loop:!1,gutter:50,keyboard:!0,preventCaptionOverlap:!0,arrows:!0,infobar:!0,smallBtn:"auto",toolbar:"auto",buttons:["zoom","slideShow","thumbs","close"],idleTime:3,protect:!1,modal:!1,image:{preload:!1},ajax:{settings:{data:{fancybox:!0}}},iframe:{tpl:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',preload:!0,css:{},attr:{scrolling:"auto"}},video:{tpl:'<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',format:"",autoStart:!0},defaultType:"image",animationEffect:"zoom",animationDuration:366,zoomOpacity:"auto",transitionEffect:"fade",transitionDuration:366,slideClass:"",baseClass:"",baseTpl:'<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',spinnerTpl:'<div class="fancybox-loading"></div>',errorTpl:'<div class="fancybox-error"><p>{{ERROR}}</p></div>',btnTpl:{download:'<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',zoom:'<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',close:'<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',arrowLeft:'<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',arrowRight:'<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',smallBtn:'<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>'},parentEl:"body",hideScrollbar:!0,autoFocus:!0,backFocus:!0,trapFocus:!0,fullScreen:{autoStart:!1},touch:{vertical:!0,momentum:!0},hash:null,media:{},slideShow:{autoStart:!1,speed:3e3},thumbs:{autoStart:!1,hideOnClose:!0,parentEl:".fancybox-container",axis:"y"},wheel:"auto",onInit:n.noop,beforeLoad:n.noop,afterLoad:n.noop,beforeShow:n.noop,afterShow:n.noop,beforeClose:n.noop,afterClose:n.noop,onActivate:n.noop,onDeactivate:n.noop,clickContent:function(t,e){return"image"===t.type&&"zoom"},clickSlide:"close",clickOutside:"close",dblclickContent:!1,dblclickSlide:!1,dblclickOutside:!1,mobile:{preventCaptionOverlap:!1,idleTime:!1,clickContent:function(t,e){return"image"===t.type&&"toggleControls"},clickSlide:function(t,e){return"image"===t.type?"toggleControls":"close"},dblclickContent:function(t,e){return"image"===t.type&&"zoom"},dblclickSlide:function(t,e){return"image"===t.type&&"zoom"}},lang:"en",i18n:{en:{CLOSE:"Close",NEXT:"Next",PREV:"Previous",ERROR:"The requested content cannot be loaded. <br/> Please try again later.",PLAY_START:"Start slideshow",PLAY_STOP:"Pause slideshow",FULL_SCREEN:"Full screen",THUMBS:"Thumbnails",DOWNLOAD:"Download",SHARE:"Share",ZOOM:"Zoom"},de:{CLOSE:"Schlie&szlig;en",NEXT:"Weiter",PREV:"Zur&uuml;ck",ERROR:"Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",PLAY_START:"Diaschau starten",PLAY_STOP:"Diaschau beenden",FULL_SCREEN:"Vollbild",THUMBS:"Vorschaubilder",DOWNLOAD:"Herunterladen",SHARE:"Teilen",ZOOM:"Vergr&ouml;&szlig;ern"}}},s=n(t),r=n(e),c=0,l=function(t){return t&&t.hasOwnProperty&&t instanceof n},d=function(){return t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||function(e){return t.setTimeout(e,1e3/60)}}(),u=function(){return t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||t.oCancelAnimationFrame||function(e){t.clearTimeout(e)}}(),f=function(){var t,n=e.createElement("fakeelement"),o={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in o)if(void 0!==n.style[t])return o[t];return"transitionend"}(),p=function(t){return t&&t.length&&t[0].offsetHeight},h=function(t,e){var o=n.extend(!0,{},t,e);return n.each(e,function(t,e){n.isArray(e)&&(o[t]=e)}),o},g=function(t){var o,i;return!(!t||t.ownerDocument!==e)&&(n(".fancybox-container").css("pointer-events","none"),o={x:t.getBoundingClientRect().left+t.offsetWidth/2,y:t.getBoundingClientRect().top+t.offsetHeight/2},i=e.elementFromPoint(o.x,o.y)===t,n(".fancybox-container").css("pointer-events",""),i)},b=function(t,e,o){var i=this;i.opts=h({index:o},n.fancybox.defaults),n.isPlainObject(e)&&(i.opts=h(i.opts,e)),n.fancybox.isMobile&&(i.opts=h(i.opts,i.opts.mobile)),i.id=i.opts.id||++c,i.currIndex=parseInt(i.opts.index,10)||0,i.prevIndex=null,i.prevPos=null,i.currPos=0,i.firstRun=!0,i.group=[],i.slides={},i.addContent(t),i.group.length&&i.init()};n.extend(b.prototype,{init:function(){var o,i,a=this,s=a.group[a.currIndex],r=s.opts;r.closeExisting&&n.fancybox.close(!0),n("body").addClass("fancybox-active"),!n.fancybox.getInstance()&&!1!==r.hideScrollbar&&!n.fancybox.isMobile&&e.body.scrollHeight>t.innerHeight&&(n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:'+(t.innerWidth-e.documentElement.clientWidth)+"px;}</style>"),n("body").addClass("compensate-for-scrollbar")),i="",n.each(r.buttons,function(t,e){i+=r.btnTpl[e]||""}),o=n(a.translate(a,r.baseTpl.replace("{{buttons}}",i).replace("{{arrows}}",r.btnTpl.arrowLeft+r.btnTpl.arrowRight))).attr("id","fancybox-container-"+a.id).addClass(r.baseClass).data("FancyBox",a).appendTo(r.parentEl),a.$refs={container:o},["bg","inner","infobar","toolbar","stage","caption","navigation"].forEach(function(t){a.$refs[t]=o.find(".fancybox-"+t)}),a.trigger("onInit"),a.activate(),a.jumpTo(a.currIndex)},translate:function(t,e){var n=t.opts.i18n[t.opts.lang]||t.opts.i18n.en;return e.replace(/\{\{(\w+)\}\}/g,function(t,e){return void 0===n[e]?t:n[e]})},addContent:function(t){var e,o=this,i=n.makeArray(t);n.each(i,function(t,e){var i,a,s,r,c,l={},d={};n.isPlainObject(e)?(l=e,d=e.opts||e):"object"===n.type(e)&&n(e).length?(i=n(e),d=i.data()||{},d=n.extend(!0,{},d,d.options),d.$orig=i,l.src=o.opts.src||d.src||i.attr("href"),l.type||l.src||(l.type="inline",l.src=e)):l={type:"html",src:e+""},l.opts=n.extend(!0,{},o.opts,d),n.isArray(d.buttons)&&(l.opts.buttons=d.buttons),n.fancybox.isMobile&&l.opts.mobile&&(l.opts=h(l.opts,l.opts.mobile)),a=l.type||l.opts.type,r=l.src||"",!a&&r&&((s=r.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))?(a="video",l.opts.video.format||(l.opts.video.format="video/"+("ogv"===s[1]?"ogg":s[1]))):r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)?a="image":r.match(/\.(pdf)((\?|#).*)?$/i)?(a="iframe",l=n.extend(!0,l,{contentType:"pdf",opts:{iframe:{preload:!1}}})):"#"===r.charAt(0)&&(a="inline")),a?l.type=a:o.trigger("objectNeedsType",l),l.contentType||(l.contentType=n.inArray(l.type,["html","inline","ajax"])>-1?"html":l.type),l.index=o.group.length,"auto"==l.opts.smallBtn&&(l.opts.smallBtn=n.inArray(l.type,["html","inline","ajax"])>-1),"auto"===l.opts.toolbar&&(l.opts.toolbar=!l.opts.smallBtn),l.$thumb=l.opts.$thumb||null,l.opts.$trigger&&l.index===o.opts.index&&(l.$thumb=l.opts.$trigger.find("img:first"),l.$thumb.length&&(l.opts.$orig=l.opts.$trigger)),l.$thumb&&l.$thumb.length||!l.opts.$orig||(l.$thumb=l.opts.$orig.find("img:first")),l.$thumb&&!l.$thumb.length&&(l.$thumb=null),l.thumb=l.opts.thumb||(l.$thumb?l.$thumb[0].src:null),"function"===n.type(l.opts.caption)&&(l.opts.caption=l.opts.caption.apply(e,[o,l])),"function"===n.type(o.opts.caption)&&(l.opts.caption=o.opts.caption.apply(e,[o,l])),l.opts.caption instanceof n||(l.opts.caption=void 0===l.opts.caption?"":l.opts.caption+""),"ajax"===l.type&&(c=r.split(/\s+/,2),c.length>1&&(l.src=c.shift(),l.opts.filter=c.shift())),l.opts.modal&&(l.opts=n.extend(!0,l.opts,{trapFocus:!0,infobar:0,toolbar:0,smallBtn:0,keyboard:0,slideShow:0,fullScreen:0,thumbs:0,touch:0,clickContent:!1,clickSlide:!1,clickOutside:!1,dblclickContent:!1,dblclickSlide:!1,dblclickOutside:!1})),o.group.push(l)}),Object.keys(o.slides).length&&(o.updateControls(),(e=o.Thumbs)&&e.isActive&&(e.create(),e.focus()))},addEvents:function(){var e=this;e.removeEvents(),e.$refs.container.on("click.fb-close","[data-fancybox-close]",function(t){t.stopPropagation(),t.preventDefault(),e.close(t)}).on("touchstart.fb-prev click.fb-prev","[data-fancybox-prev]",function(t){t.stopPropagation(),t.preventDefault(),e.previous()}).on("touchstart.fb-next click.fb-next","[data-fancybox-next]",function(t){t.stopPropagation(),t.preventDefault(),e.next()}).on("click.fb","[data-fancybox-zoom]",function(t){e[e.isScaledDown()?"scaleToActual":"scaleToFit"]()}),s.on("orientationchange.fb resize.fb",function(t){t&&t.originalEvent&&"resize"===t.originalEvent.type?(e.requestId&&u(e.requestId),e.requestId=d(function(){e.update(t)})):(e.current&&"iframe"===e.current.type&&e.$refs.stage.hide(),setTimeout(function(){e.$refs.stage.show(),e.update(t)},n.fancybox.isMobile?600:250))}),r.on("keydown.fb",function(t){var o=n.fancybox?n.fancybox.getInstance():null,i=o.current,a=t.keyCode||t.which;if(9==a)return void(i.opts.trapFocus&&e.focus(t));if(!(!i.opts.keyboard||t.ctrlKey||t.altKey||t.shiftKey||n(t.target).is("input,textarea,video,audio,select")))return 8===a||27===a?(t.preventDefault(),void e.close(t)):37===a||38===a?(t.preventDefault(),void e.previous()):39===a||40===a?(t.preventDefault(),void e.next()):void e.trigger("afterKeydown",t,a)}),e.group[e.currIndex].opts.idleTime&&(e.idleSecondsCounter=0,r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",function(t){e.idleSecondsCounter=0,e.isIdle&&e.showControls(),e.isIdle=!1}),e.idleInterval=t.setInterval(function(){++e.idleSecondsCounter>=e.group[e.currIndex].opts.idleTime&&!e.isDragging&&(e.isIdle=!0,e.idleSecondsCounter=0,e.hideControls())},1e3))},removeEvents:function(){var e=this;s.off("orientationchange.fb resize.fb"),r.off("keydown.fb .fb-idle"),this.$refs.container.off(".fb-close .fb-prev .fb-next"),e.idleInterval&&(t.clearInterval(e.idleInterval),e.idleInterval=null)},previous:function(t){return this.jumpTo(this.currPos-1,t)},next:function(t){return this.jumpTo(this.currPos+1,t)},jumpTo:function(t,e){var o,i,a,s,r,c,l,d,u,f=this,h=f.group.length;if(!(f.isDragging||f.isClosing||f.isAnimating&&f.firstRun)){if(t=parseInt(t,10),!(a=f.current?f.current.opts.loop:f.opts.loop)&&(t<0||t>=h))return!1;if(o=f.firstRun=!Object.keys(f.slides).length,r=f.current,f.prevIndex=f.currIndex,f.prevPos=f.currPos,s=f.createSlide(t),h>1&&((a||s.index<h-1)&&f.createSlide(t+1),(a||s.index>0)&&f.createSlide(t-1)),f.current=s,f.currIndex=s.index,f.currPos=s.pos,f.trigger("beforeShow",o),f.updateControls(),s.forcedDuration=void 0,n.isNumeric(e)?s.forcedDuration=e:e=s.opts[o?"animationDuration":"transitionDuration"],e=parseInt(e,10),i=f.isMoved(s),s.$slide.addClass("fancybox-slide--current"),o)return s.opts.animationEffect&&e&&f.$refs.container.css("transition-duration",e+"ms"),f.$refs.container.addClass("fancybox-is-open").trigger("focus"),f.loadSlide(s),void f.preload("image");c=n.fancybox.getTranslate(r.$slide),l=n.fancybox.getTranslate(f.$refs.stage),n.each(f.slides,function(t,e){n.fancybox.stop(e.$slide,!0)}),r.pos!==s.pos&&(r.isComplete=!1),r.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"),i?(u=c.left-(r.pos*c.width+r.pos*r.opts.gutter),n.each(f.slides,function(t,o){o.$slide.removeClass("fancybox-animated").removeClass(function(t,e){return(e.match(/(^|\s)fancybox-fx-\S+/g)||[]).join(" ")});var i=o.pos*c.width+o.pos*o.opts.gutter;n.fancybox.setTranslate(o.$slide,{top:0,left:i-l.left+u}),o.pos!==s.pos&&o.$slide.addClass("fancybox-slide--"+(o.pos>s.pos?"next":"previous")),p(o.$slide),n.fancybox.animate(o.$slide,{top:0,left:(o.pos-s.pos)*c.width+(o.pos-s.pos)*o.opts.gutter},e,function(){o.$slide.css({transform:"",opacity:""}).removeClass("fancybox-slide--next fancybox-slide--previous"),o.pos===f.currPos&&f.complete()})})):e&&s.opts.transitionEffect&&(d="fancybox-animated fancybox-fx-"+s.opts.transitionEffect,r.$slide.addClass("fancybox-slide--"+(r.pos>s.pos?"next":"previous")),n.fancybox.animate(r.$slide,d,e,function(){r.$slide.removeClass(d).removeClass("fancybox-slide--next fancybox-slide--previous")},!1)),s.isLoaded?f.revealContent(s):f.loadSlide(s),f.preload("image")}},createSlide:function(t){var e,o,i=this;return o=t%i.group.length,o=o<0?i.group.length+o:o,!i.slides[t]&&i.group[o]&&(e=n('<div class="fancybox-slide"></div>').appendTo(i.$refs.stage),i.slides[t]=n.extend(!0,{},i.group[o],{pos:t,$slide:e,isLoaded:!1}),i.updateSlide(i.slides[t])),i.slides[t]},scaleToActual:function(t,e,o){var i,a,s,r,c,l=this,d=l.current,u=d.$content,f=n.fancybox.getTranslate(d.$slide).width,p=n.fancybox.getTranslate(d.$slide).height,h=d.width,g=d.height;l.isAnimating||l.isMoved()||!u||"image"!=d.type||!d.isLoaded||d.hasError||(l.isAnimating=!0,n.fancybox.stop(u),t=void 0===t?.5*f:t,e=void 0===e?.5*p:e,i=n.fancybox.getTranslate(u),i.top-=n.fancybox.getTranslate(d.$slide).top,i.left-=n.fancybox.getTranslate(d.$slide).left,r=h/i.width,c=g/i.height,a=.5*f-.5*h,s=.5*p-.5*g,h>f&&(a=i.left*r-(t*r-t),a>0&&(a=0),a<f-h&&(a=f-h)),g>p&&(s=i.top*c-(e*c-e),s>0&&(s=0),s<p-g&&(s=p-g)),l.updateCursor(h,g),n.fancybox.animate(u,{top:s,left:a,scaleX:r,scaleY:c},o||366,function(){l.isAnimating=!1}),l.SlideShow&&l.SlideShow.isActive&&l.SlideShow.stop())},scaleToFit:function(t){var e,o=this,i=o.current,a=i.$content;o.isAnimating||o.isMoved()||!a||"image"!=i.type||!i.isLoaded||i.hasError||(o.isAnimating=!0,n.fancybox.stop(a),e=o.getFitPos(i),o.updateCursor(e.width,e.height),n.fancybox.animate(a,{top:e.top,left:e.left,scaleX:e.width/a.width(),scaleY:e.height/a.height()},t||366,function(){o.isAnimating=!1}))},getFitPos:function(t){var e,o,i,a,s=this,r=t.$content,c=t.$slide,l=t.width||t.opts.width,d=t.height||t.opts.height,u={};return!!(t.isLoaded&&r&&r.length)&&(e=n.fancybox.getTranslate(s.$refs.stage).width,o=n.fancybox.getTranslate(s.$refs.stage).height,e-=parseFloat(c.css("paddingLeft"))+parseFloat(c.css("paddingRight"))+parseFloat(r.css("marginLeft"))+parseFloat(r.css("marginRight")),o-=parseFloat(c.css("paddingTop"))+parseFloat(c.css("paddingBottom"))+parseFloat(r.css("marginTop"))+parseFloat(r.css("marginBottom")),l&&d||(l=e,d=o),i=Math.min(1,e/l,o/d),l*=i,d*=i,l>e-.5&&(l=e),d>o-.5&&(d=o),"image"===t.type?(u.top=Math.floor(.5*(o-d))+parseFloat(c.css("paddingTop")),u.left=Math.floor(.5*(e-l))+parseFloat(c.css("paddingLeft"))):"video"===t.contentType&&(a=t.opts.width&&t.opts.height?l/d:t.opts.ratio||16/9,d>l/a?d=l/a:l>d*a&&(l=d*a)),u.width=l,u.height=d,u)},update:function(t){var e=this;n.each(e.slides,function(n,o){e.updateSlide(o,t)})},updateSlide:function(t,e){var o=this,i=t&&t.$content,a=t.width||t.opts.width,s=t.height||t.opts.height,r=t.$slide;o.adjustCaption(t),i&&(a||s||"video"===t.contentType)&&!t.hasError&&(n.fancybox.stop(i),n.fancybox.setTranslate(i,o.getFitPos(t)),t.pos===o.currPos&&(o.isAnimating=!1,o.updateCursor())),o.adjustLayout(t),r.length&&(r.trigger("refresh"),t.pos===o.currPos&&o.$refs.toolbar.add(o.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar",r.get(0).scrollHeight>r.get(0).clientHeight)),o.trigger("onUpdate",t,e)},centerSlide:function(t){var e=this,o=e.current,i=o.$slide;!e.isClosing&&o&&(i.siblings().css({transform:"",opacity:""}),i.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"),n.fancybox.animate(i,{top:0,left:0,opacity:1},void 0===t?0:t,function(){i.css({transform:"",opacity:""}),o.isComplete||e.complete()},!1))},isMoved:function(t){var e,o,i=t||this.current;return!!i&&(o=n.fancybox.getTranslate(this.$refs.stage),e=n.fancybox.getTranslate(i.$slide),!i.$slide.hasClass("fancybox-animated")&&(Math.abs(e.top-o.top)>.5||Math.abs(e.left-o.left)>.5))},updateCursor:function(t,e){var o,i,a=this,s=a.current,r=a.$refs.container;s&&!a.isClosing&&a.Guestures&&(r.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"),o=a.canPan(t,e),i=!!o||a.isZoomable(),r.toggleClass("fancybox-is-zoomable",i),n("[data-fancybox-zoom]").prop("disabled",!i),o?r.addClass("fancybox-can-pan"):i&&("zoom"===s.opts.clickContent||n.isFunction(s.opts.clickContent)&&"zoom"==s.opts.clickContent(s))?r.addClass("fancybox-can-zoomIn"):s.opts.touch&&(s.opts.touch.vertical||a.group.length>1)&&"video"!==s.contentType&&r.addClass("fancybox-can-swipe"))},isZoomable:function(){var t,e=this,n=e.current;if(n&&!e.isClosing&&"image"===n.type&&!n.hasError){if(!n.isLoaded)return!0;if((t=e.getFitPos(n))&&(n.width>t.width||n.height>t.height))return!0}return!1},isScaledDown:function(t,e){var o=this,i=!1,a=o.current,s=a.$content;return void 0!==t&&void 0!==e?i=t<a.width&&e<a.height:s&&(i=n.fancybox.getTranslate(s),i=i.width<a.width&&i.height<a.height),i},canPan:function(t,e){var o=this,i=o.current,a=null,s=!1;return"image"===i.type&&(i.isComplete||t&&e)&&!i.hasError&&(s=o.getFitPos(i),void 0!==t&&void 0!==e?a={width:t,height:e}:i.isComplete&&(a=n.fancybox.getTranslate(i.$content)),a&&s&&(s=Math.abs(a.width-s.width)>1.5||Math.abs(a.height-s.height)>1.5)),s},loadSlide:function(t){var e,o,i,a=this;if(!t.isLoading&&!t.isLoaded){if(t.isLoading=!0,!1===a.trigger("beforeLoad",t))return t.isLoading=!1,!1;switch(e=t.type,o=t.$slide,o.off("refresh").trigger("onReset").addClass(t.opts.slideClass),e){case"image":a.setImage(t);break;case"iframe":a.setIframe(t);break;case"html":a.setContent(t,t.src||t.content);break;case"video":a.setContent(t,t.opts.video.tpl.replace(/\{\{src\}\}/gi,t.src).replace("{{format}}",t.opts.videoFormat||t.opts.video.format||"").replace("{{poster}}",t.thumb||""));break;case"inline":n(t.src).length?a.setContent(t,n(t.src)):a.setError(t);break;case"ajax":a.showLoading(t),i=n.ajax(n.extend({},t.opts.ajax.settings,{url:t.src,success:function(e,n){"success"===n&&a.setContent(t,e)},error:function(e,n){e&&"abort"!==n&&a.setError(t)}})),o.one("onReset",function(){i.abort()});break;default:a.setError(t)}return!0}},setImage:function(t){var o,i=this;setTimeout(function(){var e=t.$image;i.isClosing||!t.isLoading||e&&e.length&&e[0].complete||t.hasError||i.showLoading(t)},50),i.checkSrcset(t),t.$content=n('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(t.$slide.addClass("fancybox-slide--image")),!1!==t.opts.preload&&t.opts.width&&t.opts.height&&t.thumb&&(t.width=t.opts.width,t.height=t.opts.height,o=e.createElement("img"),o.onerror=function(){n(this).remove(),t.$ghost=null},o.onload=function(){i.afterLoad(t)},t.$ghost=n(o).addClass("fancybox-image").appendTo(t.$content).attr("src",t.thumb)),i.setBigImage(t)},checkSrcset:function(e){var n,o,i,a,s=e.opts.srcset||e.opts.image.srcset;if(s){i=t.devicePixelRatio||1,a=t.innerWidth*i,o=s.split(",").map(function(t){var e={};return t.trim().split(/\s+/).forEach(function(t,n){var o=parseInt(t.substring(0,t.length-1),10);if(0===n)return e.url=t;o&&(e.value=o,e.postfix=t[t.length-1])}),e}),o.sort(function(t,e){return t.value-e.value});for(var r=0;r<o.length;r++){var c=o[r];if("w"===c.postfix&&c.value>=a||"x"===c.postfix&&c.value>=i){n=c;break}}!n&&o.length&&(n=o[o.length-1]),n&&(e.src=n.url,e.width&&e.height&&"w"==n.postfix&&(e.height=e.width/e.height*n.value,e.width=n.value),e.opts.srcset=s)}},setBigImage:function(t){var o=this,i=e.createElement("img"),a=n(i);t.$image=a.one("error",function(){o.setError(t)}).one("load",function(){var e;t.$ghost||(o.resolveImageSlideSize(t,this.naturalWidth,this.naturalHeight),o.afterLoad(t)),o.isClosing||(t.opts.srcset&&(e=t.opts.sizes,e&&"auto"!==e||(e=(t.width/t.height>1&&s.width()/s.height()>1?"100":Math.round(t.width/t.height*100))+"vw"),a.attr("sizes",e).attr("srcset",t.opts.srcset)),t.$ghost&&setTimeout(function(){t.$ghost&&!o.isClosing&&t.$ghost.hide()},Math.min(300,Math.max(1e3,t.height/1600))),o.hideLoading(t))}).addClass("fancybox-image").attr("src",t.src).appendTo(t.$content),(i.complete||"complete"==i.readyState)&&a.naturalWidth&&a.naturalHeight?a.trigger("load"):i.error&&a.trigger("error")},resolveImageSlideSize:function(t,e,n){var o=parseInt(t.opts.width,10),i=parseInt(t.opts.height,10);t.width=e,t.height=n,o>0&&(t.width=o,t.height=Math.floor(o*n/e)),i>0&&(t.width=Math.floor(i*e/n),t.height=i)},setIframe:function(t){var e,o=this,i=t.opts.iframe,a=t.$slide;t.$content=n('<div class="fancybox-content'+(i.preload?" fancybox-is-hidden":"")+'"></div>').css(i.css).appendTo(a),a.addClass("fancybox-slide--"+t.contentType),t.$iframe=e=n(i.tpl.replace(/\{rnd\}/g,(new Date).getTime())).attr(i.attr).appendTo(t.$content),i.preload?(o.showLoading(t),e.on("load.fb error.fb",function(e){this.isReady=1,t.$slide.trigger("refresh"),o.afterLoad(t)}),a.on("refresh.fb",function(){var n,o,s=t.$content,r=i.css.width,c=i.css.height;if(1===e[0].isReady){try{n=e.contents(),o=n.find("body")}catch(t){}o&&o.length&&o.children().length&&(a.css("overflow","visible"),s.css({width:"100%","max-width":"100%",height:"9999px"}),void 0===r&&(r=Math.ceil(Math.max(o[0].clientWidth,o.outerWidth(!0)))),s.css("width",r||"").css("max-width",""),void 0===c&&(c=Math.ceil(Math.max(o[0].clientHeight,o.outerHeight(!0)))),s.css("height",c||""),a.css("overflow","auto")),s.removeClass("fancybox-is-hidden")}})):o.afterLoad(t),e.attr("src",t.src),a.one("onReset",function(){try{n(this).find("iframe").hide().unbind().attr("src","//about:blank")}catch(t){}n(this).off("refresh.fb").empty(),t.isLoaded=!1,t.isRevealed=!1})},setContent:function(t,e){var o=this;o.isClosing||(o.hideLoading(t),t.$content&&n.fancybox.stop(t.$content),t.$slide.empty(),l(e)&&e.parent().length?((e.hasClass("fancybox-content")||e.parent().hasClass("fancybox-content"))&&e.parents(".fancybox-slide").trigger("onReset"),t.$placeholder=n("<div>").hide().insertAfter(e),e.css("display","inline-block")):t.hasError||("string"===n.type(e)&&(e=n("<div>").append(n.trim(e)).contents()),t.opts.filter&&(e=n("<div>").html(e).find(t.opts.filter))),t.$slide.one("onReset",function(){n(this).find("video,audio").trigger("pause"),t.$placeholder&&(t.$placeholder.after(e.removeClass("fancybox-content").hide()).remove(),t.$placeholder=null),t.$smallBtn&&(t.$smallBtn.remove(),t.$smallBtn=null),t.hasError||(n(this).empty(),t.isLoaded=!1,t.isRevealed=!1)}),n(e).appendTo(t.$slide),n(e).is("video,audio")&&(n(e).addClass("fancybox-video"),n(e).wrap("<div></div>"),t.contentType="video",t.opts.width=t.opts.width||n(e).attr("width"),t.opts.height=t.opts.height||n(e).attr("height")),t.$content=t.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(),t.$content.siblings().hide(),t.$content.length||(t.$content=t.$slide.wrapInner("<div></div>").children().first()),t.$content.addClass("fancybox-content"),t.$slide.addClass("fancybox-slide--"+t.contentType),o.afterLoad(t))},setError:function(t){t.hasError=!0,t.$slide.trigger("onReset").removeClass("fancybox-slide--"+t.contentType).addClass("fancybox-slide--error"),t.contentType="html",this.setContent(t,this.translate(t,t.opts.errorTpl)),t.pos===this.currPos&&(this.isAnimating=!1)},showLoading:function(t){var e=this;(t=t||e.current)&&!t.$spinner&&(t.$spinner=n(e.translate(e,e.opts.spinnerTpl)).appendTo(t.$slide).hide().fadeIn("fast"))},hideLoading:function(t){var e=this;(t=t||e.current)&&t.$spinner&&(t.$spinner.stop().remove(),delete t.$spinner)},afterLoad:function(t){var e=this;e.isClosing||(t.isLoading=!1,t.isLoaded=!0,e.trigger("afterLoad",t),e.hideLoading(t),!t.opts.smallBtn||t.$smallBtn&&t.$smallBtn.length||(t.$smallBtn=n(e.translate(t,t.opts.btnTpl.smallBtn)).appendTo(t.$content)),t.opts.protect&&t.$content&&!t.hasError&&(t.$content.on("contextmenu.fb",function(t){return 2==t.button&&t.preventDefault(),!0}),"image"===t.type&&n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)),e.adjustCaption(t),e.adjustLayout(t),t.pos===e.currPos&&e.updateCursor(),e.revealContent(t))},adjustCaption:function(t){var e,n=this,o=t||n.current,i=o.opts.caption,a=o.opts.preventCaptionOverlap,s=n.$refs.caption,r=!1;s.toggleClass("fancybox-caption--separate",a),a&&i&&i.length&&(o.pos!==n.currPos?(e=s.clone().appendTo(s.parent()),e.children().eq(0).empty().html(i),r=e.outerHeight(!0),e.empty().remove()):n.$caption&&(r=n.$caption.outerHeight(!0)),o.$slide.css("padding-bottom",r||""))},adjustLayout:function(t){var e,n,o,i,a=this,s=t||a.current;s.isLoaded&&!0!==s.opts.disableLayoutFix&&(s.$content.css("margin-bottom",""),s.$content.outerHeight()>s.$slide.height()+.5&&(o=s.$slide[0].style["padding-bottom"],i=s.$slide.css("padding-bottom"),parseFloat(i)>0&&(e=s.$slide[0].scrollHeight,s.$slide.css("padding-bottom",0),Math.abs(e-s.$slide[0].scrollHeight)<1&&(n=i),s.$slide.css("padding-bottom",o))),s.$content.css("margin-bottom",n))},revealContent:function(t){var e,o,i,a,s=this,r=t.$slide,c=!1,l=!1,d=s.isMoved(t),u=t.isRevealed;return t.isRevealed=!0,e=t.opts[s.firstRun?"animationEffect":"transitionEffect"],i=t.opts[s.firstRun?"animationDuration":"transitionDuration"],i=parseInt(void 0===t.forcedDuration?i:t.forcedDuration,10),!d&&t.pos===s.currPos&&i||(e=!1),"zoom"===e&&(t.pos===s.currPos&&i&&"image"===t.type&&!t.hasError&&(l=s.getThumbPos(t))?c=s.getFitPos(t):e="fade"),"zoom"===e?(s.isAnimating=!0,c.scaleX=c.width/l.width,c.scaleY=c.height/l.height,a=t.opts.zoomOpacity,"auto"==a&&(a=Math.abs(t.width/t.height-l.width/l.height)>.1),a&&(l.opacity=.1,c.opacity=1),n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"),l),p(t.$content),void n.fancybox.animate(t.$content,c,i,function(){s.isAnimating=!1,s.complete()})):(s.updateSlide(t),e?(n.fancybox.stop(r),o="fancybox-slide--"+(t.pos>=s.prevPos?"next":"previous")+" fancybox-animated fancybox-fx-"+e,r.addClass(o).removeClass("fancybox-slide--current"),t.$content.removeClass("fancybox-is-hidden"),p(r),"image"!==t.type&&t.$content.hide().show(0),void n.fancybox.animate(r,"fancybox-slide--current",i,function(){r.removeClass(o).css({transform:"",opacity:""}),t.pos===s.currPos&&s.complete()},!0)):(t.$content.removeClass("fancybox-is-hidden"),u||!d||"image"!==t.type||t.hasError||t.$content.hide().fadeIn("fast"),void(t.pos===s.currPos&&s.complete())))},getThumbPos:function(t){var e,o,i,a,s,r=!1,c=t.$thumb;return!(!c||!g(c[0]))&&(e=n.fancybox.getTranslate(c),o=parseFloat(c.css("border-top-width")||0),i=parseFloat(c.css("border-right-width")||0),a=parseFloat(c.css("border-bottom-width")||0),s=parseFloat(c.css("border-left-width")||0),r={top:e.top+o,left:e.left+s,width:e.width-i-s,height:e.height-o-a,scaleX:1,scaleY:1},e.width>0&&e.height>0&&r)},complete:function(){var t,e=this,o=e.current,i={};!e.isMoved()&&o.isLoaded&&(o.isComplete||(o.isComplete=!0,o.$slide.siblings().trigger("onReset"),e.preload("inline"),p(o.$slide),o.$slide.addClass("fancybox-slide--complete"),n.each(e.slides,function(t,o){o.pos>=e.currPos-1&&o.pos<=e.currPos+1?i[o.pos]=o:o&&(n.fancybox.stop(o.$slide),o.$slide.off().remove())}),e.slides=i),e.isAnimating=!1,e.updateCursor(),e.trigger("afterShow"),o.opts.video.autoStart&&o.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended",function(){Document.exitFullscreen?Document.exitFullscreen():this.webkitExitFullscreen&&this.webkitExitFullscreen(),e.next()}),o.opts.autoFocus&&"html"===o.contentType&&(t=o.$content.find("input[autofocus]:enabled:visible:first"),t.length?t.trigger("focus"):e.focus(null,!0)),o.$slide.scrollTop(0).scrollLeft(0))},preload:function(t){var e,n,o=this;o.group.length<2||(n=o.slides[o.currPos+1],e=o.slides[o.currPos-1],e&&e.type===t&&o.loadSlide(e),n&&n.type===t&&o.loadSlide(n))},focus:function(t,o){var i,a,s=this,r=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","video","audio","[contenteditable]",'[tabindex]:not([tabindex^="-"])'].join(",");s.isClosing||(i=!t&&s.current&&s.current.isComplete?s.current.$slide.find("*:visible"+(o?":not(.fancybox-close-small)":"")):s.$refs.container.find("*:visible"),i=i.filter(r).filter(function(){return"hidden"!==n(this).css("visibility")&&!n(this).hasClass("disabled")}),i.length?(a=i.index(e.activeElement),t&&t.shiftKey?(a<0||0==a)&&(t.preventDefault(),i.eq(i.length-1).trigger("focus")):(a<0||a==i.length-1)&&(t&&t.preventDefault(),i.eq(0).trigger("focus"))):s.$refs.container.trigger("focus"))},activate:function(){var t=this;n(".fancybox-container").each(function(){var e=n(this).data("FancyBox");e&&e.id!==t.id&&!e.isClosing&&(e.trigger("onDeactivate"),e.removeEvents(),e.isVisible=!1)}),t.isVisible=!0,(t.current||t.isIdle)&&(t.update(),t.updateControls()),t.trigger("onActivate"),t.addEvents()},close:function(t,e){var o,i,a,s,r,c,l,u=this,f=u.current,h=function(){u.cleanUp(t)};return!u.isClosing&&(u.isClosing=!0,!1===u.trigger("beforeClose",t)?(u.isClosing=!1,d(function(){u.update()}),!1):(u.removeEvents(),a=f.$content,o=f.opts.animationEffect,i=n.isNumeric(e)?e:o?f.opts.animationDuration:0,f.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"),!0!==t?n.fancybox.stop(f.$slide):o=!1,f.$slide.siblings().trigger("onReset").remove(),i&&u.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration",i+"ms"),u.hideLoading(f),u.hideControls(!0),u.updateCursor(),"zoom"!==o||a&&i&&"image"===f.type&&!u.isMoved()&&!f.hasError&&(l=u.getThumbPos(f))||(o="fade"),"zoom"===o?(n.fancybox.stop(a),s=n.fancybox.getTranslate(a),c={top:s.top,left:s.left,scaleX:s.width/l.width,scaleY:s.height/l.height,width:l.width,height:l.height},r=f.opts.zoomOpacity,
"auto"==r&&(r=Math.abs(f.width/f.height-l.width/l.height)>.1),r&&(l.opacity=0),n.fancybox.setTranslate(a,c),p(a),n.fancybox.animate(a,l,i,h),!0):(o&&i?n.fancybox.animate(f.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"),"fancybox-animated fancybox-fx-"+o,i,h):!0===t?setTimeout(h,i):h(),!0)))},cleanUp:function(e){var o,i,a,s=this,r=s.current.opts.$orig;s.current.$slide.trigger("onReset"),s.$refs.container.empty().remove(),s.trigger("afterClose",e),s.current.opts.backFocus&&(r&&r.length&&r.is(":visible")||(r=s.$trigger),r&&r.length&&(i=t.scrollX,a=t.scrollY,r.trigger("focus"),n("html, body").scrollTop(a).scrollLeft(i))),s.current=null,o=n.fancybox.getInstance(),o?o.activate():(n("body").removeClass("fancybox-active compensate-for-scrollbar"),n("#fancybox-style-noscroll").remove())},trigger:function(t,e){var o,i=Array.prototype.slice.call(arguments,1),a=this,s=e&&e.opts?e:a.current;if(s?i.unshift(s):s=a,i.unshift(a),n.isFunction(s.opts[t])&&(o=s.opts[t].apply(s,i)),!1===o)return o;"afterClose"!==t&&a.$refs?a.$refs.container.trigger(t+".fb",i):r.trigger(t+".fb",i)},updateControls:function(){var t=this,o=t.current,i=o.index,a=t.$refs.container,s=t.$refs.caption,r=o.opts.caption;o.$slide.trigger("refresh"),r&&r.length?(t.$caption=s,s.children().eq(0).html(r)):t.$caption=null,t.hasHiddenControls||t.isIdle||t.showControls(),a.find("[data-fancybox-count]").html(t.group.length),a.find("[data-fancybox-index]").html(i+1),a.find("[data-fancybox-prev]").prop("disabled",!o.opts.loop&&i<=0),a.find("[data-fancybox-next]").prop("disabled",!o.opts.loop&&i>=t.group.length-1),"image"===o.type?a.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href",o.opts.image.src||o.src).show():o.opts.toolbar&&a.find("[data-fancybox-download],[data-fancybox-zoom]").hide(),n(e.activeElement).is(":hidden,[disabled]")&&t.$refs.container.trigger("focus")},hideControls:function(t){var e=this,n=["infobar","toolbar","nav"];!t&&e.current.opts.preventCaptionOverlap||n.push("caption"),this.$refs.container.removeClass(n.map(function(t){return"fancybox-show-"+t}).join(" ")),this.hasHiddenControls=!0},showControls:function(){var t=this,e=t.current?t.current.opts:t.opts,n=t.$refs.container;t.hasHiddenControls=!1,t.idleSecondsCounter=0,n.toggleClass("fancybox-show-toolbar",!(!e.toolbar||!e.buttons)).toggleClass("fancybox-show-infobar",!!(e.infobar&&t.group.length>1)).toggleClass("fancybox-show-caption",!!t.$caption).toggleClass("fancybox-show-nav",!!(e.arrows&&t.group.length>1)).toggleClass("fancybox-is-modal",!!e.modal)},toggleControls:function(){this.hasHiddenControls?this.showControls():this.hideControls()}}),n.fancybox={version:"3.5.7",defaults:a,getInstance:function(t){var e=n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),o=Array.prototype.slice.call(arguments,1);return e instanceof b&&("string"===n.type(t)?e[t].apply(e,o):"function"===n.type(t)&&t.apply(e,o),e)},open:function(t,e,n){return new b(t,e,n)},close:function(t){var e=this.getInstance();e&&(e.close(),!0===t&&this.close(t))},destroy:function(){this.close(!0),r.add("body").off("click.fb-start","**")},isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),use3d:function(){var n=e.createElement("div");return t.getComputedStyle&&t.getComputedStyle(n)&&t.getComputedStyle(n).getPropertyValue("transform")&&!(e.documentMode&&e.documentMode<11)}(),getTranslate:function(t){var e;return!(!t||!t.length)&&(e=t[0].getBoundingClientRect(),{top:e.top||0,left:e.left||0,width:e.width,height:e.height,opacity:parseFloat(t.css("opacity"))})},setTranslate:function(t,e){var n="",o={};if(t&&e)return void 0===e.left&&void 0===e.top||(n=(void 0===e.left?t.position().left:e.left)+"px, "+(void 0===e.top?t.position().top:e.top)+"px",n=this.use3d?"translate3d("+n+", 0px)":"translate("+n+")"),void 0!==e.scaleX&&void 0!==e.scaleY?n+=" scale("+e.scaleX+", "+e.scaleY+")":void 0!==e.scaleX&&(n+=" scaleX("+e.scaleX+")"),n.length&&(o.transform=n),void 0!==e.opacity&&(o.opacity=e.opacity),void 0!==e.width&&(o.width=e.width),void 0!==e.height&&(o.height=e.height),t.css(o)},animate:function(t,e,o,i,a){var s,r=this;n.isFunction(o)&&(i=o,o=null),r.stop(t),s=r.getTranslate(t),t.on(f,function(c){(!c||!c.originalEvent||t.is(c.originalEvent.target)&&"z-index"!=c.originalEvent.propertyName)&&(r.stop(t),n.isNumeric(o)&&t.css("transition-duration",""),n.isPlainObject(e)?void 0!==e.scaleX&&void 0!==e.scaleY&&r.setTranslate(t,{top:e.top,left:e.left,width:s.width*e.scaleX,height:s.height*e.scaleY,scaleX:1,scaleY:1}):!0!==a&&t.removeClass(e),n.isFunction(i)&&i(c))}),n.isNumeric(o)&&t.css("transition-duration",o+"ms"),n.isPlainObject(e)?(void 0!==e.scaleX&&void 0!==e.scaleY&&(delete e.width,delete e.height,t.parent().hasClass("fancybox-slide--image")&&t.parent().addClass("fancybox-is-scaling")),n.fancybox.setTranslate(t,e)):t.addClass(e),t.data("timer",setTimeout(function(){t.trigger(f)},o+33))},stop:function(t,e){t&&t.length&&(clearTimeout(t.data("timer")),e&&t.trigger(f),t.off(f).css("transition-duration",""),t.parent().removeClass("fancybox-is-scaling"))}},n.fn.fancybox=function(t){var e;return t=t||{},e=t.selector||!1,e?n("body").off("click.fb-start",e).on("click.fb-start",e,{options:t},i):this.off("click.fb-start").on("click.fb-start",{items:this,options:t},i),this},r.on("click.fb-start","[data-fancybox]",i),r.on("click.fb-start","[data-fancybox-trigger]",function(t){n('[data-fancybox="'+n(this).attr("data-fancybox-trigger")+'"]').eq(n(this).attr("data-fancybox-index")||0).trigger("click.fb-start",{$trigger:n(this)})}),function(){var t=null;r.on("mousedown mouseup focus blur",".fancybox-button",function(e){switch(e.type){case"mousedown":t=n(this);break;case"mouseup":t=null;break;case"focusin":n(".fancybox-button").removeClass("fancybox-focus"),n(this).is(t)||n(this).is("[disabled]")||n(this).addClass("fancybox-focus");break;case"focusout":n(".fancybox-button").removeClass("fancybox-focus")}})}()}}(window,document,jQuery),function(t){"use strict";var e={youtube:{matcher:/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,params:{autoplay:1,autohide:1,fs:1,rel:0,hd:1,wmode:"transparent",enablejsapi:1,html5:1},paramPlace:8,type:"iframe",url:"https://www.youtube-nocookie.com/embed/$4",thumb:"https://img.youtube.com/vi/$4/hqdefault.jpg"},vimeo:{matcher:/^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,params:{autoplay:1,hd:1,show_title:1,show_byline:1,show_portrait:0,fullscreen:1},paramPlace:3,type:"iframe",url:"//player.vimeo.com/video/$2"},instagram:{matcher:/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,type:"image",url:"//$1/p/$2/media/?size=l"},gmap_place:{matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,type:"iframe",url:function(t){return"//maps.google."+t[2]+"/?ll="+(t[9]?t[9]+"&z="+Math.floor(t[10])+(t[12]?t[12].replace(/^\//,"&"):""):t[12]+"").replace(/\?/,"&")+"&output="+(t[12]&&t[12].indexOf("layer=c")>0?"svembed":"embed")}},gmap_search:{matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,type:"iframe",url:function(t){return"//maps.google."+t[2]+"/maps?q="+t[5].replace("query=","q=").replace("api=1","")+"&output=embed"}}},n=function(e,n,o){if(e)return o=o||"","object"===t.type(o)&&(o=t.param(o,!0)),t.each(n,function(t,n){e=e.replace("$"+t,n||"")}),o.length&&(e+=(e.indexOf("?")>0?"&":"?")+o),e};t(document).on("objectNeedsType.fb",function(o,i,a){var s,r,c,l,d,u,f,p=a.src||"",h=!1;s=t.extend(!0,{},e,a.opts.media),t.each(s,function(e,o){if(c=p.match(o.matcher)){if(h=o.type,f=e,u={},o.paramPlace&&c[o.paramPlace]){d=c[o.paramPlace],"?"==d[0]&&(d=d.substring(1)),d=d.split("&");for(var i=0;i<d.length;++i){var s=d[i].split("=",2);2==s.length&&(u[s[0]]=decodeURIComponent(s[1].replace(/\+/g," ")))}}return l=t.extend(!0,{},o.params,a.opts[e],u),p="function"===t.type(o.url)?o.url.call(this,c,l,a):n(o.url,c,l),r="function"===t.type(o.thumb)?o.thumb.call(this,c,l,a):n(o.thumb,c),"youtube"===e?p=p.replace(/&t=((\d+)m)?(\d+)s/,function(t,e,n,o){return"&start="+((n?60*parseInt(n,10):0)+parseInt(o,10))}):"vimeo"===e&&(p=p.replace("&%23","#")),!1}}),h?(a.opts.thumb||a.opts.$thumb&&a.opts.$thumb.length||(a.opts.thumb=r),"iframe"===h&&(a.opts=t.extend(!0,a.opts,{iframe:{preload:!1,attr:{scrolling:"no"}}})),t.extend(a,{type:h,src:p,origSrc:a.src,contentSource:f,contentType:"image"===h?"image":"gmap_place"==f||"gmap_search"==f?"map":"video"})):p&&(a.type=a.opts.defaultType)});var o={youtube:{src:"https://www.youtube.com/iframe_api",class:"YT",loading:!1,loaded:!1},vimeo:{src:"https://player.vimeo.com/api/player.js",class:"Vimeo",loading:!1,loaded:!1},load:function(t){var e,n=this;if(this[t].loaded)return void setTimeout(function(){n.done(t)});this[t].loading||(this[t].loading=!0,e=document.createElement("script"),e.type="text/javascript",e.src=this[t].src,"youtube"===t?window.onYouTubeIframeAPIReady=function(){n[t].loaded=!0,n.done(t)}:e.onload=function(){n[t].loaded=!0,n.done(t)},document.body.appendChild(e))},done:function(e){var n,o,i;"youtube"===e&&delete window.onYouTubeIframeAPIReady,(n=t.fancybox.getInstance())&&(o=n.current.$content.find("iframe"),"youtube"===e&&void 0!==YT&&YT?i=new YT.Player(o.attr("id"),{events:{onStateChange:function(t){0==t.data&&n.next()}}}):"vimeo"===e&&void 0!==Vimeo&&Vimeo&&(i=new Vimeo.Player(o),i.on("ended",function(){n.next()})))}};t(document).on({"afterShow.fb":function(t,e,n){e.group.length>1&&("youtube"===n.contentSource||"vimeo"===n.contentSource)&&o.load(n.contentSource)}})}(jQuery),function(t,e,n){"use strict";var o=function(){return t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||function(e){return t.setTimeout(e,1e3/60)}}(),i=function(){return t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||t.oCancelAnimationFrame||function(e){t.clearTimeout(e)}}(),a=function(e){var n=[];e=e.originalEvent||e||t.e,e=e.touches&&e.touches.length?e.touches:e.changedTouches&&e.changedTouches.length?e.changedTouches:[e];for(var o in e)e[o].pageX?n.push({x:e[o].pageX,y:e[o].pageY}):e[o].clientX&&n.push({x:e[o].clientX,y:e[o].clientY});return n},s=function(t,e,n){return e&&t?"x"===n?t.x-e.x:"y"===n?t.y-e.y:Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)):0},r=function(t){if(t.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe')||n.isFunction(t.get(0).onclick)||t.data("selectable"))return!0;for(var e=0,o=t[0].attributes,i=o.length;e<i;e++)if("data-fancybox-"===o[e].nodeName.substr(0,14))return!0;return!1},c=function(e){var n=t.getComputedStyle(e)["overflow-y"],o=t.getComputedStyle(e)["overflow-x"],i=("scroll"===n||"auto"===n)&&e.scrollHeight>e.clientHeight,a=("scroll"===o||"auto"===o)&&e.scrollWidth>e.clientWidth;return i||a},l=function(t){for(var e=!1;;){if(e=c(t.get(0)))break;if(t=t.parent(),!t.length||t.hasClass("fancybox-stage")||t.is("body"))break}return e},d=function(t){var e=this;e.instance=t,e.$bg=t.$refs.bg,e.$stage=t.$refs.stage,e.$container=t.$refs.container,e.destroy(),e.$container.on("touchstart.fb.touch mousedown.fb.touch",n.proxy(e,"ontouchstart"))};d.prototype.destroy=function(){var t=this;t.$container.off(".fb.touch"),n(e).off(".fb.touch"),t.requestId&&(i(t.requestId),t.requestId=null),t.tapped&&(clearTimeout(t.tapped),t.tapped=null)},d.prototype.ontouchstart=function(o){var i=this,c=n(o.target),d=i.instance,u=d.current,f=u.$slide,p=u.$content,h="touchstart"==o.type;if(h&&i.$container.off("mousedown.fb.touch"),(!o.originalEvent||2!=o.originalEvent.button)&&f.length&&c.length&&!r(c)&&!r(c.parent())&&(c.is("img")||!(o.originalEvent.clientX>c[0].clientWidth+c.offset().left))){if(!u||d.isAnimating||u.$slide.hasClass("fancybox-animated"))return o.stopPropagation(),void o.preventDefault();i.realPoints=i.startPoints=a(o),i.startPoints.length&&(u.touch&&o.stopPropagation(),i.startEvent=o,i.canTap=!0,i.$target=c,i.$content=p,i.opts=u.opts.touch,i.isPanning=!1,i.isSwiping=!1,i.isZooming=!1,i.isScrolling=!1,i.canPan=d.canPan(),i.startTime=(new Date).getTime(),i.distanceX=i.distanceY=i.distance=0,i.canvasWidth=Math.round(f[0].clientWidth),i.canvasHeight=Math.round(f[0].clientHeight),i.contentLastPos=null,i.contentStartPos=n.fancybox.getTranslate(i.$content)||{top:0,left:0},i.sliderStartPos=n.fancybox.getTranslate(f),i.stagePos=n.fancybox.getTranslate(d.$refs.stage),i.sliderStartPos.top-=i.stagePos.top,i.sliderStartPos.left-=i.stagePos.left,i.contentStartPos.top-=i.stagePos.top,i.contentStartPos.left-=i.stagePos.left,n(e).off(".fb.touch").on(h?"touchend.fb.touch touchcancel.fb.touch":"mouseup.fb.touch mouseleave.fb.touch",n.proxy(i,"ontouchend")).on(h?"touchmove.fb.touch":"mousemove.fb.touch",n.proxy(i,"ontouchmove")),n.fancybox.isMobile&&e.addEventListener("scroll",i.onscroll,!0),((i.opts||i.canPan)&&(c.is(i.$stage)||i.$stage.find(c).length)||(c.is(".fancybox-image")&&o.preventDefault(),n.fancybox.isMobile&&c.parents(".fancybox-caption").length))&&(i.isScrollable=l(c)||l(c.parent()),n.fancybox.isMobile&&i.isScrollable||o.preventDefault(),(1===i.startPoints.length||u.hasError)&&(i.canPan?(n.fancybox.stop(i.$content),i.isPanning=!0):i.isSwiping=!0,i.$container.addClass("fancybox-is-grabbing")),2===i.startPoints.length&&"image"===u.type&&(u.isLoaded||u.$ghost)&&(i.canTap=!1,i.isSwiping=!1,i.isPanning=!1,i.isZooming=!0,n.fancybox.stop(i.$content),i.centerPointStartX=.5*(i.startPoints[0].x+i.startPoints[1].x)-n(t).scrollLeft(),i.centerPointStartY=.5*(i.startPoints[0].y+i.startPoints[1].y)-n(t).scrollTop(),i.percentageOfImageAtPinchPointX=(i.centerPointStartX-i.contentStartPos.left)/i.contentStartPos.width,i.percentageOfImageAtPinchPointY=(i.centerPointStartY-i.contentStartPos.top)/i.contentStartPos.height,i.startDistanceBetweenFingers=s(i.startPoints[0],i.startPoints[1]))))}},d.prototype.onscroll=function(t){var n=this;n.isScrolling=!0,e.removeEventListener("scroll",n.onscroll,!0)},d.prototype.ontouchmove=function(t){var e=this;return void 0!==t.originalEvent.buttons&&0===t.originalEvent.buttons?void e.ontouchend(t):e.isScrolling?void(e.canTap=!1):(e.newPoints=a(t),void((e.opts||e.canPan)&&e.newPoints.length&&e.newPoints.length&&(e.isSwiping&&!0===e.isSwiping||t.preventDefault(),e.distanceX=s(e.newPoints[0],e.startPoints[0],"x"),e.distanceY=s(e.newPoints[0],e.startPoints[0],"y"),e.distance=s(e.newPoints[0],e.startPoints[0]),e.distance>0&&(e.isSwiping?e.onSwipe(t):e.isPanning?e.onPan():e.isZooming&&e.onZoom()))))},d.prototype.onSwipe=function(e){var a,s=this,r=s.instance,c=s.isSwiping,l=s.sliderStartPos.left||0;if(!0!==c)"x"==c&&(s.distanceX>0&&(s.instance.group.length<2||0===s.instance.current.index&&!s.instance.current.opts.loop)?l+=Math.pow(s.distanceX,.8):s.distanceX<0&&(s.instance.group.length<2||s.instance.current.index===s.instance.group.length-1&&!s.instance.current.opts.loop)?l-=Math.pow(-s.distanceX,.8):l+=s.distanceX),s.sliderLastPos={top:"x"==c?0:s.sliderStartPos.top+s.distanceY,left:l},s.requestId&&(i(s.requestId),s.requestId=null),s.requestId=o(function(){s.sliderLastPos&&(n.each(s.instance.slides,function(t,e){var o=e.pos-s.instance.currPos;n.fancybox.setTranslate(e.$slide,{top:s.sliderLastPos.top,left:s.sliderLastPos.left+o*s.canvasWidth+o*e.opts.gutter})}),s.$container.addClass("fancybox-is-sliding"))});else if(Math.abs(s.distance)>10){if(s.canTap=!1,r.group.length<2&&s.opts.vertical?s.isSwiping="y":r.isDragging||!1===s.opts.vertical||"auto"===s.opts.vertical&&n(t).width()>800?s.isSwiping="x":(a=Math.abs(180*Math.atan2(s.distanceY,s.distanceX)/Math.PI),s.isSwiping=a>45&&a<135?"y":"x"),"y"===s.isSwiping&&n.fancybox.isMobile&&s.isScrollable)return void(s.isScrolling=!0);r.isDragging=s.isSwiping,s.startPoints=s.newPoints,n.each(r.slides,function(t,e){var o,i;n.fancybox.stop(e.$slide),o=n.fancybox.getTranslate(e.$slide),i=n.fancybox.getTranslate(r.$refs.stage),e.$slide.css({transform:"",opacity:"","transition-duration":""}).removeClass("fancybox-animated").removeClass(function(t,e){return(e.match(/(^|\s)fancybox-fx-\S+/g)||[]).join(" ")}),e.pos===r.current.pos&&(s.sliderStartPos.top=o.top-i.top,s.sliderStartPos.left=o.left-i.left),n.fancybox.setTranslate(e.$slide,{top:o.top-i.top,left:o.left-i.left})}),r.SlideShow&&r.SlideShow.isActive&&r.SlideShow.stop()}},d.prototype.onPan=function(){var t=this;if(s(t.newPoints[0],t.realPoints[0])<(n.fancybox.isMobile?10:5))return void(t.startPoints=t.newPoints);t.canTap=!1,t.contentLastPos=t.limitMovement(),t.requestId&&i(t.requestId),t.requestId=o(function(){n.fancybox.setTranslate(t.$content,t.contentLastPos)})},d.prototype.limitMovement=function(){var t,e,n,o,i,a,s=this,r=s.canvasWidth,c=s.canvasHeight,l=s.distanceX,d=s.distanceY,u=s.contentStartPos,f=u.left,p=u.top,h=u.width,g=u.height;return i=h>r?f+l:f,a=p+d,t=Math.max(0,.5*r-.5*h),e=Math.max(0,.5*c-.5*g),n=Math.min(r-h,.5*r-.5*h),o=Math.min(c-g,.5*c-.5*g),l>0&&i>t&&(i=t-1+Math.pow(-t+f+l,.8)||0),l<0&&i<n&&(i=n+1-Math.pow(n-f-l,.8)||0),d>0&&a>e&&(a=e-1+Math.pow(-e+p+d,.8)||0),d<0&&a<o&&(a=o+1-Math.pow(o-p-d,.8)||0),{top:a,left:i}},d.prototype.limitPosition=function(t,e,n,o){var i=this,a=i.canvasWidth,s=i.canvasHeight;return n>a?(t=t>0?0:t,t=t<a-n?a-n:t):t=Math.max(0,a/2-n/2),o>s?(e=e>0?0:e,e=e<s-o?s-o:e):e=Math.max(0,s/2-o/2),{top:e,left:t}},d.prototype.onZoom=function(){var e=this,a=e.contentStartPos,r=a.width,c=a.height,l=a.left,d=a.top,u=s(e.newPoints[0],e.newPoints[1]),f=u/e.startDistanceBetweenFingers,p=Math.floor(r*f),h=Math.floor(c*f),g=(r-p)*e.percentageOfImageAtPinchPointX,b=(c-h)*e.percentageOfImageAtPinchPointY,m=(e.newPoints[0].x+e.newPoints[1].x)/2-n(t).scrollLeft(),v=(e.newPoints[0].y+e.newPoints[1].y)/2-n(t).scrollTop(),y=m-e.centerPointStartX,x=v-e.centerPointStartY,w=l+(g+y),$=d+(b+x),S={top:$,left:w,scaleX:f,scaleY:f};e.canTap=!1,e.newWidth=p,e.newHeight=h,e.contentLastPos=S,e.requestId&&i(e.requestId),e.requestId=o(function(){n.fancybox.setTranslate(e.$content,e.contentLastPos)})},d.prototype.ontouchend=function(t){var o=this,s=o.isSwiping,r=o.isPanning,c=o.isZooming,l=o.isScrolling;if(o.endPoints=a(t),o.dMs=Math.max((new Date).getTime()-o.startTime,1),o.$container.removeClass("fancybox-is-grabbing"),n(e).off(".fb.touch"),e.removeEventListener("scroll",o.onscroll,!0),o.requestId&&(i(o.requestId),o.requestId=null),o.isSwiping=!1,o.isPanning=!1,o.isZooming=!1,o.isScrolling=!1,o.instance.isDragging=!1,o.canTap)return o.onTap(t);o.speed=100,o.velocityX=o.distanceX/o.dMs*.5,o.velocityY=o.distanceY/o.dMs*.5,r?o.endPanning():c?o.endZooming():o.endSwiping(s,l)},d.prototype.endSwiping=function(t,e){var o=this,i=!1,a=o.instance.group.length,s=Math.abs(o.distanceX),r="x"==t&&a>1&&(o.dMs>130&&s>10||s>50);o.sliderLastPos=null,"y"==t&&!e&&Math.abs(o.distanceY)>50?(n.fancybox.animate(o.instance.current.$slide,{top:o.sliderStartPos.top+o.distanceY+150*o.velocityY,opacity:0},200),i=o.instance.close(!0,250)):r&&o.distanceX>0?i=o.instance.previous(300):r&&o.distanceX<0&&(i=o.instance.next(300)),!1!==i||"x"!=t&&"y"!=t||o.instance.centerSlide(200),o.$container.removeClass("fancybox-is-sliding")},d.prototype.endPanning=function(){var t,e,o,i=this;i.contentLastPos&&(!1===i.opts.momentum||i.dMs>350?(t=i.contentLastPos.left,e=i.contentLastPos.top):(t=i.contentLastPos.left+500*i.velocityX,e=i.contentLastPos.top+500*i.velocityY),o=i.limitPosition(t,e,i.contentStartPos.width,i.contentStartPos.height),o.width=i.contentStartPos.width,o.height=i.contentStartPos.height,n.fancybox.animate(i.$content,o,366))},d.prototype.endZooming=function(){var t,e,o,i,a=this,s=a.instance.current,r=a.newWidth,c=a.newHeight;a.contentLastPos&&(t=a.contentLastPos.left,e=a.contentLastPos.top,i={top:e,left:t,width:r,height:c,scaleX:1,scaleY:1},n.fancybox.setTranslate(a.$content,i),r<a.canvasWidth&&c<a.canvasHeight?a.instance.scaleToFit(150):r>s.width||c>s.height?a.instance.scaleToActual(a.centerPointStartX,a.centerPointStartY,150):(o=a.limitPosition(t,e,r,c),n.fancybox.animate(a.$content,o,150)))},d.prototype.onTap=function(e){var o,i=this,s=n(e.target),r=i.instance,c=r.current,l=e&&a(e)||i.startPoints,d=l[0]?l[0].x-n(t).scrollLeft()-i.stagePos.left:0,u=l[0]?l[0].y-n(t).scrollTop()-i.stagePos.top:0,f=function(t){var o=c.opts[t];if(n.isFunction(o)&&(o=o.apply(r,[c,e])),o)switch(o){case"close":r.close(i.startEvent);break;case"toggleControls":r.toggleControls();break;case"next":r.next();break;case"nextOrClose":r.group.length>1?r.next():r.close(i.startEvent);break;case"zoom":"image"==c.type&&(c.isLoaded||c.$ghost)&&(r.canPan()?r.scaleToFit():r.isScaledDown()?r.scaleToActual(d,u):r.group.length<2&&r.close(i.startEvent))}};if((!e.originalEvent||2!=e.originalEvent.button)&&(s.is("img")||!(d>s[0].clientWidth+s.offset().left))){if(s.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"))o="Outside";else if(s.is(".fancybox-slide"))o="Slide";else{if(!r.current.$content||!r.current.$content.find(s).addBack().filter(s).length)return;o="Content"}if(i.tapped){if(clearTimeout(i.tapped),i.tapped=null,Math.abs(d-i.tapX)>50||Math.abs(u-i.tapY)>50)return this;f("dblclick"+o)}else i.tapX=d,i.tapY=u,c.opts["dblclick"+o]&&c.opts["dblclick"+o]!==c.opts["click"+o]?i.tapped=setTimeout(function(){i.tapped=null,r.isAnimating||f("click"+o)},500):f("click"+o);return this}},n(e).on("onActivate.fb",function(t,e){e&&!e.Guestures&&(e.Guestures=new d(e))}).on("beforeClose.fb",function(t,e){e&&e.Guestures&&e.Guestures.destroy()})}(window,document,jQuery),function(t,e){"use strict";e.extend(!0,e.fancybox.defaults,{btnTpl:{slideShow:'<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>'},slideShow:{autoStart:!1,speed:3e3,progress:!0}});var n=function(t){this.instance=t,this.init()};e.extend(n.prototype,{timer:null,isActive:!1,$button:null,init:function(){var t=this,n=t.instance,o=n.group[n.currIndex].opts.slideShow;t.$button=n.$refs.toolbar.find("[data-fancybox-play]").on("click",function(){t.toggle()}),n.group.length<2||!o?t.$button.hide():o.progress&&(t.$progress=e('<div class="fancybox-progress"></div>').appendTo(n.$refs.inner))},set:function(t){var n=this,o=n.instance,i=o.current;i&&(!0===t||i.opts.loop||o.currIndex<o.group.length-1)?n.isActive&&"video"!==i.contentType&&(n.$progress&&e.fancybox.animate(n.$progress.show(),{scaleX:1},i.opts.slideShow.speed),n.timer=setTimeout(function(){o.current.opts.loop||o.current.index!=o.group.length-1?o.next():o.jumpTo(0)},i.opts.slideShow.speed)):(n.stop(),o.idleSecondsCounter=0,o.showControls())},clear:function(){var t=this;clearTimeout(t.timer),t.timer=null,t.$progress&&t.$progress.removeAttr("style").hide()},start:function(){var t=this,e=t.instance.current;e&&(t.$button.attr("title",(e.opts.i18n[e.opts.lang]||e.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"),t.isActive=!0,e.isComplete&&t.set(!0),t.instance.trigger("onSlideShowChange",!0))},stop:function(){var t=this,e=t.instance.current;t.clear(),t.$button.attr("title",(e.opts.i18n[e.opts.lang]||e.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"),t.isActive=!1,t.instance.trigger("onSlideShowChange",!1),t.$progress&&t.$progress.removeAttr("style").hide()},toggle:function(){var t=this;t.isActive?t.stop():t.start()}}),e(t).on({"onInit.fb":function(t,e){e&&!e.SlideShow&&(e.SlideShow=new n(e))},"beforeShow.fb":function(t,e,n,o){var i=e&&e.SlideShow;o?i&&n.opts.slideShow.autoStart&&i.start():i&&i.isActive&&i.clear()},"afterShow.fb":function(t,e,n){var o=e&&e.SlideShow;o&&o.isActive&&o.set()},"afterKeydown.fb":function(n,o,i,a,s){var r=o&&o.SlideShow;!r||!i.opts.slideShow||80!==s&&32!==s||e(t.activeElement).is("button,a,input")||(a.preventDefault(),r.toggle())},"beforeClose.fb onDeactivate.fb":function(t,e){var n=e&&e.SlideShow;n&&n.stop()}}),e(t).on("visibilitychange",function(){var n=e.fancybox.getInstance(),o=n&&n.SlideShow;o&&o.isActive&&(t.hidden?o.clear():o.set())})}(document,jQuery),function(t,e){"use strict";var n=function(){for(var e=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],n={},o=0;o<e.length;o++){var i=e[o];if(i&&i[1]in t){for(var a=0;a<i.length;a++)n[e[0][a]]=i[a];return n}}return!1}();if(n){var o={request:function(e){e=e||t.documentElement,e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)},exit:function(){t[n.exitFullscreen]()},toggle:function(e){e=e||t.documentElement,this.isFullscreen()?this.exit():this.request(e)},isFullscreen:function(){return Boolean(t[n.fullscreenElement])},enabled:function(){return Boolean(t[n.fullscreenEnabled])}};e.extend(!0,e.fancybox.defaults,{btnTpl:{fullScreen:'<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>'},fullScreen:{autoStart:!1}}),e(t).on(n.fullscreenchange,function(){var t=o.isFullscreen(),n=e.fancybox.getInstance();n&&(n.current&&"image"===n.current.type&&n.isAnimating&&(n.isAnimating=!1,n.update(!0,!0,0),n.isComplete||n.complete()),n.trigger("onFullscreenChange",t),n.$refs.container.toggleClass("fancybox-is-fullscreen",t),n.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter",!t).toggleClass("fancybox-button--fsexit",t))})}e(t).on({"onInit.fb":function(t,e){var i;if(!n)return void e.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();e&&e.group[e.currIndex].opts.fullScreen?(i=e.$refs.container,i.on("click.fb-fullscreen","[data-fancybox-fullscreen]",function(t){t.stopPropagation(),t.preventDefault(),o.toggle()}),e.opts.fullScreen&&!0===e.opts.fullScreen.autoStart&&o.request(),e.FullScreen=o):e&&e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()},"afterKeydown.fb":function(t,e,n,o,i){e&&e.FullScreen&&70===i&&(o.preventDefault(),e.FullScreen.toggle())},"beforeClose.fb":function(t,e){e&&e.FullScreen&&e.$refs.container.hasClass("fancybox-is-fullscreen")&&o.exit()}})}(document,jQuery),function(t,e){"use strict";var n="fancybox-thumbs";e.fancybox.defaults=e.extend(!0,{btnTpl:{thumbs:'<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>'},thumbs:{autoStart:!1,hideOnClose:!0,parentEl:".fancybox-container",axis:"y"}},e.fancybox.defaults);var o=function(t){this.init(t)};e.extend(o.prototype,{$button:null,$grid:null,$list:null,isVisible:!1,isActive:!1,init:function(t){var e=this,n=t.group,o=0;e.instance=t,e.opts=n[t.currIndex].opts.thumbs,t.Thumbs=e,e.$button=t.$refs.toolbar.find("[data-fancybox-thumbs]");for(var i=0,a=n.length;i<a&&(n[i].thumb&&o++,!(o>1));i++);o>1&&e.opts?(e.$button.removeAttr("style").on("click",function(){e.toggle()}),e.isActive=!0):e.$button.hide()},create:function(){var t,o=this,i=o.instance,a=o.opts.parentEl,s=[];o.$grid||(o.$grid=e('<div class="'+n+" "+n+"-"+o.opts.axis+'"></div>').appendTo(i.$refs.container.find(a).addBack().filter(a)),o.$grid.on("click","a",function(){i.jumpTo(e(this).attr("data-index"))})),o.$list||(o.$list=e('<div class="'+n+'__list">').appendTo(o.$grid)),e.each(i.group,function(e,n){t=n.thumb,t||"image"!==n.type||(t=n.src),s.push('<a href="javascript:;" tabindex="0" data-index="'+e+'"'+(t&&t.length?' style="background-image:url('+t+')"':'class="fancybox-thumbs-missing"')+"></a>")}),o.$list[0].innerHTML=s.join(""),"x"===o.opts.axis&&o.$list.width(parseInt(o.$grid.css("padding-right"),10)+i.group.length*o.$list.children().eq(0).outerWidth(!0))},focus:function(t){var e,n,o=this,i=o.$list,a=o.$grid;o.instance.current&&(e=i.children().removeClass("fancybox-thumbs-active").filter('[data-index="'+o.instance.current.index+'"]').addClass("fancybox-thumbs-active"),n=e.position(),"y"===o.opts.axis&&(n.top<0||n.top>i.height()-e.outerHeight())?i.stop().animate({scrollTop:i.scrollTop()+n.top},t):"x"===o.opts.axis&&(n.left<a.scrollLeft()||n.left>a.scrollLeft()+(a.width()-e.outerWidth()))&&i.parent().stop().animate({scrollLeft:n.left},t))},update:function(){var t=this;t.instance.$refs.container.toggleClass("fancybox-show-thumbs",this.isVisible),t.isVisible?(t.$grid||t.create(),t.instance.trigger("onThumbsShow"),t.focus(0)):t.$grid&&t.instance.trigger("onThumbsHide"),t.instance.update()},hide:function(){this.isVisible=!1,this.update()},show:function(){this.isVisible=!0,this.update()},toggle:function(){this.isVisible=!this.isVisible,this.update()}}),e(t).on({"onInit.fb":function(t,e){var n;e&&!e.Thumbs&&(n=new o(e),n.isActive&&!0===n.opts.autoStart&&n.show())},"beforeShow.fb":function(t,e,n,o){var i=e&&e.Thumbs;i&&i.isVisible&&i.focus(o?0:250)},"afterKeydown.fb":function(t,e,n,o,i){var a=e&&e.Thumbs;a&&a.isActive&&71===i&&(o.preventDefault(),a.toggle())},"beforeClose.fb":function(t,e){var n=e&&e.Thumbs;n&&n.isVisible&&!1!==n.opts.hideOnClose&&n.$grid.hide()}})}(document,jQuery),function(t,e){"use strict";function n(t){var e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};return String(t).replace(/[&<>"'`=\/]/g,function(t){return e[t]})}e.extend(!0,e.fancybox.defaults,{btnTpl:{share:'<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>'},share:{url:function(t,e){return!t.currentHash&&"inline"!==e.type&&"html"!==e.type&&(e.origSrc||e.src)||window.location},
tpl:'<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>'}}),e(t).on("click","[data-fancybox-share]",function(){var t,o,i=e.fancybox.getInstance(),a=i.current||null;a&&("function"===e.type(a.opts.share.url)&&(t=a.opts.share.url.apply(a,[i,a])),o=a.opts.share.tpl.replace(/\{\{media\}\}/g,"image"===a.type?encodeURIComponent(a.src):"").replace(/\{\{url\}\}/g,encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g,n(t)).replace(/\{\{descr\}\}/g,i.$caption?encodeURIComponent(i.$caption.text()):""),e.fancybox.open({src:i.translate(i,o),type:"html",opts:{touch:!1,animationEffect:!1,afterLoad:function(t,e){i.$refs.container.one("beforeClose.fb",function(){t.close(null,0)}),e.$content.find(".fancybox-share__button").click(function(){return window.open(this.href,"Share","width=550, height=450"),!1})},mobile:{autoFocus:!1}}}))})}(document,jQuery),function(t,e,n){"use strict";function o(){var e=t.location.hash.substr(1),n=e.split("-"),o=n.length>1&&/^\+?\d+$/.test(n[n.length-1])?parseInt(n.pop(-1),10)||1:1,i=n.join("-");return{hash:e,index:o<1?1:o,gallery:i}}function i(t){""!==t.gallery&&n("[data-fancybox='"+n.escapeSelector(t.gallery)+"']").eq(t.index-1).focus().trigger("click.fb-start")}function a(t){var e,n;return!!t&&(e=t.current?t.current.opts:t.opts,""!==(n=e.hash||(e.$orig?e.$orig.data("fancybox")||e.$orig.data("fancybox-trigger"):""))&&n)}n.escapeSelector||(n.escapeSelector=function(t){return(t+"").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,function(t,e){return e?"\0"===t?"�":t.slice(0,-1)+"\\"+t.charCodeAt(t.length-1).toString(16)+" ":"\\"+t})}),n(function(){!1!==n.fancybox.defaults.hash&&(n(e).on({"onInit.fb":function(t,e){var n,i;!1!==e.group[e.currIndex].opts.hash&&(n=o(),(i=a(e))&&n.gallery&&i==n.gallery&&(e.currIndex=n.index-1))},"beforeShow.fb":function(n,o,i,s){var r;i&&!1!==i.opts.hash&&(r=a(o))&&(o.currentHash=r+(o.group.length>1?"-"+(i.index+1):""),t.location.hash!=="#"+o.currentHash&&(s&&!o.origHash&&(o.origHash=t.location.hash),o.hashTimer&&clearTimeout(o.hashTimer),o.hashTimer=setTimeout(function(){"replaceState"in t.history?(t.history[s?"pushState":"replaceState"]({},e.title,t.location.pathname+t.location.search+"#"+o.currentHash),s&&(o.hasCreatedHistory=!0)):t.location.hash=o.currentHash,o.hashTimer=null},300)))},"beforeClose.fb":function(n,o,i){i&&!1!==i.opts.hash&&(clearTimeout(o.hashTimer),o.currentHash&&o.hasCreatedHistory?t.history.back():o.currentHash&&("replaceState"in t.history?t.history.replaceState({},e.title,t.location.pathname+t.location.search+(o.origHash||"")):t.location.hash=o.origHash),o.currentHash=null)}}),n(t).on("hashchange.fb",function(){var t=o(),e=null;n.each(n(".fancybox-container").get().reverse(),function(t,o){var i=n(o).data("FancyBox");if(i&&i.currentHash)return e=i,!1}),e?e.currentHash===t.gallery+"-"+t.index||1===t.index&&e.currentHash==t.gallery||(e.currentHash=null,e.close()):""!==t.gallery&&i(t)}),setTimeout(function(){n.fancybox.getInstance()||i(o())},50))})}(window,document,jQuery),function(t,e){"use strict";var n=(new Date).getTime();e(t).on({"onInit.fb":function(t,e,o){e.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll",function(t){var o=e.current,i=(new Date).getTime();e.group.length<2||!1===o.opts.wheel||"auto"===o.opts.wheel&&"image"!==o.type||(t.preventDefault(),t.stopPropagation(),o.$slide.hasClass("fancybox-animated")||(t=t.originalEvent||t,i-n<250||(n=i,e[(-t.deltaY||-t.deltaX||t.wheelDelta||-t.detail)<0?"next":"previous"]())))})}})}(document,jQuery);
(function($) {
    "use strict"
    $(function() {

        $('.counter button').on('click', function() {
            var thisInput = $(this).siblings('input')
            var thisValue = thisInput.val()

            if($(this).hasClass('is--plus') && thisValue < 9999) thisValue++;
            else if($(this).hasClass('is--minus') && thisValue > 1) thisValue--;

            if(thisValue < 1 || thisValue > 9999) thisValue = 0

            thisInput.val(thisValue)
        })

    })
})(jQuery);
(function($) {
    "use strict"
    $(function() {


        var phoneInputs = document.getElementsByClassName('in-phone');

        if(phoneInputs.length) {
            for(var i = 0; i < phoneInputs.length; i++) {
                new IMask(
                    phoneInputs[i], {
                    mask: '+{7}(900)000-00-00'
                });
            }
        }


        $('#overlay').on('click', function() {
            closeOverlay()
        })

        function setPaddings() {

            var classes = {
                paddingLeft: '.is--c-pl',
                paddingRight: '.is--c-pr',
                height100Per: '.is--h100'
            }

            var padding = document.getElementsByClassName('container')[0].getBoundingClientRect()
            var height = $('.navbar').innerHeight() + $('.footer').innerHeight()

            $(classes.paddingLeft).css({
                paddingLeft: padding.left + 30
            })
            $(classes.paddingRight).css({
                paddingRight: padding.left + 30
            })
            $(classes.height100Per).css({
                minHeight: 'calc(100vh - ' + height + 'px)'
            })
            $('.is--c-pt').css({
                paddingTop: $('.navbar').innerHeight()
            })
            $('main').css({
                minHeight: 'calc(100vh - ' + height + 'px)'
            })

            $('body').css({
                paddingTop: $('.navbar').innerHeight()
            })

        }

        setPaddings()

        $(window).resize(function() {
            setPaddings()
        })

        $('.anchor').on('click', function(e) {
            e.preventDefault();
            var _this = $(this)
            var aid = _this.attr("href");
            if(!aid) {
                aid = _this.data('target')
            }
            $('html,body').animate({scrollTop: $(aid).offset().top - $('.navbar').innerHeight()},'slow');
        })

        $('form').parsley()
        
    })
})(jQuery);
function openModal(modalID) {
    $(modalID).modal({
        fadeDuration: 100,
        showClose: false,
    })
}

(function($) {
    "use strict"
    $(function() {

        $.modal.fadeDuration = 100
        $.modal.showClose = false

        $('a.modal-open').on('click', function(e) {
            e.preventDefault()
            var thisModalId = $(this).attr('href')
            openModal(thisModalId)
            return false;
        })

        // openModal('#modal_form')
        // openModal('#modal_success')

    })
})(jQuery);
(function($) {
    "use strict"
    $(function() {

        function openAside() {
            $('body').addClass('is--aside')
            openOverlay()
            $('.navbar__main__mobile button').addClass('is-active')
        }

        function closeAside() {
            $('body').removeClass('is--aside')
            closeOverlay()
            $('.navbar__main__mobile button').removeClass('is-active')
        }

        function toggleAside() {
            if($('body').hasClass('is--aside')) {
                closeAside()
            }else {
                openAside()
            }
        }

        function showNavbar() {
            $('.navbar').removeClass('is--hidden')
        }

        function hideNavbar() {
            $('.navbar').addClass('is--hidden')
        }

        $('.overlay').on('click', function() {
            closeAside()
        })

        $('.navbar__main__mobile button').on('click', function() {
            toggleAside()
        })

        var lastScrollTop = 0

        $(document).scroll(function(e) {
            var st = $(this).scrollTop()
            if (st > lastScrollTop && st > $('.navbar').innerHeight()){
                hideNavbar()
            } else {
                showNavbar()
            }
            lastScrollTop = st
        })
        
    })
})(jQuery);
function openOverlay() {
    $('body').addClass('is--overlay')
}

function closeOverlay() {
    $('body').removeClass('is--overlay')
}

$('.overlay').on('click', function() {
    closeOverlay()
});
(function($) {
    "use strict"
    $(function() {

        if($(window).innerWidth() > 1200) {
            $(".c-scroll").customScrollbar({
                updateOnWindowResize: true
            });
        }
        
    })
})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdW50ZXIuanMiLCJtYWluLmpzIiwibW9kYWxzLmpzIiwibmF2YmFyLmpzIiwib3ZlcmxheS5qcyIsInNjcm9sbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkKCcuY291bnRlciBidXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHRoaXNJbnB1dCA9ICQodGhpcykuc2libGluZ3MoJ2lucHV0JylcclxuICAgICAgICAgICAgdmFyIHRoaXNWYWx1ZSA9IHRoaXNJbnB1dC52YWwoKVxyXG5cclxuICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnaXMtLXBsdXMnKSAmJiB0aGlzVmFsdWUgPCA5OTk5KSB0aGlzVmFsdWUrKztcclxuICAgICAgICAgICAgZWxzZSBpZigkKHRoaXMpLmhhc0NsYXNzKCdpcy0tbWludXMnKSAmJiB0aGlzVmFsdWUgPiAxKSB0aGlzVmFsdWUtLTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXNWYWx1ZSA8IDEgfHwgdGhpc1ZhbHVlID4gOTk5OSkgdGhpc1ZhbHVlID0gMFxyXG5cclxuICAgICAgICAgICAgdGhpc0lucHV0LnZhbCh0aGlzVmFsdWUpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbigkKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIlxyXG4gICAgJChmdW5jdGlvbigpIHtcclxuXHJcblxyXG4gICAgICAgIHZhciBwaG9uZUlucHV0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2luLXBob25lJyk7XHJcblxyXG4gICAgICAgIGlmKHBob25lSW5wdXRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgcGhvbmVJbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG5ldyBJTWFzayhcclxuICAgICAgICAgICAgICAgICAgICBwaG9uZUlucHV0c1tpXSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6ICcrezd9KDkwMCkwMDAtMDAtMDAnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICQoJyNvdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNsb3NlT3ZlcmxheSgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0UGFkZGluZ3MoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2xhc3NlcyA9IHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnLmlzLS1jLXBsJyxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodDogJy5pcy0tYy1wcicsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQxMDBQZXI6ICcuaXMtLWgxMDAnXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBwYWRkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY29udGFpbmVyJylbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcclxuICAgICAgICAgICAgdmFyIGhlaWdodCA9ICQoJy5uYXZiYXInKS5pbm5lckhlaWdodCgpICsgJCgnLmZvb3RlcicpLmlubmVySGVpZ2h0KClcclxuXHJcbiAgICAgICAgICAgICQoY2xhc3Nlcy5wYWRkaW5nTGVmdCkuY3NzKHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBwYWRkaW5nLmxlZnQgKyAzMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAkKGNsYXNzZXMucGFkZGluZ1JpZ2h0KS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiBwYWRkaW5nLmxlZnQgKyAzMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAkKGNsYXNzZXMuaGVpZ2h0MTAwUGVyKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0OiAnY2FsYygxMDB2aCAtICcgKyBoZWlnaHQgKyAncHgpJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAkKCcuaXMtLWMtcHQnKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgcGFkZGluZ1RvcDogJCgnLm5hdmJhcicpLmlubmVySGVpZ2h0KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJCgnbWFpbicpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6ICdjYWxjKDEwMHZoIC0gJyArIGhlaWdodCArICdweCknXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAkKCdib2R5JykuY3NzKHtcclxuICAgICAgICAgICAgICAgIHBhZGRpbmdUb3A6ICQoJy5uYXZiYXInKS5pbm5lckhlaWdodCgpXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0UGFkZGluZ3MoKVxyXG5cclxuICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZXRQYWRkaW5ncygpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJCgnLmFuY2hvcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSAkKHRoaXMpXHJcbiAgICAgICAgICAgIHZhciBhaWQgPSBfdGhpcy5hdHRyKFwiaHJlZlwiKTtcclxuICAgICAgICAgICAgaWYoIWFpZCkge1xyXG4gICAgICAgICAgICAgICAgYWlkID0gX3RoaXMuZGF0YSgndGFyZ2V0JylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCdodG1sLGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6ICQoYWlkKS5vZmZzZXQoKS50b3AgLSAkKCcubmF2YmFyJykuaW5uZXJIZWlnaHQoKX0sJ3Nsb3cnKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKCdmb3JtJykucGFyc2xleSgpXHJcbiAgICAgICAgXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsImZ1bmN0aW9uIG9wZW5Nb2RhbChtb2RhbElEKSB7XHJcbiAgICAkKG1vZGFsSUQpLm1vZGFsKHtcclxuICAgICAgICBmYWRlRHVyYXRpb246IDEwMCxcclxuICAgICAgICBzaG93Q2xvc2U6IGZhbHNlLFxyXG4gICAgfSlcclxufVxyXG5cclxuKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkLm1vZGFsLmZhZGVEdXJhdGlvbiA9IDEwMFxyXG4gICAgICAgICQubW9kYWwuc2hvd0Nsb3NlID0gZmFsc2VcclxuXHJcbiAgICAgICAgJCgnYS5tb2RhbC1vcGVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgdmFyIHRoaXNNb2RhbElkID0gJCh0aGlzKS5hdHRyKCdocmVmJylcclxuICAgICAgICAgICAgb3Blbk1vZGFsKHRoaXNNb2RhbElkKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gb3Blbk1vZGFsKCcjbW9kYWxfZm9ybScpXHJcbiAgICAgICAgLy8gb3Blbk1vZGFsKCcjbW9kYWxfc3VjY2VzcycpXHJcblxyXG4gICAgfSlcclxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oJCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCJcclxuICAgICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9wZW5Bc2lkZSgpIHtcclxuICAgICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdpcy0tYXNpZGUnKVxyXG4gICAgICAgICAgICBvcGVuT3ZlcmxheSgpXHJcbiAgICAgICAgICAgICQoJy5uYXZiYXJfX21haW5fX21vYmlsZSBidXR0b24nKS5hZGRDbGFzcygnaXMtYWN0aXZlJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlQXNpZGUoKSB7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaXMtLWFzaWRlJylcclxuICAgICAgICAgICAgY2xvc2VPdmVybGF5KClcclxuICAgICAgICAgICAgJCgnLm5hdmJhcl9fbWFpbl9fbW9iaWxlIGJ1dHRvbicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlQXNpZGUoKSB7XHJcbiAgICAgICAgICAgIGlmKCQoJ2JvZHknKS5oYXNDbGFzcygnaXMtLWFzaWRlJykpIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlQXNpZGUoKVxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvcGVuQXNpZGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzaG93TmF2YmFyKCkge1xyXG4gICAgICAgICAgICAkKCcubmF2YmFyJykucmVtb3ZlQ2xhc3MoJ2lzLS1oaWRkZW4nKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGlkZU5hdmJhcigpIHtcclxuICAgICAgICAgICAgJCgnLm5hdmJhcicpLmFkZENsYXNzKCdpcy0taGlkZGVuJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy5vdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNsb3NlQXNpZGUoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJy5uYXZiYXJfX21haW5fX21vYmlsZSBidXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdG9nZ2xlQXNpZGUoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHZhciBsYXN0U2Nyb2xsVG9wID0gMFxyXG5cclxuICAgICAgICAkKGRvY3VtZW50KS5zY3JvbGwoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICB2YXIgc3QgPSAkKHRoaXMpLnNjcm9sbFRvcCgpXHJcbiAgICAgICAgICAgIGlmIChzdCA+IGxhc3RTY3JvbGxUb3AgJiYgc3QgPiAkKCcubmF2YmFyJykuaW5uZXJIZWlnaHQoKSl7XHJcbiAgICAgICAgICAgICAgICBoaWRlTmF2YmFyKClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNob3dOYXZiYXIoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxhc3RTY3JvbGxUb3AgPSBzdFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyIsImZ1bmN0aW9uIG9wZW5PdmVybGF5KCkge1xyXG4gICAgJCgnYm9keScpLmFkZENsYXNzKCdpcy0tb3ZlcmxheScpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNsb3NlT3ZlcmxheSgpIHtcclxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnaXMtLW92ZXJsYXknKVxyXG59XHJcblxyXG4kKCcub3ZlcmxheScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgY2xvc2VPdmVybGF5KClcclxufSk7IiwiKGZ1bmN0aW9uKCQpIHtcclxuICAgIFwidXNlIHN0cmljdFwiXHJcbiAgICAkKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBpZigkKHdpbmRvdykuaW5uZXJXaWR0aCgpID4gMTIwMCkge1xyXG4gICAgICAgICAgICAkKFwiLmMtc2Nyb2xsXCIpLmN1c3RvbVNjcm9sbGJhcih7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVPbldpbmRvd1Jlc2l6ZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9KVxyXG59KShqUXVlcnkpOyJdfQ==
