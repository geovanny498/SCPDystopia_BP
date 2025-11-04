var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/common.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.RANDOM = exports.EPSILON = exports.ARRAY_TYPE = exports.ANGLE_ORDER = void 0;
    exports.equals = equals;
    exports.round = round;
    exports.setMatrixArrayType = setMatrixArrayType;
    exports.toDegree = toDegree;
    exports.toRadian = toRadian;
    var EPSILON = exports.EPSILON = 1e-6;
    var ARRAY_TYPE = exports.ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
    var RANDOM = exports.RANDOM = Math.random;
    var ANGLE_ORDER = exports.ANGLE_ORDER = "zyx";
    function round(a) {
      if (a >= 0) return Math.round(a);
      return a % 0.5 === 0 ? Math.floor(a) : Math.round(a);
    }
    function setMatrixArrayType(type) {
      exports.ARRAY_TYPE = ARRAY_TYPE = type;
    }
    var degree = Math.PI / 180;
    var radian = 180 / Math.PI;
    function toRadian(a) {
      return a * degree;
    }
    function toDegree(a) {
      return a * radian;
    }
    function equals(a, b) {
      var tolerance = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : EPSILON;
      return Math.abs(a - b) <= tolerance * Math.max(1, Math.abs(a), Math.abs(b));
    }
  }
});

// node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/mat2.js
var require_mat2 = __commonJS({
  "node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/mat2.js"(exports) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.LDU = LDU;
    exports.add = add;
    exports.adjoint = adjoint;
    exports.clone = clone;
    exports.copy = copy;
    exports.create = create;
    exports.determinant = determinant;
    exports.equals = equals;
    exports.exactEquals = exactEquals;
    exports.frob = frob;
    exports.fromRotation = fromRotation;
    exports.fromScaling = fromScaling;
    exports.fromValues = fromValues;
    exports.identity = identity;
    exports.invert = invert;
    exports.mul = void 0;
    exports.multiply = multiply;
    exports.multiplyScalar = multiplyScalar;
    exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
    exports.rotate = rotate;
    exports.scale = scale;
    exports.set = set;
    exports.str = str;
    exports.sub = void 0;
    exports.subtract = subtract;
    exports.transpose = transpose;
    var glMatrix = _interopRequireWildcard(require_common());
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, "default": e2 };
        if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (var _t in e2) "default" !== _t && {}.hasOwnProperty.call(e2, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e2[_t]);
        return f;
      })(e, t);
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(4);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
      }
      out[0] = 1;
      out[3] = 1;
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(4);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      return out;
    }
    function identity(out) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    }
    function fromValues(m00, m01, m10, m11) {
      var out = new glMatrix.ARRAY_TYPE(4);
      out[0] = m00;
      out[1] = m01;
      out[2] = m10;
      out[3] = m11;
      return out;
    }
    function set(out, m00, m01, m10, m11) {
      out[0] = m00;
      out[1] = m01;
      out[2] = m10;
      out[3] = m11;
      return out;
    }
    function transpose(out, a) {
      if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
      } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
      }
      return out;
    }
    function invert(out, a) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var det = a0 * a3 - a2 * a1;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out[0] = a3 * det;
      out[1] = -a1 * det;
      out[2] = -a2 * det;
      out[3] = a0 * det;
      return out;
    }
    function adjoint(out, a) {
      var a0 = a[0];
      out[0] = a[3];
      out[1] = -a[1];
      out[2] = -a[2];
      out[3] = a0;
      return out;
    }
    function determinant(a) {
      return a[0] * a[3] - a[2] * a[1];
    }
    function multiply(out, a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      out[0] = a0 * b0 + a2 * b1;
      out[1] = a1 * b0 + a3 * b1;
      out[2] = a0 * b2 + a2 * b3;
      out[3] = a1 * b2 + a3 * b3;
      return out;
    }
    function rotate(out, a, rad) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = a0 * c + a2 * s;
      out[1] = a1 * c + a3 * s;
      out[2] = a0 * -s + a2 * c;
      out[3] = a1 * -s + a3 * c;
      return out;
    }
    function scale(out, a, v) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var v0 = v[0], v1 = v[1];
      out[0] = a0 * v0;
      out[1] = a1 * v0;
      out[2] = a2 * v1;
      out[3] = a3 * v1;
      return out;
    }
    function fromRotation(out, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = c;
      out[1] = s;
      out[2] = -s;
      out[3] = c;
      return out;
    }
    function fromScaling(out, v) {
      out[0] = v[0];
      out[1] = 0;
      out[2] = 0;
      out[3] = v[1];
      return out;
    }
    function str(a) {
      return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
    }
    function frob(a) {
      return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3]);
    }
    function LDU(L, D, U, a) {
      L[2] = a[2] / a[0];
      U[0] = a[0];
      U[1] = a[1];
      U[3] = a[3] - L[2] * U[1];
      return [L, D, U];
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      return out;
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
    }
    function multiplyScalar(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      return out;
    }
    function multiplyScalarAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      out[3] = a[3] + b[3] * scale2;
      return out;
    }
    var mul = exports.mul = multiply;
    var sub = exports.sub = subtract;
  }
});

// node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/mat2d.js
var require_mat2d = __commonJS({
  "node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/mat2d.js"(exports) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.add = add;
    exports.clone = clone;
    exports.copy = copy;
    exports.create = create;
    exports.determinant = determinant;
    exports.equals = equals;
    exports.exactEquals = exactEquals;
    exports.frob = frob;
    exports.fromRotation = fromRotation;
    exports.fromScaling = fromScaling;
    exports.fromTranslation = fromTranslation;
    exports.fromValues = fromValues;
    exports.identity = identity;
    exports.invert = invert;
    exports.mul = void 0;
    exports.multiply = multiply;
    exports.multiplyScalar = multiplyScalar;
    exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
    exports.rotate = rotate;
    exports.scale = scale;
    exports.set = set;
    exports.str = str;
    exports.sub = void 0;
    exports.subtract = subtract;
    exports.translate = translate;
    var glMatrix = _interopRequireWildcard(require_common());
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, "default": e2 };
        if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (var _t in e2) "default" !== _t && {}.hasOwnProperty.call(e2, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e2[_t]);
        return f;
      })(e, t);
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(6);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
        out[4] = 0;
        out[5] = 0;
      }
      out[0] = 1;
      out[3] = 1;
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(6);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      return out;
    }
    function identity(out) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      out[4] = 0;
      out[5] = 0;
      return out;
    }
    function fromValues(a, b, c, d, tx, ty) {
      var out = new glMatrix.ARRAY_TYPE(6);
      out[0] = a;
      out[1] = b;
      out[2] = c;
      out[3] = d;
      out[4] = tx;
      out[5] = ty;
      return out;
    }
    function set(out, a, b, c, d, tx, ty) {
      out[0] = a;
      out[1] = b;
      out[2] = c;
      out[3] = d;
      out[4] = tx;
      out[5] = ty;
      return out;
    }
    function invert(out, a) {
      var aa = a[0], ab = a[1], ac = a[2], ad = a[3];
      var atx = a[4], aty = a[5];
      var det = aa * ad - ab * ac;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out[0] = ad * det;
      out[1] = -ab * det;
      out[2] = -ac * det;
      out[3] = aa * det;
      out[4] = (ac * aty - ad * atx) * det;
      out[5] = (ab * atx - aa * aty) * det;
      return out;
    }
    function determinant(a) {
      return a[0] * a[3] - a[1] * a[2];
    }
    function multiply(out, a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
      out[0] = a0 * b0 + a2 * b1;
      out[1] = a1 * b0 + a3 * b1;
      out[2] = a0 * b2 + a2 * b3;
      out[3] = a1 * b2 + a3 * b3;
      out[4] = a0 * b4 + a2 * b5 + a4;
      out[5] = a1 * b4 + a3 * b5 + a5;
      return out;
    }
    function rotate(out, a, rad) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = a0 * c + a2 * s;
      out[1] = a1 * c + a3 * s;
      out[2] = a0 * -s + a2 * c;
      out[3] = a1 * -s + a3 * c;
      out[4] = a4;
      out[5] = a5;
      return out;
    }
    function scale(out, a, v) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
      var v0 = v[0], v1 = v[1];
      out[0] = a0 * v0;
      out[1] = a1 * v0;
      out[2] = a2 * v1;
      out[3] = a3 * v1;
      out[4] = a4;
      out[5] = a5;
      return out;
    }
    function translate(out, a, v) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
      var v0 = v[0], v1 = v[1];
      out[0] = a0;
      out[1] = a1;
      out[2] = a2;
      out[3] = a3;
      out[4] = a0 * v0 + a2 * v1 + a4;
      out[5] = a1 * v0 + a3 * v1 + a5;
      return out;
    }
    function fromRotation(out, rad) {
      var s = Math.sin(rad), c = Math.cos(rad);
      out[0] = c;
      out[1] = s;
      out[2] = -s;
      out[3] = c;
      out[4] = 0;
      out[5] = 0;
      return out;
    }
    function fromScaling(out, v) {
      out[0] = v[0];
      out[1] = 0;
      out[2] = 0;
      out[3] = v[1];
      out[4] = 0;
      out[5] = 0;
      return out;
    }
    function fromTranslation(out, v) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      out[4] = v[0];
      out[5] = v[1];
      return out;
    }
    function str(a) {
      return "mat2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ")";
    }
    function frob(a) {
      return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3] + a[4] * a[4] + a[5] * a[5] + 1);
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      out[4] = a[4] + b[4];
      out[5] = a[5] + b[5];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      out[4] = a[4] - b[4];
      out[5] = a[5] - b[5];
      return out;
    }
    function multiplyScalar(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      out[4] = a[4] * b;
      out[5] = a[5] * b;
      return out;
    }
    function multiplyScalarAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      out[3] = a[3] + b[3] * scale2;
      out[4] = a[4] + b[4] * scale2;
      out[5] = a[5] + b[5] * scale2;
      return out;
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5));
    }
    var mul = exports.mul = multiply;
    var sub = exports.sub = subtract;
  }
});

// node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/mat3.js
var require_mat3 = __commonJS({
  "node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/mat3.js"(exports) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.add = add;
    exports.adjoint = adjoint;
    exports.clone = clone;
    exports.copy = copy;
    exports.create = create;
    exports.determinant = determinant;
    exports.equals = equals;
    exports.exactEquals = exactEquals;
    exports.frob = frob;
    exports.fromMat2d = fromMat2d;
    exports.fromMat4 = fromMat4;
    exports.fromQuat = fromQuat;
    exports.fromRotation = fromRotation;
    exports.fromScaling = fromScaling;
    exports.fromTranslation = fromTranslation;
    exports.fromValues = fromValues;
    exports.identity = identity;
    exports.invert = invert;
    exports.mul = void 0;
    exports.multiply = multiply;
    exports.multiplyScalar = multiplyScalar;
    exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
    exports.normalFromMat4 = normalFromMat4;
    exports.projection = projection;
    exports.rotate = rotate;
    exports.scale = scale;
    exports.set = set;
    exports.str = str;
    exports.sub = void 0;
    exports.subtract = subtract;
    exports.translate = translate;
    exports.transpose = transpose;
    var glMatrix = _interopRequireWildcard(require_common());
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, "default": e2 };
        if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (var _t in e2) "default" !== _t && {}.hasOwnProperty.call(e2, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e2[_t]);
        return f;
      })(e, t);
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(9);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
      }
      out[0] = 1;
      out[4] = 1;
      out[8] = 1;
      return out;
    }
    function fromMat4(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[4];
      out[4] = a[5];
      out[5] = a[6];
      out[6] = a[8];
      out[7] = a[9];
      out[8] = a[10];
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(9);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      return out;
    }
    function fromValues(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
      var out = new glMatrix.ARRAY_TYPE(9);
      out[0] = m00;
      out[1] = m01;
      out[2] = m02;
      out[3] = m10;
      out[4] = m11;
      out[5] = m12;
      out[6] = m20;
      out[7] = m21;
      out[8] = m22;
      return out;
    }
    function set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
      out[0] = m00;
      out[1] = m01;
      out[2] = m02;
      out[3] = m10;
      out[4] = m11;
      out[5] = m12;
      out[6] = m20;
      out[7] = m21;
      out[8] = m22;
      return out;
    }
    function identity(out) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 1;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 1;
      return out;
    }
    function transpose(out, a) {
      if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
      } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
      }
      return out;
    }
    function invert(out, a) {
      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];
      var b01 = a22 * a11 - a12 * a21;
      var b11 = -a22 * a10 + a12 * a20;
      var b21 = a21 * a10 - a11 * a20;
      var det = a00 * b01 + a01 * b11 + a02 * b21;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out[0] = b01 * det;
      out[1] = (-a22 * a01 + a02 * a21) * det;
      out[2] = (a12 * a01 - a02 * a11) * det;
      out[3] = b11 * det;
      out[4] = (a22 * a00 - a02 * a20) * det;
      out[5] = (-a12 * a00 + a02 * a10) * det;
      out[6] = b21 * det;
      out[7] = (-a21 * a00 + a01 * a20) * det;
      out[8] = (a11 * a00 - a01 * a10) * det;
      return out;
    }
    function adjoint(out, a) {
      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];
      out[0] = a11 * a22 - a12 * a21;
      out[1] = a02 * a21 - a01 * a22;
      out[2] = a01 * a12 - a02 * a11;
      out[3] = a12 * a20 - a10 * a22;
      out[4] = a00 * a22 - a02 * a20;
      out[5] = a02 * a10 - a00 * a12;
      out[6] = a10 * a21 - a11 * a20;
      out[7] = a01 * a20 - a00 * a21;
      out[8] = a00 * a11 - a01 * a10;
      return out;
    }
    function determinant(a) {
      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];
      return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
    }
    function multiply(out, a, b) {
      var a00 = a[0], a01 = a[1], a02 = a[2];
      var a10 = a[3], a11 = a[4], a12 = a[5];
      var a20 = a[6], a21 = a[7], a22 = a[8];
      var b00 = b[0], b01 = b[1], b02 = b[2];
      var b10 = b[3], b11 = b[4], b12 = b[5];
      var b20 = b[6], b21 = b[7], b22 = b[8];
      out[0] = b00 * a00 + b01 * a10 + b02 * a20;
      out[1] = b00 * a01 + b01 * a11 + b02 * a21;
      out[2] = b00 * a02 + b01 * a12 + b02 * a22;
      out[3] = b10 * a00 + b11 * a10 + b12 * a20;
      out[4] = b10 * a01 + b11 * a11 + b12 * a21;
      out[5] = b10 * a02 + b11 * a12 + b12 * a22;
      out[6] = b20 * a00 + b21 * a10 + b22 * a20;
      out[7] = b20 * a01 + b21 * a11 + b22 * a21;
      out[8] = b20 * a02 + b21 * a12 + b22 * a22;
      return out;
    }
    function translate(out, a, v) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a10;
      out[4] = a11;
      out[5] = a12;
      out[6] = x * a00 + y * a10 + a20;
      out[7] = x * a01 + y * a11 + a21;
      out[8] = x * a02 + y * a12 + a22;
      return out;
    }
    function rotate(out, a, rad) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
      out[0] = c * a00 + s * a10;
      out[1] = c * a01 + s * a11;
      out[2] = c * a02 + s * a12;
      out[3] = c * a10 - s * a00;
      out[4] = c * a11 - s * a01;
      out[5] = c * a12 - s * a02;
      out[6] = a20;
      out[7] = a21;
      out[8] = a22;
      return out;
    }
    function scale(out, a, v) {
      var x = v[0], y = v[1];
      out[0] = x * a[0];
      out[1] = x * a[1];
      out[2] = x * a[2];
      out[3] = y * a[3];
      out[4] = y * a[4];
      out[5] = y * a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      return out;
    }
    function fromTranslation(out, v) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 1;
      out[5] = 0;
      out[6] = v[0];
      out[7] = v[1];
      out[8] = 1;
      return out;
    }
    function fromRotation(out, rad) {
      var s = Math.sin(rad), c = Math.cos(rad);
      out[0] = c;
      out[1] = s;
      out[2] = 0;
      out[3] = -s;
      out[4] = c;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 1;
      return out;
    }
    function fromScaling(out, v) {
      out[0] = v[0];
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = v[1];
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 1;
      return out;
    }
    function fromMat2d(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = 0;
      out[3] = a[2];
      out[4] = a[3];
      out[5] = 0;
      out[6] = a[4];
      out[7] = a[5];
      out[8] = 1;
      return out;
    }
    function fromQuat(out, q) {
      var x = q[0], y = q[1], z = q[2], w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var yx = y * x2;
      var yy = y * y2;
      var zx = z * x2;
      var zy = z * y2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      out[0] = 1 - yy - zz;
      out[3] = yx - wz;
      out[6] = zx + wy;
      out[1] = yx + wz;
      out[4] = 1 - xx - zz;
      out[7] = zy - wx;
      out[2] = zx - wy;
      out[5] = zy + wx;
      out[8] = 1 - xx - yy;
      return out;
    }
    function normalFromMat4(out, a) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      var b00 = a00 * a11 - a01 * a10;
      var b01 = a00 * a12 - a02 * a10;
      var b02 = a00 * a13 - a03 * a10;
      var b03 = a01 * a12 - a02 * a11;
      var b04 = a01 * a13 - a03 * a11;
      var b05 = a02 * a13 - a03 * a12;
      var b06 = a20 * a31 - a21 * a30;
      var b07 = a20 * a32 - a22 * a30;
      var b08 = a20 * a33 - a23 * a30;
      var b09 = a21 * a32 - a22 * a31;
      var b10 = a21 * a33 - a23 * a31;
      var b11 = a22 * a33 - a23 * a32;
      var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
      out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
      out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
      out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
      out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
      out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
      out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
      out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
      out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
      return out;
    }
    function projection(out, width, height) {
      out[0] = 2 / width;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = -2 / height;
      out[5] = 0;
      out[6] = -1;
      out[7] = 1;
      out[8] = 1;
      return out;
    }
    function str(a) {
      return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
    }
    function frob(a) {
      return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3] + a[4] * a[4] + a[5] * a[5] + a[6] * a[6] + a[7] * a[7] + a[8] * a[8]);
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      out[4] = a[4] + b[4];
      out[5] = a[5] + b[5];
      out[6] = a[6] + b[6];
      out[7] = a[7] + b[7];
      out[8] = a[8] + b[8];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      out[4] = a[4] - b[4];
      out[5] = a[5] - b[5];
      out[6] = a[6] - b[6];
      out[7] = a[7] - b[7];
      out[8] = a[8] - b[8];
      return out;
    }
    function multiplyScalar(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      out[4] = a[4] * b;
      out[5] = a[5] * b;
      out[6] = a[6] * b;
      out[7] = a[7] * b;
      out[8] = a[8] * b;
      return out;
    }
    function multiplyScalarAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      out[3] = a[3] + b[3] * scale2;
      out[4] = a[4] + b[4] * scale2;
      out[5] = a[5] + b[5] * scale2;
      out[6] = a[6] + b[6] * scale2;
      out[7] = a[7] + b[7] * scale2;
      out[8] = a[8] + b[8] * scale2;
      return out;
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8));
    }
    var mul = exports.mul = multiply;
    var sub = exports.sub = subtract;
  }
});

