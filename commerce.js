!function(t){"use strict";var e,r,o,n,i,a,s=e={track:function(t,e){var r;if(null!=("undefined"!=typeof window&&null!==window?window.analytics:void 0))try{return window.analytics.track(t,e)}catch(t){return r=t,console.error(r)}}},u=r=function(){function t(t){this.state=t.state,this.value=t.value,this.reason=t.reason}return t.prototype.isFulfilled=function(){return"fulfilled"===this.state},t.prototype.isRejected=function(){return"rejected"===this.state},t}(),c=o=function(){var t,e,r,o;return r=[],o=0,1024,t=function(){for(var t;r.length-o;){try{r[o]()}catch(e){t=e,"undefined"!=typeof console&&console.error(t)}r[o++]=void 0,1024===o&&(r.splice(0,1024),o=0)}},e=function(){var e;return"undefined"!=typeof MutationObserver?(e=document.createElement("div"),new MutationObserver(t).observe(e,{attributes:!0}),function(){e.setAttribute("a",0)}):"undefined"!=typeof setImmediate?function(){setImmediate(t)}:function(){setTimeout(t,0)}}(),function(t){r.push(t),r.length-o==1&&e()}}();a=function(t,e){var r,o;if("function"==typeof t.y)try{o=t.y.call(void 0,e),t.p.resolve(o)}catch(e){r=e,t.p.reject(r)}else t.p.resolve(e)},i=function(t,e){var r,o;if("function"==typeof t.n)try{o=t.n.call(void 0,e),t.p.resolve(o)}catch(e){r=e,t.p.reject(r)}else t.p.reject(e)};var d=n=function(){function t(t){t&&t(function(t){return function(e){return t.resolve(e)}}(this),function(t){return function(e){return t.reject(e)}}(this))}return t.prototype.resolve=function(t){var e,r,o,n;if(void 0===this.state){if(t===this)return this.reject(new TypeError("Attempt to resolve promise with self"));if(t&&("function"==typeof t||"object"==typeof t))try{if(o=!0,"function"==typeof(n=t.then))return void n.call(t,function(t){return function(e){o&&(o&&(o=!1),t.resolve(e))}}(this),function(t){return function(e){o&&(o=!1,t.reject(e))}}(this))}catch(t){return r=t,void(o&&this.reject(r))}this.state="fulfilled",this.v=t,(e=this.c)&&c(function(r){return function(){var r,o,n;for(o=0,n=e.length;o<n;o++)r=e[o],a(r,t)}}())}},t.prototype.reject=function(e){var r;void 0===this.state&&(this.state="rejected",this.v=e,(r=this.c)?c(function(){var t,o,n;for(o=0,n=r.length;o<n;o++)t=r[o],i(t,e)}):t.suppressUncaughtRejectionError||"undefined"==typeof console||console.log("Broken Promise, please catch rejections: ",e,e?e.stack:null))},t.prototype.then=function(e,r){var o,n,s,u;return s=new t,n={y:e,n:r,p:s},void 0===this.state?this.c?this.c.push(n):this.c=[n]:(u=this.state,o=this.v,c(function(){"fulfilled"===u?a(n,o):i(n,o)})),s},t.prototype.catch=function(t){return this.then(null,t)},t.prototype.finally=function(t){return this.then(t,t)},t.prototype.timeout=function(e,r){return r=r||"timeout",new t(function(t){return function(o,n){setTimeout(function(){return n(Error(r))},e),t.then(function(t){o(t)},function(t){n(t)})}}(this))},t.prototype.callback=function(t){return"function"==typeof t&&(this.then(function(e){return t(null,e)}),this.catch(function(e){return t(e,null)})),this},t}(),l=function(t){var e;return(e=new d).resolve(t),e},p=function(t){var e;return(e=new d).reject(t),e},h=function(t){var e,r,o,n,i,a,s;for(a=[],n=0,s=new d,i=function(e,r){e&&"function"==typeof e.then||(e=l(e)),e.then(function(e){a[r]=e,++n===t.length&&s.resolve(a)},function(t){s.reject(t)})},e=r=0,o=t.length;r<o;e=++r)i(t[e],e);return t.length||s.resolve(a),s},f=function(t){return new d(function(e,r){return t.then(function(t){return e(new u({state:"fulfilled",value:t}))}).catch(function(t){return e(new u({state:"rejected",reason:t}))})})},g=function(t){return h(t.map(f))};d.all=h,d.reflect=f,d.reject=p,d.resolve=l,d.settle=g,d.soon=c;var y,v=y=function(){function t(t,e,r){this.client=t,this.data=e,this.opts=null!=r?r:{},this.queue=[],this.invoice()}return t.prototype.waits=0,t.prototype.queue=null,t.prototype.data=null,t.prototype.client=null,t.prototype.promise=null,t.prototype.reject=null,t.prototype.resolve=null,t.prototype.opts={},t.prototype.initCart=function(){var t,e,r,o,n,i;if(!(t=this.data.get("order.cartId"))&&null!=this.client.cart)return this.client.cart.create().then(function(t){return function(e){var r,o,n,i,a;for(t.data.set("order.cartId",e.id),r=i=0,a=(n=t.data.get("order.items")).length;i<a;r=++i)o=n[r],t._cartSet(o.productId,o.quantity);return t.onCart(e.id)}}(this)),this.data.on("set",function(t){return function(e){if("order.storeId"===e)return t._cartSyncStore()}}(this));if(null!=this.client.cart){for(this.onCart(t),e=n=0,i=(o=this.data.get("order.items")).length;n<i;e=++n)r=o[e],this._cartSet(r.productId,r.quantity);return this.onCart(t),this.data.on("set",function(t){return function(e){if("order.storeId"===e&&t._cartSyncStore(),"user.firstName"===e&&t._cartSyncName(),"user.lastName"===e)return t._cartSyncName()}}(this))}},t.prototype.onCart=function(t){},t.prototype._cartSet=function(t,e){var r;if((r=this.data.get("order.cartId"))&&null!=this.client.cart)return this.client.cart.set({id:r,productId:t,quantity:e,storeId:this.data.get("order.storeId")})},t.prototype._cartUpdate=function(t){var e;if((e=this.data.get("order.cartId"))&&null!=this.client.cart)return t.id=e,this.client.cart.update(t)},t.prototype._cartSyncStore=function(){var t;if((t=this.data.get("order.cartId"))&&null!=this.client.cart)return this.client.cart.update({id:t,storeId:this.data.get("order.storeId")})},t.prototype.clear=function(){var t,e,r,o;for(this.queue.length=0,r=0,o=(e=this.data.get("order.items")).length;r<o;r++)t=e[r],this.set(t.productId,0);return this.data.get("order.items")},t.prototype.set=function(t,e,r){return null==r&&(r=!1),this.queue.push([t,e,r]),1===this.queue.length&&(this.promise=new d(function(t){return function(e,r){return t.resolve=e,t.reject=r}}(this)),this._set()),this.promise},t.prototype.get=function(t){var e,r,o,n,i,a,s,u;for(e=n=0,a=(o=this.data.get("order.items")).length;n<a;e=++n)if((r=o[e]).id===t||r.productId===t||r.productSlug===t)return r;for(e=i=0,s=(u=this.queue).length;i<s;e=++i)if((r=u[e])[0]===t)return{id:r[0],quantity:r[2],locked:r[3]}},t.prototype._set=function(){var t,e,r,o,n,i,a,u,c,d,l,p,h,f,g;if(i=this.data.get("order.items"),0===this.queue.length)return this.invoice(),void(null!=this.resolve&&this.resolve(i));if(g=this.queue[0],o=g[0],f=g[1],l=g[2],f<0&&(f=0),0===f){for(r=a=0,c=i.length;a<c&&((n=i[r]).productId!==o&&n.productSlug!==o&&n.id!==o);r=++a);return r<i.length&&(this.data.set("order.items",[]),i.splice(r,1),this.onUpdate(),t={id:n.productId,sku:n.productSlug,name:n.productName,quantity:n.quantity,price:parseFloat(n.price/100)},null!=this.opts.analyticsProductTransform&&(t=this.opts.analyticsProductTransform(t)),s.track("Removed Product",t),this.data.set("order.items",i),this._cartSet(n.productId,0),n.quantity=0,this.onUpdate(n)),this.queue.shift(),void this._set()}for(r=u=0,d=i.length;u<d;r=++u)if((n=i[r]).id===o||n.productId===o||n.productSlug===o)return h=n.quantity,n.quantity=f,n.locked=l,p=f,e=p-h,e>0?(t={id:n.productId,sku:n.productSlug,name:n.productName,quantity:e,price:parseFloat(n.price/100)},null!=this.opts.analyticsProductTransform&&(t=this.opts.analyticsProductTransform(t)),s.track("Added Product",t)):e<0&&(t={id:n.productId,sku:n.productSlug,name:n.productName,quantity:e,price:parseFloat(n.price/100)},null!=this.opts.analyticsProductTransform&&(t=this.opts.analyticsProductTransform(t)),s.track("Removed Product",t)),this.data.set("order.items."+r+".quantity",f),this.data.set("order.items."+r+".locked",l),this._cartSet(n.productId,f),this.onUpdate(n),this.queue.shift(),void this._set();return i.push({id:o,quantity:f,locked:l}),this.waits++,this.load(o)},t.prototype.load=function(t){return this.client.product.get(t).then(function(t){return function(e){var r,o,n,i,a,u;for(t.waits--,o=a=0,u=(i=t.data.get("order.items")).length;a<u;o=++a)if(n=i[o],e.id===n.id||e.slug===n.id){r={id:e.id,sku:e.slug,name:e.name,quantity:n.quantity,price:parseFloat(e.price/100)},null!=t.opts.analyticsProductTransform&&(r=t.opts.analyticsProductTransform(r)),s.track("Added Product",r),t.update(e,n),t.data.set("order.items."+o,n),t._cartSet(e.id,n.quantity);break}return t.queue.shift(),t._set()}}(this)).catch(function(e){return function(r){var o,n,i,a;for(e.waits--,console.log("setItem Error: "+r.stack),o=i=0,a=(n=e.data.get("order.items")).length;i<a;o=++i)if(n[o].id===t){n.splice(o,1),e.data.set("order.items",n);break}return e.queue.shift(),e._set()}}(this))},t.prototype.refresh=function(t){var e;return e=this.data.get("order.items"),this.client.product.get(t).then(function(t){return function(r){var o,n,i,a;for(t.waits--,o=i=0,a=e.length;i<a;o=++i)if(n=e[o],r.id===n.productId||r.slug===n.productSlug){t.update(r,n);break}return e}}(this)).catch(function(t){return console.log("setItem Error: "+t)})},t.prototype.update=function(t,e){return delete e.id,e.productId=t.id,e.productSlug=t.slug,e.productName=t.name,e.price=t.price,e.listPrice=t.listPrice,e.description=t.description,this.onUpdate(e)},t.prototype.onUpdate=function(t){},t.prototype.promoCode=function(t){return null!=t?(this.invoice(),this.client.coupon.get(t).then(function(e){return function(r){if(!r.enabled)throw new Error("This code is expired.");if(e.data.set("order.coupon",r),e.data.set("order.couponCodes",[t]),e._cartUpdate({coupon:r,couponCodes:[t]}),""!==r.freeProductId&&r.freeQuantity>0)return e.client.product.get(r.freeProductId).then(function(t){return e.invoice()}).catch(function(t){throw new Error("This coupon is invalid.")});e.invoice()}}(this))):this.data.get("order.promoCode")},t.prototype.taxRates=function(t){return null!=t&&(this.data.set("taxRates",t),this.invoice()),this.data.get("taxRates")},t.prototype.shippingRates=function(t){return null!=t&&(this.data.set("shippingRates",t),this.invoice()),this.data.get("shippingRates")},t.prototype.invoice=function(){var t,e,r,o,n,i,a,s,u,c,d,l,p,h,f,g,y,v,m,w,I,C,q,k,R,P,S,j,_,x,L,b,T,E,A;if(i=this.data.get("order.items"),o=0,null!=(r=this.data.get("order.coupon")))switch(r.type){case"flat":if(null==r.productId||""===r.productId)o=r.amount||0;else for(a=0,c=(I=this.data.get("order.items")).length;a<c;a++)(n=I[a]).productId===r.productId&&(w=n.quantity,r.once&&(w=1),o+=(r.amount||0)*w);break;case"percent":if(null==r.productId||""===r.productId)for(s=0,d=(C=this.data.get("order.items")).length;s<d;s++)w=(n=C[s]).quantity,r.once&&(w=1),o+=(r.amount||0)*n.price*w*.01;else for(u=0,l=(q=this.data.get("order.items")).length;u<l;u++)(n=q[u]).productId===r.productId&&(w=n.quantity,r.once&&(w=1),o+=(r.amount||0)*n.price*w*.01);o=Math.floor(o)}for(this.data.set("order.discount",o),L=-o,g=0,p=(i=this.data.get("order.items")).length;g<p;g++)L+=(n=i[g]).price*n.quantity;if(this.data.set("order.subtotal",L),A=this.data.get("taxRates"),null==this.data.get("order.taxRate")&&this.data.set("order.taxRate",0),null!=A)for(y=0,h=A.length;y<h;y++)if(E=A[y],!(!(t=this.data.get("order.shippingAddress.city"))&&E.city||null!=E.city&&E.city.toLowerCase()!==t.toLowerCase()||!(m=this.data.get("order.shippingAddress.postalCode"))&&E.postalCode||null!=E.postalCode&&E.postalCode.toLowerCase()!==m.toLowerCase()||!(x=this.data.get("order.shippingAddress.state"))&&E.state||null!=E.state&&E.state.toLowerCase()!==x.toLowerCase()||!(e=this.data.get("order.shippingAddress.country"))&&E.country||null!=E.country&&E.country.toLowerCase()!==e.toLowerCase())){this.data.set("order.taxRate",E.taxRate);break}if(_=this.data.get("shippingRates"),null==this.data.get("order.shippingRate")&&this.data.set("order.shippingRate",0),null!=_)for(v=0,f=_.length;v<f;v++)if(j=_[v],!(!(t=this.data.get("order.shippingAddress.city"))&&j.city||null!=j.city&&j.city.toLowerCase()!==t.toLowerCase()||!(m=this.data.get("order.shippingAddress.postalCode"))&&j.postalCode||null!=j.postalCode&&j.postalCode.toLowerCase()!==m.toLowerCase()||!(x=this.data.get("order.shippingAddress.state"))&&j.state||null!=j.state&&j.state.toLowerCase()!==x.toLowerCase()||!(e=this.data.get("order.shippingAddress.country"))&&j.country||null!=j.country&&j.country.toLowerCase()!==e.toLowerCase())){this.data.set("order.shippingRate",j.shippingRate);break}return T=null!=(k=this.data.get("order.taxRate"))?k:0,b=Math.ceil((null!=T?T:0)*L),S=null!=(R=this.data.get("order.shippingRate"))?R:0,P=S,this.data.set("order.shipping",P),this.data.set("order.tax",b),this.data.set("order.total",L+P+b)},t.prototype.checkout=function(){var t;return this.invoice(),t={user:this.data.get("user"),order:this.data.get("order"),payment:this.data.get("payment")},this.client.checkout.authorize(t).then(function(t){return function(e){var r,o,n,i,a,u,c,l,p,h;for(t.data.set("coupon",t.data.get("order.coupon")||{}),t.data.set("order",e),c=t.client.checkout.capture(e.id).then(function(e){return t.data.set("order",e),e}).catch(function(t){var e;return"undefined"!=typeof window&&null!==window&&null!=(e=window.Raven)&&e.captureException(t),console.log("capture Error: "+t)}),null!=(h=t.data.get("referralProgram"))&&(l=t.client.referrer.create({userId:t.data.get("order.userId"),orderId:t.data.get("order.id"),program:h,programId:t.data.get("referralProgram.id")}).catch(function(t){var e;return"undefined"!=typeof window&&null!==window&&null!=(e=window.Raven)&&e.captureException(t),console.log("new referralProgram Error: "+t)}),c=d.settle([c,l]).then(function(r){var o;return e=r[0].value,o=r[1].value,t.data.set("referrerId",o.id),e}).catch(function(t){var e;return"undefined"!=typeof window&&null!==window&&null!=(e=window.Raven)&&e.captureException(t),console.log("order/referralProgram Error: "+t)})),u={orderId:t.data.get("order.id"),total:parseFloat(t.data.get("order.total")/100),shipping:parseFloat(t.data.get("order.shipping")/100),tax:parseFloat(t.data.get("order.tax")/100),discount:parseFloat(t.data.get("order.discount")/100),coupon:t.data.get("order.couponCodes.0")||"",currency:t.data.get("order.currency"),products:[]},o=i=0,a=(p=t.data.get("order.items")).length;i<a;o=++i)r={id:(n=p[o]).productId,sku:n.productSlug,name:n.productName,quantity:n.quantity,price:parseFloat(n.price/100)},null!=t.opts.analyticsProductTransform&&(r=t.opts.analyticsProductTransform(r)),u.products[o]=r;return s.track("Completed Order",u),{p:c}}}(this))},t}();t.Cart=v}(this.Commerce=this.Commerce||{});
