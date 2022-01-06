(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/SingleChoiceForResultCard/SingleChoiceForResultCard"],{

/***/ 204:
/*!****************************************************************************************************************!*\
  !*** D:/study/MyProject/MT-XMCET/xmcet-app/components/SingleChoiceForResultCard/SingleChoiceForResultCard.vue ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SingleChoiceForResultCard_vue_vue_type_template_id_73578cc0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SingleChoiceForResultCard.vue?vue&type=template&id=73578cc0&scoped=true& */ 205);
/* harmony import */ var _SingleChoiceForResultCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SingleChoiceForResultCard.vue?vue&type=script&lang=js& */ 207);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _SingleChoiceForResultCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _SingleChoiceForResultCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _SingleChoiceForResultCard_vue_vue_type_style_index_0_id_73578cc0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SingleChoiceForResultCard.vue?vue&type=style&index=0&id=73578cc0&lang=less&scoped=true& */ 209);
/* harmony import */ var _installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);

var renderjs





/* normalize component */

var component = Object(_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _SingleChoiceForResultCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SingleChoiceForResultCard_vue_vue_type_template_id_73578cc0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _SingleChoiceForResultCard_vue_vue_type_template_id_73578cc0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "73578cc0",
  null,
  false,
  _SingleChoiceForResultCard_vue_vue_type_template_id_73578cc0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/SingleChoiceForResultCard/SingleChoiceForResultCard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 205:
/*!***********************************************************************************************************************************************************!*\
  !*** D:/study/MyProject/MT-XMCET/xmcet-app/components/SingleChoiceForResultCard/SingleChoiceForResultCard.vue?vue&type=template&id=73578cc0&scoped=true& ***!
  \***********************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SingleChoiceForResultCard_vue_vue_type_template_id_73578cc0_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./SingleChoiceForResultCard.vue?vue&type=template&id=73578cc0&scoped=true& */ 206);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SingleChoiceForResultCard_vue_vue_type_template_id_73578cc0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SingleChoiceForResultCard_vue_vue_type_template_id_73578cc0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SingleChoiceForResultCard_vue_vue_type_template_id_73578cc0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SingleChoiceForResultCard_vue_vue_type_template_id_73578cc0_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 206:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/study/MyProject/MT-XMCET/xmcet-app/components/SingleChoiceForResultCard/SingleChoiceForResultCard.vue?vue&type=template&id=73578cc0&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l1 = _vm.__map(_vm.cards, function(card, __i0__) {
    var $orig = _vm.__get_orig(card)

    var l0 = _vm.__map(card.options, function(item, __i1__) {
      var $orig = _vm.__get_orig(item)

      var m0 = _vm.renderOption(item.value, card.answer, card.choice)
      var m1 = _vm.renderChecked(item.value, card.answer, card.choice)
      var m2 = _vm.renderOption(item.value, card.answer, card.choice)
      return {
        $orig: $orig,
        m0: m0,
        m1: m1,
        m2: m2
      }
    })

    var m3 = _vm.renderAnswer(card.answer)
    var m4 = _vm.renderAnswer(card.choice)
    return {
      $orig: $orig,
      l0: l0,
      m3: m3,
      m4: m4
    }
  })

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l1: l1
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 207:
/*!*****************************************************************************************************************************************!*\
  !*** D:/study/MyProject/MT-XMCET/xmcet-app/components/SingleChoiceForResultCard/SingleChoiceForResultCard.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SingleChoiceForResultCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./SingleChoiceForResultCard.vue?vue&type=script&lang=js& */ 208);
/* harmony import */ var _installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SingleChoiceForResultCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SingleChoiceForResultCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SingleChoiceForResultCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SingleChoiceForResultCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SingleChoiceForResultCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 208:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/study/MyProject/MT-XMCET/xmcet-app/components/SingleChoiceForResultCard/SingleChoiceForResultCard.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  props: {
    cards: {
      required: true,
      type: Array } },


  data: function data() {
    return {
      current: 0
      // result: []
    };
  },
  created: function created() {
    // this.result = Object.assign({}, this.cards)
  },
  methods: {
    radioChange: function radioChange($event, id) {
      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].id == id) {
          this.cards[i].choice = $event.detail.value;
          break;
        }
      }
    },
    submitAnswer: function submitAnswer() {
      this.$emit('submit', this.cards);
    },
    renderOption: function renderOption(value, answer, choice) {
      if (value == answer) {
        return 'green';
      } else {
        if (value == choice && choice != answer) {
          return 'red';
        } else {
          return 'black';
        }
      }
    },
    renderChecked: function renderChecked(value, answer, choice) {
      if (value == answer) {
        return true;
      } else {
        return false;
      }
    },
    renderAnswer: function renderAnswer(value) {
      var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
      'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      return arr[parseInt(value) - 1];
    } } };exports.default = _default;

/***/ }),

/***/ 209:
/*!**************************************************************************************************************************************************************************!*\
  !*** D:/study/MyProject/MT-XMCET/xmcet-app/components/SingleChoiceForResultCard/SingleChoiceForResultCard.vue?vue&type=style&index=0&id=73578cc0&lang=less&scoped=true& ***!
  \**************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SingleChoiceForResultCard_vue_vue_type_style_index_0_id_73578cc0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-2!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--10-oneOf-1-3!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../installed/HBuilderX.3.2.9.20210927.full/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./SingleChoiceForResultCard.vue?vue&type=style&index=0&id=73578cc0&lang=less&scoped=true& */ 210);
/* harmony import */ var _installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SingleChoiceForResultCard_vue_vue_type_style_index_0_id_73578cc0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SingleChoiceForResultCard_vue_vue_type_style_index_0_id_73578cc0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SingleChoiceForResultCard_vue_vue_type_style_index_0_id_73578cc0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SingleChoiceForResultCard_vue_vue_type_style_index_0_id_73578cc0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_2_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_5_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_installed_HBuilderX_3_2_9_20210927_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_SingleChoiceForResultCard_vue_vue_type_style_index_0_id_73578cc0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 210:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--10-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-2!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/study/MyProject/MT-XMCET/xmcet-app/components/SingleChoiceForResultCard/SingleChoiceForResultCard.vue?vue&type=style&index=0&id=73578cc0&lang=less&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/SingleChoiceForResultCard/SingleChoiceForResultCard.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/SingleChoiceForResultCard/SingleChoiceForResultCard-create-component',
    {
        'components/SingleChoiceForResultCard/SingleChoiceForResultCard-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(204))
        })
    },
    [['components/SingleChoiceForResultCard/SingleChoiceForResultCard-create-component']]
]);
