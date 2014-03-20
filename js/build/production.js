/*! jQuery v2.0.3 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery-2.0.3.min.map
*/
(function(e,undefined){var t,n,r=typeof undefined,i=e.location,o=e.document,s=o.documentElement,a=e.jQuery,u=e.$,l={},c=[],p="2.0.3",f=c.concat,h=c.push,d=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,x=function(e,n){return new x.fn.init(e,n,t)},b=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^-ms-/,N=/-([\da-z])/gi,E=function(e,t){return t.toUpperCase()},S=function(){o.removeEventListener("DOMContentLoaded",S,!1),e.removeEventListener("load",S,!1),x.ready()};x.fn=x.prototype={jquery:p,constructor:x,init:function(e,t,n){var r,i;if(!e)return this;if("string"==typeof e){if(r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:T.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof x?t[0]:t,x.merge(this,x.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:o,!0)),C.test(r[1])&&x.isPlainObject(t))for(r in t)x.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=o.getElementById(r[2]),i&&i.parentNode&&(this.length=1,this[0]=i),this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?n.ready(e):(e.selector!==undefined&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return d.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[1]||{},a=2),"object"==typeof s||x.isFunction(s)||(s={}),u===a&&(s=this,--a);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(l&&r&&(x.isPlainObject(r)||(i=x.isArray(r)))?(i?(i=!1,o=n&&x.isArray(n)?n:[]):o=n&&x.isPlainObject(n)?n:{},s[t]=x.extend(l,o,r)):r!==undefined&&(s[t]=r));return s},x.extend({expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=a),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){(e===!0?--x.readyWait:x.isReady)||(x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(o,[x]),x.fn.trigger&&x(o).trigger("ready").off("ready")))},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if("object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}return!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:JSON.parse,parseXML:function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=undefined}return(!t||t.getElementsByTagName("parsererror").length)&&x.error("Invalid XML: "+e),t},noop:function(){},globalEval:function(e){var t,n=eval;e=x.trim(e),e&&(1===e.indexOf("use strict")?(t=o.createElement("script"),t.text=e,o.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(k,"ms-").replace(N,E)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,s=j(e);if(n){if(s){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(s){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:function(e){return null==e?"":v.call(e)},makeArray:function(e,t){var n=t||[];return null!=e&&(j(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:g.call(t,e,n)},merge:function(e,t){var n=t.length,r=e.length,i=0;if("number"==typeof n)for(;n>i;i++)e[r++]=t[i];else while(t[i]!==undefined)e[r++]=t[i++];return e.length=r,e},grep:function(e,t,n){var r,i=[],o=0,s=e.length;for(n=!!n;s>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,s=j(e),a=[];if(s)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(a[a.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(a[a.length]=r);return f.apply([],a)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),x.isFunction(e)?(r=d.call(arguments,2),i=function(){return e.apply(t||this,r.concat(d.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):undefined},access:function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;if("object"===x.type(n)){i=!0;for(a in n)x.access(e,t,a,n[a],!0,o,s)}else if(r!==undefined&&(i=!0,x.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(x(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:l?t.call(e):u?t(e[0],n):o},now:Date.now,swap:function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i}}),x.ready.promise=function(t){return n||(n=x.Deferred(),"complete"===o.readyState?setTimeout(x.ready):(o.addEventListener("DOMContentLoaded",S,!1),e.addEventListener("load",S,!1))),n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function j(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}t=x(o),function(e,undefined){var t,n,r,i,o,s,a,u,l,c,p,f,h,d,g,m,y,v="sizzle"+-new Date,b=e.document,w=0,T=0,C=st(),k=st(),N=st(),E=!1,S=function(e,t){return e===t?(E=!0,0):0},j=typeof undefined,D=1<<31,A={}.hasOwnProperty,L=[],q=L.pop,H=L.push,O=L.push,F=L.slice,P=L.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",W="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",$=W.replace("w","w#"),B="\\["+M+"*("+W+")"+M+"*(?:([*^$|!~]?=)"+M+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+$+")|)|)"+M+"*\\]",I=":("+W+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+B.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=RegExp("^"+M+"*,"+M+"*"),X=RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=RegExp(M+"*[+~]"),Y=RegExp("="+M+"*([^\\]'\"]*)"+M+"*\\]","g"),V=RegExp(I),G=RegExp("^"+$+"$"),J={ID:RegExp("^#("+W+")"),CLASS:RegExp("^\\.("+W+")"),TAG:RegExp("^("+W.replace("w","w*")+")"),ATTR:RegExp("^"+B),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:RegExp("^(?:"+R+")$","i"),needsContext:RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Q=/^[^{]+\{\s*\[native \w/,K=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Z=/^(?:input|select|textarea|button)$/i,et=/^h\d$/i,tt=/'|\\/g,nt=RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),rt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{O.apply(L=F.call(b.childNodes),b.childNodes),L[b.childNodes.length].nodeType}catch(it){O={apply:L.length?function(e,t){H.apply(e,F.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function ot(e,t,r,i){var o,s,a,u,l,f,g,m,x,w;if((t?t.ownerDocument||t:b)!==p&&c(t),t=t||p,r=r||[],!e||"string"!=typeof e)return r;if(1!==(u=t.nodeType)&&9!==u)return[];if(h&&!i){if(o=K.exec(e))if(a=o[1]){if(9===u){if(s=t.getElementById(a),!s||!s.parentNode)return r;if(s.id===a)return r.push(s),r}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(a))&&y(t,s)&&s.id===a)return r.push(s),r}else{if(o[2])return O.apply(r,t.getElementsByTagName(e)),r;if((a=o[3])&&n.getElementsByClassName&&t.getElementsByClassName)return O.apply(r,t.getElementsByClassName(a)),r}if(n.qsa&&(!d||!d.test(e))){if(m=g=v,x=t,w=9===u&&e,1===u&&"object"!==t.nodeName.toLowerCase()){f=gt(e),(g=t.getAttribute("id"))?m=g.replace(tt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",l=f.length;while(l--)f[l]=m+mt(f[l]);x=U.test(e)&&t.parentNode||t,w=f.join(",")}if(w)try{return O.apply(r,x.querySelectorAll(w)),r}catch(T){}finally{g||t.removeAttribute("id")}}}return kt(e.replace(z,"$1"),t,r,i)}function st(){var e=[];function t(n,r){return e.push(n+=" ")>i.cacheLength&&delete t[e.shift()],t[n]=r}return t}function at(e){return e[v]=!0,e}function ut(e){var t=p.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function lt(e,t){var n=e.split("|"),r=e.length;while(r--)i.attrHandle[n[r]]=t}function ct(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function pt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return at(function(t){return t=+t,at(function(n,r){var i,o=e([],n.length,t),s=o.length;while(s--)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}s=ot.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},n=ot.support={},c=ot.setDocument=function(e){var t=e?e.ownerDocument||e:b,r=t.defaultView;return t!==p&&9===t.nodeType&&t.documentElement?(p=t,f=t.documentElement,h=!s(t),r&&r.attachEvent&&r!==r.top&&r.attachEvent("onbeforeunload",function(){c()}),n.attributes=ut(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ut(function(e){return e.appendChild(t.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=ut(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),n.getById=ut(function(e){return f.appendChild(e).id=v,!t.getElementsByName||!t.getElementsByName(v).length}),n.getById?(i.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){return e.getAttribute("id")===t}}):(delete i.find.ID,i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=n.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==j?t.getElementsByTagName(e):undefined}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.CLASS=n.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==j&&h?t.getElementsByClassName(e):undefined},g=[],d=[],(n.qsa=Q.test(t.querySelectorAll))&&(ut(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll(":checked").length||d.push(":checked")}),ut(function(e){var n=t.createElement("input");n.setAttribute("type","hidden"),e.appendChild(n).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&d.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||d.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),d.push(",.*:")})),(n.matchesSelector=Q.test(m=f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&ut(function(e){n.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",I)}),d=d.length&&RegExp(d.join("|")),g=g.length&&RegExp(g.join("|")),y=Q.test(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},S=f.compareDocumentPosition?function(e,r){if(e===r)return E=!0,0;var i=r.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(r);return i?1&i||!n.sortDetached&&r.compareDocumentPosition(e)===i?e===t||y(b,e)?-1:r===t||y(b,r)?1:l?P.call(l,e)-P.call(l,r):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,n){var r,i=0,o=e.parentNode,s=n.parentNode,a=[e],u=[n];if(e===n)return E=!0,0;if(!o||!s)return e===t?-1:n===t?1:o?-1:s?1:l?P.call(l,e)-P.call(l,n):0;if(o===s)return ct(e,n);r=e;while(r=r.parentNode)a.unshift(r);r=n;while(r=r.parentNode)u.unshift(r);while(a[i]===u[i])i++;return i?ct(a[i],u[i]):a[i]===b?-1:u[i]===b?1:0},t):p},ot.matches=function(e,t){return ot(e,null,null,t)},ot.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Y,"='$1']"),!(!n.matchesSelector||!h||g&&g.test(t)||d&&d.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return ot(t,p,null,[e]).length>0},ot.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},ot.attr=function(e,t){(e.ownerDocument||e)!==p&&c(e);var r=i.attrHandle[t.toLowerCase()],o=r&&A.call(i.attrHandle,t.toLowerCase())?r(e,t,!h):undefined;return o===undefined?n.attributes||!h?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null:o},ot.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},ot.uniqueSort=function(e){var t,r=[],i=0,o=0;if(E=!n.detectDuplicates,l=!n.sortStable&&e.slice(0),e.sort(S),E){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return e},o=ot.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=ot.selectors={cacheLength:50,createPseudo:at,match:J,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(nt,rt),e[3]=(e[4]||e[5]||"").replace(nt,rt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ot.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ot.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return J.CHILD.test(e[0])?null:(e[3]&&e[4]!==undefined?e[2]=e[4]:n&&V.test(n)&&(t=gt(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(nt,rt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=C[e+" "];return t||(t=RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&C(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=ot.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,h,d,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,y=a&&t.nodeName.toLowerCase(),x=!u&&!a;if(m){if(o){while(g){p=t;while(p=p[g])if(a?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;d=g="only"===e&&!d&&"nextSibling"}return!0}if(d=[s?m.firstChild:m.lastChild],s&&x){c=m[v]||(m[v]={}),l=c[e]||[],h=l[0]===w&&l[1],f=l[0]===w&&l[2],p=h&&m.childNodes[h];while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[w,h,f];break}}else if(x&&(l=(t[v]||(t[v]={}))[e])&&l[0]===w)f=l[1];else while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if((a?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(x&&((p[v]||(p[v]={}))[e]=[w,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||ot.error("unsupported pseudo: "+e);return r[v]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?at(function(e,n){var i,o=r(e,t),s=o.length;while(s--)i=P.call(e,o[s]),e[i]=!(n[i]=o[s])}):function(e){return r(e,0,n)}):r}},pseudos:{not:at(function(e){var t=[],n=[],r=a(e.replace(z,"$1"));return r[v]?at(function(e,t,n,i){var o,s=r(e,null,i,[]),a=e.length;while(a--)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:at(function(e){return function(t){return ot(e,t).length>0}}),contains:at(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:at(function(e){return G.test(e||"")||ot.error("unsupported lang: "+e),e=e.replace(nt,rt).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return et.test(e.nodeName)},input:function(e){return Z.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[0>n?n+t:n]}),even:ht(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:ht(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},i.pseudos.nth=i.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[t]=pt(t);for(t in{submit:!0,reset:!0})i.pseudos[t]=ft(t);function dt(){}dt.prototype=i.filters=i.pseudos,i.setFilters=new dt;function gt(e,t){var n,r,o,s,a,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);a=e,u=[],l=i.preFilter;while(a){(!n||(r=_.exec(a)))&&(r&&(a=a.slice(r[0].length)||a),u.push(o=[])),n=!1,(r=X.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(z," ")}),a=a.slice(n.length));for(s in i.filter)!(r=J[s].exec(a))||l[s]&&!(r=l[s](r))||(n=r.shift(),o.push({value:n,type:s,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ot.error(e):k(e,u).slice(0)}function mt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function yt(e,t,n){var i=t.dir,o=n&&"parentNode"===i,s=T++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,a){var u,l,c,p=w+" "+s;if(a){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,a))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[v]||(t[v]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,a)||r,l[1]===!0)return!0}}function vt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,s=[],a=0,u=e.length,l=null!=t;for(;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function bt(e,t,n,r,i,o){return r&&!r[v]&&(r=bt(r)),i&&!i[v]&&(i=bt(i,o)),at(function(o,s,a,u){var l,c,p,f=[],h=[],d=s.length,g=o||Ct(t||"*",a.nodeType?[a]:a,[]),m=!e||!o&&t?g:xt(g,f,e,a,u),y=n?i||(o?e:d||r)?[]:s:m;if(n&&n(m,y,a,u),r){l=xt(y,h),r(l,[],a,u),c=l.length;while(c--)(p=l[c])&&(y[h[c]]=!(m[h[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?P.call(o,p):f[c])>-1&&(o[l]=!(s[l]=p))}}else y=xt(y===s?y.splice(d,y.length):y),i?i(null,s,y,u):O.apply(s,y)})}function wt(e){var t,n,r,o=e.length,s=i.relative[e[0].type],a=s||i.relative[" "],l=s?1:0,c=yt(function(e){return e===t},a,!0),p=yt(function(e){return P.call(t,e)>-1},a,!0),f=[function(e,n,r){return!s&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>l;l++)if(n=i.relative[e[l].type])f=[yt(vt(f),n)];else{if(n=i.filter[e[l].type].apply(null,e[l].matches),n[v]){for(r=++l;o>r;r++)if(i.relative[e[r].type])break;return bt(l>1&&vt(f),l>1&&mt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&wt(e.slice(l,r)),o>r&&wt(e=e.slice(r)),o>r&&mt(e))}f.push(n)}return vt(f)}function Tt(e,t){var n=0,o=t.length>0,s=e.length>0,a=function(a,l,c,f,h){var d,g,m,y=[],v=0,x="0",b=a&&[],T=null!=h,C=u,k=a||s&&i.find.TAG("*",h&&l.parentNode||l),N=w+=null==C?1:Math.random()||.1;for(T&&(u=l!==p&&l,r=n);null!=(d=k[x]);x++){if(s&&d){g=0;while(m=e[g++])if(m(d,l,c)){f.push(d);break}T&&(w=N,r=++n)}o&&((d=!m&&d)&&v--,a&&b.push(d))}if(v+=x,o&&x!==v){g=0;while(m=t[g++])m(b,y,l,c);if(a){if(v>0)while(x--)b[x]||y[x]||(y[x]=q.call(f));y=xt(y)}O.apply(f,y),T&&!a&&y.length>0&&v+t.length>1&&ot.uniqueSort(f)}return T&&(w=N,u=C),b};return o?at(a):a}a=ot.compile=function(e,t){var n,r=[],i=[],o=N[e+" "];if(!o){t||(t=gt(e)),n=t.length;while(n--)o=wt(t[n]),o[v]?r.push(o):i.push(o);o=N(e,Tt(i,r))}return o};function Ct(e,t,n){var r=0,i=t.length;for(;i>r;r++)ot(e,t[r],n);return n}function kt(e,t,r,o){var s,u,l,c,p,f=gt(e);if(!o&&1===f.length){if(u=f[0]=f[0].slice(0),u.length>2&&"ID"===(l=u[0]).type&&n.getById&&9===t.nodeType&&h&&i.relative[u[1].type]){if(t=(i.find.ID(l.matches[0].replace(nt,rt),t)||[])[0],!t)return r;e=e.slice(u.shift().value.length)}s=J.needsContext.test(e)?0:u.length;while(s--){if(l=u[s],i.relative[c=l.type])break;if((p=i.find[c])&&(o=p(l.matches[0].replace(nt,rt),U.test(u[0].type)&&t.parentNode||t))){if(u.splice(s,1),e=o.length&&mt(u),!e)return O.apply(r,o),r;break}}}return a(e,f)(o,t,!h,r,U.test(e)),r}n.sortStable=v.split("").sort(S).join("")===v,n.detectDuplicates=E,c(),n.sortDetached=ut(function(e){return 1&e.compareDocumentPosition(p.createElement("div"))}),ut(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||lt("type|href|height|width",function(e,t,n){return n?undefined:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ut(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||lt("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?undefined:e.defaultValue}),ut(function(e){return null==e.getAttribute("disabled")})||lt(R,function(e,t,n){var r;return n?undefined:(r=e.getAttributeNode(t))&&r.specified?r.value:e[t]===!0?t.toLowerCase():null}),x.find=ot,x.expr=ot.selectors,x.expr[":"]=x.expr.pseudos,x.unique=ot.uniqueSort,x.text=ot.getText,x.isXMLDoc=ot.isXML,x.contains=ot.contains}(e);var D={};function A(e){var t=D[e]={};return x.each(e.match(w)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?D[e]||A(e):x.extend({},e);var t,n,r,i,o,s,a=[],u=!e.once&&[],l=function(p){for(t=e.memory&&p,n=!0,s=i||0,i=0,o=a.length,r=!0;a&&o>s;s++)if(a[s].apply(p[0],p[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,a&&(u?u.length&&l(u.shift()):t?a=[]:c.disable())},c={add:function(){if(a){var n=a.length;(function s(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&c.has(n)||a.push(n):n&&n.length&&"string"!==r&&s(n)})})(arguments),r?o=a.length:t&&(i=n,l(t))}return this},remove:function(){return a&&x.each(arguments,function(e,t){var n;while((n=x.inArray(t,a,n))>-1)a.splice(n,1),r&&(o>=n&&o--,s>=n&&s--)}),this},has:function(e){return e?x.inArray(e,a)>-1:!(!a||!a.length)},empty:function(){return a=[],o=0,this},disable:function(){return a=u=t=undefined,this},disabled:function(){return!a},lock:function(){return u=undefined,t||c.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!a||n&&!u||(t=t||[],t=[e,t.slice?t.slice():t],r?u.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!n}};return c},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var s=o[0],a=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=a&&a.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===r?n.promise():this,a?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=d.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),s=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?d.call(arguments):r,n===a?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},a,u,l;if(r>1)for(a=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(s(t,l,n)).fail(o.reject).progress(s(t,u,a)):--i;return i||o.resolveWith(l,n),o.promise()}}),x.support=function(t){var n=o.createElement("input"),r=o.createDocumentFragment(),i=o.createElement("div"),s=o.createElement("select"),a=s.appendChild(o.createElement("option"));return n.type?(n.type="checkbox",t.checkOn=""!==n.value,t.optSelected=a.selected,t.reliableMarginRight=!0,t.boxSizingReliable=!0,t.pixelPosition=!1,n.checked=!0,t.noCloneChecked=n.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!a.disabled,n=o.createElement("input"),n.value="t",n.type="radio",t.radioValue="t"===n.value,n.setAttribute("checked","t"),n.setAttribute("name","t"),r.appendChild(n),t.checkClone=r.cloneNode(!0).cloneNode(!0).lastChild.checked,t.focusinBubbles="onfocusin"in e,i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===i.style.backgroundClip,x(function(){var n,r,s="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",a=o.getElementsByTagName("body")[0];a&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",a.appendChild(n).appendChild(i),i.innerHTML="",i.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",x.swap(a,null!=a.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===i.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(i,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(i,null)||{width:"4px"}).width,r=i.appendChild(o.createElement("div")),r.style.cssText=i.style.cssText=s,r.style.marginRight=r.style.width="0",i.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),a.removeChild(n))}),t):t}({});var L,q,H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,O=/([A-Z])/g;function F(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=x.expando+Math.random()}F.uid=1,F.accepts=function(e){return e.nodeType?1===e.nodeType||9===e.nodeType:!0},F.prototype={key:function(e){if(!F.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=F.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,x.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(x.isEmptyObject(o))x.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return t===undefined?n:n[t]},access:function(e,t,n){var r;return t===undefined||t&&"string"==typeof t&&n===undefined?(r=this.get(e,t),r!==undefined?r:this.get(e,x.camelCase(t))):(this.set(e,t,n),n!==undefined?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(t===undefined)this.cache[o]={};else{x.isArray(t)?r=t.concat(t.map(x.camelCase)):(i=x.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(w)||[])),n=r.length;while(n--)delete s[r[n]]}},hasData:function(e){return!x.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}},L=new F,q=new F,x.extend({acceptData:F.accepts,hasData:function(e){return L.hasData(e)||q.hasData(e)},data:function(e,t,n){return L.access(e,t,n)},removeData:function(e,t){L.remove(e,t)},_data:function(e,t,n){return q.access(e,t,n)},_removeData:function(e,t){q.remove(e,t)}}),x.fn.extend({data:function(e,t){var n,r,i=this[0],o=0,s=null;if(e===undefined){if(this.length&&(s=L.get(i),1===i.nodeType&&!q.get(i,"hasDataAttrs"))){for(n=i.attributes;n.length>o;o++)r=n[o].name,0===r.indexOf("data-")&&(r=x.camelCase(r.slice(5)),P(i,r,s[r]));q.set(i,"hasDataAttrs",!0)}return s}return"object"==typeof e?this.each(function(){L.set(this,e)}):x.access(this,function(t){var n,r=x.camelCase(e);if(i&&t===undefined){if(n=L.get(i,e),n!==undefined)return n;if(n=L.get(i,r),n!==undefined)return n;if(n=P(i,r,undefined),n!==undefined)return n}else this.each(function(){var n=L.get(this,r);L.set(this,r,t),-1!==e.indexOf("-")&&n!==undefined&&L.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){L.remove(this,e)})}});function P(e,t,n){var r;if(n===undefined&&1===e.nodeType)if(r="data-"+t.replace(O,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:H.test(n)?JSON.parse(n):n}catch(i){}L.set(e,t,n)}else n=undefined;return n}x.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=q.get(e,t),n&&(!r||x.isArray(n)?r=q.access(e,t,x.makeArray(n)):r.push(n)),r||[]):undefined},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),s=function(){x.dequeue(e,t)
};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return q.get(e,n)||q.access(e,n,{empty:x.Callbacks("once memory").add(function(){q.remove(e,[t+"queue",n])})})}}),x.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),n>arguments.length?x.queue(this[0],e):t===undefined?this:this.each(function(){var n=x.queue(this,e,t);x._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=x.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=undefined),e=e||"fx";while(s--)n=q.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var R,M,W=/[\t\r\n\f]/g,$=/\r/g,B=/^(?:input|select|textarea|button)$/i;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[x.propFix[e]||e]})},addClass:function(e){var t,n,r,i,o,s=0,a=this.length,u="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,s=0,a=this.length,u=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,i=0,o=x(this),s=e.match(w)||[];while(t=s[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else(n===r||"boolean"===n)&&(this.className&&q.set(this,"__className__",this.className),this.className=this.className||e===!1?"":q.get(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(W," ").indexOf(t)>=0)return!0;return!1},val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=x.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,x(this).val()):e,null==i?i="":"number"==typeof i?i+="":x.isArray(i)&&(i=x.map(i,function(e){return null==e?"":e+""})),t=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&t.set(this,i,"value")!==undefined||(this.value=i))});if(i)return t=x.valHooks[i.type]||x.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&(n=t.get(i,"value"))!==undefined?n:(n=i.value,"string"==typeof n?n.replace($,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;for(;a>u;u++)if(n=r[u],!(!n.selected&&u!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),s=i.length;while(s--)r=i[s],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,t,n){var i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===r?x.prop(e,t,n):(1===s&&x.isXMLDoc(e)||(t=t.toLowerCase(),i=x.attrHooks[t]||(x.expr.match.bool.test(t)?M:R)),n===undefined?i&&"get"in i&&null!==(o=i.get(e,t))?o:(o=x.find.attr(e,t),null==o?undefined:o):null!==n?i&&"set"in i&&(o=i.set(e,n,t))!==undefined?o:(e.setAttribute(t,n+""),n):(x.removeAttr(e,t),undefined))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!x.isXMLDoc(e),o&&(t=x.propFix[t]||t,i=x.propHooks[t]),n!==undefined?i&&"set"in i&&(r=i.set(e,n,t))!==undefined?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||B.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),M={set:function(e,t,n){return t===!1?x.removeAttr(e,n):e.setAttribute(n,n),n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,t){var n=x.expr.attrHandle[t]||x.find.attr;x.expr.attrHandle[t]=function(e,t,r){var i=x.expr.attrHandle[t],o=r?undefined:(x.expr.attrHandle[t]=undefined)!=n(e,t,r)?t.toLowerCase():null;return x.expr.attrHandle[t]=i,o}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,t){return x.isArray(t)?e.checked=x.inArray(x(e).val(),t)>=0:undefined}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var I=/^key/,z=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,X=/^([^.]*)(?:\.(.+)|)$/;function U(){return!0}function Y(){return!1}function V(){try{return o.activeElement}catch(e){}}x.event={global:{},add:function(e,t,n,i,o){var s,a,u,l,c,p,f,h,d,g,m,y=q.get(e);if(y){n.handler&&(s=n,n=s.handler,o=s.selector),n.guid||(n.guid=x.guid++),(l=y.events)||(l=y.events={}),(a=y.handle)||(a=y.handle=function(e){return typeof x===r||e&&x.event.triggered===e.type?undefined:x.event.dispatch.apply(a.elem,arguments)},a.elem=e),t=(t||"").match(w)||[""],c=t.length;while(c--)u=X.exec(t[c])||[],d=m=u[1],g=(u[2]||"").split(".").sort(),d&&(f=x.event.special[d]||{},d=(o?f.delegateType:f.bindType)||d,f=x.event.special[d]||{},p=x.extend({type:d,origType:m,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&x.expr.match.needsContext.test(o),namespace:g.join(".")},s),(h=l[d])||(h=l[d]=[],h.delegateCount=0,f.setup&&f.setup.call(e,i,g,a)!==!1||e.addEventListener&&e.addEventListener(d,a,!1)),f.add&&(f.add.call(e,p),p.handler.guid||(p.handler.guid=n.guid)),o?h.splice(h.delegateCount++,0,p):h.push(p),x.event.global[d]=!0);e=null}},remove:function(e,t,n,r,i){var o,s,a,u,l,c,p,f,h,d,g,m=q.hasData(e)&&q.get(e);if(m&&(u=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(a=X.exec(t[l])||[],h=g=a[1],d=(a[2]||"").split(".").sort(),h){p=x.event.special[h]||{},h=(r?p.delegateType:p.bindType)||h,f=u[h]||[],a=a[2]&&RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=f.length;while(o--)c=f[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(f.splice(o,1),c.selector&&f.delegateCount--,p.remove&&p.remove.call(e,c));s&&!f.length&&(p.teardown&&p.teardown.call(e,d,m.handle)!==!1||x.removeEvent(e,h,m.handle),delete u[h])}else for(h in u)x.event.remove(e,h+t[l],n,r,!0);x.isEmptyObject(u)&&(delete m.handle,q.remove(e,"events"))}},trigger:function(t,n,r,i){var s,a,u,l,c,p,f,h=[r||o],d=y.call(t,"type")?t.type:t,g=y.call(t,"namespace")?t.namespace.split("."):[];if(a=u=r=r||o,3!==r.nodeType&&8!==r.nodeType&&!_.test(d+x.event.triggered)&&(d.indexOf(".")>=0&&(g=d.split("."),d=g.shift(),g.sort()),c=0>d.indexOf(":")&&"on"+d,t=t[x.expando]?t:new x.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=g.join("."),t.namespace_re=t.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=undefined,t.target||(t.target=r),n=null==n?[t]:x.makeArray(n,[t]),f=x.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!x.isWindow(r)){for(l=f.delegateType||d,_.test(l+d)||(a=a.parentNode);a;a=a.parentNode)h.push(a),u=a;u===(r.ownerDocument||o)&&h.push(u.defaultView||u.parentWindow||e)}s=0;while((a=h[s++])&&!t.isPropagationStopped())t.type=s>1?l:f.bindType||d,p=(q.get(a,"events")||{})[t.type]&&q.get(a,"handle"),p&&p.apply(a,n),p=c&&a[c],p&&x.acceptData(a)&&p.apply&&p.apply(a,n)===!1&&t.preventDefault();return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(h.pop(),n)!==!1||!x.acceptData(r)||c&&x.isFunction(r[d])&&!x.isWindow(r)&&(u=r[c],u&&(r[c]=null),x.event.triggered=d,r[d](),x.event.triggered=undefined,u&&(r[c]=u)),t.result}},dispatch:function(e){e=x.event.fix(e);var t,n,r,i,o,s=[],a=d.call(arguments),u=(q.get(this,"events")||{})[e.type]||[],l=x.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),t=0;while((i=s[t++])&&!e.isPropagationStopped()){e.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((x.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),r!==undefined&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",r[i]===undefined&&(r[i]=o.needsContext?x(i,this).index(u)>=0:x.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}return t.length>a&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,s=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||o,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||s===undefined||(e.which=1&s?1:2&s?3:4&s?2:0),e}},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,s=e,a=this.fixHooks[i];a||(this.fixHooks[i]=a=z.test(i)?this.mouseHooks:I.test(i)?this.keyHooks:{}),r=a.props?this.props.concat(a.props):this.props,e=new x.Event(s),t=r.length;while(t--)n=r[t],e[n]=s[n];return e.target||(e.target=o),3===e.target.nodeType&&(e.target=e.target.parentNode),a.filter?a.filter(e,s):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==V()&&this.focus?(this.focus(),!1):undefined},delegateType:"focusin"},blur:{trigger:function(){return this===V()&&this.blur?(this.blur(),!1):undefined},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&x.nodeName(this,"input")?(this.click(),!1):undefined},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==undefined&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},x.Event=function(e,t){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.getPreventDefault&&e.getPreventDefault()?U:Y):this.type=e,t&&x.extend(this,t),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,undefined):new x.Event(e,t)},x.Event.prototype={isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=U,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=U,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=U,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=undefined);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=undefined):null==r&&("string"==typeof t?(r=n,n=undefined):(r=n,n=t,t=undefined)),r===!1)r=Y;else if(!r)return this;return 1===i&&(o=r,r=function(e){return x().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=x.guid++)),this.each(function(){x.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,x(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=undefined),n===!1&&(n=Y),this.each(function(){x.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?x.event.trigger(e,t,n,!0):undefined}});var G=/^.[^:#\[\.,]*$/,J=/^(?:parents|prev(?:Until|All))/,Q=x.expr.match.needsContext,K={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t=x(e,this),n=t.length;return this.filter(function(){var e=0;for(;n>e;e++)if(x.contains(this,t[e]))return!0})},not:function(e){return this.pushStack(et(this,e||[],!0))},filter:function(e){return this.pushStack(et(this,e||[],!1))},is:function(e){return!!et(this,"string"==typeof e&&Q.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],s=Q.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(s?s.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?g.call(x(e),this[0]):g.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function Z(e,t){while((e=e[t])&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return Z(e,"nextSibling")},prev:function(e){return Z(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return e.contentDocument||x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(K[e]||x.unique(i),J.test(e)&&i.reverse()),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,t,n){var r=[],i=n!==undefined;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&x(e).is(n))break;r.push(e)}return r},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function et(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(G.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return g.call(t,e)>=0!==n})}var tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,nt=/<([\w:]+)/,rt=/<|&#?\w+;/,it=/<(?:script|style|link)/i,ot=/^(?:checkbox|radio)$/i,st=/checked\s*(?:[^=]|=\s*.checked.)/i,at=/^$|\/(?:java|ecma)script/i,ut=/^true\/(.*)/,lt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ct={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ct.optgroup=ct.option,ct.tbody=ct.tfoot=ct.colgroup=ct.caption=ct.thead,ct.th=ct.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===undefined?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(mt(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&dt(mt(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++)1===e.nodeType&&(x.cleanData(mt(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var t=this[0]||{},n=0,r=this.length;if(e===undefined&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!it.test(e)&&!ct[(nt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(tt,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(x.cleanData(mt(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=f.apply([],e);var r,i,o,s,a,u,l=0,c=this.length,p=this,h=c-1,d=e[0],g=x.isFunction(d);if(g||!(1>=c||"string"!=typeof d||x.support.checkClone)&&st.test(d))return this.each(function(r){var i=p.eq(r);g&&(e[0]=d.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(r=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),i=r.firstChild,1===r.childNodes.length&&(r=i),i)){for(o=x.map(mt(r,"script"),ft),s=o.length;c>l;l++)a=r,l!==h&&(a=x.clone(a,!0,!0),s&&x.merge(o,mt(a,"script"))),t.call(this[l],a,l);if(s)for(u=o[o.length-1].ownerDocument,x.map(o,ht),l=0;s>l;l++)a=o[l],at.test(a.type||"")&&!q.access(a,"globalEval")&&x.contains(u,a)&&(a.src?x._evalUrl(a.src):x.globalEval(a.textContent.replace(lt,"")))}return this}}),x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=[],i=x(e),o=i.length-1,s=0;for(;o>=s;s++)n=s===o?this:this.clone(!0),x(i[s])[t](n),h.apply(r,n.get());return this.pushStack(r)}}),x.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=x.contains(e.ownerDocument,e);if(!(x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(s=mt(a),o=mt(e),r=0,i=o.length;i>r;r++)yt(o[r],s[r]);if(t)if(n)for(o=o||mt(e),s=s||mt(a),r=0,i=o.length;i>r;r++)gt(o[r],s[r]);else gt(e,a);return s=mt(a,"script"),s.length>0&&dt(s,!u&&mt(e,"script")),a},buildFragment:function(e,t,n,r){var i,o,s,a,u,l,c=0,p=e.length,f=t.createDocumentFragment(),h=[];for(;p>c;c++)if(i=e[c],i||0===i)if("object"===x.type(i))x.merge(h,i.nodeType?[i]:i);else if(rt.test(i)){o=o||f.appendChild(t.createElement("div")),s=(nt.exec(i)||["",""])[1].toLowerCase(),a=ct[s]||ct._default,o.innerHTML=a[1]+i.replace(tt,"<$1></$2>")+a[2],l=a[0];while(l--)o=o.lastChild;x.merge(h,o.childNodes),o=f.firstChild,o.textContent=""}else h.push(t.createTextNode(i));f.textContent="",c=0;while(i=h[c++])if((!r||-1===x.inArray(i,r))&&(u=x.contains(i.ownerDocument,i),o=mt(f.appendChild(i),"script"),u&&dt(o),n)){l=0;while(i=o[l++])at.test(i.type||"")&&n.push(i)}return f},cleanData:function(e){var t,n,r,i,o,s,a=x.event.special,u=0;for(;(n=e[u])!==undefined;u++){if(F.accepts(n)&&(o=n[q.expando],o&&(t=q.cache[o]))){if(r=Object.keys(t.events||{}),r.length)for(s=0;(i=r[s])!==undefined;s++)a[i]?x.event.remove(n,i):x.removeEvent(n,i,t.handle);q.cache[o]&&delete q.cache[o]}delete L.cache[n[L.expando]]}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}});function pt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function ft(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function ht(e){var t=ut.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function dt(e,t){var n=e.length,r=0;for(;n>r;r++)q.set(e[r],"globalEval",!t||q.get(t[r],"globalEval"))}function gt(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){if(q.hasData(e)&&(o=q.access(e),s=q.set(t,o),l=o.events)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)x.event.add(t,i,l[i][n])}L.hasData(e)&&(a=L.access(e),u=x.extend({},a),L.set(t,u))}}function mt(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return t===undefined||t&&x.nodeName(e,t)?x.merge([e],n):n}function yt(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ot.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}x.fn.extend({wrapAll:function(e){var t;return x.isFunction(e)?this.each(function(t){x(this).wrapAll(e.call(this,t))}):(this[0]&&(t=x(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var vt,xt,bt=/^(none|table(?!-c[ea]).+)/,wt=/^margin/,Tt=RegExp("^("+b+")(.*)$","i"),Ct=RegExp("^("+b+")(?!px)[a-z%]+$","i"),kt=RegExp("^([+-])=("+b+")","i"),Nt={BODY:"block"},Et={position:"absolute",visibility:"hidden",display:"block"},St={letterSpacing:0,fontWeight:400},jt=["Top","Right","Bottom","Left"],Dt=["Webkit","O","Moz","ms"];function At(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Dt.length;while(i--)if(t=Dt[i]+n,t in e)return t;return r}function Lt(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function qt(t){return e.getComputedStyle(t,null)}function Ht(e,t){var n,r,i,o=[],s=0,a=e.length;for(;a>s;s++)r=e[s],r.style&&(o[s]=q.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&Lt(r)&&(o[s]=q.access(r,"olddisplay",Rt(r.nodeName)))):o[s]||(i=Lt(r),(n&&"none"!==n||!i)&&q.set(r,"olddisplay",i?n:x.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}x.fn.extend({css:function(e,t){return x.access(this,function(e,t,n){var r,i,o={},s=0;if(x.isArray(t)){for(r=qt(e),i=t.length;i>s;s++)o[t[s]]=x.css(e,t[s],!1,r);return o}return n!==undefined?x.style(e,t,n):x.css(e,t)},e,t,arguments.length>1)},show:function(){return Ht(this,!0)},hide:function(){return Ht(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Lt(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=vt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=x.camelCase(t),u=e.style;return t=x.cssProps[a]||(x.cssProps[a]=At(u,a)),s=x.cssHooks[t]||x.cssHooks[a],n===undefined?s&&"get"in s&&(i=s.get(e,!1,r))!==undefined?i:u[t]:(o=typeof n,"string"===o&&(i=kt.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(x.css(e,t)),o="number"),null==n||"number"===o&&isNaN(n)||("number"!==o||x.cssNumber[a]||(n+="px"),x.support.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&(n=s.set(e,n,r))===undefined||(u[t]=n)),undefined)}},css:function(e,t,n,r){var i,o,s,a=x.camelCase(t);return t=x.cssProps[a]||(x.cssProps[a]=At(e.style,a)),s=x.cssHooks[t]||x.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),i===undefined&&(i=vt(e,t,r)),"normal"===i&&t in St&&(i=St[t]),""===n||n?(o=parseFloat(i),n===!0||x.isNumeric(o)?o||0:i):i}}),vt=function(e,t,n){var r,i,o,s=n||qt(e),a=s?s.getPropertyValue(t)||s[t]:undefined,u=e.style;return s&&(""!==a||x.contains(e.ownerDocument,e)||(a=x.style(e,t)),Ct.test(a)&&wt.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=s.width,u.width=r,u.minWidth=i,u.maxWidth=o)),a};function Ot(e,t,n){var r=Tt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function Ft(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;for(;4>o;o+=2)"margin"===n&&(s+=x.css(e,n+jt[o],!0,i)),r?("content"===n&&(s-=x.css(e,"padding"+jt[o],!0,i)),"margin"!==n&&(s-=x.css(e,"border"+jt[o]+"Width",!0,i))):(s+=x.css(e,"padding"+jt[o],!0,i),"padding"!==n&&(s+=x.css(e,"border"+jt[o]+"Width",!0,i)));return s}function Pt(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=qt(e),s=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=vt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Ct.test(i))return i;r=s&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+Ft(e,t,n||(s?"border":"content"),r,o)+"px"}function Rt(e){var t=o,n=Nt[e];return n||(n=Mt(e,t),"none"!==n&&n||(xt=(xt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(xt[0].contentWindow||xt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=Mt(e,t),xt.detach()),Nt[e]=n),n}function Mt(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,t){x.cssHooks[t]={get:function(e,n,r){return n?0===e.offsetWidth&&bt.test(x.css(e,"display"))?x.swap(e,Et,function(){return Pt(e,t,r)}):Pt(e,t,r):undefined},set:function(e,n,r){var i=r&&qt(e);return Ot(e,n,r?Ft(e,t,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,t){return t?x.swap(e,{display:"inline-block"},vt,[e,"marginRight"]):undefined}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,t){x.cssHooks[t]={get:function(e,n){return n?(n=vt(e,t),Ct.test(n)?x(e).position()[t]+"px":n):undefined}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+jt[r]+t]=o[r]||o[r-2]||o[0];return i}},wt.test(e)||(x.cssHooks[e+t].set=Ot)});var Wt=/%20/g,$t=/\[\]$/,Bt=/\r?\n/g,It=/^(?:submit|button|image|reset|file)$/i,zt=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&zt.test(this.nodeName)&&!It.test(e)&&(this.checked||!ot.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(Bt,"\r\n")}}):{name:t.name,value:n.replace(Bt,"\r\n")}}).get()}}),x.param=function(e,t){var n,r=[],i=function(e,t){t=x.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(t===undefined&&(t=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){i(this.name,this.value)});else for(n in e)_t(n,e[n],t,i);return r.join("&").replace(Wt,"+")};function _t(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||$t.test(e)?r(e,i):_t(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)_t(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)
},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var Xt,Ut,Yt=x.now(),Vt=/\?/,Gt=/#.*$/,Jt=/([?&])_=[^&]*/,Qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Kt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Zt=/^(?:GET|HEAD)$/,en=/^\/\//,tn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,nn=x.fn.load,rn={},on={},sn="*/".concat("*");try{Ut=i.href}catch(an){Ut=o.createElement("a"),Ut.href="",Ut=Ut.href}Xt=tn.exec(Ut.toLowerCase())||[];function un(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function ln(e,t,n,r){var i={},o=e===on;function s(a){var u;return i[a]=!0,x.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):undefined:(t.dataTypes.unshift(l),s(l),!1)}),u}return s(t.dataTypes[0])||!i["*"]&&s("*")}function cn(e,t){var n,r,i=x.ajaxSettings.flatOptions||{};for(n in t)t[n]!==undefined&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,t,n){if("string"!=typeof e&&nn)return nn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=e.slice(a),e=e.slice(0,a)),x.isFunction(t)?(n=t,t=undefined):t&&"object"==typeof t&&(i="POST"),s.length>0&&x.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?x("<div>").append(x.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ut,type:"GET",isLocal:Kt.test(Xt[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":sn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?cn(cn(e,x.ajaxSettings),t):cn(x.ajaxSettings,e)},ajaxPrefilter:un(rn),ajaxTransport:un(on),ajax:function(e,t){"object"==typeof e&&(t=e,e=undefined),t=t||{};var n,r,i,o,s,a,u,l,c=x.ajaxSetup({},t),p=c.context||c,f=c.context&&(p.nodeType||p.jquery)?x(p):x.event,h=x.Deferred(),d=x.Callbacks("once memory"),g=c.statusCode||{},m={},y={},v=0,b="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(2===v){if(!o){o={};while(t=Qt.exec(i))o[t[1].toLowerCase()]=t[2]}t=o[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===v?i:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return v||(e=y[n]=y[n]||e,m[e]=t),this},overrideMimeType:function(e){return v||(c.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>v)for(t in e)g[t]=[g[t],e[t]];else T.always(e[T.status]);return this},abort:function(e){var t=e||b;return n&&n.abort(t),k(0,t),this}};if(h.promise(T).complete=d.add,T.success=T.done,T.error=T.fail,c.url=((e||c.url||Ut)+"").replace(Gt,"").replace(en,Xt[1]+"//"),c.type=t.method||t.type||c.method||c.type,c.dataTypes=x.trim(c.dataType||"*").toLowerCase().match(w)||[""],null==c.crossDomain&&(a=tn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===Xt[1]&&a[2]===Xt[2]&&(a[3]||("http:"===a[1]?"80":"443"))===(Xt[3]||("http:"===Xt[1]?"80":"443")))),c.data&&c.processData&&"string"!=typeof c.data&&(c.data=x.param(c.data,c.traditional)),ln(rn,c,t,T),2===v)return T;u=c.global,u&&0===x.active++&&x.event.trigger("ajaxStart"),c.type=c.type.toUpperCase(),c.hasContent=!Zt.test(c.type),r=c.url,c.hasContent||(c.data&&(r=c.url+=(Vt.test(r)?"&":"?")+c.data,delete c.data),c.cache===!1&&(c.url=Jt.test(r)?r.replace(Jt,"$1_="+Yt++):r+(Vt.test(r)?"&":"?")+"_="+Yt++)),c.ifModified&&(x.lastModified[r]&&T.setRequestHeader("If-Modified-Since",x.lastModified[r]),x.etag[r]&&T.setRequestHeader("If-None-Match",x.etag[r])),(c.data&&c.hasContent&&c.contentType!==!1||t.contentType)&&T.setRequestHeader("Content-Type",c.contentType),T.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+("*"!==c.dataTypes[0]?", "+sn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)T.setRequestHeader(l,c.headers[l]);if(c.beforeSend&&(c.beforeSend.call(p,T,c)===!1||2===v))return T.abort();b="abort";for(l in{success:1,error:1,complete:1})T[l](c[l]);if(n=ln(on,c,t,T)){T.readyState=1,u&&f.trigger("ajaxSend",[T,c]),c.async&&c.timeout>0&&(s=setTimeout(function(){T.abort("timeout")},c.timeout));try{v=1,n.send(m,k)}catch(C){if(!(2>v))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,t,o,a){var l,m,y,b,w,C=t;2!==v&&(v=2,s&&clearTimeout(s),n=undefined,i=a||"",T.readyState=e>0?4:0,l=e>=200&&300>e||304===e,o&&(b=pn(c,T,o)),b=fn(c,b,T,l),l?(c.ifModified&&(w=T.getResponseHeader("Last-Modified"),w&&(x.lastModified[r]=w),w=T.getResponseHeader("etag"),w&&(x.etag[r]=w)),204===e||"HEAD"===c.type?C="nocontent":304===e?C="notmodified":(C=b.state,m=b.data,y=b.error,l=!y)):(y=C,(e||!C)&&(C="error",0>e&&(e=0))),T.status=e,T.statusText=(t||C)+"",l?h.resolveWith(p,[m,C,T]):h.rejectWith(p,[T,C,y]),T.statusCode(g),g=undefined,u&&f.trigger(l?"ajaxSuccess":"ajaxError",[T,c,l?m:y]),d.fireWith(p,[T,C]),u&&(f.trigger("ajaxComplete",[T,c]),--x.active||x.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,t){return x.get(e,undefined,t,"script")}}),x.each(["get","post"],function(e,t){x[t]=function(e,n,r,i){return x.isFunction(n)&&(i=i||r,r=n,n=undefined),x.ajax({url:e,type:t,dataType:i,data:n,success:r})}});function pn(e,t,n){var r,i,o,s,a=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),r===undefined&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):undefined}function fn(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(p){return{state:"parsererror",error:s?p:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===undefined&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),x.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=x("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),o.head.appendChild(t[0])},abort:function(){n&&n()}}}});var hn=[],dn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=hn.pop()||x.expando+"_"+Yt++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(dn.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&dn.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=x.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(dn,"$1"+i):t.jsonp!==!1&&(t.url+=(Vt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||x.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,hn.push(i)),s&&x.isFunction(o)&&o(s[0]),s=o=undefined}),"script"):undefined}),x.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var gn=x.ajaxSettings.xhr(),mn={0:200,1223:204},yn=0,vn={};e.ActiveXObject&&x(e).on("unload",function(){for(var e in vn)vn[e]();vn=undefined}),x.support.cors=!!gn&&"withCredentials"in gn,x.support.ajax=gn=!!gn,x.ajaxTransport(function(e){var t;return x.support.cors||gn&&!e.crossDomain?{send:function(n,r){var i,o,s=e.xhr();if(s.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)s[i]=e.xhrFields[i];e.mimeType&&s.overrideMimeType&&s.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)s.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete vn[o],t=s.onload=s.onerror=null,"abort"===e?s.abort():"error"===e?r(s.status||404,s.statusText):r(mn[s.status]||s.status,s.statusText,"string"==typeof s.responseText?{text:s.responseText}:undefined,s.getAllResponseHeaders()))}},s.onload=t(),s.onerror=t("error"),t=vn[o=yn++]=t("abort"),s.send(e.hasContent&&e.data||null)},abort:function(){t&&t()}}:undefined});var xn,bn,wn=/^(?:toggle|show|hide)$/,Tn=RegExp("^(?:([+-])=|)("+b+")([a-z%]*)$","i"),Cn=/queueHooks$/,kn=[An],Nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Tn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),s=(x.cssNumber[e]||"px"!==o&&+r)&&Tn.exec(x.css(n.elem,e)),a=1,u=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,x.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--u)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};function En(){return setTimeout(function(){xn=undefined}),xn=x.now()}function Sn(e,t,n){var r,i=(Nn[t]||[]).concat(Nn["*"]),o=0,s=i.length;for(;s>o;o++)if(r=i[o].call(n,t,e))return r}function jn(e,t,n){var r,i,o=0,s=kn.length,a=x.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=xn||En(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;for(;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:xn||En(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(Dn(c,l.opts.specialEasing);s>o;o++)if(r=kn[o].call(l,e,c,l.opts))return r;return x.map(c,Sn,l),x.isFunction(l.opts.start)&&l.opts.start.call(e,l),x.fx.timer(x.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function Dn(e,t){var n,r,i,o,s;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=x.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(jn,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Nn[n]=Nn[n]||[],Nn[n].unshift(t)},prefilter:function(e,t){t?kn.unshift(e):kn.push(e)}});function An(e,t,n){var r,i,o,s,a,u,l=this,c={},p=e.style,f=e.nodeType&&Lt(e),h=q.get(e,"fxshow");n.queue||(a=x._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,l.always(function(){l.always(function(){a.unqueued--,x.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(p.display="inline-block")),n.overflow&&(p.overflow="hidden",l.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],wn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show")){if("show"!==i||!h||h[r]===undefined)continue;f=!0}c[r]=h&&h[r]||x.style(e,r)}if(!x.isEmptyObject(c)){h?"hidden"in h&&(f=h.hidden):h=q.access(e,"fxshow",{}),o&&(h.hidden=!f),f?x(e).show():l.done(function(){x(e).hide()}),l.done(function(){var t;q.remove(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)s=Sn(f?h[r]:0,r,l),r in h||(h[r]=s.start,f&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function Ln(e,t,n,r,i){return new Ln.prototype.init(e,t,n,r,i)}x.Tween=Ln,Ln.prototype={constructor:Ln,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=Ln.propHooks[this.prop];return e&&e.get?e.get(this):Ln.propHooks._default.get(this)},run:function(e){var t,n=Ln.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ln.propHooks._default.set(this),this}},Ln.prototype.init.prototype=Ln.prototype,Ln.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Ln.propHooks.scrollTop=Ln.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(qn(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Lt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),s=function(){var t=jn(this,x.extend({},e),o);(i||q.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=undefined),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=x.timers,s=q.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&Cn.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=q.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,s=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function qn(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=jt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:qn("show"),slideUp:qn("hide"),slideToggle:qn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=Ln.prototype.init,x.fx.tick=function(){var e,t=x.timers,n=0;for(xn=x.now();t.length>n;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||x.fx.stop(),xn=undefined},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){bn||(bn=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(bn),bn=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===undefined?this:this.each(function(t){x.offset.setOffset(this,e,t)});var t,n,i=this[0],o={top:0,left:0},s=i&&i.ownerDocument;if(s)return t=s.documentElement,x.contains(t,i)?(typeof i.getBoundingClientRect!==r&&(o=i.getBoundingClientRect()),n=Hn(s),{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}):o},x.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=x.css(e,"position"),p=x(e),f={};"static"===c&&(e.style.position="relative"),a=p.offset(),o=x.css(e,"top"),u=x.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=p.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),x.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+i),"using"in t?t.using.call(e,f):p.css(f)}},x.fn.extend({position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===x.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(r=e.offset()),r.top+=x.css(e[0],"borderTopWidth",!0),r.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-x.css(n,"marginTop",!0),left:t.left-r.left-x.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;x.fn[t]=function(i){return x.access(this,function(t,i,o){var s=Hn(t);return o===undefined?s?s[n]:t[i]:(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o,undefined)},t,i,arguments.length,null)}});function Hn(e){return x.isWindow(e)?e:9===e.nodeType&&e.defaultView}x.each({Height:"height",Width:"width"},function(e,t){x.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){x.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return x.access(this,function(t,n,r){var i;return x.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):r===undefined?x.css(t,n,s):x.style(t,n,r,s)},t,o?r:undefined,o,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}),"object"==typeof e&&"object"==typeof e.document&&(e.jQuery=e.$=x)})(window);
/* Modernizr 2.7.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-flexboxlegacy-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-canvas-canvastext-draganddrop-input-inputtypes-geolocation-svg-touch-shiv-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function C(a){j.cssText=a}function D(a,b){return C(n.join(a+";")+(b||""))}function E(a,b){return typeof a===b}function F(a,b){return!!~(""+a).indexOf(b)}function G(a,b){for(var d in a){var e=a[d];if(!F(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function H(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:E(f,"function")?f.bind(d||b):f}return!1}function I(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return E(b,"string")||E(b,"undefined")?G(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),H(e,b,c))}function J(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)u[c[d]]=c[d]in k;return u.list&&(u.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.7.1",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,x,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=E(e[d],"function"),E(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),A={}.hasOwnProperty,B;!E(A,"undefined")&&!E(A.call,"undefined")?B=function(a,b){return A.call(a,b)}:B=function(a,b){return b in a&&E(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=w.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(w.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(w.call(arguments)))};return e}),s.flexbox=function(){return I("flexWrap")},s.flexboxlegacy=function(){return I("boxDirection")},s.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},s.canvastext=function(){return!!e.canvas&&!!E(b.createElement("canvas").getContext("2d").fillText,"function")},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},s.geolocation=function(){return"geolocation"in navigator},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.rgba=function(){return C("background-color:rgba(150,255,150,.5)"),F(j.backgroundColor,"rgba")},s.hsla=function(){return C("background-color:hsla(120,40%,100%,.5)"),F(j.backgroundColor,"rgba")||F(j.backgroundColor,"hsla")},s.multiplebgs=function(){return C("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return I("backgroundSize")},s.borderimage=function(){return I("borderImage")},s.borderradius=function(){return I("borderRadius")},s.boxshadow=function(){return I("boxShadow")},s.textshadow=function(){return b.createElement("div").style.textShadow===""},s.opacity=function(){return D("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return I("animationName")},s.csscolumns=function(){return I("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return C((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),F(j.backgroundImage,"gradient")},s.cssreflections=function(){return I("boxReflect")},s.csstransforms=function(){return!!I("transform")},s.csstransforms3d=function(){var a=!!I("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},s.csstransitions=function(){return I("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&g.indexOf(d.split(" ")[0])===0}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect};for(var K in s)B(s,K)&&(x=K.toLowerCase(),e[x]=s[K](),v.push((e[x]?"":"no-")+x));return e.input||J(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)B(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},C(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return typeof a=="string"?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){c||(c=b);if(k)return c.createElement(a);d||(d=n(c));var g;return d.cache[a]?g=d.cache[a].cloneNode():f.test(a)?g=(d.cache[a]=d.createElem(a)).cloneNode():g=d.createElem(a),g.canHaveChildren&&!e.test(a)&&!g.tagUrn?d.frag.appendChild(g):g}function p(a,c){a||(a=b);if(k)return a.createDocumentFragment();c=c||n(a);var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return s.shivCSS&&!g&&!c.hasCSS&&(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,g,h="_html5shiv",i=0,j={},k;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){g=!0,k=!0}})();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.hasEvent=z,e.testProp=function(a){return G([a])},e.testAllProps=I,e.testStyles=y,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentButt and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisherâ€“Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate, context) {
    predicate = lookupIterator(predicate);
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate.call(context, elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);
var $users = $("#users-table-content");
var $reports = $("#reports-table-content");
var $userButton = $("#notifications-header #users");
var $reportButton = $("#notifications-header #reports");

$(function(){
	initGUI();
	loadUsers();
	loadReports();
});

function initGUI(){
	$userButton.click(function(){
		$(".section").css("display","none");
		$(".section#users").css("display","block");
	});
	$reportButton.click(function(){
		$(".section").css("display","none");
		$(".section#reports").css("display","block");
	});
	$(document).on("change",".useroption",function(){
		var userid = $(this).attr("userid");
		var status = $(this).find(":selected").attr("status");
		updateUser(userid, status);
	});
	$(document).on("change",".reportoption",function(){
		var reportid = $(this).attr("reportid");
		var status = $(this).find(":selected").attr("status");
		updateReport(reportid, status);
	});
}

function updateUser(userid, status){
	ImgurManager.updateUserStatus(function(data){
		if(data!=null){
			var $user = $("#user"+userid);
			var $icon = $($user.find(".status i")[0]);
			$icon.removeClass();
			switch(status){
				case "-1":
					$icon.addClass("icon-cancel user-deleted");
					break;
				case "0":
					$icon.addClass("icon-user user-default");
					break;
				case "1":
					$icon.addClass("icon-cog user-admin");
					break;
				case "2":
					$icon.addClass("icon-user-1 user-new");
					break;
				case "3":
					$icon.addClass("icon-block user-banned");
					break;
				case "4":
					$icon.addClass("icon-help-circled user-unregistered");
					break;
			}
		}
	}, userid, status);
}

function updateReport(reportid, status){
	ImgurManager.updateReport(function(data){
		if(data!=null){
			var $report = $("#report"+reportid);
			var $icon = $($reports.find(".status i")[0]);
			$icon.removeClass();
			switch(status){
				case "-1":
					$icon.addClass("icon-ok report-ok");
					break;
				case "0":
					$icon.addClass("icon-block report-default");
					break;
				case "1":
					$icon.addClass("icon-attention report-important");
					break;
			}
		}
	}, reportid, status);
}

function loadUsers(){
	ImgurManager.getUsers(fillUsersUI);
}

function loadReports(){
	ImgurManager.getReports(fillReportsUI);
}

function isNewUser(user){
	var ONE_SEC = 1000;
	var ONE_MIN = 60*ONE_SEC;
	var ONE_HOUR = 60*ONE_MIN;
	var ONE_DAY = 24*ONE_HOUR;
	var ONE_WEEK = 7*ONE_DAY;
	var timeObj = convertDateTime(user.joindate);
	var today = new Date();
	var timestamp = timeObj.getTime();
	var difference = today-timestamp;
	return(difference<=ONE_DAY)
}

function fillUsersUI(data){
	console.log(data);
	$users.html("");
	if(!data)return;
	var newUserCount = 0;
	for(var i=0; i<data.length; i++){
		var user = data[i];
		if(isNewUser(user))newUserCount++;
		addUser(user);
	}
	$("#users-table").tablesorter({ 
		sortList: [[3,1]],
        textExtraction: function(node) { 
        	if(node.hasAttribute("sort"))
        		return node.getAttribute("sort");
            return node.innerHTML; 
        } 
    });
    if(newUserCount==0)
    	$("#notifications-header #users").html("");
    else
    	$("#notifications-header #users").html(newUserCount);
    $("#notifications-header #users").attr("title",newUserCount+" neue(r) Benutzer in den letzten 24 Stunden");
}

function fillReportsUI(data){
	console.log(data);
	$reports.html("");
	if(!data)return;
	var newReportsCount = 0;
	for(var i=0; i<data.length; i++){
		var report = data[i];
		if(report["status"]!=-1){
			newReportsCount++;
		}
		addReport(report);
	}
	$("#reports-table").tablesorter({ 
		sortList: [[4,1],[3,1]],
        textExtraction: function(node) { 
        	if(node.hasAttribute("sort"))
        		return node.getAttribute("sort");
            return node.innerHTML; 
        } 
    });
    if(newReportsCount == 0)
    	$("#notifications-header #reports").html("");
    else
    	$("#notifications-header #reports").html(newReportsCount);
    $("#notifications-header #reports").attr("title",newReportsCount+" unbehandelte Meldung(en)");
}

function addUser(queriedUser){
	var icon = "<i class='icon-help user-unknown'></i>";
	var status = "Unbekannt";
	switch(queriedUser.status){
		case "-1":
			icon = '<i class="icon-cancel user-deleted"></i>';
			status = "Gel&ouml;scht";
			break;
		case "0":
			icon = '<i class="icon-user user-default"></i>';
			status = "Nutzer";
			break;
		case "1":
			icon = '<i class="icon-cog user-admin"></i>';
			status = "Admin";
			break;
		case "2":
			icon = '<i class="icon-user-1 user-new"></i>';
			status = "neuer Nutzer";
			break;
		case "3":
			icon = '<i class="icon-block user-banned"></i>';
			status = "Gebannt";
			break;
		case "4":
			icon = '<i class="icon-help-circled user-unregistered"></i>';
			status = "Unregistriert";
			break;
	}

	var s = queriedUser.status;
	var options = '<select userid="'+queriedUser.id+'" class="small-10 medium-10 large-10 useroption">';
	options += '<option '+(s==-1?"selected":"")+' status="-1" value>Gel&ouml;scht</option>';
	options += '<option '+(s==0?"selected":"")+' status="0" value>Nutzer</option>';
	options += '<option '+(s==1?"selected":"")+' status="1" value>Admin</option>';
	options += '<option '+(s==2?"selected":"")+' status="2" value>neuer Nutzer</option>';
	options += '<option '+(s==3?"selected":"")+' status="3" value>Gebannt</option>';
	options += '<option '+(s==4?"selected":"")+' status="4" value>Unregistriert</option></select>';

	if(user.id == queriedUser.id)options = "";

	var verified = "";
	if(queriedUser.sessionkey.length!=45){
		verified = '<i class="icon-ok" title="Email verifiziert"></i>';
	}

	var $container = $('<tr class="user-table-row" id="user'+queriedUser.id+'"> '
    +'<td class="id">'+queriedUser.id+'</td> '
    +'<td class="mail">'+queriedUser.email+verified+'</td> '
    +'<td class="username"><a href="user.php?id='+queriedUser.id+'" target="_blank">'+queriedUser.username+'</a></td> '
    +'<td class="date" title="'+queriedUser.joindate+'" sort="'+queriedUser.joindate+'">'+formatTime(queriedUser.joindate)+'</td> '
    +'<td class="date" title="'+queriedUser.lastaction+'" sort="'+queriedUser.lastaction+'">'+formatTime(queriedUser.lastaction)+'</td> '
    +'<td class="status" sort="'+queriedUser.status+'">'+icon+options+'</td> '
	+'</tr>');

	$users.append($container);
}

function addReport(report){
	var icon = "<i class='icon-help report-unknown'></i>";
	var status = "Unbekannt";
	switch(report.status){
		case "-1":
			icon = '<i class="icon-ok report-ok"></i>';
			status = "Gel&ouml;&szlig;t";
			break;
		case "0":
			icon = '<i class="icon-block report-default"></i>';
			status = "Meldung";
			break;
		case "1":
			icon = '<i class="icon-attention report-important"></i>';
			status = "Wichtig";
	}

	var s = report.status;
	var options = '<select reportid="'+report.reportid+'" class="small-10 medium-10 large-10 reportoption">';
	options += '<option '+(s==-1?"selected":"")+' status="-1" value>Gel&ouml;&szlig;t</option>';
	options += '<option '+(s==0?"selected":"")+' status="0" value>Meldung</option>';
	options += '<option '+(s==1?"selected":"")+' status="1" value>Wichtig</option></select>';

	var $container = $('<tr class="report-table-row" id="report'+report.reportid+'">'
		+'<td class="title"><a href="details.php?id='+report.entryid+'" target="_blank">'+report.entrytitle+'</a></td>'
		+'<td class="user"><a href="user.php?id='+report.userid+'" target="_blank">'+report.username+'</a></td>'
		+'<td class="report">'+report.reportdescription+'</td>'
		+'<td class="date" sort="'+report.reportdate+'">'+formatTime(report.reportdate)+'</td>'
		+'<td class="status" sort="'+report.status+'" >'+icon+options+'</td>'
		+'</tr>'
	);

	$reports.append($container);
}

/*
var hoverLoginMenu = document.getElementById("hoverLoginMenu");
var logoutlink = document.getElementById("logout-link");

logoutlink.onclick = userLogout;
*/
var expanded;
var comments = [];

var entry={};
$(function(){
	$("#image").css('width', '34px');
	cookieUser();
	refresh();
	showRating();
	initGUI();
	initComments();
});

function initComments(success){
	if(success){
		$("#comment-input").val("");
	}
	ImgurManager.getComments(showComments, id);
}

function showComments(c){
	if(!c || c.length == 0){
		$("#morecomments").css("display","none");
		return;
	}
	$(".comment").remove();
	addComments(c);
	comments.sort(function(a,b){
		return a.time.localeCompare(b.time);
	});
	for(var i=0; i<comments.length; i++){
		buildComment(comments[i]);
	}
}

function buildComment(comment){
	var $comment = $('<div comment-id="'+comment.commentid+'" class="comment"></div>');
	var usericon = getUserIcon(comment.userstatus);
	var $author = $('<div class="author">'+usericon+'<a href="user.php?id='+comment.userid+'">'+comment.username+'</a></div>');
	var $date = $('<div class="date">'+formatTime(comment.time)+'</div>');
	$date.attr("title",comment.time);
	if(user.admin || user.id == comment.userid){
		var $del = $('<i title="Kommentar l&ouml;schen" class="deletecomment icon-cancel"></i>');
		$date.append($del);
	}
	
	var com = comment.comment.trim();
	if(com.length==0){
		com = '<span class="missing">Kommentar gel&ouml;scht.</span>';
	}else{
		$comment.append($date);
		$comment.append($author);
	}
	var $text = $('<div class="text">'+com+'</div>');
	$comment.append($text);
	$("#comments-content").prepend($comment);
}

function addComments(c){
	for(var i=0; i<c.length; i++){
		var comment = c[i];
		var add = true;
		for(var j=0; j<comments.length; j++){
			if(comments[j].commentid == comment.commentid){
				add = false;
				break;
			}
		}
		if(add){
			comments[comments.length] = comment;
		}
	}
}

function initGUI(){
	if(!loggedIn())disable();
	else if(user.status=="4")disableForDummy();
	$("#transcription #content").click(changeTranscription);
	$("#thumbsdown").click(function(){
		if($(this).hasClass("mine")){
			ImgurManager.addRating(refresh, entry.id, 0);
		}else{
			ImgurManager.addRating(refresh, entry.id, -1);
		}
	});
	$("#thumbsup").click(function(){
		if($(this).hasClass("mine")){
			ImgurManager.addRating(refresh, entry.id, 0);
		}else{
			ImgurManager.addRating(refresh, entry.id, 1);
		}
	});
	$("#comment-input").keyup(function(e){
		if ( e.which == 13 ) {
			ImgurManager.addComment(initComments,id,$(this).val());
		}
	});
	$("#morecomments").click(function(){
		var lastComment = $(".comment").last().attr("comment-id");
		ImgurManager.getComments(showComments, id, lastComment);
	});
	$(document).on("click",".deletecomment",function(){
		var commentid = $($(this).closest(".comment")).attr("comment-id");
		ImgurManager.deleteComment(onCommentDeleted,commentid);
	});
	$("#deleteentry").click(function(){
		$('<div>Diesen Eintrag wirklich l&ouml;schen?</div>').dialog({
			modal: true,
			width: "auto",
			title: "Löschen?",
			buttons:{
				"OK":function(){
					ImgurManager.deleteEntry(id, function(success){
						if(success)window.location = "index.php";
					});
					$(this).dialog("close");
				},
				"Abbrechen":function(){
					$(this).dialog("close");
				}
			}
		});
	});
	$("#editentry").click(function(){
		window.location = "upload.php?id="+id;
	});
	$("#report-icon").click(function(){
		$('<form name="report"><textarea maxlength="400" cols="20" rows="8" id="description" style="height:auto;width:auto" placeholder="Bitte beschreibe hier, warum du diesen Eintrag melden m&ouml;chtest."></textarea></form>').dialog({
			modal: true,
			width: "auto",
			autoResize: true,
			title: "Eintrag melden?",
			buttons:{
				"OK":function(){
					var desc =  $('#description').val();
					ImgurManager.addReport(function(success){
							$dialog = "";
						if(success){
							$dialog = $('<div>Die Meldung wurde erfolgreich gesendet.</div>');
							$dialog.dialog({
								modal: false,
								width: "auto",
								title: "Vielen Dank für deine Meldung",
								show: true
							});
						}else{
							$dialog = $('<div><br>Deine Meldung wurde nicht erfolgreich eingetragen.<br>&Uuml;berpr&uuml;fe bitte, dass diese mindestens 10 Zeichen lang ist.</div>');
							$dialog.dialog({
								modal: false,
								width: "auto",
								title: "Leider gab es Probleme mit deiner Meldung",
								show: true
							});
						}

						$(this).mouseup(function (e)
						{
							if($dialog.hasClass('ui-dialog-content')){
							    if (!$dialog.is(e.target) && $dialog.has(e.target).length === 0) {
							        $dialog.dialog('close');
									$dialog.dialog("destroy");
							    }
							}   
						});
	
					}, id, desc, -1);
					$(this).dialog("close");
					$(this).dialog("destroy");
				},
				"Abbrechen":function(){
					$(this).dialog("close");
					$(this).dialog("destroy");
				}
			}
		});
	});
}

function disable(){
	$(".thumbs").css("display","none");
	$("#report").css("display","none");
	//$("#rating").attr("title","Melde dich an um diesen Eintrag zu bewerten.");
	$("#comment-input").attr("disabled","disabled");
	$("#comment-input").attr("title","Melde dich an um Kommentare zu schreiben.");
	$("#comment-input").attr("placeholder","Melde dich an um Kommentare zu schreiben.");	
}

function disableForDummy(){
	$(".thumbs").css("display","none");
	$("#comment-input").attr("disabled","disabled");
	$("#comment-input").attr("title","Melde dich an um Kommentare zu schreiben.");
	$("#comment-input").attr("placeholder","Melde dich an um Kommentare zu schreiben.");	
}

function onCommentDeleted(success, commentid){
	if(success){
		for(var i=0; i<comments.length; i++){
			if(comments[i].commentid==commentid){
				comments[i].comment = "";
				break;
			}
		}
		showComments(comments);
	}
}

function refresh(){
	ImgurManager.getEntry(fillUI, id);
}


function fillUI(e){
	if(e == "Error"){
		$dialog = $('<div>Der Eintrag wurde leider gel&ouml;scht.</div>');
		$dialog.dialog({
			modal: true,
			width: "auto",
			title: "Eintrag nicht vorhanden",
			close: function(){
				window.location = "index.php";
			}
		});
	}else{
		entry = e;
		document.title = e.title;
		if(e.userid == user.id || user.admin){
			$("#controlpanel").css("display","block");
		}
		
		setRating(entry);

		setImage(entry);

		//set title
		document.getElementById("title").innerHTML=entry.title;

		setInfo(entry);

		//set type
		var $t = $("#typedescription");
		$t.html(entry.typename);
		$t.attr("title",entry.typedescription);
		$t.attr("href", "search.php?type=type&values="+entry.typename);

		setTags(entry);

		//set sex
		var sex = entry.sex.toLowerCase();
		switch(sex){
			case "m":
				$("#sex").addClass("icon-male");
				$("#sex").prop("title", "Männertoilette");
				break;
			case "w":
				$("#sex").addClass("icon-female");
				$("#sex").prop("title", "Frauentoilette");
				break;
			default:
				$("#sex").addClass("icon-help");
				$("#sex").prop("title", "Unisex-Toilette");
		}

		//set upload info
		$("#upload-info #date").html(formatTime(entry.date));
		$("#upload-info #date").attr("title", entry.date);
		var usericon = getUserIcon(entry.userstatus);
		$("#upload-info #author").html(usericon+entry.username);
		$("#upload-info #author").attr("href", "user.php?id="+entry.userid);

		setTranscription();
	}
}

function setTags(entry){
	//set tags
	var $tags = $("#tags");
	$tags.html("");
	for(var i=0; i<entry.tags.length; i++){
		var tag = entry.tags[i];
		var $tag = $('<span id="tag-'+tag.tagid+'" class="tag" title="Nach weiteren Eintr&auml;gen mit dem Tag \''+tag.tag+'\' suchen.">'+tag.tag+'</span>');
		$tag.attr("href", "search.php?type=tag&values="+tag.tag);
		$tag.click(function(){
			window.location = $(this).attr("href");
		})
		$tags.append($tag);
	}
}

function setInfo(entry){
	//set artist
	$("#artist").html(entry.information[0].artist);

	//set location
	$("#locationdescription").html(entry.information[0].location);
	//$("locationdescription").attr("title", "Nach weiteren Eintr&auml;gen mit dem Ort \''+entry.information[0].location+'\' suchen.");
	//$("#locationdescription").attr("href", "search.php?type=location&values="+entry.information[0].location);
}

function setImage(entry){
	//set image
	var $image = $("#image");
	$("#image").css('width', '100%');
	var $entryTitle = $("#entry-title");
	$image.attr("src", entry.images[0].largethumbnail);
	$image.attr("title", entry.title);
}

function setRating(entry){
	//set rating
	$innerRating = $("#inner-rating");
	//calculation of "green"-percentage of the rating
	var r = entry.ratings[0].rating;
	if(!r)r=0;
	var i = parseFloat(r);
	var j = (1+i)*50;
	var width = j + "%";
	$innerRating.css("width", width);
	$("#ratingcount").html(entry.ratings[0].ratingcount);

	$(".thumbs").removeClass("mine");
	if(entry.ratings[0].ratedbyme){
		if(entry.ratings[0].ratedbyme==-1){
			$("#thumbsdown").addClass("mine");
		}else if(entry.ratings[0].ratedbyme==1){
			$("#thumbsup").addClass("mine");
		}
	}

	var user = entry.ratings[0].ratingcount+" Nutzern";
	if(entry.ratings[0].ratingcount==1)user = "einem Nutzer";

	var title = "Dieser Beitrag wurde von "+user+" zu "+Math.floor(j)+"% positiv bewertet.";
	if(entry.ratings[0].ratingcount==0)title="Dieser Beitrag wurde noch nicht bewertet.";
	$("#rating").attr("title",title);
}

function setTranscription(){
	//set transcription
	var trans = entry.information[0].transcription.trim();
	if(trans.length==0){
		trans = '<p class="missing">keine Transkription angegeben</p>';
		if(canTranscribe()){
			trans += '<button class="tiny">Transkription hinzuf&uuml;gen</button>';
		}else{
			trans += "(Melde dich an um selbst eine Transkription hinzuzuf&uuml;gen.)"
		}
	}else{
		if(canTranscribe()){
			$("#transcription #content").attr("title","zum Bearbeiten klicken");
		}else{
			$("#transcription #content").attr("title","");
		}
	}
	$("#transcription #content").html(trans);
}

function canTranscribe(){
	if($("#edittranscription").length != 0)return false;
	var permission = false;
	if(user.admin!==false)permission = true;
	if(user.id == entry.userid)permission = true;
	if(user.id == entry.information[0].userid)permission = true;
	if(entry.information[0]["transcription"].length == 0)permission = true;
	return permission;
}

function changeTranscription(){
	if(!canTranscribe())return;

	var $container = $('<div id="edittranscription"></div>');
	$input = $('<input id="input-transcription" type="text"></input>');
	$input.val(entry.information[0]["transcription"]);
	$ok = $('<button class="tiny">OK</ok>');
	$help = $('<label>'
		+'<a href="howto.php#transcription" target="_blank">Wie transkribiere ich richtig?</a>'
	+'</label>');
	$container.append($input);
	$container.append($ok);
	$container.append($help);
	$("#transcription #content").html($container);

	$ok.click(function(){
		updateTranscription($input.val());
	});
}

function updateTranscription(newTrans){
	if(!loggedIn())
		createDummy();
	else{
		ImgurManager.updateTranscription(onTranscriptionUpdated, entry["id"], newTrans);
	}
}

function createDummy(){
	message("Speichern", "Wir legen f&uuml;r dich einen Account an damit du deine Transkriptionen sp&auml;ter bearbeiten kannst.<br/>Bitte habe etwas Gedult.");
	user = {};
	user.password = guid();
	ImgurManager.createUser(onDummyCreated, "", user.password, "");
}

function onDummyCreated(data){
	if(data==null){
		message("Oops!", "Leider konnte wir keinen Account anlegen um Transkriptionen hinzuzuf&uuml;gen.<br/>Wende dich an einen Systemadministrator oder versuche es sp&auml;ter nochmal.");
	}else{
		ImgurManager.loginUser(onDummyLoginSuccess, data, user.password);
	}
}

function onDummyLoginSuccess(data){
	if(data==null){
		message("Oops!", "Leider konnte wir keinen Account einloggen um Transkriptionen hinzuzuf&uuml;gen.<br/>Wende dich an einen Systemadministrator oder versuche es sp&auml;ter nochmal.");
	}else{
		ImgurManager.getUserAuth(onGetUser, data);
	}
}

function onGetUser(data){
	saveUser(data);
	var newTrans = $("#input-transcription").val();
	ImgurManager.updateTranscription(onTranscriptionUpdated, entry["id"], newTrans);
}

function onTranscriptionUpdated(success){
	if(success!=null){
		entry.information[0]["transcription"] = $("#input-transcription").val();
		entry.information[0]["userid"] = user.id;
		entry.information[0]["username"] = user.username;
	}
	cookieUser();
	setTranscription();
	$(".error-dialog").dialog("close");
	$(".error-dialog").remove();
}

function userLogout(){
	console.log("userLogout");
	var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var logoutURL = "php/backend/logout.php?authkey="+authkey;
	$.get(logoutURL, function(data){
	console.log(data);
		if(!data["success"]){
			alert("Es gibt Probleme bei der Kommunikation mit dem Server");
		}
		else
		{
			switch(data["success"]){
				case 1: //delete cookies, call index.php 
				document.cookie = "authkey= ; expires= Thu, 01 Jan 1970 00:00:00 GMT";
				window.location = "index.php";
					break;
				default: console.log(data);					
			}
		}

	});

}

function showRating(){
	if(!expanded){
		$("#outer-rating").animate({width: "100"}, 500);
		expanded = true;
	}
}

function message(title, message){
	$(".error-dialog").dialog("close");
	$(".error-dialog").remove();
	var $dialog = $('<div class="error-dialog">'+message+"</div>");
	$dialog.dialog({
		modal: true,
		width: "80%",
		title: title
	});
}
var currentOrder = null;
var NO_SINGLE_IMAGE = "Wir können dir leider kein weiteres Bild liefern";
var NO_IMAGES = "Wir können dir leider keine weiteren Bilder mehr liefern";

var requests = [];

var $homeButton = $("#link-home");
var $infiniteContainer = $(".infinite-container");
var $imageContainer = $("#images");
var $tabsContainer = $(".tabs");
var $hotLink = $("#tab-hot");
var $newLink = $("#tab-new");
var $voteLink = $("#tab-vote");
var $transcribeLink = $("#tab-transcribe");
var $votingContainer = $(".vote-container");
var $transcribeContainer = $(".transcribe-container");
var $upVote = $("#up-vote");
var $downVote = $("#down-vote");
var $transcribeInput = $("#transcription-input");
var $submitTranscription = $("#transcription-submit");
var $skipTranscription = $("#skip-transcription");
var $mainheader = $("#mainheader");

$(document).ready(function() {
	$(window).scroll(function(event) {
		if($(window).scrollTop() > 100){
			$homeButton.css('visibility', 'visible');
		}else{
			$homeButton.css('visibility', 'hidden');
		}
	});
	setupTabFunctionality();
	setupVoting();
	setupTranscribing();
	setupImageClick();
	setupCurrentTab();
});


$(document).on("complete", function(){
	setupOnce();
	refreshWaypoints();
});

$(document).on("sizesmall", function(){
	if(getActiveState() == "transcribe" || getActiveState() == undefined){
		$newLink.trigger('click');
	}	
});

$(document).on("votingend", function(){
	clearRequests();
	var state = getActiveState();
	if(state == "vote"){
		getVoteEntries();
	}else if(state == "transcribe"){
		getUntranscribedEntries();
	}	
});

function setupTabFunctionality(){
	GalleryView.init($imageContainer);
	var lazyHotClick = _.throttle(handleHotClick, 2000);
	var lazyNewClick = _.throttle(handleNewClick, 2000);
	var lazyVoteClick = _.throttle(handleVoteClick, 2000);
	var lazyTranscribeClick = _.throttle(handleTranscribeClick, 2000);
	$hotLink.click(lazyHotClick);
	$newLink.click(lazyNewClick);
	$voteLink.click(lazyVoteClick);
	$(document).on("click", "#tab-transcribe", lazyTranscribeClick);
}

function handleHotClick(){
	deleteMessage();
	GalleryView.setMaxwidth(true);
	setActive($hotLink.parent("dd"));
	window.location.hash="hot";
	enableInfiniteScroll();
	disableVoting();
	disableTranscribing();
	setOrder(ImgurManager.OrderBy.properties[ImgurManager.OrderBy.RATING].name);
	clearRequests();
	getEntries(ImgurManager.OrderBy.properties[ImgurManager.OrderBy.RATING].name);
}

function handleNewClick(){
	deleteMessage();
	GalleryView.setMaxwidth(true);
	setActive($newLink.parent("dd"));
	window.location.hash="new";
	enableInfiniteScroll();
	disableVoting();
	disableTranscribing();
	setOrder(ImgurManager.OrderBy.properties[ImgurManager.OrderBy.DATE].name);
	clearRequests();
	getEntries(ImgurManager.OrderBy.properties[ImgurManager.OrderBy.DATE].name);
}

function handleVoteClick(){
	deleteMessage();
	GalleryView.setMaxwidth(false);
	setActive($voteLink.parent("dd"));
	window.location.hash="vote";
	disableTranscribing();
	disableInfiniteScroll();
	clearRequests();
	if(loggedIn()){
		getVoteEntries();
	}else{
		appendMessage("Bitte melde dich an um Bilder zu bewerten.");
	}
}

function handleTranscribeClick(){
	deleteMessage();
	GalleryView.setMaxwidth(false);
	setActive($transcribeLink.parent("dd"));
	window.location.hash="transcribe";
	disableInfiniteScroll();
	disableVoting();
	enableTranscribing();
	clearRequests();
	getUntranscribedEntries();
}

function setupImageClick(){
	$(document).on("click", ".jg-image",function(){
		var id = $($(this).find("a")[0]).attr("title");
		window.location = "details.php?id=" + id;
	});
}

function setupVoting(){
	$upVote.click(function(event) {
		event.preventDefault();
		lazyVoteClick(false);
	});
	$downVote.click(function(event) {
		event.preventDefault();
		lazyVoteClick(true);
	});
}

function setupTranscribing(){
	$skipTranscription.click(function(event) {
		lazyTranscribeClick(event);
	});
	$submitTranscription.click(function(event) {
		lazyTranscribeClick(event);
	});
}

function setupInfiniteScroll(){
	var vpTopOffset = $mainheader.height() + $tabsContainer.height();
	$homeButton.click(function(event) {
		event.preventDefault();
		$("html, body").animate({scrollTop: 0}, 400);
	});
	$("html").waypoint(function(direction) {
		if(direction == "down"){
			if($.waypoints('viewportHeight') < $(this).height()){
				if(getActiveState() == "transcribe"){
					getUntranscribedEntries();
				}else{
					getEntries();
				}				
			}		
		}
	}, { offset: 'bottom-in-view'
	});
}

function setupCurrentTab(){
	var url = document.URL;
	
	if(url.indexOf("#hot") != -1){
		setActive($hotLink.parent("dd"));
		handleHotClick();
	}else if(url.indexOf("#vote") != -1){
		setActive($voteLink.parent("dd"));
		handleVoteClick();
	}else if(url.indexOf("#transcribe") != -1){
		setActive($transcribeLink.parent("dd"));
		handleTranscribeClick();
	}else{
		setActive($newLink.parent("dd"));
		window.location.hash="new"
		//getEntries(ImgurManager.OrderBy.properties[ImgurManager.OrderBy.DATE].name);
		handleNewClick();
	}
}

var setupOnce = _.once(setupInfiniteScroll);


function appendMessage(message){
	message = message || "Es gibt leider keine weiteren Bilder mehr";
	$(".message").html(message);
	$(".message").addClass('label secondary');
}

function deleteMessage(){
	$(".message").html("");
	$(".message").removeClass('label secondary round');
}

function enableVoting(){
	$votingContainer.css('display', 'block');
}

function enableTranscribing(){
	$transcribeContainer.css('display', 'block');
}

function handleVote(sucks){
	var rating = 0;
	var entryid = $imageContainer.find('.jg-image').find('a').attr('title');
	if(sucks){
		rating = -1;
	}else{
		rating = 1;
	}
	addRating(entryid, rating);
}

function handleTranscription(e){
	if(e.target.id == "transcription-submit"){
		var entryid = $imageContainer.find('.jg-image').find('a').attr('title');
		var transcription = $transcribeInput.val();
		if(_.isUndefined(transcription)){
			return;
		}
		if(transcription.length > 1){
			//$transcribeInput.val("Transkription...");
			addTranscribtion(entryid, transcription);
		}
	}else{
		GalleryView.loadSingleImage();
	}
}

var lazyVoteClick = _.throttle(handleVote, 2000);

var lazyTranscribeClick = _.throttle(handleTranscription);

function disableVoting(){
	$votingContainer.css('display', 'none');
}

function disableTranscribing(){
	$transcribeContainer.css('display', 'none');
}

function enableInfiniteScroll(){
	$("html").waypoint('enable');
}

function disableInfiniteScroll(){
	$("html").waypoint('disable');
}

function refreshWaypoints(){
	$.waypoints('refresh');
}

function setActive(linkContainer){
	$(linkContainer).siblings('dd.active').removeClass('active');
	$(linkContainer).addClass('active');
}

function getActiveState(){
	return $tabsContainer.children('.active').find('a').html().toLowerCase();
}

function getEntries(orderby){
	var order = orderby || currentOrder;
	if(order == ImgurManager.OrderBy.properties[ImgurManager.OrderBy.DATE].name){
		setRequest("new");
	}else{
		setRequest("hot");
	}
	ImgurManager.getEntries(computeEntries, order, GalleryView.getLastEntry());
}

function getVoteEntries(){
	setRequest("vote");
	ImgurManager.getRandomEntries(computeVoteEntries);
}

function getUntranscribedEntries(){
	setRequest("transcribe");
	ImgurManager.getRandomUnstranscribedEntries(computeTranscribeEntries);
}

function computeEntries(entries, orderby){
	if(ImgurManager.OrderBy.properties[ImgurManager.OrderBy.DATE].name == orderby){
		if(!isLastestRequest("new")){
			return;
		}
	}else{
		if(!isLastestRequest("hot")){
			return;
		}
	}
	if(_.isNull(entries) || _.isEmpty(entries)){
		appendMessage(NO_IMAGES);
	}else{
		GalleryView.init($imageContainer);
		if(GalleryView.appendEntries(entries)){
			GalleryView.loadAllImages();
		}else{
			appendMessage(NO_IMAGES);
		}
	}
}

function computeTranscribeEntries(entries){
	if(!isLastestRequest("transcribe")){
		return;
	}
	if(_.isNull(entries) || _.isEmpty(entries)){
		disableTranscribing();
		clearScreen();
		appendMessage(NO_SINGLE_IMAGE);
	}else{
		enableTranscribing();
		GalleryView.init($imageContainer);
		GalleryView.appendEntries(entries);
		GalleryView.loadSingleImage();
	}
}

function computeVoteEntries(entries){
	if(!isLastestRequest("vote")){
		return;
	}
	if(_.isNull(entries) || _.isEmpty(entries)){
		disableVoting();
		clearScreen();
		appendMessage(NO_SINGLE_IMAGE);
	}else{
		enableVoting();
		GalleryView.init($imageContainer);
		GalleryView.appendEntries(entries);
		GalleryView.loadSingleImage();
	}
}

function setOrder(newOrder){
	if(newOrder == currentOrder){
		return;
	}
	currentOrder = newOrder;
}

function setRequest(which){
	requests[requests.length] = which;
	if(requests.length > 3){
		requests = requests.slice(1);
	}
}

function isLastestRequest(which){
	var lastRequest = _.last(requests);
	if(_.isUndefined(lastRequest)){
		return true;
	}
	if(_.last(requests) == which){
		return true;
	}else{
		return false;
	}
}

function addRating(entryid, rating){
	ImgurManager.addRating(GalleryView.loadSingleImage, entryid, rating);
}

function addTranscribtion(entryid, transcription){
	if(!loggedIn())
		createDummy();
	else{
		ImgurManager.updateTranscription(GalleryView.loadSingleImage, entryid, transcription);
		$transcribeInput.val("");
	}
}

function createDummy(){
	message("Speichern", "Wir legen f&uuml;r dich einen Account an damit du deine Transkriptionen sp&auml;ter bearbeiten kannst.<br/>Bitte habe etwas Gedult.");
	user = {};
	user.password = guid();
	ImgurManager.createUser(onDummyCreated, "", user.password, "");
}

function onDummyCreated(data){
	if(data==null){
		message("Oops!", "Leider konnte wir keinen Account anlegen um Transkriptionen hinzuzuf&uuml;gen.<br/>Wende dich an einen Systemadministrator oder versuche es sp&auml;ter nochmal.");
	}else{
		ImgurManager.loginUser(onDummyLoginSuccess, data, user.password);
	}
}

function onDummyLoginSuccess(data){
	if(data==null){
		message("Oops!", "Leider konnte wir keinen Account einloggen um Transkriptionen hinzuzuf&uuml;gen.<br/>Wende dich an einen Systemadministrator oder versuche es sp&auml;ter nochmal.");
	}else{
		ImgurManager.getUserAuth(onGetUser, data);
	}
}

function onGetUser(data){
	$(".error-dialog").dialog("close");
	$(".error-dialog").remove();
	saveUser(data);
	var entryid = $imageContainer.find('.jg-image').find('a').attr('title');
	var transcription = $transcribeInput.val();
	ImgurManager.updateTranscription(GalleryView.loadSingleImage, entryid, transcription);
	$transcribeInput.val("");
}

function clearRequests(){
	GalleryView.resetEntries();
	if($imageContainer.children().length > 0){
		clearScreen();
	}
}

function clearScreen(){
	$imageContainer.empty();
}

function message(title, message){
	$(".error-dialog").dialog("close");
	$(".error-dialog").remove();
	var $dialog = $('<div class="error-dialog">'+message+"</div>");
	$dialog.dialog({
		modal: true,
		width: "80%",
		title: title
	});
}
var $loginLink = $("#link-login");
var $overlay;
var $backButton;
var $loginButton;
var $registerButton;
var $registerInput;
var $mailInput;
var $passwordInput;
var $loginForm;

var loginTemplate = null; 
var userTemplate = null;

$(document).ready(function() {
	loginTemplate = _.template($("script.login-template").html());
	userTemplate = _.template($("script.overlay-user").html());

	$loginLink.click(function(event) {
		if(isLoggedIn()&&user.status!="4"){
			manageLoginOverlay();
		}else{
			appendLoginOverlay();
		}
	});

	$(this).mouseup(function (e)
	{
	    var container = $("#user-overlay");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	        $(container).remove();
	    }
	});
});

