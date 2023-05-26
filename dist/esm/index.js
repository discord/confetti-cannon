import*as t from"react";import{v4 as e}from"uuid";import n from"invariant";import i from"classnames";function r(t,e){var n=t.x,i=t.y;return n>e.x&&n<e.x+e.width&&i>e.y&&i<e.y+e.height}function a(t,e){return t*e*e*(e>0?-1:1)}var o=function(){function t(t){this.id=t.id,this.position=t.position,this.velocity=t.velocity,this.rotation=t.rotation,this.dragCoefficient=t.dragCoefficient,this.width=t.width,this.height=t.height,this.opacity=t.opacity,this.spriteX=t.spriteX,this.spriteY=t.spriteY,this.spriteWidth=t.spriteWidth,this.spriteHeight=t.spriteHeight,this._lastUpdatedAt=Date.now()}return t.prototype.getNewForces=function(t,e){var n=t.wind*e,i=-t.gravity*e;return{x:n+a(this.dragCoefficient.x,this.velocity.x),y:i+a(this.dragCoefficient.y,this.velocity.y)}},t.prototype.update=function(t){var e=Date.now(),n=(e-this._lastUpdatedAt)/100;this.rotation.update(n),this.dragCoefficient.update(n);var i=this.getNewForces(t,n),r=i.x,a=i.y;this.velocity.update(n),this.velocity.x+=r,this.velocity.y+=a,this.position.update(n),this.position.x+=this.velocity.x*n,this.position.y+=this.velocity.y*n,this.width.update(n),this.height.update(n),this.opacity.update(n),this._lastUpdatedAt=e},t.prototype.previewPositionUpdate=function(t,e){var n=e/100,i=this.velocity.previewUpdate(n),r=this.getNewForces(t,n),a=r.x,o=r.y;i.x+=a,i.y+=o;var u=this.position.previewUpdate(n);return u.x+=i.x*n,u.y+=i.y*n,u},t.prototype.draw=function(t,e){e.save(),e.globalAlpha=this.opacity.value,e.setTransform((new DOMMatrix).translateSelf(this.position.x*global.devicePixelRatio,this.position.y*global.devicePixelRatio).rotateSelf(this.rotation.x,this.rotation.y,this.rotation.z)),e.drawImage(t,this.spriteX,this.spriteY,this.spriteWidth,this.spriteHeight,-this.width.value/2*global.devicePixelRatio,-this.height.value/2*global.devicePixelRatio,this.width.value*global.devicePixelRatio,this.height.value*global.devicePixelRatio),e.restore()},t.prototype.shouldDestroy=function(t,e){return this.opacity.value<0||e.gravity>=0&&this.velocity.y<0&&this.position.y+this.height.value<0||e.gravity<=0&&this.velocity.y>0&&this.position.y-this.height.value>t.height||e.wind>=0&&this.velocity.x>0&&this.position.x-this.width.value>t.width||e.wind<=0&&this.velocity.x<0&&this.position.x+this.width.value<0},t.prototype.addForce=function(t){this.velocity.x+=t.x,this.velocity.y+=t.y},t}(),u={velocity:{type:"static",value:{x:0,y:0}},rotation:{type:"static",value:{x:0,y:0,z:0}},dragCoefficient:{type:"static",value:{x:.001,y:.001}},opacity:{type:"static",value:1}},l=function(t){var e=void 0===t?{}:t,n=e.gravity,i=e.wind;this.gravity=-9.8,this.wind=0,this.gravity=null!=n?n:this.gravity,this.wind=null!=i?i:this.wind},s=function(t,e){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},s(t,e)};function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}s(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var d=function(){return d=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},d.apply(this,arguments)};var h=function(t){this.value=t},f=function(){function t(t,e){this._x=t,this._y=e}return t.prototype.update=function(t){this._x.update(t),this._y.update(t)},t.prototype.previewUpdate=function(t){return{x:this._x.previewUpdate(t),y:this._y.previewUpdate(t)}},Object.defineProperty(t.prototype,"x",{get:function(){return this._x.value},set:function(t){this._x.value=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this._y.value},set:function(t){this._y.value=t},enumerable:!1,configurable:!0}),t}(),p=function(t){function e(e,n,i){var r=t.call(this,e,n)||this;return r._z=i,r}return c(e,t),e.prototype.update=function(e){t.prototype.update.call(this,e),this._z.update(e)},e.prototype.previewUpdate=function(e){var n=t.prototype.previewUpdate.call(this,e);return d(d({},n),{z:this._z.previewUpdate(e)})},Object.defineProperty(e.prototype,"z",{get:function(){return this._z.value},set:function(t){this._z.value=t},enumerable:!1,configurable:!0}),e}(f),v=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return c(e,t),e.prototype.update=function(){},e.prototype.previewUpdate=function(){return this.value},e}(h),m=function(t){function e(e,n){var i=t.call(this,e)||this;return i.addValue=n,i}return c(e,t),e.prototype.update=function(t){this.value=this.previewUpdate(t)},e.prototype.previewUpdate=function(t){return this.value+this.addValue*t},e}(h),y=function(t){function e(e,n,i,r,a,o){var u=t.call(this,e)||this;u.min=n,u.max=i,u.duration=r;var l=u.value/(u.max-u.min)*u.duration,s=isNaN(l)?0:l;return u.timePassed=s<0?u.duration-s:s,u.directionMultiplier=a,u.easingFunction=o,u}return c(e,t),e.prototype.update=function(t){var e=this.doUpdate(t),n=e[0],i=e[1],r=e[2];this.value=n,this.directionMultiplier=r,this.timePassed=i},e.prototype.previewUpdate=function(t){return this.doUpdate(t)[0]},e.prototype.doUpdate=function(t){var e=this.max-this.min,n=this.timePassed+t*this.directionMultiplier,i=Math.min(Math.max(n,0),this.duration),r=n<0||n>this.duration?-1*this.directionMultiplier:this.directionMultiplier,a=this.easingFunction(i,this.min,e,this.duration);return[isNaN(a)?0:a,i,r]},e}(h);function x(t,e){return t===e?t:Math.random()*(e-t+1)+t}function w(t){var e=Math.floor(x(0,t.length-1));return[t[e],e]}function g(t,e){return w([t,e])[0]}function C(t){return function(t){switch(t.type){case"static":return new v(t.value);case"static-random":return new v(x(t.minValue,t.maxValue));case"linear":return new m(t.value,t.addValue);case"linear-random":return new m(x(t.minValue,t.maxValue),x(t.minAddValue,t.maxAddValue));case"oscillating":return new y(t.value,t.start,t.final,t.duration,t.direction,t.easingFunction);case"oscillating-random":return new y(x(t.minValue,t.maxValue),x(t.minStart,t.maxStart),x(t.minFinal,t.maxFinal),x(t.minDuration,t.maxDuration),g(t.minDirection,t.maxDirection),w(t.easingFunctions)[0])}}(d(d({},t),{valueType:"number"}))}function V(t){return function(t){switch(t.type){case"static":return new f(new v(t.value.x),new v(t.value.y));case"static-random":return new f(new v(x(t.minValue.x,t.maxValue.x)),new v(x(t.minValue.y,t.maxValue.y)));case"linear":return new f(new m(t.value.x,t.addValue.x),new m(t.value.y,t.addValue.y));case"linear-random":return new f(new m(x(t.minValue.x,t.maxValue.x),x(t.minAddValue.x,t.maxAddValue.x)),new m(x(t.minValue.y,t.maxValue.y),x(t.minAddValue.x,t.maxAddValue.x)));case"oscillating":return new f(new y(t.value.x,t.start.x,t.final.x,t.duration.x,t.direction.x,t.easingFunction),new y(t.value.y,t.start.y,t.final.y,t.duration.x,t.direction.y,t.easingFunction));case"oscillating-random":return new f(new y(x(t.minValue.x,t.maxValue.x),x(t.minStart.x,t.maxStart.x),x(t.minFinal.x,t.maxFinal.x),x(t.minDuration.x,t.maxDuration.x),g(t.minDirection.x,t.maxDirection.x),w(t.easingFunctions)[0]),new y(x(t.minValue.y,t.maxValue.y),x(t.minStart.y,t.maxStart.y),x(t.minFinal.y,t.maxFinal.y),x(t.minDuration.y,t.maxDuration.y),g(t.minDirection.y,t.maxDirection.y),w(t.easingFunctions)[0]))}}(d(d({},t),{valueType:"Vector2"}))}function b(t){return function(t){switch(t.type){case"static":return new p(new v(t.value.x),new v(t.value.y),new v(t.value.z));case"static-random":return new p(new v(x(t.minValue.x,t.maxValue.x)),new v(x(t.minValue.y,t.maxValue.y)),new v(x(t.minValue.z,t.maxValue.z)));case"linear":return new p(new m(t.value.x,t.addValue.x),new m(t.value.y,t.addValue.y),new m(t.value.z,t.addValue.z));case"linear-random":return new p(new m(x(t.minValue.x,t.maxValue.x),x(t.minAddValue.x,t.maxAddValue.x)),new m(x(t.minValue.y,t.maxValue.y),x(t.minAddValue.y,t.maxAddValue.y)),new m(x(t.minValue.z,t.maxValue.z),x(t.minAddValue.z,t.maxAddValue.z)));case"oscillating":return new p(new y(t.value.x,t.start.x,t.final.x,t.duration.x,t.direction.x,t.easingFunction),new y(t.value.y,t.start.y,t.final.y,t.duration.z,t.direction.y,t.easingFunction),new y(t.value.z,t.start.z,t.final.z,t.duration.z,t.direction.z,t.easingFunction));case"oscillating-random":return new p(new y(x(t.minValue.x,t.maxValue.x),x(t.minStart.x,t.maxStart.x),x(t.minFinal.x,t.maxFinal.x),x(t.minDuration.x,t.maxDuration.x),g(t.minDirection.x,t.maxDirection.x),w(t.easingFunctions)[0]),new y(x(t.minValue.y,t.maxValue.y),x(t.minStart.y,t.maxStart.y),x(t.minFinal.y,t.maxFinal.y),x(t.minDuration.y,t.maxDuration.y),g(t.minDirection.y,t.maxDirection.y),w(t.easingFunctions)[0]),new y(x(t.minValue.z,t.maxValue.z),x(t.minStart.z,t.maxStart.z),x(t.minFinal.z,t.maxFinal.z),x(t.minDuration.z,t.maxDuration.z),g(t.minDirection.z,t.maxDirection.z),w(t.easingFunctions)[0]))}}(d(d({},t),{valueType:"Vector3"}))}function z(t,e,i,r,a){var l=function(t){return d(d({},u),t)}(e),s=null!=l.size?C(l.size):null,c=null!=l.width?C(l.width):s,h=null!=l.height?C(l.height):s;n(null!=c,"width or size is required"),n(null!=h,"height or size is required");var f=function(t,e){if(null!=t){var n=e.sprites.findIndex((function(e){return n=e,"string"==typeof(i=t)?n.src===i&&n.colorize:n.src===i.src&&n.colorize===i.colorize;var n,i}));if(-1!==n)return[t,n]}return w(e.sprites)}(r,i),p=f[0],v=f[1],m=function(t,e,n){if(!function(t){return"string"==typeof t||t.colorize}(t))return 0;var i=null!=e?n.colors.findIndex((function(t){return t===e})):-1;return-1!==i?i:Math.floor(x(0,n.colors.length-1))}(null!=r?r:p,a,i);return new o({id:t,position:V(l.position),velocity:V(l.velocity),rotation:b(l.rotation),dragCoefficient:V(l.dragCoefficient),width:c,height:h,opacity:C(l.opacity),spriteX:m*i.spriteWidth+2*m,spriteY:v*i.spriteHeight+2*v,spriteWidth:i.spriteWidth,spriteHeight:i.spriteHeight})}var D=t.forwardRef((function(n,i){var a=n.className,o=n.environment,u=n.onClick,l=n.onMouseDown,s=n.onMouseMove,c=n.onMouseUp,h=n.onBeforeRender,f=n.onAfterRender,p=function(t,e){var n={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.indexOf(i)<0&&(n[i]=t[i]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(i=Object.getOwnPropertySymbols(t);r<i.length;r++)e.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(t,i[r])&&(n[i[r]]=t[i[r]])}return n}(n,["className","environment","onClick","onMouseDown","onMouseMove","onMouseUp","onBeforeRender","onAfterRender"]),v=t.useRef(null),m=t.useRef(new Map),y=t.useRef(null),x=t.useRef(0),w=t.useRef(0),g=t.useCallback((function(){var t=v.current;if(null!=t){var e=t.getContext("2d");if(null!=e){e.clearRect(0,0,t.width,t.height),null==h||h(e),m.current.forEach((function(n,i){var r=n.confetti,a=n.spriteCanvas;r.update(o),r.draw(a,e),r.shouldDestroy(t,o)&&m.current.delete(i)})),null==f||f(e),m.current.size>0?y.current=window.requestAnimationFrame(g):(e.clearRect(0,0,t.width,t.height),y.current=null);var n=Date.now();0!==x.current&&(w.current=1e3/(n-x.current)),x.current=n}}}),[o,f,h]);t.useEffect((function(){null!=y.current&&(window.cancelAnimationFrame(y.current),y.current=window.requestAnimationFrame(g))}),[g]);var C=t.useCallback((function(t,e){m.current.set(t.id,{confetti:t,spriteCanvas:e}),null==y.current&&g()}),[g]),V=t.useCallback((function(t,n,i,r,a){var o,u=z(null!==(o=t.id)&&void 0!==o?o:e(),t,i,r,a);return C(u,n),u}),[C]),b=t.useCallback((function(t){m.current.delete(t)}),[]),D=t.useCallback((function(){return m.current.clear()}),[]),F=t.useCallback((function(){return v.current}),[]);t.useImperativeHandle(i,(function(){return{createConfetti:V,addConfetti:C,deleteConfetti:b,clearConfetti:D,getCanvas:F}}),[V,C,b,D,F]);var _=t.useCallback((function(t,e){var n,i,a=e.clickHandler,u=e.mouseHandler;if(null!=a||null!=u){var l=null===(n=v.current)||void 0===n?void 0:n.getBoundingClientRect();if(null!=l){var s=function(t,e){if(null==e)throw new Error("element should not be null");var n=e.getBoundingClientRect();return{x:t.clientX-n.left,y:t.clientY-n.top}}(t,v.current);if(r(s,{x:l.left,y:l.top,width:l.width,height:l.height})){if(null!=u)return u(t);if(null!=a){var c=-1e3/w.current*2,d=function(t,e){for(var n=0,i=Array.from(t.values());n<i.length;n++){var r=i[n];if(null!=r&&e(r))return r}return null}(m.current,(function(t){var e=t.confetti,n=e.previewPositionUpdate(o,c);return r(s,{x:n.x-e.width.value/2,y:n.y-e.height.value/2,width:e.width.value,height:e.height.value})}));a(t,null!==(i=null==d?void 0:d.confetti)&&void 0!==i?i:null)}}}}}),[o]),R=t.useCallback((function(t){return _(t,{clickHandler:u})}),[_,u]),P=t.useCallback((function(t){return _(t,{clickHandler:l})}),[_,l]),k=t.useCallback((function(t){return _(t,{mouseHandler:s})}),[_,s]),A=t.useCallback((function(t){return _(t,{mouseHandler:c})}),[_,c]);return t.useEffect((function(){var t=function(t,e,n){null!=n&&window.addEventListener(t,e)};return t("click",R,u),t("mousedown",P,l),t("mousemove",k,s),t("mouseup",A,c),function(){window.removeEventListener("click",R),window.removeEventListener("mousedown",P),window.removeEventListener("mousemove",k),window.removeEventListener("mouseup",k)}}),[R,P,k,A,u,l,s,c]),t.useEffect((function(){var t=v.current,e=new ResizeObserver((function(){!function(t){if(null!=t){var e=t.getBoundingClientRect(),n=e.width,i=e.height;t.width=n*global.devicePixelRatio,t.height=i*global.devicePixelRatio}}(v.current)}));return null!=t&&e.observe(t),function(){null!=t&&e.unobserve(t)}}),[]),t.createElement("canvas",d({},p,{className:a,ref:v}))}));var F="SpriteCanvas-module_spriteCanvasHidden__ndzQV";!function(t,e){void 0===e&&(e={});var n=e.insertAt;if(t&&"undefined"!=typeof document){var i=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css","top"===n&&i.firstChild?i.insertBefore(r,i.firstChild):i.appendChild(r),r.styleSheet?r.styleSheet.cssText=t:r.appendChild(document.createTextNode(t))}}(".SpriteCanvas-module_spriteCanvasHidden__ndzQV {\n  display: none;\n  position: absolute;\n  width: 0;\n  height: 0;\n  left: -100%;\n}\n");var _=t.forwardRef((function(e,n){var r,a=e.className,o=e.visible,u=void 0!==o&&o,l=e.sprites,s=e.colors,c=e.spriteWidth,d=e.spriteHeight,h=t.useRef(null),f=t.useRef([]);t.useImperativeHandle(n,(function(){return{getCanvas:function(){return h.current},getCreateData:function(){return{sprites:f.current,colors:s,spriteWidth:c,spriteHeight:d}}}}),[s,d,c]);var p=t.useCallback((function(){var t=h.current,e=null==t?void 0:t.getContext("2d",{willReadFrequently:!0});null!=e&&null!=t&&(e.clearRect(0,0,t.width,t.height),f.current.forEach((function(t,n){var i=function(i,r){var a=c*r+2*r,o=d*n+2*n;if(e.drawImage(t.image,a,o,c,d),null!=i){for(var u=e.getImageData(a,o,c,d),l=function(t){"#"===t[0]&&(t=t.slice(1));var e=parseInt(t,16);return{r:e>>16&255,g:e>>8&255,b:255&e}}(i),s=0;s<u.data.length;s+=4)u.data[s]=l.r,u.data[s+1]=l.g,u.data[s+2]=l.b;e.putImageData(u,a,o)}};t.colorize?s.forEach((function(t,e){return i(t,e)})):i(null,0)})))}),[s,d,c]),v=t.useCallback((function(){var t=l.map((function(t){var e=new Image,n="string"==typeof t?t:t.src,i="string"==typeof t||t.colorize;e.src=n;var r=new Promise((function(t){e.onload=t}));return{colorize:i,image:e,src:n,loadPromise:r}}));Promise.all(t.map((function(t){return t.loadPromise}))).then((function(){f.current=t.map((function(t){return{colorize:t.colorize,image:t.image,src:t.src}})),p()}))}),[p,l]);return t.useEffect((function(){v()}),[v]),t.useEffect((function(){null!=h.current&&(h.current.width=(c+2)*Math.max(s.length,1),h.current.height=(d+2)*l.length)}),[s.length,d,c,l.length]),t.createElement("canvas",{ref:h,className:i(a,(r={},r[F]=!u,r))})}));function R(e,n){var i=t.useCallback((function(t,i){var r,a,o,u=void 0===i?{}:i,l=u.sprite,s=u.color,c=null===(r=n.current)||void 0===r?void 0:r.getCreateData(),d=null===(a=n.current)||void 0===a?void 0:a.getCanvas();if(null!=d&&null!=c&&0!==c.sprites.length)return null===(o=e.current)||void 0===o?void 0:o.createConfetti(t,d,c,l,s)}),[e,n]),r=t.useCallback((function(t,e,n){for(var r=[],a=0;a<e;a++){var o=i(t,n);o&&r.push(o)}return r}),[i]),a=t.useCallback((function(t){var i,r,a=null===(i=n.current)||void 0===i?void 0:i.getCanvas();null!=a&&(null===(r=e.current)||void 0===r||r.addConfetti(t,a))}),[e,n]),o=t.useCallback((function(t){var n;null===(n=e.current)||void 0===n||n.deleteConfetti(t)}),[e]),u=t.useCallback((function(){var t;return null===(t=e.current)||void 0===t?void 0:t.clearConfetti()}),[e]);return{createConfetti:i,createMultipleConfetti:r,addConfetti:a,clearConfetti:u,deleteConfetti:o}}var P=function(t,e,n,i){return(t/=i/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e};export{u as CREATE_CONFETTI_DEFAULTS,o as Confetti,D as ConfettiCanvas,l as Environment,m as LinearUpdatableValue,y as OscillatingUpdatableValue,_ as SpriteCanvas,v as StaticUpdatableValue,z as createConfetti,P as easeInOutQuad,C as getUpdatableValueNumber,V as getUpdatableValueVector2,b as getUpdatableValueVector3,R as useConfettiCannon};
//# sourceMappingURL=index.js.map
