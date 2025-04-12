import*as e from"react";import{v4 as t}from"uuid";function n(e,t){var n=e.x,i=e.y;return n>t.x&&n<t.x+t.width&&i>t.y&&i<t.y+t.height}function i(e,t,n,i){var r=t>0?-1:1,a=Math.abs(t);return.5*e*i*n*a*a*r}var r=function(){function e(e){this.id=e.id,this.position=e.position,this.velocity=e.velocity,this.rotation=e.rotation,this.dragCoefficient=e.dragCoefficient,this.airResistanceArea=e.airResistanceArea,this.size=e.size,this.opacity=e.opacity,this.spriteX=e.spriteX,this.spriteY=e.spriteY,this.spriteWidth=e.spriteWidth,this.spriteHeight=e.spriteHeight,this._lastUpdatedAt=Date.now()}return e.prototype.getNewForces=function(e,t){var n=e.wind*t,r=-e.gravity*t;return{x:n+i(this.dragCoefficient.x,this.velocity.x,this.airResistanceArea.x,e.density),y:r+i(this.dragCoefficient.y,this.velocity.y,this.airResistanceArea.y,e.density)}},e.prototype.update=function(e){var t=Date.now(),n=(t-this._lastUpdatedAt)/100;this.rotation.update(n),this.dragCoefficient.update(n);var i=this.getNewForces(e,n),r=i.x,a=i.y;this.velocity.update(n),this.velocity.x+=r,this.velocity.y+=a,this.position.update(n),this.position.x+=this.velocity.x*n,this.position.y+=this.velocity.y*n,this.size.update(n),this.opacity.update(n),this.opacity.value=Math.max(this.opacity.value,0),this._lastUpdatedAt=t},e.prototype.previewPositionUpdate=function(e,t){var n=t/100,i=this.velocity.previewUpdate(n),r=this.getNewForces(e,n),a=r.x,o=r.y;i.x+=a,i.y+=o;var u=this.position.previewUpdate(n);return u.x+=i.x*n,u.y+=i.y*n,u},e.prototype.draw=function(e,t){t.save(),t.globalAlpha=this.opacity.value,t.setTransform((new DOMMatrix).translateSelf(this.position.x*global.devicePixelRatio,this.position.y*global.devicePixelRatio).rotateSelf(this.rotation.x,this.rotation.y,this.rotation.z)),t.drawImage(e,this.spriteX,this.spriteY,this.spriteWidth,this.spriteHeight,-this.width/2*global.devicePixelRatio,-this.height/2*global.devicePixelRatio,this.width*global.devicePixelRatio,this.height*global.devicePixelRatio),t.restore()},e.prototype.shouldDestroy=function(e,t){return this.opacity.value<0||t.gravity>=0&&this.velocity.y<0&&this.position.y+this.height<0||t.gravity<=0&&this.velocity.y>0&&this.position.y-this.height>e.height||t.wind>=0&&this.velocity.x>0&&this.position.x-this.width>e.width||t.wind<=0&&this.velocity.x<0&&this.position.x+this.width<0},Object.defineProperty(e.prototype,"width",{get:function(){return this.size.x},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this.size.y},enumerable:!1,configurable:!0}),e.prototype.addForce=function(e){this.velocity.x+=e.x,this.velocity.y+=e.y},e}(),a={velocity:{type:"static",value:0},rotation:{type:"static",value:0},dragCoefficient:{type:"static",value:1.66},airResistanceArea:{type:"static",value:.001},opacity:{type:"static",value:1}},o=function(e){var t=void 0===e?{}:e,n=t.gravity,i=t.wind,r=t.density;this.gravity=-9.8,this.wind=0,this.density=1.2041,this.gravity=null!=n?n:this.gravity,this.wind=null!=i?i:this.wind,this.density=null!=r?r:this.density},u=function(e,t){return u=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},u(e,t)};function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}u(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}var s=function(){return s=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},s.apply(this,arguments)};function c(e,t,n,i){return new(n||(n=Promise))((function(r,a){function o(e){try{l(i.next(e))}catch(e){a(e)}}function u(e){try{l(i.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,u)}l((i=i.apply(e,t||[])).next())}))}function f(e,t){var n,i,r,a,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(u){return function(l){return function(u){if(n)throw new TypeError("Generator is already executing.");for(;a&&(a=0,u[0]&&(o=0)),o;)try{if(n=1,i&&(r=2&u[0]?i.return:u[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,u[1])).done)return r;switch(i=0,r&&(u=[2&u[0],r.value]),u[0]){case 0:case 1:r=u;break;case 4:return o.label++,{value:u[1],done:!1};case 5:o.label++,i=u[1],u=[0];continue;case 7:u=o.ops.pop(),o.trys.pop();continue;default:if(!(r=o.trys,(r=r.length>0&&r[r.length-1])||6!==u[0]&&2!==u[0])){o=0;continue}if(3===u[0]&&(!r||u[1]>r[0]&&u[1]<r[3])){o.label=u[1];break}if(6===u[0]&&o.label<r[1]){o.label=r[1],r=u;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(u);break}r[2]&&o.ops.pop(),o.trys.pop();continue}u=t.call(e,o)}catch(e){u=[6,e],i=0}finally{n=r=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,l])}}}var d=function(e){this.value=e},h=function(){function e(e,t,n){this._x=e,this._y=n?e:t}return e.prototype.update=function(e){this._x.update(e),this._y.update(e)},e.prototype.previewUpdate=function(e){return{x:this._x.previewUpdate(e),y:this._y.previewUpdate(e)}},Object.defineProperty(e.prototype,"x",{get:function(){return this._x.value},set:function(e){this._x.value=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"y",{get:function(){return this._y.value},set:function(e){this._y.value=e},enumerable:!1,configurable:!0}),e}(),p=function(e){function t(t,n,i,r){var a=e.call(this,t,n,r)||this;return a._z=r?t:i,a}return l(t,e),t.prototype.update=function(t){e.prototype.update.call(this,t),this._z.update(t)},t.prototype.previewUpdate=function(t){var n=e.prototype.previewUpdate.call(this,t);return s(s({},n),{z:this._z.previewUpdate(t)})},Object.defineProperty(t.prototype,"z",{get:function(){return this._z.value},set:function(e){this._z.value=e},enumerable:!1,configurable:!0}),t}(h),v=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l(t,e),t.prototype.update=function(){},t.prototype.previewUpdate=function(){return this.value},t}(d),y=function(e){function t(t,n){var i=e.call(this,t)||this;return i.addValue=n,i}return l(t,e),t.prototype.update=function(e){this.value=this.previewUpdate(e)},t.prototype.previewUpdate=function(e){return this.value+this.addValue*e},t}(d),m=function(e){function t(t,n,i,r,a,o){var u=e.call(this,t)||this;u.min=n,u.max=i,u.duration=r;var l=u.value/(u.max-u.min)*u.duration,s=isNaN(l)?0:l;return u.timePassed=s<0?u.duration-s:s,u.directionMultiplier=a,u.easingFunction=o,u}return l(t,e),t.prototype.update=function(e){var t=this.doUpdate(e),n=t[0],i=t[1],r=t[2];this.value=n,this.directionMultiplier=r,this.timePassed=i},t.prototype.previewUpdate=function(e){return this.doUpdate(e)[0]},t.prototype.doUpdate=function(e){var t=this.max-this.min,n=this.timePassed+e*this.directionMultiplier,i=Math.min(Math.max(n,0),this.duration),r=n<0||n>this.duration?-1*this.directionMultiplier:this.directionMultiplier,a=this.easingFunction(i,this.min,t,this.duration);return[isNaN(a)?0:a,i,r]},t}(d);function w(e,t){return e===t?e:Math.random()*(t-e+1)+e}function x(e){var t=Math.floor(w(0,e.length-1));return[e[t],t]}function g(e,t){return x([e,t])[0]}function b(e){return"number"==typeof e?{x:e,y:e}:e}function R(e){return"number"==typeof e?{x:e,y:e,z:e}:e}function C(e){return function(e){switch(e.type){case"static":return new v(e.value);case"static-random":return new v(w(e.minValue,e.maxValue));case"linear":return new y(e.value,e.addValue);case"linear-random":return new y(w(e.minValue,e.maxValue),w(e.minAddValue,e.maxAddValue));case"oscillating":return new m(e.value,e.start,e.final,e.duration,e.direction,e.easingFunction);case"oscillating-random":return new m(w(e.minValue,e.maxValue),w(e.minStart,e.maxStart),w(e.minFinal,e.maxFinal),w(e.minDuration,e.maxDuration),g(e.minDirection,e.maxDirection),x(e.easingFunctions)[0])}}(s(s({},e),{valueType:"number"}))}function V(e){return function(e){switch(e.type){case"static":var t=b(e.value);return new h(new v(t.x),new v(t.y),e.uniformVectorValues);case"static-random":var n=b(e.minValue),i=b(e.maxValue);return new h(new v(w(n.x,i.x)),new v(w(n.y,i.y)),e.uniformVectorValues);case"linear":t=b(e.value);var r=b(e.addValue);return new h(new y(t.x,r.x),new y(t.y,r.y),e.uniformVectorValues);case"linear-random":n=b(e.minValue),i=b(e.maxValue);var a=b(e.minAddValue),o=b(e.maxAddValue);return new h(new y(w(n.x,i.x),w(a.x,o.x)),new y(w(n.y,i.y),w(a.x,o.x)),e.uniformVectorValues);case"oscillating":t=b(e.value);var u=b(e.start),l=b(e.final),s=b(e.duration),c=b(e.direction);return new h(new m(t.x,u.x,l.x,s.x,c.x,e.easingFunction),new m(t.y,u.y,l.y,s.x,c.y,e.easingFunction),e.uniformVectorValues);case"oscillating-random":n=b(e.minValue),i=b(e.maxValue);var f=b(e.minStart),d=b(e.maxStart),p=b(e.minFinal),R=b(e.maxFinal),C=b(e.minDuration),V=b(e.maxDuration),z=b(e.minDirection),k=b(e.maxDirection);return new h(new m(w(n.x,i.x),w(f.x,d.x),w(p.x,R.x),w(C.x,V.x),g(z.x,k.x),x(e.easingFunctions)[0]),new m(w(n.y,i.y),w(f.y,d.y),w(p.y,R.y),w(C.y,V.y),g(z.y,k.y),x(e.easingFunctions)[0]),e.uniformVectorValues)}}(s(s({},e),{valueType:"Vector2"}))}function z(e){return function(e){switch(e.type){case"static":var t=R(e.value);return new p(new v(t.x),new v(t.y),new v(t.z),e.uniformVectorValues);case"static-random":var n=R(e.minValue),i=R(e.maxValue);return new p(new v(w(n.x,i.x)),new v(w(n.y,i.y)),new v(w(n.z,i.z)),e.uniformVectorValues);case"linear":t=R(e.value);var r=R(e.addValue);return new p(new y(t.x,r.x),new y(t.y,r.y),new y(t.z,r.z),e.uniformVectorValues);case"linear-random":n=R(e.minValue),i=R(e.maxValue);var a=R(e.minAddValue),o=R(e.maxAddValue);return new p(new y(w(n.x,i.x),w(a.x,o.x)),new y(w(n.y,i.y),w(a.y,o.y)),new y(w(n.z,i.z),w(a.z,o.z)),e.uniformVectorValues);case"oscillating":t=R(e.value);var u=R(e.start),l=R(e.final),s=R(e.duration),c=R(e.direction);return new p(new m(t.x,u.x,l.x,s.x,c.x,e.easingFunction),new m(t.y,u.y,l.y,s.z,c.y,e.easingFunction),new m(t.z,u.z,l.z,s.z,c.z,e.easingFunction),e.uniformVectorValues);case"oscillating-random":n=R(e.minValue),i=R(e.maxValue);var f=R(e.minStart),d=R(e.maxStart),h=R(e.minFinal),b=R(e.maxFinal),C=R(e.minDuration),V=R(e.maxDuration),z=R(e.minDirection),k=R(e.maxDirection);return new p(new m(w(n.x,i.x),w(f.x,d.x),w(h.x,b.x),w(C.x,V.x),g(z.x,k.x),x(e.easingFunctions)[0]),new m(w(n.y,i.y),w(f.y,d.y),w(h.y,b.y),w(C.y,V.y),g(z.y,k.y),x(e.easingFunctions)[0]),new m(w(n.z,i.z),w(f.z,d.z),w(h.z,b.z),w(C.z,V.z),g(z.z,k.z),x(e.easingFunctions)[0]),e.uniformVectorValues)}}(s(s({},e),{valueType:"Vector3"}))}function k(e,t,n,i,o){var u=function(e,t){return s(s({id:t},a),e)}(t,e),l=function(e,t){if(null!=e){var n=t.sprites.findIndex((function(t){return n=t,"string"==typeof(i=e)?n.src===i&&n.colorize:n.src===i.src&&n.colorize===i.colorize;var n,i}));if(-1!==n)return[e,n]}return x(t.sprites)}(i,n),c=l[0],f=l[1],d=function(e,t,n){if(!function(e){return"string"==typeof e||e.colorize}(e))return 0;var i=null!=t?n.colors.findIndex((function(e){return e===t})):-1;return-1!==i?i:Math.floor(w(0,n.colors.length-1))}(null!=i?i:c,o,n);return new r({id:e,position:V(u.position),velocity:V(u.velocity),rotation:z(u.rotation),dragCoefficient:V(u.dragCoefficient),size:V(u.size),opacity:C(u.opacity),airResistanceArea:V(u.airResistanceArea),spriteX:d*n.spriteWidth+2*d,spriteY:f*n.spriteHeight+2*f,spriteWidth:n.spriteWidth,spriteHeight:n.spriteHeight})}function F(){var n=e.useRef(!1),i=e.useRef({}),r=e.useCallback((function(e){for(var t in i.current)i.current[t](e)}),[]);return e.useEffect((function(){return function(){return r(!1)}}),[r]),e.useMemo((function(){return{isReady:n.current,addReadyListener:function(e){var r=t();return i.current[r]=e,n.current&&e(n.current),r},removeReadyListener:function(e){delete i.current[e]},setIsReady:function(e){n.current=e,r(e)}}}),[r])}var P=e.forwardRef((function(i,r){var a=i.className,o=i.environment,u=i.onClick,l=i.onMouseDown,c=i.onMouseMove,f=i.onMouseUp,d=i.onBeforeRender,h=i.onAfterRender,p=i.requestAnimationFrame,v=void 0===p?window.requestAnimationFrame:p,y=i.cancelAnimationFrame,m=void 0===y?window.cancelAnimationFrame:y,w=function(e,t){var n={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(i=Object.getOwnPropertySymbols(e);r<i.length;r++)t.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(e,i[r])&&(n[i[r]]=e[i[r]])}return n}(i,["className","environment","onClick","onMouseDown","onMouseMove","onMouseUp","onBeforeRender","onAfterRender","requestAnimationFrame","cancelAnimationFrame"]),x=e.useRef(null),g=F(),b=g.isReady,R=g.addReadyListener,C=g.removeReadyListener,V=g.setIsReady,z=e.useRef(new Map),P=e.useRef(null),A=e.useRef(0),M=e.useRef(0),_=e.useCallback((function(){var e=x.current;if(null!=e){var t=e.getContext("2d");if(null!=t){t.clearRect(0,0,e.width,e.height),null==d||d(t),z.current.forEach((function(n,i){var r=n.confetti,a=n.spriteCanvas;r.update(o),r.draw(a,t),r.shouldDestroy(e,o)&&z.current.delete(i)})),null==h||h(t),z.current.size>0?P.current=v(_):(t.clearRect(0,0,e.width,e.height),P.current=null);var n=Date.now();0!==A.current&&(M.current=1e3/(n-A.current)),A.current=n}}}),[o,h,d,v]);e.useEffect((function(){null!=P.current&&(m(P.current),P.current=v(_))}),[m,_,v]);var D=e.useCallback((function(e,t){z.current.set(e.id,{confetti:e,spriteCanvas:t}),null==P.current&&_()}),[_]),O=e.useCallback((function(e,n,i,r,a){var o,u=k(null!==(o=e.id)&&void 0!==o?o:t(),e,i,r,a);return D(u,n),u}),[D]),E=e.useCallback((function(e){z.current.delete(e)}),[]),U=e.useCallback((function(){return z.current.clear()}),[]),L=e.useCallback((function(){return x.current}),[]);e.useImperativeHandle(r,(function(){return{createConfetti:O,addConfetti:D,deleteConfetti:E,clearConfetti:U,getCanvas:L,addReadyListener:R,removeReadyListener:C,isReady:b}}),[O,D,E,U,L,R,C,b]);var H=e.useCallback((function(e,t){var i,r,a=t.clickHandler,u=t.mouseHandler;if(null!=a||null!=u){var l=null===(i=x.current)||void 0===i?void 0:i.getBoundingClientRect();if(null!=l){var s=function(e,t){if(null==t)throw new Error("element should not be null");var n=t.getBoundingClientRect();return{x:e.clientX-n.left,y:e.clientY-n.top}}(e,x.current);if(n(s,{x:l.left,y:l.top,width:l.width,height:l.height})){if(null!=u)return u(e);if(null!=a){var c=-1e3/M.current*2,f=function(e,t){for(var n=0,i=Array.from(e.values());n<i.length;n++){var r=i[n];if(null!=r&&t(r))return r}return null}(z.current,(function(e){var t=e.confetti,i=t.previewPositionUpdate(o,c);return n(s,{x:i.x-t.width/2,y:i.y-t.height/2,width:t.width,height:t.height})}));a(e,null!==(r=null==f?void 0:f.confetti)&&void 0!==r?r:null)}}}}}),[o]),S=e.useCallback((function(e){return H(e,{clickHandler:u})}),[H,u]),j=e.useCallback((function(e){return H(e,{clickHandler:l})}),[H,l]),I=e.useCallback((function(e){return H(e,{mouseHandler:c})}),[H,c]),N=e.useCallback((function(e){return H(e,{mouseHandler:f})}),[H,f]);return e.useEffect((function(){var e=function(e,t,n){null!=n&&window.addEventListener(e,t)};return e("click",S,u),e("mousedown",j,l),e("mousemove",I,c),e("mouseup",N,f),function(){window.removeEventListener("click",S),window.removeEventListener("mousedown",j),window.removeEventListener("mousemove",I),window.removeEventListener("mouseup",I)}}),[S,j,I,N,u,l,c,f]),e.useEffect((function(){var e=x.current,t=new ResizeObserver((function(){!function(e){if(null!=e){var t=e.getBoundingClientRect(),n=t.width,i=t.height;e.width=n*global.devicePixelRatio,e.height=i*global.devicePixelRatio}}(x.current),V(!0)}));return null!=e&&t.observe(e),function(){null!=e&&t.unobserve(e)}}),[V]),e.createElement("canvas",s({},w,{className:a,ref:x}))})),A={display:"none",position:"absolute",width:0,height:0,left:"-100%"},M=e.forwardRef((function(t,n){var i=t.className,r=t.visible,a=void 0!==r&&r,o=t.sprites,u=t.colors,l=t.spriteWidth,s=t.spriteHeight,d=e.useRef(null),h=e.useRef([]),p=F(),v=p.isReady,y=p.addReadyListener,m=p.removeReadyListener,w=p.setIsReady;e.useImperativeHandle(n,(function(){return{getCanvas:function(){return d.current},getCreateData:function(){return{sprites:h.current,colors:u,spriteWidth:l,spriteHeight:s}},addReadyListener:y,removeReadyListener:m,isReady:v}}),[y,u,v,m,s,l]);var x=e.useCallback((function(){var e=d.current,t=null==e?void 0:e.getContext("2d",{willReadFrequently:!0});null!=t&&null!=e&&(t.clearRect(0,0,e.width,e.height),h.current.forEach((function(e,n){var i=function(i,r){var a=l*r+2*r,o=s*n+2*n;if(t.drawImage(e.image,a,o,l,s),null!=i){for(var u=t.getImageData(a,o,l,s),c=function(e){"#"===e[0]&&(e=e.slice(1));var t=parseInt(e,16);return{r:t>>16&255,g:t>>8&255,b:255&t}}(i),f=0;f<u.data.length;f+=4)u.data[f]=c.r,u.data[f+1]=c.g,u.data[f+2]=c.b;t.putImageData(u,a,o)}};e.colorize?u.forEach((function(e,t){return i(e,t)})):i(null,0)})))}),[u,s,l]),g=e.useCallback((function(){var e=o.map((function(e){var t=new Image,n="string"==typeof e?e:e.src,i="string"==typeof e||e.colorize;t.src=n;var r=new Promise((function(e){t.onload=e}));return{colorize:i,image:t,src:n,loadPromise:r}}));return Promise.all(e.map((function(e){return e.loadPromise}))).then((function(){h.current=e.map((function(e){return{colorize:e.colorize,image:e.image,src:e.src}}))}))}),[o]),b=e.useCallback((function(){return c(void 0,void 0,void 0,(function(){return f(this,(function(e){switch(e.label){case 0:return[4,g()];case 1:return e.sent(),x(),w(!0),[2]}}))}))}),[g,x,w]);return e.useEffect((function(){b()}),[b]),e.useEffect((function(){null!=d.current&&(d.current.width=(l+2)*Math.max(u.length,1),d.current.height=(s+2)*o.length)}),[u.length,s,l,o.length]),e.createElement("canvas",{ref:d,className:i,style:a?void 0:A})}));function _(t,n){var i,r,a=e.useState(null!==(i=null==n?void 0:n.isReady)&&void 0!==i&&i),o=a[0],u=a[1],l=e.useState(null!==(r=null==t?void 0:t.isReady)&&void 0!==r&&r),s=l[0],c=l[1];e.useEffect((function(){var e=null==n?void 0:n.addReadyListener(u);return function(){null!=e&&(null==n||n.removeReadyListener(e))}}),[n]),e.useEffect((function(){var e=null==t?void 0:t.addReadyListener(c);return function(){null!=e&&(null==t||t.removeReadyListener(e))}}),[t]);var f=e.useCallback((function(e,i){var r=void 0===i?{}:i,a=r.sprite,o=r.color,u=null==n?void 0:n.getCreateData(),l=null==n?void 0:n.getCanvas();if(null!=l&&null!=u&&0!==u.sprites.length)return null==t?void 0:t.createConfetti(e,l,u,a,o)}),[t,n]),d=e.useCallback((function(e,t,n){for(var i=[],r=0;r<t;r++){var a=f(e,n);a&&i.push(a)}return i}),[f]),h=e.useCallback((function(e){var i=null==n?void 0:n.getCanvas();null!=i&&(null==t||t.addConfetti(e,i))}),[t,n]),p=e.useCallback((function(e){null==t||t.deleteConfetti(e)}),[t]),v=e.useCallback((function(){return null==t?void 0:t.clearConfetti()}),[t]);return e.useMemo((function(){return{createConfetti:f,createMultipleConfetti:d,addConfetti:h,clearConfetti:v,deleteConfetti:p,isReady:null!=n&&null!=t&&s&&o}}),[h,v,t,f,d,p,s,o,n])}var D=function(e,t,n,i){return(e/=i/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t};export{a as CREATE_CONFETTI_DEFAULTS,r as Confetti,P as ConfettiCanvas,o as Environment,y as LinearUpdatableValue,m as OscillatingUpdatableValue,M as SpriteCanvas,v as StaticUpdatableValue,k as createConfetti,D as easeInOutQuad,C as getUpdatableValueNumber,V as getUpdatableValueVector2,z as getUpdatableValueVector3,_ as useConfettiCannon};
//# sourceMappingURL=index.js.map