// node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/mat4.js
var require_mat4 = __commonJS({
  "node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/mat4.js"(exports) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.add = add;
    exports.adjoint = adjoint;
    exports.clone = clone;
    exports.copy = copy;
    exports.create = create;
    exports.decompose = decompose;
    exports.determinant = determinant;
    exports.equals = equals;
    exports.exactEquals = exactEquals;
    exports.frob = frob;
    exports.fromQuat = fromQuat;
    exports.fromQuat2 = fromQuat2;
    exports.fromRotation = fromRotation;
    exports.fromRotationTranslation = fromRotationTranslation;
    exports.fromRotationTranslationScale = fromRotationTranslationScale;
    exports.fromRotationTranslationScaleOrigin = fromRotationTranslationScaleOrigin;
    exports.fromScaling = fromScaling;
    exports.fromTranslation = fromTranslation;
    exports.fromValues = fromValues;
    exports.fromXRotation = fromXRotation;
    exports.fromYRotation = fromYRotation;
    exports.fromZRotation = fromZRotation;
    exports.frustum = frustum;
    exports.getRotation = getRotation;
    exports.getScaling = getScaling;
    exports.getTranslation = getTranslation;
    exports.identity = identity;
    exports.invert = invert;
    exports.lookAt = lookAt;
    exports.mul = void 0;
    exports.multiply = multiply;
    exports.multiplyScalar = multiplyScalar;
    exports.multiplyScalarAndAdd = multiplyScalarAndAdd;
    exports.ortho = void 0;
    exports.orthoNO = orthoNO;
    exports.orthoZO = orthoZO;
    exports.perspective = void 0;
    exports.perspectiveFromFieldOfView = perspectiveFromFieldOfView;
    exports.perspectiveNO = perspectiveNO;
    exports.perspectiveZO = perspectiveZO;
    exports.rotate = rotate;
    exports.rotateX = rotateX;
    exports.rotateY = rotateY;
    exports.rotateZ = rotateZ;
    exports.scale = scale;
    exports.set = set;
    exports.str = str;
    exports.sub = void 0;
    exports.subtract = subtract;
    exports.targetTo = targetTo;
    exports.translate = translate;
    exports.transpose = transpose;
    var glMatrix = _interopRequireWildcard(require_common());
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, "default": e2 };
        if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (var _t in e2) "default" !== _t && {}.hasOwnProperty.call(e2, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e2[_t]);
        return f;
      })(e, t);
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(16);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
      }
      out[0] = 1;
      out[5] = 1;
      out[10] = 1;
      out[15] = 1;
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(16);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
      return out;
    }
    function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
      var out = new glMatrix.ARRAY_TYPE(16);
      out[0] = m00;
      out[1] = m01;
      out[2] = m02;
      out[3] = m03;
      out[4] = m10;
      out[5] = m11;
      out[6] = m12;
      out[7] = m13;
      out[8] = m20;
      out[9] = m21;
      out[10] = m22;
      out[11] = m23;
      out[12] = m30;
      out[13] = m31;
      out[14] = m32;
      out[15] = m33;
      return out;
    }
    function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
      out[0] = m00;
      out[1] = m01;
      out[2] = m02;
      out[3] = m03;
      out[4] = m10;
      out[5] = m11;
      out[6] = m12;
      out[7] = m13;
      out[8] = m20;
      out[9] = m21;
      out[10] = m22;
      out[11] = m23;
      out[12] = m30;
      out[13] = m31;
      out[14] = m32;
      out[15] = m33;
      return out;
    }
    function identity(out) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = 1;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 1;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function transpose(out, a) {
      if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3];
        var a12 = a[6], a13 = a[7];
        var a23 = a[11];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
      } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
      }
      return out;
    }
    function invert(out, a) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      var b00 = a00 * a11 - a01 * a10;
      var b01 = a00 * a12 - a02 * a10;
      var b02 = a00 * a13 - a03 * a10;
      var b03 = a01 * a12 - a02 * a11;
      var b04 = a01 * a13 - a03 * a11;
      var b05 = a02 * a13 - a03 * a12;
      var b06 = a20 * a31 - a21 * a30;
      var b07 = a20 * a32 - a22 * a30;
      var b08 = a20 * a33 - a23 * a30;
      var b09 = a21 * a32 - a22 * a31;
      var b10 = a21 * a33 - a23 * a31;
      var b11 = a22 * a33 - a23 * a32;
      var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
      if (!det) {
        return null;
      }
      det = 1 / det;
      out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
      out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
      out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
      out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
      out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
      out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
      out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
      out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
      out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
      out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
      out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
      out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
      out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
      out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
      out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
      out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
      return out;
    }
    function adjoint(out, a) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      var b00 = a00 * a11 - a01 * a10;
      var b01 = a00 * a12 - a02 * a10;
      var b02 = a00 * a13 - a03 * a10;
      var b03 = a01 * a12 - a02 * a11;
      var b04 = a01 * a13 - a03 * a11;
      var b05 = a02 * a13 - a03 * a12;
      var b06 = a20 * a31 - a21 * a30;
      var b07 = a20 * a32 - a22 * a30;
      var b08 = a20 * a33 - a23 * a30;
      var b09 = a21 * a32 - a22 * a31;
      var b10 = a21 * a33 - a23 * a31;
      var b11 = a22 * a33 - a23 * a32;
      out[0] = a11 * b11 - a12 * b10 + a13 * b09;
      out[1] = a02 * b10 - a01 * b11 - a03 * b09;
      out[2] = a31 * b05 - a32 * b04 + a33 * b03;
      out[3] = a22 * b04 - a21 * b05 - a23 * b03;
      out[4] = a12 * b08 - a10 * b11 - a13 * b07;
      out[5] = a00 * b11 - a02 * b08 + a03 * b07;
      out[6] = a32 * b02 - a30 * b05 - a33 * b01;
      out[7] = a20 * b05 - a22 * b02 + a23 * b01;
      out[8] = a10 * b10 - a11 * b08 + a13 * b06;
      out[9] = a01 * b08 - a00 * b10 - a03 * b06;
      out[10] = a30 * b04 - a31 * b02 + a33 * b00;
      out[11] = a21 * b02 - a20 * b04 - a23 * b00;
      out[12] = a11 * b07 - a10 * b09 - a12 * b06;
      out[13] = a00 * b09 - a01 * b07 + a02 * b06;
      out[14] = a31 * b01 - a30 * b03 - a32 * b00;
      out[15] = a20 * b03 - a21 * b01 + a22 * b00;
      return out;
    }
    function determinant(a) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      var b0 = a00 * a11 - a01 * a10;
      var b1 = a00 * a12 - a02 * a10;
      var b2 = a01 * a12 - a02 * a11;
      var b3 = a20 * a31 - a21 * a30;
      var b4 = a20 * a32 - a22 * a30;
      var b5 = a21 * a32 - a22 * a31;
      var b6 = a00 * b5 - a01 * b4 + a02 * b3;
      var b7 = a10 * b5 - a11 * b4 + a12 * b3;
      var b8 = a20 * b2 - a21 * b1 + a22 * b0;
      var b9 = a30 * b2 - a31 * b1 + a32 * b0;
      return a13 * b6 - a03 * b7 + a33 * b8 - a23 * b9;
    }
    function multiply(out, a, b) {
      var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[4];
      b1 = b[5];
      b2 = b[6];
      b3 = b[7];
      out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[8];
      b1 = b[9];
      b2 = b[10];
      b3 = b[11];
      out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[12];
      b1 = b[13];
      b2 = b[14];
      b3 = b[15];
      out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      return out;
    }
    function translate(out, a, v) {
      var x = v[0], y = v[1], z = v[2];
      var a00, a01, a02, a03;
      var a10, a11, a12, a13;
      var a20, a21, a22, a23;
      if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
      } else {
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
        out[0] = a00;
        out[1] = a01;
        out[2] = a02;
        out[3] = a03;
        out[4] = a10;
        out[5] = a11;
        out[6] = a12;
        out[7] = a13;
        out[8] = a20;
        out[9] = a21;
        out[10] = a22;
        out[11] = a23;
        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
      }
      return out;
    }
    function scale(out, a, v) {
      var x = v[0], y = v[1], z = v[2];
      out[0] = a[0] * x;
      out[1] = a[1] * x;
      out[2] = a[2] * x;
      out[3] = a[3] * x;
      out[4] = a[4] * y;
      out[5] = a[5] * y;
      out[6] = a[6] * y;
      out[7] = a[7] * y;
      out[8] = a[8] * z;
      out[9] = a[9] * z;
      out[10] = a[10] * z;
      out[11] = a[11] * z;
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
      return out;
    }
    function rotate(out, a, rad, axis) {
      var x = axis[0], y = axis[1], z = axis[2];
      var len = Math.sqrt(x * x + y * y + z * z);
      var s, c, t;
      var a00, a01, a02, a03;
      var a10, a11, a12, a13;
      var a20, a21, a22, a23;
      var b00, b01, b02;
      var b10, b11, b12;
      var b20, b21, b22;
      if (len < glMatrix.EPSILON) {
        return null;
      }
      len = 1 / len;
      x *= len;
      y *= len;
      z *= len;
      s = Math.sin(rad);
      c = Math.cos(rad);
      t = 1 - c;
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      b00 = x * x * t + c;
      b01 = y * x * t + z * s;
      b02 = z * x * t - y * s;
      b10 = x * y * t - z * s;
      b11 = y * y * t + c;
      b12 = z * y * t + x * s;
      b20 = x * z * t + y * s;
      b21 = y * z * t - x * s;
      b22 = z * z * t + c;
      out[0] = a00 * b00 + a10 * b01 + a20 * b02;
      out[1] = a01 * b00 + a11 * b01 + a21 * b02;
      out[2] = a02 * b00 + a12 * b01 + a22 * b02;
      out[3] = a03 * b00 + a13 * b01 + a23 * b02;
      out[4] = a00 * b10 + a10 * b11 + a20 * b12;
      out[5] = a01 * b10 + a11 * b11 + a21 * b12;
      out[6] = a02 * b10 + a12 * b11 + a22 * b12;
      out[7] = a03 * b10 + a13 * b11 + a23 * b12;
      out[8] = a00 * b20 + a10 * b21 + a20 * b22;
      out[9] = a01 * b20 + a11 * b21 + a21 * b22;
      out[10] = a02 * b20 + a12 * b21 + a22 * b22;
      out[11] = a03 * b20 + a13 * b21 + a23 * b22;
      if (a !== out) {
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }
      return out;
    }
    function rotateX(out, a, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var a10 = a[4];
      var a11 = a[5];
      var a12 = a[6];
      var a13 = a[7];
      var a20 = a[8];
      var a21 = a[9];
      var a22 = a[10];
      var a23 = a[11];
      if (a !== out) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }
      out[4] = a10 * c + a20 * s;
      out[5] = a11 * c + a21 * s;
      out[6] = a12 * c + a22 * s;
      out[7] = a13 * c + a23 * s;
      out[8] = a20 * c - a10 * s;
      out[9] = a21 * c - a11 * s;
      out[10] = a22 * c - a12 * s;
      out[11] = a23 * c - a13 * s;
      return out;
    }
    function rotateY(out, a, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var a00 = a[0];
      var a01 = a[1];
      var a02 = a[2];
      var a03 = a[3];
      var a20 = a[8];
      var a21 = a[9];
      var a22 = a[10];
      var a23 = a[11];
      if (a !== out) {
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }
      out[0] = a00 * c - a20 * s;
      out[1] = a01 * c - a21 * s;
      out[2] = a02 * c - a22 * s;
      out[3] = a03 * c - a23 * s;
      out[8] = a00 * s + a20 * c;
      out[9] = a01 * s + a21 * c;
      out[10] = a02 * s + a22 * c;
      out[11] = a03 * s + a23 * c;
      return out;
    }
    function rotateZ(out, a, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var a00 = a[0];
      var a01 = a[1];
      var a02 = a[2];
      var a03 = a[3];
      var a10 = a[4];
      var a11 = a[5];
      var a12 = a[6];
      var a13 = a[7];
      if (a !== out) {
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }
      out[0] = a00 * c + a10 * s;
      out[1] = a01 * c + a11 * s;
      out[2] = a02 * c + a12 * s;
      out[3] = a03 * c + a13 * s;
      out[4] = a10 * c - a00 * s;
      out[5] = a11 * c - a01 * s;
      out[6] = a12 * c - a02 * s;
      out[7] = a13 * c - a03 * s;
      return out;
    }
    function fromTranslation(out, v) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = 1;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 1;
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;
      return out;
    }
    function fromScaling(out, v) {
      out[0] = v[0];
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = v[1];
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = v[2];
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function fromRotation(out, rad, axis) {
      var x = axis[0], y = axis[1], z = axis[2];
      var len = Math.sqrt(x * x + y * y + z * z);
      var s, c, t;
      if (len < glMatrix.EPSILON) {
        return null;
      }
      len = 1 / len;
      x *= len;
      y *= len;
      z *= len;
      s = Math.sin(rad);
      c = Math.cos(rad);
      t = 1 - c;
      out[0] = x * x * t + c;
      out[1] = y * x * t + z * s;
      out[2] = z * x * t - y * s;
      out[3] = 0;
      out[4] = x * y * t - z * s;
      out[5] = y * y * t + c;
      out[6] = z * y * t + x * s;
      out[7] = 0;
      out[8] = x * z * t + y * s;
      out[9] = y * z * t - x * s;
      out[10] = z * z * t + c;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function fromXRotation(out, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = c;
      out[6] = s;
      out[7] = 0;
      out[8] = 0;
      out[9] = -s;
      out[10] = c;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function fromYRotation(out, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = c;
      out[1] = 0;
      out[2] = -s;
      out[3] = 0;
      out[4] = 0;
      out[5] = 1;
      out[6] = 0;
      out[7] = 0;
      out[8] = s;
      out[9] = 0;
      out[10] = c;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function fromZRotation(out, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      out[0] = c;
      out[1] = s;
      out[2] = 0;
      out[3] = 0;
      out[4] = -s;
      out[5] = c;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 1;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function fromRotationTranslation(out, q, v) {
      var x = q[0], y = q[1], z = q[2], w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var xy = x * y2;
      var xz = x * z2;
      var yy = y * y2;
      var yz = y * z2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      out[0] = 1 - (yy + zz);
      out[1] = xy + wz;
      out[2] = xz - wy;
      out[3] = 0;
      out[4] = xy - wz;
      out[5] = 1 - (xx + zz);
      out[6] = yz + wx;
      out[7] = 0;
      out[8] = xz + wy;
      out[9] = yz - wx;
      out[10] = 1 - (xx + yy);
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;
      return out;
    }
    function fromQuat2(out, a) {
      var translation = new glMatrix.ARRAY_TYPE(3);
      var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7];
      var magnitude = bx * bx + by * by + bz * bz + bw * bw;
      if (magnitude > 0) {
        translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
        translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
        translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
      } else {
        translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
        translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
        translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
      }
      fromRotationTranslation(out, a, translation);
      return out;
    }
    function getTranslation(out, mat) {
      out[0] = mat[12];
      out[1] = mat[13];
      out[2] = mat[14];
      return out;
    }
    function getScaling(out, mat) {
      var m11 = mat[0];
      var m12 = mat[1];
      var m13 = mat[2];
      var m21 = mat[4];
      var m22 = mat[5];
      var m23 = mat[6];
      var m31 = mat[8];
      var m32 = mat[9];
      var m33 = mat[10];
      out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
      out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
      out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
      return out;
    }
    function getRotation(out, mat) {
      var scaling = new glMatrix.ARRAY_TYPE(3);
      getScaling(scaling, mat);
      var is1 = 1 / scaling[0];
      var is2 = 1 / scaling[1];
      var is3 = 1 / scaling[2];
      var sm11 = mat[0] * is1;
      var sm12 = mat[1] * is2;
      var sm13 = mat[2] * is3;
      var sm21 = mat[4] * is1;
      var sm22 = mat[5] * is2;
      var sm23 = mat[6] * is3;
      var sm31 = mat[8] * is1;
      var sm32 = mat[9] * is2;
      var sm33 = mat[10] * is3;
      var trace = sm11 + sm22 + sm33;
      var S = 0;
      if (trace > 0) {
        S = Math.sqrt(trace + 1) * 2;
        out[3] = 0.25 * S;
        out[0] = (sm23 - sm32) / S;
        out[1] = (sm31 - sm13) / S;
        out[2] = (sm12 - sm21) / S;
      } else if (sm11 > sm22 && sm11 > sm33) {
        S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
        out[3] = (sm23 - sm32) / S;
        out[0] = 0.25 * S;
        out[1] = (sm12 + sm21) / S;
        out[2] = (sm31 + sm13) / S;
      } else if (sm22 > sm33) {
        S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
        out[3] = (sm31 - sm13) / S;
        out[0] = (sm12 + sm21) / S;
        out[1] = 0.25 * S;
        out[2] = (sm23 + sm32) / S;
      } else {
        S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
        out[3] = (sm12 - sm21) / S;
        out[0] = (sm31 + sm13) / S;
        out[1] = (sm23 + sm32) / S;
        out[2] = 0.25 * S;
      }
      return out;
    }
    function decompose(out_r, out_t, out_s, mat) {
      out_t[0] = mat[12];
      out_t[1] = mat[13];
      out_t[2] = mat[14];
      var m11 = mat[0];
      var m12 = mat[1];
      var m13 = mat[2];
      var m21 = mat[4];
      var m22 = mat[5];
      var m23 = mat[6];
      var m31 = mat[8];
      var m32 = mat[9];
      var m33 = mat[10];
      out_s[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
      out_s[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
      out_s[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
      var is1 = 1 / out_s[0];
      var is2 = 1 / out_s[1];
      var is3 = 1 / out_s[2];
      var sm11 = m11 * is1;
      var sm12 = m12 * is2;
      var sm13 = m13 * is3;
      var sm21 = m21 * is1;
      var sm22 = m22 * is2;
      var sm23 = m23 * is3;
      var sm31 = m31 * is1;
      var sm32 = m32 * is2;
      var sm33 = m33 * is3;
      var trace = sm11 + sm22 + sm33;
      var S = 0;
      if (trace > 0) {
        S = Math.sqrt(trace + 1) * 2;
        out_r[3] = 0.25 * S;
        out_r[0] = (sm23 - sm32) / S;
        out_r[1] = (sm31 - sm13) / S;
        out_r[2] = (sm12 - sm21) / S;
      } else if (sm11 > sm22 && sm11 > sm33) {
        S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
        out_r[3] = (sm23 - sm32) / S;
        out_r[0] = 0.25 * S;
        out_r[1] = (sm12 + sm21) / S;
        out_r[2] = (sm31 + sm13) / S;
      } else if (sm22 > sm33) {
        S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
        out_r[3] = (sm31 - sm13) / S;
        out_r[0] = (sm12 + sm21) / S;
        out_r[1] = 0.25 * S;
        out_r[2] = (sm23 + sm32) / S;
      } else {
        S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
        out_r[3] = (sm12 - sm21) / S;
        out_r[0] = (sm31 + sm13) / S;
        out_r[1] = (sm23 + sm32) / S;
        out_r[2] = 0.25 * S;
      }
      return out_r;
    }
    function fromRotationTranslationScale(out, q, v, s) {
      var x = q[0], y = q[1], z = q[2], w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var xy = x * y2;
      var xz = x * z2;
      var yy = y * y2;
      var yz = y * z2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      var sx = s[0];
      var sy = s[1];
      var sz = s[2];
      out[0] = (1 - (yy + zz)) * sx;
      out[1] = (xy + wz) * sx;
      out[2] = (xz - wy) * sx;
      out[3] = 0;
      out[4] = (xy - wz) * sy;
      out[5] = (1 - (xx + zz)) * sy;
      out[6] = (yz + wx) * sy;
      out[7] = 0;
      out[8] = (xz + wy) * sz;
      out[9] = (yz - wx) * sz;
      out[10] = (1 - (xx + yy)) * sz;
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;
      return out;
    }
    function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
      var x = q[0], y = q[1], z = q[2], w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var xy = x * y2;
      var xz = x * z2;
      var yy = y * y2;
      var yz = y * z2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      var sx = s[0];
      var sy = s[1];
      var sz = s[2];
      var ox = o[0];
      var oy = o[1];
      var oz = o[2];
      var out0 = (1 - (yy + zz)) * sx;
      var out1 = (xy + wz) * sx;
      var out2 = (xz - wy) * sx;
      var out4 = (xy - wz) * sy;
      var out5 = (1 - (xx + zz)) * sy;
      var out6 = (yz + wx) * sy;
      var out8 = (xz + wy) * sz;
      var out9 = (yz - wx) * sz;
      var out10 = (1 - (xx + yy)) * sz;
      out[0] = out0;
      out[1] = out1;
      out[2] = out2;
      out[3] = 0;
      out[4] = out4;
      out[5] = out5;
      out[6] = out6;
      out[7] = 0;
      out[8] = out8;
      out[9] = out9;
      out[10] = out10;
      out[11] = 0;
      out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
      out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
      out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
      out[15] = 1;
      return out;
    }
    function fromQuat(out, q) {
      var x = q[0], y = q[1], z = q[2], w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var yx = y * x2;
      var yy = y * y2;
      var zx = z * x2;
      var zy = z * y2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      out[0] = 1 - yy - zz;
      out[1] = yx + wz;
      out[2] = zx - wy;
      out[3] = 0;
      out[4] = yx - wz;
      out[5] = 1 - xx - zz;
      out[6] = zy + wx;
      out[7] = 0;
      out[8] = zx + wy;
      out[9] = zy - wx;
      out[10] = 1 - xx - yy;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    function frustum(out, left, right, bottom, top, near, far) {
      var rl = 1 / (right - left);
      var tb = 1 / (top - bottom);
      var nf = 1 / (near - far);
      out[0] = near * 2 * rl;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = near * 2 * tb;
      out[6] = 0;
      out[7] = 0;
      out[8] = (right + left) * rl;
      out[9] = (top + bottom) * tb;
      out[10] = (far + near) * nf;
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[14] = far * near * 2 * nf;
      out[15] = 0;
      return out;
    }
    function perspectiveNO(out, fovy, aspect, near, far) {
      var f = 1 / Math.tan(fovy / 2);
      out[0] = f / aspect;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = f;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[15] = 0;
      if (far != null && far !== Infinity) {
        var nf = 1 / (near - far);
        out[10] = (far + near) * nf;
        out[14] = 2 * far * near * nf;
      } else {
        out[10] = -1;
        out[14] = -2 * near;
      }
      return out;
    }
    var perspective = exports.perspective = perspectiveNO;
    function perspectiveZO(out, fovy, aspect, near, far) {
      var f = 1 / Math.tan(fovy / 2);
      out[0] = f / aspect;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = f;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[15] = 0;
      if (far != null && far !== Infinity) {
        var nf = 1 / (near - far);
        out[10] = far * nf;
        out[14] = far * near * nf;
      } else {
        out[10] = -1;
        out[14] = -near;
      }
      return out;
    }
    function perspectiveFromFieldOfView(out, fov, near, far) {
      var upTan = Math.tan(fov.upDegrees * Math.PI / 180);
      var downTan = Math.tan(fov.downDegrees * Math.PI / 180);
      var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
      var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
      var xScale = 2 / (leftTan + rightTan);
      var yScale = 2 / (upTan + downTan);
      out[0] = xScale;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = yScale;
      out[6] = 0;
      out[7] = 0;
      out[8] = -((leftTan - rightTan) * xScale * 0.5);
      out[9] = (upTan - downTan) * yScale * 0.5;
      out[10] = far / (near - far);
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[14] = far * near / (near - far);
      out[15] = 0;
      return out;
    }
    function orthoNO(out, left, right, bottom, top, near, far) {
      var lr = 1 / (left - right);
      var bt = 1 / (bottom - top);
      var nf = 1 / (near - far);
      out[0] = -2 * lr;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = -2 * bt;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 2 * nf;
      out[11] = 0;
      out[12] = (left + right) * lr;
      out[13] = (top + bottom) * bt;
      out[14] = (far + near) * nf;
      out[15] = 1;
      return out;
    }
    var ortho = exports.ortho = orthoNO;
    function orthoZO(out, left, right, bottom, top, near, far) {
      var lr = 1 / (left - right);
      var bt = 1 / (bottom - top);
      var nf = 1 / (near - far);
      out[0] = -2 * lr;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = -2 * bt;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = nf;
      out[11] = 0;
      out[12] = (left + right) * lr;
      out[13] = (top + bottom) * bt;
      out[14] = near * nf;
      out[15] = 1;
      return out;
    }
    function lookAt(out, eye, center, up) {
      var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
      var eyex = eye[0];
      var eyey = eye[1];
      var eyez = eye[2];
      var upx = up[0];
      var upy = up[1];
      var upz = up[2];
      var centerx = center[0];
      var centery = center[1];
      var centerz = center[2];
      if (Math.abs(eyex - centerx) < glMatrix.EPSILON && Math.abs(eyey - centery) < glMatrix.EPSILON && Math.abs(eyez - centerz) < glMatrix.EPSILON) {
        return identity(out);
      }
      z0 = eyex - centerx;
      z1 = eyey - centery;
      z2 = eyez - centerz;
      len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
      z0 *= len;
      z1 *= len;
      z2 *= len;
      x0 = upy * z2 - upz * z1;
      x1 = upz * z0 - upx * z2;
      x2 = upx * z1 - upy * z0;
      len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
      if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
      } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
      }
      y0 = z1 * x2 - z2 * x1;
      y1 = z2 * x0 - z0 * x2;
      y2 = z0 * x1 - z1 * x0;
      len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
      if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
      } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
      }
      out[0] = x0;
      out[1] = y0;
      out[2] = z0;
      out[3] = 0;
      out[4] = x1;
      out[5] = y1;
      out[6] = z1;
      out[7] = 0;
      out[8] = x2;
      out[9] = y2;
      out[10] = z2;
      out[11] = 0;
      out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
      out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
      out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
      out[15] = 1;
      return out;
    }
    function targetTo(out, eye, target, up) {
      var eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
      var z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
      var len = z0 * z0 + z1 * z1 + z2 * z2;
      if (len > 0) {
        len = 1 / Math.sqrt(len);
        z0 *= len;
        z1 *= len;
        z2 *= len;
      }
      var x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
      len = x0 * x0 + x1 * x1 + x2 * x2;
      if (len > 0) {
        len = 1 / Math.sqrt(len);
        x0 *= len;
        x1 *= len;
        x2 *= len;
      }
      out[0] = x0;
      out[1] = x1;
      out[2] = x2;
      out[3] = 0;
      out[4] = z1 * x2 - z2 * x1;
      out[5] = z2 * x0 - z0 * x2;
      out[6] = z0 * x1 - z1 * x0;
      out[7] = 0;
      out[8] = z0;
      out[9] = z1;
      out[10] = z2;
      out[11] = 0;
      out[12] = eyex;
      out[13] = eyey;
      out[14] = eyez;
      out[15] = 1;
      return out;
    }
    function str(a) {
      return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
    }
    function frob(a) {
      return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3] + a[4] * a[4] + a[5] * a[5] + a[6] * a[6] + a[7] * a[7] + a[8] * a[8] + a[9] * a[9] + a[10] * a[10] + a[11] * a[11] + a[12] * a[12] + a[13] * a[13] + a[14] * a[14] + a[15] * a[15]);
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      out[4] = a[4] + b[4];
      out[5] = a[5] + b[5];
      out[6] = a[6] + b[6];
      out[7] = a[7] + b[7];
      out[8] = a[8] + b[8];
      out[9] = a[9] + b[9];
      out[10] = a[10] + b[10];
      out[11] = a[11] + b[11];
      out[12] = a[12] + b[12];
      out[13] = a[13] + b[13];
      out[14] = a[14] + b[14];
      out[15] = a[15] + b[15];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      out[4] = a[4] - b[4];
      out[5] = a[5] - b[5];
      out[6] = a[6] - b[6];
      out[7] = a[7] - b[7];
      out[8] = a[8] - b[8];
      out[9] = a[9] - b[9];
      out[10] = a[10] - b[10];
      out[11] = a[11] - b[11];
      out[12] = a[12] - b[12];
      out[13] = a[13] - b[13];
      out[14] = a[14] - b[14];
      out[15] = a[15] - b[15];
      return out;
    }
    function multiplyScalar(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      out[4] = a[4] * b;
      out[5] = a[5] * b;
      out[6] = a[6] * b;
      out[7] = a[7] * b;
      out[8] = a[8] * b;
      out[9] = a[9] * b;
      out[10] = a[10] * b;
      out[11] = a[11] * b;
      out[12] = a[12] * b;
      out[13] = a[13] * b;
      out[14] = a[14] * b;
      out[15] = a[15] * b;
      return out;
    }
    function multiplyScalarAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      out[3] = a[3] + b[3] * scale2;
      out[4] = a[4] + b[4] * scale2;
      out[5] = a[5] + b[5] * scale2;
      out[6] = a[6] + b[6] * scale2;
      out[7] = a[7] + b[7] * scale2;
      out[8] = a[8] + b[8] * scale2;
      out[9] = a[9] + b[9] * scale2;
      out[10] = a[10] + b[10] * scale2;
      out[11] = a[11] + b[11] * scale2;
      out[12] = a[12] + b[12] * scale2;
      out[13] = a[13] + b[13] * scale2;
      out[14] = a[14] + b[14] * scale2;
      out[15] = a[15] + b[15] * scale2;
      return out;
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
      var a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
      var a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      var b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
      var b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
      var b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= glMatrix.EPSILON * Math.max(1, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= glMatrix.EPSILON * Math.max(1, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= glMatrix.EPSILON * Math.max(1, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= glMatrix.EPSILON * Math.max(1, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= glMatrix.EPSILON * Math.max(1, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= glMatrix.EPSILON * Math.max(1, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= glMatrix.EPSILON * Math.max(1, Math.abs(a15), Math.abs(b15));
    }
    var mul = exports.mul = multiply;
    var sub = exports.sub = subtract;
  }
});

// node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/vec3.js
var require_vec3 = __commonJS({
  "node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/vec3.js"(exports) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.add = add;
    exports.angle = angle;
    exports.bezier = bezier;
    exports.ceil = ceil;
    exports.clone = clone;
    exports.copy = copy;
    exports.create = create;
    exports.cross = cross;
    exports.dist = void 0;
    exports.distance = distance;
    exports.div = void 0;
    exports.divide = divide;
    exports.dot = dot;
    exports.equals = equals;
    exports.exactEquals = exactEquals;
    exports.floor = floor;
    exports.forEach = void 0;
    exports.fromValues = fromValues;
    exports.hermite = hermite;
    exports.inverse = inverse;
    exports.len = void 0;
    exports.length = length;
    exports.lerp = lerp;
    exports.max = max;
    exports.min = min;
    exports.mul = void 0;
    exports.multiply = multiply;
    exports.negate = negate;
    exports.normalize = normalize;
    exports.random = random;
    exports.rotateX = rotateX;
    exports.rotateY = rotateY;
    exports.rotateZ = rotateZ;
    exports.round = round;
    exports.scale = scale;
    exports.scaleAndAdd = scaleAndAdd;
    exports.set = set;
    exports.slerp = slerp;
    exports.sqrLen = exports.sqrDist = void 0;
    exports.squaredDistance = squaredDistance;
    exports.squaredLength = squaredLength;
    exports.str = str;
    exports.sub = void 0;
    exports.subtract = subtract;
    exports.transformMat3 = transformMat3;
    exports.transformMat4 = transformMat4;
    exports.transformQuat = transformQuat;
    exports.zero = zero;
    var glMatrix = _interopRequireWildcard(require_common());
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, "default": e2 };
        if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (var _t in e2) "default" !== _t && {}.hasOwnProperty.call(e2, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e2[_t]);
        return f;
      })(e, t);
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(3);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
      }
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(3);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      return out;
    }
    function length(a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      return Math.sqrt(x * x + y * y + z * z);
    }
    function fromValues(x, y, z) {
      var out = new glMatrix.ARRAY_TYPE(3);
      out[0] = x;
      out[1] = y;
      out[2] = z;
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      return out;
    }
    function set(out, x, y, z) {
      out[0] = x;
      out[1] = y;
      out[2] = z;
      return out;
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      return out;
    }
    function multiply(out, a, b) {
      out[0] = a[0] * b[0];
      out[1] = a[1] * b[1];
      out[2] = a[2] * b[2];
      return out;
    }
    function divide(out, a, b) {
      out[0] = a[0] / b[0];
      out[1] = a[1] / b[1];
      out[2] = a[2] / b[2];
      return out;
    }
    function ceil(out, a) {
      out[0] = Math.ceil(a[0]);
      out[1] = Math.ceil(a[1]);
      out[2] = Math.ceil(a[2]);
      return out;
    }
    function floor(out, a) {
      out[0] = Math.floor(a[0]);
      out[1] = Math.floor(a[1]);
      out[2] = Math.floor(a[2]);
      return out;
    }
    function min(out, a, b) {
      out[0] = Math.min(a[0], b[0]);
      out[1] = Math.min(a[1], b[1]);
      out[2] = Math.min(a[2], b[2]);
      return out;
    }
    function max(out, a, b) {
      out[0] = Math.max(a[0], b[0]);
      out[1] = Math.max(a[1], b[1]);
      out[2] = Math.max(a[2], b[2]);
      return out;
    }
    function round(out, a) {
      out[0] = glMatrix.round(a[0]);
      out[1] = glMatrix.round(a[1]);
      out[2] = glMatrix.round(a[2]);
      return out;
    }
    function scale(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      return out;
    }
    function scaleAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      return out;
    }
    function distance(a, b) {
      var x = b[0] - a[0];
      var y = b[1] - a[1];
      var z = b[2] - a[2];
      return Math.sqrt(x * x + y * y + z * z);
    }
    function squaredDistance(a, b) {
      var x = b[0] - a[0];
      var y = b[1] - a[1];
      var z = b[2] - a[2];
      return x * x + y * y + z * z;
    }
    function squaredLength(a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      return x * x + y * y + z * z;
    }
    function negate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      out[2] = -a[2];
      return out;
    }
    function inverse(out, a) {
      out[0] = 1 / a[0];
      out[1] = 1 / a[1];
      out[2] = 1 / a[2];
      return out;
    }
    function normalize(out, a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      var len2 = x * x + y * y + z * z;
      if (len2 > 0) {
        len2 = 1 / Math.sqrt(len2);
      }
      out[0] = a[0] * len2;
      out[1] = a[1] * len2;
      out[2] = a[2] * len2;
      return out;
    }
    function dot(a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }
    function cross(out, a, b) {
      var ax = a[0], ay = a[1], az = a[2];
      var bx = b[0], by = b[1], bz = b[2];
      out[0] = ay * bz - az * by;
      out[1] = az * bx - ax * bz;
      out[2] = ax * by - ay * bx;
      return out;
    }
    function lerp(out, a, b, t) {
      var ax = a[0];
      var ay = a[1];
      var az = a[2];
      out[0] = ax + t * (b[0] - ax);
      out[1] = ay + t * (b[1] - ay);
      out[2] = az + t * (b[2] - az);
      return out;
    }
    function slerp(out, a, b, t) {
      var angle2 = Math.acos(Math.min(Math.max(dot(a, b), -1), 1));
      var sinTotal = Math.sin(angle2);
      var ratioA = Math.sin((1 - t) * angle2) / sinTotal;
      var ratioB = Math.sin(t * angle2) / sinTotal;
      out[0] = ratioA * a[0] + ratioB * b[0];
      out[1] = ratioA * a[1] + ratioB * b[1];
      out[2] = ratioA * a[2] + ratioB * b[2];
      return out;
    }
    function hermite(out, a, b, c, d, t) {
      var factorTimes2 = t * t;
      var factor1 = factorTimes2 * (2 * t - 3) + 1;
      var factor2 = factorTimes2 * (t - 2) + t;
      var factor3 = factorTimes2 * (t - 1);
      var factor4 = factorTimes2 * (3 - 2 * t);
      out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
      out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
      out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
      return out;
    }
    function bezier(out, a, b, c, d, t) {
      var inverseFactor = 1 - t;
      var inverseFactorTimesTwo = inverseFactor * inverseFactor;
      var factorTimes2 = t * t;
      var factor1 = inverseFactorTimesTwo * inverseFactor;
      var factor2 = 3 * t * inverseFactorTimesTwo;
      var factor3 = 3 * factorTimes2 * inverseFactor;
      var factor4 = factorTimes2 * t;
      out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
      out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
      out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
      return out;
    }
    function random(out, scale2) {
      scale2 = scale2 === void 0 ? 1 : scale2;
      var r = glMatrix.RANDOM() * 2 * Math.PI;
      var z = glMatrix.RANDOM() * 2 - 1;
      var zScale = Math.sqrt(1 - z * z) * scale2;
      out[0] = Math.cos(r) * zScale;
      out[1] = Math.sin(r) * zScale;
      out[2] = z * scale2;
      return out;
    }
    function transformMat4(out, a, m) {
      var x = a[0], y = a[1], z = a[2];
      var w = m[3] * x + m[7] * y + m[11] * z + m[15];
      w = w || 1;
      out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
      out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
      out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
      return out;
    }
    function transformMat3(out, a, m) {
      var x = a[0], y = a[1], z = a[2];
      out[0] = x * m[0] + y * m[3] + z * m[6];
      out[1] = x * m[1] + y * m[4] + z * m[7];
      out[2] = x * m[2] + y * m[5] + z * m[8];
      return out;
    }
    function transformQuat(out, a, q) {
      var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
      var vx = a[0], vy = a[1], vz = a[2];
      var tx = qy * vz - qz * vy;
      var ty = qz * vx - qx * vz;
      var tz = qx * vy - qy * vx;
      tx = tx + tx;
      ty = ty + ty;
      tz = tz + tz;
      out[0] = vx + qw * tx + qy * tz - qz * ty;
      out[1] = vy + qw * ty + qz * tx - qx * tz;
      out[2] = vz + qw * tz + qx * ty - qy * tx;
      return out;
    }
    function rotateX(out, a, b, rad) {
      var p = [], r = [];
      p[0] = a[0] - b[0];
      p[1] = a[1] - b[1];
      p[2] = a[2] - b[2];
      r[0] = p[0];
      r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
      r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
      out[0] = r[0] + b[0];
      out[1] = r[1] + b[1];
      out[2] = r[2] + b[2];
      return out;
    }
    function rotateY(out, a, b, rad) {
      var p = [], r = [];
      p[0] = a[0] - b[0];
      p[1] = a[1] - b[1];
      p[2] = a[2] - b[2];
      r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
      r[1] = p[1];
      r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
      out[0] = r[0] + b[0];
      out[1] = r[1] + b[1];
      out[2] = r[2] + b[2];
      return out;
    }
    function rotateZ(out, a, b, rad) {
      var p = [], r = [];
      p[0] = a[0] - b[0];
      p[1] = a[1] - b[1];
      p[2] = a[2] - b[2];
      r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
      r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
      r[2] = p[2];
      out[0] = r[0] + b[0];
      out[1] = r[1] + b[1];
      out[2] = r[2] + b[2];
      return out;
    }
    function angle(a, b) {
      var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2], mag = Math.sqrt((ax * ax + ay * ay + az * az) * (bx * bx + by * by + bz * bz)), cosine = mag && dot(a, b) / mag;
      return Math.acos(Math.min(Math.max(cosine, -1), 1));
    }
    function zero(out) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      return out;
    }
    function str(a) {
      return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2];
      var b0 = b[0], b1 = b[1], b2 = b[2];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
    }
    var sub = exports.sub = subtract;
    var mul = exports.mul = multiply;
    var div = exports.div = divide;
    var dist = exports.dist = distance;
    var sqrDist = exports.sqrDist = squaredDistance;
    var len = exports.len = length;
    var sqrLen = exports.sqrLen = squaredLength;
    var forEach = exports.forEach = (function() {
      var vec = create();
      return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
          stride = 3;
        }
        if (!offset) {
          offset = 0;
        }
        if (count) {
          l = Math.min(count * stride + offset, a.length);
        } else {
          l = a.length;
        }
        for (i = offset; i < l; i += stride) {
          vec[0] = a[i];
          vec[1] = a[i + 1];
          vec[2] = a[i + 2];
          fn(vec, vec, arg);
          a[i] = vec[0];
          a[i + 1] = vec[1];
          a[i + 2] = vec[2];
        }
        return a;
      };
    })();
  }
});

// node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/vec4.js
var require_vec4 = __commonJS({
  "node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/vec4.js"(exports) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.add = add;
    exports.ceil = ceil;
    exports.clone = clone;
    exports.copy = copy;
    exports.create = create;
    exports.cross = cross;
    exports.dist = void 0;
    exports.distance = distance;
    exports.div = void 0;
    exports.divide = divide;
    exports.dot = dot;
    exports.equals = equals;
    exports.exactEquals = exactEquals;
    exports.floor = floor;
    exports.forEach = void 0;
    exports.fromValues = fromValues;
    exports.inverse = inverse;
    exports.len = void 0;
    exports.length = length;
    exports.lerp = lerp;
    exports.max = max;
    exports.min = min;
    exports.mul = void 0;
    exports.multiply = multiply;
    exports.negate = negate;
    exports.normalize = normalize;
    exports.random = random;
    exports.round = round;
    exports.scale = scale;
    exports.scaleAndAdd = scaleAndAdd;
    exports.set = set;
    exports.sqrLen = exports.sqrDist = void 0;
    exports.squaredDistance = squaredDistance;
    exports.squaredLength = squaredLength;
    exports.str = str;
    exports.sub = void 0;
    exports.subtract = subtract;
    exports.transformMat4 = transformMat4;
    exports.transformQuat = transformQuat;
    exports.zero = zero;
    var glMatrix = _interopRequireWildcard(require_common());
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, "default": e2 };
        if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (var _t in e2) "default" !== _t && {}.hasOwnProperty.call(e2, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e2[_t]);
        return f;
      })(e, t);
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(4);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
      }
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(4);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      return out;
    }
    function fromValues(x, y, z, w) {
      var out = new glMatrix.ARRAY_TYPE(4);
      out[0] = x;
      out[1] = y;
      out[2] = z;
      out[3] = w;
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      return out;
    }
    function set(out, x, y, z, w) {
      out[0] = x;
      out[1] = y;
      out[2] = z;
      out[3] = w;
      return out;
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      return out;
    }
    function multiply(out, a, b) {
      out[0] = a[0] * b[0];
      out[1] = a[1] * b[1];
      out[2] = a[2] * b[2];
      out[3] = a[3] * b[3];
      return out;
    }
    function divide(out, a, b) {
      out[0] = a[0] / b[0];
      out[1] = a[1] / b[1];
      out[2] = a[2] / b[2];
      out[3] = a[3] / b[3];
      return out;
    }
    function ceil(out, a) {
      out[0] = Math.ceil(a[0]);
      out[1] = Math.ceil(a[1]);
      out[2] = Math.ceil(a[2]);
      out[3] = Math.ceil(a[3]);
      return out;
    }
    function floor(out, a) {
      out[0] = Math.floor(a[0]);
      out[1] = Math.floor(a[1]);
      out[2] = Math.floor(a[2]);
      out[3] = Math.floor(a[3]);
      return out;
    }
    function min(out, a, b) {
      out[0] = Math.min(a[0], b[0]);
      out[1] = Math.min(a[1], b[1]);
      out[2] = Math.min(a[2], b[2]);
      out[3] = Math.min(a[3], b[3]);
      return out;
    }
    function max(out, a, b) {
      out[0] = Math.max(a[0], b[0]);
      out[1] = Math.max(a[1], b[1]);
      out[2] = Math.max(a[2], b[2]);
      out[3] = Math.max(a[3], b[3]);
      return out;
    }
    function round(out, a) {
      out[0] = glMatrix.round(a[0]);
      out[1] = glMatrix.round(a[1]);
      out[2] = glMatrix.round(a[2]);
      out[3] = glMatrix.round(a[3]);
      return out;
    }
    function scale(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      return out;
    }
    function scaleAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      out[2] = a[2] + b[2] * scale2;
      out[3] = a[3] + b[3] * scale2;
      return out;
    }
    function distance(a, b) {
      var x = b[0] - a[0];
      var y = b[1] - a[1];
      var z = b[2] - a[2];
      var w = b[3] - a[3];
      return Math.sqrt(x * x + y * y + z * z + w * w);
    }
    function squaredDistance(a, b) {
      var x = b[0] - a[0];
      var y = b[1] - a[1];
      var z = b[2] - a[2];
      var w = b[3] - a[3];
      return x * x + y * y + z * z + w * w;
    }
    function length(a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      var w = a[3];
      return Math.sqrt(x * x + y * y + z * z + w * w);
    }
    function squaredLength(a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      var w = a[3];
      return x * x + y * y + z * z + w * w;
    }
    function negate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      out[2] = -a[2];
      out[3] = -a[3];
      return out;
    }
    function inverse(out, a) {
      out[0] = 1 / a[0];
      out[1] = 1 / a[1];
      out[2] = 1 / a[2];
      out[3] = 1 / a[3];
      return out;
    }
    function normalize(out, a) {
      var x = a[0];
      var y = a[1];
      var z = a[2];
      var w = a[3];
      var len2 = x * x + y * y + z * z + w * w;
      if (len2 > 0) {
        len2 = 1 / Math.sqrt(len2);
      }
      out[0] = x * len2;
      out[1] = y * len2;
      out[2] = z * len2;
      out[3] = w * len2;
      return out;
    }
    function dot(a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }
    function cross(out, u, v, w) {
      var A = v[0] * w[1] - v[1] * w[0], B = v[0] * w[2] - v[2] * w[0], C = v[0] * w[3] - v[3] * w[0], D = v[1] * w[2] - v[2] * w[1], E = v[1] * w[3] - v[3] * w[1], F = v[2] * w[3] - v[3] * w[2];
      var G = u[0];
      var H = u[1];
      var I = u[2];
      var J = u[3];
      out[0] = H * F - I * E + J * D;
      out[1] = -(G * F) + I * C - J * B;
      out[2] = G * E - H * C + J * A;
      out[3] = -(G * D) + H * B - I * A;
      return out;
    }
    function lerp(out, a, b, t) {
      var ax = a[0];
      var ay = a[1];
      var az = a[2];
      var aw = a[3];
      out[0] = ax + t * (b[0] - ax);
      out[1] = ay + t * (b[1] - ay);
      out[2] = az + t * (b[2] - az);
      out[3] = aw + t * (b[3] - aw);
      return out;
    }
    function random(out, scale2) {
      scale2 = scale2 === void 0 ? 1 : scale2;
      var v1, v2, v3, v4;
      var s1, s2;
      var rand;
      rand = glMatrix.RANDOM();
      v1 = rand * 2 - 1;
      v2 = (4 * glMatrix.RANDOM() - 2) * Math.sqrt(rand * -rand + rand);
      s1 = v1 * v1 + v2 * v2;
      rand = glMatrix.RANDOM();
      v3 = rand * 2 - 1;
      v4 = (4 * glMatrix.RANDOM() - 2) * Math.sqrt(rand * -rand + rand);
      s2 = v3 * v3 + v4 * v4;
      var d = Math.sqrt((1 - s1) / s2);
      out[0] = scale2 * v1;
      out[1] = scale2 * v2;
      out[2] = scale2 * v3 * d;
      out[3] = scale2 * v4 * d;
      return out;
    }
    function transformMat4(out, a, m) {
      var x = a[0], y = a[1], z = a[2], w = a[3];
      out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
      out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
      out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
      out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
      return out;
    }
    function transformQuat(out, a, q) {
      var qx = q[0], qy = q[1], qz = q[2], qw = q[3];
      var vx = a[0], vy = a[1], vz = a[2];
      var tx = qy * vz - qz * vy;
      var ty = qz * vx - qx * vz;
      var tz = qx * vy - qy * vx;
      tx = tx + tx;
      ty = ty + ty;
      tz = tz + tz;
      out[0] = vx + qw * tx + qy * tz - qz * ty;
      out[1] = vy + qw * ty + qz * tx - qx * tz;
      out[2] = vz + qw * tz + qx * ty - qy * tx;
      out[3] = a[3];
      return out;
    }
    function zero(out) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      return out;
    }
    function str(a) {
      return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3));
    }
    var sub = exports.sub = subtract;
    var mul = exports.mul = multiply;
    var div = exports.div = divide;
    var dist = exports.dist = distance;
    var sqrDist = exports.sqrDist = squaredDistance;
    var len = exports.len = length;
    var sqrLen = exports.sqrLen = squaredLength;
    var forEach = exports.forEach = (function() {
      var vec = create();
      return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
          stride = 4;
        }
        if (!offset) {
          offset = 0;
        }
        if (count) {
          l = Math.min(count * stride + offset, a.length);
        } else {
          l = a.length;
        }
        for (i = offset; i < l; i += stride) {
          vec[0] = a[i];
          vec[1] = a[i + 1];
          vec[2] = a[i + 2];
          vec[3] = a[i + 3];
          fn(vec, vec, arg);
          a[i] = vec[0];
          a[i + 1] = vec[1];
          a[i + 2] = vec[2];
          a[i + 3] = vec[3];
        }
        return a;
      };
    })();
  }
});

