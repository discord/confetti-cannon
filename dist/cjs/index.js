"use strict";var e=require("react"),t=require("uuid");function n(e){var t=Object.create(null);return e&&Object.keys(e).forEach((function(n){if("default"!==n){var i=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,i.get?i:{enumerable:!0,get:function(){return e[n]}})}})),t.default=e,Object.freeze(t)}var i=n(e);function r(e,t){var n=e.x,i=e.y;return n>t.x&&n<t.x+t.width&&i>t.y&&i<t.y+t.height}function a(e,t,n,i){var r=t>0?-1:1,a=Math.abs(t);return.5*e*i*n*a*a*r}var o=function(){function e(e){this.id=e.id,this.position=e.position,this.velocity=e.velocity,this.rotation=e.rotation,this.dragCoefficient=e.dragCoefficient,this.airResistanceArea=e.airResistanceArea,this.size=e.size,this.opacity=e.opacity,this.spriteX=e.spriteX,this.spriteY=e.spriteY,this.spriteWidth=e.spriteWidth,this.spriteHeight=e.spriteHeight,this._lastUpdatedAt=Date.now()}return e.prototype.getNewForces=function(e,t){var n=e.wind*t,i=-e.gravity*t;return{x:n+a(this.dragCoefficient.x,this.velocity.x,this.airResistanceArea.x,e.density),y:i+a(this.dragCoefficient.y,this.velocity.y,this.airResistanceArea.y,e.density)}},e.prototype.update=function(e){var t=Date.now(),n=(t-this._lastUpdatedAt)/100;this.rotation.update(n),this.dragCoefficient.update(n);var i=this.getNewForces(e,n),r=i.x,a=i.y;this.velocity.update(n),this.velocity.x+=r,this.velocity.y+=a,this.position.update(n),this.position.x+=this.velocity.x*n,this.position.y+=this.velocity.y*n,this.size.update(n),this.opacity.update(n),this.opacity.value=Math.max(this.opacity.value,0),this._lastUpdatedAt=t},e.prototype.previewPositionUpdate=function(e,t){var n=t/100,i=this.velocity.previewUpdate(n),r=this.getNewForces(e,n),a=r.x,o=r.y;i.x+=a,i.y+=o;var u=this.position.previewUpdate(n);return u.x+=i.x*n,u.y+=i.y*n,u},e.prototype.draw=function(e,t){t.save(),t.globalAlpha=this.opacity.value,t.setTransform((new DOMMatrix).translateSelf(this.position.x*global.devicePixelRatio,this.position.y*global.devicePixelRatio).rotateSelf(this.rotation.x,this.rotation.y,this.rotation.z)),t.drawImage(e,this.spriteX,this.spriteY,this.spriteWidth,this.spriteHeight,-this.width/2*global.devicePixelRatio,-this.height/2*global.devicePixelRatio,this.width*global.devicePixelRatio,this.height*global.devicePixelRatio),t.restore()},e.prototype.shouldDestroy=function(e,t){return this.opacity.value<0||t.gravity>=0&&this.velocity.y<0&&this.position.y+this.height<0||t.gravity<=0&&this.velocity.y>0&&this.position.y-this.height>e.height||t.wind>=0&&this.velocity.x>0&&this.position.x-this.width>e.width||t.wind<=0&&this.velocity.x<0&&this.position.x+this.width<0},Object.defineProperty(e.prototype,"width",{get:function(){return this.size.x},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this.size.y},enumerable:!1,configurable:!0}),e.prototype.addForce=function(e){this.velocity.x+=e.x,this.velocity.y+=e.y},e}(),u={velocity:{type:"static",value:0},rotation:{type:"static",value:0},dragCoefficient:{type:"static",value:1.66},airResistanceArea:{type:"static",value:.001},opacity:{type:"static",value:1}},l=function(e){var t=void 0===e?{}:e,n=t.gravity,i=t.wind,r=t.density;this.gravity=-9.8,this.wind=0,this.density=1.2041,this.gravity=null!=n?n:this.gravity,this.wind=null!=i?i:this.wind,this.density=null!=r?r:this.density},s=function(e,t){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},s(e,t)};function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}s(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var f=function(){return f=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},f.apply(this,arguments)};function d(e,t,n,i){return new(n||(n=Promise))((function(r,a){function o(e){try{l(i.next(e))}catch(e){a(e)}}function u(e){try{l(i.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,u)}l((i=i.apply(e,t||[])).next())}))}function p(e,t){var n,i,r,a,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(u){return function(l){return function(u){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,u[0]&&(o=0)),o;)try{if(n=1,i&&(r=2&u[0]?i.return:u[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,u[1])).done)return r;switch(i=0,r&&(u=[2&u[0],r.value]),u[0]){case 0:case 1:r=u;break;case 4:return o.label++,{value:u[1],done:!1};case 5:o.label++,i=u[1],u=[0];continue;case 7:u=o.ops.pop(),o.trys.pop();continue;default:if(!(r=o.trys,(r=r.length>0&&r[r.length-1])||6!==u[0]&&2!==u[0])){o=0;continue}if(3===u[0]&&(!r||u[1]>r[0]&&u[1]<r[3])){o.label=u[1];break}if(6===u[0]&&o.label<r[1]){o.label=r[1],r=u;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(u);break}r[2]&&o.ops.pop(),o.trys.pop();continue}u=t.call(e,o)}catch(e){u=[6,e],i=0}finally{n=r=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,l])}}}var h=function(e){this.value=e},v=function(){function e(e,t,n){this._x=e,this._y=n?e:t}return e.prototype.update=function(e){this._x.update(e),this._y.update(e)},e.prototype.previewUpdate=function(e){return{x:this._x.previewUpdate(e),y:this._y.previewUpdate(e)}},Object.defineProperty(e.prototype,"x",{get:function(){return this._x.value},set:function(e){this._x.value=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"y",{get:function(){return this._y.value},set:function(e){this._y.value=e},enumerable:!1,configurable:!0}),e}(),y=function(e){function t(t,n,i,r){var a=e.call(this,t,n,r)||this;return a._z=r?t:i,a}return c(t,e),t.prototype.update=function(t){e.prototype.update.call(this,t),this._z.update(t)},t.prototype.previewUpdate=function(t){var n=e.prototype.previewUpdate.call(this,t);return f(f({},n),{z:this._z.previewUpdate(t)})},Object.defineProperty(t.prototype,"z",{get:function(){return this._z.value},set:function(e){this._z.value=e},enumerable:!1,configurable:!0}),t}(v),m=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return c(t,e),t.prototype.update=function(){},t.prototype.previewUpdate=function(){return this.value},t}(h),x=function(e){function t(t,n){var i=e.call(this,t)||this;return i.addValue=n,i}return c(t,e),t.prototype.update=function(e){this.value=this.previewUpdate(e)},t.prototype.previewUpdate=function(e){return this.value+this.addValue*e},t}(h),w=function(e){function t(t,n,i,r,a,o){var u=e.call(this,t)||this;u.min=n,u.max=i,u.duration=r;var l=u.value/(u.max-u.min)*u.duration,s=isNaN(l)?0:l;return u.timePassed=s<0?u.duration-s:s,u.directionMultiplier=a,u.easingFunction=o,u}return c(t,e),t.prototype.update=function(e){var t=this.doUpdate(e),n=t[0],i=t[1],r=t[2];this.value=n,this.directionMultiplier=r,this.timePassed=i},t.prototype.previewUpdate=function(e){return this.doUpdate(e)[0]},t.prototype.doUpdate=function(e){var t=this.max-this.min,n=this.timePassed+e*this.directionMultiplier,i=Math.min(Math.max(n,0),this.duration),r=n<0||n>this.duration?-1*this.directionMultiplier:this.directionMultiplier,a=this.easingFunction(i,this.min,t,this.duration);return[isNaN(a)?0:a,i,r]},t}(h);function g(e,t){return e===t?e:Math.random()*(t-e+1)+e}function b(e){var t=Math.floor(g(0,e.length-1));return[e[t],t]}function C(e,t){return b([e,t])[0]}function V(e){return"number"==typeof e?{x:e,y:e}:e}function z(e){return"number"==typeof e?{x:e,y:e,z:e}:e}function R(e){return function(e){switch(e.type){case"static":return new m(e.value);case"static-random":return new m(g(e.minValue,e.maxValue));case"linear":return new x(e.value,e.addValue);case"linear-random":return new x(g(e.minValue,e.maxValue),g(e.minAddValue,e.maxAddValue));case"oscillating":return new w(e.value,e.start,e.final,e.duration,e.direction,e.easingFunction);case"oscillating-random":return new w(g(e.minValue,e.maxValue),g(e.minStart,e.maxStart),g(e.minFinal,e.maxFinal),g(e.minDuration,e.maxDuration),C(e.minDirection,e.maxDirection),b(e.easingFunctions)[0])}}(f(f({},e),{valueType:"number"}))}function O(e){return function(e){switch(e.type){case"static":var t=V(e.value);return new v(new m(t.x),new m(t.y),e.uniformVectorValues);case"static-random":var n=V(e.minValue),i=V(e.maxValue);return new v(new m(g(n.x,i.x)),new m(g(n.y,i.y)),e.uniformVectorValues);case"linear":t=V(e.value);var r=V(e.addValue);return new v(new x(t.x,r.x),new x(t.y,r.y),e.uniformVectorValues);case"linear-random":n=V(e.minValue),i=V(e.maxValue);var a=V(e.minAddValue),o=V(e.maxAddValue);return new v(new x(g(n.x,i.x),g(a.x,o.x)),new x(g(n.y,i.y),g(a.x,o.x)),e.uniformVectorValues);case"oscillating":t=V(e.value);var u=V(e.start),l=V(e.final),s=V(e.duration),c=V(e.direction);return new v(new w(t.x,u.x,l.x,s.x,c.x,e.easingFunction),new w(t.y,u.y,l.y,s.x,c.y,e.easingFunction),e.uniformVectorValues);case"oscillating-random":n=V(e.minValue),i=V(e.maxValue);var f=V(e.minStart),d=V(e.maxStart),p=V(e.minFinal),h=V(e.maxFinal),y=V(e.minDuration),z=V(e.maxDuration),R=V(e.minDirection),O=V(e.maxDirection);return new v(new w(g(n.x,i.x),g(f.x,d.x),g(p.x,h.x),g(y.x,z.x),C(R.x,O.x),b(e.easingFunctions)[0]),new w(g(n.y,i.y),g(f.y,d.y),g(p.y,h.y),g(y.y,z.y),C(R.y,O.y),b(e.easingFunctions)[0]),e.uniformVectorValues)}}(f(f({},e),{valueType:"Vector2"}))}function k(e){return function(e){switch(e.type){case"static":var t=z(e.value);return new y(new m(t.x),new m(t.y),new m(t.z),e.uniformVectorValues);case"static-random":var n=z(e.minValue),i=z(e.maxValue);return new y(new m(g(n.x,i.x)),new m(g(n.y,i.y)),new m(g(n.z,i.z)),e.uniformVectorValues);case"linear":t=z(e.value);var r=z(e.addValue);return new y(new x(t.x,r.x),new x(t.y,r.y),new x(t.z,r.z),e.uniformVectorValues);case"linear-random":n=z(e.minValue),i=z(e.maxValue);var a=z(e.minAddValue),o=z(e.maxAddValue);return new y(new x(g(n.x,i.x),g(a.x,o.x)),new x(g(n.y,i.y),g(a.y,o.y)),new x(g(n.z,i.z),g(a.z,o.z)),e.uniformVectorValues);case"oscillating":t=z(e.value);var u=z(e.start),l=z(e.final),s=z(e.duration),c=z(e.direction);return new y(new w(t.x,u.x,l.x,s.x,c.x,e.easingFunction),new w(t.y,u.y,l.y,s.z,c.y,e.easingFunction),new w(t.z,u.z,l.z,s.z,c.z,e.easingFunction),e.uniformVectorValues);case"oscillating-random":n=z(e.minValue),i=z(e.maxValue);var f=z(e.minStart),d=z(e.maxStart),p=z(e.minFinal),h=z(e.maxFinal),v=z(e.minDuration),V=z(e.maxDuration),R=z(e.minDirection),O=z(e.maxDirection);return new y(new w(g(n.x,i.x),g(f.x,d.x),g(p.x,h.x),g(v.x,V.x),C(R.x,O.x),b(e.easingFunctions)[0]),new w(g(n.y,i.y),g(f.y,d.y),g(p.y,h.y),g(v.y,V.y),C(R.y,O.y),b(e.easingFunctions)[0]),new w(g(n.z,i.z),g(f.z,d.z),g(p.z,h.z),g(v.z,V.z),C(R.z,O.z),b(e.easingFunctions)[0]),e.uniformVectorValues)}}(f(f({},e),{valueType:"Vector3"}))}function P(e,t,n,i,r){var a=function(e,t){return f(f({id:t},u),e)}(t,e),l=function(e,t){if(null!=e){var n=t.sprites.findIndex((function(t){return n=t,"string"==typeof(i=e)?n.src===i&&n.colorize:n.src===i.src&&n.colorize===i.colorize;var n,i}));if(-1!==n)return[e,n]}return b(t.sprites)}(i,n),s=l[0],c=l[1],d=function(e,t,n){if(!function(e){return"string"==typeof e||e.colorize}(e))return 0;var i=null!=t?n.colors.findIndex((function(e){return e===t})):-1;return-1!==i?i:Math.floor(g(0,n.colors.length-1))}(null!=i?i:s,r,n);return new o({id:e,position:O(a.position),velocity:O(a.velocity),rotation:k(a.rotation),dragCoefficient:O(a.dragCoefficient),size:O(a.size),opacity:R(a.opacity),airResistanceArea:O(a.airResistanceArea),spriteX:d*n.spriteWidth+2*d,spriteY:c*n.spriteHeight+2*c,spriteWidth:n.spriteWidth,spriteHeight:n.spriteHeight})}var F=i.forwardRef((function(e,n){var a=e.className,o=e.environment,u=e.onClick,l=e.onMouseDown,s=e.onMouseMove,c=e.onMouseUp,d=e.onBeforeRender,p=e.onAfterRender,h=function(e,t){var n={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(i=Object.getOwnPropertySymbols(e);r<i.length;r++)t.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(e,i[r])&&(n[i[r]]=e[i[r]])}return n}(e,["className","environment","onClick","onMouseDown","onMouseMove","onMouseUp","onBeforeRender","onAfterRender"]),v=i.useRef(null),y=i.useRef(new Map),m=i.useRef(null),x=i.useRef(0),w=i.useRef(0),g=i.useCallback((function(){var e=v.current;if(null!=e){var t=e.getContext("2d");if(null!=t){t.clearRect(0,0,e.width,e.height),null==d||d(t),y.current.forEach((function(n,i){var r=n.confetti,a=n.spriteCanvas;r.update(o),r.draw(a,t),r.shouldDestroy(e,o)&&y.current.delete(i)})),null==p||p(t),y.current.size>0?m.current=window.requestAnimationFrame(g):(t.clearRect(0,0,e.width,e.height),m.current=null);var n=Date.now();0!==x.current&&(w.current=1e3/(n-x.current)),x.current=n}}}),[o,p,d]);i.useEffect((function(){null!=m.current&&(window.cancelAnimationFrame(m.current),m.current=window.requestAnimationFrame(g))}),[g]);var b=i.useCallback((function(e,t){y.current.set(e.id,{confetti:e,spriteCanvas:t}),null==m.current&&g()}),[g]),C=i.useCallback((function(e,n,i,r,a){var o,u=P(null!==(o=e.id)&&void 0!==o?o:t.v4(),e,i,r,a);return b(u,n),u}),[b]),V=i.useCallback((function(e){y.current.delete(e)}),[]),z=i.useCallback((function(){return y.current.clear()}),[]),R=i.useCallback((function(){return v.current}),[]);i.useImperativeHandle(n,(function(){return{createConfetti:C,addConfetti:b,deleteConfetti:V,clearConfetti:z,getCanvas:R}}),[C,b,V,z,R]);var O=i.useCallback((function(e,t){var n,i,a=t.clickHandler,u=t.mouseHandler;if(null!=a||null!=u){var l=null===(n=v.current)||void 0===n?void 0:n.getBoundingClientRect();if(null!=l){var s=function(e,t){if(null==t)throw new Error("element should not be null");var n=t.getBoundingClientRect();return{x:e.clientX-n.left,y:e.clientY-n.top}}(e,v.current);if(r(s,{x:l.left,y:l.top,width:l.width,height:l.height})){if(null!=u)return u(e);if(null!=a){var c=-1e3/w.current*2,f=function(e,t){for(var n=0,i=Array.from(e.values());n<i.length;n++){var r=i[n];if(null!=r&&t(r))return r}return null}(y.current,(function(e){var t=e.confetti,n=t.previewPositionUpdate(o,c);return r(s,{x:n.x-t.width/2,y:n.y-t.height/2,width:t.width,height:t.height})}));a(e,null!==(i=null==f?void 0:f.confetti)&&void 0!==i?i:null)}}}}}),[o]),k=i.useCallback((function(e){return O(e,{clickHandler:u})}),[O,u]),F=i.useCallback((function(e){return O(e,{clickHandler:l})}),[O,l]),U=i.useCallback((function(e){return O(e,{mouseHandler:s})}),[O,s]),_=i.useCallback((function(e){return O(e,{mouseHandler:c})}),[O,c]);return i.useEffect((function(){var e=function(e,t,n){null!=n&&window.addEventListener(e,t)};return e("click",k,u),e("mousedown",F,l),e("mousemove",U,s),e("mouseup",_,c),function(){window.removeEventListener("click",k),window.removeEventListener("mousedown",F),window.removeEventListener("mousemove",U),window.removeEventListener("mouseup",U)}}),[k,F,U,_,u,l,s,c]),i.useEffect((function(){var e=v.current,t=new ResizeObserver((function(){!function(e){if(null!=e){var t=e.getBoundingClientRect(),n=t.width,i=t.height;e.width=n*global.devicePixelRatio,e.height=i*global.devicePixelRatio}}(v.current)}));return null!=e&&t.observe(e),function(){null!=e&&t.unobserve(e)}}),[]),i.createElement("canvas",f({},h,{className:a,ref:v}))})),U={display:"none",position:"absolute",width:0,height:0,left:"-100%"},_=i.forwardRef((function(e,n){var r=e.className,a=e.visible,o=void 0!==a&&a,u=e.sprites,l=e.colors,s=e.spriteWidth,c=e.spriteHeight,f=i.useRef(null),h=i.useRef([]),v=i.useRef(!1),y=i.useRef({});i.useImperativeHandle(n,(function(){return{getCanvas:function(){return f.current},getCreateData:function(){return{sprites:h.current,colors:l,spriteWidth:s,spriteHeight:c}},addReadyListener:function(e){var n=t.v4();return y.current[n]=e,n},removeReadyListener:function(e){delete y.current[e]},isReady:v.current}}),[l,c,s]);var m=i.useCallback((function(){var e=f.current,t=null==e?void 0:e.getContext("2d",{willReadFrequently:!0});null!=t&&null!=e&&(t.clearRect(0,0,e.width,e.height),h.current.forEach((function(e,n){var i=function(i,r){var a=s*r+2*r,o=c*n+2*n;if(t.drawImage(e.image,a,o,s,c),null!=i){for(var u=t.getImageData(a,o,s,c),l=function(e){"#"===e[0]&&(e=e.slice(1));var t=parseInt(e,16);return{r:t>>16&255,g:t>>8&255,b:255&t}}(i),f=0;f<u.data.length;f+=4)u.data[f]=l.r,u.data[f+1]=l.g,u.data[f+2]=l.b;t.putImageData(u,a,o)}};e.colorize?l.forEach((function(e,t){return i(e,t)})):i(null,0)})))}),[l,c,s]),x=i.useCallback((function(){var e=u.map((function(e){var t=new Image,n="string"==typeof e?e:e.src,i="string"==typeof e||e.colorize;t.src=n;var r=new Promise((function(e){t.onload=e}));return{colorize:i,image:t,src:n,loadPromise:r}}));return Promise.all(e.map((function(e){return e.loadPromise}))).then((function(){h.current=e.map((function(e){return{colorize:e.colorize,image:e.image,src:e.src}}))}))}),[u]),w=i.useCallback((function(e){for(var t in y.current)y.current[t](e)}),[]),g=i.useCallback((function(){return d(void 0,void 0,void 0,(function(){return p(this,(function(e){switch(e.label){case 0:return[4,x()];case 1:return e.sent(),m(),v.current=!0,w(!0),[2]}}))}))}),[w,x,m]);return i.useEffect((function(){g()}),[g]),i.useEffect((function(){return function(){return w(!1)}}),[w]),i.useEffect((function(){null!=f.current&&(f.current.width=(s+2)*Math.max(l.length,1),f.current.height=(c+2)*u.length)}),[l.length,c,s,u.length]),i.createElement("canvas",{ref:f,className:r,style:o?void 0:U})}));exports.CREATE_CONFETTI_DEFAULTS=u,exports.Confetti=o,exports.ConfettiCanvas=F,exports.Environment=l,exports.LinearUpdatableValue=x,exports.OscillatingUpdatableValue=w,exports.SpriteCanvas=_,exports.StaticUpdatableValue=m,exports.createConfetti=P,exports.easeInOutQuad=function(e,t,n,i){return(e/=i/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t},exports.getUpdatableValueNumber=R,exports.getUpdatableValueVector2=O,exports.getUpdatableValueVector3=k,exports.useConfettiCannon=function(e,t){var n,r=i.useState(null!==(n=null==t?void 0:t.isReady)&&void 0!==n&&n),a=r[0],o=r[1];i.useEffect((function(){var e=null==t?void 0:t.addReadyListener(o);return function(){null!=e&&(null==t||t.removeReadyListener(e))}}),[t]);var u=i.useCallback((function(n,i){var r=void 0===i?{}:i,a=r.sprite,o=r.color,u=null==t?void 0:t.getCreateData(),l=null==t?void 0:t.getCanvas();if(null!=l&&null!=u&&0!==u.sprites.length)return null==e?void 0:e.createConfetti(n,l,u,a,o)}),[e,t]),l=i.useCallback((function(e,t,n){for(var i=[],r=0;r<t;r++){var a=u(e,n);a&&i.push(a)}return i}),[u]),s=i.useCallback((function(n){var i=null==t?void 0:t.getCanvas();null!=i&&(null==e||e.addConfetti(n,i))}),[e,t]),c=i.useCallback((function(t){null==e||e.deleteConfetti(t)}),[e]),f=i.useCallback((function(){return null==e?void 0:e.clearConfetti()}),[e]);return i.useMemo((function(){return{createConfetti:u,createMultipleConfetti:l,addConfetti:s,clearConfetti:f,deleteConfetti:c,isReady:a&&null!=t&&null!=e}}),[s,f,e,u,l,c,a,t])};
//# sourceMappingURL=index.js.map
