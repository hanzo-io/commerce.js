!function(t){"use strict";var e,r,i,n=e={track:function(t,e){var r;if(null!=("undefined"!=typeof window&&null!==window?window.analytics:void 0))try{return window.analytics.track(t,e)}catch(t){return r=t,console.error(r)}}},o=r=function(){function t(t){this.state=t.state,this.value=t.value,this.reason=t.reason}return t.prototype.isFulfilled=function(){return"fulfilled"===this.state},t.prototype.isRejected=function(){return"rejected"===this.state},t}();i=function(){var t,e,r,i,n;return i=[],n=0,t=1024,e=function(){for(var e;i.length-n;){try{i[n]()}catch(t){e=t,"undefined"!=typeof console&&console.error(e)}i[n++]=void 0,n===t&&(i.splice(0,t),n=0)}},r=function(){var t,r;return"undefined"!=typeof MutationObserver?(t=document.createElement("div"),r=new MutationObserver(e),r.observe(t,{attributes:!0}),function(){t.setAttribute("a",0)}):"undefined"!=typeof setImmediate?function(){setImmediate(e)}:function(){setTimeout(e,0)}}(),function(t){i.push(t),i.length-n==1&&r()}}();var s,a,u,c,d,h,l,p=i;d=void 0,u=d,a="fulfilled",c="rejected",l=function(t,e){var r,i;if("function"==typeof t.y)try{i=t.y.call(d,e),t.p.resolve(i)}catch(e){r=e,t.p.reject(r)}else t.p.resolve(e)},h=function(t,e){var r,i;if("function"==typeof t.n)try{i=t.n.call(d,e),t.p.resolve(i)}catch(e){r=e,t.p.reject(r)}else t.p.reject(e)},s=function(){function t(t){t&&t(function(t){return function(e){return t.resolve(e)}}(this),function(t){return function(e){return t.reject(e)}}(this))}return t.prototype.resolve=function(t){var e,r,i,n;if(this.state===u){if(t===this)return this.reject(new TypeError("Attempt to resolve promise with self"));if(t&&("function"==typeof t||"object"==typeof t))try{if(i=!0,"function"==typeof(n=t.then))return void n.call(t,function(t){return function(e){i&&(i&&(i=!1),t.resolve(e))}}(this),function(t){return function(e){i&&(i=!1,t.reject(e))}}(this))}catch(t){return r=t,void(i&&this.reject(r))}this.state=a,this.v=t,(e=this.c)&&p(function(r){return function(){var r,i,n;for(i=0,n=e.length;i<n;i++)r=e[i],l(r,t)}}())}},t.prototype.reject=function(e){var r;this.state===u&&(this.state=c,this.v=e,(r=this.c)?p(function(){var t,i,n;for(i=0,n=r.length;i<n;i++)t=r[i],h(t,e)}):t.suppressUncaughtRejectionError||"undefined"==typeof console||console.log("Broken Promise, please catch rejections: ",e,e?e.stack:null))},t.prototype.then=function(e,r){var i,n,o,s;return o=new t,n={y:e,n:r,p:o},this.state===u?this.c?this.c.push(n):this.c=[n]:(s=this.state,i=this.v,p(function(){s===a?l(n,i):h(n,i)})),o},t.prototype.catch=function(t){return this.then(null,t)},t.prototype.finally=function(t){return this.then(t,t)},t.prototype.timeout=function(e,r){return r=r||"timeout",new t(function(t){return function(i,n){setTimeout(function(){return n(Error(r))},e),t.then(function(t){i(t)},function(t){n(t)})}}(this))},t.prototype.callback=function(t){return"function"==typeof t&&(this.then(function(e){return t(null,e)}),this.catch(function(e){return t(e,null)})),this},t}();var f=s,g=function(t){var e;return e=new f,e.resolve(t),e},y=function(t){var e;return e=new f,e.reject(t),e},v=function(t){var e,r,i,n,o,s,a,u;for(a=[],o=0,u=new f,s=function(e,r){e&&"function"==typeof e.then||(e=g(e)),e.then(function(e){a[r]=e,++o===t.length&&u.resolve(a)},function(t){u.reject(t)})},e=r=0,i=t.length;r<i;e=++r)n=t[e],s(n,e);return t.length||u.resolve(a),u},m=function(t){return new f(function(e,r){return t.then(function(t){return e(new o({state:"fulfilled",value:t}))}).catch(function(t){return e(new o({state:"rejected",reason:t}))})})},w=function(t){return v(t.map(m))};f.all=v,f.reflect=m,f.reject=y,f.resolve=g,f.settle=w,f.soon=p;var I;I=function(){class t{constructor(t,e,r={}){this.client=t,this.data=e,this.opts=r,this.queue=[],this.invoice()}initCart(){var t,e,r,i,n,o;if((t=this.data.get("order.cartId"))||null==this.client.cart){for(this.onCart(t),i=this.data.get("order.items"),e=n=0,o=i.length;n<o;e=++n)r=i[e],this._cartSet(r.productId,r.quantity);return this.onCart(t)}return this.client.cart.create().then(t=>{var e,r,i,n,o;this.data.set("order.cartId",t.id);i=this.data.get("order.items");for(e=n=0,o=i.length;n<o;e=++n)r=i[e],this._cartSet(r.productId,r.quantity);return this.onCart(t.id)})}onCart(t){}_cartSet(t,e){var r;if((r=this.data.get("order.cartId"))&&null!=this.client.cart)return this.client.cart.set({id:r,productId:t,quantity:e})}_cartUpdate(t){var e;if((e=this.data.get("order.cartId"))&&null!=this.client.cart)return t.id=e,this.client.cart.update(t)}set(t,e,r=!1){return this.queue.push([t,e,r]),1===this.queue.length&&(this.promise=new f((t,e)=>{this.resolve=t;return this.reject=e}),this._set()),this.promise}get(t){var e,r,i,n,o,s,a,u;for(i=this.data.get("order.items"),e=n=0,s=i.length;n<s;e=++n)if(r=i[e],r.id===t||r.productId===t||r.productSlug===t)return r;for(u=this.queue,e=o=0,a=u.length;o<a;e=++o)if(r=u[e],r[0]===t)return{id:r[0],quantity:r[2],locked:r[3]}}_set(){var t,e,r,i,o,s,a,u,c,d,h,l,p,f,g;if(s=this.data.get("order.items"),0===this.queue.length)return this.invoice(),void(null!=this.resolve&&this.resolve(s));if(g=this.queue[0],i=g[0],f=g[1],h=g[2],0===f){for(r=a=0,c=s.length;a<c&&(o=s[r],o.productId!==i&&o.productSlug!==i&&o.id!==i);r=++a);return r<s.length&&(this.data.set("order.items",[]),s.splice(r,1),this.onUpdate(),t={id:o.productId,sku:o.productSlug,name:o.productName,quantity:o.quantity,price:parseFloat(o.price/100)},null!=this.opts.analyticsProductTransform&&(t=this.opts.analyticsProductTransform(t)),n.track("Removed Product",t),this.data.set("order.items",s),this._cartSet(o.productId,0),this.onUpdate(o)),this.queue.shift(),void this._set()}for(r=u=0,d=s.length;u<d;r=++u)if(o=s[r],o.id===i||o.productId===i||o.productSlug===i)return p=o.quantity,o.quantity=f,o.locked=h,l=f,e=l-p,e>0?(t={id:o.productId,sku:o.productSlug,name:o.productName,quantity:e,price:parseFloat(o.price/100)},null!=this.opts.analyticsProductTransform&&(t=this.opts.analyticsProductTransform(t)),n.track("Added Product",t)):e<0&&(t={id:o.productId,sku:o.productSlug,name:o.productName,quantity:e,price:parseFloat(o.price/100)},null!=this.opts.analyticsProductTransform&&(t=this.opts.analyticsProductTransform(t)),n.track("Removed Product",t)),this.data.set("order.items."+r+".quantity",f),this.data.set("order.items."+r+".locked",h),this._cartSet(o.productId,f),this.onUpdate(o),this.queue.shift(),void this._set();return s.push({id:i,quantity:f,locked:h}),this.waits++,this.load(i)}load(t){return this.client.product.get(t).then(t=>{var e,r,i,o,s,a;this.waits--;o=this.data.get("order.items");for(r=s=0,a=o.length;s<a;r=++s)if(i=o[r],t.id===i.id||t.slug===i.id){e={id:t.id,sku:t.slug,name:t.name,quantity:i.quantity,price:parseFloat(t.price/100)},null!=this.opts.analyticsProductTransform&&(e=this.opts.analyticsProductTransform(e)),n.track("Added Product",e),this.update(t,i),this.data.set("order.items."+r,i),this._cartSet(t.id,i.quantity);break}this.queue.shift();return this._set()}).catch(e=>{var r,i,n,o,s;this.waits--;console.log(`setItem Error: ${e.stack}`);n=this.data.get("order.items");for(r=o=0,s=n.length;o<s;r=++o)if(i=n[r],i.id===t){n.splice(r,1),this.data.set("order.items",n);break}this.queue.shift();return this._set()})}refresh(t){var e;return e=this.data.get("order.items"),this.client.product.get(t).then(t=>{var r,i,n,o;this.waits--;for(r=n=0,o=e.length;n<o;r=++n)if(i=e[r],t.id===i.productId||t.slug===i.productSlug){this.update(t,i);break}return e}).catch(function(t){return console.log(`setItem Error: ${t}`)})}update(t,e){return delete e.id,e.productId=t.id,e.productSlug=t.slug,e.productName=t.name,e.price=t.price,e.listPrice=t.listPrice,e.description=t.description,this.onUpdate(e)}onUpdate(t){}promoCode(t){return null!=t?(this.invoice(),this.client.coupon.get(t).then(e=>{if(!e.enabled)throw new Error("This code is expired.");if(this.data.set("order.coupon",e),this.data.set("order.couponCodes",[t]),this._cartUpdate({coupon:e,couponCodes:[t]}),""!==e.freeProductId&&e.freeQuantity>0)return this.client.product.get(e.freeProductId).then(t=>this.invoice()).catch(function(t){throw new Error("This coupon is invalid.")});this.invoice()})):this.data.get("order.promoCode")}taxRates(t){return null!=t&&(this.data.set("taxRates",t),this.invoice()),this.data.get("taxRates")}shippingRates(t){return null!=t&&(this.data.set("shippingRates",t),this.invoice()),this.data.get("shippingRates")}invoice(){var t,e,r,i,n,o,s,a,u,c,d,h,l,p,f,g,y,v,m,w,I,q,k,C,P,j,R,b,T,S,x,L,_,A;if(o=this.data.get("order.items"),i=0,null!=(r=this.data.get("order.coupon")))switch(r.type){case"flat":if(null==r.productId||""===r.productId)i=r.amount||0;else for(w=this.data.get("order.items"),s=0,c=w.length;s<c;s++)n=w[s],n.productId===r.productId&&(m=n.quantity,r.once&&(m=1),i+=(r.amount||0)*m);break;case"percent":if(null==r.productId||""===r.productId)for(I=this.data.get("order.items"),a=0,d=I.length;a<d;a++)n=I[a],m=n.quantity,r.once&&(m=1),i+=(r.amount||0)*n.price*m*.01;else for(q=this.data.get("order.items"),u=0,h=q.length;u<h;u++)n=q[u],n.productId===r.productId&&(m=n.quantity,r.once&&(m=1),i+=(r.amount||0)*n.price*m*.01);i=Math.floor(i)}for(this.data.set("order.discount",i),o=this.data.get("order.items"),S=-i,g=0,l=o.length;g<l;g++)n=o[g],S+=n.price*n.quantity;if(this.data.set("order.subtotal",S),null!=(A=this.data.get("taxRates")))for(y=0,p=A.length;y<p;y++)if(_=A[y],(t=this.data.get("order.shippingAddress.city"))&&(null==_.city||_.city.toLowerCase()===t.toLowerCase())&&(T=this.data.get("order.shippingAddress.state"))&&(null==_.state||_.state.toLowerCase()===T.toLowerCase())&&(e=this.data.get("order.shippingAddress.country"))&&(null==_.country||_.country.toLowerCase()===e.toLowerCase())){this.data.set("order.taxRate",_.taxRate);break}if(null!=(b=this.data.get("shippingRates")))for(v=0,f=b.length;v<f;v++)if(R=b[v],(t=this.data.get("order.shippingAddress.city"))&&(null==R.city||R.city.toLowerCase()===t.toLowerCase())&&(T=this.data.get("order.shippingAddress.state"))&&(null==R.state||R.state.toLowerCase()===T.toLowerCase())&&(e=this.data.get("order.shippingAddress.country"))&&(null==R.country||R.country.toLowerCase()===e.toLowerCase())){this.data.set("order.shippingRate",R.shippingRate);break}return L=null!=(k=this.data.get("order.taxRate"))?k:0,x=Math.ceil((null!=L?L:0)*S),j=null!=(C=this.data.get("order.shippingRate"))?C:0,P=j,this.data.set("order.shipping",P),this.data.set("order.tax",x),this.data.set("order.total",S+P+x)}checkout(){var t;return this.invoice(),t={user:this.data.get("user"),order:this.data.get("order"),payment:this.data.get("payment")},this.client.checkout.authorize(t).then(e=>{var r,i,o,s,a,u,c,d,h,l;this.data.set("coupon",this.data.get("order.coupon")||{});this.data.set("order",e);c=this.client.checkout.capture(e.id).then(t=>{this.data.set("order",t);return t}).catch(function(t){var e;return"undefined"!=typeof window&&null!==window&&null!=(e=window.Raven)&&e.captureException(t),console.log(`capture Error: ${t}`)});l=this.data.get("referralProgram");null!=l&&(d=this.client.referrer.create({userId:t.order.userId,orderId:t.order.orderId,program:l,programId:this.data.get("referralProgram.id")}).catch(function(t){var e;return"undefined"!=typeof window&&null!==window&&null!=(e=window.Raven)&&e.captureException(t),console.log(`new referralProgram Error: ${t}`)}),c=f.settle([c,d]).then(t=>{var r;e=t[0].value;r=t[1].value;this.data.set("referrerId",r.id);return e}).catch(function(t){var e;return"undefined"!=typeof window&&null!==window&&null!=(e=window.Raven)&&e.captureException(t),console.log(`order/referralProgram Error: ${t}`)}));u={orderId:this.data.get("order.id"),total:parseFloat(this.data.get("order.total")/100),shipping:parseFloat(this.data.get("order.shipping")/100),tax:parseFloat(this.data.get("order.tax")/100),discount:parseFloat(this.data.get("order.discount")/100),coupon:this.data.get("order.couponCodes.0")||"",currency:this.data.get("order.currency"),products:[]};h=this.data.get("order.items");for(i=s=0,a=h.length;s<a;i=++s)o=h[i],r={id:o.productId,sku:o.productSlug,name:o.productName,quantity:o.quantity,price:parseFloat(o.price/100)},null!=this.opts.analyticsProductTransform&&(r=this.opts.analyticsProductTransform(r)),u.products[i]=r;n.track("Completed Order",u);return{p:c}})}}return t.prototype.waits=0,t.prototype.queue=null,t.prototype.data=null,t.prototype.client=null,t.prototype.cartPromise=null,t.prototype.promise=null,t.prototype.reject=null,t.prototype.resolve=null,t.prototype.opts={},t}();var q=I;t.Cart=q}(this.Commerce=this.Commerce||{});