// node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/quat.js
var require_quat = __commonJS({
  "node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/quat.js"(exports) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.add = void 0;
    exports.calculateW = calculateW;
    exports.clone = void 0;
    exports.conjugate = conjugate;
    exports.copy = void 0;
    exports.create = create;
    exports.dot = void 0;
    exports.equals = equals;
    exports.exactEquals = void 0;
    exports.exp = exp;
    exports.fromEuler = fromEuler;
    exports.fromMat3 = fromMat3;
    exports.fromValues = void 0;
    exports.getAngle = getAngle;
    exports.getAxisAngle = getAxisAngle;
    exports.identity = identity;
    exports.invert = invert;
    exports.lerp = exports.length = exports.len = void 0;
    exports.ln = ln;
    exports.mul = void 0;
    exports.multiply = multiply;
    exports.normalize = void 0;
    exports.pow = pow;
    exports.random = random;
    exports.rotateX = rotateX;
    exports.rotateY = rotateY;
    exports.rotateZ = rotateZ;
    exports.setAxes = exports.set = exports.scale = exports.rotationTo = void 0;
    exports.setAxisAngle = setAxisAngle;
    exports.slerp = slerp;
    exports.squaredLength = exports.sqrLen = exports.sqlerp = void 0;
    exports.str = str;
    var glMatrix = _interopRequireWildcard(require_common());
    var mat3 = _interopRequireWildcard(require_mat3());
    var vec321 = _interopRequireWildcard(require_vec3());
    var vec4 = _interopRequireWildcard(require_vec4());
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, "default": e2 };
        if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (var _t in e2) "default" !== _t && {}.hasOwnProperty.call(e2, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e2[_t]);
        return f;
      })(e, t);
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(4);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
      }
      out[3] = 1;
      return out;
    }
    function identity(out) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    }
    function setAxisAngle(out, axis, rad) {
      rad = rad * 0.5;
      var s = Math.sin(rad);
      out[0] = s * axis[0];
      out[1] = s * axis[1];
      out[2] = s * axis[2];
      out[3] = Math.cos(rad);
      return out;
    }
    function getAxisAngle(out_axis, q) {
      var rad = Math.acos(q[3]) * 2;
      var s = Math.sin(rad / 2);
      if (s > glMatrix.EPSILON) {
        out_axis[0] = q[0] / s;
        out_axis[1] = q[1] / s;
        out_axis[2] = q[2] / s;
      } else {
        out_axis[0] = 1;
        out_axis[1] = 0;
        out_axis[2] = 0;
      }
      return rad;
    }
    function getAngle(a, b) {
      var dotproduct = dot(a, b);
      return Math.acos(2 * dotproduct * dotproduct - 1);
    }
    function multiply(out, a, b) {
      var ax = a[0], ay = a[1], az = a[2], aw = a[3];
      var bx = b[0], by = b[1], bz = b[2], bw = b[3];
      out[0] = ax * bw + aw * bx + ay * bz - az * by;
      out[1] = ay * bw + aw * by + az * bx - ax * bz;
      out[2] = az * bw + aw * bz + ax * by - ay * bx;
      out[3] = aw * bw - ax * bx - ay * by - az * bz;
      return out;
    }
    function rotateX(out, a, rad) {
      rad *= 0.5;
      var ax = a[0], ay = a[1], az = a[2], aw = a[3];
      var bx = Math.sin(rad), bw = Math.cos(rad);
      out[0] = ax * bw + aw * bx;
      out[1] = ay * bw + az * bx;
      out[2] = az * bw - ay * bx;
      out[3] = aw * bw - ax * bx;
      return out;
    }
    function rotateY(out, a, rad) {
      rad *= 0.5;
      var ax = a[0], ay = a[1], az = a[2], aw = a[3];
      var by = Math.sin(rad), bw = Math.cos(rad);
      out[0] = ax * bw - az * by;
      out[1] = ay * bw + aw * by;
      out[2] = az * bw + ax * by;
      out[3] = aw * bw - ay * by;
      return out;
    }
    function rotateZ(out, a, rad) {
      rad *= 0.5;
      var ax = a[0], ay = a[1], az = a[2], aw = a[3];
      var bz = Math.sin(rad), bw = Math.cos(rad);
      out[0] = ax * bw + ay * bz;
      out[1] = ay * bw - ax * bz;
      out[2] = az * bw + aw * bz;
      out[3] = aw * bw - az * bz;
      return out;
    }
    function calculateW(out, a) {
      var x = a[0], y = a[1], z = a[2];
      out[0] = x;
      out[1] = y;
      out[2] = z;
      out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
      return out;
    }
    function exp(out, a) {
      var x = a[0], y = a[1], z = a[2], w = a[3];
      var r = Math.sqrt(x * x + y * y + z * z);
      var et = Math.exp(w);
      var s = r > 0 ? et * Math.sin(r) / r : 0;
      out[0] = x * s;
      out[1] = y * s;
      out[2] = z * s;
      out[3] = et * Math.cos(r);
      return out;
    }
    function ln(out, a) {
      var x = a[0], y = a[1], z = a[2], w = a[3];
      var r = Math.sqrt(x * x + y * y + z * z);
      var t = r > 0 ? Math.atan2(r, w) / r : 0;
      out[0] = x * t;
      out[1] = y * t;
      out[2] = z * t;
      out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
      return out;
    }
    function pow(out, a, b) {
      ln(out, a);
      scale(out, out, b);
      exp(out, out);
      return out;
    }
    function slerp(out, a, b, t) {
      var ax = a[0], ay = a[1], az = a[2], aw = a[3];
      var bx = b[0], by = b[1], bz = b[2], bw = b[3];
      var omega, cosom, sinom, scale0, scale1;
      cosom = ax * bx + ay * by + az * bz + aw * bw;
      if (cosom < 0) {
        cosom = -cosom;
        bx = -bx;
        by = -by;
        bz = -bz;
        bw = -bw;
      }
      if (1 - cosom > glMatrix.EPSILON) {
        omega = Math.acos(cosom);
        sinom = Math.sin(omega);
        scale0 = Math.sin((1 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
      } else {
        scale0 = 1 - t;
        scale1 = t;
      }
      out[0] = scale0 * ax + scale1 * bx;
      out[1] = scale0 * ay + scale1 * by;
      out[2] = scale0 * az + scale1 * bz;
      out[3] = scale0 * aw + scale1 * bw;
      return out;
    }
    function random(out) {
      var u1 = glMatrix.RANDOM();
      var u2 = glMatrix.RANDOM();
      var u3 = glMatrix.RANDOM();
      var sqrt1MinusU1 = Math.sqrt(1 - u1);
      var sqrtU1 = Math.sqrt(u1);
      out[0] = sqrt1MinusU1 * Math.sin(2 * Math.PI * u2);
      out[1] = sqrt1MinusU1 * Math.cos(2 * Math.PI * u2);
      out[2] = sqrtU1 * Math.sin(2 * Math.PI * u3);
      out[3] = sqrtU1 * Math.cos(2 * Math.PI * u3);
      return out;
    }
    function invert(out, a) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
      var dot2 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
      var invDot = dot2 ? 1 / dot2 : 0;
      out[0] = -a0 * invDot;
      out[1] = -a1 * invDot;
      out[2] = -a2 * invDot;
      out[3] = a3 * invDot;
      return out;
    }
    function conjugate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      out[2] = -a[2];
      out[3] = a[3];
      return out;
    }
    function fromMat3(out, m) {
      var fTrace = m[0] + m[4] + m[8];
      var fRoot;
      if (fTrace > 0) {
        fRoot = Math.sqrt(fTrace + 1);
        out[3] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[0] = (m[5] - m[7]) * fRoot;
        out[1] = (m[6] - m[2]) * fRoot;
        out[2] = (m[1] - m[3]) * fRoot;
      } else {
        var i = 0;
        if (m[4] > m[0]) i = 1;
        if (m[8] > m[i * 3 + i]) i = 2;
        var j = (i + 1) % 3;
        var k = (i + 2) % 3;
        fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
        out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
        out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
      }
      return out;
    }
    function fromEuler(out, x, y, z) {
      var order = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : glMatrix.ANGLE_ORDER;
      var halfToRad = Math.PI / 360;
      x *= halfToRad;
      z *= halfToRad;
      y *= halfToRad;
      var sx = Math.sin(x);
      var cx = Math.cos(x);
      var sy = Math.sin(y);
      var cy = Math.cos(y);
      var sz = Math.sin(z);
      var cz = Math.cos(z);
      switch (order) {
        case "xyz":
          out[0] = sx * cy * cz + cx * sy * sz;
          out[1] = cx * sy * cz - sx * cy * sz;
          out[2] = cx * cy * sz + sx * sy * cz;
          out[3] = cx * cy * cz - sx * sy * sz;
          break;
        case "xzy":
          out[0] = sx * cy * cz - cx * sy * sz;
          out[1] = cx * sy * cz - sx * cy * sz;
          out[2] = cx * cy * sz + sx * sy * cz;
          out[3] = cx * cy * cz + sx * sy * sz;
          break;
        case "yxz":
          out[0] = sx * cy * cz + cx * sy * sz;
          out[1] = cx * sy * cz - sx * cy * sz;
          out[2] = cx * cy * sz - sx * sy * cz;
          out[3] = cx * cy * cz + sx * sy * sz;
          break;
        case "yzx":
          out[0] = sx * cy * cz + cx * sy * sz;
          out[1] = cx * sy * cz + sx * cy * sz;
          out[2] = cx * cy * sz - sx * sy * cz;
          out[3] = cx * cy * cz - sx * sy * sz;
          break;
        case "zxy":
          out[0] = sx * cy * cz - cx * sy * sz;
          out[1] = cx * sy * cz + sx * cy * sz;
          out[2] = cx * cy * sz + sx * sy * cz;
          out[3] = cx * cy * cz - sx * sy * sz;
          break;
        case "zyx":
          out[0] = sx * cy * cz - cx * sy * sz;
          out[1] = cx * sy * cz + sx * cy * sz;
          out[2] = cx * cy * sz - sx * sy * cz;
          out[3] = cx * cy * cz + sx * sy * sz;
          break;
        default:
          throw new Error("Unknown angle order " + order);
      }
      return out;
    }
    function str(a) {
      return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
    }
    var clone = exports.clone = vec4.clone;
    var fromValues = exports.fromValues = vec4.fromValues;
    var copy = exports.copy = vec4.copy;
    var set = exports.set = vec4.set;
    var add = exports.add = vec4.add;
    var mul = exports.mul = multiply;
    var scale = exports.scale = vec4.scale;
    var dot = exports.dot = vec4.dot;
    var lerp = exports.lerp = vec4.lerp;
    var length = exports.length = vec4.length;
    var len = exports.len = length;
    var squaredLength = exports.squaredLength = vec4.squaredLength;
    var sqrLen = exports.sqrLen = squaredLength;
    var normalize = exports.normalize = vec4.normalize;
    var exactEquals = exports.exactEquals = vec4.exactEquals;
    function equals(a, b) {
      return Math.abs(vec4.dot(a, b)) >= 1 - glMatrix.EPSILON;
    }
    var rotationTo = exports.rotationTo = (function() {
      var tmpvec3 = vec321.create();
      var xUnitVec3 = vec321.fromValues(1, 0, 0);
      var yUnitVec3 = vec321.fromValues(0, 1, 0);
      return function(out, a, b) {
        var dot2 = vec321.dot(a, b);
        if (dot2 < -0.999999) {
          vec321.cross(tmpvec3, xUnitVec3, a);
          if (vec321.len(tmpvec3) < 1e-6) vec321.cross(tmpvec3, yUnitVec3, a);
          vec321.normalize(tmpvec3, tmpvec3);
          setAxisAngle(out, tmpvec3, Math.PI);
          return out;
        } else if (dot2 > 0.999999) {
          out[0] = 0;
          out[1] = 0;
          out[2] = 0;
          out[3] = 1;
          return out;
        } else {
          vec321.cross(tmpvec3, a, b);
          out[0] = tmpvec3[0];
          out[1] = tmpvec3[1];
          out[2] = tmpvec3[2];
          out[3] = 1 + dot2;
          return normalize(out, out);
        }
      };
    })();
    var sqlerp = exports.sqlerp = (function() {
      var temp1 = create();
      var temp2 = create();
      return function(out, a, b, c, d, t) {
        slerp(temp1, a, d, t);
        slerp(temp2, b, c, t);
        slerp(out, temp1, temp2, 2 * t * (1 - t));
        return out;
      };
    })();
    var setAxes = exports.setAxes = (function() {
      var matr = mat3.create();
      return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];
        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];
        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];
        return normalize(out, fromMat3(out, matr));
      };
    })();
  }
});

// node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/quat2.js
var require_quat2 = __commonJS({
  "node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/quat2.js"(exports) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.add = add;
    exports.clone = clone;
    exports.conjugate = conjugate;
    exports.copy = copy;
    exports.create = create;
    exports.dot = void 0;
    exports.equals = equals;
    exports.exactEquals = exactEquals;
    exports.fromMat4 = fromMat4;
    exports.fromRotation = fromRotation;
    exports.fromRotationTranslation = fromRotationTranslation;
    exports.fromRotationTranslationValues = fromRotationTranslationValues;
    exports.fromTranslation = fromTranslation;
    exports.fromValues = fromValues;
    exports.getDual = getDual;
    exports.getReal = void 0;
    exports.getTranslation = getTranslation;
    exports.identity = identity;
    exports.invert = invert;
    exports.length = exports.len = void 0;
    exports.lerp = lerp;
    exports.mul = void 0;
    exports.multiply = multiply;
    exports.normalize = normalize;
    exports.rotateAroundAxis = rotateAroundAxis;
    exports.rotateByQuatAppend = rotateByQuatAppend;
    exports.rotateByQuatPrepend = rotateByQuatPrepend;
    exports.rotateX = rotateX;
    exports.rotateY = rotateY;
    exports.rotateZ = rotateZ;
    exports.scale = scale;
    exports.set = set;
    exports.setDual = setDual;
    exports.squaredLength = exports.sqrLen = exports.setReal = void 0;
    exports.str = str;
    exports.translate = translate;
    var glMatrix = _interopRequireWildcard(require_common());
    var quat = _interopRequireWildcard(require_quat());
    var mat4 = _interopRequireWildcard(require_mat4());
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, "default": e2 };
        if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (var _t in e2) "default" !== _t && {}.hasOwnProperty.call(e2, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e2[_t]);
        return f;
      })(e, t);
    }
    function create() {
      var dq = new glMatrix.ARRAY_TYPE(8);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        dq[0] = 0;
        dq[1] = 0;
        dq[2] = 0;
        dq[4] = 0;
        dq[5] = 0;
        dq[6] = 0;
        dq[7] = 0;
      }
      dq[3] = 1;
      return dq;
    }
    function clone(a) {
      var dq = new glMatrix.ARRAY_TYPE(8);
      dq[0] = a[0];
      dq[1] = a[1];
      dq[2] = a[2];
      dq[3] = a[3];
      dq[4] = a[4];
      dq[5] = a[5];
      dq[6] = a[6];
      dq[7] = a[7];
      return dq;
    }
    function fromValues(x1, y1, z1, w1, x2, y2, z2, w2) {
      var dq = new glMatrix.ARRAY_TYPE(8);
      dq[0] = x1;
      dq[1] = y1;
      dq[2] = z1;
      dq[3] = w1;
      dq[4] = x2;
      dq[5] = y2;
      dq[6] = z2;
      dq[7] = w2;
      return dq;
    }
    function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
      var dq = new glMatrix.ARRAY_TYPE(8);
      dq[0] = x1;
      dq[1] = y1;
      dq[2] = z1;
      dq[3] = w1;
      var ax = x2 * 0.5, ay = y2 * 0.5, az = z2 * 0.5;
      dq[4] = ax * w1 + ay * z1 - az * y1;
      dq[5] = ay * w1 + az * x1 - ax * z1;
      dq[6] = az * w1 + ax * y1 - ay * x1;
      dq[7] = -ax * x1 - ay * y1 - az * z1;
      return dq;
    }
    function fromRotationTranslation(out, q, t) {
      var ax = t[0] * 0.5, ay = t[1] * 0.5, az = t[2] * 0.5, bx = q[0], by = q[1], bz = q[2], bw = q[3];
      out[0] = bx;
      out[1] = by;
      out[2] = bz;
      out[3] = bw;
      out[4] = ax * bw + ay * bz - az * by;
      out[5] = ay * bw + az * bx - ax * bz;
      out[6] = az * bw + ax * by - ay * bx;
      out[7] = -ax * bx - ay * by - az * bz;
      return out;
    }
    function fromTranslation(out, t) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      out[4] = t[0] * 0.5;
      out[5] = t[1] * 0.5;
      out[6] = t[2] * 0.5;
      out[7] = 0;
      return out;
    }
    function fromRotation(out, q) {
      out[0] = q[0];
      out[1] = q[1];
      out[2] = q[2];
      out[3] = q[3];
      out[4] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
      return out;
    }
    function fromMat4(out, a) {
      var outer = quat.create();
      mat4.getRotation(outer, a);
      var t = new glMatrix.ARRAY_TYPE(3);
      mat4.getTranslation(t, a);
      fromRotationTranslation(out, outer, t);
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      return out;
    }
    function identity(out) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      out[4] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
      return out;
    }
    function set(out, x1, y1, z1, w1, x2, y2, z2, w2) {
      out[0] = x1;
      out[1] = y1;
      out[2] = z1;
      out[3] = w1;
      out[4] = x2;
      out[5] = y2;
      out[6] = z2;
      out[7] = w2;
      return out;
    }
    var getReal = exports.getReal = quat.copy;
    function getDual(out, a) {
      out[0] = a[4];
      out[1] = a[5];
      out[2] = a[6];
      out[3] = a[7];
      return out;
    }
    var setReal = exports.setReal = quat.copy;
    function setDual(out, q) {
      out[4] = q[0];
      out[5] = q[1];
      out[6] = q[2];
      out[7] = q[3];
      return out;
    }
    function getTranslation(out, a) {
      var ax = a[4], ay = a[5], az = a[6], aw = a[7], bx = -a[0], by = -a[1], bz = -a[2], bw = a[3];
      out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
      out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
      out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
      return out;
    }
    function translate(out, a, v) {
      var ax1 = a[0], ay1 = a[1], az1 = a[2], aw1 = a[3], bx1 = v[0] * 0.5, by1 = v[1] * 0.5, bz1 = v[2] * 0.5, ax2 = a[4], ay2 = a[5], az2 = a[6], aw2 = a[7];
      out[0] = ax1;
      out[1] = ay1;
      out[2] = az1;
      out[3] = aw1;
      out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
      out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
      out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
      out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
      return out;
    }
    function rotateX(out, a, rad) {
      var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
      quat.rotateX(out, a, rad);
      bx = out[0];
      by = out[1];
      bz = out[2];
      bw = out[3];
      out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
      out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
      out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
      out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
      return out;
    }
    function rotateY(out, a, rad) {
      var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
      quat.rotateY(out, a, rad);
      bx = out[0];
      by = out[1];
      bz = out[2];
      bw = out[3];
      out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
      out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
      out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
      out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
      return out;
    }
    function rotateZ(out, a, rad) {
      var bx = -a[0], by = -a[1], bz = -a[2], bw = a[3], ax = a[4], ay = a[5], az = a[6], aw = a[7], ax1 = ax * bw + aw * bx + ay * bz - az * by, ay1 = ay * bw + aw * by + az * bx - ax * bz, az1 = az * bw + aw * bz + ax * by - ay * bx, aw1 = aw * bw - ax * bx - ay * by - az * bz;
      quat.rotateZ(out, a, rad);
      bx = out[0];
      by = out[1];
      bz = out[2];
      bw = out[3];
      out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
      out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
      out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
      out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
      return out;
    }
    function rotateByQuatAppend(out, a, q) {
      var qx = q[0], qy = q[1], qz = q[2], qw = q[3], ax = a[0], ay = a[1], az = a[2], aw = a[3];
      out[0] = ax * qw + aw * qx + ay * qz - az * qy;
      out[1] = ay * qw + aw * qy + az * qx - ax * qz;
      out[2] = az * qw + aw * qz + ax * qy - ay * qx;
      out[3] = aw * qw - ax * qx - ay * qy - az * qz;
      ax = a[4];
      ay = a[5];
      az = a[6];
      aw = a[7];
      out[4] = ax * qw + aw * qx + ay * qz - az * qy;
      out[5] = ay * qw + aw * qy + az * qx - ax * qz;
      out[6] = az * qw + aw * qz + ax * qy - ay * qx;
      out[7] = aw * qw - ax * qx - ay * qy - az * qz;
      return out;
    }
    function rotateByQuatPrepend(out, q, a) {
      var qx = q[0], qy = q[1], qz = q[2], qw = q[3], bx = a[0], by = a[1], bz = a[2], bw = a[3];
      out[0] = qx * bw + qw * bx + qy * bz - qz * by;
      out[1] = qy * bw + qw * by + qz * bx - qx * bz;
      out[2] = qz * bw + qw * bz + qx * by - qy * bx;
      out[3] = qw * bw - qx * bx - qy * by - qz * bz;
      bx = a[4];
      by = a[5];
      bz = a[6];
      bw = a[7];
      out[4] = qx * bw + qw * bx + qy * bz - qz * by;
      out[5] = qy * bw + qw * by + qz * bx - qx * bz;
      out[6] = qz * bw + qw * bz + qx * by - qy * bx;
      out[7] = qw * bw - qx * bx - qy * by - qz * bz;
      return out;
    }
    function rotateAroundAxis(out, a, axis, rad) {
      if (Math.abs(rad) < glMatrix.EPSILON) {
        return copy(out, a);
      }
      var axisLength = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
      rad = rad * 0.5;
      var s = Math.sin(rad);
      var bx = s * axis[0] / axisLength;
      var by = s * axis[1] / axisLength;
      var bz = s * axis[2] / axisLength;
      var bw = Math.cos(rad);
      var ax1 = a[0], ay1 = a[1], az1 = a[2], aw1 = a[3];
      out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
      out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
      out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
      out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
      var ax = a[4], ay = a[5], az = a[6], aw = a[7];
      out[4] = ax * bw + aw * bx + ay * bz - az * by;
      out[5] = ay * bw + aw * by + az * bx - ax * bz;
      out[6] = az * bw + aw * bz + ax * by - ay * bx;
      out[7] = aw * bw - ax * bx - ay * by - az * bz;
      return out;
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      out[4] = a[4] + b[4];
      out[5] = a[5] + b[5];
      out[6] = a[6] + b[6];
      out[7] = a[7] + b[7];
      return out;
    }
    function multiply(out, a, b) {
      var ax0 = a[0], ay0 = a[1], az0 = a[2], aw0 = a[3], bx1 = b[4], by1 = b[5], bz1 = b[6], bw1 = b[7], ax1 = a[4], ay1 = a[5], az1 = a[6], aw1 = a[7], bx0 = b[0], by0 = b[1], bz0 = b[2], bw0 = b[3];
      out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
      out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
      out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
      out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
      out[4] = ax0 * bw1 + aw0 * bx1 + ay0 * bz1 - az0 * by1 + ax1 * bw0 + aw1 * bx0 + ay1 * bz0 - az1 * by0;
      out[5] = ay0 * bw1 + aw0 * by1 + az0 * bx1 - ax0 * bz1 + ay1 * bw0 + aw1 * by0 + az1 * bx0 - ax1 * bz0;
      out[6] = az0 * bw1 + aw0 * bz1 + ax0 * by1 - ay0 * bx1 + az1 * bw0 + aw1 * bz0 + ax1 * by0 - ay1 * bx0;
      out[7] = aw0 * bw1 - ax0 * bx1 - ay0 * by1 - az0 * bz1 + aw1 * bw0 - ax1 * bx0 - ay1 * by0 - az1 * bz0;
      return out;
    }
    var mul = exports.mul = multiply;
    function scale(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      out[4] = a[4] * b;
      out[5] = a[5] * b;
      out[6] = a[6] * b;
      out[7] = a[7] * b;
      return out;
    }
    var dot = exports.dot = quat.dot;
    function lerp(out, a, b, t) {
      var mt = 1 - t;
      if (dot(a, b) < 0) t = -t;
      out[0] = a[0] * mt + b[0] * t;
      out[1] = a[1] * mt + b[1] * t;
      out[2] = a[2] * mt + b[2] * t;
      out[3] = a[3] * mt + b[3] * t;
      out[4] = a[4] * mt + b[4] * t;
      out[5] = a[5] * mt + b[5] * t;
      out[6] = a[6] * mt + b[6] * t;
      out[7] = a[7] * mt + b[7] * t;
      return out;
    }
    function invert(out, a) {
      var sqlen = squaredLength(a);
      out[0] = -a[0] / sqlen;
      out[1] = -a[1] / sqlen;
      out[2] = -a[2] / sqlen;
      out[3] = a[3] / sqlen;
      out[4] = -a[4] / sqlen;
      out[5] = -a[5] / sqlen;
      out[6] = -a[6] / sqlen;
      out[7] = a[7] / sqlen;
      return out;
    }
    function conjugate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      out[2] = -a[2];
      out[3] = a[3];
      out[4] = -a[4];
      out[5] = -a[5];
      out[6] = -a[6];
      out[7] = a[7];
      return out;
    }
    var length = exports.length = quat.length;
    var len = exports.len = length;
    var squaredLength = exports.squaredLength = quat.squaredLength;
    var sqrLen = exports.sqrLen = squaredLength;
    function normalize(out, a) {
      var magnitude = squaredLength(a);
      if (magnitude > 0) {
        magnitude = Math.sqrt(magnitude);
        var a0 = a[0] / magnitude;
        var a1 = a[1] / magnitude;
        var a2 = a[2] / magnitude;
        var a3 = a[3] / magnitude;
        var b0 = a[4];
        var b1 = a[5];
        var b2 = a[6];
        var b3 = a[7];
        var a_dot_b = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;
        out[0] = a0;
        out[1] = a1;
        out[2] = a2;
        out[3] = a3;
        out[4] = (b0 - a0 * a_dot_b) / magnitude;
        out[5] = (b1 - a1 * a_dot_b) / magnitude;
        out[6] = (b2 - a2 * a_dot_b) / magnitude;
        out[7] = (b3 - a3 * a_dot_b) / magnitude;
      }
      return out;
    }
    function str(a) {
      return "quat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ")";
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
      var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1, Math.abs(a7), Math.abs(b7));
    }
  }
});