function isLoggedIn(){
	return loggedIn();
}

function manageLoginOverlay(){
	if($("#user-overlay").length < 1){
		$("#mainnav").append(userTemplate());
		$("#link-logout").click(function(event) {
			/*
			var d = new Date(1970, 1);
			document.cookie = "username=''	; expires=" + d.toGMTString();
			document.cookie = "userid=''; expires=" + d.toGMTString();
			document.cookie = "admin=''; expires=" + d.toGMTString();
			document.cookie = "authkey=''; expires=" + d.toGMTString();
			ImgurManager.logout(logoutSuccess);
			window.location = "index.php";
			*/
			logoutUser(null);
		});
		$("#link-myimages").attr('href', 'user.php?id=' + user.id);
		$("#link-user").attr('href', 'register.php?edit=true');
	}else{
		$("#user-overlay").remove();
	}
}


function appendLoginOverlay(){
	createOverlayBackground();
	$("body").append(loginTemplate());

	$overlay = $(".overlaycontent");
	$backButton = $("#back-button");
	$loginButton = $("#login-button");
	$registerButton = $("#register-button");
	$registerInput = $("#register-input");
	$mailInput = $("#mail-input");
	$passwordInput = $("#password-input");
	$loginForm = $("#login-form");

	$mailInput.on('keypress', function(event) {
		var code = event.which;
		if(code == 13){
			$loginButton.trigger('click');
		}
	});

	$passwordInput.on('keypress', function(event) {
		var code = event.which;
		if(code == 13){
			$loginButton.trigger('click');
		}
	});

	$backButton.click(function(event) {
		removeOverlayBackground();
		$overlay.remove();
	});

	$loginButton.click(function(event) {
		userLogin();
	});

	$registerButton.click(function(event){
		var mail = $mailInput.val();
		if(mail){
			window.location = "register.php?mail=" + mail;
		}else{
			window.location = "register.php";
		}
	});
}

