// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/common.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReferenceBoard = exports.ReferenceCell = exports.Direction = exports.WinValue = exports.Dimension = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dimension = 4;
exports.Dimension = Dimension;
var WinValue = 64;
exports.WinValue = WinValue;
var Direction;
exports.Direction = Direction;

(function (Direction) {
  Direction["UP"] = "ArrowUp";
  Direction["DOWN"] = "ArrowDown";
  Direction["LEFT"] = "ArrowLeft";
  Direction["RIGTH"] = "ArrowRight";
})(Direction || (exports.Direction = Direction = {}));

var ReferenceCell = function ReferenceCell() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

  _classCallCheck(this, ReferenceCell);

  this.value = value;
};

exports.ReferenceCell = ReferenceCell;

var ReferenceBoard = /*#__PURE__*/function () {
  function ReferenceBoard(board) {
    var _this = this;

    _classCallCheck(this, ReferenceBoard);

    this.board = [];
    board.forEach(function (row, i) {
      _this.board[i] = [];
      row.forEach(function (cell) {
        _this.board[i].push(new ReferenceCell(cell));
      });
    });
  }

  _createClass(ReferenceBoard, [{
    key: "get",
    value: function get(i, k) {
      return this.board[i][k];
    }
  }, {
    key: "getRow",
    value: function getRow(i) {
      var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return reverse ? this.board[i].slice().reverse() : this.board[i];
    }
  }, {
    key: "getColumn",
    value: function getColumn(k) {
      var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var column = [];

      for (var i = 0; i < this.board.length; i++) {
        column.push(this.board[i][k]);
      }

      return reverse ? column.slice().reverse() : column;
    }
  }, {
    key: "toBoard",
    value: function toBoard() {
      var board = [];
      this.board.forEach(function (row, i) {
        board[i] = [];
        row.forEach(function (refCell) {
          return board[i].push(refCell.value);
        });
      });
      return board;
    }
  }, {
    key: "fillRandomPosition",
    value: function fillRandomPosition() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

      while (true) {
        var i = Math.floor(Math.random() * Dimension);
        var k = Math.floor(Math.random() * Dimension);

        if (this.board[i][k].value === 0) {
          this.board[i][k].value = value;
          break;
        }
      }
    }
  }]);

  return ReferenceBoard;
}();

exports.ReferenceBoard = ReferenceBoard;
},{}],"src/game.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var _common = require("./common");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game = /*#__PURE__*/function () {
  function Game(renderable, window) {
    var _this = this;

    _classCallCheck(this, Game);

    this.renderable = renderable;
    this.window = window;
    this.board = new _common.ReferenceBoard([[2, 4, 8, 16], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
    this.render();
    var values = Object.values(_common.Direction);
    document.addEventListener("keydown", function (event) {
      if (values.includes(event.code)) {
        _this.move(event.code);

        _this.render();
      }
    });
  }

  _createClass(Game, [{
    key: "move",
    value: function move(direction) {
      var changed = false;
      var array = [];

      for (var i = 0; i < _common.Dimension; i++) {
        switch (direction) {
          case _common.Direction.DOWN:
          case _common.Direction.UP:
            {
              array = this.board.getColumn(i, direction === _common.Direction.DOWN);
              changed = this.mergeArray(array) || changed;
              break;
            }

          case _common.Direction.LEFT:
          case _common.Direction.RIGTH:
            {
              array = this.board.getRow(i, direction === _common.Direction.RIGTH);
              changed = this.mergeArray(array) || changed;
              break;
            }
        }
      }

      if (changed) {
        this.board.fillRandomPosition();
      }
    }
  }, {
    key: "mergeArray",
    value: function mergeArray(array) {
      var _this2 = this;

      var arrayChanged = false;
      shift(array);
      array.reduce(function (a, b) {
        if (a.value === b.value && a.value !== 0) {
          a.value += b.value;
          b.value = 0;

          if (a.value === _common.WinValue) {
            _this2.win();
          }

          arrayChanged = true;
        }

        return b;
      });
      shift(array);
      return arrayChanged;

      function shift(array) {
        var copy = [];
        array.forEach(function (refCell) {
          if (refCell.value !== 0) {
            copy.push(refCell.value);
            refCell.value = 0;
          }
        });

        if (copy.length > 0) {
          arrayChanged = true;
        }

        copy.forEach(function (cell, i) {
          return array[i].value = cell;
        });
      }
    }
  }, {
    key: "win",
    value: function win() {
      this.window.queueMicrotask(function () {
        return window.alert("YOU WON!!!");
      });
    }
  }, {
    key: "lose",
    value: function lose() {
      this.window.queueMicrotask(function () {
        return window.alert("YOU LOSE!!!");
      });
    }
  }, {
    key: "render",
    value: function render() {
      this.renderable.render(this.board.toBoard());
    }
  }, {
    key: "destroy",
    value: function destroy() {}
  }]);

  return Game;
}();

exports.Game = Game;
},{"./common":"src/common.ts"}],"src/render.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Renderable = void 0;

var _common = require("./common");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Renderable = /*#__PURE__*/function () {
  function Renderable(document) {
    _classCallCheck(this, Renderable);

    this.htmlCells = [];
    this.htmlCells = Array.from(document.querySelectorAll(".cell"));
  }

  _createClass(Renderable, [{
    key: "render",
    value: function render(board) {
      var _this = this;

      board.forEach(function (row, i) {
        row.forEach(function (cell, k) {
          _this.htmlCells[i * _common.Dimension + k].textContent = cell === 0 ? "" : cell.toString();
        });
      });
    }
  }]);

  return Renderable;
}();

exports.Renderable = Renderable;
},{"./common":"src/common.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var _game = require("./game");

var _render = require("./render");

var game = new _game.Game(new _render.Renderable(document), window);
},{"./game":"src/game.ts","./render":"src/render.ts"}],"../../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "35179" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map