// node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/vec2.js
var require_vec2 = __commonJS({
  "node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/vec2.js"(exports) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.add = add;
    exports.angle = angle;
    exports.ceil = ceil;
    exports.clone = clone;
    exports.copy = copy;
    exports.create = create;
    exports.cross = cross;
    exports.dist = void 0;
    exports.distance = distance;
    exports.div = void 0;
    exports.divide = divide;
    exports.dot = dot;
    exports.equals = equals;
    exports.exactEquals = exactEquals;
    exports.floor = floor;
    exports.forEach = void 0;
    exports.fromValues = fromValues;
    exports.inverse = inverse;
    exports.len = void 0;
    exports.length = length;
    exports.lerp = lerp;
    exports.max = max;
    exports.min = min;
    exports.mul = void 0;
    exports.multiply = multiply;
    exports.negate = negate;
    exports.normalize = normalize;
    exports.random = random;
    exports.rotate = rotate;
    exports.round = round;
    exports.scale = scale;
    exports.scaleAndAdd = scaleAndAdd;
    exports.set = set;
    exports.signedAngle = signedAngle;
    exports.sqrLen = exports.sqrDist = void 0;
    exports.squaredDistance = squaredDistance;
    exports.squaredLength = squaredLength;
    exports.str = str;
    exports.sub = void 0;
    exports.subtract = subtract;
    exports.transformMat2 = transformMat2;
    exports.transformMat2d = transformMat2d;
    exports.transformMat3 = transformMat3;
    exports.transformMat4 = transformMat4;
    exports.zero = zero;
    var glMatrix = _interopRequireWildcard(require_common());
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, "default": e2 };
        if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (var _t in e2) "default" !== _t && {}.hasOwnProperty.call(e2, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e2[_t]);
        return f;
      })(e, t);
    }
    function create() {
      var out = new glMatrix.ARRAY_TYPE(2);
      if (glMatrix.ARRAY_TYPE != Float32Array) {
        out[0] = 0;
        out[1] = 0;
      }
      return out;
    }
    function clone(a) {
      var out = new glMatrix.ARRAY_TYPE(2);
      out[0] = a[0];
      out[1] = a[1];
      return out;
    }
    function fromValues(x, y) {
      var out = new glMatrix.ARRAY_TYPE(2);
      out[0] = x;
      out[1] = y;
      return out;
    }
    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      return out;
    }
    function set(out, x, y) {
      out[0] = x;
      out[1] = y;
      return out;
    }
    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      return out;
    }
    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      return out;
    }
    function multiply(out, a, b) {
      out[0] = a[0] * b[0];
      out[1] = a[1] * b[1];
      return out;
    }
    function divide(out, a, b) {
      out[0] = a[0] / b[0];
      out[1] = a[1] / b[1];
      return out;
    }
    function ceil(out, a) {
      out[0] = Math.ceil(a[0]);
      out[1] = Math.ceil(a[1]);
      return out;
    }
    function floor(out, a) {
      out[0] = Math.floor(a[0]);
      out[1] = Math.floor(a[1]);
      return out;
    }
    function min(out, a, b) {
      out[0] = Math.min(a[0], b[0]);
      out[1] = Math.min(a[1], b[1]);
      return out;
    }
    function max(out, a, b) {
      out[0] = Math.max(a[0], b[0]);
      out[1] = Math.max(a[1], b[1]);
      return out;
    }
    function round(out, a) {
      out[0] = glMatrix.round(a[0]);
      out[1] = glMatrix.round(a[1]);
      return out;
    }
    function scale(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      return out;
    }
    function scaleAndAdd(out, a, b, scale2) {
      out[0] = a[0] + b[0] * scale2;
      out[1] = a[1] + b[1] * scale2;
      return out;
    }
    function distance(a, b) {
      var x = b[0] - a[0], y = b[1] - a[1];
      return Math.sqrt(x * x + y * y);
    }
    function squaredDistance(a, b) {
      var x = b[0] - a[0], y = b[1] - a[1];
      return x * x + y * y;
    }
    function length(a) {
      var x = a[0], y = a[1];
      return Math.sqrt(x * x + y * y);
    }
    function squaredLength(a) {
      var x = a[0], y = a[1];
      return x * x + y * y;
    }
    function negate(out, a) {
      out[0] = -a[0];
      out[1] = -a[1];
      return out;
    }
    function inverse(out, a) {
      out[0] = 1 / a[0];
      out[1] = 1 / a[1];
      return out;
    }
    function normalize(out, a) {
      var x = a[0], y = a[1];
      var len2 = x * x + y * y;
      if (len2 > 0) {
        len2 = 1 / Math.sqrt(len2);
      }
      out[0] = a[0] * len2;
      out[1] = a[1] * len2;
      return out;
    }
    function dot(a, b) {
      return a[0] * b[0] + a[1] * b[1];
    }
    function cross(out, a, b) {
      var z = a[0] * b[1] - a[1] * b[0];
      out[0] = out[1] = 0;
      out[2] = z;
      return out;
    }
    function lerp(out, a, b, t) {
      var ax = a[0], ay = a[1];
      out[0] = ax + t * (b[0] - ax);
      out[1] = ay + t * (b[1] - ay);
      return out;
    }
    function random(out, scale2) {
      scale2 = scale2 === void 0 ? 1 : scale2;
      var r = glMatrix.RANDOM() * 2 * Math.PI;
      out[0] = Math.cos(r) * scale2;
      out[1] = Math.sin(r) * scale2;
      return out;
    }
    function transformMat2(out, a, m) {
      var x = a[0], y = a[1];
      out[0] = m[0] * x + m[2] * y;
      out[1] = m[1] * x + m[3] * y;
      return out;
    }
    function transformMat2d(out, a, m) {
      var x = a[0], y = a[1];
      out[0] = m[0] * x + m[2] * y + m[4];
      out[1] = m[1] * x + m[3] * y + m[5];
      return out;
    }
    function transformMat3(out, a, m) {
      var x = a[0], y = a[1];
      out[0] = m[0] * x + m[3] * y + m[6];
      out[1] = m[1] * x + m[4] * y + m[7];
      return out;
    }
    function transformMat4(out, a, m) {
      var x = a[0];
      var y = a[1];
      out[0] = m[0] * x + m[4] * y + m[12];
      out[1] = m[1] * x + m[5] * y + m[13];
      return out;
    }
    function rotate(out, a, b, rad) {
      var p0 = a[0] - b[0], p1 = a[1] - b[1], sinC = Math.sin(rad), cosC = Math.cos(rad);
      out[0] = p0 * cosC - p1 * sinC + b[0];
      out[1] = p0 * sinC + p1 * cosC + b[1];
      return out;
    }
    function angle(a, b) {
      var ax = a[0], ay = a[1], bx = b[0], by = b[1];
      return Math.abs(Math.atan2(ay * bx - ax * by, ax * bx + ay * by));
    }
    function signedAngle(a, b) {
      var ax = a[0], ay = a[1], bx = b[0], by = b[1];
      return Math.atan2(ax * by - ay * bx, ax * bx + ay * by);
    }
    function zero(out) {
      out[0] = 0;
      out[1] = 0;
      return out;
    }
    function str(a) {
      return "vec2(" + a[0] + ", " + a[1] + ")";
    }
    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1];
    }
    function equals(a, b) {
      var a0 = a[0], a1 = a[1];
      var b0 = b[0], b1 = b[1];
      return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1));
    }
    var len = exports.len = length;
    var sub = exports.sub = subtract;
    var mul = exports.mul = multiply;
    var div = exports.div = divide;
    var dist = exports.dist = distance;
    var sqrDist = exports.sqrDist = squaredDistance;
    var sqrLen = exports.sqrLen = squaredLength;
    var forEach = exports.forEach = (function() {
      var vec = create();
      return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
          stride = 2;
        }
        if (!offset) {
          offset = 0;
        }
        if (count) {
          l = Math.min(count * stride + offset, a.length);
        } else {
          l = a.length;
        }
        for (i = offset; i < l; i += stride) {
          vec[0] = a[i];
          vec[1] = a[i + 1];
          fn(vec, vec, arg);
          a[i] = vec[0];
          a[i + 1] = vec[1];
        }
        return a;
      };
    })();
  }
});

// node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/.pnpm/gl-matrix@3.4.4/node_modules/gl-matrix/cjs/index.js"(exports) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.vec4 = exports.vec3 = exports.vec2 = exports.quat2 = exports.quat = exports.mat4 = exports.mat3 = exports.mat2d = exports.mat2 = exports.glMatrix = void 0;
    var glMatrix = _interopRequireWildcard(require_common());
    exports.glMatrix = glMatrix;
    var mat2 = _interopRequireWildcard(require_mat2());
    exports.mat2 = mat2;
    var mat2d = _interopRequireWildcard(require_mat2d());
    exports.mat2d = mat2d;
    var mat3 = _interopRequireWildcard(require_mat3());
    exports.mat3 = mat3;
    var mat4 = _interopRequireWildcard(require_mat4());
    exports.mat4 = mat4;
    var quat = _interopRequireWildcard(require_quat());
    exports.quat = quat;
    var quat2 = _interopRequireWildcard(require_quat2());
    exports.quat2 = quat2;
    var vec2 = _interopRequireWildcard(require_vec2());
    exports.vec2 = vec2;
    var vec321 = _interopRequireWildcard(require_vec3());
    exports.vec3 = vec321;
    var vec4 = _interopRequireWildcard(require_vec4());
    exports.vec4 = vec4;
    function _interopRequireWildcard(e, t) {
      if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
      return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
        if (!t2 && e2 && e2.__esModule) return e2;
        var o, i, f = { __proto__: null, "default": e2 };
        if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
        if (o = t2 ? n : r) {
          if (o.has(e2)) return o.get(e2);
          o.set(e2, f);
        }
        for (var _t in e2) "default" !== _t && {}.hasOwnProperty.call(e2, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e2[_t]);
        return f;
      })(e, t);
    }
  }
});

// src/bp/scripts/core/block_components/air_conditioner.ts
import * as mc from "@minecraft/server";
var playSound = (block) => {
  const locStr = `${block.x} ${block.y} ${block.z}`;
  block.dimension.runCommand(
    `execute positioned ${locStr} run playsound scpdt.air_conditioner @a[r=16] ~~~`
  );
};
mc.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:air_conditioner", {
    onPlayerInteract(arg) {
      const isOn = arg.block.permutation.getState("air_conditioner:on") === true;
      arg.block.setPermutation(arg.block.permutation.withState("air_conditioner:on", !isOn));
      if (!isOn) {
        playSound(arg.block);
      }
    },
    onTick(arg) {
      const isOn = arg.block.permutation.getState("air_conditioner:on") === true;
      if (!isOn) return;
      playSound(arg.block);
    }
  });
});

// src/bp/scripts/core/block_components/alarm.ts
import * as mc2 from "@minecraft/server";
var playSound2 = (block) => {
  const locStr = `${block.x} ${block.y} ${block.z}`;
  block.dimension.runCommand(`execute positioned ${locStr} run playsound scpdt.alarm @a[r=16] ~~~`);
};
mc2.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:alarm", {
    onPlayerInteract(arg) {
      const alarmState = Number(arg.block.permutation.getState("alarm:states"));
      arg.block.setPermutation(
        arg.block.permutation.withState("alarm:states", alarmState === 1 ? 2 : 1)
      );
      if (alarmState === 1) {
        playSound2(arg.block);
      }
    },
    onTick(arg) {
      const alarmState = Number(arg.block.permutation.getState("alarm:states"));
      if (alarmState !== 2) return;
      playSound2(arg.block);
    }
  });
});

// src/bp/scripts/lib/wrench.ts
import * as mc3 from "@minecraft/server";
var isHoldingWrench = (player, checkOffhand = true) => {
  if (!player.isValid) return false;
  const equippable = player.getComponent("equippable");
  if (!equippable) return false;
  const test = (itemStack) => {
    if (!itemStack) return false;
    if (itemStack.hasTag("lc:wrench")) return true;
    if (itemStack.typeId === "sra:hammer") return true;
    return false;
  };
  if (test(equippable.getEquipment(mc3.EquipmentSlot.Mainhand))) return true;
  if (checkOffhand && test(equippable.getEquipment(mc3.EquipmentSlot.Offhand))) return true;
  return false;
};

// src/bp/scripts/core/block_components/big_number_sign.ts
import * as mc4 from "@minecraft/server";
mc4.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:big_number_sign", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      const hasWrench = isHoldingWrench(player);
      if (!hasWrench) return;
      const state = Number(block.permutation.getState("sign:state"));
      const nextState = (state + 1) % 10;
      block.setPermutation(block.permutation.withState("sign:state", nextState));
    }
  });
});

// src/bp/scripts/lib/clearance_level.ts
import * as mc5 from "@minecraft/server";
function getClearanceLevel(itemStack) {
  if (!itemStack) return -1;
  if (itemStack.hasTag("lc:keycard_o5")) return 6;
  if (itemStack.hasTag("lc:keycard_lvl5")) return 5;
  if (itemStack.hasTag("lc:keycard_lvl4")) return 4;
  if (itemStack.hasTag("lc:keycard_lvl3")) return 3;
  if (itemStack.hasTag("lc:keycard_lvl2")) return 2;
  if (itemStack.hasTag("lc:keycard_lvl1")) return 1;
  if (itemStack.hasTag("lc:keycard_lvl0")) return 0;
  if (itemStack.typeId.startsWith("sra")) {
    switch (itemStack.typeId) {
      case "scp:cf_o5_keycard":
      case "sra:classified_o5_keycard":
        return 6;
      case "scp:cf_omni_keycard":
      case "scp:cf_lvl_5_keycard":
      case "sra:classified_omni_keycard":
      case "sra:classified_lvl_5_keycard":
        return 5;
      case "scp:cf_lvl_4_keycard":
      case "sra:classified_lvl_4_keycard":
        return 4;
      case "scp:cf_lvl_3_keycard":
      case "sra:classified_lvl_3_keycard":
        return 3;
      case "scp:cf_lvl_2_keycard":
      case "sra:classified_lvl_2_keycard":
        return 2;
      case "scp:cf_lvl_1_keycard":
      case "sra:classified_lvl_1_keycard":
        return 1;
      case "scp:cf_lvl_0_keycard":
      case "sra:containment_box_keycard":
        return 0;
      default:
        return -1;
    }
  }
  return -1;
}
function getEntityClearanceLevel(target) {
  if (!target.isValid) return -1;
  if (target instanceof mc5.Player) {
    const inventory = target.getComponent("inventory");
    if (inventory) {
      for (let i = 0; i < inventory.container.size; i++) {
        const slot = inventory.container.getSlot(i);
        const foundScp005 = slot.hasItem() && slot.typeId === "lc:scpdy_scp005";
        if (foundScp005) return 6;
      }
    }
    const equippable = target.getComponent("equippable");
    if (equippable) {
      const mainhandCl = getClearanceLevel(equippable.getEquipment(mc5.EquipmentSlot.Mainhand));
      const offhandCl = getClearanceLevel(equippable.getEquipment(mc5.EquipmentSlot.Offhand));
      const maxCl = Math.max(mainhandCl, offhandCl);
      if (maxCl !== -1) return maxCl;
    }
    return -1;
  }
  return -1;
}

// src/bp/scripts/lib/direction.ts
import * as mc6 from "@minecraft/server";
var LEGACY_FACING_DIRECTION_INDEX = {
  down: 0,
  up: 1,
  north: 2,
  east: 5,
  south: 3,
  west: 4
};
var getLegacyFacingDirectionIndex = (permutation) => permutation.getState("facing:direction");
var convertLegacyFacingDirectionToDir = (facingDirection) => {
  switch (facingDirection) {
    default:
    case 0:
      return mc6.Direction.Down;
    case 1:
      return mc6.Direction.Up;
    case 2:
      return mc6.Direction.North;
    case 5:
      return mc6.Direction.East;
    case 3:
      return mc6.Direction.South;
    case 4:
      return mc6.Direction.West;
  }
};
var getBlockCardinalDirection = (permutation) => {
  const blockDir = permutation.getState("minecraft:cardinal_direction");
  switch (blockDir) {
    case "north":
      return mc6.Direction.North;
    case "south":
      return mc6.Direction.South;
    case "west":
      return mc6.Direction.West;
    case "east":
      return mc6.Direction.East;
  }
  return void 0;
};

// node_modules/.pnpm/@mcbe-toolbox-lc+sukuriputi_e8bf1daa538a71c1d4d656887a67266a/node_modules/@mcbe-toolbox-lc/sukuriputils/dist/server/index.js
import * as mc7 from "@minecraft/server";
import * as mc22 from "@minecraft/server";
import * as mc32 from "@minecraft/server";
import "@minecraft/server";
import * as mc52 from "@minecraft/server";
var runCommandAtBlock = (block, command) => {
  const { x, y, z } = block.center();
  const location = `${x} ${y} ${z}`;
  const finalCommand = `execute positioned ${location} run ${command}`;
  return block.dimension.runCommand(finalCommand);
};
var reverseDirection = (direction) => {
  switch (direction) {
    case mc32.Direction.Up:
      return mc32.Direction.Down;
    case mc32.Direction.Down:
      return mc32.Direction.Up;
    case mc32.Direction.North:
      return mc32.Direction.South;
    case mc32.Direction.East:
      return mc32.Direction.West;
    case mc32.Direction.South:
      return mc32.Direction.North;
    case mc32.Direction.West:
      return mc32.Direction.East;
    default:
      return mc32.Direction.North;
  }
};
var directionToRotation = (direction) => {
  switch (direction) {
    case mc32.Direction.Up:
      return { x: -90, y: 0 };
    case mc32.Direction.Down:
      return { x: 90, y: 0 };
    case mc32.Direction.South:
      return { x: 0, y: 0 };
    case mc32.Direction.West:
      return { x: 0, y: 90 };
    case mc32.Direction.North:
      return { x: 0, y: 180 };
    case mc32.Direction.East:
      return { x: 0, y: -90 };
    default:
      return { x: 0, y: 0 };
  }
};
var isPlayerCreativeOrSpectator = (player) => {
  const gameMode = player.getGameMode();
  return gameMode === mc52.GameMode.Creative || gameMode === mc52.GameMode.Spectator;
};

// src/bp/scripts/core/block_components/blast_door.ts
import * as mc8 from "@minecraft/server";
var onRemoveDoorEntity = (entity) => {
  entity.setDynamicProperty("dontHandleRemoval", true);
  entity.runCommand("fill ^-2 ^2 ^ ^2 ^0 ^ air replace lc:dt_door_dummy");
};
var getDoorEntityAtBlock = (block, player) => {
  const doorEntity = block.dimension.getEntities({
    closest: 1,
    type: "lc:dt_blast_door_e",
    location: block.bottomCenter(),
    maxDistance: 0.3
  })[0];
  if (doorEntity) return doorEntity;
  player?.sendMessage({ translate: "dt.guide.blast_door_v2.entity_not_found" });
  player?.playSound("scpdt.fart");
};
var onBreak = (block, player) => {
  const doorEntity = getDoorEntityAtBlock(block, player);
  if (!doorEntity) return;
  mc8.system.run(() => {
    try {
      doorEntity.remove();
    } catch {
    }
  });
  const dontHandleRemoval = !!doorEntity.getDynamicProperty("dontHandleRemoval");
  if (dontHandleRemoval) return;
  onRemoveDoorEntity(doorEntity);
};
mc8.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:blast_door", {
    onPlace({ block, dimension }, arg1) {
      const params = arg1.params;
      const dir = getBlockCardinalDirection(block.permutation);
      const shouldRotate = dir === mc8.Direction.East || dir === mc8.Direction.West;
      const entityYaw = shouldRotate ? 90 : 0;
      const entity = dimension.spawnEntity("lc:dt_blast_door_e", block.bottomCenter());
      entity.setRotation({ x: 0, y: entityYaw });
      entity.setProperty("scpdt:clearance_level", params.clearanceLevel);
      entity.setProperty("scpdt:is_rotated", shouldRotate);
    },
    onPlayerBreak({ block, dimension, brokenBlockPermutation, player }) {
      const shouldDropItem = mc8.world.gameRules.doTileDrops && player && !isPlayerCreativeOrSpectator(player);
      if (shouldDropItem) {
        const itemStackToDrop = new mc8.ItemStack(brokenBlockPermutation.type.id, 1);
        dimension.spawnItem(itemStackToDrop, block.center());
      }
      onBreak(block, player);
    },
    onPlayerInteract({ block, dimension, player }, arg1) {
      const params = arg1.params;
      if (!player) return;
      const doorEntity = getDoorEntityAtBlock(block, player);
      if (!doorEntity) return;
      const playerClearanceLevel = Math.max(0, getEntityClearanceLevel(player));
      const requiredClearanceLevel = params.clearanceLevel;
      if (playerClearanceLevel < requiredClearanceLevel) {
        player.onScreenDisplay.setActionBar({ translate: "dt.guide.not_enough_clearance" });
        return;
      }
      if (requiredClearanceLevel > 0) {
        dimension.playSound("scpdt.card_read", block.center());
      }
      const currentDoorState = String(doorEntity.getProperty("scpdt:door_state"));
      if (currentDoorState === "closed") {
        doorEntity.triggerEvent("scpdt:open");
      } else if (currentDoorState === "opened") {
        doorEntity.triggerEvent("scpdt:close");
      }
    }
  });
});
mc8.world.afterEvents.blockExplode.subscribe((e) => {
  if (e.block.typeId !== "lc:dt_blast_door_v2") return;
  const player = e.source instanceof mc8.Player ? e.source : void 0;
  onBreak(e.block, player);
});
mc8.world.afterEvents.dataDrivenEntityTrigger.subscribe(
  (e) => {
    const block = e.entity.dimension.getBlock(e.entity.location);
    if (!block) return;
    if (!block.getComponent("scpdt:blast_door")) return;
    block.setPermutation(block.permutation.withState("lc:has_collision", true));
  },
  {
    entityTypes: ["lc:dt_blast_door_e"],
    eventTypes: ["scpdt:enable_block_collision"]
  }
);
mc8.world.afterEvents.dataDrivenEntityTrigger.subscribe(
  (e) => {
    const block = e.entity.dimension.getBlock(e.entity.location);
    if (!block) return;
    if (!block.getComponent("scpdt:blast_door")) return;
    block.setPermutation(block.permutation.withState("lc:has_collision", false));
  },
  {
    entityTypes: ["lc:dt_blast_door_e"],
    eventTypes: ["scpdt:disable_block_collision"]
  }
);
mc8.world.afterEvents.entityDie.subscribe((e) => {
  if (e.deadEntity.typeId !== "lc:dt_blast_door_e") return;
  const dontHandleRemoval = !!e.deadEntity.getDynamicProperty("dontHandleRemoval");
  if (dontHandleRemoval) return;
  onRemoveDoorEntity(e.deadEntity);
});
mc8.world.beforeEvents.entityRemove.subscribe((e) => {
  if (e.removedEntity.typeId !== "lc:dt_blast_door_e") return;
  const dontHandleRemoval = !!e.removedEntity.getDynamicProperty("dontHandleRemoval");
  if (dontHandleRemoval) return;
  onRemoveDoorEntity(e.removedEntity);
});

// src/bp/scripts/core/block_components/bomb_activator.ts
import * as mc9 from "@minecraft/server";
mc9.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:bomb_activator", {
    onPlayerInteract({ block, player, dimension }) {
      if (!player) return;
      const activatorState = Number(block.permutation.getState("bomb_activator:state"));
      if (activatorState === 3) return;
      const mainhandItem = player.getComponent("equippable").getEquipment(mc9.EquipmentSlot.Mainhand);
      const clearanceLevel = getClearanceLevel(mainhandItem);
      if (activatorState === 0) {
        dimension.playSound("scpdt.push_button", block.center());
        if (clearanceLevel >= 6) {
          player.onScreenDisplay.setActionBar("You CAN'T cancel detonation.");
          block.setPermutation(
            block.permutation.withState("bomb_activator:state", 1).withState("bomb_activator:textures", 1)
          );
        } else {
          player.onScreenDisplay.setActionBar("Detonation requires O5 clearance level.");
        }
        return;
      }
      if (activatorState === 1) {
        dimension.playSound("scpdt.push_button", block.center());
        dimension.playSound("scpdt.bomb_activator.activate", block.center());
        player.onScreenDisplay.setActionBar("\xA74/// \xA7cDETONATING IN T-MINUS 90 SECONDS \xA74///");
        block.setPermutation(
          block.permutation.withState("bomb_activator:state", 2).withState("bomb_activator:textures", 2).withState("bomb_activator:explode_countdown", true)
        );
        return;
      }
      if (activatorState === 2) {
        player.onScreenDisplay.setActionBar("\xA7cYOU CAN'T TURN OFF DETONATION");
        return;
      }
    },
    onTick({ block, dimension }) {
      const isCountingDown = Boolean(
        block.permutation.getState("bomb_activator:explode_countdown")
      );
      if (!isCountingDown) return;
      dimension.playSound("scpdt.bomb_activator.explode", block.center());
      dimension.spawnEntity("lc:dt_bomb_activator_explode", block.center());
      block.setPermutation(
        block.permutation.withState("bomb_activator:state", 3).withState("bomb_activator:textures", 3).withState("bomb_activator:explode_countdown", false)
      );
    }
  });
});

// src/bp/scripts/core/block_components/button.ts
import * as mc10 from "@minecraft/server";
mc10.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:button", {
    onPlayerInteract({ block, dimension }) {
      const center = block.center();
      const keyreadEntityLocation = {
        x: center.x,
        y: center.y - 3,
        z: center.z
      };
      dimension.spawnEntity("lc:dt_keyread", keyreadEntityLocation);
      dimension.playSound("scpdt.push_button", center, { volume: 0.9 });
    }
  });
});

// src/bp/scripts/lib/sit.ts
import "@minecraft/server";
var SIT_ENTITY_TYPE = "lc:dt_sit";
var sit = (sitType, player, location, direction) => {
  const sitEntity = player.dimension.spawnEntity(SIT_ENTITY_TYPE, location, {
    initialRotation: directionToRotation(direction).y
  });
  sitEntity.setProperty("sit:type", sitType);
  const rideable = sitEntity.getComponent("rideable");
  rideable.addRider(player);
};

// src/bp/scripts/core/block_components/cafeteria_chair.ts
import * as mc12 from "@minecraft/server";
mc12.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:cafeteria_chair", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      const hasWrench = isHoldingWrench(player);
      if (hasWrench) {
        const currentVariant = Number(block.permutation.getState("cafeteria_chair:color"));
        const nextVariant = (currentVariant + 1) % 4;
        block.setPermutation(block.permutation.withState("cafeteria_chair:color", nextVariant));
      } else {
        const facingDirIndex = getLegacyFacingDirectionIndex(block.permutation);
        const sitDirection = reverseDirection(convertLegacyFacingDirectionToDir(facingDirIndex));
        sit("standard", player, block.center(), sitDirection);
      }
    }
  });
});

// src/bp/scripts/core/block_components/camera.ts
import * as mc13 from "@minecraft/server";
mc13.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:camera", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      const hasWrench = isHoldingWrench(player);
      if (!hasWrench) return;
      const currentVariant = Number(block.permutation.getState("camera:variant"));
      const nextVariant = (currentVariant + 1) % 4;
      block.setPermutation(block.permutation.withState("camera:variant", nextVariant));
    }
  });
});

// src/bp/scripts/core/block_components/catwalk_fence.ts
import * as mc14 from "@minecraft/server";
mc14.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:catwalk_fence", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      const hasWrench = isHoldingWrench(player);
      if (!hasWrench) return;
      const currentVariant = Number(block.permutation.getState("fence:variant"));
      const nextVariant = (currentVariant + 1) % 3;
      block.setPermutation(block.permutation.withState("fence:variant", nextVariant));
    }
  });
});

// src/bp/scripts/core/block_components/ceiling_pipe.ts
import * as mc15 from "@minecraft/server";
mc15.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:ceiling_pipe", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      const hasWrench = isHoldingWrench(player);
      if (!hasWrench) return;
      const currentVariant = Number(block.permutation.getState("ceiling_pipe:states"));
      const nextVariant = currentVariant < 3 ? currentVariant + 1 : 1;
      block.setPermutation(block.permutation.withState("ceiling_pipe:states", nextVariant));
    }
  });
});

// src/bp/scripts/core/block_components/coffee_machine.ts
import * as mc16 from "@minecraft/server";
mc16.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:coffee_machine", {
    onPlayerInteract({ block, dimension, player }) {
      if (!player) return;
      const vendingState = Number(block.permutation.getState("coffee:vending_states"));
      if (vendingState === 2) return;
      const equippable = player.getComponent("equippable");
      if (!equippable) return;
      const mainhandItem = equippable.getEquipment(mc16.EquipmentSlot.Mainhand);
      if (!mainhandItem || mainhandItem.typeId !== "lc:dt_empty_mug") return;
      if (!isPlayerCreativeOrSpectator(player)) {
        if (mainhandItem.amount > 1) {
          mainhandItem.amount--;
          equippable.setEquipment(mc16.EquipmentSlot.Mainhand, mainhandItem);
        } else {
          equippable.setEquipment(mc16.EquipmentSlot.Mainhand, void 0);
        }
      }
      block.setPermutation(
        block.permutation.withState("coffee:vending", true).withState("coffee:vending_states", 2)
      );
      dimension.playSound("scpdt.coffee_machine.vending", block.center());
    },
    onTick({ block, dimension }) {
      const vendingState = Number(block.permutation.getState("coffee:vending_states"));
      if (vendingState === 1) return;
      dimension.spawnItem(new mc16.ItemStack("lc:dt_coffee_mug"), block.center());
      block.setPermutation(
        block.permutation.withState("coffee:vending", false).withState("coffee:vending_states", 1)
      );
    }
  });
});

// src/bp/scripts/core/block_components/curve_block.ts
import * as mc17 from "@minecraft/server";
var COMPONENT = {
  onPlayerInteract(arg) {
    if (!arg.player) return;
    if (!isHoldingWrench(arg.player)) return;
    const currentCurveState = arg.block.permutation.getState("curve:states");
    const nextCurveState = currentCurveState === 1 ? 2 : 1;
    arg.block.setPermutation(arg.block.permutation.withState("curve:states", nextCurveState));
  }
};
mc17.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:curve_block", COMPONENT);
});

// src/bp/scripts/core/block_components/desktop_display.ts
import * as mc18 from "@minecraft/server";
mc18.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:desktop_display", {
    onPlayerInteract({ block, dimension, player }) {
      if (!player) return;
      const isOn = !!block.permutation.getState("desktop_display:on");
      block.setPermutation(block.permutation.withState("desktop_display:on", !isOn));
      if (isOn) {
        dimension.playSound("scpdt.machine.off1", block.center());
      } else {
        dimension.playSound("scpdt.machine.on1", block.center());
      }
    }
  });
});

// src/bp/scripts/core/block_components/hand_dryer.ts
import * as mc19 from "@minecraft/server";
mc19.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:hand_dryer", {
    onPlayerInteract({ block, dimension, player }) {
      if (!player) return;
      const dryerState = Number(block.permutation.getState("hand_dryer:states"));
      if (dryerState === 2) return;
      block.setPermutation(block.permutation.withState("hand_dryer:states", 2));
      dimension.playSound("scpdt.hand_dryer", block.center());
    },
    onTick({ block }) {
      const dryerState = Number(block.permutation.getState("hand_dryer:states"));
      if (dryerState === 1) return;
      block.setPermutation(block.permutation.withState("hand_dryer:states", 1));
    }
  });
});

// src/bp/scripts/core/block_components/hang_lamp.ts
import * as mc20 from "@minecraft/server";
mc20.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:hang_lamp", {
    onPlayerInteract({ block, dimension, player }) {
      if (!player) return;
      const hasWrench = isHoldingWrench(player);
      const lightState = Number(block.permutation.getState("light:state"));
      const shouldBlink = !!block.permutation.getState("light:blinking");
      if (hasWrench) {
        block.setPermutation(block.permutation.withState("light:blinking", !shouldBlink));
        return;
      }
      dimension.playSound("scpdt.light.switch", block.center());
      const newLightState = lightState === 0 ? 1 : 0;
      block.setPermutation(block.permutation.withState("light:state", newLightState));
    },
    onTick({ block, dimension }) {
      const shouldBlink = !!block.permutation.getState("light:blinking");
      if (!shouldBlink) return;
      const lightState = Number(block.permutation.getState("light:state"));
      const newLightState = lightState === 0 ? 1 : 0;
      block.setPermutation(block.permutation.withState("light:state", newLightState));
      const blinkSoundPitch = lightState === 0 ? 1.2 : 1.4;
      dimension.playSound("block.click", block.center(), { pitch: blinkSoundPitch });
    }
  });
});

// src/bp/scripts/core/block_components/intercom.ts
import * as mc21 from "@minecraft/server";
mc21.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:intercom", {
    onPlayerInteract({ block, dimension }, arg1) {
      const params = arg1.params;
      const isBroadcasting = !!block.permutation.getState("intercom:broadcasting");
      if (isBroadcasting) return;
      block.setPermutation(block.permutation.withState("intercom:broadcasting", true));
      dimension.getPlayers().forEach((player) => {
        player.playSound(params.broadcastSound, { ...params });
      });
    },
    onTick({ block }) {
      const isBroadcasting = !!block.permutation.getState("intercom:broadcasting");
      if (!isBroadcasting) return;
      block.setPermutation(block.permutation.withState("intercom:broadcasting", false));
    }
  });
});

// src/bp/scripts/core/block_components/keycard_reader.ts
import * as mc23 from "@minecraft/server";
mc23.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:keycard_reader", {
    onPlayerInteract({ block, dimension, player }, arg1) {
      const params = arg1.params;
      if (!player) return;
      const requiredClearanceLevel = params.clearanceLevel;
      const playerClearanceLevel = getEntityClearanceLevel(player);
      if (playerClearanceLevel < requiredClearanceLevel) {
        player.onScreenDisplay.setActionBar({ translate: "dt.guide.not_enough_clearance" });
        return;
      }
      const center = block.center();
      const keyreadEntityLocation = {
        x: center.x,
        y: center.y - 3,
        z: center.z
      };
      dimension.spawnEntity("lc:dt_keyread", keyreadEntityLocation);
      dimension.playSound("scpdt.card_read", center, { volume: 0.6 });
    }
  });
});

// src/bp/scripts/core/block_components/laptop.ts
import * as mc24 from "@minecraft/server";
mc24.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:laptop", {
    onPlayerInteract({ block, dimension }) {
      const isOn = block.permutation.getState("laptop:on");
      block.setPermutation(block.permutation.withState("laptop:on", !isOn));
      if (isOn) {
        dimension.playSound("scpdt.machine.off1", block.center());
      } else {
        dimension.playSound("scpdt.machine.on1", block.center());
      }
    }
  });
});

// src/bp/scripts/core/block_components/legacy_placement_state.ts
import * as mc25 from "@minecraft/server";
var getPlayerFacingDirectionIndex = (player, reverse = false) => {
  const rot = player.getRotation();
  const yaw = rot.y;
  const normalizedYaw = (yaw + 180) % 360 - 180;
  if (normalizedYaw >= -45 && normalizedYaw < 45) {
    return reverse ? LEGACY_FACING_DIRECTION_INDEX.south : LEGACY_FACING_DIRECTION_INDEX.north;
  } else if (normalizedYaw >= 45 && normalizedYaw < 135) {
    return reverse ? LEGACY_FACING_DIRECTION_INDEX.west : LEGACY_FACING_DIRECTION_INDEX.east;
  } else if (normalizedYaw >= 135 || normalizedYaw < -135) {
    return reverse ? LEGACY_FACING_DIRECTION_INDEX.north : LEGACY_FACING_DIRECTION_INDEX.south;
  } else if (normalizedYaw >= -135 && normalizedYaw < -45) {
    return reverse ? LEGACY_FACING_DIRECTION_INDEX.east : LEGACY_FACING_DIRECTION_INDEX.west;
  }
  return 2;
};
var COMPONENT2 = {
  beforeOnPlayerPlace(arg, arg1) {
    if (!arg.player) return;
    const params = arg1.params;
    const facingDirectionState = params.facingDirectionState;
    if (typeof facingDirectionState === "string") {
      const facingDirectionReverse = params.facingDirectionReverse === true;
      const index = getPlayerFacingDirectionIndex(arg.player, facingDirectionReverse);
      arg.permutationToPlace = arg.permutationToPlace.withState(facingDirectionState, index);
    }
  }
};
mc25.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:legacy_placement_state", COMPONENT2);
});