function userLogin(){
	var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var md5_pwd = $.md5($passwordInput.val());
	var url = "php/backend/login.php?mail=" + $mailInput.val() + "&password=" + md5_pwd;
	if(authkey && authkey.length == AUTH_KEY_LENGTH){
		url += "&authkey="+authkey;
	}

	$.get(url, function(data){
		if(!data["success"]){
			error("Es gibt Probleme bei der Kommunikation mit dem Server");
		}
		else
		{
			switch(data["success"]){
				case 1: 
					onLoginSuccess(data["data"]);
					break;
				case 3: 
					error("Es fehlt ein Parameter. Bitte wenden Sie sich an den Admin.");
					break;
				case 0: 
					console.log(data["message"]);
					break;
				case -1: 
					console.log("code not logged in");
					break;
				case 7:
					error("Nutzername oder Passwort nicht gefunden oder Email noch nicht best&auml;tigt.");
					break;
				default: 
					console.log(data);					
			}
		}
	});
}

function getUser(authkey){
	var url = "php/backend/getUser.php?authkey=" + authkey;
	$.get(url, function(data){
		if(!data["success"]){
			alert("Es gibt Probleme bei der Kommunikation mit dem Server beim");
		}
		else
		{
			switch(data["success"]){
				case 1: 
					saveUser(data["data"]);
					window.location.reload(true);
					break;
				case 3: 
					error("Es fehlt ein Parameter. Bitte wenden Sie sich an den Admin.");
					break;
				case 0: 
					console.log(data["message"]);
					break;
				case -1: 
					console.log("code not logged in");
					break;
				case 7:
					error("Nutzername oder Passwort nicht gefunden oder Email noch nicht best&auml;tigt.");
					break;
				default: 
					console.log(data);					
			}
		}
	});
}

