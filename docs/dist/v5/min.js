// ../json-write-path/src/v4/utils/toArray.js
var e = (e) => Array.isArray(e) ? e : [e], t = (e, t, n) => {
	e[t] = n;
}, n = {
	set: t,
	push: (t, n, r) => {
		t[n].push(...e(r));
	},
	unshift: (t, n, r) => {
		t[n].unshift(...e(r));
	},
	pushToRows: (t, n, r) => {
		t[n].forEach((t) => {
			t.children.push(...structuredClone(e(r)));
		});
	},
	unshiftToRows: (t, n, r) => {
		t[n].forEach((t) => {
			t.children.unshift(...structuredClone(e(r)));
		});
	},
	unshiftSerialToRows: (e, t, n) => {
		e[t].forEach((e, t) => {
			let r = structuredClone(n);
			r.textContent = t + 1, e.children.unshift(r);
		});
	}
}, r = Object.defineProperty, i = Object.getOwnPropertySymbols, a = Object.prototype.hasOwnProperty, o = Object.prototype.propertyIsEnumerable, s = Math.pow, c = (e, t, n) => t in e ? r(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, l = (e, t) => {
	for (var n in t ||= {}) a.call(t, n) && c(e, n, t[n]);
	if (i) for (var n of i(t)) o.call(t, n) && c(e, n, t[n]);
	return e;
}, u = class extends Error {
	constructor(e, t, n) {
		super(n), this.name = "JSONPathSyntaxError", this.line = e, this.charPositionInLine = t, this.msg = n;
	}
}, d = class extends Error {
	constructor() {
		super(...arguments), this.name = "JSONPathLimitError";
	}
}, f = () => void 0, p = (e, t, n, r) => {
	if (r(), typeof e == "string" && typeof t == "string" && e.length === t.length && r(e.length), e === t) return !0;
	if (e === null || t === null || e === void 0 || t === void 0 || typeof e != typeof t || Array.isArray(e) !== Array.isArray(t)) return !1;
	if (Array.isArray(e) && Array.isArray(t)) {
		let r = v(e);
		return r === v(t) && (n.push({
			x: e,
			y: t,
			keys: null,
			length: r,
			i: 0
		}), !0);
	}
	if (typeof e == "object" && typeof t == "object") {
		let i = _(e), a = _(t);
		return r(i.length + a.length), i.length === a.length && (n.push({
			x: e,
			y: t,
			keys: i,
			length: i.length,
			i: 0
		}), !0);
	}
	return !1;
}, m = (e, t, n = f) => {
	let r = [];
	if (!p(e, t, r, n)) return !1;
	for (; r.length > 0;) {
		let e = r[r.length - 1];
		if (e.i >= e.length) r.pop();
		else if (e.keys === null) {
			let t = e.i++;
			if (!p(g(e.x, t), g(e.y, t), r, n)) return !1;
		} else {
			let t = e.i++, i = e.keys[t], a = e.x, o = e.y;
			if (n(i.length), !h(o, i) || !h(a, i)) return !1;
			let s = a[i];
			if (!h(o, i) || !p(s, o[i], r, n)) return !1;
		}
	}
	return !0;
}, h = (e, t) => Object.prototype.hasOwnProperty.call(e, t), g = (e, t) => h(e, t) ? e[t] : void 0, ee = 16383, te = 1e3, _ = (e) => {
	let t = Object.keys(e);
	for (let e of t) if (e.length > te) throw new d(`Member name too long (maximum ${te} characters)`);
	return t;
}, v = (e) => {
	let t = e.length;
	if (!Number.isSafeInteger(t) || t < 0 || t > 4294967295) throw TypeError("Invalid array length");
	return t;
}, y = (e) => e instanceof RangeError && /call stack/i.test(e.message), b = (e) => Array.isArray(e), ne = (e) => e instanceof RangeError && /Invalid (string|array|typed array) length|maximum size exceeded/i.test(e.message), x = (e) => {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && Object.getPrototypeOf(t) === null;
}, S = (e) => typeof e == "number", C = (e) => typeof e == "string", re = (e) => e === void 0, w = (e) => e !== void 0;
function ie(e) {
	if (!e || e.length === 0) return null;
	let t = null;
	for (let n = e.length - 1; n >= 0; n--) t = {
		type: "subscript",
		value: e[n],
		next: t
	};
	return t;
}
function ae(e) {
	return e.type === "root" || e.type === "current" || e.type === "functionCall" || e.type === "value" && (e.subtype === "boolean" || e.subtype === "null");
}
function oe(e, t, n) {
	return t.reduce((e, t) => n(e, t), e);
}
var T = class extends SyntaxError {
	constructor(e, t, n, r) {
		super(e), this.expected = t, this.found = n, this.location = r, this.name = "SyntaxError";
	}
	format(e) {
		let t = "Error: " + this.message;
		if (this.location) {
			let n = null, r = e.find((e) => e.source === this.location.source);
			r && (n = r.text.split(/\r\n|\n|\r/g));
			let i = this.location.start, a = this.location.source && typeof this.location.source.offset == "function" ? this.location.source.offset(i) : i, o = this.location.source + ":" + a.line + ":" + a.column;
			if (n) {
				let e = this.location.end, r = "".padEnd(a.line.toString().length, " "), s = n[i.line - 1], c = (i.line === e.line ? e.column : s.length + 1) - i.column || 1;
				t += "\n --> " + o + "\n" + r + " |\n" + a.line + " | " + s + "\n" + r + " | " + "".padEnd(i.column - 1, " ") + "".padEnd(c, "^");
			} else t += "\n at " + o;
		}
		return t;
	}
	static buildMessage(e, t) {
		function n(e) {
			return e.codePointAt(0).toString(16).toUpperCase();
		}
		let r = Object.prototype.hasOwnProperty.call(RegExp.prototype, "unicode") ? /* @__PURE__ */ RegExp("[\\p{C}\\p{Mn}\\p{Mc}]", "gu") : null;
		function i(e) {
			return r ? e.replace(r, (e) => "\\u{" + n(e) + "}") : e;
		}
		function a(e) {
			return i(e.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (e) => "\\x0" + n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g, (e) => "\\x" + n(e)));
		}
		function o(e) {
			return i(e.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (e) => "\\x0" + n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g, (e) => "\\x" + n(e)));
		}
		let s = {
			literal(e) {
				return "\"" + a(e.text) + "\"";
			},
			class(e) {
				let t = e.parts.map((e) => Array.isArray(e) ? o(e[0]) + "-" + o(e[1]) : o(e));
				return "[" + (e.inverted ? "^" : "") + t.join("") + "]" + (e.unicode ? "u" : "");
			},
			any() {
				return "any character";
			},
			end() {
				return "end of input";
			},
			other(e) {
				return e.description;
			}
		};
		function c(e) {
			return s[e.type](e);
		}
		function l(e) {
			let t = e.map(c);
			if (t.sort(), t.length > 0) {
				let e = 1;
				for (let n = 1; n < t.length; n++) t[n - 1] !== t[n] && (t[e] = t[n], e++);
				t.length = e;
			}
			switch (t.length) {
				case 1: return t[0];
				case 2: return t[0] + " or " + t[1];
				default: return t.slice(0, -1).join(", ") + ", or " + t[t.length - 1];
			}
		}
		function u(e) {
			return e ? "\"" + a(e) + "\"" : "end of input";
		}
		return "Expected " + l(e) + " but " + u(t) + " found.";
	}
};
function se(e, t) {
	t = t === void 0 ? {} : t;
	let n = {}, r = t.grammarSource, i = { jsonpath: Vr }, a = Vr, o = "length", s = "count", c = "match", l = "search", u = "value", d = "subsetof", f = "anyof", p = "noneof", m = "sizeof", h = "size", g = "empty", ee = "true", te = "false", _ = "null", v = /^[,\]]/, y = /^[+\-]/, b = /^[*\/]/, ne = /^[a-zA-Z_]/, x = /^[\x80-\uFFFF_]/, S = /^[a-zA-Z0-9_]/, C = /^[0-9@$\-]/, re = /^[^\/\\]/, w = /^[gimsuy]/, se = /^[a-zA-Z_\x80-\uD7FF\uE000-\uFFFF]/, ce = /^[\uD800-\uDBFF]/, le = /^[\uDC00-\uDFFF]/, E = /^[0-9]/, ue = /^[1-9]/, de = /^[eE]/, fe = /^["\\]/, pe = /^['\\]/, me = /^[ -\uD7FF\uE000-\uFFFF]/, he = /^[dD]/, ge = /^[89abAB]/, _e = /^[c-fC-F]/, ve = /^[0-9a-fA-F]/, ye = /^[ \t\n\r]/, be = G([",", "]"], !1, !1, !1), xe = W("length", !1), Se = W("count", !1), Ce = W("match", !1), we = W("search", !1), Te = W("value", !1), Ee = G(["+", "-"], !1, !1, !1), De = G(["*", "/"], !1, !1, !1), Oe = Ir("string"), ke = G([
		["a", "z"],
		["A", "Z"],
		"_"
	], !1, !1, !1), Ae = G([["", "￿"], "_"], !1, !1, !1), D = G([
		["a", "z"],
		["A", "Z"],
		["0", "9"],
		"_"
	], !1, !1, !1), je = W("-", !1), Me = G([
		["0", "9"],
		"@",
		"$",
		"-"
	], !1, !1, !1), Ne = W("$", !1), Pe = W("@", !1), Fe = W("..", !1), Ie = W(".", !1), Le = W("*", !1), Re = W("&&", !1), ze = W("||", !1), Be = W("!", !1), Ve = W("==", !1), He = W("!=", !1), Ue = W(">=", !1), We = W(">", !1), Ge = W("<=", !1), Ke = W("<", !1), qe = W("=~", !1), Je = W("in", !1), Ye = W("nin", !1), Xe = W("subsetof", !1), Ze = W("anyof", !1), Qe = W("noneof", !1), $e = W("sizeof", !1), et = W("size", !1), tt = W("empty", !1), nt = W("true", !1), rt = W("false", !1), it = W("null", !1), at = W("{", !1), ot = W("}", !1), st = W("[", !1), ct = W("]", !1), lt = W(":", !1), ut = W(",", !1), dt = W("(", !1), ft = W(")", !1), pt = W("?", !1), mt = Ir("regex"), ht = W("/", !1), gt = G(["/", "\\"], !0, !1, !1), _t = W("\\", !1), vt = Pr(), O = G([
		"g",
		"i",
		"m",
		"s",
		"u",
		"y"
	], !1, !1, !1), yt = G([
		["a", "z"],
		["A", "Z"],
		"_",
		["", "퟿"],
		["", "￿"]
	], !1, !1, !1), bt = G([["\ud800", "\udbff"]], !1, !1, !1), xt = G([["\udc00", "\udfff"]], !1, !1, !1), k = G([["0", "9"]], !1, !1, !1), St = Ir("number"), Ct = W("0", !1), wt = G([["1", "9"]], !1, !1, !1), Tt = Ir("integer"), Et = G(["e", "E"], !1, !1, !1), Dt = W("\"", !1), Ot = W("'", !1), kt = G(["\"", "\\"], !1, !1, !1), At = G(["'", "\\"], !1, !1, !1), jt = G([[" ", "퟿"], ["", "￿"]], !1, !1, !1), Mt = W("b", !1), Nt = W("f", !1), Pt = W("n", !1), Ft = W("r", !1), It = W("t", !1), Lt = W("u", !1), Rt = G(["d", "D"], !1, !1, !1), zt = G([
		"8",
		"9",
		"a",
		"b",
		"A",
		"B"
	], !1, !1, !1), Bt = W("\\u", !1), Vt = G([["c", "f"], ["C", "F"]], !1, !1, !1), Ht = G([
		["0", "9"],
		["a", "f"],
		["A", "F"]
	], !1, !1, !1), Ut = G([
		" ",
		"	",
		"\n",
		"\r"
	], !1, !1, !1);
	function Wt(e) {
		return {
			type: "root",
			next: ie(e)
		};
	}
	function Gt(e) {
		return e.map((e) => e[1]);
	}
	function Kt(e) {
		return {
			type: "dot",
			value: e
		};
	}
	function qt(e) {
		return e;
	}
	function Jt(e) {
		return {
			type: "dotdot",
			value: e
		};
	}
	function Yt() {
		return { type: "wildcard" };
	}
	function Xt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Zt() {
		return { type: "wildcard" };
	}
	function Qt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function $t(e) {
		return e;
	}
	function en(e) {
		return e;
	}
	function tn(e, t) {
		return t.length > 0 ? {
			type: "bracketExpression",
			value: {
				type: "unions",
				values: [e, ...t.map((e) => e[3])]
			}
		} : {
			type: e.type === "numericLiteral" || e.type === "stringLiteral" || e.type === "identifier" ? "bracketMember" : "bracketExpression",
			value: e
		};
	}
	function nn(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function rn(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function an(e, t) {
		return oe(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "or",
			left: e,
			right: t[3]
		}));
	}
	function on(e, t) {
		return oe(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "and",
			left: e,
			right: t[3]
		}));
	}
	function sn(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function cn(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function ln(e, t) {
		return t !== null || ae(e);
	}
	function un(e, t) {
		if (t === null) return e;
		let n = t[1];
		return n.operator === "reg" ? {
			type: "comparator",
			operator: "reg",
			left: e,
			right: n.right
		} : n.operator === "empty" ? {
			type: "comparator",
			operator: "empty",
			left: e,
			right: null
		} : {
			type: "comparator",
			operator: n.operator,
			left: e,
			right: n.right
		};
	}
	function dn(e, t) {
		return {
			operator: e,
			right: t
		};
	}
	function fn(e) {
		return {
			operator: "reg",
			right: e
		};
	}
	function pn() {
		return { operator: "empty" };
	}
	function mn() {
		return "eq";
	}
	function hn() {
		return "ne";
	}
	function gn() {
		return "le";
	}
	function _n() {
		return "lt";
	}
	function vn() {
		return "ge";
	}
	function yn() {
		return "gt";
	}
	function bn() {
		return "in";
	}
	function xn() {
		return "nin";
	}
	function Sn() {
		return "subsetof";
	}
	function Cn() {
		return "anyof";
	}
	function wn() {
		return "noneof";
	}
	function Tn() {
		return "sizeof";
	}
	function En() {
		return "size";
	}
	function Dn(e) {
		return {
			type: "groupExpression",
			value: e
		};
	}
	function On() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function kn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function An() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function jn(e, t) {
		return {
			type: "functionCall",
			name: e,
			args: t || []
		};
	}
	function Mn() {
		return "length";
	}
	function Nn() {
		return "count";
	}
	function Pn() {
		return "match";
	}
	function A() {
		return "search";
	}
	function Fn() {
		return "value";
	}
	function In(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function j(e, t) {
		return t.length === 0 ? e : oe(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "+" ? "plus" : "minus",
			left: e,
			right: t[3]
		}));
	}
	function Ln(e, t) {
		return t.length === 0 ? e : oe(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "*" ? "multi" : "div",
			left: e,
			right: t[3]
		}));
	}
	function Rn(e) {
		return {
			type: "groupOperation",
			value: e
		};
	}
	function zn(e) {
		return {
			type: "root",
			next: ie(e)
		};
	}
	function Bn(e) {
		return {
			type: "current",
			next: ie(e)
		};
	}
	function M(e, t, n) {
		return {
			type: "slices",
			start: e === null ? null : e[0],
			end: t === null ? null : t[0],
			step: n ? n[2] === null ? null : n[2] : null
		};
	}
	function Vn() {
		return { type: "wildcard" };
	}
	function N(e) {
		return {
			type: "numericLiteral",
			value: e
		};
	}
	function Hn(e) {
		return {
			type: "stringLiteral",
			value: _a(e)
		};
	}
	function P(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Un(e, t) {
		return {
			type: "value",
			subtype: "regex",
			value: e,
			opts: t || ""
		};
	}
	function F(e) {
		return {
			type: "value",
			subtype: "string",
			value: e
		};
	}
	function Wn(e) {
		return {
			type: "value",
			subtype: "number",
			value: e
		};
	}
	function I() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function Gn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function Kn() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function qn(e) {
		return e;
	}
	function Jn(e) {
		for (let [t] of e || []) _a(t);
		return {
			type: "value",
			subtype: "object",
			value: Object.fromEntries(e || [])
		};
	}
	function Yn(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function Xn(e, t) {
		return [e, t.value];
	}
	function Zn(e) {
		return {
			type: "value",
			subtype: "array",
			value: e || []
		};
	}
	function Qn(e, t) {
		return [e.value, ...t.map((e) => e[3].value)];
	}
	function $n(e) {
		return _a(e);
	}
	function er(e) {
		return _a(e);
	}
	function tr() {
		return "true";
	}
	function nr() {
		return "false";
	}
	function rr() {
		return "null";
	}
	function ir(e) {
		return _a(e);
	}
	function ar() {
		return "true";
	}
	function or() {
		return "false";
	}
	function sr() {
		return "null";
	}
	function cr(e) {
		return "/" + e.map((e) => Array.isArray(e) ? e.join("") : e).join("") + "/";
	}
	function lr(e) {
		return e.join("");
	}
	function ur(e, t) {
		let n = parseFloat(jr());
		return !e && !t && (n < -9007199254740991 || n > 9007199254740991) && Mr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), n;
	}
	function dr() {
		let e = parseInt(jr(), 10);
		return (e < -9007199254740991 || e > 9007199254740991) && Mr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), e;
	}
	function fr(e) {
		return e.join("");
	}
	function pr(e) {
		return e.join("");
	}
	function mr(e) {
		return e;
	}
	function hr() {
		return "\"";
	}
	function gr(e) {
		return e;
	}
	function _r(e) {
		return e;
	}
	function vr() {
		return "'";
	}
	function yr(e) {
		return e;
	}
	function L() {
		return "\\";
	}
	function br() {
		return "/";
	}
	function xr() {
		return "\b";
	}
	function Sr() {
		return "\f";
	}
	function Cr() {
		return "\n";
	}
	function wr() {
		return "\r";
	}
	function Tr() {
		return "	";
	}
	function Er(e, t) {
		return String.fromCharCode(parseInt(e, 16), parseInt(t, 16));
	}
	function Dr(e) {
		let t = parseInt(e, 16);
		return t >= 55296 && t <= 57343;
	}
	function Or(e) {
		return String.fromCharCode(parseInt(e, 16));
	}
	let R = t.peg$currPos | 0, z = R, B = [{
		line: 1,
		column: 1
	}], V = R, kr = t.peg$maxFailExpected || [], H = t.peg$silentFails | 0, Ar = /* @__PURE__ */ new Map(), U;
	if (t.startRule) {
		if (!(t.startRule in i)) throw Error("Can't start parsing from rule \"" + t.startRule + "\".");
		a = i[t.startRule];
	}
	function jr() {
		return e.substring(z, R);
	}
	function Mr(e, t) {
		throw t = t === void 0 ? Rr(z, R) : t, zr(e, t);
	}
	function Nr(t = R) {
		let n = e.codePointAt(t);
		return n === void 0 ? "" : String.fromCodePoint(n);
	}
	function W(e, t) {
		return {
			type: "literal",
			text: e,
			ignoreCase: t
		};
	}
	function G(e, t, n, r) {
		return {
			type: "class",
			parts: e,
			inverted: t,
			ignoreCase: n,
			unicode: r
		};
	}
	function Pr() {
		return { type: "any" };
	}
	function Fr() {
		return { type: "end" };
	}
	function Ir(e) {
		return {
			type: "other",
			description: e
		};
	}
	function Lr(t) {
		let n = B[t], r;
		if (n) return n;
		if (t >= B.length) r = B.length - 1;
		else for (r = t; !B[--r];);
		for (n = B[r], n = {
			line: n.line,
			column: n.column
		}; r < t;) e.charCodeAt(r) === 10 ? (n.line++, n.column = 1) : n.column++, r++;
		return B[t] = n, n;
	}
	function Rr(e, t, n) {
		let i = Lr(e), a = Lr(t), o = {
			source: r,
			start: {
				offset: e,
				line: i.line,
				column: i.column
			},
			end: {
				offset: t,
				line: a.line,
				column: a.column
			}
		};
		return n && r && typeof r.offset == "function" && (o.start = r.offset(o.start), o.end = r.offset(o.end)), o;
	}
	function K(e) {
		R < V || (R > V && (V = R, kr = []), kr.push(e));
	}
	function zr(e, t) {
		return new T(e, null, null, t);
	}
	function Br(e, t, n) {
		return new T(T.buildMessage(e, t), e, t, n);
	}
	function Vr() {
		let e, t, r, i;
		return e = R, t = Ci(), t === n ? (R = e, e = n) : (r = Hr(), i = ga(), i === n ? (R = e, e = n) : (z = e, e = Wt(r))), e;
	}
	function Hr() {
		let e, t, r, i, a;
		for (e = R, t = [], r = R, i = $(), a = Ur(), a === n ? (R = r, r = n) : (i = [i, a], r = i); r !== n;) t.push(r), r = R, i = $(), a = Ur(), a === n ? (R = r, r = n) : (i = [i, a], r = i);
		return z = e, t = Gt(t), e = t, e;
	}
	function Ur() {
		let e;
		return e = Gr(), e === n && (e = Wr()), e;
	}
	function Wr() {
		let e, t, r;
		return e = R, t = Ei(), t === n ? (R = e, e = n) : (r = Kr(), r === n ? (R = e, e = n) : (z = e, e = Kt(r))), e === n && (e = R, t = Jr(), t !== n && (z = e, t = qt(t)), e = t), e;
	}
	function Gr() {
		let e, t, r;
		return e = R, t = Ti(), t === n ? (R = e, e = n) : (r = qr(), r === n ? (R = e, e = n) : (z = e, e = Jt(r))), e;
	}
	function Kr() {
		let e, t;
		return e = R, t = Di(), t !== n && (z = e, t = Yt()), e = t, e === n && (e = R, t = Si(), t !== n && (z = e, t = Xt(t)), e = t), e;
	}
	function qr() {
		let e, t;
		return e = R, t = Di(), t !== n && (z = e, t = Zt()), e = t, e === n && (e = R, t = Si(), t !== n && (z = e, t = Qt(t)), e = t, e === n && (e = R, t = Jr(), t !== n && (z = e, t = $t(t)), e = t)), e;
	}
	function Jr() {
		let e, t, r, i;
		return e = R, t = Xi(), t === n ? (R = e, e = n) : ($(), r = Yr(), r === n ? (R = e, e = n) : ($(), i = Zi(), i === n ? (R = e, e = n) : (z = e, e = en(r)))), e;
	}
	function Yr() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = fi(), t !== n) {
			for (r = [], i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = fi(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = fi(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = tn(t, r);
		} else R = e, e = n;
		return e;
	}
	function Xr() {
		let t, r, i, a, o, s, c, l, u;
		return t = R, r = ta(), r === n ? (R = t, t = n) : ($(), i = $i(), i === n ? (R = t, t = n) : ($(), a = Zr(), a === n ? (R = t, t = n) : ($(), o = ea(), o === n ? (R = t, t = n) : (s = R, H++, c = R, l = $(), u = e.charAt(R), v.test(u) ? R++ : (u = n, H === 0 && K(be)), u === n ? (R = c, c = n) : (l = [l, u], c = l), H--, c === n ? s = n : (R = s, s = void 0), s === n ? (R = t, t = n) : (z = t, t = nn(a)))))), t === n && (t = R, r = ta(), r === n ? (R = t, t = n) : ($(), i = Zr(), i === n ? (R = t, t = n) : (z = t, t = rn(i)))), t;
	}
	function Zr() {
		let e, t, r, i, a, o, s, c, l = R * 91 + 10, u = Ar.get(l);
		if (u) return R = u.nextPos, u.result;
		if (e = R, t = Qr(), t !== n) {
			for (r = [], i = R, a = $(), o = ki(), o === n ? (R = i, i = n) : (s = $(), c = Qr(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = ki(), o === n ? (R = i, i = n) : (s = $(), c = Qr(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = an(t, r);
		} else R = e, e = n;
		return Ar.set(l, {
			nextPos: R,
			result: e
		}), e;
	}
	function Qr() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = $r(), t !== n) {
			for (r = [], i = R, a = $(), o = Oi(), o === n ? (R = i, i = n) : (s = $(), c = $r(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = Oi(), o === n ? (R = i, i = n) : (s = $(), c = $r(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = on(t, r);
		} else R = e, e = n;
		return e;
	}
	function $r() {
		let e, t, r, i, a;
		return e = R, t = Ai(), t === n ? (R = e, e = n) : ($(), r = $i(), r === n ? (R = e, e = n) : ($(), i = Zr(), i === n ? (R = e, e = n) : ($(), a = ea(), a === n ? (R = e, e = n) : (z = e, e = sn(i))))), e === n && (e = R, t = Ai(), t === n ? (R = e, e = n) : ($(), r = ri(), r === n ? (R = e, e = n) : (z = e, e = cn(r))), e === n && (e = ei())), e;
	}
	function ei() {
		let e, t, r, i, a;
		return e = R, t = ci(), t === n ? (R = e, e = n) : (r = R, i = $(), a = ti(), a === n ? (R = r, r = n) : (i = [i, a], r = i), r === n && (r = null), z = R, i = ln(t, r), i = i ? void 0 : n, i === n ? (R = e, e = n) : (z = e, e = un(t, r))), e === n && (e = ri()), e;
	}
	function ti() {
		let e, t, r;
		return e = R, t = ni(), t === n ? (R = e, e = n) : ($(), r = ci(), r === n ? (R = e, e = n) : (z = e, e = dn(t, r))), e === n && (e = R, t = Li(), t === n ? (R = e, e = n) : ($(), r = pi(), r === n ? (R = e, e = n) : (z = e, e = fn(r))), e === n && (e = R, t = Gi(), t !== n && (z = e, t = pn()), e = t)), e;
	}
	function ni() {
		let e, t;
		return e = R, t = ji(), t !== n && (z = e, t = mn()), e = t, e === n && (e = R, t = Mi(), t !== n && (z = e, t = hn()), e = t, e === n && (e = R, t = Fi(), t !== n && (z = e, t = gn()), e = t, e === n && (e = R, t = Ii(), t !== n && (z = e, t = _n()), e = t, e === n && (e = R, t = Ni(), t !== n && (z = e, t = vn()), e = t, e === n && (e = R, t = Pi(), t !== n && (z = e, t = yn()), e = t, e === n && (e = R, t = Ri(), t !== n && (z = e, t = bn()), e = t, e === n && (e = R, t = zi(), t !== n && (z = e, t = xn()), e = t, e === n && (e = R, t = Bi(), t !== n && (z = e, t = Sn()), e = t, e === n && (e = R, t = Vi(), t !== n && (z = e, t = Cn()), e = t, e === n && (e = R, t = Hi(), t !== n && (z = e, t = wn()), e = t, e === n && (e = R, t = Ui(), t !== n && (z = e, t = Tn()), e = t, e === n && (e = R, t = Wi(), t !== n && (z = e, t = En()), e = t)))))))))))), e;
	}
	function ri() {
		let e, t, r, i;
		return e = R, t = $i(), t === n ? (R = e, e = n) : ($(), r = Zr(), r === n ? (R = e, e = n) : ($(), i = ea(), i === n ? (R = e, e = n) : (z = e, e = Dn(r)))), e === n && (e = ii(), e === n && (e = ui(), e === n && (e = R, t = Ki(), t !== n && (z = e, t = On()), e = t, e === n && (e = R, t = Y(), t !== n && (z = e, t = kn()), e = t, e === n && (e = R, t = qi(), t !== n && (z = e, t = An()), e = t))))), e;
	}
	function ii() {
		let e, t, r, i, a;
		return e = R, t = ai(), t === n ? (R = e, e = n) : (r = $i(), r === n ? (R = e, e = n) : ($(), i = oi(), i === n && (i = null), $(), a = ea(), a === n ? (R = e, e = n) : (z = e, e = jn(t, i)))), e;
	}
	function ai() {
		let t, r;
		return t = R, e.substr(R, 6) === o ? (r = o, R += 6) : (r = n, H === 0 && K(xe)), r !== n && (z = t, r = Mn()), t = r, t === n && (t = R, e.substr(R, 5) === s ? (r = s, R += 5) : (r = n, H === 0 && K(Se)), r !== n && (z = t, r = Nn()), t = r, t === n && (t = R, e.substr(R, 5) === c ? (r = c, R += 5) : (r = n, H === 0 && K(Ce)), r !== n && (z = t, r = Pn()), t = r, t === n && (t = R, e.substr(R, 6) === l ? (r = l, R += 6) : (r = n, H === 0 && K(we)), r !== n && (z = t, r = A()), t = r, t === n && (t = R, e.substr(R, 5) === u ? (r = u, R += 5) : (r = n, H === 0 && K(Te)), r !== n && (z = t, r = Fn()), t = r)))), t;
	}
	function oi() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = si(), t !== n) {
			for (r = [], i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = si(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = si(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = In(t, r);
		} else R = e, e = n;
		return e;
	}
	function si() {
		let e;
		return e = ci(), e === n && (e = mi()), e;
	}
	function ci() {
		let t, r, i, a, o, s, c, l, u = R * 91 + 21, d = Ar.get(u);
		if (d) return R = d.nextPos, d.result;
		if (t = R, r = li(), r !== n) {
			for (i = [], a = R, o = $(), s = e.charAt(R), y.test(s) ? R++ : (s = n, H === 0 && K(Ee)), s === n ? (R = a, a = n) : (c = $(), l = li(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = R, o = $(), s = e.charAt(R), y.test(s) ? R++ : (s = n, H === 0 && K(Ee)), s === n ? (R = a, a = n) : (c = $(), l = li(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			z = t, t = j(r, i);
		} else R = t, t = n;
		return Ar.set(u, {
			nextPos: R,
			result: t
		}), t;
	}
	function li() {
		let t, r, i, a, o, s, c, l;
		if (t = R, r = q(), r !== n) {
			for (i = [], a = R, o = $(), s = e.charAt(R), b.test(s) ? R++ : (s = n, H === 0 && K(De)), s === n ? (R = a, a = n) : (c = $(), l = q(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = R, o = $(), s = e.charAt(R), b.test(s) ? R++ : (s = n, H === 0 && K(De)), s === n ? (R = a, a = n) : (c = $(), l = q(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			z = t, t = Ln(r, i);
		} else R = t, t = n;
		return t;
	}
	function q() {
		let e, t, r, i;
		return e = R, t = $i(), t === n ? (R = e, e = n) : ($(), r = ci(), r === n ? (R = e, e = n) : ($(), i = ea(), i === n ? (R = e, e = n) : (z = e, e = Rn(r)))), e === n && (e = ii(), e === n && (e = J(), e === n && (e = ui()))), e;
	}
	function ui() {
		let e, t, r;
		return e = R, t = Ci(), t === n ? (R = e, e = n) : (r = Hr(), r === n ? (R = e, e = n) : (z = e, e = zn(r))), e === n && (e = R, t = wi(), t === n ? (R = e, e = n) : (r = Hr(), r === n ? (R = e, e = n) : (z = e, e = Bn(r)))), e;
	}
	function di() {
		let e, t, r, i, a, o, s, c, l;
		return e = R, t = R, r = la(), r === n ? (R = t, t = n) : (i = $(), r = [r, i], t = r), t === n && (t = null), r = Qi(), r === n ? (R = e, e = n) : (i = $(), a = R, o = la(), o === n ? (R = a, a = n) : (s = $(), o = [o, s], a = o), a === n && (a = null), o = R, s = Qi(), s === n ? (R = o, o = n) : (c = $(), l = la(), l === n && (l = null), s = [
			s,
			c,
			l
		], o = s), o === n && (o = null), z = e, e = M(t, a, o)), e;
	}
	function fi() {
		let e, t;
		return e = Xr(), e === n && (e = di(), e === n && (e = R, t = Di(), t !== n && (z = e, t = Vn()), e = t, e === n && (e = R, t = la(), t !== n && (z = e, t = N(t)), e = t, e === n && (e = R, t = da(), t !== n && (z = e, t = Hn(t)), e = t, e === n && (e = R, t = bi(), t !== n && (z = e, t = P(t)), e = t))))), e;
	}
	function pi() {
		let e, t, r;
		return e = R, t = na(), t === n ? (R = e, e = n) : (r = ra(), z = e, e = Un(t, r)), e;
	}
	function J() {
		let e, t;
		return e = R, t = mi(), t !== n && (z = e, t = F(t)), e = t, e === n && (e = R, t = sa(), t !== n && (z = e, t = Wn(t)), e = t, e === n && (e = hi(), e === n && (e = vi(), e === n && (e = R, t = Ki(), t !== n && (z = e, t = I()), e = t, e === n && (e = R, t = Y(), t !== n && (z = e, t = Gn()), e = t, e === n && (e = R, t = qi(), t !== n && (z = e, t = Kn()), e = t)))))), e;
	}
	function mi() {
		let e, t;
		return H++, e = R, t = da(), t !== n && (z = e, t = qn(t)), e = t, H--, e === n && (t = n, H === 0 && K(Oe)), e;
	}
	function hi() {
		let e, t, r, i;
		return e = R, t = Ji(), t === n ? (R = e, e = n) : ($(), r = gi(), r === n && (r = null), $(), i = Yi(), i === n ? (R = e, e = n) : (z = e, e = Jn(r))), e;
	}
	function gi() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = _i(), t !== n) {
			for (r = [], i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = _i(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = _i(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = Yn(t, r);
		} else R = e, e = n;
		return e;
	}
	function _i() {
		let e, t, r, i;
		return e = R, t = da(), t === n ? (R = e, e = n) : ($(), r = Qi(), r === n ? (R = e, e = n) : ($(), i = J(), i === n ? (R = e, e = n) : (z = e, e = Xn(t, i)))), e;
	}
	function vi() {
		let e, t, r, i;
		return e = R, t = Xi(), t === n ? (R = e, e = n) : ($(), r = yi(), r === n && (r = null), $(), i = Zi(), i === n ? (R = e, e = n) : (z = e, e = Zn(r))), e;
	}
	function yi() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = J(), t !== n) {
			for (r = [], i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = J(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = J(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = Qn(t, r);
		} else R = e, e = n;
		return e;
	}
	function bi() {
		let t, r, i, a, o, s;
		if (t = R, r = R, i = R, a = e.charAt(R), ne.test(a) ? R++ : (a = n, H === 0 && K(ke)), a !== n) {
			for (o = [], s = xi(); s !== n;) o.push(s), s = xi();
			a = [a, o], i = a;
		} else R = i, i = n;
		if (r = i === n ? i : e.substring(r, R), r !== n && (z = t, r = $n(r)), t = r, t === n) {
			if (t = R, r = R, i = [], a = e.charAt(R), x.test(a) ? R++ : (a = n, H === 0 && K(Ae)), a !== n) for (; a !== n;) i.push(a), a = e.charAt(R), x.test(a) ? R++ : (a = n, H === 0 && K(Ae));
			else i = n;
			r = i === n ? i : e.substring(r, R), r !== n && (z = t, r = er(r)), t = r, t === n && (t = R, r = Ki(), r !== n && (z = t, r = tr()), t = r, t === n && (t = R, r = Y(), r !== n && (z = t, r = nr()), t = r, t === n && (t = R, r = qi(), r !== n && (z = t, r = rr()), t = r)));
		}
		return t;
	}
	function xi() {
		let t, r, i, a;
		return t = e.charAt(R), S.test(t) ? R++ : (t = n, H === 0 && K(D)), t === n && (t = R, e.charCodeAt(R) === 45 ? (r = "-", R++) : (r = n, H === 0 && K(je)), r === n ? (R = t, t = n) : (i = R, H++, a = e.charAt(R), C.test(a) ? R++ : (a = n, H === 0 && K(Me)), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r))), t;
	}
	function Si() {
		let e, t;
		return e = R, t = ia(), t !== n && (z = e, t = ir(t)), e = t, e === n && (e = R, t = Ki(), t !== n && (z = e, t = ar()), e = t, e === n && (e = R, t = Y(), t !== n && (z = e, t = or()), e = t, e === n && (e = R, t = qi(), t !== n && (z = e, t = sr()), e = t))), e;
	}
	function Ci() {
		let t;
		return e.charCodeAt(R) === 36 ? (t = "$", R++) : (t = n, H === 0 && K(Ne)), t;
	}
	function wi() {
		let t;
		return e.charCodeAt(R) === 64 ? (t = "@", R++) : (t = n, H === 0 && K(Pe)), t;
	}
	function Ti() {
		let t;
		return e.substr(R, 2) === ".." ? (t = "..", R += 2) : (t = n, H === 0 && K(Fe)), t;
	}
	function Ei() {
		let t;
		return e.charCodeAt(R) === 46 ? (t = ".", R++) : (t = n, H === 0 && K(Ie)), t;
	}
	function Di() {
		let t;
		return e.charCodeAt(R) === 42 ? (t = "*", R++) : (t = n, H === 0 && K(Le)), t;
	}
	function Oi() {
		let t;
		return e.substr(R, 2) === "&&" ? (t = "&&", R += 2) : (t = n, H === 0 && K(Re)), t;
	}
	function ki() {
		let t;
		return e.substr(R, 2) === "||" ? (t = "||", R += 2) : (t = n, H === 0 && K(ze)), t;
	}
	function Ai() {
		let t;
		return e.charCodeAt(R) === 33 ? (t = "!", R++) : (t = n, H === 0 && K(Be)), t;
	}
	function ji() {
		let t;
		return e.substr(R, 2) === "==" ? (t = "==", R += 2) : (t = n, H === 0 && K(Ve)), t;
	}
	function Mi() {
		let t;
		return e.substr(R, 2) === "!=" ? (t = "!=", R += 2) : (t = n, H === 0 && K(He)), t;
	}
	function Ni() {
		let t;
		return e.substr(R, 2) === ">=" ? (t = ">=", R += 2) : (t = n, H === 0 && K(Ue)), t;
	}
	function Pi() {
		let t;
		return e.charCodeAt(R) === 62 ? (t = ">", R++) : (t = n, H === 0 && K(We)), t;
	}
	function Fi() {
		let t;
		return e.substr(R, 2) === "<=" ? (t = "<=", R += 2) : (t = n, H === 0 && K(Ge)), t;
	}
	function Ii() {
		let t;
		return e.charCodeAt(R) === 60 ? (t = "<", R++) : (t = n, H === 0 && K(Ke)), t;
	}
	function Li() {
		let t;
		return e.substr(R, 2) === "=~" ? (t = "=~", R += 2) : (t = n, H === 0 && K(qe)), t;
	}
	function Ri() {
		let t, r, i, a;
		return t = R, e.substr(R, 2) === "in" ? (r = "in", R += 2) : (r = n, H === 0 && K(Je)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function zi() {
		let t, r, i, a;
		return t = R, e.substr(R, 3) === "nin" ? (r = "nin", R += 3) : (r = n, H === 0 && K(Ye)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Bi() {
		let t, r, i, a;
		return t = R, e.substr(R, 8) === d ? (r = d, R += 8) : (r = n, H === 0 && K(Xe)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Vi() {
		let t, r, i, a;
		return t = R, e.substr(R, 5) === f ? (r = f, R += 5) : (r = n, H === 0 && K(Ze)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Hi() {
		let t, r, i, a;
		return t = R, e.substr(R, 6) === p ? (r = p, R += 6) : (r = n, H === 0 && K(Qe)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ui() {
		let t, r, i, a;
		return t = R, e.substr(R, 6) === m ? (r = m, R += 6) : (r = n, H === 0 && K($e)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Wi() {
		let t, r, i, a;
		return t = R, e.substr(R, 4) === h ? (r = h, R += 4) : (r = n, H === 0 && K(et)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Gi() {
		let t, r, i, a;
		return t = R, e.substr(R, 5) === g ? (r = g, R += 5) : (r = n, H === 0 && K(tt)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ki() {
		let t, r, i, a;
		return t = R, e.substr(R, 4) === ee ? (r = ee, R += 4) : (r = n, H === 0 && K(nt)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Y() {
		let t, r, i, a;
		return t = R, e.substr(R, 5) === te ? (r = te, R += 5) : (r = n, H === 0 && K(rt)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function qi() {
		let t, r, i, a;
		return t = R, e.substr(R, 4) === _ ? (r = _, R += 4) : (r = n, H === 0 && K(it)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ji() {
		let t;
		return e.charCodeAt(R) === 123 ? (t = "{", R++) : (t = n, H === 0 && K(at)), t;
	}
	function Yi() {
		let t;
		return e.charCodeAt(R) === 125 ? (t = "}", R++) : (t = n, H === 0 && K(ot)), t;
	}
	function Xi() {
		let t;
		return e.charCodeAt(R) === 91 ? (t = "[", R++) : (t = n, H === 0 && K(st)), t;
	}
	function Zi() {
		let t;
		return e.charCodeAt(R) === 93 ? (t = "]", R++) : (t = n, H === 0 && K(ct)), t;
	}
	function Qi() {
		let t;
		return e.charCodeAt(R) === 58 ? (t = ":", R++) : (t = n, H === 0 && K(lt)), t;
	}
	function X() {
		let t;
		return e.charCodeAt(R) === 44 ? (t = ",", R++) : (t = n, H === 0 && K(ut)), t;
	}
	function $i() {
		let t;
		return e.charCodeAt(R) === 40 ? (t = "(", R++) : (t = n, H === 0 && K(dt)), t;
	}
	function ea() {
		let t;
		return e.charCodeAt(R) === 41 ? (t = ")", R++) : (t = n, H === 0 && K(ft)), t;
	}
	function ta() {
		let t;
		return e.charCodeAt(R) === 63 ? (t = "?", R++) : (t = n, H === 0 && K(pt)), t;
	}
	function na() {
		let t, r, i, a, o, s;
		if (H++, t = R, e.charCodeAt(R) === 47 ? (r = "/", R++) : (r = n, H === 0 && K(ht)), r !== n) {
			for (i = [], a = e.charAt(R), re.test(a) ? R++ : (a = n, H === 0 && K(gt)), a === n && (a = R, e.charCodeAt(R) === 92 ? (o = "\\", R++) : (o = n, H === 0 && K(_t)), o === n ? (R = a, a = n) : (e.length > R ? (s = e.charAt(R), R++) : (s = n, H === 0 && K(vt)), s === n ? (R = a, a = n) : (o = [o, s], a = o))); a !== n;) i.push(a), a = e.charAt(R), re.test(a) ? R++ : (a = n, H === 0 && K(gt)), a === n && (a = R, e.charCodeAt(R) === 92 ? (o = "\\", R++) : (o = n, H === 0 && K(_t)), o === n ? (R = a, a = n) : (e.length > R ? (s = e.charAt(R), R++) : (s = n, H === 0 && K(vt)), s === n ? (R = a, a = n) : (o = [o, s], a = o)));
			e.charCodeAt(R) === 47 ? (a = "/", R++) : (a = n, H === 0 && K(ht)), a === n ? (R = t, t = n) : (z = t, t = cr(i));
		} else R = t, t = n;
		return H--, t === n && (r = n, H === 0 && K(mt)), t;
	}
	function ra() {
		let t, r, i;
		for (t = R, r = [], i = e.charAt(R), w.test(i) ? R++ : (i = n, H === 0 && K(O)); i !== n;) r.push(i), i = e.charAt(R), w.test(i) ? R++ : (i = n, H === 0 && K(O));
		return z = t, r = lr(r), t = r, t;
	}
	function ia() {
		let t, r, i, a, o;
		if (t = R, r = R, i = aa(), i !== n) {
			for (a = [], o = oa(); o !== n;) a.push(o), o = oa();
			i = [i, a], r = i;
		} else R = r, r = n;
		return t = r === n ? r : e.substring(t, R), t;
	}
	function aa() {
		let t, r, i;
		return t = e.charAt(R), se.test(t) ? R++ : (t = n, H === 0 && K(yt)), t === n && (t = R, r = e.charAt(R), ce.test(r) ? R++ : (r = n, H === 0 && K(bt)), r === n ? (R = t, t = n) : (i = e.charAt(R), le.test(i) ? R++ : (i = n, H === 0 && K(xt)), i === n ? (R = t, t = n) : (r = [r, i], t = r))), t;
	}
	function oa() {
		let t;
		return t = aa(), t === n && (t = e.charAt(R), E.test(t) ? R++ : (t = n, H === 0 && K(k))), t;
	}
	function sa() {
		let t, r, i, a, o, s, c;
		if (H++, t = R, e.charCodeAt(R) === 45 ? (r = "-", R++) : (r = n, H === 0 && K(je)), r === n && (r = null), i = ca(), i !== n) {
			if (a = R, e.charCodeAt(R) === 46 ? (o = ".", R++) : (o = n, H === 0 && K(Ie)), o !== n) {
				if (s = [], c = e.charAt(R), E.test(c) ? R++ : (c = n, H === 0 && K(k)), c !== n) for (; c !== n;) s.push(c), c = e.charAt(R), E.test(c) ? R++ : (c = n, H === 0 && K(k));
				else s = n;
				s === n ? (R = a, a = n) : (o = [o, s], a = o);
			} else R = a, a = n;
			a === n && (a = null), o = ua(), o === n && (o = null), z = t, t = ur(a, o);
		} else R = t, t = n;
		return H--, t === n && (r = n, H === 0 && K(St)), t;
	}
	function ca() {
		let t, r, i, a;
		if (e.charCodeAt(R) === 48 ? (t = "0", R++) : (t = n, H === 0 && K(Ct)), t === n) {
			if (t = R, r = e.charAt(R), ue.test(r) ? R++ : (r = n, H === 0 && K(wt)), r !== n) {
				for (i = [], a = e.charAt(R), E.test(a) ? R++ : (a = n, H === 0 && K(k)); a !== n;) i.push(a), a = e.charAt(R), E.test(a) ? R++ : (a = n, H === 0 && K(k));
				r = [r, i], t = r;
			} else R = t, t = n;
		}
		return t;
	}
	function la() {
		let t, r, i, a, o, s;
		if (H++, t = R, e.charCodeAt(R) === 48 ? (r = "0", R++) : (r = n, H === 0 && K(Ct)), r === n) {
			if (r = R, e.charCodeAt(R) === 45 ? (i = "-", R++) : (i = n, H === 0 && K(je)), i === n && (i = null), a = e.charAt(R), ue.test(a) ? R++ : (a = n, H === 0 && K(wt)), a !== n) {
				for (o = [], s = e.charAt(R), E.test(s) ? R++ : (s = n, H === 0 && K(k)); s !== n;) o.push(s), s = e.charAt(R), E.test(s) ? R++ : (s = n, H === 0 && K(k));
				i = [
					i,
					a,
					o
				], r = i;
			} else R = r, r = n;
		}
		return r !== n && (z = t, r = dr()), t = r, H--, t === n && (r = n, H === 0 && K(Tt)), t;
	}
	function ua() {
		let t, r, i, a, o;
		if (t = R, r = e.charAt(R), de.test(r) ? R++ : (r = n, H === 0 && K(Et)), r !== n) {
			if (i = e.charAt(R), y.test(i) ? R++ : (i = n, H === 0 && K(Ee)), i === n && (i = null), a = [], o = e.charAt(R), E.test(o) ? R++ : (o = n, H === 0 && K(k)), o !== n) for (; o !== n;) a.push(o), o = e.charAt(R), E.test(o) ? R++ : (o = n, H === 0 && K(k));
			else a = n;
			a === n ? (R = t, t = n) : (r = [
				r,
				i,
				a
			], t = r);
		} else R = t, t = n;
		return t;
	}
	function da() {
		let t, r, i, a;
		if (H++, t = R, e.charCodeAt(R) === 34 ? (r = "\"", R++) : (r = n, H === 0 && K(Dt)), r !== n) {
			for (i = [], a = fa(); a !== n;) i.push(a), a = fa();
			e.charCodeAt(R) === 34 ? (a = "\"", R++) : (a = n, H === 0 && K(Dt)), a === n ? (R = t, t = n) : (z = t, t = fr(i));
		} else R = t, t = n;
		if (t === n) {
			if (t = R, e.charCodeAt(R) === 39 ? (r = "'", R++) : (r = n, H === 0 && K(Ot)), r !== n) {
				for (i = [], a = pa(); a !== n;) i.push(a), a = pa();
				e.charCodeAt(R) === 39 ? (a = "'", R++) : (a = n, H === 0 && K(Ot)), a === n ? (R = t, t = n) : (z = t, t = pr(i));
			} else R = t, t = n;
		}
		return H--, t === n && (r = n, H === 0 && K(Oe)), t;
	}
	function fa() {
		let t, r, i;
		return t = R, r = R, H++, i = e.charAt(R), fe.test(i) ? R++ : (i = n, H === 0 && K(kt)), H--, i === n ? r = void 0 : (R = r, r = n), r === n ? (R = t, t = n) : (i = ma(), i === n ? (R = t, t = n) : (z = t, t = mr(i))), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && K(_t)), r === n ? (R = t, t = n) : (e.charCodeAt(R) === 34 ? (i = "\"", R++) : (i = n, H === 0 && K(Dt)), i === n ? (R = t, t = n) : (z = t, t = hr())), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && K(_t)), r === n ? (R = t, t = n) : (i = ha(), i === n ? (R = t, t = n) : (z = t, t = gr(i))))), t;
	}
	function pa() {
		let t, r, i;
		return t = R, r = R, H++, i = e.charAt(R), pe.test(i) ? R++ : (i = n, H === 0 && K(At)), H--, i === n ? r = void 0 : (R = r, r = n), r === n ? (R = t, t = n) : (i = ma(), i === n ? (R = t, t = n) : (z = t, t = _r(i))), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && K(_t)), r === n ? (R = t, t = n) : (e.charCodeAt(R) === 39 ? (i = "'", R++) : (i = n, H === 0 && K(Ot)), i === n ? (R = t, t = n) : (z = t, t = vr())), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && K(_t)), r === n ? (R = t, t = n) : (i = ha(), i === n ? (R = t, t = n) : (z = t, t = yr(i))))), t;
	}
	function ma() {
		let t, r, i, a;
		return t = e.charAt(R), me.test(t) ? R++ : (t = n, H === 0 && K(jt)), t === n && (t = R, r = R, i = e.charAt(R), ce.test(i) ? R++ : (i = n, H === 0 && K(bt)), i === n ? (R = r, r = n) : (a = e.charAt(R), le.test(a) ? R++ : (a = n, H === 0 && K(xt)), a === n ? (R = r, r = n) : (i = [i, a], r = i)), t = r === n ? r : e.substring(t, R)), t;
	}
	function ha() {
		let t, r, i, a, o, s, c, l, u, d;
		return t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && K(_t)), r !== n && (z = t, r = L()), t = r, t === n && (t = R, e.charCodeAt(R) === 47 ? (r = "/", R++) : (r = n, H === 0 && K(ht)), r !== n && (z = t, r = br()), t = r, t === n && (t = R, e.charCodeAt(R) === 98 ? (r = "b", R++) : (r = n, H === 0 && K(Mt)), r !== n && (z = t, r = xr()), t = r, t === n && (t = R, e.charCodeAt(R) === 102 ? (r = "f", R++) : (r = n, H === 0 && K(Nt)), r !== n && (z = t, r = Sr()), t = r, t === n && (t = R, e.charCodeAt(R) === 110 ? (r = "n", R++) : (r = n, H === 0 && K(Pt)), r !== n && (z = t, r = Cr()), t = r, t === n && (t = R, e.charCodeAt(R) === 114 ? (r = "r", R++) : (r = n, H === 0 && K(Ft)), r !== n && (z = t, r = wr()), t = r, t === n && (t = R, e.charCodeAt(R) === 116 ? (r = "t", R++) : (r = n, H === 0 && K(It)), r !== n && (z = t, r = Tr()), t = r, t === n && (t = R, e.charCodeAt(R) === 117 ? (r = "u", R++) : (r = n, H === 0 && K(Lt)), r === n ? (R = t, t = n) : (i = R, a = R, o = e.charAt(R), he.test(o) ? R++ : (o = n, H === 0 && K(Rt)), o === n ? (R = a, a = n) : (s = e.charAt(R), ge.test(s) ? R++ : (s = n, H === 0 && K(zt)), s === n ? (R = a, a = n) : (c = Z(), c === n ? (R = a, a = n) : (l = Z(), l === n ? (R = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, R), i === n ? (R = t, t = n) : (e.substr(R, 2) === "\\u" ? (a = "\\u", R += 2) : (a = n, H === 0 && K(Bt)), a === n ? (R = t, t = n) : (o = R, s = R, c = e.charAt(R), he.test(c) ? R++ : (c = n, H === 0 && K(Rt)), c === n ? (R = s, s = n) : (l = e.charAt(R), _e.test(l) ? R++ : (l = n, H === 0 && K(Vt)), l === n ? (R = s, s = n) : (u = Z(), u === n ? (R = s, s = n) : (d = Z(), d === n ? (R = s, s = n) : (c = [
			c,
			l,
			u,
			d
		], s = c)))), o = s === n ? s : e.substring(o, R), o === n ? (R = t, t = n) : (z = t, t = Er(i, o))))), t === n && (t = R, e.charCodeAt(R) === 117 ? (r = "u", R++) : (r = n, H === 0 && K(Lt)), r === n ? (R = t, t = n) : (i = R, a = R, o = Z(), o === n ? (R = a, a = n) : (s = Z(), s === n ? (R = a, a = n) : (c = Z(), c === n ? (R = a, a = n) : (l = Z(), l === n ? (R = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, R), i === n ? (R = t, t = n) : (z = R, a = Dr(i), a = a ? n : void 0, a === n ? (R = t, t = n) : (z = t, t = Or(i)))))))))))), t;
	}
	function Z() {
		let t;
		return t = e.charAt(R), ve.test(t) ? R++ : (t = n, H === 0 && K(Ht)), t;
	}
	function Q() {
		let t;
		return t = e.charAt(R), S.test(t) ? R++ : (t = n, H === 0 && K(D)), t;
	}
	function $() {
		let t, r;
		for (H++, t = [], r = e.charAt(R), ye.test(r) ? R++ : (r = n, H === 0 && K(Ut)); r !== n;) t.push(r), r = e.charAt(R), ye.test(r) ? R++ : (r = n, H === 0 && K(Ut));
		return H--, t;
	}
	function ga() {
		let t, r;
		return t = R, H++, e.length > R ? (r = e.charAt(R), R++) : (r = n, H === 0 && K(vt)), H--, r === n ? t = void 0 : (R = t, t = n), t;
	}
	function _a(e) {
		return e.length > 1e3 && Mr("Member name too long (maximum 1000 characters)"), e;
	}
	U = a();
	let va = U !== n && R === e.length;
	function ya() {
		throw U !== n && R < e.length && K(Fr()), Br(kr, V < e.length ? Nr(V) : null, V < e.length ? Rr(V, V + 1) : Rr(V, V));
	}
	if (t.peg$library) return {
		peg$result: U,
		peg$currPos: R,
		peg$FAILED: n,
		peg$maxFailExpected: kr,
		peg$maxFailPos: V,
		peg$success: va,
		peg$throw: va ? void 0 : ya
	};
	if (va) return U;
	ya();
}
var ce = /* @__PURE__ */ new Set([
	"eq",
	"ne",
	"lt",
	"le",
	"gt",
	"ge"
]), le = {
	length: {
		args: ["value"],
		logical: !1
	},
	count: {
		args: ["nodes"],
		logical: !1
	},
	value: {
		args: ["nodes"],
		logical: !1
	},
	match: {
		args: ["value", "value"],
		logical: !0
	},
	search: {
		args: ["value", "value"],
		logical: !0
	}
}, E = (e) => {
	throw new u(1, 1, e);
}, ue = (e) => e.type === "root" || e.type === "current", de = (e) => {
	for (let t = e.next; t; t = t.next) {
		let e = t.value;
		if (e.type !== "bracketMember" && (e.type !== "dot" || e.value.type === "wildcard")) return !1;
	}
	return !0;
};
function fe(e) {
	let t = [{
		node: e,
		context: "nodes"
	}], n = (e) => {
		for (let n = e.next; n; n = n.next) {
			let e = n.value;
			if (e.type === "dotdot" && (e = e.value), e.type !== "bracketExpression") continue;
			let r = e.value, i = r.type === "unions" ? r.values : [r];
			for (let e of i) e.type === "filterExpression" && t.push({
				node: e.value,
				context: "test"
			});
		}
	};
	for (; t.length > 0;) {
		let { node: e, context: r } = t.pop();
		if (typeof e != "object" || !e) continue;
		let i = e;
		if (ue(i)) r === "value" && !de(i) && E("A non-singular query cannot be compared or used as a value: use a name or an index in each segment"), n(i);
		else switch (r === "nodes" && E(`Expected a query, found ${String(i.type)}`), i.type) {
			case "logicalExpression":
			case "notExpression":
			case "groupExpression":
				i.type === "logicalExpression" ? t.push({
					node: i.left,
					context: "test"
				}, {
					node: i.right,
					context: "test"
				}) : t.push({
					node: i.value,
					context: "test"
				});
				break;
			case "comparator": {
				let e = ce.has(i.operator) ? "value" : "any";
				t.push({
					node: i.left,
					context: e
				}), i.operator !== "reg" && t.push({
					node: i.right,
					context: e
				});
				break;
			}
			case "functionCall": {
				let e = i.name, n = le[e], a = i.args;
				a.length !== n.args.length && E(`${e}() takes ${n.args.length} argument${n.args.length > 1 ? "s" : ""}, found ${a.length}`), r === "test" && !n.logical && E(`The result of ${e}() must be compared`), r === "value" && n.logical && E(`The result of ${e}() cannot be compared`), a.forEach((e, r) => t.push({
					node: e,
					context: n.args[r]
				}));
				break;
			}
			case "operation":
				t.push({
					node: i.left,
					context: "value"
				}, {
					node: i.right,
					context: "value"
				});
				break;
			case "groupOperation":
				t.push({
					node: i.value,
					context: r === "any" ? "any" : "value"
				});
				break;
			case "value": r === "test" && E("A literal must be compared");
		}
	}
}
function pe(e) {
	let t;
	try {
		t = se(e);
	} catch (e) {
		if (y(e)) throw new u(1, 1, "Expression is nested too deeply");
		if (e instanceof RangeError) throw new u(1, 1, "Expression is too large to parse");
		if (e && typeof e == "object" && "location" in e && "message" in e) {
			let t = e;
			throw new u(t.location.start.line, t.location.start.column, t.message);
		}
		throw e;
	}
	return fe(t), t;
}
var me = /* @__PURE__ */ new Set([
	"(",
	")",
	"*",
	"+",
	"-",
	".",
	"?",
	"[",
	"\\",
	"]",
	"^",
	"n",
	"r",
	"t",
	"{",
	"|",
	"}"
]), he = /* @__PURE__ */ new Set(/* @__PURE__ */ "L.Ll.Lm.Lo.Lt.Lu.M.Mc.Me.Mn.N.Nd.Nl.No.P.Pc.Pd.Pe.Pf.Pi.Po.Ps.Z.Zl.Zp.Zs.S.Sc.Sk.Sm.So.C.Cc.Cf.Cn.Co".split(".")), ge = (e) => e >= 55296 && e <= 56319, _e = (e) => e >= 56320 && e <= 57343, ve = (e) => e !== void 0 && e >= "0" && e <= "9", ye = (e, t) => {
	let n = e.charCodeAt(t);
	return ge(n) && _e(e.charCodeAt(t + 1)) ? {
		text: e.slice(t, t + 2),
		length: 2,
		code: (n - 55296) * 1024 + (e.charCodeAt(t + 1) - 56320) + 65536
	} : ge(n) || _e(n) ? null : {
		text: e[t],
		length: 1,
		code: n
	};
}, be = (e, t) => {
	let n = e[t + 1];
	return n === void 0 || !me.has(n) ? null : n === "n" ? {
		text: "\\n",
		length: 2,
		code: 10
	} : n === "r" ? {
		text: "\\r",
		length: 2,
		code: 13
	} : n === "t" ? {
		text: "\\t",
		length: 2,
		code: 9
	} : {
		text: "\\" + n,
		length: 2,
		code: n.charCodeAt(0)
	};
}, xe = (e, t) => {
	if (e[t + 2] !== "{") return null;
	let n = e.indexOf("}", t + 3);
	if (n === -1 || n - (t + 3) > 2) return null;
	let r = e.slice(t + 3, n);
	return he.has(r) ? {
		text: `\\${e[t + 1]}{${r}}`,
		length: n + 1 - t
	} : null;
}, Se = (e, t) => {
	let n = e[t];
	return n === "\\" ? be(e, t) : n === void 0 || n === "-" || n === "[" || n === "]" ? null : ye(e, t);
}, Ce = (e, t) => {
	let n = t + 1, r = "[";
	e[n] === "^" && (r += "^", n++);
	let i = !0;
	for (;;) {
		let a = e[n];
		if (a === void 0) return null;
		if (a === "]") return i ? null : {
			text: r + "]",
			length: n + 1 - t
		};
		if (a === "-") {
			if (!i && e[n + 1] !== "]") return null;
			r += "-", n++, i = !1;
			continue;
		}
		if (i = !1, a === "\\" && (e[n + 1] === "p" || e[n + 1] === "P")) {
			let t = xe(e, n);
			if (t === null) return null;
			r += t.text, n += t.length;
			continue;
		}
		let o = Se(e, n);
		if (o === null) return null;
		if (n += o.length, e[n] === "-" && e[n + 1] !== "]") {
			let t = Se(e, n + 1);
			if (t === null || t.code < o.code) return null;
			r += o.text + "-" + t.text, n += 1 + t.length;
		} else r += o.text;
	}
}, we = (e, t) => {
	let n = t + 1, r = n;
	for (; ve(e[n]);) n++;
	if (n === r) return null;
	if (e[n] === ",") for (n++; ve(e[n]);) n++;
	return e[n] === "}" ? {
		text: e.slice(t, n + 1),
		length: n + 1 - t
	} : null;
}, Te = (e) => {
	let t = e, n = "", r = 0, i = !1, a = 0;
	for (; a < t.length;) {
		let e = t[a];
		switch (e) {
			case "|":
				n += "|", i = !1, a++;
				continue;
			case "(":
				r++, n += "(", i = !1, a++;
				continue;
			case ")":
				if (r === 0) return null;
				r--, n += ")", i = !0, a++;
				continue;
			case "*":
			case "+":
			case "?":
				if (!i) return null;
				n += e, i = !1, a++;
				continue;
			case "{": {
				let e = i ? we(t, a) : null;
				if (e === null) return null;
				n += e.text, i = !1, a += e.length;
				continue;
			}
			case ".":
				n += ".", a++;
				break;
			case "[": {
				let e = Ce(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
				break;
			}
			case "\\":
				if (t[a + 1] === "p" || t[a + 1] === "P") {
					let e = xe(t, a);
					if (e === null) return null;
					n += e.text, a += e.length;
				} else {
					let e = be(t, a);
					if (e === null) return null;
					n += e.text === "\\-" ? "-" : e.text, a += e.length;
				}
				break;
			case "]":
			case "}": return null;
			default: {
				let e = ye(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
			}
		}
		i = !0;
	}
	return r === 0 ? n : null;
}, Ee = 1e3, De = 1e3, Oe = 16, ke = /^[dgimsuy]*$/, Ae = (e) => {
	let t = 0;
	for (let n = 0; n + 2 < e.length; n++) e[n] === "\\" && (e[n + 1] === "p" || e[n + 1] === "P") && e[n + 2] === "{" && t++;
	return t;
}, D = class extends Error {}, je = 0, Me = 1, Ne = 2, Pe = 3, Fe = 4, Ie = 5, Le = s(2, 31) - 1, Re = (e, t) => {
	let n = e.op.length, r = e.scratch ?? {
		clist: new Int32Array(n),
		nlist: new Int32Array(n),
		onList: new Int32Array(n),
		stack: new Int32Array(n),
		atomGen: new Int32Array(e.atoms.length),
		atomHit: new Uint8Array(e.atoms.length),
		gen: 0,
		step: 0
	};
	return e.scratch = void 0, (r.gen > Le - t - 2 || r.step > Le - t - 2) && (r.onList.fill(0), r.atomGen.fill(0), r.gen = 0, r.step = 0), r;
}, ze = /* @__PURE__ */ new Set([
	"^",
	"$",
	"\\",
	".",
	"*",
	"+",
	"?",
	"(",
	")",
	"[",
	"]",
	"{",
	"}",
	"|",
	"/"
]), Be = /^\{(\d+)(?:,(\d*))?\}/, Ve = /^[0-9a-fA-F]{4}/, He = /^\(\?([ims]*)(?:-([ims]*))?:/, Ue = (e) => e === 10 || e === 13 || e === 8232 || e === 8233, We = class {
	constructor(e, t, n, r = !1) {
		this.src = e, this.unicode = t, this.iregexp = r, this.i = 0, this.mods = {
			i: n.includes("i"),
			m: n.includes("m"),
			s: n.includes("s")
		};
	}
	atom(e, t) {
		return {
			t: "atom",
			src: e,
			literal: t,
			mods: this.mods
		};
	}
	parse() {
		let e = this.parseAlt();
		if (this.i < this.src.length) throw new D("unexpected character");
		return e;
	}
	parseAlt() {
		let e = [this.parseSeq()];
		for (; this.src[this.i] === "|";) this.i++, e.push(this.parseSeq());
		return e.length === 1 ? e[0] : {
			t: "alt",
			alts: e
		};
	}
	parseSeq() {
		let e = [];
		for (; this.i < this.src.length && this.src[this.i] !== "|" && this.src[this.i] !== ")";) e.push(this.parseTerm());
		return e.length === 1 ? e[0] : {
			t: "cat",
			items: e
		};
	}
	parseTerm() {
		let e = this.src[this.i];
		return e === "^" ? (this.i++, {
			t: "bol",
			multiline: this.mods.m
		}) : e === "$" ? (this.i++, {
			t: "eol",
			multiline: this.mods.m
		}) : this.parseQuantifier(this.parseAtom());
	}
	parseAtom() {
		let { src: e } = this, t = this.i, n = e[t];
		if (n === "(") {
			let n = this.mods;
			if (e[t + 1] === "?") {
				let r = He.exec(e.slice(t, t + 12));
				if (!r) throw new D("lookaround or named group");
				let i = l({}, n);
				for (let e of r[1]) i[e] = !0;
				for (let e of r[2] ?? "") i[e] = !1;
				this.mods = i, this.i = t + r[0].length;
			} else this.i = t + 1;
			let r = this.parseAlt();
			if (e[this.i] !== ")") throw new D("unclosed group");
			return this.i++, this.mods = n, r;
		}
		if (n === "[") {
			let n = t + 1;
			for (e[n] === "^" && n++; n < e.length && e[n] !== "]";) n += e[n] === "\\" ? 2 : 1;
			if (n >= e.length) throw new D("unclosed class");
			return this.i = n + 1, this.atom(e.slice(t, this.i));
		}
		if (n === ".") return this.i++, this.atom(this.iregexp ? "[^\\n\\r]" : ".");
		if (n === "\\") return !this.unicode && e[t + 1] === "c" && !/[a-zA-Z]/.test(e[t + 2] ?? "") ? (this.i = t + 1, this.atom("\\\\", "\\")) : (this.i = t + this.escapeLength(t), this.atom(e.slice(t, this.i)));
		if (n === "*" || n === "+" || n === "?" || n === ")") throw new D("nothing to repeat");
		let r = e.codePointAt(t), i = this.unicode && r > 65535 ? String.fromCodePoint(r) : n;
		return this.i = t + i.length, this.atom(ze.has(i) ? `\\${i}` : i, i);
	}
	escapeLength(e) {
		let { src: t, unicode: n } = this, r = t[e + 1];
		if (r === void 0) throw new D("trailing backslash");
		if (r === "b" || r === "B") throw new D("word boundary");
		if (r >= "1" && r <= "9") throw new D("backreference");
		if (r === "0") {
			if (n) return 2;
			let r = 2;
			for (; r < 4 && /[0-7]/.test(t[e + r] ?? "");) r++;
			return r;
		}
		if (r === "c") return 3;
		if (r === "x" && /^[0-9a-fA-F]{2}/.test(t.slice(e + 2))) return 4;
		if (n && (r === "p" || r === "P" || r === "u") && t[e + 2] === "{") {
			let n = t.indexOf("}", e + 3);
			if (n === -1) throw new D("unclosed escape");
			return n - e + 1;
		}
		if (r === "u" && Ve.test(t.slice(e + 2))) {
			let r = parseInt(t.slice(e + 2, e + 6), 16);
			if (n && r >= 55296 && r <= 56319 && t.slice(e + 6, e + 8) === "\\u") {
				let n = t.slice(e + 8, e + 12);
				if (Ve.test(n) && parseInt(n, 16) >= 56320 && parseInt(n, 16) <= 57343) return 12;
			}
			return 6;
		}
		return 2;
	}
	parseQuantifier(e) {
		let { src: t } = this, n = t[this.i], r, i;
		if (n === "*") r = 0, i = Infinity, this.i++;
		else if (n === "+") r = 1, i = Infinity, this.i++;
		else if (n === "?") r = 0, i = 1, this.i++;
		else if (n === "{") {
			let n = Be.exec(t.slice(this.i));
			if (!n) return e;
			r = Number(n[1]), i = n[2] === void 0 ? r : n[2] === "" ? Infinity : Number(n[2]), this.i += n[0].length;
		} else return e;
		if (t[this.i] === "?" && this.i++, r > Ee || i !== Infinity && i > Ee) throw new D("repetition too large");
		return {
			t: "rep",
			node: e,
			min: r,
			max: i
		};
	}
}, Ge = class {
	constructor(e) {
		this.unicode = e, this.op = [], this.x = [], this.y = [], this.atoms = [], this.atomIds = /* @__PURE__ */ new Map(), this.work = 0;
	}
	emit(e, t = 0, n = 0) {
		if (this.op.length >= Ee) throw new D("pattern too large");
		return this.op.push(e), this.x.push(t), this.y.push(n), this.op.length - 1;
	}
	atomId(e) {
		let t = (e.mods.i ? "i" : "") + (e.mods.s ? "s" : "") + (this.unicode ? "u" : ""), n = `${t}/${e.src}`, r = this.atomIds.get(n);
		return r === void 0 && (r = this.atoms.length, this.atoms.push({
			re: RegExp(`^(?:${e.src})$`, t),
			literal: e.mods.i ? void 0 : e.literal
		}), this.atomIds.set(n, r)), r;
	}
	finish() {
		this.emit(Ie);
	}
	compile(e) {
		if (++this.work > 4 * Ee) throw new D("pattern too large");
		switch (e.t) {
			case "atom":
				this.emit(je, this.atomId(e));
				return;
			case "bol":
				this.emit(Pe, +!!e.multiline);
				return;
			case "eol":
				this.emit(Fe, +!!e.multiline);
				return;
			case "cat":
				for (let t of e.items) this.compile(t);
				return;
			case "alt": {
				let t = [];
				for (let n = 0; n < e.alts.length - 1; n++) {
					let r = this.emit(Me);
					this.x[r] = r + 1, this.compile(e.alts[n]), t.push(this.emit(Ne)), this.y[r] = this.op.length;
				}
				this.compile(e.alts[e.alts.length - 1]);
				for (let e of t) this.x[e] = this.op.length;
				return;
			}
			case "rep":
				for (let t = 0; t < e.min; t++) this.compile(e.node);
				if (e.max === Infinity) {
					let t = this.emit(Me);
					this.x[t] = t + 1, this.compile(e.node), this.emit(Ne, t), this.y[t] = this.op.length;
				} else {
					let t = [];
					for (let n = e.min; n < e.max; n++) {
						let n = this.emit(Me);
						this.x[n] = n + 1, t.push(n), this.compile(e.node);
					}
					for (let e of t) this.y[e] = this.op.length;
				}
				return;
		}
	}
}, Ke = (e, t, n) => {
	try {
		new RegExp(e, t);
		let r = t.includes("u"), i = new We(e, r, t, n).parse(), a = new Ge(r);
		return a.compile(i), a.finish(), {
			op: a.op,
			x: a.x,
			y: a.y,
			atoms: a.atoms,
			unicode: r,
			sticky: t.includes("y")
		};
	} catch (e) {
		if (e instanceof RangeError) throw e;
		return null;
	}
}, qe = (e, t, n, r) => {
	let { op: i, x: a, y: o, atoms: s, unicode: c, sticky: l } = e, u = n.regexWork ?? n, { clist: d, nlist: f } = r, p = 0, m = 0, { onList: h, stack: g, atomGen: ee, atomHit: te } = r, _ = r.gen, v = r.step;
	r.gen = _ + t.length + 2, r.step = v + t.length + 2;
	let y = 0, b = !1, ne = (e, n, r) => {
		let s = 0;
		g[s++] = r;
		let c = 0;
		for (; s > 0;) {
			let r = g[--s];
			if (h[r] !== _) switch (h[r] = _, ++c === 64 && (u(c), c = 0), i[r]) {
				case je:
					e[n++] = r;
					break;
				case Ie: return u(c), b = !0, n;
				case Ne:
					g[s++] = a[r];
					break;
				case Me:
					g[s++] = o[r], g[s++] = a[r];
					break;
				case Pe:
					(y === 0 || a[r] === 1 && Ue(t.charCodeAt(y - 1))) && (g[s++] = r + 1);
					break;
				case Fe: (y === t.length || a[r] === 1 && Ue(t.charCodeAt(y))) && (g[s++] = r + 1);
			}
		}
		return u(c), n;
	};
	if (_++, p = ne(d, 0, 0), b) return !0;
	for (; y < t.length;) {
		if (p === 0 && l) return !1;
		let e = (c ? t.codePointAt(y) : t.charCodeAt(y)) > 65535 ? 2 : 1, n = t.slice(y, y + e), r = v + y + 1;
		_++, m = 0, y += e;
		for (let e = 0; e < p; e++) {
			let t = d[e], i = a[t];
			if (ee[i] !== r) {
				ee[i] = r;
				let e = s[i];
				te[i] = (e.literal === void 0 ? e.re.test(n) : e.literal === n) ? 1 : 0;
			}
			if (te[i] === 1 && (m = ne(f, m, t + 1), b)) return !0;
		}
		if (!l && (m = ne(f, m, 0), b)) return !0;
		let i = d;
		d = f, f = i, p = m;
	}
	return !1;
}, Je = (e, t, n) => {
	let r = Re(e, t.length);
	try {
		return qe(e, t, n, r);
	} finally {
		e.scratch = r;
	}
}, Ye = 256, Xe = /* @__PURE__ */ new Map(), Ze = 0, Qe = (e, t, n, r, i = !1) => {
	if (e.length > De || t.length > 7 || !ke.test(t)) return null;
	let a = `${t}/${+!!n}/${+!!i}`, o = Xe.get(e)?.get(a);
	if (o !== void 0) return r(e.length), o;
	let s = Array.from(e).join(""), c = Ae(s) > Oe ? null : Ke(n ? `^(?:${s})$` : s, t, i);
	Ze >= Ye && (Xe.clear(), Ze = 0);
	let l = Xe.get(s);
	return l === void 0 && Xe.set(s, l = /* @__PURE__ */ new Map()), l.set(a, c), Ze++, r(s.length + (c === null ? 0 : c.op.length)), c;
}, $e = (e, t, n) => {
	var r;
	return (r = n.regexProgram) == null || r.call(n, e.op.length), Je(e, t, n);
}, et = class {
	constructor(e) {
		this.nodes = e;
	}
}, tt = (e) => {
	let t = !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === "\\" && n + 1 < e.length) {
			let r = e[n + 1];
			if ((r === "b" || r === "B") && !t) return !0;
			n++;
		} else r === "[" && !t ? t = !0 : r === "]" && t && (t = !1);
	}
	return !1;
}, nt = (e) => {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (n === "\\") {
			let n = e[t + 1];
			if (n >= "1" && n <= "9") return !1;
			t++;
		} else if (n === "(" && e[t + 1] === "?") {
			let n = e[t + 2];
			if (n === "=" || n === "!") return !1;
			if (n === "<") {
				let n = e[t + 3];
				if (n === "=" || n === "!" || /[a-zA-Z]/.test(n ?? "")) return !1;
			}
		}
	}
	return !tt(e);
}, rt = 256, it = /* @__PURE__ */ new Map(), at = (e, t) => {
	let n = it.get(e);
	return n === void 0 && (n = nt(e), it.size >= rt && it.clear(), it.set(Array.from(e).join(""), n)), t(e.length), n;
}, ot = /* @__PURE__ */ new Map(), st = (e, t) => {
	let n = ot.get(e);
	return n === void 0 && (n = Te(e), n !== null && (n = Array.from(n).join("")), ot.size >= rt && ot.clear(), ot.set(Array.from(e).join(""), n)), t(e.length), n;
}, ct = 256, lt = (e, t, n, r, i, a, o = !1) => {
	let s = a === void 0 ? void 0 : i.regexSites, c = s?.get(a);
	if (c === void 0) {
		if (e.length > De) c = null;
		else if (o) {
			let n = st(e, i);
			c = n === null ? null : Qe(n, t, r, i, !0);
		} else c = at(e, i) ? Qe(e, t, r, i) : null;
		s !== void 0 && (s.size >= ct && s.clear(), s.set(a, c));
	}
	return c !== null && $e(c, n, i);
}, ut = {
	length: (e, t) => {
		let n = e[0];
		if (C(n)) {
			t(n.length);
			let e = n.length;
			for (let t = 0; t < n.length - 1; t++) {
				let r = n.charCodeAt(t);
				if (r >= 55296 && r <= 56319) {
					let r = n.charCodeAt(t + 1);
					r >= 56320 && r <= 57343 && (e--, t++);
				}
			}
			return e;
		}
		if (b(n)) return v(n);
		if (x(n)) {
			let e = _(n);
			return t(e.length), e.length;
		}
	},
	count: (e) => e[0].nodes.length,
	match: (e, t, n) => {
		let r = e[0], i = e[1];
		return !C(r) || !C(i) ? !1 : lt(i, "u", r, !0, t, n, !0);
	},
	search: (e, t, n) => {
		let r = e[0], i = e[1];
		return !C(r) || !C(i) ? !1 : lt(i, "u", r, !1, t, n, !0);
	},
	value: (e) => {
		let { nodes: t } = e[0];
		return t.length === 1 ? t[0] : void 0;
	}
}, dt = (e, t, n = f) => e === void 0 && t === void 0 || m(e, t, n), ft = (e, t, n = f) => !m(e, t, n), pt = (e) => e >= 55296 && e <= 57343 ? e + 8192 : e >= 57344 ? e - 2048 : e, mt = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = e.charCodeAt(r), i = t.charCodeAt(r);
		if (n !== i) return pt(n) - pt(i);
	}
	return e.length - t.length;
}, ht = (e, t, n = f) => S(e) && S(t) ? e < t : C(e) && C(t) ? (n(Math.min(e.length, t.length)), mt(e, t) < 0) : !1, gt = (e, t, n = f) => ht(e, t, n) || dt(e, t, n), _t = (e, t, n = f) => S(e) && S(t) ? e > t : C(e) && C(t) ? (n(Math.min(e.length, t.length)), mt(e, t) > 0) : !1, vt = (e, t, n = f) => _t(e, t, n) || dt(e, t, n), O = (e, t) => typeof e == "string" && typeof t == "string" && e.length === t.length ? e.length : 0, yt = (e, t, n) => {
	let r = v(e);
	for (let i = 0; i < r; i++) {
		let r = g(e, i);
		if (n(1 + O(r, t)), r === t || r !== r && t !== t) return i;
	}
	return -1;
}, bt = (e) => typeof e == "number" ? "n" + String(e) : typeof e == "string" ? "s" + e : e, xt = (e) => typeof e == "string" && e.length + 1 > ee, k = (e, t, n) => {
	let r = n?.get(e);
	if (r) return r;
	let i = {
		set: /* @__PURE__ */ new Set(),
		long: []
	}, a = v(e);
	for (let n = 0; n < a; n++) {
		let r = g(e, n);
		t(1 + (typeof r == "string" ? r.length : 0)), xt(r) ? i.long.push(r) : i.set.add(bt(r));
	}
	return n?.set(e, i), i;
}, St = ({ set: e, long: t }, n, r) => {
	if (xt(n)) {
		for (let e of t) if (r(1 + O(e, n)), e === n) return !0;
		return !1;
	}
	return e.size === 0 ? (r(), !1) : (r(1 + (typeof n == "string" ? 2 * n.length : 0)), e.has(bt(n)));
}, Ct = (e, t, n) => {
	let r = v(e);
	for (let i = 0; i < r; i++) if (n(), h(e, i) && t(e[i])) return !0;
	return !1;
}, wt = {
	eq: dt,
	ne: ft,
	lt: ht,
	le: gt,
	gt: _t,
	ge: vt,
	in: (e, t, n = f) => b(t) ? yt(t, e, n) !== -1 : !1,
	nin: (e, t, n = f) => b(t) ? yt(t, e, n) === -1 : !1,
	subsetof: (e, t, n = f, r) => {
		if (!b(e) || !b(t)) return !1;
		let i = k(t, n, r);
		return !Ct(e, (e) => !St(i, e, n), n);
	},
	anyof: (e, t, n = f, r) => {
		if (!b(e) || !b(t)) return !1;
		let i = k(t, n, r);
		return Ct(e, (e) => St(i, e, n), n);
	},
	noneof: (e, t, n = f, r) => {
		if (!b(e) || !b(t)) return !1;
		let i = k(t, n, r);
		return !Ct(e, (e) => St(i, e, n), n);
	},
	sizeof: (e, t) => !b(e) && !C(e) || !b(t) && !C(t) ? !1 : (b(e) ? v(e) : e.length) === (b(t) ? v(t) : t.length),
	size: (e, t) => !b(e) && !C(e) || !S(t) ? !1 : (b(e) ? v(e) : e.length) === t
}, Tt = (e) => !b(e) && !C(e) ? !1 : (b(e) ? v(e) : e.length) === 0, Et = (e, t, n, r = f, i) => !C(e) || !C(t) ? !1 : lt(i !== void 0 && r.regexSites?.has(i) === !0 ? "" : t.slice(1, -1), n, e, !1, r, i), Dt = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\x08/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (e) => "\\u00" + e.charCodeAt(0).toString(16).padStart(2, "0")), Ot = (e, t) => e.concat(`[${t}]`), kt = (e, t) => e < 0 ? t + e : e, At = (e, t) => {
	let n = v(e), r = kt(t, n);
	return r >= 0 && r < n ? {
		exists: !0,
		value: h(e, r) ? e[r] : void 0,
		index: r
	} : { exists: !1 };
}, jt = (e, t) => {
	for (let n of t) e.push(n);
}, Mt = 1e6, Nt = 100, Pt = 1e6, Ft = 20, It = 1e4, Lt = 1e4, Rt = class {
	constructor(e) {
		this.weight = 0, this.nodes = 0, this.stringPositions = 0, this.done = !1, this.seen = /* @__PURE__ */ new Set(), this.frames = [], this.visit(e);
	}
	advance(e) {
		let t = this.nodes + e, { frames: n } = this;
		for (; n.length > 0 && this.nodes < t;) {
			let e = n[n.length - 1];
			if (e.i >= e.length) {
				n.pop();
				continue;
			}
			let t = e.i++;
			if (e.keys === null) {
				let n = e.container;
				if (e.indices !== null) {
					let r = Number(e.indices[t]);
					h(n, r) && this.visit(n[r]);
				} else if (h(n, t)) this.visit(n[t]);
				else if (++e.holes > Lt) {
					let r = e.length, i = Object.getOwnPropertyNames(n).filter((e) => {
						let n = Number(e);
						return Number.isInteger(n) && n > t && n < r && String(n) === e;
					});
					e.indices = i, e.length = i.length, e.i = 0;
				}
			} else {
				let n = e.container, r = e.keys[t];
				if (!h(n, r)) continue;
				this.weight += r.length, this.visit(n[r]);
			}
		}
		n.length === 0 && (this.done = !0);
	}
	visit(e) {
		if (this.nodes++, this.weight += typeof e == "string" ? 1 + e.length : 1, typeof e == "string" && (this.stringPositions += 1 + e.length), typeof e == "object" && e && !this.seen.has(e)) {
			if (this.seen.add(e), b(e)) this.frames.push({
				container: e,
				keys: null,
				indices: null,
				length: v(e),
				i: 0,
				holes: 0
			});
			else if (x(e)) {
				let t = Object.keys(e);
				this.frames.push({
					container: e,
					keys: t,
					indices: null,
					length: t.length,
					i: 0,
					holes: 0
				});
			}
		}
	}
}, zt = class {
	constructor(e, t = {}) {
		this.steps = 0, this.largestRegexProgram = 0, this.regexSteps = 0, this.rootQueryCache = /* @__PURE__ */ new Map(), this.setCaches = /* @__PURE__ */ new Map(), this.siteSetCache = (e) => {
			let t = this.setCaches.get(e);
			return t === void 0 && (t = /* @__PURE__ */ new WeakMap(), this.setCaches.set(e, t)), t;
		}, this.canonicalNames = /* @__PURE__ */ new Map(), this.canonicalName = (e, t) => {
			let n = this.canonicalNames.get(e);
			return n === void 0 && (this.tick(t.length), n = Object.keys({ [t]: 0 })[0], this.canonicalNames.set(e, n), this.escapedNames.has(n) || this.escapedNames.set(n, Dt(n))), n;
		}, this.escapedNames = /* @__PURE__ */ new Map(), this.formatStringLiteralPath = (e, t) => {
			let n = this.escapedNames.get(t);
			return n === void 0 && (this.tick(t.length), n = Dt(t), this.escapedNames.set(t, n)), e.concat(`['${n}']`);
		}, this.forEachElement = (e, t) => {
			let n = v(e);
			for (let r = 0; r < n; r++) this.tick(), h(e, r) && t(e[r], r);
		}, this.retained = 0, this.retain = () => {
			if (!(++this.retained <= this.retainedLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Rt(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(It, Math.ceil((this.retained - this.retainedLimit) / Ft))), this.raiseLimits(e), this.retained <= this.retainedLimit) return;
					if (this.raiseLimits(e), this.retained <= this.retainedLimit) return;
				}
				throw new d(`Query retains more than ${this.retainedLimit} nodes`);
			}
		}, this.raiseLimits = (e) => {
			let t = Math.min(this.regexSteps, this.largestRegexProgram * e.stringPositions);
			this.stepLimit = Math.max(Mt, Nt * e.weight) + t, this.retainedLimit = Math.max(Pt, Ft * e.nodes);
		}, this.tick = Object.assign((e = 1) => {
			if (this.steps += e, !(this.steps <= this.stepLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new Rt(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(It, Math.ceil((this.steps - this.stepLimit) / Nt))), this.raiseLimits(e), this.steps <= this.stepLimit) return;
					if (this.raiseLimits(e), this.steps <= this.stepLimit) return;
				}
				throw new d(`Query exceeded ${this.stepLimit} evaluation steps`);
			}
		}, {
			regexProgram: (e) => {
				this.largestRegexProgram = Math.max(this.largestRegexProgram, e);
			},
			regexWork: (e) => {
				this.regexSteps += e, this.tick(e);
			},
			regexSites: /* @__PURE__ */ new Map()
		}), this.readsCurrent = /* @__PURE__ */ new WeakMap(), this.invariantResults = /* @__PURE__ */ new Map(), this.isInvariant = (e) => (this.readsCurrent.has(e) || this.classify(e), !this.readsCurrent.get(e)), this.classify = (e) => {
			let t = this.readsCurrent, n = [], r = (e) => {
				if (typeof e != "object" || !e) return !1;
				let r = t.get(e);
				if (r !== void 0) return r;
				let i = e.type;
				if (i === "current") return t.set(e, !0), !0;
				if (i === "filterExpression" || i === "value") return t.set(e, !1), !1;
				let a = Object.values(e);
				n.push({
					node: e,
					children: a,
					i: 0,
					reads: !1
				});
			};
			for (r(e); n.length > 0;) {
				let e = n[n.length - 1];
				e.i < e.children.length ? r(e.children[e.i++]) === !0 && (e.reads = !0) : (t.set(e.node, e.reads), n.pop(), e.reads && n.length > 0 && (n[n.length - 1].reads = !0));
			}
		}, this.memoInvariant = (e, t) => {
			if (!this.isInvariant(e)) return t();
			if (this.invariantResults.has(e)) return this.invariantResults.get(e);
			let n = t();
			return this.invariantResults.set(e, n), n;
		}, this.handleRootQuery = (e, t) => {
			if (this.rootQueryCache.has(e)) return this.rootQueryCache.get(e);
			let n = this.handleSubscript(this.rootPayload, t);
			return this.rootQueryCache.set(e, n), n;
		}, this.handleIdentifier = (e, t) => this.selectMember(e, t), this.handleStringLiteral = (e, t) => this.selectMember(e, t), this.selectMember = ({ value: e, paths: t }, n) => {
			if (!x(e)) return;
			let r = this.canonicalName(n, n.value);
			if (h(e, r)) return {
				value: e[r],
				paths: this.formatStringLiteralPath(t, r)
			};
		}, this.handleWildcard = ({ value: e, paths: t }) => {
			if (b(e)) {
				let n = [];
				return this.forEachElement(e, (e, r) => {
					this.retain(), n.push({
						value: e,
						paths: Ot(t, r)
					});
				}), n;
			}
			if (x(e)) {
				let n = _(e);
				this.tick(n.length);
				let r = [];
				for (let i of n) h(e, i) && (this.retain(), r.push({
					value: e[i],
					paths: this.formatStringLiteralPath(t, i)
				}));
				return r;
			}
			return [];
		}, this.handleNumericLiteral = ({ value: e, paths: t }, n) => {
			if (!b(e)) return;
			let r = At(e, n.value);
			if (r.exists) return {
				value: r.value,
				paths: Ot(t, r.index)
			};
		}, this.handleDotNumericLiteral = ({ value: e, paths: t }, n) => {
			if (b(e)) {
				let r = At(e, n.value);
				return r.exists ? {
					value: r.value,
					paths: Ot(t, r.index)
				} : void 0;
			}
			if (x(e)) {
				let r = String(n.value);
				return h(e, r) ? {
					value: e[r],
					paths: this.formatStringLiteralPath(t, r)
				} : void 0;
			}
		}, this.handleSlices = ({ value: e, paths: t }, n) => {
			if (!b(e)) return [];
			let r = v(e), i = n.step ?? 1;
			if (i === 0) return [];
			let a, o;
			i > 0 ? (a = n.start === null ? 0 : kt(n.start, r), o = n.end === null ? r : kt(n.end, r)) : (a = n.start === null ? r - 1 : kt(n.start, r), o = n.end === null ? -r - 1 : kt(n.end, r));
			let s, c;
			i > 0 ? (s = Math.max(a, 0), c = Math.min(o, r)) : (c = Math.min(a, r - 1), s = Math.max(o, -1));
			let l = [], u = i > 0 ? s : c;
			for (; i > 0 && u < c || i < 0 && u > s;) this.tick(), this.retain(), l.push({
				value: h(e, u) ? e[u] : void 0,
				paths: Ot(t, u)
			}), u += i;
			return l;
		}, this.handleUnions = (e, t) => {
			let n = [];
			for (let r of t.values) switch (this.tick(), r.type) {
				case "identifier":
					if (x(e.value)) {
						let t = this.handleIdentifier(e, r);
						w(t) && (this.retain(), n.push(t));
					}
					break;
				case "stringLiteral":
					if (x(e.value)) {
						let t = this.handleStringLiteral(e, r);
						w(t) && (this.retain(), n.push(t));
					}
					break;
				case "numericLiteral":
					if (b(e.value)) {
						let t = this.handleNumericLiteral(e, r);
						w(t) && (this.retain(), n.push(t));
					}
					break;
				case "wildcard":
					jt(n, this.handleWildcard(e));
					break;
				case "slices":
				case "filterExpression": jt(n, this.handleBracketExpressionContent(e, r));
			}
			return n;
		}, this.handleDotdot = (e, t) => {
			let n = [];
			return this.collectDotdot(e, t, n), n;
		}, this.collectDotdot = (e, t, n) => {
			let r = t.value, i = [];
			this.tick();
			let a = e;
			for (; a !== void 0;) {
				let e = a.value;
				switch (r.type) {
					case "bracketMember": {
						let e = this.handleBracketMemberContent(a, r.value);
						w(e) && (this.retain(), n.push(e));
						break;
					}
					case "bracketExpression":
						jt(n, this.handleBracketExpressionContent(a, r.value));
						break;
					case "wildcard":
						jt(n, this.handleWildcard(a));
						break;
					case "identifier": {
						let e = this.handleIdentifier(a, r);
						w(e) && (this.retain(), n.push(e));
						break;
					}
				}
				if (x(e)) {
					let t = _(e);
					this.tick(t.length), i.push({
						parent: a,
						keys: t,
						length: t.length,
						i: 0
					});
				} else b(e) && i.push({
					parent: a,
					keys: null,
					length: v(e),
					i: 0
				});
				for (a = void 0; i.length > 0;) {
					let e = i[i.length - 1];
					if (e.i >= e.length) {
						i.pop();
						continue;
					}
					let t = e.i++;
					if (e.keys === null) {
						this.tick();
						let n = e.parent.value;
						if (!h(n, t)) continue;
						a = {
							value: n[t],
							paths: Ot(e.parent.paths, t)
						};
					} else {
						let n = e.parent.value, r = e.keys[t];
						if (!h(n, r)) continue;
						a = {
							value: n[r],
							paths: this.formatStringLiteralPath(e.parent.paths, r)
						};
					}
					break;
				}
			}
		}, this.handleOperationContent = (e, t) => {
			switch (this.tick(), t.type) {
				case "root": return this.handleRootQuery(t, t.next);
				case "current": return this.handleSubscript(e, t.next);
				case "value": return {
					value: t.value,
					paths: e.paths
				};
				case "groupOperation": return this.memoInvariant(t, () => this.handleOperationContent(e, t.value));
				case "functionCall": return {
					value: this.handleFunctionCall(e, t),
					paths: e.paths
				};
				case "operation": {
					let n = [], r = t;
					for (; r.type === "operation";) n.push({
						operator: r.operator,
						right: r.right
					}), r = r.left;
					let i = this.handleOperationContent(e, r)?.value;
					this.tick(n.length);
					for (let t = n.length - 1; t >= 0; t--) {
						let r = this.handleOperationContent(e, n[t].right)?.value;
						if (!S(i) || !S(r)) i = void 0;
						else switch (n[t].operator) {
							case "plus":
								i += r;
								break;
							case "minus":
								i -= r;
								break;
							case "div":
								i = r === 0 ? void 0 : i / r;
								break;
							case "multi": i *= r;
						}
					}
					return S(i) ? {
						value: i,
						paths: e.paths
					} : void 0;
				}
			}
		}, this.handleComparator = (e, t) => this.memoInvariant(t, () => this.evaluateComparator(e, t)), this.evaluateComparator = (e, t) => {
			let n = this.handleOperationContent(e, t.left)?.value;
			if (t.operator === "empty") return Tt(n);
			if (t.operator === "reg") return Et(n, t.right.value, t.right.opts, this.tick, t);
			let r = this.handleOperationContent(e, t.right)?.value, i = wt[t.operator];
			if (i) {
				let e = this.isInvariant(t.right) ? this.siteSetCache(t.right) : void 0;
				return i(n, r, this.tick, e);
			}
			return !1;
		}, this.handleLogicalExpression = (e, t) => this.memoInvariant(t, () => this.evaluateLogicalExpression(e, t)), this.evaluateLogicalExpression = (e, t) => {
			let n = [], r = !this.isInvariant(t), i = t;
			for (; i.type === "logicalExpression" && (i === t || !r || !this.isInvariant(i));) n.push({
				operator: i.operator,
				right: i.right
			}), i = i.left;
			this.tick(n.length);
			let a = this.handleFilterExpressionContent(e, i);
			for (let t = n.length - 1; t >= 0; t--) (n[t].operator === "and" ? a : !a) && (a = this.handleFilterExpressionContent(e, n[t].right));
			return a;
		}, this.handleFunctionCall = (e, t) => this.memoInvariant(t, () => this.evaluateFunctionCall(e, t)), this.evaluateFunctionCall = (e, t) => {
			let n = t.name === "count" || t.name === "value", r = t.args.map((t) => {
				let r = this.handleOperationContent(e, t);
				return !n || t.type !== "root" && t.type !== "current" ? r?.value : r?.isIndefinite ? new et(r.value) : new et(w(r?.value) ? [r?.value] : []);
			}), i = ut[t.name], a = t.args[1], o = a?.type === "stringLiteral" || a?.subtype === "string";
			return i ? i(r, this.tick, o ? t : void 0) : void 0;
		}, this.handleFilterExpressionContent = (e, t) => {
			switch (this.tick(), t.type) {
				case "logicalExpression": return this.handleLogicalExpression(e, t);
				case "comparator": return this.handleComparator(e, t);
				case "groupExpression": return this.memoInvariant(t, () => this.handleFilterExpressionContent(e, t.value));
				case "notExpression": return this.memoInvariant(t, () => !this.handleFilterExpressionContent(e, t.value));
				case "functionCall": return !!this.handleFunctionCall(e, t);
				case "root": {
					let e = this.handleRootQuery(t, t.next);
					return e?.isIndefinite ? Array.isArray(e.value) && e.value.length > 0 : w(e);
				}
				case "current": {
					let n = this.handleSubscript(e, t.next);
					return n?.isIndefinite ? Array.isArray(n.value) && n.value.length > 0 : w(n);
				}
				case "value": return !!t.value;
			}
		}, this.handleBracketMemberContent = (e, t) => {
			switch (t.type) {
				case "identifier": return this.handleIdentifier(e, t);
				case "numericLiteral": return this.handleNumericLiteral(e, t);
				case "stringLiteral": return this.handleStringLiteral(e, t);
			}
		}, this.handleBracketExpressionContent = (e, t) => {
			let n = e.value;
			switch (t.type) {
				case "filterExpression": {
					let r = [];
					if (b(n)) this.forEachElement(n, (n, i) => {
						let a = {
							value: n,
							paths: Ot(e.paths, i)
						};
						this.handleFilterExpressionContent(a, t.value) && (this.retain(), r.push(a));
					});
					else if (x(n)) {
						let i = _(n);
						this.tick(i.length);
						for (let a of i) {
							if (!h(n, a)) continue;
							let i = {
								value: n[a],
								paths: this.formatStringLiteralPath(e.paths, a)
							};
							this.handleFilterExpressionContent(i, t.value) && (this.retain(), r.push(i));
						}
					}
					return r;
				}
				case "unions": return this.handleUnions(e, t);
				case "wildcard": return this.handleWildcard(e);
				case "slices": return this.handleSlices(e, t);
			}
		}, this.isIndefiniteSegment = (e) => {
			let t = e.value;
			return t.type === "bracketExpression" || t.type === "dotdot" || t.type === "dot" && t.value.type === "wildcard";
		}, this.selectMany = (e, t) => {
			let n = t.value;
			switch (n.type) {
				case "bracketExpression": return this.handleBracketExpressionContent(e, n.value);
				case "dotdot": return this.handleDotdot(e, n);
				default: return this.handleWildcard(e);
			}
		}, this.selectOne = (e, t) => {
			let n = t.value;
			switch (n.type) {
				case "bracketMember": return this.handleBracketMemberContent(e, n.value);
				case "dot":
					if (n.value.type === "identifier") return this.handleIdentifier(e, n.value);
					if (n.value.type === "numericLiteral") return this.handleDotNumericLiteral(e, n.value);
			}
		}, this.handleSubscript = (e, t) => {
			if (t === null) return e;
			let n = [], r = [{
				node: e,
				segment: t
			}], i = !1;
			for (; r.length > 0;) {
				let { node: e, segment: t } = r.pop(), a;
				if (this.isIndefiniteSegment(t)) i = !0, a = this.selectMany(e, t);
				else {
					this.tick();
					let n = this.selectOne(e, t);
					if (!w(n)) continue;
					a = [n];
				}
				let o = t.next;
				if (o === null) jt(n, a);
				else for (let e = a.length - 1; e >= 0; e--) r.push({
					node: a[e],
					segment: o
				});
			}
			if (!i) return n[0];
			let a = [], o = [];
			for (let e of n) a.push(e.value), o.push(e.paths);
			return {
				value: a,
				paths: o,
				isIndefinite: !0
			};
		}, this.handleRoot = (e) => {
			try {
				return this.handleSubscript(this.rootPayload, e.next);
			} catch (e) {
				throw y(e) ? new d("Query is nested too deeply") : ne(e) ? new d("Query result is too large") : e;
			}
		}, this.rootPayload = {
			value: e,
			paths: "$"
		}, this.adaptiveLimit = t.maxSteps === void 0, this.stepLimit = t.maxSteps ?? Mt, this.retainedLimit = this.adaptiveLimit ? Pt : Infinity;
	}
}, Bt = (e, t, n) => {
	let r = pe(t), i = new zt(e, n).handleRoot(r);
	return !i?.isIndefinite && n.returnArray ? re(i) ? [] : [i.value] : i?.value;
}, Vt = (e, t, n) => {
	let r = [];
	for (let i of t) {
		let t = Bt(e, i, n);
		w(t) && r.push(t);
	}
	return r;
}, Ht = (e, t, n = {}) => {
	try {
		return b(t) ? Vt(e, t, n) : Bt(e, t, n);
	} catch (e) {
		if (!n.hideExceptions) throw e;
		return n.returnArray ? [] : void 0;
	}
}, Ut = (e) => typeof e == "object" && !!e && !Array.isArray(e), Wt = (e, t) => {
	if (!Ut(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = Zt(t, i);
	return n;
}, Gt = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => Zt(t, e));
}, Kt = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, qt = (e, t) => Kt(e, t), Jt = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, Yt = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.0"
}, Xt = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.applyTemplate ??= e, globalThis.ks.transformerFuncs ??= {}, globalThis.ks.transformerFuncs.primitive = {
		meta: Yt,
		applyTemplate: e
	});
}, Zt = (e, t, n) => {
	let r = e, i = t;
	Jt(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? Kt(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = qt(a?.textContent, r)), "attributes" in a && (a.attributes = Wt(a?.attributes, r)), "children" in a && (a.children = Gt(a?.children, r))), a);
};
Xt(Zt);
// ../json-write-path/node_modules/json-transformer-funcs/src/v24/findByRole.js
var Qt = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = Qt(n, t);
		if (e) return e;
	}
	return null;
}, $t = (e, t, n) => {
	let r = e?.[t.fileName];
	if (r === void 0) throw Error(`Registry entry not found: ${t.fileName}`);
	let i = r;
	if (t.jsonPath) {
		let e = Ht(r, t.jsonPath, { returnArray: !0 });
		if (e.length === 0) throw Error(`Destination JSONPath matched no nodes: ${t.jsonPath}`);
		if (e.length > 1) throw Error(`Destination JSONPath must identify exactly one node; matched ${e.length}: ${t.jsonPath}`);
		i = e[0];
	} else if (t.dataRole && (i = Qt(r, t.dataRole), i == null)) throw Error(`Destination dataRole not found: ${t.dataRole}`);
	let a = [...t.filePath ?? []];
	if (a.length === 0) throw Error("destinationPath.filePath must contain the property to write");
	let o = a.pop(), s = a.reduce((e, t) => {
		if (e == null) throw Error(`Cannot resolve destination filePath at: ${t}`);
		return e[t];
	}, i);
	if (s == null) throw Error(`Destination parent not found for filePath: ${t.filePath.join(".")}`);
	return n && console.log("json-write-path v6 resolved:", {
		fileName: t.fileName,
		jsonPath: t.jsonPath,
		dataRole: t.dataRole,
		filePath: t.filePath,
		parent: s,
		key: o
	}), {
		parent: s,
		key: o,
		target: i
	};
}, en = (e, r, i, a) => {
	let { parent: o, key: s } = $t(e, r, a);
	return (n[r.action] || t)(o, s, i), e;
}, tn = (e) => typeof e == "object" && !!e && !Array.isArray(e), nn = (e, t) => {
	if (!tn(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = un(t, i);
	return n;
}, rn = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => un(t, e));
}, an = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, on = (e, t) => an(e, t), sn = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, cn = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.0"
}, ln = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.applyTemplate ??= e, globalThis.ks.transformerFuncs ??= {}, globalThis.ks.transformerFuncs.primitive = {
		meta: cn,
		applyTemplate: e
	});
}, un = (e, t, n) => {
	let r = e, i = t;
	sn(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? an(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = on(a?.textContent, r)), "attributes" in a && (a.attributes = nn(a?.attributes, r)), "children" in a && (a.children = rn(a?.children, r))), a);
};
ln(un);
// ../json-transformer-funcs-one-dimension/node_modules/json-transformer-funcs-primitive/src/v9/forAttributes/index.js
var dn = (e) => typeof e == "object" && !!e && !Array.isArray(e), fn = (e, t) => {
	if (!dn(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = yn(t, i);
	return n;
}, pn = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => yn(t, e));
}, mn = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, hn = (e, t) => mn(e, t), gn = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, _n = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, vn = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.applyTemplate ??= e, globalThis.ks.transformerFuncs ??= {}, globalThis.ks.transformerFuncs.primitive = {
		meta: _n,
		applyTemplate: e
	});
}, yn = (e, t, n) => {
	let r = e, i = t;
	gn(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? mn(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = hn(a?.textContent, r)), "attributes" in a && (a.attributes = fn(a?.attributes, r)), "children" in a && (a.children = pn(a?.children, r))), a);
};
vn(yn);
// ../json-transformer-funcs-one-dimension/src/v9/guard/index.js
var bn = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, xn = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, Sn = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: xn,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, Cn = (e, t) => {
	let n = e, r = t;
	return bn(n, r), n.map((e) => yn(e, r));
};
Sn((e, t) => {
	let n = e;
	return bn(n, t), n.map((e) => yn(e, e[t]));
}, Cn);
// ../json-instruction-single/node_modules/json-source-path/src/v2/findByRole.js
var wn = (e, t) => {
	if (e?.attributes?.["data-role"] === t) return e;
	for (let n of e?.children ?? []) {
		let e = wn(n, t);
		if (e) return e;
	}
	return null;
}, Tn = (e, t) => {
	let n = e[t.fileName], r = t.dataRole ? wn(n, t.dataRole) : n;
	return (t.filePath ?? []).reduce((e, t) => e[t], r);
}, En = Object.defineProperty, Dn = Object.getOwnPropertySymbols, On = Object.prototype.hasOwnProperty, kn = Object.prototype.propertyIsEnumerable, An = Math.pow, jn = (e, t, n) => t in e ? En(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, Mn = (e, t) => {
	for (var n in t ||= {}) On.call(t, n) && jn(e, n, t[n]);
	if (Dn) for (var n of Dn(t)) kn.call(t, n) && jn(e, n, t[n]);
	return e;
}, Nn = class extends Error {
	constructor(e, t, n) {
		super(n), this.name = "JSONPathSyntaxError", this.line = e, this.charPositionInLine = t, this.msg = n;
	}
}, Pn = class extends Error {
	constructor() {
		super(...arguments), this.name = "JSONPathLimitError";
	}
}, A = () => void 0, Fn = (e, t, n, r) => {
	if (r(), typeof e == "string" && typeof t == "string" && e.length === t.length && r(e.length), e === t) return !0;
	if (e === null || t === null || e === void 0 || t === void 0 || typeof e != typeof t || Array.isArray(e) !== Array.isArray(t)) return !1;
	if (Array.isArray(e) && Array.isArray(t)) {
		let r = M(e);
		return r === M(t) && (n.push({
			x: e,
			y: t,
			keys: null,
			length: r,
			i: 0
		}), !0);
	}
	if (typeof e == "object" && typeof t == "object") {
		let i = Bn(e), a = Bn(t);
		return r(i.length + a.length), i.length === a.length && (n.push({
			x: e,
			y: t,
			keys: i,
			length: i.length,
			i: 0
		}), !0);
	}
	return !1;
}, In = (e, t, n = A) => {
	let r = [];
	if (!Fn(e, t, r, n)) return !1;
	for (; r.length > 0;) {
		let e = r[r.length - 1];
		if (e.i >= e.length) r.pop();
		else if (e.keys === null) {
			let t = e.i++;
			if (!Fn(Ln(e.x, t), Ln(e.y, t), r, n)) return !1;
		} else {
			let t = e.i++, i = e.keys[t], a = e.x, o = e.y;
			if (n(i.length), !j(o, i) || !j(a, i)) return !1;
			let s = a[i];
			if (!j(o, i) || !Fn(s, o[i], r, n)) return !1;
		}
	}
	return !0;
}, j = (e, t) => Object.prototype.hasOwnProperty.call(e, t), Ln = (e, t) => j(e, t) ? e[t] : void 0, Rn = 16383, zn = 1e3, Bn = (e) => {
	let t = Object.keys(e);
	for (let e of t) if (e.length > zn) throw new Pn(`Member name too long (maximum ${zn} characters)`);
	return t;
}, M = (e) => {
	let t = e.length;
	if (!Number.isSafeInteger(t) || t < 0 || t > 4294967295) throw TypeError("Invalid array length");
	return t;
}, Vn = (e) => e instanceof RangeError && /call stack/i.test(e.message), N = (e) => Array.isArray(e), Hn = (e) => e instanceof RangeError && /Invalid (string|array|typed array) length|maximum size exceeded/i.test(e.message), P = (e) => {
	if (typeof e != "object" || !e) return !1;
	let t = Object.getPrototypeOf(e);
	return t !== null && Object.getPrototypeOf(t) === null;
}, Un = (e) => typeof e == "number", F = (e) => typeof e == "string", Wn = (e) => e === void 0, I = (e) => e !== void 0;
function Gn(e) {
	if (!e || e.length === 0) return null;
	let t = null;
	for (let n = e.length - 1; n >= 0; n--) t = {
		type: "subscript",
		value: e[n],
		next: t
	};
	return t;
}
function Kn(e) {
	return e.type === "root" || e.type === "current" || e.type === "functionCall" || e.type === "value" && (e.subtype === "boolean" || e.subtype === "null");
}
function qn(e, t, n) {
	return t.reduce((e, t) => n(e, t), e);
}
var Jn = class extends SyntaxError {
	constructor(e, t, n, r) {
		super(e), this.expected = t, this.found = n, this.location = r, this.name = "SyntaxError";
	}
	format(e) {
		let t = "Error: " + this.message;
		if (this.location) {
			let n = null, r = e.find((e) => e.source === this.location.source);
			r && (n = r.text.split(/\r\n|\n|\r/g));
			let i = this.location.start, a = this.location.source && typeof this.location.source.offset == "function" ? this.location.source.offset(i) : i, o = this.location.source + ":" + a.line + ":" + a.column;
			if (n) {
				let e = this.location.end, r = "".padEnd(a.line.toString().length, " "), s = n[i.line - 1], c = (i.line === e.line ? e.column : s.length + 1) - i.column || 1;
				t += "\n --> " + o + "\n" + r + " |\n" + a.line + " | " + s + "\n" + r + " | " + "".padEnd(i.column - 1, " ") + "".padEnd(c, "^");
			} else t += "\n at " + o;
		}
		return t;
	}
	static buildMessage(e, t) {
		function n(e) {
			return e.codePointAt(0).toString(16).toUpperCase();
		}
		let r = Object.prototype.hasOwnProperty.call(RegExp.prototype, "unicode") ? /* @__PURE__ */ RegExp("[\\p{C}\\p{Mn}\\p{Mc}]", "gu") : null;
		function i(e) {
			return r ? e.replace(r, (e) => "\\u{" + n(e) + "}") : e;
		}
		function a(e) {
			return i(e.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (e) => "\\x0" + n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g, (e) => "\\x" + n(e)));
		}
		function o(e) {
			return i(e.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (e) => "\\x0" + n(e)).replace(/[\x10-\x1F\x7F-\x9F]/g, (e) => "\\x" + n(e)));
		}
		let s = {
			literal(e) {
				return "\"" + a(e.text) + "\"";
			},
			class(e) {
				let t = e.parts.map((e) => Array.isArray(e) ? o(e[0]) + "-" + o(e[1]) : o(e));
				return "[" + (e.inverted ? "^" : "") + t.join("") + "]" + (e.unicode ? "u" : "");
			},
			any() {
				return "any character";
			},
			end() {
				return "end of input";
			},
			other(e) {
				return e.description;
			}
		};
		function c(e) {
			return s[e.type](e);
		}
		function l(e) {
			let t = e.map(c);
			if (t.sort(), t.length > 0) {
				let e = 1;
				for (let n = 1; n < t.length; n++) t[n - 1] !== t[n] && (t[e] = t[n], e++);
				t.length = e;
			}
			switch (t.length) {
				case 1: return t[0];
				case 2: return t[0] + " or " + t[1];
				default: return t.slice(0, -1).join(", ") + ", or " + t[t.length - 1];
			}
		}
		function u(e) {
			return e ? "\"" + a(e) + "\"" : "end of input";
		}
		return "Expected " + l(e) + " but " + u(t) + " found.";
	}
};
function Yn(e, t) {
	t = t === void 0 ? {} : t;
	let n = {}, r = t.grammarSource, i = { jsonpath: Vr }, a = Vr, o = "length", s = "count", c = "match", l = "search", u = "value", d = "subsetof", f = "anyof", p = "noneof", m = "sizeof", h = "size", g = "empty", ee = "true", te = "false", _ = "null", v = /^[,\]]/, y = /^[+\-]/, b = /^[*\/]/, ne = /^[a-zA-Z_]/, x = /^[\x80-\uFFFF_]/, S = /^[a-zA-Z0-9_]/, C = /^[0-9@$\-]/, re = /^[^\/\\]/, w = /^[gimsuy]/, ie = /^[a-zA-Z_\x80-\uD7FF\uE000-\uFFFF]/, ae = /^[\uD800-\uDBFF]/, oe = /^[\uDC00-\uDFFF]/, T = /^[0-9]/, se = /^[1-9]/, ce = /^[eE]/, le = /^["\\]/, E = /^['\\]/, ue = /^[ -\uD7FF\uE000-\uFFFF]/, de = /^[dD]/, fe = /^[89abAB]/, pe = /^[c-fC-F]/, me = /^[0-9a-fA-F]/, he = /^[ \t\n\r]/, ge = G([",", "]"], !1, !1, !1), _e = W("length", !1), ve = W("count", !1), ye = W("match", !1), be = W("search", !1), xe = W("value", !1), Se = G(["+", "-"], !1, !1, !1), Ce = G(["*", "/"], !1, !1, !1), we = Ir("string"), Te = G([
		["a", "z"],
		["A", "Z"],
		"_"
	], !1, !1, !1), Ee = G([["", "￿"], "_"], !1, !1, !1), De = G([
		["a", "z"],
		["A", "Z"],
		["0", "9"],
		"_"
	], !1, !1, !1), Oe = W("-", !1), ke = G([
		["0", "9"],
		"@",
		"$",
		"-"
	], !1, !1, !1), Ae = W("$", !1), D = W("@", !1), je = W("..", !1), Me = W(".", !1), Ne = W("*", !1), Pe = W("&&", !1), Fe = W("||", !1), Ie = W("!", !1), Le = W("==", !1), Re = W("!=", !1), ze = W(">=", !1), Be = W(">", !1), Ve = W("<=", !1), He = W("<", !1), Ue = W("=~", !1), We = W("in", !1), Ge = W("nin", !1), Ke = W("subsetof", !1), qe = W("anyof", !1), Je = W("noneof", !1), Ye = W("sizeof", !1), Xe = W("size", !1), Ze = W("empty", !1), Qe = W("true", !1), $e = W("false", !1), et = W("null", !1), tt = W("{", !1), nt = W("}", !1), rt = W("[", !1), it = W("]", !1), at = W(":", !1), ot = W(",", !1), st = W("(", !1), ct = W(")", !1), lt = W("?", !1), ut = Ir("regex"), dt = W("/", !1), ft = G(["/", "\\"], !0, !1, !1), pt = W("\\", !1), mt = Pr(), ht = G([
		"g",
		"i",
		"m",
		"s",
		"u",
		"y"
	], !1, !1, !1), gt = G([
		["a", "z"],
		["A", "Z"],
		"_",
		["", "퟿"],
		["", "￿"]
	], !1, !1, !1), _t = G([["\ud800", "\udbff"]], !1, !1, !1), vt = G([["\udc00", "\udfff"]], !1, !1, !1), O = G([["0", "9"]], !1, !1, !1), yt = Ir("number"), bt = W("0", !1), xt = G([["1", "9"]], !1, !1, !1), k = Ir("integer"), St = G(["e", "E"], !1, !1, !1), Ct = W("\"", !1), wt = W("'", !1), Tt = G(["\"", "\\"], !1, !1, !1), Et = G(["'", "\\"], !1, !1, !1), Dt = G([[" ", "퟿"], ["", "￿"]], !1, !1, !1), Ot = W("b", !1), kt = W("f", !1), At = W("n", !1), jt = W("r", !1), Mt = W("t", !1), Nt = W("u", !1), Pt = G(["d", "D"], !1, !1, !1), Ft = G([
		"8",
		"9",
		"a",
		"b",
		"A",
		"B"
	], !1, !1, !1), It = W("\\u", !1), Lt = G([["c", "f"], ["C", "F"]], !1, !1, !1), Rt = G([
		["0", "9"],
		["a", "f"],
		["A", "F"]
	], !1, !1, !1), zt = G([
		" ",
		"	",
		"\n",
		"\r"
	], !1, !1, !1);
	function Bt(e) {
		return {
			type: "root",
			next: Gn(e)
		};
	}
	function Vt(e) {
		return e.map((e) => e[1]);
	}
	function Ht(e) {
		return {
			type: "dot",
			value: e
		};
	}
	function Ut(e) {
		return e;
	}
	function Wt(e) {
		return {
			type: "dotdot",
			value: e
		};
	}
	function Gt() {
		return { type: "wildcard" };
	}
	function Kt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function qt() {
		return { type: "wildcard" };
	}
	function Jt(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Yt(e) {
		return e;
	}
	function Xt(e) {
		return e;
	}
	function Zt(e, t) {
		return t.length > 0 ? {
			type: "bracketExpression",
			value: {
				type: "unions",
				values: [e, ...t.map((e) => e[3])]
			}
		} : {
			type: e.type === "numericLiteral" || e.type === "stringLiteral" || e.type === "identifier" ? "bracketMember" : "bracketExpression",
			value: e
		};
	}
	function Qt(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function $t(e) {
		return {
			type: "filterExpression",
			value: e
		};
	}
	function en(e, t) {
		return qn(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "or",
			left: e,
			right: t[3]
		}));
	}
	function tn(e, t) {
		return qn(e, t, (e, t) => ({
			type: "logicalExpression",
			operator: "and",
			left: e,
			right: t[3]
		}));
	}
	function nn(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function rn(e) {
		return {
			type: "notExpression",
			value: e
		};
	}
	function an(e, t) {
		return t !== null || Kn(e);
	}
	function on(e, t) {
		if (t === null) return e;
		let n = t[1];
		return n.operator === "reg" ? {
			type: "comparator",
			operator: "reg",
			left: e,
			right: n.right
		} : n.operator === "empty" ? {
			type: "comparator",
			operator: "empty",
			left: e,
			right: null
		} : {
			type: "comparator",
			operator: n.operator,
			left: e,
			right: n.right
		};
	}
	function sn(e, t) {
		return {
			operator: e,
			right: t
		};
	}
	function cn(e) {
		return {
			operator: "reg",
			right: e
		};
	}
	function ln() {
		return { operator: "empty" };
	}
	function un() {
		return "eq";
	}
	function dn() {
		return "ne";
	}
	function fn() {
		return "le";
	}
	function pn() {
		return "lt";
	}
	function mn() {
		return "ge";
	}
	function hn() {
		return "gt";
	}
	function gn() {
		return "in";
	}
	function _n() {
		return "nin";
	}
	function vn() {
		return "subsetof";
	}
	function yn() {
		return "anyof";
	}
	function bn() {
		return "noneof";
	}
	function xn() {
		return "sizeof";
	}
	function Sn() {
		return "size";
	}
	function Cn(e) {
		return {
			type: "groupExpression",
			value: e
		};
	}
	function wn() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function Tn() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function En() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function Dn(e, t) {
		return {
			type: "functionCall",
			name: e,
			args: t || []
		};
	}
	function On() {
		return "length";
	}
	function kn() {
		return "count";
	}
	function An() {
		return "match";
	}
	function jn() {
		return "search";
	}
	function Mn() {
		return "value";
	}
	function Nn(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function Pn(e, t) {
		return t.length === 0 ? e : qn(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "+" ? "plus" : "minus",
			left: e,
			right: t[3]
		}));
	}
	function A(e, t) {
		return t.length === 0 ? e : qn(e, t, (e, t) => ({
			type: "operation",
			operator: t[1] === "*" ? "multi" : "div",
			left: e,
			right: t[3]
		}));
	}
	function Fn(e) {
		return {
			type: "groupOperation",
			value: e
		};
	}
	function In(e) {
		return {
			type: "root",
			next: Gn(e)
		};
	}
	function j(e) {
		return {
			type: "current",
			next: Gn(e)
		};
	}
	function Ln(e, t, n) {
		return {
			type: "slices",
			start: e === null ? null : e[0],
			end: t === null ? null : t[0],
			step: n ? n[2] === null ? null : n[2] : null
		};
	}
	function Rn() {
		return { type: "wildcard" };
	}
	function zn(e) {
		return {
			type: "numericLiteral",
			value: e
		};
	}
	function Bn(e) {
		return {
			type: "stringLiteral",
			value: _a(e)
		};
	}
	function M(e) {
		return {
			type: "identifier",
			value: e
		};
	}
	function Vn(e, t) {
		return {
			type: "value",
			subtype: "regex",
			value: e,
			opts: t || ""
		};
	}
	function N(e) {
		return {
			type: "value",
			subtype: "string",
			value: e
		};
	}
	function Hn(e) {
		return {
			type: "value",
			subtype: "number",
			value: e
		};
	}
	function P() {
		return {
			type: "value",
			value: !0,
			subtype: "boolean"
		};
	}
	function Un() {
		return {
			type: "value",
			value: !1,
			subtype: "boolean"
		};
	}
	function F() {
		return {
			type: "value",
			value: null,
			subtype: "null"
		};
	}
	function Wn(e) {
		return e;
	}
	function I(e) {
		for (let [t] of e || []) _a(t);
		return {
			type: "value",
			subtype: "object",
			value: Object.fromEntries(e || [])
		};
	}
	function Yn(e, t) {
		return [e, ...t.map((e) => e[3])];
	}
	function Xn(e, t) {
		return [e, t.value];
	}
	function Zn(e) {
		return {
			type: "value",
			subtype: "array",
			value: e || []
		};
	}
	function Qn(e, t) {
		return [e.value, ...t.map((e) => e[3].value)];
	}
	function $n(e) {
		return _a(e);
	}
	function er(e) {
		return _a(e);
	}
	function tr() {
		return "true";
	}
	function nr() {
		return "false";
	}
	function rr() {
		return "null";
	}
	function ir(e) {
		return _a(e);
	}
	function ar() {
		return "true";
	}
	function or() {
		return "false";
	}
	function sr() {
		return "null";
	}
	function cr(e) {
		return "/" + e.map((e) => Array.isArray(e) ? e.join("") : e).join("") + "/";
	}
	function lr(e) {
		return e.join("");
	}
	function ur(e, t) {
		let n = parseFloat(jr());
		return !e && !t && (n < -9007199254740991 || n > 9007199254740991) && Mr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), n;
	}
	function dr() {
		let e = parseInt(jr(), 10);
		return (e < -9007199254740991 || e > 9007199254740991) && Mr("Integer out of I-JSON range [-(2^53)+1, (2^53)-1]"), e;
	}
	function fr(e) {
		return e.join("");
	}
	function pr(e) {
		return e.join("");
	}
	function mr(e) {
		return e;
	}
	function hr() {
		return "\"";
	}
	function gr(e) {
		return e;
	}
	function _r(e) {
		return e;
	}
	function vr() {
		return "'";
	}
	function yr(e) {
		return e;
	}
	function L() {
		return "\\";
	}
	function br() {
		return "/";
	}
	function xr() {
		return "\b";
	}
	function Sr() {
		return "\f";
	}
	function Cr() {
		return "\n";
	}
	function wr() {
		return "\r";
	}
	function Tr() {
		return "	";
	}
	function Er(e, t) {
		return String.fromCharCode(parseInt(e, 16), parseInt(t, 16));
	}
	function Dr(e) {
		let t = parseInt(e, 16);
		return t >= 55296 && t <= 57343;
	}
	function Or(e) {
		return String.fromCharCode(parseInt(e, 16));
	}
	let R = t.peg$currPos | 0, z = R, B = [{
		line: 1,
		column: 1
	}], V = R, kr = t.peg$maxFailExpected || [], H = t.peg$silentFails | 0, Ar = /* @__PURE__ */ new Map(), U;
	if (t.startRule) {
		if (!(t.startRule in i)) throw Error("Can't start parsing from rule \"" + t.startRule + "\".");
		a = i[t.startRule];
	}
	function jr() {
		return e.substring(z, R);
	}
	function Mr(e, t) {
		throw t = t === void 0 ? Rr(z, R) : t, zr(e, t);
	}
	function Nr(t = R) {
		let n = e.codePointAt(t);
		return n === void 0 ? "" : String.fromCodePoint(n);
	}
	function W(e, t) {
		return {
			type: "literal",
			text: e,
			ignoreCase: t
		};
	}
	function G(e, t, n, r) {
		return {
			type: "class",
			parts: e,
			inverted: t,
			ignoreCase: n,
			unicode: r
		};
	}
	function Pr() {
		return { type: "any" };
	}
	function Fr() {
		return { type: "end" };
	}
	function Ir(e) {
		return {
			type: "other",
			description: e
		};
	}
	function Lr(t) {
		let n = B[t], r;
		if (n) return n;
		if (t >= B.length) r = B.length - 1;
		else for (r = t; !B[--r];);
		for (n = B[r], n = {
			line: n.line,
			column: n.column
		}; r < t;) e.charCodeAt(r) === 10 ? (n.line++, n.column = 1) : n.column++, r++;
		return B[t] = n, n;
	}
	function Rr(e, t, n) {
		let i = Lr(e), a = Lr(t), o = {
			source: r,
			start: {
				offset: e,
				line: i.line,
				column: i.column
			},
			end: {
				offset: t,
				line: a.line,
				column: a.column
			}
		};
		return n && r && typeof r.offset == "function" && (o.start = r.offset(o.start), o.end = r.offset(o.end)), o;
	}
	function K(e) {
		R < V || (R > V && (V = R, kr = []), kr.push(e));
	}
	function zr(e, t) {
		return new Jn(e, null, null, t);
	}
	function Br(e, t, n) {
		return new Jn(Jn.buildMessage(e, t), e, t, n);
	}
	function Vr() {
		let e, t, r, i;
		return e = R, t = Ci(), t === n ? (R = e, e = n) : (r = Hr(), i = ga(), i === n ? (R = e, e = n) : (z = e, e = Bt(r))), e;
	}
	function Hr() {
		let e, t, r, i, a;
		for (e = R, t = [], r = R, i = $(), a = Ur(), a === n ? (R = r, r = n) : (i = [i, a], r = i); r !== n;) t.push(r), r = R, i = $(), a = Ur(), a === n ? (R = r, r = n) : (i = [i, a], r = i);
		return z = e, t = Vt(t), e = t, e;
	}
	function Ur() {
		let e;
		return e = Gr(), e === n && (e = Wr()), e;
	}
	function Wr() {
		let e, t, r;
		return e = R, t = Ei(), t === n ? (R = e, e = n) : (r = Kr(), r === n ? (R = e, e = n) : (z = e, e = Ht(r))), e === n && (e = R, t = Jr(), t !== n && (z = e, t = Ut(t)), e = t), e;
	}
	function Gr() {
		let e, t, r;
		return e = R, t = Ti(), t === n ? (R = e, e = n) : (r = qr(), r === n ? (R = e, e = n) : (z = e, e = Wt(r))), e;
	}
	function Kr() {
		let e, t;
		return e = R, t = Di(), t !== n && (z = e, t = Gt()), e = t, e === n && (e = R, t = Si(), t !== n && (z = e, t = Kt(t)), e = t), e;
	}
	function qr() {
		let e, t;
		return e = R, t = Di(), t !== n && (z = e, t = qt()), e = t, e === n && (e = R, t = Si(), t !== n && (z = e, t = Jt(t)), e = t, e === n && (e = R, t = Jr(), t !== n && (z = e, t = Yt(t)), e = t)), e;
	}
	function Jr() {
		let e, t, r, i;
		return e = R, t = Xi(), t === n ? (R = e, e = n) : ($(), r = Yr(), r === n ? (R = e, e = n) : ($(), i = Zi(), i === n ? (R = e, e = n) : (z = e, e = Xt(r)))), e;
	}
	function Yr() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = fi(), t !== n) {
			for (r = [], i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = fi(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = fi(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = Zt(t, r);
		} else R = e, e = n;
		return e;
	}
	function Xr() {
		let t, r, i, a, o, s, c, l, u;
		return t = R, r = ta(), r === n ? (R = t, t = n) : ($(), i = $i(), i === n ? (R = t, t = n) : ($(), a = Zr(), a === n ? (R = t, t = n) : ($(), o = ea(), o === n ? (R = t, t = n) : (s = R, H++, c = R, l = $(), u = e.charAt(R), v.test(u) ? R++ : (u = n, H === 0 && K(ge)), u === n ? (R = c, c = n) : (l = [l, u], c = l), H--, c === n ? s = n : (R = s, s = void 0), s === n ? (R = t, t = n) : (z = t, t = Qt(a)))))), t === n && (t = R, r = ta(), r === n ? (R = t, t = n) : ($(), i = Zr(), i === n ? (R = t, t = n) : (z = t, t = $t(i)))), t;
	}
	function Zr() {
		let e, t, r, i, a, o, s, c, l = R * 91 + 10, u = Ar.get(l);
		if (u) return R = u.nextPos, u.result;
		if (e = R, t = Qr(), t !== n) {
			for (r = [], i = R, a = $(), o = ki(), o === n ? (R = i, i = n) : (s = $(), c = Qr(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = ki(), o === n ? (R = i, i = n) : (s = $(), c = Qr(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = en(t, r);
		} else R = e, e = n;
		return Ar.set(l, {
			nextPos: R,
			result: e
		}), e;
	}
	function Qr() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = $r(), t !== n) {
			for (r = [], i = R, a = $(), o = Oi(), o === n ? (R = i, i = n) : (s = $(), c = $r(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = Oi(), o === n ? (R = i, i = n) : (s = $(), c = $r(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = tn(t, r);
		} else R = e, e = n;
		return e;
	}
	function $r() {
		let e, t, r, i, a;
		return e = R, t = Ai(), t === n ? (R = e, e = n) : ($(), r = $i(), r === n ? (R = e, e = n) : ($(), i = Zr(), i === n ? (R = e, e = n) : ($(), a = ea(), a === n ? (R = e, e = n) : (z = e, e = nn(i))))), e === n && (e = R, t = Ai(), t === n ? (R = e, e = n) : ($(), r = ri(), r === n ? (R = e, e = n) : (z = e, e = rn(r))), e === n && (e = ei())), e;
	}
	function ei() {
		let e, t, r, i, a;
		return e = R, t = ci(), t === n ? (R = e, e = n) : (r = R, i = $(), a = ti(), a === n ? (R = r, r = n) : (i = [i, a], r = i), r === n && (r = null), z = R, i = an(t, r), i = i ? void 0 : n, i === n ? (R = e, e = n) : (z = e, e = on(t, r))), e === n && (e = ri()), e;
	}
	function ti() {
		let e, t, r;
		return e = R, t = ni(), t === n ? (R = e, e = n) : ($(), r = ci(), r === n ? (R = e, e = n) : (z = e, e = sn(t, r))), e === n && (e = R, t = Li(), t === n ? (R = e, e = n) : ($(), r = pi(), r === n ? (R = e, e = n) : (z = e, e = cn(r))), e === n && (e = R, t = Gi(), t !== n && (z = e, t = ln()), e = t)), e;
	}
	function ni() {
		let e, t;
		return e = R, t = ji(), t !== n && (z = e, t = un()), e = t, e === n && (e = R, t = Mi(), t !== n && (z = e, t = dn()), e = t, e === n && (e = R, t = Fi(), t !== n && (z = e, t = fn()), e = t, e === n && (e = R, t = Ii(), t !== n && (z = e, t = pn()), e = t, e === n && (e = R, t = Ni(), t !== n && (z = e, t = mn()), e = t, e === n && (e = R, t = Pi(), t !== n && (z = e, t = hn()), e = t, e === n && (e = R, t = Ri(), t !== n && (z = e, t = gn()), e = t, e === n && (e = R, t = zi(), t !== n && (z = e, t = _n()), e = t, e === n && (e = R, t = Bi(), t !== n && (z = e, t = vn()), e = t, e === n && (e = R, t = Vi(), t !== n && (z = e, t = yn()), e = t, e === n && (e = R, t = Hi(), t !== n && (z = e, t = bn()), e = t, e === n && (e = R, t = Ui(), t !== n && (z = e, t = xn()), e = t, e === n && (e = R, t = Wi(), t !== n && (z = e, t = Sn()), e = t)))))))))))), e;
	}
	function ri() {
		let e, t, r, i;
		return e = R, t = $i(), t === n ? (R = e, e = n) : ($(), r = Zr(), r === n ? (R = e, e = n) : ($(), i = ea(), i === n ? (R = e, e = n) : (z = e, e = Cn(r)))), e === n && (e = ii(), e === n && (e = ui(), e === n && (e = R, t = Ki(), t !== n && (z = e, t = wn()), e = t, e === n && (e = R, t = Y(), t !== n && (z = e, t = Tn()), e = t, e === n && (e = R, t = qi(), t !== n && (z = e, t = En()), e = t))))), e;
	}
	function ii() {
		let e, t, r, i, a;
		return e = R, t = ai(), t === n ? (R = e, e = n) : (r = $i(), r === n ? (R = e, e = n) : ($(), i = oi(), i === n && (i = null), $(), a = ea(), a === n ? (R = e, e = n) : (z = e, e = Dn(t, i)))), e;
	}
	function ai() {
		let t, r;
		return t = R, e.substr(R, 6) === o ? (r = o, R += 6) : (r = n, H === 0 && K(_e)), r !== n && (z = t, r = On()), t = r, t === n && (t = R, e.substr(R, 5) === s ? (r = s, R += 5) : (r = n, H === 0 && K(ve)), r !== n && (z = t, r = kn()), t = r, t === n && (t = R, e.substr(R, 5) === c ? (r = c, R += 5) : (r = n, H === 0 && K(ye)), r !== n && (z = t, r = An()), t = r, t === n && (t = R, e.substr(R, 6) === l ? (r = l, R += 6) : (r = n, H === 0 && K(be)), r !== n && (z = t, r = jn()), t = r, t === n && (t = R, e.substr(R, 5) === u ? (r = u, R += 5) : (r = n, H === 0 && K(xe)), r !== n && (z = t, r = Mn()), t = r)))), t;
	}
	function oi() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = si(), t !== n) {
			for (r = [], i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = si(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = si(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = Nn(t, r);
		} else R = e, e = n;
		return e;
	}
	function si() {
		let e;
		return e = ci(), e === n && (e = mi()), e;
	}
	function ci() {
		let t, r, i, a, o, s, c, l, u = R * 91 + 21, d = Ar.get(u);
		if (d) return R = d.nextPos, d.result;
		if (t = R, r = li(), r !== n) {
			for (i = [], a = R, o = $(), s = e.charAt(R), y.test(s) ? R++ : (s = n, H === 0 && K(Se)), s === n ? (R = a, a = n) : (c = $(), l = li(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = R, o = $(), s = e.charAt(R), y.test(s) ? R++ : (s = n, H === 0 && K(Se)), s === n ? (R = a, a = n) : (c = $(), l = li(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			z = t, t = Pn(r, i);
		} else R = t, t = n;
		return Ar.set(u, {
			nextPos: R,
			result: t
		}), t;
	}
	function li() {
		let t, r, i, a, o, s, c, l;
		if (t = R, r = q(), r !== n) {
			for (i = [], a = R, o = $(), s = e.charAt(R), b.test(s) ? R++ : (s = n, H === 0 && K(Ce)), s === n ? (R = a, a = n) : (c = $(), l = q(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o)); a !== n;) i.push(a), a = R, o = $(), s = e.charAt(R), b.test(s) ? R++ : (s = n, H === 0 && K(Ce)), s === n ? (R = a, a = n) : (c = $(), l = q(), l === n ? (R = a, a = n) : (o = [
				o,
				s,
				c,
				l
			], a = o));
			z = t, t = A(r, i);
		} else R = t, t = n;
		return t;
	}
	function q() {
		let e, t, r, i;
		return e = R, t = $i(), t === n ? (R = e, e = n) : ($(), r = ci(), r === n ? (R = e, e = n) : ($(), i = ea(), i === n ? (R = e, e = n) : (z = e, e = Fn(r)))), e === n && (e = ii(), e === n && (e = J(), e === n && (e = ui()))), e;
	}
	function ui() {
		let e, t, r;
		return e = R, t = Ci(), t === n ? (R = e, e = n) : (r = Hr(), r === n ? (R = e, e = n) : (z = e, e = In(r))), e === n && (e = R, t = wi(), t === n ? (R = e, e = n) : (r = Hr(), r === n ? (R = e, e = n) : (z = e, e = j(r)))), e;
	}
	function di() {
		let e, t, r, i, a, o, s, c, l;
		return e = R, t = R, r = la(), r === n ? (R = t, t = n) : (i = $(), r = [r, i], t = r), t === n && (t = null), r = Qi(), r === n ? (R = e, e = n) : (i = $(), a = R, o = la(), o === n ? (R = a, a = n) : (s = $(), o = [o, s], a = o), a === n && (a = null), o = R, s = Qi(), s === n ? (R = o, o = n) : (c = $(), l = la(), l === n && (l = null), s = [
			s,
			c,
			l
		], o = s), o === n && (o = null), z = e, e = Ln(t, a, o)), e;
	}
	function fi() {
		let e, t;
		return e = Xr(), e === n && (e = di(), e === n && (e = R, t = Di(), t !== n && (z = e, t = Rn()), e = t, e === n && (e = R, t = la(), t !== n && (z = e, t = zn(t)), e = t, e === n && (e = R, t = da(), t !== n && (z = e, t = Bn(t)), e = t, e === n && (e = R, t = bi(), t !== n && (z = e, t = M(t)), e = t))))), e;
	}
	function pi() {
		let e, t, r;
		return e = R, t = na(), t === n ? (R = e, e = n) : (r = ra(), z = e, e = Vn(t, r)), e;
	}
	function J() {
		let e, t;
		return e = R, t = mi(), t !== n && (z = e, t = N(t)), e = t, e === n && (e = R, t = sa(), t !== n && (z = e, t = Hn(t)), e = t, e === n && (e = hi(), e === n && (e = vi(), e === n && (e = R, t = Ki(), t !== n && (z = e, t = P()), e = t, e === n && (e = R, t = Y(), t !== n && (z = e, t = Un()), e = t, e === n && (e = R, t = qi(), t !== n && (z = e, t = F()), e = t)))))), e;
	}
	function mi() {
		let e, t;
		return H++, e = R, t = da(), t !== n && (z = e, t = Wn(t)), e = t, H--, e === n && (t = n, H === 0 && K(we)), e;
	}
	function hi() {
		let e, t, r, i;
		return e = R, t = Ji(), t === n ? (R = e, e = n) : ($(), r = gi(), r === n && (r = null), $(), i = Yi(), i === n ? (R = e, e = n) : (z = e, e = I(r))), e;
	}
	function gi() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = _i(), t !== n) {
			for (r = [], i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = _i(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = _i(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = Yn(t, r);
		} else R = e, e = n;
		return e;
	}
	function _i() {
		let e, t, r, i;
		return e = R, t = da(), t === n ? (R = e, e = n) : ($(), r = Qi(), r === n ? (R = e, e = n) : ($(), i = J(), i === n ? (R = e, e = n) : (z = e, e = Xn(t, i)))), e;
	}
	function vi() {
		let e, t, r, i;
		return e = R, t = Xi(), t === n ? (R = e, e = n) : ($(), r = yi(), r === n && (r = null), $(), i = Zi(), i === n ? (R = e, e = n) : (z = e, e = Zn(r))), e;
	}
	function yi() {
		let e, t, r, i, a, o, s, c;
		if (e = R, t = J(), t !== n) {
			for (r = [], i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = J(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a)); i !== n;) r.push(i), i = R, a = $(), o = X(), o === n ? (R = i, i = n) : (s = $(), c = J(), c === n ? (R = i, i = n) : (a = [
				a,
				o,
				s,
				c
			], i = a));
			z = e, e = Qn(t, r);
		} else R = e, e = n;
		return e;
	}
	function bi() {
		let t, r, i, a, o, s;
		if (t = R, r = R, i = R, a = e.charAt(R), ne.test(a) ? R++ : (a = n, H === 0 && K(Te)), a !== n) {
			for (o = [], s = xi(); s !== n;) o.push(s), s = xi();
			a = [a, o], i = a;
		} else R = i, i = n;
		if (r = i === n ? i : e.substring(r, R), r !== n && (z = t, r = $n(r)), t = r, t === n) {
			if (t = R, r = R, i = [], a = e.charAt(R), x.test(a) ? R++ : (a = n, H === 0 && K(Ee)), a !== n) for (; a !== n;) i.push(a), a = e.charAt(R), x.test(a) ? R++ : (a = n, H === 0 && K(Ee));
			else i = n;
			r = i === n ? i : e.substring(r, R), r !== n && (z = t, r = er(r)), t = r, t === n && (t = R, r = Ki(), r !== n && (z = t, r = tr()), t = r, t === n && (t = R, r = Y(), r !== n && (z = t, r = nr()), t = r, t === n && (t = R, r = qi(), r !== n && (z = t, r = rr()), t = r)));
		}
		return t;
	}
	function xi() {
		let t, r, i, a;
		return t = e.charAt(R), S.test(t) ? R++ : (t = n, H === 0 && K(De)), t === n && (t = R, e.charCodeAt(R) === 45 ? (r = "-", R++) : (r = n, H === 0 && K(Oe)), r === n ? (R = t, t = n) : (i = R, H++, a = e.charAt(R), C.test(a) ? R++ : (a = n, H === 0 && K(ke)), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r))), t;
	}
	function Si() {
		let e, t;
		return e = R, t = ia(), t !== n && (z = e, t = ir(t)), e = t, e === n && (e = R, t = Ki(), t !== n && (z = e, t = ar()), e = t, e === n && (e = R, t = Y(), t !== n && (z = e, t = or()), e = t, e === n && (e = R, t = qi(), t !== n && (z = e, t = sr()), e = t))), e;
	}
	function Ci() {
		let t;
		return e.charCodeAt(R) === 36 ? (t = "$", R++) : (t = n, H === 0 && K(Ae)), t;
	}
	function wi() {
		let t;
		return e.charCodeAt(R) === 64 ? (t = "@", R++) : (t = n, H === 0 && K(D)), t;
	}
	function Ti() {
		let t;
		return e.substr(R, 2) === ".." ? (t = "..", R += 2) : (t = n, H === 0 && K(je)), t;
	}
	function Ei() {
		let t;
		return e.charCodeAt(R) === 46 ? (t = ".", R++) : (t = n, H === 0 && K(Me)), t;
	}
	function Di() {
		let t;
		return e.charCodeAt(R) === 42 ? (t = "*", R++) : (t = n, H === 0 && K(Ne)), t;
	}
	function Oi() {
		let t;
		return e.substr(R, 2) === "&&" ? (t = "&&", R += 2) : (t = n, H === 0 && K(Pe)), t;
	}
	function ki() {
		let t;
		return e.substr(R, 2) === "||" ? (t = "||", R += 2) : (t = n, H === 0 && K(Fe)), t;
	}
	function Ai() {
		let t;
		return e.charCodeAt(R) === 33 ? (t = "!", R++) : (t = n, H === 0 && K(Ie)), t;
	}
	function ji() {
		let t;
		return e.substr(R, 2) === "==" ? (t = "==", R += 2) : (t = n, H === 0 && K(Le)), t;
	}
	function Mi() {
		let t;
		return e.substr(R, 2) === "!=" ? (t = "!=", R += 2) : (t = n, H === 0 && K(Re)), t;
	}
	function Ni() {
		let t;
		return e.substr(R, 2) === ">=" ? (t = ">=", R += 2) : (t = n, H === 0 && K(ze)), t;
	}
	function Pi() {
		let t;
		return e.charCodeAt(R) === 62 ? (t = ">", R++) : (t = n, H === 0 && K(Be)), t;
	}
	function Fi() {
		let t;
		return e.substr(R, 2) === "<=" ? (t = "<=", R += 2) : (t = n, H === 0 && K(Ve)), t;
	}
	function Ii() {
		let t;
		return e.charCodeAt(R) === 60 ? (t = "<", R++) : (t = n, H === 0 && K(He)), t;
	}
	function Li() {
		let t;
		return e.substr(R, 2) === "=~" ? (t = "=~", R += 2) : (t = n, H === 0 && K(Ue)), t;
	}
	function Ri() {
		let t, r, i, a;
		return t = R, e.substr(R, 2) === "in" ? (r = "in", R += 2) : (r = n, H === 0 && K(We)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function zi() {
		let t, r, i, a;
		return t = R, e.substr(R, 3) === "nin" ? (r = "nin", R += 3) : (r = n, H === 0 && K(Ge)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Bi() {
		let t, r, i, a;
		return t = R, e.substr(R, 8) === d ? (r = d, R += 8) : (r = n, H === 0 && K(Ke)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Vi() {
		let t, r, i, a;
		return t = R, e.substr(R, 5) === f ? (r = f, R += 5) : (r = n, H === 0 && K(qe)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Hi() {
		let t, r, i, a;
		return t = R, e.substr(R, 6) === p ? (r = p, R += 6) : (r = n, H === 0 && K(Je)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ui() {
		let t, r, i, a;
		return t = R, e.substr(R, 6) === m ? (r = m, R += 6) : (r = n, H === 0 && K(Ye)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Wi() {
		let t, r, i, a;
		return t = R, e.substr(R, 4) === h ? (r = h, R += 4) : (r = n, H === 0 && K(Xe)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Gi() {
		let t, r, i, a;
		return t = R, e.substr(R, 5) === g ? (r = g, R += 5) : (r = n, H === 0 && K(Ze)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ki() {
		let t, r, i, a;
		return t = R, e.substr(R, 4) === ee ? (r = ee, R += 4) : (r = n, H === 0 && K(Qe)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Y() {
		let t, r, i, a;
		return t = R, e.substr(R, 5) === te ? (r = te, R += 5) : (r = n, H === 0 && K($e)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function qi() {
		let t, r, i, a;
		return t = R, e.substr(R, 4) === _ ? (r = _, R += 4) : (r = n, H === 0 && K(et)), r === n ? (R = t, t = n) : (i = R, H++, a = Q(), H--, a === n ? i = void 0 : (R = i, i = n), i === n ? (R = t, t = n) : (r = [r, i], t = r)), t;
	}
	function Ji() {
		let t;
		return e.charCodeAt(R) === 123 ? (t = "{", R++) : (t = n, H === 0 && K(tt)), t;
	}
	function Yi() {
		let t;
		return e.charCodeAt(R) === 125 ? (t = "}", R++) : (t = n, H === 0 && K(nt)), t;
	}
	function Xi() {
		let t;
		return e.charCodeAt(R) === 91 ? (t = "[", R++) : (t = n, H === 0 && K(rt)), t;
	}
	function Zi() {
		let t;
		return e.charCodeAt(R) === 93 ? (t = "]", R++) : (t = n, H === 0 && K(it)), t;
	}
	function Qi() {
		let t;
		return e.charCodeAt(R) === 58 ? (t = ":", R++) : (t = n, H === 0 && K(at)), t;
	}
	function X() {
		let t;
		return e.charCodeAt(R) === 44 ? (t = ",", R++) : (t = n, H === 0 && K(ot)), t;
	}
	function $i() {
		let t;
		return e.charCodeAt(R) === 40 ? (t = "(", R++) : (t = n, H === 0 && K(st)), t;
	}
	function ea() {
		let t;
		return e.charCodeAt(R) === 41 ? (t = ")", R++) : (t = n, H === 0 && K(ct)), t;
	}
	function ta() {
		let t;
		return e.charCodeAt(R) === 63 ? (t = "?", R++) : (t = n, H === 0 && K(lt)), t;
	}
	function na() {
		let t, r, i, a, o, s;
		if (H++, t = R, e.charCodeAt(R) === 47 ? (r = "/", R++) : (r = n, H === 0 && K(dt)), r !== n) {
			for (i = [], a = e.charAt(R), re.test(a) ? R++ : (a = n, H === 0 && K(ft)), a === n && (a = R, e.charCodeAt(R) === 92 ? (o = "\\", R++) : (o = n, H === 0 && K(pt)), o === n ? (R = a, a = n) : (e.length > R ? (s = e.charAt(R), R++) : (s = n, H === 0 && K(mt)), s === n ? (R = a, a = n) : (o = [o, s], a = o))); a !== n;) i.push(a), a = e.charAt(R), re.test(a) ? R++ : (a = n, H === 0 && K(ft)), a === n && (a = R, e.charCodeAt(R) === 92 ? (o = "\\", R++) : (o = n, H === 0 && K(pt)), o === n ? (R = a, a = n) : (e.length > R ? (s = e.charAt(R), R++) : (s = n, H === 0 && K(mt)), s === n ? (R = a, a = n) : (o = [o, s], a = o)));
			e.charCodeAt(R) === 47 ? (a = "/", R++) : (a = n, H === 0 && K(dt)), a === n ? (R = t, t = n) : (z = t, t = cr(i));
		} else R = t, t = n;
		return H--, t === n && (r = n, H === 0 && K(ut)), t;
	}
	function ra() {
		let t, r, i;
		for (t = R, r = [], i = e.charAt(R), w.test(i) ? R++ : (i = n, H === 0 && K(ht)); i !== n;) r.push(i), i = e.charAt(R), w.test(i) ? R++ : (i = n, H === 0 && K(ht));
		return z = t, r = lr(r), t = r, t;
	}
	function ia() {
		let t, r, i, a, o;
		if (t = R, r = R, i = aa(), i !== n) {
			for (a = [], o = oa(); o !== n;) a.push(o), o = oa();
			i = [i, a], r = i;
		} else R = r, r = n;
		return t = r === n ? r : e.substring(t, R), t;
	}
	function aa() {
		let t, r, i;
		return t = e.charAt(R), ie.test(t) ? R++ : (t = n, H === 0 && K(gt)), t === n && (t = R, r = e.charAt(R), ae.test(r) ? R++ : (r = n, H === 0 && K(_t)), r === n ? (R = t, t = n) : (i = e.charAt(R), oe.test(i) ? R++ : (i = n, H === 0 && K(vt)), i === n ? (R = t, t = n) : (r = [r, i], t = r))), t;
	}
	function oa() {
		let t;
		return t = aa(), t === n && (t = e.charAt(R), T.test(t) ? R++ : (t = n, H === 0 && K(O))), t;
	}
	function sa() {
		let t, r, i, a, o, s, c;
		if (H++, t = R, e.charCodeAt(R) === 45 ? (r = "-", R++) : (r = n, H === 0 && K(Oe)), r === n && (r = null), i = ca(), i !== n) {
			if (a = R, e.charCodeAt(R) === 46 ? (o = ".", R++) : (o = n, H === 0 && K(Me)), o !== n) {
				if (s = [], c = e.charAt(R), T.test(c) ? R++ : (c = n, H === 0 && K(O)), c !== n) for (; c !== n;) s.push(c), c = e.charAt(R), T.test(c) ? R++ : (c = n, H === 0 && K(O));
				else s = n;
				s === n ? (R = a, a = n) : (o = [o, s], a = o);
			} else R = a, a = n;
			a === n && (a = null), o = ua(), o === n && (o = null), z = t, t = ur(a, o);
		} else R = t, t = n;
		return H--, t === n && (r = n, H === 0 && K(yt)), t;
	}
	function ca() {
		let t, r, i, a;
		if (e.charCodeAt(R) === 48 ? (t = "0", R++) : (t = n, H === 0 && K(bt)), t === n) {
			if (t = R, r = e.charAt(R), se.test(r) ? R++ : (r = n, H === 0 && K(xt)), r !== n) {
				for (i = [], a = e.charAt(R), T.test(a) ? R++ : (a = n, H === 0 && K(O)); a !== n;) i.push(a), a = e.charAt(R), T.test(a) ? R++ : (a = n, H === 0 && K(O));
				r = [r, i], t = r;
			} else R = t, t = n;
		}
		return t;
	}
	function la() {
		let t, r, i, a, o, s;
		if (H++, t = R, e.charCodeAt(R) === 48 ? (r = "0", R++) : (r = n, H === 0 && K(bt)), r === n) {
			if (r = R, e.charCodeAt(R) === 45 ? (i = "-", R++) : (i = n, H === 0 && K(Oe)), i === n && (i = null), a = e.charAt(R), se.test(a) ? R++ : (a = n, H === 0 && K(xt)), a !== n) {
				for (o = [], s = e.charAt(R), T.test(s) ? R++ : (s = n, H === 0 && K(O)); s !== n;) o.push(s), s = e.charAt(R), T.test(s) ? R++ : (s = n, H === 0 && K(O));
				i = [
					i,
					a,
					o
				], r = i;
			} else R = r, r = n;
		}
		return r !== n && (z = t, r = dr()), t = r, H--, t === n && (r = n, H === 0 && K(k)), t;
	}
	function ua() {
		let t, r, i, a, o;
		if (t = R, r = e.charAt(R), ce.test(r) ? R++ : (r = n, H === 0 && K(St)), r !== n) {
			if (i = e.charAt(R), y.test(i) ? R++ : (i = n, H === 0 && K(Se)), i === n && (i = null), a = [], o = e.charAt(R), T.test(o) ? R++ : (o = n, H === 0 && K(O)), o !== n) for (; o !== n;) a.push(o), o = e.charAt(R), T.test(o) ? R++ : (o = n, H === 0 && K(O));
			else a = n;
			a === n ? (R = t, t = n) : (r = [
				r,
				i,
				a
			], t = r);
		} else R = t, t = n;
		return t;
	}
	function da() {
		let t, r, i, a;
		if (H++, t = R, e.charCodeAt(R) === 34 ? (r = "\"", R++) : (r = n, H === 0 && K(Ct)), r !== n) {
			for (i = [], a = fa(); a !== n;) i.push(a), a = fa();
			e.charCodeAt(R) === 34 ? (a = "\"", R++) : (a = n, H === 0 && K(Ct)), a === n ? (R = t, t = n) : (z = t, t = fr(i));
		} else R = t, t = n;
		if (t === n) {
			if (t = R, e.charCodeAt(R) === 39 ? (r = "'", R++) : (r = n, H === 0 && K(wt)), r !== n) {
				for (i = [], a = pa(); a !== n;) i.push(a), a = pa();
				e.charCodeAt(R) === 39 ? (a = "'", R++) : (a = n, H === 0 && K(wt)), a === n ? (R = t, t = n) : (z = t, t = pr(i));
			} else R = t, t = n;
		}
		return H--, t === n && (r = n, H === 0 && K(we)), t;
	}
	function fa() {
		let t, r, i;
		return t = R, r = R, H++, i = e.charAt(R), le.test(i) ? R++ : (i = n, H === 0 && K(Tt)), H--, i === n ? r = void 0 : (R = r, r = n), r === n ? (R = t, t = n) : (i = ma(), i === n ? (R = t, t = n) : (z = t, t = mr(i))), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && K(pt)), r === n ? (R = t, t = n) : (e.charCodeAt(R) === 34 ? (i = "\"", R++) : (i = n, H === 0 && K(Ct)), i === n ? (R = t, t = n) : (z = t, t = hr())), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && K(pt)), r === n ? (R = t, t = n) : (i = ha(), i === n ? (R = t, t = n) : (z = t, t = gr(i))))), t;
	}
	function pa() {
		let t, r, i;
		return t = R, r = R, H++, i = e.charAt(R), E.test(i) ? R++ : (i = n, H === 0 && K(Et)), H--, i === n ? r = void 0 : (R = r, r = n), r === n ? (R = t, t = n) : (i = ma(), i === n ? (R = t, t = n) : (z = t, t = _r(i))), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && K(pt)), r === n ? (R = t, t = n) : (e.charCodeAt(R) === 39 ? (i = "'", R++) : (i = n, H === 0 && K(wt)), i === n ? (R = t, t = n) : (z = t, t = vr())), t === n && (t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && K(pt)), r === n ? (R = t, t = n) : (i = ha(), i === n ? (R = t, t = n) : (z = t, t = yr(i))))), t;
	}
	function ma() {
		let t, r, i, a;
		return t = e.charAt(R), ue.test(t) ? R++ : (t = n, H === 0 && K(Dt)), t === n && (t = R, r = R, i = e.charAt(R), ae.test(i) ? R++ : (i = n, H === 0 && K(_t)), i === n ? (R = r, r = n) : (a = e.charAt(R), oe.test(a) ? R++ : (a = n, H === 0 && K(vt)), a === n ? (R = r, r = n) : (i = [i, a], r = i)), t = r === n ? r : e.substring(t, R)), t;
	}
	function ha() {
		let t, r, i, a, o, s, c, l, u, d;
		return t = R, e.charCodeAt(R) === 92 ? (r = "\\", R++) : (r = n, H === 0 && K(pt)), r !== n && (z = t, r = L()), t = r, t === n && (t = R, e.charCodeAt(R) === 47 ? (r = "/", R++) : (r = n, H === 0 && K(dt)), r !== n && (z = t, r = br()), t = r, t === n && (t = R, e.charCodeAt(R) === 98 ? (r = "b", R++) : (r = n, H === 0 && K(Ot)), r !== n && (z = t, r = xr()), t = r, t === n && (t = R, e.charCodeAt(R) === 102 ? (r = "f", R++) : (r = n, H === 0 && K(kt)), r !== n && (z = t, r = Sr()), t = r, t === n && (t = R, e.charCodeAt(R) === 110 ? (r = "n", R++) : (r = n, H === 0 && K(At)), r !== n && (z = t, r = Cr()), t = r, t === n && (t = R, e.charCodeAt(R) === 114 ? (r = "r", R++) : (r = n, H === 0 && K(jt)), r !== n && (z = t, r = wr()), t = r, t === n && (t = R, e.charCodeAt(R) === 116 ? (r = "t", R++) : (r = n, H === 0 && K(Mt)), r !== n && (z = t, r = Tr()), t = r, t === n && (t = R, e.charCodeAt(R) === 117 ? (r = "u", R++) : (r = n, H === 0 && K(Nt)), r === n ? (R = t, t = n) : (i = R, a = R, o = e.charAt(R), de.test(o) ? R++ : (o = n, H === 0 && K(Pt)), o === n ? (R = a, a = n) : (s = e.charAt(R), fe.test(s) ? R++ : (s = n, H === 0 && K(Ft)), s === n ? (R = a, a = n) : (c = Z(), c === n ? (R = a, a = n) : (l = Z(), l === n ? (R = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, R), i === n ? (R = t, t = n) : (e.substr(R, 2) === "\\u" ? (a = "\\u", R += 2) : (a = n, H === 0 && K(It)), a === n ? (R = t, t = n) : (o = R, s = R, c = e.charAt(R), de.test(c) ? R++ : (c = n, H === 0 && K(Pt)), c === n ? (R = s, s = n) : (l = e.charAt(R), pe.test(l) ? R++ : (l = n, H === 0 && K(Lt)), l === n ? (R = s, s = n) : (u = Z(), u === n ? (R = s, s = n) : (d = Z(), d === n ? (R = s, s = n) : (c = [
			c,
			l,
			u,
			d
		], s = c)))), o = s === n ? s : e.substring(o, R), o === n ? (R = t, t = n) : (z = t, t = Er(i, o))))), t === n && (t = R, e.charCodeAt(R) === 117 ? (r = "u", R++) : (r = n, H === 0 && K(Nt)), r === n ? (R = t, t = n) : (i = R, a = R, o = Z(), o === n ? (R = a, a = n) : (s = Z(), s === n ? (R = a, a = n) : (c = Z(), c === n ? (R = a, a = n) : (l = Z(), l === n ? (R = a, a = n) : (o = [
			o,
			s,
			c,
			l
		], a = o)))), i = a === n ? a : e.substring(i, R), i === n ? (R = t, t = n) : (z = R, a = Dr(i), a = a ? n : void 0, a === n ? (R = t, t = n) : (z = t, t = Or(i)))))))))))), t;
	}
	function Z() {
		let t;
		return t = e.charAt(R), me.test(t) ? R++ : (t = n, H === 0 && K(Rt)), t;
	}
	function Q() {
		let t;
		return t = e.charAt(R), S.test(t) ? R++ : (t = n, H === 0 && K(De)), t;
	}
	function $() {
		let t, r;
		for (H++, t = [], r = e.charAt(R), he.test(r) ? R++ : (r = n, H === 0 && K(zt)); r !== n;) t.push(r), r = e.charAt(R), he.test(r) ? R++ : (r = n, H === 0 && K(zt));
		return H--, t;
	}
	function ga() {
		let t, r;
		return t = R, H++, e.length > R ? (r = e.charAt(R), R++) : (r = n, H === 0 && K(mt)), H--, r === n ? t = void 0 : (R = t, t = n), t;
	}
	function _a(e) {
		return e.length > 1e3 && Mr("Member name too long (maximum 1000 characters)"), e;
	}
	U = a();
	let va = U !== n && R === e.length;
	function ya() {
		throw U !== n && R < e.length && K(Fr()), Br(kr, V < e.length ? Nr(V) : null, V < e.length ? Rr(V, V + 1) : Rr(V, V));
	}
	if (t.peg$library) return {
		peg$result: U,
		peg$currPos: R,
		peg$FAILED: n,
		peg$maxFailExpected: kr,
		peg$maxFailPos: V,
		peg$success: va,
		peg$throw: va ? void 0 : ya
	};
	if (va) return U;
	ya();
}
var Xn = /* @__PURE__ */ new Set([
	"eq",
	"ne",
	"lt",
	"le",
	"gt",
	"ge"
]), Zn = {
	length: {
		args: ["value"],
		logical: !1
	},
	count: {
		args: ["nodes"],
		logical: !1
	},
	value: {
		args: ["nodes"],
		logical: !1
	},
	match: {
		args: ["value", "value"],
		logical: !0
	},
	search: {
		args: ["value", "value"],
		logical: !0
	}
}, Qn = (e) => {
	throw new Nn(1, 1, e);
}, $n = (e) => e.type === "root" || e.type === "current", er = (e) => {
	for (let t = e.next; t; t = t.next) {
		let e = t.value;
		if (e.type !== "bracketMember" && (e.type !== "dot" || e.value.type === "wildcard")) return !1;
	}
	return !0;
};
function tr(e) {
	let t = [{
		node: e,
		context: "nodes"
	}], n = (e) => {
		for (let n = e.next; n; n = n.next) {
			let e = n.value;
			if (e.type === "dotdot" && (e = e.value), e.type !== "bracketExpression") continue;
			let r = e.value, i = r.type === "unions" ? r.values : [r];
			for (let e of i) e.type === "filterExpression" && t.push({
				node: e.value,
				context: "test"
			});
		}
	};
	for (; t.length > 0;) {
		let { node: e, context: r } = t.pop();
		if (typeof e != "object" || !e) continue;
		let i = e;
		if ($n(i)) r === "value" && !er(i) && Qn("A non-singular query cannot be compared or used as a value: use a name or an index in each segment"), n(i);
		else switch (r === "nodes" && Qn(`Expected a query, found ${String(i.type)}`), i.type) {
			case "logicalExpression":
			case "notExpression":
			case "groupExpression":
				i.type === "logicalExpression" ? t.push({
					node: i.left,
					context: "test"
				}, {
					node: i.right,
					context: "test"
				}) : t.push({
					node: i.value,
					context: "test"
				});
				break;
			case "comparator": {
				let e = Xn.has(i.operator) ? "value" : "any";
				t.push({
					node: i.left,
					context: e
				}), i.operator !== "reg" && t.push({
					node: i.right,
					context: e
				});
				break;
			}
			case "functionCall": {
				let e = i.name, n = Zn[e], a = i.args;
				a.length !== n.args.length && Qn(`${e}() takes ${n.args.length} argument${n.args.length > 1 ? "s" : ""}, found ${a.length}`), r === "test" && !n.logical && Qn(`The result of ${e}() must be compared`), r === "value" && n.logical && Qn(`The result of ${e}() cannot be compared`), a.forEach((e, r) => t.push({
					node: e,
					context: n.args[r]
				}));
				break;
			}
			case "operation":
				t.push({
					node: i.left,
					context: "value"
				}, {
					node: i.right,
					context: "value"
				});
				break;
			case "groupOperation":
				t.push({
					node: i.value,
					context: r === "any" ? "any" : "value"
				});
				break;
			case "value": r === "test" && Qn("A literal must be compared");
		}
	}
}
function nr(e) {
	let t;
	try {
		t = Yn(e);
	} catch (e) {
		if (Vn(e)) throw new Nn(1, 1, "Expression is nested too deeply");
		if (e instanceof RangeError) throw new Nn(1, 1, "Expression is too large to parse");
		if (e && typeof e == "object" && "location" in e && "message" in e) {
			let t = e;
			throw new Nn(t.location.start.line, t.location.start.column, t.message);
		}
		throw e;
	}
	return tr(t), t;
}
var rr = /* @__PURE__ */ new Set([
	"(",
	")",
	"*",
	"+",
	"-",
	".",
	"?",
	"[",
	"\\",
	"]",
	"^",
	"n",
	"r",
	"t",
	"{",
	"|",
	"}"
]), ir = /* @__PURE__ */ new Set(/* @__PURE__ */ "L.Ll.Lm.Lo.Lt.Lu.M.Mc.Me.Mn.N.Nd.Nl.No.P.Pc.Pd.Pe.Pf.Pi.Po.Ps.Z.Zl.Zp.Zs.S.Sc.Sk.Sm.So.C.Cc.Cf.Cn.Co".split(".")), ar = (e) => e >= 55296 && e <= 56319, or = (e) => e >= 56320 && e <= 57343, sr = (e) => e !== void 0 && e >= "0" && e <= "9", cr = (e, t) => {
	let n = e.charCodeAt(t);
	return ar(n) && or(e.charCodeAt(t + 1)) ? {
		text: e.slice(t, t + 2),
		length: 2,
		code: (n - 55296) * 1024 + (e.charCodeAt(t + 1) - 56320) + 65536
	} : ar(n) || or(n) ? null : {
		text: e[t],
		length: 1,
		code: n
	};
}, lr = (e, t) => {
	let n = e[t + 1];
	return n === void 0 || !rr.has(n) ? null : n === "n" ? {
		text: "\\n",
		length: 2,
		code: 10
	} : n === "r" ? {
		text: "\\r",
		length: 2,
		code: 13
	} : n === "t" ? {
		text: "\\t",
		length: 2,
		code: 9
	} : {
		text: "\\" + n,
		length: 2,
		code: n.charCodeAt(0)
	};
}, ur = (e, t) => {
	if (e[t + 2] !== "{") return null;
	let n = e.indexOf("}", t + 3);
	if (n === -1 || n - (t + 3) > 2) return null;
	let r = e.slice(t + 3, n);
	return ir.has(r) ? {
		text: `\\${e[t + 1]}{${r}}`,
		length: n + 1 - t
	} : null;
}, dr = (e, t) => {
	let n = e[t];
	return n === "\\" ? lr(e, t) : n === void 0 || n === "-" || n === "[" || n === "]" ? null : cr(e, t);
}, fr = (e, t) => {
	let n = t + 1, r = "[";
	e[n] === "^" && (r += "^", n++);
	let i = !0;
	for (;;) {
		let a = e[n];
		if (a === void 0) return null;
		if (a === "]") return i ? null : {
			text: r + "]",
			length: n + 1 - t
		};
		if (a === "-") {
			if (!i && e[n + 1] !== "]") return null;
			r += "-", n++, i = !1;
			continue;
		}
		if (i = !1, a === "\\" && (e[n + 1] === "p" || e[n + 1] === "P")) {
			let t = ur(e, n);
			if (t === null) return null;
			r += t.text, n += t.length;
			continue;
		}
		let o = dr(e, n);
		if (o === null) return null;
		if (n += o.length, e[n] === "-" && e[n + 1] !== "]") {
			let t = dr(e, n + 1);
			if (t === null || t.code < o.code) return null;
			r += o.text + "-" + t.text, n += 1 + t.length;
		} else r += o.text;
	}
}, pr = (e, t) => {
	let n = t + 1, r = n;
	for (; sr(e[n]);) n++;
	if (n === r) return null;
	if (e[n] === ",") for (n++; sr(e[n]);) n++;
	return e[n] === "}" ? {
		text: e.slice(t, n + 1),
		length: n + 1 - t
	} : null;
}, mr = (e) => {
	let t = e, n = "", r = 0, i = !1, a = 0;
	for (; a < t.length;) {
		let e = t[a];
		switch (e) {
			case "|":
				n += "|", i = !1, a++;
				continue;
			case "(":
				r++, n += "(", i = !1, a++;
				continue;
			case ")":
				if (r === 0) return null;
				r--, n += ")", i = !0, a++;
				continue;
			case "*":
			case "+":
			case "?":
				if (!i) return null;
				n += e, i = !1, a++;
				continue;
			case "{": {
				let e = i ? pr(t, a) : null;
				if (e === null) return null;
				n += e.text, i = !1, a += e.length;
				continue;
			}
			case ".":
				n += ".", a++;
				break;
			case "[": {
				let e = fr(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
				break;
			}
			case "\\":
				if (t[a + 1] === "p" || t[a + 1] === "P") {
					let e = ur(t, a);
					if (e === null) return null;
					n += e.text, a += e.length;
				} else {
					let e = lr(t, a);
					if (e === null) return null;
					n += e.text === "\\-" ? "-" : e.text, a += e.length;
				}
				break;
			case "]":
			case "}": return null;
			default: {
				let e = cr(t, a);
				if (e === null) return null;
				n += e.text, a += e.length;
			}
		}
		i = !0;
	}
	return r === 0 ? n : null;
}, hr = 1e3, gr = 1e3, _r = 16, vr = /^[dgimsuy]*$/, yr = (e) => {
	let t = 0;
	for (let n = 0; n + 2 < e.length; n++) e[n] === "\\" && (e[n + 1] === "p" || e[n + 1] === "P") && e[n + 2] === "{" && t++;
	return t;
}, L = class extends Error {}, br = 0, xr = 1, Sr = 2, Cr = 3, wr = 4, Tr = 5, Er = An(2, 31) - 1, Dr = (e, t) => {
	let n = e.op.length, r = e.scratch ?? {
		clist: new Int32Array(n),
		nlist: new Int32Array(n),
		onList: new Int32Array(n),
		stack: new Int32Array(n),
		atomGen: new Int32Array(e.atoms.length),
		atomHit: new Uint8Array(e.atoms.length),
		gen: 0,
		step: 0
	};
	return e.scratch = void 0, (r.gen > Er - t - 2 || r.step > Er - t - 2) && (r.onList.fill(0), r.atomGen.fill(0), r.gen = 0, r.step = 0), r;
}, Or = /* @__PURE__ */ new Set([
	"^",
	"$",
	"\\",
	".",
	"*",
	"+",
	"?",
	"(",
	")",
	"[",
	"]",
	"{",
	"}",
	"|",
	"/"
]), R = /^\{(\d+)(?:,(\d*))?\}/, z = /^[0-9a-fA-F]{4}/, B = /^\(\?([ims]*)(?:-([ims]*))?:/, V = (e) => e === 10 || e === 13 || e === 8232 || e === 8233, kr = class {
	constructor(e, t, n, r = !1) {
		this.src = e, this.unicode = t, this.iregexp = r, this.i = 0, this.mods = {
			i: n.includes("i"),
			m: n.includes("m"),
			s: n.includes("s")
		};
	}
	atom(e, t) {
		return {
			t: "atom",
			src: e,
			literal: t,
			mods: this.mods
		};
	}
	parse() {
		let e = this.parseAlt();
		if (this.i < this.src.length) throw new L("unexpected character");
		return e;
	}
	parseAlt() {
		let e = [this.parseSeq()];
		for (; this.src[this.i] === "|";) this.i++, e.push(this.parseSeq());
		return e.length === 1 ? e[0] : {
			t: "alt",
			alts: e
		};
	}
	parseSeq() {
		let e = [];
		for (; this.i < this.src.length && this.src[this.i] !== "|" && this.src[this.i] !== ")";) e.push(this.parseTerm());
		return e.length === 1 ? e[0] : {
			t: "cat",
			items: e
		};
	}
	parseTerm() {
		let e = this.src[this.i];
		return e === "^" ? (this.i++, {
			t: "bol",
			multiline: this.mods.m
		}) : e === "$" ? (this.i++, {
			t: "eol",
			multiline: this.mods.m
		}) : this.parseQuantifier(this.parseAtom());
	}
	parseAtom() {
		let { src: e } = this, t = this.i, n = e[t];
		if (n === "(") {
			let n = this.mods;
			if (e[t + 1] === "?") {
				let r = B.exec(e.slice(t, t + 12));
				if (!r) throw new L("lookaround or named group");
				let i = Mn({}, n);
				for (let e of r[1]) i[e] = !0;
				for (let e of r[2] ?? "") i[e] = !1;
				this.mods = i, this.i = t + r[0].length;
			} else this.i = t + 1;
			let r = this.parseAlt();
			if (e[this.i] !== ")") throw new L("unclosed group");
			return this.i++, this.mods = n, r;
		}
		if (n === "[") {
			let n = t + 1;
			for (e[n] === "^" && n++; n < e.length && e[n] !== "]";) n += e[n] === "\\" ? 2 : 1;
			if (n >= e.length) throw new L("unclosed class");
			return this.i = n + 1, this.atom(e.slice(t, this.i));
		}
		if (n === ".") return this.i++, this.atom(this.iregexp ? "[^\\n\\r]" : ".");
		if (n === "\\") return !this.unicode && e[t + 1] === "c" && !/[a-zA-Z]/.test(e[t + 2] ?? "") ? (this.i = t + 1, this.atom("\\\\", "\\")) : (this.i = t + this.escapeLength(t), this.atom(e.slice(t, this.i)));
		if (n === "*" || n === "+" || n === "?" || n === ")") throw new L("nothing to repeat");
		let r = e.codePointAt(t), i = this.unicode && r > 65535 ? String.fromCodePoint(r) : n;
		return this.i = t + i.length, this.atom(Or.has(i) ? `\\${i}` : i, i);
	}
	escapeLength(e) {
		let { src: t, unicode: n } = this, r = t[e + 1];
		if (r === void 0) throw new L("trailing backslash");
		if (r === "b" || r === "B") throw new L("word boundary");
		if (r >= "1" && r <= "9") throw new L("backreference");
		if (r === "0") {
			if (n) return 2;
			let r = 2;
			for (; r < 4 && /[0-7]/.test(t[e + r] ?? "");) r++;
			return r;
		}
		if (r === "c") return 3;
		if (r === "x" && /^[0-9a-fA-F]{2}/.test(t.slice(e + 2))) return 4;
		if (n && (r === "p" || r === "P" || r === "u") && t[e + 2] === "{") {
			let n = t.indexOf("}", e + 3);
			if (n === -1) throw new L("unclosed escape");
			return n - e + 1;
		}
		if (r === "u" && z.test(t.slice(e + 2))) {
			let r = parseInt(t.slice(e + 2, e + 6), 16);
			if (n && r >= 55296 && r <= 56319 && t.slice(e + 6, e + 8) === "\\u") {
				let n = t.slice(e + 8, e + 12);
				if (z.test(n) && parseInt(n, 16) >= 56320 && parseInt(n, 16) <= 57343) return 12;
			}
			return 6;
		}
		return 2;
	}
	parseQuantifier(e) {
		let { src: t } = this, n = t[this.i], r, i;
		if (n === "*") r = 0, i = Infinity, this.i++;
		else if (n === "+") r = 1, i = Infinity, this.i++;
		else if (n === "?") r = 0, i = 1, this.i++;
		else if (n === "{") {
			let n = R.exec(t.slice(this.i));
			if (!n) return e;
			r = Number(n[1]), i = n[2] === void 0 ? r : n[2] === "" ? Infinity : Number(n[2]), this.i += n[0].length;
		} else return e;
		if (t[this.i] === "?" && this.i++, r > hr || i !== Infinity && i > hr) throw new L("repetition too large");
		return {
			t: "rep",
			node: e,
			min: r,
			max: i
		};
	}
}, H = class {
	constructor(e) {
		this.unicode = e, this.op = [], this.x = [], this.y = [], this.atoms = [], this.atomIds = /* @__PURE__ */ new Map(), this.work = 0;
	}
	emit(e, t = 0, n = 0) {
		if (this.op.length >= hr) throw new L("pattern too large");
		return this.op.push(e), this.x.push(t), this.y.push(n), this.op.length - 1;
	}
	atomId(e) {
		let t = (e.mods.i ? "i" : "") + (e.mods.s ? "s" : "") + (this.unicode ? "u" : ""), n = `${t}/${e.src}`, r = this.atomIds.get(n);
		return r === void 0 && (r = this.atoms.length, this.atoms.push({
			re: RegExp(`^(?:${e.src})$`, t),
			literal: e.mods.i ? void 0 : e.literal
		}), this.atomIds.set(n, r)), r;
	}
	finish() {
		this.emit(Tr);
	}
	compile(e) {
		if (++this.work > 4 * hr) throw new L("pattern too large");
		switch (e.t) {
			case "atom":
				this.emit(br, this.atomId(e));
				return;
			case "bol":
				this.emit(Cr, +!!e.multiline);
				return;
			case "eol":
				this.emit(wr, +!!e.multiline);
				return;
			case "cat":
				for (let t of e.items) this.compile(t);
				return;
			case "alt": {
				let t = [];
				for (let n = 0; n < e.alts.length - 1; n++) {
					let r = this.emit(xr);
					this.x[r] = r + 1, this.compile(e.alts[n]), t.push(this.emit(Sr)), this.y[r] = this.op.length;
				}
				this.compile(e.alts[e.alts.length - 1]);
				for (let e of t) this.x[e] = this.op.length;
				return;
			}
			case "rep":
				for (let t = 0; t < e.min; t++) this.compile(e.node);
				if (e.max === Infinity) {
					let t = this.emit(xr);
					this.x[t] = t + 1, this.compile(e.node), this.emit(Sr, t), this.y[t] = this.op.length;
				} else {
					let t = [];
					for (let n = e.min; n < e.max; n++) {
						let n = this.emit(xr);
						this.x[n] = n + 1, t.push(n), this.compile(e.node);
					}
					for (let e of t) this.y[e] = this.op.length;
				}
				return;
		}
	}
}, Ar = (e, t, n) => {
	try {
		new RegExp(e, t);
		let r = t.includes("u"), i = new kr(e, r, t, n).parse(), a = new H(r);
		return a.compile(i), a.finish(), {
			op: a.op,
			x: a.x,
			y: a.y,
			atoms: a.atoms,
			unicode: r,
			sticky: t.includes("y")
		};
	} catch (e) {
		if (e instanceof RangeError) throw e;
		return null;
	}
}, U = (e, t, n, r) => {
	let { op: i, x: a, y: o, atoms: s, unicode: c, sticky: l } = e, u = n.regexWork ?? n, { clist: d, nlist: f } = r, p = 0, m = 0, { onList: h, stack: g, atomGen: ee, atomHit: te } = r, _ = r.gen, v = r.step;
	r.gen = _ + t.length + 2, r.step = v + t.length + 2;
	let y = 0, b = !1, ne = (e, n, r) => {
		let s = 0;
		g[s++] = r;
		let c = 0;
		for (; s > 0;) {
			let r = g[--s];
			if (h[r] !== _) switch (h[r] = _, ++c === 64 && (u(c), c = 0), i[r]) {
				case br:
					e[n++] = r;
					break;
				case Tr: return u(c), b = !0, n;
				case Sr:
					g[s++] = a[r];
					break;
				case xr:
					g[s++] = o[r], g[s++] = a[r];
					break;
				case Cr:
					(y === 0 || a[r] === 1 && V(t.charCodeAt(y - 1))) && (g[s++] = r + 1);
					break;
				case wr: (y === t.length || a[r] === 1 && V(t.charCodeAt(y))) && (g[s++] = r + 1);
			}
		}
		return u(c), n;
	};
	if (_++, p = ne(d, 0, 0), b) return !0;
	for (; y < t.length;) {
		if (p === 0 && l) return !1;
		let e = (c ? t.codePointAt(y) : t.charCodeAt(y)) > 65535 ? 2 : 1, n = t.slice(y, y + e), r = v + y + 1;
		_++, m = 0, y += e;
		for (let e = 0; e < p; e++) {
			let t = d[e], i = a[t];
			if (ee[i] !== r) {
				ee[i] = r;
				let e = s[i];
				te[i] = (e.literal === void 0 ? e.re.test(n) : e.literal === n) ? 1 : 0;
			}
			if (te[i] === 1 && (m = ne(f, m, t + 1), b)) return !0;
		}
		if (!l && (m = ne(f, m, 0), b)) return !0;
		let i = d;
		d = f, f = i, p = m;
	}
	return !1;
}, jr = (e, t, n) => {
	let r = Dr(e, t.length);
	try {
		return U(e, t, n, r);
	} finally {
		e.scratch = r;
	}
}, Mr = 256, Nr = /* @__PURE__ */ new Map(), W = 0, G = (e, t, n, r, i = !1) => {
	if (e.length > gr || t.length > 7 || !vr.test(t)) return null;
	let a = `${t}/${+!!n}/${+!!i}`, o = Nr.get(e)?.get(a);
	if (o !== void 0) return r(e.length), o;
	let s = Array.from(e).join(""), c = yr(s) > _r ? null : Ar(n ? `^(?:${s})$` : s, t, i);
	W >= Mr && (Nr.clear(), W = 0);
	let l = Nr.get(s);
	return l === void 0 && Nr.set(s, l = /* @__PURE__ */ new Map()), l.set(a, c), W++, r(s.length + (c === null ? 0 : c.op.length)), c;
}, Pr = (e, t, n) => {
	var r;
	return (r = n.regexProgram) == null || r.call(n, e.op.length), jr(e, t, n);
}, Fr = class {
	constructor(e) {
		this.nodes = e;
	}
}, Ir = (e) => {
	let t = !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		if (r === "\\" && n + 1 < e.length) {
			let r = e[n + 1];
			if ((r === "b" || r === "B") && !t) return !0;
			n++;
		} else r === "[" && !t ? t = !0 : r === "]" && t && (t = !1);
	}
	return !1;
}, Lr = (e) => {
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (n === "\\") {
			let n = e[t + 1];
			if (n >= "1" && n <= "9") return !1;
			t++;
		} else if (n === "(" && e[t + 1] === "?") {
			let n = e[t + 2];
			if (n === "=" || n === "!") return !1;
			if (n === "<") {
				let n = e[t + 3];
				if (n === "=" || n === "!" || /[a-zA-Z]/.test(n ?? "")) return !1;
			}
		}
	}
	return !Ir(e);
}, Rr = 256, K = /* @__PURE__ */ new Map(), zr = (e, t) => {
	let n = K.get(e);
	return n === void 0 && (n = Lr(e), K.size >= Rr && K.clear(), K.set(Array.from(e).join(""), n)), t(e.length), n;
}, Br = /* @__PURE__ */ new Map(), Vr = (e, t) => {
	let n = Br.get(e);
	return n === void 0 && (n = mr(e), n !== null && (n = Array.from(n).join("")), Br.size >= Rr && Br.clear(), Br.set(Array.from(e).join(""), n)), t(e.length), n;
}, Hr = 256, Ur = (e, t, n, r, i, a, o = !1) => {
	let s = a === void 0 ? void 0 : i.regexSites, c = s?.get(a);
	if (c === void 0) {
		if (e.length > gr) c = null;
		else if (o) {
			let n = Vr(e, i);
			c = n === null ? null : G(n, t, r, i, !0);
		} else c = zr(e, i) ? G(e, t, r, i) : null;
		s !== void 0 && (s.size >= Hr && s.clear(), s.set(a, c));
	}
	return c !== null && Pr(c, n, i);
}, Wr = {
	length: (e, t) => {
		let n = e[0];
		if (F(n)) {
			t(n.length);
			let e = n.length;
			for (let t = 0; t < n.length - 1; t++) {
				let r = n.charCodeAt(t);
				if (r >= 55296 && r <= 56319) {
					let r = n.charCodeAt(t + 1);
					r >= 56320 && r <= 57343 && (e--, t++);
				}
			}
			return e;
		}
		if (N(n)) return M(n);
		if (P(n)) {
			let e = Bn(n);
			return t(e.length), e.length;
		}
	},
	count: (e) => e[0].nodes.length,
	match: (e, t, n) => {
		let r = e[0], i = e[1];
		return !F(r) || !F(i) ? !1 : Ur(i, "u", r, !0, t, n, !0);
	},
	search: (e, t, n) => {
		let r = e[0], i = e[1];
		return !F(r) || !F(i) ? !1 : Ur(i, "u", r, !1, t, n, !0);
	},
	value: (e) => {
		let { nodes: t } = e[0];
		return t.length === 1 ? t[0] : void 0;
	}
}, Gr = (e, t, n = A) => e === void 0 && t === void 0 || In(e, t, n), Kr = (e, t, n = A) => !In(e, t, n), qr = (e) => e >= 55296 && e <= 57343 ? e + 8192 : e >= 57344 ? e - 2048 : e, Jr = (e, t) => {
	let n = Math.min(e.length, t.length);
	for (let r = 0; r < n; r++) {
		let n = e.charCodeAt(r), i = t.charCodeAt(r);
		if (n !== i) return qr(n) - qr(i);
	}
	return e.length - t.length;
}, Yr = (e, t, n = A) => Un(e) && Un(t) ? e < t : F(e) && F(t) ? (n(Math.min(e.length, t.length)), Jr(e, t) < 0) : !1, Xr = (e, t, n = A) => Yr(e, t, n) || Gr(e, t, n), Zr = (e, t, n = A) => Un(e) && Un(t) ? e > t : F(e) && F(t) ? (n(Math.min(e.length, t.length)), Jr(e, t) > 0) : !1, Qr = (e, t, n = A) => Zr(e, t, n) || Gr(e, t, n), $r = (e, t) => typeof e == "string" && typeof t == "string" && e.length === t.length ? e.length : 0, ei = (e, t, n) => {
	let r = M(e);
	for (let i = 0; i < r; i++) {
		let r = Ln(e, i);
		if (n(1 + $r(r, t)), r === t || r !== r && t !== t) return i;
	}
	return -1;
}, ti = (e) => typeof e == "number" ? "n" + String(e) : typeof e == "string" ? "s" + e : e, ni = (e) => typeof e == "string" && e.length + 1 > Rn, ri = (e, t, n) => {
	let r = n?.get(e);
	if (r) return r;
	let i = {
		set: /* @__PURE__ */ new Set(),
		long: []
	}, a = M(e);
	for (let n = 0; n < a; n++) {
		let r = Ln(e, n);
		t(1 + (typeof r == "string" ? r.length : 0)), ni(r) ? i.long.push(r) : i.set.add(ti(r));
	}
	return n?.set(e, i), i;
}, ii = ({ set: e, long: t }, n, r) => {
	if (ni(n)) {
		for (let e of t) if (r(1 + $r(e, n)), e === n) return !0;
		return !1;
	}
	return e.size === 0 ? (r(), !1) : (r(1 + (typeof n == "string" ? 2 * n.length : 0)), e.has(ti(n)));
}, ai = (e, t, n) => {
	let r = M(e);
	for (let i = 0; i < r; i++) if (n(), j(e, i) && t(e[i])) return !0;
	return !1;
}, oi = {
	eq: Gr,
	ne: Kr,
	lt: Yr,
	le: Xr,
	gt: Zr,
	ge: Qr,
	in: (e, t, n = A) => N(t) ? ei(t, e, n) !== -1 : !1,
	nin: (e, t, n = A) => N(t) ? ei(t, e, n) === -1 : !1,
	subsetof: (e, t, n = A, r) => {
		if (!N(e) || !N(t)) return !1;
		let i = ri(t, n, r);
		return !ai(e, (e) => !ii(i, e, n), n);
	},
	anyof: (e, t, n = A, r) => {
		if (!N(e) || !N(t)) return !1;
		let i = ri(t, n, r);
		return ai(e, (e) => ii(i, e, n), n);
	},
	noneof: (e, t, n = A, r) => {
		if (!N(e) || !N(t)) return !1;
		let i = ri(t, n, r);
		return !ai(e, (e) => ii(i, e, n), n);
	},
	sizeof: (e, t) => !N(e) && !F(e) || !N(t) && !F(t) ? !1 : (N(e) ? M(e) : e.length) === (N(t) ? M(t) : t.length),
	size: (e, t) => !N(e) && !F(e) || !Un(t) ? !1 : (N(e) ? M(e) : e.length) === t
}, si = (e) => !N(e) && !F(e) ? !1 : (N(e) ? M(e) : e.length) === 0, ci = (e, t, n, r = A, i) => !F(e) || !F(t) ? !1 : Ur(i !== void 0 && r.regexSites?.has(i) === !0 ? "" : t.slice(1, -1), n, e, !1, r, i), li = (e) => e.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\x08/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (e) => "\\u00" + e.charCodeAt(0).toString(16).padStart(2, "0")), q = (e, t) => e.concat(`[${t}]`), ui = (e, t) => e < 0 ? t + e : e, di = (e, t) => {
	let n = M(e), r = ui(t, n);
	return r >= 0 && r < n ? {
		exists: !0,
		value: j(e, r) ? e[r] : void 0,
		index: r
	} : { exists: !1 };
}, fi = (e, t) => {
	for (let n of t) e.push(n);
}, pi = 1e6, J = 100, mi = 1e6, hi = 20, gi = 1e4, _i = 1e4, vi = class {
	constructor(e) {
		this.weight = 0, this.nodes = 0, this.stringPositions = 0, this.done = !1, this.seen = /* @__PURE__ */ new Set(), this.frames = [], this.visit(e);
	}
	advance(e) {
		let t = this.nodes + e, { frames: n } = this;
		for (; n.length > 0 && this.nodes < t;) {
			let e = n[n.length - 1];
			if (e.i >= e.length) {
				n.pop();
				continue;
			}
			let t = e.i++;
			if (e.keys === null) {
				let n = e.container;
				if (e.indices !== null) {
					let r = Number(e.indices[t]);
					j(n, r) && this.visit(n[r]);
				} else if (j(n, t)) this.visit(n[t]);
				else if (++e.holes > _i) {
					let r = e.length, i = Object.getOwnPropertyNames(n).filter((e) => {
						let n = Number(e);
						return Number.isInteger(n) && n > t && n < r && String(n) === e;
					});
					e.indices = i, e.length = i.length, e.i = 0;
				}
			} else {
				let n = e.container, r = e.keys[t];
				if (!j(n, r)) continue;
				this.weight += r.length, this.visit(n[r]);
			}
		}
		n.length === 0 && (this.done = !0);
	}
	visit(e) {
		if (this.nodes++, this.weight += typeof e == "string" ? 1 + e.length : 1, typeof e == "string" && (this.stringPositions += 1 + e.length), typeof e == "object" && e && !this.seen.has(e)) {
			if (this.seen.add(e), N(e)) this.frames.push({
				container: e,
				keys: null,
				indices: null,
				length: M(e),
				i: 0,
				holes: 0
			});
			else if (P(e)) {
				let t = Object.keys(e);
				this.frames.push({
					container: e,
					keys: t,
					indices: null,
					length: t.length,
					i: 0,
					holes: 0
				});
			}
		}
	}
}, yi = class {
	constructor(e, t = {}) {
		this.steps = 0, this.largestRegexProgram = 0, this.regexSteps = 0, this.rootQueryCache = /* @__PURE__ */ new Map(), this.setCaches = /* @__PURE__ */ new Map(), this.siteSetCache = (e) => {
			let t = this.setCaches.get(e);
			return t === void 0 && (t = /* @__PURE__ */ new WeakMap(), this.setCaches.set(e, t)), t;
		}, this.canonicalNames = /* @__PURE__ */ new Map(), this.canonicalName = (e, t) => {
			let n = this.canonicalNames.get(e);
			return n === void 0 && (this.tick(t.length), n = Object.keys({ [t]: 0 })[0], this.canonicalNames.set(e, n), this.escapedNames.has(n) || this.escapedNames.set(n, li(n))), n;
		}, this.escapedNames = /* @__PURE__ */ new Map(), this.formatStringLiteralPath = (e, t) => {
			let n = this.escapedNames.get(t);
			return n === void 0 && (this.tick(t.length), n = li(t), this.escapedNames.set(t, n)), e.concat(`['${n}']`);
		}, this.forEachElement = (e, t) => {
			let n = M(e);
			for (let r = 0; r < n; r++) this.tick(), j(e, r) && t(e[r], r);
		}, this.retained = 0, this.retain = () => {
			if (!(++this.retained <= this.retainedLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new vi(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(gi, Math.ceil((this.retained - this.retainedLimit) / hi))), this.raiseLimits(e), this.retained <= this.retainedLimit) return;
					if (this.raiseLimits(e), this.retained <= this.retainedLimit) return;
				}
				throw new Pn(`Query retains more than ${this.retainedLimit} nodes`);
			}
		}, this.raiseLimits = (e) => {
			let t = Math.min(this.regexSteps, this.largestRegexProgram * e.stringPositions);
			this.stepLimit = Math.max(pi, J * e.weight) + t, this.retainedLimit = Math.max(mi, hi * e.nodes);
		}, this.tick = Object.assign((e = 1) => {
			if (this.steps += e, !(this.steps <= this.stepLimit)) {
				if (this.adaptiveLimit) {
					let e = this.weigher ??= new vi(this.rootPayload.value);
					for (; !e.done;) if (e.advance(Math.max(gi, Math.ceil((this.steps - this.stepLimit) / J))), this.raiseLimits(e), this.steps <= this.stepLimit) return;
					if (this.raiseLimits(e), this.steps <= this.stepLimit) return;
				}
				throw new Pn(`Query exceeded ${this.stepLimit} evaluation steps`);
			}
		}, {
			regexProgram: (e) => {
				this.largestRegexProgram = Math.max(this.largestRegexProgram, e);
			},
			regexWork: (e) => {
				this.regexSteps += e, this.tick(e);
			},
			regexSites: /* @__PURE__ */ new Map()
		}), this.readsCurrent = /* @__PURE__ */ new WeakMap(), this.invariantResults = /* @__PURE__ */ new Map(), this.isInvariant = (e) => (this.readsCurrent.has(e) || this.classify(e), !this.readsCurrent.get(e)), this.classify = (e) => {
			let t = this.readsCurrent, n = [], r = (e) => {
				if (typeof e != "object" || !e) return !1;
				let r = t.get(e);
				if (r !== void 0) return r;
				let i = e.type;
				if (i === "current") return t.set(e, !0), !0;
				if (i === "filterExpression" || i === "value") return t.set(e, !1), !1;
				let a = Object.values(e);
				n.push({
					node: e,
					children: a,
					i: 0,
					reads: !1
				});
			};
			for (r(e); n.length > 0;) {
				let e = n[n.length - 1];
				e.i < e.children.length ? r(e.children[e.i++]) === !0 && (e.reads = !0) : (t.set(e.node, e.reads), n.pop(), e.reads && n.length > 0 && (n[n.length - 1].reads = !0));
			}
		}, this.memoInvariant = (e, t) => {
			if (!this.isInvariant(e)) return t();
			if (this.invariantResults.has(e)) return this.invariantResults.get(e);
			let n = t();
			return this.invariantResults.set(e, n), n;
		}, this.handleRootQuery = (e, t) => {
			if (this.rootQueryCache.has(e)) return this.rootQueryCache.get(e);
			let n = this.handleSubscript(this.rootPayload, t);
			return this.rootQueryCache.set(e, n), n;
		}, this.handleIdentifier = (e, t) => this.selectMember(e, t), this.handleStringLiteral = (e, t) => this.selectMember(e, t), this.selectMember = ({ value: e, paths: t }, n) => {
			if (!P(e)) return;
			let r = this.canonicalName(n, n.value);
			if (j(e, r)) return {
				value: e[r],
				paths: this.formatStringLiteralPath(t, r)
			};
		}, this.handleWildcard = ({ value: e, paths: t }) => {
			if (N(e)) {
				let n = [];
				return this.forEachElement(e, (e, r) => {
					this.retain(), n.push({
						value: e,
						paths: q(t, r)
					});
				}), n;
			}
			if (P(e)) {
				let n = Bn(e);
				this.tick(n.length);
				let r = [];
				for (let i of n) j(e, i) && (this.retain(), r.push({
					value: e[i],
					paths: this.formatStringLiteralPath(t, i)
				}));
				return r;
			}
			return [];
		}, this.handleNumericLiteral = ({ value: e, paths: t }, n) => {
			if (!N(e)) return;
			let r = di(e, n.value);
			if (r.exists) return {
				value: r.value,
				paths: q(t, r.index)
			};
		}, this.handleDotNumericLiteral = ({ value: e, paths: t }, n) => {
			if (N(e)) {
				let r = di(e, n.value);
				return r.exists ? {
					value: r.value,
					paths: q(t, r.index)
				} : void 0;
			}
			if (P(e)) {
				let r = String(n.value);
				return j(e, r) ? {
					value: e[r],
					paths: this.formatStringLiteralPath(t, r)
				} : void 0;
			}
		}, this.handleSlices = ({ value: e, paths: t }, n) => {
			if (!N(e)) return [];
			let r = M(e), i = n.step ?? 1;
			if (i === 0) return [];
			let a, o;
			i > 0 ? (a = n.start === null ? 0 : ui(n.start, r), o = n.end === null ? r : ui(n.end, r)) : (a = n.start === null ? r - 1 : ui(n.start, r), o = n.end === null ? -r - 1 : ui(n.end, r));
			let s, c;
			i > 0 ? (s = Math.max(a, 0), c = Math.min(o, r)) : (c = Math.min(a, r - 1), s = Math.max(o, -1));
			let l = [], u = i > 0 ? s : c;
			for (; i > 0 && u < c || i < 0 && u > s;) this.tick(), this.retain(), l.push({
				value: j(e, u) ? e[u] : void 0,
				paths: q(t, u)
			}), u += i;
			return l;
		}, this.handleUnions = (e, t) => {
			let n = [];
			for (let r of t.values) switch (this.tick(), r.type) {
				case "identifier":
					if (P(e.value)) {
						let t = this.handleIdentifier(e, r);
						I(t) && (this.retain(), n.push(t));
					}
					break;
				case "stringLiteral":
					if (P(e.value)) {
						let t = this.handleStringLiteral(e, r);
						I(t) && (this.retain(), n.push(t));
					}
					break;
				case "numericLiteral":
					if (N(e.value)) {
						let t = this.handleNumericLiteral(e, r);
						I(t) && (this.retain(), n.push(t));
					}
					break;
				case "wildcard":
					fi(n, this.handleWildcard(e));
					break;
				case "slices":
				case "filterExpression": fi(n, this.handleBracketExpressionContent(e, r));
			}
			return n;
		}, this.handleDotdot = (e, t) => {
			let n = [];
			return this.collectDotdot(e, t, n), n;
		}, this.collectDotdot = (e, t, n) => {
			let r = t.value, i = [];
			this.tick();
			let a = e;
			for (; a !== void 0;) {
				let e = a.value;
				switch (r.type) {
					case "bracketMember": {
						let e = this.handleBracketMemberContent(a, r.value);
						I(e) && (this.retain(), n.push(e));
						break;
					}
					case "bracketExpression":
						fi(n, this.handleBracketExpressionContent(a, r.value));
						break;
					case "wildcard":
						fi(n, this.handleWildcard(a));
						break;
					case "identifier": {
						let e = this.handleIdentifier(a, r);
						I(e) && (this.retain(), n.push(e));
						break;
					}
				}
				if (P(e)) {
					let t = Bn(e);
					this.tick(t.length), i.push({
						parent: a,
						keys: t,
						length: t.length,
						i: 0
					});
				} else N(e) && i.push({
					parent: a,
					keys: null,
					length: M(e),
					i: 0
				});
				for (a = void 0; i.length > 0;) {
					let e = i[i.length - 1];
					if (e.i >= e.length) {
						i.pop();
						continue;
					}
					let t = e.i++;
					if (e.keys === null) {
						this.tick();
						let n = e.parent.value;
						if (!j(n, t)) continue;
						a = {
							value: n[t],
							paths: q(e.parent.paths, t)
						};
					} else {
						let n = e.parent.value, r = e.keys[t];
						if (!j(n, r)) continue;
						a = {
							value: n[r],
							paths: this.formatStringLiteralPath(e.parent.paths, r)
						};
					}
					break;
				}
			}
		}, this.handleOperationContent = (e, t) => {
			switch (this.tick(), t.type) {
				case "root": return this.handleRootQuery(t, t.next);
				case "current": return this.handleSubscript(e, t.next);
				case "value": return {
					value: t.value,
					paths: e.paths
				};
				case "groupOperation": return this.memoInvariant(t, () => this.handleOperationContent(e, t.value));
				case "functionCall": return {
					value: this.handleFunctionCall(e, t),
					paths: e.paths
				};
				case "operation": {
					let n = [], r = t;
					for (; r.type === "operation";) n.push({
						operator: r.operator,
						right: r.right
					}), r = r.left;
					let i = this.handleOperationContent(e, r)?.value;
					this.tick(n.length);
					for (let t = n.length - 1; t >= 0; t--) {
						let r = this.handleOperationContent(e, n[t].right)?.value;
						if (!Un(i) || !Un(r)) i = void 0;
						else switch (n[t].operator) {
							case "plus":
								i += r;
								break;
							case "minus":
								i -= r;
								break;
							case "div":
								i = r === 0 ? void 0 : i / r;
								break;
							case "multi": i *= r;
						}
					}
					return Un(i) ? {
						value: i,
						paths: e.paths
					} : void 0;
				}
			}
		}, this.handleComparator = (e, t) => this.memoInvariant(t, () => this.evaluateComparator(e, t)), this.evaluateComparator = (e, t) => {
			let n = this.handleOperationContent(e, t.left)?.value;
			if (t.operator === "empty") return si(n);
			if (t.operator === "reg") return ci(n, t.right.value, t.right.opts, this.tick, t);
			let r = this.handleOperationContent(e, t.right)?.value, i = oi[t.operator];
			if (i) {
				let e = this.isInvariant(t.right) ? this.siteSetCache(t.right) : void 0;
				return i(n, r, this.tick, e);
			}
			return !1;
		}, this.handleLogicalExpression = (e, t) => this.memoInvariant(t, () => this.evaluateLogicalExpression(e, t)), this.evaluateLogicalExpression = (e, t) => {
			let n = [], r = !this.isInvariant(t), i = t;
			for (; i.type === "logicalExpression" && (i === t || !r || !this.isInvariant(i));) n.push({
				operator: i.operator,
				right: i.right
			}), i = i.left;
			this.tick(n.length);
			let a = this.handleFilterExpressionContent(e, i);
			for (let t = n.length - 1; t >= 0; t--) (n[t].operator === "and" ? a : !a) && (a = this.handleFilterExpressionContent(e, n[t].right));
			return a;
		}, this.handleFunctionCall = (e, t) => this.memoInvariant(t, () => this.evaluateFunctionCall(e, t)), this.evaluateFunctionCall = (e, t) => {
			let n = t.name === "count" || t.name === "value", r = t.args.map((t) => {
				let r = this.handleOperationContent(e, t);
				return !n || t.type !== "root" && t.type !== "current" ? r?.value : r?.isIndefinite ? new Fr(r.value) : new Fr(I(r?.value) ? [r?.value] : []);
			}), i = Wr[t.name], a = t.args[1], o = a?.type === "stringLiteral" || a?.subtype === "string";
			return i ? i(r, this.tick, o ? t : void 0) : void 0;
		}, this.handleFilterExpressionContent = (e, t) => {
			switch (this.tick(), t.type) {
				case "logicalExpression": return this.handleLogicalExpression(e, t);
				case "comparator": return this.handleComparator(e, t);
				case "groupExpression": return this.memoInvariant(t, () => this.handleFilterExpressionContent(e, t.value));
				case "notExpression": return this.memoInvariant(t, () => !this.handleFilterExpressionContent(e, t.value));
				case "functionCall": return !!this.handleFunctionCall(e, t);
				case "root": {
					let e = this.handleRootQuery(t, t.next);
					return e?.isIndefinite ? Array.isArray(e.value) && e.value.length > 0 : I(e);
				}
				case "current": {
					let n = this.handleSubscript(e, t.next);
					return n?.isIndefinite ? Array.isArray(n.value) && n.value.length > 0 : I(n);
				}
				case "value": return !!t.value;
			}
		}, this.handleBracketMemberContent = (e, t) => {
			switch (t.type) {
				case "identifier": return this.handleIdentifier(e, t);
				case "numericLiteral": return this.handleNumericLiteral(e, t);
				case "stringLiteral": return this.handleStringLiteral(e, t);
			}
		}, this.handleBracketExpressionContent = (e, t) => {
			let n = e.value;
			switch (t.type) {
				case "filterExpression": {
					let r = [];
					if (N(n)) this.forEachElement(n, (n, i) => {
						let a = {
							value: n,
							paths: q(e.paths, i)
						};
						this.handleFilterExpressionContent(a, t.value) && (this.retain(), r.push(a));
					});
					else if (P(n)) {
						let i = Bn(n);
						this.tick(i.length);
						for (let a of i) {
							if (!j(n, a)) continue;
							let i = {
								value: n[a],
								paths: this.formatStringLiteralPath(e.paths, a)
							};
							this.handleFilterExpressionContent(i, t.value) && (this.retain(), r.push(i));
						}
					}
					return r;
				}
				case "unions": return this.handleUnions(e, t);
				case "wildcard": return this.handleWildcard(e);
				case "slices": return this.handleSlices(e, t);
			}
		}, this.isIndefiniteSegment = (e) => {
			let t = e.value;
			return t.type === "bracketExpression" || t.type === "dotdot" || t.type === "dot" && t.value.type === "wildcard";
		}, this.selectMany = (e, t) => {
			let n = t.value;
			switch (n.type) {
				case "bracketExpression": return this.handleBracketExpressionContent(e, n.value);
				case "dotdot": return this.handleDotdot(e, n);
				default: return this.handleWildcard(e);
			}
		}, this.selectOne = (e, t) => {
			let n = t.value;
			switch (n.type) {
				case "bracketMember": return this.handleBracketMemberContent(e, n.value);
				case "dot":
					if (n.value.type === "identifier") return this.handleIdentifier(e, n.value);
					if (n.value.type === "numericLiteral") return this.handleDotNumericLiteral(e, n.value);
			}
		}, this.handleSubscript = (e, t) => {
			if (t === null) return e;
			let n = [], r = [{
				node: e,
				segment: t
			}], i = !1;
			for (; r.length > 0;) {
				let { node: e, segment: t } = r.pop(), a;
				if (this.isIndefiniteSegment(t)) i = !0, a = this.selectMany(e, t);
				else {
					this.tick();
					let n = this.selectOne(e, t);
					if (!I(n)) continue;
					a = [n];
				}
				let o = t.next;
				if (o === null) fi(n, a);
				else for (let e = a.length - 1; e >= 0; e--) r.push({
					node: a[e],
					segment: o
				});
			}
			if (!i) return n[0];
			let a = [], o = [];
			for (let e of n) a.push(e.value), o.push(e.paths);
			return {
				value: a,
				paths: o,
				isIndefinite: !0
			};
		}, this.handleRoot = (e) => {
			try {
				return this.handleSubscript(this.rootPayload, e.next);
			} catch (e) {
				throw Vn(e) ? new Pn("Query is nested too deeply") : Hn(e) ? new Pn("Query result is too large") : e;
			}
		}, this.rootPayload = {
			value: e,
			paths: "$"
		}, this.adaptiveLimit = t.maxSteps === void 0, this.stepLimit = t.maxSteps ?? pi, this.retainedLimit = this.adaptiveLimit ? mi : Infinity;
	}
}, bi = (e, t, n) => {
	let r = nr(t), i = new yi(e, n).handleRoot(r);
	return !i?.isIndefinite && n.returnArray ? Wn(i) ? [] : [i.value] : i?.value;
}, xi = (e, t, n) => {
	let r = [];
	for (let i of t) {
		let t = bi(e, i, n);
		I(t) && r.push(t);
	}
	return r;
}, Si = (e, t, n = {}) => {
	try {
		return N(t) ? xi(e, t, n) : bi(e, t, n);
	} catch (e) {
		if (!n.hideExceptions) throw e;
		return n.returnArray ? [] : void 0;
	}
}, Ci = {
	buildBodyTr: {
		tagName: "tr",
		attributes: { class: "align-middle" },
		children: []
	},
	buildColGroup: {
		tagName: "col",
		attributes: { width: "${width}" }
	},
	buildHeader: {
		tagName: "th",
		textContent: "${columnName}",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	buildFooter: {
		tagName: "td",
		children: [{
			tagName: "input",
			attributes: {
				type: "text",
				placeholder: "enter ${columnName}",
				name: "${columnName}",
				id: "${columnName}",
				list: "${columnName}",
				class: "form-control"
			}
		}]
	},
	buildBodyCell: {
		tagName: "td",
		textContent: "${rowValue}",
		attributes: { class: "py-3 px-3 text-secondary" }
	},
	button: {
		tagName: "button",
		textContent: "${columnName}",
		attributes: { class: "btn btn-primary btn-sm" }
	},
	buttonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "${agg:count}",
			attributes: { class: "btn btn-primary btn-sm" }
		}]
	},
	optionsButtonCell: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "show",
			attributes: { class: "btn btn-primary btn-sm ks-btn-show" }
		}]
	},
	buildOption: {
		tagName: "option",
		textContent: "${rowValue}",
		attributes: { value: "${rowValue}" }
	},
	buildSelect: {
		tagName: "select",
		attributes: {
			id: "${columnName}",
			name: "${columnName}",
			"data-name": "${columnName}",
			class: "form-select shadow-sm mb-3"
		},
		children: []
	},
	buildDataList: {
		tagName: "datalist",
		attributes: {
			id: "${columnName}",
			"data-name": "${columnName}"
		},
		children: []
	},
	buildFormField: {
		tagName: "div",
		attributes: { class: "mb-3" },
		children: [{
			tagName: "label",
			textContent: "${columnName}",
			attributes: {
				for: "${columnName}",
				class: "form-label fw-semibold text-capitalize"
			}
		}, {
			tagName: "input",
			attributes: {
				type: "text",
				id: "${columnName}",
				name: "${columnName}",
				placeholder: "Enter ${columnName}...",
				class: "form-control"
			}
		}]
	},
	emptyCell: {
		tagName: "td",
		children: []
	},
	headerSerialCell: {
		tagName: "th",
		textContent: "#",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	colGroupForSerial: {
		tagName: "col",
		attributes: { width: "50px" }
	},
	colGroupForOption: {
		tagName: "col",
		attributes: { width: "100px" }
	},
	headerForOption: {
		tagName: "th",
		textContent: "options",
		attributes: { class: "py-3 px-3 fw-semibold text-uppercase small" }
	},
	tdWithButtonSaveWarning: {
		tagName: "td",
		attributes: { class: "py-2 px-3 text-center" },
		children: [{
			tagName: "button",
			textContent: "save",
			attributes: { class: "btn btn-warning btn-sm ks-btn-save" }
		}]
	},
	tableSearch: {
		tagName: "div",
		attributes: { class: "row mb-3 justify-content-end" },
		children: [{
			tagName: "div",
			attributes: { class: "col-md-4" },
			children: [{
				tagName: "div",
				attributes: { class: "input-group" },
				children: [{
					tagName: "span",
					attributes: { class: "input-group-text bg-white" },
					children: [{
						tagName: "i",
						attributes: { class: "bi bi-search" },
						textContent: "🔍"
					}]
				}, {
					tagName: "input",
					attributes: {
						type: "text",
						id: "tableSearch",
						class: "form-control",
						placeholder: "Search table..."
					}
				}]
			}]
		}]
	},
	tableWithSearch: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-simple-id"
		},
		children: [{
			tagName: "div",
			attributes: { class: "row mb-3 align-items-center" },
			children: [
				{
					tagName: "div",
					attributes: { class: "col-md-4 d-flex align-items-center" },
					children: [{
						tagName: "h6",
						attributes: {
							class: "mb-0 fw-semibold text-secondary",
							id: "table-title"
						},
						textContent: "Items"
					}]
				},
				{
					tagName: "div",
					attributes: { class: "col-md-4 text-center d-flex align-items-center justify-content-center" },
					children: [{
						tagName: "span",
						attributes: {
							id: "search-feedback",
							class: "badge bg-white text-secondary border px-3 py-2 small fw-normal shadow-sm"
						},
						textContent: "Showing all records"
					}]
				},
				{
					tagName: "div",
					attributes: { class: "col-md-4" },
					children: [{
						tagName: "div",
						attributes: { class: "input-group" },
						children: [{
							tagName: "span",
							attributes: { class: "input-group-text bg-white" },
							children: [{
								tagName: "i",
								attributes: { class: "bi bi-search" },
								textContent: "🔍"
							}]
						}, {
							tagName: "input",
							attributes: {
								type: "text",
								id: "tableSearch",
								class: "form-control",
								placeholder: "Search table..."
							}
						}]
					}]
				}
			]
		}, {
			tagName: "div",
			attributes: { id: "table-content-container" },
			children: [{
				tagName: "table",
				attributes: {
					class: "table table-hover table-striped align-middle border mb-0",
					id: "table-simple-table-id"
				},
				children: [
					{
						tagName: "colgroup",
						attributes: {
							"data-role": "table-colgroup",
							id: "table-simple-colgroup-id"
						},
						children: []
					},
					{
						tagName: "thead",
						attributes: {
							class: "table-dark",
							"data-role": "table-header",
							id: "table-simple-header-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-header-row",
								id: "table-simple-header-row-id"
							},
							children: []
						}]
					},
					{
						tagName: "tbody",
						attributes: {
							"data-role": "table-body",
							id: "table-simple-body-id"
						},
						children: []
					},
					{
						tagName: "tfoot",
						attributes: {
							"data-role": "table-footer",
							id: "table-simple-footer-id"
						},
						children: [{
							tagName: "tr",
							attributes: {
								"data-role": "table-footer-row",
								id: "table-simple-footer-row-id"
							},
							children: []
						}]
					}
				]
			}]
		}]
	},
	tableSimple: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-simple-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-simple-table-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-simple-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-simple-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-simple-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-simple-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-simple-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-simple-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	tableWithFooter: {
		tagName: "table",
		attributes: {
			class: "table table-hover table-striped align-middle border mb-0",
			id: "table-with-footer-id"
		},
		children: [
			{
				tagName: "colgroup",
				attributes: {
					"data-role": "table-colgroup",
					id: "table-with-footer-colgroup-id"
				},
				children: []
			},
			{
				tagName: "thead",
				attributes: {
					class: "table-dark",
					"data-role": "table-header",
					id: "table-with-footer-header-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-header-row",
						id: "table-with-footer-header-row-id"
					},
					children: []
				}]
			},
			{
				tagName: "tbody",
				attributes: {
					"data-role": "table-body",
					id: "table-with-footer-body-id"
				},
				children: []
			},
			{
				tagName: "tfoot",
				attributes: {
					"data-role": "table-footer",
					id: "table-with-footer-footer-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-footer-row",
						id: "table-with-footer-footer-row-id"
					},
					children: []
				}]
			}
		]
	},
	tableBodyOnly: {
		tagName: "div",
		attributes: { id: "ks-id" },
		children: []
	},
	tableBodyOnly1: {
		tagName: "tbody",
		attributes: {
			"data-role": "table-body",
			id: "table-body-only-id"
		},
		children: []
	},
	tableFooterOnly: {
		tagName: "tfoot",
		attributes: {
			"data-role": "table-footer",
			id: "table-footer-only-id"
		},
		children: [{
			tagName: "tr",
			attributes: {
				"data-role": "table-footer-row",
				id: "table-footer-only-footer-row-id"
			},
			children: []
		}]
	},
	tableHeaderOnly: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-simple-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-simple-table-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-simple-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-simple-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-simple-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-simple-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-simple-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-simple-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	},
	tableHeaderOnly1: {
		tagName: "table",
		attributes: {
			class: "table table-hover table-striped align-middle border mb-0",
			id: "table-header-only-id"
		},
		children: [
			{
				tagName: "colgroup",
				attributes: {
					"data-role": "table-colgroup",
					id: "table-header-only-colgroup-id"
				},
				children: []
			},
			{
				tagName: "thead",
				attributes: {
					class: "table-dark",
					"data-role": "table-header",
					id: "table-header-only-header-id"
				},
				children: [{
					tagName: "tr",
					attributes: {
						"data-role": "table-header-row",
						id: "table-header-only-header-row-id"
					},
					children: []
				}]
			},
			{
				tagName: "tbody",
				attributes: {
					"data-role": "table-body",
					id: "table-header-only-body-id"
				},
				children: []
			}
		]
	},
	tableHeaderAndFooter: {
		tagName: "div",
		attributes: {
			"data-role": "table-parent",
			id: "table-simple-id"
		},
		children: [{
			tagName: "table",
			attributes: {
				class: "table table-hover table-striped align-middle border mb-0",
				id: "table-simple-table-id"
			},
			children: [
				{
					tagName: "colgroup",
					attributes: {
						"data-role": "table-colgroup",
						id: "table-simple-colgroup-id"
					},
					children: []
				},
				{
					tagName: "thead",
					attributes: {
						class: "table-dark",
						"data-role": "table-header",
						id: "table-simple-header-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-header-row",
							id: "table-simple-header-row-id"
						},
						children: []
					}]
				},
				{
					tagName: "tbody",
					attributes: {
						"data-role": "table-body",
						id: "table-simple-body-id"
					},
					children: []
				},
				{
					tagName: "tfoot",
					attributes: {
						"data-role": "table-footer",
						id: "table-simple-footer-id"
					},
					children: [{
						tagName: "tr",
						attributes: {
							"data-role": "table-footer-row",
							id: "table-simple-footer-row-id"
						},
						children: []
					}]
				}
			]
		}]
	}
}, wi = {
	$schema: "./tags.schema.json",
	div: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["title", "role"],
		childTags: []
	},
	input: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"placeholder",
			"value",
			"name",
			"disabled",
			"readonly",
			"required",
			"list"
		]
	},
	checkbox: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"type",
			"checked",
			"name",
			"value",
			"disabled",
			"required"
		]
	},
	colgroup: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["span"],
		childTags: ["col"]
	},
	col: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"span",
			"style",
			"width"
		]
	},
	label: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["for"],
		childTags: []
	},
	form: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"action",
			"method",
			"autocomplete",
			"enctype",
			"name",
			"novalidate",
			"target"
		],
		childTags: []
	},
	select: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"name",
			"disabled",
			"required",
			"multiple",
			"size"
		],
		childTags: ["option"]
	},
	p: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h1: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	h2: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	span: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	img: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: [
			"src",
			"alt",
			"width",
			"height",
			"loading"
		]
	},
	button: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"type",
			"disabled",
			"name",
			"value"
		],
		childTags: []
	},
	table: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [
			"border",
			"cellpadding",
			"cellspacing"
		],
		childTags: [
			"caption",
			"colgroup",
			"thead",
			"tbody",
			"tfoot",
			"tr"
		]
	},
	thead: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tbody: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tfoot: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["tr"]
	},
	tr: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["td", "th"]
	},
	th: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"scope",
			"colspan",
			"rowspan"
		],
		childTags: []
	},
	td: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["colspan", "rowspan"],
		childTags: []
	},
	datalist: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: ["option"]
	},
	option: {
		allowsTextContent: !0,
		allowsChildren: !1,
		allowedAttributes: [
			"value",
			"label",
			"selected",
			"disabled"
		]
	},
	header: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["role"],
		childTags: []
	},
	a: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [
			"href",
			"target",
			"rel",
			"title",
			"download"
		],
		childTags: []
	},
	i: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["aria-hidden"],
		childTags: []
	},
	small: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: [],
		childTags: []
	},
	ul: {
		allowsTextContent: !1,
		allowsChildren: !0,
		allowedAttributes: ["type"],
		childTags: ["li"]
	},
	li: {
		allowsTextContent: !0,
		allowsChildren: !0,
		allowedAttributes: ["value"],
		childTags: []
	},
	hr: {
		allowsTextContent: !1,
		allowsChildren: !1,
		allowedAttributes: []
	}
}, Ti = {
	$schema: "https://json-schema.org/draft/2020-12/schema",
	title: "TagsCatalogSchema",
	description: "JSON Schema for @keshavsoft/spec-repo tags.json catalog",
	type: "object",
	patternProperties: { "^[a-z0-9]+$": {
		type: "object",
		required: [
			"allowsTextContent",
			"allowsChildren",
			"allowedAttributes"
		],
		properties: {
			allowsTextContent: {
				type: "boolean",
				description: "Indicates whether the element permits direct textContent"
			},
			allowsChildren: {
				type: "boolean",
				description: "Indicates whether the element can contain child DOM elements"
			},
			allowedAttributes: {
				type: "array",
				items: { type: "string" },
				description: "List of specifically allowed HTML attributes for this tag"
			},
			childTags: {
				type: "array",
				items: { type: "string" },
				description: "Permitted child tag names if restricted"
			}
		},
		additionalProperties: !1
	} }
}, Ei = {
	table: /* @__PURE__ */ JSON.parse("{\"simple\":{\"single\":[{\"narration\":\"Build column widths\",\"destinationPath\":{\"fileName\":\"base\",\"filePath\":[\"children\"],\"jsonPath\":\"$..*[?@.attributes['data-role'] == 'table-colgroup']\"},\"sourcePath\":{\"fileName\":\"data\",\"jsonPath\":\"$.columns\"},\"templateKey\":\"buildColGroup\",\"func\":\"fromCollection\"},{\"narration\":\"Build table header\",\"destinationPath\":{\"fileName\":\"base\",\"filePath\":[\"children\"],\"jsonPath\":\"$..*[?@.attributes['data-role'] == 'table-header-row']\"},\"sourcePath\":{\"fileName\":\"data\",\"jsonPath\":\"$.columns\"},\"templateKey\":\"buildHeader\",\"func\":\"fromCollection\"}],\"rowOnColumn\":[{\"narration\":\"Build table body\",\"destinationPath\":{\"fileName\":\"base\",\"jsonPath\":\"$.children[0].children[?(@.attributes['data-role'] == 'table-body')]\",\"filePath\":[\"children\"]},\"templateKey\":{\"rowKey\":\"buildBodyTr\",\"columnKey\":\"buildBodyCell\"}}],\"options\":{\"serial\":[{\"narration\":\"Prepend the serial column width to the table colgroup.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-colgroup\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"colGroupForSerial\",\"func\":null},{\"narration\":\"Prepend the serial header cell to the table header row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-header-row\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"headerSerialCell\",\"func\":null},{\"narration\":\"Prepend the serial number cell into each table body row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-body\",\"filePath\":[\"children\"],\"action\":\"unshiftSerialToRows\"},\"sourcePath\":null,\"templateKey\":\"buildBodyCell\",\"func\":null},{\"narration\":\"Prepend the serial footer cell to the table footer row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-footer-row\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"headerSerialCell\",\"func\":null}],\"options\":[{\"narration\":\"Append the options column width to the table colgroup.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-colgroup\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"colGroupForOption\",\"func\":null},{\"narration\":\"Append the options header cell to the table header row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-header-row\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"headerForOption\",\"func\":null},{\"narration\":\"Append the options button cell into each table body row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-body\",\"filePath\":[\"children\"],\"action\":\"pushToRows\"},\"sourcePath\":null,\"templateKey\":\"optionsButtonCell\",\"func\":null},{\"narration\":\"Append the options footer cell to the table footer row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-footer-row\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"tdWithButtonSaveWarning\",\"func\":null}],\"search\":[{\"narration\":\"Prepend the search row to top of the table.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-parent\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"tableSearch\",\"func\":null}]},\"baseFromSpec\":\"tableSimple\"},\"withFooter\":{\"single\":[{\"narration\":\"Build column widths\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-colgroup\",\"filePath\":[\"children\"]},\"sourcePath\":{\"fileName\":\"data\",\"filePath\":[\"columns\"]},\"templateKey\":\"buildColGroup\",\"func\":\"fromCollection\"},{\"narration\":\"Build table header\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-header-row\",\"filePath\":[\"children\"]},\"sourcePath\":{\"fileName\":\"data\",\"filePath\":[\"columns\"]},\"templateKey\":\"buildHeader\",\"func\":\"fromCollection\"},{\"narration\":\"Build footer input cells\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-footer-row\",\"filePath\":[\"children\"]},\"sourcePath\":{\"fileName\":\"data\",\"filePath\":[\"columns\"]},\"templateKey\":\"buildFooter\",\"func\":\"fromCollection\"}],\"double\":[{\"narration\":\"Build table body\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-body\",\"filePath\":[\"children\"]},\"sourcePath\":{\"fileName\":\"data\",\"filePath\":[\"columns\"]},\"func\":\"twoDimensional\"}],\"baseFromSpec\":\"tableWithFooter\"},\"bodyOnly\":{\"rowOnColumn\":[{\"narration\":\"Build table body\",\"destinationPath\":{\"fileName\":\"base\",\"jsonPath\":\"$\",\"filePath\":[\"children\"]},\"destinationPath1\":{\"fileName\":\"base\",\"jsonPath\":\"$.children[0].children[?(@.attributes['data-role'] == 'table-body')]\",\"filePath\":[\"children\"]},\"templateKey\":{\"rowKey\":\"buildBodyTr\",\"columnKey\":\"buildBodyCell\"}}],\"options\":{\"serial\":[{\"narration\":\"Prepend the serial column width to the table colgroup.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-colgroup\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"colGroupForSerial\",\"func\":null},{\"narration\":\"Prepend the serial header cell to the table header row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-header-row\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"headerSerialCell\",\"func\":null},{\"narration\":\"Prepend the serial number cell into each table body row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-body\",\"filePath\":[\"children\"],\"action\":\"unshiftSerialToRows\"},\"sourcePath\":null,\"templateKey\":\"buildBodyCell\",\"func\":null},{\"narration\":\"Prepend the serial footer cell to the table footer row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-footer-row\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"headerSerialCell\",\"func\":null}],\"options\":[{\"narration\":\"Append the options column width to the table colgroup.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-colgroup\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"colGroupForOption\",\"func\":null},{\"narration\":\"Append the options header cell to the table header row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-header-row\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"headerForOption\",\"func\":null},{\"narration\":\"Append the options button cell into each table body row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-body\",\"filePath\":[\"children\"],\"action\":\"pushToRows\"},\"sourcePath\":null,\"templateKey\":\"optionsButtonCell\",\"func\":null},{\"narration\":\"Append the options footer cell to the table footer row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-footer-row\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"tdWithButtonSaveWarning\",\"func\":null}],\"search\":[{\"narration\":\"Prepend the search row to top of the table.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-parent\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"tableSearch\",\"func\":null}]},\"baseFromSpec\":\"tableBodyOnly\"},\"bodyOnly1\":{\"single\":[],\"double\":[{\"narration\":\"Build table body\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-body\",\"filePath\":[\"children\"]},\"sourcePath\":{\"fileName\":\"data\",\"filePath\":[\"columns\"]},\"func\":\"twoDimensional\"}],\"baseFromSpec\":\"tableBodyOnly1\"},\"footerOnly\":{\"single\":[{\"narration\":\"Build footer input cells\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-footer-row\",\"filePath\":[\"children\"]},\"sourcePath\":{\"fileName\":\"data\",\"filePath\":[\"columns\"]},\"templateKey\":\"buildFooter\",\"func\":\"fromCollection\"}],\"double\":[],\"baseFromSpec\":\"tableFooterOnly\"},\"headerOnly\":{\"single\":[{\"narration\":\"Build column widths\",\"destinationPath\":{\"fileName\":\"base\",\"filePath\":[\"children\"],\"jsonPath\":\"$..*[?@.attributes['data-role'] == 'table-colgroup']\"},\"sourcePath\":{\"fileName\":\"data\",\"jsonPath\":\"$.columns\"},\"templateKey\":\"buildColGroup\",\"func\":\"fromCollection\"},{\"narration\":\"Build table header\",\"destinationPath\":{\"fileName\":\"base\",\"filePath\":[\"children\"],\"jsonPath\":\"$..*[?@.attributes['data-role'] == 'table-header-row']\"},\"sourcePath\":{\"fileName\":\"data\",\"jsonPath\":\"$.columns\"},\"templateKey\":\"buildHeader\",\"func\":\"fromCollection\"}],\"options\":{\"serial\":[{\"narration\":\"Prepend the serial column width to the table colgroup.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-colgroup\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"colGroupForSerial\",\"func\":null},{\"narration\":\"Prepend the serial header cell to the table header row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-header-row\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"headerSerialCell\",\"func\":null},{\"narration\":\"Prepend the serial number cell into each table body row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-body\",\"filePath\":[\"children\"],\"action\":\"unshiftSerialToRows\"},\"sourcePath\":null,\"templateKey\":\"buildBodyCell\",\"func\":null},{\"narration\":\"Prepend the serial footer cell to the table footer row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-footer-row\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"headerSerialCell\",\"func\":null}],\"options\":[{\"narration\":\"Append the options column width to the table colgroup.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-colgroup\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"colGroupForOption\",\"func\":null},{\"narration\":\"Append the options header cell to the table header row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-header-row\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"headerForOption\",\"func\":null},{\"narration\":\"Append the options button cell into each table body row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-body\",\"filePath\":[\"children\"],\"action\":\"pushToRows\"},\"sourcePath\":null,\"templateKey\":\"optionsButtonCell\",\"func\":null},{\"narration\":\"Append the options footer cell to the table footer row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-footer-row\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"tdWithButtonSaveWarning\",\"func\":null}],\"search\":[{\"narration\":\"Prepend the search row to top of the table.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-parent\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"tableSearch\",\"func\":null}]},\"baseFromSpec\":\"tableHeaderOnly\"},\"headerOnly1\":{\"single\":[{\"narration\":\"Build column widths\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-colgroup\",\"filePath\":[\"children\"]},\"sourcePath\":{\"fileName\":\"data\",\"filePath\":[\"columns\"]},\"templateKey\":\"buildColGroup\",\"func\":\"fromCollection\"},{\"narration\":\"Build table header\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-header-row\",\"filePath\":[\"children\"]},\"sourcePath\":{\"fileName\":\"data\",\"filePath\":[\"columns\"]},\"templateKey\":\"buildHeader\",\"func\":\"fromCollection\"}],\"double\":[],\"baseFromSpec\":\"tableHeaderOnly1\"},\"options\":{\"serial\":[{\"narration\":\"Prepend the serial column width to the table colgroup.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-colgroup\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"colGroupForSerial\",\"func\":null},{\"narration\":\"Prepend the serial header cell to the table header row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-header-row\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"headerSerialCell\",\"func\":null},{\"narration\":\"Prepend the serial number cell into each table body row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-body\",\"filePath\":[\"children\"],\"action\":\"unshiftSerialToRows\"},\"sourcePath\":null,\"templateKey\":\"buildBodyCell\",\"func\":null},{\"narration\":\"Prepend the serial footer cell to the table footer row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-footer-row\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"headerSerialCell\",\"func\":null}],\"options\":[{\"narration\":\"Append the options column width to the table colgroup.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-colgroup\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"colGroupForOption\",\"func\":null},{\"narration\":\"Append the options header cell to the table header row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-header-row\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"headerForOption\",\"func\":null},{\"narration\":\"Append the options button cell into each table body row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-body\",\"filePath\":[\"children\"],\"action\":\"pushToRows\"},\"sourcePath\":null,\"templateKey\":\"optionsButtonCell\",\"func\":null},{\"narration\":\"Append the options footer cell to the table footer row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-footer-row\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"tdWithButtonSaveWarning\",\"func\":null}],\"search\":[{\"narration\":\"Prepend the search row to top of the table.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-parent\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"tableSearch\",\"func\":null}]},\"headerAndFooter\":{\"single\":[{\"narration\":\"Build column widths\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-colgroup\",\"filePath\":[\"children\"]},\"sourcePath\":{\"fileName\":\"data\",\"filePath\":[\"columns\"]},\"templateKey\":\"buildColGroup\",\"func\":\"fromCollection\"},{\"narration\":\"Build table header\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-header-row\",\"filePath\":[\"children\"]},\"sourcePath\":{\"fileName\":\"data\",\"filePath\":[\"columns\"]},\"templateKey\":\"buildHeader\",\"func\":\"fromCollection\"}],\"double\":[{\"narration\":\"Build table body\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-body\",\"filePath\":[\"children\"]},\"sourcePath\":{\"fileName\":\"data\",\"filePath\":[\"columns\"]},\"templateKey\":{\"rowKey\":\"buildBodyTr\",\"columnKey\":\"buildBodyCell\"},\"func\":\"twoDimensional\"}],\"rowOnColumn\":[{\"narration\":\"Build table body\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-body\",\"filePath\":[\"children\"]},\"templateKey\":{\"rowKey\":\"buildBodyTr\",\"columnKey\":\"buildBodyCell\"}}],\"options\":{\"serial\":[{\"narration\":\"Prepend the serial column width to the table colgroup.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-colgroup\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"colGroupForSerial\",\"func\":null},{\"narration\":\"Prepend the serial header cell to the table header row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-header-row\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"headerSerialCell\",\"func\":null},{\"narration\":\"Prepend the serial number cell into each table body row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-body\",\"filePath\":[\"children\"],\"action\":\"unshiftSerialToRows\"},\"sourcePath\":null,\"templateKey\":\"buildBodyCell\",\"func\":null},{\"narration\":\"Prepend the serial footer cell to the table footer row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-footer-row\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"headerSerialCell\",\"func\":null}],\"options\":[{\"narration\":\"Append the options column width to the table colgroup.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-colgroup\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"colGroupForOption\",\"func\":null},{\"narration\":\"Append the options header cell to the table header row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-header-row\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"headerForOption\",\"func\":null},{\"narration\":\"Append the options button cell into each table body row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-body\",\"filePath\":[\"children\"],\"action\":\"pushToRows\"},\"sourcePath\":null,\"templateKey\":\"optionsButtonCell\",\"func\":null},{\"narration\":\"Append the options footer cell to the table footer row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-footer-row\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"tdWithButtonSaveWarning\",\"func\":null}],\"search\":[{\"narration\":\"Prepend the search row to top of the table.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-parent\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"tableSearch\",\"func\":null}]},\"baseFromSpec\":\"tableHeaderAndFooter\"},\"withSearch\":{\"baseFromSpec\":\"tableWithSearch\",\"single\":[{\"narration\":\"Build column widths\",\"destinationPath\":{\"fileName\":\"base\",\"filePath\":[\"children\"],\"jsonPath\":\"$..*[?@.attributes['data-role'] == 'table-colgroup']\"},\"sourcePath\":{\"fileName\":\"data\",\"jsonPath\":\"$.columns\"},\"templateKey\":\"buildColGroup\",\"func\":\"fromCollection\"},{\"narration\":\"Build table header\",\"destinationPath\":{\"fileName\":\"base\",\"filePath\":[\"children\"],\"jsonPath\":\"$..*[?@.attributes['data-role'] == 'table-header-row']\"},\"sourcePath\":{\"fileName\":\"data\",\"jsonPath\":\"$.columns\"},\"templateKey\":\"buildHeader\",\"func\":\"fromCollection\"}],\"rowOnColumn\":[{\"narration\":\"Build table body\",\"destinationPath\":{\"fileName\":\"base\",\"filePath\":[\"children\"],\"jsonPath\":\"$..*[?@.attributes['data-role'] == 'table-body']\"},\"templateKey\":{\"rowKey\":\"buildBodyTr\",\"columnKey\":\"buildBodyCell\"}}],\"options\":{\"serial\":[{\"narration\":\"Prepend the serial column width to the table colgroup.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-colgroup\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"colGroupForSerial\",\"func\":null},{\"narration\":\"Prepend the serial header cell to the table header row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-header-row\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"headerSerialCell\",\"func\":null},{\"narration\":\"Prepend the serial number cell into each table body row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-body\",\"filePath\":[\"children\"],\"action\":\"unshiftSerialToRows\"},\"sourcePath\":null,\"templateKey\":\"buildBodyCell\",\"func\":null},{\"narration\":\"Prepend the serial footer cell to the table footer row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-footer-row\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"headerSerialCell\",\"func\":null}],\"options\":[{\"narration\":\"Append the options column width to the table colgroup.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-colgroup\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"colGroupForOption\",\"func\":null},{\"narration\":\"Append the options header cell to the table header row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-header-row\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"headerForOption\",\"func\":null},{\"narration\":\"Append the options button cell into each table body row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-body\",\"filePath\":[\"children\"],\"action\":\"pushToRows\"},\"sourcePath\":null,\"templateKey\":\"optionsButtonCell\",\"func\":null},{\"narration\":\"Append the options footer cell to the table footer row.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-footer-row\",\"filePath\":[\"children\"],\"action\":\"push\"},\"sourcePath\":null,\"templateKey\":\"tdWithButtonSaveWarning\",\"func\":null}],\"search\":[{\"narration\":\"Prepend the search row to top of the table.\",\"destinationPath\":{\"fileName\":\"base\",\"dataRole\":\"table-parent\",\"filePath\":[\"children\"],\"action\":\"unshift\"},\"sourcePath\":null,\"templateKey\":\"tableSearch\",\"func\":null}]}}}"),
	select: {
		base: {
			tagName: "div",
			attributes: {
				"data-role": "select-container",
				id: "select-base-id"
			},
			children: []
		},
		single: [{
			narration: "Build select options",
			destinationPath: {
				fileName: "base",
				filePath: ["children"]
			},
			sourcePath: {
				fileName: "data",
				filePath: ["data"]
			},
			templateKey: "buildOption",
			func: "fromCollection"
		}],
		double: [],
		columnOnRow: [{
			narration: "Build selects with options",
			destinationPath: {
				fileName: "base",
				filePath: ["children"]
			},
			templateKey: {
				columnKey: "buildSelect",
				rowKey: "buildOption"
			}
		}]
	},
	dataList: {
		simple: {
			base: {
				tagName: "div",
				attributes: {
					"data-role": "datalist-container",
					id: "data-list-simple-id"
				},
				children: []
			},
			single: [],
			double: [],
			columnOnRow: [{
				narration: "Build datalists with options",
				destinationPath: {
					fileName: "base",
					filePath: ["children"]
				},
				templateKey: {
					columnKey: "buildDataList",
					rowKey: "buildOption"
				}
			}]
		},
		base: {
			tagName: "div",
			attributes: {
				"data-role": "datalist-container",
				id: "data-list-base-id"
			},
			children: []
		},
		single: [],
		double: [],
		columnOnRow: [{
			narration: "Build datalists with options",
			destinationPath: {
				fileName: "base",
				filePath: ["children"]
			},
			templateKey: {
				columnKey: "buildDataList",
				rowKey: "buildOption"
			}
		}]
	},
	selectOptionsOnly: {
		base: [],
		single: [{
			narration: "Build options array",
			destinationPath: {
				fileName: "base",
				filePath: []
			},
			sourcePath: {
				fileName: "data",
				filePath: ["data"]
			},
			templateKey: "buildOption",
			func: "fromCollection"
		}],
		double: []
	},
	searchInput: {
		base: {
			tagName: "div",
			attributes: {
				class: "d-flex align-items-center gap-2",
				id: "search-input-base-id"
			},
			children: [{
				tagName: "label",
				textContent: "${label}",
				attributes: {
					class: "form-label mb-0 text-nowrap fw-semibold",
					for: "${id}",
					id: "search-input-label-id"
				}
			}, {
				tagName: "input",
				attributes: {
					type: "search",
					placeholder: "${placeholder}",
					class: "form-control",
					id: "search-input-field-id"
				}
			}]
		},
		single: [],
		double: []
	},
	form: {
		simple: {
			base: {
				tagName: "div",
				attributes: {
					class: "card shadow-sm border-0",
					id: "form-simple-id"
				},
				children: [
					{
						tagName: "div",
						attributes: {
							class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center",
							id: "form-simple-header-id"
						},
						children: [{
							tagName: "h2",
							textContent: "Data Entry Form",
							attributes: {
								class: "h5 fw-bold mb-0 text-dark",
								id: "form-simple-title-id"
							}
						}]
					},
					{
						tagName: "div",
						attributes: {
							class: "card-body p-4",
							id: "form-simple-body-id"
						},
						children: [{
							tagName: "form",
							attributes: {
								id: "form-simple-form-id",
								"data-role": "form-body"
							},
							children: []
						}]
					},
					{
						tagName: "div",
						attributes: {
							class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2",
							id: "form-simple-footer-id"
						},
						children: [{
							tagName: "button",
							textContent: "Reset",
							attributes: {
								type: "reset",
								class: "btn btn-outline-secondary",
								id: "form-simple-reset-button-id"
							}
						}, {
							tagName: "button",
							textContent: "Submit",
							attributes: {
								type: "submit",
								class: "btn btn-primary",
								id: "form-simple-submit-button-id"
							}
						}]
					}
				]
			},
			single: [{
				narration: "Build form fields from columns",
				destinationPath: {
					fileName: "base",
					dataRole: "form-body",
					filePath: ["children"]
				},
				sourcePath: {
					fileName: "data",
					filePath: ["columns"]
				},
				templateKey: "buildFormField",
				func: "fromCollection"
			}],
			double: []
		},
		base: {
			tagName: "div",
			attributes: {
				class: "card shadow-sm border-0",
				id: "form-base-id"
			},
			children: [
				{
					tagName: "div",
					attributes: {
						class: "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center",
						id: "form-base-header-id"
					},
					children: [{
						tagName: "h2",
						textContent: "Data Entry Form",
						attributes: {
							class: "h5 fw-bold mb-0 text-dark",
							id: "form-base-title-id"
						}
					}]
				},
				{
					tagName: "div",
					attributes: {
						class: "card-body p-4",
						id: "form-base-body-id"
					},
					children: [{
						tagName: "form",
						attributes: {
							id: "form-base-form-id",
							"data-role": "form-body"
						},
						children: []
					}]
				},
				{
					tagName: "div",
					attributes: {
						class: "card-footer bg-light px-4 py-3 d-flex justify-content-end gap-2",
						id: "form-base-footer-id"
					},
					children: [{
						tagName: "button",
						textContent: "Reset",
						attributes: {
							type: "reset",
							class: "btn btn-outline-secondary",
							id: "form-base-reset-button-id"
						}
					}, {
						tagName: "button",
						textContent: "Submit",
						attributes: {
							type: "submit",
							class: "btn btn-primary",
							id: "form-base-submit-button-id"
						}
					}]
				}
			]
		},
		single: [{
			narration: "Build form fields from columns",
			destinationPath: {
				fileName: "base",
				dataRole: "form-body",
				filePath: ["children"]
			},
			sourcePath: {
				fileName: "data",
				filePath: ["columns"]
			},
			templateKey: "buildFormField",
			func: "fromCollection"
		}],
		double: []
	}
}, Di = {
	name: "spec-repo",
	version: "1.12.1"
}, Oi = ({ spec: e, tags: t, tagsSchema: n, definitions: r }) => {
	typeof globalThis < "u" && e && t && n && r && (globalThis.ks ??= {}, globalThis.ks.specs ??= {}, globalThis.ks.specs.jsonFiles = {
		meta: Di,
		spec: e,
		tags: t,
		tagsSchema: n,
		definitions: r
	});
}, ki = Ci;
Oi({
	spec: Ci,
	tags: wi,
	tagsSchema: Ti,
	definitions: Ei
});
// ../json-instruction-single/src/v8/getResult.js
var Ai = {
	applyTemplate: un,
	fromCollection: Cn
}, ji = (e, t, n) => {
	let r = e?.sourcePath;
	if (r === null) return null;
	if (r?.jsonPath) {
		let e = t?.[r.fileName];
		if (e === void 0) throw Error(`Registry entry not found: ${r.fileName}`);
		let i = Si(e, r.jsonPath, { returnArray: !0 });
		if (i.length !== 1) throw Error(`Source JSONPath must identify exactly one value; matched ${i.length}: ${r.jsonPath}`);
		return n && console.log("json-instruction-single v8 source:", r, i[0]), i[0];
	}
	return Tn(t, r);
}, Mi = (e, t, n) => {
	let r = (t?.spec ?? ki)[e.templateKey], i = ji(e, t, n), a = e?.func === null ? r : Ai[e.func](i, r);
	return i === null ? r : a;
}, Ni = (e, t, n) => {
	n && console.log("runSingleInstruction v8:", e);
	let r = Mi(e, t, n);
	return n && console.log("runSingleInstruction v8 result:", r), en(t, e.destinationPath, r, n), r;
}, Pi = (e, t, n, r) => (e.forEach((e) => Ni(e, t, n, r)), t), Fi = (e) => typeof e == "object" && !!e && !Array.isArray(e), Ii = (e, t) => {
	if (!Fi(e)) return;
	let n = {};
	for (let [r, i] of Object.entries(e)) n[r] = Ui(t, i);
	return n;
}, Li = (e, t) => {
	let n = structuredClone(e);
	if (Array.isArray(n)) return n.map((e) => Ui(t, e));
}, Ri = (e, t, n) => {
	if (e === "${agg:count}" && "rowData" in t) {
		if (Array.isArray(t?.rowData)) return t?.rowData.length;
	} else if (e === "${rowValue}" && "rowData" in t) return t?.rowData;
	else return e.replace(/\$\{(\w+)\}/g, (e, n) => t[n] === void 0 ? e : t[n]);
}, zi = (e, t) => Ri(e, t), Bi = (e, t, n) => {
	if (n && console.log("inElement : ", e), n && console.log("inTemplate : ", t), t == null) throw TypeError("inTemplate is required");
	if (typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError("inElement must be an object");
	return !0;
}, Vi = {
	name: "json-transformer-funcs-primitive",
	version: "1.9.1"
}, Hi = (e) => {
	typeof globalThis < "u" && e && (globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.primitive = {
		meta: Vi,
		applyTemplate: e
	});
}, Ui = (e, t, n) => {
	let r = e, i = t;
	Bi(r, i, n);
	let a = structuredClone(i);
	return typeof a == "string" ? Ri(a, r) : (typeof a != "object" || !a || ("textContent" in a && (a.textContent = zi(a?.textContent, r)), "attributes" in a && (a.attributes = Ii(a?.attributes, r)), "children" in a && (a.children = Li(a?.children, r))), a);
};
Hi(Ui);
// node_modules/json-transformer-funcs-one-dimension/src/v9/guard/index.js
var Wi = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inSource must be an Array");
	if (e.length === 0) throw Error("inSource cannot be empty");
	for (let t = 0; t < e.length; t++) if (!e[t] || typeof e[t] != "object") throw TypeError(`inSource[${t}] must be an object`);
	if (!t || typeof t != "object" && typeof t != "string") throw TypeError("inTemplate must be an object or string");
	return !0;
}, Gi = {
	name: "json-transformer-funcs-one-dimension",
	version: "1.9.1"
}, Ki = (e, t) => {
	if (typeof globalThis < "u") return globalThis.ks ??= {}, globalThis.ks.transformer ??= {}, globalThis.ks.transformer.funcs ??= {}, globalThis.ks.transformer.funcs.oneDimension = {
		meta: Gi,
		individualTemplate: e,
		template: t
	}, globalThis.ks.transformer.funcs.oneDimension;
}, Y = (e, t) => {
	let n = e, r = t;
	return Wi(n, r), n.map((e) => Ui(e, r));
};
Ki((e, t) => {
	let n = e;
	return Wi(n, t), n.map((e) => Ui(e, e[t]));
}, Y);
// node_modules/json-transformer-funcs-two-dimensions/src/v8/addRowData.js
var qi = (e, t) => e.map((e) => ({
	...e,
	rowData: t[e.columnName]
})), Ji = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inColumns must be an Array");
	if (e.length === 0) throw Error("inColumns cannot be empty");
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (!n || typeof n != "object") throw TypeError(`inColumns[${t}] must be an object`);
		if (typeof n.columnName != "string" || !n.columnName.trim()) throw TypeError(`inColumns[${t}].columnName must be a non-empty string`);
	}
	if (!Array.isArray(t)) throw TypeError("inData must be an Array");
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (!n || typeof n != "object") throw TypeError(`inData[${e}] must be an object`);
	}
	return !0;
}, Yi = {
	applyTemplate: Ui,
	fromCollection: Y,
	twoDimensional: ({ columns: e, data: t, columnSpec: n, rowSpec: r }) => {
		Ji(e, t);
		let i = e;
		return t.map((e) => {
			let t = Ui(e, r);
			return t.children = Y(qi(i, e), n), t;
		});
	}
}, Xi = ({ instruction: e, registry: t, showLog: n, returnLog: r }) => {
	let i = ki, a = Yi[e.func]({
		columns: t?.data?.columns,
		data: t?.data?.data,
		columnSpec: i[e?.templateKey?.columnKey],
		rowSpec: i[e?.templateKey?.rowKey]
	});
	en(t, e.destinationPath, a);
}, Zi = ({ instructions: e, registry: t, showLog: n, returnLog: r }) => {
	e.forEach((e) => {
		Xi({
			instruction: e,
			registry: t,
			showLog: n,
			returnLog: r
		});
	});
}, Qi = (e, t) => e.map((e) => ({
	...e,
	rowData: t[e.columnName]
})), X = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inColumns must be an Array");
	if (e.length === 0) throw Error("inColumns cannot be empty");
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (!n || typeof n != "object") throw TypeError(`inColumns[${t}] must be an object`);
		if (typeof n.columnName != "string" || !n.columnName.trim()) throw TypeError(`inColumns[${t}].columnName must be a non-empty string`);
	}
	if (!Array.isArray(t)) throw TypeError("inData must be an Array");
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (!n || typeof n != "object") throw TypeError(`inData[${e}] must be an object`);
	}
	return !0;
}, $i = ({ columns: e, data: t, columnSpec: n, rowSpec: r }) => (X(e, t), t.map((t) => {
	let i = Ui(t, r);
	return i.children = Y(Qi(e, t), n), i;
})), ea = (e, t) => t.map((t) => ({
	...e,
	rowData: t[e.columnName]
})), ta = (e, t) => {
	if (!Array.isArray(e)) throw TypeError("inColumns must be an Array");
	if (e.length === 0) throw Error("inColumns cannot be empty");
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (!n || typeof n != "object") throw TypeError(`inColumns[${t}] must be an object`);
		if (typeof n.columnName != "string" || !n.columnName.trim()) throw TypeError(`inColumns[${t}].columnName must be a non-empty string`);
	}
	if (!Array.isArray(t)) throw TypeError("inData must be an Array");
	for (let e = 0; e < t.length; e++) {
		let n = t[e];
		if (!n || typeof n != "object") throw TypeError(`inData[${e}] must be an object`);
	}
	return !0;
}, na = ({ columns: e, data: t, columnSpec: n, rowSpec: r }) => (ta(e, t), e.map((e) => {
	let i = Ui(e, n);
	return i.children = t.length > 0 ? Y(ea(e, t), r) : [], i;
})), ra = ({ instructions: e = [], base: t, data: n, showLog: r = !1 } = {}) => {
	e.forEach((e) => {
		let i = ki[e?.templateKey?.columnKey], a = ki[e?.templateKey?.rowKey], o = $i({
			columns: n?.columns,
			data: n?.data,
			columnSpec: i,
			rowSpec: a
		});
		r && console.log("[runInstructions:rowOnColumn]", e.narration, o), en({
			base: t,
			data: n
		}, e.destinationPath, o);
	});
}, ia = ({ instructions: e = [], base: t, data: n, showLog: r = !1 } = {}) => {
	e.forEach((e) => {
		let i = ki[e?.templateKey?.columnKey], a = ki[e?.templateKey?.rowKey], o = na({
			columns: n?.columns,
			data: n?.data,
			columnSpec: i,
			rowSpec: a
		});
		r && console.log("[runInstructions:columnOnRow]", e.narration, o), en({
			base: t,
			data: n
		}, e.destinationPath, o);
	});
}, aa = ({ single: e = [], double: t = [], rowOnColumn: n = [], columnOnRow: r = [], base: i, data: a, showLog: o = !1 } = {}) => {
	if (o && console.log("runInstructions input:", {
		single: e,
		double: t,
		rowOnColumn: n,
		columnOnRow: r,
		base: i,
		data: a
	}), !Array.isArray(e)) throw TypeError("single instructions must be an array");
	if (!Array.isArray(t)) throw TypeError("double instructions must be an array");
	if (!Array.isArray(n)) throw TypeError("rowOnColumn instructions must be an array");
	if (!Array.isArray(r)) throw TypeError("columnOnRow instructions must be an array");
	let s = {
		base: i,
		data: a
	};
	return e.length > 0 && Pi(e, s, o), t.length > 0 && Zi({
		instructions: t,
		registry: s,
		showLog: o
	}), n.length > 0 && ra({
		instructions: n,
		base: i,
		data: a,
		showLog: o
	}), r.length > 0 && ia({
		instructions: r,
		base: i,
		data: a,
		showLog: o
	}), s;
};
export { aa as default, aa as runInstructions };