// src/bp/scripts/core/block_components/living_bench.ts
import * as mc26 from "@minecraft/server";
mc26.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:living_bench", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      const facingDirIndex = getLegacyFacingDirectionIndex(block.permutation);
      const sitDirection = reverseDirection(convertLegacyFacingDirectionToDir(facingDirIndex));
      sit("standard", player, block.center(), sitDirection);
    }
  });
});

// src/bp/scripts/core/block_components/lunch_plate.ts
import * as mc27 from "@minecraft/server";
mc27.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:lunch_plate", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      if (!isHoldingWrench(player)) return;
      const hasDishes = block.permutation.getState("lunch_plate:dishes");
      block.setPermutation(block.permutation.withState("lunch_plate:dishes", !hasDishes));
    }
  });
});

// src/bp/scripts/core/block_components/mine.ts
import * as mc28 from "@minecraft/server";
mc28.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:mine", {
    onStepOn({ block, dimension }) {
      block.setType("minecraft:air");
      dimension.spawnEntity("lc:dt_mine_explosion", block.bottomCenter());
    }
  });
});

// src/bp/scripts/core/block_components/office_chair.ts
import * as mc29 from "@minecraft/server";
mc29.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:office_chair", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      const facingDirIndex = getLegacyFacingDirectionIndex(block.permutation);
      const sitDirection = reverseDirection(convertLegacyFacingDirectionToDir(facingDirIndex));
      sit("standard", player, block.center(), sitDirection);
    }
  });
});

// src/bp/scripts/lib/block_utils.ts
import "@minecraft/server";
var destroyBlock = (block) => {
  const location = `${block.x} ${block.y} ${block.z}`;
  block.dimension.runCommand(`setblock ${location} air destroy`);
};
var createBlockStatesString = (states) => {
  const array = [];
  for (const [k, v] of Object.entries(states)) {
    const vStr = typeof v === "string" ? `"${v}"` : `${v}`;
    array.push(`"${k}"=${vStr}`);
  }
  return array.join(",");
};

// node_modules/.pnpm/@mcbe-toolbox-lc+vecarr@0.1.3/node_modules/@mcbe-toolbox-lc/vecarr/dist/index.js
var toArr3 = (obj, fallbackValues) => {
  const x = obj?.x ?? fallbackValues?.x ?? 0;
  const y = obj?.y ?? fallbackValues?.y ?? 0;
  const z = obj?.z ?? fallbackValues?.z ?? 0;
  return [x, y, z];
};
var toObj3 = (arr) => ({
  x: arr[0],
  y: arr[1],
  z: arr[2]
});
var isIndexedCollection = (value) => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  if (!("length" in value)) return false;
  const length = value.length;
  if (typeof length !== "number") return false;
  if (length < 0) return false;
  if (length !== Math.floor(length) || length > Number.MAX_SAFE_INTEGER) {
    return false;
  }
  if (typeof value === "function") return false;
  return true;
};
var HybridVec3 = class _HybridVec3 {
  #array;
  constructor(vec, fallbackValues) {
    if (isIndexedCollection(vec)) {
      this.#array = vec;
    } else {
      this.#array = toArr3(vec, fallbackValues);
    }
    const xDesc = Object.getOwnPropertyDescriptor(_HybridVec3.prototype, "x");
    const yDesc = Object.getOwnPropertyDescriptor(_HybridVec3.prototype, "y");
    const zDesc = Object.getOwnPropertyDescriptor(_HybridVec3.prototype, "z");
    Object.defineProperty(this, "x", { enumerable: true, get: xDesc.get, set: xDesc.set });
    Object.defineProperty(this, "y", { enumerable: true, get: yDesc.get, set: yDesc.set });
    Object.defineProperty(this, "z", { enumerable: true, get: zDesc.get, set: zDesc.set });
    Object.defineProperty(this, "length", {
      value: 3,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
  // Object support
  get x() {
    return this.#array[0];
  }
  set x(value) {
    this.#array[0] = value;
  }
  get y() {
    return this.#array[1];
  }
  set y(value) {
    this.#array[1] = value;
  }
  get z() {
    return this.#array[2];
  }
  set z(value) {
    this.#array[2] = value;
  }
  // Array support
  length = 3;
  get [0]() {
    return this.#array[0];
  }
  set [0](value) {
    this.#array[0] = value;
  }
  get [1]() {
    return this.#array[1];
  }
  set [1](value) {
    this.#array[1] = value;
  }
  get [2]() {
    return this.#array[2];
  }
  set [2](value) {
    this.#array[2] = value;
  }
  *[Symbol.iterator]() {
    yield this.#array[0];
    yield this.#array[1];
    yield this.#array[2];
  }
  toString() {
    return `${this.x},${this.y},${this.z}`;
  }
};

// src/bp/scripts/core/block_components/old_blast_door_conversion.ts
import * as mc31 from "@minecraft/server";
var convert = (block, params) => {
  const dir = params.isRotated ? "west" : "north";
  const statesString = createBlockStatesString({
    "minecraft:cardinal_direction": dir
  });
  let newType;
  switch (params.clearanceLevel) {
    default:
    case 0:
      newType = "lc:dt_blast_door_v2";
      break;
    case 1:
      newType = "lc:dt_blast_door_lvl1_v2";
      break;
    case 2:
      newType = "lc:dt_blast_door_lvl2_v2";
      break;
    case 3:
      newType = "lc:dt_blast_door_lvl3_v2";
      break;
    case 4:
      newType = "lc:dt_blast_door_lvl4_v2";
      break;
    case 5:
      newType = "lc:dt_blast_door_lvl5_v2";
      break;
  }
  const location = toArr3(block.location).join(" ");
  const cmd = `setblock ${location} ${newType} [${statesString}]`;
  block.dimension.runCommand(cmd);
};
mc31.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:old_blast_door_conversion", {
    onPlayerInteract(arg0, arg1) {
      convert(arg0.block, arg1.params);
    },
    onTick(arg0, arg1) {
      convert(arg0.block, arg1.params);
    }
  });
});

// src/bp/scripts/core/block_components/old_door_conversion.ts
import * as mc33 from "@minecraft/server";
var convert2 = (block, params) => {
  const above = block.above();
  if (above?.typeId === "lc:dt_door_dummy" || above?.typeId === "minecraft:barrier") {
    above.setType("minecraft:air");
  }
  const facingDirection = getLegacyFacingDirectionIndex(block.permutation);
  const cardinalDirection = convertLegacyFacingDirectionToDir(facingDirection).toLocaleLowerCase();
  const statesString = createBlockStatesString({
    "minecraft:cardinal_direction": cardinalDirection
  });
  const location = toArr3(block.location).join(" ");
  const cmd = `setblock ${location} ${params.newType} [${statesString}]`;
  block.dimension.runCommand(cmd);
};
mc33.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:old_door_conversion", {
    onPlayerInteract(arg0, arg1) {
      convert2(arg0.block, arg1.params);
    },
    onTick(arg0, arg1) {
      convert2(arg0.block, arg1.params);
    }
  });
});

// src/bp/scripts/core/block_components/pipe.ts
import * as mc34 from "@minecraft/server";
mc34.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:pipe", {
    beforeOnPlayerPlace(arg) {
      const blockFace = arg.permutationToPlace.getState("minecraft:block_face");
      const legacyFacingDir = LEGACY_FACING_DIRECTION_INDEX[blockFace];
      arg.permutationToPlace = arg.permutationToPlace.withState(
        "facing:direction",
        legacyFacingDir
      );
    }
  });
});

// src/bp/scripts/core/block_components/pizza_box.ts
import * as mc35 from "@minecraft/server";
mc35.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:pizza_box", {
    onPlayerInteract({ block, dimension }) {
      const pizzaBoxState = Number(block.permutation.getState("pizza_box:states"));
      const newPizzaBoxState = pizzaBoxState === 1 ? 2 : 1;
      block.setPermutation(block.permutation.withState("pizza_box:states", newPizzaBoxState));
      dimension.playSound("item.book.page_turn", block.center(), { volume: 0.7 });
    }
  });
});

// src/bp/scripts/core/block_components/poster.ts
import * as mc36 from "@minecraft/server";
mc36.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:poster", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      if (!isHoldingWrench(player)) return;
      const variantStateName = "poster:variant";
      const variant = Number(block.permutation.getState(variantStateName));
      const nextVariant = variant < 4 ? variant + 1 : 0;
      block.setPermutation(block.permutation.withState(variantStateName, nextVariant));
    }
  });
});

// src/bp/scripts/core/block_components/rack.ts
import * as mc37 from "@minecraft/server";
mc37.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:rack", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      if (!isHoldingWrench(player)) return;
      const rackState = Number(block.permutation.getState("rack:states"));
      const newRackState = rackState < 6 ? rackState + 1 : 1;
      block.setPermutation(block.permutation.withState("rack:states", newRackState));
    }
  });
});

// src/bp/scripts/core/block_components/radio_block.ts
import * as mc38 from "@minecraft/server";
mc38.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:radio_block", {
    onPlayerInteract({ block, dimension, player }) {
      if (!player) return;
      const radioState = Number(block.permutation.getState("radio:states"));
      const newRadioState = radioState === 1 ? 2 : 1;
      block.setPermutation(block.permutation.withState("radio:states", newRadioState));
      if (newRadioState === 1) {
        runCommandAtBlock(block, "stopsound @a[r=11] scpdt.radio_static");
      } else {
        dimension.playSound("scpdt.radio_static", block.center());
      }
    },
    onTick({ block, dimension }) {
      const radioState = Number(block.permutation.getState("radio:states"));
      if (radioState !== 2) return;
      dimension.playSound("scpdt.radio_static", block.center());
    }
  });
});

// src/bp/scripts/core/block_components/restroom_sign.ts
import * as mc39 from "@minecraft/server";
mc39.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:restroom_sign", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      if (!isHoldingWrench(player)) return;
      const signState = Number(block.permutation.getState("restroom_sign:state"));
      const newSignState = signState === 0 ? 1 : 0;
      block.setPermutation(block.permutation.withState("restroom_sign:state", newSignState));
    }
  });
});

// src/bp/scripts/core/block_components/scp006.ts
import * as mc40 from "@minecraft/server";
mc40.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:scp006", {
    onStepOn({ entity }) {
      entity?.addEffect("regeneration", 4 * mc40.TicksPerSecond, { amplifier: 1 });
    }
  });
});

// src/bp/scripts/core/block_components/scp012.ts
var import_gl_matrix = __toESM(require_cjs(), 1);
import * as mc41 from "@minecraft/server";
var LURE_DISTANCE = 8;
var PAIN_DISTANCE = 3;
mc41.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:scp012", {
    onTick(arg) {
      const center = arg.block.center();
      const targetCandidates = arg.dimension.getEntities({
        location: center,
        maxDistance: LURE_DISTANCE,
        excludeFamilies: ["inanimate", "gate_guardian"],
        excludeTypes: ["minecraft:ender_dragon"]
      });
      for (const target of targetCandidates) {
        const isPlayerAndCreativeOrSpectator = target instanceof mc41.Player && [mc41.GameMode.Creative, mc41.GameMode.Spectator].includes(target.getGameMode());
        if (isPlayerAndCreativeOrSpectator) continue;
        const dirToPlayerVec = import_gl_matrix.vec3.sub(
          import_gl_matrix.vec3.create(),
          toArr3(target.getHeadLocation()),
          toArr3(center)
        );
        import_gl_matrix.vec3.normalize(dirToPlayerVec, dirToPlayerVec);
        const distance = import_gl_matrix.vec3.distance(
          toArr3(target.getHeadLocation()),
          toArr3(center)
        );
        const raycastHit = arg.dimension.getBlockFromRay(center, toObj3(dirToPlayerVec), {
          includeLiquidBlocks: false,
          includePassableBlocks: false,
          excludeTypes: [arg.block.typeId],
          maxDistance: distance
        });
        const isBlocked = raycastHit !== void 0;
        if (isBlocked) return;
        const facingLocationVec = import_gl_matrix.vec3.add(
          import_gl_matrix.vec3.create(),
          toArr3(arg.block.bottomCenter()),
          import_gl_matrix.vec3.fromValues(0, -1, 0)
        );
        target.teleport(target.location, {
          facingLocation: toObj3(facingLocationVec)
        });
        target.addEffect("blindness", 80);
        if (distance < PAIN_DISTANCE) {
          target.addEffect("wither", 40, { amplifier: 1 });
        }
        if (distance > PAIN_DISTANCE - 1) {
          mc41.system.runTimeout(() => {
            const impulseVec = import_gl_matrix.vec3.scale(import_gl_matrix.vec3.create(), dirToPlayerVec, -0.4);
            target.applyImpulse(toObj3(impulseVec));
          }, 1);
        }
      }
    }
  });
});

// src/bp/scripts/core/block_components/scp079.ts
var import_gl_matrix2 = __toESM(require_cjs(), 1);
import * as mc42 from "@minecraft/server";
var playSoundToNearbyPlayers = (block, soundId) => {
  block.dimension.getPlayers().forEach((player) => {
    const dist = import_gl_matrix2.vec3.dist(toArr3(player.location), toArr3(block.center()));
    if (dist > 128) return;
    player.playSound(soundId);
  });
};
mc42.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:scp079", {
    onTick({ block }) {
      const scp079State = Number(block.permutation.getState("scp079:states"));
      if (scp079State === 2) {
        playSoundToNearbyPlayers(block, "scpdt.scp079.broadcast");
        block.setPermutation(block.permutation.withState("scp079:states", 3));
      } else if (scp079State === 3) {
        playSoundToNearbyPlayers(block, "scpdt.scp079.broadcast");
      }
    },
    onPlayerInteract({ block }) {
      const scp079State = Number(block.permutation.getState("scp079:states"));
      if (scp079State === 1) {
        playSoundToNearbyPlayers(block, "scpdt.scp079.booting");
        block.setPermutation(block.permutation.withState("scp079:states", 2));
      } else if (scp079State === 3) {
        playSoundToNearbyPlayers(block, "scpdt.scp079.shutdown");
        runCommandAtBlock(block, "stopsound @a scpdt.scp079.broadcast");
        block.setPermutation(block.permutation.withState("scp079:states", 1));
      }
    }
  });
});

// src/bp/scripts/core/block_components/scp1074.ts
import * as mc43 from "@minecraft/server";
mc43.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:scp1074", {
    onPlayerInteract({ block, dimension, player }) {
      if (!player) return;
      dimension.playSound("scpdt.scp1074.touch", block.center());
      player.addEffect("wither", 60 * mc43.TicksPerSecond, { amplifier: 1 });
    }
  });
});

// src/bp/scripts/core/block_components/scp143.ts
import * as mc44 from "@minecraft/server";
mc44.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:scp143_leaves", {
    beforeOnPlayerPlace(arg) {
      arg.permutationToPlace = arg.permutationToPlace.withState("lc:by_player", true);
    },
    onPlayerBreak({ block, dimension, player }) {
      if (!player) return;
      if (isPlayerCreativeOrSpectator(player)) return;
      const maybeDropSapling = () => {
        if (Math.random() > 0.15) return;
        const itemStack2 = new mc44.ItemStack("lc:dt_scp143_sapling_placer", 1);
        dimension.spawnItem(itemStack2, block.center());
      };
      const equippable = player.getComponent("equippable");
      const mainhandItem = equippable.getEquipment(mc44.EquipmentSlot.Mainhand);
      if (!mainhandItem || mainhandItem.typeId !== "minecraft:shears") {
        maybeDropSapling();
        return;
      }
      const itemStack = new mc44.ItemStack("lc:dt_scp143_leaves", 1);
      dimension.spawnItem(itemStack, block.center());
    }
  });
});
mc44.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  const grow = (block) => {
    const growState = Number(block.permutation.getState("lc:growing"));
    block.dimension.spawnParticle("minecraft:crop_growth_emitter", block.center());
    if (growState < 2) {
      block.setPermutation(block.permutation.withState("lc:growing", growState + 1));
      return;
    }
    runCommandAtBlock(block, "structure load dt_scp143_tree ~-2 ~ ~-2");
  };
  blockComponentRegistry.registerCustomComponent("scpdt:scp143_sapling", {
    onRandomTick({ block }) {
      grow(block);
    },
    onPlayerInteract({ block, player }) {
      if (!player) return;
      const equippable = player.getComponent("equippable");
      const mainhandItem = equippable.getEquipment(mc44.EquipmentSlot.Mainhand);
      if (!mainhandItem || mainhandItem.typeId !== "minecraft:bone_meal") return;
      if (!isPlayerCreativeOrSpectator(player)) {
        if (mainhandItem.amount > 1) {
          mainhandItem.amount--;
          equippable.setEquipment(mc44.EquipmentSlot.Mainhand, mainhandItem);
        } else {
          equippable.setEquipment(mc44.EquipmentSlot.Mainhand, void 0);
        }
      }
      grow(block);
    }
  });
});
mc44.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:scp143_log_direction", {
    beforeOnPlayerPlace(arg) {
      const blockFace = arg.permutationToPlace.getState("minecraft:block_face");
      if (typeof blockFace !== "string") return;
      let facingDirection = 0;
      switch (blockFace) {
        case "north":
        case "south":
          facingDirection = 1;
          break;
        case "east":
        case "west":
          facingDirection = 2;
          break;
      }
      arg.permutationToPlace = arg.permutationToPlace.withState(
        "lc:facing_direction",
        facingDirection
      );
    }
  });
});

// src/bp/scripts/core/block_components/scp294.ts
var import_gl_matrix3 = __toESM(require_cjs(), 1);
import * as mc45 from "@minecraft/server";
var productLabelsByWordIndex = {
  0: "Water",
  1: "Coffee",
  2: "Orange Juice",
  3: "Cola",
  4: "Iron",
  5: "Gold",
  6: "Pizza",
  7: "Me",
  8: "Boyfriend",
  9: "Girlfriend",
  10: "Amogus"
};
var productIdsByWordIndex = {
  0: "lc:dt_cup_water",
  1: "lc:dt_cup_coffee",
  2: "lc:dt_cup_orange_juice",
  3: "lc:dt_cup_cola",
  4: "lc:dt_cup_iron",
  5: "lc:dt_cup_gold",
  6: "lc:dt_cup_pizza",
  7: "lc:dt_cup_me",
  8: "lc:dt_cup_boyfriend",
  9: "lc:dt_cup_girlfriend",
  10: "lc:dt_cup_amogus"
};
mc45.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:scp294", {
    onPlayerInteract({ block, dimension, player }) {
      if (!player) return;
      const dispenseState = Number(block.permutation.getState("scp294:dispense"));
      const coinState = Number(block.permutation.getState("scp294:coin"));
      const wordIndex = Number(block.permutation.getState("scp294:word"));
      if (dispenseState === 1) return;
      const equippable = player.getComponent("equippable");
      const mainhandSlot = equippable.getEquipmentSlot(mc45.EquipmentSlot.Mainhand);
      const consumeMainhandItem = () => {
        if (mainhandSlot.amount > 1) {
          mainhandSlot.amount--;
        } else {
          mainhandSlot.setItem(void 0);
        }
      };
      if (coinState === 0) {
        if (!mainhandSlot.hasItem() || mainhandSlot.typeId !== "lc:dt_coin") {
          player.onScreenDisplay.setActionBar({ translate: "dt.guide.scp294.coin_required" });
          return;
        }
        consumeMainhandItem();
        dimension.playSound("scpdt.scp294.coin", block.center());
        block.setPermutation(block.permutation.withState("scp294:coin", 1));
        return;
      }
      if (player.isSneaking) {
        const nextWordIndex = wordIndex < 10 ? wordIndex + 1 : 0;
        const nextProductLabel = productLabelsByWordIndex[nextWordIndex];
        const currentProductLabel = productLabelsByWordIndex[wordIndex];
        player.onScreenDisplay.setActionBar(
          `\xA77Word: \xA78${currentProductLabel} \xA77-> \xA7f${nextProductLabel}`
        );
        dimension.playSound("scpdt.push_button", block.center());
        block.setPermutation(block.permutation.withState("scp294:word", nextWordIndex));
        return;
      }
      if (!mainhandSlot.hasItem() || mainhandSlot.typeId !== "lc:dt_empty_cup") {
        player.onScreenDisplay.setActionBar({
          translate: "dt.guide.scp294.empty_cup_required_or_cycle"
        });
        return;
      }
      consumeMainhandItem();
      player.onScreenDisplay.setActionBar("\xA77Dispensing...");
      block.setPermutation(block.permutation.withState("scp294:dispense", 1));
      switch (wordIndex) {
        case 0:
        case 1:
        case 2:
        case 3:
          dimension.playSound("scpdt.scp294.dispense1", block.center());
          break;
        case 4:
        case 5:
        case 6:
        case 10:
          dimension.playSound("scpdt.scp294.dispense2", block.center());
          break;
        case 7:
        case 8:
        case 9:
          dimension.playSound("scpdt.scp294.dispense3", block.center());
          break;
      }
    },
    onTick({ block, dimension }) {
      const dispenseState = Number(block.permutation.getState("scp294:dispense"));
      const wordIndex = Number(block.permutation.getState("scp294:word"));
      if (dispenseState !== 1) return;
      block.setPermutation(block.permutation.withState("scp294:coin", 0));
      block.setPermutation(block.permutation.withState("scp294:dispense", 0));
      const cupId = productIdsByWordIndex[wordIndex];
      const itemStack = new mc45.ItemStack(cupId, 1);
      const blockCenter = block.center();
      const itemEntity = dimension.spawnItem(itemStack, {
        x: blockCenter.x,
        y: blockCenter.y + 1,
        z: blockCenter.z
      });
      const nearestPlayer = dimension.getPlayers({
        location: itemEntity.location,
        closest: 1,
        maxDistance: 5
      })[0];
      if (!nearestPlayer) return;
      const force = import_gl_matrix3.vec3.sub(
        import_gl_matrix3.vec3.create(),
        toArr3(nearestPlayer.getHeadLocation()),
        toArr3(itemEntity.location)
      );
      itemEntity.applyImpulse(toObj3(force));
    }
  });
});

// src/bp/scripts/core/block_components/scp330.ts
import * as mc46 from "@minecraft/server";
var STAGE1_INTERACTION_CD = "scpdy:scp330_interaction_1";
var STAGE2_INTERACTION_CD = "scpdy:scp330_interaction_2";
var spawnCandy = (block) => {
  const candies = ["lc:dt_candy1", "lc:dt_candy2", "lc:dt_candy3"];
  const randomCandy = candies[Math.floor(Math.random() * candies.length)];
  const candyItem = new mc46.ItemStack(randomCandy, 1);
  block.dimension.spawnItem(candyItem, block.center());
  block.dimension.playSound("random.pop", block.center());
};
var onDeadlyInteraction = (player) => {
  player.camera.fade({
    fadeColor: { red: 0.5, green: 0, blue: 0 },
    fadeTime: {
      fadeInTime: 0.08,
      holdTime: 0.2,
      fadeOutTime: 0.9
    }
  });
  player.addEffect("wither", 60 * mc46.TicksPerSecond, { amplifier: 2 });
  player.addEffect("mining_fatigue", 120 * mc46.TicksPerSecond, { amplifier: 2 });
  player.applyDamage(8, {
    cause: mc46.EntityDamageCause.override,
    damagingEntity: player
  });
};
mc46.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:scp330", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      mc46.system.run(() => {
        spawnCandy(block);
      });
      const isStage2 = player.getItemCooldown(STAGE2_INTERACTION_CD) > 0;
      if (isStage2) {
        player.startItemCooldown(STAGE2_INTERACTION_CD, 0);
        onDeadlyInteraction(player);
        return;
      }
      const isStage1 = player.getItemCooldown(STAGE1_INTERACTION_CD) > 0;
      if (isStage1) {
        player.startItemCooldown(STAGE1_INTERACTION_CD, 0);
        player.startItemCooldown(STAGE2_INTERACTION_CD, mc46.TicksPerDay);
        return;
      }
      player.startItemCooldown(STAGE1_INTERACTION_CD, mc46.TicksPerDay);
    }
  });
});
mc46.world.afterEvents.entityDie.subscribe(({ deadEntity }) => {
  if (!(deadEntity instanceof mc46.Player)) return;
  deadEntity.startItemCooldown(STAGE1_INTERACTION_CD, 0);
  deadEntity.startItemCooldown(STAGE2_INTERACTION_CD, 0);
});

// src/bp/scripts/core/block_components/scp458_pizza_box.ts
import * as mc47 from "@minecraft/server";
mc47.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:scp458_pizza_box", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      const boxState = Number(block.permutation.getState("pizza_box:states"));
      const nextBoxState = boxState === 1 ? 2 : 1;
      block.setPermutation(block.permutation.withState("pizza_box:states", nextBoxState));
      if (boxState === 2) return;
      const pizzaSliceItem = new mc47.ItemStack("lc:dt_pizza_slice", 1);
      block.dimension.spawnItem(pizzaSliceItem, block.bottomCenter());
      block.dimension.playSound("random.pop", block.center());
    }
  });
});

// node_modules/.pnpm/@mcbe-toolbox-lc+sukuriputi_e8bf1daa538a71c1d4d656887a67266a/node_modules/@mcbe-toolbox-lc/sukuriputils/dist/math/index.js
var randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
var weightedRandom = (choices) => {
  if (choices.length === 0) throw new Error("Cannot pick from empty array");
  const totalWeight = choices.reduce((sum, choice) => sum + choice.weight, 0);
  if (totalWeight <= 0) throw new Error("Total weight must be positive");
  let random = Math.random() * totalWeight;
  for (const choice of choices) {
    random -= choice.weight;
    if (random <= 0) {
      return choice;
    }
  }
  return choices[choices.length - 1];
};

// src/bp/scripts/core/block_components/scp914.ts
import * as mc48 from "@minecraft/server";
var levelNames = {
  0: "Rough",
  1: "Coarse",
  2: "1:1",
  3: "Fine",
  4: "VeryFine"
};
mc48.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:scp914", {
    onPlayerInteract({ block, dimension, player }) {
      if (!player) return;
      const refiningState = Number(block.permutation.getState("scp914:refining"));
      const level = Number(block.permutation.getState("scp914:level"));
      if (refiningState !== 0) return;
      if (player.isSneaking) {
        const newLevel = level < 4 ? level + 1 : 0;
        block.setPermutation(block.permutation.withState("scp914:level", newLevel));
        player.onScreenDisplay.setActionBar(`Set refining level to ${levelNames[newLevel]}`);
        dimension.playSound("scpdt.scp914.change_level", block.center());
        return;
      }
      const equippable = player.getComponent("equippable");
      const mainhandItem = equippable.getEquipment(mc48.EquipmentSlot.Mainhand);
      if (!mainhandItem) {
        player.onScreenDisplay.setActionBar({ translate: "dt.guide.scp914.hold_item_or_refine" });
        return;
      }
      let newPermutation = block.permutation.withState("scp914:refining", 1);
      switch (mainhandItem.typeId) {
        case "lc:dt_mp5k_ammo":
        case "lc:dt_p90_ammo":
        case "lc:dt_m16_ammo":
        case "lc:dt_glock_ammo":
        case "lc:dt_spas12_shell":
          newPermutation = newPermutation.withState("scp914:refine_item", 1);
          break;
        case "lc:dt_keycard1":
          newPermutation = newPermutation.withState("scp914:refine_item", 2).withState("scp914:refine_keycard", 0);
          break;
        case "lc:dt_keycard2":
          newPermutation = newPermutation.withState("scp914:refine_item", 2).withState("scp914:refine_keycard", 1);
          break;
        case "lc:dt_keycard3":
          newPermutation = newPermutation.withState("scp914:refine_item", 2).withState("scp914:refine_keycard", 2);
          break;
        case "lc:dt_keycard4":
          newPermutation = newPermutation.withState("scp914:refine_item", 2).withState("scp914:refine_keycard", 3);
          break;
        case "lc:dt_keycard5":
          newPermutation = newPermutation.withState("scp914:refine_item", 2).withState("scp914:refine_keycard", 4);
          break;
        case "lc:dt_keycard_omni":
          newPermutation = newPermutation.withState("scp914:refine_item", 2).withState("scp914:refine_keycard", 5);
          break;
        case "lc:dt_scpdystopia_orb":
          newPermutation = newPermutation.withState("scp914:refine_item", 3).withState("scp914:refine_orb", 0);
          break;
        case "lc:dt_enhanced_scpdystopia_orb":
          newPermutation = newPermutation.withState("scp914:refine_item", 3).withState("scp914:refine_orb", 1);
          break;
        case "minecraft:netherite_ingot":
          newPermutation = newPermutation.withState("scp914:refine_item", 14);
          break;
        case "minecraft:diamond":
          newPermutation = newPermutation.withState("scp914:refine_item", 15);
          break;
        case "lc:dt_imposter_totem":
          newPermutation = newPermutation.withState("scp914:refine_item", 16);
          break;
        default: {
          player.onScreenDisplay.setActionBar({ translate: "dt.guide.scp914.hold_item_or_refine" });
          return;
        }
      }
      if (mainhandItem.amount > 1) {
        mainhandItem.amount--;
        equippable.setEquipment(mc48.EquipmentSlot.Mainhand, mainhandItem);
      } else {
        equippable.setEquipment(mc48.EquipmentSlot.Mainhand, void 0);
      }
      block.setPermutation(newPermutation);
      dimension.playSound("scpdt.scp914.refine", block.center(), { volume: 1.5 });
      player.onScreenDisplay.setActionBar(`Refining the item at level \xA7l${levelNames[level]}`);
    },
    onTick({ block, dimension }) {
      const refiningState = Number(block.permutation.getState("scp914:refining"));
      const refineItemIndex = Number(block.permutation.getState("scp914:refine_item"));
      const level = Number(block.permutation.getState("scp914:level"));
      const refineKeycardLevel = Number(block.permutation.getState("scp914:refine_keycard"));
      const refineOrbIndex = Number(block.permutation.getState("scp914:refine_orb"));
      if (refiningState !== 1) return;
      block.setPermutation(
        block.permutation.withState("scp914:refining", 0).withState("scp914:refine_item", 0)
      );
      switch (refineItemIndex) {
        // source: gun ammo/shell
        case 1: {
          if (level === 0) {
            if (Math.random() < 0.5) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_scp914_scrap"), block.center());
            } else {
              dimension.spawnItem(new mc48.ItemStack("minecraft:iron_nugget"), block.center());
            }
          } else if (level === 1) {
            dimension.spawnItem(new mc48.ItemStack("minecraft:gunpowder", 1), block.center());
          } else if (level === 2) {
            if (Math.random() < 0.5) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_scp914_scrap"), block.center());
            } else {
              if (Math.random() < 0.5) {
                dimension.spawnItem(new mc48.ItemStack("minecraft:gunpowder", 1), block.center());
              } else {
                dimension.spawnItem(new mc48.ItemStack("minecraft:iron_ingot", 1), block.center());
              }
            }
          } else if (level === 3) {
            dimension.spawnItem(
              new mc48.ItemStack("minecraft:gunpowder", randomInt(2, 4)),
              block.center()
            );
            dimension.spawnItem(
              new mc48.ItemStack("minecraft:iron_ingot", randomInt(1, 3)),
              block.center()
            );
          } else if (level === 4) {
            dimension.spawnItem(
              new mc48.ItemStack("minecraft:gunpowder", randomInt(3, 6)),
              block.center()
            );
            dimension.spawnItem(
              new mc48.ItemStack("minecraft:iron_ingot", randomInt(3, 4)),
              block.center()
            );
          }
          break;
        }
        // source: keycard
        case 2: {
          if (level === 0) {
            dimension.spawnItem(new mc48.ItemStack("minecraft:paper"), block.center());
          } else if (level === 1) {
            if (refineKeycardLevel === 0) {
              dimension.spawnItem(new mc48.ItemStack("minecraft:paper"), block.center());
            } else if (refineKeycardLevel === 1) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard1"), block.center());
            } else if (refineKeycardLevel === 2) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard2"), block.center());
            } else if (refineKeycardLevel === 3) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard3"), block.center());
            } else if (refineKeycardLevel === 4) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard4"), block.center());
            } else if (refineKeycardLevel === 5) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard5"), block.center());
            }
          } else if (level === 2) {
            if (refineKeycardLevel === 0) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard1"), block.center());
            } else if (refineKeycardLevel === 1) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard2"), block.center());
            } else if (refineKeycardLevel === 2) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard3"), block.center());
            } else if (refineKeycardLevel === 3) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard4"), block.center());
            } else if (refineKeycardLevel === 4) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard5"), block.center());
            } else if (refineKeycardLevel === 5) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard_omni"), block.center());
            }
          } else if (level === 3) {
            if (refineKeycardLevel === 0) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard2"), block.center());
            } else if (refineKeycardLevel === 1) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard3"), block.center());
            } else if (refineKeycardLevel === 2) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard4"), block.center());
            } else if (refineKeycardLevel === 3) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard5"), block.center());
            } else if (refineKeycardLevel === 4) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard_omni"), block.center());
            } else if (refineKeycardLevel === 5) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard_o5"), block.center());
            }
          } else if (level === 4) {
            if (refineKeycardLevel < 5) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_keycard_omni"), block.center());
            } else if (refineKeycardLevel === 5) {
              dimension.spawnEntity("lc:dt_scp5167", block.bottomCenter());
            }
          }
          break;
        }
        // source: dystopia orb
        case 3: {
          if (level === 0) {
            dimension.spawnItem(new mc48.ItemStack("lc:dt_scp914_scrap"), block.center());
          } else if (level === 1) {
            if (refineOrbIndex === 0) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_scp914_scrap"), block.center());
            } else {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_scpdystopia_orb"), block.center());
            }
          } else if (level === 2) {
            if (refineOrbIndex === 0) {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_scpdystopia_orb"), block.center());
            } else {
              dimension.spawnItem(
                new mc48.ItemStack("lc:dt_enhanced_scpdystopia_orb"),
                block.center()
              );
            }
          } else if (level === 3) {
            if (refineOrbIndex === 0) {
              dimension.spawnItem(
                new mc48.ItemStack("lc:dt_enhanced_scpdystopia_orb"),
                block.center()
              );
            } else {
              dimension.spawnItem(
                new mc48.ItemStack("lc:dt_enhanced_scpdystopia_orb", randomInt(1, 2)),
                block.center()
              );
            }
          } else if (level === 4) {
            if (refineOrbIndex === 0) {
              dimension.spawnItem(
                new mc48.ItemStack("lc:dt_scpdystopia_orb_block", 2),
                block.center()
              );
            } else {
              dimension.spawnItem(new mc48.ItemStack("lc:dt_imposter_totem"), block.bottomCenter());
            }
          }
          break;
        }
        // source: netherite ingot
        case 14: {
          if (level === 0) {
            dimension.spawnItem(new mc48.ItemStack("minecraft:iron_ingot"), block.bottomCenter());
          } else if (level === 1) {
            dimension.spawnItem(new mc48.ItemStack("minecraft:diamond"), block.bottomCenter());
          } else if (level === 2) {
            dimension.spawnItem(new mc48.ItemStack("minecraft:ancient_debris"), block.bottomCenter());
          } else if (level === 3) {
            dimension.spawnItem(
              new mc48.ItemStack("minecraft:netherite_ingot"),
              block.bottomCenter()
            );
          } else if (level === 4) {
            if (Math.random() < 0.1) {
              dimension.spawnItem(
                new mc48.ItemStack("minecraft:netherite_block"),
                block.bottomCenter()
              );
            } else {
              dimension.spawnEntity("lc:dt_bomb_activator_explode", block.bottomCenter());
            }
          }
          break;
        }
        // source: diamond
        case 15: {
          if (level === 0) {
            dimension.spawnItem(new mc48.ItemStack("minecraft:stone"), block.bottomCenter());
          } else if (level === 1) {
            dimension.spawnItem(new mc48.ItemStack("minecraft:raw_iron"), block.bottomCenter());
          } else if (level === 2) {
            dimension.spawnItem(new mc48.ItemStack("minecraft:diamond_ore"), block.bottomCenter());
          } else if (level === 3) {
            dimension.spawnItem(new mc48.ItemStack("minecraft:diamond"), block.bottomCenter());
          } else if (level === 4) {
            dimension.spawnItem(new mc48.ItemStack("minecraft:diamond"), block.bottomCenter());
            dimension.spawnItem(new mc48.ItemStack("minecraft:diamond"), block.bottomCenter());
          }
          break;
        }
        // source: imposter totem
        case 16: {
          if (level === 2) {
            dimension.spawnItem(new mc48.ItemStack("lc:dt_imposter_totem"), block.bottomCenter());
          } else if (level === 3) {
            dimension.spawnEntity("lc:dt_scp5167", block.bottomCenter());
          } else if (level === 4) {
            dimension.spawnEntity("lc:dt_scp5167_boss", block.bottomCenter());
          }
          break;
        }
      }
    }
  });
});