function error(message){
	var $dialog = $('<div class="error-dialog">' + message + "</div>");
	$dialog.dialog({
		modal: true,
		width: "80%",
		title: "Oops!"
	});
}

function onLoginSuccess(authkey){
	var d = new Date();
	var oneYear = 31536000000;
	d.setTime(d.getTime() + oneYear);
	document.cookie = "authkey=" + authkey + "; expires=" + d.toGMTString();
	getUser(authkey);
}





var linkSearch = document.getElementById("link-search");
var searchContent = document.getElementById("searchcontent");
var linkLogin = document.getElementById("link-login");
var loginContent = document.getElementById("logincontent");
var backButton = document.getElementById("overlayBackButton");
 	
linkSearch.onclick = showSearchOverlay;
linkLogin.onclick = showLoginOverlay;
backButton.onclick = hideOverlay;



function showSearchOverlay(){
	if(!document.getElementById("overlay")) {
			div = document.createElement("div");
			div.setAttribute('id', 'overlay');
			document.getElementsByTagName("body")[0].appendChild(div);
			document.getElementsByTagName("body")[0].appendChild(searchContent);
			searchContent.style.display="block";	
	}
}
/*function hideSearchOverlay(){
	if(document.getElementById("overlay")) 
	{
		document.getElementsByTagName("body")[0].removeChild(searchContent);
		document.getElementsByTagName("body")[0].removeChild(document.getElementById("overlay"));
	}
}*/

