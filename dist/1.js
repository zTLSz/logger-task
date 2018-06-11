webpackJsonp([1],{

/***/ "./src/routes/Admin/containers/AdminContainer.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__("./node_modules/react-redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_admin__ = __webpack_require__("./src/routes/Admin/modules/admin.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux__ = __webpack_require__("./node_modules/redux/es/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Admin__ = __webpack_require__("./src/routes/Admin/components/Admin.js");





function mapDispatchToProps(dispatch) {
  return {
    getData: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_redux__["bindActionCreators"])(__WEBPACK_IMPORTED_MODULE_1__modules_admin__["addData"], dispatch)
  };
}

function mapStateToProps(state) {
  return {
    data: state.admin.data
  };
}

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_3__components_Admin__["a" /* default */]));

/***/ }),

/***/ "./src/routes/Admin/modules/admin.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_DATA", function() { return GET_DATA; });
/* harmony export (immutable) */ __webpack_exports__["addData"] = addData;
/* harmony export (immutable) */ __webpack_exports__["default"] = blogReducer;

// ------------------------------------
// Constants
// ------------------------------------
var GET_DATA = 'GET_DATA';

// ------------------------------------
// Actions
// ------------------------------------


function addData(data) {
  return function (dispatch) {
    dispatch({
      type: GET_DATA,
      payload: data
    });
  };
}

// ---------------------------------------
// Reducer
// ------------------------------------
var initstate = {
  data: []
};

function blogReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initstate;
  var action = arguments[1];


  switch (action.type) {
    case GET_DATA:
      console.log(action.payload);
      // sort threads by date
      var dataSorted = action.payload.sort(function (a, b) {
        if (b.threadPosts.length > 0 && a.threadPosts.length > 0) {
          return a.threadPosts[a.threadPosts.length - 1].dateMs - b.threadPosts[b.threadPosts.length - 1].dateMs;
        }
        if (b.threadPosts.length == 0 && a.threadPosts.length > 0) {
          return a.threadPosts[a.threadPosts.length - 1].dateMs - b.dateMs;
        }
        if (b.threadPosts.length > 0 && a.threadPosts.length == 0) {
          return a.dateMs - b.threadPosts[b.threadPosts.length - 1].dateMs;
        }
        if (b.threadPosts.length == 0 && a.threadPosts.length == 0) {
          return a.dateMs - b.dateMs;
        }
      }).reverse();

      return Object.assign({}, state, {
        data: dataSorted
      });
    default:
      return state;
  }
}

/***/ })

});
//# sourceMappingURL=1.js.map