// src/bp/scripts/core/block_components/scream_sound_loader.ts
var import_gl_matrix4 = __toESM(require_cjs(), 1);
import * as mc49 from "@minecraft/server";
mc49.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:scream_sound_loader", {
    onPlayerInteract({ block, dimension }) {
      const isBroadcasting = !!block.permutation.getState("intercom:broadcasting");
      if (isBroadcasting) return;
      block.setPermutation(block.permutation.withState("intercom:broadcasting", true));
      dimension.playSound("scpdt.scream_loader.scream", block.center(), {
        volume: 5
      });
    },
    onTick({ block, dimension }) {
      const isBroadcasting = !!block.permutation.getState("intercom:broadcasting");
      if (!isBroadcasting) return;
      block.setPermutation(block.permutation.withState("intercom:broadcasting", false));
      const scp106 = dimension.getEntities({
        families: ["scp106"],
        closest: 1,
        location: block.center()
      })[0];
      if (!scp106) return;
      const scp106Container = dimension.getEntities({
        type: "lc:dt_scp106_container",
        closest: 1,
        maxDistance: 32,
        location: block.center()
      })[0];
      const scp106TpLocation = scp106Container ? scp106Container.location : toObj3(import_gl_matrix4.vec3.add(import_gl_matrix4.vec3.create(), toArr3(block.bottomCenter()), [0, 1.1, 0]));
      scp106.teleport(scp106TpLocation);
      dimension.playSound("scpdt.scp106.spawn", scp106TpLocation, { volume: 1.3 });
      if (scp106Container) {
        scp106Container.getComponent("minecraft:rideable").addRider(scp106);
      }
    }
  });
});

// src/bp/scripts/core/block_components/server_rack.ts
import * as mc50 from "@minecraft/server";
mc50.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:server_rack", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      if (!isHoldingWrench(player)) return;
      const serverRackState = Number(block.permutation.getState("server_rack:states"));
      block.setPermutation(
        block.permutation.withState("server_rack:states", serverRackState === 1 ? 2 : 1)
      );
    }
  });
});

// src/bp/scripts/core/block_components/sink.ts
import * as mc51 from "@minecraft/server";
mc51.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:sink", {
    onPlayerInteract({ block, dimension, player }) {
      if (!player) return;
      const sinkState = Number(block.permutation.getState("sink:states"));
      block.setPermutation(block.permutation.withState("sink:states", sinkState === 1 ? 2 : 1));
      if (sinkState === 1) {
        dimension.playSound("scpdt.sink_water", block.center());
      } else {
        runCommandAtBlock(block, "stopsound @a[r=15] scpdt.sink_water");
      }
    },
    onTick({ block, dimension }) {
      dimension.playSound("scpdt.sink_water", block.center());
    }
  });
});

// src/bp/scripts/lib/math_utils.ts
var randf = (min, max) => Math.random() * (max - min) + min;
var flattenCoordinates = (major, minor, minorRange = 4) => minor + major * minorRange;
var unflattenToCoordinates = (flatIndex, minorRange = 4) => ({
  major: Math.floor(flatIndex / minorRange),
  minor: flatIndex % minorRange
});

// src/bp/scripts/core/block_components/sliding_door.ts
import * as mc53 from "@minecraft/server";
var STATE_NAME = {
  isBottomPart: "lc:is_bottom_part",
  action: "lc:action",
  stepMajor: "lc:step_major",
  stepMinor: "lc:step_minor"
};
var MIN_STEP_INDEX = 0;
var MAX_STEP_INDEX = 15;
var getStep = (permutation) => {
  const major = Number(permutation.getState(STATE_NAME.stepMajor));
  const minor = Number(permutation.getState(STATE_NAME.stepMinor));
  return { major, minor };
};
var COMPONENT3 = {
  onPlace({ block }) {
    const isBottomPart = Boolean(block.permutation.getState(STATE_NAME.isBottomPart));
    if (!isBottomPart) {
      const blockBelow = block.below();
      if (!blockBelow || blockBelow.typeId === block.typeId) return;
      block.setType("minecraft:air");
      return;
    }
    const blockAbove = block.above();
    if (!blockAbove || !(blockAbove.isAir || block.isLiquid)) {
      destroyBlock(block);
      return;
    }
    const upperPartPermutation = block.permutation.withState(STATE_NAME.isBottomPart, false);
    blockAbove.setPermutation(upperPartPermutation);
  },
  onPlayerBreak({ block, brokenBlockPermutation }) {
    const isBottomPart = Boolean(brokenBlockPermutation.getState(STATE_NAME.isBottomPart));
    const otherPartBlock = isBottomPart ? block.above() : block.below();
    if (!otherPartBlock || otherPartBlock.typeId !== brokenBlockPermutation.type.id) return;
    destroyBlock(otherPartBlock);
  },
  onPlayerInteract({ block, dimension, player }, arg1) {
    if (!player) return;
    const isBottomPart = Boolean(block.permutation.getState(STATE_NAME.isBottomPart));
    const otherPartBlock = isBottomPart ? block.above() : block.below();
    if (!otherPartBlock || otherPartBlock.typeId !== block.typeId) return;
    const params = arg1.params;
    const minClearanceLevel = params.minClearanceLevel ?? -1;
    const playerClearanceLevel = getEntityClearanceLevel(player);
    const isAccepted = playerClearanceLevel >= minClearanceLevel;
    if (!isAccepted) {
      player.onScreenDisplay.setActionBar({ translate: "dt.guide.not_enough_clearance" });
      return;
    }
    const blockToUpdate = isBottomPart ? block : otherPartBlock;
    const currentAction = blockToUpdate.permutation.getState(STATE_NAME.action);
    const nextAction = currentAction === "close" ? "open" : "close";
    blockToUpdate.setPermutation(
      blockToUpdate.permutation.withState(STATE_NAME.action, nextAction)
    );
    if (minClearanceLevel !== -1) {
      dimension.playSound("scpdt.card_read", block.center());
    }
  },
  onTick({ block, dimension }, arg1) {
    if (mc53.system.currentTick % 2 !== 0) return;
    const params = arg1.params;
    const isBottomPart = Boolean(block.permutation.getState(STATE_NAME.isBottomPart));
    if (!isBottomPart) return;
    const otherPartBlock = isBottomPart ? block.above() : block.below();
    if (!otherPartBlock || otherPartBlock.typeId !== block.typeId) return;
    const currentStep = getStep(block.permutation);
    const currentStepFlat = flattenCoordinates(currentStep.major, currentStep.minor, 4);
    const action = block.permutation.getState(STATE_NAME.action);
    let nextStepFlat = currentStepFlat;
    if (action === "close" && currentStepFlat > MIN_STEP_INDEX) nextStepFlat--;
    if (action === "open" && currentStepFlat < MAX_STEP_INDEX) nextStepFlat++;
    if (nextStepFlat === currentStepFlat) return;
    const nextStep = unflattenToCoordinates(nextStepFlat, 4);
    block.setPermutation(
      block.permutation.withState(STATE_NAME.stepMajor, nextStep.major).withState(STATE_NAME.stepMinor, nextStep.minor)
    );
    otherPartBlock.setPermutation(
      otherPartBlock.permutation.withState(STATE_NAME.stepMajor, nextStep.major).withState(STATE_NAME.stepMinor, nextStep.minor)
    );
    if (params.openSound && action === "open" && nextStepFlat === 1) {
      dimension.playSound(params.openSound.id, block.location, {
        volume: params.openSound.volume,
        pitch: params.openSound.pitch
      });
    }
    if (params.closeSound && action === "close" && nextStepFlat === 14) {
      dimension.playSound(params.closeSound.id, block.location, {
        volume: params.closeSound.volume,
        pitch: params.closeSound.pitch
      });
    }
  }
};
mc53.system.beforeEvents.startup.subscribe((e) => {
  e.blockComponentRegistry.registerCustomComponent("scpdt:sliding_door", COMPONENT3);
});

// src/bp/scripts/core/block_components/stand_light.ts
import * as mc54 from "@minecraft/server";
mc54.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:stand_light", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      const isLit = Boolean(block.permutation.getState("stand_light:lit"));
      block.setPermutation(block.permutation.withState("stand_light:lit", !isLit));
    }
  });
});

// src/bp/scripts/core/block_components/table2.ts
import * as mc55 from "@minecraft/server";
mc55.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:table2", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      if (!isHoldingWrench(player)) return;
      const currentVariant = Number(block.permutation.getState("table2:variant"));
      const nextVariant = currentVariant < 6 ? currentVariant + 1 : 1;
      block.setPermutation(block.permutation.withState("table2:variant", nextVariant));
    }
  });
});

// src/bp/scripts/core/block_components/tesla_shock_block.ts
import * as mc56 from "@minecraft/server";
mc56.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:tesla_shock_block", {
    onStepOn({ block, dimension }) {
      const teslaState = Number(block.permutation.getState("tesla:state"));
      if (teslaState !== 0) return;
      dimension.playSound("scpdt.tesla.windup", block.center(), { volume: 1.5 });
      block.setPermutation(block.permutation.withState("tesla:state", 1));
    },
    onTick({ block, dimension }) {
      const teslaState = Number(block.permutation.getState("tesla:state"));
      if (teslaState === 1) {
        dimension.playSound("scpdt.tesla.shock", block.center(), { volume: 1.5 });
        runCommandAtBlock(block, "effect @e[r=3] instant_damage 1 20 true");
        runCommandAtBlock(block, "summon lightning_bolt ~~1~");
        block.setPermutation(block.permutation.withState("tesla:state", 2));
      } else if (teslaState === 2) {
        block.setPermutation(block.permutation.withState("tesla:state", 0));
      }
    }
  });
});

// src/bp/scripts/core/block_components/tissue_box.ts
import * as mc57 from "@minecraft/server";
mc57.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:tissue_box", {
    onPlayerInteract({ block, dimension }) {
      dimension.playSound("scpdt.tissue_pull", block.center());
      dimension.spawnItem(new mc57.ItemStack("minecraft:paper", 1), block.center());
    }
  });
});

// src/bp/scripts/core/block_components/toilet.ts
import * as mc58 from "@minecraft/server";
mc58.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:toilet", {
    beforeOnPlayerPlace(arg) {
      const shouldBeButtghost = Math.random() < 0.1;
      if (shouldBeButtghost) {
        arg.permutationToPlace = arg.permutationToPlace.withState("toilet:buttghost", 1);
      }
    },
    onPlayerInteract({ block, player }) {
      if (!player) return;
      const isButtghost = block.permutation.getState("toilet:buttghost") === 1;
      const facingDirIndex = getLegacyFacingDirectionIndex(block.permutation);
      const sitDirection = reverseDirection(convertLegacyFacingDirectionToDir(facingDirIndex));
      sit(isButtghost ? "toilet_buttghost" : "toilet", player, block.center(), sitDirection);
    },
    onTick({ block, dimension }) {
      const isButtghost = block.permutation.getState("toilet:buttghost") === 1;
      if (isButtghost) {
        dimension.playSound("scpdt.scp789j.butt", block.center());
      }
    }
  });
});

// src/bp/scripts/core/block_components/towel.ts
import * as mc59 from "@minecraft/server";
mc59.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:towel", {
    onPlayerInteract({ block }) {
      const towelState = Number(block.permutation.getState("towel:state"));
      block.setPermutation(block.permutation.withState("towel:state", towelState === 0 ? 1 : 0));
    }
  });
});

// src/bp/scripts/core/block_components/wall_image.ts
import * as mc60 from "@minecraft/server";
mc60.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:wall_image", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      if (!isHoldingWrench(player)) return;
      const variantStateName = "wall_sign:variant";
      const variant = Number(block.permutation.getState(variantStateName));
      const nextVariant = variant < 4 ? variant + 1 : 0;
      block.setPermutation(block.permutation.withState(variantStateName, nextVariant));
    }
  });
});

// src/bp/scripts/core/block_components/wall_sign.ts
import * as mc61 from "@minecraft/server";
mc61.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:wall_sign", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      if (!isHoldingWrench(player)) return;
      const variantStateName = "wall_sign:variant";
      const variant = Number(block.permutation.getState(variantStateName));
      const nextVariant = variant < 11 ? variant + 1 : 0;
      block.setPermutation(block.permutation.withState(variantStateName, nextVariant));
    }
  });
});

// src/bp/scripts/core/block_components/warehouse_rack.ts
import * as mc62 from "@minecraft/server";
mc62.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:warehouse_rack", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      if (!isHoldingWrench(player)) return;
      const rackState = Number(block.permutation.getState("rack:states"));
      block.setPermutation(
        block.permutation.withState("rack:states", rackState < 4 ? rackState + 1 : 1)
      );
    }
  });
});

// src/bp/scripts/core/block_components/weapon_crate_openable.ts
import * as mc63 from "@minecraft/server";
var lootLabelsByIndex = {
  0: "Random",
  1: "Melee weapons",
  2: "Foods",
  3: "Pistols",
  4: "SMGs",
  5: "Rifles",
  6: "Special firearms",
  7: "Pistol magazines",
  8: "SMG magazines",
  9: "Rifle magazines",
  10: "Misc gun magazines",
  11: "Bow",
  12: "Arrows"
};
mc63.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:weapon_crate_openable", {
    onPlayerInteract({ block, dimension, player }) {
      if (!player) return;
      const crateState = Number(block.permutation.getState("crate:state"));
      const lootIndex = Number(block.permutation.getState("crate:loot"));
      if (!isHoldingWrench(player)) {
        if (crateState === 0) {
          const lootItemStacks = mc63.world.getLootTableManager().generateLootFromBlockPermutation(block.permutation);
          if (lootItemStacks) {
            lootItemStacks.forEach((itemStack) => {
              dimension.spawnItem(itemStack, block.center());
            });
          }
          block.setPermutation(block.permutation.withState("crate:state", 1));
          dimension.playSound("random.chestopen", block.center(), { volume: 0.6 });
        }
        return;
      }
      const nextLootIndex = lootIndex < 12 ? lootIndex + 1 : 0;
      const nextLootLabel = lootLabelsByIndex[nextLootIndex];
      if (nextLootLabel) player.onScreenDisplay.setActionBar(`Set loot to: \xA7l${nextLootLabel}`);
      block.setPermutation(block.permutation.withState("crate:loot", nextLootIndex));
    }
  });
});

// src/bp/scripts/core/block_components/wood_chair.ts
import * as mc64 from "@minecraft/server";
mc64.system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
  blockComponentRegistry.registerCustomComponent("scpdt:wood_chair", {
    onPlayerInteract({ block, player }) {
      if (!player) return;
      const facingDirIndex = getLegacyFacingDirectionIndex(block.permutation);
      const sitDirection = reverseDirection(convertLegacyFacingDirectionToDir(facingDirIndex));
      sit("standard", player, block.center(), sitDirection);
    }
  });
});

// src/bp/scripts/core/item_components/cups/cup_amogus.ts
import * as mc65 from "@minecraft/server";
mc65.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:cup_amogus", {
    onConsume({ source }) {
      if (source instanceof mc65.Player) {
        source.onScreenDisplay.setActionBar("I drank a meme... No...");
      }
      source.dimension.playSound("scpdt.scp294.drink.spit", source.getHeadLocation());
    }
  });
});

// src/bp/scripts/core/item_components/cups/cup_boyfriend.ts
import * as mc66 from "@minecraft/server";
mc66.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:cup_boyfriend", {
    onConsume({ source }) {
      if (source instanceof mc66.Player) {
        source.onScreenDisplay.setActionBar("Uh... damn, it tastes weird...");
      }
      source.dimension.playSound("scpdt.scp294.drink.cough", source.getHeadLocation());
    }
  });
});

// src/bp/scripts/core/item_components/cups/cup_coffee.ts
import * as mc67 from "@minecraft/server";
mc67.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:cup_coffee", {
    onConsume({ source }) {
      if (source instanceof mc67.Player) {
        source.onScreenDisplay.setActionBar("Bitter, but tasty...");
      }
      source.dimension.playSound("scpdt.scp294.drink.ahh", source.getHeadLocation());
    }
  });
});

// src/bp/scripts/core/item_components/cups/cup_cola.ts
import * as mc68 from "@minecraft/server";
mc68.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:cup_cola", {
    onConsume({ source }) {
      if (source instanceof mc68.Player) {
        source.onScreenDisplay.setActionBar("I'm little bit sugar high now...");
      }
      source.dimension.playSound("scpdt.scp294.drink.ahh", source.getHeadLocation());
      source.addEffect("night_vision", 15 * mc68.TicksPerSecond);
    }
  });
});

// src/bp/scripts/core/item_components/cups/cup_girlfriend.ts
import * as mc69 from "@minecraft/server";
mc69.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:cup_girlfriend", {
    onConsume({ source }) {
      if (source instanceof mc69.Player) {
        source.onScreenDisplay.setActionBar("It reminds me of... never mind.");
      }
      source.dimension.playSound("scpdt.scp294.drink.ew", source.getHeadLocation());
    }
  });
});

// src/bp/scripts/core/item_components/cups/cup_gold.ts
import * as mc70 from "@minecraft/server";
mc70.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:cup_gold", {
    onConsume({ source }) {
      if (source instanceof mc70.Player) {
        source.onScreenDisplay.setActionBar("I feel wealthy now!!");
      }
      source.dimension.playSound("scpdt.scp294.drink.ahh", source.getHeadLocation());
      source.dimension.spawnItem(
        new mc70.ItemStack("minecraft:gold_nugget", 1),
        source.getHeadLocation()
      );
    }
  });
});

// src/bp/scripts/core/item_components/cups/cup_iron.ts
import * as mc71 from "@minecraft/server";
mc71.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:cup_iron", {
    onConsume({ source }) {
      if (source instanceof mc71.Player) {
        source.onScreenDisplay.setActionBar("I'm iron hard!!");
      }
      source.dimension.playSound("scpdt.scp294.drink.ahh", source.getHeadLocation());
      source.addEffect("resistance", 15 * mc71.TicksPerSecond, { amplifier: 1 });
    }
  });
});

// src/bp/scripts/core/item_components/cups/cup_me.ts
import * as mc72 from "@minecraft/server";
mc72.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:cup_me", {
    onConsume({ source }) {
      source.dimension.playSound("scpdt.scp294.drink.vomit", source.getHeadLocation());
      source.applyDamage(45451919, {
        cause: mc72.EntityDamageCause.selfDestruct,
        damagingEntity: source
      });
    }
  });
});

// src/bp/scripts/core/item_components/cups/cup_orange_juice.ts
import * as mc73 from "@minecraft/server";
mc73.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:cup_orange_juice", {
    onConsume({ source }) {
      if (source instanceof mc73.Player) {
        source.onScreenDisplay.setActionBar("Wow, fresh orange!");
      }
      source.dimension.playSound("scpdt.scp294.drink.ahh", source.getHeadLocation());
    }
  });
});

// src/bp/scripts/core/item_components/cups/cup_pizza.ts
import * as mc74 from "@minecraft/server";
mc74.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:cup_pizza", {
    onConsume({ source }) {
      if (source instanceof mc74.Player) {
        source.onScreenDisplay.setActionBar("It's definitely not for drink...");
      }
      source.dimension.playSound("scpdt.scp294.drink.spit", source.getHeadLocation());
    }
  });
});

// src/bp/scripts/core/item_components/cups/cup_water.ts
import * as mc75 from "@minecraft/server";
mc75.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:cup_water", {
    onConsume({ source }) {
      if (source instanceof mc75.Player) {
        source.onScreenDisplay.setActionBar("Mmm, feeling fresh.");
      }
      source.dimension.playSound("scpdt.scp294.drink.ahh", source.getHeadLocation());
    }
  });
});

// src/bp/scripts/core/item_components/gun/ak.ts
var import_gl_matrix5 = __toESM(require_cjs(), 1);
import * as mc76 from "@minecraft/server";
var itemType = "lc:dt_ak";
var emptyItemType = "lc:dt_ak_empty";
var magItemType = "lc:dt_ak_mag";
var reloadingCooldownCategory = "dt_ak_reloading";
var reloadingSound = "scpdt.ak.reload";
var shootProjectile = (source, projectileType) => {
  const projectile = source.dimension.spawnEntity(projectileType, source.getHeadLocation());
  const projectileComp = projectile.getComponent("projectile");
  projectileComp.owner = source;
  const force = import_gl_matrix5.vec3.scale(import_gl_matrix5.vec3.create(), toArr3(source.getViewDirection()), 3);
  projectileComp.shoot(toObj3(force));
};
mc76.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:ak", {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithEmpty = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithEmpty) {
        source.dimension.playSound("scpdt.gun.shot_dry", source.getHeadLocation());
        const emptyItem = new mc76.ItemStack(emptyItemType);
        equippable.setEquipment(mc76.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      durability.damage++;
      equippable.setEquipment(mc76.EquipmentSlot.Mainhand, itemStack);
      source.dimension.playSound("scpdt.ak.shot", source.getHeadLocation());
      source.playAnimation("animation.dt_misc.player_gun_fire");
      source.runCommand("tp @s[tag=gun_recoil_on] ~~~ facing ^ ^0.03 ^1");
      if (!source.isOnGround) {
        source.runCommand("camerashake add @s 0.2 0.23 rotational");
        source.onScreenDisplay.setActionBar("\xA7c-          \xA7f+          \xA7c-");
        shootProjectile(source, "lc:dt_ak_bullet_player_uncertain");
      } else if (!source.isSneaking) {
        source.runCommand("camerashake add @s 0.09 0.1 rotational");
        source.onScreenDisplay.setActionBar("\xA7c-  \xA7f+  \xA7c-");
        shootProjectile(source, "lc:dt_ak_bullet_player");
      } else {
        source.runCommand("camerashake add @s 0.05 0.1 rotational");
        source.onScreenDisplay.setActionBar("\xA7c-\xA7f+\xA7c-");
        shootProjectile(source, "lc:dt_ak_bullet_player_sneak");
      }
    }
  });
  e.itemComponentRegistry.registerCustomComponent("scpdt:ak_empty", {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const isCorrectItem = equippable.getEquipment(mc76.EquipmentSlot.Mainhand)?.type === itemStack.type;
      if (!isCorrectItem) return;
      if (source.getItemCooldown(reloadingCooldownCategory) > 0) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.still_reloading" });
        return;
      }
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithLoaded = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithLoaded) {
        source.dimension.playSound("scpdt.gun.reload_complete", source.getHeadLocation());
        const emptyItem = new mc76.ItemStack(itemType);
        equippable.setEquipment(mc76.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      const offhandItem = equippable.getEquipment(mc76.EquipmentSlot.Offhand);
      if (!offhandItem || offhandItem.typeId !== magItemType) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.equip_mag_on_offhand" });
        return;
      }
      equippable.setEquipment(mc76.EquipmentSlot.Offhand, void 0);
      durability.damage++;
      equippable.setEquipment(mc76.EquipmentSlot.Mainhand, itemStack);
      source.startItemCooldown(reloadingCooldownCategory, 4 * mc76.TicksPerSecond);
      source.dimension.playSound(reloadingSound, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.gun_reload_short");
      source.addEffect("slowness", 4 * mc76.TicksPerSecond, { amplifier: 0, showParticles: false });
    }
  });
});

// src/bp/scripts/core/item_components/gun/dystopia_rifle.ts
var import_gl_matrix6 = __toESM(require_cjs(), 1);
import * as mc77 from "@minecraft/server";
var shootProjectile2 = (source, projectileType, launchPower) => {
  const projectile = source.dimension.spawnEntity(projectileType, source.getHeadLocation());
  const projectileComp = projectile.getComponent("projectile");
  projectileComp.owner = source;
  const force = import_gl_matrix6.vec3.scale(import_gl_matrix6.vec3.create(), toArr3(source.getViewDirection()), launchPower);
  projectileComp.shoot(toObj3(force));
};
mc77.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:dystopia_rifle", {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      const durability = itemStack.getComponent("durability");
      if (durability.damage !== 0) {
        const offhandSlot = equippable.getEquipmentSlot(mc77.EquipmentSlot.Offhand);
        if (!offhandSlot.hasItem() || offhandSlot.typeId !== "lc:dt_dtrifle_ammo") {
          source.onScreenDisplay.setActionBar({ translate: "dt.guide.equip_ammo_on_offhand" });
          return;
        }
        durability.damage = 0;
        equippable.setEquipment(mc77.EquipmentSlot.Mainhand, itemStack);
        offhandSlot.setItem(new mc77.ItemStack("lc:dt_dtrifle_ammo_empty", 1));
        source.addEffect("slowness", 4 * mc77.TicksPerSecond, { amplifier: 2, showParticles: false });
        source.dimension.playSound("scpdt.dtrifle.reload", source.getHeadLocation());
        return;
      }
      durability.damage++;
      equippable.setEquipment(mc77.EquipmentSlot.Mainhand, itemStack);
      source.addEffect("slowness", 1 * mc77.TicksPerSecond, { amplifier: 2, showParticles: false });
      source.dimension.playSound("scpdt.dtrifle.shot", source.getHeadLocation(), { volume: 1.5 });
      source.runCommand("camerashake add @s 0.3 0.24 positional");
      source.runCommand("tp @s[tag=gun_recoil_on] ~~~ facing ^ ^0.28 ^5");
      source.onScreenDisplay.setActionBar("\xA7b>>>> \xA7c+ \xA7b<<<<");
      if (source.isSneaking) {
        shootProjectile2(source, "lc:dt_dtrifle_bullet_player_sneak", 5);
      } else {
        shootProjectile2(source, "lc:dt_dtrifle_bullet_player", 4);
      }
    }
  });
});

// src/bp/scripts/core/item_components/gun/flamethrower.ts
import * as mc78 from "@minecraft/server";
var shootProjectile3 = (source, projectileType) => {
  const flameEntity = source.dimension.spawnEntity(projectileType, source.getHeadLocation());
  const flameProjectileComp = flameEntity.getComponent("projectile");
  flameProjectileComp.owner = source;
  flameProjectileComp.shoot(source.getViewDirection());
};
var shootProjectileTwice = (source, projectileType) => {
  shootProjectile3(source, projectileType);
  mc78.system.runTimeout(() => {
    shootProjectile3(source, projectileType);
  }, 2);
};
mc78.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:flamethrower", {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const isCorrectItem = equippable.getEquipment(mc78.EquipmentSlot.Mainhand)?.type === itemStack.type;
      if (!isCorrectItem) return;
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithEmpty = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithEmpty) {
        source.dimension.playSound("scpdt.gun.shot_dry", source.getHeadLocation());
        const emptyItem = new mc78.ItemStack("lc:dt_flamethrower_empty");
        equippable.setEquipment(mc78.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      durability.damage++;
      equippable.setEquipment(mc78.EquipmentSlot.Mainhand, itemStack);
      source.dimension.playSound("scpdt.flamethrower.fire", source.getHeadLocation());
      source.playAnimation("animation.dt_misc.player_gun_fire");
      source.runCommand("tp @s[tag=gun_recoil_on] ~~~ facing ^ ^0.02 ^1");
      if (!source.isOnGround) {
        source.runCommand("camerashake add @s 0.5 0.23 rotational");
        source.onScreenDisplay.setActionBar("\xA7c(         \xA7f+         \xA7c)");
        shootProjectileTwice(source, "lc:dt_flame_player_uncertain");
      } else if (!source.isSneaking) {
        source.runCommand("camerashake add @s 0.17 0.23 rotational");
        source.onScreenDisplay.setActionBar("\xA7c(    \xA7f+    \xA7c)");
        shootProjectileTwice(source, "lc:dt_flame_player");
      } else {
        source.runCommand("camerashake add @s 0.13 0.37 rotational");
        source.onScreenDisplay.setActionBar("\xA7c(  \xA7f+  \xA7c)");
        shootProjectileTwice(source, "lc:dt_flame_player_sneak");
      }
    }
  });
});
mc78.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:flamethrower_empty", {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const isCorrectItem = equippable.getEquipment(mc78.EquipmentSlot.Mainhand)?.type === itemStack.type;
      if (!isCorrectItem) return;
      if (source.getItemCooldown("dt_ft_reloading") > 0) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.still_reloading" });
        return;
      }
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithLoaded = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithLoaded) {
        source.dimension.playSound("scpdt.gun.reload_complete", source.getHeadLocation());
        const emptyItem = new mc78.ItemStack("lc:dt_flamethrower");
        equippable.setEquipment(mc78.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      const offhandItem = equippable.getEquipment(mc78.EquipmentSlot.Offhand);
      if (!offhandItem || offhandItem.typeId !== "lc:dt_flamethrower_fuel") {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.equip_mag_on_offhand" });
        return;
      }
      equippable.setEquipment(mc78.EquipmentSlot.Offhand, void 0);
      durability.damage++;
      equippable.setEquipment(mc78.EquipmentSlot.Mainhand, itemStack);
      source.startItemCooldown("dt_ft_reloading", 7.63 * mc78.TicksPerSecond);
      source.playAnimation("animation.dt_misc.gun_reload_extra_long");
      source.dimension.playSound("scpdt.flamethrower.reload", source.getHeadLocation());
      source.addEffect("slowness", 7 * mc78.TicksPerSecond, { amplifier: 1 });
    }
  });
});