//////////////////////////////////////////////////////////////////
console.log("loginOverlay");


function showLoginOverlay(){
	if(!document.getElementById("overlay")) {
			div = document.createElement("div");
			div.setAttribute('id', 'overlay');
			document.getElementsByTagName("body")[0].appendChild(div);
			document.getElementsByTagName("body")[0].appendChild(loginContent);
			loginContent.style.display="block";			
	}
}

function hideOverlay(){
	console.log("hideOverlay");
	if(document.getElementById("overlay")) 
		{ 
			
			if(document.getElementById("logincontent")){
				document.getElementsByTagName("body")[0].removeChild(loginContent);
			}	
			if(document.getElementById("searchcontent")){
				document.getElementsByTagName("body")[0].removeChild(searchContent);
			}	
		document.getElementsByTagName("body")[0].removeChild(document.getElementById("overlay"));
	}
}





var $form = $(".form-register");
var $submitButton = $("#register-submit");
var $mailInput = $("input#mail");
var $userNameInput = $("input#username");
var $passwordInput = $("input#password");
var $oldPasswordInput = $("input#old-password");

$(document).ready(function() {
	$form
  		.on('invalid', function () {
    		
  		})
  		.on('valid', function () {
  			console.log("Form valid");
  			if(edit&&user.status!="4"){
  				updateUser();
  			}else{
	    		registerUser();
	    	}
  		});

  	$form.on('submit', function(event) {
  		event.preventDefault();
  		console.log("Form submit");
  	});

  	$submitButton.click(function(event) {
  		
  	});

  	if(edit&&user.status!="4")initEditing();
  	else{
  		$("#old-pwd").remove();
  	}
});

