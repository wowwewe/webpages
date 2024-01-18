!function() {
    'use strict';
    const e = () => {
            var e = (navigator && navigator.userAgent || '').toLowerCase(),
                t = (navigator && navigator.vendor || '').toLowerCase(),
                n = null !== e.match(/(?:firefox|fxios)\/(\d+)/),
                i = null !== e.match(/version\/(\d+).+?safari/),
                a = null !== e.match(/edge\/(\d+)/),
                r = null !== e.match(/(?:^opera.+?version|opr)\/(\d+)/),
                l = /google inc/.test(t) ? e.match(/(?:chrome|crios)\/(\d+)/) : null;
            return n ? 'FIREFOX' : i ? 'SAFARI' : a ? 'EDGE' : r ? 'OPERA' : null !== l && !r ? 'CHROME' : void 0
        },
        t = window.top === window.self,
        n = e => e ? e.split('+').map((e => {
            return (t = e) ? (t = t.toLowerCase()).charAt(0).toUpperCase() + t.slice(1) : '';
            var t
        })).join('+') : '',
        a = e => {
            const t = -1 !== navigator.userAgent.indexOf('Mac OS X');
            if (!e)
                return '';
            if (!t)
                return n(e);
            if (e.includes('⇧') || e.includes('⌥') || e.includes('⌃') || e.includes('⌘'))
                return e;
            e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.toLowerCase()).replace('shift', '⇧')).replace('alt', '⌥')).replace('right', '→')).replace('left', '←')).replace('right', '→')).replace('pagedown', '⇟')).replace('pageup', '⇞')).replace('end', '↘')).replace('home', '↖')).replace('insert', 'Ins')).replace('period', '.');
            const i = (e = (e = (e = t ? e.replace('macctrl', '⌃') : e.replace('ctrl', '⌃')).replace('command', '⌘')).replace('meta', '⌘')).split('+');
            return i.includes('comma') && (e = e.replace('comma', ',')), i.includes('down') && (e = e.replace('down', '↓')), i.includes('up') && (e = e.replace('up', '↑')), i.includes('delete') && (e = e.replace('delete', 'Del')), i.includes('del') && (e = e.replace('del', 'Del')), i.includes('ins') && (e = e.replace('ins', 'Ins')), i.includes('ctrl') && (e = e.replace('ctrl', '⌃')), (e = n(e)).split('+').join('')
        },
        r = e => {
            const t = document.getElementsByTagName('iframe');
            if (0 === t.length)
                return null;
            const n = ((e, t) => e.reduce(((e, n) => {
                const {width: i, height: a, src: r, name: l} = t,
                    s = Math.abs(n.clientWidth - i) <= 1 && Math.abs(n.clientHeight - a) <= 1,
                    o = n.src && r && n.src === r,
                    d = n.name && l && n.name === l;
                let u = 0;
                s && d && o ? u = 3 : s && (o || d) || o && d ? u = 2 : s && (u = 1);
                const c = 'www.winbank.gr' === window.location.hostname && '/sites/corporate/en/Pages/default.aspx' === window.location.pathname;
                return 0 === u && o && c && (u = 1), e.push({
                    frame: n,
                    exactScore: u
                }), e
            }), []).sort(((e, t) => t.exactScore - e.exactScore))[0])([...t], e);
            return 0 === n.exactScore ? null : n
        },
        l = e => /^[A-Za-z_-][-A-Za-z0-9_:.]*$/.test(e);
    for (var s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', o = 'undefined' == typeof Uint8Array ? [] : new Uint8Array(256), d = 0; d < 64; d++)
        o[s.charCodeAt(d)] = d;
    const u = 'form_captured',
        c = 'guess_form_type_result';
    let m = null;
    const h = e();
    'SAFARI' !== h && (m = void 0 === h || Object.getPrototypeOf(h) !== Object.prototype ? chrome : h);
    const p = e => {
            'object' == typeof safari && safari.self && safari.self.addEventListener ? safari.self.addEventListener('message', (({name: t, message: n}) => {
                e(t, n)
            })) : m.runtime.onMessage.addListener(((t, n, i) => {
                if (!t)
                    return;
                const {command: a, payload: r} = t;
                e(a, r, n, i)
            }))
        },
        f = (e, t) => {
            const n = {
                command: e,
                payload: t
            };
            'object' == typeof safari && safari.extension ? safari.extension.dispatchMessage(e, t) : m.runtime.sendMessage(n)
        },
        g = e => 'object' == typeof safari && safari.extension ? safari.extension.baseURI + e.substring(e.lastIndexOf('/') + 1) : m.runtime.getURL(e);
    class b {
        constructor()
        {
            this.ExtensionAPI = null,
            'SAFARI' !== e() && ('undefined' == typeof browser || Object.getPrototypeOf(browser) !== Object.prototype ? this.ExtensionAPI = chrome : this.ExtensionAPI = browser),
            this.request = e => {
                'object' == typeof safari && safari.extension ? safari.extension.dispatchMessage(e.command, e.payload) : this.ExtensionAPI.runtime.sendMessage(e)
            },
            this.on = (e, t) => {
                const n = this;
                function i(a, r, l) {
                    return a.command && a.command === e && t(a.payload, (function() {
                        n.off(i)
                    })), a.name && a.name === e && t(a.message, (() => {
                        n.off(i)
                    })), !0
                }
                return 'object' == typeof safari && safari.self && safari.self.addEventListener ? safari.self.addEventListener('message', i) : this.ExtensionAPI.runtime.onMessage.addListener(i), i
            },
            this.off = e => {
                'object' == typeof safari && safari.self && safari.self.removeEventListener ? safari.self.removeEventListener('message', e) : this.ExtensionAPI.runtime.onMessage.removeListener(e)
            }
        }
    }
    const y = new class {
        constructor(e)
        {
            this.messageManager = new b,
            this.isSafariExtension = 'object' == typeof safari && safari.extension
        }
        setBlockingURL(e)
        {
            this.messageManager.request({
                command: 'set_block_url',
                payload: {
                    url: e
                }
            })
        }
        setBlurOnInlineMenu(e)
        {
            this.isSafariExtension && (e = {
                ...e,
                relay: !0
            }),
            this.messageManager.request({
                command: 'set_menu_blur',
                payload: e
            })
        }
        setFocusOnlineMenu(e)
        {
            this.isSafariExtension && (e = {
                ...e,
                relay: !0
            }),
            this.messageManager.request({
                command: 'set_menu_focus',
                payload: e
            })
        }
        fetchInlineItems(e)
        {
            this.messageManager.request({
                command: 'fetch_inline_items',
                payload: e
            })
        }
        searchItem(e)
        {
            this.isSafariExtension && (e = {
                ...e,
                relay: !0
            }),
            this.messageManager.request({
                command: 'search_item',
                payload: e
            })
        }
        continueOnUnlock(e)
        {
            this.isSafariExtension && (e = {
                ...e,
                relay: !0
            }),
            this.messageManager.request({
                command: 'continue_on_unlock',
                payload: e
            })
        }
        getLockStatus()
        {
            this.messageManager.request({
                command: 'get_lock_status'
            })
        }
        getInlineSetting(e)
        {
            this.messageManager.request({
                command: 'fetch_inline_setting',
                payload: e
            })
        }
        onInlineSettingResult(e)
        {
            this.messageManager.on('inline_setting_result', e)
        }
        onLockStateUpdated(e)
        {
            this.messageManager.on('update_lock_status', e)
        }
        onInlineMenuSettingUpdate(e)
        {
            this.messageManager.on('update_inline_menu_setting', e)
        }
        onInlineMenuDisplayStatus(e)
        {
            this.messageManager.on('menu_display_status', e)
        }
        onSetFieldFocus(e)
        {
            this.messageManager.on('active_field_focus', e)
        }
        onSaveInputData(e)
        {
            this.messageManager.on('save_input_data', e)
        }
        onResizeMenu(e)
        {
            this.messageManager.on('resize-menu', e)
        }
        onRemoveMenu(e)
        {
            this.messageManager.on('remove_menu', e)
        }
        onInlineMenuBlocked(e)
        {
            this.messageManager.on('block_inline_menu', e)
        }
        onMenuReadyToShow(e)
        {
            this.messageManager.on('menu_ready_to_show', e)
        }
        getAutoFillItemOnLoad()
        {
            this.messageManager.request({
                command: 'get_autofill_item_on_load'
            })
        }
        onAutofillOnLoadData(e)
        {
            this.messageManager.on('autofill_onload_data', e)
        }
        onAutofillInlineItem(e)
        {
            this.messageManager.on('autofill_inline_item', e)
        }
        onTabInfo(e)
        {
            this.messageManager.on('tab_info', e)
        }
        handleButtonClick(e)
        {
            this.messageManager.request({
                command: 'inline_button_clicked',
                payload: e
            })
        }
        notifyIframes(e)
        {
            this.messageManager.request({
                command: 'notify_iframes',
                payload: e
            })
        }
        onIframeNotification(e)
        {
            this.messageManager.on('iframe_notification', e)
        }
        saveLoginData(e)
        {
            this.messageManager.request({
                command: 'form_captured',
                payload: e
            })
        }
        sendDirtyFieldStatus(e)
        {
            this.messageManager.request({
                command: 'dirty_status',
                payload: e
            })
        }
        fetchLaunchShortcut()
        {
            return this.messageManager.request({
                command: 'fetch_launch_shortcut'
            })
        }
        fetchMenuSettings(e)
        {
            this.messageManager.request({
                command: 'fetch_menu_settings',
                payload: e
            })
        }
        checkSafariConnection(e)
        {
            this.messageManager.request({
                command: 'check_safari_connection',
                payload: e
            })
        }
        onMenuSettings(e)
        {
            this.messageManager.on('stored_menu_settings', e)
        }
        onUnlockAttach(e)
        {
            this.messageManager.on('attach_menu_on_unlock', e)
        }
        setToggleDisplay(e)
        {
            this.messageManager.request({
                command: 'toggle_menu_display',
                payload: {
                    ...e,
                    relay: !0
                }
            })
        }
        onToggleDisplay(e)
        {
            this.messageManager.on('toggle_menu_display', e)
        }
        attachMenuToRect(e)
        {
            this.messageManager.request({
                command: 'attach_menu_to_rect',
                payload: {
                    ...e,
                    relay: !0
                }
            })
        }
        removeAttachedMenu(e)
        {
            this.messageManager.request({
                command: 'remove_attached_menu',
                payload: {
                    ...e,
                    relay: !0
                }
            })
        }
        attachMenuOnKeyDown(e)
        {
            this.messageManager.request({
                command: 'attach_menu_on_keydown',
                payload: {
                    ...e,
                    relay: !0
                }
            })
        }
        dettachMenuOnKeyEvent(e)
        {
            this.messageManager.request({
                command: 'dettach_menu_on_keyevent',
                payload: {
                    ...e,
                    relay: !0
                }
            })
        }
        updateMenuPosition(e)
        {
            this.messageManager.request({
                command: 'update_menu_position',
                payload: {
                    ...e,
                    relay: !0
                }
            })
        }
        fetchResizeHeight(e)
        {
            this.messageManager.request({
                command: 'fetch_resize_height',
                payload: {
                    ...e,
                    relay: !0
                }
            })
        }
        onAttachMenuOnKeyDown(e)
        {
            this.messageManager.on('attach_menu_on_keydown', e)
        }
        onDettachMenuOnKeyEvent(e)
        {
            this.messageManager.on('dettach_menu_on_keyevent', e)
        }
        onRemoveAttachedMenu(e)
        {
            this.messageManager.on('remove_attached_menu', e)
        }
        onAttachMenuRect(e)
        {
            this.messageManager.on('attach_menu_to_rect', e)
        }
        onUpdateMenuPosition(e)
        {
            this.messageManager.on('update_menu_position', e)
        }
        onPasskeyCreation(e)
        {
            this.messageManager.on('initiate_passkey_creation_response', e)
        }
        onPasskeyAuthentication(e)
        {
            this.messageManager.on('initiate_passkey_authentication_response', e)
        }
    }
    ;
    function v(e) {
        return 'Minified Redux error #' + e + '; visit https://redux.js.org/Errors?code=' + e + ' for the full message or use the non-minified dev environment for full errors. '
    }
    var w = 'function' == typeof Symbol && Symbol.observable || '@@observable',
        _ = function() {
            return Math.random().toString(36).substring(7).split('').join('.')
        },
        L = {
            INIT: '@@redux/INIT' + _(),
            REPLACE: '@@redux/REPLACE' + _(),
            PROBE_UNKNOWN_ACTION: function() {
                return '@@redux/PROBE_UNKNOWN_ACTION' + _()
            }
        };
    const I = {
        activeField: void 0,
        activeFieldDir: 'ltr',
        activeFieldPaddingX: 0,
        activeFieldRect: void 0,
        locked: !0,
        menuOpen: !1,
        locale: m ? m.i18n.getUILanguage() : 'en',
        inlineDisabled: !1,
        autoLogin: !1,
        autoDisplayMenu: !0,
        autofillInOperation: !1,
        autoLoginExecuted: !1,
        menuID: void 0,
        frameID: window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
        url: void 0,
        iframeURL: document.URL,
        latest_action: null
    };
    var T = function e(t, n, i) {
        var a;
        if ('function' == typeof n && 'function' == typeof i || 'function' == typeof i && 'function' == typeof arguments[3])
            throw new Error(v(0));
        if ('function' == typeof n && void 0 === i && (i = n, n = void 0), void 0 !== i) {
            if ('function' != typeof i)
                throw new Error(v(1));
            return i(e)(t, n)
        }
        if ('function' != typeof t)
            throw new Error(v(2));
        var r = t,
            l = n,
            s = [],
            o = s,
            d = !1;
        function u() {
            o === s && (o = s.slice())
        }
        function c() {
            if (d)
                throw new Error(v(3));
            return l
        }
        function m(e) {
            if ('function' != typeof e)
                throw new Error(v(4));
            if (d)
                throw new Error(v(5));
            var t = !0;
            return u(), o.push(e), function() {
                if (t) {
                    if (d)
                        throw new Error(v(6));
                    t = !1,
                    u();
                    var n = o.indexOf(e);
                    o.splice(n, 1),
                    s = null
                }
            }
        }
        function h(e) {
            if (!function(e) {
                if ('object' != typeof e || null === e)
                    return !1;
                for (var t = e; null !== Object.getPrototypeOf(t);)
                    t = Object.getPrototypeOf(t);
                return Object.getPrototypeOf(e) === t
            }(e))
                throw new Error(v(7));
            if (void 0 === e.type)
                throw new Error(v(8));
            if (d)
                throw new Error(v(9));
            try {
                d = !0,
                l = r(l, e)
            } finally {
                d = !1
            }
            for (var t = s = o, n = 0; n < t.length; n++) {
                (0, t[n])()
            }
            return e
        }
        return h({
            type: L.INIT
        }), (a = {
            dispatch: h,
            subscribe: m,
            getState: c,
            replaceReducer: function(e) {
                if ('function' != typeof e)
                    throw new Error(v(10));
                r = e,
                h({
                    type: L.REPLACE
                })
            }
        })[w] = function() {
            var e,
                t = m;
            return (e = {
                subscribe: function(e) {
                    if ('object' != typeof e || null === e)
                        throw new Error(v(11));
                    function n() {
                        e.next && e.next(c())
                    }
                    return n(), {
                        unsubscribe: t(n)
                    }
                }
            })[w] = function() {
                return this
            }, e
        }, a
    }(((e=I, t) => {
        switch (t.type) {
        case 'INIT_STATE':
            {
                const t = {
                    activeField: void 0,
                    activeFieldDir: 'ltr',
                    activeFieldPaddingX: 0,
                    activeFieldRect: void 0,
                    menuOpen: !1
                };
                return {
                    ...e,
                    ...t,
                    latest_action: 'INIT_STATE'
                }
            }case 'SET_ACTIVE_FIELD':
            {
                const n = {
                        direction: 'ltr',
                        paddingLeft: '0',
                        paddingRight: '0'
                    },
                    i = t.payload,
                    a = i ? window.getComputedStyle(i) : n,
                    r = 'rtl' === a.direction ? 'rtl' : 'ltr',
                    l = parseFloat('rtl' === r ? a.paddingLeft : a.paddingRight);
                return {
                    ...e,
                    activeField: t.payload,
                    activeFieldRect: i ? JSON.parse(JSON.stringify(i.getBoundingClientRect())) : void 0,
                    activeFieldDir: r,
                    activeFieldPaddingX: l,
                    latest_action: 'SET_ACTIVE_FIELD'
                }
            }case 'UPDATE_ACTIVE_FIELD_RECT':
            return {
                ...e,
                activeFieldRect: t.payload,
                latest_action: 'UPDATE_ACTIVE_FIELD_RECT'
            };
        case 'REMOVE_ACTIVE_FIELD':
            return {
                ...e,
                activeField: void 0,
                activeFieldDir: 'ltr',
                activeFieldPaddingX: 0,
                activeFieldRect: void 0,
                menuOpen: !1,
                menuID: void 0,
                latest_action: 'REMOVE_ACTIVE_FIELD'
            };
        case 'BLOCK_INLINE':
            return {
                ...e,
                activeField: void 0,
                activeFieldDir: 'ltr',
                activeFieldPaddingX: 0,
                activeFieldRect: void 0,
                locked: !0,
                menuOpen: !1,
                menuID: void 0,
                locale: 'en',
                inlineDisabled: !0,
                latest_action: 'BLOCK_INLINE'
            };
        case 'UPDATE_LOCK_STATUS':
            return {
                ...e,
                locked: t.payload,
                latest_action: 'UPDATE_LOCK_STATUS'
            };
        case 'UPDATE_INLINE_SETTING':
            return {
                ...e,
                inlineDisabled: t.payload,
                latest_action: 'UPDATE_INLINE_SETTING'
            };
        case 'MENU_DISPLAY_STATUS':
            return t.payload ? {
                ...e,
                menuOpen: t.payload,
                latest_action: 'MENU_DISPLAY_STATUS'
            } : {
                ...e,
                menuOpen: t.payload,
                menuID: void 0,
                latest_action: 'MENU_DISPLAY_STATUS'
            };
        case 'UPDATE_MENU_ID':
            return {
                ...e,
                menuID: t.payload,
                latest_action: 'UPDATE_MENU_ID'
            };
        case 'SYNC_INLINE_SETTING':
            {
                const {locked: n, inlineDisabled: i} = t.payload,
                    a = !n && t.payload.autoLogin;
                return {
                    ...e,
                    autoLogin: a,
                    inlineDisabled: i,
                    latest_action: 'SYNC_INLINE_SETTING'
                }
            }case 'AUTOFILL_IN_OPERATION':
            return {
                ...e,
                autofillInOperation: t.payload,
                latest_action: 'AUTOFILL_IN_OPERATION'
            };
        case 'AUTOLOGIN_IN_EXECUTION':
            return {
                ...e,
                autoLoginExecuted: t.payload,
                latest_action: 'AUTOLOGIN_IN_EXECUTION'
            };
        case 'SET_TAB_URL':
            return {
                ...e,
                url: t.payload,
                latest_action: 'SET_TAB_URL'
            };
        case 'SET_TOGGLMENU_DISPLAY':
            return {
                ...e,
                autoDisplayMenu: !e.autoDisplayMenu,
                latest_action: 'SET_TOGGLMENU_DISPLAY'
            };
        default:
            return e
        }
    }));
    const E = ['text', 'email', 'number', 'password', 'url', 'tel', 'search'];
    class F {
        constructor()
        {
            this.shadowRoot = null,
            this.inlineButton = null,
            this.positionTimer = null,
            this.isValuedField = e => e && e instanceof HTMLInputElement && E.includes(e.type),
            this.createShadowRoot = () => {
                if (document.body)
                    return document.createElement('ENPASS-INLINE-BUTTON').attachShadow({
                        mode: 'closed'
                    })
            },
            this.calculateInlineIconSize = e => e >= 38 ? 24 : e < 20 ? 12 : 16,
            this.getIconURL = e => {
                const t = T.getState().locked ? 'locked' : 'unlocked';
                return g(`icons/icon-${t}.svg`)
            },
            this.setStyle = e => {
                if (!e || !this.inlineButton || !this.shadowRoot)
                    return;
                const t = window.getComputedStyle(e),
                    n = e.getBoundingClientRect(),
                    i = n.top,
                    a = n.width,
                    r = n.left,
                    l = n.height,
                    s = this.calculateInlineIconSize(l),
                    o = (l - s) / 2,
                    d = parseFloat('rtl' === t.direction ? t.paddingLeft : t.paddingRight),
                    u = Math.max(o, d),
                    c = i + o,
                    m = a - s - u,
                    h = r + ('rtl' === t.direction ? u : m),
                    p = this.getIconURL(s);
                this.inlineButton.style.cssText = `\n                all: initial;\n                position: fixed;\n                z-index: 2147483647;\n                top: ${c}px;\n                left: ${h}px;\n                min-width: 12px;\n                width: ${s}px;\n                max-width: 24px;\n                min-height: 12px;\n                background-image: url(${p});\n                height: ${s}px;\n                max-height: 24px;\n                background-size: cover;\n                background-repeat: no-repeat;\n                border: none;\n                outline: 0;\n                cursor: pointer;\n            `
            },
            this.onClick = e => {},
            this.draw = () => {
                this.inlineButton = document.createElement('button'),
                this.shadowRoot = this.createShadowRoot(),
                this.shadowRoot && (this.shadowRoot.appendChild(this.inlineButton), this.shadowRoot.addEventListener('mousedown', (e => {
                    e.stopImmediatePropagation(),
                    e.preventDefault(),
                    this.onClick()
                })))
            },
            this.attach = e => !(!this.isValuedField(e) || this.inlineButton) && (this.draw(), this.setStyle(e), !(!this.shadowRoot || this.shadowRoot.host.parentElement) && (document.body.appendChild(this.shadowRoot.host), this.visibilityTracker.observe(e), this.addScrollResizeEventListener(), !0)),
            this.dettach = () => {
                this.shadowRoot && this.shadowRoot.host.parentElement && (document.body.removeChild(this.shadowRoot.host), this.shadowRoot = null, this.inlineButton = null, this.visibilityTracker.disconnect(), this.isScrollResizeListenerActive && (window.removeEventListener('scroll', this.onScrollOrResize, !0), window.removeEventListener('resize', this.onScrollOrResize, !0), this.isScrollResizeListenerActive = !1))
            },
            this.visibilityTracker = new IntersectionObserver((e => {
                e.forEach((e => {
                    const {width: t, height: n} = e.boundingClientRect;
                    e.isIntersecting && 0 !== t && 0 !== n || this.dettach()
                }))
            })),
            this.onScrollOrResize = e => {
                'MARQUEE' !== e.target.tagName && this.isScrollResizeListenerActive && (window.removeEventListener('scroll', this.onScrollOrResize, !0), window.removeEventListener('resize', this.onScrollOrResize, !0), this.isScrollResizeListenerActive = !1, this.dettach())
            },
            this.addScrollResizeEventListener = () => {
                this.isScrollResizeListenerActive || (window.addEventListener('scroll', this.onScrollOrResize, !0), window.addEventListener('resize', this.onScrollOrResize, !0), this.isScrollResizeListenerActive = !0)
            }
        }
    }
    const D = e => {
            e && -1 !== 'email text password number tel url'.split(' ').indexOf(e.type || '') && (e.className += ' enpass-extension-animated-fill', setTimeout((function() {
                e && e.className && (e.className = e.className.replace(/(?:^|\s)enpass-extension-animated-fill(?!\S)/g, ''))
            }), 200))
        },
        x = (e, t) => {
            for (var n = e + ''; n.length < t;)
                n = '0' + n;
            return n
        },
        N = (e, t) => {
            const n = window.document.createEvent('Events');
            n.initEvent(e, !0, !0),
            t.dispatchEvent(n)
        },
        A = (e, t) => {
            let n;
            n = e.ownerDocument ? e.ownerDocument.createEvent('HTMLEvents') : document.createEvent('HTMLEvents'),
            n.initEvent(t, !0, !0),
            e && e.dispatchEvent(n)
        },
        C = e => {
            let t = e.value;
            N('input', e),
            N('keyup', e),
            N('blur', e),
            N('change', e),
            '' !== e.value && e.value === t || (e.value = t)
        },
        k = (e, t) => {
            var n = [];
            e || (e = document);
            try {
                n = Array.prototype.slice.call(e.querySelectorAll(t))
            } catch (e) {
                return []
            }
            return n
        },
        S = e => (e || (e = document), k(e, 'input, select, button , textarea')),
        O = e => 'string' == typeof e ? e.toLowerCase() : ('' + e).toLowerCase(),
        P = (e, t, n) => {
            if (!e)
                return !1;
            e = (e = e.toLowerCase()).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            for (var i = 0, a = t.length; i < a; i++) {
                if (-1 !== e.indexOf(t[i]))
                    return !0;
                if (n)
                    if (-1 !== e.replace(/\s/gi, '').indexOf(t[i]))
                        return !0
            }
            return !1
        },
        M = (e, t, n) => !!e && (e = (e = e.toLowerCase()).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''), t.every((function(t) {
            if (-1 !== e.indexOf(t))
                return !0;
            if (n && -1 !== e.replace(/\s/gi, '').indexOf(t))
                return !0;
            return !1
        }))),
        R = e => e.options ? {
            options: Array.prototype.slice.call(e.options).map((e => {
                var t = e.text;
                return [(t = t ? O(t).replace(/\s/gm, '').replace(/[~`!@$%^&*()\-_+=:;'"\[\]|\\,<.>\/?]/gm, '') : null) || null, e.value]
            }))
        } : null,
        U = (e, t, n) => {
            null != n && (e[t] = n)
        },
        B = (e, t) => e && t ? e.filter((e => 'string' == typeof t ? 'password' === t ? e.htmlType === t || 'disc' === e.cssTextSecurity : e.htmlType === t : t.constructor === Array && -1 !== t.indexOf(e.htmlType))) : [],
        V = e => {
            var t = e.ownerDocument,
                n = t ? t.defaultView : {};
            if ('INPUT' === e.tagName && 'hidden' === e.type)
                return !1;
            let i = !0;
            const a = n.getComputedStyle ? n.getComputedStyle(e, null) : e.style;
            if (!a)
                return !0;
            if ('0px' === a.width && '0px' === a.height)
                return !1;
            for (var r; e && e !== t;) {
                if (e.nodeType !== Node.ELEMENT_NODE)
                    return !0;
                if (!(r = n.getComputedStyle ? n.getComputedStyle(e, null) : e.style))
                    return !0;
                if (('hidden' === r.overflow || '0' === r.opacity) && '0px' === a.width && '0px' === a.height)
                    return !1;
                if ('absolute' === r.position && 'rect(1px, 1px, 1px, 1px)' === r.clip)
                    return !1;
                if ('none' === r.display || i && 'hidden' == r.visibility && 'BODY' !== e.tagName)
                    return !1;
                if ('visible' === r.visibility && (i = !1), e.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
                    return !0;
                e = e.parentNode
            }
            return e === t
        },
        q = (e, t) => {
            if (!e)
                return !1;
            var n = new RegExp(String.fromCharCode(160), 'gi');
            e = (e = (e = (e = e.replace(n, ' ')).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')).replace(/\s\s+/gi, ' ')).trim().toLowerCase();
            for (var i = t.length; i--;)
                if (e === t[i])
                    return !0;
            return !1
        },
        z = e => {
            if (!e)
                return !1;
            var t = e.ownerDocument && e.ownerDocument.documentElement ? e.ownerDocument.documentElement : document,
                n = e.ownerDocument && e.ownerDocument.body ? e.ownerDocument.body : document.body,
                i = e.getBoundingClientRect(),
                a = window.pageXOffset || document.documentElement.scrollLeft,
                r = window.pageYOffset || document.documentElement.scrollTop,
                l = i.top + r,
                s = i.left + a,
                o = i.right + a,
                d = i.bottom + r,
                u = Math.max(n.scrollWidth, n.offsetWidth, t.clientWidth, t.scrollWidth, t.offsetWidth),
                c = Math.max(n.scrollHeight, n.offsetHeight, t.clientHeight, t.scrollHeight, t.offsetHeight),
                m = u > 0 && c > 0 && i.width > 0 && i.height > 0,
                h = l < 0 && d > 4 && d <= c && m,
                p = s < 0 && o > 4 && o <= u && m,
                f = s >= 0 && s <= u && m,
                g = o >= 0 && o <= u && m,
                b = l >= 0 && l <= c && m,
                y = d >= 0 && d <= c && m;
            return !!(b && f && g && y && m || h && p || h && f && g || p && b && y)
        },
        j = e => {
            if (!e)
                return !1;
            var t,
                n = e.ownerDocument && e.ownerDocument.documentElement ? e.ownerDocument.documentElement : document,
                i = e.ownerDocument && e.ownerDocument.body ? e.ownerDocument.body : document.body,
                a = e.getBoundingClientRect(),
                r = Math.max(i.scrollWidth, i.offsetWidth, n.clientWidth, n.scrollWidth, n.offsetWidth),
                l = Math.max(i.scrollHeight, i.offsetHeight, n.clientHeight, n.scrollHeight, n.offsetHeight),
                s = a.left - n.clientLeft,
                o = a.top - n.clientTop;
            if (!V(e) || !e.offsetParent || 10 > e.clientWidth || 10 > e.clientHeight)
                return !1;
            var d = e.getClientRects();
            if (0 === d.length)
                return !1;
            for (var u = 0, c = d.length; u < c; u++)
                if ((t = d[u]).left > r || 0 > t.right)
                    return !1;
            if (0 > s || s > r || 0 > o || o > l)
                return !1;
            var m,
                h = s + (a.right > window.innerWidth ? (window.innerWidth - s) / 2 : a.width / 2),
                p = o + (a.bottom > window.innerHeight ? (window.innerHeight - o) / 2 : a.height / 2);
            for (m = e.ownerDocument.elementFromPoint(h, p); m && m !== e && e !== document;) {
                const t = m.tagName,
                    n = !!t && 'string' == typeof m.tagName;
                if (!!t && 'label' === m.tagName.toLowerCase()) {
                    if (t && n && e.labels && e.labels.length > 0)
                        return Array.prototype.slice.call(e.labels).indexOf(m) >= 0;
                    {
                        const t = m.getAttribute('id'),
                            n = e.getAttribute('aria-describedby'),
                            i = e.getAttribute('aria-labelledby');
                        if (t && (t === n || t === i))
                            return !0
                    }
                }
                m = m.parentNode
            }
            return m === e
        },
        W = (e, t) => {
            let n = e[t];
            if (n && 'string' == typeof n)
                return n;
            try {
                n = e.getAttribute(t)
            } catch (e) {}
            return n && 'string' == typeof n ? n : null
        },
        $ = e => {
            var t = null;
            return e && (t = 0 < (t = e.replace(/^\s+|\s+$|\r?\n.*$/gm, '')).length ? t : null), t ? t.toLowerCase().trim() : ''
        },
        H = e => e ? e.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ') : null,
        K = e => {
            var t,
                n,
                i,
                a = [];
            if (e && e.nodeType === Node.ELEMENT_NODE && e.tagName && 'button' === e.tagName.toLowerCase())
                return null;
            if (e.labels && e.labels.length && 0 < e.labels.length)
                a = Array.prototype.slice.call(e.labels);
            else {
                if (e.id && (a = a.concat(k(e, 'label[for=' + JSON.stringify(e.id) + ']'))), e.name) {
                    t = k(e, 'label[for=' + JSON.stringify(e.name) + ']');
                    for (var r = 0; r < t.length; r++) {
                        var l = t[r];
                        -1 === a.indexOf(l) && a.push(l)
                    }
                }
                e.previousElementSibling && 'LABEL' === e.previousElementSibling.tagName && a.push(e.previousElementSibling);
                for (var s = e, o = e.ownerDocument; s && s != o; s = s.parentNode) {
                    var d = e.tagName;
                    'label' === ('string' == typeof d ? d.toLowerCase() : ('' + d).toLowerCase()) && -1 === a.indexOf(s) && a.push(s)
                }
            }
            if (i = (n = e.parentNode) && n.previousElementSibling, n && n.nodeType === Node.ELEMENT_NODE) {
                if (0 === a.length && 'td' === n.tagName.toLowerCase() && i && 'td' === i.tagName.toLowerCase())
                    try {
                        0 === i.querySelectorAll('input,select,textarea').length && a.push(i)
                    } catch (e) {}
                if (0 === a.length && 'dd' === n.tagName.toLowerCase() && i && 'dt' === i.tagName.toLowerCase())
                    try {
                        0 === i.querySelectorAll('input,select,textarea').length && a.push(i)
                    } catch (e) {}
            }
            if (a.length > 0) {
                var u = a.map((function(e) {
                    return V(e) && z(e) ? (e => {
                        if (!e)
                            return null;
                        var t = null;
                        return (t = e.textContent || e.innerText) ? t = (t = (t = (t = t.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ')).replace(/\&lt;br\&gt;/gi, '\n').replace(/(&lt;([^&gt;]+)&gt;)/gi, ' ')).replace(/\s/g, ' ')).trim().toLowerCase() : null
                    })(e) : ''
                }));
                return H(u.join(''))
            }
            return null
        },
        G = (e, t) => {
            var n;
            return !!e && (n = e ? (e.tagName || '').toLowerCase() : '', t.constructor === Array ? t.indexOf(n) >= 0 : t === n)
        },
        Y = e => {
            var t = !e || void 0 === e || G(e, 'select option input form textarea button table iframe body head script a'.split(' '));
            if (!t) {
                if (G(e, 'label') && e.hasAttribute('for')) {
                    var n = e.getAttribute('for');
                    if (document.getElementById(n) || document.getElementsByName(n) > 0)
                        return !0
                }
                return !(!e || void 0 === e || 1 !== e.nodeType) && e.querySelectorAll('select,option,input,form,textarea,button,table,iframe,body,head,script').length > 0
            }
            return t
        },
        X = e => {
            var t;
            for (e = e.parentElement || e.parentNode; e && 'td' !== O(e.tagName);)
                e = e.parentElement || e.parentNode;
            return e && void 0 !== e ? 'tr' !== (t = e.parentElement || e.parentNode).tagName.toLowerCase() || !(t = t.previousElementSibling) || 'tr' != (t.tagName + '').toLowerCase() || t.cells && e.cellIndex >= t.cells.length ? null : (t = t.cells[e.cellIndex], Y(t) ? null : (e = $(t.textContent), H(e))) : null
        },
        Z = e => {
            var t = '';
            return 3 === e.nodeType ? t = e.nodeValue : 1 === e.nodeType && (t = e.textContent || e.innerText), (t = $(t)) ? t.toLowerCase() : ''
        },
        J = e => {
            var t = [];
            return Q(e, t), t = t.reverse().join(''), H(t)
        },
        Q = (e, t) => {
            for (var n, i; e && e.previousSibling;)
                if (!(e = e.previousSibling).tagName || 'input' !== e.tagName.toLowerCase() || !e.type || 'hidden' !== e.type) {
                    if (Y(e))
                        return '';
                    (i = Z(e)) && t.push(i)
                }
            if (e && 0 === t.length)
                for (n = null; !n;) {
                    if (!(e = e.parentElement || e.parentNode) || 'FORM' === e.tagName)
                        return;
                    for (n = e.previousSibling; n && !Y(n) && n.lastChild;)
                        n = n.lastChild
                }
            Y(n) || ((i = Z(n)) && t.push(i), 0 === t.length && Q(n, t))
        },
        ee = e => {
            for (var t = [], n = e; n && n.nextSibling && (n = n.nextSibling, !Y(n));)
                t.push(Z(n));
            return H(t.join(''))
        },
        te = e => e ? e.filter((function(e) {
            return 'hidden' !== e.htmlType
        })) : [],
        ne = (e, t) => {
            if (!e)
                return !0;
            if (e.isOutsideDocument)
                return !0;
            let n = 0,
                i = /(?:answer.*(?:security|hint|secret|challenge))|(?:(?:security|hint|secret|challenge).*answer)|(?:e.?mail.*alert)|gift|promo|coupon|maiden|comment|messageq|search|keyword|ordercode|newsletter|conditions|captcha|imageword|subscribe|txtspamcheck|turing|anti_spam_code|invoice|(?:PO\\s*#)|(?:purchase.*order)|(?:customer\\s*po)|(?:referrer)|(?:redress)|voucher|discount.*code|promo.*code|campaign.*code|(image\S?code)|smscode/i;
            const a = /((confirm|re[-_\s]?enter|re[-_\s]?type)[-_\s]?email)|(email[-_\s]?confirm)/i;
            document.URL.includes('rakuten-bank.com') || (i = new RegExp(i.source + '|(?:^|[^i])pcode', 'i')),
            t || 'button' === e.htmlType || (i = new RegExp(i.source + '|' + a.source, 'i')),
            n += i.test(e.htmlName) ? 10 : 0,
            n += i.test(e.htmlID) ? 10 : 0,
            n += i.test(e.htmlTitle) ? 5 : 0,
            n += i.test(e.htmlPlaceholder) ? 5 : 0;
            let r = 0;
            return e.htmlLabel && 'button' !== e.htmlType ? r += !r && i.test(e.htmlLabel) ? 10 : 0 : 'button' !== e.htmlType && (r += !r && e?.labelData?.length < 50 && i.test(e.labelData) ? 5 : 0, r += !r && e?.labelAria?.length < 50 && i.test(e.labelAria) ? 5 : 0, e.htmlPlaceholder || r || (r += !r && e?.labelTop?.length < 50 && i.test(e.labelTop) ? 5 : 0, r += !r && e?.labelRight?.length < 50 && i.test(e.labelRight) ? 5 : 0, r += !r && e?.labelLeft?.length < 50 && i.test(e.labelLeft) ? 5 : 0)), n += r, n > 0
        },
        ie = (e, t) => {
            if (!e || 0 === e.length)
                return [];
            let n = [];
            for (let i, a = 0, r = e.length; a < r; a++)
                i = e[a],
                ne(i, t) || n.push(i);
            return n
        },
        ae = e => {
            var t = [];
            if (!e)
                return t;
            for (var n = 0, i = e.length; n < i; n++) {
                let i = e[n],
                    a = i.htmlType;
                i.visible && 'button' !== a && 'submit' !== a && 'reset' !== a && t.push(i)
            }
            return t
        },
        re = (e, t) => {
            var n = [];
            if (!e)
                return n;
            for (var i = 0, a = e.length; i < a; i++)
                t ? e[i].visible || n.push(e[i]) : !e[i].visible || e[i].tabindex && '-1' === e[i].tabindex || n.push(e[i]);
            return n
        },
        le = e => e ? window.getComputedStyle(e).webkitTextSecurity : null,
        se = (e, t, n) => {
            if (!e)
                return null;
            var i = {};
            if ('reset' === O(e.type))
                return null;
            var a = -1 == e.maxLength ? 999 : e.maxLength;
            if ((!a || 'number' == typeof a && isNaN(a)) && (a = 999), U(i, 'htmlID', W(e, 'id')), U(i, 'htmlName', W(e, 'name')), (i.htmlID && (i.htmlID.includes('ajax') || i.htmlID.includes('csrf')) || i.htmlName && (i.htmlName.includes('csrf') || i.htmlName.includes('ajax'))) && 'password' !== e.type)
                return null;
            i.visible = V(e),
            i.viewable = j(e),
            i.isOutsideDocument = !z(e),
            i.hasForm = !!e.form,
            i.cssTextSecurity = le(e);
            let r = W(e, 'data-enpassid');
            r && !n ? i.elementNumber = r : i.pointer = e,
            !r && t >= 0 && !n && (i.elementNumber = `__${t}`),
            U(i, 'htmlClass', W(e, 'class')),
            U(i, 'tabindex', W(e, 'tabindex')),
            U(i, 'htmlTitle', W(e, 'title')),
            U(i, 'userEdited', !!e.dataset.enpassusermodified),
            U(i, 'rel', W(e, 'rel')),
            U(i, 'htmlType', O(W(e, 'type'))),
            U(i, 'actualType', e.getAttribute('type')),
            U(i, 'enpassType', 'password' === i.htmlType ? 'password2' : 'text'),
            e.tagName && 'button' === e.tagName.toLowerCase() ? U(i, 'htmlValue', (e.textContent || e.value).trim()) : U(i, 'htmlValue', e.value || e.textContent),
            i && i.htmlType && 'image' === i.htmlType && (U(i, 'imageAlt', W(e, 'alt')), U(i, 'imageSrc', W(e, 'src'))),
            U(i, 'checked', e.checked),
            U(i, 'autoCompleteType', e.getAttribute('x-autocompletetype') || e.getAttribute('autocompletetype') || e.getAttribute('autocomplete')),
            U(i, 'disabled', e.disabled),
            U(i, 'readonly', e.readonly),
            U(i, 'selectOption', R(e)),
            U(i, 'aria-hidden', 'true' == e.getAttribute('aria-hidden')),
            U(i, 'aria-disabled', 'true' == e.getAttribute('aria-disabled')),
            U(i, 'aria-haspopup', 'true' == e.getAttribute('aria-haspopup')),
            U(i, 'data-unmasked', e.dataset.unmasked),
            U(i, 'data-stripe', W(e, 'data-stripe'));
            var l = O(e.type);
            if ('hidden' !== l && 'submit' !== l) {
                U(i, 'htmlLength', a),
                U(i, 'htmlLabel', K(e)),
                U(i, 'labelData', W(e, 'data-label')),
                U(i, 'labelAria', W(e, 'aria-label')),
                U(i, 'labelAttr', W(e, 'label')),
                U(i, 'labelTop', X(e)),
                U(i, 'labelRight', ee(e)),
                U(i, 'labelLeft', J(e));
                let t = W(e, 'placeholder');
                t && !/^\d{2}\/\d{2}\/\d{4}$/.test(t) && U(i, 'htmlPlaceholder', t);
                !(i.htmlLabel || i.labelAria || i.labelData || i.labelTop || i.labelRight || i.labelLeft) && !t && 'input' === e.tagName.toLowerCase() && i.htmlValue && (t = i.htmlValue)
            }
            return i
        },
        oe = (e, t, n) => {
            e || (e = document);
            var i = {},
                a = S(e).map(((e, a) => {
                    var r = se(e, a, n);
                    if (!r)
                        return null;
                    var l = '__' + a;
                    return t && (i[l] = e), e.setAttribute('data-enpassid', l), r.elementNumber = l, r
                }));
            return t && i && Object.keys(i).length > 0 && (window.enpass || (window.enpass = {}), window.enpass[t] = i), a.filter((e => null !== e))
        },
        de = (e, t) => {
            if (!e)
                return null;
            for (var n = [], i = 0, a = e.length; i < a; i++) {
                var r = {},
                    l = e[i],
                    s = l.getAttribute('action'),
                    o = l.getAttribute('id'),
                    d = l.getAttribute('name'),
                    u = l.getAttribute('method');
                'string' == typeof s && '' !== s && (r.htmlAction = s),
                'string' == typeof o && '' !== o && (r.htmlID = o),
                'string' == typeof d && '' !== d && (r.htmlName = d),
                'string' == typeof u && '' !== u && (r.htmlMethod = u),
                t.length > 0 && t[i] && (r.fields = t[i]),
                r.location = l.ownerDocument.URL,
                r.domain = l.ownerDocument.domain;
                const a = l.parentElement;
                a && (r.parentVisibility = j(a)),
                n.push(r)
            }
            return n
        },
        ue = (e, t) => {
            var n = null;
            if (e && e.pointer && e.pointer.nodeType === Node.ELEMENT_NODE)
                return e.pointer;
            if (e && e.elementNumber) {
                if (window.enpass && window.state && window.state.uuid && window.enpass[window.state.uuid]) {
                    let t = window.enpass[window.state.uuid];
                    t && (n = t[e.elementNumber])
                }
                if (n)
                    return n;
                n = t ? t.querySelector('[data-enpassid=' + e.elementNumber + ']') : document.querySelector('[data-enpassid=' + e.elementNumber + ']')
            }
            if (e && e.htmlID && !n && (n = t ? t.getElementById(e.htmlID) : document.getElementById(e.htmlID)), e && e.identifier && !n) {
                const [t, i, a, r, , , l, s, o, , , , , , , , , , d] = e.identifier.split('||'),
                    u = a,
                    c = 'input' === t.toLowerCase() && u ? `${t}[type=${u}]` : `${t}`;
                if ((n = Array.prototype.slice.call(document.querySelectorAll(`${c}`))[r]) && n.nodeType === Node.ELEMENT_NODE) {
                    const e = se(n);
                    if (!e)
                        return null;
                    let a = !0;
                    s && s !== e.autoCompleteType && (a = !1),
                    l && l !== e.htmlPlaceholder && (a = !1),
                    o && o !== e.htmlLabel && (a = !1),
                    'button' !== t && 'submit' !== i || d === e.htmlValue || (a = !1),
                    n = a ? n : null
                }
            }
            return n && n.nodeType && n.nodeType === Node.ELEMENT_NODE ? n : null
        },
        ce = (e, t) => {
            var n = null,
                i = null;
            return e && e.hasForm && (i = ue(e, t)) && (n = i.form), n
        },
        me = (e, t) => {
            var n = [],
                i = [],
                a = [],
                r = [];
            if (!e)
                return null;
            for (var l = 0, s = e.length; l < s; l++) {
                var o = e[l],
                    d = null,
                    u = null;
                o.htmlType && 'hidden' === o.htmlType || (o.hasForm ? (d = ce(o, t), -1 === (u = n.indexOf(d)) && d ? (n.push(d), i[u = n.length - 1] ? i[0].push(o) : i.push([o])) : i[u].push(o)) : a.push(o))
            }
            n.length > 0 && (r = de(n, i));
            var c = {};
            return r.length && (c.pageForms = r), a.length && (c.pageFields = a), Object.keys(c).length ? c : null
        },
        he = (e, t, n) => {
            if (e && 0 === e.length)
                return null;
            for (var i = null, a = -1, r = 0; r < e.length; ++r) {
                var l = t(e[r]);
                l > 0 && l > a && (a = l, i = e[r])
            }
            return n ? {
                score: a,
                result: i
            } : i
        },
        pe = (e, t) => e && t ? (Object.keys(t).forEach((n => {
            e[n] = t[n]
        })), e) : e || null,
        fe = e => {
            if (!e)
                return !1;
            var t = document.createEvent('UIEvent');
            return /Edge\/\d./i.test(navigator.userAgent) ? t.initEvent('submit', !0, !0) : t.initEvent('submit', !0, !0, window, 1), e.dispatchEvent(t), !0
        },
        ge = (e, t) => {
            if (!e || '' === e)
                return !1;
            let n = e.replace(/^\s+/m, '').replace(/\s+$/m, '').replace(/\s\s+/, ' ').toLowerCase().trim();
            return t.some((t => 'function' == typeof t.test ? t.test(e) || t.test(n) : 0 <= n.indexOf(t)))
        },
        be = (e, t) => {
            if (e && t) {
                var n = parseInt(e.elementNumber.substr(2));
                if (parseInt(t.elementNumber.substr(2)) > n)
                    return !0
            }
            return !1
        },
        ye = () => {
            let e = document.getElementById('recaptcha-token');
            if (e && 'hidden' === e.type)
                return !0;
            let t = Array.prototype.slice.call(document.querySelectorAll('img[src *= captcha]'));
            if (t && !t.length && (t = Array.prototype.slice.call(document.querySelectorAll('img[id *= captcha]'))), t && t.length > 0) {
                let e = t.filter((e => !!V(e) && !('number' == typeof e.width && e.width < 30)));
                if (e && e.length > 0)
                    return !0
            }
            let n = Array.prototype.slice,
                i = n.call(document.querySelectorAll('input[name*=captcha]')),
                a = n.call(document.querySelectorAll('input[name*=Captcha]')),
                r = i.concat(a);
            if (r && r.length > 0) {
                let e = r.filter((function(e) {
                    return V(e)
                }));
                if (e && e.length > 0)
                    return !0
            }
            let l = document.getElementById('captcha');
            if (l && V(l))
                return !0;
            let s = document.querySelector('iframe[src^="https://www.google.com/recaptcha/api2/anchor"]');
            if (s && s.width > 0 && s.height > 0 && V(s)) {
                var o = 1 === s.offsetParent.classList.length && 'grecaptcha-badge' === s.offsetParent.classList[0],
                    d = 1 === s.parentNode.classList.length && 'grecaptcha-logo' === s.parentNode.classList[0];
                return !('fixed' === s.offsetParent.style.position || 'fixed' === s.parentNode.style.position || 256 === s.width && 60 === s.height && o && d)
            }
            return !1
        },
        ve = e => {
            const t = ['otp', 'one-time', 'one time password'],
                n = ['otp', 'password'];
            let i = 0,
                a = 0;
            if (e) {
                if ('password' !== e.htmlType)
                    return !1;
                if (i += e.htmlPlaceholder && M(e.htmlPlaceholder, n) ? 100 : 0, i += e.htmlLabel && M(e.htmlLabel, n) ? 100 : 0, i += e.htmlID && M(e.htmlID, ['otpwd']) ? 100 : 0, i += e.htmlName && M(e.htmlName, ['otpwd']) ? 100 : 0, i > 0)
                    return !1;
                if (a += e.htmlPlaceholder && P(e.htmlPlaceholder, t) ? 100 : 0, a += e.htmlID && P(e.htmlID, t) ? 100 : 0, a += e.htmlName && P(e.htmlName, t) ? 100 : 0, a += e.htmlLength && e.htmlLength <= 4 && -1 !== e.htmlLength ? 100 : 0, a += e.htmlLabel && P(e.htmlLabel, t) ? 100 : 0, a > 0)
                    return !0
            }
            return !1
        },
        we = e => {
            if (e)
                try {
                    return new URL(e).origin
                } catch (e) {
                    return ''
                }
            return ''
        },
        _e = e => {
            if (e) {
                return new URL(e).pathname
            }
            return ''
        },
        Le = e => {
            var t = e.totp_1,
                n = e.totp_2,
                i = e.totp_1_valid,
                a = e.totp_2_valid,
                r = Math.round((new Date).getTime() / 1e3);
            return i - r > 0 ? t : a - r > 0 ? n : null
        },
        Ie = e => {
            if (!e)
                return !1;
            if ('email' === e.htmlType) {
                if (e.htmlLabel && -1 !== e.htmlLabel.toLowerCase().indexOf('email'))
                    return !0;
                if (e.labelAria && -1 !== e.labelAria.toLowerCase().indexOf('email'))
                    return !0
            }
            if (e.htmlLabel && /mobile|username/i.test(e.htmlLabel))
                return !1;
            if (e.htmlID && -1 !== e.htmlID.toLowerCase().indexOf('email'))
                return !0;
            if (e.htmlName && -1 !== e.htmlName.toLowerCase().indexOf('email'))
                return !0;
            if (e.htmlLabel && -1 !== e.htmlLabel.toLowerCase().indexOf('email')) {
                if (!e.htmlPlaceholder)
                    return !0;
                if (-1 !== e.htmlPlaceholder.toLowerCase().indexOf('email'))
                    return !0
            }
            return !(!e.htmlPlaceholder || -1 === e.htmlPlaceholder.toLowerCase().indexOf('email') && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.htmlPlaceholder))
        },
        Te = e => {
            var t = oe(null, e);
            if (!t || 0 == t.length) {
                var n = (() => {
                    var e = [];
                    try {
                        for (var t = [document]; t.length > 0;) {
                            var n = t.shift().querySelectorAll('*');
                            for (let i = 0, a = n.length; i < a; i++) {
                                let a = n[i];
                                a.shadowRoot && (t.push(a.shadowRoot), e.push(a.shadowRoot))
                            }
                        }
                    } catch (e) {
                        return []
                    }
                    return e
                })();
                t = [];
                for (let e = 0, i = n.length; e < i; e++) {
                    let i = oe(n[e], null, !0);
                    t = t.concat(i)
                }
            }
            return {
                fieldDict: t,
                formDict: me(t)
            }
        },
        Ee = e => {
            if (!e)
                return null;
            let t = {};
            const n = e.getAttribute('action'),
                i = e.getAttribute('id'),
                a = e.getAttribute('name'),
                r = e.getAttribute('method');
            if ('string' == typeof n && '' !== n && (t.htmlAction = n), 'string' == typeof i && '' !== i && (t.htmlID = i), 'string' == typeof a && '' !== a && (t.htmlName = a), 'string' == typeof r && '' !== r && (t.htmlMethod = r), !ke()) {
                const n = new URL(e.ownerDocument.URL);
                t.location = n.href,
                t.pathname = n.pathname,
                t.hostname = n.hostname,
                t.domain = e.ownerDocument.domain
            }
            return t
        },
        Fe = e => {
            if (!e)
                return null;
            let t = {};
            const n = Ee(e),
                i = Array.prototype.slice.call(e.elements);
            if (i && i.length > 0) {
                let e = [];
                for (let t = 0, n = i.length; t < n; t++) {
                    let n = se(i[t], t);
                    n && e.push(n)
                }
                t.fields = e
            }
            return n ? {
                ...t,
                ...n
            } : t
        },
        De = (e, t) => {
            if (e) {
                var n = ue(e);
                n && xe(n, t)
            }
        },
        xe = (e, t, n) => {
            e && e.value !== t && e && t && (document.domain?.endsWith('apple.com') ? (e.focus(), e.value = t, e.dispatchEvent(new KeyboardEvent('keydown', {
                bubbles: !0,
                cancelable: !0
            })), e.dispatchEvent(new KeyboardEvent('keypress')), e.dispatchEvent(new KeyboardEvent('keyup')), e.dispatchEvent(new Event('input', {
                bubbles: !0,
                cancelable: !0
            })), e.dispatchEvent(new Event('change', {
                bubbles: !0,
                cancelable: !0
            }))) : ((e => {
                let t = e.value;
                N('click', e),
                N('focus', e),
                N('keydown', e),
                '' === e.value && t && (e.value = t)
            })(e), e.value = t, C(e)))
        },
        Ne = e => {
            if (e) {
                if (-1 !== ['div', 'a', 'input', 'button', 'span'].indexOf(e.tagName.toLowerCase())) {
                    if ('input' === e.tagName.toLowerCase()) {
                        if ('submit' !== e.type && 'button' !== e.type)
                            return !1
                    } else {
                        if ('a' === e.tagName.toLowerCase())
                            return !e.hasAttribute('aria-selected');
                        if ('span' === e.tagName.toLowerCase()) {
                            for (let t = 0; t < 3; t++)
                                if (e = e.parentElement, -1 !== ['div', 'a', 'input', 'button'].indexOf(e.tagName.toLowerCase())) {
                                    if ('input' !== e.tagName.toLowerCase())
                                        return !0;
                                    if ('submit' !== e.type && 'button' !== e.type)
                                        return !1
                                }
                            return !1
                        }
                    }
                    return !0
                }
                return !1
            }
        },
        Ae = e => {
            let t = document.querySelectorAll('input[data-enpassusermodified][type=password]');
            0 === t.length && (t = Array.prototype.slice.call(document.querySelectorAll('input[type=password]')).filter((e => e.value)));
            let n = !1;
            if (t && t.length > 0)
                for (let i = 0, a = t.length; i < a; i++) {
                    let a = t[i],
                        r = a ? a.form : null;
                    if (r && r.contains(e))
                        return !0;
                    if (4 === a.compareDocumentPosition(e))
                        return !0;
                    n = !0
                }
            return n
        },
        Ce = (e, t, n) => {
            if (!e || !t || 'string' != typeof t || n && 'string' != typeof n)
                return null;
            let i = e;
            for (let e = 0; e < 5; e++) {
                const e = i.parentNode;
                if (!e || e.nodeType !== Node.ELEMENT_NODE || e.nodeType === Node.DOCUMENT_FRAGMENT_NODE || 'body' === e.tagName.toLowerCase())
                    return null;
                let a;
                if (t && (a = n?e?.querySelectorAll(`${t}[type=${n}]`):e?.querySelectorAll(`${t}`)), a.length > 0)
                    return Array.prototype.slice.call(a);
                i = e
            }
            return null
        },
        ke = () => null == self.origin || 'null' === self.origin,
        Se = e => {
            if (!e)
                return !1;
            const t = e.some((e => 0===e?.indexOf('https://'))),
                n = 'http:' === document.location.protocol,
                i = document.querySelectorAll('input[type=password]');
            return t && n && i.length > 0
        },
        Oe = e => {
            if (!e || !e.domain)
                return !1;
            const t = e.domain,
                n = document.URL;
            return Pe(n, t)
        },
        Pe = (e, t) => {
            if (!t || !e)
                return !1;
            const n = new URL(e),
                i = n.hostname,
                a = n.host;
            for (let e = 0, n = t.length; e < n; ++e) {
                let n = t[e];
                if (!n)
                    continue;
                const r = Me(i, [n]) || Me(n, [i]),
                    l = Me(a, [n]) || Me(n, [a]);
                if (r || l)
                    return !0
            }
            return !1
        };
    function Me(e, t) {
        if (e && t && Array.isArray(t)) {
            e = Re(e);
            for (let n = t.length; n--;) {
                let i = t[n];
                if (e === Re(i) || i.endsWith('.' + e))
                    return !0
            }
        }
        return !1
    }
    function Re(e) {
        return e && 0 === e.indexOf('www.') ? e.substring(4) : e
    }
    const Ue = e => {
            let t = 0;
            const n = 'current password,current,old,old password,altes passwort,aktuelles passwort,bisheriges passwort'.split(',');
            var i = /(current|old|curpass|password)/i;
            if (e && 'password' === e.htmlType && !e.isOutsideDocument) {
                var a = 0,
                    r = /(new|confirm|verify|retype|again|re\s?enter)[\s\W_]?(password)/i;
                a += r.test(e.htmlName) ? 10 : 0,
                a += r.test(e.htmlID) ? 10 : 0,
                a += r.test(e.htmlClass) ? 5 : 0,
                a += r.test(e.htmlTitle) ? 5 : 0,
                a += r.test(e.htmlPlaceholder) ? 5 : 0,
                a += r.test(e.htmlLabel) ? 5 : 0,
                a += r.test(e.autoCompleteType) ? 5 : 0;
                var l = 0;
                return l += !l && P(e.htmlLabel, n) ? 20 : 0, l += !l && q(e.htmlLabel, ['password']) ? 10 : 0, e.htmlLabel && 0 === l && a > 0 ? 0 : (t += i.test(e.htmlName) ? 10 : 0, t += i.test(e.htmlID) ? 10 : 0, t += i.test(e.htmlClass) ? 5 : 0, t += i.test(e.htmlTitle) ? 5 : 0, e.htmlPlaceholder && (t += q(e.htmlPlaceholder, n) ? 10 : 0), l += l || e.htmlPlaceholder || !P(e.labelTop, n) ? 0 : 5, l += l || e.htmlPlaceholder || !P(e.labelRight, n) ? 0 : 5, l += l || e.htmlPlaceholder || !P(e.labelLeft, n) ? 0 : 5, l += l || e.htmlPlaceholder || !P(e.labelData, n) ? 0 : 5, t + (l += l || e.htmlPlaceholder || !P(e.labelAria, n) ? 0 : 5))
            }
            return t
        },
        Be = (e, t) => {
            var n = 0,
                i = 'new,new password,enter new password,neues passwort,your new password,neues kennwort'.split(','),
                a = /(new|logon|password1)/i;
            if (e && 'password' === e.htmlType && !e.isOutsideDocument) {
                var r = 0,
                    l = /(confirm|current|old.*pass|pass.*old|curpass|verify|retype|again|signup|re\s?enter)/i;
                r += l.test(e.htmlName) ? 10 : 0,
                r += l.test(e.htmlID) ? 10 : 0,
                r += l.test(e.htmlClass) ? 5 : 0,
                r += l.test(e.htmlTitle) ? 5 : 0,
                r += l.test(e.htmlPlaceholder) ? 5 : 0,
                r += l.test(e.autoCompleteType) ? 5 : 0;
                let o = l.test(e.htmlLabel) ? 5 : 0;
                r += o;
                var s = 0;
                return s += !s && q(e.htmlLabel, i) ? 20 : 0, s += !s && P(e.htmlLabel, i) ? 10 : 0, e.htmlLabel && (0 === s && r > 0 || s > 0 && o > 0) ? 0 : (t && (s += !s && q(e.htmlLabel, ['password']) ? 10 : 0, s += !s && q(e.labelLeft, ['password']) ? 10 : 0), n += a.test(e.htmlName) ? 10 : 0, n += a.test(e.htmlID) ? 10 : 0, n += a.test(e.htmlClass) ? 5 : 0, n += a.test(e.htmlTitle) ? 5 : 0, n += P(e.autoCompleteType, i) ? 10 : 0, e.htmlPlaceholder && (n += q(e.htmlPlaceholder, i) ? 10 : 0), s += s || e.htmlPlaceholder || !P(e.labelTop, i) || l.test(e.labelTop) ? 0 : 5, s += s || e.htmlPlaceholder || !P(e.labelRight, i) || l.test(e.labelRight) ? 0 : 5, s += s || e.htmlPlaceholder || !P(e.labelLeft, i) || l.test(e.labelLeft) ? 0 : 5, s += s || e.htmlPlaceholder || !P(e.labelData, i) || l.test(e.labelData) ? 0 : 5, n + (s += s || e.htmlPlaceholder || !P(e.labelAria, i) || l.test(e.labelAria) ? 0 : 5))
            }
            return n
        },
        Ve = e => {
            var t = 0,
                n = [/(confirm|verify|reenter|repeat|retype).+?(new)?.*?(password)/i, /(new)?.*?(password).*?(confirm|verify|reenter|repeat|retype)/i, 'new password confirmation', 'retype new', 're enter', 'neues passwort erneut eingeben', 'neues passwort wdh', 'passwort wiederholen', 'password again', 'kennwort wiederholen', 'save new password'],
                i = /(confirm|re[\W\s]?enter|verify|retype|again|password2|passwort2|repeat)/i;
            if (e && 'password' === e.htmlType && !e.isOutsideDocument) {
                t += i.test(e.htmlName) ? 10 : 0,
                t += i.test(e.htmlID) ? 10 : 0,
                t += i.test(e.htmlClass) ? 5 : 0,
                t += i.test(e.htmlTitle) ? 5 : 0,
                e.htmlPlaceholder && (t += ge(e.htmlPlaceholder, n) ? 10 : 0);
                var a = 0;
                return a += !a && ge(e.htmlLabel, n) ? 10 : 0, a += a || e.htmlPlaceholder || !ge(e.labelTop, n) ? 0 : 5, a += a || e.htmlPlaceholder || !ge(e.labelRight, n) ? 0 : 5, a += a || e.htmlPlaceholder || !ge(e.labelLeft, n) ? 0 : 5, a += a || e.htmlPlaceholder || !ge(e.labelData, n) ? 0 : 5, t + (a += a || e.htmlPlaceholder || !ge(e.labelAria, n) ? 0 : 5)
            }
            return t
        },
        qe = e => {
            var t = 0,
                n = 'reset password,save changes,change password,save,update,save password,update password,update changes,passwort ändern'.split(','),
                i = /(save|update|change)/i;
            return !e || e.isOutsideDocument || 'submit' !== e.htmlType && 'button' !== e.htmlType || (t += i.test(e.htmlName) ? 10 : 0, t += i.test(e.htmlID) ? 10 : 0, t += i.test(e.htmlClass) ? 5 : 0, t += i.test(e.htmlTitle) ? 5 : 0, e.htmlValue && (t += q(e.htmlValue, n) ? 10 : 0)), t
        },
        ze = (e, t, n) => {
            var i = he(e, (function(e) {
                return t(e, n)
            }));
            return null !== i && t(i, n) > 0 ? i : null
        },
        je = e => {
            if (e && 0 !== e.length) {
                let a = ze(e, Ue),
                    r = ze(e, Be);
                !r && a && (r = ze(e, Be, !0)),
                r && JSON.stringify(a) === JSON.stringify(r) && (r = null);
                var t = ze(e, Ve),
                    n = ze(e, qe),
                    i = {};
                return a && (i.currentPasswordField = a), r && (i.newPasswordField = r), t && (i.confirmPasswordField = t), t && !a && !r && n && (r = ze(e, Be, !0), r && (i.newPasswordField = r)), !r && a && t && (i.currentPasswordField = null, i.newPasswordField = a), !r && !a && t || !r && !t ? null : (n && (i.changePasswordButton = n), Object.keys(i).length ? i : null)
            }
            return null
        },
        We = e => e ? e.reduce((function(e, t) {
            const n = re(t.fields),
                i = n.filter((function(e) {
                    return !(e.disabled || e.isOutsideDocument || 'password' !== e.htmlType && 'text' !== e.htmlType && 'email' !== e.htmlType && 'phone' !== e.htmlType)
                }));
            if (i && i.length) {
                let a = i.length,
                    r = B(i, 'password');
                if (0 === a)
                    return e;
                if (a > 3)
                    if (3 !== r.length) {
                        if (2 !== r.length)
                            return e
                    } else {
                        if (!r.every((function(e) {
                            let t = ue(e);
                            return t && j(t) && V(t)
                        })))
                            return e
                    }
                else {
                    if (!(2 === r.length && (() => {
                        const e = n.filter((e => 'submit' === e.htmlType && !e.isOutsideDocument));
                        if (1 === e.length && e[0].htmlValue) {
                            const n = e[0].htmlValue.toLowerCase();
                            let i = ['save', 'update', 'reset password'];
                            if (t && t.htmlAction) {
                                const e = t.htmlAction;
                                P(e, 'resetpassword') && (i = i.concat(['submit']))
                            }
                            if (ge(n, i))
                                return !0
                        }
                        return !1
                    })() || a === r.length))
                        return e
                }
                const l = pe(t, je(n));
                return e.push(l), e
            }
            return e
        }), []) : [],
        $e = e => {
            var t = 0;
            if (!e)
                return t;
            var n = /(update|change|security)/i,
                i = /(log|sign)\s?[io]n|access|reg|create|anmelden|(sign|log)\s[^\s]+\sin|(.*)(sign|log)[^\s]in(.*)/i,
                a = /update|save/i;
            if (e.htmlID) {
                let t = document.getElementById(e.htmlID),
                    n = t ? t.getElementsByTagName('a') : [],
                    i = /forgot(ten)?\Wpassword/gi;
                const a = e.currentPasswordField && e.newPasswordField && e.confirmPasswordField;
                for (let e = 0, t = n.length; e < t; e++) {
                    let t = n[e],
                        r = t.textContent ? t.textContent.toLowerCase() : '';
                    if (!a && i.test(r))
                        return -1e3
                }
            }
            var r,
                l = (r = e.fields) ? r.filter((e => 'button' === e.htmlType || 'submit' === e.htmlType)) : [],
                s = B(e.fields, 'password');
            var o = 0;
            const d = !!(3 === ae(e.fields).length && e.currentPasswordField && e.newPasswordField && e.confirmPasswordField);
            if (l && l.length > 0 && !d)
                for (var u = 0, c = l.length; u < c; u++) {
                    let e = l[u];
                    if (1 === s.length) {
                        var m = /(log|sign)\s?[io]n|access|reg|create|continue|anmelden|(sign|log)\s[^\s]+\sin|(.*)(sign|log)[^\s]in(.*)/i;
                        o += m.test(e.htmlName) && !a.test(e.htmlName) ? 2 : 0,
                        o += m.test(e.htmlID) && !a.test(e.htmlID) ? 2 : 0,
                        o += m.test(e.htmlValue) && !a.test(e.htmlValue) ? 2 : 0
                    } else
                        o += i.test(e.htmlName) && !a.test(e.htmlName) ? 2 : 0,
                        o += i.test(e.htmlID) && !a.test(e.htmlID) ? 2 : 0,
                        o += i.test(e.htmlValue) && !a.test(e.htmlValue) ? 2 : 0;
                    if (o > 0)
                        return -1e3
                }
            var h = B(e.fields, ['checkbox']);
            if (h && h.length > 0) {
                let e = /remember\s?me/i;
                for (let t = 0, n = h.length; t < n; t++) {
                    var p = h[t];
                    let n = 0;
                    if (n += e.test(p.htmlName) ? 2 : 0, n += e.test(p.htmlID) ? 2 : 0, n += e.test(p.htmlValue) ? 2 : 0, n += e.test(p.htmlLabel) ? 2 : 0, n > 0)
                        return -1e3
                }
            }
            if (t += e.currentPasswordField ? 2 : 0, t += e.newPasswordField ? 2 : 0, t += e.confirmPasswordField ? 2 : 0, (t += t > 0 && e.changePasswordButton ? 2 : 0) > 0) {
                o += i.test(e.htmlName) ? 2 : 0,
                o += i.test(e.htmlID) ? 2 : 0,
                o += i.test(e.htmlClass) ? 2 : 0;
                let a = ae(e.fields).length;
                if (0 === document.URL.indexOf('https://tracker.censhare.de') && void 0 !== e.parentVisibility && !e.parentVisibility)
                    return -1e3;
                if (3 === a && e.currentPasswordField && e.newPasswordField && e.confirmPasswordField && (o = 0), o > 0)
                    return -1e3;
                t += n.test(e.htmlName) ? 2 : 0,
                t += n.test(e.htmlID) ? 2 : 0,
                t += n.test(e.htmlClass) ? 2 : 0
            }
            return t
        },
        He = e => {
            e && 0 !== e.length || (e = oe());
            var t = null;
            if (e) {
                var n = null;
                if (e.constructor === Array ? n = me(e) : e instanceof Object && (n = e), n && n.pageForms && n.pageForms.length) {
                    var i = We(n.pageForms);
                    if (i && i.length > 0 && (t = he(i, $e)) && $e(t) > 0)
                        return t
                }
                if (n && n.pageFields && n.pageFields.length) {
                    const e = je(n.pageFields);
                    if (e) {
                        const {newPasswordField: t, currentPasswordField: n, changePasswordButton: i} = e;
                        if (t && t.visible && n && n.visible || t && t.visible && i && i.visible)
                            return e
                    }
                }
            }
            return null
        },
        Ke = [/^\W*(log|sign)\W*[oi]n\W*$/i, /^(bt).?\W*(log|sign)\W*[oi]n\W*$/i, /log\W*[oi]n (?:securely|now)/i, /(sign|log)\s[^\s]+\sin|(.*)(sign|log)[^/s]in(.*)/i, 'continue', 'submit', 'weiter', 'accès', 'вход', 'connexion', 'entrar', 'anmelden', 'accedi', 'valider', '登录', '登入', 'ログイン', '登 录', 'लॉग इन करें', 'einloggen', 'inloggen', 'ingresar', 'giriş', 'zaloguj', 'σύνδεση', 'kirjaudu', 'prijava', 'aceptar', 'me connecter', 'execute login', 'logga in', 'bejelentkezés', 'přihlásit', 'anmeldung', 'συνδεση'],
        Ge = ['choose a strong password', '使用者代碼', 'user code'],
        Ye = ['creditcard', 'dc-form', 'cc-form', 'creditcard-form', 'debitcard-form', 'creditcard-payment-form', 'debitcard-payment-form', 'payment'],
        Xe = ['debit card number', 'credit card number', 'card number', 'credit card no', 'debit card no', 'card no', 'numar card', 'numéro de carte'],
        Ze = ['creditcard', 'crdnumbr', 'card_number', 'cardnumber', 'creditcardnumber', 'cccardnumber', 'debitcardnumber', 'dccardnumber', 'ccnumber', 'cardno', 'card_no', 'cc-number', 'cardnum', 'ccnum', 'cc_no', 'ccno', 'dcnum'],
        Je = ['cvv', 'cvv2', 'cvc2', 'cvc', 'cvv number', 'verification code', 'security code', 'code de sécurité'],
        Qe = ['cc-csc', 'cardcvc', 'cvc', 'cv2_number', 'ccvnumber', 'ccvnum', 'cvvvnum', 'verifycardcode', 'cardverificationcode', 'dccvv', 'cccvv', 'security_code', 'security-code', 'cardsecuritycode', 'securitycode', 'cc.security', 'cvc_code', 'cvccode', 'cccode', 'cvv', 'cvv2', 'cvv2/cvc2', 'cvv/cvc', 'cardcsc', 'vccpincode'],
        et = ['crdexpr', 'card_exp_month', 'expmonth', 'expirymonth', 'expirationmonth', 'ccexpirymonth', 'ccexpymonth', 'dcexpirymonth', 'dcexpymonth', 'card_month', 'cardmonth', 'month', 'debitmonth', 'expdate_month', 'exmnth', 'cc_valid_month', 'cardexpirymonth', 'enddate', 'end-month', 'end_month', 'cc-exp-month', 'ccexpmon', 'vccmonth', 'vdcmonth', 'month_vcc', 'month_vdc'],
        tt = ['crdexpr', 'card_exp_year', 'expyear', 'expiryyear', 'expirationyear', 'ccexpiryyear', 'ccexpyyear', 'dcexpiryyear', 'dcexpyyear', 'creditcard_year', 'card_year', 'cardyear', 'year', 'debityear', 'expdate_year', 'exyr', 'cc_valid_year', 'cardexpiryyear', 'enddate', 'end-year', 'end_year', 'cc-exp-year', 'ccexpyr', 'vccyear', 'vdcyear', 'year_vdc', 'year_vcc', 'expyr'],
        nt = ['expires', 'expiry year', 'expiry month', 'expiry year', 'expiry date', 'expiry', 'expiration date', 'valid thru', 'valid to', 'end date', 'valid till'],
        it = ['expiry', 'expiration', 'card-expiration', 'expirationdate', 'expiration_date', 'expiration-date', 'expdate', 'exp_date', 'ccvaliddate', 'cc-valid-date', 'cc_valid_date', 'enddate', 'end_date', 'end-date', 'cc_exp_date', 'ccexpdate', 'cc-exp-date', 'crdexpr'],
        at = ['cardholder\'s name', 'card holder\'s name', 'cardholder name', 'card holder name as it appears on card', 'card holders name', 'cardholder', 'name on card', 'name as on card', 'name on credit card', 'name on the card', 'name on debit card', 'card owner', 'card holder name', 'nume titular card', 'nom sur la carte'],
        rt = ['cc-name', 'card-holder', 'name-card', 'name_card', 'namecard', 'bill_name', 'vccname', 'ccname', 'dcname', 'cname', 'name_on_card', 'nameoncard', 'creditcardname', 'card_name', 'cardname', 'cardholder', 'cardholdername', 'card_holder_name', 'card_holder', 'cardowner', 'card_owner'],
        lt = ['creditcardtype', 'cardtype', 'type', 'type_of_card'],
        st = ['card type', 'credit card type', 'payment type'],
        ot = ['birthdate', 'birthday_month', 'birthday_year', 'birthday', 'startdate', 'startmonth', 'startyear', 'start_month', 'monthstart', 'month_start', 'yearstart', 'year_start', 'start_year', 'start_date', 'registration', 'register'],
        dt = 'january,february,march,april,may,june,july,august,september,october,novemeber,december'.split(','),
        ut = 'jan,feb,mar,apr,may,june,july,aug,sept,oct,nov,dec'.split(','),
        ct = (e, t, n) => {
            var i = 2,
                a = .5;
            n || (i = 10, a = 5);
            var r = 0,
                l = 0;
            if (!e)
                return 0;
            if (e.constructor === Array) {
                if (0 === e.length)
                    return 0;
                for (var s = 0; s < e.length; ++s)
                    if (q(e[s].toLowerCase(), t)) {
                        r = i;
                        break
                    }
                for (var o = 0; o < e.length; ++o)
                    if (P(e[o].toLowerCase(), t)) {
                        l = a;
                        break
                    }
            } else
                r = q(e.toLowerCase(), t) ? i : 0,
                l = P(e.toLowerCase(), t) ? a : 0;
            return r >= l ? r : l
        },
        mt = e => {
            var t = 0,
                n = 0;
            if (e) {
                if (!e.viewable)
                    return -1e3;
                if ('tel' !== e.htmlType && 'text' !== e.htmlType && 'number' !== e.htmlType)
                    return -1e3;
                if (e.htmlLength) {
                    var i = e.htmlLength;
                    n = 15 === i || 16 === i || 19 === i ? 2 : 0
                }
                var a = 0,
                    r = /(expiry|holder|name|year|month|registration|register)/i;
                if (a += r.test(e.htmlID) ? 2 : 0, a += r.test(e.htmlName) ? 2 : 0, a += r.test(e.htmlLabel) ? 2 : 0, (a += r.test(e.htmlPlaceholder) ? 2 : 0) > 0)
                    return -1e3;
                if (t += ct(e.htmlID, Ze), t += ct(e.htmlName, Ze), t += ct(e.htmlClass, Ze, !0), t += ct(e.htmlPlaceholder, Xe), t += ct(e.htmlLabel, Xe), t += ct(e.labelAria, Xe, !0), t += ct(e.labelData, Xe, !0), !e.htmlLabel) {
                    var l = 0;
                    l += ct(e.autoCompleteType, Ze, !0),
                    l += ct(e.labelLeft, Xe, !0),
                    l += l ? 0 : ct(e.labelRight, Xe, !0),
                    t += l += l ? 0 : ct(e.labelTop, Xe, !0)
                }
                return n && t ? t + n : (0 !== t || e.userEdited || (t += ct(e.htmlValue, Xe, !0)), t)
            }
        },
        ht = (e, t, n) => {
            var i = 0,
                a = e.htmlType,
                r = e.htmlLength,
                l = e.htmlName,
                s = e.htmlID;
            if (!e.viewable)
                return -1e3;
            if ('text' !== a && 'number' !== a && 'tel' !== a)
                return -1e3;
            if (n)
                for (var o = 0; o < n.length; ++o) {
                    var d = n[o];
                    if (e.elementNumber === d.elementNumber)
                        return -1e3;
                    var u = d.htmlName,
                        c = d.htmlID;
                    u && l && (u = u.substring(0, u.length - 1), i += (l = l.substring(0, l.length - 1)) === u ? 2 : 0),
                    c && s && (c = c.substring(0, c.length - 1), i += (s = s.substring(0, s.length - 1)) === c ? 2 : 0)
                }
            if (t && r) {
                if (i += 4 !== t || 4 !== r && 7 !== r ? 0 : 2, i += 5 === t && 3 === r ? 2 : 0, i += t < 4 && 4 === r ? 2 : 0, r < 3 || r > 7)
                    return -1e3;
                l && l[l.length - 1] === t.toString() && (i += 2),
                s && s[s.length - 1] === t.toString() && (i += 2)
            }
            return i += ct(l, Ze), i += ct(s, Ze), 1 === t && (i += ct(O(e.htmlLabel), Xe)), i += ct(e.htmlClass, Ze, !0)
        },
        pt = (e, t, n) => {
            var i = he(e, (function(e) {
                return ht(e, t, n)
            }));
            return null !== i && ht(i, t, n) > 0 ? i : null
        },
        ft = e => {
            var t = 0,
                n = e.htmlType;
            if (!e.viewable)
                return -1e3;
            if ('password' !== n && 'text' !== n && 'tel' !== n && 'number' !== n)
                return -1e3;
            !e.htmlLength || 3 !== e.htmlLength && 4 !== e.htmlLength || (t += 2),
            t += ct(e.htmlLabel, Je),
            t += ct(e.htmlPlaceholder, Je),
            t += ct(e.htmlName, Qe),
            t += ct(e.htmlID, Qe),
            t += ct(e.autoCompleteType, Qe),
            t += ct(e.htmlClass, Qe, !0);
            var i = ['crdnumbr', 'card_number', 'cardnumber', 'creditcardnumber', 'cccardnumber', 'debitcardnumber', 'dccardnumber', 'ccnumber', 'cardno', 'card_no', 'cc-number', 'cardnum', 'ccnum', 'cc_no', 'ccno', 'dcnum', 'registration', 'register', 'verification', '6-digit', 'otp', 'one-time-code', 'googleauthenticator', 'totp', 'totppin', 'useroathcode', 'twofactorcode', 'totpcode', 'secondfactor', 'twofactortoken', '2fa', 'twofacode', 'captcha', 'phone'];
            const a = q(e.autoCompleteType, ['cccsc']);
            return ct(e.htmlName, i) > 0 && !a || ct(e.htmlID, i) > 0 && !a || ct(e.labelAria, i) > 0 && !a || ct(e.htmlLabel, ['card number'].concat(i)) > 0 && !a ? -1e3 : t
        },
        gt = (e, t) => {
            var n = 0,
                i = e;
            if (void 0 === t && (t = !1), !e.viewable && !t)
                return -1e3;
            if ('select-one' === i.htmlType) {
                var a = i.selectOption.options.length,
                    r = null;
                if (12 === a && (r = i.selectOption.options[11][0]), 13 === a && (r = i.selectOption.options[12][0]), !r)
                    return -1e3;
                n += '12' === (r = r.toLowerCase()) || 'dec' === r || 'december' === r || '12dec' === r || 'dec12' === r || '12december' === r || 'december12' === r || '12 - dec' === r || 'dec - 12' === r || '12 - december' === r || 'december (12)' === r || '12 (dec)' === r || 'dec (12)' === r ? 2 : 0
            } else {
                var l = e.htmlType;
                if ('text' !== l && 'tel' !== l && 'number' !== l)
                    return -1e3;
                if (e.htmlPlaceholder)
                    n += 'mm' === e.htmlPlaceholder.toLowerCase() ? 2 : 0;
                e.htmlLength && (n += 2 === e.htmlLength ? 2 : 0)
            }
            n += ct(e.htmlName, et),
            n += ct(e.htmlID, et),
            n += ct(e.htmlClass, et, !0),
            n += ct(e.htmlLabel, nt);
            return ct(e.htmlLabel, ot) > 0 || ct(e.htmlName, ot) > 0 || ct(e.htmlID, ot) > 0 ? -1e3 : n
        },
        bt = (e, t) => {
            var n = he(e, (e => gt(e, t)));
            return null !== n && gt(n, t) > 0 ? n : null
        },
        yt = (e, t) => {
            var n = 0,
                i = e;
            if (void 0 === t && (t = !1), !e.viewable && !t)
                return -1e3;
            if ('select-one' === i.htmlType && i.selectOption.options.length > 1) {
                var a = (new Date).getFullYear(),
                    r = parseInt(a.toString().substr(2, 2), 10),
                    l = parseInt(i.selectOption.options[0][0], 10),
                    s = parseInt(i.selectOption.options[1][0], 10);
                if (a === l || a === s || r === l || r === s)
                    n += 2;
                else {
                    var o = i.selectOption.options[0][0],
                        d = i.selectOption.options[1][0];
                    if (o && (-1 !== o.indexOf('month') || -1 !== o.indexOf('jan')) || d && -1 !== d.indexOf('jan'))
                        return -1e3
                }
            } else {
                var u = e.htmlType;
                if ('text' !== u && 'tel' !== u && 'number' !== u)
                    return -1e3;
                if (e.htmlPlaceholder) {
                    var c = e.htmlPlaceholder.toLowerCase();
                    n += 'yy' === c || 'yyyy' === c || 'year' === c ? 10 : 0
                }
                e.htmlLength && 0 !== n && (e.htmlName && -1 === e.htmlName.indexOf('cvv') || e.htmlID && -1 === e.htmlID.indexOf('cvv') || e.htmlLabel && -1 === e.htmlLabel.indexOf('cvv')) && (n += 2 === e.htmlLength || 4 === e.htmlLength ? 2 : 0)
            }
            n += ct(e.htmlName, tt),
            n += ct(e.htmlID, tt),
            n += ct(e.htmlClass, tt, !0),
            n += ct(e.htmlLabel, nt, !0);
            return ct(e.htmlLabel, ot) > 0 || ct(e.htmlName, ot) > 0 || ct(e.htmlID, ot) > 0 ? -1e3 : n
        },
        vt = (e, t) => {
            var n = he(e, (e => yt(e, t)));
            return null !== n && yt(n, t) > 0 ? n : null
        },
        wt = e => {
            var t = 0,
                n = e.htmlType;
            if (!e.viewable)
                return -1e3;
            if ('tel' !== n && 'text' !== n)
                return -1e3;
            if (t += ct(e.htmlName, it), t += ct(e.htmlID, it), t += ct(e.htmlLabel, nt), t += ct(e.htmlClass, it), t += ct(e.htmlPlaceholder, ['mm yyyy']), t += ct(e.autoCompleteType, it), !e.htmlLabel) {
                var i = 0;
                i += ct(e.labelLeft, nt, !0),
                i += i ? 0 : ct(e.labelRight, nt, !0),
                t += i += i ? 0 : ct(e.labelTop, nt, !0)
            }
            return t > 0 && (5 === e.htmlLength || 7 === e.htmlLength) && (t += 2), t
        },
        _t = e => {
            var t = 0;
            if (!e.viewable)
                return -1e3;
            if ('text' !== e.htmlType)
                return -1e3;
            t += ct(e.htmlLabel, at, !0),
            t += ct(e.htmlID, rt, !0),
            t += ct(e.htmlName, rt, !0),
            t += ct(e.htmlClass, rt),
            t += ct(e.htmlPlaceholder, at, !0),
            t += ct(e.autoCompleteType, rt);
            return ct(e.htmlLabel, ['save', 'number', 'registration']) > 0 || ct(e.htmlName, ['save', 'registration']) > 0 || ct(e.htmlID, ['save', 'registration']) > 0 ? -1e3 : t
        },
        Lt = (e, t) => {
            var n = 0,
                i = e.selectOption ? e.selectOption.options.length : 0;
            if (void 0 === t && (t = !1), !e.viewable && !t)
                return -1e3;
            if (!(i > 1))
                return -1e3;
            for (var a = 0; a < i; ++a) {
                var r = e.selectOption.options[a][0] ? e.selectOption.options[a][0].toLowerCase() : e.selectOption.options[a][0];
                if ('visa' === r || 'american express' === r || 'discover' === r || 'mastercard' === r || 'visa electron' === r || 'mastercard maestro' === r || 'diners club' === r) {
                    n += 2;
                    break
                }
            }
            return n += ct(e.htmlName, lt), n += ct(e.htmlID, lt), n += ct(e.htmlClass, lt), n += ct(e.htmlLabel, st)
        },
        It = (e, t) => {
            var n = he(e, (e => Lt(e, t)));
            return null !== n && Lt(n) > 0 ? n : null
        },
        Tt = e => {
            if (!e || !e.length)
                return {};
            const t = re(e, !1),
                n = null !== (i = he(t, mt)) && mt(i) > 0 ? i : null;
            var i;
            const a = null !== (r = he(t, _t)) && _t(r) > 0 ? r : null;
            var r;
            let l = It(t),
                s = (e => {
                    var t = he(e, ft);
                    if (null !== t && ft(t) > 0) {
                        const n = e.filter((e => 'submit' === e.actualType && e.visible && e.viewable && e.hasForm)),
                            i = n.find((e => e.hasForm && e.visible && e.viewable && 'submit' === e.actualType && ge(e.htmlValue, Ke.concat('next'))));
                        return 1 === n.length && i && t.hasForm ? null : t
                    }
                    return null
                })(t),
                o = bt(t),
                d = vt(t),
                u = [],
                c = null;
            var m = pt(t, 1);
            m && u.push(m);
            var h = pt(t, 2, u);
            h && u.push(h);
            var p = pt(t, 3, u);
            p && u.push(p);
            var f = pt(t, 4, u);
            f && u.push(f);
            var g = null;
            f && 4 === f.htmlLength && (g = pt(t, 5, u)),
            g && u.push(g);
            var b = ((e, t) => {
                var n = [];
                if (!e)
                    return n;
                for (var i = 0, a = e.length; i < a; i++)
                    t ? e[i].viewable || n.push(e[i]) : e[i].viewable && n.push(e[i]);
                return n
            })(e, !0);
            return o || (o = bt(b, !0)), d || (d = vt(b, !0)), l || (l = It(b, !0)), (!o && !d || o && d && o.elementNumber === d.elementNumber) && (c = (e => {
                var t = he(e, wt);
                return null !== t && wt(t) > 0 ? t : null
            })(e), c && (o = null, d = null)), {
                cardNumberField: u.length >= 4 ? null : n,
                cardNumberFields: u,
                cardHolderField: a,
                cardTypeField: l,
                cvvField: s,
                monthField: o,
                yearField: d,
                expiryField: c
            }
        },
        Et = e => {
            var t = 0;
            return (e.cardNumberField || e.cardNumberFields.length >= 4) && (t += 100), t += e.cardHolderField ? 2 : 0, t += e.cardTypeField ? 2 : 0, t += e.cvvField ? 2 : 0, t += e.monthField ? 2 : 0, (t += e.yearField ? 2 : 0) > 0 && (t += ct(e.htmlName, Ye), t += ct(e.htmlID, Ye), t += ct(e.htmlClass, Ye)), t
        },
        Ft = (e, t) => {
            let n = null,
                i = [],
                a = [],
                r = t ? 0 : 100;
            if (e ? a = e : (i = oe(), a = me(i)), !a)
                return null;
            if (a) {
                const e = a;
                if (e && e.pageForms && e.pageForms.length) {
                    let t = (s = e.pageForms) ? s.map((e => pe(e, Tt(e.fields)))) : [];
                    if (t && (n = he(t, Et), n && Et(n) > r))
                        return n
                }
                if (!n && e && e.pageFields && e.pageFields.length) {
                    var l = Tt(e.pageFields);
                    return l.cardNumberField ? l : null
                }
            }
            var s;
            return null
        },
        Dt = function(e, t, n) {
            if (!e || !t)
                return !1;
            try {
                var i = document.querySelector('[data-enpassid=' + e.elementNumber + ']');
                if (i) {
                    var a = i.nodeName;
                    if ('INPUT' === a && (i.value = 'year' === n && 2 === e.htmlLength && 4 === t.length ? t.substr(2, 2) : t, D(i), C(i)), 'SELECT' === a)
                        for (var r = 0, l = e.selectOption.options.length; r < l; ++r) {
                            var s = e.selectOption.options[r],
                                o = s && s[0] ? s[0].toLowerCase() : '',
                                d = s && s[1] ? s[1].toLowerCase() : '',
                                u = t,
                                c = t;
                            if ('year' === n && (o && 4 === o.length && 4 !== t.length && (u = '20' + t), d && 4 === d.length && (t.substr(2, 2), 4 !== t.length && (c = '20' + t)), o && 2 === o.length && 2 !== t.length && (u = t.substr(2, 2)), d && 2 === d.length && 2 !== t.length && (d = t.substr(2, 2))), o === u.toLowerCase() || d === c.toLowerCase()) {
                                i.selectedIndex = r,
                                A(i, 'change');
                                break
                            }
                            if (!isNaN(t)) {
                                var m = t;
                                if (1 === t.length && (m = x(m, 2)), 2 === t.length) {
                                    if (m = parseInt(m, 10), 'month' === n && (-1 !== o.indexOf(dt[m - 1]) || -1 !== o.indexOf(ut[m - 1]) || -1 !== d.indexOf(ut[m - 1]) || -1 !== d.indexOf(dt[m - 1]))) {
                                        i.selectedIndex = r,
                                        C(i);
                                        break
                                    }
                                    m = m.toString()
                                }
                                if (o === m.toLowerCase() || d === m.toLowerCase()) {
                                    i.selectedIndex = r,
                                    C(i);
                                    break
                                }
                            }
                        }
                }
            } catch (e) {}
        },
        xt = (e, t) => {
            var n = 0,
                i = t.ccnumber,
                a = 0,
                r = 4;
            if (e) {
                if (e.cardTypeField && Dt(e.cardTypeField, t.cardtype, 'cardtype'), e.cardNumberField && Dt(e.cardNumberField, t.ccnumber), e && e.cardNumberFields && 3 === e.cardNumberFields.length && (i = t.ccnumber, a = 0, r = e.cardNumberFields[0].htmlLength || 4, Dt(e.cardNumberFields[0], i.substring(a, r)), a = r, r = r + e.cardNumberFields[1].htmlLength || r + 6, Dt(e.cardNumberFields[1], i.substring(a, r)), a = r, Dt(e.cardNumberFields[2], i.substring(a))), e.cardNumberFields.length >= 4 && (n = e.cardNumberFields.length, i = t.ccnumber, a = 0, r = 4, Dt(e.cardNumberFields[0], i.substring(a, r)), a = r, r += 4, Dt(e.cardNumberFields[1], i.substring(a, r)), a = r, r += 4, Dt(e.cardNumberFields[2], i.substring(a, r)), 4 === n ? (a = r, Dt(e.cardNumberFields[3], i.substring(a))) : (a = r, r += 4, Dt(e.cardNumberFields[3], i.substring(a, r)), a = r, Dt(e.cardNumberFields[4], i.substring(a)))), e.cardHolderField && Dt(e.cardHolderField, t.holderName), e.monthField && Dt(e.monthField, t.month, 'month'), e.yearField && Dt(e.yearField, t.year, 'year'), e.expiryField) {
                    var l = t.month,
                        s = t.year,
                        o = e.expiryField.htmlLength,
                        d = e.expiryField;
                    if (d.value = l, Dt(d, l), 5 === o) {
                        const e = s.length > 2 ? s.substring(s.length - 2) : s,
                            t = d.htmlPlaceholder && d.htmlPlaceholder.includes('/') && e ? `${l}/${e}` : l + e;
                        Dt(d, t)
                    } else if (7 === o)
                        Dt(d, l + s);
                    else {
                        Dt(d, s ? l + '/' + s : l + s)
                    }
                }
                e.cvvField && Dt(e.cvvField, t.cvv)
            }
        },
        Nt = e => {
            let t = 0;
            if (!e || !e.visible || e.isOutsideDocument)
                return 0;
            let n = e.htmlType;
            if ('text' === n || 'email' === n) {
                t += 'email' === n ? 5 : 0;
                const i = /e[_-]?mail([_-]?(id|address))?/i,
                    a = /e[_-]?mail([\s_-]?(id|address))?/i,
                    r = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    l = 'ईमेल,correo electrónico,البريد الإلكتروني,אֶלֶקטרוֹנִי,e-post,이메일,Eメール,o email,Эл. адрес,E-naslov,อีเมล,e-posta,електронна пошта,電子郵件,电子邮件'.split(',');
                if (0 === t) {
                    const t = P(e.htmlPlaceholder, ['name']) && !r.test(e.htmlPlaceholder),
                        n = P(e.htmlPlaceholder, ['user']);
                    if (t && !n)
                        return 0
                }
                t += i.test(e.htmlName) ? 10 : 0,
                t += i.test(e.htmlID) ? 10 : 0,
                t += i.test(e.htmlClass) ? 5 : 0,
                t += i.test(e.htmlTitle) ? 5 : 0,
                t += a.test(e.htmlPlaceholder) || r.test(e.htmlPlaceholder) ? 10 : 0,
                e.userEdited || (t += r.test(e.htmlValue) ? 10 : 0);
                let s = 0;
                if (s += !s && a.test(e.htmlLabel) ? 10 : 0, s += !s && P(e.htmlLabel, l) ? 10 : 0, e.htmlPlaceholder) {
                    const n = e.htmlPlaceholder;
                    P(n, ['phone', 'number']) && !P(n, ['email']) && (t -= 5)
                }
                if (s += s || e.htmlPlaceholder || !a.test(e.labelTop) ? 0 : 5, s += s || e.htmlPlaceholder || !P(e.labelTop, l) ? 0 : 5, s += !s && !e.htmlPlaceholder && !e.htmlLabel && e.labelRight && e.labelRight.length < 50 && a.test(e.labelRight) ? 5 : 0, s += s || e.htmlPlaceholder || !P(e.labelRight, l) ? 0 : 5, s += s || e.htmlPlaceholder || !a.test(e.labelLeft) ? 0 : 5, s += s || e.htmlPlaceholder || !P(e.labelLeft, l) ? 0 : 5, s += s || e.htmlPlaceholder || !a.test(e.labelData) ? 0 : 5, s += s || e.htmlPlaceholder || !P(e.labelData, l) ? 0 : 5, s += s || e.htmlPlaceholder || !a.test(e.labelAria) ? 0 : 5, s += s || e.htmlPlaceholder || !P(e.labelAria, l) ? 0 : 5, s > 0) {
                    const t = e.htmlLabel || e.labelRight || e.labelLeft || e.labelData || e.labelAria;
                    if (t && P(t, ['would you like to']))
                        return 0
                }
                return t + s
            }
            return 0
        },
        At = e => {
            var t = 0;
            if (!e || !e.visible || e.isOutsideDocument)
                return 0;
            if ('text' === e.htmlType) {
                var n = /f(irst)?[\s-_]?name/i,
                    i = 'first name,पहला नाम,keresztnév,名字,Prénom,ім\'я,Vorname,etunimi,fornavn,ファーストネーム,praenomen,primeiro nome,имя'.split(',');
                if (qt(e, /full name|middle name|last name|surname/i) > 0)
                    return 0;
                t += n.test(e.htmlName) ? 10 : 0,
                t += n.test(e.htmlID) ? 10 : 0,
                t += n.test(e.htmlClass) ? 5 : 0,
                t += n.test(e.htmlTitle) ? 5 : 0;
                var a = P(e.htmlPlaceholder, i) ? 10 : 0;
                e.userEdited || (t += P(e.htmlValue, i) ? 10 : 0);
                var r = 0;
                return e.htmlLabel ? r += !r && P(e.htmlLabel, i) ? 10 : 0 : (r += r || a || !P(e.labelTop, i) ? 0 : 5, r += r || a || !P(e.labelRight, i) ? 0 : 5, r += r || a || !P(e.labelLeft, i) ? 0 : 5), r += r || a || !P(e.labelData, i) ? 0 : 5, t + (r += r || a || !P(e.labelAria, i) ? 0 : 5) + a
            }
            return 0
        },
        Ct = e => {
            var t = 0;
            if (!e || !e.visible || e.isOutsideDocument)
                return 0;
            if ('text' === e.htmlType) {
                var n = /(l(ast)?|sur|family)[-_]?name/i,
                    i = 'last name,family name,surname,अंतिम नाम,cognome,姓,nom de famille,familienname,nachname,прізвище,Фамилия,vezetéknév'.split(',');
                if (qt(e, /first & last name|full name|middle name/i) > 0)
                    return 0;
                t += e.htmlName && -1 === e.htmlName.indexOf('full') && n.test(e.htmlName) ? 10 : 0,
                t += e.htmlID && -1 === e.htmlID.indexOf('full') && n.test(e.htmlID) ? 10 : 0,
                t += e.htmlClass && -1 === e.htmlClass.indexOf('full') && n.test(e.htmlClass) ? 5 : 0,
                t += e.htmlTitle && -1 === e.htmlTitle.indexOf('full') && n.test(e.htmlTitle) ? 5 : 0;
                var a = P(e.htmlPlaceholder, i);
                e.userEdited || (t += P(e.htmlValue, i) ? 10 : 0);
                var r = 0;
                return e.htmlLabel ? r += !r && P(e.htmlLabel, i) ? 10 : 0 : (r += r || a || !P(e.labelTop, i) ? 0 : 5, r += r || a || !P(e.labelRight, i) ? 0 : 5, r += r || a || !P(e.labelLeft, i) ? 0 : 5), r += r || a || !P(e.labelData, i) ? 0 : 5, t + (r += r || a || !P(e.labelAria, i) ? 0 : 5) + a
            }
            return 0
        },
        kt = e => {
            var t = 0;
            if (!e || !e.visible || e.isOutsideDocument)
                return 0;
            if ('text' === e.htmlType) {
                var n = /m(iddle)?[-_]?(name|initial)/i,
                    i = 'middle name,middle initial,secondo nome,второе имя,középső név,मध्य नाम,中间名字,الاسم الأوسط,toinen nimi,deuxième nom,zweiter Vorname,ミドルネーム,nomen medium,mellomnavn'.split(',');
                t += n.test(e.htmlName) ? 10 : 0,
                t += n.test(e.htmlID) ? 10 : 0,
                t += n.test(e.htmlClass) ? 5 : 0,
                t += n.test(e.htmlTitle) ? 5 : 0;
                var a = P(e.htmlPlaceholder, i) ? 10 : 0;
                e.userEdited || (t += P(e.htmlValue, i) ? 10 : 0);
                var r = 0;
                return e.htmlLabel ? r += r || !P(e.htmlLabel, i) && !/(^mi$)/i.test(e.htmlLabel) ? 0 : 10 : (r += r || a || !P(e.labelTop, i) ? 0 : 5, r += r || a || !P(e.labelRight, i) ? 0 : 5, r += r || a || !P(e.labelLeft, i) ? 0 : 5), r += r || a || !P(e.labelData, i) ? 0 : 5, t + (r += r || a || !P(e.labelAria, i) ? 0 : 5) + a
            }
            return 0
        },
        St = e => {
            var t = 0;
            if (!e || !e.visible || e.isOutsideDocument)
                return 0;
            if ('text' === e.htmlType) {
                var n = /(?:full[_-]name)|^(full|bill|customer)?(!last|!first|!middle|!family|!sur)?[-_]?name$/i,
                    i = /(first name)|(last name)|(middle name)|(username)/i,
                    a = 'full name,bill name,customer name,enter name,enter your name,नाम,navn,имя,اسم,名称,név'.split(','),
                    r = 'name'.split(',').concat(a);
                if (qt(e, i) > 0) {
                    if (!/first & last name/i.test(e.htmlPlaceholder))
                        return 0
                }
                t += n.test(e.htmlName) ? 10 : 0,
                t += n.test(e.htmlID) ? 10 : 0,
                t += n.test(e.htmlClass) ? 5 : 0,
                t += n.test(e.htmlTitle) ? 5 : 0,
                t += q(e.htmlPlaceholder, r) || !i.test(e.htmlPlaceholder) && P(e.htmlPlaceholder, a) ? 10 : 0,
                e.userEdited || (t += q(e.htmlValue, r) || P(e.htmlValue, a) ? 10 : 0);
                var l = 0;
                l += !l && q(e.htmlLabel, r) || !l && P(e.htmlLabel, a) ? 10 : 0,
                e.htmlPlaceholder && 'required' !== e.htmlPlaceholder || (l += !l && q(e.labelTop, r) ? 10 : l || i.test(e.labelTop) || !P(e.labelTop, a) ? 0 : 5, l += !l && q(e.labelRight, r) ? 10 : l || i.test(e.labelRight) || !P(e.labelRight, a) ? 0 : 5, l += !l && q(e.labelLeft, r) ? 10 : l || i.test(e.labelLeft) || !P(e.labelLeft, a) ? 0 : 5, l += !l && q(e.labelData, r) ? 10 : l || i.test(e.labelData) || !P(e.labelData, a) ? 0 : 5, l += !l && q(e.labelAria, r) ? 10 : l || i.test(e.labelAria) || !P(e.labelAria, a) ? 0 : 5),
                t += l
            }
            return t
        },
        Ot = e => {
            var t = 0;
            if (!e || !e.visible || e.isOutsideDocument)
                return 0;
            var n = e.htmlType;
            if (/(tel|text)/i.test(n)) {
                var i = /((mobile|phone)[-_]?(num|number|no)?)|telephone|contact[-_]?(num|number|no)/i,
                    a = 'mobile,phone,contact no,contact number,telephone,telefono,telefon,Телефон,Handynummer,手机号码,numero di cellulare,मोबाइल नंबर,फ़ोन नंबर'.toLowerCase().split(',');
                if (qt(e, /email|fax/i, i) > 0 && 'tel' !== e.autoCompleteType)
                    return 0;
                if (e.htmlLength < 10)
                    return 0;
                t += i.test(e.htmlName) ? 10 : 0,
                t += i.test(e.htmlID) ? 10 : 0,
                t += i.test(e.htmlTitle) ? 5 : 0,
                t += P(e.htmlPlaceholder, a) ? 10 : 0,
                e.userEdited || (t += P(e.htmlValue, a) ? 10 : 0);
                var r = 0;
                r += !r && P(e.htmlLabel, a) ? 10 : 0,
                r += r || e.htmlPlaceholder || !P(e.labelTop, a) ? 0 : 5,
                r += r || e.htmlPlaceholder || !P(e.labelTop, a) ? 0 : 5,
                r += r || e.htmlPlaceholder || !P(e.labelLeft, a) ? 0 : 5,
                r += r || e.htmlPlaceholder || !P(e.labelData, a) ? 0 : 5,
                0 !== (t += r += r || e.htmlPlaceholder || !P(e.labelAria, a) ? 0 : 5) || e.htmlPlaceholder || e.htmlLabel || (t += i.test(e.htmlClass) ? 5 : 0)
            }
            return t
        },
        Pt = e => {
            var t = 0;
            if (/(text|select-one|number|tel)/i.test(e.htmlType)) {
                var n = /(dob|birth)(day|date)?[-_]?(day|dd)|^day$/i,
                    i = 'day,dd'.split(',');
                if (qt(e, /(month|year|exp|anniversary)/i) > 0)
                    return 0;
                t += n.test(e.htmlName) ? 10 : 0,
                t += n.test(e.htmlID) ? 10 : 0,
                t += n.test(e.htmlClass) ? 5 : 0,
                t += n.test(e.htmlTitle) ? 5 : 0,
                t += q(e.htmlPlaceholder, i) ? 10 : 0;
                var a = 0;
                if (a += !a && q(e.htmlLabel, i) ? 10 : 0, a += a || e.htmlPlaceholder || !q(e.labelTop, i) ? 0 : 5, a += a || e.htmlPlaceholder || !q(e.labelLeft, i) ? 0 : 5, a += a || e.htmlPlaceholder || !q(e.labelData, i) ? 0 : 5, 0 === (t += a += a || e.htmlPlaceholder || !q(e.labelAria, i) ? 0 : 5)) {
                    var r = /date\sof\sbirth/i,
                        l = /day|dd/i;
                    (r.test(e.htmlLabel) || r.test(e.labelTop) || r.test(e.labelRight) || r.test(e.labelData) || r.test(e.labelAria)) && (t += l.test(e.htmlName) ? 10 : 0, t += l.test(e.htmlID) ? 10 : 0, t += l.test(e.htmlClass) ? 5 : 0, t += l.test(e.htmlTitle) ? 5 : 0)
                }
            }
            return t
        },
        Mt = e => {
            var t = 0;
            if (/(text|select-one|number|tel)/i.test(e.htmlType)) {
                var n = /(dob|birth)(day|date)?[-_]?(month|mm)|(month)/i,
                    i = 'month,mm'.split(',');
                if (qt(e, /(exp|anniversary)/i) > 0)
                    return 0;
                t += n.test(e.htmlName) ? 10 : 0,
                t += n.test(e.htmlID) ? 10 : 0,
                t += n.test(e.htmlClass) ? 5 : 0,
                t += n.test(e.htmlTitle) ? 5 : 0,
                t += q(e.htmlPlaceholder, i) ? 10 : 0;
                var a = 0;
                if (a += !a && q(e.htmlLabel, i) ? 10 : 0, a += a || e.htmlPlaceholder || !q(e.labelTop, i) ? 0 : 5, a += a || e.htmlPlaceholder || !q(e.labelTop, i) ? 0 : 5, a += a || e.htmlPlaceholder || !q(e.labelLeft, i) ? 0 : 5, a += a || e.htmlPlaceholder || !q(e.labelData, i) ? 0 : 5, 0 === (t += a += a || e.htmlPlaceholder || !q(e.labelAria, i) ? 0 : 5)) {
                    var r = /date\sof\sbirth/i,
                        l = /mm|month/i;
                    (r.test(e.htmlLabel) || r.test(e.labelTop) || r.test(e.labelRight) || r.test(e.labelData) || r.test(e.labelAria)) && (t += l.test(e.htmlName) ? 10 : 0, t += l.test(e.htmlID) ? 10 : 0, t += l.test(e.htmlClass) ? 5 : 0, t += l.test(e.htmlTitle) ? 5 : 0)
                }
            }
            return t
        },
        Rt = e => {
            var t = 0;
            if (/(text|select-one|number|tel)/i.test(e.htmlType)) {
                var n = /(dob|birth)(day|date)?[_-]?(year|yy)|(year)/i,
                    i = 'year,yy'.split(',');
                if (qt(e, /(exp|anniversary)/i) > 0)
                    return 0;
                t += n.test(e.htmlName) ? 10 : 0,
                t += n.test(e.htmlID) ? 10 : 0,
                t += n.test(e.htmlClass) ? 5 : 0,
                t += n.test(e.htmlTitle) ? 5 : 0,
                t += q(e.htmlPlaceholder, i) ? 10 : 0;
                var a = 0;
                if (a += !a && q(e.htmlLabel, i) ? 10 : 0, a += a || e.htmlPlaceholder || !q(e.labelTop, i) ? 0 : 5, a += a || e.htmlPlaceholder || !q(e.labelTop, i) ? 0 : 5, a += a || e.htmlPlaceholder || !q(e.labelLeft, i) ? 0 : 5, a += a || e.htmlPlaceholder || !q(e.labelData, i) ? 0 : 5, 0 === (t += a += a || e.htmlPlaceholder || !q(e.labelAria, i) ? 0 : 5) && 'select-one' === e.htmlType) {
                    var r = e.selectOption.options;
                    if (r.length > 10) {
                        var l = /^(18[5-9]\d|19[5-9]\d|20[0-4]\d|2050)$/g;
                        (l.test(r[9][0]) || l.test(r[9][1])) && (t += 10)
                    }
                    var s = /date\sof\sbirth/i,
                        o = /yy|year/i;
                    (s.test(e.htmlLabel) || s.test(e.labelTop) || s.test(e.labelRight) || s.test(e.labelData) || s.test(e.labelAria)) && (t += o.test(e.htmlName) ? 10 : 0, t += o.test(e.htmlID) ? 10 : 0, t += o.test(e.htmlClass) ? 5 : 0)
                }
            }
            return t
        },
        Ut = e => {
            var t = 0;
            if (!e || !e.visible)
                return 0;
            var n = e.htmlType;
            if (/(select-one|text)/i.test(n)) {
                var i = /country/i,
                    a = /(phone|mobile|company)/i,
                    r = 'country,देश,страна,国家'.split(',');
                if (e.htmlName && (e.htmlName.indexOf('/') > -1 || e.htmlName.indexOf('.') > -1)) {
                    let n = /(phone|mobile|company|address|city|state)/i.test(e.htmlName),
                        a = i.test(e.htmlName);
                    !n && a && (t += 10)
                } else
                    t += !a.test(e.htmlName) && i.test(e.htmlName) ? 10 : 0;
                if (e.htmlID && (e.htmlID.indexOf('/') > -1 || e.htmlID.indexOf('.') > -1)) {
                    let n = /(phone|mobile|company|address|city|state)/i.test(e.htmlID),
                        a = i.test(e.htmlID);
                    !n && a && (t += 10)
                } else
                    t += !a.test(e.htmlID) && i.test(e.htmlID) ? 10 : 0;
                t += !a.test(e.htmlClass) && i.test(e.htmlClass) ? 5 : 0,
                t += !a.test(e.htmlTitle) && i.test(e.htmlTitle) ? 5 : 0,
                t += q(e.htmlPlaceholder, r) || !a.test(e.htmlPlaceholder) && P(e.htmlPlaceholder, r) ? 10 : 0,
                'text' === n && e.userEdited && (t += !a.test(e.htmlValue) && i.test(e.htmlValue) ? 5 : 0);
                var l = 0;
                return l += l || a.test(e.htmlLabel) || !P(e.htmlLabel, r) ? 0 : 10, l += l || a.test(e.labelTop) || !P(e.labelTop, r) ? 0 : 5, l += l || a.test(e.labelRight) || !P(e.labelRight, r) ? 0 : 5, l += l || a.test(e.labelLeft) || !P(e.labelLeft, r) ? 0 : 5, l += l || a.test(e.labelData) || !P(e.labelData, r) ? 0 : 5, t + (l += l || a.test(e.labelAria) || !P(e.labelAria, r) ? 0 : 5)
            }
            return 0
        },
        Bt = e => {
            var t = 0;
            if (!e || !e.visible || e.isOutsideDocument)
                return 0;
            var n = e.htmlType;
            if (/(select-one|text)/i.test(n)) {
                var i = /(state|province|region)/i;
                t += i.test(e.htmlName) ? 10 : 0,
                t += i.test(e.htmlID) ? 10 : 0,
                t += i.test(e.htmlClass) ? 5 : 0,
                t += i.test(e.htmlTitle) ? 5 : 0,
                'text' === n && e.userEdited && (t += i.test(e.htmlValue) ? 5 : 0);
                var a = 0;
                return a += !a && i.test(e.htmlLabel) ? 10 : 0, a += !a && i.test(e.labelTop) ? 5 : 0, a += !a && i.test(e.labelRight) ? 5 : 0, a += !a && i.test(e.labelLeft) ? 5 : 0, a += !a && i.test(e.labelData) ? 5 : 0, t + (a += !a && i.test(e.labelAria) ? 5 : 0)
            }
            return 0
        },
        Vt = e => {
            var t = 0;
            if (!e || !e.visible || e.isOutsideDocument)
                return 0;
            var n = e.htmlType;
            if (/(select-one|text)/i.test(n)) {
                var i = /(city|town)/i;
                t += i.test(e.htmlName) ? 10 : 0,
                t += i.test(e.htmlID) ? 10 : 0,
                t += i.test(e.htmlClass) ? 5 : 0,
                t += i.test(e.htmlTitle) ? 5 : 0,
                'text' === n && e.userEdited && (t += i.test(e.htmlValue) ? 5 : 0);
                var a = 0;
                return a += !a && i.test(e.htmlLabel) ? 10 : 0, a += !a && i.test(e.labelTop) ? 5 : 0, a += !a && i.test(e.labelRight) ? 5 : 0, a += !a && i.test(e.labelLeft) ? 5 : 0, a += !a && i.test(e.labelData) ? 5 : 0, t + (a += !a && i.test(e.labelAria) ? 5 : 0)
            }
            return 0
        },
        qt = (e, t, n) => {
            var i = 0;
            if (n) {
                if (e.htmlName && (e.htmlName.indexOf('/') > -1 || e.htmlName.indexOf('.') > -1)) {
                    let a = t.test(e.htmlName),
                        r = n.test(e.htmlName);
                    a && !r && (i += 10)
                } else
                    i += t.test(e.htmlName) ? 10 : 0;
                if (e.htmlID && (e.htmlID.indexOf('/') > -1 || e.htmlID.indexOf('.') > -1)) {
                    let a = t.test(e.htmlID),
                        r = n.test(e.htmlID);
                    a && !r && (i += 10)
                } else
                    i += t.test(e.htmlID) ? 10 : 0
            } else
                i += t.test(e.htmlName) ? 10 : 0,
                i += t.test(e.htmlID) ? 10 : 0;
            i += t.test(e.htmlClass) ? 5 : 0,
            i += t.test(e.htmlTitle) ? 5 : 0,
            i += t.test(e.htmlPlaceholder) ? 5 : 0;
            var a = 0;
            if (e.htmlLabel) {
                return a += !a && t.test(e.htmlLabel) ? 10 : 0, n && n.test(e.htmlLabel) ? 0 : i + a
            }
            return a += !a && t.test(e.labelTop) ? 10 : 0, a += !a && t.test(e.labelRight) ? 10 : 0, a += !a && t.test(e.labelLeft) ? 10 : 0, a += !a && t.test(e.labelData) ? 10 : 0, i + (a += !a && t.test(e.labelAria) ? 10 : 0)
        },
        zt = e => {
            var t = 0;
            if (!e || !e.visible || e.isOutsideDocument)
                return 0;
            var n = e.htmlType;
            if (/(textarea|text)/i.test(n)) {
                var i = /(address|addr|street|landmark|postal.*address)/i,
                    a = /(mail|company|name|city|state|country|phone|code|^zip$)/i,
                    r = 'landmark,address,पता,Adresse,地址,osoite,Indirizzo,адрес'.toLowerCase().split(',');
                if (qt(e, a, i) > 0)
                    return 0;
                if (e.htmlName && (e.htmlName.indexOf('/') > -1 || e.htmlName.indexOf('.') > -1)) {
                    let n = a.test(e.htmlName),
                        r = i.test(e.htmlName);
                    !n && r && (t += 10)
                } else
                    t += !a.test(e.htmlName) && i.test(e.htmlName) ? 10 : 0;
                if (e.htmlID && (e.htmlID.indexOf('/') > -1 || e.htmlID.indexOf('.') > -1)) {
                    let n = a.test(e.htmlID),
                        r = i.test(e.htmlID);
                    !n && r && (t += 10)
                } else
                    t += !a.test(e.htmlID) && i.test(e.htmlID) ? 10 : 0;
                t += i.test(e.htmlName) ? 10 : 0,
                t += i.test(e.htmlID) ? 10 : 0,
                t += i.test(e.htmlClass) ? 5 : 0,
                t += i.test(e.htmlTitle) ? 5 : 0,
                'text' === n && e.userEdited && (t += !a.test(e.htmlValue) && i.test(e.htmlValue) ? 5 : 0);
                var l = 0;
                return l += !l && P(e.htmlLabel, r) ? 10 : 0, l += !l && P(e.labelRight, r) ? 5 : 0, l += !l && P(e.labelLeft, r) ? 5 : 0, l += !l && P(e.labelData, r) ? 5 : 0, t + (l += !l && P(e.labelAria, r) ? 5 : 0)
            }
            return 0
        },
        jt = e => {
            var t = 0;
            if (!e || !e.visible || e.isOutsideDocument)
                return 0;
            if ('text' === e.htmlType) {
                var n = /company|(?:business.*name)|organization/i,
                    i = 'company,organization,business name,firma,संगठन,组织'.split(',');
                if (qt(e, /phone|fax|country/i, n))
                    return 0;
                t += n.test(e.htmlName) ? 10 : 0,
                t += n.test(e.htmlID) ? 10 : 0,
                t += n.test(e.htmlClass) ? 5 : 0,
                t += n.test(e.htmlTitle) ? 5 : 0;
                var a = P(e.htmlPlaceholder, i) ? 10 : 0;
                e.userEdited || (t += P(e.htmlValue, i) ? 10 : 0);
                var r = 0;
                r += !r && P(e.htmlLabel, i) ? 10 : 0,
                r += r || a || !P(e.labelTop, i) ? 0 : 5,
                r += r || a || !P(e.labelRight, i) ? 0 : 5,
                r += r || a || !P(e.labelLeft, i) ? 0 : 5,
                r += r || a || !P(e.labelData, i) ? 0 : 5,
                t += (r += r || a || !P(e.labelAria, i) ? 0 : 5) + a
            }
            return t
        },
        Wt = e => {
            var t = 0;
            if (!e || !e.visible || e.isOutsideDocument)
                return 0;
            if ('text' === e.htmlType || 'select-one' === e.htmlType) {
                var n = /(department)/i,
                    i = 'department,विभाग,отдел,部门,dipartimento,département'.toLowerCase().split(',');
                t += n.test(e.htmlName) ? 10 : 0,
                t += n.test(e.htmlID) ? 10 : 0,
                t += n.test(e.htmlClass) ? 5 : 0,
                t += n.test(e.htmlTitle) ? 5 : 0;
                var a = P(e.htmlPlaceholder, i) ? 10 : 0;
                e.userEdited || (t += P(e.htmlValue, i) ? 10 : 0);
                var r = 0;
                r += !r && P(e.htmlLabel, i) ? 10 : 0,
                r += r || a || !P(e.labelTop, i) ? 0 : 5,
                r += r || a || !P(e.labelRight, i) ? 0 : 5,
                r += r || a || !P(e.labelLeft, i) ? 0 : 5,
                r += r || a || !P(e.labelData, i) ? 0 : 5,
                t += (r += r || a || !P(e.labelAria, i) ? 0 : 5) + a
            }
            return t
        },
        $t = e => {
            var t = 0;
            if (!e || !e.visible || e.isOutsideDocument)
                return 0;
            if ('text' === e.htmlType || 'select-one' === e.htmlType) {
                var n = /(occupation)/i,
                    i = 'occupation,व्यवसाय'.split(',');
                t += n.test(e.htmlName) ? 10 : 0,
                t += n.test(e.htmlID) ? 10 : 0,
                t += n.test(e.htmlClass) ? 5 : 0,
                t += n.test(e.htmlTitle) ? 5 : 0;
                var a = P(e.htmlPlaceholder, i) ? 10 : 0;
                e.userEdited || (t += P(e.htmlValue, i) ? 10 : 0);
                var r = 0;
                r += !r && P(e.htmlLabel, i) ? 10 : 0,
                r += r || a || !P(e.labelTop, i) ? 0 : 5,
                r += r || a || !P(e.labelRight, i) ? 0 : 5,
                r += r || a || !P(e.labelLeft, i) ? 0 : 5,
                r += r || a || !P(e.labelData, i) ? 0 : 5,
                t += (r += r || a || !P(e.labelAria, i) ? 0 : 5) + a
            }
            return t
        },
        Ht = e => {
            var t = 0;
            if (!e || !e.visible || e.isOutsideDocument)
                return 0;
            if ('text' === e.htmlType || 'select-one' === e.htmlType) {
                var n = /(?:job.*(title|info))|(?:work.*(title|info))|(designaiton)/i,
                    i = 'designation,job title,job position,work title,job info,work info,पद,la désignation,Bezeichnung,designatio'.toLowerCase().split(',');
                t += n.test(e.htmlName) ? 10 : 0,
                t += n.test(e.htmlID) ? 10 : 0,
                t += n.test(e.htmlClass) ? 5 : 0,
                t += n.test(e.htmlTitle) ? 5 : 0;
                var a = P(e.htmlPlaceholder, i) ? 10 : 0;
                e.userEdited || (t += P(e.htmlValue, i) ? 10 : 0);
                var r = 0;
                r += !r && P(e.htmlLabel, i) ? 10 : 0,
                r += r || a || !P(e.labelTop, i) ? 0 : 5,
                r += r || a || !P(e.labelRight, i) ? 0 : 5,
                r += r || a || !P(e.labelLeft, i) ? 0 : 5,
                r += r || a || !P(e.labelData, i) ? 0 : 5,
                t += (r += r || a || !P(e.labelAria, i) ? 0 : 5) + a
            }
            return t
        },
        Kt = e => {
            var t = 0;
            if (!e || !e.visible || e.isOutsideDocument)
                return 0;
            var n = e.htmlType;
            if ('text' === n || 'select-one' === n || 'radio' === n) {
                var i = /(gender|sex)/i,
                    a = 'gender,sex,male,female'.toLowerCase().split(',');
                t += i.test(e.htmlName) ? 10 : 0,
                t += i.test(e.htmlID) ? 10 : 0,
                t += i.test(e.htmlClass) ? 5 : 0,
                t += i.test(e.htmlTitle) ? 5 : 0;
                var r = P(e.htmlPlaceholder, a) ? 10 : 0;
                e.userEdited || (t += P(e.htmlValue, a) ? 10 : 0);
                var l = 0;
                l += !l && P(e.htmlLabel, a) ? 10 : 0,
                l += l || r || !P(e.labelTop, a) ? 0 : 5,
                l += l || r || !P(e.labelRight, a) ? 0 : 5,
                l += l || r || !P(e.labelLeft, a) ? 0 : 5,
                l += l || r || !P(e.labelData, a) ? 0 : 5,
                t += (l += l || r || !P(e.labelAria, a) ? 0 : 5) + r
            }
            return t
        },
        Gt = e => {
            var t = 0;
            if (!e || !e.visible || e.isOutsideDocument)
                return 0;
            var n = e.htmlType;
            if ('text' === n || 'number' === n || 'tel' === n) {
                var i = /zip|(zip|postal|pin|post)[-_]?(code)/i,
                    a = 'zipcode,pincode,postalcode,postcode,Postleitzahl,पिन कोड'.toLowerCase().split(',');
                t += i.test(e.htmlName) ? 10 : 0,
                t += i.test(e.htmlID) ? 10 : 0,
                t += i.test(e.htmlClass) ? 5 : 0,
                t += i.test(e.htmlTitle) ? 5 : 0;
                var r = P(e.htmlPlaceholder, a, !0) ? 10 : 0;
                e.userEdited || (t += P(e.htmlValue, a, !0) ? 10 : 0);
                var l = 0;
                l += !l && P(e.htmlLabel, a, !0) ? 10 : 0,
                l += l || r || !P(e.labelTop, a, !0) ? 0 : 5,
                l += l || r || !P(e.labelRight, a, !0) ? 0 : 5,
                l += l || r || !P(e.labelLeft, a, !0) ? 0 : 5,
                l += l || r || !P(e.labelData, a, !0) ? 0 : 5,
                (t += (l += l || r || !P(e.labelAria, a, !0) ? 0 : 5) + r) > 0 && (t += 6 === e.htmlLength ? 5 : 0)
            }
            return t
        },
        Yt = e => {
            var t = 0,
                n = e.htmlType;
            if (e.isOutsideDocument)
                return t;
            if ('text' === n || 'email' === n) {
                var i = 'username,login name,usuari,identificación,användar,käyttäjätunnus,user id,登录名,用户名,CPR-nummer,Social Security number,bruger-id,registration number,customer id,online id,login id,personal id,customer number,registered email,account name,member number,membership number,profile number,profile id,cust no,cust id,uživatelské jméno,benutzerkennung'.toLowerCase().split(','),
                    a = /(?:(?:login)|(?:logon.*id)|(?:user)|(?:uname))(?!.*pass)/i,
                    r = /(?:(?:profile.*(id|number))|(?:member.*number)|(?:account.*name)|(?:customer.*(number|id))|(?:regist.*(email|number))|(?:cust.*(no|id))|(?:personal.*id)|(?:online.*id))(?!.*pass)/i,
                    l = /f(irst|ull)?[\s-_]?name/i,
                    s = /(l(ast)?|sur|family)[-_]?name/i,
                    o = 0;
                if (o += l.test(e.htmlName) || s.test(e.htmlName) ? 10 : 0, o += l.test(e.htmlID) || s.test(e.htmlID) ? 10 : 0, (o += l.test(e.htmlPlaceholder) || s.test(e.htmlPlaceholder) ? 10 : 0) > 0)
                    return 0;
                if (e.htmlValue && /\s/g.test(e.htmlValue))
                    return 0;
                t += a.test(e.htmlName) ? 20 : r.test(e.htmlName) ? 10 : 0,
                t += a.test(e.htmlID) ? 20 : r.test(e.htmlID) ? 10 : 0,
                t += a.test(e.htmlClass) || r.test(e.htmlClass) ? 5 : 0,
                t += a.test(e.htmlTitle) || r.test(e.htmlTitle) ? 5 : 0,
                e.userEdited || (t += q(e.htmlValue, i) ? 10 : 0),
                e.htmlPlaceholder && (t += q(e.htmlPlaceholder, i) ? 10 : 0);
                var d = 0;
                return d += !d && P(e.htmlLabel, i) ? 10 : 0, d += d || e.htmlPlaceholder || !P(e.labelTop, i) ? 0 : 5, d += d || e.htmlPlaceholder || !P(e.labelRight, i) ? 0 : 5, d += d || e.htmlPlaceholder || !P(e.labelLeft, i) ? 0 : 5, d += d || e.htmlPlaceholder || !P(e.labelData, i) ? 0 : 5, d += d || e.htmlPlaceholder || !P(e.labelAria, i) ? 0 : 5, !e.visible && !e.viewable && t > 0 && (t /= 10), t + d
            }
            return 0
        },
        Xt = (e, t, n, i, a) => {
            for (var r, l = [], s = 0, o = [], d = 0, u = t.length; s < u; s++)
                (d = e(r = t[s])) > 0 && (n ? o.push([d, r]) : o.push(r), i && l.push(s), a ? r.enpassType = a : r.enpassType || (r.enpassType = r.htmlType));
            if (i)
                for (var c = l.length - 1; c >= 0; c--)
                    t.splice(l[c], 1);
            return o
        },
        Zt = e => e ? (e = ie(e, !0), e = te(e), Xt(Nt, e, !0, !0)) : [],
        Jt = (e, t) => {
            var n = {};
            if (e && 0 !== e.length || (e = oe(null)), e = ie(e, !0), e = te(e), n.email = Xt(Nt, e, !0, !0), n.fname = Xt(At, e, !0, !0), n.lname = Xt(Ct, e, !0, !0), n.mname = Xt(kt, e, !0, !0), n.fullName = Xt(St, e, !0, !0), n.mobileNumber = Xt(Ot, e, !0, !0), n.birthDay = Xt(Pt, e, !0, !0), n.birthMonth = Xt(Mt, e, !0, !0), n.birthYear = Xt(Rt, e, !0, !0), n.country = Xt(Ut, e, !0, !0), n.city = Xt(Vt, e, !0, !0), n.state = Xt(Bt, e, !0, !0), n.address = Xt(zt, e, !0, !0), n.company = Xt(jt, e, !0, !0), n.department = Xt(Wt, e, !0, !0), n.occupation = Xt($t, e, !0, !0), n.designation = Xt(Ht, e, !0, !0), n.gender = Xt(Kt, e, !0, !0), n.zip = Xt(Gt, e, !0, !0), n.username = Xt(Yt, e, !0, !0), n.other = e, n = en(n), Object.keys(n).length) {
                if (t) {
                    var i = [];
                    for (const e in n)
                        'other' !== e && i.push(n[e]);
                    n.allFields = i.flat().map((e => e[1]))
                }
                return n
            }
            return !1
        },
        Qt = (e, t) => {
            for (var n = 0, i = e.length; n < i; n++)
                if (e[n].htmlForm === t)
                    return n;
            return -1
        },
        en = e => {
            var t = Object.keys(e),
                n = {};
            return t.forEach((function(t) {
                e[t].length > 0 && (n[t] = e[t])
            })), n
        },
        tn = (e, t) => {
            if (!e || !t || e.disabled)
                return !1;
            try {
                let o = document.querySelector('[data-enpassid=' + e.elementNumber + ']') || ue(e);
                if (o && ('checkbox' !== e.htmlType && 'radio' !== e.htmlType && 'select-one' !== e.htmlType && (o.value = t, C(o), D(o)), 'radio' === e.htmlType && (o.checked = e.htmlLabel === t.toLowerCase() || e.labelRight === t.toLowerCase() || e.labelLeft === t.toLowerCase()), 'select-one' === e.htmlType))
                    for (var n = 0, i = e.selectOption.options.length; n < i; ++n) {
                        var a = e.selectOption.options[n],
                            r = a[0] && a[0].toLowerCase(),
                            l = a[1] && a[1].toLowerCase();
                        if (r || l) {
                            if (r === t.toLowerCase() || l === t.toLowerCase()) {
                                o.selectedIndex = n,
                                C(o);
                                break
                            }
                            if (!isNaN(t)) {
                                var s = t;
                                if (1 === t.length && (s = x(s, 2)), 2 === t.length && (s = parseInt(s, 10).toString()), r === s.toLowerCase() || l === s.toLowerCase()) {
                                    o.selectedIndex = n,
                                    C(o);
                                    break
                                }
                            }
                        }
                    }
            } catch (e) {}
        },
        nn = (e, t, n) => {
            if (!e || !t)
                return !1;
            if (e instanceof Array) {
                if (!n) {
                    for (var i = 0, a = e.length; i < a; i++) {
                        var r = e[i][1];
                        tn(r, t)
                    }
                    return !0
                }
                var l = rn(e);
                if (l)
                    return tn(l, t), !0
            }
            return !1
        },
        an = (e, t) => {
            if (!e || !t)
                return !1;
            if (e.fname && t.firstname && nn(e.fname, t.firstname, !0), e.mname && t.middlename && nn(e.mname, t.middlename, !0), e.lname && t.lastname && nn(e.lname, t.lastname, !0), e.fullName) {
                let n = '';
                t.firstname && (n += t.firstname),
                t.middlename && (n += ' ' + t.middlename),
                t.lastname && (n += ' ' + t.lastname),
                nn(e.fullName, n, !0)
            }
            e.email && t.email && nn(e.email, t.email, !1),
            e.gender && nn(e.gender, t.gender),
            e.mobileNumber && t.phonedefault && nn(e.mobileNumber, t.phonedefault, !1),
            e.company && (t.company || t.organization) && nn(e.company, t.company || t.organization, !0),
            e.address && (t.address || t.street) && ((e, t) => {
                if (!e || !t)
                    return !1;
                var n = {
                    addressLine1: '',
                    addressLine2: ''
                };
                t.addressLine1 || t.address ? (n.addressLine1 = t.addressLine1 || t.address, n.addressLine2 = t.addressLine2 || t.street || '') : (n.addressLine1 = t.street || '', n.addressLine2 = t.addressLine2 || '');
                var i = e.filter((function(e) {
                    return 'textarea' === e[1].htmlType
                }));
                if (i && i.length > 0)
                    1 === i.length && (n.addressLine2 ? tn(i[0][1], n.addressLine1 + ', ' + n.addressLine2) : tn(i[0][1], n.addressLine1)),
                    i.length > 1 && (tn(i[0][1], n.addressLine1), tn(i[1][1], n.addressLine2));
                else {
                    if (1 === e.length) {
                        const t = n.addressLine2 ? n.addressLine1 + ', ' + n.addressLine2 : n.addressLine1;
                        tn(e[0][1], t)
                    }
                    e.length > 1 && (tn(e[0][1], n.addressLine1), tn(e[1][1], n.addressLine2))
                }
            })(e.address, {
                address: t.address,
                street: t.street
            });
            var n = [];
            if (e.zip) {
                let t = rn(e.zip);
                n.push(['zip', t])
            }
            if (e.country) {
                let t = rn(e.country);
                n.push(['country', t])
            }
            if (e.state) {
                let t = rn(e.state);
                n.push(['state', t])
            }
            if (e.city) {
                let t = rn(e.city);
                n.push(['city', t])
            }
            (n = n.sort((function(e, t) {
                return parseInt(e[1].elementNumber.substr(2)) - parseInt(t[1].elementNumber.substr(2))
            }))).forEach((function(e, n) {
                var i = e[0];
                t[i] && setTimeout((function() {
                    tn(e[1], t[i])
                }), 500 * n)
            })),
            t.dob && ((e, t) => {
                var n = [];
                if (t && (-1 !== t.indexOf('/') ? n = t.split('/') : (-1 !== t.indexOf('-') || t.dob && -1 !== t.dob.indexOf('-')) && (n = t.split('-')), 0 != n.length))
                    if (e.dob) {
                        var i = rn(e.dob);
                        i && (i.htmlPlaceholder && 'dd/mm/yyyy' === i.htmlPlaceholder.toLowerCase() ? tn(i, t) : tn(i, n[1] + '/' + n[0] + '/' + n[2]))
                    } else {
                        if (e.birthDay) {
                            var a = rn(e.birthDay);
                            e.birthMonth || e.birthYear ? tn(a, n[0]) : 'text' === a.htmlType && a.htmlLength > 4 && tn(a, n[0] + '/' + n[1] + '/' + n[2])
                        }
                        if (e.birthMonth) {
                            var r = rn(e.birthMonth);
                            e.birthDay || e.birthYear ? tn(r, n[1]) : 'text' === r.htmlType && r.htmlLength > 4 && tn(r, n[0] + '/' + n[1] + '/' + n[2])
                        }
                        if (e.birthYear) {
                            var l = rn(e.birthYear);
                            e.birthMonth || e.birthDay ? tn(l, n[2]) : 'text' === l.htmlType && l.htmlLength > 4 && tn(l, n[0] + '/' + n[1] + '/' + n[2])
                        }
                    }
            })(e, t.dob),
            e.occupation && t.occupation && nn(e.occupation, t.occupation, !0),
            e.designation && t.jobtitle && nn(e.designation, t.jobtitle, !0),
            e.username && t.username && nn(e.username, t.username, !0)
        };
    function rn(e) {
        var t = null;
        if (!e)
            return t;
        for (var n = 0, i = e.length, a = 0; n < i; n++) {
            var r = e[n][0],
                l = e[n][1];
            r > a && (a = r, t = l)
        }
        return t
    }
    const ln = (e, t) => {
            e || (e = Jt());
            var n = (e => {
                    var t = {
                        form: [],
                        no_form: {}
                    };
                    if (!e)
                        return t;
                    var n = Object.keys(e);
                    if (0 === document.querySelectorAll('form').length)
                        return {
                            form: [],
                            no_form: e
                        };
                    for (var i = 0, a = n.length; i < a; i++) {
                        var r = n[i];
                        if ('other' !== r)
                            for (var l = e[r], s = 0, o = l.length; s < o; s++) {
                                var d = l[s][1],
                                    u = null;
                                if (d && d.hasForm && (d.htmlID ? u = document.getElementById(d.htmlID).form : d.elementNumber && (u = document.querySelector('[data-enpassid=' + d.elementNumber + ']').form)), u) {
                                    var c = Qt(t.form, u);
                                    if (-1 === c) {
                                        var m = {};
                                        m[r] = [l[s]],
                                        t.form.push({
                                            canbeFilled: d.viewable,
                                            htmlForm: u,
                                            fields: m
                                        })
                                    } else
                                        t.form[c].fields[r] ? (d.viewable && (t.form[c].canbeFilled = d.viewable), t.form[c].fields[r].push(l[s])) : (t.form[c].fields[r] = [l[s]], d.viewable && (t.form[c].canbeFilled = d.viewable))
                                } else
                                    t.no_form[r] ? t.no_form[r].push(l[s]) : t.no_form[r] = [l[s]]
                            }
                    }
                    return t
                })(e),
                i = !1;
            if (n && n.form.length > 0)
                for (var a = n.form, r = 0, l = a.length; r < l; r++) {
                    var s = a[r];
                    s.canbeFilled && (i = !0, an(s.fields, t))
                }
            i || an(e, t)
        },
        sn = ['sign-in', 'log-in', 'signon', 'sign on', 'login', 'log in', 'login_in', 'signin', 'sign in', 'sign_in', 'log on', 'log_on', 'logon', '登 录', '登录', 'Inloggen', 'einloggen', 'giriş', 'zaloguj', 'लॉग इन करें', 'valider', 'accedi', 'anmelden', 'weiter', 'accès', 'вход', 'kirjaudu', 'zaloguj się', 'let me in', 'credentials', 'authentication', 'authenticate'],
        on = ['signup', 'sign_up', 'sign up', 'register', 'create', 'reg', 'join', 'start', 'free', 'trial', 'profile', 'new_user'],
        dn = ['change', 'change-password', 'creditcard', 'dc-form', 'cc-form', 'creditcard-form', 'debitcard-form', 'creditcard-payment-form', 'debitcard-payment-form', 'payment', 'newsletter', 'newsform', 'search'],
        un = (e, t, n) => {
            const i = ['ok', 'next', 'næste', 'let me in', 'go', 'unlock', 'dalej', 'συνέχεια', 'enter', 'get started', 'execute login'];
            let a = ['forgot', 'remember me', 'stay logged in', 'new user', 'view', 'register', 'vergessen', 'already have an account', 'sign in with', 'login with', 'register', 'sign up', 'signup', 'join', 'create', 'регистрация', 'inscription', 'regístrate', 'cadastre-se', 'registrieren', 'registrazione', '注册', 'साइन अप करें', 'change password', 'save changes', 'facebook', 'twitter', 'apple', 'enterprise sso', 'facebook', 'twitter', 'google', 'suchen', 'subscribe'],
                r = [];
            r = n && n.length > 0 ? n : Ke;
            var l = e.htmlValue || e.imageAlt,
                s = !1,
                o = 0;
            if (l && (e.viewable || e.disabled)) {
                if (ge(l, a))
                    return t ? o : s;
                0 === (o += ge(l, r) && !ge(l, a) ? 10 : 0) && (o += ge(l, i) && !ge(l, a) ? 5 : 0),
                o > 0 && (o += e.htmlType && 'submit' === e.htmlType ? 5 : 0, s = !0)
            }
            return (!l || !s && e.viewable) && (o += ge(e.htmlID, r) ? 10 : 0, o += ge(e.htmlName, r) ? 10 : 0, o += ge(e.htmlClass, r) ? 5 : 0, o += P(e.imageAlt, r) ? 10 : 0, (o += P(e.imageSrc, r) ? 10 : 0) >= 10 && (o += e.htmlType && 'submit' === e.htmlType ? 5 : 0, s = !0)), t ? o : s
        },
        cn = e => {
            const t = ['forgot', 'remember me', 'stay logged in', 'new user', 'view', 'register', 'vergessen', 'already have an account', 'sign in with', 'register', 'sign up', 'signup', 'join', 'create my account', 'регистрация', 'inscription', 'regístrate', 'cadastre-se', 'registrieren', 'registrazione', '注册', 'साइन अप करें', 'change password', 'save changes', 'facebook', 'twitter', 'google', 'suchen'],
                n = k(null, 'div[class*=btn],div[class*=button],a[class*=btn],a[class*=button],div[role=button],a[id*=btn],div[class*=Btn],div[class*=Button],a[class*=Btn],a[class*=Button],a[id*=Btn],a[role=button]');
            var i = 0,
                a = null;
            if (n && n.length > 0) {
                var r = [];
                for (let e = 0, t = n.length; e < t; e++) {
                    let t = n[e],
                        i = null;
                    t && (i = Array.prototype.slice.call(t.querySelectorAll('button')), i && i.length > 0 ? r = r.concat(i) : r.push(t))
                }
                for (var l, s = r.length, o = 0; o < s; o++) {
                    var d = 0;
                    if ((l = r[o]) && V(l) && z(l)) {
                        let n = l.textContent || '';
                        if (!n || !n.trim()) {
                            const e = l.getAttribute('aria-label');
                            e && (n = e.toLowerCase().trim())
                        }
                        if ((d += ge(n, Ke) && !ge(n, t) ? 10 : 0) > 0) {
                            var u = l.getAttribute('data-action');
                            if (d += (u = u ? u.replace(/^\s+/m, '').replace(/\s+$/m, '').replace(/\s\s+/, ' ').toLowerCase().trim() : '') && u.indexOf('submit') >= 0 ? 10 : 0, e) {
                                var c = ue(e);
                                c && c.compareDocumentPosition(l) & Node.DOCUMENT_POSITION_FOLLOWING ? d += 10 : d = 0
                            }
                            l.tagName && 'div' === l.tagName.toLowerCase() && l.firstElementChild && (d = d > 0 ? d / 2 : 0),
                            l.tagName && 'a' === l.tagName.toLowerCase() && !l.onclick && l.href && 0 === l.href.indexOf(document.URL) && (d = -100)
                        }
                    }
                    d > 0 && d > i && (i = d, a = l)
                }
            }
            return a
        },
        mn = (e, t, n) => {
            if (!e || 0 === e.length)
                return null;
            var i = (() => {
                if (0 === document.URL.indexOf('https://www.tumblr.com/login')) {
                    var e = document.getElementById('signup_forms_submit');
                    return se(e)
                }
                return null
            })();
            if (i)
                return i;
            var a = B(e, ['submit', 'button', 'image']),
                r = 0,
                l = null;
            if (a && a.length > 0) {
                for (var s = a.length, o = 0; o < s; o += 1) {
                    var d = a[o];
                    if (!n || be(n, d)) {
                        var u = un(d, !0, t);
                        if (u > 0) {
                            if (d.hasForm && n && n.hasForm)
                                u += ce(d) === ce(n) ? 50 : 0;
                            u > r && (r = u, l = d)
                        }
                    }
                }
                return l
            }
            return null
        },
        hn = e => {
            var t = B(e, 'password'),
                n = B(e, 'submit');
            if (3 === (t = t.filter((function(e) {
                return e.visible
            }))).length) {
                var i = t[0].htmlValue,
                    a = t[1].htmlValue,
                    r = t[2].htmlValue,
                    l = ce(t[0]),
                    s = ce(t[1]),
                    o = ce(t[2]);
                if (i === a && i === r)
                    return !1;
                var d = [];
                if (i.length > 0 && -1 === d.indexOf(i) && d.push(i), a.length > 0 && -1 === d.indexOf(a) && d.push(a), r.length > 0 && -1 === d.indexOf(r) && d.push(r), 2 === d.length)
                    return !(l && s && o) || l === s && s === o
            }
            if (B(e, ['text', 'email', 'tel']).length > 0)
                return !1;
            if (2 === t.length) {
                let e = !1;
                n && n.length > 0 && (e = n.some((function(e) {
                    return !!e.htmlValue && 'change password' === e.htmlValue.toLowerCase()
                })));
                let i = t[0] && t[0].htmlValue ? t[0].htmlValue : '',
                    a = t[1] && t[1].htmlValue ? t[1].htmlValue : '';
                return i && a && i === a || e
            }
            if (1 === t.length) {
                if (n && n.length > 0 && un(n[0]))
                    return !1;
                var u = B(e, 'button');
                return !(u.length > 0 && un(u[0])) && (ze(t, Be) || null)
            }
            return !1
        },
        pn = (e, t, n) => {
            if (!e)
                return 0;
            var i = e.htmlType,
                a = 0;
            if (['tel', 'text', 'email', 'password', 'number'].includes(i) || function(e) {
                return 'username' === e.htmlID && 'textarea' === e.htmlType
            }(e)) {
                const d = 'email address,e mail adresse,email or mobile number,email or phone,email id or phone number,username,nutzername,user name,login name,usuari,identificación,identifiant,användar,käyttäjätunnus,user id,登录名,用户名,CPR-nummer,Social Security number,bruger-id,registration number,customer id,online id,login id,personal id,customer number,registered email,account name,member number,membership number,profile number,profile id,profile url,cust no,cust id,uživatelské jméno,benutzerkennung,identyfikator,wpisz login,bank id,provider id,azonosító,identifier,rufnummer / nutzername,felhasználó'.toLowerCase().split(',');
                document.URL.includes('synology.com') && d.push('account');
                var r = /(?:(?:login)|(?:logon.*id)|(?:login.*id)|(?:user)|(?:uname)|(?:user.*(email))|(?:signup.*(email))|(?:profile.*(id|number))|(?:member.*number)|(?:account.*name)|(?:customer.*(number|id))|(?:regist.*(email|number))|(?:cust.*(no|id))|(?:personal.*id)|(?:provider.*id)|(?:online.*id))(?!.*pass)/i;
                let u = /(bot[\W_]|billing|shipping|dummy|fake|name.*card|card.*name|password|user[-_]?pw|dialoginput|otp|code|2fa|verification|authenticator|token|pin|secondfactor|folder|generated|recovery.*phone|remote.* identifier)/i;
                const c = parseInt(e.elementNumber.substr(2)),
                    m = ue(e);
                if ('www.aquado.de' === document.domain && m && (N('focus', m), !V(m)))
                    return N('blur', m), -1e3;
                if ('password' !== i && t && t.length > 0) {
                    if (!t.every((function(e) {
                        return c < e
                    })))
                        return 0
                } else if ('password' === i && t && t.length > 0) {
                    if (t.some((function(e) {
                        return c === e
                    })))
                        return 0
                }
                n && (a += e.htmlValue ? 50 : 0, a += e.userEdited ? 50 : 0),
                a += 'email' === i || e.htmlPlaceholder && 'email' === e.htmlPlaceholder.toLowerCase() ? 1 : 0,
                a += 'password' === i ? -1 : 0;
                var l = 0;
                l += u.test(e.htmlName) ? 10 : 0,
                l += u.test(e.htmlID) ? 10 : 0,
                l += u.test(e.htmlClass) ? 5 : 0,
                l += u.test(e.htmlTitle) ? 5 : 0;
                const h = /password\smanager/gi;
                if (a -= l += u.test(e.htmlLabel) && !h.test(e.htmlLabel) ? 15 : 0, a += r.test(e.htmlName) ? 10 : 0, a += r.test(e.htmlID) ? 10 : 0, a += r.test(e.htmlClass) ? 5 : 0, a += r.test(e.htmlTitle) ? 5 : 0, 0 === (a += 'username' === e.autoCompleteType && e.visible && !e.isOutsideDocument ? 40 : 0)) {
                    var s = /(mobile|phone)/i;
                    a += s.test(e.htmlName) ? 4 : 0,
                    a += s.test(e.htmlID) ? 4 : 0,
                    a += s.test(e.htmlClass) ? 1 : 0,
                    a += s.test(e.htmlTitle) ? 1 : 0
                }
                if (e.userEdited || (a += q(e.htmlValue, d) ? 10 : 0), e.htmlPlaceholder) {
                    a += q(e.htmlPlaceholder, [...d, 'user', 'benutzer']) ? 10 : 0;
                    const t = ['get new deals'];
                    if (0 === (a -= q(e.htmlPlaceholder, t) ? 10 : 0)) {
                        const t = P(e.htmlPlaceholder, ['name']),
                            n = P(e.htmlPlaceholder, ['user']);
                        if (t && !n)
                            return 0
                    }
                    0 === a && (a += P(e.htmlPlaceholder, d) ? 10 : 0),
                    0 === a && P(e.htmlPlaceholder, ['phone', 'mobile']) && P(e.htmlPlaceholder, ['email']) && (a += 10)
                }
                var o = 0;
                if (e.visible && (o += !o && P(e.htmlLabel, d) ? 12 : 0, !e.htmlPlaceholder)) {
                    o += !o && P(e.labelData, d) ? 5 : 0,
                    o += !o && P(e.labelAria, d) ? 5 : 0;
                    const t = new RegExp(u.source + '|search', 'i');
                    o || t.test(e.labelTop) || (o += P(e.labelTop, d) ? 5 : 0),
                    o || t.test(e.labelRight) || (o += P(e.labelRight, d) ? 5 : 0),
                    o || t.test(e.labelLeft) || (o += P(e.labelLeft, d) ? 5 : 0)
                }
                return (a += o) > 0 && (e.viewable ? a >= 10 && (a += 10) : l > 0 ? a = 0 : a >= 10 && (a /= 2)), 'textarea' == e.htmlType && a > 0 && (a /= 2), 0 === a && 'ibank.nbg.gr' === document.location.host && '/identity/login' === document.location.pathname && 'Κωδικός χρήστη' === e.htmlPlaceholder && (a += 10), a
            }
            return 0
        },
        fn = (e, t, n) => {
            if (!e || 0 === e.length)
                return null;
            var i = B(e, 'password');
            i && 0 === i.length && (t = null);
            var a = [];
            a = t ? [t] : i.map((function(e) {
                return parseInt(e.elementNumber.substr(2))
            }));
            for (var r = null, l = -1, s = e.length; s--;) {
                var o = e[s],
                    d = pn(o, a, n);
                d > 0 && d > l && (l = d, r = o)
            }
            return r
        },
        gn = (e, t) => {
            if (!e || 0 === e.length)
                return null;
            var n = e.length,
                i = 0,
                a = null;
            const r = ['password', 'passwort', 'kennwort', 'hasło', 'heslo', 'salasana', 'पासवर्ड', '密码', 'пароль', 'wachtwoord', 'adgangskode', 'contraseña', 'senha', 'mot de passe', '登入密碼', '網路密碼'],
                l = ['password', '密碼'],
                s = ['user password'],
                o = ['loginpass'];
            for (let t = 0; t < n; t += 1) {
                var d = e[t],
                    u = 0;
                if (d.visible && !d.isOutsideDocument && '-1' !== d.tabindex) {
                    P(d.htmlID, o) ? u += 40 : u += P(d.htmlID, l) ? 8 : 0,
                    P(d.htmlName, o) ? u += 30 : u += P(d.htmlName, l) ? 6 : 0,
                    P(d.htmlPlaceholder, s) ? u += 20 : P(d.htmlPlaceholder, Ge) ? u -= 100 : u += P(d.htmlPlaceholder, r) ? 10 : 0;
                    var c = 0;
                    c += !c && P(d.htmlLabel, s) ? 20 : 0,
                    c += !c && P(d.htmlLabel, r) ? 10 : 0,
                    c += c || d.htmlPlaceholder || !P(d.labelTop, r) ? 0 : 5,
                    c += c || d.htmlPlaceholder || !P(d.labelRight, r) ? 0 : 5,
                    c += c || d.htmlPlaceholder || !P(d.labelLeft, r) ? 0 : 5,
                    c += c || d.htmlPlaceholder || !P(d.labelData, r) ? 0 : 5,
                    (u += c += c || d.htmlPlaceholder || !P(d.labelAria, r) ? 0 : 5) > 0 && d.viewable && (u += 20),
                    u > 0 && u > i && (i = u, a = d)
                }
            }
            return a
        },
        bn = (e, t) => {
            if (!e || 0 === e.length)
                return null;
            var n = re(e),
                i = ie(n),
                a = B(i, 'password'),
                r = null,
                l = null,
                s = null;
            if (a && a.length > 0)
                a = (e => {
                    if (!e && 0 === e.length)
                        return [];
                    var t = [];
                    for (let n = 0, i = e.length; n < i; n++) {
                        let i = e[n];
                        ve(i) || t.push(i)
                    }
                    return t
                })(a),
                a = (e => {
                    if (!e && 0 === e.length)
                        return [];
                    const t = ['cvv', 'cvv2', 'cvc2', 'cvv number', 'verification code', 'security code', 'optional', 'dummy'],
                        n = ['dummy', 'bot', 'vcc', 'cardpincode', 'cv2_number', 'ccvnumber', 'ccvnum', 'cvvvnum', 'verifycardcode', 'cardverificationcode', 'dccvv', 'cccvv', 'security_code', 'security-code', 'cardsecuritycode', 'securitycode', 'cc.security', 'cvc_code', 'cvccode', 'cccode', 'cvv', 'cvv2', 'cvv2/cvc2', 'cvv/cvc', 'cardcsc'];
                    for (var i = [], a = e.length; a--;) {
                        var r = e[a],
                            l = 0;
                        'password' === r.htmlType ? (l += r.htmlPlaceholder && P(r.htmlPlaceholder, t) ? 100 : 0, l += r.htmlID && P(r.htmlID, n) ? 100 : 0, document.domain.includes('bankofamerica.com') && r.htmlName.includes('dummy') && r.visible ? l += r.htmlName && P(r.htmlName, t.filter((e => 'dummy' !== e))) ? 100 : 0 : l += r.htmlName && P(r.htmlName, t) ? 100 : 0, l += r.htmlLength && r.htmlLength <= 4 && -1 !== r.htmlLength ? 100 : 0, 0 === (l += r.htmlLabel && !P(r.htmlLabel, ['passwort']) && P(r.htmlLabel, t) ? 100 : 0) && i.push(e[a])) : i.push(e[a])
                    }
                    return i.reverse()
                })(a),
                (r = gn(a)) && P(r.htmlLabel, ['new', 'confirm']) ? ((e, t, n, i) => {
                    if (!(t && e && n && Array.isArray(n)))
                        return !1;
                    const a = t.indexOf(e);
                    if (-1 === a)
                        return !1;
                    const r = (t.substring(0, a) + ' ' + t.substring(a)).split(' ').filter((e => e));
                    let l = r.indexOf(e);
                    return -1 !== l && n.some((e => {
                            const t = r.indexOf(e);
                            if (-1 === t)
                                return !1;
                            let n = !1,
                                a = !1;
                            return i && !i.before || (n = i && i.strictBefore ? t === l - 1 : t < l), i && !i.after || (a = i && i.strictAfter ? t === l + 1 : t > l), n || a
                        }))
                })('password', r.htmlLabel, ['new', 'confirm'], {
                    before: !0,
                    strictAfter: !0,
                    after: !0
                }) && (r = null) : r || (r = (r = a.sort((function(e, t) {
                    return e.htmlValue.length - t.htmlValue.length
                }))) && r.constructor === Array && r.length > 0 && r[0].viewable ? r[0] : null);
            else {
                var o = /((\b|_|-)pin(\b|_|-)|password|passwort|kennwort|(\b|_|-)passe(\b|_|-)|contraseña|senha|密码|adgangskode|hasło|wachtwoord)/i;
                if (i && i.length > 0) {
                    var d = i.filter((function(e) {
                        if ('password' === e.htmlType && (o.test(e.htmlID) || o.test(e.htmlName) || o.test(e.htmlPlaceholder) || o.test(e.htmlLabel) || o.test(e['label-tag']) || o.test(e['label-data']) || o.test(e['label-aria'])) && e.viewable)
                            return !0
                    }));
                    d && d.length > 0 && (r = (r = d.sort((function(e, t) {
                        return e.htmlValue.length - t.htmlValue.length
                    }))) && r.constructor === Array && r.length > 0 ? r[0] : null)
                }
            }
            if (i && i.length > 0 && !(l = r && r.elementNumber ? fn(i, parseInt(r.elementNumber.substr(2)), t) : fn(i, null, t)) && r)
                for (var u = i.length, c = parseInt(r.elementNumber.substr(2)), m = u; m--;) {
                    var h = i[m],
                        p = h.htmlType;
                    if (parseInt(h.elementNumber.substr(2)) < c && 'disc' !== h.cssTextSecurity && ('text' === p || 'email' === p || 'number' === p || 'tel' === p)) {
                        h.labelAria && 'code' === h.labelAria.toLowerCase() || (l = h);
                        break
                    }
                }
            l && r && l === r && ('password' === r.htmlType ? l = null : r = null);
            var f = {};
            if (l) {
                if (((e, t) => {
                    if (e) {
                        var n = /(masked)/i,
                            i = 0;
                        if (i += n.test(e.htmlName) ? 10 : 0, i += n.test(e.htmlID) ? 10 : 0, i += n.test(e.htmlClass) ? 5 : 0, (i += n.test(e.htmlTitle) ? 5 : 0) > 0)
                            return !0
                    }
                })(l) && -1 !== (location.hostname + location.pathname).indexOf('online.citi.com/US')) {
                    var g = re(e, !0),
                        b = ie(g),
                        y = null;
                    b && b.length && (y = r && r.elementNumber ? fn(b, parseInt(r.elementNumber.substr(2)), t) : fn(b, null, t))
                }
                f.userField = l,
                f.userFieldAuthentic = y || null
            }
            if (r) {
                const t = e.filter((e => 'submit' === e.actualType && !e.isOutsideDocument));
                if (1 === t.length && t[0].htmlValue) {
                    const e = t[0].htmlValue.toLowerCase();
                    ge(e, ['save', 'update', 'reset password']) || (f.pswdField = r)
                } else
                    f.pswdField = r
            }
            if (r || l)
                if (s = mn(i, null, r))
                    f.loginButton = {
                        type: 'dict',
                        target: s
                    };
                else {
                    var v = B(e, 'submit');
                    let t = v[0];
                    if (1 === v.length && t && t.visible && !t.isOutsideDocument) {
                        if (!t.htmlValue || !ge(t.htmlValue.toLowerCase(), ['reset password'])) {
                            !function(e, t) {
                                return 'http://www.heroesofnewerth.com/' === document.URL || 'https://www.heroesofnewerth.com/' === document.URL || be(e, t)
                            }(r || l, t) || t.htmlValue && P(t.htmlValue, ['sign up', 'register', 'create', 'join', 'start', 'trial', 'subscribe']) || (f.loginButton = {
                                type: 'dict',
                                target: v[0]
                            })
                        }
                    } else {
                        var w = cn(r);
                        if (w)
                            f.loginButton = {
                                type: 'pointer',
                                target: w
                            };
                        else if ('e-banking.winbank.gr' === document.location.hostname) {
                            const e=f?.pswdField?.tabindex;
                            if (e && '0' !== e) {
                                const t = Number(e) + 1,
                                    n = document.querySelector(`input[tabindex="${t}"]`),
                                    i = n ? se(n) : null;
                                i && un(i) && (f.loginButton = {
                                    type: 'dict',
                                    target: i
                                })
                            }
                        }
                    }
                }
            return f.userField || f.pswdField ? f : null
        },
        yn = e => {
            var t = 0,
                n = 0,
                i = 0,
                a = 0,
                r = [];
            if (!e)
                return t;
            if(e.htmlAction?.endsWith('/search'))
                return -100;
            if (e.fields && (r = re(e.fields))) {
                if (0 === r.length || 1 === r.length && ('submit' === r[0].htmlType || 'button' === r[0].htmlType))
                    return t;
                var l = r.filter((function(e) {
                    return 'button' == e.htmlType
                }));
                if (1 === l.length && l[0].htmlValue)
                    if ('subscribe' === l[0].htmlValue.toLowerCase())
                        return t
            }
            var s = ie(r);
            if (hn(s))
                return t;
            var o = bn(e.fields);
            if (o && (e.loginFields = o, o.userField && (n += o.userField.viewable ? 30 : 10), o.pswdField && (n += o.pswdField.viewable ? 30 : 10), o.loginButton && ('dict' === o.loginButton.type && o.loginButton.target && (n += o.loginButton.target.viewable ? 30 : 10), 'pointer' === o.loginButton.type && o.loginButton.target && (n += j(o.loginButton.target) ? 30 : 10))), t += P(e.htmlID, sn) ? 10 : 0, t += P(e.htmlName, sn) ? 10 : 0, t += P(e.htmlClass, sn) ? 5 : 0, i += P(e.htmlID, dn) ? 10 : 0, i += P(e.htmlName, dn) ? 10 : 0, i += P(e.htmlClass, dn) ? 5 : 0, a += P(e.htmlID, on) ? 5 : 0, a += P(e.htmlName, on) ? 5 : 0, a += P(e.htmlClass, on) ? 5 : 0, i > 0 ? t -= i : a > 0 ? t = n > 0 ? (t + n) / 4 : 5 : t += n, 0 === t) {
                const n = ['passwordreset', 'resetpassword', 'resetpwd'];
                t += P(e.htmlID, n) ? 10 : 0,
                t += P(e.htmlName, n) ? 10 : 0,
                t += P(e.location, n) ? 10 : 0;
                const i = s.filter((e => 'submit' !== e.htmlType || !e.htmlValue || !['cancel'].includes(e.htmlValue.toLowerCase())));
                if (2 === i.length && t > 0) {
                    const n = B(i, 'submit');
                    if (1 === n.length && n[0].htmlValue) {
                        const a = n[0].htmlValue.toLowerCase();
                        if (['continue', 'send password reset email', 'send', 'send email'].includes(a)) {
                            const n = 'submit' === i[0].htmlType ? i[1] : i[0];
                            if (Ie(n))
                                return e.loginFields = {
                                    userField: n
                                }, t + 10
                        }
                    }
                }
            }
            return t
        },
        vn = (e, t) => {
            var n = [],
                i = [],
                a = null;
            if (e)
                i = e;
            else if (n = oe(), (i = me(n)) && i.pageForms && 1 === i.pageForms.length) {
                var r = i.pageForms[0];
                if (r.fields && 1 === r.fields.length && 'password' === r.fields[0].htmlType) {
                    var l = B(n, 'text');
                    l && 1 === l.length && (i = {
                        pageFields: n
                    })
                }
            }
            if (!i)
                return null;
            let s = _n(i);
            if (s)
                return t ? {
                    score: 200,
                    form: s
                } : s;
            if (i && i.pageForms && null !== (a = he(i.pageForms, yn, !0)) && a.score > 0)
                return t ? {
                    score: a.score,
                    form: a.result
                } : a.result;
            if (!a || !a.result) {
                var o = (e => {
                    const t = location.hostname + location.pathname;
                    return e ? e && 0 === e.length ? null : -1 !== t.indexOf('accounts.google.com') ? e[0] : null : null
                })(i.pageForms);
                if (o)
                    return t ? {
                        score: 200,
                        form: o
                    } : o;
                if (i && i.pageFields) {
                    var d = bn(i.pageFields);
                    if (d && Object.keys(d).length > 0)
                        return t ? {
                            score: 1,
                            form: {
                                type: 'login_fields',
                                loginFields: d
                            }
                        } : {
                            type: 'login_fields',
                            loginFields: d
                        }
                }
            }
            return null
        },
        wn = (e, t, n) => {
            if (!e)
                return !1;
            if (e && e.userFieldAuthentic) {
                var i = ue(e.userFieldAuthentic, n);
                i && (i.value = t.username)
            }
            if (e && e.userField) {
                let i = ue(e.userField, n),
                    a = Ie(e.userField) ? t.email || t.username : t.user_name || t.username;
                if (i && a) {
                    i.hasAttribute('value') && i.removeAttribute('value'),
                    i.hasAttribute('readonly') && (i.readOnly = !1),
                    Nt(i) > 0 && t.email && (a = t.email),
                    xe(i, a)
                }
            }
            if (e && e.pswdField) {
                var a = ue(e.pswdField, n),
                    r = !1;
                if ('text' === e.pswdField.htmlType) {
                    var l = k(n, 'input[type=password]');
                    if (l && l.length > 0) {
                        var s = l.filter((function(e) {
                            return !V(e)
                        }));
                        s && s.length > 0 && (A(a, 'focus'), s.forEach((function(e) {
                            V(e) && (e.value = t.password, r = !0)
                        })))
                    }
                }
                if (a && t && t.password && !r) {
                    var o = t.password;
                    if (t.append_2fa_to_password) {
                        var d = Le(t);
                        d && (o = t.password + d)
                    }
                    xe(a, o)
                }
            }
        },
        _n = e => {
            if ('signin.aws.amazon.com' === location.hostname) {
                let t = document.querySelectorAll('.aws-signin-textfield'),
                    n = document.querySelector('#password'),
                    i = document.querySelector('#signin_button');
                if (n && V(n) && i && V(i))
                    return !1;
                if (t && 3 === t.length && e.pageFields) {
                    let t = null,
                        n = null,
                        i = null;
                    for (let a = 0, r = e.pageFields.length; a < r; a++) {
                        let r = e.pageFields[a];
                        if ('resolving_input' === r.htmlID && (t = r), 'next_button' === r.htmlID && (i = r), t && i && n)
                            break
                    }
                    return {
                        loginFields: {
                            userField: t,
                            loginButton: {
                                target: i,
                                type: 'dict'
                            }
                        },
                        type: 'login_fields'
                    }
                }
            }
            return !1
        },
        Ln = (e, t) => {
            if (!(e => {
                if ('www.icloud.com' === location.hostname || 'idmsa.apple.com' === location.hostname) {
                    var t = document.getElementById('sign-in');
                    if (t)
                        return t.click(), setTimeout((function() {
                            t.click()
                        }), 1500), !0
                }
                return !1
            })())
                if (t && t.loginButton) {
                    if ('pointer' === t.loginButton.type && t.loginButton.target && t.loginButton.target.click(), 'dict' === t.loginButton.type && t.loginButton.target) {
                        if (0 === document.URL.indexOf('https://www.tumblr.com/login') && !t.loginButton.target.visible)
                            return;
                        var n = ue(t.loginButton.target, e.idoc);
                        n && n.click()
                    }
                } else if (e.htmlAction && -1 === e.htmlAction.indexOf('.aspx') && 'post' === e.htmlMethod) {
                    var i = t.userField || t.pswdField;
                    if (i) {
                        var a = ue(i, e.idoc);
                        if (a) {
                            var r = a.form;
                            if (r) {
                                var l = r.parentElement,
                                    s = l ? l.tagName : '';
                                s && 'body' !== s.toLowerCase() && fe(a.form)
                            }
                        }
                    }
                }
        },
        In = (e, t) => {
            if (!e || !t)
                return null;
            let n = null;
            const i = 'autofill_onload' === t.autofillType && qn(e);
            return e && 'login_fields' === e.type ? (i || (n = e.loginFields), wn(n, t, e.idoc)) : (n = bn(e.fields), i || wn(n, t, e.idoc)), n
        },
        Tn = (e, {clientData: t, uuid: n}, i) => {
            if (e && t) {
                var a = In(e, t);
                if (!a && e.loginFields) {
                    const n = e.loginFields.userField,
                        i = e.loginFields.pwdField;
                    if (n && !i && Ie(n)) {
                        let e = ue(n);
                        e && xe(e, t.email)
                    }
                }
                var r = !1;
                if (e.fields) {
                    let n = Dn(e.fields);
                    if (n) {
                        let e = ue(n),
                            i = Le(t);
                        e && i && (xe(e, i), r = !0)
                    }
                }
                if (a && t && t.autoSubmit && !ye())
                    new Promise((function(t, n) {
                        setTimeout((() => {
                            a?.loginButton||e?.htmlAction ? (Ln(e, a), r ? n() : t()) : n()
                        }), 600)
                    })).then((function() {
                        return new Promise((function(e) {
                            const i = a.pswdField;
                            i && i.visible && i.viewable ? e() : setTimeout((() => {
                                let i = oe(null, n),
                                    a = me(i),
                                    r = vn(a);
                                if (r) {
                                    const n=r.loginFields?.pswdField;
                                    if (n&&n?.visible&&n?.viewable) {
                                        const n = In(r, t);
                                        ye() ? e() : setTimeout((() => {
                                            Ln(r, n),
                                            e()
                                        }), 200)
                                    } else
                                        e()
                                }
                            }), 2200)
                        }))
                    }), (function() {
                        i({
                            isTotpExist: !0
                        })
                    })).then((function() {
                        let e = 'www.dropbox.com' === document.domain ? 8e3 : 2e3;
                        setTimeout((() => {
                            if (!En(t, {
                                uuid: n
                            }, i)) {
                                let e = 'www.dropbox.com' === document.domain ? 1e4 : 2e3;
                                setTimeout((() => {
                                    En(t, {
                                        uuid: n
                                    }, i)
                                }), e)
                            }
                        }), e)
                    }));
                else
                    i({
                        isTotpExist: !1
                    })
            }
        },
        En = (e, t, n) => {
            let i=t?.uuid,
                a = oe(null, i),
                r = Dn(a);
            if (r) {
                let t = ue(r),
                    i = Le(e);
                if (t && i) {
                    if (xe(t, i), n && n({
                        isTotpExist: !0
                    }), e.autoSubmit) {
                        let e = (e => {
                            var t = mn(e, null);
                            if (!t) {
                                var n = B(e, 'submit');
                                if (n.length > 1) {
                                    var i = n.filter((function(e) {
                                        return e.viewable && e.visible
                                    }));
                                    0 !== i.length && (n = i)
                                }
                                let a = n[0];
                                if (1 !== n.length || !a || !a.visible || a.isOutsideDocument || a.htmlValue && P(a.htmlValue, ['sign up', 'register', 'create', 'join', 'start', 'trial', 'subscribe']))
                                    return cn();
                                t = n[0]
                            }
                            return t ? ue(t) : null
                        })(a);
                        e && e.click()
                    }
                    return !0
                }
                n && n({
                    isTotpExist: !1
                })
            } else
                n && n({
                    isTotpExist: !1
                });
            return !1
        },
        Fn = (e, {clientData: t, uuid: n}, i) => {
            if (e && t)
                if (-1 !== (location.hostname + location.pathname).indexOf('accounts.google.com')) {
                    var a = e && e.fields ? e.fields : [],
                        r = a ? B(a, 'email') : null,
                        l = document.querySelectorAll('input[type="password"]');
                    if (r && 1 === r.length && r[0] && r[0].visible) {
                        var s = ue(r[0]),
                            o = document.querySelector('#next') || document.querySelector('#identifierNext'),
                            d = function() {
                                const e = t?.passkey_exists ?? !1;
                                if (t.password && !e) {
                                    var n = document.getElementsByName('password');
                                    if (n && 1 === n.length)
                                        xe(n[0], t.password);
                                    else
                                        for (var i = 0, a = (l = document.querySelectorAll('input[type="password"]')).length; i < a; i++) {
                                            var r = l[i];
                                            if (r && V(r)) {
                                                xe(r, t.password);
                                                break
                                            }
                                        }
                                }
                            },
                            u = 0,
                            c = [function() {
                                var e = Ie(r[0]) ? t.email || t.username : t.user_name || t.username;
                                xe(s, e)
                            }, function() {
                                o && t.autoSubmit && o.click()
                            }, d, d, function() {
                                const n = t?.passkey_exists ?? !1;
                                if (t.password && !n) {
                                    if (t.autoSubmit) {
                                        var a = document.querySelector('#passwordNext');
                                        if (a)
                                            a.click();
                                        else if (e && 'login_fields' !== e.type) {
                                            var r = ue(e);
                                            r && fe(r)
                                        }
                                    }
                                    i({
                                        isTotpExist: !1
                                    })
                                } else
                                    i({
                                        isTotpExist: !1,
                                        showInlineMenu: !0
                                    })
                            }],
                            m = function() {
                                const e = t?.passkey_exists ?? !1 ? 1 : 200;
                                c[u++](),
                                u < c.length && setTimeout(m, 400 + u * e)
                            };
                        m()
                    } else if (l && l.length > 0) {
                        for (let e = 0, n = l.length; e < n; e++) {
                            const n = l[e];
                            if (n && V(n)) {
                                xe(n, t.password);
                                break
                            }
                        }
                        i({
                            isTotpExist: !1
                        });
                        const e = document.querySelector('#passwordNext') || document.querySelector('#signIn');
                        e && t.autoSubmit && setTimeout((function() {
                            e.click()
                        }), 500)
                    } else
                        Tn(e, {
                            clientData: t,
                            uuid: n
                        })
                } else
                    Tn(e, {
                        clientData: t,
                        uuid: n
                    }, i);
            else
                i({
                    isTotpExist: !1
                })
        },
        Dn = e => {
            var t = [/(auth|authenticator|authorization|authentication|verification|generated|2fa|mfa|two-factor)\W(app|code|token|pin)/i, /(two|2) step verification (code|token)/i, /(two|second|2) factor (auth|token|code)/i, '2 fa code', /[6,six][-,\s]digit code/i, 'pin', 'otp', 'one time code', 'authenticator'],
                n = ['googleauthenticator', 'totp', 'totppin', 'useroathcode', 'twofactorcode', 'totpcode', 'secondfactor', 'twofactortoken', '2fa', /mfa[-_]?code/i, /^twofa$/i, 'twofacode', 'otp', /ga[\W_]code/i, /(authentication|auth|verification)[\W_](code|token|pin)/i],
                i = -1,
                a = ['banking pin'],
                r = null;
            if (!e || e.constructor === Array && !e.length)
                return null;
            e && e.constructor === Object && (e = [e]);
            for (var l = !1, s = 0, o = e.length; s < o; s++) {
                var d = e[s],
                    u = 0;
                if (d.visible && d.viewable && ['text', 'tel', 'number', 'password'].includes(d.htmlType)) {
                    u += ge(d.htmlPlaceholder, t) ? 10 : 0,
                    d.htmlID && d.htmlID.toLowerCase().includes('pin') && ge(d.htmlID, ['member']) ? u -= 50 : u += ge(d.htmlID, n) ? 10 : 0,
                    d.htmlName && d.htmlName.toLowerCase().includes('pin') && ge(d.htmlName, ['member']) ? u -= 50 : u += ge(d.htmlName, n) ? 10 : 0;
                    var c = 0;
                    if (d.htmlLabel && ('password' === d.htmlLabel.toLowerCase() && (c -= 10), d.htmlLabel.toLowerCase().includes('pin') && (l = xn(), P(d.htmlLabel, a) && (c -= 80), (l || d.htmlLength < 6) && (c -= 80)), 0 == c && (c += c || !ge(d.htmlLabel, t) || ge(d.htmlLabel, ['password']) ? 0 : 10), 0 === c && d.htmlLabel.includes('code'))) {
                        const e = ue(d);
                        if (e && e.form && e.form.action) {
                            const t = e.form.action;
                            t.includes('verify') && t.includes('totp') && (c += 5)
                        }
                    }
                    d.htmlPlaceholder && '000000' !== d.htmlPlaceholder && '123456' !== d.htmlPlaceholder || (c += !c && ge(d.labelTop, t) ? 5 : 0, c += !c && ge(d.labelRight, t) ? 5 : 0, c += !c && ge(d.labelLeft, t) ? 5 : 0, c += !c && ge(d.labelData, t) ? 5 : 0, c += !c && ge(d.labelAria, t) ? 5 : 0),
                    0 === c && (c += !c && ge(d.labelAttr, t) ? 5 : 0),
                    (u += c) > 0 && d.viewable && ('password'===d.htmlPlaceholder?.toLowerCase() ? u -= 20 : u += 20),
                    0 === u && (6 !== d.htmlLength && 9 !== d.htmlLength || (u += ge(d.htmlPlaceholder, ['code', '123456']) ? 10 : 0)),
                    0 === u && (u += ['one-time-code'].includes(d.autoCompleteType) ? 10 : 0),
                    0 === u && ge(d.htmlName, ['code']) && !d.htmlLabel && (u += ge(d.labelLeft, ['6 stelligen code eingeben']) ? 10 : 0),
                    u > 0 && u > i && (i = u, r = d)
                }
            }
            return r
        },
        xn = () => {
            var e = document.querySelectorAll('a');
            if (!e)
                return !1;
            for (var t = 0, n = e.length; t < n; t++) {
                var i = e[t].textContent;
                if (i && i.toLowerCase().includes('forgot pin'))
                    return !0
            }
            return !1
        },
        Nn = e => {
            var t = null;
            if (e && e.hasForm) {
                let n = ue(e);
                n && (t = n.form)
            }
            return t
        },
        An = e => {
            var t = [],
                n = [],
                i = [],
                a = [];
            if (e) {
                for (var r = 0, l = e.length; r < l; r++) {
                    var s = e[r],
                        o = null,
                        d = null;
                    if (s.hasForm) {
                        if (!(o = Nn(s)))
                            continue;
                        -1 === (d = t.indexOf(o)) ? (t.push(o), n[d = t.length - 1] ? n[0].push(s) : n.push([s])) : n[d].push(s)
                    } else
                        i.push(s)
                }
                t.length > 0 && (a = ((e, t) => {
                    if (!e)
                        return null;
                    for (var n = [], i = 0, a = e.length; i < a; i++) {
                        var r = {},
                            l = e[i],
                            s = l.getAttribute('action'),
                            o = l.getAttribute('id'),
                            d = l.getAttribute('name'),
                            u = l.getAttribute('method');
                        'string' == typeof s && '' !== s && (r.htmlAction = s),
                        'string' == typeof o && '' !== o && (r.htmlID = o),
                        'string' == typeof d && '' !== d && (r.htmlName = d),
                        'string' == typeof u && '' !== u && (r.htmlMethod = u),
                        t.length > 0 && t[i] && (r.fields = t[i]),
                        ke() || (r.location = l.ownerDocument.URL, r.domain = l.ownerDocument.domain, r.hostname = l.ownerDocument.location.hostname, r.pathname = l.ownerDocument.location.pathname, r.iframeUrl = l.ownerDocument.URL),
                        n.push(r)
                    }
                    return n
                })(t, n));
                var u = {};
                return a.length && (u.pageForms = a), i.length && (u.pageFields = i), Object.keys(u).length ? u : null
            }
        },
        Cn = (e, t) => {
            if (!e || !e.length)
                return null;
            for (var n = null, i = null, a = [], r = [], l = 0; l < e.length; l++) {
                var s = e[l];
                if (s && (s.htmlType, s.htmlValue.length > 0 || s.disabled && s.htmlPlaceholder)) {
                    var o = /(first|last|full)[-_\s]?name/i;
                    if (!(o.test(s.htmlName) || o.test(s.htmlID) || o.test(s.htmlLabel) || o.test(s.labelAria) || o.test(s.autoCompleteType)) && ('text' === s.htmlType || 'email' === s.htmlType || 'tel' === s.htmlType)) {
                        const e = s.htmlValue.toLowerCase();
                        ['dd/mm/yyyy'].includes(e) || r.push(s)
                    }
                    'password' === s.htmlType && s.visible && a.push(s)
                }
            }
            if (a.length > 0) {
                let e = a.length > 2 ? Xt(Be, a, !1, !1, null) : null;
                e && e.length ? (e[0].enpassType = 'password', n = e[0]) : (a.sort((function(e, t) {
                    return t.htmlValue.length - e.htmlValue.length
                })), (n = gn(a)) ? n.enpassType = 'password' : a[0] && (a[0].enpassType = 'password', n = a[0]))
            }
            if (r.length > 0) {
                var d = Xt(Yt, r, !0, !1, null);
                if (d.length > 0 && (d = (d = d.sort((function(e, t) {
                    return t[0] - e[0]
                }))).map((function(e) {
                    return e[1]
                }))), d.length && d[0])
                    d[0].enpassType = 'username',
                    i = d[0];
                else if (1 === r.length && r[0]) {
                    let e = r[0] ? r[0].htmlValue : '';
                    e && e.trim() && (r[0].enpassType = 'username'),
                    i = r[0]
                } else {
                    let e = r.filter((function(e) {
                        if (e && e.htmlLength > 6) {
                            if (e.userEdited && ('username' === e.autoCompleteType || 'email' === e.enpassType))
                                return !0;
                            if (e.disabled && 'email' === e.enpassType && e.htmlPlaceholder)
                                return !0
                        }
                        return !1
                    }));
                    if (e && e.length)
                        e[0].enpassType = 'username',
                        i = e[0];
                    else {
                        let e = r.filter((function(e) {
                            return e && e.htmlLength > 6 && ('username' === e.autoCompleteType || e.userEdited)
                        }));
                        e.length > 0 && e[0] && (e[0].enpassType = 'username', i = e[0])
                    }
                }
            }
            var u = {};
            if (i) {
                let e = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    t = i.htmlValue || i.disabled && i.htmlPlaceholder || '';
                t && e.test(t) ? (u.email = t, i.enpassType = 'email') : u.username = i.htmlValue,
                u.usernameID = i.elementNumber
            }
            return n && (u.password = n.htmlValue, u.passwordID = n.elementNumber), Object.keys(u).length ? u : null
        },
        kn = (e, t) => {
            e || (e = oe(null));
            var n = ie(e),
                i = (e => {
                    if (!e || 0 === e.length)
                        return null;
                    for (var t, n = [], i = !1, a = 0, r = e.length; a < r; a++) {
                        var l = e[a];
                        if (l.userEdited || l.htmlValue && (l.visible || l.viewable) || l.htmlPlaceholder && l.disabled && Ie(l)) {
                            const e = l.htmlValue.toLowerCase();
                            if (['dd/mm/yyyy'].includes(e))
                                continue;
                            if (!/hidden|submit|image|textarea|reset|button/i.test(l.htmlType) || 'username' === (t = l).htmlID && 'textarea' === t.htmlType) {
                                if (!i && l.userEdited)
                                    i = !0;
                                else if (/^enter.*$/i.test(l.htmlValue))
                                    continue;
                                'select-one' === l.htmlType || 'checkbox' === l.htmlType || 'radio' === l.htmlType ? l.userEdited && n.push(l) : n.push(l)
                            }
                        }
                    }
                    return i ? n : []
                })(n);
            if (!(e => {
                if (!e)
                    return !1;
                var t = e.reduce((function(e, t) {
                    return 'password' === t.htmlType && (e.passwordFields += 1, Dn(t) && (e.totpFields += 1)), e
                }), {
                    passwordFields: 0,
                    totpFields: 0
                });
                return 0 !== t.passwordFields && 0 !== t.totpFields && t.passwordFields === t.totpFields
            })(i)) {
                var a = {
                    secure_data: {}
                };
                if (i && i.length) {
                    var r = jn(document.querySelectorAll('input[type=password]')),
                        l = !1;
                    if (0 === r.length)
                        (r = B(i, 'password')).length && (l = r.some((function(e) {
                            return e.visible
                        })));
                    else
                        for (var s = 0, o = r.length; s < o; s++) {
                            var d = r[s];
                            if (d.value && V(d)) {
                                if ('yes' === d.dataset.enpassusermodified) {
                                    l = !0;
                                    break
                                }
                                if (j(d) && d.value.length > 7) {
                                    l = !0;
                                    break
                                }
                            }
                        }
                    if (l) {
                        var u = null;
                        i = (e => {
                            var t = Xt(Nt, e, !0, !1, null);
                            if (t.length > 0) {
                                let n = (t = t.sort((function(e, t) {
                                    return t[0] - e[0]
                                })))[0][1];
                                n && e.map((e => e.elementNumber === n.elementNumber ? (e.enpassType = 'email', e) : e))
                            }
                            return e
                        })(i);
                        var c = An(n),
                            m = An(i);
                        if (c && c.pageForms)
                            for (var h = c.pageForms, p = 0, f = h.length; p < f; p++) {
                                let e = h[p],
                                    n = t || hn(e.fields),
                                    r = n ? Pn(c, e) : null;
                                if (n && r)
                                    return {
                                        type: 'update_password',
                                        secure_data: r,
                                        webform: []
                                    };
                                if (u = Cn([...e.fields])) {
                                    if (a.type = 'update_login', m)
                                        if (m.pageForms && m.pageFields) {
                                            if (a = Sn(i))
                                                return a
                                        } else
                                            m.pageForms && !m.pageFields ? m.pageForms.length > 1 ? (a.webform = [].concat({
                                                htmlId: 'default-form',
                                                htmlName: 'default-form',
                                                fields: On(i, u),
                                                hostname: m.pageForms[1].hostname,
                                                pathname: m.pageForms[1].pathname,
                                                location: we(m.pageForms[1].location),
                                                iframeUrl: m.pageForms[1].location,
                                                domain: m.pageForms[1].domain
                                            }), a.formCaptureType = 'signup') : a.webform = m.pageForms.map((function(e) {
                                                if (e.fields) {
                                                    let t = e.fields.map((function(e) {
                                                        let t = e.elementNumber;
                                                        return u.usernameID && t === u.usernameID && (u.email ? e.enpassType = 'email' : e.enpassType = 'username'), u.passwordID && t === u.passwordID && (e.enpassType = 'password'), e
                                                    }));
                                                    qn(e) ? (a.formCaptureType = 'signup', e && e.location && (e.location = we(e.location))) : a.formCaptureType = 'signin',
                                                    e.fields = On(t, u)
                                                }
                                                return e
                                            })) : a.webform = [];
                                    if (u.username && (a.secure_data.username = u.username, a.secure_data.user_name = u.username), u.email && (a.secure_data.email = u.email), u.password)
                                        return a.secure_data.password = u.password, a
                                }
                            }
                        var g = c && c.pageFields,
                            b = m && m.pageFields;
                        return Sn(g, b)
                    }
                }
                return null
            }
        },
        Sn = (e, t) => {
            if (e) {
                let i = {
                    pageFields: e
                };
                if (hn(i.pageFields)) {
                    let e = Pn(i);
                    if (e)
                        return {
                            type: 'update_password',
                            secure_data: e,
                            webform: []
                        }
                } else {
                    var n = Cn(i.pageFields);
                    if (n) {
                        let i = {
                            type: 'update_login'
                        };
                        return i.secure_data = {
                            password: n.password
                        }, n.email ? i.secure_data.email = n.email : i.secure_data.username = n.username, i.formCaptureType = 'signup', i.webform = [].concat({
                            htmlId: 'default-form',
                            htmlName: 'default-form',
                            fields: On(t || e, n),
                            location: we(document.URL),
                            iframeUrl: document.URL,
                            domain: document.domain,
                            hostname: document.location.hostname,
                            pathname: document.location.pathname
                        }), i
                    }
                }
            }
            return null
        },
        On = (e, t) => e && t ? e.filter((function(e) {
            return !(t && t.password && t.passwordID && e && 'password' === e.htmlType && e.htmlValue === t.password && e.elementNumber !== t.passwordID)
        })) : e,
        Pn = (e, t) => {
            if (!e)
                return null;
            var n = null;
            if (n = He(t ? t.fields : e.pageFields)) {
                var i = '',
                    a = '';
                return n.currentPasswordField && (i = n.currentPasswordField.htmlValue), n.newPasswordField && (a = n.newPasswordField.htmlValue), !a && n.confirmPasswordField && (a = n.confirmPasswordField.htmlValue), a ? {
                    oldPassword: i,
                    newPassword: a,
                    password: a
                } : null
            }
        },
        Mn = (e, t, n) => {
            if (!e || !t)
                return !1;
            var i = O(W(t, 'type')),
                a = W(t, 'name'),
                r = K(t),
                l = V(t),
                s = j(t),
                o = !1;
            if (!i || !e.htmlType || i !== e.htmlType)
                return !1;
            if (o = !0, a && e.htmlName) {
                if (a !== e.htmlName)
                    return !1;
                o = !0
            }
            if (r && e.htmlLabel)
                if (r === e.htmlLabel)
                    o = !0;
                else {
                    if ('meine.deutsche-bank.de' !== document.domain || 0 !== r.indexOf(e.htmlLabel))
                        return !1;
                    o = !0
                }
            return (!n || !n.viewable || s === e.viewable) && (l === e.visible && (!('password' !== i && l !== e.visible && !t.hasAttribute('onfocus')) && o))
        },
        Rn = (e, t) => {
            if (!e)
                return null;
            var n = null;
            const i = (e, t) => Array.prototype.slice.call(e.elements).includes(t);
            if (e.elementNumber && (n = ue(e), Mn(e, n)))
                return t ? i(t, n) ? n : null : n;
            if (e.htmlID) {
                const s = document.getElementById(e.htmlID);
                let o = l(e.htmlID) ? document.querySelectorAll('#' + e.htmlID) : [];
                if (!l(e.htmlID) && s && (o = [s]), 1 == o.length && Mn(e, n))
                    return t ? i(t, n) ? n : null : n;
                if (o.length > 1)
                    for (var a = 0, r = o.length; a < r; ++a)
                        if (n = o[a], Mn(e, n, {
                            viewable: !0
                        }))
                            return t ? i(t, n) ? n : null : n
            }
            if (e.htmlName) {
                var s = document.getElementsByName(e.htmlName);
                for (let a = 0, r = s.length; a < r; ++a)
                    if (n = s[a], Mn(e, n))
                        return t ? i(t, n) ? n : null : n
            }
            return null
        },
        Un = e => {
            if (e && e.length > 0)
                for (var t = 0, n = e.length; t < n; t++) {
                    var i = e[t];
                    if (i) {
                        var a = i.fieldType,
                            r = i.fieldPointer;
                        'checkbox' !== a && 'radio' !== a ? i.fieldValue && xe(r, i.fieldValue, i.userEdited) : 'checkbox' !== a && 'radio' !== a || (r.checked = !0)
                    }
                }
        },
        Bn = (e, t) => {
            if (!e || !t)
                return null;
            const n = t.filter((t => {
                if ('hidden' === t.htmlType)
                    return !1;
                let n = !0,
                    i = 6;
                return t.elementNumber !== e.elementNumber && (i -= 1, n = !1), t.htmlType !== e.htmlType && (i -= 1, n = !1), e.tabindex && t.tabindex !== e.tabindex && (n = !1, i -= 1), e.htmlLabel && t.htmlLabel !== e.htmlLabel && (n = !1, i -= 1), e.htmlPlaceholder && t.htmlPlaceholder !== e.htmlPlaceholder && (n = !1, i -= 1), e.htmlLength && t.htmlLength !== e.htmlLength && (n = !1, i -= 1), e.disabled && t.disabled !== e.disabled && (n = !1, i -= 1), e.viewable !== t.viewable && e.visible !== t.visible && (n = !1, i -= 1), e.labelLeft && t.labelLeft !== e.labelLeft && (n = !1, i -= 1), n && 6 === i
            }));
            if (1 === n.length) {
                let e = n[0];
                return ue(e)
            }
            return null
        },
        Vn = (e, t, n, i, a) => {
            if (!e)
                return !1;
            for (var r = [], l = 0, s = e.length; l < s; ++l) {
                var o = e[l];
                if (o) {
                    if (o.hostname !== location.hostname && o.pathname !== location.pathname)
                        return !1;
                    var d = o.valueMap;
                    if (!d || 0 === Object.keys(d).length)
                        continue;
                    var u = document.querySelector('form[action= "' + o.htmlAction + '"]');
                    if (o.htmlAction && !u) {
                        if (o.htmlID && 'default-form' !== o.htmlID && !document.getElementById(o.htmlID))
                            return !1;
                        if (o.htmlName && 'default-form' !== o.htmlName) {
                            var c = document.getElementsByName(o.htmlName);
                            if (c && 0 === c.length)
                                return !1
                        }
                    }
                    const e = o.fields;
                    let t = null;
                    if (e)
                        for (let i = 0, a = e.length; i < a; i++) {
                            const a = e[i];
                            if (t = Rn(a), !t && n && (t = Bn(a, n.fields)), !t)
                                return !1;
                            r.push({
                                fieldPointer: t,
                                fieldValue: d[a.item_field_uid] || a.htmlValue,
                                fieldType: a.htmlType,
                                userEdited: a.userEdited,
                                enpassType: a.enpassType
                            })
                        }
                }
            }
            if (0 === r.length)
                return a({
                    isTotpExist: !0
                }), !1;
            Un(r);
            let m = null;
            i && n && (m = n.loginFields ? n.loginFields : bn(n.fields), wn({
                userField: m.userField
            }, i, n.idoc));
            let h = En(t, null, a);
            if (t.autoSubmit && !ye()) {
                var p = (e => {
                    if (!e && 0 === e.length)
                        return null;
                    for (var t = [], n = [], i = [], a = 0, r = null, l = 0, s = e.length; l < s; ++l) {
                        var o = e[l];
                        if (o && o.fieldPointer) {
                            var d = o.fieldPointer.form;
                            d && !t.includes(d) && t.push(d),
                            'password' === o.fieldType && n.push(o.fieldPointer)
                        }
                    }
                    if (t && t.length > 0)
                        t.forEach((function(e) {
                            if (e) {
                                var t = e.elements;
                                if (t)
                                    for (var n = 0, a = t.length; n < a; ++n) {
                                        var r = t[n];
                                        ('BUTTON' === r.tagName || 'INPUT' === r.tagName && ['submit', 'button', 'image'].includes(r.type)) && i.push(r)
                                    }
                            }
                        }));
                    else
                        for (var u = document.querySelectorAll('input,button'), c = 0, m = u.length; c < m; ++c) {
                            var h = u[c];
                            ('BUTTON' === h.tagName || 'INPUT' === h.tagName && ['submit', 'button', 'image'].includes(h.type)) && i.push(h)
                        }
                    return i && i.length > 0 && i.forEach((function(e) {
                        var t = se(e);
                        if (t && n && n.length)
                            for (var i = 0, l = n.length; i < l; ++i) {
                                var s = n[i],
                                    o = s.getAttribute('data-enpassid');
                                if (o && t.elementNumber) {
                                    var d = parseInt(o.substr(2));
                                    if (parseInt(t.elementNumber.substr(2)) < d)
                                        continue
                                }
                                var u = un(t, !0, null);
                                u > 0 && (e.form && s.form && e.form === s.form && (u += 50), u > a && (a = u, r = e))
                            }
                    })), r
                })(r);
                if (p || (!m && n ? (m = n.loginFields ? n.loginFields : bn(n.fields), p = m ? m.loginButton : null) : p = m ? m.loginButton : null), p)
                    new Promise((function(e, t) {
                        setTimeout((() => {
                            if ('dict' === p.type) {
                                let e = ue(p.target);
                                e && e.click()
                            } else
                                p.target ? p.target.click() : p.click();
                            e()
                        }), 600)
                    })).then((function() {
                        let e = 'www.dropbox.com' === document.domain ? 8e3 : 2e3;
                        setTimeout((() => {
                            if (h = En(t, null, a), !h) {
                                let e = 'www.dropbox.com' === document.domain ? 1e4 : 2e3;
                                setTimeout((() => {
                                    En(t, null, a)
                                }), e)
                            }
                        }), e)
                    }))
            } else
                a({
                    isTotpExist: !0
                });
            return !0
        },
        qn = (e, t=[], n) => {
            if (!e)
                return !1;
            var i = ['signup', 'sign_up', 'sign up', 'register', 'create', 'reg', 'join', 'start', 'trial', 'reset_password', 'get-started', 'accountsetup'];
            const a = ['sign up', 'register', 'get started', 'join', 'start trial', 'konto erstellen', 'jetzt anmelden', /^create\W?\S?.\W?account$/i],
                r = 'facebook,apple,twitter,linkedin,google,github,back,zurück zum,show password'.split(',');
            let l = 0;
            const s = (e=[]) => {
                const t = e.filter((e => e.visible && e.viewable && ['text', 'email', 'tel'].includes(e.htmlType)));
                if (t && t.length > 0) {
                    const e = Jt(t);
                    if (e) {
                        if (e.fullName && e.fullName.length > 0)
                            return !0;
                        if (e.fname && e.fname.length > 0)
                            return !0
                    }
                }
                return !1
            };
            if ('login_fields' === e.type) {
                const n = e.loginFields ? e.loginFields.pswdField : null,
                    i = ue(n);
                if (i) {
                    let e = Ce(i, 'button');
                    e = e || Ce(i, 'input', 'submit'),
                    e = e || Ce(i, 'input', 'button');
                    const o = t.filter((e => 'password' === e.htmlType));
                    if (o.length > 1) {
                        const e = o.filter((e => !(!e.htmlLabel || !/(confirm|verify|reenter|repeat|re\s?type).+?(new)?.*?(password)/i.test(e.htmlLabel))));
                        if (e.length > 0) {
                            const t = e[0],
                                i = t && t.pointer && n && n.pointer;
                            (t.identifier !== n.identifier || i && t.pointer !== n.pointer) && (l += 10),
                            l > 0 && (l += document.location.pathname.includes('register') ? 10 : 0)
                        }
                    } else {
                        const e = o[0];
                        e && P(e.htmlPlaceholder, Ge) && (l += 20)
                    }
                    if (e) {
                        const n = e.filter((e => {
                            const t = 'INPUT' === e.tagName ? e.value.toLowerCase() : e.textContent.toLowerCase(),
                                n = Array.prototype.slice.call(e.classList),
                                i=n?.some((e => ge(e, r)));
                            return !i && !ge(t, r)
                        }));
                        if (1 === n.length) {
                            const e = n[0] && 'INPUT' === n[0].tagName ? n[0].value.toLowerCase() : n[0].textContent.toLowerCase();
                            ge(e, a) && (l += 20)
                        } else
                            0 === n.length && (l += s(t) ? 10 : 0)
                    }
                } else
                    l += s(t) ? 10 : 0
            } else {
                l += P(e.htmlID, i) ? 5 : 0,
                l += P(e.htmlName, i) ? 5 : 0,
                l += P(e.htmlClass, i) ? 5 : 0,
                l > 0 && (l -= P(e.htmlID, ['createsessionform']) ? 5 : 0);
                const t = P(_e(e.location), i);
                if (n && n.isCreditCard)
                    P(_e(e.location), ['register']) || (l += t ? 5 : 0);
                else {
                    const n = _e(e.location);
                    n?.includes('/login')||e.location?.startsWith('https://signin.') || (l += t ? 5 : 0)
                }
                const o = e.htmlAction;
                if (l > 0 && o) {
                    o.startsWith('/login') || o.endsWith('/login') || o.startsWith('/signin') || o.endsWith('/signin') || 'login' === o ? l -= 10 : -1 !== o.indexOf('/login/') && (l -= 5)
                }
                if (e.fields) {
                    let n = 0;
                    e.fields.filter((e => 'password' === e.htmlType && ('new-password' === e.autoCompleteType || 'new-password' === e.htmlName))).length > 0 && (n += 10);
                    const i = e.fields.filter((function(e) {
                        return ('button' == e.htmlType || 'submit' === e.htmlType) && e.visible
                    }));
                    if (1 === i.length && i[0].htmlValue) {
                        const r = i[0].htmlValue.toLowerCase();
                        ge(r, a) ? l += 20 : ge(r, Ke) && (n = 0, t && 'continue' !== r && e.htmlAction && !e.htmlAction.includes('signup') && (l -= 5))
                    } else {
                        const e = i.filter((e => 'submit' === e.htmlType && !r.includes(e.htmlValue.toLowerCase())));
                        if (1 === e.length && e[0].htmlValue) {
                            const i = e[0].htmlValue.toLowerCase();
                            ge(i, a) ? l += 20 : ge(i, Ke) && (n = 0, t && (l -= 5))
                        } else if (2 === e.length) {
                            const t=e[0].htmlValue?.toLowerCase(),
                                n=e[1].htmlValue?.toLowerCase();
                            let i = [];
                            t && !['clear'].includes(t) && i.push(t),
                            n && !['clear'].includes(n) && i.push(n),
                            1 === i.length && ge(i[0], a) && (l += 20)
                        }
                    }
                    l += n,
                    e.confirmPasswordField && (l += 10),
                    0 === l && e.fields && e.fields.length > 0 && (l += s(e.fields) ? 10 : 0, e && e.cvvField && e.expiryField && (l -= 10))
                }
            }
            return l > 0
        },
        zn = e => {
            const t = /^(what|when|how|how|where|whose|which|in|on|is).*\?/gi;
            var n = 0;
            return n += e.htmlLabel && t.test(e.htmlLabel) ? 2 : 0, n += e.labelData && t.test(e.labelData) ? 2 : 0, n += e.labelAria && t.test(e.labelAria) ? 2 : 0, (n += e.labelAttr && t.test(e.labelAttr) ? 2 : 0) > 0
        },
        jn = e => {
            if (e) {
                var t = [];
                for (let n = 0, i = e.length; n < i; n++) {
                    let i = e[n],
                        a = se(i);
                    !V(i) || zn(a) || ve(a) || t.push(i)
                }
                return t
            }
            return []
        };
    class Wn {
        constructor() {}
        getFieldOrder(e)
        {
            if ('input'===e?.tagName.toLowerCase()) {
                let t = document.querySelectorAll(`${e.tagName}[type=${e.getAttribute('type')}]`),
                    n = Array.prototype.slice.call(t);
                if (n.length > 0) {
                    const t = n.indexOf(e);
                    if (-1 !== t)
                        return t
                }
            }
            return Array.prototype.slice.call(document.querySelectorAll(`${e.tagName}`)).indexOf(e)
        }
        generateFieldIdentifier(e)
        {
            if (e)
                return [e.htmlTag, e.htmlType, e.actualType, e.typeOrder, e.htmlID, e.htmlName, e.htmlPlaceholder, e.autoCompleteType, e.htmlLabel, e.tabindex, e.htmlLength, e.labelAria, e.labelAttr, e.labelData, e.hasForm, e.formId, e.formName, e.formAction, e.htmlValue].join('||')
        }
        deocodeFieldIdentifierAttributes(e)
        {
            if (!e)
                return null;
            const [t, n, i, a, r, l, s, o, d, u, c, m, h, p, f, g, b, y, v] = e.split('||');
            return {
                htmlTag: t,
                htmlType: n,
                typeOrder: a,
                htmlID: r,
                htmlName: l,
                htmlPlaceholder: s,
                autoCompleteType: o,
                htmlLabel: d,
                tabindex: u,
                htmlLength: c,
                labelAria: m,
                labelAttr: h,
                labelData: p,
                hasForm: f,
                formId: g,
                formName: b,
                formAction: y,
                htmlValue: v,
                actualType: i
            }
        }
        extractFieldAttributes(e, t)
        {
            if (!e || ['reset', 'hidden'].includes(O(e.type)))
                return null;
            let n = {};
            const i = O(e.type),
                a = ['ajax', 'csrf'];
            let r = e.maxLength;
            if ((!r || 'number' == typeof r && isNaN(r)) && (r = 999), U(n, 'htmlID', W(e, 'id')), U(n, 'htmlName', W(e, 'name')), (n.htmlID && a.includes(n.htmlID) || n.htmlName && a.includes(n.htmlName)) && 'password' !== i)
                return null;
            if (n.visible = V(e), n.viewable = j(e), n.typeOrder = this.getFieldOrder(e), n.elementNumber = `__${t}`, n.isOutsideDocument = !z(e), n.hasForm = !!e.form, n.formId = n.hasForm && e.form.id || void 0, n.formName = n.hasForm && e.form.name || void 0, n.formAction = n.hasForm && e.form.action || void 0, n.cssTextSecurity = le(e), n.htmlTag = e.tagName, U(n, 'htmlClass', W(e, 'class')), U(n, 'tabindex', W(e, 'tabindex')), U(n, 'htmlTitle', W(e, 'title')), U(n, 'rel', W(e, 'rel')), U(n, 'htmlType', O(W(e, 'type'))), U(n, 'actualType', e.getAttribute('type')), U(n, 'enpassType', 'password' === n.htmlType ? 'password2' : 'text'), e.tagName && 'button' === e.tagName.toLowerCase()) {
                if (U(n, 'htmlValue', (e.textContent || e.value).trim()), !n.htmlValue) {
                    const t = e.querySelector('svg');
                    if (t) {
                        const e = t.getAttribute('aria-label');
                        e && U(n, 'htmlValue', e.trim())
                    }
                }
            } else
                U(n, 'htmlValue', e.value || e.textContent);
            if (n && n.htmlType && 'image' === n.htmlType && (U(n, 'imageAlt', W(e, 'alt')), U(n, 'imageSrc', W(e, 'src'))), U(n, 'checked', e.checked), U(n, 'autoCompleteType', e.getAttribute('x-autocompletetype') || e.getAttribute('autocompletetype') || e.getAttribute('autocomplete')), U(n, 'disabled', e.disabled), U(n, 'readonly', e.readonly), U(n, 'selectOption', R(e)), U(n, 'aria-hidden', 'true' == e.getAttribute('aria-hidden')), U(n, 'aria-disabled', 'true' == e.getAttribute('aria-disabled')), U(n, 'aria-haspopup', 'true' == e.getAttribute('aria-haspopup')), U(n, 'data-unmasked', e.dataset.unmasked), U(n, 'data-stripe', W(e, 'data-stripe')), 'hidden' !== i && 'submit' !== i) {
                U(n, 'htmlLength', r),
                U(n, 'htmlLabel', K(e)),
                U(n, 'labelData', W(e, 'data-label')),
                U(n, 'labelAria', W(e, 'aria-label')),
                U(n, 'labelAttr', W(e, 'label')),
                U(n, 'labelTop', X(e)),
                U(n, 'labelRight', ee(e)),
                U(n, 'labelLeft', J(e));
                var l = W(e, 'placeholder');
                l && !/^\d{2}\/\d{2}\/\d{4}$/.test(l) && U(n, 'htmlPlaceholder', l.trim())
            }
            return n.identifier = this.generateFieldIdentifier(n), n
        }
        getRawFieldFromDict(e)
        {
            const {htmlTag: t, htmlType: n, typeOrder: i, htmlPlaceholder: a, autoCompleteType: r, htmlLabel: l, tabindex: s, hasForm: o, formId: d, formAction: u, htmlValue: c, actualType: m} = this.deocodeFieldIdentifierAttributes(e.identifier),
                h = m,
                p = 'input' === t.toLowerCase() && h ? `${t}[type=${h}]` : `${t}`;
            const f = Array.prototype.slice.call(document.querySelectorAll(`${p}`))[i];
            if (f && f.nodeType === Node.ELEMENT_NODE) {
                const e = this.extractFieldAttributes(f);
                if (!e)
                    return null;
                let i = !0;
                return s && s >= 0 && s !== e.tabindex && (i = !1), r && r !== e.autoCompleteType && (i = !1), a && a !== e.htmlPlaceholder && (i = !1), l && l !== e.htmlLabel && (i = !1), o && o === e.hasForm && (d && d !== e.formId && (i = !1), u && u !== e.formAction && (i = !1)), 'button' !== t && 'submit' !== n || c === e.htmlValue || (i = !1), i ? f : null
            }
            return null
        }
        getTrackedState(e)
        {
            return e.form ? this.assureFormIsTracked(e.form) : this.assureFieldIsTracked(e)
        }
        assureFormIsTracked(e)
        {
            let t = this.formFields.get(e);
            return t || (t = {
                resetValues: new WeakMap,
                fieldsEdited: new WeakSet,
                attributes: new WeakMap,
                totalEditedFields: 0
            }, this.formFields.set(e, t)), t
        }
        assureFieldIsTracked(e)
        {
            let t = this.pageFields.get(e);
            return t || (t = {
                resetValues: new WeakMap,
                fieldsEdited: new WeakSet,
                attributes: new WeakMap,
                totalEditedFields: 0
            }, this.pageFields.set(e, t)), t
        }
        isFieldTacked(e)
        {
            return !!e && (e.form ? this.formFields.has(e.form) && this.formFields.get(e.form).attributes.has(e) : this.pageFields.has(e) && this.pageFields.get(e).attributes.has(e))
        }
        setTackedStateInfo(e, t)
        {
            if (!e)
                return !1;
            e.form && this.formFields.has(e.form) ? this.formFields.set(e.form, t) : this.pageFields.set(e, t)
        }
        trackFormFields(e)
        {
            const t = S(document);
            if (0 === t.length)
                return;
            let n = [];
            t.forEach(((t, i) => {
                const a = this.getTrackedState(t),
                    r = a.attributes.has(t) && 'submit' === t.type && a.attributes.get(t).htmlValue === (t.textContent || t.value).trim(),
                    l = a.attributes.has(t) && a.attributes.get(t).disabled === t.disabled;
                if (e || !a.attributes.has(t) || 'submit' === t.type && !r || !l) {
                    const e = this.extractFieldAttributes(t, i);
                    if (!e)
                        return;
                    if (!e.visible)
                        return;
                    a.resetValues.set(t, e.htmlValue),
                    a.attributes.set(t, e),
                    n.push(e)
                } else
                    n.push(a.attributes.get(t))
            })),
            this.fieldAttributes = n,
            this.categoriesedFieldAttributes = this.categorizeFieldsByForm(this.fieldAttributes)
        }
        categorizeFieldsByForm(e)
        {
            if (!e)
                return null;
            let t = [],
                n = [],
                i = [],
                a = [];
            const r = new WeakSet;
            for (var l = 0, s = e.length; l < s; l++) {
                const a = e[l];
                let s = null,
                    o = null;
                if (!a.htmlType || 'hidden' !== a.htmlType)
                    if (a.hasForm) {
                        const e = this.getRawFieldFromDict(a);
                        if (!e || r.has(e))
                            continue;
                        s=e?.form,
                        o = t.indexOf(s),
                        -1 === o && s ? (t.push(s), o = t.length - 1, n[o] ? n[0].push(a) : n.push([a])):n[o]?.push(a),
                        r.add(e)
                    } else
                        i.push(a)
            }
            t.length > 0 && (a = de(t, n));
            var o = {};
            return a.length && (o.pageForms = a), i.length && (o.pageFields = i), Object.keys(o).length ? o : null
        }
        applyDesignation(e, {type: t, target: n})
        {
            let i = null;
            e instanceof HTMLElement ? i = e : e && 'object' == typeof e && (i = this.getRawFieldFromDict(e)),
            i && !this.designation.has(i) && this.designation.set(i, {
                type: t,
                target: n
            })
        }
        applyDesignationToLoginFields(e)
        {
            if (!e)
                return;
            const {userField: t, pswdField: n} = e;
            this.applyDesignation(t, {
                target: 'username',
                type: 'login'
            }),
            this.applyDesignation(n, {
                target: 'password',
                type: 'login'
            })
        }
        getLoginForms(e)
        {
            if (!e || 0 === e.length)
                return [];
            const t = [];
            for (var n = 0; n < e.length; ++n) {
                yn(e[n]) > 0 && t.push(e[n])
            }
            return t
        }
        detectLoginDesignation()
        {
            let e = this.getLoginForms(this.categoriesedFieldAttributes.pageForms);
            const t = (e, t) => {
                qn(e, t, {
                    isLogin: !0
                }) || e && e.loginFields && this.applyDesignationToLoginFields(e.loginFields)
            };
            if (e.length > 0)
                e.forEach((e => {
                    t(e, this.categoriesedFieldAttributes.pageFields)
                }));
            else {
                const e = vn(this.categoriesedFieldAttributes);
                t(e, this.categoriesedFieldAttributes.pageFields)
            }
        }
        detectCreditCardDesignation()
        {
            let e = Ft(this.categoriesedFieldAttributes, !0);
            qn(e, this.categoriesedFieldAttributes.pageFields, {
                isCreditCard: !0
            }) && (e = null),
            e?.cardNumberField && this.applyDesignation(e.cardNumberField, {
                target: 'ccnumber',
                type: 'credit_card'
            }),
            e?.cvvField && this.applyDesignation(e.cvvField, {
                target: 'cvv',
                type: 'credit_card'
            }),
            e?.cardHolderField && this.applyDesignation(e.cardHolderField, {
                target: 'holderName',
                type: 'credit_card'
            })
        }
        detectChangePasswordDesignation()
        {
            const e = He(this.categoriesedFieldAttributes);
            if (e && (this.applyDesignation(e.currentPasswordField, {
                type: 'login',
                target: 'current_password'
            }), this.applyDesignation(e.newPasswordField, {
                type: 'change_password',
                target: 'new_password'
            }), this.applyDesignation(e.confirmPasswordField, {
                type: 'change_password',
                target: 'confirm_password'
            }), e.htmlAction && e.htmlAction.toLowerCase().includes('resetpassword'))) {
                const t = Zt(e.fields);
                if (t && 1 === t.length) {
                    const e = t[0];
                    this.applyDesignation(e[1], {
                        target: 'login-email-only',
                        type: 'login'
                    })
                }
            }
        }
        detectIdentityDesignation()
        {
            const e = Zt(this.fieldAttributes);
            for (const [, t] of e)
                this.applyDesignation(t, {
                    type: 'identity',
                    target: 'email'
                })
        }
        trackEditedFields(e, t)
        {
            if (!(e instanceof HTMLInputElement || e instanceof HTMLSelectElement))
                return !1;
            if (['checkbox', 'radio'].includes(e.type))
                return !1;
            const n = this.getTrackedState(e);
            return t ? n.fieldsEdited.has(e) && (n.fieldsEdited.delete(e), n.totalEditedFields--) : n.resetValues.get(e) !== e.value ? n.fieldsEdited.has(e) || (n.fieldsEdited.add(e), n.totalEditedFields++) : n.fieldsEdited.has(e) && (n.fieldsEdited.delete(e), n.totalEditedFields--), !!this.is_Field_Form_Dirty(e) && (this.setTackedStateInfo(e, n), !0)
        }
        is_Field_Form_Dirty(e)
        {
            return this.getTrackedState(e).totalEditedFields > 0
        }
        extractEditedData(e, t)
        {
            const n = [],
                i = [],
                a = {};
            let r = !1;
            if (e && 0 === e.length || !t)
                return {
                    secure_data: a,
                    editedFields: n,
                    isPasswordEdited: r
                };
            for (let t = 0, s = e.length; t < s; t++) {
                const s = e[t],
                    o = this.getTrackedState(s),
                    d = o.attributes.get(s),
                    u = !o.resetValues.has(s) || o.resetValues.get(s) === s.value;
                if (!o.fieldsEdited.has(s) && u && (!d || !d.visible || !['text', 'email'].includes(d.htmlType)))
                    continue;
                const c = this.designation.get(s);
                if (['button', 'submit'].includes(d.htmlType) || ne(d))
                    continue;
                const m = s.value;
                if (m && 6 === m.length && /^\d+$/.test(m)) {
                    if (Dn(d))
                        continue
                } else
                    d.htmlValue = m;
                if ('password' === d.htmlType && (r = !0), c) {
                    if (d.enpassType = c.target, ['username', 'email', 'password', 'current_password', 'new_password', 'ccnumber', 'holderName', 'cvv'].includes(c.target)) {
                        let e = Ie(d) && (l = s.value, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(l)) ? 'email' : c.target;
                        e = 'current_password' === e ? 'oldPassword' : e,
                        e = 'new_password' === e ? 'newPassword' : e,
                        a[e] = s.value,
                        d.enpassType = e
                    }
                    if (['current_password'].includes(c.target))
                        continue;
                    if (['new_password'].includes(c.target)) {
                        i.push(d);
                        continue
                    }
                }
                n.push(d)
            }
            var l;
            return 0 === n.length && i.length > 0 && n.push(i[0]), {
                secure_data: a,
                editedFields: n,
                isPasswordEdited: r
            }
        }
        captureEditedData(e, t)
        {
            if (!e)
                return;
            const n = this.getTrackedState(e),
                i = this.getCategoryFromDesignation(t);
            if ('identity' === i)
                return;
            let a = 'update_login';
            'change_password' === i && (a = 'update_password'),
            'credit_card' === i && (a = 'update_creditcard');
            let r = [];
            if (e.form)
                r = Array.prototype.slice.call(e.form.elements);
            else {
                r = S(document).filter((e => !e.form))
            }
            return (({secure_data: t, editedFields: n, isPasswordEdited: i}) => {
                if (n.length > 0) {
                    if (!i || 'update_password' === a || 'update_creditcard' === a)
                        return {
                            secure_data: t,
                            type: a
                        };
                    const r = Ee(e.form);
                    if (r)
                        return {
                            webform: [{
                                ...r,
                                fields: n
                            }],
                            secure_data: t,
                            type: a
                        };
                    {
                        let e = {};
                        return ke() || (e = {
                            location: we(document.URL),
                            iframeUrl: document.URL,
                            domain: document.domain,
                            hostname: document.location.hostname,
                            pathname: document.location.pathname
                        }), {
                            webform: [{
                                fields: n,
                                htmlId: 'default-form',
                                htmlName: 'default-form',
                                ...e
                            }],
                            secure_data: t,
                            type: a
                        }
                    }
                }
            })(this.extractEditedData(r, n))
        }
        getCategoryFromDesignation(e)
        {
            return ['username', 'password', 'email'].includes(e) ? 'login' : ['cvv', 'ccnumber', 'holderName'].includes(e) ? 'credit_card' : ['current_password', 'confirm_password', 'new_password'].includes(e) ? 'change_password' : 'identity'
        }
        isVisibleElement(e)
        {
            return V(e)
        }
    }
    class $n extends Wn {
        constructor(e)
        {
            super(e),
            this.formFields = new WeakMap,
            this.pageFields = new WeakMap,
            this.uuid = window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
            this.fieldAttributes = [],
            this.categoriesedFieldAttributes = null,
            this.editedPasswordFields = new WeakSet,
            this.designation = new WeakMap
        }
        assignDefaultDesignationToPasswordFields(e)
        {
            if ('password' === e.type) {
                const n = this.getTrackedState(e).attributes.get(e),
                    i=n?.htmlLength;
                if (!i || -1 === i || n?.htmlLength > 6) {
                    let i = {
                        type: 'generate_password',
                        target: 'password'
                    };
                    if ((t = n) && t.htmlLabel && ['security answer', 'hint answer'].includes(t.htmlLabel))
                        return null;
                    const a=n?.htmlLabel?.toLowerCase(),
                        r=n?.htmlPlaceholder?.toLowerCase(),
                        l = ['身分證字號', 'token', 'user code', '使用者代碼'];
                    return l.includes(a) || l.includes(r) ? null : (this.applyDesignation(e, i), i)
                }
            }
            var t
        }
        removeAttributeFromFields(e)
        {
            const t = document.querySelectorAll(`[${e}]`);
            t.length > 0 && [...t].forEach((t => {
                t.removeAttribute(e)
            }))
        }
        getDesignation(e)
        {
            if (!e)
                return null;
            if (!this.isFieldTacked(e))
                return this.removeAttributeFromFields('data-enpassid'), this.runTracker(), this.designation.get(e) || this.assignDefaultDesignationToPasswordFields(e);
            {
                const t = this.designation.get(e);
                if (t)
                    return t;
                const n = this.getTrackedState(e).attributes.get(e),
                    i = V(e),
                    a = j(e);
                if (n.visible !== i || n.viewable !== a)
                    return this.runTracker(!0), this.designation.get(e) || this.assignDefaultDesignationToPasswordFields(e);
                if ('password' === e.type)
                    return this.runTracker(), this.designation.get(e) || this.assignDefaultDesignationToPasswordFields(e)
            }
        }
        runTracker(e)
        {
            this.trackFormFields(e),
            this.detectDesignation()
        }
        detectDesignation()
        {
            this.detectChangePasswordDesignation(),
            this.detectLoginDesignation(),
            this.detectCreditCardDesignation(),
            this.detectIdentityDesignation()
        }
    }
    class Hn {
        constructor()
        {
            this.shadowRoot = null,
            this.inlineMenu = null,
            this.isScrollResizeListenerActive = !1,
            this.isValuedField = e => e && e instanceof HTMLInputElement && E.includes(e.type),
            this.createShadowRoot = () => {
                if (document.body)
                    return document.createElement('ENPASS-INLINE-MENU').attachShadow({
                        mode: 'closed'
                    })
            },
            this.createMenu = () => {
                this.shadowRoot && !this.inlineMenu && (this.inlineMenu = document.createElement('iframe'), this.inlineMenu.id = 'enpinmenu', this.setMenuSource())
            },
            this.setMenuSource = ({locked: e, frameID: t, target: n, type: i, menuID: a, url: r, edited: l, shortcut: s, locale: o, theme: d, active_uuid: u, iframeURL: c}) => {
                let m = T.getState().locked;
                if (!this.inlineMenu)
                    return;
                const h = new URL(g('injected/menu/index.html'));
                h.searchParams.append('locked', m),
                h.searchParams.append('active_uuid', u),
                h.searchParams.append('parent_identifier', t),
                h.searchParams.append('parent_url', c || r),
                h.searchParams.append('menu_id', a),
                h.searchParams.append('target', n),
                h.searchParams.append('type', i),
                h.searchParams.append('edited', l),
                h.searchParams.append('shortcut', s),
                h.searchParams.append('lang', o),
                h.searchParams.append('theme', d),
                this.inlineMenu.src = h.toString()
            },
            this.focus = () => {
                this.inlineMenu && this.inlineMenu.focus()
            },
            this.show = () => {
                this.inlineMenu && this.inlineMenu.parentNode && 'visible' !== this.inlineMenu.style.visibility && (this.inlineMenu.style.visibility = 'visible')
            },
            this.hide = () => {
                this.inlineMenu && this.inlineMenu.parentNode && 'hidden' !== this.inlineMenu.style.visibility && (this.inlineMenu.style.visibility = 'hidden')
            },
            this.isHidden = () => {
                const e = this.inlineMenu;
                if (e)
                    return !(!e.parentNode || 'hidden' !== e.style.visibility)
            },
            this.updatePosition = (e, t) => {
                if (!this.inlineMenu)
                    return !1;
                const {activeFieldRect: n, activeFieldDir: i} = e;
                return this.positionMenu({
                    rect: n,
                    dir: i,
                    frameInfo: t,
                    forceVisibility: !0
                }), !0
            },
            this.positionMenu = ({dir: e, rect: t, frameInfo: n, forceVisibility: i}) => {
                if (this.inlineMenu) {
                    const {left: a, right: l, top: s, height: o} = t;
                    let d = 'rtl' === e ? window.innerWidth - l : a,
                        u = s + o + 2;
                    if (n) {
                        const i = r(n);
                        if (i) {
                            const {top: a, left: r, right: l} = i.frame.getBoundingClientRect();
                            u = t.y + o + 2 + a,
                            d = t.x + ('rtl' === e ? n.width - l : r)
                        }
                    }
                    this.inlineMenu.style.cssText = `\n                    all: initial;\n                    position: fixed;\n                    top: ${u}px;\n                    ${'rtl' === e ? 'right' : 'left'}: ${d}px;\n                    z-index: 2147483989;\n                    min-width: 240px;\n                    width:300px;\n                    max-width: 300px;\n                    min-height: 0px;\n                    height: 192px;\n                    max-height: 192px;\n                    border: none;\n                    border-radius: 6px;\n                    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 2px 24px rgba(0, 0, 0, 0.07);\n                    outline: 0;\n                    visibility:${i ? 'visible' : 'hidden'};\n                `
                }
            },
            this.resize = (e, t) => {
                this.inlineMenu && this.inlineMenu.parentNode && (e && (this.inlineMenu.style.width = e + 'px'), t && (this.inlineMenu.style.height = t + 'px'))
            },
            this.draw = e => {
                this.shadowRoot = this.createShadowRoot(),
                this.inlineMenu = document.createElement('iframe'),
                this.inlineMenu.id = 'enpinmenu',
                this.shadowRoot && (this.setMenuSource(e), this.shadowRoot.appendChild(this.inlineMenu))
            },
            this.attach = (e, t) => {
                if (this.inlineMenu)
                    return !1;
                const {activeFieldRect: n, activeFieldDir: i, frameInfo: a} = e,
                    r = a ? a.uuid : t.frameID;
                return this.draw({
                    ...t,
                    active_uuid: r,
                    iframeURL:a?.src
                }), !(!this.shadowRoot || this.shadowRoot.host.parentElement) && (this.positionMenu({
                    rect: n,
                    dir: i,
                    frameInfo: a
                }), document.body.appendChild(this.shadowRoot.host), this.addScrollResizeEventListener(), !0)
            },
            this.dettach = () => {
                this.shadowRoot && this.shadowRoot.host.parentElement && (document.body.removeChild(this.shadowRoot.host), this.shadowRoot = null, this.inlineMenu = null, this.isScrollResizeListenerActive && (window.removeEventListener('scroll', this.onScrollOrResize, !0), window.removeEventListener('resize', this.onScrollOrResize, !0), this.isScrollResizeListenerActive = !1))
            },
            this.onScrollOrResize = e => {
                'MARQUEE' !== e.target.tagName && this.isScrollResizeListenerActive && (window.removeEventListener('scroll', this.onScrollOrResize, !0), window.removeEventListener('resize', this.onScrollOrResize, !0), this.isScrollResizeListenerActive = !1, this.dettach())
            },
            this.addScrollResizeEventListener = () => {
                this.isScrollResizeListenerActive || (window.addEventListener('scroll', this.onScrollOrResize, !0), window.addEventListener('resize', this.onScrollOrResize, !0), this.isScrollResizeListenerActive = !0)
            }
        }
    }
    class Kn {
        constructor()
        {
            this.isValuedField = e => e && e instanceof HTMLInputElement && E.includes(e.type) && !e.readOnly,
            this.isSelfResource = (e, t) => !(!t || !e) && (!!(t instanceof Element && t.tagName && ['enpass-inline-menu', 'enpass-inline-button'].includes(t.tagName.toLowerCase())) || !(!e || t !== e))
        }
    }
    class Gn extends Kn {
        constructor(n)
        {
            super(n),
            t && (this.menuManager = new Hn),
            this.buttonManager = new F,
            this.formManager = new $n,
            this.options = n || {
                dettachMode: !1
            },
            this.positionTimer = null;
            const {activeField: i, inlineDisabled: l, frameID: s} = T.getState();
            this.activeField = i,
            this.isDisabled = l,
            this.frameIdentifier = s,
            this.shortcut = void 0,
            this.fetchCrossFrameInfo = () => {
                const {frameID: e, activeField: t} = T.getState(),
                    n=this.formManager?.getDesignation(t),
                    i=this.formManager?.is_Field_Form_Dirty(t),
                    {activeFieldRect: a, activeFieldDir: r} = T.getState();
                return n ? {
                    fieldInfo: {
                        edited: i,
                        designation: n,
                        activeFieldRect: a,
                        activeFieldDir: r
                    },
                    frameInfo: {
                        uuid: e,
                        width: window.innerWidth,
                        height: window.innerHeight,
                        src: window.location.href,
                        name: window.name
                    }
                } : null
            },
            this.toggleMenuDisplay = (e, t) => {
                const {menuOpen: n, autoDisplayMenu: i} = T.getState();
                i ? n && (this.menuManager?.dettach(), T.dispatch({
                    type: 'MENU_DISPLAY_STATUS',
                    payload: !1
                })) : this.attachMenuToRect(e, t),
                T.dispatch({
                    type: 'SET_TOGGLMENU_DISPLAY'
                })
            },
            this.buttonManager.onClick = e => {
                const n = this.fetchCrossFrameInfo();
                t ? this.toggleMenuDisplay(n.fieldInfo) : n && (T.dispatch({
                    type: 'SET_TOGGLMENU_DISPLAY'
                }), y.setToggleDisplay(n))
            },
            this.toggleDettachMode = e => {
                if (this.options = {
                    ...this.options,
                    dettachMode: e
                }, !this.options.dettachMode) {
                    const e = document.activeElement;
                    e && this.isValuedField(e) && T.dispatch({
                        type: 'SET_ACTIVE_FIELD',
                        payload: e
                    })
                }
            },
            this.init = e => {
                T.dispatch({
                    type: 'INIT_STATE'
                }),
                this.options?.dettachMode && T.dispatch({
                    type: 'AUTOLOGIN_IN_EXECUTION',
                    payload: !0
                }),
                window.addEventListener('focusin', this.onFocus, !0),
                window.addEventListener('mousedown', this.onMouseDown, !0),
                window.addEventListener('keydown', this.keyHandler, !0),
                window.addEventListener('input', this.onInputchange, !0),
                window.addEventListener('scroll', this._onScrollOrResize, !0),
                window.addEventListener('resize', this._onScrollOrResize, !0);
                const t = document.activeElement;
                if (t && this.isValuedField(t) && !this.options.dettachMode) {
                    const {activeField: e} = T.getState();
                    if (t === e)
                        return;
                    T.dispatch({
                        type: 'SET_ACTIVE_FIELD',
                        payload: t
                    })
                }
            },
            this.onFocus = e => {
                const {target: t} = e,
                    {activeField: n, inlineDisabled: i, menuID: a} = T.getState();
                i || this.isValuedField(t) && (n ? n !== t ? (T.dispatch({
                    type: 'REMOVE_ACTIVE_FIELD'
                }), T.dispatch({
                    type: 'SET_ACTIVE_FIELD',
                    payload: t
                })) : y.setBlurOnInlineMenu({
                    token: a
                }) : T.dispatch({
                    type: 'SET_ACTIVE_FIELD',
                    payload: t
                }))
            },
            this.onMouseDown = n => {
                const {target: i} = n,
                    {activeField: a, frameID: r} = T.getState();
                if (y.notifyIframes({
                    event_type: 'mousedown',
                    target_iframe: r
                }), !a)
                    return t && this.removeMenu(), void (this.isValuedField(i) && document.activeElement === i && T.dispatch({
                        type: 'SET_ACTIVE_FIELD',
                        payload: i
                    }));
                if ('SAFARI' === e() && y.checkSafariConnection(), this.isSelfResource(a, i)) {
                    if (i instanceof Element && i.tagName && ['enpass-inline-button'].includes(i.tagName.toLowerCase()))
                        return;
                    T.dispatch({
                        type: 'AUTOLOGIN_IN_EXECUTION',
                        payload: !1
                    }),
                    this.attach(a)
                } else
                    t ? T.dispatch({
                        type: 'REMOVE_ACTIVE_FIELD'
                    }) : (y.removeAttachedMenu(), T.dispatch({
                        type: 'REMOVE_ACTIVE_FIELD'
                    }), this.buttonManager?.dettach()),
                    T.dispatch({
                        type: 'AUTOLOGIN_IN_EXECUTION',
                        payload: !1
                    })
            },
            this.attachMenu = (e, n) => {
                y.fetchMenuSettings({
                    uuid: this.frameIdentifier
                }),
                y.onMenuSettings(((i, r) => {
                    if (this.frameIdentifier !== i.uuid)
                        return;
                    this.menuManager?.dettach();
                    let l = !1;
                    if (i) {
                        const {shortcut: t, theme: r} = i;
                        l = n.locked?this.menuManager?.attach(e, {
                            ...n,
                            shortcut: a(t),
                            theme: r
                        }):this.menuManager?.attach(e, {
                            ...n,
                            theme: r
                        })
                    } else
                        l=this.menuManager?.attach(e, {
                            ...n,
                            theme: '0'
                        });
                    l && y.onRemoveMenu(((e, n) => {
                        t && (this.removeMenu(), this.buttonManager?.dettach()),
                        n()
                    })),
                    r()
                }))
            },
            this.attachMenuToRect = (e, t) => {
                const {locked: n, frameID: i, url: a, menuOpen: r, locale: l} = T.getState();
                if (r)
                    return;
                const s = window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
                T.dispatch({
                    type: 'UPDATE_MENU_ID',
                    payload: s
                });
                const {activeFieldRect: o, activeFieldDir: d, designation: u} = e,
                    {type: c, target: m} = u,
                    h = {
                        locked: n,
                        frameID: i,
                        menuID: s,
                        type: c,
                        target: m,
                        url: a,
                        edited: e.edited,
                        locale: l
                    };
                this.attachMenu({
                    activeFieldRect: o,
                    activeFieldDir: d,
                    frameInfo: t
                }, h)
            },
            this.trackFieldPosition = () => {
                this.positionTimer && (clearInterval(this.positionTimer), this.positionTimer = null),
                this.positionTimer = setInterval((() => {
                    const {activeFieldRect: e, activeField: n} = T.getState();
                    if (n && !n.matches(':focus'))
                        return void (n.isConnected&&this.formManager?.isVisibleElement(n) || (T.dispatch({
                            type: 'REMOVE_ACTIVE_FIELD'
                        }), this.dettach()));
                    const i=n?.getBoundingClientRect();
                    if (e && i) {
                        const a = e.top !== i.top,
                            r = e.left !== i.left,
                            l = e.width !== i.width;
                        if (a || r || l) {
                            if (!this.formManager?.isVisibleElement(n))
                                return;
                            if(this.formManager?.is_Field_Form_Dirty(n)) {
                                T.dispatch({
                                    type: 'UPDATE_ACTIVE_FIELD_RECT',
                                    payload: i
                                }), this.buttonManager?.setStyle(n);
                                const e = this.fetchCrossFrameInfo();
                                e && (t ? this.updateMenuPosition(e.fieldInfo) : y.updateMenuPosition(e))
                            } else {
                                t ? (this.menuManager?.dettach(), T.dispatch({
                                    type: 'MENU_DISPLAY_STATUS',
                                    payload: !1
                                })) : y.removeAttachedMenu(),
                                T.dispatch({
                                    type: 'UPDATE_ACTIVE_FIELD_RECT',
                                    payload: i
                                }), this.buttonManager?.setStyle(n);
                                const e = this.fetchCrossFrameInfo();
                                e && (t ? this.attachMenuToRect(e.fieldInfo) : y.attachMenuToRect(e))
                            }
                        }
                    }
                }), 50)
            },
            this.updateMenuPosition = (e, t) => {
                const {menuOpen: n, menuID: i} = T.getState();
                n ? (this.menuManager?.updatePosition(e, t), y.fetchResizeHeight({
                    token: i
                })) : this.attachMenuToRect(e, t)
            },
            this.attach = e => {
                const {autoLoginExecuted: n, autofillInOperation: i, menuOpen: a, autoDisplayMenu: r, frameID: l} = T.getState();
                if (n || i)
                    return !0;
                const s=this.formManager?.getDesignation(e),
                    o=this.formManager?.is_Field_Form_Dirty(e),
                    {activeFieldRect: d, activeFieldDir: u} = T.getState();
                s && (this.buttonManager?.attach(e), r && (t ? a || (this.attachMenuToRect({
                    edited: o,
                    designation: s,
                    activeFieldRect: d,
                    activeFieldDir: u
                }), this.trackFieldPosition()) : this.isValuedField(e) && (y.attachMenuToRect({
                    fieldInfo: {
                        edited: o,
                        designation: s,
                        activeFieldRect: d,
                        activeFieldDir: u
                    },
                    frameInfo: {
                        uuid: l,
                        width: window.innerWidth,
                        height: window.innerHeight,
                        src: window.location.href,
                        name: window.name
                    }
                }), this.trackFieldPosition())))
            },
            this.dettach = () => {
                t?this.menuManager?.dettach() : y.removeAttachedMenu(),
                this.positionTimer && (clearInterval(this.positionTimer), this.positionTimer = null), this.buttonManager?.dettach()
            },
            this.onActiveFieldChange = e => {
                this.dettach(),
                this.activeField = e,
                e && this.attach(e)
            },
            this.onSettingChange = e => {
                this.isDisabled = e,
                e ? this.dettach() : this.init()
            },
            this.attachMenuOnKeyDown = e => {
                const {menuOpen: t, locked: n, menuID: i} = T.getState();
                if (t) {
                    if (n)
                        return;
                    y.setFocusOnlineMenu({
                        token: i
                    }),
                    setTimeout((() => {
                        this.menuManager?.focus()
                    }), 1)
                } else
                    this.attachMenuToRect(e.fieldInfo, e.frameInfo),
                    T.dispatch({
                        type: 'SET_TOGGLMENU_DISPLAY'
                    })
            },
            this.dettachMenuOnKeyEvent = () => {
                this.menuManager?.dettach(),
                T.dispatch({
                    type: 'MENU_DISPLAY_STATUS',
                    payload: !1
                }),
                T.dispatch({
                    type: 'SET_TOGGLMENU_DISPLAY'
                })
            },
            this.keyHandler = e => {
                const {menuOpen: n, activeField: i, activeFieldRect: a, activeFieldDir: r, frameID: l, autoDisplayMenu: s} = T.getState();
                if ('Escape' === e.key && (t && i && n ? this.dettachMenuOnKeyEvent() : (T.dispatch({
                    type: 'SET_TOGGLMENU_DISPLAY'
                }), y.dettachMenuOnKeyEvent())), 'ArrowDown' === e.key) {
                    const e=this.formManager?.getDesignation(i);
                    if (!e)
                        return;
                    const n=this.formManager?.is_Field_Form_Dirty(i),
                        o = {
                            edited: n,
                            designation: e,
                            activeFieldRect: a,
                            activeFieldDir: r
                        };
                    i && (t ? this.attachMenuOnKeyDown({
                        fieldInfo: o
                    }) : (s || T.dispatch({
                        type: 'SET_TOGGLMENU_DISPLAY'
                    }), y.attachMenuOnKeyDown({
                        fieldInfo: o,
                        frameInfo: {
                            uuid: l,
                            width: window.innerWidth,
                            height: window.innerHeight,
                            src: window.location.href,
                            name: window.name
                        }
                    })))
                }
            },
            this.onInputchange = e => {
                const {frameID: t} = T.getState();
                e.target === this.activeField && y.searchItem({
                    text: e.target.value,
                    token: t
                });
                const {autofillInOperation: n} = T.getState(),
                    i=this.formManager?.trackEditedFields(e.target, n);
                y.sendDirtyFieldStatus({
                    isDirty: i,
                    token: t
                })
            },
            this._onScrollOrResize = e => {
                if ('MARQUEE' === e.target.tagName)
                    return;
                const {activeField: n} = T.getState();
                n && T.dispatch({
                    type: 'SET_ACTIVE_FIELD',
                    payload: n
                }),
                t ? this.removeMenu() : y.removeAttachedMenu()
            },
            this.removeMenu = () => {
                clearInterval(this.positionTimer),
                this.positionTimer = null, this.menuManager?.dettach(),
                T.dispatch({
                    type: 'MENU_DISPLAY_STATUS',
                    payload: !1
                });
                const {activeField: e} = T.getState();
                e && (window.focus(), e.focus())
            },
            this.calculateNestedIframeInfo = e => {
                if (!e || !e.frameInfo)
                    return null;
                const {fieldInfo: t, frameInfo: n} = e,
                    i = r(n);
                if (!i)
                    return null;
                const a = {
                        uuid: n.uuid,
                        width: window.innerWidth,
                        height: window.innerHeight,
                        src: window.location.href,
                        name: window.name
                    },
                    {top: l, left: s, right: o} = i.frame.getBoundingClientRect(),
                    d = t.activeFieldRect;
                return {
                    fieldInfo: {
                        ...t,
                        activeFieldRect: {
                            ...d,
                            x: d.x + ('rtl' === t.activeFieldDir ? n.width - o : s),
                            y: d.y + l
                        }
                    },
                    frameInfo: a,
                    travelledFrames: [...e.travelledFrames ? e.travelFrames : [], T.getState().frameID]
                }
            },
            this.removeInlineButton = () => {
                this.buttonManager?.dettach()
            },
            this.release = () => {
                window.removeEventListener('focusin', this.onFocus, !0),
                window.removeEventListener('mousedown', this.onMouseDown, !0),
                window.removeEventListener('keydown', this.keyHandler, !0),
                window.removeEventListener('input', this.onInputchange, !0),
                window.removeEventListener('scroll', this._onScrollOrResize, !0),
                window.removeEventListener('resize', this._onScrollOrResize, !0),
                this.dettach(),
                this.menuManager = null,
                this.buttonManager = null,
                this.formManager = null,
                this.options = void 0,
                this.positionTimer = null,
                this.activeField = null,
                this.isDisabled = !0,
                this.frameIdentifier = void 0,
                this.shortcut = void 0,
                this.unsubscribe()
            },
            this.unsubscribe = T.subscribe((() => {
                const {activeField: e, inlineDisabled: t, autoDisplayMenu: n, menuOpen: i, frameID: a} = T.getState();
                this.activeField !== e && this.onActiveFieldChange(e),
                this.isDisabled
            })),
            y.onUnlockAttach((e => {
                if (e.uuid !== this.frameIdentifier)
                    return;
                const {activeField: n} = T.getState(),
                    i = this.fetchCrossFrameInfo();
                i && (t && n ? this.attachMenuToRect(i.fieldInfo) : y.attachMenuToRect(i))
            })),
            y.onInlineMenuDisplayStatus((e => {
                const {menuID: t} = T.getState();
                t && e && e.token
            })),
            y.onSetFieldFocus((e => {
                const {frameID: t, activeField: n} = T.getState();
                t && e && e.token === t && n && (window.focus(), n.focus())
            })),
            y.onResizeMenu((({width: e, height: n, token: i}) => {
                t&&this.menuManager?.resize(e, n)
            })),
            y.onMenuReadyToShow((e => {
                const {menuID: t} = T.getState();
                t && e && e.token === t && (T.dispatch({
                    type: 'MENU_DISPLAY_STATUS',
                    payload: !0
                }), e&&this.menuManager?.resize(e.width, e.height), this.menuManager?.isHidden()&&this.menuManager?.show())
            })),
            y.getInlineSetting({
                uuid: this.frameIdentifier
            }),
            y.onInlineSettingResult(((e, t) => {
                if (!e || e.uuid !== this.frameIdentifier)
                    return;
                const {locked: n} = e;
                T.dispatch({
                    type: 'UPDATE_LOCK_STATUS',
                    payload: n
                }),
                this.init(),
                t()
            })),
            y.onIframeNotification((e => {
                const {frameID: t} = T.getState();
                e?.target_iframe !== t && (T.dispatch({
                    type: 'REMOVE_ACTIVE_FIELD'
                }), 'mousedown'===e?.event_type && (this.menuManager?.dettach(), this.buttonManager?.dettach(), T.dispatch({
                    type: 'MENU_DISPLAY_STATUS',
                    payload: !1
                })))
            })),
            y.onLockStateUpdated(((e, t) => {
                const {locked: n, activeField: i, menuOpen: a} = T.getState();
                if (T.dispatch({
                    type: 'UPDATE_LOCK_STATUS',
                    payload: e.locked
                }), n !== e.locked) {
                    i && this.buttonManager && this.buttonManager.setStyle(i);
                    const t = 'object' == typeof safari && safari.extension;
                    !e.locked && a && t ? y.continueOnUnlock() : (this.menuManager?.dettach(), T.dispatch({
                        type: 'MENU_DISPLAY_STATUS',
                        payload: !1
                    }))
                }
            })),
            y.onSaveInputData((({designation: e, token: t}) => {
                const {frameID: n} = T.getState();
                if (!n || t !== n)
                    return;
                const {activeField: i, url: a} = T.getState();
                if (i) {
                    const t=this.formManager?.captureEditedData(i, e);
                    t && y.saveLoginData({
                        ...t,
                        url: a,
                        isManual: !0
                    }),
                    T.dispatch({
                        type: 'REMOVE_ACTIVE_FIELD'
                    })
                }
            })),
            y.onToggleDisplay((e => {
                if (t && e) {
                    if (e.frameInfo) {
                        r(e.frameInfo) && this.toggleMenuDisplay(e.fieldInfo, e.frameInfo)
                    }
                } else {
                    if (!e || e.frameInfo && e.frameInfo.uuid === s || e.travelledFrames && e.travelledFrames.includes(s))
                        return;
                    const t = this.calculateNestedIframeInfo(e);
                    t && y.setToggleDisplay(t)
                }
            })),
            y.onAttachMenuRect((e => {
                const {frameID: n} = T.getState();
                if (t) {
                    const {menuOpen: t, menuID: n} = T.getState();
                    t ? 'keydown' === e.event && (y.setFocusOnlineMenu({
                        token: n
                    }), setTimeout((() => {
                        this.menuManager?.focus()
                    }), 1)) : this.attachMenuToRect(e.fieldInfo, e.frameInfo)
                } else {
                    if (!e || e.frameInfo && e.frameInfo.uuid === n || e.travelledFrames && e.travelledFrames.includes(n))
                        return;
                    const t = this.calculateNestedIframeInfo(e);
                    t && y.attachMenuToRect(t)
                }
            })),
            y.onAttachMenuOnKeyDown((e => {
                if (t && e) {
                    if (e.frameInfo) {
                        r(e.frameInfo) && this.attachMenuOnKeyDown(e)
                    }
                } else {
                    if (!e || e.frameInfo && e.frameInfo.uuid === s || e.travelledFrames && e.travelledFrames.includes(s))
                        return;
                    const t = this.calculateNestedIframeInfo(e);
                    t && y.attachMenuOnKeyDown(t)
                }
            })),
            y.onRemoveAttachedMenu((() => {
                this.removeMenu()
            })),
            y.onDettachMenuOnKeyEvent((() => {
                t && this.dettachMenuOnKeyEvent()
            })),
            y.onUpdateMenuPosition((e => {
                t && e && this.updateMenuPosition(e.fieldInfo, e.frameInfo)
            }))
        }
    }
    var Yn,
        Xn = {
            exports: {}
        };
    Yn = Xn,
    function(e, t, n) {
        if (e) {
            for (var i, a = {
                    8: 'backspace',
                    9: 'tab',
                    13: 'enter',
                    16: 'shift',
                    17: 'ctrl',
                    18: 'alt',
                    20: 'capslock',
                    27: 'esc',
                    32: 'space',
                    33: 'pageup',
                    34: 'pagedown',
                    35: 'end',
                    36: 'home',
                    37: 'left',
                    38: 'up',
                    39: 'right',
                    40: 'down',
                    45: 'ins',
                    46: 'del',
                    91: 'meta',
                    93: 'meta',
                    224: 'meta'
                }, r = {
                    106: '*',
                    107: '+',
                    109: '-',
                    110: '.',
                    111: '/',
                    186: ';',
                    187: '=',
                    188: ',',
                    189: '-',
                    190: '.',
                    191: '/',
                    192: '`',
                    219: '[',
                    220: '\\',
                    221: ']',
                    222: '\''
                }, l = {
                    '~': '`',
                    '!': '1',
                    '@': '2',
                    '#': '3',
                    $: '4',
                    '%': '5',
                    '^': '6',
                    '&': '7',
                    '*': '8',
                    '(': '9',
                    ')': '0',
                    _: '-',
                    '+': '=',
                    ':': ';',
                    '"': '\'',
                    '<': ',',
                    '>': '.',
                    '?': '/',
                    '|': '\\'
                }, s = {
                    option: 'alt',
                    command: 'meta',
                    return: 'enter',
                    escape: 'esc',
                    plus: '+',
                    mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
                }, o = 1; o < 20; ++o)
                a[111 + o] = 'f' + o;
            for (o = 0; o <= 9; ++o)
                a[o + 96] = o.toString();
            f.prototype.bind = function(e, t, n) {
                var i = this;
                return e = e instanceof Array ? e : [e], i._bindMultiple.call(i, e, t, n), i
            },
            f.prototype.unbind = function(e, t) {
                return this.bind.call(this, e, (function() {}), t)
            },
            f.prototype.trigger = function(e, t) {
                var n = this;
                return n._directMap[e + ':' + t] && n._directMap[e + ':' + t]({}, e), n
            },
            f.prototype.reset = function() {
                var e = this;
                return e._callbacks = {}, e._directMap = {}, e
            },
            f.prototype.stopCallback = function(e, t) {
                if ((' ' + t.className + ' ').indexOf(' mousetrap ') > -1)
                    return !1;
                if (p(t, this.target))
                    return !1;
                if ('composedPath' in e && 'function' == typeof e.composedPath) {
                    var n = e.composedPath()[0];
                    n !== e.target && (t = n)
                }
                return 'INPUT' == t.tagName || 'SELECT' == t.tagName || 'TEXTAREA' == t.tagName || t.isContentEditable
            },
            f.prototype.handleKey = function() {
                return this._handleKey.apply(this, arguments)
            },
            f.addKeycodes = function(e) {
                for (var t in e)
                    e.hasOwnProperty(t) && (a[t] = e[t]);
                i = null
            },
            f.init = function() {
                var e = f(t);
                for (var n in e)
                    '_' !== n.charAt(0) && (f[n] = function(t) {
                        return function() {
                            return e[t].apply(e, arguments)
                        }
                    }(n))
            },
            f.init(),
            e.Mousetrap = f,
            Yn.exports && (Yn.exports = f)
        }
        function d(e, t, n) {
            e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent('on' + t, n)
        }
        function u(e) {
            if ('keypress' == e.type) {
                var t = String.fromCharCode(e.which);
                return e.shiftKey || (t = t.toLowerCase()), t
            }
            return a[e.which] ? a[e.which] : r[e.which] ? r[e.which] : String.fromCharCode(e.which).toLowerCase()
        }
        function c(e) {
            return 'shift' == e || 'ctrl' == e || 'alt' == e || 'meta' == e
        }
        function m(e, t, n) {
            return n || (n = function() {
                if (!i)
                    for (var e in i = {}, a)
                        e > 95 && e < 112 || a.hasOwnProperty(e) && (i[a[e]] = e);
                return i
            }()[e] ? 'keydown' : 'keypress'), 'keypress' == n && t.length && (n = 'keydown'), n
        }
        function h(e, t) {
            var n,
                i,
                a,
                r = [];
            for (n = function(e) {
                return '+' === e ? ['+'] : (e = e.replace(/\+{2}/g, '+plus')).split('+')
            }(e), a = 0; a < n.length; ++a)
                i = n[a],
                s[i] && (i = s[i]),
                t && 'keypress' != t && l[i] && (i = l[i], r.push('shift')),
                c(i) && r.push(i);
            return {
                key: i,
                modifiers: r,
                action: t = m(i, r, t)
            }
        }
        function p(e, n) {
            return null !== e && e !== t && (e === n || p(e.parentNode, n))
        }
        function f(e) {
            var n = this;
            if (e = e || t, !(n instanceof f))
                return new f(e);
            n.target = e,
            n._callbacks = {},
            n._directMap = {};
            var i,
                a = {},
                r = !1,
                l = !1,
                s = !1;
            function o(e) {
                e = e || {};
                var t,
                    n = !1;
                for (t in a)
                    e[t] ? n = !0 : a[t] = 0;
                n || (s = !1)
            }
            function m(e, t, i, r, l, s) {
                var o,
                    d,
                    u,
                    m,
                    h = [],
                    p = i.type;
                if (!n._callbacks[e])
                    return [];
                for ('keyup' == p && c(e) && (t = [e]), o = 0; o < n._callbacks[e].length; ++o)
                    if (d = n._callbacks[e][o], (r || !d.seq || a[d.seq] == d.level) && p == d.action && ('keypress' == p && !i.metaKey && !i.ctrlKey || (u = t, m = d.modifiers, u.sort().join(',') === m.sort().join(',')))) {
                        var f = !r && d.combo == l,
                            g = r && d.seq == r && d.level == s;
                        (f || g) && n._callbacks[e].splice(o, 1),
                        h.push(d)
                    }
                return h
            }
            function p(e, t, i, a) {
                n.stopCallback(t, t.target || t.srcElement, i, a) || !1 === e(t, i) && (function(e) {
                    e.preventDefault ? e.preventDefault() : e.returnValue = !1
                }(t), function(e) {
                    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
                }(t))
            }
            function g(e) {
                'number' != typeof e.which && (e.which = e.keyCode);
                var t = u(e);
                t && ('keyup' != e.type || r !== t ? n.handleKey(t, function(e) {
                    var t = [];
                    return e.shiftKey && t.push('shift'), e.altKey && t.push('alt'), e.ctrlKey && t.push('ctrl'), e.metaKey && t.push('meta'), t
                }(e), e) : r = !1)
            }
            function b(e, t, n, l) {
                function d(t) {
                    return function() {
                        s = t,
                        ++a[e],
                        clearTimeout(i),
                        i = setTimeout(o, 1e3)
                    }
                }
                function c(t) {
                    p(n, t, e),
                    'keyup' !== l && (r = u(t)),
                    setTimeout(o, 10)
                }
                a[e] = 0;
                for (var m = 0; m < t.length; ++m) {
                    var f = m + 1 === t.length ? c : d(l || h(t[m + 1]).action);
                    y(t[m], f, l, e, m)
                }
            }
            function y(e, t, i, a, r) {
                n._directMap[e + ':' + i] = t;
                var l,
                    s = (e = e.replace(/\s+/g, ' ')).split(' ');
                s.length > 1 ? b(e, s, t, i) : (l = h(e, i), n._callbacks[l.key] = n._callbacks[l.key] || [], m(l.key, l.modifiers, {
                    type: l.action
                }, a, e, r), n._callbacks[l.key][a ? 'unshift' : 'push']({
                    callback: t,
                    modifiers: l.modifiers,
                    action: l.action,
                    seq: a,
                    level: r,
                    combo: e
                }))
            }
            n._handleKey = function(e, t, n) {
                var i,
                    a = m(e, t, n),
                    r = {},
                    d = 0,
                    u = !1;
                for (i = 0; i < a.length; ++i)
                    a[i].seq && (d = Math.max(d, a[i].level));
                for (i = 0; i < a.length; ++i)
                    if (a[i].seq) {
                        if (a[i].level != d)
                            continue;
                        u = !0,
                        r[a[i].seq] = 1,
                        p(a[i].callback, n, a[i].combo, a[i].seq)
                    } else
                        u || p(a[i].callback, n, a[i].combo);
                var h = 'keypress' == n.type && l;
                n.type != s || c(e) || h || o(r),
                l = u && 'keydown' == n.type
            },
            n._bindMultiple = function(e, t, n) {
                for (var i = 0; i < e.length; ++i)
                    y(e[i], t, n)
            },
            d(e, 'keypress', g),
            d(e, 'keydown', g),
            d(e, 'keyup', g)
        }
    }('undefined' != typeof window ? window : null, 'undefined' != typeof window ? document : null);
    var Zn = Xn.exports;
    !function(e) {
        if (e) {
            var t = {},
                n = e.prototype.stopCallback;
            e.prototype.stopCallback = function(e, i, a, r) {
                return !!this.paused || !t[a] && !t[r] && n.call(this, e, i, a)
            },
            e.prototype.bindGlobal = function(e, n, i) {
                if (this.bind(e, n, i), e instanceof Array)
                    for (var a = 0; a < e.length; a++)
                        t[e[a]] = !0;
                else
                    t[e] = !0
            },
            e.init()
        }
    }('undefined' != typeof Mousetrap ? Mousetrap : void 0);
    const Jn = e => {
            var t = document.getElementById('enpass_iframe'),
                n = document.getElementById('enpass_spacer');
            window.innerWidth >= 800 ? (t.setAttribute('style', 'height: 48px;width: ' + window.innerWidth + 'px;border: 0px;'), n.setAttribute('style', 'height : 48px;')) : (window.innerWidth < 800 && window.innerWidth >= 500 ? t.setAttribute('style', 'height: 96px;width: ' + window.innerWidth + 'px;border: 0px;') : window.innerWidth < 500 && t.setAttribute('style', 'height: 96px;width: 500px;border: 0px;'), n.setAttribute('style', 'height : 96px;'))
        },
        Qn = [/^\W*log\W*[oi]n\W*$/i, /log\W*[oi]n (?:securely|now)/i, /\W*secure\W*log\W*[oi]n/i, /^\W*sign\W*[oi]n\W*$/i, /create.*account/i, 'continue', 'submit', 'weiter', 'ingresar', 'accès', 'вход', 'connexion', 'entrar', 'anmelden', 'accedi', 'valider', '登录', '登 录', '登入', 'लॉग इन करें', 'register', 'sign up', 'signup', 'join', 'create my account', 'регистрация', 'inscription', 'regístrate', 'cadastre-se', 'registrieren', 'registrazione', '注册', 'साइन अप करें', 'change password', 'save changes', 'save', 'einloggen', 'inloggen', 'giriş', 'zaloguj', 'σύνδεση', 'kirjaudu', 'prijava', 'aceptar'],
        ei = 'SAFARI' === e();
    class ti {
        constructor()
        {
            this.hiddenInterval = null,
            this.inlineManager = null,
            this.state = {
                uuid: T.getState().frameID,
                elementClicked: null,
                fieldDict: null,
                formDict: null,
                guesser: {
                    changePasswordForm: null
                },
                filler: {
                    generated_password_item_uuid: null,
                    generated_password_vault_uuid: null,
                    generated_password_team_id: null
                },
                doFormCapture: !0,
                tabInfo: {
                    url: null,
                    id: void 0,
                    domain: null
                },
                keyShortcut: {
                    activate: null,
                    lock: null,
                    autofill: ''
                },
                loginForm: null,
                creditCardForm: null,
                identityForm: null,
                iframeURL: window.location.protocol + '//' + window.location.host + window.location.pathname,
                frameUrls: null,
                isSaveDialogShown: !1,
                isAutoLogin: !1
            },
            this.init = () => {
                document.addEventListener('input', this.inputHandler, !0),
                document.addEventListener('click', this.clickListener, !0),
                document.addEventListener('change', this.changeListener, !0),
                document.addEventListener('DOMContentLoaded', this.domContentLoadedListener),
                window.addEventListener('keydown', this.enterKeyPressed, !0),
                window.addEventListener('resize', this.resizeListener),
                window.addEventListener('beforeunload', this.beforeUnloadListener),
                ei && document.addEventListener('visibilitychange', (() => {
                    document.hidden || y.getLockStatus()
                })),
                document.addEventListener('readystatechange', (e => {
                    'interactive' === e.target.readyState && f('connect_onpageload')
                })),
                p(this.messageHandler),
                y.onTabInfo((e => {
                    e && T.dispatch({
                        type: 'SET_TAB_URL',
                        payload: e.tabUrl
                    })
                })),
                y.onInlineMenuBlocked((() => {
                    T.dispatch({
                        type: 'BLOCK_INLINE'
                    }),
                    y.setBlockingURL(document.domain)
                })),
                y.onInlineMenuSettingUpdate((e => {
                    T.dispatch({
                        type: 'UPDATE_INLINE_SETTING',
                        payload: e.disabled
                    })
                })),
                y.onAutofillOnLoadData((async e => {
                    const t = ke() || e?.item?.url && Se([e.item.url]),
                        n = ei && e.uuid && e.uuid !== T.getState().frameID,
                        i = e.item && !Oe(e.item);
                    if (!e.item || t || n || i)
                        return T.dispatch({
                            type: 'AUTOLOGIN_IN_EXECUTION',
                            payload: !1
                        }), void (this.inlineManager && this.inlineManager.toggleDettachMode(!1));
                    const a = e.item;
                    a.secure_data.autoSubmit = !1,
                    T.dispatch({
                        type: 'AUTOFILL_IN_OPERATION',
                        payload: !0
                    }),
                    T.getState().menuOpen && (this.inlineManager?.dettach(), T.dispatch({
                        type: 'MENU_DISPLAY_STATUS',
                        payload: !1
                    }));
                    const r = {
                        'timestripe.com': 1e3,
                        'ownyourfuture.vanguard.com': 1e3
                    };
                    var l;
                    Object.keys(r).includes(document.domain) && await (l = r[document.domain], new Promise((e => setTimeout(e, l))));
                    const s = oe(),
                        o = me(s),
                        d = vn(o);
                    if (d && qn(d, o.pageFields))
                        return T.dispatch({
                            type: 'AUTOFILL_IN_OPERATION',
                            payload: !1
                        }), void T.dispatch({
                            type: 'AUTOLOGIN_IN_EXECUTION',
                            payload: !1
                        });
                    const u = a.secure_data;
                    u.autofillType = 'autofill_onload',
                    Fn(d, {
                        clientData: u,
                        uuid: T.getState().uuid
                    }, (function() {
                        f('CLEAR_TOTP_DATA'),
                        T.dispatch({
                            type: 'AUTOFILL_IN_OPERATION',
                            payload: !1
                        }),
                        T.dispatch({
                            type: 'AUTOLOGIN_IN_EXECUTION',
                            payload: !1
                        })
                    }))
                })),
                y.onAutofillInlineItem((e => {
                    if (ke() || Se([e.url]))
                        return;
                    if (e.context.frame_id !== T.getState().frameID)
                        return;
                    this.inlineManager && (this.inlineManager.removeMenu(), this.inlineManager.removeInlineButton()),
                    T.dispatch({
                        type: 'AUTOFILL_IN_OPERATION',
                        payload: !0
                    });
                    const {activeField: t} = T.getState(),
                        n=t?.form,
                        i = Fe(n),
                        a = () => {
                            T.dispatch({
                                type: 'AUTOFILL_IN_OPERATION',
                                payload: !1
                            })
                        };
                    if ('credit_card'===e?.type)
                        return this.inlineManager?.buttonManager?.dettach(), this.fillCreditCardItem(e), void a();
                    if ('login'===e?.type) {
                        if (this.turnOffAutoCapture(), 'current_password' === e.context.fill_type) {
                            if (i) {
                                const t = He({
                                    pageForms: [i]
                                });
                                t && t.currentPasswordField && De(t.currentPasswordField, e.secure_data.password)
                            } else
                                t && xe(t, e.secure_data.password);
                            return void a()
                        }
                        if ('login-email-only' !== e.context.fill_type) {
                            if (i) {
                                if (!(yn(i) > 0)) {
                                    if (e.context && 'email' === e.context.fill_type)
                                        t && e.secure_data.email && xe(t, e.secure_data.email);
                                    else if (e.context && 'username' === e.context.fill_type && t) {
                                        const n = se(t);
                                        n && Ie(n) && e.secure_data.email ? xe(t, e.secure_data.email) : xe(t, e.secure_data.username)
                                    }
                                    return void a()
                                }
                                if (e.webform) {
                                    const t = ((e, t, n) => {
                                        const i = Array.isArray(t) ? t[0] : t;
                                        let a=n?.formdict;
                                        if (a || (a = Fe(e)), `${a.hostanme + a.pathanme}` != `${i.hostanme + i.pathanme}`)
                                            return !1;
                                        if ('default-form' !== i.htmlName) {
                                            if (i.htmlName && i.htmlName !== a.htmlName)
                                                return !1;
                                            if (i.htmlAction && i.htmlAction !== a.htmlAction)
                                                return !1
                                        }
                                        const r = i.valueMap;
                                        if (!r || 0 === Object.keys(r).length)
                                            return !1;
                                        const l = i.fields,
                                            s = [];
                                        let o;
                                        if (l) {
                                            for (let t = 0, n = l.length; t < n; t++) {
                                                const n = l[t];
                                                let i = Rn(n, e);
                                                if (!i && a && (o = o || oe(null), i = Bn(n, o)), !i)
                                                    return !1;
                                                ('password' !== i.type || V(n)) && s.push({
                                                    fieldPointer: i,
                                                    fieldValue: r[n.item_field_uid] || n.htmlValue,
                                                    fieldType: n.htmlType,
                                                    userEdited: n.userEdited,
                                                    enpassType: n.enpassType
                                                })
                                            }
                                            if (0 === s.length)
                                                return !1
                                        }
                                        return Un(s), !0
                                    })(n, e.webform, {
                                        formdict: i
                                    });
                                    if (t)
                                        return ((e, t) => {
                                            const n = void 0 !== typeof e.isUsernameInWebForm && e.isUsernameInWebForm,
                                                i = void 0 !== typeof e.isEmailInWebForm && e.isEmailInWebForm,
                                                a = e.secure_data,
                                                r = {
                                                    username: a.username,
                                                    user_name: a.user_name,
                                                    email: a.email
                                                };
                                            if ((!n || !i) && t) {
                                                const e = t.loginFields ? t.loginFields.userField : null;
                                                wn({
                                                    userField: e
                                                }, r, t.idoc)
                                            }
                                        })(e, i), void ((e, {data: t, uuid: n}, i) => {
                                            const a = {
                                                autoSubmit: t.autoSubmit,
                                                totp_1: t.totp_1,
                                                totp_1_valid: t.totp_1_valid,
                                                totp_2: t.totp_2,
                                                totp_2_valid: t.totp_2_valid
                                            };
                                            let r = En(a, {
                                                uuid: n
                                            });
                                            if (a.autoSubmit && !ye()) {
                                                let t = e.loginFields ? e.loginFields.loginButton : null;
                                                'accounts.google.com' === location.hostname && (t = document.querySelector('#passwordNext') || document.querySelector('#signIn')),
                                                t ? new Promise((function(e, n) {
                                                    setTimeout((() => {
                                                        if ('dict' === t.type) {
                                                            let e = ue(t.target);
                                                            e && e.click()
                                                        } else
                                                            t.target ? t.target.click() : t.click();
                                                        r ? n() : e()
                                                    }), 600)
                                                })).then((function() {
                                                    let e = 'www.dropbox.com' === document.domain ? 8e3 : 2e3;
                                                    setTimeout((() => {
                                                        if (!En(a, {
                                                            uuid: n
                                                        }, i)) {
                                                            let e = 'www.dropbox.com' === document.domain ? 1e4 : 2e3;
                                                            setTimeout((() => {
                                                                En(a, {
                                                                    uuid: n
                                                                }, i)
                                                            }), e)
                                                        }
                                                    }), e)
                                                }), (function() {
                                                    i({
                                                        isTotpExist: !1
                                                    })
                                                })) : i({
                                                    isTotpExist: !1
                                                })
                                            } else
                                                i({
                                                    isTotpExist: !1
                                                })
                                        })(i, {
                                            data: e.secure_data,
                                            uuid: T.getState().uuid
                                        }, (e => {
                                            e && e.isTotpExist && f('CLEAR_TOTP_DATA'),
                                            a()
                                        }))
                                }
                                return void Fn(i, {
                                    clientData: e.secure_data,
                                    uuid: T.getState().uuid
                                }, (function(n) {
                                    if (n && n.isTotpExist && f('CLEAR_TOTP_DATA'), e.context && 'email' === e.context.fill_type)
                                        t && !t.value && e.secure_data.email && xe(t, e.secure_data.email);
                                    else if (e.context && 'username' === e.context.fill_type && t) {
                                        const n = se(t);
                                        n && Ie(n) && e.secure_data.email ? xe(t, e.secure_data.email) : xe(t, e.secure_data.username)
                                    }
                                    n?.showInlineMenu ? (T.dispatch({
                                        type: 'REMOVE_ACTIVE_FIELD'
                                    }), a(), document.activeElement && e.secure_data && T.dispatch({
                                        type: 'SET_ACTIVE_FIELD',
                                        payload: document.activeElement
                                    })) : a()
                                }))
                            }
                            {
                                let n = oe(),
                                    i = me(n),
                                    r = vn(i);
                                return void Fn(r, {
                                    clientData: e.secure_data,
                                    uuid: T.getState().uuid
                                }, (function(n) {
                                    if (n && n.isTotpExist && f('CLEAR_TOTP_DATA'), e.context && 'email' === e.context.fill_type)
                                        t && !t.value && e.secure_data.email && xe(t, e.secure_data.email);
                                    else if (e.context && 'username' === e.context.fill_type && t) {
                                        const n = se(t);
                                        n && Ie(n) && e.secure_data.email ? xe(t, e.secure_data.email) : xe(t, e.secure_data.username)
                                    }
                                    n?.showInlineMenu ? (T.dispatch({
                                        type: 'REMOVE_ACTIVE_FIELD'
                                    }), a(), document.activeElement && e.secure_data && T.dispatch({
                                        type: 'SET_ACTIVE_FIELD',
                                        payload: document.activeElement
                                    })) : a()
                                }))
                            }
                        }
                        if (t && e.secure_data.email)
                            return xe(t, e.secure_data.email), void a()
                    }
                    if ('identity'===e?.type)
                        return i ? ((e, t) => {
                            if (!e || 0 === e.length)
                                return;
                            const n = Jt(e);
                            an(n, t)
                        })(i.fields,e?.secure_data) : ln(null,e?.secure_data), void a();
                    if ('generate_password'===e?.type) {
                        if (this.state.doFormCapture = !0, 'password' === e.context.fill_type) {
                            if (i) {
                                const t = i.fields.filter((e => 'password' === e.htmlType && e.visible));
                                if (3 === t.length) {
                                    const n = je(t);
                                    if (n) {
                                        const {newPasswordField: i, confirmPasswordField: a} = n;
                                        i && a ? (De(i, e.generated_password), De(a, e.generated_password)) : (De(t[0], e.generated_password), De(t[1], e.generated_password))
                                    }
                                } else
                                    De(t[0], e.generated_password),
                                    De(t[1], e.generated_password)
                            } else {
                                xe(t, e.generated_password);
                                let n = oe(null);
                                if (n = ie(n, !0), n = te(n), n = n.filter((e => !e.hasForm && 'password' === e.htmlType)), 2 === n.length) {
                                    const i = n[0].tabindex ? parseInt(n[0].tabindex) : null,
                                        a = n[1].tabindex ? parseInt(n[1].tabindex) : null;
                                    if (i && a && i === a - 1) {
                                        const i = ue(n[0]),
                                            a = ue(n[1]);
                                        xe(i && i === t ? a : i, e.generated_password)
                                    }
                                }
                            }
                            return a(), void this.captureDetails()
                        }
                        if (i) {
                            const t = He({
                                pageForms: [i]
                            });
                            if (t)
                                return De(t.newPasswordField, e.generated_password), De(t.confirmPasswordField, e.generated_password), a(), void this.captureDetails()
                        } else {
                            let t = oe(),
                                n = me(t);
                            const i = He({
                                pageFields: n.pageFields
                            });
                            if (i)
                                return De(i.newPasswordField, e.generated_password), De(i.confirmPasswordField, e.generated_password), a(), void this.captureDetails()
                        }
                        this.generatedPasswordFiller(e),
                        a(),
                        this.captureDetails()
                    }
                }))
            },
            this.inputHandler = e => {
                if (!document.domain.includes('tiptap.dev') || document.URL.includes('https://tiptap.dev/login')) {
                    var t = null;
                    if (e.composedPath && !['INPUT', 'SELECT'].includes(e.target.tagName)) {
                        var n = e.composedPath();
                        n && n[0] && (t = n[0])
                    } else
                        t = e.target;
                    !t || 'INPUT' !== t.tagName && 'SELECT' !== t.tagName || (t.dataset.enpassusermodified = 'yes')
                }
            },
            this.changeListener = e => {
                document.domain.includes('tiptap.dev') && !document.URL.includes('https://tiptap.dev/login') || !e.target || 'radio' !== e.target.type && 'checkbox' !== e.target.type || (e.target.dataset.enpassusermodified = 'yes')
            },
            this.domContentLoadedListener = e => {
                f('fetch_old_shortcut'),
                ei && (f('fetch_shortcut_key'), window.top === window.self && setTimeout((() => {
                    f('fetch_autologin_data', {
                        uuid: this.state.uuid
                    })
                }), 700)),
                this.gatherFrameUrlsOfTab(),
                ye() && (this.state.autoSubmit = !1),
                window.top === window.self && f('check_pending_dialog'),
                T.subscribe(this.storeChangeHandler),
                y.getInlineSetting({
                    uuid: this.state.uuid
                }),
                y.onInlineSettingResult((e => {
                    if (!e)
                        return;
                    const {isSettingDisabled: t, autoLogin: n, tab_info: i, locked: a} = e;
                    T.dispatch({
                        type: 'SYNC_INLINE_SETTING',
                        payload: {
                            inlineDisabled: t,
                            autoLogin: n,
                            locked: a
                        }
                    }),
                    i && i.tabUrl && T.dispatch({
                        type: 'SET_TAB_URL',
                        payload: i.tabUrl
                    })
                }))
            },
            this.storeChangeHandler = () => {
                const {inlineDisabled: e, autoLogin: t, autofillInOperation: n} = T.getState();
                if (e || t && n)
                    this.inlineManager && this.inlineManager.toggleDettachMode(!0);
                else if (!this.inlineManager) {
                    if (ke())
                        return;
                    this.inlineManager = t ? new Gn({
                        dettachMode: !0
                    }) : new Gn
                }
            },
            this.enterKeyPressed = e => {
                let t = e.target,
                    n = t.type;
                if (!n && e.composedPath) {
                    let i = e.composedPath();
                    i && i[0] && (t = i[0], n = t.type)
                }
                if (13 === e.keyCode && ('password' === n || 'text' === n || 'email' === n)) {
                    this.cacheUsername();
                    let e = Array.prototype.slice.call(document.querySelectorAll('input[type=password]'));
                    if (e = e.filter((function(e) {
                        return V(e)
                    })), this.filterItemOnWhichEnterKeyPressed(t)) {
                        if (e && 0 === e.length && 'password' !== n)
                            return;
                        this.captureDetails()
                    }
                }
            },
            this.resizeListener = e => {
                parent === window || 0 === window.innerHeight && 0 === window.innerWidth || f('get_tab_info')
            },
            this.beforeUnloadListener = e => {
                const t = this.state.filler.generated_password_item_uuid,
                    n = this.state.filler.generated_password_vault_uuid,
                    i = this.state.guesser.changePasswordForm;
                t && n && i && f(u, {
                    url: this.state.tabInfo.url,
                    type: 'update_password',
                    secure_data: {},
                    event_type: 'beforeunload',
                    uuid: this.state.uuid,
                    webForm: []
                })
            },
            this.cacheUsername = () => {
                if (this.state.userField && this.state.userField.value) {
                    if (document.body.contains(this.state.userField))
                        return void f('cache_username', {
                            username: this.state.userField.value
                        });
                    var e = Te(),
                        t = e.fieldDict,
                        n = e.formDict;
                    this.state.fieldDict = t,
                    this.state.formDict = n
                } else if (void 0 !== this.state.userField)
                    return;
                var i = null;
                if (this.state.formDict)
                    i = vn(this.state.formDict, !0);
                else {
                    let e = Te(),
                        t = e.fieldDict,
                        n = e.formDict;
                    this.state.fieldDict = t,
                    this.state.formDict = n,
                    i = vn(this.state.formDict, !0)
                }
                i && (i.form && i.form.loginFields && i.form.loginFields.userField ? (this.state.userField = ue(i.form.loginFields.userField), this.state.userField && this.state.userField.value && f('cache_username', {
                    username: this.state.userField.value
                })) : (this.state.userField = void 0, this.state.fieldDict = null, this.state.formDict = null))
            },
            this.filterItemOnWhichEnterKeyPressed = e => {
                if (e) {
                    const t = e.getAttribute('placeholder') || '',
                        n = e.getAttribute('class') || '',
                        i = e.getAttribute('id') || '',
                        a = e.getAttribute('name') || '',
                        r = /(search|find|zoek|поиск|найти|искать|recherche|suchen|buscar|suche|ricerca|procurar|検索)/i;
                    return t.match(r) || n.match(r) || i.match(r) || a.match(r) ? null : e
                }
                return e
            },
            this.captureDetails = e => {
                if (!this.state.doFormCapture || this.state.creditCardForm)
                    return;
                let t = Te().fieldDict;
                if (null === this.state.creditCardForm) {
                    let e = me(t),
                        r = Ft(e);
                    if (r) {
                        var n = r.cardNumberFields,
                            i = r.cardNumberField,
                            a = r.cvvField;
                        if ((e => {
                            if (!e)
                                return !1;
                            var t = e.cardNumberField,
                                n = document.location.host;
                            return 'bmo.com' !== (0 === n.indexOf('www') ? n.substr(n.indexOf('.') + 1) : n) || !t || 'siBankCard' !== t.htmlID
                        })(r)) {
                            if (i && i.htmlValue)
                                return;
                            if (a && a.htmlValue)
                                return;
                            if (n && n[0] && n[0].htmlValue)
                                return
                        }
                    }
                }
                let r = !!this.state.guesser.changePasswordForm;
                var l = kn(t, r);
                if (l && 'object' == typeof l) {
                    const t = this.state.tabInfo && this.state.tabInfo.url ? this.state.tabInfo.url : null;
                    if ('signup' === l.formCaptureType && t) {
                        let e = new URL(this.state.tabInfo.url);
                        l.url = e.origin
                    } else
                        l.url = t || document.URL;
                    if ('update_password' === l.type && l.secure_data) {
                        let e = this.state.filler.generated_password_item_uuid,
                            t = this.state.filler.generated_password_vault_uuid;
                        e && t && (l.secure_data.item_uuid = e, l.secure_data.vault_uuid = t, l.secure_data.team_id = this.state.filler.generated_password_team_id),
                        l.uuid = this.state.uuid
                    }
                    e && e.isManual && (l.isManual = !0)
                }
                l && f(u, (e => {
                    if (!e)
                        return null;
                    var t = e.webform && e.webform[0];
                    if (!t)
                        return e;
                    if (t.fields) {
                        var n = t.fields.map((function(e) {
                            return e.pointer && delete e.pointer, e
                        }));
                        t.fields = n,
                        e.webform[0] = t
                    }
                    return e
                })(l))
            },
            this.gatherFrameUrlsOfTab = () => {
                if (this.state.frameUrls)
                    return this.state.frameUrls;
                if (window.top === window.self) {
                    var e = Array.prototype.slice.call(document.getElementsByTagName('iframe'));
                    let t = [new URL(document.URL).hostname];
                    if (e && e.length > 0) {
                        for (let n = 0, i = e.length; n < i; n++) {
                            let i = e[n];
                            if (i && i.src && 0 === i.src.indexOf('http')) {
                                let e = new URL(i.src).hostname;
                                t.includes(e) || t.push(e)
                            }
                        }
                        return this.state.frameUrls = t, t
                    }
                    return t
                }
                return null
            },
            this.cacheUsernameOnClick = e => {
                var t = null;
                if ('submit' == e.type || 'button' === e.tagName.toLowerCase() ? t = e.value || e.textContent : 'accounts.google.com' === document.domain && e.parentElement && 'button' === e.parentElement.tagName.toLowerCase() && (t = e.parentElement.textContent), !t) {
                    var n = e.getAttribute('aria-labelledby');
                    n && document.getElementById(n) && (t = document.getElementById(n).textContent)
                }
                t && ['next', 'continue'].includes(t.trim().toLowerCase()) && this.cacheUsername()
            },
            this.clickListener = e => {
                let t = e ? e.target : this;
                if (t !== this.state.elementClicked && (this.state.elementClicked = t, setTimeout((() => {
                    this.state.elementClicked = null
                }), 300), this.cacheUsernameOnClick(e.target), Ae(t))) {
                    if (t = (e => {
                        if (e && 'font' === e.tagName.toLowerCase())
                            for (; e && 'font' === e.tagName.toLowerCase();)
                                e = e.parentNode;
                        return e
                    })(t), !Ne(t)) {
                        let e = t.parentElement;
                        if (!e || !Ne(e))
                            return;
                        t = e
                    }
                    if (document.querySelector('input[data-enpassusermodified]')) {
                        var n = ((e, t) => {
                            if (!e || !t)
                                return null;
                            if ('accounts.google.com' === location.host && '/signin/v2/challenge/pwd' === location.pathname && (t = t.concat(['next'])), -1 !== ['button', 'input'].indexOf(e.tagName.toLowerCase())) {
                                if ('button' === e.tagName.toLowerCase() && !e.hasAttribute('type') || 'button' === e.type.toLowerCase()) {
                                    if (e.textContent && !e.textContent.trim())
                                        return null;
                                    if (ge(e.textContent, t) || ge(e.value, t))
                                        return e
                                }
                                if (-1 !== ['submit', 'image'].indexOf(e.type.toLowerCase())) {
                                    var n = e.textContent;
                                    return n && ['`', '}', '=', '&', '{', '@', '?', '<', ')', '_', ',', '[', '^', '*', '#', ']', '>', '.', '(', ':', '~', '|', '-', '!', '/', '$', 'i', 'w', 'a', 'c', 'n', 'r', 'o', 't', 'e', 'u', 'back', 'f', 'b', 'z', 'd', 'l', 'p', 'j', 'v', 'y', 'clear', 'h', 'x', 'm', 'q', 's', 'g', 'k', 'caps lock', 'hovering off', 'space', 'shuffle off', '2', '0', '1', '8', '5', '6', '9', '4', '7', '3'].includes(n.toLowerCase()) ? null : e
                                }
                            } else if (e) {
                                var i = e.getAttribute('data-action');
                                if (i && (i = i.replace(/^\s+/m, '').replace(/\s+$/m, '').replace(/\s\s+/, ' ').toLowerCase().trim()).indexOf('submit') >= 0) {
                                    var a = e.textContent || e.value;
                                    if ('div' === e.tagName.toLowerCase() && e.classList.contains('button') && a && ge(a, t) && !ge(a, ['already have an account', 'sign in with']))
                                        return e
                                }
                            }
                            for (var r = 3; e && e !== document && r >= 0;) {
                                var l = e.textContent || e.value || null;
                                if (l && -1 !== ['a', 'button'].indexOf(e.tagName.toLowerCase()) && (e.hasAttribute('type') && 'submit' === e.type.toLowerCase() || l && ge(l, t) && !ge(l, ['already have an account', 'sign in with'])))
                                    return e;
                                e = e.parentNode,
                                r--
                            }
                            return null
                        })(t, Qn);
                        if (n)
                            this.captureDetails();
                        else if (n = (e => {
                            var t = e.ownerDocument.querySelectorAll('[role=button]');
                            if (t)
                                for (var n = t.length, i = 0; i < n; i++)
                                    if (-1 !== Array.prototype.slice.call(t[i].getElementsByTagName(e.tagName)).indexOf(e))
                                        return t[i];
                            return null
                        })(t)) {
                            if (n.hasAttribute('aria-label')) {
                                let e = n.getAttribute('aria-label');
                                if (e && 'show password' === e.toLowerCase() || 'hide password' === e.toLowerCase())
                                    return
                            }
                            (n.getAttribute('title') && Qn.indexOf(n.getAttribute('title').toLowerCase()) >= 0 || n.getAttribute('alt') && Qn.indexOf(n.getAttribute('alt').toLowerCase()) >= 0) && this.captureDetails()
                        }
                    }
                }
            },
            this.guessFormType = e => {
                var t = Te(),
                    n = t.fieldDict,
                    i = t.formDict;
                this.state.fieldDict = n,
                this.state.formDict = i;
                var a = vn(i, !0),
                    r = He(i),
                    l = e ? e.action_type : null;
                let s = Array.prototype.slice.call(document.querySelectorAll('input[type=\'password\']')).filter((function(e) {
                    return V(e)
                }));
                var o = !!(s && s.length > 0);
                if (!o && a && a.form && 'login_fields' === a.form.type && a.form.loginFields && a.form.loginFields.pswdField && (o = !0), r)
                    return this.state.guesser.changePasswordForm = r, void f(c, {
                        isChangePassword: !0,
                        current_password: !!r.currentPasswordField,
                        uuid: this.state.uuid,
                        url: this.state.tabInfo.url,
                        tabID: this.state.tabInfo.id,
                        action_type: l,
                        enableSaveWebform: o
                    });
                if (a)
                    return this.state.loginForm = a.form, void f(c, {
                        isLogin: !0,
                        uuid: this.state.uuid,
                        url: this.state.tabInfo.url,
                        iframeURL: ke() ? '' : this.state.iframeURL,
                        tabID: this.state.tabInfo.id,
                        action_type: l,
                        enableSaveWebform: o,
                        score: a.score
                    });
                var d = Ft(i);
                if (d)
                    return this.state.creditCardForm = d, void f(c, {
                        isCreditcard: !0,
                        uuid: this.state.uuid,
                        url: this.state.tabInfo.url,
                        tabID: this.state.tabInfo.id,
                        action_type: l,
                        enableSaveWebform: !1
                    });
                {
                    const e = n.filter((e => {
                        if (['email', 'text'].includes(e.htmlType) && e.visible) {
                            if (Ie(e))
                                return !0;
                            if (Yt(e) > 0)
                                return !0
                        }
                        return !1
                    }));
                    e && e.length > 0 ? f(c, {
                        isLogin: !0,
                        uuid: this.state.uuid,
                        url: this.state.tabInfo.url,
                        iframeURL: ke() ? '' : this.state.iframeURL,
                        tabID: this.state.tabInfo.id,
                        action_type: l,
                        enableSaveWebform: o,
                        score: 1
                    }) : o && f(c, {
                        isLogin: !1,
                        uuid: this.state.uuid,
                        url: this.state.tabInfo.url,
                        iframeURL: ke() ? '' : this.state.iframeURL,
                        tabID: this.state.tabInfo.id,
                        enableSaveWebform: o
                    })
                }
            },
            this.setTabInfo = e => {
                if (e) {
                    if (e.tabUrl)
                        try {
                            var t = new URL(e.tabUrl);
                            this.state.tabInfo.domain = t.host,
                            this.state.tabInfo.url = t.origin + t.pathname
                        } catch (e) {}
                    e.tabId && (this.state.tabInfo.id = e.tabId)
                }
            },
            this.messageHandler = (e, t, n, i) => {
                var a,
                    r,
                    l;
                if (parent === window || !((a = document.URL) && [/(:\/\/ad)[0-9]?\.(.*)/gi, /(:\/\/ads.)\.(.*)/gi, /(:\/\/)(adserver.*)\.(.*)/gi, /(:\/\/.*\/.*adframe.*)/gi, /(:\/\/tag)\.(admeld.*)\.(.*)/gi, /(:\/\/.*)\.(atdmt\.com\/)(.*)/gi, /(:\/\/.*)\.(doubleclick)\.(.*)/gi, /(:\/\/.*)\.(ak\.fbcdn\.net)\/(.*)/gi, /(:\/\/)(plusone\.google\.com)\/(.*)/gi, /(:\/\/)(platform\.twitter\.com)\/(widgets)\/(.*)/gi, /(:\/\/.*)\.(facebook\.com)\/(widgets|plugins|extern)\/(.*)/gi, /(:\/\/)(stats\.complex\.com)\/(.*)/gi, /(:\/\/.*)\.(addthis\.com)\/(static)\/(.*)/gi, /(:\/\/)(vitamine\.networldmedia\.net)\/(.*)/gi, /(:\/\/)(api\.tweetmeme\.com)\/(.*)/gi, /(:\/\/)(engine\.adzerk\.net)\/(.*)/gi, /(:\/\/.*)\.(atwola\.com)\/(.*)/gi, /(:\/\/.*)\.(stumbleupon\.com)\/(badge)\/(.*)/gi, /(:\/\/.*)\.(stumbleupon\.com)\/(badge)\/(.*)/gi, /(:\/\/.*)\.(bizographics\.com)\/(collect)\/(.*)/gi].some((e => e.test(a))) || 0 === window.innerHeight || 0 === window.innerWidth))
                    switch (e) {
                    case 'gather_frame_urls':
                        {
                            let e = this.gatherFrameUrlsOfTab();
                            e && f('cache_frame_urls', {
                                frameUrls: e
                            });
                            break
                        }case 'guess_form_type':
                        {
                            this.state.loginForm = null,
                            this.changePasswordForm = null,
                            this.creditCardForm = null;
                            let e = this.gatherFrameUrlsOfTab();
                            e && f('cache_frame_urls', {
                                frameUrls: e
                            }),
                            this.inlineManager && this.inlineManager.removeMenu(),
                            this.guessFormType(t);
                            break
                        }case 'generated_password_fill':
                        this.generatedPasswordFiller(t);
                        break;
                    case 'tab_info':
                        this.setTabInfo(t);
                        break;
                    case 'FILL_TOTP':
                        {
                            const e = this.delayTotpDeductionBy(document.URL);
                            setTimeout((() => {
                                En(t, {
                                    uuid: this.state.uuid
                                }, (() => {
                                    f('CLEAR_TOTP_DATA')
                                }))
                            }), e);
                            break
                        }case 'fill_login_item':
                        !1 === this.state.autoSubmit && (t.secure_data.autoSubmit = !1),
                        this.turnOffAutoCapture(),
                        this.inlineManager && this.inlineManager.removeMenu(),
                        !t || t.uuid && t.uuid !== this.state.uuid || !Oe(t) || this.fillLoginItem(t);
                        break;
                    case 'fill_credit_card_item':
                        this.turnOffAutoCapture(),
                        T.dispatch({
                            type: 'AUTOFILL_IN_OPERATION',
                            payload: !0
                        }),
                        !t || t.uuid && t.uuid !== this.state.uuid || this.fillCreditCardItem(t),
                        T.dispatch({
                            type: 'AUTOFILL_IN_OPERATION',
                            payload: !1
                        });
                        break;
                    case 'fill_identity_item':
                        if (this.turnOffAutoCapture(), ke() || Se([t.url]))
                            return;
                        ln(null, t.secure_data);
                        break;
                    case 'fetch_old_shortcut_result':
                        t.shortcut_key && this.bindShortcutKey(t.shortcut_key, 'old_shortcut', (() => {
                            f('handle_old_shortcut')
                        }));
                        break;
                    case 'fetch_shortcut_key_result':
                        this.bindShortcutKey(t.activate, 'activate', (() => {
                            const {frameID: e, locked: t, menuOpen: n} = T.getState();
                            t && n ? f('launch_assistant', {
                                request: 'unlock',
                                uuid: e
                            }) : f('launch_assistant')
                        })),
                        this.bindShortcutKey(t.autofill, 'autofill', (() => {
                            f('shortcut_key_pressed')
                        })),
                        this.bindShortcutKey(t.lock, 'lock', (() => {
                            f('lock_app')
                        }));
                        break;
                    case 'shortcut_key_changed':
                        this.shortcutKeyChanged(t.shortcut_key);
                        break;
                    case 'capture_form':
                        this.captureDetails(t);
                        break;
                    case 'disable_autosubmit':
                        this.state.autoSubmit = !1;
                        break;
                    case 'show_save_dialog':
                        window.top !== window.self || this.state.isSaveDialogShown || (this.state.isSaveDialogShown = !0, (() => {
                            var e = document.createElement('div');
                            e.setAttribute('id', 'enpass_overlay'),
                            e.setAttribute('style', 'top: 0px;left: 0px;padding: 0px;height: 1px;position: fixed;z-index: 1000000099;visibility: visible;background-color: black;');
                            var t = document.createElement('iframe');
                            t.setAttribute('id', 'enpass_iframe'),
                            t.setAttribute('scrolling', 'no');
                            var n = chrome.runtime.getURL('injected/dialog/dialog.html');
                            t.setAttribute('src', n),
                            window.innerWidth >= 800 ? t.setAttribute('style', 'height: 48px;width: ' + window.innerWidth + 'px;border: 0px;') : window.innerWidth < 800 && window.innerWidth >= 500 ? t.setAttribute('style', 'height: 80px;width: ' + window.innerWidth + 'px;border: 0px;') : window.innerWidth < 500 && t.setAttribute('style', 'height: 80px;width: 500px;border: 0px;');
                            var i = document.createElement('div');
                            i.setAttribute('id', 'enpass_spacer'),
                            i.setAttribute('style', 'height : 48px;'),
                            e.appendChild(t),
                            document.body && (document.body.appendChild(e), document.body.insertBefore(i, document.body.firstChild)),
                            window.addEventListener('resize', Jn)
                        })());
                        break;
                    case 'destroy_dialog':
                        this.state.isSaveDialogShown = !1,
                        r = document.getElementById('enpass_overlay'),
                        l = document.getElementById('enpass_spacer'),
                        r && (document.body.removeChild(r), document.body.removeChild(l), window.removeEventListener('resize', Jn));
                        break;
                    case 'autofillItem':
                        this.fillLoginItem(t)
                    }
            },
            this.oneTimeInputChangeHandler = () => {
                this.state.filler.generated_password_item_uuid = null,
                this.state.filler.generated_password_vault_uuid = null,
                this.state.filler.generated_password_team_id = null,
                f('generated_password_modified', {
                    uuid: this.state.uuid
                }),
                clearInterval(this.hiddenInterval),
                this.hiddenInterval = null,
                document.removeEventListener('input', this.oneTimeInputChangeHandler, !0)
            },
            this.generatedPasswordFiller = e => {
                var t = this.state.guesser.changePasswordForm;
                if (e)
                    if (e.current_password)
                        e.uuid === this.state.uuid && t && (clearInterval(this.hiddenInterval), this.hiddenInterval = null, document.removeEventListener('input', this.oneTimeInputChangeHandler, !0), this.state.filler.generated_password_item_uuid = e.item_uuid, this.state.filler.generated_password_vault_uuid = e.vault_uuid, this.state.filler.generated_password_team_id = e.team_id, De(t.currentPasswordField, e.current_password), De(t.newPasswordField, e.generated_password), De(t.confirmPasswordField, e.generated_password), setTimeout((() => {
                            document.addEventListener('input', this.oneTimeInputChangeHandler, !0)
                        }), 2e3), this.hiddenInterval = setInterval((() => {
                            const e = this.state.filler.generated_password_item_uuid,
                                n = this.state.filler.generated_password_vault_uuid,
                                i = ue(t.currentPasswordField),
                                a = ue(t.newPasswordField);
                            a ? !V(a) && a.value && i && i.value && (this.hiddenInterval && f(u, {
                                url: this.state.tabInfo.url,
                                type: 'update_password',
                                secure_data: {
                                    item_uuid: e,
                                    vault_uuid: n,
                                    team_id: this.state.filler.generated_password_team_id,
                                    oldPassword: i ? i.value : '',
                                    newPassword: a ? a.value : '',
                                    password: a ? a.value : ''
                                },
                                event_type: 'visibility',
                                uuid: this.state.uuid,
                                webForm: []
                            }), clearInterval(this.hiddenInterval), this.hiddenInterval = null) : (clearInterval(this.hiddenInterval), this.hiddenInterval = null)
                        }), 1e3));
                    else {
                        let r = Array.prototype.slice.call(document.querySelectorAll('input[type=\'password\']'));
                        if (!r || 0 === r.length)
                            return;
                        let l = null;
                        t && t.currentPasswordField && (l = t.currentPasswordField.elementNumber);
                        let s = [];
                        r.forEach((function(e) {
                            let t = se(e);
                            s.push(t)
                        }));
                        let o = s.filter((function(e) {
                            return e.visible && e.elementNumber !== l
                        }));
                        if (o && 0 === o.length)
                            return;
                        if (o && 1 === o.length) {
                            let t = ue(o[0]);
                            return void xe(t, e.generated_password)
                        }
                        let d = o.filter((function(e) {
                            return e.viewable
                        }));
                        if (d && 1 === d.length) {
                            let t = ue(d[0]);
                            return void xe(t, e.generated_password)
                        }
                        var n = null;
                        if (this.state.formDict)
                            n = this.state.formDict;
                        else {
                            let e = oe(null, this.state.uuid);
                            n = me(e)
                        }
                        var i = null;
                        t || (i = vn(n));
                        var a = [];
                        i && i.fields ? 0 === (a = o.filter((function(e) {
                            return !i.fields.find((function(t) {
                                return ((e, t) => {
                                        var n = Object.getOwnPropertyNames(e),
                                            i = Object.getOwnPropertyNames(t);
                                        if (n.length != i.length)
                                            return !1;
                                        for (var a = 0; a < n.length; a++) {
                                            var r = n[a];
                                            if (e[r] !== t[r])
                                                return !1
                                        }
                                        return !0
                                    })(t, e) && e.viewable
                            }))
                        }))).length && (a = i.fields) : a = o;
                        for (let t = 0, n = a.length; t < n; t++) {
                            let n = a[t];
                            if (n && 'password' === n.htmlType) {
                                let t = ue(n);
                                xe(t, e.generated_password)
                            }
                        }
                    }
            },
            this.fillLoginItem = e => {
                if (!e)
                    return;
                if (ke() || Se([e.url]))
                    return;
                if (!this.state.loginForm) {
                    let e = oe(),
                        t = me(e);
                    this.state.loginForm = vn(t)
                }
                var t = !1;
                let n = e.webform,
                    i = e.secure_data;
                var a = t => {
                    t && t.isTotpExist && f('CLEAR_TOTP_DATA'),
                    t?.showInlineMenu ? (T.dispatch({
                        type: 'REMOVE_ACTIVE_FIELD'
                    }), T.dispatch({
                        type: 'AUTOFILL_IN_OPERATION',
                        payload: !1
                    }), document.activeElement && e.secure_data && T.dispatch({
                        type: 'SET_ACTIVE_FIELD',
                        payload: document.activeElement
                    })) : T.dispatch({
                        type: 'AUTOFILL_IN_OPERATION',
                        payload: !1
                    })
                };
                if (n)
                    if (-1 !== (location.hostname + location.pathname).indexOf('accounts.google.com'))
                        t = !1;
                    else if (n && n[0] && n[0].valueMap) {
                        let r = void 0 !== typeof e.isUsernameInWebForm && e.isUsernameInWebForm,
                            l = void 0 !== typeof e.isEmailInWebForm && e.isEmailInWebForm,
                            s = {
                                autoSubmit: i.autoSubmit,
                                totp_1: i.totp_1,
                                totp_1_valid: i.totp_1_valid,
                                totp_2: i.totp_2,
                                totp_2_valid: i.totp_2_valid
                            };
                        T.dispatch({
                            type: 'AUTOFILL_IN_OPERATION',
                            payload: !0
                        }),
                        t = Vn(n, s, this.state.loginForm, r && l ? null : {
                            username: i.username,
                            user_name: i.user_name,
                            email: i.email
                        }, a)
                    }
                if (!(e.uuid && e.uuid !== this.state.uuid || t)) {
                    let t = null,
                        n = null;
                    if (this.state.loginForm || (t = oe(), n = me(t), this.state.loginForm = vn(n)), this.state.loginForm)
                        T.dispatch({
                            type: 'AUTOFILL_IN_OPERATION',
                            payload: !0
                        }),
                        Fn(this.state.loginForm, {
                            clientData: e.secure_data,
                            uuid: T.getState().uuid
                        }, a);
                    else {
                        const n = t.filter((e => {
                            if (['email', 'text'].includes(e.htmlType) && e.visible) {
                                if (Ie(e))
                                    return !0;
                                if (Yt(e) > 0)
                                    return !0
                            }
                            return !1
                        }));
                        if (n && n.length > 0) {
                            if (T.dispatch({
                                type: 'AUTOFILL_IN_OPERATION',
                                payload: !0
                            }), Ie(n[0])) {
                                const t = ue(n[0]);
                                xe(t, e.secure_data.email || e.secure_data.username)
                            }
                            T.dispatch({
                                type: 'AUTOFILL_IN_OPERATION',
                                payload: !1
                            })
                        }
                    }
                }
            },
            this.delayTotpDeductionBy = e => {
                const t = new URL(e);
                if (t && t.hostname) {
                    if (/.*okta\.com$/gi.test(t.hostname))
                        return 1800
                }
                return 1
            },
            this.shortcutKeyChanged = e => {
                e ? this.bindShortcutKey(e) : '' === e && (Zn.unbind(this.state.keyShortcut), this.state.keyShortcut = e)
            },
            this.bindShortcutKey = (e, t, n) => {
                if (e) {
                    const i = e.toLowerCase();
                    this.state && this.state.keyShortcut && this.state.keyShortcut[t] && Zn.unbind(this.state.keyShortcut[t]),
                    this.state.keyShortcut[t] = i,
                    Zn.bindGlobal(this.state.keyShortcut[t], n, 'keydown')
                } else
                    this.state && this.state.keyShortcut && this.state.keyShortcut[t] && Zn.unbind(this.state.keyShortcut[t])
            },
            this.turnOffAutoCapture = () => {
                this.state.doFormCapture = !1,
                setTimeout((() => {
                    this.state.doFormCapture = !0
                }), 1e3)
            },
            this.fillCreditCardItem = e => {
                if (!ke() && !Se([e.url]))
                    if (this.state.creditCardForm)
                        xt(this.state.creditCardForm, e.secure_data);
                    else {
                        var t = oe(),
                            n = me(t),
                            i = Ft(n, !0);
                        i && (i.cardNumberField || i.cardHolderField || i.cardTypeField || i.cvvField) && xt(i, e.secure_data)
                    }
            }
        }
    }
    !function(e) {
        var t = [],
            n = null,
            a = [],
            r = !1,
            l = null,
            s = e.prototype.handleKey;
        function o(e, t, n) {
            if (this.recording)
                if ('keydown' == n.type) {
                    for (1 === e.length && r && u(), i = 0; i < t.length; ++i)
                        d(t[i]);
                    d(e)
                } else
                    'keyup' == n.type && a.length > 0 && u();
            else
                s.apply(this, arguments)
        }
        function d(e) {
            var t;
            for (t = 0; t < a.length; ++t)
                if (a[t] === e)
                    return;
            a.push(e),
            1 === e.length && (r = !0)
        }
        function u() {
            t.push(a),
            a = [],
            r = !1,
            clearTimeout(l),
            l = setTimeout(c, 1e3)
        }
        function c() {
            n && (!function(e) {
                var t;
                for (t = 0; t < e.length; ++t)
                    e[t].sort((function(e, t) {
                        return e.length > 1 && 1 === t.length ? -1 : 1 === e.length && t.length > 1 || e > t ? 1 : -1
                    })),
                    e[t] = e[t].join('+')
            }(t), n(t)),
            t = [],
            n = null,
            a = []
        }
        e.prototype.record = function(e) {
            var t = this;
            t.recording = !0,
            n = function() {
                t.recording = !1,
                e.apply(t, arguments)
            }
        },
        e.prototype.handleKey = function() {
            o.apply(this, arguments)
        },
        e.init()
    }(Mousetrap);
    const ni = function(e) {
        var t = [],
            n = null,
            i = [],
            a = !1,
            r = null,
            l = e.prototype.handleKey;
        function s(e, t, n) {
            if (this.recording)
                if ('keydown' == n.type) {
                    1 === e.length && a && d();
                    for (var r = 0; r < t.length; ++r)
                        o(t[r]);
                    o(e)
                } else
                    'keyup' == n.type && i.length > 0 && d();
            else
                l.apply(this, arguments)
        }
        function o(e) {
            var t;
            for (t = 0; t < i.length; ++t)
                if (i[t] === e)
                    return;
            i.push(e),
            1 === e.length && (a = !0)
        }
        function d() {
            t.push(i),
            i = [],
            a = !1,
            clearTimeout(r),
            r = setTimeout(u, 1e3)
        }
        function u() {
            n && (!function(e) {
                var t;
                for (t = 0; t < e.length; ++t)
                    e[t].sort((function(e, t) {
                        return e.length > 1 && 1 === t.length ? -1 : 1 === e.length && t.length > 1 || e > t ? 1 : -1
                    })),
                    e[t] = e[t].join('+')
            }(t), n(t)),
            t = [],
            n = null,
            i = []
        }
        return e.prototype.record = function(e) {
            var t = this;
            t.recording = !0,
            n = function() {
                t.recording = !1,
                e.apply(t, arguments)
            }
        }, e.prototype.handleKey = function() {
            s.apply(this, arguments)
        }, e.init(), e
    }(Zn);
    function ii(e) {
        if (!e)
            return !0;
        try {
            const {hostname: t} = new URL(document.URL);
            return t.endsWith(`.${e}`) || t === e
        } catch (e) {
            return !1
        }
    }
    function ai(e) {
        return e ? new URL(e).hostname.split(/\./).slice(-2).join('.') : ''
    }
    const ri = 'https://auth.enpass.io/extension/v2/error_static/',
        li = 'https://auth.enpass.io/extension/v2/error_log/',
        si = 'https://auth.enpass.io/extension/v2/pairing/',
        oi = 'https://auth.enpass.io/extension/v2/settings/';
    if ([ri, li, si, oi].includes(document.URL))
        window.top === window.self && (document.URL === ri ? function() {
            let e = null;
            const t = 'support@enpass.io',
                n = {
                    error_static_main_heading: 'Connection Error!',
                    error_static_highlight: 'Enpass Assistant is unable to connect with the Enpass app.',
                    error_static_description: `Please make sure that Enpass app is installed, running in the background, and also the extension is enabled from the Enpass browser settings. If you still encounter any issue, please drop us an email at <a href='mailto:${t}'>${t}</a>.`,
                    heading_app_lookup: 'Looking for Enpass App…',
                    error_static_highlight_3: 'If found, you will be prompted to open Enpass.'
                };
            function i() {
                const e = document.getElementById('main_header'),
                    t = document.getElementById('error_highlight_text'),
                    n = document.getElementById('error_description'),
                    i = document.getElementById('loader');
                !function() {
                    const e = document.querySelector('.error-highlight'),
                        t = document.querySelector('.section-header');
                    e && (e.classList.remove('error-highlight--success'), e.classList.add('error-highlight--error')),
                    t && (t.classList.remove('bg-success-header'), t.classList.add('bg-error-header'))
                }(),
                e && (e.textContent = r('error_static_main_heading')),
                t && (t.textContent = r('error_static_highlight')),
                n && (n.innerHTML = r('error_static_description'), n.style.display = 'block'),
                i && (i.style.display = 'none'),
                function() {
                    const e = document.querySelector('section.body_content');
                    e && (e.style.display = 'block')
                }(),
                function() {
                    const e = document.getElementById('footer');
                    e && (e.style.display = 'block')
                }()
            }
            function a() {
                const e = document.querySelector('.error-highlight'),
                    t = document.querySelector('.section-header');
                e && (e.classList.remove('error-highlight--error'), e.classList.add('error-highlight--success')),
                t && (t.classList.remove('bg-error-header'), t.classList.add('bg-success-header'))
            }
            function r(e) {
                return n[e]
            }
            document.addEventListener('click', (function(e) {
                if ('retry_link' === e.target.id) {
                    a();
                    const e = document.getElementById('main_header'),
                        t = document.getElementById('error_highlight_text'),
                        n = document.getElementById('error_description'),
                        i = document.getElementById('loader');
                    e && (e.textContent = r('heading_app_lookup')),
                    t && (t.textContent = r('error_static_highlight_3')),
                    n && (n.style.display = 'none'),
                    i && (i.style.display = 'block'),
                    function() {
                        const e = document.getElementById('footer');
                        e && (e.style.display = 'none')
                    }(),
                    function() {
                        const e = document.querySelector('section.body_content');
                        e && (e.style.display = 'none')
                    }(),
                    f('retry_connection')
                }
            }), !0),
            document.addEventListener('DOMContentLoaded', (function() {
                a();
                let t = document.getElementById('main_header'),
                    n = document.getElementById('error_highlight_text'),
                    l = document.getElementById('error_description');
                t.textContent = r('heading_app_lookup'),
                n.textContent = r('error_static_highlight_3'),
                l.style.display = 'none',
                document.getElementById('loader').style.display = 'block',
                document.title = 'Enpass',
                setTimeout((() => {
                    i()
                }), 1e4),
                setTimeout((() => {
                    f('is_connected'),
                    e = setInterval((() => {
                        f('close_on_connect')
                    }), 1e3)
                }), 1e3)
            })),
            p((function(t, n) {
                const l = document.getElementById('main_header'),
                    s = document.getElementById('error_highlight_text'),
                    o = document.getElementById('error_description');
                switch (t) {
                case 'start_app':
                    a(),
                    l && (l.textContent = r('heading_app_lookup')),
                    s && (s.textContent = r('error_static_highlight_3')),
                    o && (o.style.display = 'none'),
                    setTimeout((() => i()), 1e4),
                    window.location.href = 'enpassstart://';
                    break;
                case 'show_connection_error':
                    clearTimeout(null),
                    i();
                    break;
                case 'connected_to_app':
                    window.close();
                    break;
                case 'clear_connected_interval':
                    clearInterval(e)
                }
            }))
        }() : document.URL === li ? function() {
            const e = 'support@enpass.io',
                t = {
                    error_log_main_heading_403: 'Error 403',
                    error_log_main_heading_8: 'Error 8',
                    error_log_sub_heading_forbidden: 'Access Denied/Forbidden',
                    error_log_highlight: 'Enpass app has denied access to data.',
                    error_log_highlight7: 'Oops! This browser has been blocked to make connection with Enpass.',
                    error_log_highlight_8: 'Enpass app has stopped communication with the extension.',
                    share_string: `You can share the following diagnostics with us at <a href='mailto:${e}'>${e}</a>.`,
                    error_log_code_1: 'Unable to fetch process information of connected browser.',
                    error_log_code_2: 'The installed Enpass extension for Browser seems to be unauthorized. Please make sure you have installed it from the legitimate source.',
                    error_log_code_3: 'Browser requesting the data is not code signed.',
                    error_log_code_4: 'Some other user(s) in this system is already connected to Enpass app on specific port.',
                    error_log_code_5: 'Unknown Error.',
                    error_log_code_8: 'Connecting browser is not in foreground. It seems some application other than the connecting browser is in focus.',
                    error_log_code_7: 'This is because you have 3-times rejected the connection request made by the browser. You can unblock the browser from Enpass Settings > Browser > Browser Authorization > Review Browser > Find the browser name, tap on Remove, and done.',
                    error_setup_heading: 'Setup Required',
                    error_setup_description: 'Before using Extension, you need to set up Enpass app with a master password.',
                    error_update_heading: 'Update Required',
                    error_update_highlight: 'Extension is unable to connect with Enpass',
                    error_update_description: 'You are using an older version of Enpass. The extension requires Enpass version 6.0.0 or later be installed first.'
                };
            function n(e) {
                let t = document.querySelector('.section-logs');
                if (e && t) {
                    let n = function(e) {
                        if (!e)
                            return;
                        var t = document.querySelector('.log-list');
                        t && t.parentNode.removeChild(t);
                        let n = document.createElement('section');
                        n.className = 'log-list';
                        for (const t in e) {
                            let a = i(t, e[t]);
                            n.appendChild(a)
                        }
                        return n
                    }(e);
                    t.appendChild(n)
                }
            }
            function i(e, t) {
                if (!e || !t)
                    return '';
                let n = document.createElement('section');
                n.className = 'log-item';
                let i = function(e) {
                        if (!e)
                            return '';
                        let t = document.createElement('h4');
                        return t.className = 'log-item-header', t.textContent = e, t
                    }(e),
                    r = function(e) {
                        if (!e)
                            return '';
                        let t = document.createElement('ul');
                        t.className = 'log-item-list';
                        for (const n in e) {
                            let i = a(n, e[n]);
                            t.appendChild(i)
                        }
                        return t
                    }(t);
                return n.appendChild(i), n.appendChild(r), n
            }
            function a(e, t) {
                let n = null;
                if (!e && !t)
                    return '';
                e && (n = e + ' : '),
                n += t || '';
                let i = document.createElement('li');
                return i.textContent = n, i
            }
            function r(e) {
                let t = document.getElementById('main_header');
                t && (t.textContent = e, t.style.display = 'block')
            }
            function l() {
                let e = document.getElementById('main_sub_header');
                e && (e.style.display = 'none')
            }
            function s(e) {
                let t = document.getElementById('error_highlight_text');
                t && (t.textContent = e);
                let n = document.querySelector('.error-highlight');
                n && (n.style.display = 'block')
            }
            function o(e) {
                let t = document.getElementById('error_description');
                t && (t.style.display = 'block', t.innerHTML = e)
            }
            function d(e) {
                let t = document.querySelector('.section-logs');
                t && (t.style.display = 'block', n(e))
            }
            function u(e) {
                return t[e]
            }
            !function(e) {
                let t = document.querySelector('.error-highlight');
                t && (t.style.display = 'none')
            }(),
            function() {
                let e = document.querySelector('.section-logs');
                e && (e.style.display = 'none')
            }(),
            function() {
                let e = document.getElementById('section_summary_header');
                e && (e.style.display = 'none')
            }(),
            function(e) {
                let t = document.getElementById('error_description');
                t && (t.style.display = 'none')
            }(),
            function() {
                let e = document.getElementById('main_header');
                e && (e.style.display = 'none')
            }(),
            l(),
            p((function(e, t) {
                switch (e) {
                case 'update_error_logs':
                    !function(e) {
                        if (e)
                            switch (e.code) {
                            case 2:
                                !function(e) {
                                    r(u('error_log_main_heading_403')),
                                    s(u('error_log_highlight')),
                                    o(u('error_log_code_2') + ' ' + u('share_string')),
                                    d(e.logs)
                                }(e);
                                break;
                            case 3:
                                !function(e) {
                                    r(u('error_log_main_heading_403')),
                                    s(u('error_log_highlight')),
                                    o(u('error_log_code_3') + ' ' + u('share_string')),
                                    d(e.logs)
                                }(e);
                                break;
                            case 4:
                                !function(e) {
                                    r(u('error_log_main_heading_403')),
                                    s(u('error_log_highlight')),
                                    o(u('error_log_code_4') + ' ' + u('share_string')),
                                    d(e.logs)
                                }(e);
                                break;
                            case 1:
                            case 5:
                                !function(e) {
                                    r(u('error_log_main_heading_403')),
                                    s(u('error_log_highlight')),
                                    o(u('error_log_code_1') + ' ' + u('share_string')),
                                    d(e.logs)
                                }(e);
                                break;
                            case 8:
                                !function(e) {
                                    r(u('error_log_main_heading_8')),
                                    l(),
                                    s(u('error_log_highlight_8')),
                                    o(u('error_log_code_8')),
                                    d(e.logs)
                                }(e);
                                break;
                            case 404:
                                r(u('error_setup_heading')),
                                o(u('error_setup_description'))
                            }
                    }(t);
                    break;
                case 'close_log_tab':
                    window.close();
                    break;
                case 'setup_required':
                    r(u('error_setup_heading')),
                    o(u('error_setup_description'));
                    break;
                case 'update_app':
                    !function(e) {
                        r(u('error_update_heading')),
                        s(u('error_update_highlight')),
                        o(function(e) {
                            return `You are using an older version of Enpass. The extension requires Enpass version ${e} or later be installed first.`
                        }(e));
                        const t = document.getElementById('link_learnmore'),
                            n = document.getElementById('link_updatenow');
                        t && t.classList.add('hide'),
                        n && (n.classList.remove('hide'), n.classList.add('show'))
                    }(t.minRequiredVersion);
                    break;
                case 'update_extension':
                    !function(e) {
                        r(u('error_update_heading')),
                        s(u('error_update_highlight')),
                        o(u('error_update_description'));
                        const t = document.getElementById('link_learnmore'),
                            n = document.getElementById('link_updatenow');
                        t.style.display = 'none',
                        n.style.display = 'block'
                    }(t.minRequiredVersion)
                }
            })),
            document.addEventListener('DOMContentLoaded', (e => {
                f('get_updated_error_logs')
            })),
            window.addEventListener('beforeunload', (e => {
                f('closing_error_log')
            })),
            document.addEventListener('click', (e => {
                if ('log_header_toggle' === e.target.id) {
                    let e = document.getElementById('log_header_toggle'),
                        t = document.querySelector('.log-list');
                    e && (e.className = 'down-arrow' === e.className ? 'right-arrow' : 'down-arrow'),
                    t && ('down-arrow' === e.className ? t.style.display = 'block' : t.style.display = 'none')
                }
            }), !0)
        }() : document.URL === si ? function() {
            const e = {
                    pairing_description: 'Please enter this passcode in the Enpass Assistant to authenticate the browser and set up a connection between the browser and the Enpass app.',
                    pairing_pin_error_description: 'The passcode you entered in the Enpass Assistant did not match the passcode visible on the browser.',
                    pairing_highlight_error: 'Passcode Mismatch',
                    pairing_main_header1: 'Authentication Passcode',
                    pairing_main_header2: 'Authentication Failed!'
                },
                t = y('pairing_description'),
                n = y('pairing_pin_error_description'),
                i = y('pairing_highlight_error'),
                a = y('pairing_main_header1'),
                r = y('pairing_main_header2'),
                l = document.getElementById('pairing_main_heading');
            let s = null,
                o = !1;
            function d() {
                const e = document.getElementById('section_loading_code');
                e && (e.style.display = 'none')
            }
            function u() {
                const e = document.getElementById('pin_description');
                e && (e.textContent = n);
                const t = document.getElementById('pairing_main_heading');
                t && (t.textContent = r),
                function(e) {
                    let t = document.getElementById('error_highlight_text');
                    t && (t.textContent = e);
                    let n = document.querySelector('.error-highlight');
                    n && (n.style.display = 'block')
                }(i),
                function() {
                    let e = document.getElementById('section_header');
                    e && e.classList.add('bg-error-header')
                }(),
                function() {
                    let e = document.querySelector('.footer');
                    e && (e.style.display = 'flex'),
                    document.getElementById('retry_link').focus()
                }(),
                g(),
                d(),
                o = !1
            }
            function c() {
                const e = document.getElementById('sub_header');
                e && (e.textContent = '', e.style.display = 'none')
            }
            function m() {
                let e = document.getElementById('section_header');
                e && e.classList.remove('bg-error-header')
            }
            function h(e) {
                let t = document.querySelector('.error-highlight');
                t && (t.style.display = 'none')
            }
            function g() {
                let e = document.querySelector('.section-pin');
                e && (e.style.display = 'none')
            }
            function b() {
                let e = document.querySelector('.footer');
                e && (e.style.display = 'none')
            }
            function y(t) {
                return e[t]
            }
            l && (l.textContent = a),
            document.addEventListener('DOMContentLoaded', (function() {
                f('fetch_cached_pin'),
                s = setTimeout((() => {
                    o || u()
                }), 1e3),
                setInterval((function() {
                    f('isPaired')
                }), 500)
            })),
            document.addEventListener('click', (function(e) {
                'retry_link' === e.target.id && f('fetch_pairing_pin')
            }), !0),
            p((function(e, n) {
                switch (e) {
                case 'CACHED_PAIRING_PIN':
                case 'DISPLAY_PAIRING_PIN':
                    n && n.generated_pin && (clearTimeout(s), function(e) {
                        ('' + e).split('').forEach(((e, t) => {
                            let n = document.getElementById(`digit_${t + 1}`);
                            n && (n.textContent = e)
                        }));
                        const n = document.getElementById('pairing_main_heading');
                        n && (n.textContent = a);
                        const i = document.getElementById('section-pin');
                        i && (i.style.display = 'flex');
                        const r = document.getElementById('pin_description');
                        r && (r.textContent = t),
                        c(),
                        m(),
                        h(),
                        b(),
                        function() {
                            let e = document.querySelector('.section-pin');
                            e && (e.style.display = 'flex')
                        }(),
                        d(),
                        o = !0
                    }(n.generated_pin));
                    break;
                case 'CLOSE_PAIRING_PAGE':
                    f('internal_pairing_page_closing'),
                    window.close();
                    break;
                case 'SRP_PAIRING_FAILED':
                    u()
                }
            })),
            function() {
                const e = document.getElementById('section_loading_code');
                e && (e.style.display = 'flex'),
                g(),
                c(),
                m(),
                h(),
                b()
            }()
        }() : document.URL === oi && function() {
            let e = {
                activate: '',
                autofill: '',
                lock: ''
            };
            const t = {
                activate: 'meta+shift+.',
                autofill: 'meta+shift+a',
                lock: 'meta+shift+l'
            };
            let n = new Set;
            function i(t, n) {
                const i = document.getElementById(`shortcut_input_${n}`);
                var r;
                i && (e[n] = (r = t[n]) ? (-1 !== (r = r.toLowerCase()).indexOf('pgup') && (r = r.replace('pgup', 'pageup')), -1 !== r.indexOf('pgdown') && (r = r.replace('pgdown', 'pagedown')), r) : null, i.value = a(e[n]), i.placeholder = 'Type a shortcut')
            }
            function r(t, n) {
                let i;
                '_execute_browser_action' === n && (i = 'activate'),
                'autofill' === n && (i = 'autofill'),
                'lock' === n && (i = 'lock'),
                t.target.value || (t.target.value = a(e[i] || ''))
            }
            function l(t, n) {
                const i = t.target,
                    r = i.value;
                i.value = '',
                i.placeholder = 'Type a shortcut';
                const l = o(n);
                document.getElementById(`shortcut_error_${l}`).style.display = 'none',
                ni.record((function(t) {
                    let s = function(e, t) {
                        var n = 0,
                            i = 0;
                        if (-1 !== e.indexOf('enter'))
                            return '';
                        n += -1 !== (e = e.toLowerCase()).indexOf('shift') ? 1 : 0,
                        n += -1 !== e.indexOf('ctrl') ? 1 : 0,
                        n += -1 !== e.indexOf('alt') ? 1 : 0,
                        n += -1 !== e.indexOf('meta') ? 1 : 0;
                        var a = e.split('+').length;
                        if (i = a - n, a === n || 0 === n)
                            return d(t), '';
                        {
                            if (i > 1)
                                return d(t), '';
                            let n = e.split('+');
                            const a = n.length;
                            return a > 2 && n.indexOf('shift') === a - 1 && ([n[1], n[a - 1]] = [n[a - 1], n[1]], e = n.join('+')), e
                        }
                    }(t[t.length - 1], n);
                    if (s)
                        if (s = function(e) {
                            var t = e.indexOf('meta');
                            if (-1 !== t && 0 !== t) {
                                for (var n = e.split('+'), i = null, a = 0, r = n.length; a < r; a++)
                                    if ('meta' == n[a]) {
                                        i = a;
                                        break
                                    }
                                return null !== i && n.splice(0, 0, n.splice(i, 1)[0]), n.join('+')
                            }
                            return e
                        }(s), Object.values(e).includes(s))
                            i.value = r;
                        else {
                            e[l] = s;
                            const t = a(s);
                            i.value = t,
                            f(`set_shortcut_${l}`, {
                                shortcut: s
                            })
                        }
                    else
                        i.value = r;
                    i.blur()
                }))
            }
            function s(t, n) {
                const i = o(n),
                    a = document.getElementById(`shortcut_input_${i}`);
                a && (a.value = '', a.placeholder = 'Type a shortcut', e[i] = ''),
                f(`set_shortcut_${i}`, {
                    shortcut: ''
                })
            }
            function o(e) {
                let t = 'activate';
                return 'autofill' === e && (t = 'autofill'), 'lock' === e && (t = 'lock'), t
            }
            function d(e) {
                const t = o(e),
                    n = document.getElementById(`shortcut_error_${t}`);
                n && (n.style.display = 'block', setTimeout((function() {
                    n.style.display = 'none'
                }), 2e3))
            }
            function u(e) {
                if (e) {
                    let t = '';
                    if (e && n.has(e))
                        t = 'URL already exists.',
                        document.getElementById('inline_url_error').textContent = t,
                        document.getElementById('inline_url_error').style.display = 'block',
                        setTimeout((function() {
                            document.getElementById('inline_url_error').style.display = 'none'
                        }), 2e3);
                    else {
                        n.add(e);
                        const t = [...n];
                        c(t),
                        f('set_blocked_urls', {
                            inline_blocked_urls: t.join('|')
                        })
                    }
                }
            }
            function c(e) {
                document.querySelector('div.list').innerHTML = '';
                const t = t => {
                    const i = t.target.parentElement,
                        a = i.querySelector('div').textContent;
                    e.splice(e.indexOf(a), 1),
                    n.delete(a),
                    f('set_blocked_urls', {
                        inline_blocked_urls: e.join('|')
                    }),
                    document.querySelector('div.list').removeChild(i)
                };
                e.length > 0 && e.forEach((e => {
                    !function(e, t) {
                        const n = document.createElement('div'),
                            i = document.createElement('div'),
                            a = document.createElement('button');
                        i.textContent = e,
                        i.classList.add('item-url'),
                        a.classList.add('close-btn'),
                        a.textContent = 'X',
                        n.classList.add('list-item'),
                        n.append(i),
                        n.append(a),
                        document.querySelector('div.list').append(n),
                        a.addEventListener('click', t)
                    }(e, t)
                }))
            }
            p((function(e, t) {
                switch (e) {
                case 'fetch_shortcut_key_result':
                    i(t, 'activate'),
                    i(t, 'autofill'),
                    i(t, 'lock');
                    break;
                case 'fetch_preferences_result':
                    if (i(t.shortcut_key, 'activate'), i(t.shortcut_key, 'autofill'), i(t.shortcut_key, 'lock'), function(e) {
                        const t = document.getElementById('inline_menu_setting'),
                            n = document.getElementById('inline_dashboard');
                        t && (t.checked = e),
                        !e && n && (n.style.display = 'none')
                    }(t.show_inline_menu), function(e) {
                        const t = document.getElementById('menu_theme');
                        t && (t.value = e)
                    }(t.inline_menu_theme), function(e) {
                        const t = document.getElementById('autofill_setting');
                        t && (t.checked = e)
                    }(t.auto_login), function(e) {
                        const t = document.getElementById('passkey_toggle');
                        t && (t.checked = e)
                    }(t.enable_passkey), t.inline_blocked_urls) {
                        const e = t.inline_blocked_urls.split('|');
                        c(e),
                        n = new Set(e)
                    }
                }
            })),
            document.addEventListener('DOMContentLoaded', (n => {
                const i = document.getElementById('shortcut_input_activate'),
                    d = document.getElementById('shortcut_input_autofill'),
                    c = document.getElementById('shortcut_input_lock'),
                    m = document.getElementById('reset_btn_activate'),
                    h = document.getElementById('default_btn_activate'),
                    p = document.getElementById('reset_btn_autofill'),
                    g = document.getElementById('reset_btn_lock'),
                    b = document.getElementById('add_inline_url'),
                    y = document.getElementById('inline_menu_setting'),
                    v = document.getElementById('autofill_setting'),
                    w = document.getElementById('menu_theme'),
                    _ = document.querySelector('#inline_url'),
                    L = document.getElementById('passkey_toggle'),
                    I = document.getElementById('passkey_toggle_container');
                I && (I.style.display = 'flex'),
                b && (b.disabled = !0),
                f('fetch_shortcut_key'),
                f('fetch_preferences'),
                _ && (_.addEventListener('keydown', (e => {
                    let t = _ ? _.value : '';
                    if ('Enter' === e.key) {
                        try {
                            const e = new URL(t);
                            u(e.origin + e.pathname)
                        } catch (e) {
                            u(t)
                        }
                        _.value = '',
                        b && (b.disabled = !0)
                    }
                })), _.addEventListener('keyup', (() => {
                    b && ('' === _.value ? b.disabled = !0 : b.disabled = !1)
                }))),
                i && (i.addEventListener('focus', (e => {
                    l(e, '_execute_browser_action')
                })), i.addEventListener('blur', (e => {
                    r(e, '_execute_browser_action')
                }))),
                d && (d.addEventListener('focus', (e => {
                    l(e, 'autofill')
                })), d.addEventListener('blur', (e => {
                    r(e, 'autofill')
                }))),
                c && (c.addEventListener('focus', (e => {
                    l(e, 'lock')
                })), c.addEventListener('blur', (e => {
                    r(e, 'lock')
                }))),
                m && m.addEventListener('click', (e => {
                    s(e, '_execute_browser_action')
                })),
                h && h.addEventListener('click', (n => {
                    !function(n, i) {
                        const r = o('_execute_browser_action'),
                            l = document.getElementById(`shortcut_input_${r}`);
                        l && (l.value = a(t[r]), e[r] = t[r]),
                        f(`set_shortcut_${r}`, {
                            shortcut: t[r]
                        })
                    }()
                })),
                p && p.addEventListener('click', (e => {
                    s(e, 'autofill')
                })),
                g && g.addEventListener('click', (e => {
                    s(e, 'lock')
                })),
                b && b.addEventListener('click', (function(e) {
                    const t = document.querySelector('#inline_url').value;
                    try {
                        const e = new URL(t);
                        u(e.origin + e.pathname)
                    } catch (e) {
                        u(t)
                    }
                    document.querySelector('#inline_url').value = '',
                    b && (b.disabled = !0)
                })),
                L && L.addEventListener('change', (function(e) {
                    f('toggle_passkey', {
                        enable_passkey: this.checked
                    })
                })),
                y && y.addEventListener('change', (function(e) {
                    const t = document.getElementById('inline_dashboard');
                    f('toggle_inline_menu', {
                        show_inline_menu: this.checked
                    }),
                    this.checked ? t.style.display = 'block' : t.style.display = 'none'
                })),
                v && v.addEventListener('change', (function(e) {
                    f('toggle_auto_login', {
                        auto_login: this.checked
                    })
                })),
                w && w.addEventListener('change', (function(e) {
                    f('set_menu_theme', {
                        inline_menu_theme: e.target.value
                    })
                }))
            }))
        }());
    else {
        (new ti).init(),
        document.addEventListener('DOMContentLoaded', (() => {
            !function() {
                const t = e();
                if (['SAFARI', 'FIREFOX'].includes(t) && !window.webauthnInterceptorFirefoxInjected) {
                    window.webauthnInterceptorFirefoxInjected = !0;
                    const e = document.createElement('script');
                    e.src = g('injected/scripts/webauthnInterceptor.js'),
                    (document.head || document.documentElement).appendChild(e),
                    e.remove()
                }
            }()
        })),
        window.top === window.self && (y.onPasskeyCreation((e => {
            const t = {
                command: 'passkey_creation_intercepted_response',
                payload: Object.assign({}, e)
            };
            window.postMessage(t)
        })), y.onPasskeyAuthentication((e => {
            const t = {
                command: 'passkey_authentication_intercepted_response',
                payload: Object.assign({}, e)
            };
            window.postMessage(t)
        })), window.addEventListener('message', (e => {
            const t = e.data,
                n=t?.command,
                i=t?.payload,
                a=i?.request;
            switch (n) {
            case 'passkey_creation_intercepted':
                if (a?.rp?.id || (a.rp.id = ai(document.URL)), ii(a?.rp?.id) && window.origin === i.origin)
                    f('initiate_passkey_creation', Object.assign({}, i));
                else {
                    const {origin: e, uuid: t} = i,
                        n = {
                            command: 'passkey_creation_intercepted_response',
                            payload: {
                                useBrowserMethod: !0,
                                error: {
                                    rpid: !0,
                                    description: 'rpid does not match with origin'
                                },
                                uuid: t,
                                origin: e
                            }
                        };
                    window.postMessage(n)
                }
                break;
            case 'passkey_authentication_intercepted':
                if (a?.rp?.id && (a.rp.id = ai(document.URL)), ii(a?.rpId) && window.origin === i.origin)
                    f('initiate_passkey_authentication', Object.assign({}, i));
                else {
                    const {origin: e, uuid: t} = i,
                        n = {
                            command: 'passkey_authentication_intercepted_response',
                            payload: {
                                useBrowserMethod: !0,
                                error: {
                                    rpid: !0,
                                    description: 'rpid does not match with origin'
                                },
                                uuid: t,
                                origin: e
                            }
                        };
                    window.postMessage(n)
                }
            }
        })))
    }
}();