// src/bp/scripts/core/item_components/gun/glock.ts
var import_gl_matrix7 = __toESM(require_cjs(), 1);
import * as mc79 from "@minecraft/server";
var componentName = "scpdt:glock";
var componentNameEmpty = "scpdt:glock_empty";
var itemType2 = "lc:dt_glock";
var emptyItemType2 = "lc:dt_glock_empty";
var magItemType2 = "lc:dt_glock_mag";
var emptyMagItemType = "lc:dt_glock_mag_empty";
var bulletTypeUncertain = "lc:dt_glock_bullet_player_uncertain";
var bulletTypeNormal = "lc:dt_glock_bullet_player";
var bulletTypeSneak = "lc:dt_glock_bullet_player_sneak";
var shootingSound = "scpdt.glock.shot";
var reloadingCooldownCategory2 = "dt_glock_reloading";
var reloadingSound2 = "scpdt.glock.reload";
var shootProjectile4 = (source, projectileType, launchPower) => {
  const projectile = source.dimension.spawnEntity(projectileType, source.getHeadLocation());
  const projectileComp = projectile.getComponent("projectile");
  projectileComp.owner = source;
  const force = import_gl_matrix7.vec3.scale(import_gl_matrix7.vec3.create(), toArr3(source.getViewDirection()), launchPower);
  projectileComp.shoot(toObj3(force));
};
mc79.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent(componentName, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithEmpty = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithEmpty) {
        source.dimension.playSound("scpdt.gun.shot_dry", source.getHeadLocation());
        const emptyItem = new mc79.ItemStack(emptyItemType2);
        equippable.setEquipment(mc79.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      durability.damage++;
      equippable.setEquipment(mc79.EquipmentSlot.Mainhand, itemStack);
      source.dimension.playSound(shootingSound, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.player_gun_fire");
      source.runCommand("tp @s[tag=gun_recoil_on] ~~~ facing ^ ^0.03 ^1");
      if (!source.isOnGround) {
        source.runCommand("camerashake add @s 0.15 0.16 rotational");
        source.onScreenDisplay.setActionBar("\xA7c-      \xA7f+      \xA7c-");
        shootProjectile4(source, bulletTypeUncertain, 1.6);
      } else if (!source.isSneaking) {
        source.runCommand("camerashake add @s 0.05 0.12 rotational");
        source.onScreenDisplay.setActionBar("\xA7c- \xA7f+ \xA7c-");
        shootProjectile4(source, bulletTypeNormal, 1.6);
      } else {
        source.runCommand("camerashake add @s 0.04 0.11 rotational");
        source.onScreenDisplay.setActionBar("\xA7c-\xA7f+\xA7c-");
        shootProjectile4(source, bulletTypeSneak, 1.6);
      }
    }
  });
  e.itemComponentRegistry.registerCustomComponent(componentNameEmpty, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const isCorrectItem = equippable.getEquipment(mc79.EquipmentSlot.Mainhand)?.type === itemStack.type;
      if (!isCorrectItem) return;
      if (source.getItemCooldown(reloadingCooldownCategory2) > 0) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.still_reloading" });
        return;
      }
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithLoaded = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithLoaded) {
        source.dimension.playSound("scpdt.gun.reload_complete", source.getHeadLocation());
        const emptyItem = new mc79.ItemStack(itemType2);
        equippable.setEquipment(mc79.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      const offhandItem = equippable.getEquipment(mc79.EquipmentSlot.Offhand);
      if (!offhandItem || offhandItem.typeId !== magItemType2) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.equip_mag_on_offhand" });
        return;
      }
      equippable.setEquipment(mc79.EquipmentSlot.Offhand, new mc79.ItemStack(emptyMagItemType, 1));
      durability.damage++;
      equippable.setEquipment(mc79.EquipmentSlot.Mainhand, itemStack);
      source.startItemCooldown(reloadingCooldownCategory2, 1.86 * mc79.TicksPerSecond);
      source.dimension.playSound(reloadingSound2, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.gun_reload_short");
      source.addEffect("slowness", 4 * mc79.TicksPerSecond, { amplifier: 0, showParticles: false });
    }
  });
});

// src/bp/scripts/core/item_components/gun/high_intensity_gun.ts
var import_gl_matrix8 = __toESM(require_cjs(), 1);
import * as mc80 from "@minecraft/server";
var componentName2 = "scpdt:high_intensity_gun";
var componentNameEmpty2 = "scpdt:high_intensity_gun_empty";
var itemType3 = "lc:dt_high_intensity_gun";
var emptyItemType3 = "lc:dt_high_intensity_gun_empty";
var magItemType3 = "lc:dt_hig_mag";
var emptyMagItemType2 = "lc:dt_hig_mag_empty";
var bulletTypeNormal2 = "lc:dt_hig_bullet_player";
var bulletTypeSneak2 = "lc:dt_hig_bullet_player_sneak";
var shootingSound2 = "scpdt.hig.shoot";
var reloadingCooldownCategory3 = "hig_reload";
var reloadingSound3 = "scpdt.hig.reload";
var shootProjectile5 = (source, projectileType, launchPower) => {
  const projectile = source.dimension.spawnEntity(projectileType, source.getHeadLocation());
  const projectileComp = projectile.getComponent("projectile");
  projectileComp.owner = source;
  const force = import_gl_matrix8.vec3.scale(import_gl_matrix8.vec3.create(), toArr3(source.getViewDirection()), launchPower);
  projectileComp.shoot(toObj3(force));
};
mc80.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent(componentName2, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithEmpty = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithEmpty) {
        source.dimension.playSound("scpdt.gun.shot_dry", source.getHeadLocation());
        const emptyItem = new mc80.ItemStack(emptyItemType3);
        equippable.setEquipment(mc80.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      durability.damage++;
      equippable.setEquipment(mc80.EquipmentSlot.Mainhand, itemStack);
      source.dimension.playSound(shootingSound2, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.player_gun_fire");
      source.runCommand("tp @s[tag=gun_recoil_on] ~~~ facing ^ ^0.08 ^1");
      if (source.isSneaking) {
        source.runCommand("camerashake add @s 0.1 0.2 rotational");
        source.onScreenDisplay.setActionBar("\xA7c>\xA7e+\xA7c<");
        shootProjectile5(source, bulletTypeSneak2, 16);
      } else {
        source.runCommand("camerashake add @s 0.2 0.2 rotational");
        source.onScreenDisplay.setActionBar("\xA7c>  \xA7f+  \xA7c<");
        shootProjectile5(source, bulletTypeNormal2, 16);
      }
    }
  });
  e.itemComponentRegistry.registerCustomComponent(componentNameEmpty2, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const isCorrectItem = equippable.getEquipment(mc80.EquipmentSlot.Mainhand)?.type === itemStack.type;
      if (!isCorrectItem) return;
      if (source.getItemCooldown(reloadingCooldownCategory3) > 0) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.still_reloading" });
        return;
      }
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithLoaded = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithLoaded) {
        source.dimension.playSound("scpdt.gun.reload_complete", source.getHeadLocation());
        const emptyItem = new mc80.ItemStack(itemType3);
        equippable.setEquipment(mc80.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      const offhandItem = equippable.getEquipment(mc80.EquipmentSlot.Offhand);
      if (!offhandItem || offhandItem.typeId !== magItemType3) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.equip_mag_on_offhand" });
        return;
      }
      equippable.setEquipment(mc80.EquipmentSlot.Offhand, new mc80.ItemStack(emptyMagItemType2));
      durability.damage++;
      equippable.setEquipment(mc80.EquipmentSlot.Mainhand, itemStack);
      source.startItemCooldown(reloadingCooldownCategory3, 4.8 * mc80.TicksPerSecond);
      source.dimension.playSound(reloadingSound3, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.gun_reload_long");
      source.addEffect("slowness", 4 * mc80.TicksPerSecond, { amplifier: 0, showParticles: false });
    }
  });
});

// src/bp/scripts/core/item_components/gun/m4a1.ts
var import_gl_matrix9 = __toESM(require_cjs(), 1);
import * as mc81 from "@minecraft/server";
var componentName3 = "scpdt:m4a1";
var componentNameEmpty3 = "scpdt:m4a1_empty";
var itemType4 = "lc:dt_m4a1";
var emptyItemType4 = "lc:dt_m4a1_empty";
var magItemType4 = "lc:dt_m16_mag";
var emptyMagItemType3 = "lc:dt_m16_mag_empty";
var bulletTypeUncertain2 = "lc:dt_m4a1_bullet_player_uncertain";
var bulletTypeNormal3 = "lc:dt_m4a1_bullet_player";
var bulletTypeSneak3 = "lc:dt_m4a1_bullet_player_sneak";
var shootingSound3 = "scpdt.m4a1.shot";
var reloadingCooldownCategory4 = "dt_m4a1_reload";
var reloadingSound4 = "scpdt.m4a1.reload";
var shootProjectile6 = (source, projectileType, launchPower) => {
  const projectile = source.dimension.spawnEntity(projectileType, source.getHeadLocation());
  const projectileComp = projectile.getComponent("projectile");
  projectileComp.owner = source;
  const force = import_gl_matrix9.vec3.scale(import_gl_matrix9.vec3.create(), toArr3(source.getViewDirection()), launchPower);
  projectileComp.shoot(toObj3(force));
};
mc81.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent(componentName3, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithEmpty = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithEmpty) {
        source.dimension.playSound("scpdt.gun.shot_dry", source.getHeadLocation());
        const emptyItem = new mc81.ItemStack(emptyItemType4);
        equippable.setEquipment(mc81.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      durability.damage++;
      equippable.setEquipment(mc81.EquipmentSlot.Mainhand, itemStack);
      source.dimension.playSound(shootingSound3, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.player_gun_fire");
      source.runCommand("tp @s[tag=gun_recoil_on] ~~~ facing ^ ^0.04 ^1");
      if (!source.isOnGround) {
        source.runCommand("camerashake add @s 0.15 0.16 rotational");
        source.onScreenDisplay.setActionBar("\xA7c>>         \xA77+         \xA7c<<");
        shootProjectile6(source, bulletTypeUncertain2, 3);
      } else if (!source.isSneaking) {
        source.runCommand("camerashake add @s 0.08 0.17 rotational");
        source.onScreenDisplay.setActionBar("\xA7c>>    \xA7f+    \xA7c<<");
        shootProjectile6(source, bulletTypeNormal3, 3);
      } else {
        source.runCommand("camerashake add @s 0.06 0.15 rotational");
        source.onScreenDisplay.setActionBar("\xA7c>>\xA7e+\xA7c<<");
        shootProjectile6(source, bulletTypeSneak3, 3);
      }
    }
  });
  e.itemComponentRegistry.registerCustomComponent(componentNameEmpty3, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const isCorrectItem = equippable.getEquipment(mc81.EquipmentSlot.Mainhand)?.type === itemStack.type;
      if (!isCorrectItem) return;
      if (source.getItemCooldown(reloadingCooldownCategory4) > 0) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.still_reloading" });
        return;
      }
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithLoaded = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithLoaded) {
        source.dimension.playSound("scpdt.gun.reload_complete", source.getHeadLocation());
        const emptyItem = new mc81.ItemStack(itemType4);
        equippable.setEquipment(mc81.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      const offhandItem = equippable.getEquipment(mc81.EquipmentSlot.Offhand);
      if (!offhandItem || offhandItem.typeId !== magItemType4) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.equip_mag_on_offhand" });
        return;
      }
      equippable.setEquipment(mc81.EquipmentSlot.Offhand, new mc81.ItemStack(emptyMagItemType3));
      durability.damage++;
      equippable.setEquipment(mc81.EquipmentSlot.Mainhand, itemStack);
      source.startItemCooldown(reloadingCooldownCategory4, 3 * mc81.TicksPerSecond);
      source.dimension.playSound(reloadingSound4, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.gun_reload_medium");
      source.addEffect("slowness", 3 * mc81.TicksPerSecond, { amplifier: 0, showParticles: false });
    }
  });
});

// src/bp/scripts/core/item_components/gun/m16.ts
var import_gl_matrix10 = __toESM(require_cjs(), 1);
import * as mc82 from "@minecraft/server";
var componentName4 = "scpdt:m16";
var componentNameEmpty4 = "scpdt:m16_empty";
var itemType5 = "lc:dt_m16";
var emptyItemType5 = "lc:dt_m16_empty";
var magItemType5 = "lc:dt_m16_mag";
var emptyMagItemType4 = "lc:dt_m16_mag_empty";
var bulletTypeNormal4 = "lc:dt_m16_bullet_player";
var bulletTypeSneak4 = "lc:dt_m16_bullet_player_sneak";
var shootingSound4 = "scpdt.m16.shot";
var reloadingCooldownCategory5 = "dt_m16_reloading";
var reloadingSound5 = "scpdt.m16.reload";
var shootProjectile7 = (source, projectileType, launchPower) => {
  const projectile = source.dimension.spawnEntity(projectileType, source.getHeadLocation());
  const projectileComp = projectile.getComponent("projectile");
  projectileComp.owner = source;
  const force = import_gl_matrix10.vec3.scale(import_gl_matrix10.vec3.create(), toArr3(source.getViewDirection()), launchPower);
  projectileComp.shoot(toObj3(force));
};
mc82.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent(componentName4, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithEmpty = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithEmpty) {
        source.dimension.playSound("scpdt.gun.shot_dry", source.getHeadLocation());
        const emptyItem = new mc82.ItemStack(emptyItemType5);
        equippable.setEquipment(mc82.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      durability.damage++;
      equippable.setEquipment(mc82.EquipmentSlot.Mainhand, itemStack);
      source.dimension.playSound(shootingSound4, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.player_gun_fire");
      source.runCommand("tp @s[tag=gun_recoil_on] ~~~ facing ^ ^0.03 ^1");
      source.addEffect("slowness", 1 * mc82.TicksPerSecond, { amplifier: 1, showParticles: false });
      if (source.isSneaking) {
        source.runCommand("camerashake add @s 0.09 0.18 positional");
        source.onScreenDisplay.setActionBar("\xA7c>>\xA7e+\xA7c<<");
        shootProjectile7(source, bulletTypeNormal4, 5);
      } else {
        source.runCommand("camerashake add @s 0.41 0.33 positional");
        source.onScreenDisplay.setActionBar("\xA7c>>   \xA7f+   \xA7c<<");
        shootProjectile7(source, bulletTypeSneak4, 5);
      }
    }
  });
  e.itemComponentRegistry.registerCustomComponent(componentNameEmpty4, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const isCorrectItem = equippable.getEquipment(mc82.EquipmentSlot.Mainhand)?.type === itemStack.type;
      if (!isCorrectItem) return;
      if (source.getItemCooldown(reloadingCooldownCategory5) > 0) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.still_reloading" });
        return;
      }
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithLoaded = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithLoaded) {
        source.dimension.playSound("scpdt.gun.reload_complete", source.getHeadLocation());
        const emptyItem = new mc82.ItemStack(itemType5);
        equippable.setEquipment(mc82.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      const offhandItem = equippable.getEquipment(mc82.EquipmentSlot.Offhand);
      if (!offhandItem || offhandItem.typeId !== magItemType5) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.equip_mag_on_offhand" });
        return;
      }
      equippable.setEquipment(mc82.EquipmentSlot.Offhand, new mc82.ItemStack(emptyMagItemType4, 1));
      durability.damage++;
      equippable.setEquipment(mc82.EquipmentSlot.Mainhand, itemStack);
      source.startItemCooldown(reloadingCooldownCategory5, 4 * mc82.TicksPerSecond);
      source.dimension.playSound(reloadingSound5, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.gun_reload_medium");
      source.addEffect("slowness", 4 * mc82.TicksPerSecond, { amplifier: 0, showParticles: false });
    }
  });
});

// src/bp/scripts/core/item_components/gun/mp5a3.ts
var import_gl_matrix11 = __toESM(require_cjs(), 1);
import * as mc83 from "@minecraft/server";
var componentName5 = "scpdt:mp5a3";
var componentNameEmpty5 = "scpdt:mp5a3_empty";
var itemType6 = "lc:dt_mp5a3";
var emptyItemType6 = "lc:dt_mp5a3_empty";
var magItemType6 = "lc:dt_mp5_mag";
var emptyMagItemType5 = "lc:dt_mp5_mag_empty";
var bulletTypeUncertain3 = "lc:dt_mp5a3_bullet_player_uncertain";
var bulletTypeNormal5 = "lc:dt_mp5a3_bullet_player";
var bulletTypeSneak5 = "lc:dt_mp5a3_bullet_player_sneak";
var shootingSound5 = "scpdt.mp5a3.shot";
var reloadingCooldownCategory6 = "dt_mp5a3_reloading";
var reloadingSound6 = "scpdt.mp5a3.reload";
var shootProjectile8 = (source, projectileType, launchPower) => {
  const projectile = source.dimension.spawnEntity(projectileType, source.getHeadLocation());
  const projectileComp = projectile.getComponent("projectile");
  projectileComp.owner = source;
  const force = import_gl_matrix11.vec3.scale(import_gl_matrix11.vec3.create(), toArr3(source.getViewDirection()), launchPower);
  projectileComp.shoot(toObj3(force));
};
mc83.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent(componentName5, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithEmpty = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithEmpty) {
        source.dimension.playSound("scpdt.gun.shot_dry", source.getHeadLocation());
        const emptyItem = new mc83.ItemStack(emptyItemType6);
        equippable.setEquipment(mc83.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      durability.damage++;
      equippable.setEquipment(mc83.EquipmentSlot.Mainhand, itemStack);
      source.dimension.playSound(shootingSound5, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.player_gun_fire");
      source.runCommand("tp @s[tag=gun_recoil_on] ~~~ facing ^ ^0.03 ^1");
      if (!source.isOnGround) {
        source.runCommand("camerashake add @s 0.24 0.28 rotational");
        source.onScreenDisplay.setActionBar("\xA7c>>        \xA77+        \xA7c<<");
        shootProjectile8(source, bulletTypeUncertain3, 2);
      } else if (!source.isSneaking) {
        source.runCommand("camerashake add @s 0.14 0.2 rotational");
        source.onScreenDisplay.setActionBar("\xA7c>>     \xA7f+     \xA7c<<");
        shootProjectile8(source, bulletTypeNormal5, 2);
      } else {
        source.runCommand("camerashake add @s 0.1 0.18 rotational");
        source.onScreenDisplay.setActionBar("\xA7c>> \xA7e+ \xA7c<<");
        shootProjectile8(source, bulletTypeSneak5, 2);
      }
    }
  });
  e.itemComponentRegistry.registerCustomComponent(componentNameEmpty5, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const isCorrectItem = equippable.getEquipment(mc83.EquipmentSlot.Mainhand)?.type === itemStack.type;
      if (!isCorrectItem) return;
      if (source.getItemCooldown(reloadingCooldownCategory6) > 0) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.still_reloading" });
        return;
      }
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithLoaded = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithLoaded) {
        source.dimension.playSound("scpdt.gun.reload_complete", source.getHeadLocation());
        const emptyItem = new mc83.ItemStack(itemType6);
        equippable.setEquipment(mc83.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      const offhandItem = equippable.getEquipment(mc83.EquipmentSlot.Offhand);
      if (!offhandItem || offhandItem.typeId !== magItemType6) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.equip_mag_on_offhand" });
        return;
      }
      equippable.setEquipment(mc83.EquipmentSlot.Offhand, new mc83.ItemStack(emptyMagItemType5, 1));
      durability.damage++;
      equippable.setEquipment(mc83.EquipmentSlot.Mainhand, itemStack);
      source.startItemCooldown(reloadingCooldownCategory6, 5.8 * mc83.TicksPerSecond);
      source.dimension.playSound(reloadingSound6, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.gun_reload_long");
      source.addEffect("slowness", 5 * mc83.TicksPerSecond, { amplifier: 1, showParticles: false });
    }
  });
});

// src/bp/scripts/core/item_components/gun/mp5k.ts
var import_gl_matrix12 = __toESM(require_cjs(), 1);
import * as mc84 from "@minecraft/server";
var componentName6 = "scpdt:mp5k";
var componentNameEmpty6 = "scpdt:mp5k_empty";
var itemType7 = "lc:dt_mp5k";
var emptyItemType7 = "lc:dt_mp5k_empty";
var magItemType7 = "lc:dt_mp5_mag";
var emptyMagItemType6 = "lc:dt_mp5_mag_empty";
var bulletTypeNormal6 = "lc:dt_mp5k_bullet_player";
var bulletTypeSneak6 = "lc:dt_mp5k_bullet_player_sneak";
var shootingSound6 = "scpdt.hk_mp5.shot";
var reloadingCooldownCategory7 = "dt_mp5k_reloading";
var reloadingSound7 = "scpdt.mp5k.reload";
var shootProjectile9 = (source, projectileType, launchPower) => {
  const projectile = source.dimension.spawnEntity(projectileType, source.getHeadLocation());
  const projectileComp = projectile.getComponent("projectile");
  projectileComp.owner = source;
  const force = import_gl_matrix12.vec3.scale(import_gl_matrix12.vec3.create(), toArr3(source.getViewDirection()), launchPower);
  projectileComp.shoot(toObj3(force));
};
mc84.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent(componentName6, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithEmpty = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithEmpty) {
        source.dimension.playSound("scpdt.gun.shot_dry", source.getHeadLocation());
        const emptyItem = new mc84.ItemStack(emptyItemType7);
        equippable.setEquipment(mc84.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      durability.damage++;
      equippable.setEquipment(mc84.EquipmentSlot.Mainhand, itemStack);
      source.dimension.playSound(shootingSound6, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.player_gun_fire");
      source.runCommand("tp @s[tag=gun_recoil_on] ~~~ facing ^ ^0.03 ^1");
      if (source.isSneaking) {
        source.runCommand("camerashake add @s 0.15 0.2 positional");
        source.onScreenDisplay.setActionBar("\xA7c>>   \xA7e+   \xA7c<<");
        shootProjectile9(source, bulletTypeSneak6, 2);
      } else {
        source.runCommand("camerashake add @s 0.2 0.2 positional");
        source.onScreenDisplay.setActionBar("\xA7c>>      \xA7f+      \xA7c<<");
        shootProjectile9(source, bulletTypeNormal6, 2);
      }
    }
  });
  e.itemComponentRegistry.registerCustomComponent(componentNameEmpty6, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const isCorrectItem = equippable.getEquipment(mc84.EquipmentSlot.Mainhand)?.type === itemStack.type;
      if (!isCorrectItem) return;
      if (source.getItemCooldown(reloadingCooldownCategory7) > 0) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.still_reloading" });
        return;
      }
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithLoaded = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithLoaded) {
        source.dimension.playSound("scpdt.gun.reload_complete", source.getHeadLocation());
        const emptyItem = new mc84.ItemStack(itemType7);
        equippable.setEquipment(mc84.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      const offhandItem = equippable.getEquipment(mc84.EquipmentSlot.Offhand);
      if (!offhandItem || offhandItem.typeId !== magItemType7) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.equip_mag_on_offhand" });
        return;
      }
      equippable.setEquipment(mc84.EquipmentSlot.Offhand, new mc84.ItemStack(emptyMagItemType6, 1));
      durability.damage++;
      equippable.setEquipment(mc84.EquipmentSlot.Mainhand, itemStack);
      source.startItemCooldown(reloadingCooldownCategory7, 4.5 * mc84.TicksPerSecond);
      source.dimension.playSound(reloadingSound7, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.gun_reload_medium");
      source.addEffect("slowness", 4 * mc84.TicksPerSecond, { amplifier: 0, showParticles: false });
    }
  });
});

// src/bp/scripts/core/item_components/gun/mp7a1.ts
var import_gl_matrix13 = __toESM(require_cjs(), 1);
import * as mc85 from "@minecraft/server";
var componentName7 = "scpdt:mp7a1";
var componentNameEmpty7 = "scpdt:mp7a1_empty";
var itemType8 = "lc:dt_mp7a1";
var emptyItemType8 = "lc:dt_mp7a1_empty";
var magItemType8 = "lc:dt_mp7a1_mag";
var emptyMagItemType7 = "lc:dt_mp7a1_mag_empty";
var bulletTypeNormal7 = "lc:dt_mp7a1_bullet_player";
var bulletTypeSneak7 = "lc:dt_mp7a1_bullet_player_sneak";
var shootingSound7 = "scpdt.hk_mp5.shot";
var reloadingCooldownCategory8 = "dt_mp7a1_reload";
var reloadingSound8 = "scpdt.mp7a1.reload";
var shootProjectile10 = (source, projectileType, launchPower) => {
  const projectile = source.dimension.spawnEntity(projectileType, source.getHeadLocation());
  const projectileComp = projectile.getComponent("projectile");
  projectileComp.owner = source;
  const force = import_gl_matrix13.vec3.scale(import_gl_matrix13.vec3.create(), toArr3(source.getViewDirection()), launchPower);
  projectileComp.shoot(toObj3(force));
};
mc85.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent(componentName7, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithEmpty = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithEmpty) {
        source.dimension.playSound("scpdt.gun.shot_dry", source.getHeadLocation());
        const emptyItem = new mc85.ItemStack(emptyItemType8);
        equippable.setEquipment(mc85.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      durability.damage++;
      equippable.setEquipment(mc85.EquipmentSlot.Mainhand, itemStack);
      source.dimension.playSound(shootingSound7, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.player_gun_fire");
      source.runCommand("tp @s[tag=gun_recoil_on] ~~~ facing ^ ^0.03 ^1");
      if (source.isSneaking) {
        source.runCommand("camerashake add @s 0.1 0.18 rotational");
        source.onScreenDisplay.setActionBar("\xA7c>> \xA7e+ \xA7c<<");
        shootProjectile10(source, bulletTypeSneak7, 2);
      } else {
        source.runCommand("camerashake add @s 0.2 0.2 positional");
        source.onScreenDisplay.setActionBar("\xA7c>>  \xA7f+  \xA7c<<");
        shootProjectile10(source, bulletTypeNormal7, 2);
      }
    }
  });
  e.itemComponentRegistry.registerCustomComponent(componentNameEmpty7, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const isCorrectItem = equippable.getEquipment(mc85.EquipmentSlot.Mainhand)?.type === itemStack.type;
      if (!isCorrectItem) return;
      if (source.getItemCooldown(reloadingCooldownCategory8) > 0) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.still_reloading" });
        return;
      }
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithLoaded = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithLoaded) {
        source.dimension.playSound("scpdt.gun.reload_complete", source.getHeadLocation());
        const emptyItem = new mc85.ItemStack(itemType8);
        equippable.setEquipment(mc85.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      const offhandItem = equippable.getEquipment(mc85.EquipmentSlot.Offhand);
      if (!offhandItem || offhandItem.typeId !== magItemType8) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.equip_mag_on_offhand" });
        return;
      }
      equippable.setEquipment(mc85.EquipmentSlot.Offhand, new mc85.ItemStack(emptyMagItemType7, 1));
      durability.damage++;
      equippable.setEquipment(mc85.EquipmentSlot.Mainhand, itemStack);
      source.startItemCooldown(reloadingCooldownCategory8, 4 * mc85.TicksPerSecond);
      source.dimension.playSound(reloadingSound8, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.gun_reload_medium");
      source.addEffect("slowness", 4 * mc85.TicksPerSecond, { amplifier: 0, showParticles: false });
    }
  });
});

// src/bp/scripts/core/item_components/gun/p90.ts
var import_gl_matrix14 = __toESM(require_cjs(), 1);
import * as mc86 from "@minecraft/server";
var componentName8 = "scpdt:p90";
var componentNameEmpty8 = "scpdt:p90_empty";
var itemType9 = "lc:dt_p90";
var emptyItemType9 = "lc:dt_p90_empty";
var magItemType9 = "lc:dt_p90_mag";
var emptyMagItemType8 = "lc:dt_p90_mag_empty";
var bulletTypeNormal8 = "lc:dt_p90_bullet_player";
var bulletTypeSneak8 = "lc:dt_p90_bullet_player_sneak";
var shootingSound8 = "scpdt.p90.shot";
var reloadingCooldownCategory9 = "p90_reload";
var reloadingSound9 = "scpdt.p90.reload";
var shootProjectile11 = (source, projectileType, launchPower) => {
  const projectile = source.dimension.spawnEntity(projectileType, source.getHeadLocation());
  const projectileComp = projectile.getComponent("projectile");
  projectileComp.owner = source;
  const force = import_gl_matrix14.vec3.scale(import_gl_matrix14.vec3.create(), toArr3(source.getViewDirection()), launchPower);
  projectileComp.shoot(toObj3(force));
};
mc86.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent(componentName8, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithEmpty = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithEmpty) {
        source.dimension.playSound("scpdt.gun.shot_dry", source.getHeadLocation());
        const emptyItem = new mc86.ItemStack(emptyItemType9);
        equippable.setEquipment(mc86.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      durability.damage++;
      equippable.setEquipment(mc86.EquipmentSlot.Mainhand, itemStack);
      source.dimension.playSound(shootingSound8, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.player_gun_fire");
      source.runCommand("tp @s[tag=gun_recoil_on] ~~~ facing ^ ^0.04 ^1");
      if (source.isSneaking) {
        source.runCommand("camerashake add @s 0.15 0.2 positional");
        source.onScreenDisplay.setActionBar("\xA7c>> \xA7e+ \xA7c<<");
        shootProjectile11(source, bulletTypeSneak8, 2);
      } else {
        source.runCommand("camerashake add @s 0.32 0.26 positional");
        source.onScreenDisplay.setActionBar("\xA7c>>   \xA7f+   \xA7c<<");
        shootProjectile11(source, bulletTypeNormal8, 1.8);
      }
    }
  });
  e.itemComponentRegistry.registerCustomComponent(componentNameEmpty8, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const isCorrectItem = equippable.getEquipment(mc86.EquipmentSlot.Mainhand)?.type === itemStack.type;
      if (!isCorrectItem) return;
      if (source.getItemCooldown(reloadingCooldownCategory9) > 0) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.still_reloading" });
        return;
      }
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithLoaded = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithLoaded) {
        source.dimension.playSound("scpdt.gun.reload_complete", source.getHeadLocation());
        const emptyItem = new mc86.ItemStack(itemType9);
        equippable.setEquipment(mc86.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      const offhandItem = equippable.getEquipment(mc86.EquipmentSlot.Offhand);
      if (!offhandItem || offhandItem.typeId !== magItemType9) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.equip_mag_on_offhand" });
        return;
      }
      equippable.setEquipment(mc86.EquipmentSlot.Offhand, new mc86.ItemStack(emptyMagItemType8, 1));
      durability.damage++;
      equippable.setEquipment(mc86.EquipmentSlot.Mainhand, itemStack);
      source.startItemCooldown(reloadingCooldownCategory9, 5 * mc86.TicksPerSecond);
      source.dimension.playSound(reloadingSound9, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.gun_reload_long");
      source.addEffect("slowness", 5 * mc86.TicksPerSecond, { amplifier: 1, showParticles: false });
    }
  });
});

// src/bp/scripts/core/item_components/gun/rocket_launcher.ts
var import_gl_matrix15 = __toESM(require_cjs(), 1);
import * as mc87 from "@minecraft/server";
var shootRocket = (source) => {
  const projectile = source.dimension.spawnEntity("lc:dt_rpg_rocket", source.getHeadLocation());
  const projectileComp = projectile.getComponent("projectile");
  projectileComp.owner = source;
  const force = import_gl_matrix15.vec3.scale(import_gl_matrix15.vec3.create(), toArr3(source.getViewDirection()), 3);
  projectileComp.shoot(toObj3(force));
};
mc87.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:rocket_launcher", {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      source.dimension.playSound("scpdt.rocket_launcher.shoot", source.getHeadLocation(), {
        volume: 2
      });
      source.playAnimation("animation.dt_misc.player_gun_fire");
      source.runCommand("camerashake add @s 0.15 0.4 positional");
      shootRocket(source);
      const emptyItem = new mc87.ItemStack("lc:dt_rocket_launcher_empty");
      equippable.setEquipment(mc87.EquipmentSlot.Mainhand, emptyItem);
    }
  });
  e.itemComponentRegistry.registerCustomComponent("scpdt:rocket_launcher_empty", {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const isCorrectItem = equippable.getEquipment(mc87.EquipmentSlot.Mainhand)?.type === itemStack.type;
      if (!isCorrectItem) return;
      if (source.getItemCooldown("dt_rpg_reload") > 0) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.still_reloading" });
        return;
      }
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithLoaded = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithLoaded) {
        source.dimension.playSound("scpdt.gun.reload_complete", source.getHeadLocation());
        const emptyItem = new mc87.ItemStack("lc:dt_rocket_launcher");
        equippable.setEquipment(mc87.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      const offhandItem = equippable.getEquipment(mc87.EquipmentSlot.Offhand);
      if (!offhandItem || offhandItem.typeId !== "lc:dt_rpg_rocket") {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.equip_ammo_on_offhand" });
        return;
      }
      equippable.setEquipment(mc87.EquipmentSlot.Offhand, void 0);
      durability.damage++;
      equippable.setEquipment(mc87.EquipmentSlot.Mainhand, itemStack);
      source.startItemCooldown("dt_rpg_reload", 2.82 * mc87.TicksPerSecond);
      source.dimension.playSound("scpdt.rpg.reload", source.getHeadLocation());
      source.playAnimation("animation.dt_misc.gun_reload_medium");
      source.addEffect("slowness", 3 * mc87.TicksPerSecond, { amplifier: 1, showParticles: false });
    }
  });
});