function initEditing(){
	document.title = "Benutzer";
	$("#header").html("Benutzer");
	$("#register-submit").html("Speichern");
	$("#username").attr("disabled","disabled");
	$("#mail").attr("disabled","disabled");
	$("#new-pwd").html("Neues Password");
	ImgurManager.getUser(fillUser, user.id);
}

function fillUser(user){
	console.log(user);
	$("#username").val(user.username);
	$("#mail").val(user.email);
}

function registerUser(){
	if(user.status=="4")return updateDummy();
	else{
		var mail = $mailInput.val();
		var username = $userNameInput.val();
		var md5_pwd = $.md5($passwordInput.val());
		ImgurManager.createUser(onLoginSuccess, username, md5_pwd, mail);
	}
}

function updateDummy(){
	var md5_pwd = $.md5($passwordInput.val());
	var mail = $mailInput.val();
	var username = $userNameInput.val();
	ImgurManager.updateUser(onLoginSuccess, mail, username, md5_pwd);
}

function updateUser(){
	var old_md5_pwd = $.md5($oldPasswordInput.val());
	ImgurManager.loginUser(onLoginResult, user.username, old_md5_pwd);
}

function onLoginResult(data){
	if(data == null){
		$("<div>Ihr altes Passwort stimmt nicht.</div>").dialog(
		{
			dialogClass: "no-close",
			modal: true,
			width: 'auto',
			title: 'Speichern fehlgeschlagen',
			buttons: [
				{
					text: 'OK',
					click: function(){
						$(this).dialog('close');
					}
				}
			]
		});
	}else{
		var md5_pwd = $.md5($passwordInput.val());
		var mail = $mailInput.val();
		var username = $userNameInput.val();
		ImgurManager.updateUser(onUpdateResult, mail, username, md5_pwd);
	}
}

function onUpdateResult(success){
	if(success == null){
		$("<div>Speichern ist fehlgeschlagen!</br>Anscheinend gibt es Probleme mit dem Server.</br>Probieren Sie es später noch einmal</div>").dialog(
		{
			dialogClass: "no-close",
			modal: true,
			width: 'auto',
			title: 'Speichern fehlgeschlagen',
			close: function(event, ui) {
				window.location = "index.php";
			},
			buttons: [
				{
					text: 'OK',
					click: function(){
						$(this).dialog('close');
					}
				}
			]
		});
	}else{
		var username = $userNameInput.val();
		var d = new Date();
		var oneYear = 31536000000;
		d.setTime(d.getTime() + oneYear);
		document.cookie = "username=" + username + "; expires=" + d.toGMTString();
		document.cookie = "userid=" + user.id + "; expires=" + d.toGMTString();
		document.cookie = "admin=" + user.status + "; expires=" + d.toGMTString();
		window.location = "index.php";
		$("<div>Benutzerdaten erfolgreich aktualisiert.</div>").dialog(
		{
			dialogClass: "no-close",
			modal: true,
			width: 'auto',
			title: 'Speichern erfolgreich',
			close: function(event, ui) {
				window.location = "index.php";
			},
			buttons: [
				{
					text: 'OK',
					click: function(){
						$(this).dialog('close');
					}
				}
			]
		});
	}
}

function onLoginSuccess(authkey){
	if(authkey == null){
		$("<div>Die Registrierung ist fehlgeschlagen!</br>Anscheinend gibt es Probleme mit dem Server.</br>Probieren Sie es später noch einmal</div>").dialog(
		{
			dialogClass: "no-close",
			modal: true,
			width: 'auto',
			title: 'Registrierung fehlgeschlagen',
			close: function(event, ui) {
				window.location = "index.php";
			},
			buttons: [
				{
					text: 'OK',
					click: function(){
						$(this).dialog('close');
					}
				}
			]
		});
	}else{
		$("<div>Die Registrierung war erfolgreich!</br>Wir haben eine Email an "+authkey+" geschickt, die du noch best&auml;tigen musst bevor du dich einloggen kannst.</div>").dialog(
		{
			dialogClass: "no-close",
			modal: true,
			width: 'auto',
			title: 'Registrierung erfolgreich',
			close: function(event, ui) {
				logoutUser(null);
				window.location = "index.php";
			},
			buttons: [
				{
					text: 'OK',
					click: function(){
						$(this).dialog('close');
					}
				}
			]
		});
	}
}

function logUserIn(user){
	if(user){
		var d = new Date();
		var oneYear = 31536000000;
		d.setTime(d.getTime() + oneYear);
		document.cookie = "username=" + user.username + "; expires=" + d.toGMTString();
		document.cookie = "userid=" + user.id + "; expires=" + d.toGMTString();
		document.cookie = "admin=" + user.status + "; expires=" + d.toGMTString();

		$("<div>Sie haben sich erfolgreich angemeldet!</div>").dialog({
			dialogClass: "no-close",
			modal: true,
			width: 'auto',
			close: function(event, ui) {
				window.location = "index.php";
			},
			title: 'Registrierung abgeschlossen',
			buttons: {
				'OK': function(){
					$(this).dialog('close');
				}
			}
		});
	}
}
var $searchLink = $("#link-search");
var $overlayBackground;
var $overlay;
var $backButton;
var $submitButton;
var $searchInput;
var autocompleteList = [];
var tags = [];
var types = [];
var locations = [];
var sex = ["Männertoilette", "Frauentoilette", "Unisex-Toilette"];

var searchTemplate = null; 

$(document).ready(function() {
	searchTemplate = _.template($("script.search-template").html());

	$searchLink.click(function(event) {
		ImgurManager.getTags(getSearchTags);
		// ImgurManager.getUserTags(getSearchTags);
		ImgurManager.getTypes(getSearchTypes);
		ImgurManager.getUsedLocations(getSearchLocations);
		appendSearchOverlay();
	});
});

function appendSearchOverlay(){
	createOverlayBackground();

	$("body").append(searchTemplate());

	$overlay = $(".overlaycontent");
	$searchLink = $("#link-search");
	$backButton = $("#back-button");
	$submitButton = $("#search-button");
	$searchInput = $("#search-input");
	$filterSwitch = $("#myonoffswitch");
	$filterTypesContainer = $(".filter-type-container");

	$backButton.click(function(event) {
		removeOverlayBackground();
		$overlay.remove();
	});

	$submitButton.click(function(event) {
		if($searchInput.val().length > 0){
			var url = 'search.php?query=' + $.trim($searchInput.val());
			window.location = url;
		}else if($filterSwitch.is(":checked")){
			var filterFor = $("input:radio[name=filtertype]:checked").val();
			var values = [];
			$.each($('#tag-search-list .tag-active').children('span'), function() {
				 values[values.length] = $(this).html();
			});
			if(values.length > 0){
				var url = 'search.php?type=' + filterFor + "&values=" + values;
				window.location = url;
			}
		}
	});

	$filterSwitch.change(function(event) {
		if($(this).is(":checked")){
			$searchInput.animate({'opacity': 0}, 700);
			$filterTypesContainer.fadeIn(400, function(){
				$searchInput.prop('disabled', true);
				$searchInput.attr('placeholder', '');
				$("#tag-search-list").hide();
				appendSearchTags($("input:radio[name=filtertype]:checked").val());

				$submitButton.html("Filtern");

		    	$("input:radio[name=filtertype]").change(function(event) {
		    		var filterFor = $("input:radio[name=filtertype]:checked").val();
		    		$("#tag-search-list").hide();
		    		$("#tag-search-list").empty();
		    		if(filterFor == "sex"){
		    			appendSearchTags(filterFor, true);
		    		}else{
		    			appendSearchTags(filterFor, false);
		    		}
		    	});
			});
			
		}else{
			$("#tag-search-list").empty();
			$submitButton.html("Suchen");
			$searchInput.attr('placeholder', 'Suche nach...');
			$searchInput.animate({'opacity': 1}, 400);
			$searchInput.prop('disabled', false);
			$filterTypesContainer.fadeOut(400);
		}
	});

	$searchInput.on('keypress', function(event) {
		var code = event.which;
		if(code == 13){
			$submitButton.trigger('click');
		}
	});
}

function appendSearchTags(which, singleValue){
	switch(which){
		case "tag":
			for(var i = 0; i < tags.length; i++){
				if(!_.isUndefined(tags[i])){
					appendSingleSearchTag(tags[i], singleValue);
				}
			}
			break;
		case "type":
			for(var i = 0; i < types.length; i++){
				if(!_.isUndefined(types[i])){
					appendSingleSearchTag(types[i], singleValue);
				}
			}
			break;
		case "sex":
			for(var i = 0; i < sex.length; i++){
				if(!_.isUndefined(sex[i])){
					appendSingleSearchTag(sex[i], singleValue);
				}
			}
			break;
		case "location":
			for(var i = 0; i < locations.length; i++){
				if(!_.isUndefined(locations[i])){
					appendSingleSearchTag(locations[i], singleValue);
				}
			}
			break;
	}
	$("#tag-search-list").fadeIn();
}

function appendSingleSearchTag(tag, singleValue){
	var $tagItem = $("<li><span>" + tag + "</span></li>");

	$tagItem.click(function(event) {
		searchTagFunctionality($(this), singleValue);
	});

	$("#tag-search-list").append($tagItem);
}

function searchTagFunctionality(tag, singleValue){
	var $tag = $(tag);
	if($tag.hasClass('tag-active')){
		$tag.removeClass('tag-active');
		$tag.children('span').removeClass('tag-active-text');
	}else{
		if(singleValue){
			$.each($('.tag-active'), function() {
				$(this).removeClass('tag-active');
			});
		}
		$tag.addClass('tag-active');
		$tag.children('span').addClass('tag-active-text');
	}
}

function getSearchTags(tagData){
	if(_.isUndefined(tagData) || _.isNull(tagData)){
		return;
	}else{
		if(_.isEmpty(tagData)){
			return;
		}else{
			tags = _.pluck(tagData, 'tag');
			tags = tags.slice(0, 10);
		}
	}
}

function getSearchTypes(typeData){
	if(_.isUndefined(typeData) || _.isNull(typeData)){
		return;
	}else{
		if(_.isEmpty(typeData)){
			return;
		}else{
			types = _.pluck(typeData, 'name');
		}
	}
}

function getSearchLocations(locationData){
	if(_.isUndefined(locationData) || _.isNull(locationData)){
		return;
	}else{
		if(_.isEmpty(locationData)){
			return;
		}else{
			locations = _.pluck(locationData, 'location');
		}
	}
}






var $searchTermLabel = $(".search-term");
var $imageContainer = $("#images");
var NO_RESULTS = "Für diesen Suchbegriff gab es leider keine Treffer!";
var NO_MORE_IMAGES = "Wir können dir leider keine weiteren Bilder mehr liefern";

$(document).ready(function() {
	if(query != null){
		setupImageClick();
		ImgurManager.search(computeSearch, query, 0);
	}else if(type != null){
		setupImageClick();
		switch(type){
			case "sex":
				var sex = "";
				if(values == "Männer"){
					sex = "m";
				}else if(values == "Frauen"){
					sex = "w";
				}else{
					sex = "u";
				}
				ImgurManager.searchBySex(computeSearch, sex, null, 0);
				return;
			case "type":
				ImgurManager.searchByType(computeSearch, values, null, 0);
				return;
			case "tag":
				ImgurManager.searchByTag(computeSearch, values, null, 0);
				return;
			case "location":
				ImgurManager.searchByLocation(computeSearch, values, null, 0);
				return;
		}
	}else{
		resultsError(NO_RESULTS);
	}
});

$(document).on("complete", function(){
	setupOnce();
	$.waypoints('refresh');
});

function setupImageClick(){
	$(document).on("click", ".jg-image",function(){
		var id = $($(this).find("a")[0]).attr("title");
		window.location = "details.php?id=" + id;
	});
}

function setupInfiniteScroll(){
	var vpTopOffset = $("#mainheader").height();
	$("html").waypoint(function(direction) {
		if(direction == "down"){
			if($.waypoints('viewportHeight') < $(this).height()){
				ImgurManager.search(computeSearch, query, GalleryView.getLastEntry());
			}		
		}
	}, { offset: 'bottom-in-view'
	});
}

var setupOnce = _.once(setupInfiniteScroll);

function computeSearch(searchData){
	if(query != null){
		$searchTermLabel.html(query);
	}else{
		$searchTermLabel.html(values);
	}
	
	if(_.isNull(searchData) || _.isUndefined(searchData)){
		if($('.jg-row').length > 0){
			resultsError(NO_MORE_IMAGES);
		}else{
			resultsError(NO_RESULTS);
		}
	}else if(_.isEmpty(searchData)){
		if($('.jg-row').length > 0){
			resultsError(NO_MORE_IMAGES);
		}else{
			resultsError(NO_RESULTS);
		}
	}else{
		GalleryView.init($imageContainer);
		showResults(searchData);
	}
}

function resultsError(msg){
	var content = "<div class='error-message secondary label'>" + msg + "</div>";
	if($(".error-message").length < 1){
		$imageContainer.append(content);
	}
}

function showResults(searchData){
	GalleryView.appendEntries(searchData);
	GalleryView.loadAllImages();
}
var user = {};

var actions = [];

$(function(){
	loadTimeline();
	initGUI();
});

function initGUI(){
	$("#moreactions").click(function(){
		var count = actions.length;
		console.log("loading action #"+count);
		ImgurManager.getTimeline(fillUI, count);
	});
}

function loadTimeline(){
	ImgurManager.getTimeline(fillUI);
}

function fillUI(ac){
	if(!ac||ac.length == 0){
		console.log("Error getting timeline");
		$("#moreactions").css("display","none");
		return;
	}
	fillActions(ac);
	$(".action").remove();
	for(var i=0; i<actions.length; i++){
		addAction(actions[i]);
	}
}

function fillActions(ac){
	for(var i=0; i<ac.length; i++){
		var action = ac[i];
		var add = true;
		for(var j=0; j<actions.length; j++){
			if(actions[j].date == ac[i].date
				&&actions[j].transcription == ac[i].transcription
				&&actions[j].rating == ac[i].rating
				&&actions[j].comment == ac[i].comment){
				add = false;
				break;
			}
		}
		if(add){
			actions[actions.length]=action;
		}
	}
}

