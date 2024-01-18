!function() {
    'use strict';
    for (var e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', t = 'undefined' == typeof Uint8Array ? [] : new Uint8Array(256), n = 0; n < 64; n++)
        t[e.charCodeAt(n)] = n;
    const r = t => {
            const n = function(t) {
                var n,
                    r = new Uint8Array(t),
                    i = r.length,
                    o = '';
                for (n = 0; n < i; n += 3)
                    o += e[r[n] >> 2],
                    o += e[(3 & r[n]) << 4 | r[n + 1] >> 4],
                    o += e[(15 & r[n + 1]) << 2 | r[n + 2] >> 6],
                    o += e[63 & r[n + 2]];
                return i % 3 == 2 ? o = o.substring(0, o.length - 1) + '=' : i % 3 == 1 && (o = o.substring(0, o.length - 2) + '=='), o
            }(t);
            return n.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
        },
        i = e => {
            var n;
            return function(e) {
                var n,
                    r,
                    i,
                    o,
                    s,
                    a = .75 * e.length,
                    c = e.length,
                    d = 0;
                '=' === e[e.length - 1] && (a--, '=' === e[e.length - 2] && a--);
                var l = new ArrayBuffer(a),
                    p = new Uint8Array(l);
                for (n = 0; n < c; n += 4)
                    r = t[e.charCodeAt(n)],
                    i = t[e.charCodeAt(n + 1)],
                    o = t[e.charCodeAt(n + 2)],
                    s = t[e.charCodeAt(n + 3)],
                    p[d++] = r << 2 | i >> 4,
                    p[d++] = (15 & i) << 4 | o >> 2,
                    p[d++] = (3 & o) << 6 | 63 & s;
                return l
            }((n = e).replace(/-/g, '+').replace(/_/g, '/').padEnd(n.length + (4 - n.length % 4) % 4, '='))
        };
    if ('credentials' in navigator) {
        const e = CredentialsContainer.prototype.create.bind(navigator.credentials),
            t = CredentialsContainer.prototype.get.bind(navigator.credentials);
        CredentialsContainer.prototype.create = function(t) {
            return new Promise(((n, a) => {
                if (!s(window.origin) || !t?.publicKey?.user?.id)
                    return void e(t).then(n).catch(a);
                const c = o(),
                    d = r => {
                        const o = r.data,
                            s = o.command,
                            l = o.payload;
                        if (!s || !l)
                            return;
                        const p = l.origin === window.origin;
                        if (c === l.uuid && 'passkey_creation_intercepted_response' === s && p) {
                            if (window.removeEventListener('message', d), l.useBrowserMethod)
                                return void e(t).then(n).catch(a);
                            if (l.useEnpass) {
                                const e = l.result;
                                e.rawId = i(e.rawId),
                                e.response.attestationObject = i(e.response.attestationObject),
                                e.response.clientDataJSON = i(e.response.clientDataJSON),
                                e.getClientExtensionResults = () => new ArrayBuffer(0),
                                e.response.getTransports = () => ['internal', 'hybrid'];
                                const r = Object.assign({}, e, {
                                    signal:t?.signal
                                });
                                return Object.setPrototypeOf(r.response, AuthenticatorAttestationResponse.prototype), Object.setPrototypeOf(r, PublicKeyCredential.prototype), void n(r)
                            }
                            a(new Error('Unknown error'))
                        }
                    };
                if (window.addEventListener('message', d),t?.publicKey) {
                    const e = Object.assign({}, t.publicKey.user, {
                        id: r(t.publicKey.user.id)
                    });
                    let n;
                    t.publicKey.excludeCredentials?.length > 0 && (n = t.publicKey.excludeCredentials.map((e => ({
                        ...e,
                        id: r(e.id)
                    }))));
                    const i = Object.assign({},t?.publicKey, {
                            challenge: r(t.publicKey.challenge),
                            excludeCredentials: n,
                            user: e
                        }),
                        o = {
                            command: 'passkey_creation_intercepted',
                            payload: {
                                creation_date: Date.now(),
                                origin: window.origin,
                                request: i,
                                uuid: c
                            }
                        };
                    window.postMessage(o)
                } else
                    a()
            }))
        },
        CredentialsContainer.prototype.get = function(e) {
            return new Promise(((n, a) => {
                if (!s(window.origin) || 'conditional' === e.mediation)
                    return void t(e).then(n).catch(a);
                const c = o(),
                    d = r => {
                        const o = r.data,
                            s = o.command,
                            l = o.payload,
                            p = l.origin === window.origin;
                        if (c === l.uuid && 'passkey_authentication_intercepted_response' === s && p) {
                            if (window.removeEventListener('message', d), l.useBrowserMethod)
                                return void t(e).then(n).catch(a);
                            if (l.useEnpass) {
                                const t = l.result;
                                t.rawId = i(t.rawId),
                                t.response.authenticatorData = i(t.response.authenticatorData),
                                t.response.clientDataJSON = i(t.response.clientDataJSON),
                                t.response.signature = i(t.response.signature),
                                t.response.userHandle = i(t.response.userHandle),
                                t.getClientExtensionResults = () => new ArrayBuffer(0),
                                t.response.getTransports = () => ['internal', 'hybrid'];
                                const r = Object.assign({}, t, {
                                    signal:e?.signal
                                });
                                return Object.setPrototypeOf(r.response, AuthenticatorAssertionResponse.prototype), Object.setPrototypeOf(r, PublicKeyCredential.prototype), void n(r)
                            }
                            a(new Error('Unknown error'))
                        }
                    };
                if (window.addEventListener('message', d),e?.publicKey)
                    if ('conditional' === e.publicKey.mediation)
                        t(e).then(n).catch(a);
                    else {
                        let t;
                        e.publicKey.allowCredentials && (t = e.publicKey.allowCredentials.map((e => ({
                            ...e,
                            id: r(e.id)
                        }))));
                        const n = Object.assign({},e?.publicKey, {
                                challenge: r(e.publicKey.challenge),
                                allowCredentials: t
                            }),
                            i = {
                                command: 'passkey_authentication_intercepted',
                                payload: {
                                    creation_date: Date.now(),
                                    origin: window.origin,
                                    request: n,
                                    uuid: c
                                }
                            };
                        window.postMessage(i)
                    }
                else
                    a()
            }))
        }
    }
    function o() {
        return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16)
    }
    function s(e) {
        try {
            return 'https:' === new URL(e).protocol
        } catch (e) {
            return !1
        }
    }
}();