// src/bp/scripts/core/item_components/gun/scar.ts
var import_gl_matrix16 = __toESM(require_cjs(), 1);
import * as mc88 from "@minecraft/server";
var componentName9 = "scpdt:scar";
var componentNameEmpty9 = "scpdt:scar_empty";
var itemType10 = "lc:dt_scar";
var emptyItemType10 = "lc:dt_scar_empty";
var magItemType10 = "lc:dt_scar_mag";
var emptyMagItemType9 = "lc:dt_scar_mag_empty";
var bulletTypeUncertain4 = "lc:dt_scar_bullet_player_uncertain";
var bulletTypeNormal9 = "lc:dt_scar_bullet_player";
var bulletTypeSneak9 = "lc:dt_scar_bullet_player_sneak";
var shootingSound9 = "scpdt.scar.shot";
var reloadingCooldownCategory10 = "scar_reload";
var reloadingSound10 = "scpdt.scar.reload";
var shootProjectile12 = (source, projectileType, launchPower) => {
  const projectile = source.dimension.spawnEntity(projectileType, source.getHeadLocation());
  const projectileComp = projectile.getComponent("projectile");
  projectileComp.owner = source;
  const force = import_gl_matrix16.vec3.scale(import_gl_matrix16.vec3.create(), toArr3(source.getViewDirection()), launchPower);
  projectileComp.shoot(toObj3(force));
};
mc88.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent(componentName9, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithEmpty = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithEmpty) {
        source.dimension.playSound("scpdt.gun.shot_dry", source.getHeadLocation());
        const emptyItem = new mc88.ItemStack(emptyItemType10);
        equippable.setEquipment(mc88.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      durability.damage++;
      equippable.setEquipment(mc88.EquipmentSlot.Mainhand, itemStack);
      source.dimension.playSound(shootingSound9, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.player_gun_fire");
      source.runCommand("tp @s[tag=gun_recoil_on] ~~~ facing ^ ^0.03 ^1");
      source.runCommand("particle minecraft:basic_smoke_particle ^-0.1 ^1.43 ^1.2");
      if (!source.isOnGround) {
        source.runCommand("camerashake add @s 0.24 0.34 rotational");
        source.onScreenDisplay.setActionBar("\xA7c>>         \xA77+         \xA7c<<");
        shootProjectile12(source, bulletTypeUncertain4, 1);
      } else if (!source.isSneaking) {
        source.runCommand("camerashake add @s 0.14 0.27 rotational");
        source.onScreenDisplay.setActionBar("\xA7c>>      \xA7f+      \xA7c<<");
        shootProjectile12(source, bulletTypeNormal9, 1);
      } else {
        source.runCommand("camerashake add @s 0.1 0.22 rotational");
        source.onScreenDisplay.setActionBar("\xA7c>> \xA7e+ \xA7c<<");
        shootProjectile12(source, bulletTypeSneak9, 1);
      }
    }
  });
  e.itemComponentRegistry.registerCustomComponent(componentNameEmpty9, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const isCorrectItem = equippable.getEquipment(mc88.EquipmentSlot.Mainhand)?.type === itemStack.type;
      if (!isCorrectItem) return;
      if (source.getItemCooldown(reloadingCooldownCategory10) > 0) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.still_reloading" });
        return;
      }
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithLoaded = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithLoaded) {
        source.dimension.playSound("scpdt.gun.reload_complete", source.getHeadLocation());
        const emptyItem = new mc88.ItemStack(itemType10);
        equippable.setEquipment(mc88.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      const offhandItem = equippable.getEquipment(mc88.EquipmentSlot.Offhand);
      if (!offhandItem || offhandItem.typeId !== magItemType10) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.equip_mag_on_offhand" });
        return;
      }
      equippable.setEquipment(mc88.EquipmentSlot.Offhand, new mc88.ItemStack(emptyMagItemType9, 1));
      durability.damage++;
      equippable.setEquipment(mc88.EquipmentSlot.Mainhand, itemStack);
      source.startItemCooldown(reloadingCooldownCategory10, 3.3 * mc88.TicksPerSecond);
      source.dimension.playSound(reloadingSound10, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.gun_reload_short");
      source.addEffect("slowness", 3 * mc88.TicksPerSecond, { amplifier: 0, showParticles: false });
    }
  });
});

// src/bp/scripts/core/item_components/gun/scp5167_cannon.ts
var import_gl_matrix17 = __toESM(require_cjs(), 1);
import * as mc89 from "@minecraft/server";
var shootBall = (source) => {
  const projectile = source.dimension.spawnEntity(
    "lc:dt_scp5167_cannon_ball",
    source.getHeadLocation()
  );
  const projectileComp = projectile.getComponent("projectile");
  projectileComp.owner = source;
  const force = import_gl_matrix17.vec3.scale(import_gl_matrix17.vec3.create(), toArr3(source.getViewDirection()), 2.2);
  projectileComp.shoot(toObj3(force));
};
mc89.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:scp5167_cannon", {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      source.dimension.playSound("mob.blaze.shoot", source.getHeadLocation(), { volume: 1.2 });
      source.playAnimation("animation.dt_misc.player_gun_fire");
      source.runCommand("tp @s[tag=gun_recoil_on] ~~~ facing ^ ^0.28 ^5");
      source.runCommand("camerashake add @s 0.44 0.2 rotational");
      source.onScreenDisplay.setActionBar("\xA7c> SUS >  \xA7e+  \xA7c< SUS <");
      shootBall(source);
    }
  });
});

// src/bp/scripts/core/item_components/gun/spas12.ts
var import_gl_matrix18 = __toESM(require_cjs(), 1);
import * as mc90 from "@minecraft/server";
var componentName10 = "scpdt:spas12";
var componentNameEmpty10 = "scpdt:spas12_empty";
var itemType11 = "lc:dt_spas12";
var emptyItemType11 = "lc:dt_spas12_empty";
var magItemType11 = "lc:dt_spas12_shellbox";
var bulletTypeUncertain5 = "lc:dt_spas12_bullet_player_uncertain";
var bulletTypeNormal10 = "lc:dt_spas12_bullet_player";
var bulletTypeSneak10 = "lc:dt_spas12_bullet_player_sneak";
var shootingSound10 = "scpdt.spas12.shot";
var reloadingCooldownCategory11 = "dt_spas12_reloading";
var reloadingSound11 = "scpdt.spas12.reload";
var shootProjectile13 = (source, projectileType, launchPower) => {
  const projectile = source.dimension.spawnEntity(projectileType, source.getHeadLocation());
  const projectileComp = projectile.getComponent("projectile");
  projectileComp.owner = source;
  const force = import_gl_matrix18.vec3.scale(import_gl_matrix18.vec3.create(), toArr3(source.getViewDirection()), launchPower);
  projectileComp.shoot(toObj3(force));
};
mc90.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent(componentName10, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithEmpty = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithEmpty) {
        source.dimension.playSound("scpdt.gun.shot_dry", source.getHeadLocation());
        const emptyItem = new mc90.ItemStack(emptyItemType11);
        equippable.setEquipment(mc90.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      source.dimension.playSound(shootingSound10, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.player_gun_fire");
      source.runCommand("tp @s[tag=gun_recoil_on] ~~~ facing ^ ^1 ^5");
      const remainingDurability = durability.maxDurability - durability.damage;
      if (!source.isOnGround) {
        source.runCommand("camerashake add @s 0.42 0.33 rotational");
        source.onScreenDisplay.setActionBar("\xA7c(        \xA7f+        \xA7c)");
        shootProjectile13(source, bulletTypeUncertain5, 3);
        durability.damage++;
      } else if (!source.isSneaking || remainingDurability <= 2) {
        source.runCommand("camerashake add @s 0.42 0.33 rotational");
        source.onScreenDisplay.setActionBar("\xA7c(   \xA7f+   \xA7c)");
        shootProjectile13(source, bulletTypeNormal10, 3);
        durability.damage++;
      } else {
        source.runCommand("camerashake add @s 0.8 0.3 rotational");
        source.onScreenDisplay.setActionBar("\xA7c( (   \xA7f+   \xA7c) )");
        shootProjectile13(source, bulletTypeSneak10, 5);
        durability.damage += 2;
      }
      equippable.setEquipment(mc90.EquipmentSlot.Mainhand, itemStack);
    }
  });
  e.itemComponentRegistry.registerCustomComponent(componentNameEmpty10, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const isCorrectItem = equippable.getEquipment(mc90.EquipmentSlot.Mainhand)?.type === itemStack.type;
      if (!isCorrectItem) return;
      if (source.getItemCooldown(reloadingCooldownCategory11) > 0) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.still_reloading" });
        return;
      }
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithLoaded = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithLoaded) {
        source.dimension.playSound("scpdt.gun.reload_complete", source.getHeadLocation());
        const emptyItem = new mc90.ItemStack(itemType11);
        equippable.setEquipment(mc90.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      const offhandItem = equippable.getEquipment(mc90.EquipmentSlot.Offhand);
      if (!offhandItem || offhandItem.typeId !== magItemType11) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.equip_mag_on_offhand" });
        return;
      }
      equippable.setEquipment(mc90.EquipmentSlot.Offhand, void 0);
      durability.damage++;
      equippable.setEquipment(mc90.EquipmentSlot.Mainhand, itemStack);
      source.startItemCooldown(reloadingCooldownCategory11, 6 * mc90.TicksPerSecond);
      source.dimension.playSound(reloadingSound11, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.gun_reload_long");
      source.addEffect("slowness", 6 * mc90.TicksPerSecond, { amplifier: 1, showParticles: false });
    }
  });
});

// src/bp/scripts/core/item_components/gun/suscharger.ts
var import_gl_matrix19 = __toESM(require_cjs(), 1);
import * as mc91 from "@minecraft/server";
var componentName11 = "scpdt:suscharger";
var componentNameEmpty11 = "scpdt:suscharger_empty";
var itemType12 = "lc:dt_suscharger";
var emptyItemType12 = "lc:dt_suscharger_empty";
var magItemType12 = "lc:dt_suscharger_battery";
var emptyMagItemType10 = "lc:dt_suscharger_battery_empty";
var bulletTypeNormal11 = "lc:dt_suscharger_shot_player";
var bulletTypeSneak11 = "lc:dt_suscharger_shot_player_sneak";
var reloadingCooldownCategory12 = "suscharger_reload";
var reloadingSound12 = "scpdt.suscharger.reload";
var shootProjectile14 = (source, projectileType, launchPower) => {
  const projectile = source.dimension.spawnEntity(projectileType, source.getHeadLocation());
  const projectileComp = projectile.getComponent("projectile");
  projectileComp.owner = source;
  const force = import_gl_matrix19.vec3.scale(import_gl_matrix19.vec3.create(), toArr3(source.getViewDirection()), launchPower);
  projectileComp.shoot(toObj3(force));
};
mc91.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent(componentName11, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithEmpty = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithEmpty) {
        source.dimension.playSound("scpdt.gun.shot_dry", source.getHeadLocation());
        const emptyItem = new mc91.ItemStack(emptyItemType12);
        equippable.setEquipment(mc91.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      durability.damage++;
      equippable.setEquipment(mc91.EquipmentSlot.Mainhand, itemStack);
      source.dimension.playSound("scpdt.scp5167_dragon.shot", source.getHeadLocation());
      source.playAnimation("animation.dt_misc.player_gun_fire");
      source.runCommand("tp @s[tag=gun_recoil_on] ~~~ facing ^ ^0.04 ^1");
      if (source.isSneaking) {
        source.dimension.playSound("mob.blaze.shoot", source.getHeadLocation());
        source.runCommand("camerashake add @s 1 0.36 rotational");
        source.onScreenDisplay.setActionBar("\xA7c( \xA7e[ + ] \xA7c)");
        shootProjectile14(source, bulletTypeSneak11, 3);
      } else {
        source.dimension.playSound("scpdt.hig.shoot", source.getHeadLocation());
        source.runCommand("camerashake add @s 1 0.36 rotational");
        source.onScreenDisplay.setActionBar("\xA7c>> \xA7e[ + ] \xA7c<<");
        shootProjectile14(source, bulletTypeNormal11, 9);
      }
    }
  });
  e.itemComponentRegistry.registerCustomComponent(componentNameEmpty11, {
    onUse({ source, itemStack }) {
      if (!itemStack) return;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const isCorrectItem = equippable.getEquipment(mc91.EquipmentSlot.Mainhand)?.type === itemStack.type;
      if (!isCorrectItem) return;
      if (source.getItemCooldown(reloadingCooldownCategory12) > 0) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.still_reloading" });
        return;
      }
      const durability = itemStack.getComponent("durability");
      const shouldReplaceWithLoaded = durability.maxDurability - durability.damage <= 1;
      if (shouldReplaceWithLoaded) {
        source.dimension.playSound("scpdt.gun.reload_complete", source.getHeadLocation());
        const emptyItem = new mc91.ItemStack(itemType12);
        equippable.setEquipment(mc91.EquipmentSlot.Mainhand, emptyItem);
        return;
      }
      const offhandItem = equippable.getEquipment(mc91.EquipmentSlot.Offhand);
      if (!offhandItem || offhandItem.typeId !== magItemType12) {
        source.onScreenDisplay.setActionBar({ translate: "dt.guide.equip_mag_on_offhand" });
        return;
      }
      equippable.setEquipment(mc91.EquipmentSlot.Offhand, new mc91.ItemStack(emptyMagItemType10, 1));
      durability.damage++;
      equippable.setEquipment(mc91.EquipmentSlot.Mainhand, itemStack);
      source.startItemCooldown(reloadingCooldownCategory12, 12 * mc91.TicksPerSecond);
      source.dimension.playSound(reloadingSound12, source.getHeadLocation());
      source.playAnimation("animation.dt_misc.gun_reload_long");
      source.addEffect("slowness", 12 * mc91.TicksPerSecond, { amplifier: 0, showParticles: false });
    }
  });
});

// src/bp/scripts/core/item_components/dont_damage_durability_on_hit.ts
import * as mc92 from "@minecraft/server";
mc92.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:dont_damage_durability_on_hit", {
    onBeforeDurabilityDamage(arg) {
      arg.durabilityDamage = 0;
    }
  });
});

// src/bp/scripts/core/item_components/lose_durability_on_dig.ts
import * as mc93 from "@minecraft/server";
mc93.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:lose_durability_on_dig", {
    onMineBlock({ source }, arg1) {
      const params = arg1.params;
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const mainhandItem = equippable.getEquipment(mc93.EquipmentSlot.Mainhand);
      if (!mainhandItem) return;
      const isCorrectItem = mainhandItem.getComponent("scpdt:lose_durability_on_dig") !== void 0;
      if (!isCorrectItem) return;
      const durability = mainhandItem.getComponent("durability");
      if (!durability) return;
      const unbreakingLevel = mainhandItem.getComponent("enchantable")?.getEnchantment("unbreaking")?.level;
      const damageChance = durability.getDamageChance(unbreakingLevel);
      const damageChanceRange = durability.getDamageChanceRange();
      const shouldDamage = randomInt(damageChanceRange.min, damageChanceRange.max) <= damageChance;
      if (!shouldDamage) return;
      const damageAddition = params.damage ?? 1;
      const newDamage = Math.max(
        0,
        Math.min(durability.maxDurability, durability.damage + damageAddition)
      );
      durability.damage = newDamage;
      equippable.setEquipment(mc93.EquipmentSlot.Mainhand, mainhandItem);
    }
  });
});

// src/bp/scripts/core/item_components/medkit.ts
import * as mc94 from "@minecraft/server";
mc94.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:medkit", {
    onConsume({ source }) {
      source.addEffect("regeneration", 20 * mc94.TicksPerSecond, {
        amplifier: 2
      });
    }
  });
});

// src/bp/scripts/core/item_components/morphine_syringe.ts
import * as mc95 from "@minecraft/server";
mc95.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:morphine_syringe", {
    onCompleteUse({ source }) {
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const mainhandItem = equippable.getEquipment(mc95.EquipmentSlot.Mainhand);
      if (!mainhandItem) return;
      const isCorrectItem = mainhandItem.getComponent("scpdt:morphine_syringe") !== void 0;
      if (!isCorrectItem) return;
      if (!isPlayerCreativeOrSpectator(source)) {
        if (mainhandItem.amount > 1) {
          mainhandItem.amount--;
          equippable.setEquipment(mc95.EquipmentSlot.Mainhand, mainhandItem);
        } else {
          equippable.setEquipment(mc95.EquipmentSlot.Mainhand, void 0);
        }
      }
      const random = Math.random();
      if (random > 0.035) {
        const health = Number(source.getComponent("health")?.currentValue);
        if (health > 15) {
          source.onScreenDisplay.setActionBar("Ugh... it's good...?");
        } else if (health > 8) {
          source.onScreenDisplay.setActionBar("I shouldn't use this in short period of time...");
        } else if (health > 0) {
          source.onScreenDisplay.setActionBar("It's killing me...");
        }
        source.dimension.playSound("scpdt.morphine.use", source.getHeadLocation());
        source.applyDamage(2, { cause: mc95.EntityDamageCause.override });
        source.addEffect("wither", 4 * mc95.TicksPerSecond, { amplifier: 3 });
        source.addEffect("nausea", 8 * mc95.TicksPerSecond, { amplifier: 1 });
        source.addEffect("mining_fatigue", 60 * mc95.TicksPerSecond, { amplifier: 0 });
        source.addEffect("resistance", 40 * mc95.TicksPerSecond, { amplifier: 1 });
        source.addEffect("regeneration", 20 * mc95.TicksPerSecond, { amplifier: 0 });
      } else {
        source.kill();
      }
    }
  });
});

// src/bp/scripts/core/item_components/painkillers.ts
import * as mc96 from "@minecraft/server";
mc96.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:painkillers", {
    onConsume({ source }) {
      source.addEffect("regeneration", 35 * mc96.TicksPerSecond, {
        amplifier: 0
      });
    }
  });
});

// src/bp/scripts/core/item_components/scp_document.ts
var import_gl_matrix20 = __toESM(require_cjs(), 1);
import * as mc97 from "@minecraft/server";
mc97.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:scp_document", {
    onUse({ source, itemStack }, arg1) {
      if (!source.isSneaking) return;
      const equippable = source.getComponent("equippable");
      const mainhandItem = equippable.getEquipment(mc97.EquipmentSlot.Mainhand);
      if (!mainhandItem) return;
      if (mainhandItem.type !== itemStack?.type) return;
      const structureId = String(arg1.params.structureId);
      const structure = mc97.world.structureManager.get(structureId);
      if (!structure) throw new Error(`No structure found with ID: ${structureId}`);
      if (mainhandItem.amount > 1) {
        mainhandItem.amount--;
        equippable.setEquipment(mc97.EquipmentSlot.Mainhand, mainhandItem);
      } else {
        equippable.setEquipment(mc97.EquipmentSlot.Mainhand, void 0);
      }
      const structureLocation = new HybridVec3();
      import_gl_matrix20.vec3.add(structureLocation, toArr3(source.location), [1, 0, 1]);
      mc97.world.structureManager.place(structure, source.dimension, structureLocation);
      source.dimension.playSound("random.anvil_land", structureLocation, {
        volume: 2,
        pitch: 0.8
      });
    }
  });
});

// src/bp/scripts/core/item_components/scp063.ts
import * as mc98 from "@minecraft/server";
mc98.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:scp063", {
    onUse({ source }) {
      source.addEffect("haste", 10 * mc98.TicksPerSecond, {
        amplifier: 3
      });
    }
  });
});

// src/bp/scripts/core/item_components/scp096_picture.ts
import * as mc99 from "@minecraft/server";
mc99.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:scp096_picture", {
    onUse({ source }) {
      const pictureProjectile = source.dimension.spawnEntity(
        "lc:dt_scp096_picture_t",
        source.getHeadLocation()
      );
      const projectileComp = pictureProjectile.getComponent("projectile");
      projectileComp.owner = source;
      projectileComp.shoot({ x: 0, y: 0, z: 0 });
      source.onScreenDisplay.setActionBar("\xA7cYou can't undone this. It will come.");
    }
  });
});
mc99.world.afterEvents.projectileHitEntity.subscribe((e) => {
  if (e.projectile.typeId !== "lc:dt_scp096_picture_t") return;
  const hitEntity = e.getEntityHit().entity;
  if (!hitEntity || !hitEntity.matches({ families: ["scp096"] })) return;
  hitEntity.applyDamage(1, {
    cause: mc99.EntityDamageCause.override,
    damagingEntity: e.source
  });
});

// src/bp/scripts/core/item_components/scp207.ts
import * as mc100 from "@minecraft/server";
mc100.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:scp207", {
    onConsume({ source }) {
      source.dimension.playSound("scpdt.scp294.drink.ew", source.getHeadLocation());
      source.addEffect("speed", 180 * mc100.TicksPerSecond, { amplifier: 3 });
      source.addEffect("wither", 180 * mc100.TicksPerSecond, { amplifier: 0 });
    }
  });
});

// src/bp/scripts/core/item_components/scp420j.ts
import * as mc101 from "@minecraft/server";
mc101.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:scp420j", {
    onCompleteUse({ source }) {
      const equippable = source.getComponent("equippable");
      if (!equippable) return;
      const mainhandItem = equippable.getEquipment(mc101.EquipmentSlot.Mainhand);
      if (!mainhandItem) return;
      const isCorrectItem = mainhandItem.getComponent("scpdt:scp420j") !== void 0;
      if (!isCorrectItem) return;
      if (!isPlayerCreativeOrSpectator(source)) {
        if (mainhandItem.amount > 1) {
          mainhandItem.amount--;
          equippable.setEquipment(mc101.EquipmentSlot.Mainhand, mainhandItem);
        } else {
          equippable.setEquipment(mc101.EquipmentSlot.Mainhand, void 0);
        }
      }
      source.playSound("scpdt.scp420j.use");
      source.addEffect("nausea", 16 * mc101.TicksPerSecond, { amplifier: 1 });
      const random = Math.random();
      if (random > 0.4) {
        source.onScreenDisplay.setActionBar("Aghhh... feeling good...");
      } else {
        source.addEffect("levitation", 10 * mc101.TicksPerSecond, { amplifier: 0 });
        source.dimension.playSound("scpdt.fart", source.location);
        source.onScreenDisplay.setActionBar("HAHAHA FUCKIN ASSSS LETS GOOOOO");
      }
    }
  });
});

// src/bp/scripts/core/item_components/scp500.ts
import * as mc102 from "@minecraft/server";
mc102.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:scp500", {
    onConsume({ source }) {
      source.removeEffect("wither");
      source.removeEffect("poison");
      source.removeEffect("slowness");
      source.removeEffect("mining_fatigue");
      source.removeEffect("nausea");
      source.removeEffect("blindness");
      source.removeEffect("weakness");
      source.removeEffect("hunger");
      source.removeEffect("instant_damage");
      source.extinguishFire();
      source.addEffect("regeneration", 60 * mc102.TicksPerSecond, { amplifier: 3 });
      source.addEffect("absorption", 60 * mc102.TicksPerSecond, { amplifier: 3 });
    }
  });
});

// src/bp/scripts/core/item_components/scp714.ts
import * as mc103 from "@minecraft/server";
mc103.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:scp714", {
    onUse({ source }) {
      source.dimension.playSound("scpdt.scp714.use", source.getHeadLocation());
      source.addEffect("resistance", 30 * mc103.TicksPerSecond, { amplifier: 3 });
      source.addEffect("slowness", 30 * mc103.TicksPerSecond, { amplifier: 1 });
    }
  });
});

// src/bp/scripts/core/item_components/scp1023_arc.ts
import * as mc104 from "@minecraft/server";
mc104.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:scp1023_arc", {
    onHitEntity(arg) {
      try {
        arg.hitEntity.applyDamage(694581019072, {
          cause: mc104.EntityDamageCause.override,
          damagingEntity: arg.attackingEntity
        });
      } catch {
      }
    }
  });
});

// src/bp/scripts/core/item_components/scp1025.ts
import * as mc105 from "@minecraft/server";
var effectChoices = [
  {
    weight: 16,
    effect: "weakness",
    duration: 130 * mc105.TicksPerSecond,
    amplifier: 1
  },
  {
    weight: 14,
    effect: "slowness",
    duration: 140 * mc105.TicksPerSecond,
    amplifier: 0
  },
  {
    weight: 10,
    effect: "hunger",
    duration: 60 * mc105.TicksPerSecond,
    amplifier: 1
  },
  {
    weight: 13,
    effect: "mining_fatigue",
    duration: 120 * mc105.TicksPerSecond,
    amplifier: 0
  },
  {
    weight: 3,
    effect: "poison",
    duration: 43 * mc105.TicksPerSecond,
    amplifier: 0
  }
];
mc105.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:scp1025", {
    onUse({ source }) {
      const effect = weightedRandom(effectChoices);
      source.addEffect(effect.effect, effect.duration, {
        amplifier: effect.amplifier,
        showParticles: true
      });
      source.dimension.playSound("scpdt.scp1025.read", source.getHeadLocation(), {
        volume: 1.2
      });
    }
  });
});

// src/bp/scripts/core/item_components/scp5167_knife.ts
import * as mc106 from "@minecraft/server";
mc106.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:scp5167_knife", {
    onHitEntity({ attackingEntity }) {
      attackingEntity.dimension.playSound(
        "scpdt.scp5167.attack",
        attackingEntity.getHeadLocation(),
        { pitch: randf(0.9, 1.1) }
      );
    }
  });
});

// src/bp/scripts/core/item_components/scp001_sheaf_of_papers.ts
import * as mc107 from "@minecraft/server";
var weightedEvents = [
  // Summoning Events (Weight 5)
  { weight: 5, commands: ["summon lc:dt_scp096"], type: "summon" },
  { weight: 5, commands: ["summon lc:dt_scp049"], type: "summon" },
  { weight: 5, commands: ["summon lc:dt_scp939"], type: "summon" },
  { weight: 5, commands: ["summon lc:dt_scp087_1"], type: "summon" },
  { weight: 5, commands: ["summon lc:dt_scp007"], type: "summon" },
  { weight: 5, commands: ["summon lc:dt_scp035_scientist"], type: "summon" },
  { weight: 5, commands: ["summon lc:dt_scp058"], type: "summon" },
  { weight: 5, commands: ["summon lc:dt_scp106"], type: "summon" },
  { weight: 5, commands: ["summon lc:dt_scp173"], type: "summon" },
  { weight: 5, commands: ["summon lc:dt_scp131"], type: "summon" },
  { weight: 5, commands: ["summon lc:dt_scp191"], type: "summon" },
  { weight: 5, commands: ["summon lc:dt_scp098"], type: "summon" },
  { weight: 5, commands: ["summon lc:dt_scp4959"], type: "summon" },
  { weight: 5, commands: ["summon lc:dt_scp5167"], type: "summon" },
  { weight: 5, commands: ["summon lc:dt_scp457"], type: "summon" },
  { weight: 5, commands: ["summon lc:dt_scp577"], type: "summon" },
  { weight: 5, commands: ["summon lc:dt_scp5535"], type: "summon" },
  { weight: 5, commands: ["summon lc:dt_scp734"], type: "summon" },
  // Summoning Event (Weight 4)
  { weight: 4, commands: ["summon lc:dt_scp682"], type: "summon" },
  // SCP-1025 Effect Randomization (Weight 4)
  {
    weight: 4,
    type: "scp_1025_effects",
    effects: [
      { weight: 16, effect: "weakness", duration: 130, amplifier: 1 },
      { weight: 14, effect: "slowness", duration: 140, amplifier: 0 },
      { weight: 10, effect: "hunger", duration: 60, amplifier: 1 },
      { weight: 13, effect: "mining_fatigue", duration: 120, amplifier: 0 },
      { weight: 3, effect: "poison", duration: 43, amplifier: 0 },
      { weight: 2, effect: "wither", duration: 16, amplifier: 0 }
    ]
  }
];
var selectRandomWeighted = (options) => {
  if (!options || options.length === 0) return null;
  const totalWeight = options.reduce((sum, option) => sum + option.weight, 0);
  let randomNum = Math.random() * totalWeight;
  for (const option of options) {
    if (randomNum < option.weight) {
      return option;
    }
    randomNum -= option.weight;
  }
  return options[options.length - 1];
};
mc107.system.beforeEvents.startup.subscribe((e) => {
  e.itemComponentRegistry.registerCustomComponent("scpdt:scp001_sheaf_of_papers", {
    onUse({ source }) {
      const selectedMainEvent = selectRandomWeighted(weightedEvents);
      if (!selectedMainEvent) return;
      if (selectedMainEvent.type === "summon") {
        for (const command of selectedMainEvent.commands) {
          try {
            source.runCommand(command);
          } catch (error) {
            console.error(`Failed to run command ${command}: ${error}`);
          }
        }
      } else if (selectedMainEvent.type === "scp_1025_effects") {
        const selectedEffectEvent = selectRandomWeighted(selectedMainEvent.effects);
        if (selectedEffectEvent) {
          const { effect, duration, amplifier } = selectedEffectEvent;
          source.addEffect(effect, duration * 20, { amplifier, showParticles: true });
          source.runCommand(
            `playsound scpdt.scp1025.read @a[r=10] ${Math.floor(source.location.x)} ${Math.floor(source.location.y)} ${Math.floor(source.location.z)}`
          );
          source.onScreenDisplay.setActionBar(`You got SCP-1025 effect`);
        }
      }
    }
  });
});

// src/bp/scripts/core/ticking_wearables/nvg.ts
import * as mc109 from "@minecraft/server";

// src/bp/scripts/core/player_loop.ts
import * as mc108 from "@minecraft/server";

// node_modules/.pnpm/mitt@3.0.1/node_modules/mitt/dist/mitt.mjs
function mitt_default(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
    var i = n.get(t);
    i ? i.push(e) : n.set(t, [e]);
  }, off: function(t, e) {
    var i = n.get(t);
    i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
  }, emit: function(t, e) {
    var i = n.get(t);
    i && i.slice().map(function(n2) {
      n2(e);
    }), (i = n.get("*")) && i.slice().map(function(n2) {
      n2(t, e);
    });
  } };
}

// src/bp/scripts/core/player_loop.ts
var playerLoopEvents = mitt_default();
var playerTickEventDataCache = /* @__PURE__ */ new Map();
var onTickPlayer = (player) => {
  let tickEventData = playerTickEventDataCache.get(player);
  if (!tickEventData) {
    const health = player.getComponent("health");
    const equippable = player.getComponent("equippable");
    tickEventData = {
      player,
      health,
      equippable
    };
  }
  playerLoopEvents.emit("tick", tickEventData);
};
mc108.world.afterEvents.worldLoad.subscribe((e) => {
  mc108.system.runInterval(() => {
    const players = mc108.world.getPlayers();
    for (let i = 0; i < players.length; i++) {
      onTickPlayer(players[i]);
    }
  }, 1);
});
mc108.world.beforeEvents.playerLeave.subscribe((e) => {
  playerTickEventDataCache.delete(e.player);
});

// src/bp/scripts/core/ticking_wearables/nvg.ts
playerLoopEvents.on("tick", (data) => {
  if (data.equippable.getEquipment(mc109.EquipmentSlot.Head)?.typeId !== "lc:dt_nvg") return;
  data.player.addEffect("night_vision", 25, {
    amplifier: 255,
    showParticles: false
  });
});

// src/bp/scripts/core/ticking_wearables/scp268.ts
import * as mc110 from "@minecraft/server";
playerLoopEvents.on("tick", (data) => {
  if (data.equippable.getEquipment(mc110.EquipmentSlot.Head)?.typeId !== "lc:dt_scp268") return;
  data.player.addEffect("invisibility", 25, {
    amplifier: 255,
    showParticles: false
  });
});