function addAction(action){
	if(action.comment != null)addComment(action);
	else if(action.rating != null)addRating(action);
	else if(action.transcription != null)addTranscription(action);
	else addUpload(action);
}

function addComment(comment){
	if(comment.userid == user.id)comment.username = "Du";
	if(comment.comment.trim().length == 0)return;
	var $container = $('<div class="action"></div>');
	var $img = $('<a href="details.php?id='+comment.entryid+'"><img src="'+comment.smallthumbnail+'" title="'+comment.title+'"></img></a>');
	var $user = $('<a href="user.php?id='+comment.userid+'">'+comment.username+"</a>");
	if(comment.comment.trim().length == 0)comment.comment = '<span class="missing">Kommentar gel&ouml;scht</span>';
	var $comment = $('<div class="comment">'+comment.comment+'</div>');
	var $left = $('<div class="leftcontainer container"></div>');
	var $right = $('<div class="rightcontainer container"></div>');
	var $info = $('<div class="info"><i class="icon-comment"/></div>');
	var $time = $('<div class="time">'+formatTime(comment.date)+'</div>');

	$info.append($user);
	if(comment.userid == user.id) $info.append(" hast ein Bild kommentiert:");
	else $info.append(" hat ein Bild von dir kommentiert:");
	$left.append($img);
	$right.append($info);
	$right.append($comment);

	var $content = $('<div class="content"></div>');
	$content.append($left);
	$content.append($right);
	
	$container.append($time);
	$container.append($content);

	$("#actions").append($container);
}

function addUpload(entry){
	if(entry.userid == user.id)entry.username = "Du";
	var $container = $('<div class="action entry gender-'+entry.sex.toLowerCase()+'"></div>');
	var $img = $('<a href="details.php?id='+entry.entryid+'"><img src="'+entry.smallthumbnail+'" title="'+entry.title+'"></img></a>');
	var $user = $('<a href="user.php?id='+entry.userid+'">'+entry.username+"</a>");
	if(entry.title.trim().length == 0)entry.title = '<span class="missing">Bild gel&ouml;scht</span>';
	var $title = $('<div class="comment">'+entry.title+'</div>');
	var $left = $('<div class="leftcontainer container"></div>');
	var $right = $('<div class="rightcontainer container"></div>');
	var $info = $('<div class="info"><i class="icon-upload"/></div>');
	var $time = $('<div class="time">'+formatTime(entry.date)+'</div>');

	$info.append($user);
	if(entry.userid == user.id) $info.append(" hast ein Bild hochgeladen:");
	else $info.append(" hat ein Bild hochgeladen:");
	$left.append($img);
	$right.append($info);
	$right.append($title);

	var $content = $('<div class="content"></div>');
	$content.append($left);
	$content.append($right);
	
	$container.append($time);
	$container.append($content);

	$("#actions").append($container);
}

function addRating(entry){
	if(entry.userid == user.id)entry.username = "Du";
	var $container = $('<div class="action rating"></div>');
	var $img = $('<a href="details.php?id='+entry.entryid+'"><img src="'+entry.smallthumbnail+'" title="'+entry.title+'"></img></a>');
	var $user = $('<a href="user.php?id='+entry.userid+'">'+entry.username+"</a>");
	if(entry.title.trim().length == 0)entry.title = '<span class="missing">Bild gel&ouml;scht</span>';
	var icon = '<i class="icon-thumbs-up-1"/>';
	var sentiment = "positiv";
	if(entry.rating != 1){
		icon = '<i class="icon-thumbs-down-1"/>';
		sentiment = "negativ";
	}
	var $title = $('<div class="comment">'+icon+entry.title+'</div>');
	var $left = $('<div class="leftcontainer container"></div>');
	var $right = $('<div class="rightcontainer container"></div>');
	var $info = $('<div class="info"></div>');
	var $time = $('<div class="time">'+formatTime(entry.date)+'</div>');

	$info.append($user);
	if(entry.userid == user.id) $info.append(" hast ein Bild "+sentiment+" bewertet:");
	else $info.append(" hat ein Bild "+sentiment+" bewertet:");
	$left.append($img);
	$right.append($info);
	$right.append($title);

	var $content = $('<div class="content"></div>');
	$content.append($left);
	$content.append($right);
	
	$container.append($time);
	$container.append($content);

	$("#actions").append($container);
}

function addTranscription(entry){
	if(entry.userid == user.id)entry.username = "Du";
	var $container = $('<div class="action rating"></div>');
	var $img = $('<a href="details.php?id='+entry.entryid+'"><img src="'+entry.smallthumbnail+'" title="'+entry.title+'"></img></a>');
	var $user = $('<a href="user.php?id='+entry.userid+'">'+entry.username+"</a>");
	if(entry.transcription.length>100)entry.transcription = entry.transcription.substring(0,97)+"...";
	if(entry.transcription.trim().length == 0)entry.transcription = '<span class="missing">Transkription gel&ouml;scht</span>';
	var $title = $('<div class="comment">'+entry.transcription+'</div>');
	var $left = $('<div class="leftcontainer container"></div>');
	var $right = $('<div class="rightcontainer container"></div>');
	var $info = $('<div class="info"><i class="icon-feather"/></div>');
	var $time = $('<div class="time">'+formatTime(entry.date)+'</div>');

	$info.append($user);
	if(entry.userid == user.id) $info.append(" hast ein Bild transkribiert:");
	else $info.append(" hat ein Bild von dir transkribiert:");
	$left.append($img);
	$right.append($info);
	$right.append($title);

	var $content = $('<div class="content"></div>');
	$content.append($left);
	$content.append($right);
	
	$container.append($time);
	$container.append($content);

	$("#actions").append($container);
}
var latitude_g = -1000;
var longitude_g = -1000;

var entry = {};
var $imageContainer = $(".image-container");
var $addImageContainer = $(".add-image-container");
var $addImageText = $(".add-image-text");
var $addLocationContainer = $(".add-location-container");
var $addImageInput = $("input.file-input");
var $customTagInput = $("#custom-tag");
var $locationInput = $("select#location");
var $typeInput = $("select#type");
var $tagsContainer = $(".entry-tags-container");
var $tagList = $("#entry-tag-list");
var $uploadSubmit = $("#upload-submit");
var $form = $(".upload-forms-container > form");
var $imageError = $(".image-error-container");
var $tagError = $(".tag-error");
var $locError = $(".location-error");

$(document).ready(function() {
	initUpload();
	initImageUpload();
	getType();
	getTags();
	initDialog();
});

function initEdit(){
	if(user&&user.status&&user.status!="4"){
		$("#tou").remove();
	}
	if(id < 1){
		$(".add-image-container").css("display","block");
		return;
	}else{
		document.title = "Bearbeiten";
		$uploadSubmit.html("Speichern");
		ImgurManager.getEntry(fillUI, id);
		$(".add-image-container").css("display","none");
	}
}

function fillUI(e){
	entry = e;
	var $img = $('<img id="img-upload" exif="true" src="'+entry.images[0].thumbnail+'"/>');
	$imageContainer.append($img);
	$imageContainer.css("display","block");
	$("#title").val(entry.title);
	$("#transcription").val(entry.information[0].transcription);
	$("#type option[value="+entry.typename.replace(/[^a-zA-Z0-9]/g,"_")+"]").attr("selected", "selected");
	$(".add-sex-container input[value=U]").attr("checked", true);
	$(".add-sex-container input[value="+entry.sex.toUpperCase()+"]").attr("checked", true);
	ImgurManager.getLocations(retrieveLocations, entry.information[0].latitude, entry.information[0].longitude);
	var $loc = $("#location option[value="+entry.information[0].location.replace(/[^a-zA-Z0-9]/g,"")+"]");
	if($loc.length!=0)$loc.attr("selected", "selected");	
	else{
		var content = "<option value='" + entry.information[0].location.replace(/[^a-zA-Z0-9]/g,"") + "'>" + entry.information[0].location + "</option>";
		var $content = $(content);
		$content.attr("selected","selected");
		$locationInput.append($content);
	}

	$("#artist").val(entry.information[0].artist);
	var $tagElements = $tagList.find('li span');
	var availableTags = _.pluck($tagElements, 'innerHTML');

	for(var i = 0; i < availableTags.length; i++){
		availableTags[i] = availableTags[i].toLowerCase();
	}

	for(var i=0; i<entry.tags.length; i++){
		var tagText = entry.tags[i].tag.toLowerCase();
		var index = _.indexOf(availableTags, tagText);
		if(index == -1){
			appendSingleTag(entry.tags[i].tag, true, entry.tags[i].status!=1);
		}else{
			$($tagElements[index]).parent('li').addClass('tag-active');
			$($tagElements[index]).addClass('tag-active-text');
		}
	}
}

function initDialog(){
	if(!$("<div></div>").dialog){
		
	}
}

function saveImage(){
	message("Speichern", "Bild wird gespeichert, bitte warten ...");
	var data = {};
	var title = $.trim($("input#title").val());
	var artist = $.trim($("input#artist").val());
	var transcription = $.trim($("input#transcription").val());
	var location = $.trim($locationInput.find('option:selected').html());
	var sex = $.trim($("input:radio[name=sex]:checked").val());

	var tags = _.pluck($tagList.find('.tag-active-text'), 'innerHTML');

	tags = tags.join(',');

	var type = $.trim($("#type").find('option:selected').html());

	if(location.length > 2){
		data['location'] = location;
	}
	if(transcription.length > 2){
		data['transcription'] = transcription;
	}
	if(artist.length > 2){
		data['artist'] = artist;
	}
	if((latitude_g != -1000 && longitude_g != -1000)){
		data['lat'] = latitude_g;
		data['long'] = longitude_g;
	}
	if(tags.length > 0){
		data['tags'] = tags;
	}

	data['sex'] = sex;
	data['title'] = title;
	data['type'] = type;

	if(entry.id){
		data["entryid"] = entry.id;
		ImgurManager.updateEntry(function(){
			window.location = "details.php?id="+entry.id;
		}, data);
	}else{
		ImgurManager.addEntry(uploadImage, data);
	}
}

function createDummy(){
	message("Speichern", "Wir legen f&uuml;r dich einen Account an damit du deine Bilder sp&auml;ter bearbeiten kannst.<br/>Bitte habe etwas Gedult.");
	user = {};
	user.password = guid();
	ImgurManager.createUser(onDummyCreated, "", user.password, "");
}

function onDummyCreated(data){
	if(data==null){
		message("Oops!", "Leider konnte wir keinen Account anlegen um Bilder hochzuladen.<br/>Wende dich an einen Systemadministrator oder versuche es sp&auml;ter nochmal.");
	}else{
		ImgurManager.loginUser(onLoginDummmySuccess, data, user.password);
	}
}

function onLoginDummmySuccess(data){
	if(data==null){
		message("Oops!", "Leider konnte wir keinen Account einloggen um Bilder hochzuladen.<br/>Wende dich an einen Systemadministrator oder versuche es sp&auml;ter nochmal.");
	}else{
		ImgurManager.getUserAuth(onGetUser, data);
	}
}

function onGetUser(data){
	saveUser(data);
	saveImage();
}

function initUpload(){
	$form.on('invalid', function(event) {
    	checkForImage();
	}).on('valid', function(event) {
		event.preventDefault();
		if(checkForImage()){
			if(loggedIn())
				saveImage();
			else
				createDummy();
		}
	});

	$form.bind("keyup keypress", function(e) {
		var code = e.keyCode || e.which; 
		if (code  == 13) {               
			e.preventDefault();
			return false;
	  	}
	});

	$form.on('submit', function(event) {
		event.preventDefault();
	});

	$customTagInput.bind("keydown", function(event) {
        var code = event.which;
        if(code == 13 || code == 9 || code == 188 || code == 186 || code == 190){
        	var text = $.trim($(this).val());
        	if(text.length > 2){
        		var $tagElements = $tagList.find('li span');
				var availableTags = _.pluck($tagElements, 'innerHTML');
        		if(_.indexOf(availableTags, text.toLowerCase()) == -1){
        			appendSingleTag(text, true, true);
        		}
        	}
        	$(this).val('');
        }
  	});

	$locationInput.prop('disabled', true);

	$uploadSubmit.click(function(event) {
		// nothing to do here...
	});
}

function initImageUpload(){
	$addImageContainer.click(function(event) {
		$addImageInput.trigger('click');
	});

	$addImageInput.change(function(event) {
		var files = event.target.files;
		if(files.length){
			var file = files[0];

			var $img = $("<img id='img-upload' exif='true'/>");
			// var src = window.URL.createObjectURL(file);
			$imageContainer.empty();
			$imageContainer.append($img);
			showError("image", false);
			$imageContainer.fadeIn('slow', function() {
				$addImageText.html("Bild</br>ändern");
			});
			
			var reader = new FileReader();
    		reader.onload = (function(aImg){ 
    			return function(e){ 
    				$(aImg).attr('src', e.target.result); 
    			}; 
    		})($img);
    		reader.readAsDataURL(file);

    		loadImage.parseMetaData(
			    file,
			    function (data) {
			    	extractImageData(data);		    	
			    },
			    {
			        disableExifGps: false
			    }
			);

		}
	});
}

function extractImageData(data){
	if(data && data.exif){
		var latitude = data.exif.getText('GPSLatitude');
		var longitude = data.exif.getText('GPSLongitude');
		if((latitude != 'undefined') && (longitude != 'undefined')){
			latitude_array = latitude.split(',');
			longitude_array = longitude.split(',');
			latitude = parseFloat(parseInt(latitude_array[0]) + 
				parseFloat(latitude_array[1] / 60) + parseFloat(latitude_array[2] / 3600));
			longitude = parseFloat(parseInt(longitude_array[0]) + 
				parseFloat(longitude_array[1] / 60) + parseFloat(longitude_array[2] / 3600));
			
			latitude_g = latitude;
			longitude_g = longitude;

			ImgurManager.getLocations(retrieveLocations, latitude, longitude);
			return;
		}
	}
	ImgurManager.getDefaultLocations(retrieveLocations);
}

function uploadImage(entryid){
	var file = $addImageInput[0].files[0];
	ImgurManager.uploadImage(uploadImageResult, entryid, file);
}

function uploadImageResult(uploadSuccesfull, entryid){
	if(uploadSuccesfull){
		window.location = "details.php?id="+entryid;
	}else{
		error("Bild konnte nicht hochgeladen werden.");
		ImgurManager.deleteEntry(data);
	}
}

/*
function getLocations(){
	if(Modernizr.geolocation){
		$locationInput.prop('disabled', true);
		var options = {
			enableHighAccuracy : false,
			timeout : 5000,
			maximumAge : 3600000 // one hour cache
		};
		navigator.geolocation.getCurrentPosition(handleGeolocation, handleGeolocationErrors, 
			options);
	}else{
		retrieveLocations(null);
	}
}

function handleGeolocation(position){
	var loc = {
		latitude : position.coords.latitude,
		longitude : position.coords.longitude
	};
	retrieveLocations(loc);
}

function handleGeolocationErrors(error){
	switch(error.code)
    {
        case error.PERMISSION_DENIED: 
        	console.log("User did not share geolocation data...");
        	break;
        case error.POSITION_UNAVAILABLE: 
        	console.log("Could not detect current position...");
        	break;
        case error.TIMEOUT: 
        	console.log("Retrieving position timed out...");
        	break;
        default: 
        	console.log("Unknown error..");
    }
    retrieveLocations(null);
}
*/

function retrieveLocations(locData){
	$locationInput.children().first().html("Wähle einen Ort aus...");
	$locationInput.prop('disabled', false);
	var locations = locData[0]['locations'];
	if(locData[1]){
		$.merge(locations, locData[1]['locations']);
	}
	if(locations == null || locations.length < 1){
		return;
	}else{
		for(var i = 0; i < locations.length; i++){
			var location = locations[i];
			var content = "<option value='" + location.replace(/[^a-zA-Z0-9]/g,"") + "'>" + location + "</option>";
			var $content = $(content);
			if(entry.information && entry.information[0]){
				if(entry.information[0].location == location){
					$content.attr("selected","selected");
				}
			}
			$locationInput.append($content);
		}
	}
}

function showError(which, yep){
	var $which = null;
	switch(which){
		case "tag":
			$which = $tagError;
			break;
		case "image":
			$which = $imageError;
			break;
	}
	if(yep && $which != null){
		$which.css('display', 'block');
		$which.fadeIn('slow');
	}else{
		$which.fadeOut('slow');
	}
}

function checkForImage(){
	if($imageContainer.children().length > 0){
		showError("image", false);
		return true;
	}else{
		showError("image", true);
		return false;
	}
}

function checkForTags(){
	if($tagList.children('.tag-active').length > 0 ||
			$customTagInput.val().length > 2){
		showError("tag", false);
		return true;
	}else{
		showError("tag", true);
		return false;
	}
}

function getType(){
	ImgurManager.getTypes(appendTypes);
}

function appendTypes(typeData){
	if(typeData == null){

	}else{
		var types = _.pluck(typeData, 'name');
		var typesDesc = _.pluck(typeData, 'description');

		for(var i = 0; i < types.length; i++){
			var type = types[i];
			var typeDesc = typesDesc[i];
			var content = "<option value='" + type.replace(/[^a-zA-Z0-9]/g,"_") + "' title='" + typeDesc + "'>" + type + "</option>";
			var $content = $(content);
			if(entry.typename){
				if(entry.typename == type){
					$content.attr("selected","selected");
				}
			}
			$typeInput.append($content);
		}
	}
}

function getTags(){
	ImgurManager.getSystemTags(appendSystemTags);
	ImgurManager.getUserTags(appendUserTags);
}

var editOnce = _.after(2, initEdit);

function appendSystemTags(tagData){
	if(tagData == null){

	}else{
		var tags = _.pluck(tagData, 'tag');
		for(var i = 0; i < tags.length; i++){
			appendSingleTag(tags[i], false, false);
		}
	}
	editOnce();
}

function appendUserTags(tagData){
	if(tagData == null){

	}else{
		var tags = _.pluck(tagData, 'tag');
		function split(val) {
	    	return val.split( /,\s*/ );
	    }
	    function extractLast(term) {
	    	return split(term).pop();
	    }

		$customTagInput.autocomplete(
			{
	        	minLength: 0,
	        	source: tags,
		        select: function(event, ui) {
		          	$customTagInput.val(ui.item.value);
		          	return false;
		        }
	    	});
	}
	editOnce();
}

function appendSingleTag(tag, state, isUserTag){
	var $tagItem;
	if(isUserTag){
		$tagItem = $("<li><span class='tag-active-text'>" + tag + "</span><i class='icon-cancel'></i></li>");
		$tagItem.addClass('tag-user');
		$tagItem.addClass('tag-active');
	}else{
		$tagItem = $("<li><span>" + tag + "</span></li>");
	}

	if(state && !isUserTag){
		$tagItem.addClass('tag-active');
		$tag.children('span').addClass('tag-active-text');
	}

	if(isUserTag){
		$tagItem.children('i').click(function(event) {
			$(this).parent('li').remove();
		});
	}else{
		$tagItem.click(function(event) {
			tagFunctionality($(this));
		});
	}

	$tagList.append($tagItem);
}

