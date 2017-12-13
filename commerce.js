!function(t){"use strict";var e,r,n,o,i,a,u=e={track:function(t,e){var r;if(null!=("undefined"!=typeof window&&null!==window?window.analytics:void 0))try{return window.analytics.track(t,e)}catch(t){return r=t,console.error(r)}}},s=r=function(){function t(t){this.state=t.state,this.value=t.value,this.reason=t.reason}return t.prototype.isFulfilled=function(){return"fulfilled"===this.state},t.prototype.isRejected=function(){return"rejected"===this.state},t}(),c=n=function(){var t,e,r,n;return r=[],n=0,1024,t=function(){for(var t;r.length-n;){try{r[n]()}catch(e){t=e,"undefined"!=typeof console&&console.error(t)}r[n++]=void 0,1024===n&&(r.splice(0,1024),n=0)}},e=function(){var e;return"undefined"!=typeof MutationObserver?(e=document.createElement("div"),new MutationObserver(t).observe(e,{attributes:!0}),function(){e.setAttribute("a",0)}):"undefined"!=typeof setImmediate?function(){setImmediate(t)}:function(){setTimeout(t,0)}}(),function(t){r.push(t),r.length-n==1&&e()}}();a=function(t,e){var r,n;if("function"==typeof t.y)try{n=t.y.call(void 0,e),t.p.resolve(n)}catch(e){r=e,t.p.reject(r)}else t.p.resolve(e)},i=function(t,e){var r,n;if("function"==typeof t.n)try{n=t.n.call(void 0,e),t.p.resolve(n)}catch(e){r=e,t.p.reject(r)}else t.p.reject(e)};var d=o=function(){function t(t){t&&t(function(t){return function(e){return t.resolve(e)}}(this),function(t){return function(e){return t.reject(e)}}(this))}return t.prototype.resolve=function(t){var e,r,n,o;if(void 0===this.state){if(t===this)return this.reject(new TypeError("Attempt to resolve promise with self"));if(t&&("function"==typeof t||"object"==typeof t))try{if(n=!0,"function"==typeof(o=t.then))return void o.call(t,function(t){return function(e){n&&(n&&(n=!1),t.resolve(e))}}(this),function(t){return function(e){n&&(n=!1,t.reject(e))}}(this))}catch(t){return r=t,void(n&&this.reject(r))}this.state="fulfilled",this.v=t,(e=this.c)&&c(function(r){return function(){var r,n,o;for(n=0,o=e.length;n<o;n++)r=e[n],a(r,t)}}())}},t.prototype.reject=function(e){var r;void 0===this.state&&(this.state="rejected",this.v=e,(r=this.c)?c(function(){var t,n,o;for(n=0,o=r.length;n<o;n++)t=r[n],i(t,e)}):t.suppressUncaughtRejectionError||"undefined"==typeof console||console.log("Broken Promise, please catch rejections: ",e,e?e.stack:null))},t.prototype.then=function(e,r){var n,o,u,s;return u=new t,o={y:e,n:r,p:u},void 0===this.state?this.c?this.c.push(o):this.c=[o]:(s=this.state,n=this.v,c(function(){"fulfilled"===s?a(o,n):i(o,n)})),u},t.prototype.catch=function(t){return this.then(null,t)},t.prototype.finally=function(t){return this.then(t,t)},t.prototype.timeout=function(e,r){return r=r||"timeout",new t(function(t){return function(n,o){setTimeout(function(){return o(Error(r))},e),t.then(function(t){n(t)},function(t){o(t)})}}(this))},t.prototype.callback=function(t){return"function"==typeof t&&(this.then(function(e){return t(null,e)}),this.catch(function(e){return t(e,null)})),this},t}(),l=function(t){var e;return(e=new d).resolve(t),e},p=function(t){var e;return(e=new d).reject(t),e},h=function(t){var e,r,n,o,i,a,u;for(a=[],o=0,u=new d,i=function(e,r){e&&"function"==typeof e.then||(e=l(e)),e.then(function(e){a[r]=e,++o===t.length&&u.resolve(a)},function(t){u.reject(t)})},e=r=0,n=t.length;r<n;e=++r)i(t[e],e);return t.length||u.resolve(a),u},f=function(t){return new d(function(e,r){return t.then(function(t){return e(new s({state:"fulfilled",value:t}))}).catch(function(t){return e(new s({state:"rejected",reason:t}))})})},g=function(t){return h(t.map(f))};d.all=h,d.reflect=f,d.reject=p,d.resolve=l,d.settle=g,d.soon=c;var y,v=function(t){return null==t&&(t=""),t.toUpperCase().replace(/\s/g,"")},m=function(t,e,r,n,o){var i,a,u,s,c,d,l;if(u=v(e),l=v(r),a=v(n),d=v(o),!u||!l||!a&&!d)return[!1,0];if(!t.country)return[!0,0];if(t.country===u){if(!t.state)return[!0,1];if(t.state===l){if(!t.city&&!t.postalCodes)return[!0,2];if(t.city&&t.city===a)return[!0,3];if(t.postalCodes)for(s=0,c=(i=t.postalCodes.split(",")).length;s<c;s++)if(i[s]===d)return[!0,3];return[!1,2]}return[!1,1]}return[!1,0]},w=function(t,e,r,n,o){var i,a,u,s,c,d,l,p;p=null,i=-1,s=-1;for(u in t)if(a=t[u],l=m(a,e,r,n,o),c=l[0],d=l[1],c&&d>i){if(3===d)return[a,d,parseInt(u,10)];p=t[u],i=d,s=u}return[p,i,parseInt(s,10)]},I=y=function(){function t(t,e,r){this.client=t,this.data=e,this.opts=null!=r?r:{},this.queue=[],this.invoice()}return t.prototype.waits=0,t.prototype.queue=null,t.prototype.data=null,t.prototype.client=null,t.prototype.promise=null,t.prototype.reject=null,t.prototype.resolve=null,t.prototype.opts={},t.prototype.initCart=function(){var t,e,r,n,o,i;if(!(t=this.data.get("order.cartId"))&&null!=this.client.cart)return this.client.cart.create().then(function(t){return function(e){var r,n,o,i,a;for(t.data.set("order.cartId",e.id),r=i=0,a=(o=t.data.get("order.items")).length;i<a;r=++i)n=o[r],t._cartSet(n.productId,n.quantity);return t.onCart(e.id)}}(this)),this.data.on("set",function(t){return function(e){if("order.storeId"===e)return t._cartSyncStore()}}(this));if(null!=this.client.cart){for(this.onCart(t),e=o=0,i=(n=this.data.get("order.items")).length;o<i;e=++o)r=n[e],this._cartSet(r.productId,r.quantity);return this.onCart(t),this.data.on("set",function(t){return function(e){if("order.storeId"===e&&t._cartSyncStore(),"user.firstName"===e&&t._cartSyncName(),"user.lastName"===e)return t._cartSyncName()}}(this))}},t.prototype.onCart=function(t){},t.prototype._cartSet=function(t,e){var r;if((r=this.data.get("order.cartId"))&&null!=this.client.cart)return this.client.cart.set({id:r,productId:t,quantity:e,storeId:this.data.get("order.storeId")})},t.prototype._cartUpdate=function(t){var e;if((e=this.data.get("order.cartId"))&&null!=this.client.cart)return t.id=e,this.client.cart.update(t)},t.prototype._cartSyncStore=function(){var t;if((t=this.data.get("order.cartId"))&&null!=this.client.cart)return this.client.cart.update({id:t,storeId:this.data.get("order.storeId")})},t.prototype.clear=function(){var t,e,r,n;for(this.queue.length=0,r=0,n=(e=this.data.get("order.items")).length;r<n;r++)t=e[r],this.set(t.productId,0);return this.data.get("order.items")},t.prototype.set=function(t,e,r){return null==r&&(r=!1),this.queue.push([t,e,r]),1===this.queue.length&&(this.promise=new d(function(t){return function(e,r){return t.resolve=e,t.reject=r}}(this)),this._set()),this.promise},t.prototype.get=function(t){var e,r,n,o,i,a,u,s;for(e=o=0,a=(n=this.data.get("order.items")).length;o<a;e=++o)if((r=n[e]).id===t||r.productId===t||r.productSlug===t)return r;for(e=i=0,u=(s=this.queue).length;i<u;e=++i)if((r=s[e])[0]===t)return{id:r[0],quantity:r[2],locked:r[3]}},t.prototype._set=function(){var t,e,r,n,o,i,a,s,c,d,l,p,h,f,g;if(i=this.data.get("order.items"),0===this.queue.length)return this.invoice(),void(null!=this.resolve&&this.resolve(i));if(g=this.queue[0],n=g[0],f=g[1],l=g[2],f<0&&(f=0),0===f){for(r=a=0,c=i.length;a<c&&((o=i[r]).productId!==n&&o.productSlug!==n&&o.id!==n);r=++a);return r<i.length&&(this.data.set("order.items",[]),i.splice(r,1),this.onUpdate(),t={id:o.productId,sku:o.productSlug,name:o.productName,quantity:o.quantity,price:parseFloat(o.price/100)},null!=this.opts.analyticsProductTransform&&(t=this.opts.analyticsProductTransform(t)),u.track("Removed Product",t),this.data.set("order.items",i),this._cartSet(o.productId,0),o.quantity=0,this.onUpdate(o)),this.queue.shift(),void this._set()}for(r=s=0,d=i.length;s<d;r=++s)if((o=i[r]).id===n||o.productId===n||o.productSlug===n)return h=o.quantity,o.quantity=f,o.locked=l,p=f,e=p-h,e>0?(t={id:o.productId,sku:o.productSlug,name:o.productName,quantity:e,price:parseFloat(o.price/100)},null!=this.opts.analyticsProductTransform&&(t=this.opts.analyticsProductTransform(t)),u.track("Added Product",t)):e<0&&(t={id:o.productId,sku:o.productSlug,name:o.productName,quantity:e,price:parseFloat(o.price/100)},null!=this.opts.analyticsProductTransform&&(t=this.opts.analyticsProductTransform(t)),u.track("Removed Product",t)),this.data.set("order.items."+r+".quantity",f),this.data.set("order.items."+r+".locked",l),this._cartSet(o.productId,f),this.onUpdate(o),this.queue.shift(),void this._set();return i.push({id:n,quantity:f,locked:l}),this.waits++,this.load(n)},t.prototype.load=function(t){return this.client.product.get(t).then(function(t){return function(e){var r,n,o,i,a,s;for(t.waits--,n=a=0,s=(i=t.data.get("order.items")).length;a<s;n=++a)if(o=i[n],e.id===o.id||e.slug===o.id){r={id:e.id,sku:e.slug,name:e.name,quantity:o.quantity,price:parseFloat(e.price/100)},null!=t.opts.analyticsProductTransform&&(r=t.opts.analyticsProductTransform(r)),u.track("Added Product",r),t.update(e,o),t.data.set("order.items."+n,o),t._cartSet(e.id,o.quantity);break}return t.queue.shift(),t._set()}}(this)).catch(function(e){return function(r){var n,o,i,a;for(e.waits--,console.log("setItem Error: "+r.stack),n=i=0,a=(o=e.data.get("order.items")).length;i<a;n=++i)if(o[n].id===t){o.splice(n,1),e.data.set("order.items",o);break}return e.queue.shift(),e._set()}}(this))},t.prototype.refresh=function(t){var e;return e=this.data.get("order.items"),this.client.product.get(t).then(function(t){return function(r){var n,o,i,a;for(t.waits--,n=i=0,a=e.length;i<a;n=++i)if(o=e[n],r.id===o.productId||r.slug===o.productSlug){t.update(r,o);break}return e}}(this)).catch(function(t){return console.log("setItem Error: "+t)})},t.prototype.update=function(t,e){return delete e.id,e.productId=t.id,e.productSlug=t.slug,e.productName=t.name,e.price=t.price,e.listPrice=t.listPrice,e.description=t.description,this.onUpdate(e)},t.prototype.onUpdate=function(t){},t.prototype.promoCode=function(t){return null!=t?(this.invoice(),this.client.coupon.get(t).then(function(e){return function(r){if(!r.enabled)throw new Error("This code is expired.");if(e.data.set("order.coupon",r),e.data.set("order.couponCodes",[t]),e._cartUpdate({coupon:r,couponCodes:[t]}),""!==r.freeProductId&&r.freeQuantity>0)return e.client.product.get(r.freeProductId).then(function(t){return e.invoice()}).catch(function(t){throw new Error("This coupon is invalid.")});e.invoice()}}(this))):this.data.get("order.promoCode")},t.prototype.taxRates=function(t){return null!=t&&(this.data.set("taxRates",t),this.invoice()),this.data.get("taxRates")},t.prototype.shippingRates=function(t){return null!=t&&(this.data.set("shippingRates",t),this.invoice()),this.data.get("shippingRates")},t.prototype.invoice=function(){var t,e,r,n,o,i,a,u,s,c,d,l,p,h,f,g,y,v,m,I,q,k,R,P,S,j,C,_,x,T,E,b,A,F,N,U,M;if(a=this.data.get("order.items"),n=0,null!=(r=this.data.get("order.coupon")))switch(r.type){case"flat":if(null==r.productId||""===r.productId)n=r.amount||0;else for(u=0,c=(m=this.data.get("order.items")).length;u<c;u++)(i=m[u]).productId===r.productId&&(y=i.quantity,r.once&&(y=1),n+=(r.amount||0)*y);break;case"percent":if(null==r.productId||""===r.productId)for(s=0,d=(I=this.data.get("order.items")).length;s<d;s++)y=(i=I[s]).quantity,r.once&&(y=1),n+=(r.amount||0)*i.price*y*.01;else for(h=0,l=(k=this.data.get("order.items")).length;h<l;h++)(i=k[h]).productId===r.productId&&(y=i.quantity,r.once&&(y=1),n+=(r.amount||0)*i.price*y*.01);n=Math.floor(n)}for(this.data.set("order.discount",n),F=-n,f=0,p=(a=this.data.get("order.items")).length;f<p;f++)F+=(i=a[f]).price*i.quantity;return this.data.set("order.subtotal",F),M=this.data.get("taxRates"),null==(v=this.data.get("order.taxRate"))&&(v={percent:0,cost:0},this.data.set("order.taxRate",v)),null!=M&&(e=this.data.get("order.shippingAddress.country"),A=this.data.get("order.shippingAddress.state"),t=this.data.get("order.shippingAddress.city"),g=this.data.get("order.shippingAddress.postalCode"),o=(R=w(M.geoRates,e,A,t,g))[0],R[1],R[2],null==o&&(o=v),this.data.set("order.taxRate",o)),b=this.data.get("shippingRates"),null==(v=this.data.get("order.shippingRate"))&&(v={percent:0,cost:0},this.data.set("order.shippingRate",v)),null!=b&&(e=this.data.get("order.shippingAddress.country"),A=this.data.get("order.shippingAddress.state"),t=this.data.get("order.shippingAddress.city"),g=this.data.get("order.shippingAddress.postalCode"),o=(P=w(b.geoRates,e,A,t,g))[0],P[1],P[2],null==o&&(o=v),this.data.set("order.shippingRate",o)),U=null!=(S=this.data.get("order.taxRate"))?S:{percent:0,cost:0},N=Math.ceil((null!=(j=U.percent)?j:0)*F+(null!=(C=U.cost)?C:0)),E=null!=(_=this.data.get("order.shippingRate"))?_:{percent:0,cost:0},T=Math.ceil((null!=(x=E.percent)?x:0)*F+(null!=(q=E.cost)?q:0)),this.data.set("order.shipping",T),this.data.set("order.tax",N),this.data.set("order.total",F+T+N)},t.prototype.checkout=function(){var t;return this.invoice(),t={user:this.data.get("user"),order:this.data.get("order"),payment:this.data.get("payment")},this.client.checkout.authorize(t).then(function(t){return function(e){var r,n,o,i,a,s,c,l,p,h;for(t.data.set("coupon",t.data.get("order.coupon")||{}),t.data.set("order",e),c="ethereum"===e.type?new d(function(t){return t(e)}):t.client.checkout.capture(e.id).then(function(e){return t.data.set("order",e),e}).catch(function(t){var e;return"undefined"!=typeof window&&null!==window&&null!=(e=window.Raven)&&e.captureException(t),console.log("capture Error: "+t)}),null!=(h=t.data.get("referralProgram"))&&(l=t.client.referrer.create({userId:t.data.get("order.userId"),orderId:t.data.get("order.id"),program:h,programId:t.data.get("referralProgram.id")}).catch(function(t){var e;return"undefined"!=typeof window&&null!==window&&null!=(e=window.Raven)&&e.captureException(t),console.log("new referralProgram Error: "+t)}),c=d.settle([c,l]).then(function(r){var n;return e=r[0].value,n=r[1].value,t.data.set("referrerId",n.id),e}).catch(function(t){var e;return"undefined"!=typeof window&&null!==window&&null!=(e=window.Raven)&&e.captureException(t),console.log("order/referralProgram Error: "+t)})),s={orderId:t.data.get("order.id"),total:parseFloat(t.data.get("order.total")/100),shipping:parseFloat(t.data.get("order.shipping")/100),tax:parseFloat(t.data.get("order.tax")/100),discount:parseFloat(t.data.get("order.discount")/100),coupon:t.data.get("order.couponCodes.0")||"",currency:t.data.get("order.currency"),products:[]},n=i=0,a=(p=t.data.get("order.items")).length;i<a;n=++i)r={id:(o=p[n]).productId,sku:o.productSlug,name:o.productName,quantity:o.quantity,price:parseFloat(o.price/100)},null!=t.opts.analyticsProductTransform&&(r=t.opts.analyticsProductTransform(r)),s.products[n]=r;return u.track("Completed Order",s),{p:c}}}(this))},t}();t.Cart=I,t.matchesGeoRate=m,t.closestGeoRate=w,t.clean=v}(this.Commerce=this.Commerce||{});
