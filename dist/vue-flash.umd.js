(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.VueFlash = {}));
}(this, (function (exports) { 'use strict';

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
    //
    //
    //
    //
    //


    var script = {

        props: ['messages', 'message', 'index'],

        computed: {
            isCloseBtn: function isCloseBtn() {
                return !(!this.message.close || this.message.confirm || this.message.cancel);
            },
            confirmBtn: function confirmBtn() {
                if (!this.message.confirm) return '';

                if (typeof this.message.confirm === 'string') return this.message.confirm;

                return 'OK';
            },
            cancelBtn: function cancelBtn() {
                if (!this.message.cancel) return '';

                if (typeof this.message.cancel === 'string') return this.message.cancel;

                return 'Cancel';
            },
            inlineClass: function inlineClass() {
                return {
                    'inline-block': !!this.message.inline
                };
            }
        },

        mounted: function mounted() {
            this.$nextTick(function () {
                this.handleMessage();
            });
        },


        methods: {
            handleMessage: function handleMessage() {
                if (!this.message.confirm) this.handleTimeout();
            },
            handleTimeout: function handleTimeout() {
                if (!this.message.timeout) return;

                var self = this;

                setTimeout(function () {
                    self.destroyMessage();
                }, this.message.timeout);
            },
            destroyMessage: function destroyMessage() {
                // let index = this.messages.indexOf(this.message);
                this.messages.splice(this.index, 1);
            },
            confirmed: function confirmed() {
                if (this.message.confirmed) this.message.confirmed();

                this.destroyMessage();
            },
            canceled: function canceled() {
                if (this.message.canceled) this.message.canceled();

                this.destroyMessage();
            }
        }

    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
    /* server only */
    , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
      } // Vue.extend constructor export interop.


      var options = typeof script === 'function' ? script.options : script; // render functions

      if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true; // functional template

        if (isFunctionalTemplate) {
          options.functional = true;
        }
      } // scopedId


      if (scopeId) {
        options._scopeId = scopeId;
      }

      var hook;

      if (moduleIdentifier) {
        // server build
        hook = function hook(context) {
          // 2.3 injection
          context = context || // cached call
          this.$vnode && this.$vnode.ssrContext || // stateful
          this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
          // 2.2 with runInNewContext: true

          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          } // inject component styles


          if (style) {
            style.call(this, createInjectorSSR(context));
          } // register component module identifier for async chunk inference


          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        }; // used by ssr in case component is cached and beforeCreate
        // never gets called


        options._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function () {
          style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
        } : function (context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook) {
        if (options.functional) {
          // register for functional component in vue file
          var originalRender = options.render;

          options.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = options.beforeCreate;
          options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }

      return script;
    }

    var normalizeComponent_1 = normalizeComponent;

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function __vue_render__() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": "fade" } }, [_c('div', { staticClass: "alert", class: ['alert-' + _vm.message.type, _vm.message.inline ? 'alert-inline' : '', 'row'] }, [_vm.isCloseBtn ? _c('a', { staticClass: "close", class: _vm.inlineClass, staticStyle: { "position": "absolute", "left": "0" }, attrs: { "href": "#", "data-dismiss": "alert", "aria-label": "close" }, on: { "click": _vm.destroyMessage } }, [_vm._v("×")]) : _vm._e(), _vm._v(" "), _vm.message.title && !_vm.message.inline ? _c('h4', { staticClass: "title", domProps: { "innerHTML": _vm._s(_vm.message.title) } }) : _vm._e(), _vm._v(" "), _vm.message.text && !_vm.message.inline ? _c('p', { staticClass: "message", domProps: { "innerHTML": _vm._s(_vm.message.text) } }) : _vm._e(), _vm._v(" "), (_vm.message.title || _vm.message.text) && _vm.message.inline ? _c('span', { class: [_vm.confirmBtn || _vm.cancelBtn ? 'col-md-8' : 'col-md-12', _vm.confirmBtn || _vm.cancelBtn ? 'col-sm-8' : 'col-md-12', _vm.confirmBtn || _vm.cancelBtn ? 'col-xs-8' : 'col-md-12'] }, [_c('strong', { staticClass: "title inline", domProps: { "innerHTML": _vm._s(_vm.message.title) } }), _vm._v(" "), _c('span', { staticClass: "message inline", domProps: { "innerHTML": _vm._s(_vm.message.text) } })]) : _vm._e(), _vm._v(" "), _vm.confirmBtn || _vm.cancelBtn ? _c('p', { staticClass: "buttons__wrapper", class: { 'col-md-4': !!_vm.message.inline,
          'col-sm-4': !!_vm.message.inline,
          'col-xs-4': !!_vm.message.inline } }, [_vm.cancelBtn ? _c('button', { staticClass: "btn btn-danger btn-sm", attrs: { "type": "button" }, domProps: { "textContent": _vm._s(_vm.cancelBtn) }, on: { "click": function click($event) {
            $event.preventDefault();$event.stopPropagation();return _vm.canceled.apply(null, arguments);
          } } }) : _vm._e(), _vm._v(" "), _vm.confirmBtn ? _c('button', { staticClass: "btn btn-sm btn-success", attrs: { "type": "button" }, domProps: { "textContent": _vm._s(_vm.confirmBtn) }, on: { "click": function click($event) {
            $event.preventDefault();$event.stopPropagation();return _vm.confirmed.apply(null, arguments);
          } } }) : _vm._e()]) : _vm._e()])]);
    };
    var __vue_staticRenderFns__ = [];

    /* style */
    var __vue_inject_styles__ = undefined;
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject */

    /* style inject SSR */

    var message = normalizeComponent_1({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

    var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    var PLACEMENTS = {
        TOP_LEFT: 'top-left',
        TOP_RIGHT: 'top-right',
        BOTTOM_LEFT: 'bottom-left',
        BOTTOM_RIGHT: 'bottom-right'
    };

    var GLOBAL_NAME = 'global';

    var script$1 = {

        name: 'Flash',

        components: {
            message: message
        },

        props: {
            text: {},
            placement: { default: PLACEMENTS.BOTTOM_LEFT },
            name: { default: GLOBAL_NAME }
        },

        data: function data() {
            return {
                messages: [],
                message_key: 0
            };
        },


        computed: {
            flashMask: function flashMask() {
                var isMask = false;

                this.messages.forEach(function (v) {
                    if (v.mask) {
                        isMask = true;

                        return false;
                    }
                });

                return isMask;
            },
            position: function position() {
                var _ref;

                var horizental = this.placement === PLACEMENTS.TOP_LEFT || this.placement === PLACEMENTS.TOP_RIGHT ? 'top' : 'bottom';

                var vertical = this.placement === PLACEMENTS.TOP_LEFT || this.placement === PLACEMENTS.BOTTOM_LEFT ? 'left' : 'right';

                return _ref = {}, _defineProperty(_ref, horizental, '45px'), _defineProperty(_ref, vertical, '20px'), _ref;
            }
        },

        mounted: function mounted() {
            this.$nextTick(function () {
                this.handleMessage(this.text);
                this.handleEvents();
            });
        },


        methods: {
            handleEvents: function handleEvents() {
                var self = this;

                window.flash = function (message) {
                    var confirmed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                    var canceled = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

                    if (confirmed || canceled) {
                        if (typeof message === 'string') message = { text: message };

                        message.confirmed = confirmed;
                        message.canceled = canceled;
                    }

                    self.$bus.$emit('flash', message);
                };

                this.$bus.$on('flash', function (message) {
                    self.handleMessage(message);
                });
            },
            handleMessage: function handleMessage(message) {
                if (!message) return;

                if (typeof message === 'string') message = { text: message };

                if (this.name !== (message.name || GLOBAL_NAME)) return;

                return this.messages.push(this.handleObject(message));
            },
            handleObject: function handleObject(message) {
                return _extends({}, this.defaultOptions(), message);
            },
            defaultOptions: function defaultOptions() {
                return {
                    title: '',
                    text: '',
                    timeout: 6000,
                    type: 'success',
                    inline: false,
                    close: false,
                    confirm: false,
                    cancel: false,
                    mask: false,
                    html: false,
                    confirmed: function confirmed() {},
                    canceled: function canceled() {},

                    message_key: this.generateMessageKey()
                };
            },
            generateMessageKey: function generateMessageKey() {
                return this.message_key = this.message_key + 1;
            }
        }
    };

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = ".flash__mask{position:fixed;z-index:9999;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);display:block;-webkit-transition:opacity .3s ease;transition:opacity .3s ease}.flash__container{z-index:9999;position:fixed;max-width:460px;min-width:335px}.flash__container .alert{margin-bottom:10px;min-width:200px;min-height:100px;background-color:#030303;color:#fff;opacity:.9}.flash__container .alert p.message{min-height:33px}.flash__container .alert .buttons__wrapper{text-align:left}.flash__container .alert.alert-inline{min-height:62px}.flash__container .alert.alert-success{background-color:#51a351}.flash__container .alert.alert-info{background-color:#2f96b4}.flash__container .alert.alert-warning{background-color:#f89406}.flash__container .alert.alert-danger{background-color:#bd362f}.flash__container .alert .btn-danger{margin-left:5px}.flash__container .fade-enter-active,.flash__container .fade-leave-active{-webkit-transition:opacity .5s;transition:opacity .5s}.flash__container .fade-enter,.flash__container .fade-leave-to{opacity:0}";
    styleInject(css_248z);

    /* script */
    var __vue_script__$1 = script$1;
    /* template */
    var __vue_render__$1 = function __vue_render__() {
      var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: [_vm.flashMask ? 'flash__mask' : ''] }, [_c('div', { staticClass: "flash__container", style: _vm.position }, _vm._l(_vm.messages, function (message, index) {
        return _c('message', { key: message.message_key, attrs: { "messages": _vm.messages, "message": message, "index": index } });
      }), 1)]);
    };
    var __vue_staticRenderFns__$1 = [];

    /* style */
    var __vue_inject_styles__$1 = undefined;
    /* scoped */
    var __vue_scope_id__$1 = undefined;
    /* module identifier */
    var __vue_module_identifier__$1 = undefined;
    /* functional template */
    var __vue_is_functional_template__$1 = false;
    /* style inject */

    /* style inject SSR */

    var Flash = normalizeComponent_1({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, undefined, undefined);

    // install function executed by Vue.use()
    function install(Vue) {
      if (install.installed) return;
      install.installed = true;
      Vue.component(Flash.name, Flash);
    }

    // Create module definition for Vue.use()
    var plugin = {
      install: install

      // To auto-install when vue is found
      /* global window global */
    };var GlobalVue = null;
    if (typeof window !== 'undefined') {
      GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
      GlobalVue = global.Vue;
    }
    if (GlobalVue) {
      GlobalVue.use(plugin);
    }

    // Inject install function into component - allows component
    // to be registered via Vue.use() as well as Vue.component()
    Flash.install = install;

    // It's possible to expose named exports when writing components that can
    // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
    // export const RollupDemoDirective = component;

    exports.default = Flash;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