function tagFunctionality(tag){
	var $tag = $(tag);
	if($tag.hasClass('tag-active')){
		$tag.removeClass('tag-active');
		$tag.children('span').removeClass('tag-active-text');
	}else{
		$tag.addClass('tag-active');
		$tag.children('span').addClass('tag-active-text');
	}
}

function error(message){
	$(".error-dialog").dialog("close");
	$(".error-dialog").remove();
	var $dialog = $('<div class="error-dialog">'+message+"</div>");
	$dialog.dialog({
		modal: true,
		width: "80%",
		title: "Oops!",
		close : function(){
			window.location = "index.php";
		}
	});
}

function message(title, message){
	$(".error-dialog").dialog("close");
	$(".error-dialog").remove();
	var $dialog = $('<div class="error-dialog">'+message+"</div>");
	$dialog.dialog({
		modal: true,
		width: "80%",
		title: title
	});
}
var queriedUser = {};
var NO_RESULTS = "Der Nutzer hat noch keine Bilder hochgeladen!";
var NO_MORE_RESULTS = "Dieser Nutzer hat nicht mehr Bilder hochgeladen!";
var NO_MORE_RESULTS_USER = "Du hast keine weiteren Bilder hochgeladen!";
var NO_RESULTS_USER = "Du hast noch keine Bilder hochgeladen!";

$(function(){
	if(id>0){
		loadUser(id);
		setupImageClick();
		// setupOnce();
	}
});

function loadUser(id){
	ImgurManager.getUser(fillUI, id);
}

$(document).on("complete", function(){
	setupOnce();
	$.waypoints('refresh');
});

function setupImageClick(){
	$(document).on("click", ".jg-image",function(){
		var id = $($(this).find("a")[0]).attr("title");
		window.location = "details.php?id=" + id;
	});
}

function setupInfiniteScroll(){
	$("html").waypoint(function(direction) {
		if(direction == "down"){
			if($.waypoints('viewportHeight') < $(this).height()){
				ImgurManager.getEntriesForUser(fillImages, id, GalleryView.getLastEntry());
			}		
		}
	}, { offset: 'bottom-in-view'
	});
}

var setupOnce = _.once(setupInfiniteScroll);

function fillUI(u){
	if(!u){
		console.log("Error getting user");
		$("#username").html("Dieser Nutzer existiert nicht.");
		return;
	}else{
		queriedUser = u;
	}
	var usericon = getUserIcon(queriedUser.status);
	$("#username").html(usericon+queriedUser.username);
	$("#membersince").html(formatTime(queriedUser.joindate));
	$("#lastseen").html(formatTime(queriedUser.lastaction));
	$("#lastseen").attr("title",queriedUser.lastaction);	
	if(u.stats){
		$("#stats #entries .amount").html(u.stats.entries);
		$("#stats #comments .amount").html(u.stats.comments);
		$("#stats #ratings .amount").html(u.stats.ratings);
		$("#stats #transcriptions .amount").html(u.stats.transcriptions);
		drawAchievements(u.stats);
		var today = new Date();
		var timeObj = convertDateTime(queriedUser.joindate);
		var timestamp = timeObj.getTime();
		var difference = today-timestamp;
		var lvl = computeLevel(u.stats.entries, u.stats.comments, u.stats.ratings, u.stats.transcriptions, difference);
		$("#level").html("(Level "+lvl+")");
	}
	ImgurManager.getEntriesForUser(fillImages, id);
}

function fillImages(searchData){
	if(!searchData||searchData.length==0){
		if($('.jg-row').length > 0){
			if(queriedUser.username == document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1")){
				resultsError(NO_MORE_RESULTS_USER);
			}else{
				resultsError(NO_MORE_RESULTS);
			}
		}else{
			if(queriedUser.username == document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1")){
				resultsError(NO_RESULTS_USER);
			}else{
				resultsError(NO_RESULTS);
			}
		}
	}else{
		GalleryView.init($("#images"));
		showResults(searchData);
	}
}

function resultsError(msg){
	var content = "<div class='error-message secondary label'>" + msg + "</div>";
	if($(".error-message").length < 1){
		$("#images").append(content);
	}
}

function showResults(searchData){
	GalleryView.appendEntries(searchData);
	GalleryView.loadAllImages();
}

function drawAchievements(stats){
	drawEntryAchievements(stats.entries);
	drawCommentAchievements(stats.comments);
	drawRatingAchievements(stats.ratings);
	drawTranscriptionAchievements(stats.transcriptions);
	if($(".achievement").length == 0){
		var $none = $('<div class="missing">Dieser Nutzer hat noch keine Erfolge.</div>');
		$("#achievements").append($none);
	}
}

function computeLevel(entries, comments, ratings, transcriptions, ageInMillis){
	var ageInDays = ageInMillis/1000 /60 /60 /24;
	var level = 1;

	var entryMulti = .05;
	var commentMulti = .01;
	var ratingMulti = .02;
	var ageMulti = .01;
	var transMulti = .05;

	var extralevel = entries*entryMulti;
	extralevel += comments*commentMulti;
	extralevel += ratings*ratingMulti;
	extralevel += ageInDays*ageMulti;
	extralevel += transcriptions*transMulti;

	level = Math.floor(level+extralevel);
	return level;
}

function drawEntryAchievements(amount){
	var $container = $('#achievements #entries');
	if(amount>=1)$container.append(achievement("<i class='lvl1 icon-upload'/>","Ein Bild hochgeladen"));
	if(amount>=10)$container.append(achievement("<i class='lvl2 icon-upload'/>","10 Bilder hochgeladen"));
	if(amount>=50)$container.append(achievement("<i class='lvl3 icon-upload'/>","50 Bilder hochgeladen"));
	if(amount>=100)$container.append(achievement("<i class='lvl4 icon-upload'/>","100 Bilder hochgeladen"));
	if(amount>=200)$container.append(achievement("<i class='lvl5 icon-upload'/>","200 Bilder hochgeladen"));
	if(amount>=500)$container.append(achievement("<i class='lvl6 icon-upload'/>","500 Bilder hochgeladen"));
	if(amount>=750)$container.append(achievement("<i class='lvl7 icon-upload'/>","750 Bilder hochgeladen"));
	if(amount>=1000)$container.append(achievement("<i class='lvl8 icon-upload'/>","1000 Bilder hochgeladen"));
	if(amount>=1500)$container.append(achievement("<i class='lvl9 icon-upload'/>","1500 Bilder hochgeladen"));
	if(amount>=2000)$container.append(achievement("<i class='lvl10 icon-upload'/>","2000 Bilder hochgeladen"));
	if(amount>=5000)$container.append(achievement("<i class='lvl11 icon-upload'/>","5000 Bilder hochgeladen"));
	if(amount>=7500)$container.append(achievement("<i class='lvl12 icon-upload'/>","7500 Bilder hochgeladen"));
	if(amount>=10000)$container.append(achievement("<i class='lvl13 icon-upload'/>","10000 Bilder hochgeladen"));
}
function drawCommentAchievements(amount){
	var $container = $('#achievements #comments');
	if(amount>0)$container.append(achievement("<i class='lvl1 icon-comment'/>","Einen Kommentar abgegeben"));
	if(amount>=10)$container.append(achievement("<i class='lvl2 icon-comment'/>","10 Kommentare abgegeben"));
	if(amount>=50)$container.append(achievement("<i class='lvl3 icon-comment'/>","50 Kommentare abgegeben"));
	if(amount>=100)$container.append(achievement("<i class='lvl4 icon-comment'/>","100 Kommentare abgegeben"));
	if(amount>=200)$container.append(achievement("<i class='lvl5 icon-comment'/>","200 Kommentare abgegeben"));
	if(amount>=500)$container.append(achievement("<i class='lvl6 icon-comment'/>","500 Kommentare abgegeben"));
	if(amount>=750)$container.append(achievement("<i class='lvl7 icon-comment'/>","750 Kommentare abgegeben"));
	if(amount>=1000)$container.append(achievement("<i class='lvl8 icon-comment'/>","1000 Kommentare abgegeben"));
	if(amount>=1500)$container.append(achievement("<i class='lvl9 icon-comment'/>","1500 Kommentare abgegeben"));
	if(amount>=2000)$container.append(achievement("<i class='lvl10 icon-comment'/>","2000 Kommentare abgegeben"));
	if(amount>=5000)$container.append(achievement("<i class='lvl11 icon-comment'/>","5000 Kommentare abgegeben"));
	if(amount>=7500)$container.append(achievement("<i class='lvl12 icon-comment'/>","7500 Kommentare abgegeben"));
	if(amount>=10000)$container.append(achievement("<i class='lvl13 icon-comment'/>","10000 Kommentare abgegeben"));
}
function drawRatingAchievements(amount){
	var $container = $('#achievements #ratings');
	if(amount>0)$container.append(achievement("<i class='lvl1 icon-thumbs-up-1'/>","Ein Bild bewertet"));
	if(amount>=10)$container.append(achievement("<i class='lvl2 icon-thumbs-up-1'/>","10 Bilder bewertet"));
	if(amount>=50)$container.append(achievement("<i class='lvl3 icon-thumbs-up-1'/>","50 Bilder bewertet"));
	if(amount>=100)$container.append(achievement("<i class='lvl4 icon-thumbs-up-1'/>","100 Bilder bewertet"));
	if(amount>=200)$container.append(achievement("<i class='lvl5 icon-thumbs-up-1'/>","200 Bilder bewertet"));
	if(amount>=500)$container.append(achievement("<i class='lvl6 icon-thumbs-up-1'/>","500 Bilder bewertet"));
	if(amount>=750)$container.append(achievement("<i class='lvl7 icon-thumbs-up-1'/>","750 Bilder bewertet"));
	if(amount>=1000)$container.append(achievement("<i class='lvl8 icon-thumbs-up-1'/>","1000 Bilder bewertet"));
	if(amount>=1500)$container.append(achievement("<i class='lvl9 icon-thumbs-up-1'/>","1500 Bilder bewertet"));
	if(amount>=2000)$container.append(achievement("<i class='lvl10 icon-thumbs-up-1'/>","2000 Bilder bewertet"));
	if(amount>=5000)$container.append(achievement("<i class='lvl11 icon-thumbs-up-1'/>","5000 Bilder bewertet"));
	if(amount>=7500)$container.append(achievement("<i class='lvl12 icon-thumbs-up-1'/>","7500 Bilder bewertet"));
	if(amount>=10000)$container.append(achievement("<i class='lvl13 icon-thumbs-up-1'/>","10000 Bilder bewertet"));
}
function drawTranscriptionAchievements(amount){
	var $container = $('#achievements #transcriptions');
	if(amount>0)$container.append(achievement("<i class='lvl1 icon-feather'/>","Ein Bild transkribiert"));
	if(amount>=10)$container.append(achievement("<i class='lvl2 icon-feather'/>","10 Bilder transkribiert"));
	if(amount>=50)$container.append(achievement("<i class='lvl3 icon-feather'/>","50 Bilder transkribiert"));
	if(amount>=100)$container.append(achievement("<i class='lvl4 icon-feather'/>","100 Bilder transkribiert"));
	if(amount>=200)$container.append(achievement("<i class='lvl5 icon-feather'/>","200 Bilder transkribiert"));
	if(amount>=500)$container.append(achievement("<i class='lvl6 icon-feather'/>","500 Bilder transkribiert"));
	if(amount>=750)$container.append(achievement("<i class='lvl7 icon-feather'/>","750 Bilder transkribiert"));
	if(amount>=1000)$container.append(achievement("<i class='lvl8 icon-feather'/>","1000 Bilder transkribiert"));
	if(amount>=1500)$container.append(achievement("<i class='lvl9 icon-feather'/>","1500 Bilder transkribiert"));
	if(amount>=2000)$container.append(achievement("<i class='lvl10 icon-feather'/>","2000 Bilder transkribiert"));
	if(amount>=5000)$container.append(achievement("<i class='lvl11 icon-feather'/>","5000 Bilder transkribiert"));
	if(amount>=7500)$container.append(achievement("<i class='lvl12 icon-feather'/>","7500 Bilder transkribiert"));
	if(amount>=10000)$container.append(achievement("<i class='lvl13 icon-feather'/>","10000 Bilder transkribiert"));
}

function achievement(title, description){
	var $ach = $('<div class="achievement">'+title+'</div>');
	$ach.attr("title",description);
	return $ach;
}
$(function(){
	if(!verification)missing();
	else
		verify(verification);
});

function missing(){
	$("#message").html("Es ist leider kein Verifizierungscode angegeben.<br/><br/>Bitte &uuml;berpr&uuml;fe deine Email, ob du den richtigen Link benutzt.");
}

function verify(key){
	var url = "php/backend/verify.php?key="+key;
	$.get(url, function(data){
		if(data.success==1){
			success(data.data);
		}else{
			fail();
		}
	});
}

function fail(){
	$("#message").html("Wir k&ouml;nnen den Verifizierungscode keinem Nutzer zuordnen.<br/><br/>Bitte &uuml;berpr&uuml;fe deine Email, ob du den richtigen Link benutzt.");
}

function success(user){
	$("#message").html("Hallo <a href='user.php?id="+user.id+"'>"+user.username+"</a><br/><br/>Die Verifizierung deiner Email war erfolgreich, du kannst dich jetzt mit deinen Nutzerdaten einloggen.");
}
var overlayTemplate = null;
var rootFolder = null;
var AUTH_KEY_LENGTH = 45;

$(document).ready(function() {
	 $(document).foundation();
    setupOverlayBackground();
    cookieUser();
    greetUser();
    getCurrentUser();
});

function setupOverlayBackground(){
    if($("script.overlay-template").length > 0){
        overlayTemplate = _.template($("script.overlay-template").html()); 
    }
}

function createOverlayBackground(){
    if($("#overlay-background").length > 0){
        return;
    }else{
        $("body").append(overlayTemplate());
    }
}

function removeOverlayBackground(){
    $("#overlay-background").remove();
}

function cookieUser(){
    user = {};
    user.id = document.cookie.replace(/(?:(?:^|.*;\s*)userid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    user.username = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    user.admin = document.cookie.replace(/(?:(?:^|.*;\s*)admin\s*\=\s*([^;]*).*$)|^.*$/, "$1")=="1";
    user.status = document.cookie.replace(/(?:(?:^|.*;\s*)admin\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}

function greetUser(){
    if(!_.isEmpty(user)&&user.status!="4"){
      if(user.username.length > 0){
        $("#link-login").children('span').html(user.username);
      }
    }
}

function loggedIn(){
  return(user&&user.username&&user.username.length>0);
}

function saveUser(user){
  var d = new Date();
  var oneYear = 31536000000;
  d.setTime(d.getTime() + oneYear);
  document.cookie = "username=" + user.username + "; expires=" + d.toGMTString();
  document.cookie = "userid=" +user.id+ "; expires=" + d.toGMTString();
  document.cookie = "admin=" + user.status + "; expires=" + d.toGMTString();
}

function formatTime(time){
  var ONE_SEC = 1000;
  var ONE_MIN = 60*ONE_SEC;
  var ONE_HOUR = 60*ONE_MIN;
  var ONE_DAY = 24*ONE_HOUR;
  var ONE_WEEK = 7*ONE_DAY;
  if(!time)return "";
  var monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  var today = new Date();
  var timeObj = convertDateTime(time);
  var timestamp = timeObj.getTime();
  var difference = today-timestamp;
  if(difference>ONE_DAY){
      if(difference<ONE_WEEK){
          if(timeObj.getDate()==today.getDate()-1){
              var mins = timeObj.getMinutes();
              if(mins<10)mins="0"+mins;
              return "gestern um %1".replace("%1",timeObj.getHours()+":"+mins);
          }else{
              var days = Math.round((difference/ONE_DAY));
              return (days==1?
                    "vor einem Tag":
                    "vor %1 Tagen".replace("%1",days)                     
              );
          }
      }else{
          if(timeObj.getFullYear()!=today.getFullYear()){
              return timeObj.getDate()+". "+monthNames[timeObj.getMonth()]+" "+timeObj.getFullYear();
          }else{
              return timeObj.getDate()+". "+monthNames[timeObj.getMonth()];
          }
      }
  }else if(difference>ONE_HOUR){
      var hours = Math.round((difference/ONE_HOUR));
      return (hours==1?
                "vor einer Stunde":
                "vor %1 Stunden".replace("%1",hours)                   
          );
  }else if(difference>ONE_MIN){
      var minutes = Math.round((difference/ONE_MIN));
      return (minutes==1?
                "vor einer Minute":
                "vor %1 Minuten".replace("%1",minutes)                   
          );
  }else{
      return "gerade eben";
  }
}

function convertDateTime(dt){
    if(!dt)return null;
    dateTime = dt.split(" ");

    var date = dateTime[0].split("-");
    if(date.length<3){
        date = dateTime[0].split(".");
    }
    if(date[0].length==4){
        var yyyy = date[0];
        var dd = date[2];
    }else{
        var yyyy = date[2];
        var dd = date[0];
    }
    var mm = parseInt(date[1])-1;

    var time = dateTime[1].split(":");
    var h = time[0];
    var m = time[1];
    if(time.length==3){
        var s = parseInt(time[2]); //get rid of that 00.0;
    }else{
        var s = 0;
    }
    
    var result = new Date(yyyy,mm,dd,h,m,s);
    
    return result;
}

getAvatar = function(name){
    return "http://social.microsoft.com/profile/u/avatar.jpg?displayname=%1".replace("%1",name);
}

function getCurrentUser(){
    var authkey = document.cookie.replace(/(?:(?:^|.*;\s*)authkey\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if(authkey){
        ImgurManager.getUserAuth(logoutUser, authkey);
    }
}

function logoutUser(data){
    if(_.isNull(data)){
        $("#link-login").children('span').html("Login");
        var d = new Date(1970, 1);
        document.cookie = "username=''  ; expires=" + d.toGMTString();
        document.cookie = "userid=''; expires=" + d.toGMTString();
        document.cookie = "admin=''; expires=" + d.toGMTString();
        document.cookie = "authkey=''; expires=" + d.toGMTString();
        ImgurManager.logout(logoutSuccess);
    }
}

function logoutSuccess(yep){
  if(yep){
    window.location = "index.php";
  }else{
    window.location = "index.php"; // change dat
  }
}

function getUserIcon(status){
  switch(status){
    case 1:
    case "1":
      return '<img src="img/global/admin.png" title="Administrator"></img>';
    default:
      return "";
  }
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
}

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}